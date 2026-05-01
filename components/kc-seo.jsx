// Keys-Caldwell — SEO helper
// =============================================================
// Reads the page's CONTENT.meta block and emits:
//   • <title>, <meta name="description">, canonical
//   • Open Graph + Twitter card meta tags
//   • Robots meta (index/noindex)
//   • JSON-LD blocks for the schemas declared by the page
//
// USAGE in each page (after CONTENT is defined, before render):
//
//   KCSeo.apply(CONTENT.meta, {
//     pageType:  "pillar",                       // "homepage" | "pillar" | "geo" | "blog" | "trust" | "core"
//     pageUrl:   "/condo-association-management-sarasota/",
//     breadcrumbs: [
//       { label: "Home", href: "/" },
//       { label: "Condo Association Management" }
//     ],
//     // optional payload sources for FAQPage / Article schema
//     faqs:    CONTENT.faq?.items,    // [{ q, a }]
//     article: null,                  // { headline, datePublished, dateModified, authorId, image }
//     service: { name: "Condo Association Management", areaServed: [...] }
//   });
//
// All helpers are idempotent — safe to call once per page load.
// =============================================================

(function (global) {
  const ORG = global.KC_ORG;
  if (!ORG) {
    console.warn("[KCSeo] window.KC_ORG missing — load components/kc-org.js first");
  }

  const SITE_URL = (ORG && ORG.url) || "https://keys-caldwell.com";

  function abs(path) {
    if (!path) return "";
    if (/^https?:/.test(path)) return path;
    if (!path.startsWith("/")) path = "/" + path;
    return SITE_URL.replace(/\/$/, "") + path;
  }

  function setMeta(attr, value, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${value}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, value);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function setLink(rel, href) {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
  }

  function injectJsonLd(id, data) {
    if (!data) return;
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data, null, 2);
  }

  // ─── Schema builders ───────────────────────────────────────
  function organizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type":   "Organization",
      "@id":     SITE_URL + "/#organization",
      name:      ORG.name,
      legalName: ORG.legalName,
      url:       SITE_URL,
      logo:      abs(ORG.logo),
      foundingDate: ORG.founded,
      telephone: ORG.phone,
      email:     ORG.email,
      address: {
        "@type":         "PostalAddress",
        streetAddress:   ORG.address.streetAddress,
        addressLocality: ORG.address.addressLocality,
        addressRegion:   ORG.address.addressRegion,
        postalCode:      ORG.address.postalCode,
        addressCountry:  ORG.address.addressCountry,
      },
      sameAs: ORG.sameAs && ORG.sameAs.length ? ORG.sameAs : undefined,
    };
  }

  function localBusinessSchema(opts) {
    return {
      "@context":   "https://schema.org",
      "@type":      "ProfessionalService",
      "@id":        SITE_URL + "/#localbusiness",
      name:         ORG.name,
      image:        abs(ORG.logo),
      url:          SITE_URL,
      telephone:    ORG.phone,
      email:        ORG.email,
      priceRange:   "$$",
      address: {
        "@type":         "PostalAddress",
        streetAddress:   ORG.address.streetAddress,
        addressLocality: ORG.address.addressLocality,
        addressRegion:   ORG.address.addressRegion,
        postalCode:      ORG.address.postalCode,
        addressCountry:  ORG.address.addressCountry,
      },
      geo: ORG.geo ? {
        "@type":   "GeoCoordinates",
        latitude:  ORG.geo.latitude,
        longitude: ORG.geo.longitude,
      } : undefined,
      openingHoursSpecification: [{
        "@type":     "OpeningHoursSpecification",
        dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens:       "08:30",
        closes:      "17:00",
      }],
      areaServed: (ORG.areaServed || []).map(name => ({ "@type": "City", name })),
      sameAs: ORG.sameAs && ORG.sameAs.length ? ORG.sameAs : undefined,
    };
  }

  function serviceSchema(svc, pageUrl) {
    return {
      "@context":   "https://schema.org",
      "@type":      "Service",
      "@id":        abs(pageUrl) + "#service",
      name:         svc.name,
      serviceType:  svc.name,
      provider:     { "@id": SITE_URL + "/#organization" },
      areaServed:   (svc.areaServed || ORG.areaServed || []).map(name => ({ "@type": "City", name })),
      description:  svc.description,
      url:          abs(pageUrl),
    };
  }

  function faqSchema(faqs) {
    if (!faqs || !faqs.length) return null;
    return {
      "@context": "https://schema.org",
      "@type":    "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name:    q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
  }

  function breadcrumbSchema(crumbs, pageUrl) {
    if (!crumbs || crumbs.length < 2) return null;
    return {
      "@context": "https://schema.org",
      "@type":    "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type":   "ListItem",
        position:  i + 1,
        name:      c.label,
        item:      i === crumbs.length - 1 ? abs(pageUrl) : abs(c.href || pageUrl),
      })),
    };
  }

  function articleSchema(article, pageUrl) {
    if (!article) return null;
    // Resolve author from either:
    //   (a) lookup by authorId in ORG.authors  (legacy)
    //   (b) inline { name, jobTitle, credentials } object (preferred)
    const lookup = article.authorId && ORG.authors && ORG.authors[article.authorId];
    const inline = (article.author && typeof article.author === 'object') ? article.author : null;
    const author = lookup || inline;

    let authorNode;
    if (author) {
      authorNode = {
        "@type":    "Person",
        name:       author.name,
        jobTitle:   author.jobTitle,
        url:        author.url ? abs(author.url) : undefined,
        knowsAbout: author.knowsAbout || author.credentials,
        worksFor:   { "@id": SITE_URL + "/#organization" },
      };
      // strip undefined keys so the JSON-LD stays clean
      Object.keys(authorNode).forEach(k => authorNode[k] === undefined && delete authorNode[k]);
    }

    return {
      "@context":   "https://schema.org",
      "@type":      "Article",
      headline:     article.headline,
      description:  article.description,
      datePublished: article.datePublished,
      dateModified:  article.dateModified || article.datePublished,
      author:       authorNode,
      publisher:    { "@id": SITE_URL + "/#organization" },
      image:        article.image ? abs(article.image) : undefined,
      mainEntityOfPage: { "@type": "WebPage", "@id": abs(pageUrl) },
    };
  }

  // ─── Public API ────────────────────────────────────────────
  function apply(meta, opts) {
    if (!meta) {
      console.warn("[KCSeo] no meta block on this page — SEO data missing");
      return;
    }
    opts = opts || {};
    const pageUrl   = opts.pageUrl || meta.canonical || "/";
    const canonical = abs(meta.canonical || pageUrl);
    const ogImage   = abs(meta.ogImage || ORG.ogImage || ORG.logo);

    // Title + description
    if (meta.title)        document.title = meta.title;
    if (meta.description)  setMeta("name", "description", meta.description);
    setLink("canonical", canonical);
    setMeta("name", "robots", meta.robots || "index, follow, max-image-preview:large");

    // Open Graph
    setMeta("property", "og:type",        opts.pageType === "blog" ? "article" : "website");
    setMeta("property", "og:title",       meta.ogTitle || meta.title);
    setMeta("property", "og:description", meta.ogDescription || meta.description);
    setMeta("property", "og:url",         canonical);
    setMeta("property", "og:site_name",   ORG.name);
    setMeta("property", "og:image",       ogImage);

    // Twitter
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       meta.ogTitle || meta.title);
    setMeta("name", "twitter:description", meta.ogDescription || meta.description);
    setMeta("name", "twitter:image",       ogImage);
    if (ORG.twitter) setMeta("name", "twitter:site", ORG.twitter);

    // Geo (helps local pack)
    if (ORG.geo) {
      setMeta("name", "geo.region",      ORG.address.addressCountry + "-" + ORG.address.addressRegion);
      setMeta("name", "geo.placename",   ORG.address.addressLocality);
      setMeta("name", "geo.position",    `${ORG.geo.latitude};${ORG.geo.longitude}`);
      setMeta("name", "ICBM",            `${ORG.geo.latitude}, ${ORG.geo.longitude}`);
    }

    // ─── JSON-LD ────────────────────────────────────────────
    // Sitewide always-on:
    injectJsonLd("ld-organization",   organizationSchema());

    const schemas = (meta.schema || []).map(s => s.toLowerCase());
    if (schemas.includes("localbusiness"))  injectJsonLd("ld-localbusiness", localBusinessSchema());
    if (schemas.includes("service") && opts.service)
                                            injectJsonLd("ld-service",       serviceSchema(opts.service, pageUrl));
    if (schemas.includes("faqpage")  && opts.faqs)
                                            injectJsonLd("ld-faqpage",       faqSchema(opts.faqs));
    if (schemas.includes("breadcrumblist") && opts.breadcrumbs)
                                            injectJsonLd("ld-breadcrumblist", breadcrumbSchema(opts.breadcrumbs, pageUrl));
    if (schemas.includes("article")   && opts.article)
                                            injectJsonLd("ld-article",       articleSchema(opts.article, pageUrl));
  }

  global.KCSeo = { apply };
})(typeof window !== "undefined" ? window : this);
