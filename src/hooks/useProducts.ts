import { useState, useMemo, useEffect } from 'react';
import { Product, FilterState, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';

export const INITIAL_FILTERS: FilterState = {
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 600,
  inStockOnly: false,
  sortBy: 'featured',
};

export function useProducts(initialFilterOverrides?: Partial<FilterState>) {
  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTERS,
    ...initialFilterOverrides,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Debounced/subtle transition state simulation when filtering changes
  const setFilterKey = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price range filter
    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // In Stock filter
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // maintain default catalog editorial order
        break;
    }

    return result;
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.search.trim().length > 0) count++;
    if (filters.inStockOnly) count++;
    if (filters.minPrice > 0 || filters.maxPrice < 600) count++;
    if (filters.sortBy !== 'featured') count++;
    return count;
  }, [filters]);

  return {
    products: filteredProducts,
    totalCount: PRODUCTS.length,
    filteredCount: filteredProducts.length,
    filters,
    setFilters,
    setFilterKey,
    resetFilters,
    activeFilterCount,
    isLoading,
    setIsLoading,
  };
}
