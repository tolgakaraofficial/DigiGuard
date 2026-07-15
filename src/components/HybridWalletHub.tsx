import React, { useState } from 'react';
import {
  Wallet, Bitcoin, Coins, ArrowRightLeft, Eye, EyeOff,
  Shield, TrendingUp, Download, ExternalLink, Copy,
  Zap, Globe, ChevronDown, ChevronUp, Lock
} from 'lucide-react';

interface WalletAsset {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

const assets: WalletAsset[] = [
  {
    symbol: 'CLB',
    name: 'Celebron Token',
    balance: '2,818,422.90',
    usdValue: '$8,455,268.70',
    color: '#00e5ff',
    bgColor: 'rgba(0,229,255,0.08)',
    borderColor: 'rgba(0,229,255,0.25)',
    icon: <Globe className="h-4 w-4" style={{ color: '#00e5ff' }} />,
  },
  {
    symbol: 'DGCT',
    name: 'DigiGuard Token',
    balance: '12,450.75',
    usdValue: '$24,901.50',
    color: '#39ff14',
    bgColor: 'rgba(57,255,20,0.08)',
    borderColor: 'rgba(57,255,20,0.25)',
    icon: <Shield className="h-4 w-4" style={{ color: '#39ff14' }} />,
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: '0.0428',
    usdValue: '$2,847.20',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.08)',
    borderColor: 'rgba(245,158,11,0.25)',
    icon: <Bitcoin className="h-4 w-4 text-amber-400" />,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '1.8472',
    usdValue: '$6,292.80',
    color: '#60a5fa',
    bgColor: 'rgba(96,165,250,0.08)',
    borderColor: 'rgba(96,165,250,0.25)',
    icon: <Coins className="h-4 w-4 text-blue-400" />,
  },
];

export const HybridWalletHub: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [activeAsset, setActiveAsset] = useState(0);
  const [quantumSigning, setQuantumSigning] = useState(false);

  const visibleAssets = expanded ? assets : assets.slice(0, 2);

  const totalUsd = assets.reduce((sum, a) => {
    const val = parseFloat(a.usdValue.replace(/[$,]/g, ''));
    return sum + val;
  }, 0);

  const handleQuantumTransfer = () => {
    setQuantumSigning(true);
    setTimeout(() => setQuantumSigning(false), 2000);
  };

  return (
    <div className="fixed top-4 right-4 z-30 w-72">
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'rgba(10, 18, 32, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,229,255,0.3)',
          boxShadow: '0 0 40px rgba(0,229,255,0.08)',
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center justify-between border-b"
          style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(57,255,20,0.05))', borderColor: 'rgba(0,229,255,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg blur-md" style={{ background: '#00e5ff30' }} />
              <div className="relative p-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #00e5ff, #39ff14)' }}>
                <Wallet className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Hybrid Wallet Hub</h3>
              <p className="text-[9px]" style={{ color: '#00e5ff80' }}>Celebron + DigiGuard</p>
            </div>
          </div>
          <button onClick={() => setShowBalance(!showBalance)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors">
            {showBalance ? <Eye className="h-3.5 w-3.5 text-slate-400" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}
          </button>
        </div>

        {/* Total Balance */}
        <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-[10px] text-slate-500 mb-0.5">Toplam Portfoy (USD)</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold" style={{ background: 'linear-gradient(90deg, #00e5ff, #39ff14)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {showBalance ? `$${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••••'}
            </p>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold" style={{ color: '#39ff14' }}>
              <TrendingUp className="h-2.5 w-2.5" /> +18.7%
            </span>
          </div>
        </div>

        {/* Assets */}
        <div className="p-3 space-y-2">
          {visibleAssets.map((asset, i) => (
            <div
              key={i}
              onClick={() => setActiveAsset(i)}
              className="rounded-xl p-2.5 cursor-pointer transition-all hover:scale-[1.01]"
              style={{
                background: asset.bgColor,
                border: `1px solid ${activeAsset === i ? asset.color + '60' : asset.borderColor}`,
                boxShadow: activeAsset === i ? `0 0 12px ${asset.color}15` : 'none',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-900/60">{asset.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-white">{asset.symbol}</p>
                    <p className="text-[9px] text-slate-400">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white">{showBalance ? asset.balance : '••••'}</p>
                  <p className="text-[9px] text-slate-400">{showBalance ? asset.usdValue : '••••'}</p>
                </div>
              </div>
            </div>
          ))}

          {assets.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {expanded ? <><ChevronUp className="h-3 w-3" /> Daha az</>
                        : <><ChevronDown className="h-3 w-3" /> +{assets.length - 2} varlık daha</>}
            </button>
          )}
        </div>

        {/* Quantum Transfer Button */}
        <div className="px-3 pb-2">
          <button
            onClick={handleQuantumTransfer}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs transition-all"
            style={{
              background: quantumSigning
                ? 'linear-gradient(135deg, #39ff1440, #00e5ff40)'
                : 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(57,255,20,0.15))',
              border: `1px solid ${quantumSigning ? '#39ff14' : 'rgba(0,229,255,0.3)'}`,
              color: quantumSigning ? '#39ff14' : '#00e5ff',
            }}
          >
            {quantumSigning ? (
              <><Lock className="h-3.5 w-3.5 animate-pulse" /> Kuantum Imza Uygulanıyor...</>
            ) : (
              <><Zap className="h-3.5 w-3.5" /> Kuantum Guvenli Transfer Imzala</>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="px-3 pb-3 grid grid-cols-3 gap-1.5">
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-[9px]"
            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00e5ff' }}>
            <ArrowRightLeft className="h-3.5 w-3.5" /> Transfer
          </button>
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-[9px]"
            style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', color: '#39ff14' }}>
            <Download className="h-3.5 w-3.5" /> Al
          </button>
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-[9px]"
            style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
            <ExternalLink className="h-3.5 w-3.5" /> Gonder
          </button>
        </div>

        {/* Wallet Address */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 rounded-lg p-2" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-[9px] font-mono text-slate-500 truncate flex-1">
              0x4dg7...cerebro...f8a2
            </p>
            <button onClick={() => navigator.clipboard.writeText('0x4dg7cerebro_wallet_f8a2')}
              className="p-1 rounded transition-colors hover:bg-slate-800 flex-shrink-0">
              <Copy className="h-3 w-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
