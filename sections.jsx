// Marketing sections for the landing page.
const { useState: useNavState, useEffect: useNavEffect } = React;

function Nav({ phone = "(404) 555-0188" }) {
  const [menuOpen, setMenuOpen] = useNavState(false);

  useNavEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <div className="brand-mark"><img src="assets/logo.png" alt="A Touch of Blessings" /></div>
          <div>
            <div className="brand-name">A Touch of <em>Blessings</em></div>
            <div className="brand-sub">Home Buyers · Nationwide</div>
          </div>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#why">Why us</a>
          <a href="#situations">Situations</a>
          <a href="#stories">Stories</a>
          <a href="#faq">FAQ</a>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <a href="#get-offer" className="nav-cta">
            <span className="dot"></span>
            Get my offer
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <Icon.X size={20} stroke={2.2} /> : <Icon.Menu size={20} stroke={2} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#how" onClick={closeMenu}>How it works</a>
          <a href="#why" onClick={closeMenu}>Why us</a>
          <a href="#situations" onClick={closeMenu}>Situations</a>
          <a href="#stories" onClick={closeMenu}>Stories</a>
          <a href="#faq" onClick={closeMenu}>FAQ</a>
          <a href="#get-offer" className="mobile-menu-cta" onClick={closeMenu}>Get my cash offer →</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <header id="hero" className="hero hero-solo">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="pulse"></span>
            Actively buying houses nationwide
          </span>
          <h1 className="h1">
            Sell your house <em>as-is.</em><br/>
            <span className="strike">No agents.</span> No repairs.<br/>
            Just a fair cash offer.
          </h1>
          <p className="lede">
            We're a family-run home buyer working coast to coast across the United States.
            Tell us about your house and we'll send a fair, all-cash offer in 24 hours —
            close on your timeline, on your terms.
          </p>

          <div className="trust-row">
            <div className="trust-item">
              <span style={{color: "var(--accent)"}}><Icon.Check size={18} stroke={2.4} /></span>
              No fees, no commissions
            </div>
            <div className="trust-item">
              <span style={{color: "var(--accent)"}}><Icon.Check size={18} stroke={2.4} /></span>
              Close in as little as 7 days
            </div>
            <div className="trust-item">
              <span style={{color: "var(--accent)"}}><Icon.Check size={18} stroke={2.4} /></span>
              We pay closing costs
            </div>
          </div>

          <div className="stat-row">
            <div className="stat">
              <div className="num">487<em>+</em></div>
              <div className="lbl">Homes purchased</div>
            </div>
            <div className="stat">
              <div className="num">7<em>d</em></div>
              <div className="lbl">Average close</div>
            </div>
            <div className="stat">
              <div className="num">4.9<em>★</em></div>
              <div className="lbl">Seller rating</div>
            </div>
          </div>

          <a href="#form-section" className="hero-scroll-cta">
            <span>Get your cash offer</span>
            <span className="arrow">↓</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function FormSection() {
  return (
    <section className="form-section" id="form-section">
      <div className="container form-section-grid">
        <div className="form-section-aside">
          <div className="num">Get started</div>
          <h2 className="form-section-h">
            Tell us about<br/>your house —<br/><em>we'll do the rest.</em>
          </h2>
          <p className="form-section-note">
            Free, no-obligation cash offer in 24 hours. Takes about 60 seconds to fill out.
            A senior acquisitions specialist will follow up by phone or text.
          </p>
          <ul className="form-section-list">
            <li><span className="bullet"><Icon.Check size={14} stroke={2.8} /></span><span className="txt">No fees, no commissions</span></li>
            <li><span className="bullet"><Icon.Check size={14} stroke={2.8} /></span><span className="txt">Any condition, any situation</span></li>
            <li><span className="bullet"><Icon.Check size={14} stroke={2.8} /></span><span className="txt">Close in as little as 7 days</span></li>
            <li><span className="bullet"><Icon.Check size={14} stroke={2.8} /></span><span className="txt">We never sell your data</span></li>
          </ul>
        </div>
        <div className="form-section-card">
          <SellerForm />
        </div>
      </div>
    </section>
  );
}

function Strip() {
  return (
    <div className="strip">
      <div className="container strip-inner">
        <div className="strip-label">As seen / accredited</div>
        <div className="strip-logos">
          <div className="strip-logo"><em>USA</em> Today</div>
          <div className="strip-logo alt">BBB · A+</div>
          <div className="strip-logo">Forbes</div>
          <div className="strip-logo alt">National REIA</div>
          <div className="strip-logo"><em>Black</em>Enterprise</div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Icon.Doc />, n: "Step 01",
      title: "Tell us about your house",
      body: "Fill out the form (60 seconds) or call us. Address, condition, timeline — that's all we need to start.",
      meta: "≈ 60 SEC"
    },
    {
      icon: <Icon.Cash />, n: "Step 02",
      title: "Get a real cash offer",
      body: "We pull comps, do a quick walk-through (in person or virtual), and send a written, no-obligation offer within 24 hours.",
      meta: "≈ 24 HRS"
    },
    {
      icon: <Icon.Key />, n: "Step 03",
      title: "Pick your close date",
      body: "Close in 7 days, or 70. We work around you — leave behind anything you don't want, we'll handle it. Get paid at the title company.",
      meta: "ON YOUR TIMELINE"
    },
  ];

  return (
    <section id="how">
      <div className="container">
        <div className="section-head">
          <div className="num">01 / How it works</div>
          <h2>From form to <em>funded</em><br/>in three steps.</h2>
          <div className="note">No showings, no open houses, no strangers walking through your home on Saturday mornings.</div>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-icon">{s.icon}</div>
              <div className="step-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="meta">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const usList = [
    { k: "Sell in 7–30 days", v: "We close on your schedule, not the bank's." },
    { k: "Zero fees or commissions", v: "What we offer is what you get at closing." },
    { k: "Sell as-is — really", v: "Leave behind furniture, junk, repairs. We handle it all." },
    { k: "No showings or open houses", v: "One walk-through. That's it." },
    { k: "We pay closing costs", v: "All standard closing costs covered." },
  ];
  const themList = [
    { k: "60–90+ days on market", v: "Average days-on-market in metro ATL." },
    { k: "6% commission + fees", v: "Plus marketing, photography, staging." },
    { k: "Repairs required to list", v: "Lender requirements, buyer requests, inspections." },
    { k: "10–20+ showings", v: "Open houses, foot traffic, schedule juggling." },
    { k: "Buyer financing can fall through", v: "Roughly 1 in 7 deals collapses at the last minute." },
  ];
  return (
    <section id="why" style={{paddingTop: 40}}>
      <div className="container">
        <div className="section-head">
          <div className="num">02 / Why us</div>
          <h2>The agent route<br/>vs. <em>the easy way</em>.</h2>
          <div className="note">A direct sale isn't right for everyone. For a lot of folks, it's exactly what they need.</div>
        </div>

        <div className="compare">
          <div className="compare-col us">
            <h3 className="compare-h">A Touch of Blessings</h3>
            <div className="compare-sub">Direct cash sale</div>
            <ul className="compare-list">
              {usList.map((x, i) => (
                <li key={i}>
                  <span className="ic yes"><Icon.Check size={12} stroke={2.6} /></span>
                  <div>
                    <strong className="k">{x.k}</strong>
                    <span className="v">{x.v}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="compare-col them">
            <h3 className="compare-h">Traditional listing</h3>
            <div className="compare-sub">Realtor + MLS</div>
            <ul className="compare-list">
              {themList.map((x, i) => (
                <li key={i}>
                  <span className="ic no"><Icon.X size={12} stroke={2.4} /></span>
                  <div>
                    <strong className="k">{x.k}</strong>
                    <span className="v">{x.v}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Situations() {
  const items = [
    { icon: <Icon.House />, h: "Inherited a house", p: "Probate, multiple heirs, out-of-state — we've handled all of it." },
    { icon: <Icon.Hammer />, h: "Major repairs needed", p: "Foundation, roof, mold, fire — we buy in any condition." },
    { icon: <Icon.Clock />, h: "Behind on payments", p: "We can often close before foreclosure hits your credit." },
    { icon: <Icon.Hand />, h: "Tired landlord", p: "Bad tenants, vacancies, deferred maintenance — done." },
    { icon: <Icon.Heart />, h: "Divorce or relocation", p: "Move quickly, split cleanly, keep it private." },
    { icon: <Icon.Key />, h: "Downsizing", p: "Sell the family home with dignity, on your terms." },
    { icon: <Icon.Doc />, h: "Liens or title issues", p: "We work with title attorneys to clean it up at closing." },
    { icon: <Icon.Sparkle />, h: "Just curious", p: "Want to know what your house is worth? We'll tell you, honestly." },
  ];
  return (
    <section id="situations" style={{background: "var(--bg-2)"}}>
      <div className="container">
        <div className="section-head">
          <div className="num">03 / Situations</div>
          <h2>We've seen<br/><em>your situation</em>.</h2>
          <div className="note">Every house has a story. We buy through every one of them — fast, fair, and with respect.</div>
        </div>

        <div className="situations">
          {items.map((s, i) => (
            <div className="sit" key={i}>
              <div className="ic">{s.icon}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section id="stories">
      <div className="container">
        <div className="section-head">
          <div className="num">04 / Seller stories</div>
          <h2>People we've<br/><em>actually</em> helped.</h2>
          <div className="note">Real homeowners, real timelines, real outcomes. Every name and detail used with permission.</div>
        </div>

        <div className="testimonials">
          <div className="quote">
            <div className="mark">"</div>
            <blockquote>
              They closed in <em>nine days</em>. I'd been on the market with an agent for four months and had two deals fall through.
              The team at Blessing didn't ask me to fix a thing — they just kept their word.
            </blockquote>
            <div className="who">
              <div className="av">M</div>
              <div>
                <div className="who-name">Marcus T.</div>
                <div className="who-meta">Houston, TX · Inherited property · Closed Mar 2026</div>
              </div>
            </div>
          </div>

          <div className="mini-quotes">
            <div className="mini-quote">
              <div className="stars">★★★★★</div>
              <p>"My mother's house had been empty for two years. They handled the cleanout, the title — everything. Closed in twelve days."</p>
              <div className="src"><span>Denise R.</span><span>Phoenix, AZ</span></div>
            </div>
            <div className="mini-quote">
              <div className="stars">★★★★★</div>
              <p>"Got three lowball cash offers before I called Blessings. Theirs came in higher and they actually closed when they said they would."</p>
              <div className="src"><span>James &amp; Patricia W.</span><span>Charlotte, NC</span></div>
            </div>
            <div className="mini-quote">
              <div className="stars">★★★★★</div>
              <p>"They sat with me at the kitchen table and walked through every line. No pressure. No nonsense. A real blessing."</p>
              <div className="src"><span>Yolanda B.</span><span>Tampa, FL</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ({ phone = "(404) 555-0188" }) {
  const faqs = [
    {
      q: "How is your offer calculated?",
      a: "We pull comparable sales in your neighborhood from the last 90 days, factor in condition and any needed repairs, and back out a small margin so we can resell or rent. You see the math — we'll walk you through it line by line."
    },
    {
      q: "Are there any fees or commissions?",
      a: "None. Zero. We pay all standard closing costs. The offer number you accept is the number that hits your account at closing."
    },
    {
      q: "Do I need to clean or fix anything?",
      a: "No. Truly. Leave behind furniture, appliances, junk, the half-finished bathroom remodel — anything. We'll handle it. Sell as-is means as-is."
    },
    {
      q: "How fast can you close?",
      a: "As quickly as 7 days if you need it. We've closed in 5 in special cases. Or take 60 days if you need time to plan your next move — your timeline, not ours."
    },
    {
      q: "What if my house is in foreclosure?",
      a: "Call us today. In most cases we can close before the foreclosure auction date and protect your credit. Time matters — the sooner you reach out, the more options you have."
    },
    {
      q: "Why should I trust 'A Touch of Blessings' over the big national 'we buy houses' brands?",
      a: "We're a family-run team that operates nationwide — but every offer is made by a real person who's pulled the comps on your block, not a call center routing leads to whoever bids highest. We close every deal with a licensed title company or attorney in your state."
    },
  ];
  return (
    <section id="faq">
      <div className="container" style={{maxWidth: 980}}>
        <div className="section-head">
          <div className="num">05 / Questions</div>
          <h2>Things sellers<br/><em>always</em> ask.</h2>
          <div className="note">Don't see your question? Call us at {phone} — a human picks up.</div>
        </div>

        <div className="faqs">
          {faqs.map((f, i) => (
            <details className="faq" key={i} {...(i === 0 ? {open: true} : {})}>
              <summary>
                <span>{f.q}</span>
                <span className="plus"><Icon.Plus /></span>
              </summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ phone = "(404) 555-0188" }) {
  return (
    <section>
      <div className="container">
        <div className="final">
          <div className="final-grid">
            <div>
              <h2>Ready to find out<br/>what we'd pay for<br/><em>your house?</em></h2>
              <p>It takes 60 seconds. There's no obligation, no credit check, and you won't end up on a call list. We just want to make you a real, fair offer.</p>
              <div className="final-actions">
                <a href="#get-offer" className="btn btn-light">
                  Get my cash offer <Icon.ArrowRight />
                </a>
                <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="btn btn-outline">
                  <Icon.Phone /> {phone}
                </a>
              </div>
            </div>
            <div className="final-aside">
              <div className="label">This month — June 2026</div>
              <div className="big">48 homes</div>
              <div className="sub">closed across the U.S. with an average time-from-offer-to-funded of 11 days.</div>
              <div className="row"><span className="k">Avg offer turnaround</span><span>18h</span></div>
              <div className="row"><span className="k">Fastest close</span><span>5 days</span></div>
              <div className="row"><span className="k">Seller satisfaction</span><span>4.9 / 5</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ phone = "(404) 555-0188" }) {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="brand" style={{marginBottom: 14}}>
              <div className="brand-mark"><img src="assets/logo.png" alt="A Touch of Blessings" /></div>
              <div>
                <div className="brand-name">A Touch of <em>Blessings</em> Home Buyers</div>
                <div className="brand-sub">Buying homes nationwide</div>
              </div>
            </div>
            <p style={{maxWidth: 360, color: "var(--ink-3)", fontSize: 13.5, lineHeight: 1.55}}>
              A family-run home-buying team buying houses all across the United States since 2017.
              We buy in any condition, in any situation, with care and respect.
            </p>
          </div>
          <div className="foot-col">
            <h5>Sell</h5>
            <a href="#get-offer">Get a cash offer</a>
            <a href="#how">How it works</a>
            <a href="#situations">Situations we buy</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="#">About the family</a>
            <a href="#">Areas we serve</a>
            <a href="#stories">Seller stories</a>
            <a href="#">Press &amp; media</a>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <a href={`tel:${phone.replace(/[^\d]/g, "")}`}>{phone}</a>
            <a href="mailto:hello@atouchofblessing.com">hello@atouchofblessing.com</a>
            <a href="#">Mon–Sat · 8a – 8p ET</a>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 A Touch of Blessings Home Buyers, LLC. Operating nationwide.</div>
          <div>Privacy · Terms · Accessibility</div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#get-offer" className={`sticky-cta ${show ? "show" : ""}`}>
      <span><span className="pill">24h offer</span> &nbsp; Sell your house →</span>
    </a>
  );
}

Object.assign(window, { Nav, Hero, FormSection, Strip, HowItWorks, WhyUs, Situations, Stories, FAQ, FinalCTA, Footer, StickyCTA });
