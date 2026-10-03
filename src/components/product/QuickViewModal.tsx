import React, { useState } from 'react';
import { Product } from '../../types';
import { Modal } from '../common/Modal';
import { LazyImage } from '../common/LazyImage';
import { useCart } from '../../context/CartContext';
import { Link } from '../../context/RouterContext';
import { Star, Check, ShoppingBag, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const currentColor = selectedColor || product.colorOptions?.[0]?.name;

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} maxWidth="3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product Media */}
        <div className="space-y-3">
          <LazyImage
            src={product.primaryImage}
            alt={product.name}
            aspectRatio="4/3"
            fallbackTitle={product.name}
            className="rounded-xl border border-stone-200"
          />
          {product.badge && (
            <div className="text-xs text-stone-500 font-medium tracking-wide">
              {product.badge}
            </div>
          )}
        </div>

        {/* Product Purchase & Summary Details */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-1">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-stone-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} reviews)</span>
              </span>
            </div>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight font-display">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 mt-1">{product.subtitle}</p>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-mono text-stone-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-b border-stone-100 py-3">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colorOptions && product.colorOptions.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-800">
                Finish / Material: <span className="font-normal text-stone-500">{currentColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {product.colorOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border ${
                      currentColor === c.name
                        ? 'border-stone-900 bg-stone-100 font-medium text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono font-medium text-stone-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.inStock ? 'Add to Bag' : 'Out of Stock'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {product.inStock ? `${product.stockCount} available for dispatch` : 'Restocking soon'}
              </span>
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="text-stone-900 font-medium inline-flex items-center gap-1 hover:underline underline-offset-2"
              >
                Full Specifications <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
