import React, { useState } from 'react';
import { Link, useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold tracking-tight font-display text-stone-900 hover:opacity-85 transition-opacity shrink-0"
          >
            AURA OBJECTS
          </Link>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link
              to="/"
              className={`transition-colors hover:text-stone-900 ${
                currentPath === '/' ? 'text-stone-900 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`transition-colors hover:text-stone-900 ${
                currentPath === '/products' || currentPath.startsWith('/product/')
                  ? 'text-stone-900 font-semibold'
                  : ''
              }`}
            >
              Catalog
            </Link>
            <Link
              to="/products?category=audio"
              className="transition-colors hover:text-stone-900"
            >
              Acoustics
            </Link>
            <Link
              to="/products?category=ceramics"
              className="transition-colors hover:text-stone-900"
            >
              Ceramics
            </Link>
            <Link
              to="/about"
              className={`transition-colors hover:text-stone-900 ${
                currentPath === '/about' || currentPath === '/contact'
                  ? 'text-stone-900 font-semibold'
                  : ''
              }`}
            >
              Studio & Contact
            </Link>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick search input or toggle */}
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  autoFocus
                  className="w-40 sm:w-56 text-xs bg-stone-100 border border-stone-300 rounded-lg pl-3 pr-8 py-1.5 focus:outline-hidden focus:border-stone-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 text-stone-400 hover:text-stone-700"
                  aria-label="Close search input"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                aria-label="Open search input"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-all shadow-xs"
              aria-label={`Open shopping cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-stone-700 text-[11px] font-mono font-medium px-1.5 py-0.2 rounded-full tabular-nums">
                {totalItems}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FBFBF9] px-6 py-5 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection, materials..."
                className="w-full text-xs bg-stone-100 border border-stone-200 rounded-lg pl-3 pr-8 py-2.5 focus:outline-hidden focus:border-stone-900"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <nav className="flex flex-col gap-3 text-sm font-medium text-stone-700">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Complete Catalog
            </Link>
            <Link
              to="/products?category=audio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Acoustics & Audio
            </Link>
            <Link
              to="/products?category=ceramics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Ceramics & Vessels
            </Link>
            <Link
              to="/products?category=lighting"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Luminaires & Lamps
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 flex items-center justify-between text-stone-900 font-semibold"
            >
              <span>Shopping Cart</span>
              <span className="text-xs bg-stone-200 px-2 py-0.5 rounded-full font-mono">
                {totalItems} items
              </span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-stone-900"
            >
              Studio Philosophy & Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
