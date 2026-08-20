import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Filter, RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard';
import { BRANDS } from '../data/products';
import { TavoIsotype } from './TavoLogo';

export default function ProductCatalog({ 
  theme,
  products, 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm,
  setSearchTerm,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds
}) {
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [maxPrice, setMaxPrice] = useState(6000000);
  const [sortBy, setSortBy] = useState('featured');

  const isDark = theme === 'dark';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedBrand !== 'Todas' && product.brand !== selectedBrand) return false;
      if (product.price > maxPrice) return false;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, selectedBrand, maxPrice, searchTerm, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('Todas');
    setMaxPrice(6000000);
    setSearchTerm('');
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className={`py-10 sm:py-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F5]'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10 text-left">
          <div>
            <div className="flex items-center gap-2 text-[#C59F60] font-black text-[11px] sm:text-xs uppercase tracking-[0.2em]">
              <TavoIsotype className="w-3.5 h-3.5 sm:w-4 sm:h-4" glow={false} />
              <span>Colección Oficial La tienda TAVO</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mt-1.5 sm:mt-2 ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}>
              Smartphones & Tecnología Flagship
            </h2>
            <p className="text-xs sm:text-base text-neutral-400 font-medium mt-1">
              Garantía de 12 meses, factura y entrega express 24 horas a toda Colombia.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-0">
            <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C59F60]" /> Orden:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`rounded-xl text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 outline-none border cursor-pointer font-mono transition-colors ${
                isDark 
                  ? 'bg-[#161616] text-white border-[#222222] focus:border-[#C59F60]' 
                  : 'bg-white text-[#1A1A1A] border-[#DDDDDD] focus:border-[#C59F60]'
              }`}
            >
              <option value="featured">Destacados TAVO</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={`p-4 sm:p-6 rounded-2xl border shadow-sm mb-8 sm:mb-12 transition-colors ${
          isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-[#DDDDDD]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            
            {/* Brands Filter */}
            <div className="md:col-span-5 text-left">
              <label className="block text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.15em] mb-2 sm:mb-3 font-mono">
                Filtrar por Marca
              </label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                      selectedBrand === brand
                        ? 'bg-[#C59F60] text-[#0A0A0A] shadow-md shadow-[#C59F60]/20 font-black'
                        : isDark
                          ? 'bg-[#1A1A1A] text-neutral-300 hover:text-white border border-[#2A2A2A]'
                          : 'bg-neutral-100 text-neutral-700 hover:text-black border border-neutral-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className={`md:col-span-4 text-left md:border-l md:pl-6 ${
              isDark ? 'md:border-[#222222]' : 'md:border-[#DDDDDD]'
            }`}>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] sm:text-xs font-bold text-neutral-400 uppercase tracking-[0.15em] font-mono">
                  Presupuesto Máximo
                </label>
                <span className="text-sm sm:text-base font-black text-[#C59F60] font-mono">${maxPrice.toLocaleString('es-CO')}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="6000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C59F60] cursor-pointer h-2 bg-[#222222] rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] sm:text-[11px] text-neutral-500 font-mono font-bold mt-1.5">
                <span>$100k</span>
                <span>$3.0M</span>
                <span>$6.0M COP</span>
              </div>
            </div>

            {/* Results Count & Reset */}
            <div className={`md:col-span-3 flex items-center justify-between md:justify-end gap-4 md:border-l md:pl-6 pt-3 md:pt-0 border-t md:border-t-0 ${
              isDark ? 'border-[#222222]' : 'border-[#DDDDDD]'
            }`}>
              <div className="text-left">
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Disponibles</p>
                <p className="text-xl sm:text-2xl font-black font-mono text-[#C59F60] leading-none mt-0.5">{filteredProducts.length}</p>
              </div>

              <button
                onClick={resetFilters}
                className="btn-gold-outline px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold"
                title="Limpiar filtros"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                theme={theme}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>
        ) : (
          <div className={`rounded-2xl p-10 sm:p-16 text-center border shadow-sm ${
            isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-[#DDDDDD]'
          }`}>
            <div className="w-14 h-14 bg-[#C59F60]/10 text-[#C59F60] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#C59F60]/30">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">Sin coincidencias</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-sm mx-auto">
              No encontramos dispositivos con los filtros seleccionados. Intenta ampliar el rango de precio o marca.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 btn-gold-primary px-5 py-2.5 rounded-xl text-xs font-black"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
