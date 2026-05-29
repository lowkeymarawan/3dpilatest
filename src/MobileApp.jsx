import React, { useEffect, useState } from 'react';
import { ArrowRight, Boxes, Calculator, CheckCircle2, DatabaseZap, Menu, PieChart, Sparkles, X, Zap } from 'lucide-react';
import logo from './assets/logo-from-video.png';

const modules = [
  ['Price every job', 'Material, labor, finishing, waste, tax, and margin in one quote formula.', Calculator],
  ['Know your stock', 'Track filament rolls, colors, remaining quantity, value, and low-stock alerts.', Boxes],
  ['Organize order data', 'Keep customers, quote status, due dates, notes, delivery, and payment clean.', DatabaseZap],
  ['See real profit', 'Understand which jobs, materials, and quote rules actually make money.', PieChart]
];

export default function MobileApp() {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!ready && <MobileLoader />}
      <main className={ready ? 'ready' : 'loading'}>
        <header className="mobile-nav">
          <a href="#top" className="brand"><img src={logo} alt="" /><span>3D-Pi</span></a>
          <button onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X size={20} /> : <Menu size={20} />}</button>
          {menu && <nav><a href="#platform">What it does</a><a href="#flow">How it works</a><a href="#demo">Demo</a></nav>}
        </header>
        <Hero />
        <ProofStrip />
        <Problem />
        <Platform />
        <Flow />
        <MobileDashboard />
        <CTA />
        <a className="sticky-demo" href="mailto:sales@3d-pi.example">Request demo <ArrowRight size={15} /></a>
      </main>
    </>
  );
}

function MobileLoader() {
  return <div className="mobile-loader"><span className="wave wave-a" /><span className="wave wave-b" /><img src={logo} alt="" /><p>Preparing 3D-Pi</p></div>;
}

function Hero() {
  return (
    <section id="top" className="mobile-hero">
      <p className="eyebrow"><Sparkles size={14} /> pricing · stock · profit</p>
      <h1>Quote 3D print jobs without spreadsheet chaos.</h1>
      <p className="lede">3D-Pi helps print shops price faster, track filament, organize order data, and protect profit from one clean mobile dashboard.</p>
      <div className="actions"><a href="#demo">See it in action <ArrowRight size={16} /></a><a href="#platform">What it does</a></div>
      <HeroSculpture />
    </section>
  );
}

function HeroSculpture() {
  return (
    <div className="hero-sculpture" aria-hidden="true">
      <div className="glow-pad" />
      <div className="core"><img src={logo} alt="" /></div>
      <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
      <b className="chip c1">$142 quote</b><b className="chip c2">7.4kg PLA</b><b className="chip c3">+44% margin</b>
      <i className="cube cube-a" /><i className="cube cube-b" /><i className="cube cube-c" />
    </div>
  );
}

function ProofStrip() {
  return (
    <section className="proof-strip">
      <div><b>4.7x</b><span>faster quoting</span></div>
      <div><b>99.9%</b><span>consistent formulas</span></div>
      <div><b>18h</b><span>saved weekly</span></div>
    </section>
  );
}

function Problem() {
  return (
    <section className="problem-card">
      <p className="kicker">The pain</p>
      <h2>Quotes leak profit when data lives everywhere.</h2>
      <ul>
        <li><CheckCircle2 size={17} /> No more rebuilding quote math by hand.</li>
        <li><CheckCircle2 size={17} /> No more guessing filament cost or stock.</li>
        <li><CheckCircle2 size={17} /> No more losing order context in chats.</li>
      </ul>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="section platform">
      <p className="kicker">What 3D-Pi does</p>
      <h2>One mobile command layer for the money side of printing.</h2>
      <div className="module-list">
        {modules.map(([title, text, Icon]) => <article key={title}><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function Flow() {
  return (
    <section id="flow" className="section flow">
      <p className="kicker">How it works</p>
      <h2>Capture. Calculate. Control.</h2>
      {['Enter request, material, quantity, finishing, and due date.', 'Generate a consistent quote using your pricing rules.', 'Track filament usage, order status, and margin reports.'].map((x, i) => <div className="step" key={x}><b>0{i + 1}</b><span>{x}</span></div>)}
    </section>
  );
}

function MobileDashboard() {
  return (
    <section className="section mobile-dashboard">
      <p className="kicker">Live preview</p>
      <h2>The dashboard your thumb can actually use.</h2>
      <div className="phone-card">
        <div className="phone-head"><span>Suggested price</span><b>$142</b></div>
        <div className="mini-metrics"><div><span>Margin</span><b>44%</b></div><div><span>PLA left</span><b>7.4kg</b></div></div>
        <div className="bars">{[55, 80, 38, 68, 92].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        <div className="rows"><span>Material cost</span><b>$18</b><span>Labor + finishing</span><b>$32</b><span>Target profit</span><b>$55</b></div>
      </div>
    </section>
  );
}

function CTA() {
  return <section id="demo" className="cta"><img src={logo} alt="" /><h2>Make every quote feel engineered.</h2><p>Turn pricing, filament inventory, and order data into a mobile experience your customers and team can trust.</p><a href="mailto:sales@3d-pi.example">Request demo <ArrowRight size={16} /></a></section>;
}
