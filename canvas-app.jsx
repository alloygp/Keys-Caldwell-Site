// Keys-Caldwell — Homepage canvas host
// Wraps the three homepage variants (V1 editorial, V2 board-first, V3 heritage)
// in the design_canvas starter so the user can compare side-by-side, focus any
// one fullscreen, drag-reorder. Tweaks panel toggles which variant the canvas
// emphasises and a few other knobs.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary_variant": "v1",
  "show_photography": true,
  "footer_treatment": "ink",
  "social_proof": "testimonial",
  "type_scale": 1.0
}/*EDITMODE-END*/;

const VARIANT_LABELS = {
  v1: 'V1 · Editorial classic',
  v2: 'V2 · Board-first / problem-led',
  v3: 'V3 · Heritage-forward'
};

const VARIANT_SUBTITLES = {
  v1: 'Italic Lora hero · Image-led · Service-pillar split + four-chamber grid',
  v2: 'Dark hero · Lead with the relief · "Fears + answer" cards · Comparison rows',
  v3: '1978 stamp protagonist · Type-led, less photography · Heritage timeline early'
};

const ARTBOARD_W = 1280;
const ARTBOARD_H = 5400; // long enough for the longest scroll

function useScaledType(scale) {
  React.useEffect(() => {
    const id = 'kc-type-scale-override';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `:root { font-size: ${16 * scale}px; }`;
  }, [scale]);
}

function usePhotographyToggle(show) {
  React.useEffect(() => {
    const id = 'kc-photo-toggle';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = show
      ? ''
      : `.kc-hero-photo { background-image: linear-gradient(180deg, var(--kc-indigo) 0%, var(--deep-ink) 100%) !important; }
         .kc-hero-photo-cap { background: rgba(184,148,61,0.85); color: var(--deep-ink) !important; }`;
  }, [show]);
}

function useFooterTreatment(t) {
  React.useEffect(() => {
    const id = 'kc-footer-treatment';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    if (t === 'shell') {
      el.textContent = `
        .kc-footer { background: var(--shell) !important; color: var(--deep-ink) !important; border-top: 1px solid var(--shell-line); }
        .kc-footer-addr { color: var(--driftwood) !important; }
        .kc-footer-cols a { color: var(--driftwood) !important; }
        .kc-footer-cols a:hover { color: var(--deep-ink) !important; }
        .kc-footer-fine { color: var(--driftwood) !important; border-top-color: var(--shell-line) !important; }
        .kc-footer-logo { content: url('assets/KC_Logo_Navy.svg'); }
      `;
    } else if (t === 'indigo') {
      el.textContent = `.kc-footer { background: var(--kc-indigo) !important; }`;
    } else {
      el.textContent = '';
    }
  }, [t]);
}

function useSocialProofToggle(mode) {
  React.useEffect(() => {
    const id = 'kc-social-toggle';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      document.head.appendChild(el);
    }
    if (mode === 'metrics') {
      el.textContent = `.kc-testimonial { display: none; }`;
    } else {
      el.textContent = '';
    }
  }, [mode]);
}

const CanvasApp = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useScaledType(tweaks.type_scale);
  usePhotographyToggle(tweaks.show_photography);
  useFooterTreatment(tweaks.footer_treatment);
  useSocialProofToggle(tweaks.social_proof);

  // Order the artboards based on which variant the user marks as primary.
  const variants = ['v1', 'v2', 'v3'];
  const ordered = [tweaks.primary_variant, ...variants.filter(v => v !== tweaks.primary_variant)];

  const renderVariant = (v) => {
    if (v === 'v1') return <HomepageV1 />;
    if (v === 'v2') return <HomepageV2 />;
    if (v === 'v3') return <HomepageV3 />;
  };

  return (
    <>
      <DesignCanvas>
        <DCSection
          id="homepage"
          title="Homepage · / "
          subtitle="Three directions for keys-caldwell.com — each renders the full long-scroll page. Open any artboard fullscreen to review section by section."
        >
          {ordered.map((v, i) => (
            <DCArtboard
              key={v}
              id={v}
              label={`${i === 0 ? '⭐ ' : ''}${VARIANT_LABELS[v]} — ${VARIANT_SUBTITLES[v]}`}
              width={ARTBOARD_W}
              height={ARTBOARD_H}
            >
              <div data-screen-label={`Homepage ${VARIANT_LABELS[v]}`}>
                {renderVariant(v)}
              </div>
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Primary variant" subtitle="Reorders artboards so your pick sits left-most.">
          <TweakRadio
            value={tweaks.primary_variant}
            onChange={(v) => setTweak('primary_variant', v)}
            options={[
              { value: 'v1', label: 'V1 · Editorial' },
              { value: 'v2', label: 'V2 · Board-first' },
              { value: 'v3', label: 'V3 · Heritage' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Imagery">
          <TweakToggle
            label="Show photography in V1 hero"
            checked={tweaks.show_photography}
            onChange={(v) => setTweak('show_photography', v)}
          />
        </TweakSection>

        <TweakSection title="Social proof under hero">
          <TweakRadio
            value={tweaks.social_proof}
            onChange={(v) => setTweak('social_proof', v)}
            options={[
              { value: 'testimonial', label: 'Testimonial slab' },
              { value: 'metrics', label: 'Metrics only' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Footer treatment">
          <TweakSelect
            value={tweaks.footer_treatment}
            onChange={(v) => setTweak('footer_treatment', v)}
            options={[
              { value: 'ink', label: 'Deep Ink (default)' },
              { value: 'indigo', label: 'KC Indigo' },
              { value: 'shell', label: 'Shell (light)' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Type scale" subtitle="Multiplies the root font-size across the page.">
          <TweakSlider
            min={0.9} max={1.15} step={0.01}
            value={tweaks.type_scale}
            onChange={(v) => setTweak('type_scale', v)}
            formatValue={(v) => `${Math.round(v * 100)}%`}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<CanvasApp />);

// Re-fire Lucide whenever a variant remounts (initial + after tweak changes).
const fireIcons = () => window.lucide && window.lucide.createIcons();
setTimeout(fireIcons, 100);
setInterval(fireIcons, 1500);

window.addEventListener('keydown', (e) => {
  // Re-create icons after focus-mode entry; the canvas overlay re-mounts.
  if (e.key === 'Escape' || e.key === 'Enter') setTimeout(fireIcons, 200);
});
