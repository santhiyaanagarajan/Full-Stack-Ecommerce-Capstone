import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#191919] text-stone-200 text-xs py-2 px-4 border-b border-stone-800 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Complimentary shipping on orders over $200 · Use code{' '}
            <strong className="text-white font-mono tracking-wider font-semibold">CAPSTONE10</strong>{' '}
            for 10% off
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white transition-colors p-0.5 ml-2"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
