// =====================================================================
// Keys-Caldwell — Geo page primitives
// ---------------------------------------------------------------------
// Used by: /condo-association-management-sarasota/<city>/index.html
//          /hoa-management-company-sarasota/<city>/index.html
//
// Geo pages are 400-600 word local-pack landing pages. Their job is
// to rank for "<service> + <city>" queries and convert ~5% of traffic
// to /request-proposal/. Keep the surface tight — boards searching
// at the city level are usually further down the funnel than boards
// landing on a pillar page.
//
// Composition order (fixed):
//   KCNav · KCBreadcrumbs ·
//   KCGeoHero · KCGeoIntro · KCGeoCommunities · KCGeoDirections ·
//   KCTestimonial · KCCtaBand · KCFooter
//
// All copy slots are populated from CONTENT in the page HTML.
// =====================================================================

// ---------- KCGeoHero ----------
// Short hero that names the city in the H1 and pairs with one
// 1–2 sentence promise. NO marketing illustration — boards searching
// at this depth want to see real coverage, not stock imagery.
const KCGeoHero = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-geohero">
      <div className="kc-container">
        <div className="kc-geohero-grid">
          <div className="kc-geohero-text">
            {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
            <h1 className="kc-geohero-h1">
              {c.titlePlain}
              {c.titleItalic && <em> {c.titleItalic}</em>}
            </h1>
            {c.lede && <p className="kc-geohero-lede">{c.lede}</p>}
            <div className="kc-geohero-ctas">
              {c.primaryCta && (
                <a className="kc-btn kc-btn-primary" href={window.kcHref ? window.kcHref(c.primaryCta.href) : c.primaryCta.href}>
                  {c.primaryCta.label}
                </a>
              )}
              {c.secondaryCta && (
                <a className="kc-btn kc-btn-ghost" href={window.kcHref ? window.kcHref(c.secondaryCta.href) : c.secondaryCta.href}>
                  {c.secondaryCta.label}
                </a>
              )}
            </div>
          </div>
          <aside className="kc-geohero-meta">
            <div className="kc-geohero-meta-row"><span>From HQ</span><strong>{c.distance || '—'}</strong></div>
            <div className="kc-geohero-meta-row"><span>Communities here</span><strong>{c.communitiesCount || '—'}</strong></div>
            <div className="kc-geohero-meta-row"><span>Manager visits</span><strong>{c.visitCadence || 'Monthly'}</strong></div>
            <div className="kc-geohero-meta-row"><span>Response SLA</span><strong>{c.responseSla || '5 business days'}</strong></div>
          </aside>
        </div>
      </div>
    </section>
  );
};

// ---------- KCGeoIntro ----------
// The one-screen "we know this market" paragraph. Boards know
// fluff when they see it — make it specific to the building stock,
// the construction era, and the operational realities of THIS city.
const KCGeoIntro = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-geointro">
      <div className="kc-container">
        <div className="kc-geointro-grid">
          <div className="kc-geointro-side">
            {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
            <h2 className="kc-geointro-h2">
              {c.titlePlain}
              {c.titleItalic && <em> {c.titleItalic}</em>}
            </h2>
          </div>
          <div className="kc-geointro-body">
            {(c.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- KCGeoCommunities ----------
// "Communities served" strip — typed list, no logos. Each row is
// type / unit count / area. Keeps it concrete without naming any
// association the board hasn't approved naming.
const KCGeoCommunities = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-geocomm">
      <div className="kc-container">
        <div className="kc-geocomm-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-geocomm-h2">
            {c.titlePlain}
            {c.titleItalic && <em> {c.titleItalic}</em>}
          </h2>
        </div>
        <ul className="kc-geocomm-list">
          {(c.items || []).map((it, i) => (
            <li className="kc-geocomm-row" key={i}>
              <span className="kc-geocomm-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="kc-geocomm-type">{it.type}</span>
              <span className="kc-geocomm-units">{it.units}</span>
              <span className="kc-geocomm-area">{it.area}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// ---------- KCGeoDirections ----------
// Natural-language driving directions paragraph. Helps for
// "near me" / mobile local queries. Pair with the explicit
// "from HQ" distance from KCGeoHero so Google's local model
// has consistent geocoding signals.
const KCGeoDirections = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-geodir">
      <div className="kc-container">
        <div className="kc-geodir-grid">
          <div className="kc-geodir-side">
            {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
            <h2 className="kc-geodir-h2">
              {c.titlePlain}
              {c.titleItalic && <em> {c.titleItalic}</em>}
            </h2>
          </div>
          <div className="kc-geodir-body">
            {(c.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
            {c.address && (
              <address className="kc-geodir-address">
                <strong>Keys-Caldwell, Inc.</strong><br/>
                {c.address.street}<br/>
                {c.address.city}, {c.address.region} {c.address.zip}<br/>
                <a href={`tel:${(c.address.phone || '').replace(/\D/g,'')}`}>{c.address.phone}</a>
              </address>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  KCGeoHero, KCGeoIntro, KCGeoCommunities, KCGeoDirections,
});
