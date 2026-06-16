# Middleware Architecture (Phase 1)

## Decision

Phase 1 uses **Appwrite** as the middleware and cache layer. Convex remains a possible Phase 2 migration path.

**Canonical schema source:** `scripts/setup-appwrite.js` — run this to provision collections. `appwrite.config.json` is a partial export and may lag behind the setup script.

**Database ID:** `DATABASE_ID` / `NEXT_PUBLIC_DATABASE_ID` in `.env` (must match).

**Verify IDs:** `node scripts/verify-appwrite-ids.js` — checks database, bucket, and function IDs against the live project.

## Core Components

- `src/lib/server/cache.ts`: shared cache helper (`getCached`, `setCached`, `invalidate`)
- `src/lib/server/featurefm.ts`: Feature.fm API client with cache integration
- `src/lib/server/roex.ts`: RoEx API client with cache integration
- `src/lib/server/partner-links.ts`: Appwrite-backed partner link resolution with static fallback
- `src/lib/server/site-settings.ts`: operational URLs, integration config, hero metric fallback
- `src/lib/server/pricing.ts`: pricing plans and comparison tables with JSON seed fallback
- `src/lib/server/news.ts`: news articles for public `/news`
- `src/lib/server/metrics.ts`: hero recaptured amount (ledger aggregate → site setting fallback)
- `src/lib/server/leads.ts`: funding lead reads for admin inbox
- `functions/refresh-partner-cache/`: scheduled cleanup for expired cache rows

## Public API Routes

| Route | Purpose |
|-------|---------|
| `GET /api/partner-links` | Partner URLs (60s cache) |
| `GET /api/site-settings` | Public settings (WhatsApp URL, hero metric display) |
| `GET /api/pricing` | Pricing plans + comparison tables |
| `GET /api/news` | Published news articles |
| `GET /api/metrics/hero` | Hero recaptured amount |
| `GET /api/songtools/jwt` | Authenticated Song Tools JWT + widget config |

## Appwrite Collections

### Core / payouts
- `profiles` — user profiles (Too Lost email, Verto payout fields)
- `royalty_batches` — batch metadata
- `ledger_entries` — payout ledger rows
- `payouts` — payout records (in config; add via Appwrite console if missing)

### Partner / cache
- `api_cache` — TTL cache for Feature.fm / RoEx API responses
- `partner_links` — admin-managed partner URLs (`slug`, `url`, `utm_params`, `active`, `updated_at`)
- `featurefm_campaigns` — seed-backed Feature.fm fallback
- `featurefm_smartlinks` — seed-backed smart link fallback
- `roex_jobs` — seed-backed RoEx job fallback

### Site config / CMS
- `site_settings` — operational URLs, integration keys, metrics (`key`, `value`, `category`, `updated_at`)
- `news_articles` — news CMS (`title`, `summary`, `content`, `category`, `image_url`, `slug`, `published_at`)
- `pricing_plans` — subscription tier cards (`slug`, `name`, `audience`, `features` JSON, etc.)
- `pricing_comparison_rows` — benefit comparison tables

### Leads
- `smd_funding_leads` — funding form submissions (`artist_name`, `email`, `spotify_url`, `monthly_revenue`)

### Storage
- `royalty_csvs` — royalty CSV uploads bucket

## Seed Scripts

```bash
node scripts/verify-appwrite-ids.js   # confirm .env IDs match live project
node scripts/setup-appwrite.js      # create collections
node scripts/setup-missing-collections.js  # new collections only (if full setup fails)
node scripts/seed-partner-mock-data.js  # seed partner links, site settings, news, pricing, mock partner data
```

Seed manifests live in `src/data/*.json` and are shared with TypeScript fallbacks.

## TTL Strategy

- Feature.fm responses: 15 minutes (900 seconds)
- RoEx responses: 15 minutes (900 seconds)
- Public API routes: 60s CDN cache with stale-while-revalidate
- Expired cache entries are lazily deleted on read and proactively cleaned by `refresh-partner-cache`.

## Admin UI

| Path | Manages |
|------|---------|
| `/admin/partners` | `partner_links` |
| `/admin/settings` | `site_settings` |
| `/admin/pricing` | `pricing_plans`, `pricing_comparison_rows` |
| `/admin/news` | `news_articles` |
| `/admin/leads` | `smd_funding_leads` inbox |

## Phase 2 Migration Path (Optional)

If Convex is introduced later:

1. Mirror Appwrite collections in Convex tables.
2. Keep Appwrite as source of truth while dual-writing for one release cycle.
3. Cut over read paths behind feature flags.
4. Remove Appwrite cache writes after stability validation.
