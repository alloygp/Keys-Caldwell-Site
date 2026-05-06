// Keys-Caldwell — Shared marketing components
// =============================================================
//
// Each section is a small, prop-driven template. Pages hand in
// their own copy via a `content` prop; if you call a section
// without `content`, it falls back to a sensible default so
// shared components keep working in the explorations canvas.
//
// Pattern in each page:
//   <KCNav active="condo" />
//   <KCHero content={CONTENT.hero} />
//   <KCPillars content={CONTENT.pillars} />
//   ...
// =============================================================

// ---------- Internal-href resolver ----------
// Pages set window.KC_ASSET_BASE to the relative path back to /site/
// (e.g. ''  for /site/index.html, '../' for /site/about/index.html,
//  '../../' for /site/blog/<slug>/index.html). We reuse that to resolve
// internal links so a root-relative href like "/about/index.html" becomes
// the right relative path from whatever depth this page lives at.
//
// Skips: full URLs, mailto:, tel:, hash anchors, anything not starting with "/".
function kcHref(href) {
  if (!href) return href;
  if (typeof href !== 'string') return href;
  if (href[0] !== '/')                                                 return href;
  if (href.startsWith('//') || /^https?:\/\//i.test(href))              return href;
  const base = (typeof window !== 'undefined' && window.KC_ASSET_BASE) || '';
  // Split off any query/hash so we can safely append index.html when the
  // path ends in a trailing slash (some hosts/dev servers don't auto-resolve
  // directory URLs to index.html).
  let path = href;
  let suffix = '';
  const qIdx = path.search(/[?#]/);
  if (qIdx >= 0) { suffix = path.slice(qIdx); path = path.slice(0, qIdx); }
  if (path.endsWith('/')) path = path + 'index.html';
  return base + path.replace(/^\/+/, '') + suffix;
}
// Expose globally so other component files (geo / about / blog / pillar) can use it.
if (typeof window !== 'undefined') window.kcHref = kcHref;

// ---------- Nav ----------
// content = {
//   active,
//   links?: [{
//     label, href, key,
//     submenu?: {
//       columns: [{ title?, items: [{ label, href, desc?, badge? }] }],
//       feature?: { title, body, href, label, eyebrow? }   // optional right-side feature card
//     }
//   }],
//   cta?: { label, href },
//   phone?: string
// }
const KCNav = ({ active = 'home', variant = 'shell', content }) => {
  const links = content?.links || [
    { key: 'home',    label: 'Home',             href: '/index.html' },
    { key: 'services', label: 'Services',        href: '/services/index.html', submenu: {
      eyebrow: 'What we do',
      columns: [
        { title: 'Practice areas', items: [
          { label: 'Services — overview',          href: '/services/index.html', desc: 'How proposals & engagements work.', badge: 'Start here' },
          { label: 'Condo association management', href: '/condo-management/index.html', desc: 'Coastal mid-rise & high-rise.' },
          { label: 'HOA management',                href: '/hoa-management/index.html',     desc: 'Single-family & master-planned.' },
        ]},
        { title: 'Departments', items: [
          { label: 'Accounting',         href: '/accounting/index.html', desc: 'CPA-supervised reporting.' },
          { label: 'Reserve studies',    href: '/reserve-studies/index.html', desc: 'SIRS, HOA, subscription tiers.' },
          { label: 'Property services',       href: '/property-services/index.html', desc: 'Capital projects & maintenance.' },
          { label: 'Pricing & scope',         href: '/pricing/index.html', desc: 'How proposals are built.' },
        ]},
      ],
      feature: {
        eyebrow: 'For board treasurers',
        title:   'Send us your governing documents.',
        body:    'We\'ll come back with a tailored proposal — typically within five business days.',
        label:   'Request a proposal',
        href:    '/request-proposal/index.html',
      }
    }},
    { key: 'about',   label: 'About',            href: '/about/index.html', submenu: {
      eyebrow: 'About Keys-Caldwell',
      columns: [
        { title: 'The firm', items: [
          { label: 'About Keys-Caldwell',  href: '/about/index.html',  desc: 'Three eras at one address.', badge: 'Start here' },
          { label: 'Our team & leadership', href: '/about/index.html#team', desc: 'Founders, managers, accounting.' },
          { label: 'Careers',               href: '/careers/index.html', desc: 'Joining the firm.' },
        ]},
        { title: 'Proof', items: [
          { label: 'Testimonials',  href: '/testimonials/index.html', desc: 'In their words.' },
          { label: 'Case studies',  href: '/case-studies/index.html', desc: 'Anonymized board outcomes.' },
          { label: 'FAQ',           href: '/faq/index.html',          desc: 'Common board questions.' },
        ]},
      ],
      feature: {
        eyebrow: 'Heritage',
        title:   '48 years at the same Venice address.',
        body:    'Keys-Caldwell has been at 1162 Indian Hills Boulevard since 1978 — through three ownership eras and the same plain-spoken culture.',
        label:   'Read the story',
        href:    '/about/index.html',
      }
    }},
    { key: 'blog',    label: 'Resources',        href: '/blog/index.html', submenu: {
      eyebrow: 'Education for Florida boards',
      columns: [
        { title: 'Most-read guides', items: [
          { label: 'Florida SIRS & Milestone Inspections', href: '/blog/florida-sirs-milestone-inspection-guide/index.html', desc: 'The 2025 statute, in plain English.', badge: 'Most read' },
          { label: 'Florida law changes — 2024–26 wave',   href: '/blog/florida-law-changes/index.html',                    desc: 'SB-4D, HB 1021, HB 913.' },
          { label: 'Reserve studies & special assessments', href: '/blog/reserve-study-special-assessment/index.html',      desc: 'How under-funding becomes a crisis.' },
          { label: 'How to change management companies',   href: '/blog/how-to-change-management-company/index.html',       desc: 'The board\'s practical playbook.' },
        ]},
        { title: 'Browse', items: [
          { label: 'All guides & resources', href: '/blog/index.html',           desc: 'The full library.' },
          { label: 'Glossary',               href: '/blog/glossary/index.html',  desc: 'Florida CAM terminology.' },
          { label: 'Events & webinars',      href: '/blog/events/index.html',    desc: 'Board education nights.' },
        ]},
      ],
      feature: {
        eyebrow: 'New every quarter',
        title:   'State of the Association · 2026',
        body:    'Our annual report on what changed in Florida statute, insurance, reserves, and capital costs — with implications for boards.',
        label:   'Read the report',
        href:    '/blog/state-of-the-association-2026/index.html',
      }
    }},
    { key: 'pricing', label: 'Pricing',          href: '/pricing/index.html' },
  ];
  const cta = content?.cta || { label: 'Request a proposal', href: '/request-proposal/index.html' };
  const phone = content?.phone || '(941) 485-0605';
  const phoneHref = 'tel:' + phone.replace(/[^\d+]/g, '');
  const assetBase = (typeof window !== 'undefined' && window.KC_ASSET_BASE) || '';

  // Current pathname for "you are here" highlighting in the submenu.
  // Normalize trailing slash and ensure leading slash so href comparisons match.
  const currentPath = (() => {
    if (typeof window === 'undefined') return '';
    let p = window.location.pathname || '';
    // Treat /foo/ and /foo/index.html as the same page
    if (p.endsWith('/')) p = p + 'index.html';
    return p;
  })();
  const isCurrentHref = (href) => {
    if (!href || !currentPath) return false;
    let h = href;
    if (h.endsWith('/')) h = h + 'index.html';
    // Compare by suffix so kcHref('../') prefixes don't break the match
    return currentPath === h || currentPath.endsWith(h);
  };

  // Submenu state — single open key, hover-intent timing
  const [openKey, setOpenKey] = React.useState(null);
  const closeTimer = React.useRef(null);
  const open  = (k) => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } setOpenKey(k); };
  const close = ()  => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpenKey(null), 120); };

  // Mobile drawer state — separate from desktop hover state.
  // mobileOpen = whether the slide-in panel is shown.
  // mobileExpanded = which submenu accordion is open inside the drawer (single, like desktop).
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState(null);
  const toggleMobile = () => setMobileOpen(v => !v);
  const closeMobile  = () => { setMobileOpen(false); setMobileExpanded(null); };

  // Close on Escape — covers both desktop submenu and mobile drawer
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpenKey(null); closeMobile(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="kc-nav" data-variant={variant} onMouseLeave={close}>
      <div className="kc-nav-utility">
        <div className="kc-nav-utility-inner">
          <a className="kc-nav-utility-link" href={kcHref('/owners/index.html')}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M5 7.5V8.5M3.5 5.5V4.25C3.5 2.875 4.62 1.75 6 1.75C7.38 1.75 8.5 2.875 8.5 4.25V5.5M3 5.5H9C9.27 5.5 9.5 5.73 9.5 6V9.75C9.5 10.02 9.27 10.25 9 10.25H3C2.73 10.25 2.5 10.02 2.5 9.75V6C2.5 5.73 2.73 5.5 3 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            For owners
          </a>
        </div>
      </div>
      <div className="kc-nav-inner">
        <a className="kc-nav-logo" href={kcHref('/index.html')}>
          <img src={assetBase + 'assets/KC_Logo_Navy.svg'} alt="Keys-Caldwell" />
        </a>
        <nav className="kc-nav-links">
          {links.map(l => {
            const hasMenu = !!l.submenu;
            const isOpen  = openKey === l.key;
            return (
              <div
                key={l.key}
                className={'kc-nav-item' + (hasMenu ? ' has-submenu' : '') + (isOpen ? ' is-open' : '')}
                onMouseEnter={() => hasMenu ? open(l.key) : null}
              >
                <a
                  href={kcHref(l.href)}
                  className={'kc-nav-link' + (active === l.key ? ' is-active' : '')}
                  aria-haspopup={hasMenu ? 'true' : undefined}
                  aria-expanded={hasMenu ? (isOpen ? 'true' : 'false') : undefined}
                  onFocus={() => hasMenu ? open(l.key) : null}
                >
                  {l.label}
                  {hasMenu && (
                    <span className="kc-nav-caret" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </a>
              </div>
            );
          })}
        </nav>
        <div className="kc-nav-cta-row">
          <a className="kc-nav-phone" href={phoneHref}>{phone}</a>
          <a className="kc-btn kc-btn-primary kc-btn-sm" href={kcHref(cta.href)}>{cta.label}</a>
        </div>
        {/* Mobile-only hamburger trigger */}
        <button
          className={'kc-nav-burger' + (mobileOpen ? ' is-open' : '')}
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="kc-mobile-drawer"
          type="button"
        >
          <span className="kc-nav-burger-bar"></span>
          <span className="kc-nav-burger-bar"></span>
          <span className="kc-nav-burger-bar"></span>
        </button>
      </div>
      {/* Single full-width submenu panel — content swaps based on openKey */}
      <div
        className={'kc-nav-submenu' + (openKey ? ' is-open' : '')}
        onMouseEnter={() => openKey && open(openKey)}
        onMouseLeave={close}
        aria-hidden={!openKey}
      >
        {links.filter(l => l.submenu).map(l => {
          const sm = l.submenu;
          const isMine = openKey === l.key;
          return (
            <div key={l.key} className="kc-nav-submenu-content" data-open={isMine ? 'true' : 'false'}>
              <div className="kc-nav-submenu-inner">
                <div className="kc-nav-submenu-cols">
                  {sm.eyebrow && <div className="kc-nav-submenu-eye">{sm.eyebrow}</div>}
                  <div className="kc-nav-submenu-grid">
                    {sm.columns.map((col, i) => (
                      <div key={i} className="kc-nav-submenu-col">
                        {col.title && <div className="kc-nav-submenu-col-title">{col.title}</div>}
                        <ul>
                          {col.items.map((it, j) => {
                            const cur = isCurrentHref(it.href);
                            return (
                              <li key={j}>
                                <a
                                  href={kcHref(it.href)}
                                  className={'kc-nav-submenu-link' + (cur ? ' is-current' : '')}
                                  aria-current={cur ? 'page' : undefined}
                                >
                                  <span className="kc-nav-submenu-link-label">
                                    {it.label}
                                    {it.badge && <span className="kc-nav-submenu-badge">{it.badge}</span>}
                                    {cur && <span className="kc-nav-submenu-here" aria-hidden="true">You are here</span>}
                                  </span>
                                  {it.desc && <span className="kc-nav-submenu-link-desc">{it.desc}</span>}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                {sm.feature && (
                  <a href={kcHref(sm.feature.href)} className="kc-nav-submenu-feature">
                    {sm.feature.eyebrow && <div className="kc-nav-submenu-feature-eye">{sm.feature.eyebrow}</div>}
                    <h4 className="kc-nav-submenu-feature-h">{sm.feature.title}</h4>
                    <p className="kc-nav-submenu-feature-p">{sm.feature.body}</p>
                    <span className="kc-nav-submenu-feature-cta">{sm.feature.label} <span className="kc-arrow">→</span></span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────
          Slide-in panel, full height, accordion submenus.
          Hidden on desktop via CSS. ───────────────────────────── */}
      <div
        className={'kc-nav-mobile-scrim' + (mobileOpen ? ' is-open' : '')}
        onClick={closeMobile}
        aria-hidden="true"
      />
      <div
        id="kc-mobile-drawer"
        className={'kc-nav-mobile' + (mobileOpen ? ' is-open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="kc-nav-mobile-head">
          <a className="kc-nav-mobile-logo" href={kcHref('/index.html')} onClick={closeMobile}>
            <img src={assetBase + 'assets/KC_Logo_Navy.svg'} alt="Keys-Caldwell" />
          </a>
          <button
            className="kc-nav-mobile-close"
            onClick={closeMobile}
            aria-label="Close menu"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="kc-nav-mobile-cta">
          <a className="kc-btn kc-btn-primary" href={kcHref(cta.href)} onClick={closeMobile}>
            {cta.label}
          </a>
          <a className="kc-nav-mobile-phone" href={phoneHref}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3.5 1.5h2L6.7 4l-1.5 1c.7 1.5 2 2.8 3.5 3.5l1-1.5L12 8.5v2c0 .55-.45 1-1 1A8.5 8.5 0 0 1 2.5 3c0-.55.45-1 1-1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            {phone}
          </a>
        </div>

        <nav className="kc-nav-mobile-list">
          {links.map(l => {
            const hasMenu = !!l.submenu;
            const isExpanded = mobileExpanded === l.key;
            if (!hasMenu) {
              return (
                <a
                  key={l.key}
                  href={kcHref(l.href)}
                  className={'kc-nav-mobile-row kc-nav-mobile-leaf' + (active === l.key ? ' is-active' : '')}
                  onClick={closeMobile}
                >
                  {l.label}
                </a>
              );
            }
            return (
              <div key={l.key} className={'kc-nav-mobile-section' + (isExpanded ? ' is-expanded' : '')}>
                <button
                  className="kc-nav-mobile-row kc-nav-mobile-trigger"
                  onClick={() => setMobileExpanded(isExpanded ? null : l.key)}
                  aria-expanded={isExpanded}
                  type="button"
                >
                  <span>{l.label}</span>
                  <svg className="kc-nav-mobile-chev" width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {hasMenu && (
                  <div
                    className={'kc-nav-mobile-sub' + (isExpanded ? ' is-expanded' : '')}
                    aria-hidden={!isExpanded}
                  >
                    <div className="kc-nav-mobile-sub-inner">
                      <a
                        href={kcHref(l.href)}
                        className="kc-nav-mobile-sublink kc-nav-mobile-sublink-overview"
                        onClick={closeMobile}
                        tabIndex={isExpanded ? 0 : -1}
                      >
                        {l.label} — overview <span className="kc-arrow">→</span>
                      </a>
                      {l.submenu.columns.map((col, ci) => (
                        <div key={ci} className="kc-nav-mobile-subgroup">
                          {col.title && <div className="kc-nav-mobile-subgroup-title">{col.title}</div>}
                          {col.items.map((it, ii) => (
                            <a
                              key={ii}
                              href={kcHref(it.href)}
                              className="kc-nav-mobile-sublink"
                              onClick={closeMobile}
                              tabIndex={isExpanded ? 0 : -1}
                            >
                              {it.label}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <a
            href={kcHref('/owners/index.html')}
            className="kc-nav-mobile-row kc-nav-mobile-leaf kc-nav-mobile-owners"
            onClick={closeMobile}
          >
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{marginRight: 8}}>
              <path d="M5 7.5V8.5M3.5 5.5V4.25C3.5 2.875 4.62 1.75 6 1.75C7.38 1.75 8.5 2.875 8.5 4.25V5.5M3 5.5H9C9.27 5.5 9.5 5.73 9.5 6V9.75C9.5 10.02 9.27 10.25 9 10.25H3C2.73 10.25 2.5 10.02 2.5 9.75V6C2.5 5.73 2.73 5.5 3 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            For owners
          </a>
        </nav>
      </div>
    </header>
  );
};

// ---------- Footer ----------
// content = { address, places, columns: [{ title, links: [{label, href}] }], fineLeft, fineRight }
const KCFooter = ({ content }) => {
  const c = content || {};
  const address = c.address || {
    line1: '1162 Indian Hills Blvd',
    line2: 'Venice, FL 34293',
    phone: '(941) 485-0605',
    email: 'info@keys-caldwell.com',
  };
  const places = c.places || 'VENICE · SARASOTA · BRADENTON · ENGLEWOOD · NORTH PORT';
  const columns = c.columns || [
    { title: 'Services', links: [
      { label: 'Condo association management', href: '/condo-management/index.html' },
      { label: 'HOA management',                href: '/hoa-management/index.html' },
      { label: 'Accounting',                  href: '/accounting/index.html' },
      { label: 'Reserve studies',             href: '/reserve-studies/index.html' },
      { label: 'Property services',             href: '/property-services/index.html' },
      { label: 'Service areas',                  href: '/service-areas/index.html' },
      { label: 'Pricing & scope',               href: '/pricing/index.html' },
    ]},
    { title: 'Boards', links: [
      { label: 'Request a proposal',  href: '/request-proposal/index.html' },
      { label: 'Resources & guides',  href: '/blog/index.html' },
      { label: 'Case studies',        href: '/case-studies/index.html' },
      { label: 'Testimonials',        href: '/testimonials/index.html' },
      { label: 'FAQ',                 href: '/faq/index.html' },
    ]},
    { title: 'Firm', links: [
      { label: 'About Keys-Caldwell', href: '/about/index.html' },
      { label: 'Service areas',       href: '/service-areas/index.html' },
      { label: 'Careers',             href: '/careers/index.html' },
      { label: 'For owners',          href: '/owners/index.html' },
      { label: 'Owner portal login',  href: 'https://keys-caldwell.cincwebaxis.com/' },
    ]},
  ];
  const fineLeft  = c.fineLeft  || 'Keys-Caldwell, Inc. · Independently owned · In Venice since 1978';
  const fineRight = c.fineRight || '© 2026 · Florida CAM Licensed';
  const assetBase = (typeof window !== 'undefined' && window.KC_ASSET_BASE) || '';
  return (
    <footer className="kc-footer">
      <div className="kc-footer-inner">
        <div>
          <img src={assetBase + 'assets/KC_Logo_White.svg'} alt="Keys-Caldwell" className="kc-footer-logo" />
          <p className="kc-footer-addr">
            {address.line1}<br/>
            {address.line2}<br/>
            <a href={'tel:' + address.phone.replace(/[^\d+]/g, '')}>{address.phone}</a><br/>
            <a href={'mailto:' + address.email}>{address.email}</a>
          </p>
          <div className="kc-footer-places">{places}</div>
        </div>
        <div className="kc-footer-cols">
          {columns.map(col => (
            <div key={col.title}>
              <div className="kc-footer-col-title">{col.title}</div>
              {col.links.map(l => (<a key={l.label} href={kcHref(l.href)}>{l.label}</a>))}
            </div>
          ))}
        </div>
      </div>
      <div className="kc-footer-fine">
        <span>{fineLeft}</span>
        <span>{fineRight}</span>
      </div>
    </footer>
  );
};

// ---------- Two-pillar service cards (Condo + HOA) ----------
// content = { eyebrow, title, intro, pillars: [{ eyebrow, title, desc, bullets, cta, places, href }] }
const KCPillars = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'Two paths · One firm';
  const title   = c.title   || <>Condo association management. <em>Or HOA management.</em> Both run by the same Venice team.</>;
  const intro   = c.intro   || `We manage low- and mid-rise coastal condos along with master-planned and small-lot HOAs across Sarasota County. The four-chamber model is the same — what changes is the building stock, the regulatory frame, and the issues that come back if you don't fix them right.`;
  const pillars = c.pillars || [
    {
      eyebrow: 'Primary practice · Coastal condos',
      title: 'Condo association management for 12 – 80-unit coastal buildings.',
      desc: 'Aging mid-rise structures need a manager who reads the SIRS report and a firm that has the bench to act on it. We run the building, handle the capital projects, and keep insurance carriers writing the policy.',
      bullets: [
        'Florida SIRS & milestone inspection coordination',
        'Reserve studies on a graduated continuum — self-assessment to subscription',
        'Capital projects — roofs, balconies, seawalls, concrete',
        'Insurance broker relationships for renewal & claims',
        'CPA-supervised accounting with monthly board packets',
      ],
      cta: 'Explore condo management',
      places: 'Venice · Longboat · Siesta · Englewood',
      href: '/condo-management/index.html',
    },
    {
      eyebrow: 'Secondary practice · HOAs',
      title: 'HOA management for single-family neighborhoods and small-lot communities.',
      desc: 'Covenant enforcement, common-area maintenance, annual meetings, and budget planning — handled by a manager you can reach, with the same accounting infrastructure behind every report.',
      bullets: [
        'Covenant enforcement & documented violations process',
        'Common-area maintenance & vendor management',
        'Annual meeting facilitation & election support',
        'Budget planning with reserve-fund discipline',
        'Vantaca portal for owners — front-desk for boards',
      ],
      cta: 'Explore HOA management',
      places: 'Bradenton · Charlotte · North Port',
      href: '/hoa-management/index.html',
    },
  ];
  return (
    <section className="kc-section kc-section-shell">
      <div className="kc-container">
        <div className="kc-eyebrow">{eyebrow}</div>
        <h2 className="kc-section-title">{title}</h2>
        <hr className="kc-rule" />
        <p className="kc-section-intro">{intro}</p>
        <div className="kc-pillars-grid">
          {pillars.map(p => (
            <a key={p.title} className="kc-pillar-card" href={kcHref(p.href)}>
              <div className="kc-pillar-card-eye">{p.eyebrow}</div>
              <h3 className="kc-pillar-card-title">{p.title}</h3>
              <p className="kc-pillar-card-desc">{p.desc}</p>
              <ul className="kc-pillar-card-list">
                {p.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <div className="kc-pillar-card-foot">
                <span>{p.cta} <span className="kc-arrow">→</span></span>
                <span className="kc-pillar-card-places">{p.places}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Four-chamber service grid ----------
// content = { eyebrow, title, intro, items: [{ icon, n, title, desc }] }
const KCFourChamber = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'Our four-chamber service model';
  const title   = c.title   || <>Four departments. <em>One point of accountability.</em></>;
  const intro   = c.intro   || 'Every Keys-Caldwell community has a single association manager — but behind them is the full firm. When boards need accounting, property, or after-hours support, those answers come from specialists, not a callback queue.';
  const items   = c.items   || [
    { icon: 'building-2',  n: '01', title: 'Community management', desc: 'A dedicated association manager attends every meeting, enforces the documents, manages vendors, and answers when boards call.' },
    { icon: 'dollar-sign', n: '02', title: 'Accounting', desc: 'CPA-supervised financials, daily reconciliation, transparent monthly reporting, and reserve oversight that flags shortfalls early.', href: '/accounting/index.html' },
    { icon: 'wrench',      n: '03', title: 'Property services', desc: 'In-house maintenance coordination for the day-to-day, plus capital project management for roofs, seawalls, and structural milestones.' },
    { icon: 'phone',       n: '04', title: 'Client services', desc: 'Owners reach a real person — front-desk, after hours, weekends. Boards hear about issues before they escalate.' },
  ];
  return (
    <section className="kc-section kc-section-white">
      <div className="kc-container">
        <div className="kc-eyebrow">{eyebrow}</div>
        <h2 className="kc-section-title">{title}</h2>
        <hr className="kc-rule" />
        <p className="kc-section-intro">{intro}</p>
        <div className="kc-services-grid">
          {items.map(s => {
            const inner = (
              <>
                <div className="kc-service-icon"><i data-lucide={s.icon}></i></div>
                <div className="kc-service-num">No.{s.n}</div>
                <h4 className="kc-service-title">
                  {s.title}
                  {s.href && <span className="kc-service-arrow" aria-hidden="true">→</span>}
                </h4>
                <p className="kc-service-desc">{s.desc}</p>
              </>
            );
            return s.href ? (
              <a key={s.title} className="kc-service-card kc-service-card-link" href={kcHref(s.href)}>
                {inner}
              </a>
            ) : (
              <article key={s.title} className="kc-service-card">{inner}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---------- Heritage timeline ----------
// content = { eyebrow, lede, eras: [{ year, label, body }] }
const KCHeritage = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'Three eras · One address';
  const lede    = c.lede    || 'Keys-Caldwell has been at the same Venice address since 1978 — through three ownership eras, the same plain-spoken culture, and now national-level expertise behind every association manager.';
  const eras    = c.eras    || [
    { year: '1978', label: 'Founding era', body: 'Annette Caldwell opens Keys-Caldwell on Indian Hills Boulevard in Venice — a locally owned firm built on plain talk and reliable follow-through.' },
    { year: '2007', label: 'Kraut era',    body: 'Jim Kraut takes the helm. Keys-Caldwell becomes one of the region\'s most recognized association management firms, with contracts measured in decades, not years.' },
    { year: '2024', label: 'Bradley era',  body: 'James Bradley acquires the firm. Lauren Wilson leads operations. The relationship-driven culture stays — paired with modern systems, CPA-level accounting, and national capital-project expertise.' },
  ];
  return (
    <section className="kc-heritage">
      <div className="kc-container">
        <div className="kc-heritage-head">
          <div>
            <div className="kc-eyebrow">{eyebrow}</div>
          </div>
          <p className="lede">{lede}</p>
        </div>
        <div className="kc-heritage-line">
          {eras.map(e => (
            <div key={e.year} className="kc-era">
              <div className="kc-era-year">{e.year}</div>
              <div className="kc-era-label">{e.label}</div>
              <p className="kc-era-body">{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Signature personality quote ----------
// content = { eyebrow, quote, attribution }
const KCQuote = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'Personality in a sentence';
  const quote   = c.quote   || <>"As small as they want us to be,<br/>but as big as they need us to be."</>;
  const attribution = c.attribution || '— A Keys-Caldwell board president · Venice';
  return (
    <section className="kc-quote">
      <div className="kc-container">
        <div className="kc-quote-eyebrow">{eyebrow}</div>
        <blockquote className="kc-quote-text">{quote}</blockquote>
        <div className="kc-quote-attr">{attribution}</div>
      </div>
    </section>
  );
};

// ---------- Differentiators (numbered rows) ----------
// content = { eyebrow, title, items: [{ title, desc }] }
const KCDifferentiators = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'What sets us apart';
  const title   = c.title   || 'Six things we won\'t compromise on.';
  const items   = c.items   || [
    { title: 'Local expertise, 48 years deep',     desc: 'Forty-eight years in Venice and Sarasota means we know which contractors show up, which vendors last, and which issues come back if you don\'t fix them right.' },
    { title: 'CPA-level financial oversight',      desc: 'A nationally-scaled accounting platform supports 500+ associations — daily reconciliation, stoplight risk grading, and Ande Duda CPA on staff. Every association reviewed monthly.' },
    { title: 'Reserve study expertise',            desc: 'A graduated reserve-study continuum — from a $150 self-assessment to a fully managed subscription study. Boards see capital risk five years out, not five months.' },
    { title: 'Departmental accountability',        desc: 'Four chambers. Every function has an owner. No "let me transfer you" loops between vague property-management departments.' },
    { title: 'Scope-based pricing — no buffet',    desc: 'Every contract is priced on a custom man-hour estimate, not a tier. Boards co-build the scope. The product is time and expertise.' },
    { title: 'Institutional continuity',           desc: 'Associations don\'t want a new manager every eighteen months. Many of our contracts run twenty years and longer. A board member can reasonably expect not to switch firms during their term.' },
  ];
  return (
    <section className="kc-section kc-section-shell">
      <div className="kc-container">
        <div className="kc-eyebrow">{eyebrow}</div>
        <h2 className="kc-section-title">{title}</h2>
        <hr className="kc-rule" />
        <div className="kc-diff-grid">
          {items.map((it, i) => (
            <div key={it.title} className="kc-diff-row">
              <div className="kc-diff-num">{String(i+1).padStart(2,'0')}</div>
              <div>
                <h4 className="kc-diff-title">{it.title}</h4>
                <p className="kc-diff-desc">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Testimonial ----------
// content = { eyebrow, quote, name, role, initials }
const KCTestimonial = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'From a board treasurer';
  const quote   = c.quote   || 'Our previous manager learned about a $400,000 reserve gap when the SIRS report landed. Keys-Caldwell flagged it during budget planning — three years before the assessment would have come due. Owners saw a manageable annual increase instead of a six-figure surprise.';
  const name    = c.name    || 'Michael Cochran';
  const role    = c.role    || 'Board Treasurer · 32-unit coastal condo · Venice, FL';
  const initials = c.initials || 'MC';
  return (
    <section className="kc-testimonial">
      <div className="kc-container">
        <div className="kc-testimonial-grid">
          <div className="kc-testimonial-mark">"</div>
          <div>
            <div className="kc-eyebrow">{eyebrow}</div>
            <p className="kc-testimonial-q">{quote}</p>
            <div className="kc-testimonial-attr">
              <div className="kc-testimonial-mono">{initials}</div>
              <div>
                <div className="kc-testimonial-meta-name">{name}</div>
                <div className="kc-testimonial-meta-role">{role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Final CTA band ----------
// content = { eyebrow, title, body, primary: { label, href }, secondary: { label, href }, phone, hours }
const KCCtaBand = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'Considering a change?';
  const title   = c.title   || 'Send us your governing documents. We\'ll come back with a tailored proposal — typically within five business days.';
  const body    = c.body    || 'We\'ll review your current scope, your reserve position, and your building\'s capital horizon. The call is consultative, not a pitch — boards leave with a clearer picture of what they should expect from their management firm, whether that\'s us or someone else.';
  const primary   = c.primary   || { label: 'Request a proposal', href: '/request-proposal/index.html' };
  const secondary = c.secondary || { label: 'Meet the team',      href: '/about/index.html' };
  const phone = c.phone || '(941) 485-0605';
  const hours = c.hours || 'Mon – Fri · 8:30am – 5:00pm ET';
  const phoneHref = 'tel:' + phone.replace(/[^\d+]/g, '');
  return (
    <section className="kc-cta-band">
      <div className="kc-container">
        <div>
          <div className="kc-cta-band-eye">{eyebrow}</div>
          <h2 className="kc-cta-band-h">{title}</h2>
          <p className="kc-cta-band-p">{body}</p>
        </div>
        <div className="kc-cta-band-actions">
          <a className="kc-btn kc-btn-brass kc-btn-lg" href={kcHref(primary.href)}>{primary.label} <span className="kc-arrow">→</span></a>
          <a className="kc-btn kc-btn-ghost" href={kcHref(secondary.href)}>{secondary.label}</a>
          <div style={{ marginTop: 24 }}>
            <div className="kc-cta-band-side-eye">Or call directly</div>
            <a className="kc-cta-band-phone" href={phoneHref}>{phone}</a>
            <div className="kc-cta-band-phone-sub">{hours}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Hero (editorial classic — V1 hero, now content-driven) ----------
// content = {
//   numeral, eyebrow, title (JSX or string), lede,
//   primaryCta: { label, href }, secondaryCta: { label, href },
//   photo: { src?, alt, caption, overlayEye, overlayH, overlayP, overlayCta: { label, href } },
//   trustStats: [{ num, suffix?, label }], credentials: { eyebrow, items: [...] }
// }
const KCHero = ({ content }) => {
  const c = content || {};
  const numeral = c.numeral || <>N<sup>o</sup>01</>;
  const eyebrow = c.eyebrow || 'Community Association Management · Venice, Florida';
  const title   = c.title   || <>The community partner your board has been <em>looking for since 1978.</em></>;
  const lede    = c.lede    || `For 48 years we've helped boards across Sarasota County run their condominium and homeowner associations with financial clarity, proactive leadership, and the kind of responsive support that doesn't end at five o'clock.`;
  const primaryCta   = c.primaryCta   || { label: 'Request a proposal', href: '/request-proposal/index.html' };
  const secondaryCta = c.secondaryCta || { label: 'How we work',         href: '/about/index.html' };
  const photo   = c.photo   || {
    alt: 'Coastal Florida neighborhood at golden hour',
    caption: 'Sarasota County · Florida',
    overlayEye: 'For HOA & condo boards',
    overlayH: 'Tell us about your community.',
    overlayP: 'Send us your governing documents and a few details about your association. We\'ll come back with a tailored management proposal — typically within five business days.',
    overlayCta: { label: 'Get a management proposal', href: '/request-proposal/index.html' },
  };
  const trustStats = c.trustStats || [
    { num: '48',    label: 'Years at the same Venice address' },
    { num: '50',    suffix: '+', label: 'Communities under active management' },
    { num: '20',    suffix: '+', label: 'Year average client tenure' },
  ];
  const credentials = c.credentials || {
    eyebrow: 'Credentials',
    items: ['BBB A+ accredited', 'Florida CAM Licensed', 'Independently owned'],
  };
  return (
    <section className="kc-hero">
      <div className="kc-container">
        <div className="kc-hero-grid">
          <div className="kc-hero-text">
            <div className="kc-hero-eyebrow-row">
              <span className="kc-hero-numeral">{numeral}</span>
              <span className="kc-eyebrow no-mark">{eyebrow}</span>
            </div>
            <h1 className="kc-hero-title">{title}</h1>
            <hr className="kc-rule" />
            <p className="kc-hero-lede">{lede}</p>
            <div className="kc-hero-cta">
              <a className="kc-btn kc-btn-primary kc-btn-lg" href={kcHref(primaryCta.href)}>{primaryCta.label} <span className="kc-arrow">→</span></a>
              <a className="kc-btn kc-btn-secondary kc-btn-lg" href={kcHref(secondaryCta.href)}>{secondaryCta.label}</a>
            </div>
          </div>
          <div className="kc-hero-stack">
            <div className="kc-hero-photo" role="img" aria-label={photo.alt}>
              <div className="kc-hero-photo-cap">{photo.caption}</div>
              <div className="kc-hero-overlay">
                <div className="kc-hero-overlay-eye">{photo.overlayEye}</div>
                <h2 className="kc-hero-overlay-h">{photo.overlayH}</h2>
                <p className="kc-hero-overlay-p">{photo.overlayP}</p>
                <a className="kc-btn-overlay" href={kcHref(photo.overlayCta.href)}>{photo.overlayCta.label} <span className="kc-arrow">→</span></a>
              </div>
            </div>
          </div>
        </div>
        <div className="kc-hero-trust-strip">
          {trustStats.map(s => (
            <div key={s.label} className="kc-hero-trust-stat">
              <span className="kc-hero-trust-num">{s.num}{s.suffix ? <small>{s.suffix}</small> : null}</span>
              <span className="kc-hero-trust-lbl">{s.label}</span>
            </div>
          ))}
          <div className="kc-hero-trust-credentials">
            <div className="kc-hero-trust-credentials-eye">{credentials.eyebrow}</div>
            <div className="kc-hero-trust-credentials-row">
              {credentials.items.map((it, i) => (
                <React.Fragment key={it}>
                  {i > 0 && <span className="dot"></span>}
                  <span>{it}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Shared helpers (used by page CONTENT blocks) ----------
// Splits a plain headline string into "before <em>italic</em> after"
// using the chosen italic substring. If italic isn't a substring of plain,
// treats it as a trailing clause (concat with a space) — that's the form
// every CONTENT block authors. Works in JSX.
const italicize = (text, italicPart) => {
  if (!italicPart) return text || null;
  if (!text) return <em>{italicPart}</em>;
  if (text.includes(italicPart)) {
    const [before, after] = text.split(italicPart);
    return <>{before}<em>{italicPart}</em>{after}</>;
  }
  return <>{text} <em>{italicPart}</em></>;
};
// Renders a quote string honoring \n as <br/>.
const withBreaks = (str) => str.split('\n').flatMap((line, i, arr) =>
  i === arr.length - 1 ? [line] : [line, <br key={i}/>]
);

// ---------- Breadcrumbs ----------
// content = { items: [{ label, href? }] }   // last item should have no href
// Visual UI + JSON-LD-ready data (schema is emitted by KCSeo.apply()).
const KCBreadcrumbs = ({ content }) => {
  const items = (content && content.items) || [];
  if (items.length < 2) return null;
  return (
    <nav className="kc-breadcrumbs" aria-label="Breadcrumb">
      <div className="kc-container">
        <ol className="kc-breadcrumbs-list">
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="kc-breadcrumbs-item">
                {it.href && !isLast
                  ? <a href={kcHref(it.href)}>{it.label}</a>
                  : <span aria-current={isLast ? 'page' : undefined}>{it.label}</span>}
                {!isLast && <span className="kc-breadcrumbs-sep" aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

// ---------- Two-up Testimonial Pair ----------
// content = { eyebrow?, items: [{ quote, name, role, initials }] }
// Pillar pages use this instead of single KCTestimonial when sitemap calls for "blocks" (plural).
const KCTestimonialPair = ({ content }) => {
  const c = content || {};
  const items = c.items || [];
  if (!items.length) return null;
  return (
    <section className="kc-testimonial-pair">
      <div className="kc-container">
        {c.eyebrow && <div className="kc-eyebrow no-mark" style={{ marginBottom: 32 }}>{c.eyebrow}</div>}
        <div className="kc-testimonial-pair-grid">
          {items.map((t, i) => (
            <figure key={i} className="kc-testimonial-card">
              <div className="kc-testimonial-card-mark">"</div>
              <blockquote className="kc-testimonial-card-q">{t.quote}</blockquote>
              <figcaption className="kc-testimonial-card-attr">
                <div className="kc-testimonial-mono" aria-hidden="true">{t.initials}</div>
                <div>
                  <div className="kc-testimonial-meta-name">{t.name}</div>
                  <div className="kc-testimonial-meta-role">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Embedded Proposal Form ----------
// content = { eyebrow, titlePlain, titleItalic, intro, action?, fields? }
// `action` can be set to a real endpoint; defaults to mailto for the stub period.
// `fields` accepts an array of overrides; if omitted a sensible default set ships.
// Submission is handled by the host page (or browser default if action is set).
const KCProposalForm = ({ content }) => {
  const c = content || {};
  const eyebrow = c.eyebrow || 'Request a proposal';
  const intro   = c.intro   || `Tell us a little about your association. We'll come back with a tailored proposal — typically within five business days.`;
  const action  = c.action  || 'mailto:info@keys-caldwell.com';
  const fields  = c.fields  || [
    { name: 'name',         label: 'Your name',                       type: 'text',  required: true },
    { name: 'role',         label: 'Your role on the board',          type: 'text',  placeholder: 'e.g. Board President', required: true },
    { name: 'email',        label: 'Email',                            type: 'email', required: true },
    { name: 'phone',        label: 'Phone',                            type: 'tel' },
    { name: 'community',    label: 'Community / association name',    type: 'text',  required: true },
    { name: 'communityType', label: 'Community type',                  type: 'select', options: ['Coastal condominium', 'Mid-rise condominium', 'High-rise condominium', 'Single-family HOA', 'Master-planned community', 'Mixed-use'], required: true },
    { name: 'units',        label: 'Number of units',                  type: 'number', placeholder: '32' },
    { name: 'city',         label: 'City',                             type: 'text',  placeholder: 'Venice' },
    { name: 'currentMgmt',  label: 'Current management situation',     type: 'select', options: ['Self-managed', 'Currently with another firm', 'Newly formed', 'Other'] },
    { name: 'timing',       label: 'Decision timing',                  type: 'select', options: ['Immediately', '30–60 days', '60–90 days', 'Just exploring'] },
    { name: 'message',      label: 'Anything else we should know?',    type: 'textarea', full: true, placeholder: 'Reserve gaps, capital projects, vendor pain points, board priorities — whatever helps us prepare.' },
  ];
  return (
    <section className="kc-proposal-form" id="proposal-form">
      <div className="kc-container">
        <div className="kc-proposal-grid">
          <div className="kc-proposal-side">
            <div className="kc-eyebrow no-mark">{eyebrow}</div>
            <h2 className="kc-proposal-h">
              {c.title
                ? c.title
                : (c.titlePlain && c.titleItalic
                    ? italicize(c.titlePlain, c.titleItalic)
                    : <>Send us a few details. <em>We'll do the homework.</em></>)}
            </h2>
            <p className="kc-proposal-p">{intro}</p>
            <ul className="kc-proposal-bullets">
              <li>We'll review your governing documents and most recent reserve study.</li>
              <li>We'll prepare a custom man-hour scope — no buffet pricing.</li>
              <li>You'll get a 30-minute consultative call, regardless of whether you hire us.</li>
            </ul>
          </div>
          <form className="kc-form" action={action} method="post" noValidate>
            {fields.map(f => (
              <div key={f.name} className={'kc-form-row' + (f.full ? ' is-full' : '')}>
                <label className="kc-form-label" htmlFor={'pf-' + f.name}>
                  {f.label}{f.required && <span className="kc-form-req" aria-hidden="true"> *</span>}
                </label>
                {f.type === 'textarea'
                  ? <textarea id={'pf-' + f.name} name={f.name} rows={4}
                              placeholder={f.placeholder} required={f.required} className="kc-form-input" />
                  : f.type === 'select'
                    ? <select id={'pf-' + f.name} name={f.name} required={f.required} className="kc-form-input" defaultValue="">
                        <option value="" disabled>Select…</option>
                        {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    : <input id={'pf-' + f.name} name={f.name} type={f.type}
                             placeholder={f.placeholder} required={f.required} className="kc-form-input" />}
              </div>
            ))}
            <div className="kc-form-row is-full kc-form-actions">
              <button type="submit" className="kc-btn kc-btn-primary kc-btn-lg">Send proposal request <span className="kc-arrow">→</span></button>
              <p className="kc-form-fine">By submitting, you agree to be contacted about your association management needs. We do not share your information.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, {
  KCNav, KCFooter, KCPillars, KCFourChamber, KCHeritage, KCQuote,
  KCDifferentiators, KCTestimonial, KCCtaBand, KCHero,
  KCBreadcrumbs, KCTestimonialPair, KCProposalForm,
  italicize, withBreaks
});
