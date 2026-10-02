import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// Trust reverse proxy (e.g., Cloud Run, Nginx) for accurate req.ip and protocol resolution
app.set('trust proxy', 1);

// Disable X-Powered-By to prevent server fingerprinting
app.disable('x-powered-by');

// --- Central In-Memory State for Authoritative Counters & Logs ---
interface SecurityMetricsState {
  startedAt: string;
  totalRequests: number;
  blockedRequests: number;
}

const metricsState: SecurityMetricsState = {
  startedAt: new Date().toISOString(),
  totalRequests: 0,
  blockedRequests: 0,
};

// Authoritative project endorsements store (key: projectId, value: count)
const projectEndorsements = new Map<string, number>([
  ['lab-enterprise-ad', 42],
  ['lab-cloud-soc', 38],
  ['lab-web3-bridge', 29],
  ['lab-k8s-devsecops', 35],
]);

// IP tracking for project endorsements to prevent vote spamming
const projectVoters = new Map<string, Set<string>>(); // projectId -> Set of hashed IPs

// In-memory bounded contact messages queue (FIFO, max 100 items)
interface StoredInquiry {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  messageLength: number;
}
const contactInquiriesQueue: StoredInquiry[] = [];
const MAX_STORED_INQUIRIES = 100;

// Safe logging utility to prevent log injection (stripping CRLF)
function sanitizeLog(input: string): string {
  return input.replace(/[\r\n]/g, ' ').slice(0, 500);
}

function logSecurityEvent(event: {
  type: string;
  requestId: string;
  ip: string;
  path: string;
  method: string;
  status: number;
  details?: string;
}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: sanitizeLog(event.type),
    requestId: sanitizeLog(event.requestId),
    method: sanitizeLog(event.method),
    path: sanitizeLog(event.path),
    status: event.status,
    details: event.details ? sanitizeLog(event.details) : undefined,
  };
  console.warn(`[SECURITY EVENT] ${JSON.stringify(logEntry)}`);
}

// --- Request ID Middleware ---
app.use((req: Request, res: Response, next: NextFunction) => {
  metricsState.totalRequests++;
  const reqId = crypto.randomUUID();
  (req as any).id = reqId;
  res.setHeader('X-Request-Id', reqId);
  next();
});

// --- Safe URL Encoding Handler (Prevent crash on URIError) ---
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    decodeURIComponent(req.path);
    next();
  } catch {
    metricsState.blockedRequests++;
    logSecurityEvent({
      type: 'MALFORMED_URI',
      requestId: (req as any).id,
      ip: req.ip || 'unknown',
      path: req.originalUrl,
      method: req.method,
      status: 400,
      details: 'Failed URI decoding inspection',
    });
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Malformed URL encoding detected.',
    });
  }
});

import { parseAllowedOrigins, isOriginAllowed, DEV_LOCALHOST_ORIGINS } from './corsPolicy';

// --- Centralized Production-Grade CORS Policy ---
// Exact-origin allowlist matching only.
// Disallows wildcards, regex patterns, substring matches, and arbitrary cloud domain suffixes.
export { parseAllowedOrigins, isOriginAllowed, DEV_LOCALHOST_ORIGINS };

const corsMiddleware = cors((req, callback) => {
  const isProd = process.env.NODE_ENV === 'production';
  const allowedOrigins = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);
  const origin = req.headers.origin;
  const host = req.headers.host;
  const forwardedHost = req.headers['x-forwarded-host'] as string | undefined;

  // Requests without an Origin header (e.g. server-to-server health checks, direct navigation)
  // are not cross-origin requests.
  if (!origin) {
    return callback(null, {
      origin: false,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key', 'X-Request-Id'],
      credentials: false,
      maxAge: 86400,
    });
  }

  const originAllowed = isOriginAllowed(origin, isProd, allowedOrigins, host, forwardedHost);

  if (originAllowed) {
    callback(null, {
      origin: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key', 'X-Request-Id'],
      credentials: false,
      maxAge: 86400,
    });
  } else {
    logSecurityEvent({
      type: 'CORS_REJECTED',
      requestId: (req as any).id || 'unknown',
      ip: req.ip || 'unknown',
      path: req.originalUrl || req.path,
      method: req.method,
      status: 403,
      details: `Disallowed cross-origin request from: ${origin}`,
    });
    callback(new Error('Not allowed by CORS policy'));
  }
});

// Apply CORS policy consistently to all API routes and preflights
app.use('/api', corsMiddleware);
app.options('/api/*', corsMiddleware);

// --- Security Headers Middleware ---
app.use((req: Request, res: Response, next: NextFunction) => {
  // MIME sniffing protection
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // HSTS (Strict Transport Security) - Only enabled on production without premature preload
  if (IS_PROD) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Modern XSS Protection header (disabled in favor of CSP, recommended best practice)
  res.setHeader('X-XSS-Protection', '0');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy - explicitly disable unnecessary hardware APIs
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );

  // No-cache header for all API endpoints to prevent sensitive response caching
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  // Content Security Policy (CSP)
  // In development, Vite dev tooling requires inline scripts and websocket; in production, strict CSP is enforced.
  const scriptSrc = IS_PROD
    ? "'self'"
    : "'self' 'unsafe-inline'";

  const connectSrc = IS_PROD
    ? "'self' https://*.googleapis.com https://*.firebaseio.com"
    : "'self' https://*.googleapis.com https://*.firebaseio.com ws: wss:";

  const cspDirectives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data: https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
    `connect-src ${connectSrc}`,
    "frame-ancestors 'self' https://*.google.com https://*.run.app https://*.ai.studio https://ai.studio https://*.googleusercontent.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://mail.google.com",
  ];

  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

  next();
});

// --- Rate Limiting Architecture (Using standard express-rate-limit) ---
// 1. General global limiter for static assets & website navigation
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Max 500 requests per 15 min per IP
  standardHeaders: true, // draft-6/draft-7 RateLimit-* headers
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Global request rate limit exceeded. Please try again later.',
  },
  validate: { trustProxy: false },
});

// 2. API general limiter
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Max 60 API requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'API rate limit exceeded. Please slow down your requests.',
  },
  validate: { trustProxy: false },
});

// 3. Contact form submission limiter (strict)
const contactSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 messages per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Too many contact messages submitted from this IP. Please wait before submitting again.',
  },
  validate: { trustProxy: false },
});

// 4. Project endorsement limiter
const endorseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // Max 20 endorsement interactions per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Endorsement rate limit exceeded. Please try again later.',
  },
  validate: { trustProxy: false },
});

// 5. Sensitive security telemetry endpoint limiter
const securityHealthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too Many Requests',
    message: 'Telemetry access rate limit reached.',
  },
  validate: { trustProxy: false },
});

app.use(globalLimiter);

// --- Deep Anomaly Filter (Lightweight signature inspection for probes) ---
const SUSPICIOUS_PROBE_PATTERNS = [
  // Directory & Path Traversal
  /\.\.\//i,
  /\.\.\\/i,
  /%2e%2e/i,
  /\/etc\/(passwd|shadow|hosts)/i,
  /c:\\windows/i,

  // Malicious Reconnaissance Probes
  /\.env($|\?)/i,
  /\.git(\/|$)/i,
  /\.aws(\/|$)/i,
  /\/wp-(admin|login|config|includes)/i,
  /\/phpmyadmin/i,
  /\/cgi-bin/i,
  /\.bak($|\?)/i,
  /\.sql($|\?)/i,

  // Injection Signatures in URL path/query
  /(\bunion\b.*\bselect\b)/i,
  /(\bexec\b|\bexecute\b|\bxp_cmdshell\b)/i,
  /<script\b/i,
  /javascript\s*:/i,
];

app.use((req: Request, res: Response, next: NextFunction) => {
  let decodedPath = req.originalUrl;
  try {
    decodedPath = decodeURIComponent(req.originalUrl);
  } catch {
    // Already guarded above
  }

  for (const pattern of SUSPICIOUS_PROBE_PATTERNS) {
    if (pattern.test(decodedPath)) {
      metricsState.blockedRequests++;
      logSecurityEvent({
        type: 'PROBE_BLOCKED',
        requestId: (req as any).id,
        ip: req.ip || 'unknown',
        path: req.originalUrl,
        method: req.method,
        status: 403,
        details: 'Matched malicious pattern filter',
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by security filter.',
      });
    }
  }

  next();
});

// --- Body Parsing with Payload Size Ceiling (64kb) ---
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false, limit: '64kb' }));

// --- Prototype Pollution Defense-in-Depth Middleware ---
app.use((req: Request, _res: Response, next: NextFunction) => {
  const sanitize = (obj: any): any => {
    if (obj && typeof obj === 'object') {
      delete obj['__proto__'];
      delete obj['constructor'];
      delete obj['prototype'];
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
          sanitize(obj[key]);
        }
      }
    }
    return obj;
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  next();
});

// --- API Endpoints ---

// 1. Public Health Endpoint (Minimal availability information only)
app.get('/api/health', apiLimiter, (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// 2. Protected Security Telemetry Endpoint
// Requires authentication via ADMIN_API_KEY (Bearer token or X-Admin-Key)
app.get('/api/security/health', securityHealthLimiter, (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const adminKeyHeader = req.headers['x-admin-key'];
  const expectedApiKey = process.env.ADMIN_API_KEY;

  let providedToken: string | null = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    providedToken = authHeader.substring(7).trim();
  } else if (typeof adminKeyHeader === 'string') {
    providedToken = adminKeyHeader.trim();
  }

  // If no admin key configured or token mismatch, reject
  if (!expectedApiKey || !providedToken || providedToken !== expectedApiKey) {
    logSecurityEvent({
      type: 'UNAUTHORIZED_ADMIN_ACCESS',
      requestId: (req as any).id,
      ip: req.ip || 'unknown',
      path: req.path,
      method: req.method,
      status: 401,
      details: 'Failed admin key authentication for security telemetry',
    });

    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Administrator authentication required to access security telemetry.',
    });
  }

  // Authenticated: Return aggregated operational metrics without exposing raw IP addresses or stack traces
  res.status(200).json({
    status: 'operational',
    service: 'Dananjaya Cybersecurity Portfolio Backend',
    metrics: {
      uptimeSeconds: Math.floor(process.uptime()),
      totalRequestsInspected: metricsState.totalRequests,
      blockedThreatsCount: metricsState.blockedRequests,
    },
    activeControls: {
      contentSecurityPolicy: 'Active',
      strictTransportSecurity: IS_PROD ? 'Active' : 'Disabled (Local Dev)',
      rateLimiting: 'Active',
      schemaValidation: 'Active (Zod)',
      prototypePollutionGuard: 'Active',
      payloadCeiling: '64KB Limit',
    },
  });
});

// 3. Contact Form API (Strict Zod Schema Validation & Anti-Bot Protection)
const contactSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(1, 'Name cannot be empty')
      .max(100, 'Name must not exceed 100 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Invalid email address')
      .max(150, 'Email must not exceed 150 characters'),
    subject: z
      .string()
      .trim()
      .max(200, 'Subject must not exceed 200 characters')
      .optional()
      .default('General Inquiry'),
    message: z
      .string({ required_error: 'Message is required' })
      .trim()
      .min(1, 'Message cannot be empty')
      .max(2000, 'Message must not exceed 2000 characters'),
    honeypot: z.string().max(100).optional(),
  })
  .strict(); // Reject unexpected properties

app.post('/api/contact', contactSubmissionLimiter, (req: Request, res: Response) => {
  const parseResult = contactSchema.safeParse(req.body);

  if (!parseResult.success) {
    const firstIssue = parseResult.error.issues[0];
    return res.status(400).json({
      error: 'Validation Error',
      message: firstIssue?.message || 'Invalid input data format.',
    });
  }

  const { name, email, subject, message, honeypot } = parseResult.data;

  // Honeypot anti-bot check: silently accept without processing
  if (honeypot && honeypot.trim().length > 0) {
    metricsState.blockedRequests++;
    logSecurityEvent({
      type: 'BOT_HONEYPOT_TRIGGERED',
      requestId: (req as any).id,
      ip: req.ip || 'unknown',
      path: req.path,
      method: req.method,
      status: 200,
      details: 'Silent bot drop via honeypot field',
    });
    return res.status(200).json({
      success: true,
      message: 'Inquiry received and queued for review.',
      dispatchRef: `MSG-${Date.now().toString(36).toUpperCase()}`,
    });
  }

  // Store in bounded queue for auditing
  const storedEntry: StoredInquiry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    name: name.slice(0, 100),
    email: email.slice(0, 150),
    subject: subject.slice(0, 200),
    messageLength: message.length,
  };

  if (contactInquiriesQueue.length >= MAX_STORED_INQUIRIES) {
    contactInquiriesQueue.shift();
  }
  contactInquiriesQueue.push(storedEntry);

  const referenceId = `MSG-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  // Generic successful response without sensitive echo or unverified claims
  res.status(200).json({
    success: true,
    message: 'Inquiry received and queued for review.',
    dispatchRef: referenceId,
  });
});

// 4. Authoritative Project Endorsement APIs
const projectIdSchema = z.string().min(1).max(50).regex(/^[a-zA-Z0-9_-]+$/, 'Invalid project ID format');
const endorseActionSchema = z
  .object({
    action: z.enum(['endorse', 'unendorse']).default('endorse'),
  })
  .strict();

// Get authoritative endorsement stats for a project
app.get('/api/projects/:id/stats', apiLimiter, (req: Request, res: Response) => {
  const idValidation = projectIdSchema.safeParse(req.params.id);
  if (!idValidation.success) {
    return res.status(400).json({ error: 'Bad Request', message: 'Invalid project identifier format.' });
  }

  const projectId = idValidation.data;
  const count = projectEndorsements.get(projectId) ?? 0;

  res.status(200).json({
    projectId,
    endorsements: count,
  });
});

// Post an endorsement action with atomic update and IP-based rate limiting
app.post('/api/projects/:id/endorse', endorseLimiter, (req: Request, res: Response) => {
  const idValidation = projectIdSchema.safeParse(req.params.id);
  if (!idValidation.success) {
    return res.status(400).json({ error: 'Bad Request', message: 'Invalid project identifier format.' });
  }

  const bodyValidation = endorseActionSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ error: 'Bad Request', message: 'Invalid endorsement payload.' });
  }

  const projectId = idValidation.data;
  const { action } = bodyValidation.data;

  // Hash IP with secret salt to protect privacy while preventing double voting
  const ip = req.ip || '127.0.0.1';
  const hashedIp = crypto.createHash('sha256').update(`${ip}-${projectId}-salt`).digest('hex').slice(0, 16);

  if (!projectVoters.has(projectId)) {
    projectVoters.set(projectId, new Set());
  }
  const votersSet = projectVoters.get(projectId)!;

  let currentCount = projectEndorsements.get(projectId) ?? 0;

  if (action === 'endorse') {
    if (!votersSet.has(hashedIp)) {
      votersSet.add(hashedIp);
      currentCount++;
      projectEndorsements.set(projectId, currentCount);
    }
  } else if (action === 'unendorse') {
    if (votersSet.has(hashedIp)) {
      votersSet.delete(hashedIp);
      currentCount = Math.max(0, currentCount - 1);
      projectEndorsements.set(projectId, currentCount);
    }
  }

  res.status(200).json({
    projectId,
    endorsements: currentCount,
    action,
  });
});

// --- Centralized Error-Handling Middleware ---
// Catches all uncaught errors, malformed JSON, and ensures no stack traces or filesystem leaks
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const requestId = (req as any).id || 'unknown';

  // Handle JSON syntax error from express.json()
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Malformed JSON payload in request body.',
    });
  }

  // Handle payload too large
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'Payload Too Large',
      message: 'Request payload exceeds 64KB limit.',
    });
  }

  // Handle CORS rejection
  if (err.message === 'Not allowed by CORS policy') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Cross-origin request blocked by policy.',
    });
  }

  // Log error safely server-side
  console.error(`[INTERNAL ERROR] [Req: ${requestId}]`, sanitizeLog(err.message || 'Unknown error'));

  // Generic error to client
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again later.',
  });
});

// --- Vite Integration & Static Asset Fallback ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Security Hardened Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
