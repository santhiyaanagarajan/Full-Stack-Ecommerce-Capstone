import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';
import { CartItemRow } from './CartItemRow';
import { CheckoutModal } from './CheckoutModal';
import { X, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    totalItems,
    subtotal,
    discount,
    discountCode,
    applyPromoCode,
    removePromoCode,
    shipping,
    tax,
    total,
    freeShippingRemaining,
    freeShippingThreshold,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const { navigate } = useRouter();
  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res.message);
    if (res.success) {
      setPromoInput('');
    }
  };

  const freeShippingPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => setIsCartDrawerOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-250 border-l border-stone-200">
            {/* Header */}
            <div className="p-5 border-b border-stone-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
                <h3 className="text-base font-bold text-stone-900 tracking-tight font-display">
                  Shopping Bag
                </h3>
                <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-mono">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress bar */}
            <div className="px-5 py-3 bg-stone-50 border-b border-stone-200/80 text-xs">
              <div className="flex items-center justify-between text-stone-700 mb-1.5 font-medium">
                {freeShippingRemaining > 0 ? (
                  <span>
                    Add <strong className="font-mono text-stone-900">${freeShippingRemaining}</strong> more for complimentary delivery
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Complimentary worldwide shipping unlocked!
                  </span>
                )}
                <span className="font-mono text-[11px] text-stone-500">{freeShippingPercent}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items or Empty State */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-8 h-8 stroke-[1.3]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-stone-900 font-display">
                      Your Bag is Empty
                    </h4>
                    <p className="text-xs text-stone-500 max-w-xs">
                      Explore our handcrafted acoustic instruments, ceramics, and architectural luminaires.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigate('/products');
                    }}
                    className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    Explore Catalog
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {cart.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQty={updateQuantity}
                      onRemove={removeFromCart}
                      compact
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-200/80 bg-stone-50/70 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (e.g. CAPSTONE10)"
                        className="w-full text-xs pl-8 pr-2.5 py-1.5 bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900 uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {discountCode && (
                    <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      <span>Code <strong>{discountCode}</strong> applied</span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-stone-500 hover:text-stone-800 underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {promoFeedback && !discountCode && (
                    <p className="text-[11px] text-stone-600 italic">{promoFeedback}</p>
                  )}
                </form>

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Promotional Discount</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Estimated Tax</span>
                    <span>${tax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2">
                    <span>Estimated Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Checkout Trigger & Full Cart View */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>Proceed to Checkout · ${total}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigate('/cart');
                    }}
                    className="w-full text-center text-xs font-medium text-stone-600 hover:text-stone-900 py-1 transition-colors"
                  >
                    View Full Cart Page & Shipping Calculator
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};
