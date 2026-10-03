import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { CustomerInfo, OrderReceipt } from '../../types';
import { Modal } from '../common/Modal';
import { useRouter } from '../../context/RouterContext';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, ArrowRight, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, discount, shipping, tax, total, createOrder } = useCart();
  const { navigate } = useRouter();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [completedOrder, setCompletedOrder] = useState<OrderReceipt | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required for dispatch';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const receipt = createOrder(formData);
      setCompletedOrder(receipt);
      setIsSubmitting(false);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    onClose();
    navigate('/products');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isSubmitting) {
          setCompletedOrder(null);
          onClose();
        }
      }}
      title={completedOrder ? 'Order Confirmation Receipt' : 'Complete Your Purchase'}
      maxWidth="3xl"
    >
      {completedOrder ? (
        /* Order Confirmation Success Receipt View */
        <div className="space-y-6 py-2">
          <div className="text-center space-y-2 pb-6 border-b border-stone-200">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-display">
              Thank You, {completedOrder.customer.fullName.split(' ')[0]}
            </h3>
            <p className="text-xs text-stone-500">
              Order <strong className="font-mono text-stone-900">{completedOrder.orderId}</strong> has
              been confirmed and sent to our Kyoto & Copenhagen workshop.
            </p>
          </div>

          {/* Receipt Breakdown Card */}
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-xs space-y-4">
            <div className="flex justify-between items-center text-stone-600 border-b border-stone-200/80 pb-3">
              <div>
                <span className="text-stone-400 block">Date of Order</span>
                <span className="font-medium text-stone-900">{completedOrder.date}</span>
              </div>
              <div className="text-right">
                <span className="text-stone-400 block">Payment Method</span>
                <span className="font-medium text-stone-900 uppercase">
                  {completedOrder.customer.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : completedOrder.customer.paymentMethod === 'apple-pay'
                    ? 'Apple Pay'
                    : 'Credit Card'}
                </span>
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <span className="text-stone-400 block mb-1">Shipping Destination</span>
              <p className="font-medium text-stone-800">
                {completedOrder.customer.fullName} · {completedOrder.customer.address},{' '}
                {completedOrder.customer.city} {completedOrder.customer.postalCode},{' '}
                {completedOrder.customer.country}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-2 border-t border-stone-200/80 pt-3">
              <span className="text-stone-400 block">Purchased Artifacts</span>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-stone-700">
                  <span>
                    {item.quantity}× {item.product.name}{' '}
                    {item.selectedColor ? `(${item.selectedColor})` : ''}
                  </span>
                  <span className="font-mono font-medium">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total figures */}
            <div className="border-t border-stone-200 pt-3 space-y-1.5 font-mono">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${completedOrder.subtotal}</span>
              </div>
              {completedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Savings ({completedOrder.discountCode})</span>
                  <span>-${completedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{completedOrder.shipping === 0 ? 'Complimentary' : `$${completedOrder.shipping}`}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax</span>
                <span>${completedOrder.tax}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-300 pt-2">
                <span>Total Paid</span>
                <span>${completedOrder.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={handleFinish}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <span>Continue Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Checkout Form View */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Customer & Address Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                1. Delivery Coordinates
              </h3>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Maya Lindqvist"
                  className={`w-full text-xs px-3 py-2 bg-stone-50 border rounded-lg focus:outline-hidden ${
                    errors.fullName ? 'border-rose-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className={`w-full text-xs px-3 py-2 bg-stone-50 border rounded-lg focus:outline-hidden ${
                      errors.email ? 'border-rose-500' : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full text-xs px-3 py-2 bg-stone-50 border rounded-lg focus:outline-hidden ${
                      errors.phone ? 'border-rose-500' : 'border-stone-300 focus:border-stone-900'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="144 Orchard Street, Apt 4B"
                  className={`w-full text-xs px-3 py-2 bg-stone-50 border rounded-lg focus:outline-hidden ${
                    errors.address ? 'border-rose-500' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="10002"
                    className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-stone-700 mb-1">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full text-xs px-2.5 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-hidden focus:border-stone-900"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Japan">Japan</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Payment Method & Review */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                2. Payment Method
              </h3>

              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 font-medium'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="accent-stone-900"
                  />
                  <CreditCard className="w-4 h-4 text-stone-700" />
                  <div className="flex-1 text-xs">
                    <span className="text-stone-900 font-semibold block">Credit / Debit Card</span>
                    <span className="text-stone-500 text-[11px]">Visa, Mastercard, Amex (Sandbox Mode)</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 font-medium'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-stone-900"
                  />
                  <Banknote className="w-4 h-4 text-stone-700" />
                  <div className="flex-1 text-xs">
                    <span className="text-stone-900 font-semibold block">Cash on Delivery (COD)</span>
                    <span className="text-stone-500 text-[11px]">Pay upon physical courier receipt</span>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-xs">
                  <div>
                    <label className="block text-[11px] text-stone-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      defaultValue="4000 •••• •••• 9010"
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-stone-300 rounded font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-stone-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="842"
                        className="w-full text-xs px-2.5 py-1.5 bg-white border border-stone-300 rounded font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order total preview */}
              <div className="p-4 bg-stone-100/70 rounded-xl space-y-2 text-xs font-mono">
                <div className="flex justify-between text-stone-600">
                  <span>Cart Items ({cart.length})</span>
                  <span>${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Savings</span>
                    <span>-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Taxes (8%)</span>
                  <span>${tax}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-300 pt-2">
                  <span>Total Amount</span>
                  <span>${total}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-bit encrypted checkout with 30-day architectural guarantee</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-stone-600 hover:text-stone-900 underline underline-offset-2"
            >
              Return to Bag
            </button>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order · ${total}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
