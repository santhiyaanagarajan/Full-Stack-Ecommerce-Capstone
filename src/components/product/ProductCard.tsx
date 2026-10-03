import React, { useState } from 'react';
import { Product } from '../../types';
import { LazyImage } from '../common/LazyImage';
import { Link } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { Eye, Plus, Check, Star } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    setIsAdding(true);
    addToCart(product, 1, product.colorOptions?.[0]?.name);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <>
      <article className="group flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        {/* Visual Zone: 65-75% height emphasis */}
        <div className="relative overflow-hidden bg-stone-100">
          <Link to={`/product/${product.slug}`} className="block focus:outline-hidden">
            <LazyImage
              src={product.primaryImage}
              alt={product.name}
              aspectRatio="4/3"
              fallbackTitle={product.name}
              className="group-hover:scale-103 transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Single subtle text tag if present (Strict Zero-Pill: unboxed clean text, no candy badges) */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-2xs">
              {product.badge}
            </div>
          )}

          {/* Quick Action Floating Bar on Hover */}
          <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded-lg shadow-md backdrop-blur-xs transition-colors"
              aria-label={`Quick preview of ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </button>

            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock || isAdding}
              className={`p-2 rounded-lg text-xs font-semibold shadow-md transition-all ${
                isAdding
                  ? 'bg-emerald-600 text-white'
                  : product.inStock
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
              aria-label={`Quick add ${product.name} to cart`}
              title={product.inStock ? 'Add to bag' : 'Out of stock'}
            >
              {isAdding ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Content & Metadata Zone */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
          <div>
            {/* Category & Rating: unboxed text with typographic separator */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
              <span className="uppercase tracking-wider font-medium text-[11px] text-stone-500">
                {product.categoryLabel}
              </span>
              <span className="flex items-center gap-1 text-stone-600">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-xs text-stone-800 tabular-nums">
                  {product.rating}
                </span>
              </span>
            </div>

            {/* Product Name */}
            <h3 className="text-base font-semibold text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1 font-display">
              <Link to={`/product/${product.slug}`} className="focus:outline-hidden">
                {product.name}
              </Link>
            </h3>

            {/* Short subtitle / material kicker */}
            <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing & Stock baseline */}
          <div className="flex items-baseline justify-between pt-2 border-t border-stone-100">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold font-mono text-stone-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-mono text-stone-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <span
              className={`text-[11px] font-medium ${
                product.inStock ? 'text-stone-500' : 'text-stone-400 italic'
              }`}
            >
              {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
