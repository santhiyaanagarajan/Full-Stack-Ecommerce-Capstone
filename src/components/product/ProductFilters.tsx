import React from 'react';
import { FilterState, ProductCategory } from '../../types';
import { CATEGORIES } from '../../data/products';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  totalFiltered: number;
  totalAll: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalFiltered,
  totalAll,
}) => {
  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.search.trim().length > 0 ||
    filters.inStockOnly ||
    filters.minPrice > 0 ||
    filters.maxPrice < 600 ||
    filters.sortBy !== 'featured';

  return (
    <div className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-2xs">
      {/* Top Row: Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input with functional icon and clear */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by name, material, or keyword..."
            className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-8 py-2.5 text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort selector & Reset */}
        <div className="flex items-center gap-2.5 justify-end">
          <label htmlFor="sort-select" className="text-xs text-stone-500 whitespace-nowrap">
            Sort:
          </label>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
            className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:outline-hidden focus:border-stone-900 font-medium"
          >
            <option value="featured">Editorial Highlights</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name-asc">Alphabetical (A-Z)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/70 rounded-lg transition-colors whitespace-nowrap font-medium"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Category Segmented Control (Allowed as functional button controls per frontend guidelines) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange('category', cat.id as ProductCategory)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sub-Filters: Price Slider & In-Stock Switch */}
      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Price Slider */}
        <div className="flex items-center gap-3">
          <span className="text-stone-500 font-medium">Max Price:</span>
          <input
            type="range"
            min="50"
            max="600"
            step="10"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
            className="w-28 sm:w-40 accent-stone-900 cursor-pointer"
          />
          <span className="font-mono font-semibold text-stone-900 tabular-nums">
            ${filters.maxPrice}
          </span>
        </div>

        {/* In-Stock Toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
            className="w-4 h-4 rounded-sm border-stone-300 accent-stone-900 cursor-pointer"
          />
          <span className="text-stone-700 font-medium">In-Stock Artifacts Only</span>
        </label>

        {/* Counter readout */}
        <div className="text-stone-500">
          Showing <span className="font-semibold text-stone-900 tabular-nums">{totalFiltered}</span>{' '}
          of <span className="font-semibold text-stone-900 tabular-nums">{totalAll}</span> items
        </div>
      </div>
    </div>
  );
};
