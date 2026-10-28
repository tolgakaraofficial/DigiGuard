import React, { useState, useEffect } from 'react';
import {
  ShoppingBag, Upload, Tag, DollarSign, Code, Cpu, Calculator,
  CheckCircle, XCircle, Search, Filter, Star, Download,
  Shield, TrendingUp, ArrowRight, FileCode, Brain, Zap, Award,
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';

type MarketplaceTab = 'browse' | 'upload';

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  creator_name: string;
  creator_ghost_id: string;
  status: 'pending' | 'approved' | 'rejected';
  file_url: string;
  created_at: string;
  downloads: number;
  rating: number;
}

const categories = [
  { key: 'prototype', label: 'Prototip', icon: Cpu, color: '#00e5ff' },
  { key: 'software', label: 'Yazilim', icon: Code, color: '#39ff14' },
  { key: 'algorithm', label: 'Matematik/Algoritma', icon: Calculator, color: '#a855f7' },
  { key: 'ai_model', label: 'AI Model', icon: Brain, color: '#f59e0b' },
  { key: 'template', label: 'Sablon', icon: FileCode, color: '#06b6d4' },
  { key: 'certificate', label: 'Sertifika', icon: Award, color: '#ef4444' },
];

export const MarketplacePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('browse');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('marketplace_products')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Urunler yuklenirken hata:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 rounded-lg">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">GOST ID Pazar Yeri</h2>
            <p className="text-xs text-slate-400">Yazilimcilar, muhendisler ve bilim adamlari icin urun pazar platformu</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-matrix-900/30 border border-matrix-500/30">
            <TrendingUp className="h-3.5 w-3.5 text-matrix-400" />
            <span className="text-xs text-matrix-300 font-mono">50/50 Gelir Paylasimi</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'browse'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:text-white'
          }`}
        >
          <ShoppingBag className="h-4 w-4" /> Pazar Yeri
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'upload'
              ? 'bg-gradient-to-r from-cyber-600 to-matrix-600 text-white shadow-lg'
              : 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:text-white'
          }`}
        >
          <Upload className="h-4 w-4" /> Urun Yukle
        </button>
      </div>

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Urun ara..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  activeCategory === 'all'
                    ? 'bg-slate-800 text-white border border-slate-600'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-300'
                }`}
              >
                Tumu
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    activeCategory === cat.key
                      ? 'bg-slate-800 text-white border'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-300'
                  }`}
                  style={activeCategory === cat.key ? { borderColor: `${cat.color}50` } : undefined}
                >
                  <cat.icon className="h-3 w-3" style={{ color: cat.color }} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-slate-600 border-t-amber-400 rounded-full animate-spin" />
              <p className="text-sm text-slate-500 mt-3">Yukleniyor...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Henuz urun bulunmuyor</p>
              <button
                onClick={() => setActiveTab('upload')}
                className="mt-4 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 mx-auto"
              >
                Ilk urunu yukleyin <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => {
                const cat = categories.find((c) => c.key === product.category) || categories[0];
                return (
                  <div
                    key={product.id}
                    className="card p-4 border border-slate-800 hover:border-amber-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                        <cat.icon className="h-5 w-5" style={{ color: cat.color }} />
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < (product.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3 text-[10px] text-slate-500">
                      <Shield className="h-3 w-3" />
                      <span className="font-mono">{product.creator_ghost_id?.slice(0, 12) || 'Anonim'}...</span>
                      <span className="ml-auto flex items-center gap-0.5">
                        <Download className="h-3 w-3" /> {product.downloads || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div>
                        <p className="text-lg font-bold text-amber-400">
                          ${product.price}
                        </p>
                        <p className="text-[9px] text-slate-500">Uretici: ${((product.price || 0) * 0.5).toFixed(2)} | Hazine: ${((product.price || 0) * 0.5).toFixed(2)}</p>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-semibold rounded-lg transition-all">
                        <ShoppingBag className="h-3.5 w-3.5" /> Satin Al
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && <UploadForm onUploaded={loadProducts} />}
    </div>
  );
};

/* ---------- Upload Form ---------- */
const UploadForm: React.FC<{ onUploaded: () => void }> = ({ onUploaded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'prototype',
    price: '',
    currency: 'USD',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim() || !formData.price) {
      setError('Lutfen tum zorunlu alanlari doldurun');
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Kullanici bulunamadi');

      let fileUrl = '';
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('marketplace')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('marketplace').getPublicUrl(fileName);
        fileUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('marketplace_products')
        .insert({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: parseFloat(formData.price),
          currency: formData.currency,
          creator_id: user.id,
          creator_ghost_id: user.id,
          file_url: fileUrl,
          status: 'pending',
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ title: '', description: '', category: 'prototype', price: '', currency: 'USD' });
      setFile(null);
      setTimeout(() => {
        setSuccess(false);
        onUploaded();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Yukleme sirasinda hata olustu');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6 border border-cyber-500/20">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-gradient-to-r from-cyber-600 to-matrix-600 p-2.5 rounded-lg">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Urun Yukleme Formu</h3>
            <p className="text-xs text-slate-400">Prototip, yazilim, kod veya matematik algoritmasi yukleyin</p>
          </div>
        </div>

        {/* Revenue Info Banner */}
        <div className="bg-gradient-to-r from-matrix-900/30 to-cyber-900/30 border border-matrix-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-matrix-600 p-2 rounded-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Gelir Paylasimi: %50 / %50</p>
              <p className="text-xs text-slate-400">Her satisin %50'si ureticiye, %50'si proje hazinesine</p>
            </div>
          </div>
        </div>

        {success && (
          <div className="bg-matrix-900/30 border border-matrix-500/50 rounded-lg p-4 mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-matrix-400" />
            <p className="text-sm text-matrix-300">Urun basariyla yuklendi! Onay sonrasi pazar yerinde yayinlanacak.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-400" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Tag className="inline h-4 w-4 mr-1" />
              Urun Adi *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm"
              placeholder="Orn: Kuantum Direnc Algoritmasi v2.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Aciklama *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm resize-none"
              placeholder="Urununuzun ne yaptigini ve nasil calistigini aciklayin..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Fiyat (USD) *
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white text-sm"
                placeholder="99.99"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FileCode className="inline h-4 w-4 mr-1" />
              Dosya Yukle
            </label>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyber-500/50 transition-colors">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  {file ? file.name : 'Dosya secmek icin tiklayin'}
                </p>
                <p className="text-[10px] text-slate-600 mt-1">.zip, .py, .js, .ts, .cpp, .pdf, .ipynb</p>
              </label>
            </div>
          </div>

          {/* Revenue Preview */}
          {formData.price && parseFloat(formData.price) > 0 && (
            <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
              <p className="text-xs text-slate-500 mb-2">Gelir Paylasimi Onizleme</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-matrix-400">${(parseFloat(formData.price) * 0.5).toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500">Uretici (%50)</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-400">${(parseFloat(formData.price) * 0.5).toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500">Proje Hazinesi (%50)</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 disabled:opacity-50 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Yukleniyor...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" /> Urunu Yukle
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
