// =============================================================
// /components/reserve-studies.jsx
// =============================================================
// Components specific to /reserve-studies/ — the reserve-study continuum service page.
//
// All seven components below assume:
//   - Tailwind-style class naming via global styles (../reserve-studies.css)
//   - lucide-react icons available globally as window.lucide
//   - The italicize() helper is shared across pillar primitives;
//     we redeclare a local copy here to keep this file self-contained.
//
// Components:
//   KCResStory        — short callout with pull-quote linking to blog deep-dive
//   KCResContinuum    — the 3-tier centerpiece (self / engineered / subscription)
//   KCResHealth       — funding-percentage bands chart with carrier line
//   KCResSchedule     — sample component schedule artifact (table + status badges)
//   KCResSplit        — SIRS vs HOA split (two-column legal-regime explainer)
//   KCResMethodology  — five-phase study process (numbered strip)
//   KCResReceipts     — "what's included in every tier" 8-row ledger
// =============================================================

const resItalicize = (plain, italic) => {
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

// ---------- KCResStory ----------
// content = { eyebrow, titlePlain, titleItalic, body, pull, link: { label, href } }
// Short callout: signature story headline + body, with a callout pull-quote.
// Boards self-identify; the full narrative lives on the blog spoke.
const KCResStory = ({ content: c }) => (
  <section className="kc-res-story">
    <div className="kc-container">
      <div className="kc-res-story-grid">
        <div className="kc-res-story-body">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-res-story-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
          <p className="kc-res-story-p">{c.body}</p>
          <a className="kc-res-story-link" href={kcHref(c.link.href)}>
            {c.link.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <aside className="kc-res-story-pull">
          <span className="kc-res-story-pull-mark" aria-hidden="true">"</span>
          <blockquote className="kc-res-story-pull-q">{c.pull}</blockquote>
        </aside>
      </div>
    </div>
  </section>
);

// ---------- KCResContinuum ----------
// content = {
//   eyebrow, titlePlain, titleItalic, intro, note,
//   tiers: [{ n, price, priceUnit, name, for, desc, includes: [], flag? }]
// }
// The hero-grade 3-tier centerpiece. Each tier is a tall card with
// numeral, price, name, audience, prose, includes-list, optional flag.
const KCResContinuum = ({ content: c }) => (
  <section className="kc-res-continuum">
    <div className="kc-container">
      <div className="kc-res-continuum-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-res-continuum-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-res-continuum-p">{c.intro}</p>
      </div>
      <div className="kc-res-continuum-grid">
        {c.tiers.map((t, i) => (
          <article key={i} className={'kc-res-tier' + (t.flag ? ' has-flag' : '')}>
            {t.flag && <div className="kc-res-tier-flag">{t.flag}</div>}
            <div className="kc-res-tier-numeral">N<sup>o</sup>{t.n}</div>
            <div className="kc-res-tier-price">
              <span className="kc-res-tier-price-num">{t.price}</span>
              <span className="kc-res-tier-price-unit">{t.priceUnit}</span>
            </div>
            <h3 className="kc-res-tier-name">{t.name}</h3>
            <div className="kc-res-tier-for">{t.for}</div>
            <p className="kc-res-tier-desc">{t.desc}</p>
            <ul className="kc-res-tier-list">
              {t.includes.map((it, j) => (
                <li key={j}>
                  <span className="kc-res-tier-check" aria-hidden="true">→</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {c.note && <p className="kc-res-continuum-note">{c.note}</p>}
    </div>
  </section>
);

// ---------- KCResHealth ----------
// content = {
//   eyebrow, titlePlain, titleItalic, intro, note,
//   bands: [{ label, min, max, pct, count, risk: 'high'|'med'|'low'|'ideal', note }],
//   target: { pct, label }
// }
// Horizontal funding-health chart. Shows 0-130% with the four bands,
// proportion of FL associations in each, carrier-comfort target line.
const KCResHealth = ({ content: c }) => {
  const MAX = 130; // chart x-axis ceiling
  return (
    <section className="kc-res-health">
      <div className="kc-container">
        <div className="kc-res-health-head">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-res-health-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
          <p className="kc-res-health-p">{c.intro}</p>
        </div>

        <div className="kc-res-health-frame" role="figure" aria-label="Reserve funding health bands chart">
          {/* X-axis ticks above the bands */}
          <div className="kc-res-health-axis">
            {[0, 30, 70, 100, 130].map((tk, i) => (
              <div key={i} className="kc-res-health-tick" style={{ left: `${(tk / MAX) * 100}%` }}>
                <div className="kc-res-health-tick-line" aria-hidden="true"></div>
                <div className="kc-res-health-tick-label">{tk}%</div>
              </div>
            ))}
          </div>

          {/* The bands */}
          <div className="kc-res-health-bands">
            {c.bands.map((b, i) => {
              const widthPct = ((b.max - b.min) / MAX) * 100;
              const leftPct  = (b.min / MAX) * 100;
              return (
                <div key={i}
                     className={`kc-res-health-band is-${b.risk}`}
                     style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                     role="presentation">
                  <div className="kc-res-health-band-pct">{b.pct}</div>
                  <div className="kc-res-health-band-label">{b.label}</div>
                </div>
              );
            })}
          </div>

          {/* Carrier comfort target line */}
          {c.target && (
            <div className="kc-res-health-target" style={{ left: `${(c.target.pct / MAX) * 100}%` }}>
              <div className="kc-res-health-target-line" aria-hidden="true"></div>
              <div className="kc-res-health-target-label">{c.target.label} · {c.target.pct}%</div>
            </div>
          )}
        </div>

        {/* Per-band detail rows below the chart */}
        <div className="kc-res-health-detail">
          {c.bands.map((b, i) => (
            <div key={i} className={`kc-res-health-detail-row is-${b.risk}`}>
              <div className="kc-res-health-detail-bar">
                <span className={`kc-res-health-detail-dot is-${b.risk}`} aria-hidden="true"></span>
                <div>
                  <div className="kc-res-health-detail-label">{b.label}</div>
                  <div className="kc-res-health-detail-pct">{b.pct}</div>
                </div>
              </div>
              <div className="kc-res-health-detail-count">{b.count}</div>
              <div className="kc-res-health-detail-note">{b.note}</div>
            </div>
          ))}
        </div>

        {c.note && <p className="kc-res-health-note">{c.note}</p>}
      </div>
    </section>
  );
};

// ---------- KCResSchedule ----------
// content = {
//   eyebrow, titlePlain, titleItalic, intro, note,
//   community, asOf, columns: [string],
//   rows: [{ component, cat, ul, remaining, cost, funded, status, note }]
// }
// Stylized reserve-study continuum component schedule. Looks like a real document.
const KCResSchedule = ({ content: c }) => {
  const statusLabel = (s) => ({ ok: 'On schedule', watch: 'Watch', action: 'Action' }[s] || s);
  return (
    <section className="kc-res-sched">
      <div className="kc-container">
        <div className="kc-res-sched-head">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-res-sched-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
          <p className="kc-res-sched-p">{c.intro}</p>
        </div>

        <div className="kc-res-sched-frame" role="figure" aria-label="Sample component schedule">
          <div className="kc-res-sched-bar">
            <div className="kc-res-sched-dots" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div className="kc-res-sched-title">
              reserve-study continuum · Component Schedule · {c.community}
            </div>
            <div className="kc-res-sched-stamp">{c.asOf}</div>
          </div>

          <div className="kc-res-sched-table">
            <div className="kc-res-sched-row kc-res-sched-thead">
              {c.columns.map((col, i) => (
                <div key={i}>{col}</div>
              ))}
            </div>
            {c.rows.map((r, i) => (
              <React.Fragment key={i}>
                <div className="kc-res-sched-row">
                  <div className="kc-res-sched-comp">
                    <div className="kc-res-sched-comp-name">{r.component}</div>
                    <div className="kc-res-sched-comp-cat">{r.cat}</div>
                  </div>
                  <div className="kc-res-sched-cell">{r.ul}</div>
                  <div className="kc-res-sched-cell kc-res-sched-rem">{r.remaining}</div>
                  <div className="kc-res-sched-cell kc-res-sched-cost">{r.cost}</div>
                  <div className="kc-res-sched-funded">
                    <div className="kc-res-sched-funded-num">{r.funded}%</div>
                    <div className="kc-res-sched-funded-track" aria-hidden="true">
                      <div
                        className={`kc-res-sched-funded-fill is-${r.status}`}
                        style={{ width: `${Math.min(100, r.funded)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <span className={`kc-res-sched-badge is-${r.status}`}>
                      <span className="kc-res-sched-dot"></span>
                      {statusLabel(r.status)}
                    </span>
                  </div>
                </div>
                <div className="kc-res-sched-rownote">{r.note}</div>
              </React.Fragment>
            ))}
          </div>

          <div className="kc-res-sched-footnote">{c.note}</div>
        </div>
      </div>
    </section>
  );
};

// ---------- KCResSplit ----------
// content = {
//   eyebrow, titlePlain, titleItalic, intro,
//   columns: [{ eyebrow, h, statute, rows: [{k, v}], link: { label, href } }]
// }
// Two-column legal-regime explainer. SIRS (left) vs HOA (right).
const KCResSplit = ({ content: c }) => (
  <section className="kc-res-split">
    <div className="kc-container">
      <div className="kc-res-split-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-res-split-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-res-split-p">{c.intro}</p>
      </div>
      <div className="kc-res-split-grid">
        {c.columns.map((col, i) => (
          <div key={i} className="kc-res-split-col">
            <div className="kc-res-split-col-head">
              <div className="kc-res-split-col-eye">{col.eyebrow}</div>
              <h3 className="kc-res-split-col-h">{col.h}</h3>
              <div className="kc-res-split-col-statute">{col.statute}</div>
            </div>
            <dl className="kc-res-split-col-list">
              {col.rows.map((r, j) => (
                <div key={j} className="kc-res-split-col-row">
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
            {col.link && (
              <a className="kc-res-split-col-link" href={kcHref(col.link.href)}>
                {col.link.label}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- KCResMethodology ----------
// content = { eyebrow, titlePlain, titleItalic, intro, steps: [{when, h, p}] }
// 5-phase numbered strip. Visually distinct from the accounting methodology
// strip — uses phase numerals, not calendar stamps.
const KCResMethodology = ({ content: c }) => (
  <section className="kc-res-method">
    <div className="kc-container">
      <div className="kc-res-method-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-res-method-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-res-method-p">{c.intro}</p>
      </div>
      <ol className="kc-res-method-strip">
        {c.steps.map((s, i) => (
          <li key={i} className="kc-res-method-step">
            <div className="kc-res-method-when">{s.when}</div>
            <div className="kc-res-method-h3">{s.h}</div>
            <p className="kc-res-method-body">{s.p}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------- KCResReceipts ----------
// content = { eyebrow, titlePlain, titleItalic, intro, items: [{title, desc}] }
// 8 specific deliverables. Two-column ledger layout, mirrors accounting.
const KCResReceipts = ({ content: c }) => (
  <section className="kc-res-receipts">
    <div className="kc-container">
      <div className="kc-res-receipts-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-res-receipts-h">{resItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-res-receipts-p">{c.intro}</p>
      </div>
      <ol className="kc-res-receipts-list">
        {c.items.map((it, i) => (
          <li key={i} className="kc-res-receipts-row">
            <div className="kc-res-receipts-n">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="kc-res-receipts-title">{it.title}</div>
              <p className="kc-res-receipts-desc">{it.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

Object.assign(window, {
  KCResStory,
  KCResContinuum,
  KCResHealth,
  KCResSchedule,
  KCResSplit,
  KCResMethodology,
  KCResReceipts,
});
