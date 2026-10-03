import { Product, ProductReview } from '../types';

import heroInteriorImg from '../assets/images/hero_modern_interior_1791008720304.jpg';
import speakerImg from '../assets/images/product_acoustic_speaker_1791008734854.jpg';
import ceramicImg from '../assets/images/product_ceramic_vessel_1791008746242.jpg';
import lampImg from '../assets/images/product_desk_lamp_1791008758332.jpg';
import leatherImg from '../assets/images/product_leather_journal_1791008771963.jpg';

export { heroInteriorImg };

export const CATEGORIES: { id: Product['category'] | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'All Artifacts', count: 8 },
  { id: 'audio', label: 'Acoustics & Audio', count: 2 },
  { id: 'ceramics', label: 'Ceramics & Vessels', count: 2 },
  { id: 'lighting', label: 'Luminaires & Lamps', count: 2 },
  { id: 'workspace', label: 'Desk & Workspace', count: 1 },
  { id: 'decor', label: 'Objects & Form', count: 1 },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'aura-soundstone-one',
    name: 'Aura Soundstone One',
    subtitle: 'Cast Aluminum Wireless Audio Transducer',
    category: 'audio',
    categoryLabel: 'Acoustics & Audio',
    price: 380,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 8,
    badge: 'Signature Edition',
    description: 'An architectural acoustic sculpture engineered with dual custom neodymium drivers and a solid knurled brass analogue attenuation dial.',
    longDescription: 'Machined from a single solid billet of aerospace-grade cast aluminum with a tactile bead-blasted obsidian finish. The Soundstone One balances warm resonance with pristine clarity through bespoke acoustic tuning chambers. Integrated with high-resolution wireless streaming and aptX Lossless architecture.',
    dimensions: '240mm × 140mm × 95mm',
    materials: 'Anodized cast aluminum, raw solid brass, acoustic wool damper',
    weight: '3.2 kg',
    features: [
      'Dual 50W Class-D amplification modules with zero-distortion tuning',
      'Solid tactile knurled brass continuous analogue dial',
      'Ultra-low resonance monolithic acoustic enclosure',
      'High-resolution wireless Bluetooth 5.4 with aptX HD & AirPlay 2 support',
      'USB-C audio DAC input for direct studio master playback'
    ],
    careInstructions: 'Wipe gently with the supplied microfiber cloth. Do not apply abrasive solvent cleaners to the brass dial.',
    primaryImage: speakerImg,
    secondaryImage: heroInteriorImg,
    gallery: [speakerImg, heroInteriorImg],
    colorOptions: [
      { name: 'Obsidian Black', hex: '#1C1C1E' },
      { name: 'Champagne Silver', hex: '#D2D0C8' },
      { name: 'Brushed Titanium', hex: '#636266' }
    ]
  },
  {
    id: 'prod-02',
    slug: 'solis-stoneware-vessel',
    name: 'Solis Stoneware Vessel No. 04',
    subtitle: 'Wheel-Thrown Textured Ceramic Amphora',
    category: 'ceramics',
    categoryLabel: 'Ceramics & Vessels',
    price: 165,
    originalPrice: 190,
    rating: 4.8,
    reviewCount: 28,
    inStock: true,
    stockCount: 5,
    badge: 'Handcrafted',
    description: 'Formed by hand using coarse volcanic stoneware with a tactile silica glaze that catches changing daylight.',
    longDescription: 'Each Solis vessel is thrown individually in small numbered batches on a traditional potter wheel in Kyoto, Japan. Fired for 36 hours in an anagama wood kiln, yielding unpredictable surface blooms and an organic, earthy tactile grain. Designed to hold single botanical stems or stand autonomously as pure sculptural presence.',
    dimensions: '180mm diameter × 260mm height',
    materials: 'High-fire volcanic stoneware, unrefined natural ash slip glaze',
    weight: '1.8 kg',
    features: [
      'Individually numbered stamp embossed on the base',
      '36-hour anagama wood-kiln reduction firing',
      'Water-tight interior glazing with raw tactile exterior finish',
      'Subtle natural variations in tone and silica texture'
    ],
    careInstructions: 'Hand wash with mild organic detergent and lukewarm water. Not dishwasher safe.',
    primaryImage: ceramicImg,
    secondaryImage: heroInteriorImg,
    gallery: [ceramicImg, heroInteriorImg],
    colorOptions: [
      { name: 'Raw Sandstone', hex: '#D4C4B5' },
      { name: 'Volcanic Basalt', hex: '#3B3A36' }
    ]
  },
  {
    id: 'prod-03',
    slug: 'cantilever-desk-luminaire',
    name: 'Cantilever Task Luminaire',
    subtitle: 'Counterbalanced Precision LED Light',
    category: 'lighting',
    categoryLabel: 'Luminaires & Lamps',
    price: 295,
    rating: 4.9,
    reviewCount: 37,
    inStock: true,
    stockCount: 12,
    badge: 'Award Winner',
    description: 'A mathematical balance of steel and light, featuring smooth stepless touch dimming and circadian color adjustment.',
    longDescription: 'Engineered with an internal counterbalanced friction hinge calibrated to remain stationary at any acute angle. The integrated high-CRI (98+) LED emitter produces a warm, flicker-free directional glow that reduces eye fatigue during deep focus sessions. The capacitive touch sensor allows effortless micro-adjustments.',
    dimensions: '480mm reach × 420mm height × 120mm base',
    materials: 'Cold-rolled carbon steel, matte graphite powder coating, optical diffuser',
    weight: '2.9 kg',
    features: [
      'High-CRI (>98) flicker-free warm circadian LED module (2700K - 4000K)',
      'Smooth continuous touch capacitive brightness slider',
      'Precision counterbalanced friction mechanism with zero droop',
      'Solid weighted base with concealed anti-scratch felt underlay'
    ],
    careInstructions: 'Disconnect power before dusting with a soft dry cloth. Avoid moisture near capacitive sensor.',
    primaryImage: lampImg,
    secondaryImage: heroInteriorImg,
    gallery: [lampImg, heroInteriorImg],
    colorOptions: [
      { name: 'Matte Graphite', hex: '#26282A' },
      { name: 'Warm Putty', hex: '#C2BEB5' }
    ]
  },
  {
    id: 'prod-04',
    slug: 'atelier-leather-desk-folio',
    name: 'Atelier Vegetable-Tanned Desk Folio',
    subtitle: 'Full-Grain Tuscan Saddle Leather & Refillable Block',
    category: 'workspace',
    categoryLabel: 'Desk & Workspace',
    price: 140,
    originalPrice: 160,
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    stockCount: 15,
    badge: 'Artisan Crafted',
    description: 'Constructed from natural Italian vegetable-tanned leather that develops a rich, unique patina over decades of daily ritual.',
    longDescription: 'Hand-burnished edges and linen saddle stitching ensure lifetime durability. Accommodates standard A5 notebooks, tablets, and pens with a minimal magnetic catch. Comes included with an archival-quality 100gsm fountain pen friendly paper block.',
    dimensions: '235mm × 170mm × 22mm',
    materials: 'Full-grain Tuscan bridle leather, waxed linen thread, brushed brass hardware',
    weight: '0.45 kg',
    features: [
      'Concealed magnetic closure with satisfying tactile snap',
      'Pen sleeve calibrated for fountain pens and drafting styluses',
      'Internal dual business card & document slip pocket',
      'Includes 160-page fountain pen proof numbered notebook'
    ],
    careInstructions: 'Condition annually with natural beeswax or leather balm to preserve moisture and deepen patina.',
    primaryImage: leatherImg,
    secondaryImage: heroInteriorImg,
    gallery: [leatherImg, heroInteriorImg],
    colorOptions: [
      { name: 'Caramel Saddle', hex: '#99582A' },
      { name: 'Dark Espresso', hex: '#3E2723' },
      { name: 'Natural Vachetta', hex: '#D7B49E' }
    ]
  },
  {
    id: 'prod-05',
    slug: 'monolith-travertine-pedestal',
    name: 'Monolith Travertine Object Stand',
    subtitle: 'Honed Roman Travertine Display Block',
    category: 'decor',
    categoryLabel: 'Objects & Form',
    price: 110,
    rating: 4.6,
    reviewCount: 15,
    inStock: true,
    stockCount: 9,
    description: 'Quarried in Tivoli, Italy, with distinctive natural porous cavities and hand-honed chamfered perimeter facets.',
    longDescription: 'A versatile anchor for your tabletop, nightstand, or entryway. Perfect as an elevation plinth for ceramics, watch collection display, or standalone architectural sculpture.',
    dimensions: '200mm × 120mm × 35mm',
    materials: 'Unfilled honed natural Roman travertine stone',
    weight: '2.1 kg',
    features: [
      'Every stone has unique organic pore formations and mineral veining',
      'Beveled 45-degree edge detailing',
      'Natural matte sealant protecting against light stains',
      'Non-abrasive rubber footings on the underside'
    ],
    careInstructions: 'Blot spills immediately. Do not expose to acidic solutions like citrus or vinegar.',
    primaryImage: heroInteriorImg,
    secondaryImage: ceramicImg,
    gallery: [heroInteriorImg, ceramicImg],
    colorOptions: [
      { name: 'Warm Cream Travertine', hex: '#E6DCB8' }
    ]
  },
  {
    id: 'prod-06',
    slug: 'kyoto-linear-pendant',
    name: 'Kyoto Linear Ceiling Pendant',
    subtitle: 'Brushed Brass & Acid-Etched Opal Glass',
    category: 'lighting',
    categoryLabel: 'Luminaires & Lamps',
    price: 490,
    originalPrice: 550,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    stockCount: 4,
    badge: 'Limited Run',
    description: 'A slender architectural suspension bar casting serene, glare-free 360-degree ambient luminescence.',
    longDescription: 'Suspended by ultra-fine braided steel wires, the Kyoto pendant creates the illusion of floating light. Crafted from solid unlacquered brass that matures gracefully alongside mouth-blown satin opal glass.',
    dimensions: '1100mm length × 50mm diameter × 1800mm max drop',
    materials: 'Solid brass, mouth-blown triplex opal glass, stainless steel cables',
    weight: '4.2 kg',
    features: [
      'Compatible with leading edge and trailing edge TRIAC dimmers',
      'CRI 95+ warm ambient 2700K integrated LED strip',
      'Adjustable suspension height up to 1.8 meters',
      'Includes brass ceiling canopy and mounting hardware'
    ],
    careInstructions: 'Wipe glass when cool using glass cleaner. Brass will naturally develop character patina.',
    primaryImage: lampImg,
    secondaryImage: heroInteriorImg,
    gallery: [lampImg, heroInteriorImg]
  },
  {
    id: 'prod-07',
    slug: 'kado-textured-stoneware-carafe',
    name: 'Kado Stoneware Water Carafe',
    subtitle: 'Thermal Retention Glaze with Oak Stopper',
    category: 'ceramics',
    categoryLabel: 'Ceramics & Vessels',
    price: 85,
    rating: 4.8,
    reviewCount: 31,
    inStock: true,
    stockCount: 14,
    description: 'A minimalist 1-liter bedside carafe combining thick stoneware thermal mass with a turned natural white oak ball stopper.',
    longDescription: 'Designed for daily hydration rituals. The ergonomic neck provides an intuitive thumb rest, while the unglazed exterior base maintains a firm grip even when condensation forms.',
    dimensions: '110mm diameter × 230mm height (1.1L capacity)',
    materials: 'Food-safe glazed stoneware, FSC-certified turned oak',
    weight: '0.9 kg',
    features: [
      '1100ml generous volume capacity',
      'Precision drip-free pour lip',
      'Thermal mass keeps cold spring water chilled for hours',
      'Odor and stain resistant porcelain-grade interior glaze'
    ],
    careInstructions: 'Carafe body is dishwasher safe. Wipe oak stopper with food-safe mineral oil periodically.',
    primaryImage: ceramicImg,
    secondaryImage: heroInteriorImg,
    gallery: [ceramicImg, heroInteriorImg]
  },
  {
    id: 'prod-08',
    slug: 'sonus-desktop-monitors',
    name: 'Sonus Nearfield Active Monitors',
    subtitle: 'Pair of Minimalist Beryllium Dome Studio Speakers',
    category: 'audio',
    categoryLabel: 'Acoustics & Audio',
    price: 520,
    originalPrice: 580,
    rating: 5.0,
    reviewCount: 16,
    inStock: false,
    stockCount: 0,
    badge: 'Sold Out - Restocking',
    description: 'Precision nearfield reference monitors engineered for accurate acoustic reproduction and zero cabinet distortion.',
    longDescription: 'Engineered for audio engineers, architects, and discerning listeners. Featuring 1-inch pure beryllium dome tweeters and 4-inch woven carbon fiber woofers driven by dual dedicated digital DSP amplifiers.',
    dimensions: '160mm width × 220mm depth × 260mm height (each)',
    materials: 'High-density fiberboard, matte polyurethane finish, beryllium',
    weight: '7.8 kg (pair)',
    features: [
      'Pure beryllium dome tweeters for smooth frequency response up to 40kHz',
      'DSP boundary compensation EQ switches for desk placement',
      'Balanced XLR and optical TOSLINK digital inputs',
      'Includes silicone vibration isolation isolation wedges'
    ],
    careInstructions: 'Keep away from direct heat sources. Dust drivers with dry feather duster only.',
    primaryImage: speakerImg,
    secondaryImage: heroInteriorImg,
    gallery: [speakerImg, heroInteriorImg]
  }
];

export const MOCK_REVIEWS: Record<string, ProductReview[]> = {
  'prod-01': [
    {
      id: 'rev-1',
      author: 'Marcus Vance',
      location: 'Stockholm, Sweden',
      rating: 5,
      date: 'May 14, 2026',
      comment: 'The brass attenuation dial has such a weighted, luxurious resistance. Soundstage is remarkably expansive for its footprint. Worth every euro.',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Evelyn Choi',
      location: 'Vancouver, Canada',
      rating: 5,
      date: 'June 02, 2026',
      comment: 'Stunning industrial design. Pairs effortlessly with my studio workstation. The bass response is tight and articulate without any mud.',
      verified: true
    }
  ],
  'prod-02': [
    {
      id: 'rev-3',
      author: 'Kaelen Thorne',
      location: 'Melbourne, Australia',
      rating: 5,
      date: 'April 20, 2026',
      comment: 'The organic silica glaze texture feels incredible in the hands. It looks like an ancient archaeological discovery rendered in contemporary form.',
      verified: true
    }
  ],
  'prod-03': [
    {
      id: 'rev-4',
      author: 'Helena Berg',
      location: 'Copenhagen, Denmark',
      rating: 5,
      date: 'July 11, 2026',
      comment: 'The counterbalanced hinge moves like a surgical instrument. Zero droop, perfect warm light spectrum for night reading.',
      verified: true
    }
  ]
};

export const PROMO_CODES: Record<string, number> = {
  'CAPSTONE10': 0.10, // 10% off
  'AURA20': 0.20,     // 20% off
  'WELCOME5': 0.05,   // 5% off
};
