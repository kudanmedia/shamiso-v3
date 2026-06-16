# Middleware Architecture (Phase 1)

## Decision

Phase 1 uses **Appwrite** as the middleware and cache layer. Convex remains a possible Phase 2 migration path.

## Core Components

- `src/lib/server/cache.ts`: shared cache helper (`getCached`, `setCached`, `invalidate`)
- `src/lib/server/featurefm.ts`: Feature.fm API client with cache integration
- `src/lib/server/roex.ts`: RoEx API client with cache integration
- `src/lib/server/partner-links.ts`: Appwrite-backed partner link resolution with static fallback
- `functions/refresh-partner-cache/`: scheduled cleanup for expired cache rows

## Appwrite Collections

- `api_cache`
  - `cache_key` (string, indexed)
  - `payload` (string JSON)
  - `expires_at` (datetime)
  - `partner` (string)
  - `user_id` (string)
- `partner_links`
  - `slug` (string, unique index)
  - `url` (string)
  - `utm_params` (string, optional)
  - `active` (boolean)
  - `updated_at` (datetime)

## TTL Strategy

- Feature.fm responses: 15 minutes (900 seconds)
- RoEx responses: 15 minutes (900 seconds)
- Expired entries are lazily deleted on read and proactively cleaned by `refresh-partner-cache`.

## Phase 2 Migration Path (Optional)

If Convex is introduced later:

1. Mirror `api_cache` and `partner_links` in Convex tables.
2. Keep Appwrite as source of truth while dual-writing for one release cycle.
3. Cut over read paths (`cache.ts`, `partner-links.ts`) behind feature flags.
4. Remove Appwrite cache writes after stability validation.
