import React, { useState, useEffect } from 'react';
import {
  Globe, Wifi, Shield, Cpu, Zap, Network,
  CheckCircle, Activity, Link, Radio, Server,
  Triangle, ChevronRight, Lock, RefreshCw, Eye
} from 'lucide-react';

interface PeerNode {
  id: string;
  region: string;
  latency: number;
  status: 'online' | 'syncing' | 'standby';
}

const mockNodes: PeerNode[] = [
  { id: 'TR-001', region: 'Istanbul', latency: 12, status: 'online' },
  { id: 'DE-004', region: 'Frankfurt', latency: 38, status: 'online' },
  { id: 'US-017', region: 'New York', latency: 94, status: 'online' },
  { id: 'SG-003', region: 'Singapore', latency: 167, status: 'syncing' },
  { id: 'JP-009', region: 'Tokyo', latency: 189, status: 'syncing' },
  { id: 'AU-002', region: 'Sydney', latency: 201, status: 'standby' },
];

const protocolLayers = [
  {
    name: 'Bridging Katmani',
    tech: 'WebRTC + WebTransport',
    desc: 'Donanımsız tarayıcılar arası P2P tünel',
    color: 'text-cyber-400',
    bg: 'from-cyber-600/20 to-cyan-700/10',
    border: 'border-cyber-500/40',
    icon: Link,
    status: 'Aktif',
  },
  {
    name: 'Kriptografik Katman',
    tech: 'Dilithium + Kyber-1024',
    desc: 'Kafes-tabanli kuantum dirençli sifreleme',
    color: 'text-matrix-400',
    bg: 'from-matrix-600/20 to-green-700/10',
    border: 'border-matrix-500/40',
    icon: Lock,
    status: 'Aktif',
  },
  {
    name: 'Mutabakat Katmani',
    tech: 'DAG (Directed Acyclic Graph)',
    desc: 'Anayasal blok onay dongusu, sifir gecikme',
    color: 'text-amber-400',
    bg: 'from-amber-600/20 to-orange-700/10',
    border: 'border-amber-500/40',
    icon: Triangle,
    status: 'Senkron',
  },
];

export const Web4BridgePanel: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState(1402);
  const [totalSecurity, setTotalSecurity] = useState(99847.3);
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'protocol'>('overview');
  const [bridgeActivity, setBridgeActivity] = useState<number[]>([60, 75, 82, 70, 90, 85, 95, 88, 92, 97, 94, 99]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes((n) => n + Math.floor(Math.random() * 3) - 1);
      setTotalSecurity((s) => parseFloat((s + (Math.random() * 2 - 1)).toFixed(1)));
      setBridgeActivity((prev) => [...prev.slice(1), Math.floor(Math.random() * 30) + 70]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getNodeStatusColor = (status: PeerNode['status']) => {
    switch (status) {
      case 'online': return 'text-matrix-400 bg-matrix-600/20 border-matrix-500/40';
      case 'syncing': return 'text-amber-400 bg-amber-600/20 border-amber-500/40';
      default: return 'text-slate-400 bg-slate-600/20 border-slate-500/40';
    }
  };

  const maxBar = Math.max(...bridgeActivity);

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-[#00e5ff]/30 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00e5ff]/30 blur-lg rounded-lg animate-pulse" />
            <div className="relative p-3 rounded-lg" style={{ background: 'linear-gradient(135deg, #00e5ff22, #39ff1422)' }}>
              <Globe className="h-6 w-6 text-[#00e5ff]" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Web4 Dagitik Kopru</h2>
            <p className="text-xs text-slate-400">DigiGuard & Celebron Donanımsız P2P Protokolü</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: '#39ff1415', color: '#39ff14', borderColor: '#39ff1440' }}>
            <Wifi className="h-3 w-3 animate-pulse" /> BAGLI - COKLU CIHAZ SENKRONIZE
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Aktif Node', value: activeNodes.toLocaleString('tr-TR'), icon: Server, color: '#00e5ff', sub: 'Peer sayisi' },
          { label: 'Guvenlik Limiti', value: `${totalSecurity.toFixed(1)}K`, icon: Shield, color: '#39ff14', sub: 'S_total hesap' },
          { label: 'Kuantum Filtre', value: 'Aktif', icon: Zap, color: '#ffa500', sub: 'Shor/Grover koruma' },
          { label: 'Donanim Bagimsiz', value: '%100', icon: Cpu, color: '#60a5fa', sub: 'Yazilimsal sanal' },
        ].map((m, i) => (
          <div key={i} className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
            <m.icon className="h-5 w-5 mb-2" style={{ color: m.color }} />
            <p className="text-[10px] text-slate-500 mb-0.5">{m.label}</p>
            <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}</p>
            <p className="text-[9px] text-slate-600">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 border-b border-slate-700/50 pb-2">
        {[
          { id: 'overview', label: 'Kopru Durumu' },
          { id: 'nodes', label: `Dugumler (${mockNodes.length})` },
          { id: 'protocol', label: 'Protokol Katmanlari' },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'text-white border'
                : 'text-slate-400 hover:text-white'
            }`}
            style={activeTab === tab.id ? { background: '#00e5ff15', borderColor: '#00e5ff40', color: '#00e5ff' } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Bridge Activity Chart */}
          <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#00e5ff]" /> Kopru Aktivite Grafigi
              </h3>
              <span className="text-[10px] text-slate-500">Son 30 sn</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {bridgeActivity.map((val, i) => (
                <div key={i} className="flex-1 rounded-sm transition-all duration-500"
                  style={{ height: `${(val / maxBar) * 100}%`, background: i === bridgeActivity.length - 1 ? '#00e5ff' : '#00e5ff40' }} />
              ))}
            </div>
          </div>

          {/* Security Formula */}
          <div className="bg-slate-900/40 rounded-xl p-4 border border-[#00e5ff]/20">
            <p className="text-xs text-slate-400 mb-2 flex items-center gap-2">
              <Lock className="h-3 w-3 text-[#00e5ff]" /> Guvenlik Limiti Formulu
            </p>
            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700/50 text-center">
              <p className="font-mono text-sm" style={{ color: '#00e5ff' }}>
                S<sub>total</sub> = &Sigma; (N<sub>i</sub> &times; C<sub>i</sub>) &minus; &Delta;<sub>latency</sub>
              </p>
              <div className="flex justify-center gap-6 mt-3 text-[10px] text-slate-500">
                <span><span style={{ color: '#39ff14' }}>N</span> = Dugum sayisi: {activeNodes.toLocaleString()}</span>
                <span><span style={{ color: '#ffa500' }}>C</span> = Kripto katsayi</span>
                <span><span style={{ color: '#60a5fa' }}>&Delta;</span> = Gecikme</span>
              </div>
            </div>
          </div>

          {/* Quantum Protection */}
          <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/10 rounded-xl p-4 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Kuantum Tehdit Koruması Aktif</h4>
                <p className="text-xs text-slate-400 mb-2">
                  Shor ve Grover algoritmalarına karşı dağıtık hisseli doğrulama mantığı ile donanımsız koruma.
                </p>
                <div className="flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1" style={{ color: '#39ff14' }}>
                    <CheckCircle className="h-2.5 w-2.5" /> Shor Algoritması Engellendi
                  </span>
                  <span className="flex items-center gap-1" style={{ color: '#39ff14' }}>
                    <CheckCircle className="h-2.5 w-2.5" /> Grover Algoritması Engellendi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nodes' && (
        <div className="space-y-2">
          {mockNodes.map((node) => (
            <div key={node.id} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
              <div className="relative flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${node.status === 'online' ? 'bg-matrix-400 animate-pulse' : node.status === 'syncing' ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs font-mono font-bold text-white">{node.id}</p>
                  <span className={`px-1.5 py-0.5 text-[9px] rounded border font-semibold ${getNodeStatusColor(node.status)}`}>
                    {node.status === 'online' ? 'ONLINE' : node.status === 'syncing' ? 'SENKRON' : 'BEKLEME'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">{node.region}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs font-semibold ${node.latency < 50 ? 'text-matrix-400' : node.latency < 150 ? 'text-amber-400' : 'text-orange-400'}`}>
                  {node.latency}ms
                </p>
                <p className="text-[9px] text-slate-600">gecikme</p>
              </div>
            </div>
          ))}
          <div className="pt-2 text-center">
            <p className="text-xs text-slate-500">
              Toplam <span style={{ color: '#00e5ff' }} className="font-bold">{activeNodes.toLocaleString()}</span> aktif node ağda senkronize çalışıyor
            </p>
          </div>
        </div>
      )}

      {activeTab === 'protocol' && (
        <div className="space-y-3">
          {protocolLayers.map((layer, i) => (
            <div key={i} className={`bg-gradient-to-r ${layer.bg} rounded-xl p-4 border ${layer.border}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg bg-slate-900/60 border ${layer.border}`}>
                  <layer.icon className={`h-5 w-5 ${layer.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className={`text-sm font-bold ${layer.color}`}>{layer.name}</h4>
                    <span className={`px-2 py-0.5 text-[9px] rounded-full border font-semibold ${layer.color} bg-slate-900/40 border-current/40`}>
                      {layer.status}
                    </span>
                  </div>
                  <p className="text-xs text-white font-mono mb-1">{layer.tech}</p>
                  <p className="text-xs text-slate-400">{layer.desc}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-700/50 mt-4">
            <p className="text-[10px] text-slate-400 text-center">
              2 bilgisayar aktif oldugu surece DigiGuard & Celebron agi yasayor, sifreliyor, transfer sureclerini sürdürüyor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
