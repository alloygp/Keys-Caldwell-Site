// =============================================================
// /components/accounting.jsx
// =============================================================
// Components specific to /accounting/ — the accounting service page.
//
// All five components below assume:
//   - Tailwind-style class naming via global styles (../accounting.css)
//   - lucide-react icons available globally as window.lucide
//   - The italicize() helper is shared across pillar primitives;
//     we redeclare a local copy here to keep this file self-contained.
//
// Components:
//   KCAcctMethodology — 4-step monthly cadence (calendar strip)
//   KCAcctStoplight   — risk-grading visual (rows + colored badges)
//   KCAcctPacket      — sample monthly packet preview (4 artifact cards)
//   KCAcctCpa         — "Meet your CPA" Ande Duda spotlight
//   KCAcctReceipts    — what's-included specific bullet list
//   KCAcctStack       — Vantaca / accounting / SOC 2 horizontal strip
// =============================================================

const acctItalicize = (plain, italic) => {
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

// ---------- KCAcctMethodology ----------
// content = { eyebrow, titlePlain, titleItalic, intro, steps: [{ when, h, p }] }
// Visual: horizontal calendar-strip with day-stamps. Reads as a monthly
// rhythm, not a marketing benefits list.
const KCAcctMethodology = ({ content: c }) => (
  <section className="kc-acct-method">
    <div className="kc-container">
      <div className="kc-acct-method-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-acct-method-h">{acctItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-acct-method-p">{c.intro}</p>
      </div>
      <ol className="kc-acct-method-strip">
        {c.steps.map((s, i) => (
          <li key={i} className="kc-acct-method-step">
            <div className="kc-acct-method-when">{s.when}</div>
            <div className="kc-acct-method-h3">{s.h}</div>
            <p className="kc-acct-method-body">{s.p}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------- KCAcctStoplight ----------
// content = {
//   eyebrow, titlePlain, titleItalic, intro,
//   note,            // small caption shown above the dashboard frame
//   asOf,            // date stamp shown in the dashboard chrome
//   community,       // sample association name (clearly fictional)
//   rows: [{ metric, value, status: 'green'|'yellow'|'red', what }]
// }
// Renders as a stylized board-packet dashboard so the visual *is* the
// proof. A board immediately recognizes this as the kind of artifact
// they should be receiving every month.
const KCAcctStoplight = ({ content: c }) => {
  const statusLabel = (s) => ({ green: 'On track', yellow: 'Watch', red: 'Action' }[s] || s);
  return (
    <section className="kc-acct-stop">
      <div className="kc-container">
        <div className="kc-acct-stop-head">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-acct-stop-h">{acctItalicize(c.titlePlain, c.titleItalic)}</h2>
          <p className="kc-acct-stop-p">{c.intro}</p>
        </div>

        <div className="kc-acct-stop-frame" role="figure" aria-label="Sample stoplight risk-grading dashboard">
          <div className="kc-acct-stop-frame-bar">
            <div className="kc-acct-stop-frame-dots" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div className="kc-acct-stop-frame-title">
              Risk Grading · {c.community}
            </div>
            <div className="kc-acct-stop-frame-stamp">As of {c.asOf}</div>
          </div>

          <div className="kc-acct-stop-table">
            <div className="kc-acct-stop-row kc-acct-stop-thead">
              <div>Metric</div>
              <div>Current</div>
              <div>Status</div>
              <div>What this means</div>
            </div>
            {c.rows.map((r, i) => (
              <div key={i} className="kc-acct-stop-row">
                <div className="kc-acct-stop-metric">{r.metric}</div>
                <div className="kc-acct-stop-value">{r.value}</div>
                <div>
                  <span className={`kc-acct-stop-badge is-${r.status}`}>
                    <span className="kc-acct-stop-dot"></span>
                    {statusLabel(r.status)}
                  </span>
                </div>
                <div className="kc-acct-stop-what">{r.what}</div>
              </div>
            ))}
          </div>

          <div className="kc-acct-stop-footnote">{c.note}</div>
        </div>
      </div>
    </section>
  );
};

// ---------- KCAcctPacket ----------
// content = {
//   eyebrow, titlePlain, titleItalic, intro,
//   artifacts: [{ kind, title, caption, mock }]   // mock = key for stylized illo
// }
// Each card renders an SVG-based stylized "artifact preview" for the
// chosen kind. Not a real PDF — a visual cue at-a-glance.
const KCAcctPacket = ({ content: c }) => (
  <section className="kc-acct-packet">
    <div className="kc-container">
      <div className="kc-acct-packet-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-acct-packet-h">{acctItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-acct-packet-p">{c.intro}</p>
      </div>
      <div className="kc-acct-packet-grid">
        {c.artifacts.map((a, i) => (
          <article key={i} className="kc-acct-packet-card">
            <div className="kc-acct-packet-mock">
              <PacketMock kind={a.mock} />
            </div>
            <div className="kc-acct-packet-meta">
              <div className="kc-acct-packet-kind">{a.kind}</div>
              <h3 className="kc-acct-packet-title">{a.title}</h3>
              <p className="kc-acct-packet-cap">{a.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

// Stylized SVG artifact mocks. Designed so they read as "financial
// document at thumbnail scale" — not pretending to be real numbers.
const PacketMock = ({ kind }) => {
  if (kind === 'balance') {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <rect x="0" y="0" width="320" height="200" fill="#fbf8f1"/>
        <rect x="20" y="18" width="120" height="6" rx="2" fill="#1f2a4d"/>
        <rect x="20" y="32" width="80" height="4" rx="2" fill="#94a3b8"/>
        {[58, 78, 98, 118, 138, 158].map((y, i) => (
          <g key={i}>
            <rect x="20" y={y} width="140" height="3" rx="1.5" fill="#e2e8f0"/>
            <rect x="220" y={y} width={56 - i * 4} height="3" rx="1.5" fill={i === 5 ? "#1f2a4d" : "#94a3b8"}/>
          </g>
        ))}
        <line x1="20" y1="178" x2="300" y2="178" stroke="#1f2a4d" strokeWidth="1.5"/>
        <rect x="20" y="184" width="60" height="4" rx="2" fill="#1f2a4d"/>
        <rect x="240" y="184" width="60" height="4" rx="2" fill="#b28e56"/>
      </svg>
    );
  }
  if (kind === 'variance') {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <rect x="0" y="0" width="320" height="200" fill="#fbf8f1"/>
        <rect x="20" y="18" width="160" height="6" rx="2" fill="#1f2a4d"/>
        <rect x="20" y="32" width="100" height="4" rx="2" fill="#94a3b8"/>
        {/* Bar comparison */}
        {[
          { y: 60, p: 220, a: 200 },
          { y: 90, p: 180, a: 210 },
          { y: 120, p: 240, a: 230 },
          { y: 150, p: 200, a: 260 },
        ].map((r, i) => (
          <g key={i}>
            <rect x="20" y={r.y} width="60" height="3" rx="1.5" fill="#94a3b8"/>
            <rect x="90" y={r.y - 4} width={r.p / 1.6} height="9" rx="1" fill="#cbd5e1"/>
            <rect x="90" y={r.y + 6} width={r.a / 1.6} height="9" rx="1" fill={r.a > r.p ? "#b28e56" : "#1f2a4d"}/>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === 'aging') {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <rect x="0" y="0" width="320" height="200" fill="#fbf8f1"/>
        <rect x="20" y="18" width="100" height="6" rx="2" fill="#1f2a4d"/>
        <rect x="20" y="32" width="80" height="4" rx="2" fill="#94a3b8"/>
        {/* Aging buckets */}
        {[
          { x: 20, w: 60, h: 70, l: 'Current', c: '#1f2a4d' },
          { x: 90, w: 60, h: 50, l: '30 days', c: '#475569' },
          { x: 160, w: 60, h: 30, l: '60 days', c: '#b28e56' },
          { x: 230, w: 60, h: 18, l: '90+',     c: '#9b3d2e' },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={150 - b.h} width={b.w} height={b.h} rx="2" fill={b.c}/>
            <rect x={b.x + 6} y="160" width="40" height="3" rx="1.5" fill="#94a3b8"/>
            <rect x={b.x + 6} y="170" width="28" height="3" rx="1.5" fill="#cbd5e1"/>
          </g>
        ))}
      </svg>
    );
  }
  if (kind === 'reserve') {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <rect x="0" y="0" width="320" height="200" fill="#fbf8f1"/>
        <rect x="20" y="18" width="140" height="6" rx="2" fill="#1f2a4d"/>
        <rect x="20" y="32" width="90" height="4" rx="2" fill="#94a3b8"/>
        {/* Funding curve */}
        <path d="M20 150 L60 130 L100 134 L140 110 L180 96 L220 78 L260 64 L300 50"
          fill="none" stroke="#1f2a4d" strokeWidth="2"/>
        {/* Required line */}
        <path d="M20 130 L300 50" fill="none" stroke="#b28e56" strokeWidth="1.4" strokeDasharray="4 3"/>
        {/* Axis */}
        <line x1="20" y1="170" x2="300" y2="170" stroke="#cbd5e1" strokeWidth="1"/>
        {[20, 60, 100, 140, 180, 220, 260, 300].map((x, i) => (
          <rect key={i} x={x - 1} y="172" width="2" height="3" fill="#cbd5e1"/>
        ))}
        <rect x="20" y="180" width="40" height="3" rx="1.5" fill="#94a3b8"/>
        <rect x="270" y="180" width="30" height="3" rx="1.5" fill="#94a3b8"/>
      </svg>
    );
  }
  return null;
};

// ---------- KCAcctCpa ----------
// content = {
//   eyebrow, titlePlain, titleItalic, body, bullets,
//   person: { name, role, credentials: [], bioHref, photoSlot? }
// }
// Big editorial spread: image slot on the left, prose + credential row
// on the right. Photo is a placeholder until real Ande Duda photo lands.
const KCAcctCpa = ({ content: c }) => (
  <section className="kc-acct-cpa">
    <div className="kc-container">
      <div className="kc-acct-cpa-grid">
        <aside className="kc-acct-cpa-photo" aria-label={`Portrait of ${c.person.name}`}>
          <div className="kc-acct-cpa-photo-frame">
            <div className="kc-acct-cpa-photo-mono">{c.person.initials}</div>
            <div className="kc-acct-cpa-photo-tag">[needs photo · Ande Duda]</div>
          </div>
          <div className="kc-acct-cpa-creds">
            {c.person.credentials.map(cr => (
              <span key={cr} className="kc-acct-cpa-cred">{cr}</span>
            ))}
          </div>
        </aside>
        <div className="kc-acct-cpa-body">
          <div className="kc-eyebrow">{c.eyebrow}</div>
          <h2 className="kc-acct-cpa-h">{acctItalicize(c.titlePlain, c.titleItalic)}</h2>
          <div className="kc-acct-cpa-name">
            <span className="kc-acct-cpa-name-plain">{c.person.name}</span>
            <span className="kc-acct-cpa-role">{c.person.role}</span>
          </div>
          <p className="kc-acct-cpa-p">{c.body}</p>
          {c.bullets && c.bullets.length > 0 && (
            <ul className="kc-acct-cpa-list">
              {c.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}
          <a className="kc-acct-cpa-link" href={kcHref(c.person.bioHref)}>
            Read full bio on the about page
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

// ---------- KCAcctReceipts ----------
// content = { eyebrow, titlePlain, titleItalic, intro, items: [{n, title, desc}] }
// 8 specific deliverables. Two-column ledger layout — visually distinct
// from the four-chamber bullets used elsewhere.
const KCAcctReceipts = ({ content: c }) => (
  <section className="kc-acct-receipts">
    <div className="kc-container">
      <div className="kc-acct-receipts-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-acct-receipts-h">{acctItalicize(c.titlePlain, c.titleItalic)}</h2>
        <p className="kc-acct-receipts-p">{c.intro}</p>
      </div>
      <ol className="kc-acct-receipts-list">
        {c.items.map((it, i) => (
          <li key={i} className="kc-acct-receipts-row">
            <div className="kc-acct-receipts-n">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="kc-acct-receipts-title">{it.title}</div>
              <p className="kc-acct-receipts-desc">{it.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------- KCAcctStack ----------
// content = { eyebrow, titlePlain, titleItalic, items: [{ name, role, detail }] }
// Tight horizontal strip. Boards care about security/integration — show it.
const KCAcctStack = ({ content: c }) => (
  <section className="kc-acct-stack">
    <div className="kc-container">
      <div className="kc-acct-stack-head">
        <div className="kc-eyebrow">{c.eyebrow}</div>
        <h2 className="kc-acct-stack-h">{acctItalicize(c.titlePlain, c.titleItalic)}</h2>
      </div>
      <div className="kc-acct-stack-grid">
        {c.items.map((it, i) => (
          <div key={i} className="kc-acct-stack-card">
            <div className="kc-acct-stack-name">{it.name}</div>
            <div className="kc-acct-stack-role">{it.role}</div>
            <p className="kc-acct-stack-detail">{it.detail}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, {
  KCAcctMethodology,
  KCAcctStoplight,
  KCAcctPacket,
  KCAcctCpa,
  KCAcctReceipts,
  KCAcctStack,
});
