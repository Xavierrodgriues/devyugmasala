import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import type { Variants } from "framer-motion";

type CategorySlug = "pure-spices" | "blended-spices" | "seasoning";

interface Slide {
  id: string;
  category: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  cta: string;
  href: "/products";
  search: { category: CategorySlug };
  productImage: string;
  accentFrom: string;
  accentTo: string;
  bgFrom: string;
  bgTo: string;
  badge: string;
  price: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    id: "pure",
    category: "Pure Spices",
    eyebrow: "Single-Origin Essentials",
    title: "The Vibrant",
    titleAccent: "Soul of Purity.",
    desc: "Stone-ground at low temperature to lock in every volatile oil — our Kashmiri red chilli carries the peak potency of single-origin harvests.",
    cta: "Explore Pure Spices",
    href: "/products",
    search: { category: "pure-spices" },
    productImage: "/product/redchilli.png",
    accentFrom: "#C0392B",
    accentTo: "#E76F51",
    bgFrom: "rgba(192,57,43,0.07)",
    bgTo: "rgba(247,245,242,1)",
    badge: "Kashmiri Origin",
    price: "From ₹240",
    tag: "01",
  },
  {
    id: "paneer",
    category: "Blended Masalas",
    eyebrow: "Restaurant-Style · Creamy & Rich",
    title: "Silky, Creamy",
    titleAccent: "Perfection.",
    desc: "Engineered for creamy, restaurant-style paneer dishes at home — a balanced blend of warming spices that transforms every paneer preparation.",
    cta: "Discover Blends",
    href: "/products",
    search: { category: "blended-spices" },
    productImage: "/product/paneermasala.png",
    accentFrom: "#B5651D",
    accentTo: "#E09050",
    bgFrom: "rgba(181,101,29,0.07)",
    bgTo: "rgba(247,245,242,1)",
    badge: "Restaurant Style",
    price: "From ₹170",
    tag: "02",
  },
  {
    id: "turmeric",
    category: "Pure Spices",
    eyebrow: "High-Curcumin · Salem Variety",
    title: "Golden Warmth,",
    titleAccent: "Ancient Roots.",
    desc: "High-curcumin Selam turmeric — stone-ground from Salem's golden fields, one of the highest curcumin counts in the country.",
    cta: "Explore Pure Spices",
    href: "/products",
    search: { category: "pure-spices" },
    productImage: "/product/turmericpowder.png",
    accentFrom: "#D4A017",
    accentTo: "#E9963A",
    bgFrom: "rgba(212,160,23,0.08)",
    bgTo: "rgba(247,245,242,1)",
    badge: "High Curcumin",
    price: "From ₹110",
    tag: "03",
  },
  {
    id: "garam",
    category: "Pure Spices",
    eyebrow: "Heritage Warming Blend",
    title: "Warmth in Every",
    titleAccent: "Pinch.",
    desc: "Our classic warming blend — cardamom, cinnamon, clove, and pepper in heritage proportions that have defined Indian kitchens for decades.",
    cta: "Explore Pure Spices",
    href: "/products",
    search: { category: "pure-spices" },
    productImage: "/product/garam masala.png",
    accentFrom: "#7B3F00",
    accentTo: "#B5651D",
    bgFrom: "rgba(123,63,0,0.07)",
    bgTo: "rgba(247,245,242,1)",
    badge: "Kitchen Staple",
    price: "From ₹210",
    tag: "04",
  },
  {
    id: "chole",
    category: "Blended Masalas",
    eyebrow: "Punjabi-Style · Deep & Dark",
    title: "Bold as the",
    titleAccent: "Punjab Itself.",
    desc: "Deep, dark, and warming — engineered for that perfect Pindi chole color. Our Chole Masala brings the soul of Punjabi street food to your kitchen.",
    cta: "Discover Blends",
    href: "/products",
    search: { category: "blended-spices" },
    productImage: "/product/cholemasala.png",
    accentFrom: "#7B2D00",
    accentTo: "#C0622A",
    bgFrom: "rgba(123,45,0,0.07)",
    bgTo: "rgba(247,245,242,1)",
    badge: "Punjabi Classic",
    price: "From ₹165",
    tag: "05",
  },
  {
    id: "chilli-flakes",
    category: "Seasoning",
    eyebrow: "Hand-Crushed · Finishing Touch",
    title: "Heat That",
    titleAccent: "Lingers.",
    desc: "Coarse, vibrant hand-crushed chilli flakes with seeds intact — the perfect finishing note for pizzas, pastas, and any dish that demands a bold finale.",
    cta: "Shop Seasoning",
    href: "/products",
    search: { category: "seasoning" },
    productImage: "/product/chilliflakes.jpeg",
    accentFrom: "#A93226",
    accentTo: "#E74C3C",
    bgFrom: "rgba(169,50,38,0.07)",
    bgTo: "rgba(247,245,242,1)",
    badge: "Hand-Crushed",
    price: "From ₹145",
    tag: "06",
  },
];

const DURATION = 4000;
const EASE_IN: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.7, 0, 1, 0.6];

const TEXT_VARIANTS: Variants = {
  enter:  { opacity: 0, x: -32, filter: "blur(6px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.72, ease: EASE_IN } },
  exit:   { opacity: 0, x: 24, filter: "blur(4px)", transition: { duration: 0.42, ease: EASE_OUT } },
};

const IMG_VARIANTS: Variants = {
  enter:  { opacity: 0, scale: 0.8, y: 48, rotate: -5 },
  center: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { duration: 0.95, ease: EASE_IN } },
  exit:   { opacity: 0, scale: 1.06, y: -20, rotate: 4, transition: { duration: 0.42, ease: EASE_OUT } },
};

/* ═══════════════════════════════════════════════════════════
   INDIAN MASALA THEMED SVG LINE-ART ELEMENTS
═══════════════════════════════════════════════════════════ */

/** Mortar & Pestle — सिल बट्टा */
function MortarPestleSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="90" height="100" viewBox="0 0 90 100" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Mortar bowl */}
      <path d="M10 48 Q10 82 45 82 Q80 82 80 48" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <line x1="10" y1="48" x2="80" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="45" cy="48" rx="35" ry="8" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Pestle */}
      <line x1="55" y1="14" x2="38" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="58" cy="11" rx="7" ry="5" stroke={color} strokeWidth="2" fill="none" transform="rotate(-30 58 11)"/>
      {/* Spice powder dots inside */}
      <circle cx="30" cy="66" r="2" stroke={color} strokeWidth="1.3" fill="none"/>
      <circle cx="42" cy="70" r="1.5" stroke={color} strokeWidth="1.3" fill="none"/>
      <circle cx="55" cy="65" r="2" stroke={color} strokeWidth="1.3" fill="none"/>
    </motion.svg>
  );
}

/** Diya — दिया (oil lamp) */
function DiyaSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="70" height="90" viewBox="0 0 70 90" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    >
      {/* Diya body - shallow clay bowl */}
      <path d="M8 55 Q8 70 35 70 Q62 70 62 55 Q62 46 55 43 Q62 40 60 35 Q48 26 35 30 Q22 26 10 35 Q8 40 15 43 Q8 46 8 55Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Spout / wick holder */}
      <path d="M55 43 Q66 38 68 32 Q65 28 58 31" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Wick */}
      <line x1="63" y1="30" x2="62" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Flame outer */}
      <path d="M62 18 Q55 8 62 2 Q70 8 62 18Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Flame inner */}
      <path d="M62 16 Q59 10 62 6 Q65 10 62 16Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Oil ripple inside bowl */}
      <ellipse cx="35" cy="55" rx="16" ry="4" stroke={color} strokeWidth="1.3" fill="none"/>
    </motion.svg>
  );
}

/** Lotus flower — कमल */
function LotusSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="88" height="88" viewBox="0 0 88 88" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      {/* Outer petals (8) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 44 + 28 * Math.cos(rad);
        const cy = 44 + 28 * Math.sin(rad);
        return (
          <ellipse
            key={i} cx={cx} cy={cy} rx="8" ry="14"
            stroke={color} strokeWidth="1.6" fill="none"
            transform={`rotate(${angle + 90} ${cx} ${cy})`}
          />
        );
      })}
      {/* Inner petals (4) */}
      {[22, 112, 202, 292].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 44 + 14 * Math.cos(rad);
        const cy = 44 + 14 * Math.sin(rad);
        return (
          <ellipse
            key={i} cx={cx} cy={cy} rx="5" ry="10"
            stroke={color} strokeWidth="1.5" fill="none"
            transform={`rotate(${angle + 90} ${cx} ${cy})`}
          />
        );
      })}
      {/* Center circle */}
      <circle cx="44" cy="44" r="7" stroke={color} strokeWidth="1.8" fill="none"/>
      <circle cx="44" cy="44" r="3" stroke={color} strokeWidth="1.4" fill="none"/>
    </motion.svg>
  );
}

/** Mandala ring — मंडल */
function MandalaSVG({ color, style, size = 100 }: { color: string; style?: React.CSSProperties; size?: number }) {
  const c = size / 2;
  return (
    <motion.svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
    >
      <circle cx={c} cy={c} r={c - 3} stroke={color} strokeWidth="1.2" fill="none" strokeDasharray="4 5"/>
      <circle cx={c} cy={c} r={c - 12} stroke={color} strokeWidth="1" fill="none"/>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r1 = c - 12; const r2 = c - 3;
        return (
          <line key={i}
            x1={c + r1 * Math.cos(rad)} y1={c + r1 * Math.sin(rad)}
            x2={c + r2 * Math.cos(rad)} y2={c + r2 * Math.sin(rad)}
            stroke={color} strokeWidth="1"
          />
        );
      })}
      {/* Petal ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const px = c + (c - 22) * Math.cos(rad);
        const py = c + (c - 22) * Math.sin(rad);
        return <circle key={i} cx={px} cy={py} r="4" stroke={color} strokeWidth="1.2" fill="none"/>;
      })}
      <circle cx={c} cy={c} r="8" stroke={color} strokeWidth="1.4" fill="none"/>
      <circle cx={c} cy={c} r="3" stroke={color} strokeWidth="1.2" fill="none"/>
    </motion.svg>
  );
}

/** Clay Matka pot — मटका */
function MatkaSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="65" height="88" viewBox="0 0 65 88" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      {/* Pot belly */}
      <path d="M20 30 Q5 42 8 58 Q10 76 32 80 Q54 76 56 58 Q59 42 44 30"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Neck */}
      <path d="M20 30 Q22 22 26 18 Q32 14 38 18 Q42 22 44 30"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Rim */}
      <ellipse cx="32" cy="16" rx="9" ry="4" stroke={color} strokeWidth="2" fill="none"/>
      {/* Decorative band */}
      <path d="M12 50 Q32 55 52 50" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M10 56 Q32 62 54 56" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* Handles */}
      <path d="M8 52 Q2 45 6 38" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M56 52 Q62 45 58 38" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </motion.svg>
  );
}

/** Curry leaf branch — करी पत्ता */
function CurryLeavesSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  const leaves = [
    { t: 0.15, side: -1 }, { t: 0.28, side: 1 },
    { t: 0.42, side: -1 }, { t: 0.56, side: 1 },
    { t: 0.70, side: -1 }, { t: 0.84, side: 1 },
  ];
  // Curved stem: from (10,90) to (50,10)
  const stem = "M10 95 C18 70 35 45 52 8";
  const getPoint = (t: number) => ({
    x: 10 + (52 - 10) * t + 8 * Math.sin(t * Math.PI),
    y: 95 + (8 - 95) * t,
  });

  return (
    <motion.svg
      width="70" height="110" viewBox="0 0 70 110" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ rotate: [0, 6, -4, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <path d={stem} stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {leaves.map((l, i) => {
        const p = getPoint(l.t);
        const angle = -55 + l.t * 30;
        const lx = l.side * 20;
        return (
          <ellipse
            key={i}
            cx={p.x + lx} cy={p.y}
            rx="10" ry="5"
            stroke={color} strokeWidth="1.5" fill="none"
            transform={`rotate(${angle + l.side * 30} ${p.x + lx} ${p.y})`}
          />
        );
      })}
    </motion.svg>
  );
}

/** Spice thali plate — थाली */
function ThaliSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="80" height="80" viewBox="0 0 80 80" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ rotate: [0, -360] }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer rim */}
      <circle cx="40" cy="40" r="37" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="40" cy="40" r="30" stroke={color} strokeWidth="1.2" fill="none"/>
      {/* Small bowls (katoris) arranged in a circle */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const bx = 40 + 20 * Math.cos(rad);
        const by = 40 + 20 * Math.sin(rad);
        return <circle key={i} cx={bx} cy={by} r="5.5" stroke={color} strokeWidth="1.4" fill="none"/>;
      })}
      {/* Center */}
      <circle cx="40" cy="40" r="7" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Rim decoration */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <circle key={i}
            cx={40 + 33.5 * Math.cos(rad)} cy={40 + 33.5 * Math.sin(rad)}
            r="1.5" stroke={color} strokeWidth="1" fill="none"
          />
        );
      })}
    </motion.svg>
  );
}

/** Handi — हांडी (cooking vessel) */
function HandiSVG({ color, style }: { color: string; style?: React.CSSProperties }) {
  return (
    <motion.svg
      width="72" height="80" viewBox="0 0 72 80" fill="none"
      style={{ position: "absolute", ...style }}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    >
      {/* Body */}
      <path d="M14 32 Q6 44 8 58 Q10 74 36 76 Q62 74 64 58 Q66 44 58 32"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Rim */}
      <ellipse cx="36" cy="32" rx="22" ry="6" stroke={color} strokeWidth="2" fill="none"/>
      {/* Lid */}
      <path d="M18 30 Q36 18 54 30" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <ellipse cx="36" cy="18" rx="5" ry="3" stroke={color} strokeWidth="1.6" fill="none"/>
      {/* Steam lines */}
      <path d="M26 14 Q24 8 27 4" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M36 12 Q34 6 37 2" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M46 14 Q44 8 47 4" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* Decorative lines on body */}
      <path d="M12 48 Q36 54 60 48" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Side handles */}
      <path d="M8 50 Q2 44 6 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M64 50 Q70 44 66 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </motion.svg>
  );
}

/* ── Floating decorative dot/seed clusters ── */
function SpiceSeeds({ color, positions }: { color: string; positions: Array<{ top: string; left?: string; right?: string; size: number; delay: number }> }) {
  return (
    <>
      {positions.map((pos, i) => (
        <motion.svg
          key={i}
          width={pos.size * 3} height={pos.size * 3}
          viewBox={`0 0 ${pos.size * 3} ${pos.size * 3}`}
          fill="none"
          style={{ position: "absolute", top: pos.top, left: pos.left, right: pos.right, opacity: 0.18 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
        >
          <circle cx={pos.size * 1.5} cy={pos.size * 1.5} r={pos.size} stroke={color} strokeWidth="1.4" fill="none"/>
        </motion.svg>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════
   PER-SLIDE art configurations
═══════════════════════════════════════════════ */
function SlideArt({ slideId, color }: { slideId: string; color: string }) {
  if (slideId === "pure") {
    return (
      <>
        <MortarPestleSVG color={color} style={{ top: "6%", left: "-4%", opacity: 0.18 }} />
        <DiyaSVG color={color} style={{ top: "5%", right: "2%", opacity: 0.16 }} />
        <LotusSVG color={color} style={{ bottom: "8%", right: "-2%", opacity: 0.15 }} />
        <MandalaSVG color={color} size={72} style={{ bottom: "12%", left: "0%", opacity: 0.12 }} />
        <SpiceSeeds color={color} positions={[
          { top: "34%", left: "2%", size: 4, delay: 0 },
          { top: "55%", left: "-1%", size: 3, delay: 0.7 },
          { top: "25%", right: "5%", size: 3.5, delay: 1.4 },
          { top: "68%", right: "3%", size: 4, delay: 2.1 },
        ]} />
      </>
    );
  }
  if (slideId === "biryani") {
    return (
      <>
        <HandiSVG color={color} style={{ top: "4%", left: "-2%", opacity: 0.18 }} />
        <ThaliSVG color={color} style={{ bottom: "6%", left: "0%", opacity: 0.14 }} />
        <CurryLeavesSVG color={color} style={{ top: "8%", right: "0%", opacity: 0.16 }} />
        <MandalaSVG color={color} size={90} style={{ bottom: "10%", right: "-3%", opacity: 0.11 }} />
        <SpiceSeeds color={color} positions={[
          { top: "42%", left: "1%", size: 4, delay: 0.3 },
          { top: "60%", left: "4%", size: 3, delay: 1.1 },
          { top: "22%", right: "4%", size: 3.5, delay: 1.8 },
        ]} />
      </>
    );
  }
  if (slideId === "turmeric") {
    return (
      <>
        <MatkaSVG color={color} style={{ top: "5%", left: "-3%", opacity: 0.18 }} />
        <LotusSVG color={color} style={{ top: "6%", right: "0%", opacity: 0.15 }} />
        <MortarPestleSVG color={color} style={{ bottom: "10%", right: "-2%", opacity: 0.16 }} />
        <ThaliSVG color={color} style={{ bottom: "8%", left: "1%", opacity: 0.13 }} />
        <CurryLeavesSVG color={color} style={{ top: "38%", right: "0%", opacity: 0.14 }} />
        <SpiceSeeds color={color} positions={[
          { top: "30%", left: "0%", size: 4, delay: 0 },
          { top: "58%", left: "-2%", size: 3, delay: 0.9 },
          { top: "20%", right: "5%", size: 3.5, delay: 1.6 },
          { top: "72%", right: "2%", size: 5, delay: 2.4 },
        ]} />
      </>
    );
  }
  if (slideId === "garam") {
    return (
      <>
        <DiyaSVG color={color} style={{ top: "5%", left: "-2%", opacity: 0.18 }} />
        <MandalaSVG color={color} size={110} style={{ top: "8%", right: "-4%", opacity: 0.13 }} />
        <MatkaSVG color={color} style={{ bottom: "6%", right: "-2%", opacity: 0.16 }} />
        <LotusSVG color={color} style={{ bottom: "10%", left: "0%", opacity: 0.14 }} />
        <SpiceSeeds color={color} positions={[
          { top: "38%", left: "0%", size: 4, delay: 0.2 },
          { top: "62%", left: "3%", size: 3.5, delay: 1.0 },
          { top: "18%", right: "3%", size: 4, delay: 1.7 },
          { top: "75%", right: "4%", size: 3, delay: 2.5 },
        ]} />
      </>
    );
  }
  if (slideId === "chicken") {
    return (
      <>
        <HandiSVG color={color} style={{ top: "3%", right: "-1%", opacity: 0.17 }} />
        <CurryLeavesSVG color={color} style={{ bottom: "5%", left: "-2%", opacity: 0.16 }} />
        <ThaliSVG color={color} style={{ top: "6%", left: "-1%", opacity: 0.13 }} />
        <MandalaSVG color={color} size={80} style={{ bottom: "12%", right: "-2%", opacity: 0.12 }} />
        <SpiceSeeds color={color} positions={[
          { top: "44%", left: "1%", size: 3.5, delay: 0.4 },
          { top: "65%", left: "5%", size: 3, delay: 1.2 },
          { top: "28%", right: "5%", size: 4, delay: 1.9 },
        ]} />
      </>
    );
  }
  // chilli-flakes
  return (
    <>
      <MortarPestleSVG color={color} style={{ top: "4%", right: "-2%", opacity: 0.18 }} />
      <DiyaSVG color={color} style={{ bottom: "8%", left: "-2%", opacity: 0.15 }} />
      <MandalaSVG color={color} size={96} style={{ top: "7%", left: "-3%", opacity: 0.12 }} />
      <LotusSVG color={color} style={{ bottom: "6%", right: "-1%", opacity: 0.14 }} />
      <SpiceSeeds color={color} positions={[
        { top: "36%", left: "1%", size: 4, delay: 0 },
        { top: "60%", left: "-1%", size: 3, delay: 0.8 },
        { top: "22%", right: "4%", size: 3.5, delay: 1.5 },
        { top: "70%", right: "2%", size: 4.5, delay: 2.2 },
      ]} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slide = SLIDES[index];

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(elapsed / DURATION, 1));
      if (elapsed < DURATION) { raf = requestAnimationFrame(tick); }
      else { setIndex((i) => (i + 1) % SLIDES.length); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused]);

  const goTo = useCallback((i: number) => { setIndex(i); setProgress(0); }, []);

  return (
    <section
      className="relative overflow-hidden bg-stone-warm"
      style={{ minHeight: "100dvh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Per-slide ambient bg */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 65% 65% at 68% 52%, ${slide.bgFrom}, ${slide.bgTo})` }}
        />
      </AnimatePresence>

      {/* Grain */}
      <div aria-hidden={true} className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "200px",
        }}
      />

      {/* Grid */}
      <div className="relative z-10 container-luxury min-h-screen flex items-center pt-24 pb-16 lg:pb-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-center">

          {/* TEXT — bottom on mobile, left on desktop */}
          <div className="flex flex-col justify-center lg:pr-12 order-2 lg:order-1">

            <AnimatePresence mode="wait">
              <motion.div key={`pill-${slide.id}`} variants={TEXT_VARIANTS} initial="enter" animate="center" exit="exit" className="mb-7 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.28em] font-semibold border"
                  style={{ background: `linear-gradient(135deg,${slide.accentFrom}22,${slide.accentTo}14)`, borderColor: `${slide.accentFrom}40`, color: slide.accentFrom }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: slide.accentFrom }} />
                  {slide.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] text-charcoal/35 hidden sm:inline">{slide.eyebrow}</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1 key={`h1-${slide.id}`} variants={TEXT_VARIANTS} initial="enter" animate="center" exit="exit"
                className="font-display font-light leading-[0.92] text-charcoal mb-6"
                style={{ fontSize: "clamp(2.6rem,6.5vw,5rem)" }}
              >
                {slide.title}{" "}
                <span className="italic block" style={{
                  background: `linear-gradient(120deg,${slide.accentFrom} 0%,${slide.accentTo} 100%)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  {slide.titleAccent}
                </span>
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p key={`p-${slide.id}`} variants={TEXT_VARIANTS} initial="enter" animate="center" exit="exit"
                className="text-charcoal/55 font-light leading-relaxed mb-8 max-w-md"
                style={{ fontSize: "clamp(0.9rem,1.5vw,1.06rem)" }}
              >
                {slide.desc}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`meta-${slide.id}`} variants={TEXT_VARIANTS} initial="enter" animate="center" exit="exit"
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <span className="px-3 py-1 text-[9.5px] uppercase tracking-[0.22em] font-medium rounded-sm"
                  style={{ background: `${slide.accentFrom}18`, color: slide.accentFrom, border: `1px solid ${slide.accentFrom}35` }}>
                  {slide.badge}
                </span>
                <span className="text-charcoal/40 text-xs">·</span>
                <span className="text-charcoal/40 text-[9.5px] uppercase tracking-[0.22em]">Zero Additives</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`cta-${slide.id}`} variants={TEXT_VARIANTS} initial="enter" animate="center" exit="exit"
                className="flex flex-wrap gap-3"
              >
                <Link to={slide.href} search={slide.search} id={`hero-cta-${slide.id}`}
                  className="group inline-flex items-center gap-3 px-9 py-4 text-cream text-[10.5px] uppercase tracking-[0.22em] hover:opacity-90 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg,${slide.accentFrom},${slide.accentTo})`, boxShadow: `0 8px 28px -8px ${slide.accentFrom}55` }}>
                  {slide.cta}
                  <span className="inline-block w-5 h-px bg-current opacity-70 transition-all duration-300 group-hover:w-8" />
                </Link>
                <Link to="/about"
                  className="inline-flex items-center px-7 py-4 text-charcoal text-[10.5px] uppercase tracking-[0.22em] border border-charcoal/18 hover:border-charcoal/50 transition-all duration-300">
                  Our Story
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PRODUCT VISUAL — top on mobile, right on desktop */}
          <div className="relative flex items-center justify-center lg:justify-end order-1 lg:order-2 pt-4 lg:pt-0">

            {/* Rotating rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-dashed pointer-events-none hidden lg:block"
              style={{ width: "420px", height: "420px", borderColor: `${slide.accentFrom}20` }} />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-dotted pointer-events-none hidden lg:block"
              style={{ width: "320px", height: "320px", borderColor: `${slide.accentTo}18` }} />

            {/* Ambient glow */}
            <AnimatePresence mode="sync">
              <motion.div key={`glow-${slide.id}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 1.0 }}
                className="absolute rounded-full pointer-events-none"
                style={{ width: "460px", height: "460px", background: `radial-gradient(circle,${slide.accentFrom}1e 0%,transparent 68%)` }}
              />
            </AnimatePresence>

            {/* ── Indian SVG art layer ── */}
            <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.div key={`art-${slide.id}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.85 }}
                  className="absolute inset-0"
                >
                  <SlideArt slideId={slide.id} color={slide.accentFrom} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product image — premium cinematic scene, full background */}
            <div
              className="relative w-[300px] sm:w-[420px] lg:w-[540px] overflow-hidden"
              style={{
                aspectRatio: "4/3",
                zIndex: 2,
                borderRadius: "4px",
                boxShadow: `0 32px 80px -20px ${slide.accentFrom}50, 0 8px 32px -8px rgba(0,0,0,0.20)`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${slide.id}`}
                  variants={IMG_VARIANTS}
                  initial="enter" animate="center" exit="exit"
                  className="w-full h-full"
                >
                  <img
                    src={slide.productImage}
                    alt={slide.category}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 container-luxury flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} aria-label={`Go to ${s.category}`}
              className="group relative overflow-hidden transition-all duration-500"
              style={{ height: "3px", width: i === index ? "52px" : "24px", background: "rgba(26,26,26,0.12)", borderRadius: "2px" }}
            >
              {i === index && (
                <span className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: `linear-gradient(90deg,${slide.accentFrom},${slide.accentTo})`, width: `${progress * 100}%`, transition: "none" }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-[10px] uppercase tracking-[0.28em] text-charcoal/40">
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button onClick={() => goTo((index - 1 + SLIDES.length) % SLIDES.length)} aria-label="Previous"
              className="w-8 h-8 border border-charcoal/15 flex items-center justify-center hover:border-charcoal/50 hover:bg-charcoal/5 transition-all duration-200">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => goTo((index + 1) % SLIDES.length)} aria-label="Next"
              className="w-8 h-8 border border-charcoal/15 flex items-center justify-center hover:border-charcoal/50 hover:bg-charcoal/5 transition-all duration-200">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L9 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 hidden lg:flex flex-col items-center gap-1.5" style={{ transform: "translateX(-50%)" }}>
        <div className="w-px h-8 relative overflow-hidden rounded-full" style={{ background: "rgba(26,26,26,0.12)" }}>
          <motion.div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: slide.accentFrom }}
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[8px] uppercase tracking-[0.3em] text-charcoal/30">Scroll</span>
      </div>
    </section>
  );
}
