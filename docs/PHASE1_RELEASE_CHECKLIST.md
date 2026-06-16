# Phase 1 Release Checklist

## Staging UAT

- [ ] Login, signup, onboarding flow validates end to end.
- [ ] Dashboard loads partner cards and no unauthorized redirects occur.
- [ ] Feature.fm widget displays analytics in `/dashboard` and `/dashboard/marketing`.
- [ ] RoEx widget displays mastering status in `/dashboard` and `/dashboard/marketing`.
- [ ] Rotor and Symphony service pages load and redirect correctly for authenticated users.
- [ ] Payouts page only shows rows where `userId` matches current user.

## API and Security Validation

- [ ] `/api/featurefm/*` requires valid `x-appwrite-jwt` header.
- [ ] `/api/roex/*` requires valid `x-appwrite-jwt` header except webhook.
- [ ] `ROEX_WEBHOOK_SECRET` validation confirmed in staging logs.
- [ ] Partner tokens and API keys are server-only and not exposed in browser bundles.

## SEO Validation

- [ ] `sitemap.xml` is generated.
- [ ] `robots.txt` disallows `/dashboard`, `/admin`, `/api`.
- [ ] Open Graph image route renders successfully.
- [ ] Canonical metadata resolves for landing pages.
- [ ] JSON-LD appears on home and new service pages.

## Deploy/Rollback

- [ ] Required env vars populated in staging and production.
- [ ] Build and test pipelines are green.
- [ ] Release notes include Feature.fm, RoEx, Rotor, Symphony, middleware updates.
- [ ] Rollback step: redeploy previous stable image and restore prior env set.
