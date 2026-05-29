import React, { useEffect, useState } from 'react';
import { ArrowRight, Boxes, Calculator, CheckCircle2, DatabaseZap, Menu, PieChart, Sparkles, X, Zap } from 'lucide-react';
import logo from './assets/logo-from-video.png';

const modules = [
  ['Quote engine', 'Generate prices from material, labor, finishing, waste, tax, and margin.', Calculator],
  ['Filament stock', 'Track colors, rolls, value, low-stock alerts, and material usage.', Boxes],
  ['Order data', 'Keep quote status, customer notes, due dates, and payments clean.', DatabaseZap],
  ['Profit view', 'Understand cost, revenue, quote speed, and material movement.', PieChart]
];

export default function MobileApp() {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!ready && <MobileLoader />}
      <main className={ready ? 'ready' : 'loading'}>
        <header className="mobile-nav">
          <a href="#top" className="brand"><img src={logo} alt="" /><span>3D-Pi</span></a>
          <button onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X size={20} /> : <Menu size={20} />}</button>
          {menu && <nav><a href="#platform">Platform</a><a href="#flow">Flow</a><a href="#demo">Demo</a></nav>}
        </header>
        <Hero />
        <Stats />
        <Platform />
        <Flow />
        <MobileDashboard />
        <CTA />
      </main>
    </>
  );
}

function MobileLoader() {
  return (
    <div className="mobile-loader">
      <span className="wave wave-a" />
      <span className="wave wave-b" />
      <img src={logo} alt="" />
      <p>Warming up quotes</p>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="mobile-hero">
      <p className="eyebrow"><Sparkles size={14} /> pricing · data · filament</p>
      <h1>Quote faster. Track stock. Protect profit.</h1>
      <p className="lede">A mobile-first command layer for 3D print businesses that need clean pricing, order data, and filament inventory without spreadsheet chaos.</p>
      <div className="actions"><a href="#demo">Request demo <ArrowRight size={16} /></a><a href="#platform">Explore</a></div>
      <HeroSculpture />
    </section>
  );
}

function HeroSculpture() {
  return (
    <div className="hero-sculpture" aria-hidden="true">
      <div className="core"><img src={logo} alt="" /></div>
      <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
      <b className="chip c1">$142 quote</b>
      <b className="chip c2">7.4kg PLA</b>
      <b className="chip c3">+44% margin</b>
      <i className="cube cube-a" /><i className="cube cube-b" /><i className="cube cube-c" />
    </div>
  );
}

function Stats() {
  return <section className="stats"><div><b>4.7x</b><span>faster quotes</span></div><div><b>99.9%</b><span>formula consistency</span></div><div><b>18h</b><span>saved weekly</span></div></section>;
}

function Platform() {
  return (
    <section id="platform" className="section platform">
      <p className="kicker">Platform</p>
      <h2>Everything important, designed for your thumb.</h2>
      <div className="module-list">
        {modules.map(([title, text, Icon]) => <article key={title}><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section id="flow" className="section flow">
      <p className="kicker">Workflow</p>
      <h2>Capture → calculate → control.</h2>
      {['Enter request data and material details.', 'Calculate price with margin rules.', 'Track filament usage and order status.'].map((x, i) => <div className="step" key={x}><b>0{i + 1}</b><span>{x}</span></div>)}
    </section>
  );
}

function MobileDashboard() {
  return (
    <section className="section mobile-dashboard">
      <p className="kicker">Live preview</p>
      <h2>Your quote cockpit, cleaned up for mobile.</h2>
      <div className="phone-card">
        <div className="phone-head"><span>Margin</span><b>41.6%</b></div>
        <div className="bars">{[55, 80, 38, 68, 92].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        <div className="rows"><span>PLA Matte Black</span><b>7.4kg</b><span>PETG Clear</span><b>3.2kg</b><span>Quote Q-2042</span><b>$142</b></div>
      </div>
    </section>
  );
}

function CTA() {
  return <section id="demo" className="cta"><img src={logo} alt="" /><h2>Make every quote feel engineered.</h2><p>Pricing clarity, filament control, and business data in a mobile experience that feels alive.</p><a href="mailto:sales@3d-pi.example">Request demo <ArrowRight size={16} /></a></section>;
}
