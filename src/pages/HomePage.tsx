import React from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { PRODUCTS, heroInteriorImg } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { LazyImage } from '../components/common/LazyImage';
import { ArrowRight, ShieldCheck, Sparkles, Compass, Layers, Volume2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();

  // Curated 3 featured products
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28 pb-12">
      {/* 1. Hero Campaign Section (Storefront Hero per e-commerce guidelines) */}
      <section className="relative overflow-hidden pt-4 sm:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium uppercase tracking-widest">
                <span>The 2026 Collection</span>
                <span aria-hidden="true">·</span>
                <span>Kyoto & Copenhagen</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.08] font-display text-balance">
                Architectural artifacts for tactile living.
              </h1>

              <p className="text-sm sm:text-base text-stone-600 max-w-lg leading-relaxed">
                Sculptural acoustic instruments, wheel-thrown volcanic ceramics, and precision luminaires engineered to quiet the mind and elevate everyday rituals.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all shadow-md group"
                >
                  <span>Explore All Artifacts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/products?category=audio"
                  className="px-5 py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  Acoustic Systems
                </Link>
              </div>

              {/* Adjacent proof indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 text-stone-700">
                <div>
                  <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">100%</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Recyclable Alloys</div>
                </div>
                <div>
                  <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">36hr</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Anagama Kiln Fired</div>
                </div>
                <div>
                  <div className="text-lg font-bold font-mono text-stone-900 tabular-nums">Lifetime</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Bespoke Guarantee</div>
                </div>
              </div>
            </div>

            {/* Right Media Focal Anchor */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                <LazyImage
                  src={heroInteriorImg}
                  alt="Aura Studio Scandinavian architectural living interior"
                  aspectRatio="16/9"
                  fallbackTitle="Aura Studio 2026 Interior Collection"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-xs space-y-1">
                    <span className="font-semibold block text-sm font-display tracking-wide">
                      The Sanctuary Suite · Residence No. 8
                    </span>
                    <p className="text-stone-300 text-[11px]">
                      Featuring the Soundstone One and Cantilever Luminaire in natural morning illumination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-1 font-medium">
              <span>Curated Selection</span>
              <span aria-hidden="true">·</span>
              <span>Small-Batch Run</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Signature Artifacts
            </h2>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-stone-700 underline underline-offset-4"
          >
            <span>View Full Catalog ({PRODUCTS.length} objects)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Craftsmanship & Material Philosophy (Claim-to-Proof Adjacency) */}
      <section className="bg-white border-y border-stone-200/80 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest block mb-2">
              Materials & Fabrication
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display text-balance">
              Raw mineral mass, precision CNC joinery, and warm analogue touch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                <Volume2 className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                01. Acoustic Damping
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cabinets milled from monolithic aluminum blocks minimize secondary micro-resonances, preserving pure harmonic timbre across both quiet whispers and orchestral peaks.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                <Layers className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                02. Mineral & Stoneware
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Quarried Roman travertine and Japanese volcanic stoneware fired in wood-fueled kilns. No two pieces share identical crystallization or surface ash patterning.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-stone-900 font-display">
                03. Built for Longevity
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Designed for continuous user servicing. Internal modular drivers, solid unlacquered brass hardware, and replaceable batteries ensure lifelong utility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Category Quick Launch */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block">
              Curated Space Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Ready to compose your personal sanctuary?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Explore the complete catalog with live filtering, real-time stock counters, and complimentary delivery on orders over $200.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3.5 bg-white text-stone-950 hover:bg-stone-100 rounded-xl text-xs font-semibold transition-colors text-center"
            >
              Browse Full Catalog
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-3.5 bg-stone-800 text-white hover:bg-stone-700 rounded-xl text-xs font-semibold transition-colors text-center"
            >
              Contact Studio Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
