import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CheckoutModal } from '../components/cart/CheckoutModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
} from 'lucide-react';

export const CartPage: React.FC = () => {
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
    updateQuantity,
    removeFromCart,
    clearCart,
    orders,
  } = useCart();

  const { navigate } = useRouter();
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'history'>('cart');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg(res.message);
    if (res.success) {
      setPromoInput('');
    }
  };

  const freeShippingPercent = Math.min(
    100,
    Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

      {/* Page Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-display tracking-tight">
            Your Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review your selected artifacts, shipping threshold, and dispatch preferences.
          </p>
        </div>

        {/* Tab to view active cart or past order history */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('cart')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeTab === 'cart'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Active Bag ({totalItems})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-md transition-all ${
              activeTab === 'history'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Order Archive ({orders.length})
          </button>
        </div>
      </div>

      {activeTab === 'history' ? (
        /* Order History View */
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-3">
              <Clock className="w-10 h-10 text-stone-400 mx-auto stroke-[1.5]" />
              <h3 className="text-base font-semibold text-stone-900 font-display">
                No Past Orders in Archive
              </h3>
              <p className="text-xs text-stone-500">
                When you complete an order, your official confirmed receipt and shipping log will be archived here.
              </p>
              <button
                onClick={() => setActiveTab('cart')}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Return to Bag
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 text-sm">
                          {ord.orderId}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500">Placed on {ord.date}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-stone-500 block">Total Invoiced</span>
                      <span className="font-mono font-bold text-stone-900 text-base">
                        ${ord.total}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-stone-700">
                        <span>
                          {it.quantity}× {it.product.name}{' '}
                          {it.selectedColor ? `(${it.selectedColor})` : ''}
                        </span>
                        <span className="font-mono">${it.product.price * it.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span>Recipient: {ord.customer.fullName} · {ord.customer.city}, {ord.customer.country}</span>
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1 text-stone-800 font-semibold hover:underline"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : cart.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-2xl border border-stone-200 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8 stroke-[1.3]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-stone-900 font-display">Your Bag is Empty</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              You haven't selected any artifacts yet. Discover acoustic speakers, ceramics, and architectural luminaires in our collection.
            </p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-xs"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Active Cart Table & Summary */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping bar */}
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2 text-xs">
              <div className="flex justify-between items-center font-medium">
                {freeShippingRemaining > 0 ? (
                  <span>
                    Add <strong className="font-mono text-stone-900">${freeShippingRemaining}</strong> more for complimentary delivery
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Complimentary worldwide courier delivery activated!
                  </span>
                )}
                <span className="font-mono text-stone-500">{freeShippingPercent}%</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full transition-all duration-300"
                  style={{ width: `${freeShippingPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs divide-y divide-stone-100">
              <div className="flex justify-between items-center pb-4 text-xs font-medium text-stone-500">
                <span>Selected Items ({totalItems})</span>
                <button
                  onClick={clearCart}
                  className="text-stone-400 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Bag</span>
                </button>
              </div>

              {cart.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-xs">
              <Link
                to="/products"
                className="text-stone-700 hover:text-stone-900 font-medium inline-flex items-center gap-1.5 underline underline-offset-2"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-6 lg:sticky lg:top-24">
            <h2 className="text-base font-bold text-stone-900 font-display tracking-tight border-b border-stone-100 pb-3">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-medium text-stone-700">Promotional Voucher</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. CAPSTONE10"
                    className="w-full text-xs pl-8 pr-2.5 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>

              {discountCode && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span>Code <strong>{discountCode}</strong> Applied</span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-stone-500 hover:text-stone-900 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoMsg && !discountCode && (
                <p className="text-[11px] text-stone-500 italic">{promoMsg}</p>
              )}
            </form>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 text-xs font-mono border-t border-stone-100 pt-4">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotional Savings</span>
                  <span>-${discount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? 'COMPLIMENTARY' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax (8%)</span>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 border-t border-stone-200 pt-3">
                <span>Total Due</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-[11px] text-stone-500 space-y-2 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-day return policy and carbon-neutral transit guarantee.</span>
              </div>
              <p>Supports Credit Card, Apple Pay, and Cash on Delivery.</p>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </div>
  );
};
