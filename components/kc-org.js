// Keys-Caldwell — Single source of truth for organization data
// =============================================================
// NAP (Name / Address / Phone) consistency across every page is a
// foundational local-SEO requirement. Edit these values ONCE here
// and every page picks them up — meta tags, JSON-LD schema,
// nav, footer, contact blocks. Do not hard-code NAP anywhere else.
//
// Loaded as a plain <script src> BEFORE the React/Babel pipeline,
// so it's available on window.KC_ORG synchronously.
// =============================================================

window.KC_ORG = {
  // ─── Identity ───────────────────────────────────────────
  name:         "Keys-Caldwell, Inc.",
  legalName:    "Keys-Caldwell, Inc.",
  brandName:    "Keys-Caldwell",
  tagline:      "Personal attention with professional results.",
  founded:      "1978",
  acquired:     "2024",
  url:          "https://keys-caldwell.com",
  logo:         "/assets/KC_Logo_Navy.svg",   // absolute path from web root
  ogImage:      "/assets/og/keys-caldwell-default.jpg", // 1200×630 — TODO: produce
  twitter:      "",                            // @handle if/when established

  // ─── NAP — Name, Address, Phone ─────────────────────────
  // These EXACT strings must appear identically on every page,
  // every directory listing, and the Google Business Profile.
  // Inconsistent NAP suppresses local map-pack rankings.
  address: {
    streetAddress:   "1162 Indian Hills Blvd",
    addressLocality: "Venice",
    addressRegion:   "FL",
    postalCode:      "34293",
    addressCountry:  "US",
  },
  geo: {
    latitude:  27.0814,    // approx — replace with surveyed coordinates if available
    longitude: -82.4060,
  },
  phone:  "(941) 485-0605",
  email:  "info@keys-caldwell.com",
  hours:  "Mo-Fr 08:30-17:00",   // schema.org openingHours format
  hoursDisplay: "Mon – Fri · 8:30am – 5:00pm ET",

  // ─── Social / Same-as ────────────────────────────────────
  // Add canonical profile URLs as they go live. Helps Knowledge
  // Graph entity disambiguation.
  sameAs: [
    // "https://www.facebook.com/keyscaldwell",
    // "https://www.linkedin.com/company/keys-caldwell",
    // "https://www.bbb.org/us/fl/venice/profile/property-management/keys-caldwell-inc-...",
  ],

  // ─── Service area (used in LocalBusiness areaServed) ─────
  areaServed: [
    "Venice, FL",
    "Sarasota, FL",
    "Longboat Key, FL",
    "Nokomis, FL",
    "Osprey, FL",
    "Englewood, FL",
    "North Port, FL",
    "Bradenton, FL",
    "Lakewood Ranch, FL",
    "Port Charlotte, FL",
    "Punta Gorda, FL",
    "Sarasota County, FL",
    "Manatee County, FL",
    "Charlotte County, FL",
  ],

  // ─── Credentials surfaced in Organization schema ─────────
  credentials: [
    "BBB A+ Accredited",
    "Florida CAM Licensed",
    "Independently owned",
  ],

  // ─── People (for Author / Person schema in blog posts) ───
  // E-E-A-T signal: AI search engines and Google's quality
  // raters weight content authored by named, credentialed
  // experts more heavily than anonymous corporate copy.
  authors: {
    bradley: {
      id:        "james-bradley",
      name:      "James Bradley",
      jobTitle:  "President",
      bio:       "James Bradley acquired Keys-Caldwell in 2024 after a national career in community-association capital project management. He oversees the firm's strategy, capital project division, and the integration of CityBooks accounting and AccuReserve reserve studies.",
      image:     "/assets/team/james-bradley.jpg",  // TODO: produce
      url:       "/about/index.html#james-bradley",
      sameAs:    [],
      knowsAbout: ["Community association management", "Reserve studies", "Capital project management", "Florida SIRS compliance"],
    },
    wilson: {
      id:        "lauren-wilson",
      name:      "Lauren Wilson",
      jobTitle:  "Director of Operations",
      bio:       "Lauren Wilson leads day-to-day operations at Keys-Caldwell, including the four-chamber service model, association manager assignments, and onboarding of new condo and HOA clients across Sarasota County.",
      image:     "/assets/team/lauren-wilson.jpg",  // TODO: produce
      url:       "/about/index.html#lauren-wilson",
      sameAs:    [],
      knowsAbout: ["Community association management", "HOA operations", "Board governance", "Florida community associations"],
    },
    duda: {
      id:        "ande-duda",
      name:      "Ande Duda, CPA",
      jobTitle:  "Staff CPA",
      bio:       "Ande Duda is the staff Certified Public Accountant supervising association financials at Keys-Caldwell, providing CPA-level oversight of CityBooks accounting, reserve fund accounting, and monthly financial reporting for every association we manage.",
      image:     "/assets/team/ande-duda.jpg",  // TODO: produce
      url:       "/about/index.html#ande-duda",
      sameAs:    [],
      knowsAbout: ["Community association accounting", "Reserve fund accounting", "GAAP for HOAs and condos"],
    },
  },
};
