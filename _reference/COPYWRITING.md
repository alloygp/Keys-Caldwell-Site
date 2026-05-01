# Copywriting Spec — Keys-Caldwell

> **Purpose.** This document is the brief for whoever writes the actual page copy
> (in-house lead, contractor, or AI). The site templates contain placeholder copy
> that *demonstrates the voice* but should be replaced with material grounded in
> Keys-Caldwell's real engagements before launch.
>
> Voice north star: **honest, specific, slightly dry, never breathless.** Boards
> are sophisticated buyers who have already been pitched by ten competitors.

---

## 1. Voice & tone rules

| Do | Don't |
|---|---|
| Use specific numbers when you know them ("47 communities, 6,200 doors") | Use vague intensifiers ("countless," "industry-leading," "best-in-class") |
| Name Florida statutes by number (FS 718, FS 720, SB-4D) | Say "we keep up with regulations" |
| Write like a CPA who also does this for a living | Write like a marketing department |
| Lead with what's true; let the reader infer that it's good | Lead with adjectives |
| Address the board, not the unit owner | Address "homeowners" generically |
| Use serial commas, em-dashes, semicolons | Use exclamation points |
| Say "we don't do X" when you don't | Pretend to be full-service when you aren't |

**Reading level:** somewhere between a *Wall Street Journal* op-ed and a CAM
exam study guide. Boards include retired engineers and litigators — write up,
not down.

---

## 2. Page-type specs

Each template has a `CONTENT` block in the HTML. Below is what each slot needs.

### 2.1 Homepage (`/`)

- **Hero `eyebrow`** — one short proof line. *"Sarasota & Manatee · 47 communities · est. 1983"*. Numbers > adjectives.
- **Hero `titlePlain` + `titleItalic`** — one sentence, ~10–14 words. The italic span is the emotional payoff; the plain part is the literal claim. Resist temptation to make this a list of features.
- **Hero `bodyParagraphs`** — 2 short paragraphs. Para 1: *what we do, concretely*. Para 2: *what we don't do, and why that's the point*. Negative space is differentiating.
- **Coverage list** — actual cities/counties served, in geographic order (north → south works).
- **Stat strip (4 numbers)** — pick 4 numbers a board would respect. Years in business, communities under management, doors, and one process metric (response time, board meetings/yr, etc.). If you don't know a number for sure, **leave it out** and add a 3rd qualitative chip instead.
- **"What we actually do" cards** — each card is one service with: a short label, a 1-sentence definition, and 2–3 receipt items underneath (*"Reserve studies on 22-year cycle"*). Receipts should be checkable claims, not adjectives.
- **Differentiator strip** — 4 short claims, each ending in a period, written as if the reader is skeptical.
- **Testimonial** — real attribution with first name, last initial, role, community. No anonymous quotes. If you can't get the name, drop the testimonial.
- **CTA band** — keep the secondary CTA pointed at *learning more*, not at another form. Boards bounce when every CTA is "request a proposal."

### 2.2 Service pillar pages (`/condo-management/`, `/hoa-management/`)

These are the SEO money pages. They must rank for the head term in their slug
and convert at the bottom of the page. Length target: **1,500–2,000 words.**

- **Eyebrow + title** — H1 contains the exact head term once: *"Condo association management, Sarasota and Manatee."*
- **Intro paragraph** — 80–120 words. Explicitly contrast with HOA management; explain why FS 718 makes this a different job from FS 720. This is where you earn topical authority for Google.
- **TOC** — 5–7 anchored sections. Boards skim; respect them.
- **What's included** — 8 receipt items. Be specific: not *"financial reporting,"* but *"monthly financials with bank reconciliation, AR aging, and budget-to-actual variance."*
- **Pricing transparency block** — explain the *model* (per-door + reimbursables, hourly add-ons, what's included in the base) without printing exact dollar figures. Boards will assume hidden pricing means hidden costs.
- **FAQ — 6 questions.** These should be the actual questions Mr. Caldwell answers on intake calls. Use real verbatim phrasing. Each FAQ answer must be ≥3 sentences (Google FAQ rich results need substance) and end with a useful pivot, not a CTA.
- **Compliance section** — name the statutes. Reference SB-4D, the SIRS deadline (Dec 31, 2024 was the inspection deadline; fully-funded reserves required for buildings 3+ stories), and milestone inspections at 30 years (25 years within 3 miles of coastline). This is the topical authority signal.
- **2 testimonials minimum** — and they must be from condo associations (not HOAs). Match the page topic.
- **Embedded proposal form** — the page should convert without requiring a click to /request-proposal/. Form lives ~70% of the way down.

### 2.3 Geo pages (`/.../venice/`, `/.../bradenton/`)

These are short — **400–600 words.** Their job is local pack rankings, not deep
content. Avoid the spammy "service + city" template feel.

- **H1** = "Condo association management in Venice, FL" (or equivalent).
- **Intro** — 2 short paragraphs about *that specific market*. Venice has a lot
  of mid-century mid-rises with deferred reserves; Bradenton has new HOA
  growth in Lakewood Ranch. **The local detail is what makes the page real.**
- **2–3 communities served in this area** — even if just first-name + community type
  ("Casey Key oceanfront condo, 64 units"). No full names if the board hasn't
  approved.
- **Driving directions paragraph** — natural-language ("we're 22 minutes north
  of downtown Venice via 41"). This helps for "near me" queries.
- **One testimonial from a board in that geography.**
- **Embedded form OR strong CTA to /request-proposal/.**

### 2.4 Blog spokes (`/blog/...`)

Length target: **1,200–1,800 words.** These exist to rank for long-tail
informational queries and to internally link up to pillar pages.

- **H1** = the exact long-tail query, lightly rewritten ("How to change HOA
  management companies in Florida — a board's guide").
- **Author** — Vicki Caldwell or Daniel Caldwell, with credentials (CAM,
  CMCA). Author bio block at the bottom + Person schema.
- **Above-the-fold answer** — first 60 words must answer the query directly,
  for featured-snippet eligibility.
- **Internal links** — each post links *up* to its parent pillar page at least
  twice with anchor text matching that page's H1.
- **Date** — published + last-updated visible on page.
- **No CTAs above the fold.** Trust first.

### 2.5 Trust pages (`/about/`, `/testimonials/`, `/case-studies/`, `/faq/`)

- **About** — Vicki + Daniel founder story, real photos (not stock), 2–3
  paragraphs each. License numbers and years CAM-certified shown explicitly.
- **Testimonials** — minimum 12. Group by community type. Every quote has a
  full name + community + year. **No anonymous quotes** — Google has stopped
  trusting them and so have boards.
- **Case studies** — 3 minimum. Format: situation / what we did / outcome
  (with numbers — *"reduced annual landscape spend 18% in year 1"*).
- **FAQ** — 12–15 questions, FAQPage schema, answers 3+ sentences each.

### 2.6 Conversion endpoint (`/request-proposal/`)

- Form-first; no marketing copy above the form.
- Required fields: name, role on board, community name, # units, current
  manager (or "self-managed"), what prompted the search.
- Promise an SLA on the page: *"We respond within 5 business days with a
  tailored scope and 3 references from comparable communities."*
- One trust signal below the form (logos or 2 short testimonials).
- **No nav distractions on this page.** (The current template still has the
  nav; if conversion rates underperform, A/B test stripping it.)

---

## 3. Keyword usage

For each page, the **primary keyword** is in:

1. The `<title>` tag (front-loaded)
2. The H1 (exact match, once)
3. The first 100 words of the intro
4. At least one H2
5. The URL slug
6. The `meta description` (compelling, not spammy)
7. The first image's `alt` attribute (where natural)

Secondary keywords go in H2s and body. **Do not exceed ~1.5% keyword
density** — Google penalizes anything that reads as stuffed.

---

## 4. Things to never write

- "Industry-leading"
- "Premier"
- "One-stop shop"
- "Family-owned and operated since 1983" *(say "Caldwell family" or "since 1983" but not the phrase — it's a ranking-blind cliché)*
- "Tailored solutions for your unique community" *(every word is filler)*
- "In today's fast-paced world…"
- Any sentence that begins with the word *"Whether"*

---

## 5. Editorial review checklist (before publishing any page)

- [ ] Read the H1 alone. Would a board chair forward this URL to the rest of
      the board?
- [ ] Read the first paragraph aloud. Does it sound like a person, or a brochure?
- [ ] Search the page for *every* word in the "never write" list above.
- [ ] Confirm every number on the page is either (a) actually true, or (b)
      removed.
- [ ] Confirm every testimonial has a real attribution.
- [ ] Confirm the meta description fits in 155 characters and reads as a promise.
- [ ] Confirm the page links *up* to its pillar and *across* to one related page.
