# Shamiso v2 — Phase 1 Completion Plan

**Project:** Shamiso Music Distribution (SMD) Platform  
**Report date:** 16 June 2026  
**Objective:** Define what remains to close Phase 1 and estimate delivery time

---

## 1) Phase 1 Exit Criteria

Phase 1 can be considered complete when the platform has:

1. **Deep API integrations operational** for Feature.fm and RoEx inside SMD (not just referral redirects).
2. **Partner referral stack fully configured** for all required partners: Groover, SongTools, Rotor Videos, beatBread, Symphony OS.
3. **Middleware/caching layer finalized** (Convex as originally scoped, or an approved Appwrite-based equivalent).
4. **Landing page architecture finalized** with production-ready responsive behavior and SEO essentials.
5. **Production hardening completed**: testing, monitoring hooks, and deployment validation.

---

## 2) Remaining Work (By Stream)

## A. Deep Integrations (Feature.fm + RoEx)

### A1. Feature.fm API Integration
- Build secure server-side Feature.fm client (auth, token storage/refresh).
- Implement API routes for campaign, smart-link, and pre-save analytics retrieval.
- Add dashboard UI cards/widgets for key marketing metrics.
- Add retries, error handling, and response normalization.
- Add caching strategy and scheduled refresh jobs.

**Deliverables**
- `src/lib/server/featurefm.ts` (or equivalent)
- `src/app/api/featurefm/*` routes
- Dashboard analytics components wired to live data
- Env documentation and runbook

**Estimate:** **5–7 working days**

### A2. RoEx API Integration
- Build secure server-side RoEx client and auth flow.
- Implement endpoints for mastering job status, queue/progress, and outputs.
- Add dashboard module showing track mastering state and recent actions.
- Add webhook/callback support if available from RoEx.
- Add caching and resilience for rate limits/network failures.

**Deliverables**
- `src/lib/server/roex.ts` (or equivalent)
- `src/app/api/roex/*` routes
- Dashboard production widget(s) for mastering lifecycle
- Integration test coverage

**Estimate:** **4–6 working days**

---

## B. Partner Config Completion

### B1. Symphony OS
- Add referral link to partner config.
- Create branded service page and CTA flow.
- Add dashboard partner card.
- Validate analytics tagging / UTM conventions.

**Estimate:** **1 working day**

### B2. Rotor Videos Cleanup
- Move hardcoded link into centralized `partner-links.ts`.
- Create dedicated `/services/rotor` page for consistency.
- Update dashboard and promo surfaces to reference central config.

**Estimate:** **0.5–1 working day**

---

## C. Middleware Layer Decision & Delivery

Current implementation uses **Appwrite**, while original scope called for **Convex**.

### Option C1 (Recommended for timeline): Formalize Appwrite as Phase 1 middleware
- Add explicit caching strategy (e.g., cached collections + TTL job/function).
- Add partner-link management model in DB/config with admin update path.
- Document architecture decision and Phase 2 migration path (if Convex still desired later).

**Estimate:** **2–3 working days**

### Option C2 (Strict to original scope): Introduce Convex in Phase 1
- Add Convex project setup, schema, functions, env/secrets.
- Port middleware duties (cache + link management) into Convex.
- Integrate with existing Next.js API flows and test end-to-end.

**Estimate:** **4–6 working days**  
**Risk:** Medium-high due to parallel backend stack and migration complexity.

---

## D. SEO & Landing Production Hardening

- Add `sitemap.ts` and `robots.ts` in `src/app`.
- Add canonical URLs in metadata where missing.
- Add Open Graph image strategy (`opengraph-image` route or static assets).
- Add structured data (JSON-LD) for organization/services.
- Run responsive QA pass across key breakpoints and pages.

**Estimate:** **1.5–2.5 working days**

---

## E. QA, Stabilization, and Release Readiness

- Add/expand integration tests for partner API routes.
- Add regression test checklist for dashboard flows.
- Validate auth boundaries and secret handling for third-party tokens.
- Perform staging UAT with sample partner accounts.
- Prepare release notes + rollback steps.

**Estimate:** **2–3 working days**

---

## 3) Timeline Estimate (Total)

## Scenario 1 — Fastest realistic completion (keep Appwrite for Phase 1)

- Feature.fm integration: 5–7 days  
- RoEx integration: 4–6 days  
- Symphony OS + Rotor: 1.5–2 days  
- Middleware formalization (Appwrite): 2–3 days  
- SEO hardening: 1.5–2.5 days  
- QA + release: 2–3 days  

**Total:** **16–23 working days**  
**Calendar duration:** ~**3.5 to 5 weeks** (single full-time engineer)

## Scenario 2 — Strict original scope including Convex now

Replace Appwrite formalization with Convex delivery (+2 to +3 days net).  

**Total:** **18–26 working days**  
**Calendar duration:** ~**4 to 6 weeks** (single full-time engineer)

---

## 4) Suggested Execution Order

1. Confirm middleware decision (**Appwrite for Phase 1** vs **Convex now**).
2. Implement Feature.fm backend + dashboard module.
3. Implement RoEx backend + mastering status module.
4. Close partner config gaps (Symphony OS, Rotor standardization).
5. Complete SEO technical tasks.
6. Run QA/UAT and ship.

This order reduces risk by delivering the most critical integration functionality first.

---

## 5) Dependencies & Risks

### External Dependencies
- Feature.fm and RoEx API credentials, docs access, and rate-limit rules.
- Sandbox or test accounts with realistic data.
- Any webhook endpoint registration requirements from partners.

### Top Risks
- Delays in partner API access/approval.
- Incomplete partner API capabilities vs expected UI outputs.
- Scope creep if “Phase 2” items are pulled into Phase 1.
- Dual-backend complexity if Convex is added while Appwrite remains active.

### Mitigations
- Use mock adapters while waiting for partner access.
- Ship in vertical slices (API + UI + test together per integration).
- Freeze Phase 1 scope with explicit acceptance checklist.

---

## 6) Resource Assumptions

Estimate above assumes:
- 1 full-time engineer
- 1 product/design reviewer available for quick decisions
- Partner API access granted within first week
- No major redesign of existing UI architecture

With 2 engineers (one integration-focused, one frontend/QA-focused), timeline can reduce to roughly **2.5–4 weeks** depending on API access speed.

---

## 7) Definition of Done (Phase 1)

Phase 1 is done when all of the following are true:

- Feature.fm data is fetched via API and visible in SMD dashboard.
- RoEx mastering status is fetched via API and visible in SMD dashboard.
- Symphony OS and Rotor are fully normalized in partner config + service paths.
- Middleware strategy is finalized and documented (Appwrite confirmed or Convex delivered).
- SEO essentials (`sitemap`, `robots`, canonical, OG image baseline) are in place.
- Integration and regression testing pass in staging.
- Release checklist completed and deployment validated.

---

## Recommended Target

If speed-to-completion is the priority, target **Scenario 1** and lock Appwrite as the Phase 1 middleware implementation, then plan Convex as a Phase 2 architecture migration stream.
