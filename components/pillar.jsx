// Keys-Caldwell — Pillar / service-page component primitives
// =============================================================
// These are the templating components specifically used on
// service-pillar pages (Condo, HOA). Loaded after shared.jsx.
//
// All sections accept a `content` prop. Page files pass in
// their CONTENT object slice; components have no defaults of
// their own — pillar pages must provide all copy.
// =============================================================

// ---------- KCPillarHero ----------
// content = {
//   numeral, eyebrow, titlePlain, titleItalic, lede,
//   primaryCta, secondaryCta,
//   aside: { eyebrow, h, p, stats: [{num, suffix?, label}] }
// }
const KCPillarHero = ({ content: c }) => (
  <section className="kc-pillar-hero">
    <div className="kc-container">
      <div>
        <div className="kc-pillar-hero-eye">
          <span className="kc-pillar-hero-numeral">N<sup>o</sup>{c.numeral}</span>
          <span>{c.eyebrow}</span>
        </div>
        <h1 className="kc-pillar-hero-h">{italicize(c.titlePlain, c.titleItalic)}</h1>
        <hr className="kc-pillar-hero-rule" />
        <p className="kc-pillar-hero-lede">{c.lede}</p>
        <div className="kc-pillar-hero-cta">
          <a className="kc-btn kc-btn-primary kc-btn-lg" href={window.kcHref ? window.kcHref(c.primaryCta.href) : c.primaryCta.href}>{c.primaryCta.label} <span className="kc-arrow">→</span></a>
          <a className="kc-btn kc-btn-secondary kc-btn-lg" href={window.kcHref ? window.kcHref(c.secondaryCta.href) : c.secondaryCta.href}>{c.secondaryCta.label}</a>
        </div>
      </div>
      <aside className="kc-pillar-hero-aside">
        <div className="kc-pillar-hero-aside-eye">{c.aside.eyebrow}</div>
        <h3 className="kc-pillar-hero-aside-h">{c.aside.h}</h3>
        <p className="kc-pillar-hero-aside-p">{c.aside.p}</p>
        <div className="kc-pillar-hero-stats">
          {c.aside.stats.map(s => (
            <div key={s.label}>
              <div className="kc-pillar-hero-stat-num">{s.num}{s.suffix ? <small>{s.suffix}</small> : null}</div>
              <div className="kc-pillar-hero-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  </section>
);

// ---------- KCProblem ----------
// content = { eyebrow, titlePlain, titleItalic, intro, cards: [{n, h, p}] }
const KCProblem = ({ content: c }) => (
  <section className="kc-problem">
    <div className="kc-container">
      <div className="kc-eyebrow on-dark">{c.eyebrow}</div>
      <h2 className="kc-problem-h">{italicize(c.titlePlain, c.titleItalic)}</h2>
      <p className="kc-problem-intro">{c.intro}</p>
      <div className="kc-problem-grid">
        {c.cards.map(card => (
          <article key={card.n} className="kc-problem-card">
            <div className="kc-problem-card-num">No.{card.n}</div>
            <h3 className="kc-problem-card-h">{card.h}</h3>
            <p className="kc-problem-card-p">{card.p}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ---------- KCPillarServices ----------
// content = { eyebrow, titlePlain, titleItalic, intro, services: [{icon, n, title, desc, bullets}] }
const KCPillarServices = ({ content: c }) => (
  <section className="kc-pillar-services">
    <div className="kc-container">
      <div className="kc-eyebrow">{c.eyebrow}</div>
      <h2 className="kc-section-title">{italicize(c.titlePlain, c.titleItalic)}</h2>
      <hr className="kc-rule" />
      <p className="kc-section-intro">{c.intro}</p>
      <div className="kc-pillar-services-grid">
        {c.services.map(s => (
          <article key={s.title} className="kc-pillar-service">
            <div className="kc-pillar-service-head">
              <div className="kc-pillar-service-icon"><i data-lucide={s.icon}></i></div>
              <div>
                <div className="kc-pillar-service-num">No.{s.n}</div>
                <h3 className="kc-pillar-service-title">{s.title}</h3>
              </div>
            </div>
            <p className="kc-pillar-service-desc">{s.desc}</p>
            {s.bullets && s.bullets.length > 0 && (
              <ul className="kc-pillar-service-list">
                {s.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ---------- KCCapital ----------
// content = { eyebrow, titlePlain, titleItalic, intro, tiles: [{n, h, p}] }
const KCCapital = ({ content: c }) => (
  <section className="kc-capital">
    <div className="kc-container">
      <div className="kc-eyebrow">{c.eyebrow}</div>
      <h2 className="kc-section-title">{italicize(c.titlePlain, c.titleItalic)}</h2>
      <hr className="kc-rule" />
      <p className="kc-section-intro">{c.intro}</p>
      <div className="kc-capital-grid">
        {c.tiles.map(t => (
          <article key={t.h} className="kc-capital-tile">
            <div className="kc-capital-tile-num">No.{t.n}</div>
            <div>
              <h3 className="kc-capital-tile-h">{t.h}</h3>
              <p className="kc-capital-tile-p">{t.p}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// ---------- KCFeature (deep-dive band — left text, right tier card) ----------
// content = {
//   eyebrow, titlePlain, titleItalic, body, bullets,
//   card: { eyebrow, h, tiers: [{ price, name, desc }] }
// }
const KCFeature = ({ content: c }) => (
  <section className="kc-feature">
    <div className="kc-container">
      <div className="kc-feature-grid">
        <div>
          <div className="kc-feature-eye">{c.eyebrow}</div>
          <h2 className="kc-feature-h">{italicize(c.titlePlain, c.titleItalic)}</h2>
          <p className="kc-feature-p">{c.body}</p>
          {c.bullets && c.bullets.length > 0 && (
            <ul className="kc-feature-list">
              {c.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          )}
        </div>
        <aside className="kc-feature-card">
          <div className="kc-feature-card-eye">{c.card.eyebrow}</div>
          <h3 className="kc-feature-card-h">{c.card.h}</h3>
          <div className="kc-feature-card-tiers">
            {c.card.tiers.map(t => (
              <div key={t.name} className="kc-feature-tier">
                <div className="kc-feature-tier-price">{t.price}</div>
                <div>
                  <div className="kc-feature-tier-name">{t.name}</div>
                  <p className="kc-feature-tier-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  </section>
);

// ---------- KCFAQ ----------
// content = { titlePlain, titleItalic, side, items: [{q, a}] }
// `a` may be a plain string or an array of paragraph strings.
const KCFAQ = ({ content: c }) => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="kc-faq">
      <div className="kc-container">
        <div className="kc-faq-grid">
          <div>
            <div className="kc-eyebrow">Frequently asked</div>
            <h2 className="kc-faq-h">{italicize(c.titlePlain, c.titleItalic)}</h2>
            <p className="kc-faq-side-p">{c.side}</p>
          </div>
          <div className="kc-faq-list">
            {c.items.map((it, i) => {
              const isOpen = open === i;
              const paragraphs = Array.isArray(it.a) ? it.a : [it.a];
              return (
                <div key={it.q} className={'kc-faq-item' + (isOpen ? ' is-open' : '')}>
                  <button className="kc-faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span>{it.q}</span>
                    <span className="kc-faq-q-icon">+</span>
                  </button>
                  <div className="kc-faq-a">
                    <div className="kc-faq-a-inner">
                      {paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- KCCoverage ----------
// content = { titlePlain, titleItalic, primaryPlace, places: [string] }
const KCCoverage = ({ content: c }) => (
  <section className="kc-coverage">
    <div className="kc-container">
      <div className="kc-coverage-grid">
        <h2 className="kc-coverage-h">{italicize(c.titlePlain, c.titleItalic)}</h2>
        <div className="kc-coverage-list">
          {c.primaryPlace && <span className="kc-coverage-pill is-primary">{c.primaryPlace}</span>}
          {c.places.map(p => <span key={p} className="kc-coverage-pill">{p}</span>)}
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, {
  KCPillarHero, KCProblem, KCPillarServices, KCCapital,
  KCFeature, KCFAQ, KCCoverage
});
