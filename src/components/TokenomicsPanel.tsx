import React, { useState, useEffect } from 'react';
import {
  Wallet, Lock, Zap, TrendingUp, ArrowRightLeft, Download,
  ExternalLink, Eye, EyeOff, Copy, CheckCircle, Bitcoin, Coins,
  Shield, Activity, Fuel, Award,
} from 'lucide-react';
import { generateHex, generateInvoiceId } from '../lib/crypto';

interface TxRecord {
  id: string;
  type: 'SENT' | 'RECEIVED' | 'STAKED' | 'REWARD';
  amount: number;
  token: string;
  status: 'CONFIRMED' | 'PENDING';
  timestamp: string;
  quantumSigned: boolean;
}

const GAS_ESTIMATES = [
  { operation: 'ZK-Proof Verification', dgd: 0.0021, fiat: '$0.04', crypto: '0.00000012 BTC', color: '#a855f7' },
  { operation: 'DAG Vertex Submission', dgd: 0.0085, fiat: '$0.16', crypto: '0.00000048 BTC', color: '#f97316' },
  { operation: 'Post-Quantum Transfer', dgd: 0.0150, fiat: '$0.28', crypto: '0.00000084 BTC', color: '#00e5ff' },
  { operation: 'Smart Contract Execution', dgd: 0.0320, fiat: '$0.60', crypto: '0.00000180 BTC', color: '#39ff14' },
];

const STAKING_POOLS = [
  { name: 'Genesis Validator', apy: 12.4, totalStaked: '2.4M DGD', participants: 847, color: '#00e5ff' },
  { name: 'Sentinel Node Pool', apy: 8.7, totalStaked: '1.8M DGD', participants: 612, color: '#39ff14' },
  { name: 'Quantum Relay Pool', apy: 6.2, totalStaked: '950K DGD', participants: 334, color: '#a855f7' },
];

const CRYPTO_ASSETS = [
  { symbol: 'DGD', name: 'Digiguard Native', balance: '12,500.00', usdValue: '$23,750', color: '#00e5ff', icon: Shield },
  { symbol: 'CLB', name: 'Celebron Token', balance: '2,818,422', usdValue: '$8,455,268', color: '#39ff14', icon: Activity },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.0428', usdValue: '$2,847', color: '#f59e0b', icon: Bitcoin },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.8472', usdValue: '$6,293', color: '#60a5fa', icon: Coins },
];

export const TokenomicsPanel: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [quantumSigning, setQuantumSigning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dgdPrice, setDgdPrice] = useState(1.89);
  const [priceChange, setPriceChange] = useState(4.2);
  const [txHistory, setTxHistory] = useState<TxRecord[]>([
    { id: generateInvoiceId(), type: 'RECEIVED', amount: 500, token: 'DGD', status: 'CONFIRMED', timestamp: '2026-11-14 09:32', quantumSigned: true },
    { id: generateInvoiceId(), type: 'STAKED', amount: 3000, token: 'DGD', status: 'CONFIRMED', timestamp: '2026-11-13 18:04', quantumSigned: true },
    { id: generateInvoiceId(), type: 'REWARD', amount: 32.4, token: 'DGD', status: 'CONFIRMED', timestamp: '2026-11-13 00:00', quantumSigned: true },
    { id: generateInvoiceId(), type: 'SENT', amount: 150, token: 'DGD', status: 'PENDING', timestamp: '2026-11-14 10:15', quantumSigned: true },
  ]);

  const pqAddress = `0x${generateHex(40)}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setDgdPrice((p) => Math.max(1.5, Math.min(2.5, p + (Math.random() - 0.5) * 0.03)));
      setPriceChange((c) => Math.max(-8, Math.min(12, c + (Math.random() - 0.5) * 0.5)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalUsd = CRYPTO_ASSETS.reduce((sum, a) => {
    const val = parseFloat(a.usdValue.replace(/[$,]/g, ''));
    return sum + val;
  }, 0);

  const handleQuantumTransfer = () => {
    setQuantumSigning(true);
    setTimeout(() => {
      setQuantumSigning(false);
      const newTx: TxRecord = {
        id: generateInvoiceId(),
        type: 'SENT',
        amount: Math.floor(50 + Math.random() * 200),
        token: 'DGD',
        status: 'CONFIRMED',
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        quantumSigned: true,
      };
      setTxHistory((prev) => [newTx, ...prev].slice(0, 8));
    }, 2000);
  };

  const copyAddress = () => {
    navigator.clipboard?.writeText(pqAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-cyber-400" />
          <h2 className="text-lg font-bold text-white">Tokenomics & Post-Quantum Wallet</h2>
        </div>
        <button onClick={() => setShowBalance(!showBalance)} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
          {showBalance ? <Eye className="h-4 w-4 text-slate-400" /> : <EyeOff className="h-4 w-4 text-slate-400" />}
        </button>
      </div>

      {/* DGD Price ticker */}
      <div className="card p-4 cyber-border cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}>
              <Shield className="h-6 w-6 text-cyber-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">DGD — Digiguard Native Utility Token</p>
              <p className="text-[10px] text-slate-500 font-mono">Network Fuel · Quantum-Secured</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white font-mono">
              {showBalance ? `$${dgdPrice.toFixed(4)}` : '••••••'}
            </p>
            <p className={`text-xs font-mono flex items-center gap-1 justify-end ${priceChange >= 0 ? 'text-matrix-400' : 'text-red-400'}`}>
              <TrendingUp className="h-3 w-3" />
              {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="card p-5 border border-slate-800">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total Portfolio (USD)</p>
        <p className="text-3xl font-bold font-mono" style={{ background: 'linear-gradient(90deg, #00e5ff, #39ff14)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {showBalance ? `$${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••••'}
        </p>

        {/* Quantum-safe address */}
        <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <Lock className="h-3.5 w-3.5 text-matrix-400 flex-shrink-0" />
          <span className="text-[10px] font-mono text-slate-500 flex-1 break-all">
            {showBalance ? `PQC:${pqAddress.slice(0, 18)}...${pqAddress.slice(-10)}` : 'PQC:••••••••••••••••••••••••'}
          </span>
          <button onClick={copyAddress} className="text-slate-500 hover:text-white flex-shrink-0">
            {copied ? <CheckCircle className="h-3.5 w-3.5 text-matrix-400" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Asset list */}
      <div className="card p-4 border border-slate-800">
        <span className="text-sm font-bold text-white mb-3 block">Multi-Currency Holdings</span>
        <div className="space-y-2">
          {CRYPTO_ASSETS.map((asset) => {
            const AIcon = asset.icon;
            return (
              <div key={asset.symbol} className="rounded-xl p-2.5 transition-all" style={{ background: `${asset.color}08`, border: `1px solid ${asset.color}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-900/60">
                      <AIcon className="h-4 w-4" style={{ color: asset.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{asset.symbol}</p>
                      <p className="text-[9px] text-slate-500">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-white font-mono">{showBalance ? asset.balance : '••••'}</p>
                    <p className="text-[9px] text-slate-500">{showBalance ? asset.usdValue : '••••'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gas/Computation Estimator */}
      <div className="card p-4 border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Fuel className="h-4 w-4 text-cyber-400" />
          Network Fuel & Computation Cost Estimator
        </h3>
        <div className="space-y-2">
          {GAS_ESTIMATES.map((g) => (
            <div key={g.operation} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-white flex-1">{g.operation}</span>
              <div className="flex items-center gap-3 text-right">
                <span className="text-[10px] font-mono" style={{ color: g.color }}>{g.dgd} DGD</span>
                <span className="text-[10px] font-mono text-slate-500 w-16">{g.fiat}</span>
                <span className="text-[9px] font-mono text-slate-600 w-28 hidden sm:inline">{g.crypto}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staking Pools */}
      <div className="card p-4 border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Award className="h-4 w-4 text-matrix-400" />
          Validator & Staking Pools
        </h3>
        <div className="space-y-2">
          {STAKING_POOLS.map((pool) => (
            <div key={pool.name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: `${pool.color}08`, border: `1px solid ${pool.color}20` }}>
              <div>
                <p className="text-sm font-bold text-white">{pool.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">{pool.totalStaked} · {pool.participants} validators</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold font-mono" style={{ color: pool.color }}>{pool.apy}%</p>
                <p className="text-[9px] text-slate-500 uppercase">APY</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum Transfer */}
      <div className="card p-4 border border-slate-800">
        <button
          onClick={handleQuantumTransfer}
          disabled={quantumSigning}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: quantumSigning ? 'linear-gradient(135deg, #39ff1440, #00e5ff40)' : 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(57,255,20,0.1))',
            border: `1px solid ${quantumSigning ? '#39ff14' : 'rgba(0,229,255,0.3)'}`,
            color: quantumSigning ? '#39ff14' : '#00e5ff',
          }}
        >
          {quantumSigning ? (
            <><Lock className="h-4 w-4 animate-pulse" /> Applying Quantum Signature...</>
          ) : (
            <><Zap className="h-4 w-4" /> Sign Quantum-Safe Transfer</>
          )}
        </button>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition text-[9px]" style={{ background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)', color: '#00e5ff' }}>
            <ArrowRightLeft className="h-3.5 w-3.5" /> Transfer
          </button>
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition text-[9px]" style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.15)', color: '#39ff14' }}>
            <Download className="h-3.5 w-3.5" /> Receive
          </button>
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition text-[9px]" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', color: '#f59e0b' }}>
            <ExternalLink className="h-3.5 w-3.5" /> Send
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card p-4 border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyber-400" />
          Encrypted Transaction History
        </h3>
        <div className="space-y-2">
          {txHistory.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                background: tx.type === 'RECEIVED' ? 'rgba(57,255,20,0.1)' : tx.type === 'SENT' ? 'rgba(239,68,68,0.1)' : tx.type === 'STAKED' ? 'rgba(0,229,255,0.1)' : 'rgba(245,158,11,0.1)',
                border: `1px solid ${tx.type === 'RECEIVED' ? 'rgba(57,255,20,0.2)' : tx.type === 'SENT' ? 'rgba(239,68,68,0.2)' : tx.type === 'STAKED' ? 'rgba(0,229,255,0.2)' : 'rgba(245,158,11,0.2)'}`,
              }}>
                {tx.type === 'RECEIVED' ? <Download className="h-3.5 w-3.5 text-matrix-400" /> : tx.type === 'SENT' ? <ExternalLink className="h-3.5 w-3.5 text-red-400" /> : tx.type === 'STAKED' ? <Lock className="h-3.5 w-3.5 text-cyber-400" /> : <TrendingUp className="h-3.5 w-3.5 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white">{tx.type}</p>
                <p className="text-[9px] text-slate-500 font-mono truncate">{tx.timestamp}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-mono font-bold" style={{ color: tx.type === 'SENT' ? '#ef4444' : '#39ff14' }}>
                  {tx.type === 'SENT' ? '-' : '+'}{tx.amount} {tx.token}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  {tx.quantumSigned && <Lock className="h-2.5 w-2.5 text-matrix-400" />}
                  <span className="text-[9px] font-mono" style={{ color: tx.status === 'CONFIRMED' ? '#39ff14' : '#f59e0b' }}>{tx.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
