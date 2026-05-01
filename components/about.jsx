// =====================================================================
// Keys-Caldwell — About page primitives
// ---------------------------------------------------------------------
// Used by: /about/index.html
//
// The About page is the firm's primary trust signal — boards
// scrutinize this page during vendor evaluation. Credentials,
// licenses, and founder bios must read as VERIFIABLE, not as
// marketing copy.
//
// Composition order (fixed):
//   KCNav · KCBreadcrumbs ·
//   KCAboutHero · KCFounders · KCCredentials · KCTimeline ·
//   KCValues · KCTestimonialPair · KCCtaBand · KCFooter
// =====================================================================

// ---------- KCAboutHero ----------
// One-screen positioning statement. No photo of a stock skyline.
// Boards want to know who runs the firm, where it's based, and
// how long it's been at the same address. Lead with that.
const KCAboutHero = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-abouthero">
      <div className="kc-container">
        <div className="kc-abouthero-grid">
          <div className="kc-abouthero-text">
            {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
            <h1 className="kc-abouthero-h1">
              {c.titlePlain}
              {c.titleItalic && <em> {c.titleItalic}</em>}
            </h1>
            <hr className="kc-abouthero-rule" />
            {(c.paragraphs || []).map((p, i) => (
              <p className="kc-abouthero-p" key={i}>{p}</p>
            ))}
          </div>
          <aside className="kc-abouthero-card">
            <div className="kc-abouthero-card-eye">{c.cardEyebrow || 'At a glance'}</div>
            <ul className="kc-abouthero-stats">
              {(c.stats || []).map((s, i) => (
                <li key={i}>
                  <strong>{s.num}{s.suffix && <span>{s.suffix}</span>}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

// ---------- KCFounders ----------
// Real photo slots. If we don't have photos at launch, the slot
// renders as a typographic placeholder (initials in brass) — better
// than stock or AI-generated faces. Boards immediately recognize
// stock photography of "professional team in suits."
const KCFounders = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-founders">
      <div className="kc-container">
        <div className="kc-founders-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-founders-h2">
            {c.titlePlain}
            {c.titleItalic && <em> {c.titleItalic}</em>}
          </h2>
        </div>
        <div className="kc-founders-grid">
          {(c.people || []).map((p, i) => (
            <article className="kc-founder" key={i}>
              <div className="kc-founder-portrait">
                {p.photo
                  ? <img src={p.photo} alt={p.name} width="320" height="320" loading="lazy" />
                  : <span className="kc-founder-initials">{p.initials}</span>}
              </div>
              <div className="kc-founder-body">
                <div className="kc-founder-name">{p.name}</div>
                <div className="kc-founder-role">{p.role}</div>
                {(p.credentials && p.credentials.length > 0) && (
                  <ul className="kc-founder-creds">
                    {p.credentials.map((cr, j) => <li key={j}>{cr}</li>)}
                  </ul>
                )}
                <div className="kc-founder-bio">
                  {(p.bio || []).map((para, j) => <p key={j}>{para}</p>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- KCCredentials ----------
// Verifiable institutional credentials. License numbers, year
// certified, professional memberships. Boards CHECK these on
// state databases — accuracy matters here more than anywhere
// else on the site.
const KCCredentials = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-creds">
      <div className="kc-container">
        <div className="kc-creds-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-creds-h2">
            {c.titlePlain}
            {c.titleItalic && <em> {c.titleItalic}</em>}
          </h2>
          {c.intro && <p className="kc-creds-intro">{c.intro}</p>}
        </div>
        <div className="kc-creds-grid">
          {(c.items || []).map((it, i) => (
            <div className="kc-cred" key={i}>
              <div className="kc-cred-abbr">{it.abbr}</div>
              <div className="kc-cred-name">{it.name}</div>
              <div className="kc-cred-issuer">{it.issuer}</div>
              {it.detail && <div className="kc-cred-detail">{it.detail}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- KCTimeline ----------
// Three-era retelling of the firm. Differs from KCHeritage by
// running vertically with milestone counts per era — the goal is
// to make tenure feel like operational accumulation, not just age.
const KCTimeline = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-timeline">
      <div className="kc-container">
        <div className="kc-timeline-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-timeline-h2">
            {c.titlePlain}
            {c.titleItalic && <em> {c.titleItalic}</em>}
          </h2>
        </div>
        <ol className="kc-timeline-list">
          {(c.eras || []).map((era, i) => (
            <li className="kc-era" key={i}>
              <div className="kc-era-side">
                <div className="kc-era-year">{era.year}</div>
                <div className="kc-era-label">{era.label}</div>
              </div>
              <div className="kc-era-body">
                <div className="kc-era-title">{era.title}</div>
                <p className="kc-era-p">{era.body}</p>
                {era.milestones && (
                  <ul className="kc-era-milestones">
                    {era.milestones.map((m, j) => <li key={j}>{m}</li>)}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

// ---------- KCValues ----------
// Operating principles, written as commitments not aspirations.
// Each value pairs with what we DON'T do — negative space is
// what makes a value statement actually mean something.
const KCValues = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-values">
      <div className="kc-container">
        <div className="kc-values-head">
          {c.eyebrow && <div className="kc-eyebrow">{c.eyebrow}</div>}
          <h2 className="kc-values-h2">
            {c.titlePlain}
            {c.titleItalic && <em> {c.titleItalic}</em>}
          </h2>
        </div>
        <div className="kc-values-grid">
          {(c.items || []).map((v, i) => (
            <div className="kc-value" key={i}>
              <div className="kc-value-n">{String(i + 1).padStart(2, '0')}</div>
              <div className="kc-value-h">{v.h}</div>
              <p className="kc-value-p">{v.p}</p>
              {v.negative && (
                <div className="kc-value-neg">
                  <span>What this means we don't do:</span> {v.negative}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  KCAboutHero, KCFounders, KCCredentials, KCTimeline, KCValues,
});
