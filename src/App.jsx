import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import VipBenefitsBar from './components/VipBenefitsBar';
import FlashDeals from './components/FlashDeals';
import ProductCatalog from './components/ProductCatalog';
import VipTestimonials from './components/VipTestimonials';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistModal from './components/WishlistModal';
import TMSAssistantWidget from './components/TMSAssistantWidget';
import FlyingMascotOverlay from './components/FlyingMascotOverlay';
import Footer from './components/Footer';

import { INITIAL_PRODUCTS } from './data/products';

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Theme State (Dark as default priority, Light as alternative)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dtavo_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dtavo_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dtavo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dtavo_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1'];
    } catch {
      return ['prod-1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('dtavo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dtavo_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);
  
  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTechBotOpen, setIsTechBotOpen] = useState(false);

  // Flying Mascot Animation Trigger
  const [activeFlyingItem, setActiveFlyingItem] = useState(null);

  // Add to Cart handler
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const selectedColor = product.selectedColor || product.colors?.[0]?.name;
      const selectedStorage = product.selectedStorage || product.storageOptions?.[0];
      
      const existing = prevCart.find(
        (item) => item.id === product.id && 
                  item.selectedColor === selectedColor && 
                  item.selectedStorage === selectedStorage
      );

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          selectedColor,
          selectedStorage,
          quantity: 1
        }
      ];
    });

    // Trigger Mascot Flying Animation
    setActiveFlyingItem(product);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Cart calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Scroll to catalog
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 pb-16 md:pb-0 ${
      theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-[#F5F5F5] text-[#1A1A1A]'
    }`}>
      
      {/* Flying Mascot Animation on Add to Cart */}
      <FlyingMascotOverlay 
        activeItem={activeFlyingItem}
        onAnimationEnd={() => setActiveFlyingItem(null)}
      />

      {/* Navigation Header with Theme Toggle and WhatsApp Link */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTechBot={() => setIsTechBotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          theme={theme}
          onExploreClick={scrollToCatalog}
          onOpenTechBot={() => setIsTechBotOpen(true)}
        />

        {/* VIP Value Proposition Bar */}
        <VipBenefitsBar
          theme={theme}
          onOpenTechBot={() => setIsTechBotOpen(true)}
        />

        {/* Flash Deals / Ofertas Exclusivas VIP */}
        <FlashDeals
          theme={theme}
          products={products}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* Main Product Catalog */}
        <ProductCatalog
          theme={theme}
          products={products}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* VIP Verified Testimonials Section */}
        <VipTestimonials
          theme={theme}
        />
      </main>

      {/* Footer */}
      <Footer 
        theme={theme}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          scrollToCatalog();
        }} 
      />

      {/* Mobile Floating Bottom Bar */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#222222] px-2 py-1.5 shadow-2xl flex items-center justify-around"
        aria-label="Navegación móvil"
      >
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-neutral-400 hover:text-[#C59F60] active:scale-95 transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold font-mono mt-0.5">Inicio</span>
        </button>

        <button
          onClick={scrollToCatalog}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-neutral-400 hover:text-[#C59F60] active:scale-95 transition-all"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-bold font-mono mt-0.5">Catálogo</span>
        </button>

        <button
          onClick={() => setIsTechBotOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-[#C59F60] active:scale-95 transition-all relative"
        >
          <div className="w-8 h-8 rounded-full bg-[#C59F60] text-[#0A0A0A] flex items-center justify-center shadow-md shadow-[#C59F60]/30 -mt-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black font-mono mt-0.5 text-[#C59F60]">Asesor</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-neutral-400 hover:text-[#C59F60] active:scale-95 transition-all relative"
        >
          <Heart className="w-5 h-5" />
          {wishlistIds.length > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-[#C59F60] text-black font-black font-mono text-[9px] rounded-full flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
          <span className="text-[10px] font-bold font-mono mt-0.5">Favoritos</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-neutral-400 hover:text-[#C59F60] active:scale-95 transition-all relative"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-[#C59F60] text-black font-black font-mono text-[9px] rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-bold font-mono mt-0.5">Cesta</span>
        </button>
      </nav>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          theme={theme}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(quickViewProduct.id)}
        />
      )}

      {/* Wishlist Drawer Modal */}
      <WishlistModal
        theme={theme}
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        theme={theme}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        theme={theme}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        cartTotal={cartTotal}
        onClearCart={() => setCart([])}
      />

      {/* TAVO VIP Assistant Widget */}
      <TMSAssistantWidget
        theme={theme}
        isOpen={isTechBotOpen}
        onClose={() => setIsTechBotOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
        products={products}
      />

    </div>
  );
}
