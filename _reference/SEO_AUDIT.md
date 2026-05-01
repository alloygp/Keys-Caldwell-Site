# SEO Audit — Keys-Caldwell site

_Compiled May 2026, after the URL rename + 59-page build._
_Re-swept May 2026 (sweep #2, after Era III copy rewrite + accounting page rebuild)._

## Sweep #2 — delta from sweep #1

| Status | Finding | Pages | Owner |
|---|---|---|---|
| ✅ | All sweep #1 ✅ items still healthy at runtime (canonical, OG, JSON-LD, single H1, internal links) | 59/59 | confirmed |
| ✅ | Internal link integrity — **0 broken links** across the entire built tree | 59/59 | confirmed |
| ✅ | Schema graph at runtime — Organization + ProfessionalService + BreadcrumbList on every page; Article on blog spokes | 59/59 | confirmed |
| 🐞 → ✅ | **Duplicate `<title>` between `/accounting/` and `/accounting/v2/`** — v2 was a copy exploration that became redundant once V1 absorbed the Era III copy | 1 | **v2 deleted this turn** |
| ⚠️ | **31 title tags still >60ch and 56 descriptions still >165ch** — unchanged from sweep #1; treated as cosmetic SERP truncation, not blocking | 31 / 56 | copy review (deferred) |
| ⚠️ | **23 static `og:url` tags hard-coded to vercel preview domain.** Runtime override via `KCSeo.apply()` writes the correct keys-caldwell.com URL, so live-rendered pages are fine. The risk is JS-disabled or pre-hydration social scrapers seeing the preview URL. Low impact, but worth a single find/replace before launch. | 23 | flagged |

---

## TL;DR — what's healthy, what to fix

| Status | Finding | Pages affected | Owner |
|---|---|---|---|
| ✅ | Canonical URLs, OG tags, JSON-LD all hydrate at runtime via `KCSeo.apply()` (Organization + ProfessionalService + BreadcrumbList) | 59/59 | shipped |
| ✅ | H1 uniqueness — 45 hero blocks, 0 duplicates | 45/45 | shipped |
| ✅ | Sitemap.xml ↔ filesystem alignment — 0 dead URLs in sitemap, 0 orphans (after fix) | 58/58 | shipped |
| ✅ | Image alt coverage — 100% (only 2 `<img>` tags, both alted; rest is SVG/CSS art) | 2/2 | shipped |
| ✅ | URL slug consolidation — `/condo-management/`, `/hoa-management/` (no legacy slugs leaking) | shipped this turn |
| 🐞 → ✅ | **Italicized headlines silently dropped on every CONTENT page** — `italicize()` helper required `titleItalic` to be a substring of `titlePlain`, but every CONTENT block authors them as adjacent halves. H1s like "Charlotte County is an HOA-dominant market with" rendered without their italic finish. | ~45 pages | **fixed this turn** |
| 🐞 → ✅ | `robots.txt` was disallowing `/services/` (an active page) as part of the legacy-URL block | 1 | **fixed this turn** |
| 🐞 → ✅ | `/hoa-management/charlotte-county/` missing from sitemap | 1 | **fixed this turn** |
| ⚠️ | **Title tags >60 chars** — will truncate in SERPs | 31 pages | copy review |
| ⚠️ | **Meta descriptions >165 chars** — will truncate in SERPs | 56 pages | copy review |
| ⚠️ | SEO meta + schema injected via JS, not in static HTML | 59 pages | platform decision |

---

## Pages over Google's SERP truncation thresholds

Google's UI cap is roughly **580px / 60 chars** for titles and **~155–160 chars** for meta descriptions. Going over doesn't hurt rankings, but the snippet that actually shows in results gets cut mid-word — the part you wrote to earn the click never reaches the user.

### Title tags >60 chars (31)

The pattern is consistent: every title ends with `· Keys-Caldwell` (16 chars). Three options for the team:

1. **Drop the brand suffix on long pages** — Google appends the site name automatically when it can.
2. **Drop secondary qualifier** — e.g. "Florida SIRS & Milestone Inspections — A Condo Board's Guide · Keys-Caldwell" → "Florida SIRS & Milestone Inspections · Keys-Caldwell" (52)
3. **Tighten city-state qualifier** — "Condo Association Management · Anna Maria Island, FL · Keys-Caldwell" (68) → "Condo Management · Anna Maria Island · Keys-Caldwell" (52)

Affected pages (length in brackets):

```
[97] /blog/how-to-change-management-company/
[93] /blog/state-of-the-association-2026/
[89] /blog/management-fees-guide/
[83] /blog/events/
[82] /blog/glossary/
[81] /vendors/
[79] /blog/hoa-accounting-best-practices/
[79] /blog/reserve-study-special-assessment/
[79] /
[77] /case-studies/
[77] /blog/newsletter/
[76] /about/
[76] /blog/florida-sirs-milestone-inspection-guide/
[75] /faq/
[75] /blog/florida-law-changes/
[74] /property-services/
[72] /blog/what-does-a-management-company-do/
[71] /owners/
[69] /careers/
[68] /condo-management/anna-maria-island/
[67] /service-areas/
[67] /request-proposal/
[65] /condo-management/lakewood-ranch/
[64] /pricing/
[63] /condo-management/longboat-key/
[63] /condo-management/manasota-key/
[63] /blog/insurance-guide/
[62] /condo-management/
[61] /condo-management/charlotte-county/
[61] /condo-management/north-port/
[61] /condo-management/siesta-key/
```

### Meta descriptions >165 chars (56)

Most are 180–230 chars — only ~15–60 chars over. A single judicious edit per page. Recommend a copywriter pass rather than auto-truncation; the descriptions are doing real work explaining what the page covers and which audience it's for.

Sample worst offenders:

```
[242] /blog/events/
[242] /reserve-studies/
[241] /service-areas/
[241] /
[240] /property-services/
[230] /blog/glossary/
[227] /blog/florida-sirs-milestone-inspection-guide/
[226] /hoa-management/
[225] /blog/state-of-the-association-2026/
[223] /condo-management/
[222] /accounting/
[221] /blog/newsletter/
[217] /testimonials/
[213] /condo-management/anna-maria-island/
[212] /hoa-management/anna-maria-island/
[211] /hoa-management/charlotte-county/
[210] /condo-management/lakewood-ranch/
[209] /hoa-management/lakewood-ranch/
[208] /case-studies/
[207] /hoa-management/longboat-key/
```

(Full 56-page list in [the run output](#) — re-run `seo-meta-audit.mjs` to regenerate.)

---

## Strategic recommendation: pre-render `<head>`

**Current architecture:** Each page ships a static `<title>` + `<meta description>` in HTML. Canonical, OG tags, Twitter card, robots meta, and JSON-LD schema are injected at runtime by `KCSeo.apply()`, which reads the per-page CONTENT block.

**Why it works for now:** Modern Googlebot executes JavaScript before indexing. The runtime-injected tags ARE seen.

**Why it's strategic risk for an SEO-critical site:**

1. **JS rendering is a second pass** — Google crawls HTML first, then queues a render. The render queue is non-deterministic; some pages can sit in it for days. Static-rendered head tags get crawled and parsed in the first pass.
2. **Many smaller crawlers don't execute JS** — Bing, DuckDuckGo, link-preview unfurlers (Slack, LinkedIn, iMessage), social card generators, internal SEO tools. None will see the injected canonical, OG image, or schema.
3. **Schema specifically benefits from being in HTML** — Search Console's rich-results validator and structured-data testing tools work on the static HTML.

**Recommended path** (in priority order):

1. **Easiest:** A build step that runs each page's `KCSeo.apply()` server-side and inlines the result into the HTML before deployment. The `KCSeo.apply()` function is already pure (reads CONTENT, writes head tags) — running it under JSDOM at build time would emit a fully-statically-rendered head.
2. **Better:** Move the entire site to a static-site generator (Astro, 11ty, plain Vite) where this is the default.
3. **Acceptable interim:** Add the canonical, OG image, OG title/desc, and primary JSON-LD as static `<meta>` / `<script type="application/ld+json">` tags directly in each page's HTML, alongside the runtime injector. Keep them in sync via a build script (or accept duplication risk and make `KCSeo` skip injection if the static tag is present).

---

## What was fixed this turn

### 1. Italicized-headline rendering bug (`shared.jsx`, `geo.jsx`)

**Symptom:** H1 on `/hoa-management/charlotte-county/` rendered as:
> Charlotte County is an HOA-dominant market with

Sentence ended mid-clause. Italic continuation `canal-home and master-planned depth.` was silently dropped.

**Root cause:** Both `italicize(text, italicPart)` and `geoItalicize(text, italicPart)` required `italicPart` to be a substring of `text`. Every CONTENT block authors them as **two adjacent halves** — `titlePlain: "Plain part"` + `titleItalic: "italic clause."` — so the substring check always failed and only the plain half was rendered.

**Fix:** Both helpers now handle the trailing-clause form: if italic isn't found inside plain, render `<>{plain} <em>{italic}</em></>`.

After fix: H1 reads "Charlotte County is an HOA-dominant market with *canal-home and master-planned depth.*" Verified across condo pillar (single H1 + multiple H2s, all rendering with italic) and Charlotte County HOA geo page.

**Impact:** This was silently degrading every CONTENT-driven page on the site — pillars, geo pages, blog spokes, accounting, reserve-studies, about, etc. Search engines were indexing truncated, sentence-fragment headings.

### 2. `robots.txt` was disallowing `/services/`

The legacy-URL block from the redirects audit included `/services/` — but `/services/` is an active page in the new IA. Removed it; added a comment so the next person understands why.

### 3. `/hoa-management/charlotte-county/` was missing from sitemap

Added with `priority=0.7`, matching the other geo entries.

---

## What I didn't do (and why)

- **Auto-rewrite 31 titles + 56 meta descriptions.** These are copywriter decisions. Truncating them in code would lose the keyword targeting and unique selling propositions the team wrote into them. Better to surface the list and have a single editing pass.
- **Add static OG/canonical/schema tags to every page.** Big architectural change with deployment-time consequences. Recommended above as a build-step migration.
- **Add hero photography to pages that don't have any.** Mostly geo + service pages. Worth a content sprint with real photographs of managed buildings (with permission).

---

## How to re-run this audit

```bash
# Title + description length sweep
for f in $(find site -name index.html); do
  title=$(grep -oP '(?<=<title>).+?(?=</title>)' "$f")
  desc=$(grep -oP '(?<=name="description" content=").+?(?=")' "$f")
  echo "${#title} ${#desc} $f"
done | sort -rn

# Sitemap ↔ filesystem alignment
diff <(find site -name index.html | sed 's|^site/||;s|/index.html$|/|;s|^index.html/$||' | sort) \
     <(grep -oP '(?<=<loc>https://keys-caldwell.com/).+?(?=</loc>)' site/sitemap.xml | sort)

# H1 uniqueness (greps the CONTENT block hero.titlePlain)
grep -A1 'titlePlain:' site/**/index.html | grep titlePlain | sort | uniq -c | sort -rn
```

