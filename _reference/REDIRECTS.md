# Redirects Spec — Keys-Caldwell

> **Purpose.** This document lists every legacy URL on the existing
> WordPress site (and the previous redesigns visible in Google's index)
> that needs a 301 redirect to its new home. Hand this file to whoever
> implements the production site (Cloudflare Workers, Netlify `_redirects`,
> Apache `.htaccess`, or Nginx) — the format converts directly.
>
> **Why this matters.** The current site has 15+ years of accumulated
> backlinks pointing at URLs like `/services-v3/` and `/home/`. Without
> 301s, all that link equity vanishes and rankings collapse on launch
> day. With 301s, ~90% of the equity carries over.

---

## 1. Audit summary

We crawled `keys-caldwell.com` plus what's in Google's index and found
**four classes** of legacy URL:

| Class | Example | Count | Action |
|---|---|---|---|
| **A. Redesign cruft** | `/home/`, `/services-v3/`, `/services3/` | ~12 | 301 → new canonical |
| **B. Page-id parameters** | `/?page_id=2`, `/?page_id=47` | ~30 | 301 → new canonical |
| **C. Content moves** | `/contact/` → `/request-proposal/` | ~20 | 301 → new canonical |
| **D. Dead pages** | `/alternate-contact-information-example-form/` | ~6 | 410 Gone |

Total redirect rules below: **~70**, condensed to ~25 patterns using wildcards.

---

## 2. Redirect map (Class A — redesign cruft)

These are URLs left over from earlier site redesigns where the previous
agency didn't clean up. Several are still ranking in Google.

```
# Source URL                                        →  Destination                                          Status
/home/                                              →  /                                                    301
/home-2/                                            →  /                                                    301
/services/                                          →  /                                                    301   # generic services page replaced by 2 pillars
/services-v3/                                       →  /                                                    301
/services3/                                         →  /                                                    301
/services-2/                                        →  /                                                    301
/condo-management/                                  →  /condo-management/              301
/condo-association-management/                      →  /condo-management/              301
/hoa-management/                                    →  /hoa-management/                    301
/homeowners-association-management/                 →  /hoa-management/                    301
/about-us/                                          →  /about/                                              301
/our-team/                                          →  /about/                                              301
/the-caldwell-family/                               →  /about/                                              301
```

---

## 3. Redirect map (Class B — page-id parameters)

WordPress page IDs that got indexed because canonicalization was missing.
These need to map to the *current* canonical URL of that content.

```
/?page_id=2          →  /                                                301
/?page_id=15         →  /about/                                          301
/?page_id=47         →  /condo-management/          301
/?page_id=49         →  /hoa-management/                301
/?page_id=51         →  /request-proposal/                               301
/?page_id=83         →  /testimonials/                                   301
# … (full mapping in spreadsheet — search the WP db for `wp_posts` rows of post_type='page')
```

> **Implementation note.** In Nginx these need `if ($args ~ "page_id=2")`
> rewrites; in Cloudflare Workers they need URL parsing. They cannot
> be expressed in a flat `_redirects` file with query string matching
> on Apache without `mod_rewrite`. Don't skip them.

---

## 4. Redirect map (Class C — content moves)

Pages that exist on the new site but at a new URL.

```
/contact/                                            →  /request-proposal/                                  301
/contact-us/                                         →  /request-proposal/                                  301
/get-in-touch/                                       →  /request-proposal/                                  301
/proposal/                                           →  /request-proposal/                                  301
/request-a-proposal/                                 →  /request-proposal/                                  301
/references/                                         →  /testimonials/                                      301
/reviews/                                            →  /testimonials/                                      301
/information/                                        →  /faq/                                               301
/resources/                                          →  /blog/                                              301
/news/                                               →  /blog/                                              301
/blog/category/*                                     →  /blog/                                              301   # collapse taxonomies
/blog/tag/*                                         →  /blog/                                              301
/blog/author/*                                       →  /blog/                                              301
/blog/page/*                                         →  /blog/                                              301   # paginated archives
```

---

## 5. Redirect map (Class D — dead pages, 410 Gone)

These pages should NOT be redirected — they were placeholders, internal
forms, or stale microsites. Returning 410 tells Google to drop them
faster than 404.

```
/alternate-contact-information-example-form/         410
/login-transition/                                   410
/DPPSite/                                            410
/DPPSite/*                                           410
/wp-content/uploads/2014/*                           410   # old promotional PDFs
/wp-admin/                                           410   # if still exposed, lock down
```

---

## 6. Implementation snippets

### 6.1 Cloudflare Workers (recommended — fastest)

```js
const REDIRECTS = {
  '/home/': '/',
  '/services-v3/': '/',
  '/condo-management/': '/condo-management/',
  '/hoa-management/': '/hoa-management/',
  '/contact/': '/request-proposal/',
  '/references/': '/testimonials/',
  // … full table
};

const GONE = new Set([
  '/alternate-contact-information-example-form/',
  '/login-transition/',
]);

addEventListener('fetch', e => e.respondWith(handle(e.request)));

async function handle(req) {
  const url = new URL(req.url);
  const path = url.pathname.replace(/\/+$/, '/');  // normalize trailing slash

  if (GONE.has(path)) return new Response('Gone', { status: 410 });

  const dest = REDIRECTS[path];
  if (dest) return Response.redirect(url.origin + dest, 301);

  // page_id parameter handling
  const pageId = url.searchParams.get('page_id');
  if (pageId && PAGE_ID_MAP[pageId]) {
    return Response.redirect(url.origin + PAGE_ID_MAP[pageId], 301);
  }

  return fetch(req);
}
```

### 6.2 Netlify `_redirects`

```
/home/                       /                                                  301!
/services-v3/                /                                                  301!
/condo-management/           /condo-management/            301!
/hoa-management/             /hoa-management/                  301!
/contact/                    /request-proposal/                                 301!
/references/                 /testimonials/                                     301!
/alternate-contact-information-example-form/   /404                             410!
```

### 6.3 Apache `.htaccess` (legacy)

```apache
RewriteEngine On

# Class A
RewriteRule ^home/?$              /                                              [R=301,L]
RewriteRule ^services-v3/?$       /                                              [R=301,L]
RewriteRule ^condo-management/?$  /condo-management/        [R=301,L]
RewriteRule ^hoa-management/?$    /hoa-management/              [R=301,L]
RewriteRule ^contact/?$           /request-proposal/                             [R=301,L]
RewriteRule ^references/?$        /testimonials/                                 [R=301,L]

# Class B (page_id query string)
RewriteCond %{QUERY_STRING} ^page_id=2$
RewriteRule ^$ /? [R=301,L]
RewriteCond %{QUERY_STRING} ^page_id=47$
RewriteRule ^$ /condo-management/? [R=301,L]
# … etc

# Class D — 410 Gone
RewriteRule ^alternate-contact-information-example-form/?$ - [R=410,L]
RewriteRule ^login-transition/?$ - [R=410,L]
```

---

## 7. Verification checklist (post-deploy)

- [ ] **Crawl test.** Run Screaming Frog against the live site after deploy
      and confirm every URL in this document returns either 301 (with the
      expected destination) or 410. Zero 200s on these paths, zero 404s.
- [ ] **Search Console.** Submit the new sitemap. Use the URL Inspection
      tool on the top 20 organic landing pages from the *old* site to
      verify Google sees the redirect and re-indexes the destination.
- [ ] **Backlink scan.** Pull the top 50 referring domains from Ahrefs/
      Semrush. Click through each backlink to confirm the redirect chain
      works (no chains longer than 1 hop).
- [ ] **Internal links.** Search the new site for any link still pointing
      at a legacy URL — those should be updated to point at the new
      canonical directly (don't rely on the redirect to fix internal links).

---

## 8. Things to NOT do

- **Don't redirect everything to the homepage.** This is the #1 mistake on
  WordPress migrations. Google reads "homepage redirect" as "soft 404"
  and drops the equity entirely. Redirect to the most-relevant new page.
- **Don't 302.** 302 is "temporary" and does not pass equity. Use 301.
- **Don't chain.** If `/old-a/` 301s to `/old-b/` 301s to `/new/`,
  collapse to `/old-a/` → `/new/` directly.
- **Don't redirect `robots.txt`, `/sitemap.xml`, or `/favicon.ico`** —
  these need to resolve at their canonical paths on the new domain.
