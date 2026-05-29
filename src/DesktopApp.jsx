import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DatabaseZap,
  FileText,
  Layers3,
  PackageCheck,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import * as THREE from 'three';
import logoFromVideo from './assets/logo-from-video.png';

const nav = [
  ['Overview', '#top'],
  ['Platform', '#platform'],
  ['Workflow', '#workflow'],
  ['Dashboard', '#dashboard']
];

const metrics = [
  ['4.7x', 'faster quote creation'],
  ['99.9%', 'formula consistency'],
  ['18h', 'admin time saved weekly'],
  ['12+', 'material categories']
];

const modules = [
  {
    icon: Calculator,
    title: 'Quote Engine',
    text: 'Build customer-ready pricing from material cost, labor, finishing, waste percentage, taxes, and target margin.'
  },
  {
    icon: Boxes,
    title: 'Filament Intelligence',
    text: 'Track rolls, colors, material value, low-stock alerts, reorder thresholds, and usage history without spreadsheet chaos.'
  },
  {
    icon: DatabaseZap,
    title: 'Order Data Layer',
    text: 'Keep requests, quotes, status, customer notes, due dates, delivery details, and payments connected in one source of truth.'
  },
  {
    icon: BarChart3,
    title: 'Margin Command',
    text: 'See revenue, costs, profit, quote volume, material usage, and bottlenecks in dashboards designed for fast decisions.'
  }
];

const dashboardPages = [
  {
    label: 'Overview',
    title: 'Pricing command center',
    cards: [['Margin', '41.6%'], ['Quotes', '14'], ['Stock health', '78%']],
    rows: [['PLA Matte Black', '7.4kg', '$18/kg'], ['PETG Clear', '3.2kg', '$24/kg'], ['Resin Grey', '5.1L', '$38/L']]
  },
  {
    label: 'Pricing',
    title: 'Formula builder',
    cards: [['Material', '$18'], ['Labor', '$32'], ['Profit', '$55']],
    rows: [['Q-2041', 'PLA Black', '$89'], ['Q-2042', 'PETG Clear', '$142'], ['Q-2043', 'Resin Grey', '$216']]
  },
  {
    label: 'Inventory',
    title: 'Filament control',
    cards: [['Active rolls', '86'], ['Low alerts', '07'], ['Value', '$4.8k']],
    rows: [['PLA', '32 rolls', '80%'], ['PETG', '18 rolls', '58%'], ['ABS', '11 rolls', '42%']]
  },
  {
    label: 'Reports',
    title: 'Profit reports',
    cards: [['Revenue', '$18.4k'], ['Profit', '$7.6k'], ['Growth', '+22%']],
    rows: [['Margin report', 'May', '+8%'], ['Material usage', '38kg', '+12%'], ['Quote speed', '11m', '4.7x']]
  }
];

export default function DesktopApp() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introFlying, setIntroFlying] = useState(false);

  return (
    <>
      {introVisible && (
        <LogoLoader
          flying={introFlying}
          onFly={() => setIntroFlying(true)}
          onComplete={() => setIntroVisible(false)}
        />
      )}
      <main className={introVisible ? 'site-under-loader' : ''}>
        <Header />
        <Hero />
        <MetricRibbon />
        <Platform />
        <Workflow />
        <DataSculpture />
        <CommandCenter />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

function LogoLoader({ flying, onFly, onComplete }) {
  const logoRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('loader-lock');
    document.body.classList.add('loader-lock');
    const flyTimer = window.setTimeout(onFly, 1150);
    const doneTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('loader-lock');
      document.body.classList.remove('loader-lock');
      onComplete();
    }, 2250);
    return () => {
      window.clearTimeout(flyTimer);
      window.clearTimeout(doneTimer);
      document.documentElement.classList.remove('loader-lock');
      document.body.classList.remove('loader-lock');
    };
  }, [onFly, onComplete]);

  useEffect(() => {
    if (!flying) return undefined;
    const logo = logoRef.current;
    if (!logo) return undefined;

    let frameId;
    const start = performance.now();
    const duration = 820;
    const startSize = Math.min(Math.max(window.innerWidth * 0.22, 145), 265);
    const navLogo = document.querySelector('.nav-shell .brand img');
    const target = navLogo?.getBoundingClientRect();
    const startX = window.innerWidth / 2 - startSize / 2;
    const startY = window.innerHeight / 2 - startSize * 1.15 / 2;
    const targetX = target?.left ?? 32;
    const targetY = target?.top ?? 20;
    const targetW = target?.width ?? 46;
    const ease = (t) => 1 - Math.pow(1 - t, 3.4);
    const cubic = (a, b, c, d, t) => {
      const mt = 1 - t;
      return mt * mt * mt * a + 3 * mt * mt * t * b + 3 * mt * t * t * c + t * t * t * d;
    };

    const draw = (now) => {
      const raw = Math.min((now - start) / duration, 1);
      const t = ease(raw);
      const x = cubic(startX, startX - 24, targetX + 145, targetX, t);
      const y = cubic(startY, startY - 92, targetY + 36, targetY, t);
      const scale = 1 + (targetW / startSize - 1) * t;
      logo.style.width = `${startSize}px`;
      logo.style.height = `${startSize * 1.15}px`;
      logo.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      logo.style.filter = `drop-shadow(0 ${Math.round(26 - 18 * t)}px ${Math.round(42 - 28 * t)}px rgba(0,182,248,${0.28 - 0.12 * t}))`;
      if (raw < 1) frameId = requestAnimationFrame(draw);
    };
    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, [flying]);

  return (
    <div className={`logo-loader ${flying ? 'is-flying' : ''}`} aria-hidden="true">
      <div className="loader-ripple ripple-one" />
      <div className="loader-ripple ripple-two" />
      <div className="loader-ripple ripple-three" />
      <div className="loader-logo" ref={logoRef}>
        <img src={logoFromVideo} alt="" />
      </div>
      <p>Calibrating pricing engine</p>
    </div>
  );
}

function Header() {
  return (
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="3D-Pi home">
        <img src={logoFromVideo} alt="" />
        <span>3D-Pi</span>
      </a>
      <nav>
        {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#demo">Request demo <ArrowRight size={16} /></a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-stage">
      <div className="hero-bg-grid" />
      <div className="hero-copy">
        <p className="eyebrow"><Sparkles size={15} /> Pricing · data · filament inventory</p>
        <h1>The operating layer for profitable 3D print quoting.</h1>
        <p className="hero-lede">3D-Pi turns messy quote math, order data, and filament stock into one animated command center — built for teams that need speed, clarity, and profit control.</p>
        <div className="hero-actions">
          <a className="primary-btn" href="#dashboard">Explore the system <ArrowRight size={18} /></a>
          <a className="ghost-btn" href="#platform">See modules <ChevronRight size={18} /></a>
        </div>
        <div className="trust-row">
          <span><ShieldCheck size={16} /> Formula-safe pricing</span>
          <span><Zap size={16} /> Faster customer quotes</span>
          <span><PackageCheck size={16} /> Stock-aware margins</span>
        </div>
      </div>
      <div className="hero-visual">
        <HeroThreeScene />
        <FloatingPanel className="panel-a" label="Suggested quote" value="$142.00" trend="+44% margin" />
        <FloatingPanel className="panel-b" label="PLA black stock" value="7.4kg" trend="healthy" />
        <FloatingPanel className="panel-c" label="Quote time" value="11m" trend="4.7x faster" />
      </div>
    </section>
  );
}

function HeroThreeScene() {
  const mountRef = useRef(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7.8);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      setWebglFailed(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x00364d, 2.2));
    const key = new THREE.PointLight(0x00b6f8, 46, 16);
    key.position.set(2.5, 3, 4);
    scene.add(key);
    const rim = new THREE.PointLight(0xffffff, 18, 10);
    rim.position.set(-3, -1, 3);
    scene.add(rim);

    const cyan = new THREE.MeshPhysicalMaterial({ color: 0x00b6f8, emissive: 0x003e58, roughness: 0.18, metalness: 0.2, transmission: 0.15, thickness: 0.7 });
    const black = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.32, metalness: 0.62 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, roughness: 0.05, metalness: 0, transmission: 0.65, thickness: 0.9 });

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.055, 24, 180), cyan);
    ring.rotation.set(Math.PI / 2.1, 0.18, -0.34);
    root.add(ring);

    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.12, 0.018, 18, 160), glass);
    innerRing.rotation.copy(ring.rotation);
    root.add(innerRing);

    const logoTexture = new THREE.TextureLoader().load(logoFromVideo);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    const logo = new THREE.Mesh(
      new THREE.PlaneGeometry(1.35, 1.56),
      new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true })
    );
    logo.position.z = 0.2;
    root.add(logo);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.4, -1.15, -0.1),
      new THREE.Vector3(-1.2, 1.35, 0.5),
      new THREE.Vector3(0.7, -1.3, 0.2),
      new THREE.Vector3(2.45, 1.05, -0.15)
    ]);
    const filament = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.035, 18, false), cyan);
    root.add(filament);

    const beadGeo = new THREE.SphereGeometry(0.08, 24, 24);
    const beads = Array.from({ length: 7 }, (_, i) => {
      const bead = new THREE.Mesh(beadGeo, i % 2 ? cyan : black);
      root.add(bead);
      return bead;
    });

    const boxGeo = new THREE.BoxGeometry(0.28, 0.28, 0.28);
    const cubes = Array.from({ length: 20 }, (_, i) => {
      const cube = new THREE.Mesh(boxGeo, i % 3 === 0 ? cyan : glass);
      const a = i * 0.88;
      cube.position.set(Math.cos(a) * (2.1 + (i % 4) * 0.22), Math.sin(a * 1.31) * 1.4, -0.8 + (i % 5) * 0.34);
      cube.rotation.set(a, a * 0.7, a * 0.45);
      root.add(cube);
      return cube;
    });

    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(900);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 7;
      positions[i + 1] = (Math.random() - 0.5) * 4.8;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0x80e6ff, size: 0.018, transparent: true, opacity: 0.78 }));
    scene.add(particles);

    let frameId;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      root.rotation.y = Math.sin(t * 0.33) * 0.16;
      root.rotation.x = Math.sin(t * 0.27) * 0.08;
      root.position.y = Math.sin(t * 0.9) * 0.08;
      ring.rotation.z += 0.006;
      innerRing.rotation.z -= 0.004;
      logo.rotation.z = Math.sin(t * 0.8) * 0.035;
      filament.material.emissiveIntensity = 0.72 + Math.sin(t * 2.4) * 0.22;
      beads.forEach((bead, i) => {
        const p = curve.getPoint((t * 0.12 + i / beads.length) % 1);
        bead.position.copy(p);
        bead.scale.setScalar(0.75 + Math.sin(t * 3 + i) * 0.18);
      });
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.006 + i * 0.0002;
        cube.rotation.y += 0.008;
        cube.position.y += Math.sin(t * 1.6 + i) * 0.0018;
      });
      particles.rotation.y += 0.0009;
      particles.rotation.x = Math.sin(t * 0.2) * 0.06;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`three-stage ${webglFailed ? 'webgl-fallback' : ''}`} ref={mountRef} aria-hidden="true">
      {webglFailed && (
        <div className="fallback-orb">
          <img src={logoFromVideo} alt="" />
          <span className="orbit-ring ring-one" />
          <span className="orbit-ring ring-two" />
          <span className="orbit-ring ring-three" />
        </div>
      )}
    </div>
  );
}

function FloatingPanel({ className, label, value, trend }) {
  return (
    <div className={`floating-panel ${className}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{trend}</em>
    </div>
  );
}

function MetricRibbon() {
  return (
    <section className="metric-ribbon">
      {metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className="platform-section section-pad">
      <div className="section-kicker"><span /> Platform modules</div>
      <div className="split-heading">
        <h2>Four layers that make quote math feel effortless.</h2>
        <p>Designed around the work 3D printing teams actually do now: pricing, data hygiene, filament inventory, and margin reporting.</p>
      </div>
      <div className="module-grid">
        {modules.map(({ icon: Icon, title, text }, index) => (
          <article className="module-card" key={title} style={{ '--i': index }}>
            <div className="module-icon"><Icon size={24} /></div>
            <b>0{index + 1}</b>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  const steps = useMemo(() => [
    ['Capture', 'Customer request, material, quality, quantity, finishing, due date, and notes enter one clean data layer.'],
    ['Calculate', '3D-Pi applies material cost, labor, waste, tax, and target margin to generate consistent quotes.'],
    ['Control', 'Track order data, stock movement, profitability, and reports without losing context between tools.']
  ], []);

  return (
    <section id="workflow" className="workflow-section section-pad">
      <div className="orbital-line" />
      <div className="section-kicker"><span /> Workflow</div>
      <h2>From request to margin report in one cinematic flow.</h2>
      <div className="workflow-cards">
        {steps.map(([title, text], index) => (
          <article key={title}>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DataSculpture() {
  return (
    <section className="data-sculpture-section section-pad">
      <div className="data-sculpture-copy">
        <div className="section-kicker"><span /> Data sculpture</div>
        <h2>A second 3D system view for your business data.</h2>
        <p>Every quote, material change, and margin report becomes part of one living inventory intelligence layer — visual, clean, and easy to trust.</p>
      </div>
      <div className="data-sculpture-visual" aria-hidden="true">
        <div className="data-core"><img src={logoFromVideo} alt="" /></div>
        <span className="data-orbit orbit-x" />
        <span className="data-orbit orbit-y" />
        <span className="data-orbit orbit-z" />
        {['Quote', 'PLA', 'Margin', 'Stock', 'Cost', 'Report'].map((label, index) => (
          <b key={label} className={`data-node node-${index}`}>{label}</b>
        ))}
      </div>
    </section>
  );
}

function CommandCenter() {
  const [active, setActive] = useState(0);
  const page = dashboardPages[active];

  return (
    <section id="dashboard" className="command-section section-pad">
      <div className="section-kicker"><span /> Interactive preview</div>
      <h2>A living dashboard, not a static spreadsheet.</h2>
      <div className="command-shell">
        <aside>
          <div className="mini-brand"><img src={logoFromVideo} alt="" /><span>3D-Pi</span></div>
          <div className="side-nav" style={{ '--active': active }}>
            <i aria-hidden="true" />
            {dashboardPages.map((item, index) => (
              <button key={item.label} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>{item.label}</button>
            ))}
          </div>
        </aside>
        <div className="command-page" key={page.label}>
          <div className="command-head">
            <div><span>Live workspace</span><h3>{page.title}</h3></div>
            <button>Export <ArrowRight size={15} /></button>
          </div>
          <div className="command-cards">
            {page.cards.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <div className="command-graph">
            {[64, 88, 42, 74, 53, 96, 68].map((height, index) => <i key={index} style={{ height: `${height}%`, '--d': `${index * 70}ms` }} />)}
          </div>
          <div className="command-table">
            {page.rows.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="demo" className="cta-section">
      <div className="cta-core">
        <img src={logoFromVideo} alt="" />
        <h2>Make every quote feel engineered.</h2>
        <p>Pricing clarity, filament control, and business data — wrapped in a product experience that feels alive.</p>
        <a className="primary-btn light" href="mailto:sales@3d-pi.example">Request demo <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="brand"><img src={logoFromVideo} alt="" /><span>3D-Pi</span></div>
      <p>Animated product concept for quote pricing, order data, and filament inventory.</p>
    </footer>
  );
}
