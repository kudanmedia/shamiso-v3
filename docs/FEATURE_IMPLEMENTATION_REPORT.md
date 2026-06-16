# Shamiso v2 — Feature Implementation Report

**Project:** Shamiso Music Distribution (SMD) Platform  
**Report date:** 16 June 2026  
**Scope:** Features and third-party integrations against the agreed Phase 1 line items

---

## Executive Summary

The Shamiso v2 platform is a **Next.js 16** application with a full marketing landing experience, authenticated artist dashboard, partner service pages, and backend middleware via **Appwrite** (not Convex). Partner integrations are largely implemented as **referral links, branded service pages, and authenticated redirect flows**. Of the two deep API integrations specified (Feature.fm and RoEx), **neither has a direct API client** for in-platform marketing data or mastering status. **SongTools** is the only partner with a true API integration (JWT auth + embedded widget). **Symphony OS** has not been configured. **Convex** has not been set up; Appwrite serves as the current middleware and data layer.

| Line Item | Status |
|-----------|--------|
| Deep API Integrations (Feature.fm, RoEx) | Partial — referral/UI only; no API data pull |
| Landing Page, Responsive Design, SEO | Implemented (SEO baseline; technical SEO gaps remain) |
| Partner Referral Links & Custom Paths | Mostly implemented (Symphony OS missing; Rotor not centralized) |
| Convex Database & Serverless Middleware | Not implemented — Appwrite used instead |

---

## 1. Deep API Integrations

### 1.1 Feature.fm

**Specified goal:** Custom components to interact directly with the Feature.fm API so users can view marketing data inside the SMD Platform.

**What is implemented:**

| Item | Location | Description |
|------|----------|-------------|
| Central referral URL | `src/lib/partner-links.ts` | `featureFm: "http://feature.fm/shamiso"` |
| Service page | `src/app/services/feature-fm/page.tsx` | Full marketing landing page with page-level SEO metadata |
| Dashboard partner card | `src/app/dashboard/page.tsx` | "feature.fm Engine" and "Smartlinks & Pre-Saves" cards linking to Feature.fm |
| Power Stack section | `src/components/PowerStack.tsx` | Homepage partner showcase with Feature.fm entry |
| Promote Music section | `src/components/PromoteMusic.tsx` | Marketing copy and link to `/services/feature-fm` |
| Authenticated redirect | `src/components/PartnerRedirect.tsx` | Logged-in users are auto-redirected to the partner URL in a new tab |

**What is not implemented:**

- No Feature.fm API client, server route, or webhook handler
- No in-platform display of smart-link analytics, pre-save counts, or campaign data
- No API caching layer for Feature.fm responses

**Status:** **Partial** — referral and UX wrapper only.

---

### 1.2 RoEx

**Specified goal:** Custom components to interact directly with the RoEx API so users can view mastering status inside the SMD Platform.

**What is implemented:**

| Item | Location | Description |
|------|----------|-------------|
| Referral URLs | `src/lib/partner-links.ts` | `automix`, `mixCheckStudio`, and `roex` with `?via=` referral params on Automix and Mix Check Studio |
| Service page | `src/app/services/roex/page.tsx` | Branded RoEx partnership page with outbound CTAs |
| Dashboard partner cards | `src/app/dashboard/page.tsx` | "Automix by Roex" and "Mix Check Studio" production tools |
| Power Stack / Promote Music | `src/components/PowerStack.tsx`, `src/components/PromoteMusic.tsx` | Links to `/services/roex` |

**What is not implemented:**

- No RoEx API client or mastering-status polling
- No in-platform display of mix/master job status
- No token exchange or callback handling with RoEx

**Status:** **Partial** — referral and marketing pages only.

---

### 1.3 SongTools (Bonus — Full API Integration)

SongTools exceeds the referral-only pattern and is the deepest partner integration in the codebase.

| Item | Location | Description |
|------|----------|-------------|
| Partner URL | `src/lib/partner-links.ts` | `https://amplifiedpro.songtools.io/` |
| Service page | `src/app/services/songtools/page.tsx` | Branded SongTools partnership page |
| JWT API route | `src/app/api/songtools/jwt/route.ts` | Server-side JWT generation (HS256, 30-day expiry) using `SONGTOOLS_JWT_SECRET` |
| Embedded widget | `src/components/SongToolsWidget.tsx` | Authenticates via Appwrite session → fetches JWT → embeds SongTools iframe |
| Analytics dashboard | `src/app/dashboard/analytics/page.tsx` | "Fan Data Analytics" page mounting the SongTools widget |

**Data flow:**

1. User session is validated via Appwrite (`account.createJWT()` → `x-appwrite-jwt` header).
2. `/api/songtools/jwt` signs a JWT with user email and name.
3. Widget iframe loads `https://widgets.songtools.io/...&jwt=...` for in-platform analytics.

**Status:** **Implemented** — authenticated API integration with embedded UI.

---

## 2. Landing Page, Design Architecture & SEO

### 2.1 Landing Page UI

**Status:** **Implemented**

The home page (`src/app/page.tsx`) composes a full marketing funnel from modular section components:

| Section | Component |
|---------|-----------|
| Hero | `src/components/HeroSection.tsx` |
| Narrative | `src/components/NarrativeSection.tsx` |
| Partner promotion | `src/components/PromoteMusic.tsx` |
| Genre strategy | `src/components/StrategicGenres.tsx` |
| Revenue calculator | `src/components/RevenueSwitchCalculator.tsx` |
| D2C | `src/components/D2CSection.tsx` |
| Sovereign corridor table | `src/components/SovereignCorridorTable.tsx` |
| Sovereign multiplier | `src/components/SovereignMultiplier.tsx` |
| Pricing | `src/components/PricingSection.tsx` |
| Corridor map | `src/components/CorridorMap.tsx` |
| Final commitment | `src/components/FinalCommitment.tsx` |
| Founder's letter | `src/components/FoundersLetter.tsx` |
| FAQ | `src/components/FAQ.tsx` |

Global chrome is provided by `src/components/Header.tsx`, `src/components/Footer.tsx`, and `src/app/layout.tsx`.

**Design system:** Tailwind CSS v4, shadcn/ui components (`src/components/ui/`), Lucide icons, Inter + Outfit fonts, dark theme.

---

### 2.2 Responsive Design

**Status:** **Implemented**

Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`) are used consistently across landing sections, service pages, dashboard, and admin surfaces. The layout adapts from mobile through desktop without separate mobile routes.

---

### 2.3 SEO Optimization (African Market)

**Status:** **Partially implemented**

**Implemented:**

| Item | Location |
|------|----------|
| Global metadata | `src/app/layout.tsx` — title, description, keywords (Afro House, Lekompo, Maskandi, 3-Step, African music, etc.), Open Graph, Twitter cards |
| Genre landing pages | `src/app/distribute-*/page.tsx` — dedicated SEO pages for Afro House, Amapiano, Afrobeats, Kuduro, Lekompo, Maskandi, Singeli, Bongo Flava, 3-Step |
| Reusable genre template | `src/components/GenrePage.tsx` |
| Service page metadata | Each `src/app/services/*/page.tsx` exports page-level `metadata` |
| Supporting pages | `src/app/about/page.tsx`, `src/app/welcome-artist/page.tsx`, `src/app/whatsapp-group/page.tsx` |

**Not yet implemented:**

- `sitemap.xml` route
- `robots.txt` route
- Canonical URL configuration
- Structured data (JSON-LD)
- Open Graph image assets (`opengraph-image` route)

---

## 3. Partner Referral Links, Assets & Custom URL Paths

Central configuration lives in `src/lib/partner-links.ts`:

```ts
export const PARTNER_LINKS = {
    groover: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music",
    featureFm: "http://feature.fm/shamiso",
    automix: "https://automix.roexaudio.com/?via=06e63a",
    mixCheckStudio: "https://mixcheckstudio.roexaudio.com/?via=07431b",
    roex: "https://roexaudio.com/",
    funding: "https://www.beatbread.com/go/shamisomusic",
    songtools: "https://amplifiedpro.songtools.io/",
    mogul: "https://www.usemogul.com/shamiso-music",
    toorly: "https://toorly.com/",
    unhurd: "https://www.unhurdmusic.com/p/shamiso",
};
```

### Partner Status Matrix

| Partner | Referral Link | Custom URL Path | Service Page | Notes |
|---------|---------------|-----------------|--------------|-------|
| **Groover** | Configured (UTM params) | `/services/groover` | Yes | `PartnerRedirect` on authenticated visit |
| **SongTools** | Configured | `/services/songtools` | Yes | JWT API + widget on `/dashboard/analytics` |
| **Rotor Videos** | Hardcoded in dashboard only | — | No dedicated page | `https://rotorvideos.com/shamiso` in `src/app/dashboard/page.tsx`; not in `partner-links.ts` |
| **beatBread** | Configured | `/services/funding` | Yes | Lead capture form before redirect |
| **Symphony OS** | Not found | — | No | No references in codebase |
| **Feature.fm** | Configured | `/services/feature-fm` | Yes | Referral + redirect flow |
| **RoEx** | Configured (3 URLs) | `/services/roex` | Yes | Automix, Mix Check Studio, main site |

### Additional Partners (Beyond Original Scope)

| Partner | Path | Link |
|---------|------|------|
| Mogul | `/services/mogul` | `PARTNER_LINKS.mogul` |
| Toorly | `/services/toorly` | `PARTNER_LINKS.toorly` |
| un:hurd | `/services/unhurd` | `PARTNER_LINKS.unhurd` |

### beatBread Lead Capture Flow

| Step | Implementation |
|------|----------------|
| Funding form UI | `src/components/FundingForm.tsx` |
| Lead API | `src/app/api/leads/route.ts` — persists to Appwrite collection `smd_funding_leads` |
| Post-submit redirect | Opens `PARTNER_LINKS.funding` (beatBread) in new tab |

### Authenticated Partner Redirect Pattern

`src/components/PartnerRedirect.tsx` is reused on Groover, Feature.fm, and other service pages:

1. Checks Appwrite session.
2. If authenticated → opens partner URL in new tab → returns user to dashboard.
3. If popup blocked → shows manual launch button.
4. If unauthenticated → user stays on marketing page.

---

## 4. Convex Database & Serverless Middleware

**Specified goal:** Convex setup for API caching, partner link management, and Phase 2 scaffolding.

**Status:** **Not implemented**

| Expected | Actual |
|----------|--------|
| Convex schema & functions | No `convex/` directory; no Convex dependencies in `package.json` |
| API caching middleware | Not present |
| Partner link management via Convex | Links managed in static `src/lib/partner-links.ts` |

### What Was Built Instead (Appwrite Middleware)

Appwrite serves as the current backend and middleware layer:

| Capability | Location |
|------------|----------|
| Client SDK | `src/lib/appwrite.ts` |
| Server clients (session + admin) | `src/lib/server/appwrite.ts` |
| Auth-gated API routes | `src/app/api/songtools/jwt/route.ts`, `src/app/api/leads/route.ts` |
| Onboarding actions | `src/app/onboarding/actions.ts` |
| Admin wallet/beneficiary actions | `src/app/admin/wallets/actions.ts`, `src/app/admin/beneficiaries/` |
| Appwrite Cloud Functions | `functions/ingest-too-lost-csv/`, `functions/execute_admin_action/` |
| Database setup script | `scripts/setup-appwrite.js` |

---

## 5. Additional Third-Party API Integrations

These integrations were not in the original line items but are implemented in the platform.

### 5.1 Verto FX (Payments & Wallets)

| Item | Location |
|------|----------|
| API client | `src/lib/server/verto.ts` |
| Capabilities | Login, wallets, beneficiaries, FX rates, payments (sandbox: `api-v3-sandbox.vertofx.com`) |
| Admin surfaces | `src/app/admin/wallets/`, `src/app/admin/beneficiaries/`, `src/app/admin/payouts/` |

### 5.2 Appwrite (Auth, Database, Functions)

| Item | Location |
|------|----------|
| User authentication | Login (`src/app/login/page.tsx`), signup (`src/app/signup/page.tsx`), session-gated dashboard |
| Lead storage | `smd_funding_leads` collection via `/api/leads` |
| Royalty ingestion | `functions/ingest-too-lost-csv/src/main.js` |
| Admin actions | `functions/execute_admin_action/src/main.js` |

---

## 6. Dashboard & Platform Features

| Feature | Path | Status |
|---------|------|--------|
| Partner hub | `/dashboard` | Implemented — categorized partner cards with outbound links |
| Fan data analytics | `/dashboard/analytics` | Implemented — SongTools widget embed |
| Payout history | `/dashboard/payouts` | Implemented |
| Tax compliance | `/dashboard/tax` | Implemented |
| Profile | `/dashboard/profile` | Implemented |
| Onboarding | `/onboarding` | Implemented |
| Admin panel | `/admin/*` | Implemented — wallets, beneficiaries, payouts, tax CRM, news |

---

## 7. Gap Analysis & Recommended Next Steps

### Critical Gaps (vs. Original Scope)

1. **Feature.fm API** — Build API client and dashboard components for smart-link/pre-save analytics.
2. **RoEx API** — Integrate mastering status endpoints and surface job progress in the dashboard.
3. **Symphony OS** — Add referral URL, service page, and dashboard card.
4. **Rotor Videos** — Centralize link in `partner-links.ts` and add `/services/rotor` page.
5. **Convex** — Either implement as specified or formally document Appwrite as the Phase 1 middleware with a migration plan.
6. **Technical SEO** — Add `sitemap.ts`, `robots.ts`, canonical URLs, and OG images.

### Completed Strengths

- Full landing page with African-genre SEO pages
- Responsive design across all major surfaces
- Centralized partner link config (with minor exceptions)
- SongTools deep integration (JWT + embedded analytics)
- beatBread lead capture before referral handoff
- Appwrite-backed auth, leads, and admin infrastructure
- Verto FX payment rails for admin operations

---

## 8. File Reference Index

### Configuration
- `src/lib/partner-links.ts` — Partner referral URLs
- `src/lib/appwrite.ts` — Appwrite client
- `src/lib/server/appwrite.ts` — Server-side Appwrite clients
- `src/lib/server/verto.ts` — Verto FX API client

### API Routes
- `src/app/api/songtools/jwt/route.ts` — SongTools JWT issuance
- `src/app/api/leads/route.ts` — beatBread lead capture

### Partner Service Pages
- `src/app/services/feature-fm/page.tsx`
- `src/app/services/roex/page.tsx`
- `src/app/services/groover/page.tsx`
- `src/app/services/songtools/page.tsx`
- `src/app/services/funding/page.tsx`
- `src/app/services/mogul/page.tsx`
- `src/app/services/toorly/page.tsx`
- `src/app/services/unhurd/page.tsx`

### Shared Components
- `src/components/PartnerRedirect.tsx`
- `src/components/SongToolsWidget.tsx`
- `src/components/FundingForm.tsx`
- `src/components/GenrePage.tsx`

### Appwrite Functions
- `functions/ingest-too-lost-csv/src/main.js`
- `functions/execute_admin_action/src/main.js`

---

*This report reflects the state of the codebase as of 16 June 2026.*
