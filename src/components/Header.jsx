import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Heart, 
  Truck, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Sun, 
  Moon, 
  MessageCircle, 
  Command
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { CATEGORIES } from '../data/products';
import TavoLogo from './TavoLogo';

export default function Header({ 
  theme,
  onToggleTheme,
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenTechBot
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const isDark = theme === 'dark';

  // Keyboard shortcut (Ctrl+K or Cmd+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 shadow-2xl backdrop-blur-2xl">
      {/* Top Announcement Bar - Optimized for Mobile */}
      <div className="bg-[#050505] text-white text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left info tag */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 font-medium truncate">
            <span className="bg-gradient-to-r from-[#C59F60] to-[#DDB856] text-[#0A0A0A] px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider uppercase shadow-sm font-mono shrink-0">
              🇨🇴 COLOMBIA
            </span>
            <span className="w-px h-3 bg-[#333333] hidden xs:block"></span>
            <Truck className="w-3.5 h-3.5 text-[#C59F60] shrink-0 hidden xs:block" />
            <span className="text-neutral-300 truncate text-[11px]">
              Envíos VIP 24h asegurados a todo el país
            </span>
          </div>

          {/* Right info */}
          <div className="flex items-center gap-3 sm:gap-4 text-neutral-300 text-[11px] sm:text-xs font-semibold tracking-wide shrink-0">
            <a 
              href="https://www.instagram.com/latiendadetavo?igsh=bmwwYTViazZmMGdj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a 
              href="https://wa.me/573142626916?text=Hola%20La%20tienda%20TAVO,%20deseo%20asesor%C3%ADa%20personalizada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-[#20BA5A] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp VIP</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59F60]" /> Garantía 12 Meses
            </span>
            <span 
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" 
              onClick={onOpenTechBot}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#DDB856]" /> Asesor TAVO
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-colors duration-300 border-b ${
        isDark ? 'bg-[#0E0E0E]/95 border-[#222222] text-white' : 'bg-white/95 border-[#DDDDDD] text-[#1A1A1A]'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-8">
            
            {/* Brand Logo: La tienda TAVO */}
            <div 
              className="cursor-pointer shrink-0" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <TavoLogo theme={theme} size="md" className="scale-90 sm:scale-100 origin-left" />
            </div>

            {/* Smart Search Bar (Desktop / Tablet) */}
            <div className="flex-1 max-w-xl hidden md:block relative">
              <div className={`relative flex items-center rounded-xl transition-all duration-300 ${
                searchFocused 
                  ? 'ring-2 ring-[#C59F60] shadow-lg shadow-[#C59F60]/20' 
                  : 'hover:border-[#C59F60]/50'
              }`}>
                <Search className={`w-4 h-4 absolute left-4 transition-colors ${
                  searchFocused ? 'text-[#C59F60]' : 'text-neutral-400'
                }`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  placeholder="Buscar iPhone 15 Pro, Galaxy S24, Leica, ROG..."
                  className={`w-full pl-11 pr-20 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors outline-none ${
                    isDark 
                      ? 'bg-[#1A1A1A] text-white placeholder-neutral-500 border border-[#222222]' 
                      : 'bg-[#F5F5F5] text-[#1A1A1A] placeholder-neutral-400 border border-[#DDDDDD]'
                  }`}
                />
                
                {/* Shortcut & Clear Button */}
                <div className="absolute right-3 flex items-center gap-1">
                  {searchTerm ? (
                    <button 
                      onClick={() => setSearchTerm('')} 
                      className="text-neutral-400 hover:text-white p-1"
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-neutral-500 bg-[#222222] px-1.5 py-0.5 rounded border border-[#333333]">
                      <Command className="w-2.5 h-2.5" /> K
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions (Theme, Bot, Wishlist, Cart) */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              
              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                  isDark 
                    ? 'bg-[#1A1A1A] border-[#222222] text-amber-300 hover:bg-[#222222]' 
                    : 'bg-[#F5F5F5] border-[#DDDDDD] text-neutral-700 hover:bg-neutral-200'
                }`}
                aria-label="Cambiar Tema"
              >
                {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-800" />}
              </button>

              {/* TAVO AI Quick Trigger (Desktop & Tablet) */}
              <button
                onClick={onOpenTechBot}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#C59F60]/10 border border-[#C59F60]/30 hover:bg-[#C59F60]/20 text-[#C59F60] font-bold text-xs transition-all"
                title="Asistente de compras IA"
              >
                <Sparkles className="w-4 h-4 text-[#DDB856]" />
                <span className="hidden xl:inline">Asesor TAVO</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className={`relative p-2 sm:p-2.5 rounded-xl border transition-all ${
                  wishlistCount > 0
                    ? 'bg-[#C59F60]/15 border-[#C59F60] text-[#C59F60]'
                    : isDark
                      ? 'bg-[#1A1A1A] border-[#222222] text-neutral-400 hover:text-white'
                      : 'bg-[#F5F5F5] border-[#DDDDDD] text-neutral-600 hover:text-black'
                }`}
                title="Ver Favoritos"
                aria-label="Ver favoritos"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlistCount > 0 ? 'fill-[#C59F60] text-[#C59F60]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-[#C59F60] text-[#0A0A0A] text-[10px] sm:text-[11px] font-black rounded-full flex items-center justify-center shadow-md font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="btn-gold-primary px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 select-none shadow-md"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A0A0A]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#0A0A0A] text-[#C59F60] text-[9px] sm:text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#C59F60] font-mono">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-mono font-bold">
                  ${cartTotal.toLocaleString('es-CO')}
                </span>
              </button>

              {/* Mobile Menu & Search Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-xl border ${
                  isDark ? 'bg-[#1A1A1A] border-[#222222] text-white' : 'bg-[#F5F5F5] border-[#DDDDDD] text-black'
                }`}
                aria-label="Abrir Menú de Búsqueda"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 text-[#C59F60]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar - Smooth Touch Horizontal Scroll */}
        <div className={`border-t transition-colors ${
          isDark ? 'border-[#222222] bg-[#0A0A0A]' : 'border-[#EAEAEA] bg-[#FAFAFA]'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 sm:py-2.5 no-scrollbar scroll-smooth">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      const el = document.getElementById('catalog-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`whitespace-nowrap px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 shrink-0 ${
                      isActive
                        ? 'bg-[#C59F60] text-[#0A0A0A] shadow-md shadow-[#C59F60]/20 font-black'
                        : isDark
                          ? 'text-neutral-300 hover:text-white hover:bg-[#1A1A1A]'
                          : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Search & Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden p-3.5 sm:p-4 border-t space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200 ${
            isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-[#DDDDDD]'
          }`}>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C59F60]" />
              <input
                type="text"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar iPhone, Galaxy, Xiaomi, ROG..."
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm font-medium outline-none ${
                  isDark 
                    ? 'bg-[#1A1A1A] text-white border border-[#2A2A2A] focus:border-[#C59F60]' 
                    : 'bg-[#F5F5F5] text-black border border-[#DDDDDD] focus:border-[#C59F60]'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold font-mono">
              <button 
                onClick={() => { onOpenTechBot(); setMobileMenuOpen(false); }} 
                className="p-2.5 rounded-xl bg-[#C59F60]/10 border border-[#C59F60]/30 text-[#C59F60] flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Asesor TAVO
              </button>
              <button
                onClick={() => { onOpenWishlist(); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl bg-[#C59F60]/10 border border-[#C59F60]/30 text-[#C59F60] flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5" /> Favoritos ({wishlistCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
