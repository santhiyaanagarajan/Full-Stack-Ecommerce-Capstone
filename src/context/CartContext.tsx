import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, OrderReceipt, CustomerInfo } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  discountCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  dismissToast: () => void;
  orders: OrderReceipt[];
  createOrder: (customer: CustomerInfo) => OrderReceipt;
}

const CART_STORAGE_KEY = 'aura_objects_cart_v1';
const ORDERS_STORAGE_KEY = 'aura_objects_orders_v1';
const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_RATE = 15;
const TAX_RATE = 0.08; // 8%

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderReceipt[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const dismissToast = () => setToastMessage(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    if (!product.inStock) {
      showToast(`${product.name} is currently out of stock`);
      return;
    }

    const itemKey = `${product.id}-${selectedColor || 'default'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentQty = updated[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, product.stockCount);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          product,
          quantity: Math.min(quantity, product.stockCount),
          selectedColor,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const maxStock = item.product.stockCount;
          return {
            ...item,
            quantity: Math.min(quantity, maxStock),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode('');
    setDiscountRate(0);
  };

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      setDiscountCode(normalized);
      setDiscountRate(PROMO_CODES[normalized]);
      showToast(`Promo code "${normalized}" applied (${PROMO_CODES[normalized] * 100}% off)`);
      return {
        success: true,
        message: `Code applied: ${(PROMO_CODES[normalized] * 100)}% savings!`,
      };
    }
    return {
      success: false,
      message: 'Invalid promotional code. Try "CAPSTONE10" for 10% off.',
    };
  };

  const removePromoCode = () => {
    setDiscountCode('');
    setDiscountRate(0);
    showToast('Promo code removed');
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountRate);
  const discountedSubtotal = subtotal - discount;

  const shipping = totalItems === 0 ? 0 : discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const tax = Math.round(discountedSubtotal * TAX_RATE);
  const total = totalItems === 0 ? 0 : discountedSubtotal + shipping + tax;

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);

  const createOrder = (customer: CustomerInfo): OrderReceipt => {
    const orderNumber = `AO-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReceipt: OrderReceipt = {
      orderId: orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: [...cart],
      customer,
      subtotal,
      discount,
      discountCode: discountCode || undefined,
      shipping,
      tax,
      total,
      status: 'Confirmed',
    };

    setOrders((prev) => [newReceipt, ...prev]);
    clearCart();
    return newReceipt;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        discountCode,
        applyPromoCode,
        removePromoCode,
        shipping,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        toastMessage,
        dismissToast,
        orders,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
