import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4';
  fallbackTitle?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '4/3',
  fallbackTitle,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : 'aspect-[4/3]';

  return (
    <div className={`relative overflow-hidden bg-[#F2F2EE] ${aspectClass} ${className}`}>
      {/* Skeleton loading shimmer */}
      {!hasLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#F0F0EC] via-[#E8E8E3] to-[#F0F0EC]" />
      )}

      {/* Styled Fallback Container if error */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#EFEFED] text-stone-500">
          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center mb-2 text-stone-600">
            <Sparkles className="w-5 h-5 stroke-[1.5]" />
          </div>
          <span className="text-xs font-medium text-stone-700 line-clamp-1">
            {fallbackTitle || alt}
          </span>
          <span className="text-[11px] text-stone-400 mt-0.5">Aura Studio Archive</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setHasLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hasLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
          }`}
        />
      )}
    </div>
  );
};
