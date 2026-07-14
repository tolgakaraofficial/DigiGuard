import React, { useState } from 'react';
import {
  User, Building2, PawPrint, Leaf, Package,
  ChevronRight, Plus, Search, Filter, CheckCircle,
  Fingerprint, Shield, Database, Activity
} from 'lucide-react';

type EntityType = 'individual' | 'corporate' | 'animal' | 'plant' | 'product';

interface Entity {
  id: string;
  type: EntityType;
  name: string;
  cerebroId: string;
  status: 'verified' | 'pending' | 'monitoring';
  registeredAt: string;
  kycScore: number;
}

const entityCategories: {
  type: EntityType;
  label: string;
  labelEn: string;
  icon: typeof User;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}[] = [
  { type: 'individual', label: 'Bireysel', labelEn: 'Individual', icon: User, color: 'text-cyber-400', bgColor: 'from-cyber-600/20 to-cyber-700/10', borderColor: 'border-cyber-500/40', description: 'Bireysel kimlik kayitlari' },
  { type: 'corporate', label: 'Kurumsal', labelEn: 'Corporate', icon: Building2, color: 'text-matrix-400', bgColor: 'from-matrix-600/20 to-matrix-700/10', borderColor: 'border-matrix-500/40', description: 'Sirket ve kurum kayitlari' },
  { type: 'animal', label: 'Hayvan', labelEn: 'Animal', icon: PawPrint, color: 'text-amber-400', bgColor: 'from-amber-600/20 to-orange-700/10', borderColor: 'border-amber-500/40', description: 'Pet ve canli kayitlari' },
  { type: 'plant', label: 'Bitki', labelEn: 'Plant', icon: Leaf, color: 'text-green-400', bgColor: 'from-green-600/20 to-emerald-700/10', borderColor: 'border-green-500/40', description: 'Bitki ve tarim urunleri' },
  { type: 'product', label: 'Urun', labelEn: 'Product', icon: Package, color: 'text-blue-400', bgColor: 'from-blue-600/20 to-indigo-700/10', borderColor: 'border-blue-500/40', description: 'Fiziksel urun ve esyalar' },
];

const mockEntities: Entity[] = [
  { id: '1', type: 'individual', name: 'Tolga Kara', cerebroId: 'DG-IND-2026-04827', status: 'verified', registeredAt: '2026-03-15', kycScore: 98 },
  { id: '2', type: 'corporate', name: 'Karprime Technology Inc.', cerebroId: 'DG-CORP-2026-00341', status: 'verified', registeredAt: '2026-02-08', kycScore: 99 },
  { id: '3', type: 'animal', name: 'Max (Golden Retriever)', cerebroId: 'DG-ANM-2026-01902', status: 'monitoring', registeredAt: '2026-04-22', kycScore: 95 },
  { id: '4', type: 'plant', name: 'Zeytin Agaci #A-2847', cerebroId: 'DG-PLT-2026-00731', status: 'verified', registeredAt: '2026-05-10', kycScore: 92 },
  { id: '5', type: 'product', name: 'iPhone 15 Pro Max', cerebroId: 'DG-PRD-2026-05614', status: 'verified', registeredAt: '2026-06-01', kycScore: 100 },
];

export const EntityRegistryPanel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<EntityType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntities = mockEntities.filter((e) => {
    const matchesCategory = activeCategory === 'all' || e.type === activeCategory;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.cerebroId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: Entity['status']) => {
    switch (status) {
      case 'verified':
        return <span className="flex items-center gap-1 px-2 py-0.5 bg-matrix-600/30 text-matrix-300 text-[9px] rounded-full border border-matrix-500/50 font-semibold"><CheckCircle className="h-2 w-2" /> DOGRULANDI</span>;
      case 'pending':
        return <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-600/30 text-amber-300 text-[9px] rounded-full border border-amber-500/50 font-semibold"><Activity className="h-2 w-2" /> BEKLEMEDE</span>;
      case 'monitoring':
        return <span className="flex items-center gap-1 px-2 py-0.5 bg-cyber-600/30 text-cyber-300 text-[9px] rounded-full border border-cyber-500/50 font-semibold"><Activity className="h-2 w-2 animate-pulse" /> IZLEMEDE</span>;
    }
  };

  const getCategoryIcon = (type: EntityType) => {
    const cat = entityCategories.find((c) => c.type === type);
    return cat || entityCategories[0];
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-matrix-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-matrix-500 to-cyber-500 rounded-lg blur-md opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-matrix-600 to-cyber-600 p-3 rounded-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cerebro Varlik Kayit Sistemi</h2>
            <p className="text-xs text-slate-400">5 Kategori - Evrensel Kimlik Registry</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-matrix-600 to-cyber-600 hover:from-matrix-700 hover:to-cyber-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg">
          <Plus className="h-3.5 w-3.5" /> Yeni Kayit
        </button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`p-3 rounded-xl border transition-all hover:scale-[1.02] ${
            activeCategory === 'all'
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-white/40 ring-1 ring-white/20'
              : 'bg-slate-900/40 border-slate-700/50 hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-center mb-1.5">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <p className="text-xs font-semibold text-white text-center">Tumu</p>
          <p className="text-[9px] text-slate-400 text-center">{mockEntities.length} kayit</p>
        </button>
        {entityCategories.map((cat) => {
          const count = mockEntities.filter((e) => e.type === cat.type).length;
          return (
            <button
              key={cat.type}
              onClick={() => setActiveCategory(cat.type)}
              className={`p-3 rounded-xl border transition-all hover:scale-[1.02] bg-gradient-to-br ${cat.bgColor} ${
                activeCategory === cat.type ? `${cat.borderColor} ring-1 ring-white/20` : 'border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-center mb-1.5">
                <cat.icon className={`h-5 w-5 ${cat.color}`} />
              </div>
              <p className="text-xs font-semibold text-white text-center">{cat.label}</p>
              <p className="text-[9px] text-slate-400 text-center">{count} kayit</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerebro ID veya isim ara..."
            className="w-full bg-slate-900/60 text-slate-200 pl-10 pr-4 py-2 rounded-lg border border-slate-700/50 text-sm focus:outline-none focus:border-cyber-500/50 transition-colors"
          />
        </div>
        <button className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
          <Filter className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Entity List */}
      <div className="space-y-2">
        {filteredEntities.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">Sonuc bulunamadi</div>
        ) : (
          filteredEntities.map((entity) => {
            const cat = getCategoryIcon(entity.type);
            return (
              <div
                key={entity.id}
                className="flex items-center gap-4 p-3 bg-slate-900/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer group hover:bg-slate-900/60"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.bgColor} border ${cat.borderColor} flex-shrink-0`}>
                  <cat.icon className={`h-5 w-5 ${cat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-white truncate">{entity.name}</p>
                    {getStatusBadge(entity.status)}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500">
                    <span className="font-mono">{entity.cerebroId}</span>
                    <span className="flex items-center gap-0.5">
                      <Fingerprint className="h-2.5 w-2.5" /> KYC: {entity.kycScore}%
                    </span>
                    <span>Kayit: {entity.registeredAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-[9px] text-slate-500">dNFT</p>
                    <div className="flex items-center gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-matrix-400 animate-pulse" />
                      <span className="text-[9px] text-matrix-400 font-mono">Minted</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
