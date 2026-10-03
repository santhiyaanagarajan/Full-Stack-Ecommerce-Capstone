import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS, MOCK_REVIEWS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { LazyImage } from '../components/common/LazyImage';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { ProductReview } from '../types';
import {
  Star,
  Check,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { route, navigate } = useRouter();
  const { addToCart } = useCart();

  const slug = route.params.slug;
  const product = PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  // Fallback 404 state
  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold text-stone-900 font-display">Artifact Not Found</h1>
        <p className="text-xs text-stone-500">
          The requested product could not be located in our current catalog archive.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'care'>('specs');

  // Customer reviews state
  const [reviews, setReviews] = useState<ProductReview[]>(
    MOCK_REVIEWS[product.id] || [
      {
        id: 'rev-def',
        author: 'Julian Becker',
        location: 'Berlin, Germany',
        rating: 5,
        date: 'Recent Purchase',
        comment: 'Exemplary craftsmanship. Every surface finish and material seam demonstrates uncompromising industrial design discipline.',
        verified: true,
      },
    ]
  );

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewLocation.trim() || 'Verified Collector',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || undefined);
  };

  const currentImg = product.gallery[activeImageIndex] || product.primaryImage;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: 'Catalog', to: '/products' },
          { label: product.categoryLabel, to: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      {/* Main PDP Grid: Gallery Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-xs relative">
            <LazyImage
              src={currentImg}
              alt={product.name}
              aspectRatio="4/3"
              fallbackTitle={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded shadow-2xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-stone-900 ring-2 ring-stone-900/10'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Header & Title */}
          <div className="space-y-2 border-b border-stone-200/80 pb-6">
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider font-medium">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-stone-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} collector reviews)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display tracking-tight">
              {product.name}
            </h1>

            <p className="text-xs text-stone-500 leading-normal">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-bold font-mono text-stone-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base font-mono text-stone-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-semibold text-emerald-700">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>
          </div>

          {/* Description Prose */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.longDescription}
          </p>

          {/* Color / Variant Selection */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-900">Finish Option:</span>
                <span className="text-stone-500">{selectedColor || product.colorOptions[0].name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colorOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all border ${
                      selectedColor === c.name
                        ? 'border-stone-900 bg-stone-100 font-semibold text-stone-900 shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Module */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 text-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-stone-600 hover:text-stone-900 font-semibold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 font-mono font-bold text-stone-900 tabular-nums min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  disabled={quantity >= product.stockCount}
                  className="px-3.5 py-3 text-stone-600 hover:text-stone-900 font-semibold disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 py-3.5 px-6 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.inStock
                    ? `Add to Bag · $${product.price * quantity}`
                    : 'Currently Out of Stock'}
                </span>
              </button>
            </div>

            {/* Live Inventory Status */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    product.inStock ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <span className="font-medium text-stone-700">
                  {product.inStock
                    ? `${product.stockCount} units available in Kyoto vault`
                    : 'Awaiting next kiln/assembly run'}
                </span>
              </span>

              <span>Dispatched within 24h</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200/80 text-xs text-stone-600">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50">
              <Truck className="w-4 h-4 text-stone-800 shrink-0" />
              <span>Complimentary shipping over $200</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-50">
              <RotateCcw className="w-4 h-4 text-stone-800 shrink-0" />
              <span>30-day architectural trial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Details Tabs */}
      <section className="mt-16 pt-12 border-t border-stone-200">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 text-xs font-semibold transition-colors relative ${
                activeTab === 'specs'
                  ? 'text-stone-900 border-b-2 border-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-2 text-xs font-semibold transition-colors relative ${
                activeTab === 'features'
                  ? 'text-stone-900 border-b-2 border-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Architectural Features
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-2 text-xs font-semibold transition-colors relative ${
                activeTab === 'care'
                  ? 'text-stone-900 border-b-2 border-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Material Care & Maintenance
            </button>
          </div>

          {/* Tab Contents */}
          <div className="text-xs sm:text-sm text-stone-700">
            {activeTab === 'specs' && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/70">
                  <dt className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Dimensions
                  </dt>
                  <dd className="font-mono text-stone-900 font-semibold">{product.dimensions}</dd>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/70">
                  <dt className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Net Weight
                  </dt>
                  <dd className="font-mono text-stone-900 font-semibold">{product.weight}</dd>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/70">
                  <dt className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Composition
                  </dt>
                  <dd className="text-stone-900 font-medium">{product.materials}</dd>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/70">
                  <dt className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Origin & Fabrication
                  </dt>
                  <dd className="text-stone-900 font-medium">Kyoto Workshop & Copenhagen Design Lab</dd>
                </div>
              </dl>
            )}

            {activeTab === 'features' && (
              <ul className="space-y-3 p-6 bg-stone-50 rounded-xl border border-stone-200/70">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'care' && (
              <div className="p-6 bg-stone-50 rounded-xl border border-stone-200/70 space-y-3">
                <h4 className="font-semibold text-stone-900">Conservation Protocol</h4>
                <p className="leading-relaxed">{product.careInstructions}</p>
                <p className="text-stone-500 text-xs">
                  All natural brass and vegetable-tanned leathers react to ambient humidity and human touch, developing a noble organic patina over years of intentional usage.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="mt-16 pt-12 border-t border-stone-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 font-display">
                Collector Reviews ({reviews.length})
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Verified impressions from architects, acoustic designers, and collectors.
              </p>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* New Review Submission Form */}
          {showReviewForm && (
            <form
              onSubmit={handleAddReview}
              className="p-6 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-200"
            >
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                Submit Your Evaluation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Liam Sterling"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Location / Studio</label>
                  <input
                    type="text"
                    value={newReviewLocation}
                    onChange={(e) => setNewReviewLocation(e.target.value)}
                    placeholder="e.g. Zurich, Switzerland"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewReviewRating(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        newReviewRating === r
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {r} Stars
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Review Impressions</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details regarding material texture, acoustic output, or daily performance..."
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Publish Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 bg-white border border-stone-200/80 rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{rev.author}</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-500">{rev.location}</span>
                    {rev.verified && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-stone-400 text-[11px]">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-stone-600 leading-relaxed text-xs sm:text-sm">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Recommendation */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
};
