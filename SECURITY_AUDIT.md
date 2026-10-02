# Comprehensive Security Hardening Audit Report

**Application**: Dananjaya Wickramarachchi Cybersecurity Portfolio
**Stack**: React 18, Vite, Express (Node.js), Firebase Security Architecture
**Date**: September 2026
**Status**: Fully Hardened (Production-Grade)

---

## Executive Summary

A comprehensive, defense-in-depth security audit and hardening implementation was conducted across both the client-side single page application (SPA) and server-side runtime infrastructure. All security controls operate strictly server-side, eliminating client-side reliance for authoritative state, input validation, rate limiting, and access control.

---

## Implemented Security Controls

### 1. Content Security Policy (CSP)
- **Elimination of `unsafe-eval`**: The unsafe JavaScript evaluation directive has been completely removed across all runtime environments.
- **Strict script-src**: In production, `script-src` is locked down strictly to `'self'`.
- **Targeted Origins**: Explicit origin allowlists for fonts (`fonts.googleapis.com`, `fonts.gstatic.com`), images (`res.cloudinary.com`, `images.unsplash.com`), and backend services (`*.googleapis.com`, `*.firebaseio.com`).
- **Defensive Directives**:
  - `object-src 'none'` (mitigates Flash/plugin attacks)
  - `base-uri 'self'` (prevents `<base>` tag hijacking)
  - `form-action 'self' https://mail.google.com` (restricts destination endpoints for forms)
  - `frame-ancestors 'self' https://*.google.com https://*.run.app` (restricts iframe embedding to authorized platform parents)

### 2. HTTP Security Headers
- **Strict-Transport-Security (HSTS)**: Configured with `max-age=31536000; includeSubDomains` in production.
- **X-Content-Type-Options**: Set to `nosniff` to eliminate MIME-confusion attacks.
- **Referrer-Policy**: Set to `strict-origin-when-cross-origin`.
- **Permissions-Policy**: Proactively disables unused browser sensors: `camera=(), microphone=(), geolocation=(), payment=(), usb=()`.
- **Cross-Origin Policies**: `Cross-Origin-Opener-Policy: same-origin-allow-popups` and `Cross-Origin-Resource-Policy: same-origin`.
- **Cache-Control**: Sensitive `/api/*` responses explicitly emit `no-store, no-cache, must-revalidate, proxy-revalidate`.
- **X-Frame-Options**: Explicitly set to `SAMEORIGIN`.

### 3. API Hardening & Telemetry Protection
- **Public Health (`/api/health`)**: Returns only operational status (`status: "ok"`) and timestamp. No internal telemetry or system details.
- **Security Telemetry (`/api/security/health`)**: Restricted to authenticated administrators via `Authorization: Bearer <ADMIN_API_KEY>` or `X-Admin-Key`. Unauthenticated requests receive `401 Unauthorized`.
- **Zero Information Leakage**: No raw IP addresses, database schemas, internal error traces, or probe details are exposed to the public.

### 4. Rate Limiting Architecture
- Integrated industry-standard `express-rate-limit` across multiple tiers:
  - **Global Limiter**: 500 requests per 15 minutes per IP.
  - **API Limiter**: 60 requests per minute on `/api/*`.
  - **Contact Submission Limiter**: Strict limit of 5 requests per 15 minutes per IP.
  - **Endorsements Limiter**: 20 requests per 15 minutes per IP.
  - **Telemetry Endpoint Limiter**: 15 requests per 15 minutes per IP.
- Proper standard headers (`RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `Retry-After`).
- `trust proxy` set to `1` for containerized and reverse-proxy deployment environments.

### 5. Input Validation & Defense-in-Depth
- **Strict Zod Schemas**: Every API payload is validated against strict TypeScript Zod schemas with unexpected property rejection (`.strict()`).
- **Prototype Pollution Guard**: Middleware strips recursive `__proto__`, `constructor`, and `prototype` property tampering.
- **Payload Size Ceilings**: JSON and URL-encoded request bodies are capped at 64KB.
- **URL Encoding Safety**: Catch-all URI decoder detects and blocks malformed percent-encoding attacks before routing.
- **Path Traversal & Reconnaissance Filter**: Rejects path traversal (`../`, `..\`), sensitive config probes (`.env`, `.git`, `.aws`), and administrative scanners (`/wp-admin`, `/phpmyadmin`).

### 6. Contact Form & Anti-Bot Protection
- **Honeypot Shield**: Hidden honeypot input detects and silently discards automated spam bots without exposing defense logic.
- **Accurate Phrasing**: Removed exaggerated security claims ("RSA-4096 stream", "zero-trust handshake") in favor of truthful, accurate system logs.
- **Safe Popups**: Contact links utilize `noopener,noreferrer` for all window opening handlers.

### 7. LocalStorage Audit & Authoritative Backend Counters
- **Server-Authoritative Project Votes**: Migrated endorsement counts from client `localStorage` to `/api/projects/:id/stats` and `/api/projects/:id/endorse`.
- **Abuse Prevention**: Hashed IP salts prevent repeated click spamming.
- **Input Validation on Client Storage**: `App.tsx` defensively validates all parsed items loaded from `visatravels_bookings`, discarding any malformed or tampered entries.

### 8. Dynamic HTML & SVG XSS Hardening
- **Refactored Certificate Viewer**: In `CertificateImageModal.tsx`, replaced insecure `window.open` + `document.write` with safe DOM construction methods (`createElement`, `textContent`, `src`).
- **XML/SVG Injection Prevention**: All dynamic values interpolated into the SVG certificate (`credId`, `issuerName`, `certTitle`, `signatory`, `issueDate`) are strictly XML-escaped.

### 9. Firebase Security Rules & Configuration
- **Default-Deny Firestore Rules** (`firestore.rules`): Locks down all collections by default (`allow read, write: if false`), permitting authenticated user-scoped writes only.
- **Default-Deny Cloud Storage Rules** (`storage.rules`): Locks down all bucket paths by default.
- **Environment Separation**: `src/lib/firebase.ts` validates required configuration and throws clear descriptive errors if credentials are missing, completely eliminating mock-key fallbacks.

### 10. Centralized Error Handling & Structured Logging
- **Centralized Express Error Handler**: Intercepts syntax errors, payload limits, CORS rejections, and server errors. Never outputs stack traces, database details, or filesystem paths to clients.
- **Structured Security Event Logging**: Generates sanitized JSON log events with unique `X-Request-Id` tracking and CRLF log injection prevention.
