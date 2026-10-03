import React, { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useRouter } from '../context/RouterContext';
import { ProductCategory } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductGrid } from '../components/product/ProductGrid';

export const ProductsPage: React.FC = () => {
  const { route } = useRouter();
  const {
    products,
    totalCount,
    filteredCount,
    filters,
    setFilterKey,
    resetFilters,
    isLoading,
  } = useProducts();

  // Sync route query parameters with filter state
  useEffect(() => {
    if (route.query.category) {
      setFilterKey('category', route.query.category as ProductCategory);
    }
    if (route.query.search) {
      setFilterKey('search', route.query.search);
    }
  }, [route.query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Header & Breadcrumbs */}
      <div className="space-y-3">
        <Breadcrumbs items={[{ label: 'Catalog & Artifacts' }]} />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display tracking-tight">
              Curated Catalog
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Explore timeless architectural acoustic pieces, wheel-thrown ceramics, luminaires, and tactile desktop accessories.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Displaying <span className="font-semibold text-stone-900 tabular-nums">{filteredCount}</span>{' '}
            of <span className="font-semibold text-stone-900 tabular-nums">{totalCount}</span> artifacts
          </div>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <ProductFilters
        filters={filters}
        onFilterChange={setFilterKey}
        onReset={resetFilters}
        totalFiltered={filteredCount}
        totalAll={totalCount}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        onResetFilters={resetFilters}
      />
    </div>
  );
};
