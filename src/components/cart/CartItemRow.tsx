import React from 'react';
import { CartItem } from '../../types';
import { LazyImage } from '../common/LazyImage';
import { Link } from '../../context/RouterContext';
import { Trash2 } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  compact?: boolean;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQty,
  onRemove,
  compact = false,
}) => {
  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100 last:border-0 items-start">
      {/* Thumbnail */}
      <Link
        to={`/product/${item.product.slug}`}
        className={`shrink-0 rounded-lg overflow-hidden border border-stone-200 block ${
          compact ? 'w-16 h-16' : 'w-20 h-20 sm:w-24 sm:h-24'
        }`}
      >
        <LazyImage
          src={item.product.primaryImage}
          alt={item.product.name}
          aspectRatio="1/1"
          fallbackTitle={item.product.name}
        />
      </Link>

      {/* Info & Controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full gap-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-stone-900 truncate hover:text-stone-700 transition-colors">
              <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
            </h4>
            {item.selectedColor && (
              <p className="text-[11px] text-stone-500 mt-0.5">Finish: {item.selectedColor}</p>
            )}
            <p className="text-[11px] text-stone-400 sm:hidden font-mono mt-0.5">
              ${item.product.price} each
            </p>
          </div>

          <span className="text-xs sm:text-sm font-bold font-mono text-stone-900 tabular-nums shrink-0">
            ${lineTotal}
          </span>
        </div>

        {/* Quantity Stepper & Remove */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 text-xs">
            <button
              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
              className="px-2.5 py-1 text-stone-600 hover:text-stone-900 font-medium"
              aria-label={`Decrease quantity of ${item.product.name}`}
            >
              -
            </button>
            <span className="px-2.5 py-1 font-mono font-medium text-stone-900 tabular-nums text-xs">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stockCount}
              className="px-2.5 py-1 text-stone-600 hover:text-stone-900 font-medium disabled:opacity-30"
              aria-label={`Increase quantity of ${item.product.name}`}
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
            aria-label={`Remove ${item.product.name} from bag`}
            title="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
