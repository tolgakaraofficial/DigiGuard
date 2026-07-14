import React, { useState } from 'react';
import {
  Wallet, Bitcoin, Coins, ArrowRightLeft, Eye, EyeOff,
  Shield, TrendingUp, Download, ExternalLink, Copy
} from 'lucide-react';

interface WalletAsset {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
  icon: typeof Bitcoin;
  color: string;
  bgColor: string;
}

const assets: WalletAsset[] = [
  { symbol: 'DGCT', name: 'DigiGuard Token', balance: '12,450.75', usdValue: '$24,901.50', icon: Shield, color: 'text-cyber-400', bgColor: 'from-cyber-600/30 to-cyber-700/20' },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.0428', usdValue: '$2,847.20', icon: Bitcoin, color: 'text-amber-400', bgColor: 'from-amber-600/30 to-orange-700/20' },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.8472', usdValue: '$6,292.80', icon: Coins, color: 'text-blue-400', bgColor: 'from-blue-600/30 to-indigo-700/20' },
];

export const HybridWalletHub: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeAsset, setActiveAsset] = useState(0);

  const totalUsd = assets.reduce((sum, a) => {
    const val = parseFloat(a.usdValue.replace(/[$,]/g, ''));
    return sum + val;
  }, 0);

  return (
    <div className="fixed top-4 right-4 z-30 w-80">
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-cyber-500/40 shadow-2xl shadow-cyber-500/10 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyber-600/20 to-matrix-600/20 px-4 py-3 border-b border-cyber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-cyber-500/30 blur-md rounded-lg" />
              <div className="relative bg-gradient-to-br from-cyber-500 to-matrix-500 p-1.5 rounded-lg">
                <Wallet className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Hybrid Wallet Hub</h3>
              <p className="text-[9px] text-slate-400">Cerebro Network Wallet</p>
            </div>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {showBalance ? <Eye className="h-3.5 w-3.5 text-slate-400" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}
          </button>
        </div>

        {/* Total Balance */}
        <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-700/50">
          <p className="text-[10px] text-slate-500 mb-0.5">Toplam Bakiye (USD)</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent">
              {showBalance ? `$${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
            </p>
            <span className="flex items-center gap-0.5 text-[10px] text-matrix-400 font-semibold">
              <TrendingUp className="h-2.5 w-2.5" /> +12.4%
            </span>
          </div>
        </div>

        {/* Assets */}
        <div className="p-3 space-y-2">
          {assets.map((asset, i) => (
            <div
              key={i}
              onClick={() => setActiveAsset(i)}
              className={`bg-gradient-to-r ${asset.bgColor} rounded-xl p-3 border border-slate-700/50 cursor-pointer transition-all hover:scale-[1.02] hover:border-slate-600 ${
                activeAsset === i ? 'ring-1 ring-cyber-500/40' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-900/60">
                    <asset.icon className={`h-4 w-4 ${asset.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{asset.symbol}</p>
                    <p className="text-[9px] text-slate-400">{asset.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white">
                    {showBalance ? asset.balance : '••••'}
                  </p>
                  <p className="text-[9px] text-slate-400">
                    {showBalance ? asset.usdValue : '••••'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-3 pb-3 grid grid-cols-3 gap-2">
          <button className="flex flex-col items-center gap-1 py-2 bg-cyber-600/20 hover:bg-cyber-600/30 rounded-lg border border-cyber-500/30 transition-all group">
            <ArrowRightLeft className="h-4 w-4 text-cyber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-slate-300">Transfer</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 bg-matrix-600/20 hover:bg-matrix-600/30 rounded-lg border border-matrix-500/30 transition-all group">
            <Download className="h-4 w-4 text-matrix-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-slate-300">Al</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-2 bg-amber-600/20 hover:bg-amber-600/30 rounded-lg border border-amber-500/30 transition-all group">
            <ExternalLink className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-slate-300">Gönder</span>
          </button>
        </div>

        {/* Wallet Address */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 bg-slate-900/60 rounded-lg p-2 border border-slate-700/50">
            <p className="text-[9px] font-mono text-slate-500 truncate flex-1">
              0x{Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...{Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText('0xdgct_wallet_address');
              }}
              className="p-1 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
            >
              <Copy className="h-3 w-3 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
