// Multi-step seller lead capture form — the centerpiece of the landing page.
const { useState, useRef, useEffect } = React;

const FORMSPREE_ID = "xvzndpvq";
const TOTAL_STEPS = 3;

// Fake address suggestions to make the prototype feel real.
const ADDRESS_SUGGESTIONS = [
  { line: "4218 Magnolia Heights Dr", city: "Atlanta, GA 30311" },
  { line: "1207 Oakwood Avenue",      city: "Dallas, TX 75215" },
  { line: "865 Magnolia Park Way",    city: "Phoenix, AZ 85021" },
  { line: "342 Maple Grove Rd",       city: "Charlotte, NC 28202" },
  { line: "78 Bayview Terrace",       city: "Tampa, FL 33602" },
];

const CONDITIONS = [
  { v: "move-in",  l: "Move-in ready" },
  { v: "light",    l: "Light updates needed" },
  { v: "major",    l: "Major repairs" },
  { v: "tear",     l: "Tear-down / land value" },
];
const TIMELINES = [
  { v: "asap",   l: "ASAP (1–2 weeks)" },
  { v: "30",     l: "Within 30 days" },
  { v: "60",     l: "30–60 days" },
  { v: "flex",   l: "I'm flexible" },
];
const REASONS = [
  "Relocating", "Inherited", "Behind on payments", "Tired landlord",
  "Divorce", "Downsizing", "Foreclosure", "Just exploring",
];

function SellerForm({ accent }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    address: "",
    city: "",
    propType: "Single family",
    beds: "3",
    baths: "2",
    sqft: "",
    condition: "",
    timeline: "",
    reasons: [],
    name: "",
    phone: "",
    email: "",
  });
  const [errs, setErrs] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const addressRef = useRef(null);

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggle = (k, v) => setData(d => ({
    ...d,
    [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v]
  }));

  const filteredSuggestions = data.address.length >= 2
    ? ADDRESS_SUGGESTIONS.filter(s => s.line.toLowerCase().includes(data.address.toLowerCase()))
    : [];

  function validate(s) {
    const e = {};
    if (s === 1) {
      if (!data.address.trim()) e.address = "We need your address to start.";
    }
    if (s === 2) {
      if (!data.condition) e.condition = "Pick a condition so we can dial in your offer.";
      if (!data.timeline)  e.timeline  = "When are you hoping to close?";
    }
    if (s === 3) {
      if (!data.name.trim())  e.name  = "Your name?";
      if (!/^[\d\s\-\(\)\+]{10,}$/.test(data.phone)) e.phone = "We need a number we can reach you at.";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  async function next() {
    if (!validate(step)) return;
    if (step < TOTAL_STEPS) { setStep(s => s + 1); return; }

    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          property_type: data.propType,
          bedrooms: data.beds,
          bathrooms: data.baths,
          sqft: data.sqft || "Not provided",
          condition: data.condition,
          timeline: data.timeline,
          reasons: data.reasons.join(", ") || "Not specified",
          _subject: `New cash offer request — ${data.address || "property"}`,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setDone(true);
      } else {
        setSubmitError(json?.errors?.[0]?.message || "Something went wrong. Please try again.");
      }
    } catch (e) {
      setSubmitError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }
  function back() {
    if (step > 1) setStep(s => s - 1);
  }

  if (done) {
    return (
      <div className="form-card-wrap" id="get-offer">
        <div className="form-card">
          <div className="success">
            <div className="check"><Icon.Check size={32} stroke={2.4} /></div>
            <h3>Offer in motion.</h3>
            <p>Thanks {data.name.split(" ")[0] || "friend"} — we received the details on <strong>{data.address || "your property"}</strong>. A senior acquisitions specialist will text you within <strong>2 business hours</strong>.</p>
            <div className="success-meta">
              <div>
                <div className="k">Reference</div>
                <div className="v">#ATB-{Math.floor(Math.random() * 9000 + 1000)}</div>
              </div>
              <div>
                <div className="k">Offer ETA</div>
                <div className="v">~24h</div>
              </div>
              <div>
                <div className="k">Status</div>
                <div className="v" style={{color: "var(--accent)"}}>Active</div>
              </div>
            </div>
            <button
              className="btn btn-ghost"
              style={{ marginTop: 20 }}
              onClick={() => { setDone(false); setStep(1); setData({...data, address: "", city: ""}); }}
            >
              Submit another property →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card-wrap" id="get-offer">
      <div className="form-card">
        <div className="form-head">
          <div>
            <h3>Get your cash offer.</h3>
            <p>Free. No obligation. Takes about 60 seconds.</p>
          </div>
          <div className="step-badge">
            <span className="now">Step {step}</span>
            <br/>of {TOTAL_STEPS}
          </div>
        </div>

        <div className="progress">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`seg ${i < step ? "done" : i === step ? "active" : ""}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div>
            <div className="field" style={{ position: "relative" }} ref={addressRef}>
              <label>Property address <span className="req">*</span></label>
              <div className="input-icon">
                <Icon.Pin />
                <input
                  className="input"
                  type="text"
                  placeholder="Start typing your street address…"
                  value={data.address}
                  onChange={e => { update("address", e.target.value); setShowSuggest(true); }}
                  onFocus={() => setShowSuggest(true)}
                  onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                  autoFocus={false}
                />
              </div>
              {showSuggest && filteredSuggestions.length > 0 && (
                <div className="suggest">
                  {filteredSuggestions.map((s, i) => (
                    <div
                      key={i}
                      className="s-item"
                      onMouseDown={() => {
                        update("address", s.line);
                        update("city", s.city);
                        setShowSuggest(false);
                      }}
                    >
                      <span className="s-pin"><Icon.Pin size={14} /></span>
                      <span>
                        {s.line}
                        <span className="s-city">{s.city}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {errs.address && <div className="err">{errs.address}</div>}
            </div>

            <div className="field">
              <label>Property type</label>
              <div className="chip-row">
                {["Single family", "Townhouse", "Condo", "Multi-family", "Land"].map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`chip ${data.propType === t ? "on" : ""}`}
                    onClick={() => update("propType", t)}
                  >{t}</button>
                ))}
              </div>
            </div>

            <div className="field row2">
              <div>
                <label>Bedrooms</label>
                <select className="select" value={data.beds} onChange={e => update("beds", e.target.value)}>
                  <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                </select>
              </div>
              <div>
                <label>Bathrooms</label>
                <select className="select" value={data.baths} onChange={e => update("baths", e.target.value)}>
                  <option>1</option><option>1.5</option><option>2</option><option>2.5</option><option>3+</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-ghost" disabled style={{visibility: "hidden"}}>Back</button>
              <button className="btn btn-primary" onClick={next}>
                Continue <Icon.ArrowRight />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="field">
              <label>Condition <span className="req">*</span></label>
              <div className="chip-row">
                {CONDITIONS.map(c => (
                  <button
                    key={c.v}
                    type="button"
                    className={`chip ${data.condition === c.v ? "on" : ""}`}
                    onClick={() => update("condition", c.v)}
                  >{c.l}</button>
                ))}
              </div>
              {errs.condition && <div className="err">{errs.condition}</div>}
            </div>

            <div className="field">
              <label>Timeline to sell <span className="req">*</span></label>
              <div className="chip-row">
                {TIMELINES.map(t => (
                  <button
                    key={t.v}
                    type="button"
                    className={`chip ${data.timeline === t.v ? "on" : ""}`}
                    onClick={() => update("timeline", t.v)}
                  >{t.l}</button>
                ))}
              </div>
              {errs.timeline && <div className="err">{errs.timeline}</div>}
            </div>

            <div className="field">
              <label>Why are you selling? <span style={{color: "var(--ink-3)", fontWeight: 400}}>(optional — helps us help you)</span></label>
              <div className="chip-row">
                {REASONS.map(r => (
                  <button
                    key={r}
                    type="button"
                    className={`chip ${data.reasons.includes(r) ? "on" : ""}`}
                    onClick={() => toggle("reasons", r)}
                  >{r}</button>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-ghost" onClick={back}>
                <Icon.ArrowLeft /> Back
              </button>
              <button className="btn btn-primary" onClick={next}>
                Continue <Icon.ArrowRight />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="field">
              <label>Your name <span className="req">*</span></label>
              <input
                className="input"
                type="text"
                placeholder="First &amp; last name"
                value={data.name}
                onChange={e => update("name", e.target.value)}
              />
              {errs.name && <div className="err">{errs.name}</div>}
            </div>

            <div className="field">
              <label>Phone <span className="req">*</span></label>
              <div className="input-icon">
                <Icon.Phone />
                <input
                  className="input"
                  type="tel"
                  placeholder="(404) 555-0188"
                  value={data.phone}
                  onChange={e => update("phone", e.target.value)}
                />
              </div>
              {errs.phone && <div className="err">{errs.phone}</div>}
            </div>

            <div className="field">
              <label>Email <span style={{color: "var(--ink-3)", fontWeight: 400}}>(optional)</span></label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={e => update("email", e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-ghost" onClick={back} disabled={submitting}>
                <Icon.ArrowLeft /> Back
              </button>
              <button className="btn btn-primary" onClick={next} disabled={submitting}>
                {submitting ? "Sending…" : <span>Get my cash offer <Icon.ArrowRight /></span>}
              </button>
            </div>

            {submitError && (
              <div className="err" style={{marginTop: 10, fontSize: 13.5}}>
                {submitError}
              </div>
            )}

            <div className="micro">
              <Icon.Lock />
              <span>By submitting, you agree to be contacted about your property. We never sell your data. No spam, ever.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.SellerForm = SellerForm;
