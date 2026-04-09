"use client"
import { useState, useEffect, useRef, useCallback } from "react";

const weddingImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Bride & Groom Portrait", category: "Portraits" },
  { id: 2, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Wedding Ceremony", category: "Ceremony" },
  { id: 3, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Wedding Reception", category: "Reception" },
  { id: 4, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Couple at Sunset", category: "Portraits" },
  { id: 5, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Wedding Rings", category: "Details" },
  { id: 6, src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80", alt: "Floral Decor", category: "Details" },
  { id: 7, src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80", alt: "Wedding Dance", category: "Reception" },
  { id: 8, src: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&q=80", alt: "Bridal Bouquet", category: "Details" },
  { id: 9, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Couple Walking", category: "Portraits" },
  { id: 10, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80", alt: "Wedding Venue", category: "Ceremony" },
  { id: 11, src: "https://images.unsplash.com/photo-1549417229-7686ac5595fd?w=800&q=80", alt: "Table Setting", category: "Reception" },
  { id: 12, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", alt: "First Kiss", category: "Ceremony" },
];

const categories = ["All", "Portraits", "Ceremony", "Reception", "Details"];

// Camera SVG icon
const CameraIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const ShutterIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="shutter-svg">
    <circle cx="30" cy="30" r="28" stroke="var(--gold)" strokeWidth="1.5" className="shutter-ring"/>
    <circle cx="30" cy="30" r="20" stroke="var(--gold)" strokeWidth="0.8" opacity="0.5"/>
    <path d="M30 10 L33 20 L30 18 L27 20 Z" fill="var(--gold)" opacity="0.6" className="shutter-blade" style={{transformOrigin:'30px 30px'}}/>
    <path d="M30 10 L33 20 L30 18 L27 20 Z" fill="var(--gold)" opacity="0.6" className="shutter-blade" style={{transformOrigin:'30px 30px', transform:'rotate(60deg)'}}/>
    <path d="M30 10 L33 20 L30 18 L27 20 Z" fill="var(--gold)" opacity="0.6" className="shutter-blade" style={{transformOrigin:'30px 30px', transform:'rotate(120deg)'}}/>
    <path d="M30 10 L33 20 L30 18 L27 20 Z" fill="var(--gold)" opacity="0.6" className="shutter-blade" style={{transformOrigin:'30px 30px', transform:'rotate(180deg)'}}/>
    <path d="M30 10 L33 20 L30 18 L27 20 Z" fill="var(--gold)" opacity="0.6" className="shutter-blade" style={{transformOrigin:'30px 30px', transform:'rotate(240deg)'}}/>
    <path d="M30 10 L33 20 L30 18 L27 20 Z" fill="var(--gold)" opacity="0.6" className="shutter-blade" style={{transformOrigin:'30px 30px', transform:'rotate(300deg)'}}/>
    <circle cx="30" cy="30" r="8" stroke="var(--gold)" strokeWidth="1" className="shutter-center"/>
  </svg>
);

export default function ShagunStudio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shutterActive, setShutterActive] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [splashPhase, setSplashPhase] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const galleryRef = useRef(null);

  const filtered = filter === "All"
    ? weddingImages
    : weddingImages.filter(img => img.category === filter);

  // Splash camera animation phases
  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase(1), 800);
    const t2 = setTimeout(() => setSplashPhase(2), 1600);
    const t3 = setTimeout(() => setSplashPhase(3), 1900);
    const t4 = setTimeout(() => setSplashPhase(4), 2300);
    const t5 = setTimeout(() => setIntroComplete(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for gallery items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = document.querySelectorAll('.g-item');
    items.forEach(item => observer.observe(item));
    return () => items.forEach(item => observer.unobserve(item));
  }, [filter]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const triggerFlash = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  }, []);

  const triggerShutter = useCallback((callback) => {
    setShutterActive(true);
    triggerFlash();
    setTimeout(() => {
      callback?.();
      setTimeout(() => setShutterActive(false), 400);
    }, 250);
  }, [triggerFlash]);

  const navigateLightbox = (dir) => {
    triggerShutter(() => {
      setLightbox(prev => ({
        ...prev,
        index: (prev.index + dir + filtered.length) % filtered.length
      }));
    });
  };

  const openLightbox = (index) => {
    triggerShutter(() => {
      setLightbox({ open: true, index });
    });
  };

  const closeLightbox = () => {
    setShutterActive(true);
    setTimeout(() => {
      setLightbox({ open: false, index: 0 });
      setShutterActive(false);
    }, 300);
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --cream: #F5F0E8;
          --gold: #B8860B;
          --gold-light: #D4A843;
          --gold-glow: rgba(184, 134, 11, 0.3);
          --dark: #0D0D0D;
          --dark2: #1A1A1A;
          --dark3: #252525;
          --warm: #8A7E6E;
          --blush: #E2D1BF;
          --white: #FEFEFE;
          --red-focus: #C0392B;
          --nav-height-desktop: 88px;
          --nav-height-mobile: 64px;
        }

        /* ===== CAMERA SPLASH ===== */
        .splash {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease, visibility 0.8s ease;
          overflow: hidden;
        }

        .splash.done { opacity: 0; visibility: hidden; pointer-events: none; }

        .splash-grid {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to right, transparent 33.2%, rgba(255,255,255,0.05) 33.3%, rgba(255,255,255,0.05) 33.4%, transparent 33.5%, transparent 66.5%, rgba(255,255,255,0.05) 66.6%, rgba(255,255,255,0.05) 66.7%, transparent 66.8%),
            linear-gradient(to bottom, transparent 33.2%, rgba(255,255,255,0.05) 33.3%, rgba(255,255,255,0.05) 33.4%, transparent 33.5%, transparent 66.5%, rgba(255,255,255,0.05) 66.6%, rgba(255,255,255,0.05) 66.7%, transparent 66.8%);
        }

        .splash-focus {
          position: relative;
          width: 160px;
          height: 160px;
          z-index: 1;
        }

        .splash-bracket {
          position: absolute;
          width: 28px;
          height: 28px;
          border-color: rgba(255,255,255,0.5);
          border-style: solid;
          border-width: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .splash-bracket.tl { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
        .splash-bracket.tr { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
        .splash-bracket.bl { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
        .splash-bracket.br { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }

        .splash.phase1 .splash-bracket,
        .splash.phase2 .splash-bracket {
          border-color: #4ADE80;
          width: 20px;
          height: 20px;
        }

        .splash-dot {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 6px; height: 6px;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transition: all 0.3s;
        }

        .splash.phase1 .splash-dot { background: #4ADE80; box-shadow: 0 0 12px #4ADE80; }

        .splash-cross {
          position: absolute;
          inset: 0;
        }

        .splash-cross::before, .splash-cross::after {
          content: '';
          position: absolute;
          background: rgba(255,255,255,0.12);
        }

        .splash-cross::before { top: 50%; left: 0; right: 0; height: 1px; }
        .splash-cross::after { left: 50%; top: 0; bottom: 0; width: 1px; }

        .splash-shutter-top, .splash-shutter-bottom {
          position: absolute;
          left: 0; right: 0;
          height: 50%;
          background: #000;
          z-index: 2;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .splash-shutter-top { top: 0; transform: translateY(-100%); }
        .splash-shutter-bottom { bottom: 0; transform: translateY(100%); }

        .splash.phase2 .splash-shutter-top { transform: translateY(0); }
        .splash.phase2 .splash-shutter-bottom { transform: translateY(0); }

        .splash-flash {
          position: absolute;
          inset: 0;
          background: white;
          z-index: 3;
          opacity: 0;
        }

        .splash.phase3 .splash-flash { animation: splashFlash 0.5s ease-out forwards; }
        .splash.phase3 .splash-shutter-top { transform: translateY(-100%); }
        .splash.phase3 .splash-shutter-bottom { transform: translateY(100%); }

        @keyframes splashFlash {
          0% { opacity: 1; }
          30% { opacity: 0.7; }
          100% { opacity: 0; }
        }

        .splash-hud-top {
          position: absolute;
          top: 20px; left: 0; right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 28px;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
          font-family: 'Outfit', sans-serif;
          z-index: 1;
        }

        .splash-rec {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #EF4444;
        }

        .splash-rec::before {
          content: '';
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #EF4444;
          animation: recBlink 1s ease infinite;
        }

        .splash-hud-bottom {
          position: absolute;
          bottom: 20px; left: 0; right: 0;
          display: flex;
          justify-content: center;
          gap: 24px;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
          font-family: 'Outfit', sans-serif;
          z-index: 1;
        }

        .splash-hud-bottom span { color: var(--gold); }

        .splash-captured {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          opacity: 0;
          z-index: 4;
          background: var(--dark);
          transition: opacity 0.5s ease;
        }

        .splash.phase4 .splash-captured { opacity: 1; }

        .splash-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: var(--gold);
          letter-spacing: 8px;
          text-transform: uppercase;
        }

        .splash-tagline {
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-top: 12px;
        }

        /* ===== FLASH EFFECT ===== */
        .camera-flash {
          position: fixed;
          inset: 0;
          background: white;
          z-index: 8888;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.05s ease;
        }

        .camera-flash.active {
          animation: flashBang 0.35s ease-out forwards;
        }

        @keyframes flashBang {
          0% { opacity: 0.9; }
          30% { opacity: 0.6; }
          100% { opacity: 0; }
        }

        /* ===== SHUTTER OVERLAY (on click) ===== */
        .shutter-overlay {
          position: fixed;
          inset: 0;
          z-index: 7777;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shutter-overlay .s-blade {
          position: absolute;
          background: var(--dark);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .shutter-overlay .s-blade.s-top { top: -100%; left: 0; width: 100%; height: 50%; }
        .shutter-overlay .s-blade.s-bottom { bottom: -100%; left: 0; width: 100%; height: 50%; }
        .shutter-overlay .s-blade.s-left { left: -100%; top: 0; width: 50%; height: 100%; }
        .shutter-overlay .s-blade.s-right { right: -100%; top: 0; width: 50%; height: 100%; }

        .shutter-overlay.active .s-blade.s-top { top: 0; }
        .shutter-overlay.active .s-blade.s-bottom { bottom: 0; }
        .shutter-overlay.active .s-blade.s-left { left: 0; }
        .shutter-overlay.active .s-blade.s-right { right: 0; }

        /* ===== APP ===== */
        .app {
          font-family: 'Outfit', sans-serif;
          background: var(--dark);
          color: var(--white);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ===== NAV ===== */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          padding: 24px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.5s ease;
        }

        .nav.scrolled {
          background: rgba(13,13,13,0.95);
          backdrop-filter: blur(24px);
          padding: 16px 48px;
          border-bottom: 1px solid rgba(184,134,11,0.15);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-camera-icon {
          opacity: 0.8;
          animation: cameraFloat 4s ease-in-out infinite;
        }

        @keyframes cameraFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(-2deg); }
          75% { transform: translateY(2px) rotate(1deg); }
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--white);
        }

        .nav-logo span {
          color: var(--gold);
          font-style: italic;
        }

        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }

        .nav-links a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 300;
          transition: all 0.3s;
          position: relative;
          cursor: pointer;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s ease;
        }

        .nav-links a:hover { color: var(--gold); }
        .nav-links a:hover::after { width: 100%; }

        /* ===== HERO ===== */
        .hero {
          position: relative;
          height: clamp(360px, 52vh, 520px);
          padding: calc(var(--nav-height-desktop) + 12px) 0 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80') center/cover;
          filter: brightness(0.25) saturate(0.8);
          animation: heroSlow 25s ease-in-out infinite alternate;
        }

        @keyframes heroSlow {
          0% { transform: scale(1.05) translateX(0); }
          100% { transform: scale(1.15) translateX(-2%); }
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.8) 100%),
            linear-gradient(to bottom, transparent 60%, rgba(13,13,13,0.95) 100%);
        }

        /* Lens ring overlay on hero */
        .hero-lens {
          position: absolute;
          width: min(320px, 60vw);
          height: min(320px, 60vw);
          border: 1px solid rgba(184,134,11,0.15);
          border-radius: 50%;
          animation: lensRotate 30s linear infinite;
        }

        .hero-lens::before {
          content: '';
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(184,134,11,0.1);
          border-radius: 50%;
        }

        .hero-lens::after {
          content: '';
          position: absolute;
          inset: 34px;
          border: 1px dashed rgba(184,134,11,0.08);
          border-radius: 50%;
        }

        @keyframes lensRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Focus brackets */
        .focus-bracket {
          position: absolute;
          width: 28px;
          height: 28px;
          border-color: var(--gold);
          border-style: solid;
          border-width: 0;
          opacity: 0;
          animation: focusIn 0.8s ease 1.8s forwards;
        }

        .focus-bracket.tl { top: 20%; left: 28%; border-top-width: 2px; border-left-width: 2px; }
        .focus-bracket.tr { top: 20%; right: 28%; border-top-width: 2px; border-right-width: 2px; }
        .focus-bracket.bl { bottom: 20%; left: 28%; border-bottom-width: 2px; border-left-width: 2px; }
        .focus-bracket.br { bottom: 20%; right: 28%; border-bottom-width: 2px; border-right-width: 2px; }

        @keyframes focusIn {
          0% { opacity: 0; transform: scale(1.5); }
          50% { opacity: 0.8; transform: scale(0.95); }
          70% { opacity: 0.6; transform: scale(1.02); }
          100% { opacity: 0.4; transform: scale(1); }
        }

        /* Red recording dot */
        .rec-dot {
          position: absolute;
          top: 32px;
          right: 140px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--red-focus);
          opacity: 0;
          animation: fadeUp 1s ease 2.5s forwards;
        }

        .rec-dot::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--red-focus);
          animation: recBlink 1.5s ease infinite;
        }

        @keyframes recBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-cam-icon {
          opacity: 0;
          animation: fadeUp 1s ease 0.5s forwards;
          margin-bottom: 20px;
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 8px;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0;
          animation: fadeUp 1s ease 0.8s forwards;
          margin-bottom: 16px;
        }

        .hero-logo-img {
          width: clamp(360px, 52vw, 460px);
          height: auto;
          object-fit: contain;
          opacity: 0;
          animation: logoReveal 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
          filter: drop-shadow(0 0 40px rgba(184, 134, 11, 0.15));
          margin: 0 0 8px;
        }

        @keyframes logoReveal {
          0% { 
            opacity: 0; 
            transform: scale(0.7) rotate(-3deg); 
            filter: drop-shadow(0 0 0px rgba(184, 134, 11, 0)) brightness(0.3);
          }
          40% { 
            opacity: 1; 
            transform: scale(1.03) rotate(0deg);
            filter: drop-shadow(0 0 60px rgba(184, 134, 11, 0.4)) brightness(1.2);
          }
          70% {
            transform: scale(0.98);
            filter: drop-shadow(0 0 30px rgba(184, 134, 11, 0.2)) brightness(1);
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
            filter: drop-shadow(0 0 40px rgba(184, 134, 11, 0.15)) brightness(1);
          }
        }

        .hero-shutter-btn {
          margin-top: 8px;
          opacity: 0;
          animation: fadeUp 1s ease 1.6s forwards;
          cursor: pointer;
          background: none;
          border: none;
          position: relative;
        }

        .hero-shutter-btn .shutter-svg {
          transition: transform 0.3s ease;
          width: 40px;
          height: 40px;
        }

        .hero-shutter-btn:hover .shutter-svg {
          transform: rotate(30deg) scale(1.1);
        }

        .hero-shutter-btn:hover .shutter-ring {
          stroke: var(--gold-light);
        }

        .shutter-text {
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 4px;
        }

        /* Camera info overlay */
        .cam-info {
          position: absolute;
          bottom: 16px;
          left: 48px;
          display: flex;
          gap: 24px;
          opacity: 0;
          animation: fadeUp 1s ease 2s forwards;
        }

        .cam-info-item {
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
          font-weight: 200;
          font-variant-numeric: tabular-nums;
        }

        .cam-info-item span { color: var(--gold); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== GALLERY SECTION ===== */
        /* Transition zone between hero and gallery */
        .hero-gallery-transition {
          position: relative;
          height: 52px;
          background: linear-gradient(180deg, var(--dark) 0%, var(--dark2) 30%, #3A3028 60%, var(--cream) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-gallery-transition::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }

        .hero-gallery-transition::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          background: var(--dark2);
        }

        .gallery-section {
          background: var(--cream);
          position: relative;
        }

        .section-head {
          text-align: center;
          padding: 60px 20px 50px;
          position: relative;
          z-index: 2;
        }

        .section-tag {
          font-size: 10px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .section-tag::before, .section-tag::after {
          content: '';
          width: 30px;
          height: 1px;
          background: var(--gold);
          opacity: 0.5;
        }

        .section-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 400;
          color: var(--dark);
        }

        .section-h2 em { font-style: italic; color: var(--gold); }

        /* Filters */
        .filters {
          display: flex;
          justify-content: center;
          gap: 6px;
          padding: 0 20px 48px;
          flex-wrap: wrap;
        }

        .f-btn {
          padding: 10px 28px;
          border: 1px solid var(--blush);
          background: transparent;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--warm);
          cursor: pointer;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .f-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--dark);
          transform: translateY(100%);
          transition: transform 0.4s ease;
          z-index: -1;
        }

        .f-btn:hover { border-color: var(--dark); color: var(--gold); }
        .f-btn:hover::before { transform: translateY(0); }

        .f-btn.on {
          background: var(--dark);
          border-color: var(--dark);
          color: var(--gold);
        }

        /* Gallery Grid */
        .grid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px 100px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }

        .g-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          opacity: 0;
          transform: translateY(50px) scale(0.95);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .g-item.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .g-item:nth-child(3n+1) { aspect-ratio: 3/4; transition-delay: 0s; }
        .g-item:nth-child(3n+2) { aspect-ratio: 4/3; transition-delay: 0.1s; }
        .g-item:nth-child(3n) { aspect-ratio: 1/1; transition-delay: 0.2s; }

        .g-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease;
          filter: saturate(0.85);
        }

        .g-item:hover img {
          transform: scale(1.1);
          filter: saturate(1.1) brightness(1.05);
        }

        /* Viewfinder overlay on hover */
        .g-viewfinder {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .g-item:hover .g-viewfinder { opacity: 1; }

        .g-vf-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: var(--gold);
          border-style: solid;
          border-width: 0;
          transition: all 0.4s ease;
        }

        .g-item:hover .g-vf-corner { width: 30px; height: 30px; }

        .g-vf-corner.tl { top: 12px; left: 12px; border-top-width: 2px; border-left-width: 2px; }
        .g-vf-corner.tr { top: 12px; right: 12px; border-top-width: 2px; border-right-width: 2px; }
        .g-vf-corner.bl { bottom: 12px; left: 12px; border-bottom-width: 2px; border-left-width: 2px; }
        .g-vf-corner.br { bottom: 12px; right: 12px; border-bottom-width: 2px; border-right-width: 2px; }

        /* Center crosshair */
        .g-crosshair {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          opacity: 0;
          transition: opacity 0.4s ease 0.1s;
        }

        .g-item:hover .g-crosshair { opacity: 0.6; }

        .g-crosshair::before, .g-crosshair::after {
          content: '';
          position: absolute;
          background: var(--gold);
        }

        .g-crosshair::before { top: 50%; left: 0; right: 0; height: 1px; transform: translateY(-50%); }
        .g-crosshair::after { left: 50%; top: 0; bottom: 0; width: 1px; transform: translateX(-50%); }

        /* Info overlay */
        .g-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 20px 20px;
          background: linear-gradient(0deg, rgba(13,13,13,0.85) 0%, transparent 100%);
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .g-item:hover .g-info { transform: translateY(0); }

        .g-info h3 {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: var(--white);
          font-weight: 400;
        }

        .g-info p {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 4px;
        }

        /* Click shutter icon */
        .g-shutter-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 3;
        }

        .g-item:hover .g-shutter-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* Aperture number on hover */
        .g-aperture {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--gold);
          opacity: 0;
          transition: opacity 0.3s ease 0.2s;
          font-variant-numeric: tabular-nums;
        }

        .g-item:hover .g-aperture { opacity: 0.7; }

        /* ===== LIGHTBOX ===== */
        .lb {
          position: fixed;
          inset: 0;
          z-index: 6000;
          background: rgba(8,8,8,0.97);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .lb.on { opacity: 1; pointer-events: all; }

        .lb-img {
          max-width: 82vw;
          max-height: 82vh;
          object-fit: contain;
          transform: scale(0.92);
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 0 80px rgba(0,0,0,0.5);
        }

        .lb.on .lb-img { transform: scale(1); }

        /* Viewfinder in lightbox */
        .lb-vf-corner {
          position: absolute;
          width: 36px;
          height: 36px;
          border-color: var(--gold);
          border-style: solid;
          border-width: 0;
          opacity: 0.3;
        }

        .lb-vf-corner.tl { top: 8%; left: 8%; border-top-width: 2px; border-left-width: 2px; }
        .lb-vf-corner.tr { top: 8%; right: 8%; border-top-width: 2px; border-right-width: 2px; }
        .lb-vf-corner.bl { bottom: 8%; left: 8%; border-bottom-width: 2px; border-left-width: 2px; }
        .lb-vf-corner.br { bottom: 8%; right: 8%; border-bottom-width: 2px; border-right-width: 2px; }

        .lb-close {
          position: absolute;
          top: 24px;
          right: 32px;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50%;
          background: none;
          color: var(--white);
          font-size: 18px;
          cursor: pointer;
          transition: all 0.3s;
          z-index: 10;
        }

        .lb-close:hover { border-color: var(--gold); color: var(--gold); }

        .lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          background: none;
          color: var(--white);
          font-size: 22px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .lb-nav:hover { border-color: var(--gold); color: var(--gold); background: rgba(184,134,11,0.08); }
        .lb-prev { left: 24px; }
        .lb-next { right: 24px; }

        .lb-caption {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
        }

        .lb-caption h3 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 400;
        }

        .lb-caption p {
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 4px;
        }

        .lb-counter {
          position: absolute;
          top: 30px;
          left: 32px;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
          font-variant-numeric: tabular-nums;
          z-index: 10;
        }

        /* ===== ABOUT ===== */
        .about-section {
          background: var(--dark);
          padding: 120px 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 80px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border: 1px solid rgba(184,134,11,0.05);
          border-radius: 50%;
          right: -200px;
          top: -200px;
        }

        .about-img-wrap {
          position: relative;
        }

        .about-img {
          width: 380px;
          height: 500px;
          object-fit: cover;
        }

        .about-img-frame {
          position: absolute;
          top: -16px;
          left: -16px;
          right: -16px;
          bottom: -16px;
          border: 1px solid var(--gold);
          opacity: 0.3;
        }

        .about-img-accent {
          position: absolute;
          bottom: -24px;
          right: -24px;
          width: 120px;
          height: 120px;
          background: var(--gold);
          opacity: 0.15;
        }

        .about-body { max-width: 460px; }

        .about-body h2 {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 400;
          margin: 16px 0 28px;
          line-height: 1.2;
        }

        .about-body h2 em { font-style: italic; color: var(--gold); }

        .about-body p {
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          line-height: 1.9;
          font-weight: 200;
        }

        .about-stats {
          display: flex;
          gap: 44px;
          margin-top: 44px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .stat-n {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          color: var(--gold);
        }

        .stat-l {
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-top: 6px;
        }

        /* ===== CTA ===== */
        .cta-section {
          background: var(--cream);
          padding: 100px 40px;
          text-align: center;
        }

        .cta-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 400;
          max-width: 550px;
          margin: 20px auto 44px;
          line-height: 1.4;
          color: var(--dark);
        }

        .cta-h2 em { font-style: italic; color: var(--gold); }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 48px;
          border: none;
          background: var(--dark);
          color: var(--gold);
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s;
        }

        .cta-btn:hover {
          background: var(--gold);
          color: var(--dark);
        }

        /* ===== FOOTER ===== */
        .foot {
          background: var(--dark);
          padding: 48px;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.04);
        }

        .foot-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .foot-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--white);
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .foot-logo span { color: var(--gold); }

        .foot p {
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.2);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav { padding: 16px 20px; }
          .hero {
            height: clamp(300px, 46vh, 380px);
            padding: calc(var(--nav-height-mobile) + 12px) 0 24px;
          }
          .hero-logo-img { width: clamp(260px, 72vw, 340px); }
          .hero-shutter-btn { margin-top: 6px; }
          .hero-shutter-btn .shutter-svg {
            width: 36px;
            height: 36px;
          }
          .shutter-text { letter-spacing: 2.5px; }
          .hero-gallery-transition { height: 38px; }
          .grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
          .about-section { padding: 60px 24px; gap: 40px; }
          .about-img { width: 100%; height: 320px; }
          .cam-info { display: none; }
          .rec-dot { display: none; }
          .focus-bracket { display: none; }
        }
      `}</style>

      {/* INTRO SHUTTER ANIMATION */}
      <div className={`splash ${introComplete ? 'done' : ''} ${splashPhase >= 1 ? 'phase1' : ''} ${splashPhase >= 2 ? 'phase2' : ''} ${splashPhase >= 3 ? 'phase3' : ''} ${splashPhase >= 4 ? 'phase4' : ''}`}>
        <div className="splash-grid" />
        <div className="splash-hud-top">
          <div className="splash-rec">REC</div>
          <div>AF-S 85mm</div>
        </div>
        <div className="splash-focus">
          <div className="splash-bracket tl" />
          <div className="splash-bracket tr" />
          <div className="splash-bracket bl" />
          <div className="splash-bracket br" />
          <div className="splash-cross" />
          <div className="splash-dot" />
        </div>
        <div className="splash-hud-bottom">
          <div><span>f</span>/1.4</div>
          <div><span>ISO</span> 200</div>
          <div><span>1</span>/1000s</div>
        </div>
        <div className="splash-shutter-top" />
        <div className="splash-shutter-bottom" />
        <div className="splash-flash" />
        <div className="splash-captured">
          <div className="splash-logo-text">Shagun Studio</div>
          <div className="splash-tagline">Wedding Photography</div>
        </div>
      </div>

      {/* FLASH */}
      <div className={`camera-flash ${flash ? 'active' : ''}`} />

      {/* SHUTTER CLICK OVERLAY */}
      <div className={`shutter-overlay ${shutterActive ? 'active' : ''}`}>
        <div className="s-blade s-top" />
        <div className="s-blade s-bottom" />
        <div className="s-blade s-left" />
        <div className="s-blade s-right" />
      </div>

      <div className="app">
        {/* NAV */}
        <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-brand">
            <div className="nav-camera-icon"><CameraIcon size={22} color="var(--gold)" /></div>
            <div className="nav-logo">Shagun <span>Studio</span></div>
          </div>
          <ul className="nav-links">
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-vignette" />
          <div className="hero-lens" />
          <div className="focus-bracket tl" />
          <div className="focus-bracket tr" />
          <div className="focus-bracket bl" />
          <div className="focus-bracket br" />
          <div className="rec-dot">REC</div>

          <div className="hero-content">
            <img src="data:image/png;base64,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KMDHH38s7ORzu5JXJcweAHuLDBx7bDc5ePBVCEeiEEKBaVrIyMzE++9/iGnTvhd+v5figxBC/kyAVHRFrNrcRLCqqzdVRXNEXh+prtidvEePGSPOPuds2bZNG8RiEQAChmngrrvvxJw5P2Pnzl1wudyOW/9Q55fdU2Pbtm3YunUrOnbsiD179sCu/GRXTjrppJPw9ttvy2HDhmHRomSjOlVVHaN13++0jXVbaNj5H7Nnz0YoFHI6etvYnpdQKIQWLVpg1KhRsnPnzlBVFb///jseeOABzJ071xEf5bGm2uLjuOOOk//85z9x33334bfffhO2wIrH47AsC4FAwMnnaNSoEdxuN37//XfMmDFD7Ny50xFstuiw74FlWU6ImGmaZULcKhohACkByzIRCPgxbNgwBAJ+RMLJYgYulwvbt+3AG2+8IZKhcKJEtBBSuXshzy+1q4DWdBiQSgiptZu0pmkoLCzCc8895yQIK4qCWCKGVq1a4u93/U0apgkh5GEb5nZlqkQigRdeeAFbt25FVlYW3G53meaBRUVFaNu2LcaMGYOhQ4dKu7u3bciXzuewQ5UyMzNlaU9CLBbDzz//7AgrRVFghzpFIhFEIhH0799fjh07Vp566qmwLAsffPABBg8eLPbtzH60G7YdDlavXj288MILGDt2LD755BNhh3rF43E0aNAA/fr1k5dddpls37693L17NyZNmiRefvllMXXqVJGfn++IDju0at8eHH+WYF6R80ZVVcRicVx++aXy5FN6IhwphqIqMAwTfn8QY8aMwYoVq0qqfFF8EELIfuLwYCqxIlVjeR+7os61Jo1BbX4jUNuuj5T/fNF1HS88/5wcMOB8FBQUQHWpsKxkCdnbbrsdU76eKgIBO3H68N7bKIqCaDSKJk2a4IorrpD9+vVD8+bNYVkWIpGI80bf4/HA4/Hg559/xptvvomZM2cKu7u41+t1REU0GkW3bt3khx9+6JS53bNnDy644AKxdetWuFwuxONxJySpW7ducsiQIbj00kshhMDcuXPx2muvYdKkSUJVVdihYeU5nrFYDGPHjpVpaWm44IILBJCsXtWiRQvZokUL+P1+rF27FkuWLBFFRUUAkiFibrfbERvVVLZCVRVEo3F06tRBjh03eq/HSQr4vX4sWvQrLr9yoDAM84j6vBBSHiK5Np9feR+/vI5XXRPiq2q+UIBQgFCAkFovQBKJBJo3a4b33ntXZmdnQzfigJBwuz3YunkLLr9ioNi2bTvcLjesI1isFUVxyt02btwYffr0keeffz66d+8Or9eLeDyORCIBXdedPJBFixZh6tSp+OGHH7By5UoRjUbLHPNf//qXvPjii2EYBp555hmMHj3amfg5OTk4+eST5V//+lf85S9/QSAQwIwZM/Df//4XkyZNEgUFBfD5fOW++dh5Jtddd5287rrrcPHFFwufz4cuXbrI7Oxs/P7771i3bp3YtGmTE6JmVwCrCdXskh4oA5qmYfTot2XPniegqLgYqqJASgWKUHDttddi1o+zhV1UgOsRoQChAKEAOQwBUlON8JoibihEeK2k+mDnLFx22WXyySefQiRcCFVNVpxKT8/AF198ib/97e9CVVQc6bt5u7ys7Z3weDw49thj5dlnn40ePXqgWbNmyMzMhGVZMAzDyRUpLCzEqlWrsHz5cqxcuRLbt29HQUEBpJTo0aMHQqEQli9fjkaNGqFly5bo2LEjunbtiqysLGzatAk//vgjvvjiC8ycOVNEIhG43e79mvYdzcZlP1sulwvFxcVo27YtJk2aJNevX4+pU6dCVVV8++23WLJkiQiFQlBVFW632wknqynrh2VZcGkaQuEwht3zd3n77bcjHEqGXpmGgYw69fDaq2/gscceParCBYRQgBzZM1qepXcr4lwpQChAKEAoQAg5sJFpmnju+edl/37noqioAKqqlSRLp+HRRx/FW2+PEfsmeR/J99jduW2vRmZmJlq3bi27du2Ktm3bokOHDqhfvz4CgQD8fj/S09PhcrmccDFbpIRCIceToOs6du/ejd9//x3z5s3DggULsHz5crF9+3YAyTAuVVX3y6Uoj+fKMAzouo769evjnXfeka1atcJbb72FiRMn4rfffhNAsnqVqqo1sm+PPcbFxcU468zT5X/+8x9IacEwdABAIODH/AWLMGTItSISiTjXSQgFCAUIBQgFCAUIBQghB8UOk2rYsCHGj39f1s+th3g84fSpME0TQ4fehB9mzhZ2x+8jWbhtr0HpP7quO2VmbWO9Xr16qF+/vszOzkZ6ejq8Xi98Ph/S09NRXFyMWCyGRCKBSCSCbdu2YceOHWLbtm2IRCLOcTRNg8vlKtN3o7yFh2mayM7ORrdu3eSDDz4It9uNoUOHYsGCBUII4TQyrKkGuV2sIBqNokWL5hg3drRs0KC+c79s78iQa67Hzz/PEez5QShAKEAoQMpBgNQ0EVIT80EoRCr3Wqu6HDKpvpuiqqqIRCI468wz5CuvvFzi6Ugmifv9PmzcuAlXDrxKbN26DV6vt9x6T+zbPNA0Tce4PxwB5XK5oKqqM8/L2/C3zzGRSAqznJwctG3bVp5++um4/vrrsXnzZlx99dViyZIlh9TTpKYIU8Mw4Ha78cbrr8mTTjrB6TZvmhaysrIwfPhwvPzvVyk+CIVHFZ9jdcz/qE45JNVp3rAML6nRbycJKU/jOik0/Pjf1G/F22+PRnp6Rqk34BG0aNECI0c+Ib1eL3RdL1Mi92ifQcuynD9CCLjdbvj9fgQCgf3+BINBBINB5+9+vx8ej8cJ7TJNs1xDrezxMQwDiUQCDRs2xGmnnSaPPfZYuXTpUpGdnY1EIoGbb74ZS5YsQVpaGgzDqPHrii3kdF3Hgw8+JHv17oVwOARNU2EYBtLS0vDll5Px+utvCZ/P+6c5LXZZZbs3S2mRc6DP7XM40OcH+h27AaQtQv9MWO1b5nnfY9jHPtBnf/adh3MuhJBauOeWXiz+aBGuyAW+Oh+vMsagMo7/Z8p33zewqWxk0gNCDvYsOM+BZUEoAv/+90vyrLPORGFhIVwuDbpuID2jDj78cDweeOAB4XK5yjxHqYjd18MwDMfjoWkali9fLrZs2YKLL75Yvvnmm7jzzjsxZsyYlPIC2H1Ubr/9Nnn33XcjEglDERKWZcLvD2DNmjUYOPAqsWvXLrhcHljS+sN1JxaLOZ/ZoWlCCJSucGZ/DiRD6GKxGAzDKPP5vr9j59fYldaAZFEATdMOODft6zrQuViWhXg8XubfdF0vk/dkV/iy54b9nXbIH4Ayv2N/zhddlbOf1+ZzpAek5sybQxIgNdkArwl5JtVFjNR2g5xihOw10JLVqho3boyx40bLJk0aIRaLJ8NuDAPp6RkY9fSzeOHFl0TAF4RlAVKYSKWO16WN5uzsbLRt21b6/X789ttvYvfu3dB1Haeccor88MMP8e677+KBBx4o09CwRl87AE1TUByK4KILz5fPPPM04vE4pASkgGPs33jDTZg9+2cRDCarXh1oH7fzh4QQGDBggGzSpAnmz5+P7777Tvh8PsTjcZxzzjmyY8eOWLJkCb766ith90OJxWJo1KgR2rVrJ7///nthG/G6rqNfv34yLy8PmzZtwueffy6i0SiaNWuG/v37S8Mw8Mknn4g9e/aUESF288toNIo+ffrI7t27Y82aNZg0aZLQNM0JNbv44otlbm4uFi9ejG+++UY0bNgQ5557rkxPT8eiRYswZcoUYXsBGzdujP79+0spJSZMmCB27doFy7KQm5uLCy64QAohMHHiRLFhwwZ4vV6KEIqPGvMd1U04pFL+B8AQLEII2Q/LkvB6PVi/fgPuv/8BRKMxp3StIhSEQyH87W934Pprr5fhaAiqKpBK8tXurq4oCk466STZo0cPuXPnTjFt2jSxZ88eGIaBDh064PXXX8f06dPx2GOPiVR6w62qSfFxxumnyZEjR0DX9aSHoGTHdLvdePTRRzF79s8iEPCVhJsdXMiZpomXX35ZXnDBBdi9ezdGjhyJCy+8UMZiMfz973+Xw4YNw65du/C3v/0NN9xwg4zFYvB6vfj73/8up02bJu+66y6nNHMsFsPIkSPlVVddhR07diAjIwOKoiA3Nxdjx46ViqIgLy8Pb775prQNDPvliqZpiMfjuPDCC+VDDz2E3bt34+9//zuGDRvmfOfbb78tjz/+eOTn5yMQCEBKiby8PJmdnY3du3fjqaeewtVXXy3j8Tjq16+PMWPGSLfbjebNm+Odd96RmqYhGAxi9OjRsm7duqhTpw4++OADWadOHfZFIYQ4aBwCQgjZ32g0jGTi+U+z54iHH3pEPvX0kzD0ZEhJ8i10Ag/8330oLCyUH//3Y+H3+yGtmp9wres6YrEY2rVrh44dO8p169bh22+/FbquIxAIIBQKoXHjxhg3bpzcvHkzbrvtNpFIJOB2u1PC+6GpKkLhMHqe2EOOGvUUVFVFIpFwKomlpafjxRdfwieffCb8fi8sS+Jg7/JsIdemTRt07twZZ555pgiFQtizZ48cOHAgJkyYgCuvvBLPPPMM3n//fbFnzx5566234rXXXkNOTg4aNmyIiRMnIi8vDwAQDodx2mmnyZ49e+LUU08tY8nff//9ctWqVXj++ecFAMydO1eeffbZctKkSSIYDDo5QYqi4Prrr8cTTzyBKVOmiN9++02+8847GDVqFK666ioZCoVw2223Ocf2+Xz44YcfxHfffWf/XV555ZUYO3YsrrzySrls2TI888wzAgCmT58ue/bsKTMzM7Fnzx48+uijAgC6d+8u+/XrJ1MtRI8QchT7zaH+YGXE7dUU91JFJ21X5VvE2pyQXrpq0L5/SO2bC8l4eIlAwI///vcz8cyo55CWlu7Mh2Syt47HHn8YA/r3k5FI5IDJwjVFcAkhEIlE4Pf7cfnll8u8vDw5bdo08csvvwhFURAMBhGJRNC0aVP897//leFwGNddd50oKipKCfFhJ02HwmF079ZVvvTSi8jMzEQ8ngy9s0wTGRmZ+PCD8Xhm1HPC6/FASoE/Wx6klPB6vVLTNMfw3rZtG9q0aQNFUTBu3Dicd9556NKlizz33HMxYcIECCGwdetWDBs2TCxevNjpWm9ZFi6++GJ89dVXuOiii+Tdd98t69evDwA44YQTMGfOHCfpe/369ejQoQMAIBqNIhKJIBKJIDc3F40bN8bSpUuFqqpYt26dSCQSyM7ORufOnTFr1ixcf/318rrrrpNebzKx3uPxoEmTJmjVqhVOPPFEjB07FgBw7LHHYt68eU5y+rJly9C8eXN06tQJM2fOdD6fM2eOI6LoASGkZtmFVS5ACCGk9iCc5dGyJHw+L1555VXx1ltvIT09vaRSFWAYOlRVYOQTw3HeeedJuwldTTKy7OaE0WgUPXv2lJdeeqlcunQpJk2aJEKhEPx+v1OeuE6dOhg7dqz0er247rrrxIYNG5AqeR+KoiAcDuOYY7rJl15+Edl16yASiSCZG2EiPSMLX3/9DR577F8i2VtFLREf4qBbqWVZ8Hq9WL58uSgoKMCHH34or732Wvl///d/zrj+8MMPOP7443Hffffh5JNPxuzZsx1jQ1VV+P3+MsZH/fr1cdVVV6FNmzbo2LEjJkyYIG3PVGFhoSNyduzYAdM04ff70blzZ9mlSxfZqFEjAEBxcTF0PdlEUdd1bNmyBdnZ2bJx48YYPHgw6tati0svvRSjR4+WhmHA7/dj+PDh8tNPP5Xp6emYPHmysI0i0zSdqms7d+6E1+tFw4YNy3weDofRsGHDlDWkCCEUIIQQUq5LZNK4FvB4PBgx4gnx4Ycfok5WFgzDgKqqJbH5Kp568glcdPHFMhwOJyVMDRAhqqoiHA7D7XZj8ODBskmTJvjwww/FokWLRCAQcEq0xuNx+P1+jB07VtapUwdXXHGFWLVqFVIlnEYIgXA4jBNOOEG+9dZbaNigISLRCFwuDaZpID09HT/MmIFh9wwT0WgUqmp7MySAPy/gous6Bg4cKFasWIFevXph8uTJmDNnDnw+H1599VXccsstGDhwoLj77rvx/PPPOz1UbAO+NGlpaZg0aRJGjhwprr32WmGaJvr16yfte2R74bKysqDrOho2bIghQ4ZgyJAh6N27tzQMA8Fg0OnW7nK5kJWVhXg8LurUqYMxY8bgySefFAMGDBB5eXk4/vjjZX5+Pu69917Rp08fMW/ePLzxxhtSCOFUvFIUBYqiICMjA7FYDJFIxKmSpSgKNE3Dtm3buJwQQhwOKwekdAnAiqJ0wlx5HrMizrsix2Pft0SVbcwc6C1VbXads3RvrbvjZe63HTtvmRL/fPBh4fMHZL9+/VBUVJAUIaYJ1aXiiSf+Bb/fLd979wPh8XjtI0AIiery4te+FiklwuEwunfvLnv37o2ZM2di7ty5wu12O8LCLrPq8Xjw9ttvy2bNmuGyyy4TS5cuRVpamtOQsKLW7ooXHgrsRpPnnPsX+dhjj6JO3TREwmFomgu6oSM9PRPzFyzAHXfeKQqLiuDxeJ1eLfvOlQNhWRZcLhe2b9+OYcOGCQC44YYb5JYtW+D1etGkSRPMnDlTAMCsWbNEs2bNZJ06dRyD3e4NY7N+/Xps377d+XtBQXIObt++Hc2aNXN+NicnB5s2bcKqVatw5513OjcmIyMDiUQCGRkZ2Lx5M9LT0+H3+7FhwwasW7cOBQUFAJJhW1u3boXf74dhGM75/Oc//xH/+9//JABs2LABDRs2dL6zSZMmmDRpEjweD1q3bu183rZtW/z4449cVippr+Y48JxqwvkxCb0aTwwauoRUDxFiP5OqpiGRiGPYsPuEqmryvH7noqCgAIqiwjB0CGFgxMjhMA1Tvv/+eOH3B0qeZThvpsu7QeDhYnttdF3HpZdeKuvVq4f33ntP7Nixwwn3sSsuxeNxuFwujBs3TrZu3RpXXHEFlixZgkAgAF3X92s8V7PERzJ/Q0oLbrcLN9xwLZo0bYwd27fD4/FA102kp2dg8ZIluP32v4mdO3fB7/fBNK0/nCcHwjRNnHrqqTI/P18cc8wx8tprr8U111wjdu/ejd9//x3vv/++fP/993HFFVfg999/x9atW+HxeGAn96elpTn37s0338SYMWMwe/ZsmZ2djYYNG2LKlCli5cqV8r333sOkSZNkjx49YJomvvzyS+H1eh1vh6qqKCwsxBdffIGRI0fKu+++Wzz11FNy8uTJiMVimDx5Mu6++26sXbtWnnvuucjIyMDs2bPFwIED5bZt27B+/Xrx4osvyhkzZkBKifHjx2Ps2LGYPn26bNu2LerVq4cff/xRbNq0CRMmTJBTpkyRgUAAbdq0wUMPPSRSpVABIaQc1uAj2TzYE6Tij7uvAKkOmzsFEceBoKQqUhwejwcjnxghBwzoj8LCQkhpwR8IYOniZbjttjvE5s1bSpKzJeLxmCM67KZxVWGI2VWZ/H4/LrvsMrlz505MnDhRaJpWJpHc7nOhaRrGjBkjW7VqhUGDBonly5c7TejsxPWa8AZWUVTYng67s3jSsyChqgpisSjat2+HV197RTZu3AjFoRAyMzKwcOEi3H7b38T69RsQ8PthHsE9s/tu3HHHHfKEE05AJBLBv//9byxYsEB4PB5kZ2fjn//8p2zdujVWr16NRx55ROzevRsulwuxWAynn3667N69O0aNGiUCgQCKi4vRr18/edlll0HXdbz00ktYuHChKElQlwMGDEA4HMaoUaPE2rVr9ysQIKWEpmm4//77ZcuWLbF06VI888wzwj7PoUOHyl69eqGwsBDPPvusWLVqFYYMGSL79u2LeDyOlStXOlWvYrEYLrzwQnn55ZejqKgIzz77rFi5ciVM00Tfvn3lkCFDEI/H8dxzz2HhwoWidDNFUn62As+1evbIqI49SarT3KEAoQCh4c1xIIdtVAokEjrcbhf+9a/H5EUXXwTTMLB5yxZcM+Q6sWrVavj9fgDJUJa8vNY444wz5NatWzFlyhQRjcbg9/tKSrhWzpy1q1zl5ubisssuk9OnT8eiRYuEXWHJ3owURUE8Hofb7caYMWNkVlYWhgwZIrZs2YJgMFimI3ZNeFZLdyDXNBWGsbdTuMulwbIkFEUgEoni+BN6yFdffQWNGjXC/775H+666x6xa+dO+Pz+A3g+Do/SXdABON6m0p3Ek+eo7e05U1IW2TRNeL1e5/6U7mIOwKmSVbo7uqqqcLvdBzUySp+Px+NxwvJKf64oCjweT5njlv55e06VHm/7PPf9HbtYAddPChAKEAqQIxYglWWEUYhUT8OXGwjHpZbfaQDJPArDSDaoe+yxR+U555yLoUOH4uef5wi7gVssFkPXrl3k6NFvIxgMQtd1bN68GcOGDcOCBb+K0t6EisRONm/Tpg0uvPBCOWHCBLFixYr9ksjtnA+324333ntPSilxzTXXiKKiIsfzUVMMHVVVnQaC5557trz44otRv359hMNhTJ06FR9++KHIzy+Az+eDaZrQNBXhcAQDBgyQ/fudh7vvuVsUFRXB67XDrg4t5+PgolUpk39jeyVsj8ze0s/Wfjln9uelj1Ua+99Kf/5nJcTtsKx9v7P05/Z5lj7uofz8H50jqX0ChB3QKUAoQChAaGhzXMhRYxtWVskb6gS8XjeaNm2OpUuXlSpLK6DrCbzxxhvy+OOPxaBBV2H37t3i/vvvk2eeeSauuOJKzJ+/QAQCARiGUWHzx35jfswxx8gzzzwTH3zwgdi8efN+4kNVVcRiMfh8Prz77rty27Zt+Pvf/y50XYfH44FpmjUmN80WUhkZmRg16il53HHHYvr06diyZQuaNm2Kv/zlL1ixYgVuueV2sWHDethd3O2cECEAyzLhcnmce7l3u7SOep2oTkbjgc7nYOdYU0LuKEAoQChAKEAoQFLcwKXRzbGozQJEiGQlJcsyoesGPB4vpLSgKMkmholEAmPGjJZNmzbB2WefI2KxGKQE3nzzddmpU2ecf/75Ij9/DzRNq5DNwPZ8dOzYEWeccYYcO3asKC4uhsfjccJh7FKsoVAIaWlpGD16tFy7di3uvfdeUTocqGbN7+Sb+FdffU3m5bXG4MGDxLp1G5x/zctrjQ8//ECuX78RgwYNFJaVLBQgpSi5TstpRLl3qzw6AWJ7BJLeFs3xItgeELusc2nPhV0wwC6HXNqLYOcRlQ6dsz0p9npki8aDnU9pD4dlWc73lD7H0h4Q0zThcrnKfG/p8y+dF2SHaNmw+zkFCAUIBciBdtIjOvHK6I5eUcetiPOvjA7p1a0cLN+GHXhesZN6KmM5RqiUKDHkFXg8LliWDssyEA5HIKUJKS28/vpraN68OQYMOF9KmYzxf+KJp8T338+A2+2psPlhez6aNm2K3r17y3HjxolQKASv11vGk2GLj7y8PLz77rvyhx9+wLBhw4Tb7XaMzZrWWDEWi+PCCy+QJ510Iq666iqxbt0GBINBBAIBBINBrFy5CnfddQ9OPPF49Op1qozFYk5JXimtkvsqywia0vf9SF5O2P0xNE1DOBx2cjxM00Q4HIamaYhEIk6DQLuBn90EMnmOwjleOBwu81kkEkEoFEI4HEY4HEYoFEI8Hj/gvbNzN6LRKFwul/Nzdrd0t9uNcDjslFmOxWKIxWLO56WLEJQ+f8uyHCESiUScc7F74+wblkW4/3Icai9H7AGpLCO4Jh6/sjZrhmTVoAeNY1QL7nHybbLH40WfPqfJ+fPni+3btyORMPCPfzwgBw8ejAsuuED8/vsKeL1eJBvaqU74T3nOEbv5XVZWFi655BL50UcfiT179jieD/tn7O7fPXr0kMOHD8e4cePw7rvvCjtBuiZu7LbwGjt2tHS5XBg4cJDw+/eGm9lv6E3TxLff/k9+9913eOSRx0RFNVW070Xz5s1x3333yaysLKxevRpPPPGEiEajcLvduP/++2Xr1q2xc+dOjBgxQtgdxe+++27Ztm1b6LqOESNGiJUrV8LlciEajeKSSy6ReXl5eOqpp4RlWbjzzjtlz549kUgknPs2evRoTJs2TXi9XsdrYVe76tOnj7zmmmuQnp6Or776Cm+88YY45ZRT5NVXX42srCxs2bIFI0eOFNu3b8dxxx0nb7rpJqSnp2PDhg147LHHhN1sMCsrC8OGDZMtWrTAtm3b8OCDD4ri4mIMGzZMdu/eHZZlYcuWLXjkkUeEPedpMNYuw7umvaymB6SS1mo+wjV30eEiTkj1ep9jmiY8HjeeeOIJ9OnTRyYSBoJBP5555lmxfPlyPPbYY9LjSXo9/H6/00m6vAWqHU5zwQUXyKlTp4pdu3aVER+lGxFeccUVcsSIEXjkkUfw7rvvimAwWKM9d5ZlQdMUZGfXRTweh5TigOunZVkIhUJwu90Vup4KIWAYBp544glZVFSEe++9V9SvXx//+Mc/ZCwWw8iRI2VOTg7uueceoaoqHn/8cZlIJDBixAiZl5eH++67T/z666947rnnZFLgejB+/Hj5+OOPo2fPnjAMA263GwsXLsTXX3+NL7/8ErNnz8YZZ5yBnTt3ljkXu7xy9+7d5RNPPIH33nsP9957r/jhhx+EEAINGjTAhAkTcOedd4q0tDSMHDlSGoaBcDiMt99+G8OGDRPNmjXDgw8+KGOxGFwuF9544w1ZXFyMe++9V7z55pvQdR2BQACXX345Zs+ejcmTJ2PmzJmO14T7FiEEKIdGhBWdlFjRHcErsvN6RZzvvsesjO70VX29qSQaOUapfI8tuN1u7Ny5Gx988AFuvfVWfP3119ixYxcAYOzYsXjppZfRrVs3OXv2bKf87aGuUbZosP/sO49K/z0Wi+Gqq66Sa9aswYoVK8r07rBDejRNw8MPPyyPO+443HTTTWL16tWwE+JrMsmwJgtbt25Hw4YNoCh7u78nxYmGRCKBnJwctG7dGmPGjKnwZ19RFNStWxcvv/wy1qxZgxkzZqBPnz5wuVzo1asX/vrXv4oNGzbgmWeeER9//LHMzs5G27Ztceedd4r169fj2WefFeedd55s164dNmzYgNdffx0+nw9Dhgxxrvm7775zJsDQoUPla6+9hkWLFolgMOjkcdh5I9dffz1eeOEFTJkyxfkdv9+P8ePHC1skjB8/HnfffTcAYMmSJcIWr7NmzULPnj0BAGeddZYMhUJ47LHH7OMIVVXRtGlTpy+IfXyv18u1j9TKPb86Hasij3nYazWnCSGElJ8I8XhceP75F8TWrVvx4Ycfyu7du8lAIIAOHdo7Sb12/PyhvnCwLMuJ2QfgJAsfyNCNRqPo3bu39Pl8mDp1qlPqV1VVJym9RYsW+Oyzz2TTpk0xcOBAsXr16mrb4+NICqRICXzyycc49thjcckll8hIJIJEIgHDMBCNRpFIJPC3v/1N7tmzB999953QNLVCPSAA8OSTT+Lpp5/G008/La+55ho89NBDomnTpk6+hn3v7FApKSUuuOACCQAdOnRAmzZt0LBhQxkKhfDtt98KO3zPJhAIwOfzITc3F1dffTU+/PBDYVc2s3M7iouLEQgEkJOTg86dO2Ps2LHy/fffl507d5bxeBxpaWlOT5FBgwZh9uzZAIA6derg+uuvl48++qg87rjjMGzYMAEAeXl5iMViGDVqlPz000/ljTfeKE3ThGVZaNCgAb744gs5atQo2aJFC+i6zhwQQoiDxiEghJDyEiBJcRAKhXDTTTeJ4cOHy/fffw+6rsvs7Gx88MGHWLhwobDDsA7FeE0kEmjUqBEGDhwov/vuO/zyyy/CMAxomgb7OLaoMQwDPp8P5513Hp577jlhJwbbeQOmaeLiiy+W999/Pz766COMGjVKKIriiI/q+IY6Ho/D5XKXnNufj5lpmvD7vZgy5Rvx1ltvyZdffhn16uXIzz//XMTjcdSrVw9Dhw6Vp512Gm655Sbs2pUPv99bqtxuxYiQ448/Hhs3bsTWrVtRWFiIrl27yoULF4rCwkLHO2UYhpP4PXLkSLz11ls49thjpa7ryM/Pd5LFbUN+X89qNBrFLbfcItetW4fff/8dHo8HzZo1w6mnniqFEFi1ahUWLFgg+vTpg0gkgscee0wMHDhQjh07FvZniqLgmWeekYlEAsOHDxd2M8PMzEw0b94cfr8fzZo1k2vWrBF5eXk4/fTTMXjwYFiWhXHjxmH16tVy1qxZ4qabboLb7ca5556Ljz76SJ5zzjmiqKiIIoQQUn4CpDLDgCoyZKqiOppXxthUlxCfg9WOJ388RhynVCBpWFlWMtxk16583HjjUNGz50myS5fO2LhxI6ZP/17YYUCH+sbdNjjz8vJw2WWXYeXK5fLTTz/FN998I3btygeQ7EwthEA8Hsdtt90mf/75Z2zZsgWBQABCCIRCIWRnZ2PEiBGyffv2uP/++zF16lTh9XqdEqrldf0HmPE43OZ9yZK4ybW+SZPG2L17F3RdL6lUJQ7hGRNwudwYPnyEKCoqknfeeQduueUmGY8n4PG4sWLFSgwceCV++22xSHakrxjxYXs1OnXqJK+44gqccMIJoqioCF9++SXeeecdef3118vs7GxomuaEx/n9fng8Hkz7//buNriuqt7j+G+dhyQnpUMfyE2fIkwJFy4iDLQ+MTiWmraWQbxUyy33zR15oS8QZcSCMzqKTnsHmeKA4wzojCUMqKBzMVdrW1BurjSF0gGvVqctkJjQNqmlaSlJk5ycJln3xek+nKSkTU7Pw9prfz8zHRyoZ6/132vvvf57rb1Wa6tZsWKFbrjhBvvSSy+ZH/7wh7anp8ckEoncSln5xxkZGVEymdQtt9yiBx54IPe9Rf7SuEGS88Ybb2jDhg2mvb1dGzZsMJ/61KdsQ0ODurq61NzcbPfs2aP77rvPJBIJxeNx9fX1adOmTUaSVq5cab///e/rYx/7mPr7+9Xc3Ky2tjYjSU899ZS94YYb9MILL6i1tdWMjo5q69at2rJli7355pttc3NzyT72j/rzg7K6U17Xp195lYAAAN4zNmZzq1u1tbWZtrY2SVJVVdW0ko9gj47u7m7dcccd5sor/0Vf//o99pFHHlZHx9/tCy/8j3796xa1t7ebvr4+NTY26tJLL9VPf/pTM2PGjNyUnqamJnv//ffrzTff1G233WYOHz6sYKUrF3eoDpZ+veaaq+3mzZt1551f1q5du0x2k0c7hfiPnd4JfVQPPPCgefrpp3XdddfZ2toZ6uho1yuv7DbW2rzNGEuT/Oef55qaGtXV1amvr0/z5s2zs2bN0pEjR0wmk7FLliyxzz//vFm6dKltb2/XkSNHVF1drY6ODnV0dJi1a9fagYEBdXV1qba2dtxSvYHh4WEtXbrUJpNJvfjiiyaZTCoej+vNN9/U66+/Pq6C+/fv1/XXX2/feOMNM2/ePF144YU6dOiQvvnNb9q2tjY9/PDDRlJuRC2ZTOaOefLkSY2MjMhaq1dffVVr1qzJ/e6ll16qnTt3jitbKpXSrFmz1NPTw0foAEhAAKC0SUh2WlRtbW2u41XI6lLWWiUSCVVVVWnv3n3q7+/Xyy/v0ubNj2vdutv1xBNP6Itf/KLduXOnWbZsmW1tbc19K9LY2Ki7777bXnnlldq0aZNaWlpMIpHQBRdccNZN6grsbhex4z6mRCKut946YIaG0vbWW/9VL7+8a8rHCOIdj8dUW1urAwcOqavrwLgPouPxeMnfxFtrVVNTo3379pktW7bYLVu22I6ODl1xxRX6wQ9+oCNHjuiRRx7RQw89pJaWFrts2TJ997vf1cjIiFauXGlXrFihsbExXXvttbrrrrvMxPYTTGcK6rt06VJ1dnZqYGAgl1xVV1eP+2ZoaGhIP/nJT7Rp0yY1Njbaj3zkI/rFL36hvr4+NTU16fjx4/rEJz5h4/G4Tpw4oTvvvNOsX7/eLliwQB0dHVq7dq0efPBBxWIxbdu2zaxZs8Zu3rzZDg4Oavbs2Xr66afNNddcY++55x79+c9/1urVq7Vnzx794Q9/MPkrsQGItvPeB+RsD4CSFTrEu7CXsw7lPE7Yy0SMUGqFTh8NPi7PZE6psXGxfve7LTa7ZO7PjTFGV111le3p6TEnTpzQQw89ZJ988klJ0po1a7RkyRK1tbXp0UcfNceOHVMqlRq3gdxk7W6ylbam2m7zP7KfuHLX1L59saf3KBnSvfd+3d5+++266aabzNGjR5VMTm/zxqAc+d9NVKITnE6ndeONN9rrrrtOO3bs0O7du01tba0GBwf14Q9/2H7yk5/U1q1bzd69e1VdXa36+nrdcsstNp1Oq6WlxfT29uZWkhoZGdGcOXNUX19v9+/fb4Id0xcuXKiqqip1dnZOOtIWfCty+eWX6zOf+Yx97bXX1NraalKplK6++mpbV1eX+3vDw8Nqa2sz9fX1uummm6wkPffcc6a9vT03EpNIJLRu3Tobi8X0zDPPmHQ6rRkzZmj16tW2oaFBwe8H0wQZATn/+wjlLM0xXJuCVcrNuF1oG6FMQPh9EhASEERJsLneV796t73jjv9QU1OTeffdPiUSSQ0ODqqmpkYjIyP62te+Zj/+8Y+ru7tbf/rTn/T888+bQ4cO5T5YD0Y9hoeHlUgklEgkzmh3+Q+n6SQhwepNwfScfMlkMrer+hQfUYrFjNLpjBobF2vbtu32G9+4T7/61X8V8A2B0eRTrMbKek0HI1OSciMUwbkN/k4qlZK1VqdOncp9mzMxfkESMjIyourq6ty/CzYhPNciB8G3KcHfqa2t1djYmNLp9Bl/t6amRqdOncrFPBaLKdjYMNjJfXh4WFL2W6Tg32UymdxvBHUCCQgJCAlI6BOQUh+HBITONTGDSw/zWCyu7du32R07/qhvfevbZsaMlEZHbW5/kGC1q7lz5+rAgQO5qVv5016Gh4d1ySWXaP369faxxx7T3/72t9wqR0E7C5YKDqbtTDUJSSTiqq1Nafbs2aqvr7fz58/X3Llz9NZbB7R796vm6NGj0+iIZj9cz3bah9XcvNmmUimtW/fvpqamZpoPUDcSkKDzHkz9yk/GYrFYbp+S/CQjOAfvN10uGGXK/538Uaep3FOCfUHyN6jM/2A9f4W1ycqSvypXkIRK2dXg8tsTSEBIQEhA8o+fCOsFSIcMgOdpp7IjAdk35J/97Gft/Pnz9Mtf/mpcJzG/w5rJZHTw4MHcVB1r7bg312NjY2poWGTXrv28nnrqydzyr5KUyQxr/vwF2rhxo3388cf14osvmlQqdc7RhuBt+uc+t85+5Stfye03Mjyc0ejoiObOrVN/f7/9zne+ra1bt+USp6B+Z0sasmUzeuaZZ/SjH/1IS5Zca1977f9Of4w+nU6tG522/D0+Jv77ifUJRpPO9hyc+DvT6VgEbSN/etxkMT1bWfLbWD5WugJw1mdHKB/LZVrut5RZYql/f+JxXHprkl8mhuULixlxi0Ly8d7b7FgsprVrP6e//nWP9u7dd3rU4swOYzweH7c3yPstzz1vXr16erp1+HCPCUZPst+EjKm+vs42Nd2omTMvmHIH/7035VYLFizQ9773Pa1YscqsXLnKrFixyqxa9Wmza9cr+vGPf6xVn26yAwNDisdjOnsTNpKyf6eqKqmXXnrFvP3227r11jUFtH17lj+VuZZduq+U65kKv57jYWnj5S4zz+ZzPy+CP+wIBADO3qxjSqfT+uAHP2ivv/56tbS0KNiE8P1GgqfSSVm4cKGGh4fV399/xo7qdXV1ymROqbOz00z1YRr8nc7Ov2t0dFTHjh1Tb2+vMpnsdwMHDx7UXXd92bS17dC9967XjAtSU94VO1iG+N13T2jr1q1auXKl5syZc3pPEDrNABBWJCAA4GwCkv3nZZddpv37X9f27c+Z6X3MfaZFixbp+PF3dPLkyXHLuAbJSTqd1j/+8Q/F44kpTXfNLncb18GDB00mM6zFixfLGKNEIvsNwIwZtZKkn/3sZ1q8eLEu/+fLbCYz9QQiGAFqaflvzZw5Ux/96EctCQgAhFvJvgEp187cpT5OuX6/XNPK8o/lypKI7J5eeNyIk9/GxsZUXV2t7du3mz/+8X81MHBS8Xi8oOs2uwN7XA0Ni3T4cI/S6YwmftC9aNFCHT16VH19fUok4pNen2c8SBIJ9fb26u23j+riiy8eNxIzMpL9zqS7p0fWWtXV/dO0y51MJtXe3m6+8IUv2I6Ov5uqqqpx368AcOe5FLZjRGnalAsfoAdlYAQkojcIviPgXCI8RkdH1d/fV3CHO9j3o6YmpYsuqtOJEyeyD4Dc3hjZvzNv3nwdOnRImcypKSc6+fuUHDx4UBdffPG4/x5M85o9a7Ykq+PvHJcx03vJYExMktXLL+8y77zzTm6FJQBAOJGARPgNBZ1WIByCpU7P55LNJgnDOnnypGbOnDluuVRrsx+sX3LJJeru7g6OOq3yWSsdOHBAixcvPr3cbnaaWDqdlrVW69b9m7q63tL+fftMMlk17VWsrJVqa1O5pWMBACQg5+zwlnPFp1L/fimOUc4VjsLw5pAVn84/ZsQv1GdTZ+5REZtWUjCxbQSjFL/5zRYtX96k5ctvtAMDAxoYGNDQ0JBuu+3z9oorrtBvf/vb0/eI6e823tXVqQ984AOydlSDg0Oydkx1dXN1//3322XLlus/Nz6o/v6h0x/Rj06z/kZjY6zahOjdy8NU7qifN5f7sq6dnwSXOgD4L/ie5IknnjANDQ320Ucf0+7du+zhw4d10UUXafny5WpubtbOnS+ZmprqgkYZurt7VFOT0saNG+2FF16oBQsWaNGiBvX2HtOXvvQltba2mmDXbQBAdJVsJ/T3PZhHu3/7slN6pY/pQ9lCcaETP+i9nc5PnTql5cuX29WrV2nhwoXq7+/Xs88+q9///vcmkUjmplRNVSwW0/BwWh/60FV2w4YNGhwcVG9vr7q6OvWXv/xVO3a0mcHBQZF8AOcW1pGEcpWbHdDD3a5yCyJVqoPiSzLiUyIStk4qnWriicLP9dDQUO5/Bw+EVKrm9AOisIdKPB5XMpnUwMDAuJ2zq6qqlEgkSD4ATxOQcpa5mMdyMWnwOQEZt7IsCQgJCAkIiGf0xGKx3IhIcO7PN0GwVrJ2TLFYLPf7we/yLRJAAkICQgIS4BsQvH9mSmcU8Fp+slGsB5MxUiyWXb6X0Q4AwGTilexw+nZMn76jCUsiQqJEnAEg7MI8QsjoB99+FIJ9QAAAAACUDVOwEGpMGwMAAAgXRkAAAAAAlE1FvwHJP65vqz35+D2IK8f2oXy+IM4AUBhWhqtcrIh95c9fzJVC0RgAAAAA/znxDYi1ljepKGm2TfsCAABwQ8WnYE3ky1Ss/Kllvmy66Moxo1hmYgwA3CddEtaZK8y4cQOrYNHAi1ZPOp2YrP3TNgAAQIBVsEhEAAAAgLJxbgpWpcpT6uOVe7UvpmNFp+xhRtwBRIkvLyXDuvu5q+WK2i7oEiMgZW+ojIgAAAAgykhAQpotA75cE8EfAAAQDc5Owcrn47Ql36aYuX78qJXbN5wHAGHFCxZ34halc+FKXScrByMgAAAAAMqGZXgnydJ440psAQAAUHyhmIJVyTKWa3WsKMTSlwSEBIr4A0DUhH36kourVvm4+tVUn9FMwQIAAABQNoyAOHTMch3LpelQjIaAcwEAQLSexYyAAAAAACibUI2AFJJhhfGY5f7uxJVzz2gIODcAws5am7vnsARvYfELw29GKX6lKAcjIA6d1Ertls4NEgAAAOVCAuJYclCp5IMkBAAAAOUwbl5CGKcp+P5heqWO69LH6caY0CVITPnhPAGIDp9f4pWzbq5Pv3L1t1xsh+cqS5wEJDzHjlIC4lsHkY4u5wgAAGQxBes8sjrf33jk/6lkjH2IcyVjCQAA4JL4ZP+BVbGmdqyo7GTu0vF8elMd1IW379xrAISL7y+UfHn559pv8SIyixGQIjSkKDQm3uCX9uZIXAEAAAkI6ECSDJW1DQEAAERB/Fx/IazTDSqxaWAlV+SKylQwX9qn73WJOs4l4I+ovSTyZS8yzpvb5WAEpMhBZx8PnG/74VwCAACfMQLiyfGjOgLiQ1uNet2igPMHAMA0EhBfHqJRSAiiPh2LZAScVwAoHCtfhTMmYZt+JTEFq6QnoVINgik8AAAAcBUjIB4e34Xz5HJb4cN1cC4BTIaXeEDpMQJSwhsYIyAAAADAeAW/cuPjdI4d5vbh69tm3qJH4KbNOQaKhhd2LLsb1t9zsQ3zDQgXuRN1dXlZWR46AAAAlUECUuYObyWnZbHHhBvnAgAAIMrihf4fwz4NwJUpSVFcrtfVY7N0L3w5xxOTa84/ooyXTcSl0rEh1iQgztUjynt2sFIWdQPnHwAQPZGcgkUm6sYqXZyHyp574g8AACqhaK/CmJJVhGwwFit7kpQ/HavSHVKXyuJb+45avUCbgf94iRK+2JXiuGGYLuX7CliFlCNerIOTgFB3n89DFNoHHUvQTgAA5UAC4mj5K/lxOueCDhidTNBOAADOJyC+PZSi+nH6xOMbYyL9ofx04kRHE6AtofiYahX+WLL5oL/XRaHlIAFxvA5Rf1iHKQnhPAC0JQDAubERoeOiulpR/kpZrtc/CueHlbMAAECxlPxVlE9vu6K6cZ9r55FREeoJ2hXCiZcY0Yl1qY/P9KtwtzNGQLiRTPn4vAEHAADA+YqX+gCMgPhXDkZDon0dUF/QzgAA54MRkJBgBAQAAAA+KOvrI1/eVjECQCy4Dqgzwtn+pvISZWJ7LeaLl8nKMtUylupaKqSO040ryseF88HSu/6e22KUJ17OQpKAkIDQ1uiYk4wAhV8Xxbx+SBoAVEqCEKBYDzA6lqDNAG5dY1xnAFwUr9SBGQ3xtywunluW7uVaAoCoJJ2+lsPlUTumXk0PH6F7dgOq5Ifi+ZsHInznDwAAoBwYAfG0Tq5tmkhsuD6oPwAAqGgC4mNHI6iLq51tY0xJy3a233cxNi6Xiw459QeAs/FhN+xK/T4zDSofOxIQz+szsTyujYxwvuiAEwsAAKIl7lJh2DW9dOWw1jpRJpbtpdzUHwAAEhA6ExGrm4tlcX3kiHZFLACg0lycOlTKMoVlqhQxmD5WwYITFy3zMVGMtsQqYgAAuI8RkIjXjb1D/GybTM1iNASAH3ipAhIQOhJFrRPTjsJz3sPeDumQEwsACFNCFIaVr5h6VTimYAEAAAAoG0ZAEIq4M4WNa4q4AIgCplwhChgBAQAAAFA28bAU1Ne3k3wPEu6y8W2IvL4uAaAcwjDqEbbdzsMcD1djUcxykYBQNzr9tFE63cQGALxJDuA+EhDqR6ef9konmzgBoFN/1nJaa7n/oXjPUjoA1JFOP22WTjYxA0DSUYmyluo4Yftdl9tIKcqUCPsFzEOf+BMzyg8AAMIjQQhAJx8obvubiPYIAMB74mGvQFQe7GFYLcsYk/tDu4hG+6VjTfwAnB3Trsp/PKZfuY8REG5kXDiOxIzOKAAAiIK4T5Xh43TKGeay+dR+SaaIGRBVvIwDpvDM4wFOXUlAwlHG4N+F8eFG55r4ASQclL/Uxwvr1CsX21Gpy8MICPWN9LmgnJSfWAKIavIBVAoJSEhveK5+lB62cxOmNuNL+6YDTVwBnxIONugDCnhm8TCmzpQzvG2GkREQV6D8SUeY7w35O5v7Esew/rbL7avU5YpxawE3cwAAovP85TmMSov7WrGJbwCjttwpoyHRiJ9PZWZJYtoM4FInnfoBpcMICLj5AQAQoecvz2FUWmRff/GNCOXzuZy+tW/e1BNjoFSdceoa/mOX4hgsvVtacUUUCQhljVLb8bW902kmrgBJB+cU4ZMgBEDhNzg6aojaA502D4DEA+cr8k+SqD5Mw1ZvPlanzXMtcy4AOqDuxyXsU5eiOPWqEuWKR/1CjfqDkg40saSdg3MBkHQA5cQUrIjeqOgElPamH5b4svQtuGZABxpAuXHHnywwfKROmSMcW5/bPx1dP88lyTSJBnH1//hhn3rl0jVgjKnossyMgAA45w2SDh3odIHzBKBY4oRg6pki9aXMxNavts10IO7rILEg/uD+RwLCyaLuJCPEmXoiEu1nqh3IqSTNxUzAQdLhUvvxYdqVy9dbpcpFAkInhASEclIXrn0AJB8ACQidEOIQtTIzGkKdAcD1xINECCQgFe500PkgGSGudMxJRgBEoYNf7nKV+nhRW/XKNTFCUHhjolEBAAAA08MIyHngjWf440GZKT/1B1BpLr/QzH/pyv0LxcIIiKc3DAAAAMBFpLLFDCZvdik/Zeaaof4ApsD1l5iVKh/ffkSjXEzBojNBLEJcfpbx5foBQKJB8oGwIQGh00A8PCk7yQjXDgAUKwkI/lmO+xGJBwkI6EAQDw/K71v743oiFgDK2/k3xpT0flPOe5lvSwiTgIBOA8kIZaRuxAig4w7iiGlIEALA/xu6Tx3S/LrR0QYAEg+EDyMgFUCnyZ94MJpDXYgNQKeZelBXl+PqYrnYBwRcGPCmHQV/AAA8c+EuRkAqLOpvJn2aTkP5qRsxAuigh6FuldrVnOQHuWcOIeChT1xKX5f8+oThBkwyAmIGEg3qWaz7x8SlfX2rL5tKTh8jIDzYiRMiG2/aFXECQCcdJCA82OFlnPjYm3pxvQJ0dKNaf5IPnPGcIAQ8wIkNdeFccP0RZ9DRJhZhLg9Tr8JVRlbBAgAAAFA2TMFyFG8Goxcn6kI9QfyjhBEM4ofoYgQEAAAAQNnw+iisJ443f17HxLfzG4X2yjXJeUIWb+ajF9tKlStqx/WpjEzB4iFKfKgP5ae+KOH5n2zDVTrqAKIqQQjgo0rt8opzd6yicF4m1p+2CKAU91PKhbDiqejTyaSTE4nYUBfqDICEo1L3r3Luau5afJh6VTxMwaKTQ2yoF+Wn/gDoNHpXVriLKVgAnHuQRbEzPtl3AgBIOigzfMNTztcTO4UOTP5QKnGiXtSN+gOgA+9iWZl25V9ZGQEBDwM6dqDNAqBTCJTN/wPbym0Sw8VWqQAAAABJRU5ErkJggg==" alt="Shagun Studio" className="hero-logo-img" />
            <button className="hero-shutter-btn" onClick={() => {
              triggerShutter(() => {
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              });
            }}>
              <ShutterIcon />
              <div className="shutter-text">Click to explore</div>
            </button>
          </div>

          <div className="cam-info">
            <div className="cam-info-item"><span>f</span>/1.4</div>
            <div className="cam-info-item"><span>ISO</span> 200</div>
            <div className="cam-info-item"><span>1</span>/1000s</div>
            <div className="cam-info-item"><span>85</span>mm</div>
          </div>
        </section>

        {/* TRANSITION */}
        <div className="hero-gallery-transition" />

        {/* GALLERY */}
        <div className="gallery-section" id="portfolio">
          <div className="section-head">
            <div className="section-tag"><CameraIcon size={14} color="var(--gold)" /> Our Portfolio</div>
            <h2 className="section-h2">Through the <em>Lens</em></h2>
          </div>

          <div className="filters">
            {categories.map(cat => (
              <button key={cat} className={`f-btn ${filter === cat ? 'on' : ''}`} onClick={() => { setVisibleItems(new Set()); setFilter(cat); }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid" ref={galleryRef}>
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className={`g-item ${visibleItems.has(String(img.id)) ? 'visible' : ''}`}
                data-id={img.id}
                onClick={() => openLightbox(i)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="g-viewfinder">
                  <div className="g-vf-corner tl" />
                  <div className="g-vf-corner tr" />
                  <div className="g-vf-corner bl" />
                  <div className="g-vf-corner br" />
                </div>
                <div className="g-crosshair" />
                <div className="g-shutter-icon"><ShutterIcon /></div>
                <div className="g-aperture">f/1.{4 + (i % 5)}</div>
                <div className="g-info">
                  <h3>{img.alt}</h3>
                  <p>{img.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div className="about-img-wrap">
            <img className="about-img" src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80" alt="Studio" />
            <div className="about-img-frame" />
            <div className="about-img-accent" />
          </div>
          <div className="about-body">
            <div className="section-tag" style={{ justifyContent: 'flex-start' }}>Our Story</div>
            <h2>Crafting <em>cinematic</em> memories since day one</h2>
            <p>
              At Shagun Studio, we don't just take photographs — we capture the heartbeat of your most 
              cherished moments. Every stolen glance, every joyful tear, every burst of laughter preserved 
              forever through our lens. Your love story deserves nothing less than extraordinary.
            </p>
            <div className="about-stats">
              <div><div className="stat-n">500+</div><div className="stat-l">Weddings</div></div>
              <div><div className="stat-n">12</div><div className="stat-l">Years</div></div>
              <div><div className="stat-n">15</div><div className="stat-l">Awards</div></div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="contact">
          <div className="section-tag">Get in Touch</div>
          <h2 className="cta-h2">Ready to have your love story <em>captured</em> in timeless frames?</h2>
          <button className="cta-btn" onClick={triggerFlash}>
            <CameraIcon size={16} /> Book a Session
          </button>
        </section>

        {/* FOOTER */}
        <footer className="foot">
          <div className="foot-brand">
            <CameraIcon size={18} color="var(--gold)" />
            <div className="foot-logo">Shagun <span>Studio</span></div>
          </div>
          <p>&copy; 2026 Shagun Studio. All rights reserved.</p>
        </footer>

        {/* LIGHTBOX */}
        <div className={`lb ${lightbox.open ? 'on' : ''}`} onClick={closeLightbox}>
          <div className="lb-counter">{lightbox.index + 1} / {filtered.length}</div>
          <button className="lb-close" onClick={closeLightbox}>✕</button>
          <div className="lb-vf-corner tl" />
          <div className="lb-vf-corner tr" />
          <div className="lb-vf-corner bl" />
          <div className="lb-vf-corner br" />
          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}>‹</button>
          {filtered[lightbox.index] && (
            <img className="lb-img" src={filtered[lightbox.index].src} alt={filtered[lightbox.index].alt} onClick={e => e.stopPropagation()} />
          )}
          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}>›</button>
          {filtered[lightbox.index] && (
            <div className="lb-caption">
              <h3>{filtered[lightbox.index].alt}</h3>
              <p>{filtered[lightbox.index].category}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
