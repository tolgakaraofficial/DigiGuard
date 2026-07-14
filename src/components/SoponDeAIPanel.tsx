import React, { useState } from 'react';
import {
  Cpu, Activity, Shield, AlertTriangle, Zap,
  Brain, Eye, Radar, CheckCircle, TrendingUp,
  Gauge, RefreshCw, Network
} from 'lucide-react';

interface ThreatDetection {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: string;
  status: 'blocked' | 'monitoring' | 'investigating';
  aiAction: string;
}

const threatDetections: ThreatDetection[] = [
  { id: 'T-001', type: 'Sahte Profil Tespiti', severity: 'high', source: 'Facebook', timestamp: '2 saat önce', status: 'blocked', aiAction: 'Otomatik engellendi' },
  { id: 'T-002', type: 'Deepfake Içerik', severity: 'critical', source: 'TikTok', timestamp: '5 saat önce', status: 'blocked', aiAction: 'Içerik kaldirildi' },
  { id: 'T-003', type: 'Kimlik Hirsizligi Girisimi', severity: 'high', source: 'Dark Web', timestamp: '1 gün önce', status: 'investigating', aiAction: 'Sopon incelemesinde' },
  { id: 'T-004', type: 'Yetkisiz Görsel', severity: 'medium', source: 'Google', timestamp: '2 gün önce', status: 'monitoring', aiAction: 'Izleme aktif' },
];

export const SoponDeAIPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'threats' | 'autonomy'>('overview');

  const aiMetrics = [
    { label: 'AI Model', value: 'Sopon v4.2', icon: Brain, color: 'text-amber-400', bgColor: 'from-amber-600/20 to-orange-700/10' },
    { label: 'Islem Hizi', value: '2.4ms', icon: Zap, color: 'text-cyber-400', bgColor: 'from-cyber-600/20 to-cyber-700/10' },
    { label: 'Tehdit Tarama', value: '7/24', icon: Radar, color: 'text-matrix-400', bgColor: 'from-matrix-600/20 to-matrix-700/10' },
    { label: 'Otonomi Seviyesi', value: 'Seviye 4', icon: Cpu, color: 'text-blue-400', bgColor: 'from-blue-600/20 to-indigo-700/10' },
  ];

  const autonomyLevels = [
    { level: 1, name: 'Reaktif', desc: 'Tehdit sonrasi müdahale', active: false },
    { level: 2, name: 'Proaktif', desc: 'Öngörülu tarama', active: false },
    { level: 3, name: 'Otonom', desc: 'Otomatik engelleme', active: false },
    { level: 4, name: 'DeAI', desc: 'Merkeziyetsiz AI karari', active: true },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-900/30 text-red-300 border-red-500/50';
      case 'high': return 'bg-orange-900/30 text-orange-300 border-orange-500/50';
      case 'medium': return 'bg-amber-900/30 text-amber-300 border-amber-500/50';
      default: return 'bg-yellow-900/30 text-yellow-300 border-yellow-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'blocked': return <CheckCircle className="h-4 w-4 text-matrix-400" />;
      case 'monitoring': return <Eye className="h-4 w-4 text-cyber-400" />;
      case 'investigating': return <RefreshCw className="h-4 w-4 text-amber-400 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-amber-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur-md opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-amber-600 to-orange-600 p-3 rounded-lg">
              <Cpu className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Sopon / DeAI Motoru</h2>
            <p className="text-xs text-slate-400">Merkeziyetsiz Yapay Zeka Tehdit Tespit Sistemi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-3 py-1.5 bg-amber-600/20 text-amber-300 text-xs rounded-full border border-amber-500/40 font-semibold">
            <Activity className="h-3 w-3 animate-pulse" /> AI AKTIF
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-5 border-b border-slate-700/50 pb-2">
        {[
          { id: 'overview', label: 'Genel Bakis' },
          { id: 'threats', label: `Tehditler (${threatDetections.length})` },
          { id: 'autonomy', label: 'Otonomi Seviyesi' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as typeof activeView)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              activeView === tab.id
                ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeView === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {aiMetrics.map((m, i) => (
              <div key={i} className={`bg-gradient-to-br ${m.bgColor} rounded-xl p-3 border border-slate-700/50`}>
                <m.icon className={`h-5 w-5 ${m.color} mb-2`} />
                <p className="text-[10px] text-slate-500">{m.label}</p>
                <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/50">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-400" /> AI Performans Göstergeleri
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Tehdit Tarama Hizi', value: 94, color: 'bg-amber-500' },
                { label: 'Dogruluk Orani', value: 98, color: 'bg-matrix-500' },
                { label: 'Otomatik Müdahale', value: 89, color: 'bg-cyber-500' },
                { label: 'False Positive Rate', value: 4, color: 'bg-red-500', inverse: true },
              ].map((g, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">{g.label}</span>
                    <span className={`text-xs font-semibold ${g.inverse ? 'text-red-400' : 'text-matrix-400'}`}>{g.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className={`h-full ${g.color} rounded-full transition-all duration-500`} style={{ width: `${g.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'threats' && (
        <div className="space-y-2">
          {threatDetections.map((threat) => (
            <div key={threat.id} className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
              <div className="flex-shrink-0 mt-0.5">{getStatusIcon(threat.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{threat.type}</p>
                  <span className={`px-2 py-0.5 text-[9px] rounded-full border font-semibold ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-0.5"><Network className="h-2.5 w-2.5" /> {threat.source}</span>
                  <span>{threat.timestamp}</span>
                </div>
                <p className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                  <Shield className="h-2.5 w-2.5" /> AI Aksiyon: {threat.aiAction}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'autonomy' && (
        <div className="space-y-3">
          {autonomyLevels.map((al) => (
            <div
              key={al.level}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                al.active
                  ? 'bg-gradient-to-r from-amber-600/20 to-orange-600/10 border-amber-500/40 ring-1 ring-amber-500/20'
                  : 'bg-slate-900/40 border-slate-700/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                al.active ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-400'
              }`}>
                {al.level}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${al.active ? 'text-amber-300' : 'text-slate-300'}`}>{al.name}</p>
                <p className="text-xs text-slate-400">{al.desc}</p>
              </div>
              {al.active && (
                <span className="flex items-center gap-1 px-2 py-1 bg-amber-600/30 text-amber-300 text-[9px] rounded-full border border-amber-500/50 font-semibold animate-pulse">
                  <TrendingUp className="h-2.5 w-2.5" /> AKTIF SEVIYE
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
