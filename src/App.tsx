import React from 'react';
import { CartProvider } from './context/CartContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toast } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { AboutContactPage } from './pages/AboutContactPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Route matching
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/products') {
      return <ProductsPage />;
    }
    if (currentPath.startsWith('/product/')) {
      return <ProductDetailPage />;
    }
    if (currentPath === '/cart') {
      return <CartPage />;
    }
    if (currentPath === '/about' || currentPath === '/contact') {
      return <AboutContactPage />;
    }
    // Fallback to Home if unmatched
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#191919]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </RouterProvider>
  );
}
