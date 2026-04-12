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

const pricingTabs = ["Single Day", "Combo"];

const pricingData = {
  "Single Day": [
    {
      name: "Traditional",
      price: "45,000",
      badge: null,
      highlight: false,
      features: [
        "One Videographer",
        "One Photographer",
        "200 Edited High-Resolution Photos",
        "Online Gallery for Sharing & Downloading",
        "40 Sheets Album",
        "Full Video H.D.",
      ],
    },
    {
      name: "Gold",
      price: "85,000",
      badge: "Most Popular",
      highlight: true,
      features: [
        "Full Wedding Coverage",
        "Four Photographers",
        "400 Edited High-Resolution Photos",
        "50-Page Premium Printed Photo Album",
        "Traditional Photography",
        "Traditional Videography",
        "Cinematic Videography",
        "Online Gallery for Sharing & Downloading",
        "Drone Videography",
        "Wedding Video Teaser",
        "Wedding Video Highlights",
        "Full H.D. Traditional Video",
        "12×30 Photo Frame Gift",
      ],
    },
  ],
  "Combo": [
    {
      name: "Silver",
      price: "80,000",
      badge: null,
      highlight: false,
      features: [
        "One Videographer",
        "One Photographer",
        "400 Edited High-Resolution Photos",
        "Online Gallery for Sharing & Downloading",
        "40 Sheets Album",
        "Full Video H.D.",
      ],
    },
    {
      name: "Gold",
      price: "1,40,000",
      badge: "Best Value",
      highlight: true,
      features: [
        "Full Wedding Coverage",
        "Four Photographers",
        "400 Edited High-Resolution Photos",
        "50-Page Premium Printed 2 Photo Albums",
        "Traditional Photography",
        "Traditional Videography",
        "Cinematic Videography",
        "Online Gallery for Sharing & Downloading",
        "Drone Videography",
        "Wedding Video Teaser",
        "Wedding Video Highlights",
        "Full H.D. Traditional Video",
        "2×20×30 Photo Frame Gift",
      ],
    },
  ],
};

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
  const [pricingTab, setPricingTab] = useState("Single Day");
  const [bookForm, setBookForm] = useState({ name: '', phone: '', date: '', package: '', message: '' });
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shutterActive, setShutterActive] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [splashPhase, setSplashPhase] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [menuOpen, setMenuOpen] = useState(false);
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
  background: transparent;
  backdrop-filter: blur(0px);
  padding: 28px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
  border-bottom: 1px solid transparent;
}

.nav.scrolled {
  background: rgba(13,13,13,0.95);
  backdrop-filter: blur(24px);
  padding: 16px 48px;
  border-bottom: 1px solid rgba(184,134,11,0.15);
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-camera-icon {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(184,134,11,0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: cameraFloat 4s ease-in-out infinite;
}

.nav-logo-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--white);
  line-height: 1;
}

.nav-logo span {
  color: var(--gold);
  font-style: italic;
}

.nav-tagline {
  font-family: 'Outfit', sans-serif;
  font-size: 8px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(184,134,11,0.6);
  line-height: 1;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
  list-style: none;
}

.nav-links a {
  color: rgba(255,255,255,0.6);
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

/* Book Now CTA Button */
.nav-cta {
  background: var(--gold) !important;
  color: var(--dark) !important;
  padding: 10px 24px;
  border-radius: 0;
  font-weight: 500 !important;
  letter-spacing: 2px !important;
  transition: all 0.4s ease !important;
  border: 1px solid var(--gold);
}

.nav-cta:hover {
  background: transparent !important;
  color: var(--gold) !important;
}

.nav-cta::after { display: none !important; }

/* Hamburger */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 600;
}

.ham-line {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--gold);
  transition: all 0.3s ease;
  transform-origin: center;
}

.ham-line.open:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
.ham-line.open:nth-child(2) { opacity: 0; }
.ham-line.open:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

/* Mobile */
@media (max-width: 768px) {
.nav {
  background: transparent;
  border-bottom: 1px solid transparent;
}
  
  .nav-hamburger { display: flex; }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: rgba(13,13,13,0.98);
    backdrop-filter: blur(24px);
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    padding: 40px;
    transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-left: 1px solid rgba(184,134,11,0.15);
  }

  .nav-links.open { right: 0; }

  .nav-links a {
    font-size: 13px;
    letter-spacing: 4px;
    color: rgba(255,255,255,0.7);
  }

  .nav-cta {
    text-align: center;
    width: 100%;
    display: block;
  }
}

        /* ===== HERO ===== */
        .hero {
          height: 100vh;
          min-height: 620px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(184,134,11,0.1);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .hero-bg-1 {
          background-image: url(/images/hero-bride.jpg);
          background-position: center top;
          animation: fadeSlide 12s ease-in-out infinite;
        }

        .hero-bg-2 {
          background-image: url(/images/hero-bride-2.jpg);
          background-position: 38% center;
          animation: fadeSlide 12s ease-in-out 6s infinite;
        }

        @keyframes fadeSlide {
          0%   { opacity: 0; }
          10%  { opacity: 1; }
          50%  { opacity: 1; }
          62%  { opacity: 0; }
          100% { opacity: 0; }
        }

        /* Deep gradient overlay for text readability */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,8,8,0.25) 0%,
            rgba(8,8,8,0.15) 35%,
            rgba(8,8,8,0.5) 72%,
            rgba(8,8,8,0.82) 100%
          );
          z-index: 2;
        }

        .hero-vignette { display: none; }
        .hero-lens { display: none; }

        .hero-lens::before {
          content: '';
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(184,134,11,0.16);
          border-radius: 50%;
        }

        .hero-lens::after {
          content: '';
          position: absolute;
          inset: 34px;
          border: 1px dashed rgba(184,134,11,0.12);
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
          border-color: rgba(184,134,11,0.8);
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
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 860px;
          padding: 0 32px;
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 8px;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0;
          animation: fadeUp 1s ease 0.8s forwards;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '';
          width: 32px;
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }

        /* Hero typographic title */
        .hero-title-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin-bottom: 8px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 9vw, 112px);
          font-weight: 400;
          color: var(--white);
          letter-spacing: clamp(10px, 1.6vw, 22px);
          text-transform: uppercase;
          line-height: 1;
          opacity: 0;
          animation: heroTitleIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards;
          text-shadow: 0 2px 40px rgba(0,0,0,0.5);
        }

        .hero-title-studio {
          font-family: 'Playfair Display', serif;
          font-size: clamp(18px, 3vw, 38px);
          font-weight: 400;
          font-style: italic;
          color: var(--gold);
          letter-spacing: clamp(8px, 1.2vw, 16px);
          opacity: 0;
          animation: fadeUp 1s ease 1.1s forwards;
          margin-top: 6px;
        }

        .hero-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
          margin: 20px auto;
          opacity: 0;
          animation: fadeUp 1s ease 1.25s forwards;
        }

        @keyframes heroTitleIn {
          0% {
            opacity: 0;
            transform: translateY(24px);
            letter-spacing: clamp(2px, 0.3vw, 4px);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: clamp(10px, 1.6vw, 22px);
          }
        }

        .hero-shutter-btn {
          margin-top: 6px;
          opacity: 0;
          animation: fadeUp 1s ease 1.6s forwards;
          cursor: pointer;
          background: none;
          border: none;
          position: relative;
        }

        .hero-shutter-btn .shutter-svg {
          transition: transform 0.3s ease;
          width: 38px;
          height: 38px;
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

        /* Hero subtitle */
        .hero-subtitle {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 200;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          opacity: 0;
          animation: fadeUp 1s ease 1.45s forwards;
          margin: 0 0 40px;
        }

        /* Hero CTA group */
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          animation: fadeUp 1s ease 1.7s forwards;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-cta-primary {
          padding: 15px 44px;
          background: var(--gold);
          color: var(--dark);
          border: 1px solid var(--gold);
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          font-weight: 600;
        }

        .hero-cta-primary:hover {
          background: transparent;
          color: var(--gold);
        }

        .hero-cta-secondary {
          padding: 15px 44px;
          background: transparent;
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.22);
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s ease;
          font-weight: 300;
        }

        .hero-cta-secondary:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0;
          animation: fadeUp 1s ease 2.2s forwards;
          z-index: 10;
          cursor: pointer;
        }

        .hero-scroll-text {
          font-size: 8px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .hero-scroll-line {
          width: 1px;
          height: 44px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollPulse 2.2s ease infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.7); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        /* Camera info overlay */
        .cam-info {
          position: absolute;
          bottom: 18px;
          left: 48px;
          display: flex;
          gap: 24px;
          opacity: 0;
          animation: fadeUp 1s ease 2s forwards;
        }

        .cam-info-item {
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.35);
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
          height: 46px;
          background: linear-gradient(180deg, #efe7da 0%, #f3ece2 48%, #f5f0e8 100%);
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
          background: var(--cream);
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

        /* ===== PRICING ===== */
        .pricing-section {
          background: var(--cream);
          padding: 100px 24px 110px;
          position: relative;
          overflow: hidden;
        }

        .pricing-section::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
          opacity: 0.4;
        }

        .pricing-tabs {
          display: flex;
          justify-content: center;
          gap: 0;
          margin-bottom: 56px;
          border: 1px solid var(--blush);
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .pricing-tab {
          padding: 12px 40px;
          background: transparent;
          border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--warm);
          cursor: pointer;
          transition: all 0.35s ease;
        }

        .pricing-tab.active {
          background: var(--dark);
          color: var(--gold);
        }

        .pricing-grid {
          display: flex;
          justify-content: center;
          gap: 24px;
          max-width: 900px;
          margin: 0 auto 64px;
          flex-wrap: wrap;
        }

        .pricing-card {
          background: var(--white);
          border: 1px solid var(--blush);
          padding: 44px 36px 40px;
          flex: 1;
          min-width: 280px;
          max-width: 400px;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
        }

        .pricing-card.featured {
          background: var(--dark);
          border-color: rgba(184,134,11,0.35);
          box-shadow: 0 8px 40px rgba(0,0,0,0.12);
        }

        .pricing-card.featured:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }

        .pricing-badge {
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold);
          color: var(--dark);
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 5px 18px;
          font-weight: 600;
          white-space: nowrap;
        }

        .pricing-name {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          font-weight: 400;
          color: var(--dark);
          margin-bottom: 6px;
        }

        .pricing-card.featured .pricing-name { color: var(--white); }

        .pricing-name em { font-style: italic; color: var(--gold); }

        .pricing-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin: 20px 0 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--blush);
        }

        .pricing-card.featured .pricing-price-wrap {
          border-bottom-color: rgba(255,255,255,0.08);
        }

        .pricing-rs {
          font-size: 13px;
          color: var(--gold);
          font-weight: 300;
          letter-spacing: 1px;
        }

        .pricing-amount {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 400;
          color: var(--dark);
          line-height: 1;
        }

        .pricing-card.featured .pricing-amount { color: var(--white); }

        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pricing-features li {
          font-size: 13px;
          color: var(--warm);
          font-weight: 300;
          padding-left: 18px;
          position: relative;
          line-height: 1.4;
        }

        .pricing-card.featured .pricing-features li { color: rgba(255,255,255,0.55); }

        .pricing-features li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 6px;
          height: 1px;
          background: var(--gold);
        }

        .pricing-cta {
          margin-top: 36px;
          width: 100%;
          padding: 14px;
          border: 1px solid var(--blush);
          background: transparent;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--warm);
          cursor: pointer;
          transition: all 0.35s ease;
        }

        .pricing-cta:hover {
          background: var(--dark);
          border-color: var(--dark);
          color: var(--gold);
        }

        .pricing-card.featured .pricing-cta {
          border-color: var(--gold);
          color: var(--gold);
        }

        .pricing-card.featured .pricing-cta:hover {
          background: var(--gold);
          color: var(--dark);
        }

        /* Additional services cards */
        .pricing-addons-wrap {
          max-width: 900px;
          margin: 0 auto;
        }

        .pricing-addons-title {
          font-size: 9px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold);
          text-align: center;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .pricing-addons-title::before,
        .pricing-addons-title::after {
          content: '';
          width: 36px;
          height: 1px;
          background: var(--gold);
          opacity: 0.5;
        }

        .pricing-addons-grid {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .pricing-addon-card {
          flex: 1;
          min-width: 280px;
          background: var(--white);
          border: 1px solid var(--blush);
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .pricing-addon-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.07);
        }

        .pricing-addon-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 100%;
          background: var(--gold);
          opacity: 0.6;
        }

        .pricing-addon-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--dark);
          margin-bottom: 4px;
        }

        .pricing-addon-card-name em { font-style: italic; color: var(--gold); }

        .pricing-addon-card-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin: 16px 0 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--blush);
        }

        .pricing-addon-card-rs {
          font-size: 11px;
          color: var(--gold);
          letter-spacing: 1px;
        }

        .pricing-addon-card-amount {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 400;
          color: var(--dark);
          line-height: 1;
        }

        .pricing-addon-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }

        .pricing-addon-features li {
          font-size: 12px;
          color: var(--warm);
          font-weight: 300;
          padding-left: 16px;
          position: relative;
          line-height: 1.4;
        }

        .pricing-addon-features li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 6px;
          width: 6px;
          height: 1px;
          background: var(--gold);
        }

        .pricing-addon-book {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--blush);
          background: transparent;
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--warm);
          cursor: pointer;
          transition: all 0.35s ease;
        }

        .pricing-addon-book:hover {
          background: var(--dark);
          border-color: var(--dark);
          color: var(--gold);
        }

        .pricing-note {
          text-align: center;
          margin-top: 28px;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(0,0,0,0.28);
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .pricing-section { padding: 72px 16px 80px; }
          .pricing-card { min-width: 100%; padding: 36px 24px 32px; }
          .pricing-addon-card { min-width: 100%; }
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

        /* ===== WHATSAPP FLOAT ===== */
        .wa-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 4000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .wa-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.45);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }

        .wa-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(37,211,102,0.6);
        }

        .wa-tooltip {
          background: var(--dark);
          color: var(--white);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 7px 14px;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(8px);
          transition: all 0.3s ease;
          pointer-events: none;
          border: 1px solid rgba(37,211,102,0.2);
        }

        .wa-float:hover .wa-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* ===== CONTACT / BOOKING ===== */
        .contact-section {
          background: var(--dark);
          padding: 100px 24px 110px;
          position: relative;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(184,134,11,0.05);
          border-radius: 50%;
          left: -200px;
          bottom: -200px;
        }

        .contact-inner {
          max-width: 780px;
          margin: 0 auto;
        }

        .contact-intro {
          text-align: center;
          margin-bottom: 52px;
        }

        .contact-intro h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          color: var(--white);
          margin: 16px 0 16px;
          line-height: 1.3;
        }

        .contact-intro h2 em { font-style: italic; color: var(--gold); }

        .contact-intro p {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
          font-weight: 200;
        }

        .booking-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .booking-form .full { grid-column: 1 / -1; }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
        }

        .form-input,
        .form-select,
        .form-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--white);
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 300;
          padding: 14px 16px;
          outline: none;
          transition: border-color 0.3s ease;
          width: 100%;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(184,134,11,0.5);
        }

        .form-input::placeholder,
        .form-textarea::placeholder { color: rgba(255,255,255,0.2); }

        .form-select { cursor: pointer; appearance: none; }
        .form-select option { background: var(--dark2); color: var(--white); }

        /* Date input calendar icon colour fix */
        .form-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.6) sepia(1) saturate(3) hue-rotate(5deg);
          cursor: pointer;
        }

        .form-textarea { resize: vertical; min-height: 110px; }

        .form-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .form-submit-wa {
          flex: 1;
          min-width: 200px;
          padding: 16px 24px;
          background: #25D366;
          border: none;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.35s ease;
        }

        .form-submit-wa:hover { background: #1ebe5d; transform: translateY(-2px); }

        .form-submit-call {
          flex: 1;
          min-width: 160px;
          padding: 16px 24px;
          background: transparent;
          border: 1px solid rgba(184,134,11,0.35);
          color: var(--gold);
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
          transition: all 0.35s ease;
        }

        .form-submit-call:hover {
          background: rgba(184,134,11,0.1);
          border-color: var(--gold);
        }

        @media (max-width: 640px) {
          .booking-form { grid-template-columns: 1fr; }
          .booking-form .full { grid-column: 1; }
          .contact-section { padding: 72px 16px 80px; }
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
  .nav { padding: 16px 20px; }

  .nav-hamburger { display: flex; }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: rgba(13,13,13,0.98);
    backdrop-filter: blur(24px);
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    padding: 40px;
    transition: right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-left: 1px solid rgba(184,134,11,0.15);
  }

  .nav-links.open { right: 0; }

  .nav-links a {
    font-size: 13px;
    letter-spacing: 4px;
    color: rgba(255,255,255,0.7);
  }

  .nav-cta {
    text-align: center;
    width: 100%;
    display: block;
  }
          /* Mobile hero image positioning */
          .hero-bg-1 { background-position: 58% top; }
          .hero-bg-2 { background-position: 62% center; }

          /* Mobile hero content */
          .hero-content {
            padding: 0 20px;
            max-width: 100%;
          }

          .hero-eyebrow {
            font-size: 9px;
            letter-spacing: 5px;
          }

          .hero-title { letter-spacing: 8px; }
          .hero-title-studio { letter-spacing: 6px; }
          .hero-divider { margin: 14px auto; }

          .hero-subtitle {
            font-size: 10px;
            letter-spacing: 3px;
            margin: 14px 0 32px;
          }

          .hero-cta-group {
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            max-width: 260px;
            padding: 14px 28px;
          }

          .hero-scroll { bottom: 20px; }

          .hero-gallery-transition { height: 30px; }
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
  <div className="nav-camera-icon"><CameraIcon size={20} color="var(--gold)" /></div>
  <div className="nav-logo-wrap">
    <div className="nav-logo">Shagun <span>Studio</span></div>
    <div className="nav-tagline">Wedding Photography</div>
  </div>
</div>
  <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
    <li><a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a></li>
    <li><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a></li>
    <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
    <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
    <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Book Now</a></li>
  </ul>
  <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
    <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
    <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
    <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
  </button>
</nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg hero-bg-1" />
          <div className="hero-bg hero-bg-2" />
          <div className="hero-overlay" />
          <div className="focus-bracket tl" />
          <div className="focus-bracket tr" />
          <div className="focus-bracket bl" />
          <div className="focus-bracket br" />
          <div className="rec-dot">REC</div>

          <div className="hero-content">
            <div className="hero-eyebrow">Wedding Photography</div>
            <div className="hero-title-wrap">
              <h1 className="hero-title">Shagun</h1>
              <span className="hero-title-studio">Studio</span>
            </div>
            <div className="hero-divider" />
            <p className="hero-subtitle">Capturing timeless love stories</p>
            <div className="hero-cta-group">
              <button className="hero-cta-primary" onClick={() => {
                triggerShutter(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                });
              }}>
                View Portfolio
              </button>
              <button className="hero-cta-secondary" onClick={() => {
                window.open('https://wa.me/919816006300?text=Hi%20Shagun%20Studio!%20I%27d%20like%20to%20book%20a%20session.', '_blank');
              }}>
                Book a Session
              </button>
            </div>
          </div>

          <div className="hero-scroll" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="hero-scroll-text">Scroll</span>
            <div className="hero-scroll-line" />
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

        {/* PRICING */}
        <section className="pricing-section" id="pricing">
          <div className="section-head">
            <div className="section-tag"><CameraIcon size={14} color="var(--gold)" /> Wedding Packages</div>
            <h2 className="section-h2">Our <em>Packages</em></h2>
          </div>

          <div className="pricing-tabs">
            {pricingTabs.map(tab => (
              <button
                key={tab}
                className={`pricing-tab ${pricingTab === tab ? 'active' : ''}`}
                onClick={() => setPricingTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pricing-grid">
            {pricingData[pricingTab].map(pkg => (
              <div key={pkg.name} className={`pricing-card ${pkg.highlight ? 'featured' : ''}`}>
                {pkg.badge && <div className="pricing-badge">{pkg.badge}</div>}
                <div className="pricing-name"><em>{pkg.name}</em> Package</div>
                <div className="pricing-price-wrap">
                  <span className="pricing-rs">RS.</span>
                  <span className="pricing-amount">{pkg.price}</span>
                </div>
                <ul className="pricing-features">
                  {pkg.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <button className="pricing-cta" onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Book This Package
                </button>
              </div>
            ))}
          </div>

          <div className="pricing-addons-wrap">
            <div className="pricing-addons-title">Additional Services</div>
            <div className="pricing-addons-grid">

              {/* Engagement Shoot */}
              <div className="pricing-addon-card">
                <div className="pricing-addon-card-name"><em>Engagement</em> Shoot</div>
                <div className="pricing-addon-card-price">
                  <span className="pricing-addon-card-rs">RS.</span>
                  <span className="pricing-addon-card-amount">35,000</span>
                </div>
                <ul className="pricing-addon-features">
                  <li>Professional Photographer & Videographer</li>
                  <li>200 Edited High-Resolution Photos</li>
                  <li>Cinematic Engagement Video</li>
                  <li>Curated Location & Theme Guidance</li>
                  <li>Online Gallery for Sharing & Downloading</li>
                  <li>Same-Day Preview Reel</li>
                </ul>
                <button className="pricing-addon-book" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book This Shoot
                </button>
              </div>

              {/* Pre-Wedding Shoot */}
              <div className="pricing-addon-card">
                <div className="pricing-addon-card-name"><em>Pre-Wedding</em> Shoot</div>
                <div className="pricing-addon-card-price">
                  <span className="pricing-addon-card-rs">RS.</span>
                  <span className="pricing-addon-card-amount">45,000</span>
                </div>
                <ul className="pricing-addon-features">
                  <li>Dedicated Lead Photographer & Cinematographer</li>
                  <li>400 Edited High-Resolution Photos</li>
                  <li>Full Cinematic Pre-Wedding Film</li>
                  <li>Outfit Changes & Multiple Locations</li>
                  <li>Drone Aerial Shots</li>
                  <li>Premium Photo Album (20 Pages)</li>
                  <li>Online Gallery for Sharing & Downloading</li>
                </ul>
                <button className="pricing-addon-book" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book This Shoot
                </button>
              </div>

            </div>
          </div>
          <p className="pricing-note">60% advance payment required · 10% off on full advance payment</p>
        </section>

        {/* CONTACT / BOOKING */}
        <section className="contact-section" id="contact">
          <div className="contact-inner">
            <div className="contact-intro">
              <div className="section-tag" style={{justifyContent:'center'}}>Get in Touch</div>
              <h2>Book your <em>wedding session</em> with us</h2>
              <p>Fill in the details below and we'll reach out on WhatsApp within a few hours</p>
            </div>

            <form className="booking-form" onSubmit={e => {
              e.preventDefault();
              const msg = `Hi Shagun Studio! 🌸\n\nI'd like to book a session.\n\n👤 Name: ${bookForm.name}\n📞 Phone: ${bookForm.phone}\n💍 Wedding Date: ${bookForm.date || 'Not decided yet'}\n📦 Package: ${bookForm.package || 'To discuss'}\n\n💬 ${bookForm.message || 'Looking forward to hearing from you!'}`;
              window.open(`https://wa.me/8091762365?text=${encodeURIComponent(msg)}`, '_blank');
            }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" type="text" placeholder="e.g. Priya Sharma" required
                  value={bookForm.name} onChange={e => setBookForm(p => ({...p, name: e.target.value}))} />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" placeholder="e.g. 98765 43210" required
                  value={bookForm.phone} onChange={e => setBookForm(p => ({...p, phone: e.target.value}))} />
              </div>

              <div className="form-group">
                <label className="form-label">Wedding Date</label>
                <input className="form-input" type="date"
                  value={bookForm.date} onChange={e => setBookForm(p => ({...p, date: e.target.value}))} />
              </div>

              <div className="form-group">
                <label className="form-label">Package Interest</label>
                <select className="form-select"
                  value={bookForm.package} onChange={e => setBookForm(p => ({...p, package: e.target.value}))}>
                  <option value="">Select a package…</option>
                  <option>Traditional Package — RS. 45,000</option>
                  <option>Gold Package (Single Day) — RS. 85,000</option>
                  <option>Silver Combo Package — RS. 80,000</option>
                  <option>Gold Combo Package — RS. 1,40,000</option>
                  <option>Engagement Shoot — RS. 35,000</option>
                  <option>Pre-Wedding Shoot — RS. 45,000</option>
                  <option>Custom / Not sure yet</option>
                </select>
              </div>

              <div className="form-group full">
                <label className="form-label">Message (optional)</label>
                <textarea className="form-textarea" placeholder="Tell us a little about your wedding — venue, theme, or anything special…"
                  value={bookForm.message} onChange={e => setBookForm(p => ({...p, message: e.target.value}))} />
              </div>

              <div className="form-actions full">
                <button type="submit" className="form-submit-wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.849L.057 23.552a.5.5 0 0 0 .6.601l5.788-1.515A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.826 9.826 0 0 1-5.009-1.371l-.36-.214-3.733.977.999-3.645-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                  Send via WhatsApp
                </button>
                <a className="form-submit-call" href="tel:+919816006300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.29 6.29l1.67-1.83a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Call Now
                </a>
              </div>
            </form>
          </div>
        </section>

        {/* FLOATING WHATSAPP */}
        <div className="wa-float">
          <div className="wa-tooltip">Chat on WhatsApp</div>
          <a className="wa-btn" href="https://wa.me/919816006300?text=Hi%20Shagun%20Studio!%20I%27d%20like%20to%20know%20more%20about%20your%20wedding%20photography%20packages." target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.849L.057 23.552a.5.5 0 0 0 .6.601l5.788-1.515A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.826 9.826 0 0 1-5.009-1.371l-.36-.214-3.733.977.999-3.645-.235-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
          </a>
        </div>

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
