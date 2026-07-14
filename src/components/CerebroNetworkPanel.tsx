import React, { useState, useEffect } from 'react';
import {
  Network, Shield, Fingerprint, Lock, Cpu, Globe,
  CheckCircle, AlertTriangle, Activity, ChevronRight,
  Layers, Zap, Eye, Database, Workflow
} from 'lucide-react';

interface Layer {
  id: number;
  name: string;
  nameEn: string;
  icon: typeof Network;
  color: string;
  bgColor: string;
  borderColor: string;
  status: 'active' | 'standby' | 'syncing';
  description: string;
  metrics: { label: string; value: string }[];
}

const layers: Layer[] = [
  {
    id: 1,
    name: 'KYC Doğrulama Katmanı',
    nameEn: 'KYC Verification Layer',
    icon: Fingerprint,
    color: 'text-cyber-400',
    bgColor: 'from-cyber-600/20 to-cyber-700/10',
    borderColor: 'border-cyber-500/40',
    status: 'active',
    description: 'Biyometrik kimlik doğrulama ve gerçek kişi tespiti',
    metrics: [
      { label: 'Doğrulama', value: 'Tamamlandı' },
      { label: 'Güven Skoru', value: '98.7%' },
      { label: 'AI Analizi', value: 'Aktif' },
    ],
  },
  {
    id: 2,
    name: 'Cerebro Network ID',
    nameEn: 'Cerebro Network Identity',
    icon: Network,
    color: 'text-matrix-400',
    bgColor: 'from-matrix-600/20 to-matrix-700/10',
    borderColor: 'border-matrix-500/40',
    status: 'active',
    description: 'Merkezi kimlik kayıt ve yönetim ağı',
    metrics: [
      { label: 'Kayıtlı Varlık', value: '5 Kategori' },
      { label: 'Düğüm Sayısı', value: '2,847' },
      { label: 'Ağ Durumu', value: 'Online' },
    ],
  },
  {
    id: 3,
    name: 'Kripto Zırh',
    nameEn: 'Crypto Shield Layer',
    icon: Lock,
    color: 'text-secure-400',
    bgColor: 'from-secure-600/20 to-secure-700/10',
    borderColor: 'border-secure-500/40',
    status: 'active',
    description: 'AES-256 + SHA-256 çift katmanlı şifreleme koruması',
    metrics: [
      { label: 'Şifreleme', value: 'AES-256' },
      { label: 'Hash', value: 'SHA-256' },
      { label: 'Zırh Durumu', value: 'Aktif' },
    ],
  },
  {
    id: 4,
    name: 'Sopon / DeAI Motoru',
    nameEn: 'Sopon DeAI Engine',
    icon: Cpu,
    color: 'text-amber-400',
    bgColor: 'from-amber-600/20 to-orange-700/10',
    borderColor: 'border-amber-500/40',
    status: 'active',
    description: 'Otononom yapay zeka tehdit tespit ve müdahale sistemi',
    metrics: [
      { label: 'AI Model', value: 'Sopon v4.2' },
      { label: 'Tehdit Tarama', value: '7/24' },
      { label: 'Müdahale', value: 'Otomatik' },
    ],
  },
  {
    id: 5,
    name: 'Web4 Otonom Köprü',
    nameEn: 'Web4 Autonomous Bridge',
    icon: Globe,
    color: 'text-blue-400',
    bgColor: 'from-blue-600/20 to-indigo-700/10',
    borderColor: 'border-blue-500/40',
    status: 'syncing',
    description: 'Web3 → Web4 geçiş protokolü ve evrensel kimlik köprüsü',
    metrics: [
      { label: 'Köprü Durumu', value: 'Senkronize' },
      { label: 'Ağ Geçişi', value: 'Web3 → Web4' },
      { label: 'Uyumluluk', value: 'Çoklu-EV' },
    ],
  },
];

export const CerebroNetworkPanel: React.FC = () => {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(1);
  const [pukoPhase, setPukoPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPukoPhase((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const pukoSteps = ['Proaktif', 'Uyarı', 'Koruma', 'Onarım'];
  const pukoIcons = [Eye, AlertTriangle, Shield, CheckCircle];
  const pukoColors = ['text-cyber-400', 'text-amber-400', 'text-matrix-400', 'text-secure-400'];

  const getStatusBadge = (status: Layer['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-matrix-600/30 text-matrix-300 text-[10px] rounded-full border border-matrix-500/50 font-semibold">
            <CheckCircle className="h-2.5 w-2.5" /> AKTIF
          </span>
        );
      case 'syncing':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-600/30 text-blue-300 text-[10px] rounded-full border border-blue-500/50 font-semibold animate-pulse">
            <Activity className="h-2.5 w-2.5" /> SENKRON
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-600/30 text-slate-300 text-[10px] rounded-full border border-slate-500/50 font-semibold">
            <AlertTriangle className="h-2.5 w-2.5" /> BEKLEMEDE
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-cyber-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-500 to-matrix-500 rounded-lg blur-md opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-cyber-600 to-matrix-600 p-3 rounded-lg">
              <Layers className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cerebro Network Mimarisi</h2>
            <p className="text-xs text-slate-400">5 Katmanli Güvenlik Sistemi & PUKO Dongusu</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-3 py-1.5 bg-matrix-600/20 text-matrix-300 text-xs rounded-full border border-matrix-500/40 font-semibold">
            <Zap className="h-3 w-3" /> 5/5 Katman Aktif
          </span>
        </div>
      </div>

      {/* PUKO Cycle */}
      <div className="mb-6 bg-slate-900/50 rounded-xl p-4 border border-amber-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
            <Workflow className="h-4 w-4" /> PUKO Dongusu
          </h3>
          <span className="text-[10px] text-slate-500">Proaktif → Uyari → Koruma → Onarim</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          {pukoSteps.map((step, i) => {
            const Icon = pukoIcons[i];
            const isActive = i === pukoPhase;
            return (
              <React.Fragment key={i}>
                <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-50'}`}>
                  <div className={`p-2 rounded-lg border transition-all ${isActive ? 'bg-amber-500/20 border-amber-500/60' : 'bg-slate-800/50 border-slate-700'}`}>
                    <Icon className={`h-5 w-5 ${isActive ? pukoColors[i] : 'text-slate-500'} ${isActive ? 'animate-pulse' : ''}`} />
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? pukoColors[i] : 'text-slate-500'}`}>{step}</span>
                </div>
                {i < 3 && (
                  <ChevronRight className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-600'} transition-colors`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 5 Layers */}
      <div className="space-y-3">
        {layers.map((layer) => (
          <div
            key={layer.id}
            onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
            className={`bg-gradient-to-r ${layer.bgColor} rounded-xl p-4 border ${layer.borderColor} cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 relative">
                <div className={`absolute inset-0 ${layer.color} opacity-20 blur-lg rounded-lg`} />
                <div className={`relative p-2.5 rounded-lg bg-slate-900/60 border ${layer.borderColor}`}>
                  <layer.icon className={`h-6 w-6 ${layer.color}`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-slate-500">KATMAN {layer.id}</span>
                  {getStatusBadge(layer.status)}
                </div>
                <h3 className="text-sm font-bold text-white truncate">{layer.name}</h3>
                <p className="text-xs text-slate-400 truncate">{layer.description}</p>
              </div>

              <ChevronRight className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${expandedLayer === layer.id ? 'rotate-90' : ''}`} />
            </div>

            {expandedLayer === layer.id && (
              <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-3">
                {layer.metrics.map((m, i) => (
                  <div key={i} className="bg-slate-900/40 rounded-lg p-2.5 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 mb-0.5">{m.label}</p>
                    <p className={`text-sm font-semibold ${layer.color}`}>{m.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Architecture Flow */}
      <div className="mt-6 flex items-center justify-center gap-1 text-[10px] text-slate-500 font-mono">
        <Database className="h-3 w-3 text-cyber-400" />
        <span>KYC</span>
        <ChevronRight className="h-3 w-3" />
        <Network className="h-3 w-3 text-matrix-400" />
        <span>Cerebro</span>
        <ChevronRight className="h-3 w-3" />
        <Lock className="h-3 w-3 text-secure-400" />
        <span>Kripto Zirh</span>
        <ChevronRight className="h-3 w-3" />
        <Cpu className="h-3 w-3 text-amber-400" />
        <span>Sopon</span>
        <ChevronRight className="h-3 w-3" />
        <Globe className="h-3 w-3 text-blue-400" />
        <span>Web4</span>
      </div>
    </div>
  );
};
