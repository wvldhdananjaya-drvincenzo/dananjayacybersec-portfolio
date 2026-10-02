import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { parseAllowedOrigins, isOriginAllowed, DEV_LOCALHOST_ORIGINS } from '../corsPolicy';

// ANSI color helpers for clean console output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ${GREEN}✓ PASS:${RESET} ${testName}`);
  } else {
    console.error(`  ${RED}✗ FAIL:${RESET} ${testName}`);
    throw new Error(`Test failed: ${testName}`);
  }
}

async function runTests() {
  console.log(`\n${BOLD}=== CORS SECURITY TEST SUITE ===${RESET}\n`);

  // --- UNIT TESTS ---
  console.log(`${BOLD}1. Environment Parsing & Unit Matching Tests:${RESET}`);

  const testConfig = ' https://your-production-domain.com ,  https://api.your-production-domain.com  ';
  const parsed = parseAllowedOrigins(testConfig);
  assert(parsed.has('https://your-production-domain.com'), 'Safely trims and parses primary origin');
  assert(parsed.has('https://api.your-production-domain.com'), 'Safely trims and parses secondary origin');
  assert(!parsed.has(''), 'Ignores empty strings');
  assert(parsed.size === 2, 'Extracts exact origin count');

  const prodAllowlist = parseAllowedOrigins('https://your-production-domain.com');

  // Test Requirements from Prompt
  assert(
    isOriginAllowed('https://your-production-domain.com', true, prodAllowlist) === true,
    'ALLOWED: https://your-production-domain.com in production'
  );

  assert(
    isOriginAllowed('https://attacker.com', true, prodAllowlist) === false,
    'REJECTED: https://attacker.com in production'
  );

  assert(
    isOriginAllowed('https://evil.run.app', true, prodAllowlist) === false,
    'REJECTED: https://evil.run.app (arbitrary run.app domain) in production'
  );

  assert(
    isOriginAllowed('https://attacker.firebaseapp.com', true, prodAllowlist) === false,
    'REJECTED: https://attacker.firebaseapp.com in production'
  );

  assert(
    isOriginAllowed('https://malicious-your-production-domain.com', true, prodAllowlist) === false,
    'REJECTED: https://malicious-your-production-domain.com (prefix domain spoofing) in production'
  );

  assert(
    isOriginAllowed('http://localhost:5173', true, prodAllowlist) === false,
    'REJECTED: http://localhost:5173 in production'
  );

  assert(
    isOriginAllowed('https://your-production-domain.com.attacker.com', true, prodAllowlist) === false,
    'REJECTED: https://your-production-domain.com.attacker.com (subdomain spoofing) in production'
  );

  assert(
    isOriginAllowed('null', true, prodAllowlist) === false,
    'REJECTED: null origin in production'
  );

  assert(
    isOriginAllowed(undefined, true, prodAllowlist) === false,
    'REJECTED: undefined origin in isOriginAllowed'
  );

  // Development mode behavior verification
  assert(
    isOriginAllowed('http://localhost:5173', false, prodAllowlist) === true,
    'ALLOWED: http://localhost:5173 in development'
  );
  assert(
    isOriginAllowed('http://localhost:3000', false, prodAllowlist) === true,
    'ALLOWED: http://localhost:3000 in development'
  );
  assert(
    isOriginAllowed('https://attacker.com', false, prodAllowlist) === false,
    'REJECTED: https://attacker.com in development'
  );

  // --- INTEGRATION TESTS (HTTP SERVER) ---
  console.log(`\n${BOLD}2. Full HTTP Express Middleware Integration Tests (Production Mode):${RESET}`);

  const app = express();
  const testProdOrigins = parseAllowedOrigins('https://your-production-domain.com');

  // Exact CORS middleware replica
  const corsMiddleware = cors((req, callback) => {
    const origin = req.headers.origin;
    if (!origin) {
      return callback(null, {
        origin: false,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
      });
    }

    const originAllowed = isOriginAllowed(origin, true, testProdOrigins);
    if (originAllowed) {
      callback(null, {
        origin: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
      });
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  });

  app.use(corsMiddleware);

  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // Centralized error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err.message === 'Not allowed by CORS policy') {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Cross-origin request blocked by policy.',
      });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  });

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address() as any;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  async function testHttpOrigin(originHeader: string | undefined, method: string = 'GET'): Promise<{ status: number; allowOriginHeader?: string }> {
    return new Promise((resolve, reject) => {
      const headers: Record<string, string> = {};
      if (originHeader !== undefined) {
        headers['Origin'] = originHeader;
      }
      if (method === 'OPTIONS') {
        headers['Access-Control-Request-Method'] = 'GET';
      }

      const req = http.request(
        `${baseUrl}/api/health`,
        { method, headers },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            resolve({
              status: res.statusCode || 0,
              allowOriginHeader: res.headers['access-control-allow-origin'] as string | undefined,
            });
          });
        }
      );
      req.on('error', reject);
      req.end();
    });
  }

  try {
    // 1. Legitimate Production Origin
    const resLegit = await testHttpOrigin('https://your-production-domain.com');
    assert(resLegit.status === 200, 'HTTP GET from https://your-production-domain.com returns 200 OK');
    assert(
      resLegit.allowOriginHeader === 'https://your-production-domain.com',
      'HTTP response sets Access-Control-Allow-Origin: https://your-production-domain.com'
    );

    // Preflight OPTIONS for legitimate origin
    const resPreflight = await testHttpOrigin('https://your-production-domain.com', 'OPTIONS');
    assert(resPreflight.status === 204, 'HTTP preflight OPTIONS from https://your-production-domain.com returns 204 No Content');
    assert(
      resPreflight.allowOriginHeader === 'https://your-production-domain.com',
      'Preflight sets Access-Control-Allow-Origin: https://your-production-domain.com'
    );

    // 2. Untrusted Attacker Origin
    const resAttacker = await testHttpOrigin('https://attacker.com');
    assert(resAttacker.status === 403, 'HTTP GET from https://attacker.com returns 403 Forbidden');
    assert(!resAttacker.allowOriginHeader, 'HTTP response omits Access-Control-Allow-Origin for attacker.com');

    // 3. Arbitrary Run App Origin
    const resEvilRun = await testHttpOrigin('https://evil.run.app');
    assert(resEvilRun.status === 403, 'HTTP GET from https://evil.run.app returns 403 Forbidden');

    // 4. Arbitrary Firebase App Origin
    const resFirebase = await testHttpOrigin('https://attacker.firebaseapp.com');
    assert(resFirebase.status === 403, 'HTTP GET from https://attacker.firebaseapp.com returns 403 Forbidden');

    // 5. Spoofed Prefix Origin
    const resPrefix = await testHttpOrigin('https://malicious-your-production-domain.com');
    assert(resPrefix.status === 403, 'HTTP GET from https://malicious-your-production-domain.com returns 403 Forbidden');

    // 6. Localhost in Production Mode
    const resLocalhost = await testHttpOrigin('http://localhost:5173');
    assert(resLocalhost.status === 403, 'HTTP GET from http://localhost:5173 returns 403 Forbidden in production');

    // 7. Spoofed Subdomain Origin
    const resSubdomain = await testHttpOrigin('https://your-production-domain.com.attacker.com');
    assert(resSubdomain.status === 403, 'HTTP GET from https://your-production-domain.com.attacker.com returns 403 Forbidden');

    // 8. Null Origin
    const resNull = await testHttpOrigin('null');
    assert(resNull.status === 403, 'HTTP GET with Origin: null returns 403 Forbidden');

    // 9. Non-CORS / Direct Server Request (no Origin header)
    const resNoOrigin = await testHttpOrigin(undefined);
    assert(resNoOrigin.status === 200, 'Direct request without Origin header succeeds with 200 OK');
    assert(!resNoOrigin.allowOriginHeader, 'Non-CORS request does not reflect Origin header');

  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }

  console.log(`\n${GREEN}${BOLD}✓ ALL ${passedTests}/${totalTests} CORS SECURITY TESTS PASSED SUCCESSFULLY!${RESET}\n`);
}

runTests().catch((err) => {
  console.error(`\n${RED}${BOLD}Test run failed:${RESET}`, err);
  process.exit(1);
});
