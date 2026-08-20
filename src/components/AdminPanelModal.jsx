import React, { useState, useEffect } from 'react';
import { X, Lock, Key, Settings, Package, Tag, Download, Copy, Zap, Star, Edit, Trash2, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';
import ProductFormModal from './ProductFormModal';

export default function AdminPanelModal({ isOpen, onClose, products, setProducts, categories, setCategories }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Check auth persistence
  useEffect(() => {
    if (isOpen) {
      const auth = sessionStorage.getItem('dtavo_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'TAVO2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dtavo_admin_auth', 'true');
      setError('');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dtavo_admin_auth');
    setPassword('');
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ---- Product Actions ----
  const handleSaveProduct = (formData) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === formData.id);
      if (exists) {
        return prev.map(p => p.id === formData.id ? formData : p);
      } else {
        return [formData, ...prev];
      }
    });
    setIsFormOpen(false);
    showSuccess('Producto guardado correctamente');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showSuccess('Producto eliminado');
    }
  };

  const handleDuplicateProduct = (prod) => {
    const newProd = JSON.parse(JSON.stringify(prod));
    newProd.id = `prod-${Date.now()}`;
    newProd.name = `${newProd.name} (Copia)`;
    setProducts(prev => [newProd, ...prev]);
    showSuccess('Producto duplicado');
  };

  const toggleFlag = (id, field) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [field]: !p[field] };
      }
      return p;
    }));
  };

  const quickUpdatePrice = (id, newPrice) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        let update = { ...p, price: Number(newPrice) };
        if (update.originalPrice > update.price && update.price > 0) {
          update.discountPercent = Math.round(((update.originalPrice - update.price) / update.originalPrice) * 100);
        } else {
          update.discountPercent = 0;
        }
        return update;
      }
      return p;
    }));
  };

  // ---- Export Actions ----
  const exportProducts = () => {
    const dataStr = `export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};\n\nexport const CATEGORIES = ${JSON.stringify(categories, null, 2)};`;
    const blob = new Blob([dataStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccess('Archivo descargado correctamente');
  };

  const copyToClipboard = () => {
    const dataStr = `export const INITIAL_PRODUCTS = ${JSON.stringify(products, null, 2)};`;
    navigator.clipboard.writeText(dataStr).then(() => {
      showSuccess('Código copiado al portapapeles');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
      {!isAuthenticated ? (
        // Login Screen
        <div className="bg-[#0A0A0A] border border-[#222222] p-6 sm:p-8 rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C59F60] via-[#DDB856] to-[#C59F60]"></div>
          <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-[#333] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="w-8 h-8 text-[#C59F60]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-2 font-mono">Panel VIP</h2>
          <p className="text-sm text-neutral-400 text-center mb-8">Ingresa la clave maestra para continuar</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full bg-[#111] border border-[#333] rounded-xl pl-9 pr-4 py-3 text-sm text-white focus:border-[#C59F60] focus:ring-1 focus:ring-[#C59F60] outline-none transition-all"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-[#C59F60] hover:bg-[#DDB856] text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(197,159,96,0.3)] hover:shadow-[0_0_25px_rgba(197,159,96,0.5)]">
              Acceder
            </button>
          </form>
        </div>
      ) : (
        // Admin Dashboard
        <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl w-full max-w-6xl max-h-[95vh] flex flex-col shadow-2xl animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-[#222222] bg-[#111111] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#111] border border-[#333] flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#C59F60]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-mono leading-tight">Admin Dashboard</h2>
                <p className="text-xs text-[#C59F60] font-medium tracking-wide">La tienda TAVO VIP</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                className="px-4 py-2 rounded-lg bg-[#C59F60] hover:bg-[#DDB856] text-black text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Nuevo Producto
              </button>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#222] text-neutral-300 text-xs font-medium border border-[#333] transition-colors">
                Cerrar Sesión
              </button>
              <button onClick={onClose} className="p-2 bg-[#1A1A1A] hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-lg border border-[#333] hover:border-red-500/30 transition-colors ml-auto sm:ml-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {successMsg && (
            <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2 flex items-center justify-center gap-2 text-green-400 text-xs font-medium animate-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" /> {successMsg}
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 px-4 py-2 border-b border-[#222222] bg-[#050505] overflow-x-auto no-scrollbar">
            {[
              { id: 'products', label: 'Catálogo', icon: Package },
              { id: 'flags', label: 'Destacados & Flash', icon: Star },
              { id: 'export', label: 'Respaldos', icon: Download }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-[#222] text-white border border-[#333]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-[#111]'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#C59F60]' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#050505]">
            
            {/* TAB: PRODUCTS */}
            {activeTab === 'products' && (
              <div className="space-y-3">
                {products.map(prod => (
                  <div key={prod.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-[#111] border border-[#222] rounded-xl hover:border-[#333] transition-colors">
                    <img src={prod.image || 'https://via.placeholder.com/80'} alt={prod.name} className="w-16 h-16 object-contain rounded-lg bg-black" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                      <p className="text-xs text-neutral-500">{prod.brand} • {categories.find(c => c.id === prod.category)?.name || prod.category}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-xs font-mono text-[#C59F60]">${prod.price.toLocaleString('es-CO')}</span>
                        {prod.originalPrice > prod.price && (
                          <span className="text-[10px] font-mono text-neutral-600 line-through">${prod.originalPrice.toLocaleString('es-CO')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleDuplicateProduct(prod)} className="p-2 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] rounded-lg text-neutral-400 hover:text-white transition-colors" title="Duplicar">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setEditingProduct(prod); setIsFormOpen(true); }} className="p-2 bg-[#1A1A1A] hover:bg-[#222] border border-[#333] rounded-lg text-neutral-400 hover:text-white transition-colors" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteProduct(prod.id)} className="p-2 bg-[#1A1A1A] hover:bg-red-500/20 border border-[#333] hover:border-red-500/30 rounded-lg text-neutral-400 hover:text-red-400 transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: FLAGS */}
            {activeTab === 'flags' && (
              <div className="space-y-4">
                <div className="bg-[#111] border border-[#C59F60]/20 rounded-xl p-4 sm:p-5">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2"><Zap className="w-4 h-4 text-[#C59F60]" /> Ofertas Flash & VIP</h3>
                  <p className="text-xs text-neutral-500 mb-6">Activa o desactiva rápidamente los productos en oferta o marcados como VIP.</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#333] text-xs text-neutral-500 uppercase tracking-wider">
                          <th className="pb-3 font-medium px-2">Producto</th>
                          <th className="pb-3 font-medium px-2">Precio (Edición Rápida)</th>
                          <th className="pb-3 font-medium text-center">⚡ Flash Deal</th>
                          <th className="pb-3 font-medium text-center">🌟 VIP / Destacado</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {products.map(prod => (
                          <tr key={prod.id} className="border-b border-[#222] hover:bg-[#1A1A1A] transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-3">
                                <img src={prod.image} className="w-8 h-8 rounded object-contain bg-black" />
                                <span className="font-medium text-white truncate max-w-[150px] sm:max-w-[250px]">{prod.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <input 
                                type="number" 
                                defaultValue={prod.price} 
                                onBlur={(e) => quickUpdatePrice(prod.id, e.target.value)}
                                className="w-28 bg-[#050505] border border-[#333] rounded md:px-2 py-1 text-xs text-white font-mono focus:border-[#C59F60] focus:outline-none"
                              />
                            </td>
                            <td className="py-3 text-center">
                              <button 
                                onClick={() => toggleFlag(prod.id, 'isFlashDeal')}
                                className={`w-10 h-5 rounded-full relative inline-flex items-center transition-colors ${prod.isFlashDeal ? 'bg-green-500' : 'bg-neutral-700'}`}
                              >
                                <span className={`inline-block w-3 h-3 transform rounded-full bg-white transition-transform ${prod.isFlashDeal ? 'translate-x-6' : 'translate-x-1'}`} />
                              </button>
                            </td>
                            <td className="py-3 text-center">
                              <button 
                                onClick={() => toggleFlag(prod.id, 'isNew')}
                                className={`w-10 h-5 rounded-full relative inline-flex items-center transition-colors ${prod.isNew ? 'bg-[#C59F60]' : 'bg-neutral-700'}`}
                              >
                                <span className={`inline-block w-3 h-3 transform rounded-full bg-white transition-transform ${prod.isNew ? 'translate-x-6' : 'translate-x-1'}`} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EXPORT */}
            {activeTab === 'export' && (
              <div className="max-w-2xl mx-auto space-y-6 pt-4">
                <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto bg-[#1A1A1A] border border-[#333] rounded-full flex items-center justify-center mb-4">
                    <Download className="w-8 h-8 text-[#C59F60]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Exportar Catálogo</h3>
                  <p className="text-sm text-neutral-400 mb-6">
                    Descarga el archivo <code>products.js</code> con todos los cambios actuales. Luego puedes reemplazarlo en la carpeta <code>src/data/</code> de tu servidor VPS o repositorio GitHub.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={exportProducts} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C59F60] hover:bg-[#DDB856] text-black font-bold flex items-center justify-center gap-2 transition-all">
                      <Download className="w-4 h-4" /> Descargar products.js
                    </button>
                    <button onClick={copyToClipboard} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-white font-medium flex items-center justify-center gap-2 transition-all">
                      <Copy className="w-4 h-4" /> Copiar Código
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Render Product Form Sub-Modal */}
      <ProductFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
        categories={categories}
      />
    </div>
  );
}
