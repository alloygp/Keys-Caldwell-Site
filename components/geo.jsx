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

// Splits a headline string into "before <em>italic</em> after" using the
// chosen italic substring. If italic isn't present in plain, renders plain
// alone (no double-print). Mirror of the helper in shared.jsx.
const geoItalicize = (text, italicPart) => {
  if (!italicPart || !text) return text;
  if (!text.includes(italicPart)) return text;
  const [before, after] = text.split(italicPart);
  return <>{before}<em>{italicPart}</em>{after}</>;
};

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
              {geoItalicize(c.titlePlain, c.titleItalic)}
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
              {geoItalicize(c.titlePlain, c.titleItalic)}
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
            {geoItalicize(c.titlePlain, c.titleItalic)}
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
              {geoItalicize(c.titlePlain, c.titleItalic)}
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

// ---------- KCGeoServices ----------
// Service-pillar tile strip for geo pages. Sits between
// KCGeoCommunities and KCGeoDirections. Sends boards back
// up to the four parent pillars — the geo page is local
// proof, but the actual service description lives upstream.
//
// content = {
//   eyebrow, titlePlain, titleItalic, intro,
//   tiles: [{ label, blurb, href, footnote? }]
// }
const KCGeoServices = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-geosvc">
      <div className="kc-container">
        <div className="kc-geosvc-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-geosvc-h2">
            {geoItalicize(c.titlePlain, c.titleItalic)}
          </h2>
          {c.intro && <p className="kc-geosvc-intro">{c.intro}</p>}
        </div>
        <div className="kc-geosvc-grid">
          {(c.tiles || []).map((t, i) => (
            <a className="kc-geosvc-tile" key={i} href={kcHref(t.href)}>
              <div className="kc-geosvc-tile-n">{String(i + 1).padStart(2, '0')}</div>
              <div className="kc-geosvc-tile-label">{t.label}</div>
              <div className="kc-geosvc-tile-blurb">{t.blurb}</div>
              {t.footnote && <div className="kc-geosvc-tile-foot">{t.footnote}</div>}
              <div className="kc-geosvc-tile-arrow" aria-hidden="true">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- KCGeoLocal ----------
// Reference panel of city-specific local data — building department,
// county records, statute calendar, storm prep. Designed to be the
// most useful link on the page for a board member living in that
// city. Hand-edit the data per-city; do NOT generalize.
//
// content = {
//   eyebrow, titlePlain, titleItalic, intro,
//   notes: [{
//     kind, title, body,
//     items?: [{ k, v, href? }],   // tabular data — name/value rows
//     link?: { label, href }       // single CTA at bottom
//   }]
// }
const KCGeoLocal = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-geolocal">
      <div className="kc-container">
        <div className="kc-geolocal-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-geolocal-h2">
            {geoItalicize(c.titlePlain, c.titleItalic)}
          </h2>
          {c.intro && <p className="kc-geolocal-intro">{c.intro}</p>}
        </div>
        <div className="kc-geolocal-grid">
          {(c.notes || []).map((n, i) => (
            <article className="kc-geolocal-card" key={i}>
              <div className="kc-geolocal-card-kind">{n.kind}</div>
              <h3 className="kc-geolocal-card-title">{n.title}</h3>
              {n.body && <p className="kc-geolocal-card-body">{n.body}</p>}
              {n.items && (
                <dl className="kc-geolocal-card-items">
                  {n.items.map((it, j) => (
                    <div className="kc-geolocal-card-row" key={j}>
                      <dt>{it.k}</dt>
                      <dd>
                        {it.href
                          ? <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel={it.href.startsWith('http') ? 'noopener' : undefined}>{it.v}</a>
                          : it.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {n.link && (
                <a className="kc-geolocal-card-link"
                   href={n.link.href}
                   target={n.link.href.startsWith('http') ? '_blank' : undefined}
                   rel={n.link.href.startsWith('http') ? 'noopener' : undefined}>
                  {n.link.label} <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
        {c.note && <p className="kc-geolocal-note">{c.note}</p>}
      </div>
    </section>
  );
};

Object.assign(window, {
  KCGeoHero, KCGeoIntro, KCGeoCommunities, KCGeoDirections,
  KCGeoServices, KCGeoLocal,
});
