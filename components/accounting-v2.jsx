// =============================================================
// /components/accounting-v2.jsx
// =============================================================
// V2-only components for /accounting/v2/ — built around copy
// supplied for the version-2 exploration. Reuses V1's Stoplight,
// CPA spotlight, FAQ, breadcrumbs/nav/footer wholesale.
//
// V2-specific components (5):
//   KCAcctV2Hero       — empathetic hero with 3-stat trust strip
//   KCAcctV2Why        — "Why this page exists" validation beat
//   KCAcctV2Brochure   — what's-included grid + monthly packet preview
//   KCAcctV2Pillars    — 3-pillar methodology (Infra / QC / Cadence)
//   KCAcctV2Florida    — SIRS / post-Champlain / insurance + signature story
//   KCAcctV2Proof      — 6-card credibility grid + national/local quote
//   KCAcctV2Final      — empathetic close ("you volunteered for this")
// =============================================================

const v2Italicize = (plain, italic) => {
  if (!plain) return null;
  if (!italic) return plain;
  const idx = plain.lastIndexOf(italic);
  if (idx === -1) return plain;
  return (
    <>
      {plain.slice(0, idx)}
      <em>{italic}</em>
      {plain.slice(idx + italic.length)}
    </>
  );
};

// ---------- KCAcctV2Hero ----------
const KCAcctV2Hero = ({ content: c }) => (
  <section className="kc-v2-hero">
    <div className="kc-container">
      <div className="kc-v2-hero-grid">
        <div className="kc-v2-hero-text">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h1 className="kc-v2-hero-h1">{v2Italicize(c.titlePlain, c.titleItalic)}</h1>
          <p className="kc-v2-hero-sub">{c.sub}</p>
          <div className="kc-v2-hero-ctas">
            <a href={c.primaryCta.href} className="kc-btn kc-btn-primary kc-btn-lg">{c.primaryCta.label}</a>
            <a href={c.secondaryCta.href} className="kc-v2-hero-ghost">{c.secondaryCta.label} <span aria-hidden="true">→</span></a>
          </div>
          <div className="kc-v2-hero-trust">
            {c.trust.map((t, i) => (
              <div key={i} className="kc-v2-hero-trust-item">
                <span className="kc-v2-hero-trust-num">{t.num}</span>
                <span className="kc-v2-hero-trust-lbl">{t.lbl}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="kc-v2-hero-img" role="img" aria-label={c.imgAlt}>
          <div className="kc-v2-hero-img-fill"></div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- KCAcctV2Why ----------
const KCAcctV2Why = ({ content: c }) => (
  <section className="kc-v2-why">
    <div className="kc-container kc-v2-why-inner">
      <div className="kc-eyebrow">{c.eyebrow}</div>
      <h2 className="kc-v2-why-h">{c.h}</h2>
      <em className="kc-v2-anchor">{c.anchor}</em>
      {c.paragraphs.map((p, i) => <p key={i} className="kc-v2-why-p">{p}</p>)}
    </div>
  </section>
);

// ---------- KCAcctV2Brochure ----------
const KCAcctV2Brochure = ({ content: c }) => (
  <section className="kc-v2-broch">
    <div className="kc-container">
      <div className="kc-v2-broch-grid">
        <div className="kc-v2-broch-text">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-v2-broch-h">{v2Italicize(c.titlePlain, c.titleItalic)}</h2>
          <em className="kc-v2-anchor">{c.anchor}</em>
          <p className="kc-v2-broch-p">{c.body}</p>
          <ul className="kc-v2-deliv-list">
            {c.deliverables.map((d, i) => (
              <li key={i} className="kc-v2-deliv-item">
                <span className="kc-v2-deliv-dot" aria-hidden="true"></span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="kc-v2-packet" id="packet">
          <header className="kc-v2-packet-h">
            <div className="kc-v2-packet-icon">M</div>
            <div>
              <div className="kc-v2-packet-t">{c.packet.title}</div>
              <div className="kc-v2-packet-s">{c.packet.subtitle}</div>
            </div>
          </header>
          <ol className="kc-v2-packet-list">
            {c.packet.rows.map((r, i) => (
              <li key={i} className="kc-v2-packet-row">
                <span className="kc-v2-packet-row-t">{r.t}</span>
                <span className="kc-v2-packet-row-d">{r.d}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  </section>
);

// ---------- KCAcctV2Pillars ----------
// 3-pillar methodology (Infrastructure / QC / Cadence). Cards have
// indigo / brass / driftwood top accents to keep visual rhythm.
const KCAcctV2Pillars = ({ content: c }) => (
  <section className="kc-v2-pillars">
    <div className="kc-container">
      <div className="kc-v2-pillars-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-v2-pillars-h">{v2Italicize(c.titlePlain, c.titleItalic)}</h2>
        <em className="kc-v2-anchor">{c.anchor}</em>
        <p className="kc-v2-pillars-intro">{c.intro}</p>
      </div>
      <div className="kc-v2-pillars-grid">
        {c.pillars.map((p, i) => (
          <article key={i} className="kc-v2-pillar">
            <div className="kc-v2-pillar-num">{p.num}</div>
            <h3 className="kc-v2-pillar-h">{p.h}</h3>
            <p className="kc-v2-pillar-p">{p.p}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ---------- KCAcctV2Florida ----------
// Florida regulatory section with three-h3 column + a Signature Story.
const KCAcctV2Florida = ({ content: c }) => (
  <section className="kc-v2-fl">
    <div className="kc-container">
      <div className="kc-v2-fl-grid">
        <div className="kc-v2-fl-img" role="img" aria-label={c.imgAlt}>
          <div className="kc-v2-fl-img-fill"></div>
        </div>
        <div className="kc-v2-fl-text">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-v2-fl-h">{v2Italicize(c.titlePlain, c.titleItalic)}</h2>
          <em className="kc-v2-anchor">{c.anchor}</em>
          {c.points.map((pt, i) => (
            <React.Fragment key={i}>
              <h3 className="kc-v2-fl-h3">{pt.h}</h3>
              <p className="kc-v2-fl-p" dangerouslySetInnerHTML={{ __html: pt.p }} />
            </React.Fragment>
          ))}
          <aside className="kc-v2-story">
            <span className="kc-v2-story-label">{c.story.label}</span>
            <h4 className="kc-v2-story-h">{c.story.title}</h4>
            <p className="kc-v2-story-p">{c.story.body}</p>
          </aside>
        </div>
      </div>
    </div>
  </section>
);

// ---------- KCAcctV2Proof ----------
// 6-card grid + national/local italic quote strip.
const KCAcctV2Proof = ({ content: c }) => (
  <section className="kc-v2-proof">
    <div className="kc-container">
      <div className="kc-v2-proof-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-v2-proof-h">{c.h}</h2>
        <em className="kc-v2-anchor">{c.anchor}</em>
      </div>
      <div className="kc-v2-proof-grid">
        {c.cards.map((card, i) => (
          <article key={i} className="kc-v2-proof-card">
            <div className="kc-v2-proof-t">{card.t}</div>
            <p className="kc-v2-proof-d">{card.d}</p>
          </article>
        ))}
      </div>
      <div className="kc-v2-natl">
        <div className="kc-eyebrow">{c.natl.eyebrow}</div>
        <p className="kc-v2-natl-p">{c.natl.body}</p>
      </div>
    </div>
  </section>
);

// ---------- KCAcctV2Final ----------
// Empathetic closing CTA ("You volunteered for this...").
const KCAcctV2Final = ({ content: c }) => (
  <section className="kc-v2-final">
    <div className="kc-container kc-v2-final-inner">
      <div className="kc-eyebrow kc-v2-final-eyebrow">{c.eyebrow}</div>
      <h2 className="kc-v2-final-h">{c.h}</h2>
      <p className="kc-v2-final-empathy">{c.empathy}</p>
      <div className="kc-v2-final-ctas">
        <a href={c.primaryCta.href} className="kc-btn kc-btn-primary kc-btn-lg kc-v2-final-primary">{c.primaryCta.label}</a>
        <a href={c.secondaryCta.href} className="kc-btn kc-btn-secondary kc-btn-lg kc-v2-final-secondary">{c.secondaryCta.label}</a>
      </div>
      <div className="kc-v2-final-micro">{c.micro}</div>
    </div>
  </section>
);

Object.assign(window, {
  KCAcctV2Hero,
  KCAcctV2Why,
  KCAcctV2Brochure,
  KCAcctV2Pillars,
  KCAcctV2Florida,
  KCAcctV2Proof,
  KCAcctV2Final,
});
