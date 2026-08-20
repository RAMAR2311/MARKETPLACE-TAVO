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
    <section id="catalog-section" className={`py-16 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0A]' : 'bg-[#F5F5F5]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#C59F60] font-black text-xs uppercase tracking-[0.25em]">
              <TavoIsotype className="w-4 h-4" glow={false} />
              <span>Colección Oficial La tienda TAVO</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black font-heading tracking-tight mt-2 ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}>
              Smartphones & Tecnología Flagship
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-medium mt-1.5">
              Equipos de vanguardia con garantía de 12 meses, factura y entrega express 24 horas.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C59F60]" /> Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`rounded-xl text-xs sm:text-sm font-bold px-4 py-2.5 outline-none border cursor-pointer font-mono transition-colors ${
                isDark 
                  ? 'bg-[#161616] text-white border-[#222222] focus:border-[#C59F60]' 
                  : 'bg-white text-[#1A1A1A] border-[#DDDDDD] focus:border-[#C59F60]'
              }`}
            >
              <option value="featured">Destacados D'TAVO</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
            </select>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={`p-6 rounded-2xl border shadow-sm mb-12 transition-colors ${
          isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-[#DDDDDD]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Brands Filter */}
            <div className="md:col-span-5 text-left">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-[0.15em] mb-3 font-mono">
                Filtrar por Marca
              </label>
              <div className="flex flex-wrap gap-2">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
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
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-[0.15em] font-mono">
                  Presupuesto Máximo
                </label>
                <span className="text-base font-black text-[#C59F60] font-mono">${maxPrice.toLocaleString('es-CO')} COP</span>
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
              <div className="flex justify-between text-[11px] text-neutral-500 font-mono font-bold mt-2">
                <span>$100.000</span>
                <span>$3.000.000</span>
                <span>$6.000.000</span>
              </div>
            </div>

            {/* Results Count & Reset */}
            <div className={`md:col-span-3 flex items-center justify-between md:justify-end gap-6 md:border-l md:pl-6 ${
              isDark ? 'md:border-[#222222]' : 'md:border-[#DDDDDD]'
            }`}>
              <div className="text-left">
                <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Disponibles</p>
                <p className="text-2xl font-black font-mono text-[#C59F60] leading-none mt-1">{filteredProducts.length}</p>
              </div>

              <button
                onClick={resetFilters}
                className="btn-gold-outline px-3.5 py-2 rounded-xl text-xs font-bold"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className={`rounded-2xl p-16 text-center border shadow-sm ${
            isDark ? 'bg-[#111111] border-[#222222]' : 'bg-white border-[#DDDDDD]'
          }`}>
            <div className="w-16 h-16 bg-[#C59F60]/10 text-[#C59F60] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#C59F60]/30">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-white">Sin coincidencias</h3>
            <p className="text-sm text-neutral-400 mt-2 max-w-sm mx-auto">
              No encontramos dispositivos con los filtros seleccionados. Intenta ampliar el rango de precio o marca.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 btn-gold-primary px-6 py-2.5 rounded-xl text-xs font-black"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
