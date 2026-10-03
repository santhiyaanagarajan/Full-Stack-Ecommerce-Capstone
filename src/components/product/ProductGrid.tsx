import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { PackageOpen, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onResetFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-[4/3] bg-stone-200" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-stone-200 rounded w-1/3" />
              <div className="h-5 bg-stone-200 rounded w-4/5" />
              <div className="h-3 bg-stone-200 rounded w-1/2" />
              <div className="pt-3 border-t border-stone-100 flex justify-between">
                <div className="h-4 bg-stone-200 rounded w-1/4" />
                <div className="h-3 bg-stone-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-500">
          <PackageOpen className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h3 className="text-lg font-semibold text-stone-900 font-display">
          No Artifacts Found
        </h3>
        <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
          We could not find any items matching your active filter criteria. Try adjusting your search query or price boundary.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
