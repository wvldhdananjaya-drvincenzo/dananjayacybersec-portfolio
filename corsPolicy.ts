import cors from 'cors';

/**
 * Safely parses allowed origin configuration from ALLOWED_ORIGIN or ALLOWED_ORIGINS.
 * - Prioritizes process.env.ALLOWED_ORIGIN (trusted frontend URL) or ALLOWED_ORIGINS
 * - Splits comma-separated values if multiple
 * - Trims whitespace
 * - STRICTLY DISABLES wildcard "*" origins (ignores and rejects them)
 * - Exact string matching only (no regex, no substring matching)
 */
export function parseAllowedOrigins(envValue?: string): Set<string> {
  // Use passed value or fallback to process.env.ALLOWED_ORIGIN or process.env.ALLOWED_ORIGINS
  const rawValue =
    envValue !== undefined
      ? envValue
      : process.env.ALLOWED_ORIGIN || process.env.ALLOWED_ORIGINS;

  if (!rawValue || typeof rawValue !== 'string') {
    return new Set<string>();
  }

  const origins = rawValue
    .split(',')
    .map((origin) => origin.trim())
    // Strictly filter out empty strings, wildcards "*", and entries containing "*"
    .filter((origin) => origin.length > 0 && origin !== '*' && !origin.includes('*'));

  return new Set<string>(origins);
}

/**
 * Local development origins permitted ONLY when NODE_ENV !== "production".
 * In production mode, these are strictly barred unless explicitly set in ALLOWED_ORIGINS.
 */
export const DEV_LOCALHOST_ORIGINS = new Set<string>([
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
]);

/**
 * Validates whether an incoming Origin is permitted under the centralized CORS policy.
 *
 * Enforces:
 * - Rejects null, empty, or undefined origins
 * - Rejects arbitrary *.run.app domains
 * - Rejects arbitrary *.firebaseapp.com domains
 * - Rejects arbitrary subdomains or prefix-spoofed domains
 * - In production: EXACT match against ALLOWED_ORIGINS only
 * - In development: allows designated local development origins and same-host preview
 */
export function isOriginAllowed(
  origin: string | undefined,
  isProd: boolean,
  allowedOrigins: Set<string>,
  host?: string,
  forwardedHost?: string
): boolean {
  // Reject missing, empty, or string "null" origins
  if (!origin || origin === 'null' || origin.trim().length === 0) {
    return false;
  }

  // 1. Exact string match against explicitly configured production allowlist
  if (allowedOrigins.has(origin)) {
    return true;
  }

  // 2. Production mode STRICTLY rejects everything not in the allowlist
  // (Rejects arbitrary *.run.app, *.firebaseapp.com, subdomains, and localhost)
  if (isProd) {
    return false;
  }

  // 3. Development mode only: allow designated local development origins
  if (DEV_LOCALHOST_ORIGINS.has(origin)) {
    return true;
  }

  // 4. Development mode only: allow same-origin requests in container preview environments
  const hostsToCheck = [host, forwardedHost].filter(Boolean) as string[];
  for (const h of hostsToCheck) {
    if (origin === `https://${h}` || origin === `http://${h}`) {
      return true;
    }
  }

  return false;
}
