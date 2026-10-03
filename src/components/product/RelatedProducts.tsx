import React from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
  category: Product['category'];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
}) => {
  // Find products in same category or adjacent categories
  const related = PRODUCTS.filter((p) => p.id !== currentProductId)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="pt-16 mt-16 border-t border-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
        <div>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            Harmonious Pairings
          </span>
          <h2 className="text-2xl font-bold text-stone-900 font-display">
            Complementary Artifacts
          </h2>
        </div>
        <p className="text-xs text-stone-500 max-w-sm">
          Selected to balance acoustic warmth, tactile stone textures, and ambient workspace lighting.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
