import packChilli from "@/assets/pack-chilli.jpg";
import packTurmeric from "@/assets/pack-turmeric.jpg";
import packGaram from "@/assets/pack-garam.jpg";
import packBiryani from "@/assets/pack-biryani.jpg";
import packFlakes from "@/assets/pack-flakes.jpg";
import packKitchenKing from "@/assets/pack-kitchen-king.jpg";

export type CategorySlug = "pure-spices" | "blended-spices" | "seasoning";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  category: CategorySlug;
  image: string;
  description: string;
  benefits: string[];
  features: string[];
  origin: string;
  priceFrom: number;
}

export const categories: Category[] = [
  {
    slug: "pure-spices",
    name: "Pure Spices",
    tagline: "Single-origin essentials",
    description:
      "Single-origin powders harvested at peak potency, slow-roasted and stone-ground to preserve their volatile oils and natural color.",
  },
  {
    slug: "blended-spices",
    name: "Blended Spices",
    tagline: "Heritage masala formulations",
    description:
      "Time-honoured ratios developed over six decades. Each blend balances heat, color, and aroma with surgical precision.",
  },
  {
    slug: "seasoning",
    name: "Seasoning",
    tagline: "Finishing touches for global cuisine",
    description:
      "From hand-crushed chilli flakes to coarse melange pepper — finishing notes for the discerning kitchen.",
  },
];

const img = {
  chilli: packChilli,
  turmeric: packTurmeric,
  garam: packGaram,
  biryani: packBiryani,
  flakes: packFlakes,
  kitchenKing: packKitchenKing,
};

const baseBenefits = [
  "Cold-ground to preserve essential oils",
  "Zero artificial colors or fillers",
  "Pesticide-free direct-to-farmer sourcing",
  "ISO 22000 certified facility",
];

const baseFeatures = [
  "Stone-ground at low temperature",
  "Triple-sieved for uniform texture",
  "Nitrogen-flushed aroma-lock packaging",
];

export const products: Product[] = [
  // Pure Spices
  { slug: "chilli-powder", name: "Chilli Powder", subtitle: "Balanced everyday heat", category: "pure-spices", image: "/product/redchilli.png", origin: "Guntur, Andhra Pradesh", priceFrom: 120, description: "A balanced everyday chilli for rich color and warmth without overpowering heat.", benefits: baseBenefits, features: baseFeatures },
  { slug: "patni-extra-spicy-chilli", name: "Patni Extra Spicy Chilli", subtitle: "Intense, deep heat", category: "pure-spices", image: "/product/patniextraspicy.png", origin: "Guntur, Andhra Pradesh", priceFrom: 145, description: "For those who crave intensity. A deeply pungent chilli for fiery curries and rustic preparations.", benefits: baseBenefits, features: baseFeatures },
  { slug: "kashmiri-lal-chilli", name: "Kashmiri Lal Chilli", subtitle: "Mild & vibrantly red", category: "pure-spices", image: "/featured-chilli.png", origin: "Kashmir Valley", priceFrom: 240, description: "Famed for its deep crimson hue with gentle heat — the soul of butter chicken and rogan josh.", benefits: baseBenefits, features: baseFeatures },
  { slug: "reshampatti-chilli", name: "Reshampatti Chilli", subtitle: "Extra hot & deep red", category: "pure-spices", image: "/product/reshampatti.png", origin: "Madhya Pradesh", priceFrom: 165, description: "A vivid red Gujarati favorite, balancing color and pungency in equal measure.", benefits: baseBenefits, features: baseFeatures },
  { slug: "turmeric-powder", name: "Turmeric Powder", subtitle: "High-curcumin Selam variety", category: "pure-spices", image: "/product/turmericpowder.png", origin: "Salem, Tamil Nadu", priceFrom: 110, description: "Sourced from Salem's golden fields, our turmeric carries one of the highest curcumin counts in the country.", benefits: baseBenefits, features: baseFeatures },
  { slug: "coriander-cumin-powder", name: "Coriander-Cumin Powder", subtitle: "The everyday duo", category: "pure-spices", image: "/product/coreinderpowder.png", origin: "Rajasthan & Gujarat", priceFrom: 130, description: "A pantry essential — earthy coriander married with warm cumin in a 60/40 ratio.", benefits: baseBenefits, features: baseFeatures },
  { slug: "garam-masala", name: "Garam Masala", subtitle: "The kitchen staple", category: "pure-spices", image: "/product/garam masala.png", origin: "House blend", priceFrom: 210, description: "Our classic warming blend — cardamom, cinnamon, clove, and pepper in heritage proportions.", benefits: baseBenefits, features: baseFeatures },

  // Blended Spices
  { slug: "chana-masala", name: "Chana Masala", subtitle: "For chickpea curries", category: "blended-spices", image: "/product/chanamasala.png", origin: "House blend", priceFrom: 160, description: "Crafted for the perfect Punjabi chana — tangy, robust, and deeply aromatic.", benefits: baseBenefits, features: baseFeatures },
  { slug: "chaat-masala", name: "Chaat Masala", subtitle: "The tangy finisher", category: "blended-spices", image: "/product/chatmasala.png", origin: "House blend", priceFrom: 140, description: "Sour, salty, and zesty — the soul of every street-side chaat.", benefits: baseBenefits, features: baseFeatures },
  { slug: "chole-masala", name: "Chole Masala", subtitle: "Punjabi-style chickpea blend", category: "blended-spices", image: "/product/cholemasala.png", origin: "House blend", priceFrom: 165, description: "Deep, dark, and warming — engineered for that perfect Pindi chole color.", benefits: baseBenefits, features: baseFeatures },
  { slug: "rajma-masala", name: "Rajma Masala", subtitle: "For kidney bean curry", category: "blended-spices", image: "/product/rajmamasala.png", origin: "House blend", priceFrom: 155, description: "Balanced spice for slow-cooked rajma with that signature North Indian comfort.", benefits: baseBenefits, features: baseFeatures },
  { slug: "jain-masala", name: "Jain Masala", subtitle: "Onion & garlic free", category: "blended-spices", image: "/product/jainmasala.png", origin: "House blend", priceFrom: 175, description: "Crafted without onion or garlic, faithful to Jain culinary tradition.", benefits: baseBenefits, features: baseFeatures },
  { slug: "kitchen-king-masala", name: "Kitchen King Masala", subtitle: "The versatile masterpiece", category: "blended-spices", image: "/product/kitchenmasala.png", origin: "House blend", priceFrom: 185, description: "A flagship multi-purpose blend that elevates any sabzi, curry, or daily preparation.", benefits: baseBenefits, features: baseFeatures },
  { slug: "tea-masala", name: "Tea Masala", subtitle: "Aromatic chai blend", category: "blended-spices", image: "/product/teamasala.png", origin: "House blend", priceFrom: 195, description: "Cardamom, ginger, clove, and pepper — for chai that fills the room.", benefits: baseBenefits, features: baseFeatures },
  { slug: "paneer-masala", name: "Paneer Masala", subtitle: "For rich paneer curries", category: "blended-spices", image: "/product/paneermasala.png", origin: "House blend", priceFrom: 170, description: "Engineered for creamy, restaurant-style paneer dishes at home.", benefits: baseBenefits, features: baseFeatures },
  { slug: "egg-masala", name: "Egg Masala", subtitle: "For bhurji & curry", category: "blended-spices", image: "/product/eggmasala.png", origin: "House blend", priceFrom: 145, description: "A warming blend tuned specifically for egg curries and street-style bhurji.", benefits: baseBenefits, features: baseFeatures },
  { slug: "chicken-masala", name: "Chicken Masala", subtitle: "Bold poultry blend", category: "blended-spices", image: "/product/chickenmasala.png", origin: "House blend", priceFrom: 195, description: "Coriander-forward and deeply aromatic — built for chicken curries of every region.", benefits: baseBenefits, features: baseFeatures },
  { slug: "mutton-masala", name: "Mutton Masala", subtitle: "Deep, slow-cooked warmth", category: "blended-spices", image: "/product/muttonmasala.png", origin: "House blend", priceFrom: 220, description: "Heavier on black cardamom and clove — for slow-braised mutton preparations.", benefits: baseBenefits, features: baseFeatures },
  { slug: "chaas-masala", name: "Chaas Masala", subtitle: "Cooling buttermilk blend", category: "blended-spices", image: "/product/chaasmasala.png", origin: "House blend", priceFrom: 110, description: "Mint, cumin, and black salt to crown your summer chaas.", benefits: baseBenefits, features: baseFeatures },
  { slug: "sambhar-masala", name: "Sambhar Masala", subtitle: "South Indian classic", category: "blended-spices", image: "/product/sambharmasala.png", origin: "House blend", priceFrom: 180, description: "Toasted lentils, fenugreek, and curry leaf — sambhar with deep, authentic body.", benefits: baseBenefits, features: baseFeatures },
  { slug: "biryani-masala", name: "Biryani Masala", subtitle: "Aromatic 18-spice blend", category: "blended-spices", image: "/product/biryanimasala.png", origin: "House blend", priceFrom: 320, description: "Eighteen spices balanced to deliver the layered fragrance of a Hyderabadi dum biryani.", benefits: baseBenefits, features: baseFeatures },
  { slug: "pav-bhaji-masala", name: "Pav Bhaji Masala", subtitle: "Mumbai street favorite", category: "blended-spices", image: "/product/pavbhajimasala.png", origin: "House blend", priceFrom: 165, description: "Built for Mumbai's most beloved street dish — buttery, tangy, robust.", benefits: baseBenefits, features: baseFeatures },
  { slug: "pulav-masala", name: "Pulav Masala", subtitle: "Light, fragrant rice", category: "blended-spices", image: "/product/pulavmasala.png", origin: "House blend", priceFrom: 175, description: "Whole-spice forward, lighter than biryani — for delicate vegetable pulav.", benefits: baseBenefits, features: baseFeatures },

  // Seasoning
  { slug: "chilli-flakes", name: "Chilli Flakes", subtitle: "Hand-crushed heat", category: "seasoning", image: "/product/chilliflakes.jpeg", origin: "Hand-crushed in-house", priceFrom: 145, description: "Coarse, vibrant flakes with seeds intact — for pizzas, pastas, and finishing.", benefits: baseBenefits, features: baseFeatures },
  { slug: "oregano", name: "Oregano", subtitle: "Mediterranean essential", category: "seasoning", image: "/product/oregano.png", origin: "Mediterranean", priceFrom: 125, description: "Air-dried oregano leaves with intense aroma — for Italian and Greek cuisine.", benefits: baseBenefits, features: baseFeatures },
  { slug: "peri-peri", name: "Peri Peri", subtitle: "Smoky African blend", category: "seasoning", image: "/product/periperi.jpeg", origin: "House blend", priceFrom: 165, description: "Bird's-eye chilli, smoked paprika and citrus zest — the signature African finisher.", benefits: baseBenefits, features: baseFeatures },
  { slug: "black-pepper-powder", name: "Black Pepper Powder", subtitle: "King of spices", category: "seasoning", image: "/product/blackpepper.jpeg", origin: "Malabar Coast", priceFrom: 195, description: "Stone-ground Tellicherry peppercorns — sharp, citrusy, intensely fragrant.", benefits: baseBenefits, features: baseFeatures },
  { slug: "ginger-powder", name: "Ginger Powder", subtitle: "Sun-dried warmth", category: "seasoning", image: "/product/gingerpowder.png", origin: "Kerala", priceFrom: 175, description: "Sun-dried Kochi ginger ground fine — for chai, baking, and Asian cuisine.", benefits: baseBenefits, features: baseFeatures },
  { slug: "garlic-powder", name: "Garlic Powder", subtitle: "Convenience without compromise", category: "seasoning", image: "/product/garlicpowder.png", origin: "Madhya Pradesh", priceFrom: 155, description: "Dehydrated and finely milled — full flavor without the prep.", benefits: baseBenefits, features: baseFeatures },
  { slug: "black-salt", name: "Black Salt", subtitle: "Mineral kala namak", category: "seasoning", image: "/product/blacksalt.jpeg", origin: "Himalayan foothills", priceFrom: 95, description: "Mineral-rich kala namak with its signature sulfurous tang.", benefits: baseBenefits, features: baseFeatures },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, category: CategorySlug, limit = 3) {
  return products.filter((p) => p.category === category && p.slug !== slug).slice(0, limit);
}

export function isPacketProduct(slug: string) {
  const packetSlugs = [
    "oregano",
    "ginger-powder",
    "garlic-powder"
  ];
  return packetSlugs.includes(slug);
}

export function isLandscapeFallback(slug: string) {
  const fallbackSlugs = [
    "pulav-masala",
    "sambhar-masala",
    "tea-masala"
  ];
  return fallbackSlugs.includes(slug);
}

