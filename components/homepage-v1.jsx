// Keys-Caldwell — Homepage V1: Editorial classic
// Used inside the canvas at /site/homepage-directions.html.
// The canonical/standalone homepage is /site/index.html which builds
// the same composition directly from a CONTENT block.

const HomepageV1 = () => (
  <div className="kc-page">
    <KCNav active="home" />
    <KCHero />
    <KCPillars />
    <KCHeritage />
    <KCFourChamber />
    <KCQuote />
    <KCTestimonial />
    <KCDifferentiators />
    <KCCtaBand />
    <KCFooter />
  </div>
);

window.HomepageV1 = HomepageV1;
