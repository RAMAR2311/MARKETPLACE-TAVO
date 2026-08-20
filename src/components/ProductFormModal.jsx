import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Link as LinkIcon, Smartphone, Cpu, Camera, Battery, HardDrive, LayoutTemplate } from 'lucide-react';

export default function ProductFormModal({ isOpen, onClose, onSave, editingProduct, categories }) {
  const [formData, setFormData] = useState({});

  const defaultProduct = {
    id: `prod-${Date.now()}`,
    name: '',
    brand: '',
    category: 'celulares',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    rating: 5.0,
    reviewsCount: 1,
    isFlashDeal: false,
    isNew: true,
    expressShipping: true,
    image: '',
    colors: [],
    storageOptions: [],
    specs: {
      screen: '',
      processor: '',
      camera: '',
      battery: '',
      ram: '',
      os: ''
    },
    description: '',
    stock: 10
  };

  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setFormData(JSON.parse(JSON.stringify(editingProduct)));
      } else {
        setFormData(JSON.parse(JSON.stringify(defaultProduct)));
      }
    }
  }, [isOpen, editingProduct]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate discount if prices change
      if (field === 'price' || field === 'originalPrice') {
        const p = field === 'price' ? Number(value) : Number(prev.price);
        const op = field === 'originalPrice' ? Number(value) : Number(prev.originalPrice);
        if (op > p && p > 0) {
          updated.discountPercent = Math.round(((op - p) / op) * 100);
        } else {
          updated.discountPercent = 0;
        }
      }
      return updated;
    });
  };

  const handleSpecChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [field]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0A0A0A] border border-[#222222] rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#222222] bg-[#111111]">
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
            <span className="text-[#C59F60]">{editingProduct ? 'Editar' : 'Nuevo'}</span> Producto
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#222222] rounded-lg transition-colors text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Left Col: Image Upload */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider">Fotografía</label>
              
              <div className="aspect-square bg-[#1A1A1A] border-2 border-dashed border-[#333333] rounded-2xl relative overflow-hidden group flex flex-col items-center justify-center text-center p-4 hover:border-[#C59F60] transition-colors">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="text-neutral-500">
                    <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Sube una foto o pega el enlace abajo</p>
                  </div>
                )}
                
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                  <span className="text-white text-sm font-medium bg-[#C59F60] px-4 py-2 rounded-lg flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Cambiar Archivo
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>

              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="text" 
                  value={formData.image || ''}
                  onChange={(e) => handleChange('image', e.target.value)}
                  placeholder="URL directa de la imagen..."
                  className="w-full bg-[#111] border border-[#333] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-[#C59F60] focus:ring-1 focus:ring-[#C59F60] outline-none transition-all"
                />
              </div>
            </div>

            {/* Right Col: Details */}
            <div className="md:col-span-2 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nombre del Producto *</label>
                  <input required type="text" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#C59F60] focus:outline-none" placeholder="Ej: iPhone 15 Pro Max..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Marca *</label>
                  <input required type="text" value={formData.brand || ''} onChange={e => handleChange('brand', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#C59F60] focus:outline-none" placeholder="Ej: Apple, Samsung..." />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Categoría *</label>
                  <select required value={formData.category || ''} onChange={e => handleChange('category', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#C59F60] focus:outline-none appearance-none">
                    {(categories || []).filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Stock Disponible</label>
                  <input type="number" min="0" value={formData.stock || 0} onChange={e => handleChange('stock', Number(e.target.value))} className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#C59F60] focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#111] border border-[#C59F60]/20 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[#C59F60]/5"></div>
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-[#C59F60] uppercase tracking-wider">Precio Venta (COP) *</label>
                  <input required type="number" min="0" value={formData.price || 0} onChange={e => handleChange('price', Number(e.target.value))} className="w-full bg-black border border-[#C59F60]/30 rounded-lg px-4 py-2 text-sm text-white font-mono focus:border-[#C59F60] focus:outline-none" />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Precio Original (Antes)</label>
                  <input type="number" min="0" value={formData.originalPrice || 0} onChange={e => handleChange('originalPrice', Number(e.target.value))} className="w-full bg-black border border-[#333] rounded-lg px-4 py-2 text-sm text-neutral-400 font-mono focus:border-[#C59F60] focus:outline-none line-through" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Descripción Comercial</label>
                <textarea rows={3} value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:border-[#C59F60] focus:outline-none resize-none" placeholder="Describe el producto..." />
              </div>

            </div>
          </div>

          <hr className="border-[#222]" />

          {/* Specs */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><LayoutTemplate className="w-4 h-4 text-[#C59F60]" /> Ficha Técnica</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1.5"><Smartphone className="w-3 h-3" /> Pantalla</label>
                <input type="text" value={formData.specs?.screen || ''} onChange={e => handleSpecChange('screen', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C59F60] focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1.5"><Cpu className="w-3 h-3" /> Procesador</label>
                <input type="text" value={formData.specs?.processor || ''} onChange={e => handleSpecChange('processor', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C59F60] focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1.5"><Camera className="w-3 h-3" /> Cámaras</label>
                <input type="text" value={formData.specs?.camera || ''} onChange={e => handleSpecChange('camera', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C59F60] focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1.5"><Battery className="w-3 h-3" /> Batería</label>
                <input type="text" value={formData.specs?.battery || ''} onChange={e => handleSpecChange('battery', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C59F60] focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1.5"><HardDrive className="w-3 h-3" /> RAM / ROM</label>
                <input type="text" value={formData.specs?.ram || ''} onChange={e => handleSpecChange('ram', e.target.value)} className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C59F60] focus:outline-none" />
              </div>
            </div>
          </div>
          
        </form>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#222222] bg-[#111111] flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#222] transition-colors">
            Cancelar
          </button>
          <button type="submit" form="product-form" className="px-6 py-2.5 rounded-xl text-sm font-bold text-black bg-[#C59F60] hover:bg-[#DDB856] transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Guardar Producto
          </button>
        </div>

      </div>
    </div>
  );
}
