import React, { useState, useEffect } from 'react';
import { Network, ArrowRightLeft, ShieldCheck, Zap, Boxes, Cpu, Radio, Satellite, Car, Smartphone, Watch, Activity, Lock, TrendingUp, ChevronRight } from 'lucide-react';

interface BridgeStat {
  label: string;
  value: string;
  color: string;
  icon: React.ElementType;
}

interface AssetRow {
  id: string;
  type: 'IoT' | 'Vehicle' | 'Wearable' | 'Mobile' | 'Satellite';
  label: string;
  location: string;
  status: 'tracked' | 'verified' | 'syncing' | 'alert';
  lastSeen: string;
  binding: string;
  icon: React.ElementType;
}

const assetRows: AssetRow[] = [
  { id: 'IOT-7841', type: 'IoT', label: 'Smart Home Hub Alpha', location: 'Istanbul, TR', status: 'tracked', lastSeen: '2 dk önce', binding: '0x7a3f...e9b2', icon: Cpu },
  { id: 'IOT-7842', type: 'IoT', label: 'Industrial Sensor #42', location: 'Kocaeli, TR', status: 'verified', lastSeen: '1 dk önce', binding: '0x8b1c...f04a', icon: Radio },
  { id: 'VEH-1201', type: 'Vehicle', label: 'Fleet Vehicle TR-34-7841', location: 'Istanbul, TR', status: 'tracked', lastSeen: '30 sn önce', binding: '0x4d2e...a81c', icon: Car },
  { id: 'VEH-1202', type: 'Vehicle', label: 'Logistics Truck TR-41-2290', location: 'Ankara, TR', status: 'syncing', lastSeen: '45 sn önce', binding: '0x9c5b...d3f0', icon: Car },
  { id: 'WBL-3301', type: 'Wearable', label: 'Health Band Pro 5', location: 'Izmir, TR', status: 'verified', lastSeen: '10 sn önce', binding: '0x2a8f...c7e1', icon: Watch },
  { id: 'MOB-5501', type: 'Mobile', label: 'Field Agent Phone #17', location: 'Bursa, TR', status: 'tracked', lastSeen: '1 dk önce', binding: '0x6e4d...b29a', icon: Smartphone },
  { id: 'SAT-9001', type: 'Satellite', label: 'Cerebro Mesh Node SAT-7', location: 'LEO Orbit', status: 'verified', lastSeen: '3 dk önce', binding: '0x1f0a...88ce', icon: Satellite },
  { id: 'IOT-7843', type: 'IoT', label: 'Border Checkpoint Scanner', location: 'Edirne, TR', status: 'alert', lastSeen: '5 dk önce', binding: '0x3b7c...0e5d', icon: Radio },
];

const bridgeStats: BridgeStat[] = [
  { label: 'Bridge Durumu', value: 'AKTIF', color: '#39ff14', icon: ShieldCheck },
  { label: 'Islem Hizi', value: '0.8s', color: '#00e5ff', icon: Zap },
  { label: 'Non-Custodial', value: '100%', color: '#f59e0b', icon: Lock },
  { label: 'Aktif Varlik', value: '8/8', color: '#a855f7', icon: Boxes },
];

const statusConfig: Record<AssetRow['status'], { color: string; label: string; bg: string }> = {
  tracked: { color: '#00e5ff', label: 'Izleniyor', bg: 'rgba(0,229,255,0.12)' },
  verified: { color: '#39ff14', label: 'Dogrulandi', bg: 'rgba(57,255,20,0.12)' },
  syncing: { color: '#f59e0b', label: 'Senkronize', bg: 'rgba(245,158,11,0.12)' },
  alert: { color: '#ef4444', label: 'Uyari', bg: 'rgba(239,68,68,0.12)' },
};

export const SovereignBridgePanel: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetRow | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Bridge Header */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.15)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg" style={{ background: 'rgba(0,229,255,0.1)' }}>
              <ArrowRightLeft className="h-6 w-6" style={{ color: '#00e5ff' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Sovereign Bridge</h2>
              <p className="text-xs text-slate-400">Non-custodial fee bridge - Cilt 10 protokolu</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)' }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#39ff14' }} />
            <span className="text-xs font-mono" style={{ color: '#39ff14' }}>ONLINE</span>
          </div>
        </div>

        {/* Bridge Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bridgeStats.map((stat, i) => (
            <div key={i} className="rounded-lg p-3 border" style={{ background: 'rgba(2,6,23,0.8)', borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-1">
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                <span className="text-[10px] font-mono text-slate-500">#{(tick * 7 + i * 13) % 999}</span>
              </div>
              <p className="text-[10px] text-slate-500 mb-0.5">{stat.label}</p>
              <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bridge Flow Diagram */}
        <div className="mt-4 rounded-lg p-4 border" style={{ background: 'rgba(2,6,23,0.8)', borderColor: 'rgba(0,229,255,0.1)' }}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 rounded-lg" style={{ background: 'rgba(0,229,255,0.1)' }}>
                <Network className="h-5 w-5" style={{ color: '#00e5ff' }} />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Source Chain</span>
            </div>

            <div className="flex-1 flex items-center">
              <div className="flex-1 h-[2px]" style={{ background: 'linear-gradient(90deg, #00e5ff, #39ff14)' }} />
              <div className="px-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: 'rgba(57,255,20,0.1)' }}>
                  <Lock className="h-3 w-3" style={{ color: '#39ff14' }} />
                  <span className="text-[9px] font-mono" style={{ color: '#39ff14' }}>Non-Custodial</span>
                </div>
              </div>
              <div className="flex-1 h-[2px]" style={{ background: 'linear-gradient(90deg, #39ff14, #f59e0b)' }} />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)' }}>
                <ShieldCheck className="h-5 w-5" style={{ color: '#f59e0b' }} />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Sovereign Vault</span>
            </div>

            <div className="flex-1 flex items-center">
              <div className="flex-1 h-[2px]" style={{ background: 'linear-gradient(90deg, #f59e0b, #a855f7)' }} />
              <div className="px-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: 'rgba(168,85,247,0.1)' }}>
                  <Zap className="h-3 w-3" style={{ color: '#a855f7' }} />
                  <span className="text-[9px] font-mono" style={{ color: '#a855f7' }}>0.8s</span>
                </div>
              </div>
              <div className="flex-1 h-[2px]" style={{ background: 'linear-gradient(90deg, #a855f7, #39ff14)' }} />
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 rounded-lg" style={{ background: 'rgba(57,255,20,0.1)' }}>
                <Boxes className="h-5 w-5" style={{ color: '#39ff14' }} />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Dest Chain</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 text-center font-mono">
            Sovereign Bridge Protocol: Kullanici varliklari uzerinden non-custodial transfer - 0.8s ortalama islem suresi
          </p>
        </div>
      </div>

      {/* IoT Asset Tracking Table */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.15)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" style={{ color: '#00e5ff' }} />
            <h3 className="text-sm font-bold text-white">IoT Varlik Takip Tablosu</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">{assetRows.length} aktif kayit</span>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-mono text-slate-500 border-b" style={{ borderColor: 'rgba(0,229,255,0.08)' }}>
          <div className="col-span-1">ID</div>
          <div className="col-span-3">VARLIK</div>
          <div className="col-span-2">KONUM</div>
          <div className="col-span-2">DURUM</div>
          <div className="col-span-2">SON GORULME</div>
          <div className="col-span-2">KIMLIK BAGLAMA</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-1 mt-2">
          {assetRows.map((asset) => {
            const sc = statusConfig[asset.status];
            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className="grid grid-cols-12 gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all hover:bg-slate-800/40"
                style={{ background: 'rgba(2,6,23,0.4)' }}
              >
                <div className="col-span-12 md:col-span-1 flex items-center gap-1">
                  <asset.icon className="h-3.5 w-3.5" style={{ color: sc.color }} />
                  <span className="text-[10px] font-mono text-slate-400">{asset.id}</span>
                </div>
                <div className="col-span-6 md:col-span-3 flex items-center">
                  <span className="text-xs text-white font-medium">{asset.label}</span>
                </div>
                <div className="col-span-6 md:col-span-2 flex items-center">
                  <span className="text-[11px] text-slate-400">{asset.location}</span>
                </div>
                <div className="col-span-6 md:col-span-2 flex items-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: sc.bg, color: sc.color }}>
                    {sc.label}
                  </span>
                </div>
                <div className="col-span-6 md:col-span-2 flex items-center">
                  <span className="text-[10px] text-slate-500 font-mono">{asset.lastSeen}</span>
                </div>
                <div className="col-span-12 md:col-span-2 flex items-center gap-1">
                  <span className="text-[10px] font-mono text-slate-500 truncate">{asset.binding}</span>
                  <ChevronRight className="h-3 w-3 text-slate-600" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: '#39ff14' }} /> Dogrulandi</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: '#00e5ff' }} /> Izleniyor</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} /> Senkronize</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} /> Uyari</span>
          </div>
          <span>Toplam: {assetRows.length} varlik | {assetRows.filter(a => a.status === 'verified').length} dogrulandi</span>
        </div>
      </div>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setSelectedAsset(null)}>
          <div className="relative max-w-md w-full rounded-xl border p-5" style={{ background: 'rgba(2,6,23,0.95)', borderColor: 'rgba(0,229,255,0.3)' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg" style={{ background: statusConfig[selectedAsset.status].bg }}>
                <selectedAsset.icon className="h-6 w-6" style={{ color: statusConfig[selectedAsset.status].color }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{selectedAsset.label}</h3>
                <p className="text-[10px] font-mono text-slate-500">{selectedAsset.id} · {selectedAsset.type}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                <span className="text-slate-500">Konum</span>
                <span className="text-slate-300">{selectedAsset.location}</span>
              </div>
              <div className="flex justify-between p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                <span className="text-slate-500">Durum</span>
                <span style={{ color: statusConfig[selectedAsset.status].color }}>{statusConfig[selectedAsset.status].label}</span>
              </div>
              <div className="flex justify-between p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                <span className="text-slate-500">Son Gorulme</span>
                <span className="text-slate-300">{selectedAsset.lastSeen}</span>
              </div>
              <div className="flex justify-between p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                <span className="text-slate-500">Kimlik Baglama</span>
                <span className="font-mono text-slate-300">{selectedAsset.binding}</span>
              </div>
              <div className="flex justify-between p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                <span className="text-slate-500">Bridge Protokol</span>
                <span style={{ color: '#00e5ff' }}>Sovereign v2</span>
              </div>
            </div>
            <button onClick={() => setSelectedAsset(null)} className="mt-4 w-full py-2 rounded-lg text-xs font-semibold transition-all" style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', color: '#00e5ff' }}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
