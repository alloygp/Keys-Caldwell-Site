// =====================================================================
// Keys-Caldwell — Resources Hub components (/blog/index.html)
// =====================================================================
// This is NOT a chronological blog index. It's an editorial library —
// a true resource center that grows over time as we add educational
// content, downloads, glossary entries, events, and the annual State
// of the Association report.
//
// Composition (per artboard variant):
//   V1 LIBRARY     :  KCNav · KCResHeroLibrary · KCResSearch · KCResEditorPicks ·
//                     KCResEvents · KCResCategoryRail × N · KCResDownloads ·
//                     KCResNewsletter · KCFooter
//   V2 EDITORIAL   :  KCNav · KCResHeroEditorial · KCResEditorPicks · KCResCategoryGrid ·
//                     KCResEvents · KCResDownloads · KCResNewsletter · KCFooter
//   V3 KNOWLEDGE   :  KCNav · KCResHeroKB · KCResTopicTiles · KCResEditorPicks ·
//                     KCResEvents · KCResNewsletter · KCFooter
//
// All variants share the same components — the hero treatment changes
// and the order of sections is the lever. Editor's picks ALWAYS three.
// =====================================================================

// ---------- Hero variants ----------
// Library catalog hero — quiet, indexed, archival
const KCResHeroLibrary = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-reshero kc-reshero-library">
      <div className="kc-container">
        <div className="kc-reshero-library-grid">
          <div className="kc-reshero-library-text">
            <div className="kc-eyebrow">{c.eyebrow || 'The Keys-Caldwell library'}</div>
            <h1 className="kc-reshero-library-h1">
              {c.title || (
                <>Plain-English education for <em>Florida boards</em>.</>
              )}
            </h1>
            <p className="kc-reshero-library-p">
              {c.body || 'Forty-eight years of working with associations, distilled into guides, templates, glossaries, and an annual State of the Association report. Free. No gated downloads.'}
            </p>
          </div>
          <aside className="kc-reshero-library-meta">
            <div className="kc-reshero-library-stat">
              <div className="kc-reshero-library-stat-n">{c.statN1 || '47'}</div>
              <div className="kc-reshero-library-stat-l">{c.statL1 || 'guides & deep-dives'}</div>
            </div>
            <div className="kc-reshero-library-stat">
              <div className="kc-reshero-library-stat-n">{c.statN2 || '12'}</div>
              <div className="kc-reshero-library-stat-l">{c.statL2 || 'downloadable templates'}</div>
            </div>
            <div className="kc-reshero-library-stat">
              <div className="kc-reshero-library-stat-n">{c.statN3 || '4'}</div>
              <div className="kc-reshero-library-stat-l">{c.statL3 || 'live events / yr'}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

// Editorial magazine hero — featured story + cover
const KCResHeroEditorial = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-reshero kc-reshero-editorial">
      <div className="kc-container">
        <div className="kc-reshero-editorial-grid">
          <div className="kc-reshero-editorial-text">
            <div className="kc-eyebrow">{c.eyebrow || 'This week — featured guide'}</div>
            <h1 className="kc-reshero-editorial-h1">
              {c.title || 'Florida SIRS & Milestone Inspections — what every condo board must do before December 31, 2026.'}
            </h1>
            <p className="kc-reshero-editorial-p">
              {c.body || 'A 12-minute read covering the statute, deadlines, costs, and how to talk to owners about the inevitable special assessment.'}
            </p>
            <div className="kc-reshero-editorial-meta">
              <span>{c.author || 'Daniel Caldwell · CAM, RS'}</span>
              <span className="kc-dot">·</span>
              <span>{c.read || '12 min read'}</span>
              <span className="kc-dot">·</span>
              <span>{c.date || 'Updated April 2026'}</span>
            </div>
            <div className="kc-reshero-editorial-cta-row">
              <a className="kc-btn kc-btn-primary" href={window.kcHref(c.ctaHref || '/blog/florida-sirs-milestone-inspection-guide/index.html')}>
                {c.ctaLabel || 'Read the guide'} <span className="kc-arrow">→</span>
              </a>
              <a className="kc-btn kc-btn-secondary" href={window.kcHref('/blog/index.html#editor-picks')}>
                Browse the library
              </a>
            </div>
          </div>
          <a href={window.kcHref(c.ctaHref || '/blog/florida-sirs-milestone-inspection-guide/index.html')} className="kc-reshero-editorial-cover">
            <div className="kc-reshero-editorial-cover-img" style={{backgroundImage: `url(${c.coverImg || (window.KC_ASSET_BASE || '') + 'assets/Hero - Coastal Condo (Sarasota Bay).jpg'})`}}>
              <div className="kc-reshero-editorial-cover-mark">No. 04 / 2026</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

// Knowledge-base search-first hero
const KCResHeroKB = ({ content }) => {
  const c = content || {};
  const tiles = c.tiles || [
    { label: 'SIRS & Milestone',     href: '/blog/index.html?topic=sirs',       count: 8 },
    { label: 'Reserves',             href: '/blog/index.html?topic=reserves',   count: 6 },
    { label: 'Insurance',            href: '/blog/index.html?topic=insurance',  count: 9 },
    { label: 'Governance',           href: '/blog/index.html?topic=governance', count: 11 },
    { label: 'Vendors & Maintenance', href: '/blog/index.html?topic=vendors',   count: 7 },
    { label: 'Glossary',             href: '/blog/glossary/index.html',         count: 84 },
  ];
  return (
    <section className="kc-reshero kc-reshero-kb">
      <div className="kc-container kc-container-narrow" style={{textAlign: 'center'}}>
        <div className="kc-eyebrow no-mark" style={{justifyContent: 'center'}}>{c.eyebrow || 'Knowledge base'}</div>
        <h1 className="kc-reshero-kb-h1">
          {c.title || (<>What does your board need to <em>know</em>?</>)}
        </h1>
        <p className="kc-reshero-kb-p">
          {c.body || 'Search 47 guides, 84 glossary terms, and 12 templates — written by working community association managers.'}
        </p>
        <form className="kc-reshero-kb-search" onSubmit={(e) => e.preventDefault()}>
          <span className="kc-reshero-kb-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder={c.placeholder || 'Try "SIRS deadline" or "reserve study cost"'}
            className="kc-reshero-kb-search-input"
            aria-label="Search resources"
          />
          <button type="submit" className="kc-btn kc-btn-primary kc-btn-sm">Search</button>
        </form>
      </div>
      <div className="kc-container" style={{marginTop: 56}}>
        <div className="kc-reshero-kb-tiles">
          {tiles.map((t, i) => (
            <a key={i} href={window.kcHref(t.href)} className="kc-reshero-kb-tile">
              <span className="kc-reshero-kb-tile-label">{t.label}</span>
              <span className="kc-reshero-kb-tile-count">{t.count}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Search + filters strip ----------
// Two-tier bar:
//   • Top tier — prominent full-width search input with action button
//   • Bottom tier — filters in a slightly-tinted strip, single horizontal row
const KCResSearch = ({ content }) => {
  const c = content || {};
  const audience = c.audience || ['All', 'Board members', 'Owners', 'Self-managed'];
  const format   = c.format   || ['All formats', 'Guide', 'Template', 'Video', 'Event', 'Glossary'];
  const [activeAudience, setActiveAudience] = React.useState(0);
  const [activeFormat,   setActiveFormat]   = React.useState(0);
  return (
    <section className="kc-ressearch">
      {/* Tier 1 — search */}
      <div className="kc-ressearch-search">
        <div className="kc-container">
          <form className="kc-ressearch-input" onSubmit={(e) => e.preventDefault()}>
            <span className="kc-ressearch-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder={c.placeholder || 'Search 47 guides, 84 glossary terms, 12 templates…'}
              aria-label="Search the resource library"
            />
            <button type="submit" className="kc-btn kc-btn-primary kc-btn-sm">Search</button>
          </form>
        </div>
      </div>
      {/* Tier 2 — filters */}
      <div className="kc-ressearch-filters-bar">
        <div className="kc-container">
          <div className="kc-ressearch-filters-row">
            <div className="kc-ressearch-filter-group">
              <span className="kc-ressearch-filter-label">For</span>
              <div className="kc-ressearch-chips">
                {audience.map((a, i) => (
                  <button
                    key={i} type="button"
                    className={'kc-ressearch-chip' + (i === activeAudience ? ' is-active' : '')}
                    onClick={() => setActiveAudience(i)}
                  >{a}</button>
                ))}
              </div>
            </div>
            <span className="kc-ressearch-divider" aria-hidden="true" />
            <div className="kc-ressearch-filter-group">
              <span className="kc-ressearch-filter-label">Format</span>
              <div className="kc-ressearch-chips">
                {format.map((f, i) => (
                  <button
                    key={i} type="button"
                    className={'kc-ressearch-chip' + (i === activeFormat ? ' is-active' : '')}
                    onClick={() => setActiveFormat(i)}
                  >{f}</button>
                ))}
              </div>
            </div>
            {(activeAudience !== 0 || activeFormat !== 0) && (
              <button
                type="button"
                className="kc-ressearch-clear"
                onClick={() => { setActiveAudience(0); setActiveFormat(0); }}
              >Clear</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Editor's Picks (always 3) ----------
const KCResEditorPicks = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  const ASSET = (typeof window !== 'undefined' && window.KC_ASSET_BASE) || '';
  return (
    <section className="kc-respicks kc-section" id="editor-picks">
      <div className="kc-container">
        <div className="kc-respicks-head">
          <div>
            <div className="kc-eyebrow">{c.eyebrow || "Editor's picks"}</div>
            <h2 className="kc-section-title">{c.title || (<>Three reads, <em>hand-curated</em>.</>)}</h2>
          </div>
          {c.aside && <p className="kc-respicks-aside">{c.aside}</p>}
        </div>
        <hr className="kc-rule" />
        <div className="kc-respicks-grid">
          {items.map((it, i) => (
            <a key={i} href={window.kcHref(it.href)} className="kc-respicks-card">
              <div className="kc-respicks-card-img" style={{backgroundImage: `url(${it.img ? (ASSET + it.img) : (ASSET + 'assets/Hero - Coastal Condo (Sarasota Bay).jpg')})`}}>
                <span className="kc-respicks-card-fmt">{it.format || 'Guide'}</span>
              </div>
              <div className="kc-respicks-card-body">
                <div className="kc-respicks-card-topic">{it.topic}</div>
                <h3 className="kc-respicks-card-h">{it.title}</h3>
                <p className="kc-respicks-card-p">{it.dek}</p>
                <div className="kc-respicks-card-meta">
                  <span>{it.author || 'Keys-Caldwell editorial'}</span>
                  <span className="kc-dot">·</span>
                  <span>{it.read || '8 min'}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Events strip ----------
// Above-the-fold (after hero), but its own section so it isn't lost in a sidebar.
const KCResEvents = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  return (
    <section className="kc-resevents kc-section-tight">
      <div className="kc-container">
        <div className="kc-resevents-head">
          <div>
            <div className="kc-eyebrow on-dark">{c.eyebrow || 'Upcoming events'}</div>
            <h2 className="kc-section-title on-dark">{c.title || (<>Board education, <em>free to attend</em>.</>)}</h2>
          </div>
          <a className="kc-btn kc-btn-ghost kc-btn-sm" href={window.kcHref('/blog/events/index.html')}>All events <span className="kc-arrow">→</span></a>
        </div>
        <div className="kc-resevents-grid">
          {items.map((it, i) => (
            <a key={i} href={window.kcHref(it.href)} className="kc-resevents-card">
              <div className="kc-resevents-card-date">
                <div className="kc-resevents-card-date-mo">{it.month}</div>
                <div className="kc-resevents-card-date-d">{it.day}</div>
              </div>
              <div className="kc-resevents-card-body">
                <div className="kc-resevents-card-kind">{it.kind || 'In-person · Venice'}</div>
                <h3 className="kc-resevents-card-h">{it.title}</h3>
                <p className="kc-resevents-card-p">{it.dek}</p>
                <div className="kc-resevents-card-meta">
                  <span>{it.time}</span>
                  <span className="kc-dot">·</span>
                  <span>{it.host}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Category rail (per topic) ----------
// One row per category — used in V1. Editorial-density layout.
const KCResCategoryRail = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  const ASSET = (typeof window !== 'undefined' && window.KC_ASSET_BASE) || '';
  return (
    <section className="kc-rescat kc-section-tight">
      <div className="kc-container">
        <div className="kc-rescat-head">
          <div>
            <div className="kc-eyebrow">{c.eyebrow || 'Topic'}</div>
            <h2 className="kc-rescat-h2">{c.title}</h2>
            {c.dek && <p className="kc-rescat-dek">{c.dek}</p>}
          </div>
          {c.allHref && (
            <a className="kc-rescat-all" href={window.kcHref(c.allHref)}>
              All in {c.title} <span className="kc-arrow">→</span>
            </a>
          )}
        </div>
        <div className="kc-rescat-grid">
          {items.map((it, i) => (
            <a key={i} href={window.kcHref(it.href)} className="kc-rescat-card">
              {it.img && (
                <div className="kc-rescat-card-img" style={{backgroundImage: `url(${ASSET + it.img})`}} />
              )}
              <div className="kc-rescat-card-body">
                <div className="kc-rescat-card-fmt">{it.format || 'Guide'} · {it.read || '6 min'}</div>
                <h3 className="kc-rescat-card-h">{it.title}</h3>
                {it.dek && <p className="kc-rescat-card-p">{it.dek}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Category grid (V2 editorial) ----------
// Compact grid — all topics at once, one card each.
const KCResCategoryGrid = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  return (
    <section className="kc-rescatgrid kc-section">
      <div className="kc-container">
        <div className="kc-respicks-head">
          <div>
            <div className="kc-eyebrow">{c.eyebrow || 'Browse by topic'}</div>
            <h2 className="kc-section-title">{c.title || (<>Twelve subjects every <em>Florida board</em> wrestles with.</>)}</h2>
          </div>
        </div>
        <hr className="kc-rule" />
        <div className="kc-rescatgrid-grid">
          {items.map((it, i) => (
            <a key={i} href={window.kcHref(it.href)} className="kc-rescatgrid-card">
              <div className="kc-rescatgrid-card-no">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="kc-rescatgrid-card-h">{it.title}</h3>
              <p className="kc-rescatgrid-card-p">{it.dek}</p>
              <div className="kc-rescatgrid-card-meta">
                <span>{it.count} {it.count === 1 ? 'item' : 'items'}</span>
                <span className="kc-rescatgrid-card-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Topic tiles (V3 KB-style) ----------
const KCResTopicTiles = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  return (
    <section className="kc-restopics kc-section-tight">
      <div className="kc-container">
        <div className="kc-restopics-head">
          <div className="kc-eyebrow">{c.eyebrow || 'Browse by topic'}</div>
          <h2 className="kc-section-title">{c.title || 'Pick a subject.'}</h2>
        </div>
        <div className="kc-restopics-grid">
          {items.map((it, i) => (
            <a key={i} href={window.kcHref(it.href)} className="kc-restopics-tile">
              <div className="kc-restopics-tile-h">{it.title}</div>
              <div className="kc-restopics-tile-meta">{it.count} {it.count === 1 ? 'resource' : 'resources'}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Downloads / Templates ----------
// Sidebar-style placement (per user spec) — secondary but discoverable.
const KCResDownloads = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  return (
    <section className="kc-resdl kc-section-tight">
      <div className="kc-container">
        <div className="kc-resdl-grid">
          <div className="kc-resdl-pitch">
            <div className="kc-eyebrow">{c.eyebrow || 'Tools & templates'}</div>
            <h2 className="kc-resdl-h2">{c.title || (<>The same forms <em>we use</em>.</>)}</h2>
            <p className="kc-resdl-p">
              {c.body || 'Budget worksheets, RFP templates, meeting agendas, and reserve-funding scenario tools — the working documents we put in front of our own board clients. Free to download. Use as-is or adapt them.'}
            </p>
            <a className="kc-btn kc-btn-secondary" href={window.kcHref('/blog/index.html?format=template')}>
              All templates <span className="kc-arrow">→</span>
            </a>
          </div>
          <ul className="kc-resdl-list">
            {items.map((it, i) => (
              <li key={i} className="kc-resdl-item">
                <a href={window.kcHref(it.href)}>
                  <div className="kc-resdl-item-icon" aria-hidden="true">{it.icon || '↧'}</div>
                  <div className="kc-resdl-item-body">
                    <div className="kc-resdl-item-h">{it.title}</div>
                    <div className="kc-resdl-item-meta">{it.kind || 'PDF'} · {it.size || '180 KB'}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// ---------- Newsletter / Annual Report ----------
const KCResNewsletter = ({ content }) => {
  const c = content || {};
  return (
    <section className="kc-resnews kc-section-tight">
      <div className="kc-container">
        <div className="kc-resnews-grid">
          <div className="kc-resnews-card kc-resnews-newsletter">
            <div className="kc-eyebrow">{c.newsletterEyebrow || 'Quarterly digest'}</div>
            <h3 className="kc-resnews-h">{c.newsletterTitle || 'The Common Element'}</h3>
            <p className="kc-resnews-p">
              {c.newsletterBody || 'Four issues a year. New statutes, what changed in insurance, what we\'re seeing in capital projects across the Suncoast. Read by 1,400+ Florida board members.'}
            </p>
            <form className="kc-resnews-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="board@yourcondo.com" aria-label="Email address" />
              <button type="submit" className="kc-btn kc-btn-primary kc-btn-sm">Subscribe</button>
            </form>
            <div className="kc-resnews-fine">No selling. No sponsors. Unsubscribe in one click.</div>
            <div className="kc-resnews-archive">
              <a href={window.kcHref('/blog/newsletter/index.html')}>Read past issues →</a>
            </div>
          </div>
          <a href={window.kcHref('/blog/state-of-the-association-2026/index.html')} className="kc-resnews-card kc-resnews-annual">
            <div className="kc-resnews-annual-eye">Annual report · 2026</div>
            <h3 className="kc-resnews-annual-h">State of the <em>Association</em></h3>
            <p className="kc-resnews-annual-p">
              Our once-a-year report on what changed in Florida statute, insurance markets, and capital costs — with implications for boards and self-managed associations.
            </p>
            <div className="kc-resnews-annual-cta">Read the report <span className="kc-arrow">→</span></div>
          </a>
        </div>
      </div>
    </section>
  );
};

// Expose to window so individual artboard scripts can read them
Object.assign(window, {
  KCResHeroLibrary, KCResHeroEditorial, KCResHeroKB,
  KCResSearch,
  KCResEditorPicks,
  KCResEvents,
  KCResCategoryRail, KCResCategoryGrid, KCResTopicTiles,
  KCResDownloads, KCResNewsletter,
});
