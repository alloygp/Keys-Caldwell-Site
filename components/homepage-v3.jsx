// Keys-Caldwell — Homepage V3: Heritage-forward
// 1978 is the protagonist. Big italic numerals carry the hero. Type-led,
// less photography, more institutional. Three-era timeline pulled in early,
// mission slab, places strip, then service pillars.

const KCHeroV3 = () => (
  <section className="kc-hero-v3">
    <div className="kc-container">
      <div className="kc-hero-v3-grid">
        <div className="kc-hero-v3-stamp">
          <div className="kc-hero-v3-stamp-eye">In Venice since</div>
          <div className="kc-hero-v3-stamp-num">1978</div>
          <div className="kc-hero-v3-stamp-cap">Same address · Same plain-spoken culture · New national bench</div>
        </div>
        <div className="kc-hero-v3-text">
          <div className="kc-hero-v3-text-eye">Community Association Management</div>
          <h1 className="kc-hero-v3-h">
            Forty-eight years on Indian Hills Boulevard, looking after the boards that look after the buildings.
          </h1>
          <p className="kc-hero-v3-p">
            Keys-Caldwell manages low- and mid-rise coastal condos and small-lot HOAs across Sarasota County. Personal attention from a manager who knows your building. Professional results from a firm with national-level expertise in capital projects, accounting, and insurance.
          </p>
          <div className="kc-hero-v3-cta">
            <a className="kc-btn kc-btn-primary kc-btn-lg" href={(window.kcHref || (h=>h))('/request-proposal/index.html')}>Request a proposal <span className="kc-arrow">→</span></a>
            <a className="kc-btn kc-btn-secondary kc-btn-lg" href={(window.kcHref || (h=>h))('/about/index.html')}>Meet the team</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const KCMission = () => (
  <section className="kc-mission">
    <div className="kc-mission-inner">
      <div className="kc-mission-eye">Personal attention with professional results</div>
      <p className="kc-mission-h">
        We've been managing condominium associations in Sarasota County for forty-eight years. Our team brings <em>national expertise</em> in capital projects, CPA-level financial oversight, modern technology, and responsive service — so boards can manage complex buildings without the stress.
      </p>
    </div>
  </section>
);

const KCPlaces = () => (
  <section className="kc-places">
    <div className="kc-container">
      <div className="kc-places-eye">Communities served across Sarasota County</div>
      <div className="kc-places-list">
        <span>Venice</span><span className="dot"></span>
        <span>Sarasota</span><span className="dot"></span>
        <span>Longboat Key</span><span className="dot"></span>
        <span>Siesta Key</span><span className="dot"></span>
        <span>Nokomis</span><span className="dot"></span>
        <span>Englewood</span><span className="dot"></span>
        <span>Bradenton</span><span className="dot"></span>
        <span>North Port</span><span className="dot"></span>
        <span>Punta Gorda</span>
      </div>
    </div>
  </section>
);

// V3 differentiators — 3-up cards instead of 6-row list
const KCThreePillars = () => {
  const items = [
    {
      eye: 'National expertise',
      t: 'Local presence, national bench.',
      d: 'Ownership brings track records from Associa Colorado, Association Prime ($2.5B+), SuperKey (4,000+ associations across 48 states), and PEAK (100+ CEOs coached). All quietly behind a Venice firm.',
    },
    {
      eye: 'Financial clarity',
      t: 'CPA-supervised every month.',
      d: 'CityBooks runs accounting for 500+ associations nationally. Daily reconciliation, monthly board packets, stoplight risk grading, audit-ready year-end. Ande Duda CPA reviews the books your board signs off on.',
    },
    {
      eye: 'Capital projects',
      t: 'A construction bench small condos rarely get.',
      d: 'Property Services scopes, bids, and runs roof, balcony, seawall, and concrete projects to closeout. AccuReserve and Karen\'s Engineering on the SIRS side. JLL partnership for on-site construction management.',
    },
  ];
  return (
    <section className="kc-section kc-section-shell">
      <div className="kc-container">
        <div className="kc-eyebrow">Three commitments</div>
        <h2 className="kc-section-title">As small as boards want us to be — <em>as big as they need us to be.</em></h2>
        <hr className="kc-rule" />
        <div className="kc-pillars-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {items.map((it, i) => (
            <div key={i} className="kc-pillar-card" style={{ minHeight: 320 }}>
              <div className="kc-pillar-card-eye">{it.eye}</div>
              <h3 className="kc-pillar-card-title" style={{ fontSize: 24 }}>{it.t}</h3>
              <p className="kc-pillar-card-desc" style={{ marginBottom: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomepageV3 = () => (
  <div className="kc-page">
    <KCNav active="home" />
    <KCHeroV3 />
    <KCMission />
    <KCHeritage />
    <KCThreePillars />
    <KCQuote />
    <KCPlaces />
    <KCPillars />
    <KCTestimonial />
    <KCCtaBand />
    <KCFooter />
  </div>
);

window.HomepageV3 = HomepageV3;
