# Security Policy

## Reporting Security Vulnerabilities

We take the security of this portfolio and associated applications seriously. If you discover a security vulnerability, please report it responsibly so we can resolve it promptly.

### Contact

Please report any suspected vulnerabilities by emailing:
**dananjayawvldh@gmail.com**

Please include in your report:
- A detailed description of the vulnerability.
- Steps to reproduce the issue (proof of concept, HTTP request payloads, or reproduction script).
- The potential impact and attack scenario.
- Any suggested remediations if applicable.

### Response SLA & Process

1. **Initial Response**: Within 48 hours of receiving the vulnerability report.
2. **Triage & Verification**: Within 5 business days, confirming severity and validity.
3. **Remediation & Patching**: Critical issues are addressed within 7 to 14 days.
4. **Coordinated Disclosure**: We ask researchers to follow coordinated vulnerability disclosure guidelines and refrain from public disclosure until an official fix is deployed.

### Scope

- This repository and the deployed web application (`/api/*` endpoints, frontend rendering, and asset delivery).
- Authentication, input validation, and authorization boundaries.

### Out of Scope

- Denial-of-Service (DoS / DDoS) attacks testing volumetric flooding.
- Social engineering or phishing targeting website contributors.
- Issues related to third-party services (e.g., GitHub, Cloudflare, Gmail) outside our application control.

---

## Production Cross-Origin Resource Sharing (CORS) Policy

Production CORS uses an explicit exact-origin allowlist configured via the `ALLOWED_ORIGINS` environment variable.
- Only exact string-matched origins (e.g., `https://your-production-domain.com`) are permitted.
- Dynamic suffix matching, substring checks, wildcard regex patterns, and broad domains (such as `*.run.app` or `*.firebaseapp.com`) are strictly rejected.
- Localhost origins are only permitted in local development environments (`NODE_ENV !== "production"`). In production, localhost origins are rejected.
- Credentials (`Access-Control-Allow-Credentials`) are disabled (`false`).
- All unauthorized cross-origin requests are rejected with `403 Forbidden` across every API endpoint.
