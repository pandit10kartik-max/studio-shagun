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

export default function ShangunStudio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shutterActive, setShutterActive] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const galleryRef = useRef(null);

  const filtered = filter === "All"
    ? weddingImages
    : weddingImages.filter(img => img.category === filter);

  // Intro shutter animation
  useEffect(() => {
    const t = setTimeout(() => setIntroComplete(true), 2800);
    return () => clearTimeout(t);
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
        }

        /* ===== INTRO SHUTTER ===== */
        .intro-shutter {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        .intro-shutter.done {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .intro-shutter-blades {
          width: 200px;
          height: 200px;
          position: relative;
        }

        .intro-blade {
          position: absolute;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 50%, 40% 0%, 60% 0%);
          background: var(--dark3);
          border: 1px solid rgba(184,134,11,0.2);
          animation: shutterOpen 1.8s ease 0.8s forwards;
        }

        .intro-blade:nth-child(1) { transform: rotate(0deg); animation-delay: 0.8s; }
        .intro-blade:nth-child(2) { transform: rotate(45deg); animation-delay: 0.85s; }
        .intro-blade:nth-child(3) { transform: rotate(90deg); animation-delay: 0.9s; }
        .intro-blade:nth-child(4) { transform: rotate(135deg); animation-delay: 0.95s; }
        .intro-blade:nth-child(5) { transform: rotate(180deg); animation-delay: 1.0s; }
        .intro-blade:nth-child(6) { transform: rotate(225deg); animation-delay: 1.05s; }
        .intro-blade:nth-child(7) { transform: rotate(270deg); animation-delay: 1.1s; }
        .intro-blade:nth-child(8) { transform: rotate(315deg); animation-delay: 1.15s; }

        @keyframes shutterOpen {
          0% { opacity: 1; }
          100% { opacity: 0; transform: rotate(var(--r, 0deg)) scale(2); }
        }

        .intro-lens-ring {
          position: absolute;
          width: 180px;
          height: 180px;
          border: 2px solid var(--gold);
          border-radius: 50%;
          animation: lensRingPulse 2s ease infinite;
        }

        @keyframes lensRingPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .intro-logo {
          margin-top: 40px;
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: var(--gold);
          letter-spacing: 8px;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeUp 1s ease 0.3s forwards;
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
          height: 100vh;
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
          background: radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.8) 100%);
        }

        /* Lens ring overlay on hero */
        .hero-lens {
          position: absolute;
          width: min(500px, 80vw);
          height: min(500px, 80vw);
          border: 1px solid rgba(184,134,11,0.15);
          border-radius: 50%;
          animation: lensRotate 30s linear infinite;
        }

        .hero-lens::before {
          content: '';
          position: absolute;
          inset: 20px;
          border: 1px solid rgba(184,134,11,0.1);
          border-radius: 50%;
        }

        .hero-lens::after {
          content: '';
          position: absolute;
          inset: 50px;
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
          width: 40px;
          height: 40px;
          border-color: var(--gold);
          border-style: solid;
          border-width: 0;
          opacity: 0;
          animation: focusIn 0.8s ease 1.8s forwards;
        }

        .focus-bracket.tl { top: 30%; left: 30%; border-top-width: 2px; border-left-width: 2px; }
        .focus-bracket.tr { top: 30%; right: 30%; border-top-width: 2px; border-right-width: 2px; }
        .focus-bracket.bl { bottom: 30%; left: 30%; border-bottom-width: 2px; border-left-width: 2px; }
        .focus-bracket.br { bottom: 30%; right: 30%; border-bottom-width: 2px; border-right-width: 2px; }

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

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(40px, 8vw, 88px);
          font-weight: 400;
          line-height: 1.05;
          opacity: 0;
          animation: fadeUp 1.2s ease 1.0s forwards;
        }

        .hero-title em {
          font-style: italic;
          color: var(--gold-light);
          position: relative;
        }

        .hero-title em::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gold);
          opacity: 0.4;
        }

        .hero-sub {
          font-size: 13px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--blush);
          margin-top: 28px;
          font-weight: 200;
          opacity: 0;
          animation: fadeUp 1s ease 1.3s forwards;
        }

        .hero-shutter-btn {
          margin-top: 48px;
          opacity: 0;
          animation: fadeUp 1s ease 1.6s forwards;
          cursor: pointer;
          background: none;
          border: none;
          position: relative;
        }

        .hero-shutter-btn .shutter-svg {
          transition: transform 0.3s ease;
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
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
          margin-top: 12px;
        }

        /* Camera info overlay */
        .cam-info {
          position: absolute;
          bottom: 40px;
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
        .gallery-section {
          background: var(--cream);
          position: relative;
        }

        .gallery-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, var(--dark) 0%, transparent 100%);
          z-index: 1;
        }

        .section-head {
          text-align: center;
          padding: 120px 20px 50px;
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
          .grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 10px; }
          .about-section { padding: 60px 24px; gap: 40px; }
          .about-img { width: 100%; height: 320px; }
          .cam-info { display: none; }
          .rec-dot { display: none; }
          .focus-bracket { display: none; }
        }
      `}</style>

      {/* INTRO SHUTTER ANIMATION */}
      <div className={`intro-shutter ${introComplete ? 'done' : ''}`}>
        <div className="intro-shutter-blades">
          <div className="intro-lens-ring" />
          {[...Array(8)].map((_, i) => <div key={i} className="intro-blade" style={{ transform: `rotate(${i * 45}deg)`, '--r': `${i * 45}deg` }} />)}
        </div>
        <div className="intro-logo">Shangun Studio</div>
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
            <div className="nav-logo">Shangun <span>Studio</span></div>
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
            <div className="hero-cam-icon"><CameraIcon size={32} color="var(--gold)" /></div>
            <div className="hero-eyebrow">Wedding Photography</div>
            <h1 className="hero-title">
              Shangun<br /><em>Studio</em>
            </h1>
            <p className="hero-sub">Where every frame tells your love story</p>
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
              At Shangun Studio, we don't just take photographs — we capture the heartbeat of your most 
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
            <div className="foot-logo">Shangun <span>Studio</span></div>
          </div>
          <p>&copy; 2026 Shangun Studio. All rights reserved.</p>
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
