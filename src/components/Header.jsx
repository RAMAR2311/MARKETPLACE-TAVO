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
      {/* Top Announcement Bar */}
      <div className="bg-[#050505] text-white text-xs py-2 px-4 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="bg-gradient-to-r from-[#C59F60] to-[#DDB856] text-[#0A0A0A] px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-sm font-mono">
              🇨🇴 COLOMBIA 24H
            </span>
            <span className="w-px h-3.5 bg-[#333333]"></span>
            <Truck className="w-3.5 h-3.5 text-[#C59F60] shrink-0" />
            <span className="text-neutral-300">Envíos VIP asegurados a Bogotá, Medellín, Cali y todo el país</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-300 text-xs font-semibold tracking-wide">
            <a 
              href="https://wa.me/1234567890?text=Hola%20La%20tienda%20TAVO,%20deseo%20asesor%C3%ADa%20personalizada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-[#20BA5A] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp VIP</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59F60]" /> Garantía 12 Meses
            </span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" onClick={onOpenTechBot}>
              <Sparkles className="w-3.5 h-3.5 text-[#DDB856]" /> Asesor TAVO
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-colors duration-300 border-b ${
        isDark ? 'bg-[#0E0E0E]/90 border-[#222222] text-white' : 'bg-white/95 border-[#DDDDDD] text-[#1A1A1A]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            
            {/* Brand Logo: La tienda TAVO */}
            <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <TavoLogo theme={theme} size="md" />
            </div>

            {/* Smart Search Bar with Ctrl+K shortcut */}
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
                  placeholder="Buscar iPhone 15 Pro, Galaxy S24, Leica, ROG Phone..."
                  className={`w-full pl-11 pr-20 py-3 rounded-xl text-xs sm:text-sm font-medium transition-colors outline-none ${
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
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
                className={`p-2.5 rounded-xl border transition-all ${
                  isDark 
                    ? 'bg-[#1A1A1A] border-[#222222] text-amber-300 hover:bg-[#222222] hover:border-[#C59F60]/40' 
                    : 'bg-[#F5F5F5] border-[#DDDDDD] text-neutral-700 hover:bg-neutral-200'
                }`}
                aria-label="Cambiar Tema"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-neutral-800" />}
              </button>

              {/* TAVO AI Quick Trigger */}
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
                className={`relative p-2.5 rounded-xl border transition-all ${
                  wishlistCount > 0
                    ? 'bg-[#C59F60]/15 border-[#C59F60] text-[#C59F60]'
                    : isDark
                      ? 'bg-[#1A1A1A] border-[#222222] text-neutral-400 hover:text-white'
                      : 'bg-[#F5F5F5] border-[#DDDDDD] text-neutral-600 hover:text-black'
                }`}
                title="Ver Mis Favoritos (Me Gusta)"
                aria-label="Ver favoritos"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#C59F60] text-[#C59F60]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C59F60] text-[#0A0A0A] text-[11px] font-black rounded-full flex items-center justify-center shadow-md font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="btn-gold-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2.5 select-none"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#0A0A0A]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#0A0A0A] text-[#C59F60] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#C59F60] font-mono">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-mono font-bold">
                  ${cartTotal.toLocaleString('es-CO')} COP
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl border ${
                  isDark ? 'bg-[#1A1A1A] border-[#222222] text-white' : 'bg-[#F5F5F5] border-[#DDDDDD] text-black'
                }`}
                aria-label="Abrir Menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className={`border-t transition-colors ${
          isDark ? 'border-[#222222] bg-[#0A0A0A]' : 'border-[#EAEAEA] bg-[#FAFAFA]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
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
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
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

        {/* Mobile Search & Menu Overlay */}
        {mobileMenuOpen && (
          <div className={`md:hidden p-4 border-t space-y-4 ${
            isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-[#DDDDDD]'
          }`}>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos de lujo..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none ${
                  isDark ? 'bg-[#1A1A1A] text-white border border-[#222222]' : 'bg-[#F5F5F5] text-black border border-[#DDDDDD]'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
              <button 
                onClick={() => { onOpenTechBot(); setMobileMenuOpen(false); }} 
                className="p-3 rounded-xl bg-[#C59F60]/10 border border-[#C59F60]/30 text-[#C59F60] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Asesor TAVO
              </button>
              <button
                onClick={() => { onOpenWishlist(); setMobileMenuOpen(false); }}
                className="p-3 rounded-xl bg-[#C59F60]/10 border border-[#C59F60]/30 text-[#C59F60] flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" /> Favoritos ({wishlistCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
