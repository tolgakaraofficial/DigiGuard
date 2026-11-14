import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Cpu, Lock, Network, Wallet, FileText,
  BookOpen, Bell, LogOut, Github, Activity, Globe,
  AlertTriangle, CheckCircle, Zap, Radar,
} from 'lucide-react';
import { AlbisTelemetryGrid } from './AlbisTelemetryGrid';
import { QuantumShieldPanel } from './QuantumShieldPanel';
import { DagTopologyVisualizer } from './DagTopologyVisualizer';
import { TokenomicsPanel } from './TokenomicsPanel';
import { WatermarkingPanel } from './WatermarkingPanel';
import { WhitepaperModal } from './WhitepaperModal';
import { FounderProfileBar, FounderCVModal } from './FounderProfileBar';
import { NotificationCenter } from './NotificationCenter';
import { AlbisChatBot } from './AlbisChatBot';
import { playTransitionSound } from '../lib/transitionSound';
import type { DashboardData } from '../lib/dashboardData';

interface DashboardProps {
  data: DashboardData;
  onLogout: () => void;
}

type Tab = 'albis' | 'quantum' | 'dag' | 'tokenomics' | 'watermarking';

const TABS: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'albis', label: 'ALBIS Engine', icon: Cpu, color: '#00e5ff' },
  { id: 'quantum', label: 'Quantum Shield', icon: Lock, color: '#39ff14' },
  { id: 'dag', label: 'DAG Topology', icon: Network, color: '#f97316' },
  { id: 'tokenomics', label: 'Tokenomics', icon: Wallet, color: '#a855f7' },
  { id: 'watermarking', label: 'Watermarking', icon: FileText, color: '#fbbf24' },
];

const DEFCON_LEVELS = ['DEFCON 5', 'DEFCON 4', 'DEFCON 3', 'DEFCON 2', 'DEFCON 1'];
const DEFCON_COLORS = ['#39ff14', '#fbbf24', '#f97316', '#ef4444', '#dc2626'];

export const Dashboard: React.FC<DashboardProps> = ({ data, onLogout }) => {
  const [tab, setTab] = useState<Tab>('albis');
  const [utcTime, setUtcTime] = useState('');
  const [defconIdx, setDefconIdx] = useState(0);
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'QUANTUM-SAFE' | 'DEGRADED' | 'CRITICAL'>('QUANTUM-SAFE');
  const [threatsBlocked, setThreatsBlocked] = useState(14387);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s} UTC`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatsBlocked((t) => t + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = useCallback((next: Tab) => {
    if (next === tab) return;
    playTransitionSound();
    setTab(next);
  }, [tab]);

  const currentTab = TABS.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen w-full hex-grid">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="p-2 rounded-lg cyber-border cyber-glow">
              <Shield className="h-5 w-5 text-cyber-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-white">DigiGuard & Cerebro</h1>
              <p className="text-[10px] font-mono text-slate-500">Post-Quantum Cyber Command Center</p>
            </div>
          </div>

          {/* Center: UTC Clock + Network Status */}
          <div className="flex items-center gap-3 flex-1 justify-center">
            {/* UTC Clock */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Globe className="h-3.5 w-3.5 text-cyber-400" />
              <span className="text-xs font-mono text-slate-300 tabular-nums">{utcTime}</span>
            </div>

            {/* Network status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{
              background: 'rgba(57,255,20,0.08)',
              border: '1px solid rgba(57,255,20,0.2)',
            }}>
              <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-matrix-400">{networkStatus}</span>
              <span className="text-[9px] font-mono text-slate-500 hidden lg:inline">// {DEFCON_LEVELS[defconIdx]}</span>
            </div>

            {/* Threats blocked counter */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <Radar className="h-3.5 w-3.5 text-red-400" />
              <span className="text-[10px] font-mono text-slate-400">THREATS BLOCKED</span>
              <span className="text-[10px] font-mono font-bold text-red-400 tabular-nums">{threatsBlocked.toLocaleString()}</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Contact links */}
            <div className="hidden xl:block">
              <FounderProfileBar variant="compact" onOpenCV={() => setShowCV(true)} />
            </div>

            {/* Whitepaper */}
            <button
              onClick={() => setShowWhitepaper(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Whitepaper</span>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/tolgakaraofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: 'rgba(226,232,240,0.06)',
                border: '1px solid rgba(226,232,240,0.15)',
                color: '#e2e8f0',
              }}
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View on GitHub</span>
            </a>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs"
            >
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">3</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-2 flex items-center gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                tab === t.id ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
              style={tab === t.id ? { borderBottom: `2px solid ${t.color}` } : undefined}
            >
              <t.icon className="h-3.5 w-3.5" style={{ color: tab === t.id ? t.color : undefined }} />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div key={tab} className="panel-swap">
          {tab === 'albis' && <AlbisTelemetryGrid />}
          {tab === 'quantum' && <QuantumShieldPanel />}
          {tab === 'dag' && <DagTopologyVisualizer />}
          {tab === 'tokenomics' && <TokenomicsPanel />}
          {tab === 'watermarking' && <WatermarkingPanel />}
        </div>
      </main>

      {/* System status footer bar */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="card p-3 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-matrix-400" />
              <span className="text-[10px] font-mono text-slate-500">SYSTEM</span>
              <span className="text-[10px] font-mono font-bold text-matrix-400">OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-cyber-400" />
              <span className="text-[10px] font-mono text-slate-500">ENCRYPTION</span>
              <span className="text-[10px] font-mono font-bold text-cyber-400">AES-256 + Kyber-1024</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-matrix-400" />
              <span className="text-[10px] font-mono text-slate-500">ALBIS</span>
              <span className="text-[10px] font-mono font-bold text-matrix-400">6/6 ONLINE</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[10px] font-mono text-slate-500">PUKO</span>
              <span className="text-[10px] font-mono font-bold text-amber-400">ACTIVE</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-600">
            v1.0.0 · Karprime Technology Inc.
          </div>
        </div>
      </div>

      {/* Notification drawer */}
      {showNotifications && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setShowNotifications(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-sm h-full bg-slate-900/95 border-l border-cyan-500/30 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <NotificationCenter userId={data.user.ghostId} />
            <button onClick={() => setShowNotifications(false)} className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
              <AlertTriangle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chat bot */}
      <AlbisChatBot language="en" />

      {/* Modals */}
      <WhitepaperModal isOpen={showWhitepaper} onClose={() => setShowWhitepaper(false)} />
      <FounderCVModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </div>
  );
};
