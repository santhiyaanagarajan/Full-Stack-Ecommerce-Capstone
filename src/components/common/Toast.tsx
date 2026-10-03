import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, dismissToast, setIsCartDrawerOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className="bg-stone-900 text-stone-100 shadow-2xl rounded-xl p-4 flex items-center justify-between gap-3 border border-stone-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium text-stone-200 truncate">{toastMessage}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              dismissToast();
              setIsCartDrawerOpen(true);
            }}
            className="text-[11px] font-semibold text-white underline underline-offset-2 hover:text-stone-300 transition-colors"
          >
            View Bag
          </button>
          <button
            onClick={dismissToast}
            className="text-stone-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
