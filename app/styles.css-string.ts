export const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #C9A84C;
    --gold-light: #E2C47A;
    --black: #090909;
    --dark: #101010;
    --card: #141414;
    --card2: #1a1a1a;
    --border: #222;
    --border2: #2a2a2a;
    --grey: #888;
    --white: #F4F3EF;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Barlow', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

  /* ── Utilities ── */
  .container { max-width: 1280px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }
  .gold { color: var(--gold); }
  .label {
    font-size: clamp(10px, 1.5vw, 11px);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(32px, 5vw, 60px);
    font-weight: 800;
    line-height: 1.05;
    color: var(--white);
    letter-spacing: -0.01em;
    text-transform: uppercase;
  }
  .body-text { color: var(--grey); font-size: clamp(14px, 1.6vw, 16px); line-height: 1.85; margin-bottom: 20px; }
  .section-header { margin-bottom: 56px; }
  .pill {
    border: 1px solid var(--gold);
    color: var(--gold);
    padding: 5px 16px;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    display: inline-block;
  }

  /* ── Buttons ── */
  .btn {
    display: inline-block;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 14px 32px;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn:hover::after { opacity: 1; }
  .btn--gold { background: var(--gold); color: #000; }
  .btn--gold:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn--outline { background: transparent; color: var(--white); border: 1px solid rgba(201,168,76,0.5); }
  .btn--outline:hover { border-color: var(--gold); color: var(--gold); }
  .btn--full { width: 100%; text-align: center; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    padding: 20px 0;
    transition: all 0.3s ease;
  }
  .nav--scrolled {
    background: rgba(9,9,9,0.96);
    backdrop-filter: blur(16px);
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
  }
  .nav__inner {
    max-width: 1280px; margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 48px);
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav__logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800;
    letter-spacing: 0.18em;
    color: var(--white); text-decoration: none;
  }
  .nav__logo-icon { color: var(--gold); font-size: 18px; }
  .nav__links { display: flex; align-items: center; gap: 36px; }
  .nav__link {
    color: rgba(244,243,239,0.6); text-decoration: none;
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav__link:hover { color: var(--gold); }
  .nav__cta {
    background: var(--gold); color: #000;
    padding: 10px 24px; font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 800; letter-spacing: 0.14em;
    text-decoration: none; text-transform: uppercase;
    transition: background 0.2s;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .nav__cta:hover { background: var(--gold-light); }
  .nav__burger {
    display: none; flex-direction: column; gap: 6px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .nav__burger span {
    display: block; width: 26px; height: 2px; background: var(--white);
    transition: all 0.3s;
  }
  .nav__burger--open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .nav__burger--open span:nth-child(2) { opacity: 0; }
  .nav__burger--open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  .nav__mobile {
    display: none; flex-direction: column;
    background: rgba(9,9,9,0.98); border-top: 1px solid var(--border);
    padding: 0; max-height: 0; overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s;
  }
  .nav__mobile--open { max-height: 400px; padding: 24px clamp(20px,5vw,48px); gap: 20px; }
  .nav__mobile-link {
    color: var(--white); text-decoration: none;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  }
  .nav__cta--mobile { align-self: flex-start; margin-top: 8px; }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: 100svh;
    display: flex; flex-direction: column; justify-content: center;
    overflow: hidden;
    background: var(--black);
    padding-top: 80px;
  }
  .hero__canvas {
    position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;
  }
  .hero__bg {
    position: absolute; inset: -20%; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 50%),
      linear-gradient(170deg, #0d0c08 0%, #090909 50%, #0a0a08 100%);
  }
  .hero__bg-image {
    position: absolute;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
  }
  .hero__bg-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.45) 100%), 
                repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,168,76,0.015) 3px, rgba(201,168,76,0.015) 4px);
    z-index: 2;
  }
  .hero__grid-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
    background-size: 80px 80px;
    z-index: 3;
  }
  .hero__content {
    position: relative; z-index: 10;
    padding: clamp(40px, 8vh, 100px) clamp(20px,5vw,80px);
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .hero__content--visible { opacity: 1; transform: translateY(0); }
  .hero__eyebrow {
    display: flex; align-items: center; gap: 14px;
    font-size: clamp(9px,1.2vw,11px); letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 24px;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }
  .hero__eyebrow-dot { width: 6px; height: 6px; background: var(--gold); display: inline-block; }
  .hero__title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(80px, 18vw, 220px);
    font-weight: 900;
    line-height: 0.9;
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    position: relative;
    display: block;
    text-shadow: 0 2px 8px rgba(0,0,0,0.6);
  }
  .hero__title--glitch::before {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    color: var(--gold);
    clip-path: polygon(0 30%, 100% 30%, 100% 55%, 0 55%);
    transform: translateX(-4px);
    opacity: 0.7;
    animation: glitch 0.15s steps(1) forwards;
  }
  @keyframes glitch {
    0% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(-3px); }
    25% { clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%); transform: translateX(3px); }
    50% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translateX(-2px); }
    100% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(2px); }
  }
  .hero__title-row2 {
    display: flex; align-items: center; gap: clamp(12px,2vw,32px);
    margin-top: -8px; margin-bottom: 32px;
  }
  .hero__title-outline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(40px, 8vw, 100px);
    font-weight: 900;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 2px rgba(201,168,76,0.9);
    letter-spacing: -0.01em;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));
  }
  .hero__title-amp {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(30px, 5vw, 60px);
    font-weight: 400;
    color: var(--grey);
  }
  .hero__sub {
    font-size: clamp(14px,1.8vw,18px);
    color: #F4F3EF;
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 40px;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }
  .hero__br { display: none; }
  .hero__actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .hero__stats {
    position: relative; z-index: 10;
    display: flex;
    border-top: 1px solid var(--border);
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.9s 0.4s ease, transform 0.9s 0.4s ease;
  }
  .hero__stats--visible { opacity: 1; transform: translateY(0); }
  .hero__stat {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    padding: clamp(16px, 3vh, 28px) 12px;
    border-right: 1px solid var(--border);
  }
  .hero__stat:last-child { border-right: none; }
  .hero__stat-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(24px, 4vw, 48px);
    font-weight: 800; color: var(--gold); line-height: 1;
  }
  .hero__stat-label {
    font-size: clamp(8px, 1vw, 10px);
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--grey); margin-top: 4px; text-align: center;
  }
  .hero__scroll-cue {
    position: absolute; bottom: 40px; right: clamp(20px,5vw,60px);
    z-index: 10; display: flex; flex-direction: column; align-items: center;
    gap: 10px; opacity: 0.45;
  }
  .hero__scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollAnim 2s ease infinite;
  }
  @keyframes scrollAnim {
    0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
    50% { transform: scaleY(1); opacity: 1; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
  }
  .hero__scroll-cue span { font-size: 9px; letter-spacing: 0.2em; color: var(--grey); writing-mode: vertical-rl; }

  /* ── TICKER ── */
  .ticker { background: var(--gold); overflow: hidden; padding: 12px 0; }
  .ticker__track {
    display: flex; align-items: center; gap: 0;
    animation: ticker 30s linear infinite; white-space: nowrap; width: max-content;
  }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker__item {
    padding: 0 28px; font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #000;
  }
  .ticker__sep { color: rgba(0,0,0,0.4); font-size: 8px; }

  /* ── ABOUT ── */
  .about { padding: clamp(80px,12vh,140px) 0; background: var(--dark); position: relative; overflow: hidden; }
  .about__grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(40px,6vw,100px); align-items: start; }
  .about__pills { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
  .about__feature-row {
    display: flex; gap: 24px; flex-wrap: wrap; margin-top: 8px;
    padding-top: 24px; border-top: 1px solid var(--border);
  }
  .about__feature { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(244,243,239,0.6); }
  .about__feature-icon { color: var(--gold); }
  .about__scan-line {
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.3;
  }

  /* ── SERVICES ── */
  .services { padding: clamp(80px,12vh,140px) 0; background: var(--black); position: relative; overflow: hidden; }
  .services__bg-text {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(80px, 18vw, 260px); font-weight: 900; text-transform: uppercase;
    color: transparent; -webkit-text-stroke: 1px rgba(201,168,76,0.04);
    white-space: nowrap; pointer-events: none; user-select: none;
    letter-spacing: 0.1em;
  }
  .services__tabs {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border); margin-bottom: 0;
  }
  .services__tab {
    background: none; border: none; cursor: pointer;
    padding: clamp(16px,2.5vw,28px) clamp(12px,2vw,24px);
    display: flex; flex-direction: column; gap: 6px;
    border-right: 1px solid var(--border);
    transition: all 0.25s;
    text-align: left; position: relative; overflow: hidden;
  }
  .services__tab:last-child { border-right: none; }
  .services__tab::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--gold); transform: scaleX(0); transition: transform 0.3s;
  }
  .services__tab--active::before { transform: scaleX(1); }
  .services__tab--active { background: rgba(201,168,76,0.04); }
  .services__tab-icon { font-size: 20px; color: var(--grey); transition: color 0.2s; }
  .services__tab--active .services__tab-icon { color: var(--gold); }
  .services__tab-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(13px,1.8vw,18px); font-weight: 700; text-transform: uppercase;
    color: rgba(244,243,239,0.5); letter-spacing: 0.04em; transition: color 0.2s;
  }
  .services__tab--active .services__tab-title { color: var(--white); }
  .services__tab-num {
    font-size: 11px; color: rgba(201,168,76,0.4);
    font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.1em;
  }
  .services__panel {
    display: grid; grid-template-columns: 1fr 1fr;
    border: 1px solid var(--border); border-top: none;
  }
  .services__panel-left {
    padding: clamp(28px,4vw,56px); display: flex; flex-direction: column; gap: 16px;
    border-right: 1px solid var(--border);
  }
  .services__panel-tag {
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold); opacity: 0.7;
  }
  .services__panel-h3 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(24px,3.5vw,44px); font-weight: 800; text-transform: uppercase;
    color: var(--white); letter-spacing: -0.01em;
  }
  .services__panel-badge {
    display: inline-block; background: rgba(201,168,76,0.12);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--gold); font-size: 10px; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 6px 14px; width: fit-content;
  }
  .services__panel-right {
    padding: clamp(28px,4vw,56px); display: flex; flex-direction: column;
    position: relative;
  }
  .services__panel-header {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--grey); margin-bottom: 20px; padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .services__panel-icon { color: var(--gold); }
  .services__item {
    display: flex; align-items: center; gap: 16px;
    padding: 14px 0; border-bottom: 1px solid var(--border);
    font-size: clamp(13px,1.5vw,15px); color: rgba(244,243,239,0.8);
  }
  .services__item:last-of-type { border-bottom: none; }
  .services__item-arrow { color: var(--gold); font-size: 14px; flex-shrink: 0; }
  .services__panel-corner {
    position: absolute; bottom: 0; right: 0;
    width: 32px; height: 32px;
    border-left: 1px solid var(--gold);
    border-top: 1px solid var(--gold);
    opacity: 0.3;
  }

  /* ── WHY ── */
  .why { padding: clamp(80px,12vh,140px) 0; background: var(--dark); }
  .why__grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); }
  .why__card {
    background: var(--card); padding: clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px);
    display: flex; flex-direction: column; gap: 12px; position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .why__card:hover { background: var(--card2); }
  .why__card-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; color: var(--gold); letter-spacing: 0.1em; opacity: 0.6;
  }
  .why__card-icon { font-size: 24px; color: var(--gold); margin: 4px 0; }
  .why__card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(16px,1.8vw,20px); font-weight: 700; text-transform: uppercase;
    color: var(--white); letter-spacing: 0.04em;
  }
  .why__card-body { font-size: 13px; color: var(--grey); line-height: 1.75; }
  .why__card-glow {
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .why__card:hover .why__card-glow { opacity: 0.6; }

  /* ── CTA BAND ── */
  .cta-band {
    padding: clamp(80px,12vh,120px) clamp(20px,5vw,48px);
    background: var(--black);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    text-align: center; position: relative; overflow: hidden;
  }
  .cta-band__scan {
    position: absolute; top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.04), transparent);
    animation: scanAnim 5s ease-in-out infinite;
  }
  @keyframes scanAnim { 0% { left: -60%; } 100% { left: 110%; } }
  .cta-band__inner { max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .cta-band__h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 6vw, 72px); font-weight: 900; text-transform: uppercase;
    color: var(--white); line-height: 1.05;
  }
  .cta-band__sub { color: var(--grey); font-size: clamp(14px,1.6vw,16px); line-height: 1.75; max-width: 460px; }
  .cta-band__btns { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }

  /* ── CONTACT ── */
  .contact { padding: clamp(80px,12vh,140px) 0; background: var(--black); }
  .contact__grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: clamp(40px,6vw,100px); align-items: start; }
  .contact__info { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
  .contact__info-item { display: flex; align-items: flex-start; gap: 16px; }
  .contact__info-icon { font-size: 18px; color: var(--gold); width: 28px; text-align: center; flex-shrink: 0; margin-top: 2px; }
  .contact__info-label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--grey); margin-bottom: 4px; }
  .contact__info-val { font-size: 15px; color: var(--white); }

  /* ── FORM ── */
  .form { display: flex; flex-direction: column; gap: 14px; }
  .form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form__field { display: flex; flex-direction: column; gap: 6px; }
  .form__label { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey); }
  .form__input {
    background: var(--card); border: 1px solid var(--border);
    color: var(--white); padding: 13px 16px;
    font-family: 'Barlow', sans-serif; font-size: 14px;
    outline: none; transition: border-color 0.2s; width: 100%;
  }
  .form__input:focus { border-color: var(--gold); }
  .form__input::placeholder { color: rgba(136,136,136,0.5); }
  .form__select { appearance: none; cursor: pointer; }
  .form__textarea { resize: vertical; min-height: 120px; }
  option { background: var(--card); }
  .form-success {
    background: var(--card); border: 1px solid var(--border);
    padding: clamp(40px,6vw,80px) 40px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .form-success__icon {
    font-size: 40px; color: var(--gold);
    width: 72px; height: 72px; border: 1px solid rgba(201,168,76,0.3);
    display: flex; align-items: center; justify-content: center; border-radius: 50%;
  }
  .form-success__title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px; font-weight: 800; text-transform: uppercase; color: var(--white);
  }
  .form-success__body { color: var(--grey); font-size: 14px; }

  /* ── FOOTER ── */
  .footer { background: var(--dark); border-top: 1px solid var(--border); padding: 32px 0; }
  .footer__inner {
    max-width: 1280px; margin: 0 auto;
    padding: 0 clamp(20px,5vw,48px);
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }
  .footer__brand { display: flex; align-items: center; gap: 10px; }
  .footer__name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 800; letter-spacing: 0.18em;
  }
  .footer__tagline { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey); }
  .footer__copy { font-size: 12px; color: rgba(136,136,136,0.5); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .about__grid { grid-template-columns: 1fr; gap: 40px; }
    .services__panel { grid-template-columns: 1fr; }
    .services__panel-left { border-right: none; border-bottom: 1px solid var(--border); }
    .contact__grid { grid-template-columns: 1fr; gap: 48px; }
    .why__grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 768px) {
    .nav__links { display: none; }
    .nav__burger { display: flex; }
    .nav__mobile { display: flex; }
    .hero__br { display: block; }
    .services__tabs { grid-template-columns: 1fr; }
    .services__tab { border-right: none; border-bottom: 1px solid var(--border); }
    .why__grid { grid-template-columns: 1fr; }
    .form__row { grid-template-columns: 1fr; }
    .hero__scroll-cue { display: none; }
    .footer__inner { flex-direction: column; align-items: flex-start; }
    .cta-band__btns { flex-direction: column; align-items: center; }
    .hero__title-row2 { flex-wrap: wrap; }
  }
  @media (max-width: 480px) {
    .hero__actions { flex-direction: column; align-items: flex-start; }
    .btn { width: 100%; text-align: center; }
    .hero__stat-label { display: none; }
  }
`;
