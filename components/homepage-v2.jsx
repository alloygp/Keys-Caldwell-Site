// Keys-Caldwell — Homepage V2: Board-first / problem-led
// Lead with the relief. Hero centered on a question boards already have.
// Below: a 3-column "fears → answer" grid, then comparison rows that reframe
// differentiators as "what you get instead of…", then heritage + final CTA.

const KCHeroV2 = () => (
  <section className="kc-hero-v2">
    <div className="kc-container">
      <div className="kc-hero-v2-grid">
        <div className="kc-hero-v2-eye">Community association management · Venice · Sarasota · Bradenton</div>
        <h1 className="kc-hero-v2-h">
          Running a coastal condo board shouldn't feel like <em>second-guessing your management firm</em> every month.
        </h1>
        <p className="kc-hero-v2-p">
          Keys-Caldwell has been quietly handling the buildings, the books, and the boards across Sarasota County since 1978. Departmentalized service, CPA-level financials, and the capital-project bench small condos rarely get from anyone else.
        </p>
        <div className="kc-hero-v2-cta">
          <a className="kc-btn kc-btn-brass kc-btn-lg" href={(window.kcHref || (h=>h))('/request-proposal/index.html')}>Request a proposal <span className="kc-arrow">→</span></a>
          <a className="kc-btn kc-btn-ghost kc-btn-lg" href={(window.kcHref || (h=>h))('/about/index.html')}>How we work</a>
        </div>
      </div>
    </div>
  </section>
);

const KCFears = () => {
  const items = [
    {
      q: 'Our manager goes silent for weeks at a time.',
      ae: 'Departmentalized service',
      a: 'A dedicated association manager handles governance — and a separate Client Services team answers owner calls in real time. The two don\'t fight for time on a single inbox.',
    },
    {
      q: 'We won\'t know about a six-figure shortfall until it\'s too late.',
      ae: 'Reserve discipline · 5-year horizon',
      a: 'Our CPA-led accounting team reviews every association monthly with stoplight risk grading. Reserve-study modeling surfaces capital exposure five years out. Boards see special assessments forming before they\'re unavoidable.',
    },
    {
      q: 'Our SIRS report and milestone inspection are coming and no one has a plan.',
      ae: 'In-house capital project bench',
      a: 'Property Services has the construction-management capacity to scope, bid, and run roof, balcony, and concrete projects through to closeout — coordinated with the SIRS reserve update, not bolted on after.',
    },
  ];
  return (
    <section className="kc-fears">
      <div className="kc-container">
        <div className="kc-fears-head">
          <div className="kc-eyebrow">What boards are afraid of</div>
          <h2>Three things keep small condo boards up at night. We've spent forty-eight years answering each one.</h2>
        </div>
        <div className="kc-fears-grid">
          {items.map((it, i) => (
            <div key={i} className="kc-fear-card">
              <div className="kc-fear-card-eye">The fear · No.{String(i+1).padStart(2,'0')}</div>
              <p className="kc-fear-card-q">"{it.q}"</p>
              <div className="kc-fear-card-divider"></div>
              <div className="kc-fear-card-a-eye">{it.ae}</div>
              <p className="kc-fear-card-a">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KCCompare = () => {
  const rows = [
    {
      old: { t: 'A single overloaded manager', p: 'One person covers governance, vendors, owner calls, financial questions, and emergencies — until something drops.' },
      neu: { t: 'Four chambers, one manager', p: 'Your manager focuses on governance and the board. Accounting, property, and client services run behind them.' },
    },
    {
      old: { t: 'A bookkeeper who codes invoices', p: 'Monthly statements that don\'t reconcile. Reserve transfers no one can quite explain. A nervous treasurer.' },
      neu: { t: 'CPA-supervised accounting', p: 'Daily reconciliation, monthly board packets, stoplight risk grading, audit-ready year-end. Ande Duda CPA on staff.' },
    },
    {
      old: { t: 'Buffet pricing — pick a tier', p: 'You pay for services you don\'t use, and the ones you actually need cost extra. Scope creep is the business model.' },
      neu: { t: 'Scope-based, custom man-hours', p: 'Every contract is built from a man-hour estimate that matches your community. Boards co-build the scope.' },
    },
    {
      old: { t: 'A new manager every 18 months', p: 'Turnover at the firm becomes turnover for the board. Institutional memory leaves with each transition.' },
      neu: { t: 'Contracts measured in decades', p: 'Many Keys-Caldwell management contracts run 20+ years. A board member can reasonably expect not to switch firms during their term.' },
    },
  ];
  return (
    <section className="kc-section kc-section-white">
      <div className="kc-container">
        <div className="kc-eyebrow">What you get instead</div>
        <h2 className="kc-section-title">The four trade-offs <em>most boards stop accepting</em> after switching to Keys-Caldwell.</h2>
        <hr className="kc-rule" />
        <p className="kc-section-intro">
          Boards rarely call us because they're shopping. They call because something specific has stopped working — and the firm they have isn't built to fix it.
        </p>
        <div className="kc-compare">
          {rows.map((r, i) => (
            <div key={i} className="kc-compare-row">
              <div className="kc-compare-cell is-old">
                <div className="kc-compare-eye">Most firms</div>
                <h4>{r.old.t}</h4>
                <p>{r.old.p}</p>
              </div>
              <div className="kc-compare-cell is-new">
                <div className="kc-compare-eye">Keys-Caldwell</div>
                <h4>{r.neu.t}</h4>
                <p>{r.neu.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KCV2Stats = () => (
  <section className="kc-section-tight kc-section-shell">
    <div className="kc-container">
      <div className="kc-hero-trust-strip" style={{ margin: 0 }}>
        <div className="kc-hero-trust-stat">
          <span className="kc-hero-trust-num">48</span>
          <span className="kc-hero-trust-lbl">Years at one Venice address</span>
        </div>
        <div className="kc-hero-trust-stat">
          <span className="kc-hero-trust-num">50<small>+</small></span>
          <span className="kc-hero-trust-lbl">Communities actively managed</span>
        </div>
        <div className="kc-hero-trust-stat">
          <span className="kc-hero-trust-num">500<small>+</small></span>
          <span className="kc-hero-trust-lbl">Associations on the platform</span>
        </div>
        <div className="kc-hero-trust-credentials">
          <div className="kc-hero-trust-credentials-eye">Credentials</div>
          <div className="kc-hero-trust-credentials-row">
            <span>BBB A+ accredited</span>
            <span className="dot"></span>
            <span>Florida CAM Licensed</span>
            <span className="dot"></span>
            <span>MBA leadership</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomepageV2 = () => (
  <div className="kc-page">
    <KCNav active="home" />
    <KCHeroV2 />
    <KCV2Stats />
    <KCFears />
    <KCCompare />
    <KCTestimonial />
    <KCQuote />
    <KCPillars />
    <KCCtaBand />
    <KCFooter />
  </div>
);

window.HomepageV2 = HomepageV2;
