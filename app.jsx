// Main app shell + Tweaks integration.
const { useEffect: useAppEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "olive",
  "showStrip": true,
  "showStickyMobileCTA": true,
  "formBadge": "Cash offer in 24h",
  "phone": "(404) 555-0188",
  "heroBg": "cream"
}/*EDITMODE-END*/;

const ACCENTS = {
  olive:    { name: "Olive",     accent: "#5a6a3a", deep: "#3f4b27", soft: "#c7cda6", gold: "#b89456" },
  midnight: { name: "Midnight",  accent: "#2f4a6a", deep: "#1f3047", soft: "#bcc8d6", gold: "#b89456" },
  clay:     { name: "Clay",      accent: "#a05a3a", deep: "#7a3f25", soft: "#e6c8b3", gold: "#c69152" },
  emerald:  { name: "Emerald",   accent: "#2f6a4a", deep: "#1f4a33", soft: "#b3d6c2", gold: "#c69152" },
  ink:      { name: "Pure Ink",  accent: "#1c1b18", deep: "#1c1b18", soft: "#d9d3c4", gold: "#b89456" },
};

const BGS = {
  cream: { name: "Cream",     bg: "#f4f1ea", bg2: "#ece7dc", paper: "#fbf9f4" },
  bone:  { name: "Bone",      bg: "#f0ece2", bg2: "#e6e0d0", paper: "#faf6ec" },
  fog:   { name: "Cool fog",  bg: "#eef0ee", bg2: "#e2e6e2", paper: "#f8faf8" },
  paper: { name: "Bright",    bg: "#f7f6f1", bg2: "#eeeae0", paper: "#ffffff" },
};

function applyTheme(accentKey, bgKey) {
  const a = ACCENTS[accentKey] || ACCENTS.olive;
  const b = BGS[bgKey] || BGS.cream;
  const r = document.documentElement;
  r.style.setProperty("--accent", a.accent);
  r.style.setProperty("--accent-deep", a.deep);
  r.style.setProperty("--accent-soft", a.soft);
  r.style.setProperty("--gold", a.gold);
  r.style.setProperty("--bg", b.bg);
  r.style.setProperty("--bg-2", b.bg2);
  r.style.setProperty("--paper", b.paper);
}

function applyBadge(text) {
  let el = document.getElementById("__badge-override");
  if (!el) {
    el = document.createElement("style");
    el.id = "__badge-override";
    document.head.appendChild(el);
  }
  const safe = (text || "").replace(/"/g, "");
  el.textContent = `.form-card-wrap::after { content: "${safe}" !important; }`;
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useAppEffect(() => { applyTheme(tweaks.accent, tweaks.heroBg); }, [tweaks.accent, tweaks.heroBg]);
  useAppEffect(() => { applyBadge(tweaks.formBadge); }, [tweaks.formBadge]);

  return (
    <div>
      <Nav phone={tweaks.phone} />
      <Hero />
      <FormSection />
      {tweaks.showStrip && <Strip />}
      <HowItWorks />
      <WhyUs />
      <Situations />
      <Stories />
      <FAQ phone={tweaks.phone} />
      <FinalCTA phone={tweaks.phone} />
      <Footer phone={tweaks.phone} />
      {tweaks.showStickyMobileCTA && <StickyCTA />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakSelect
            label="Accent palette"
            value={tweaks.accent}
            onChange={v => setTweak("accent", v)}
            options={Object.entries(ACCENTS).map(([k, v]) => ({ value: k, label: v.name }))}
          />
          <TweakSelect
            label="Background tone"
            value={tweaks.heroBg}
            onChange={v => setTweak("heroBg", v)}
            options={Object.entries(BGS).map(([k, v]) => ({ value: k, label: v.name }))}
          />
        </TweakSection>

        <TweakSection label="Hero">
          <TweakText
            label="Form badge"
            value={tweaks.formBadge}
            onChange={v => setTweak("formBadge", v)}
          />
          <TweakText
            label="Phone number"
            value={tweaks.phone}
            onChange={v => setTweak("phone", v)}
          />
        </TweakSection>

        <TweakSection label="Sections">
          <TweakToggle
            label="Press / accreditation strip"
            value={tweaks.showStrip}
            onChange={v => setTweak("showStrip", v)}
          />
          <TweakToggle
            label="Sticky mobile CTA"
            value={tweaks.showStickyMobileCTA}
            onChange={v => setTweak("showStickyMobileCTA", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
