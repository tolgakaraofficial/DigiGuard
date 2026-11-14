import React, { useState, useEffect } from 'react';
import {
  Shield, Ghost, Network, Cpu, Activity, Lock, KeyRound, Zap, CheckCircle,
  AlertTriangle, AlertCircle, FileText, Wallet, Layers, RefreshCw,
  TrendingUp, ArrowRight, LogOut, Eye, EyeOff, Copy, Award, Users,
  FileStack, BarChart3, Radar, Globe, Boxes, BookOpen, Bell, Brain,
  Fingerprint, Building2, User, XCircle, ArrowRightLeft,
  ShoppingBag, Bitcoin, Coins, Download, ExternalLink, ChevronDown, ChevronUp,
} from 'lucide-react';
import type { DashboardData } from '../lib/dashboardData';
import { shortHash } from '../lib/crypto';
import { DocumentLibrary } from './DocumentLibrary';
import { AgentDashboard } from './AgentDashboard';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { CerebroNetworkPanel } from './CerebroNetworkPanel';
import { GhostIDFlowPanel } from './GhostIDFlowPanel';

import { MonitoringPanel } from './MonitoringPanel';
import { SecurityDashboard } from './SecurityDashboard';
import { SoponDeAIPanel } from './SoponDeAIPanel';
import { SovereignBridgePanel } from './SovereignBridgePanel';


import { Web4BridgePanel } from './Web4BridgePanel';
import { CerebroCertificatePanel } from './CerebroCertificatePanel';
import { MarketplacePanel } from './MarketplacePanel';
import { EntityRegistryPanel } from './EntityRegistryPanel';
import { NotificationCenter } from './NotificationCenter';
import { AlbisChatBot } from './AlbisChatBot';
import { UserScenariosModal } from './UserScenariosModal';
import { GlobalReachModal } from './GlobalReachModal';
import { IntegrationsModal } from './IntegrationsModal';
import { PublicBenefitModal } from './PublicBenefitModal';
import { TurkeyCertificateModal } from './TurkeyCertificateModal';
import { PricingModal } from './PricingModal';
import { SecurityMetricsModal } from './SecurityMetricsModal';
import { AboutModal } from './AboutModal';
import { TeamModal } from './TeamModal';
import { FounderProfileBar, FounderCVModal } from './FounderProfileBar';
import { playTransitionSound } from '../lib/transitionSound';

interface DashboardProps {
  data: DashboardData;
  onLogout: () => void;
}

type Tab =
  | 'overview' | 'dag' | 'sentinel' | 'documents'
  | 'ghostflow' | 'cerebro' | 'sovereign' | 'web4' | 'monitoring' | 'security'
  | 'analytics' | 'agents' | 'sopon' | 'wallet' | 'certificates' | 'entities' | 'marketplace' | 'notifications';

export const Dashboard: React.FC<DashboardProps> = ({ data, onLogout }) => {
  const [tab, setTab] = useState<Tab>('overview');
  const [pukoPhase, setPukoPhase] = useState(0);
  const [copied, setCopied] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [modal, setModal] = useState<string | null>(null);

  const pukoPhases = [
    { label: 'Proaktif', color: '#39ff14', icon: Shield },
    { label: 'Uyari', color: '#f59e0b', icon: AlertTriangle },
    { label: 'Koruma', color: '#00e5ff', icon: Lock },
    { label: 'Onarim', color: '#a855f7', icon: RefreshCw },
  ];

  useEffect(() => {
    const interval = setInterval(() => setPukoPhase((p) => (p + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1500);
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'overview', label: 'Genel', icon: Activity, color: '#00e5ff' },
    { id: 'ghostflow', label: 'Ghost ID', icon: Ghost, color: '#a855f7' },
    { id: 'dag', label: 'DAG', icon: Network, color: '#f97316' },
    { id: 'sentinel', label: 'Sentinel', icon: Cpu, color: '#39ff14' },
    { id: 'sopon', label: 'SoponDe AI', icon: Brain, color: '#39ff14' },
    { id: 'cerebro', label: 'Cerebro Net', icon: Network, color: '#00e5ff' },
    { id: 'sovereign', label: 'Sovereign', icon: Boxes, color: '#f97316' },
    { id: 'web4', label: 'Web4', icon: Globe, color: '#00e5ff' },
    { id: 'entities', label: 'Varlik Kayit', icon: Building2, color: '#00e5ff' },
    { id: 'certificates', label: 'Sertifikalar', icon: Award, color: '#39ff14' },
    { id: 'wallet', label: 'Cuzdan', icon: Wallet, color: '#00e5ff' },
    { id: 'monitoring', label: 'Izleme', icon: Radar, color: '#ef4444' },
    { id: 'security', label: 'Guvenlik', icon: Shield, color: '#39ff14' },
    { id: 'marketplace', label: 'Pazar', icon: ShoppingBag, color: '#f59e0b' },
    { id: 'analytics', label: 'Analitik', icon: BarChart3, color: '#00e5ff' },
    { id: 'agents', label: 'Ajanlar', icon: Zap, color: '#a855f7' },
    { id: 'documents', label: 'Belgeler', icon: FileStack, color: '#06b6d4' },
  ];

  const completedSteps = data.protocolSteps.filter((s) => s.status === 'complete').length;
  const activeSteps = data.protocolSteps.filter((s) => s.status === 'active').length;
  const progress = (completedSteps / data.protocolSteps.length) * 100;

  return (
    <div className="min-h-screen w-full hex-grid">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg cyber-border cyber-glow">
              <Shield className="h-5 w-5 text-cyber-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">DigiGuard & Cerebro</h1>
              <p className="text-[10px] font-mono text-slate-500">Kuantum Sonrasi Siber Egemenlik</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400">Cerebro Online</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => setModal('scenarios')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs">
                <Users className="h-3.5 w-3.5" /> Senaryolar
              </button>
              <button onClick={() => setModal('global')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs">
                <Globe className="h-3.5 w-3.5" /> Erisim
              </button>
              <button onClick={() => setModal('pricing')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs">
                <Wallet className="h-3.5 w-3.5" /> Fiyat
              </button>
              <button onClick={() => setModal('about')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs">
                <Shield className="h-3.5 w-3.5" /> Hakkinda
              </button>
            </div>
            <div className="hidden lg:block">
              <FounderProfileBar variant="compact" onOpenCV={() => setShowCV(true)} />
            </div>
            <button onClick={() => setShowNotifications(true)} className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs">
              <Bell className="h-3.5 w-3.5" /> Bildirimler
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs">
              <LogOut className="h-3.5 w-3.5" /> Cikis
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-2 flex items-center gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { if (tab !== t.id) { playTransitionSound(); setTab(t.id); } }}
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

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div key={tab} className="panel-swap">
        {tab === 'overview' && <OverviewTab data={data} pukoPhase={pukoPhase} pukoPhases={pukoPhases} progress={progress} completedSteps={completedSteps} activeSteps={activeSteps} copy={copy} copied={copied} />}
        {tab === 'ghostflow' && <GhostIDFlowPanel />}
        {tab === 'dag' && <DAGTab data={data} />}
        {tab === 'sentinel' && <SentinelTab data={data} pukoPhase={pukoPhase} pukoPhases={pukoPhases} />}
        {tab === 'sopon' && <SoponDeAIPanel />}
        {tab === 'cerebro' && <CerebroNetworkPanel />}
        {tab === 'sovereign' && <SovereignBridgePanel />}
        {tab === 'web4' && <Web4BridgePanel />}
        {tab === 'entities' && <EntityRegistryPanel />}
        {tab === 'certificates' && <CerebroCertificatePanel />}
        {tab === 'wallet' && <WalletTab data={data} />}
        {tab === 'monitoring' && <MonitoringPanel />}
        {tab === 'security' && <SecurityDashboard userId={data.user.ghostId} />}
        {tab === 'marketplace' && <MarketplacePanel />}
        {tab === 'analytics' && <AnalyticsDashboard />}
        {tab === 'agents' && <AgentDashboard />}
        {tab === 'documents' && <DocumentLibrary />}
        </div>
      </main>

      {/* Floating notification center */}
      {showNotifications && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setShowNotifications(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-sm h-full bg-slate-900/95 border-l border-cyan-500/30 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <NotificationCenter userId={data.user.ghostId} />
            <button onClick={() => setShowNotifications(false)} className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
              <AlertCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating chat bot */}
      <AlbisChatBot language="tr" />

      {/* Modals */}
      <UserScenariosModal isOpen={modal === 'scenarios'} onClose={() => setModal(null)} />
      <GlobalReachModal isOpen={modal === 'global'} onClose={() => setModal(null)} />
      <IntegrationsModal isOpen={modal === 'integrations'} onClose={() => setModal(null)} />
      <PublicBenefitModal isOpen={modal === 'public'} onClose={() => setModal(null)} />
      <TurkeyCertificateModal isOpen={modal === 'turkey'} onClose={() => setModal(null)} />
      <PricingModal isOpen={modal === 'pricing'} onClose={() => setModal(null)} />
      <SecurityMetricsModal isOpen={modal === 'metrics'} onClose={() => setModal(null)} />
      <AboutModal isOpen={modal === 'about'} onClose={() => setModal(null)} />
      <TeamModal isOpen={modal === 'team'} onClose={() => setModal(null)} />
      <FounderCVModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </div>
  );
};

/* ---------- Overview ---------- */
const OverviewTab: React.FC<any> = ({ data, pukoPhase, pukoPhases, progress, completedSteps, activeSteps, copy, copied }) => (
  <div className="space-y-4 animate-fade-in">
    {/* Hero stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Protokol Adimi" value={`${completedSteps}/${data.protocolSteps.length}`} icon={Layers} color="#a855f7" />
      <StatCard label="Aktif Adim" value={activeSteps} icon={Activity} color="#00e5ff" />
      <StatCard label="Tehdit Engelli" value={data.threats.length} icon={Shield} color="#39ff14" />
      <StatCard label="DGU Bakiye" value={data.tokenomics.balance.toLocaleString('tr')} icon={Wallet} color="#f59e0b" />
    </div>

    {/* Progress */}
    <div className="card p-4 cyber-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white">Tam Tesekküllü Dönüşüm Protokolü</span>
        <span className="text-xs font-mono text-cyber-400">%{Math.round(progress)}</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #a855f7, #00e5ff, #39ff14)' }} />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-[10px] text-slate-500">11 adimlik protokolun {completedSteps} adimi tamamlandi, {activeSteps} adim aktif calisiyor.</p>
        <div className="flex items-center gap-1 text-[10px] text-cyber-400">
          <RefreshCw className="h-3 w-3" /> Cerebro Sentinel Aktif
        </div>
      </div>
    </div>

    {/* PUKO + Ghost ID */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* PUKO */}
      <div className="card p-4 border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-cyber-400" />
          <span className="text-sm font-bold text-white">PUKO Dongusu</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          {pukoPhases.map((p: any, i: number) => {
            const active = pukoPhase === i;
            const PIcon = p.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div className="p-2.5 rounded-lg transition-all" style={{ background: active ? `${p.color}20` : 'rgba(2,6,23,0.8)', border: `1px solid ${active ? `${p.color}60` : 'rgba(255,255,255,0.05)'}` }}>
                  <PIcon className={`h-5 w-5 ${active ? 'animate-pulse' : ''}`} style={{ color: active ? p.color : '#475569' }} />
                </div>
                <span className="text-[10px] font-mono" style={{ color: active ? p.color : '#475569' }}>{p.label}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-500 mt-3">Proaktif → Uyari → Koruma → Onarim. Cerebro Sentinel 2.5 sn'de bir faz degistirir.</p>
      </div>

      {/* Ghost ID */}
      <div className="card p-4 ghost-border">
        <div className="flex items-center gap-2 mb-3">
          <Ghost className="h-4 w-4 text-ghost-400" />
          <span className="text-sm font-bold text-white">Ghost ID / SPON / SOFTON</span>
        </div>
        <div className="space-y-2">
          <HashRow label="Ghost ID" value={data.user.ghostId} color="#a855f7" icon={Ghost} copy={copy} copied={copied} id="ghost" />
          <HashRow label="SPON Hash" value={data.user.sponHash} color="#00e5ff" icon={KeyRound} copy={copy} copied={copied} id="spon" />
          <HashRow label="SOFTON Token" value={data.user.softonToken} color="#f59e0b" icon={Lock} copy={copy} copied={copied} id="softon" />
        </div>
      </div>
    </div>

    {/* Recent threats */}
    <div className="card p-4 border border-orange-500/20">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <span className="text-sm font-bold text-white">Son Tehditler</span>
      </div>
      <div className="space-y-2">
        {data.threats.slice(0, 4).map((t: any) => (
          <div key={t.id} className="flex items-center gap-3 p-2 rounded bg-slate-900/60">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.severity === 'critical' ? '#ef4444' : t.severity === 'high' ? '#f59e0b' : '#39ff14' }} />
            <span className="text-xs text-white flex-1">{t.type}</span>
            <span className="text-[10px] text-slate-500 font-mono">{t.vector}</span>
            <CheckCircle className="h-3.5 w-3.5 text-matrix-400" />
            <span className="text-[10px] text-slate-500">{t.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- DAG ---------- */
const DAGTab: React.FC<any> = ({ data }) => (
  <div className="space-y-4 animate-fade-in">
    <h2 className="text-lg font-bold text-white">Sovereign Bridge DAG Topolojisi</h2>
    <div className="card p-4 dag-border">
      <div className="relative w-full aspect-square max-w-md mx-auto">
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-dag-900/40 border-2 border-dag-500/40 dag-pulse">
          <Network className="h-8 w-8 text-dag-400" />
        </div>
        {/* Nodes */}
        {data.dagNodes.map((n: any) => {
          const color = n.type === 'sentinel' ? '#39ff14' : n.type === 'validator' ? '#00e5ff' : '#f97316';
          return (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 dag-pulse"
              style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${Math.random() * 2}s` }}
            >
              <div className="p-2 rounded-full border-2" style={{ borderColor: `${color}60`, background: `${color}20` }}>
                {n.type === 'sentinel' ? <Cpu className="h-4 w-4" style={{ color }} /> : n.type === 'validator' ? <CheckCircle className="h-4 w-4" style={{ color }} /> : <Network className="h-4 w-4" style={{ color }} />}
              </div>
            </div>
          );
        })}
        {/* Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {data.dagNodes.map((n: any, i: number) => (
            <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke={n.active ? '#f9731640' : '#ffffff10'} strokeWidth="0.3" strokeDasharray="1,1" />
          ))}
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: 'Sentinel', color: '#39ff14', icon: Cpu, count: data.dagNodes.filter((n: any) => n.type === 'sentinel').length },
          { label: 'Validator', color: '#00e5ff', icon: CheckCircle, count: data.dagNodes.filter((n: any) => n.type === 'validator').length },
          { label: 'Relay', color: '#f97316', icon: Network, count: data.dagNodes.filter((n: any) => n.type === 'relay').length },
        ].map((n) => (
          <div key={n.label} className="flex flex-col items-center p-2 rounded bg-slate-900/60 border border-slate-800">
            <n.icon className="h-4 w-4 mb-1" style={{ color: n.color }} />
            <span className="text-xs text-white">{n.count}</span>
            <span className="text-[10px] text-slate-500">{n.label}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 mt-3 text-center">Yönlü döngüsüz graf (DAG) — madenci yok, blok yok, paralel doğrulama.</p>
    </div>
  </div>
);

/* ---------- Sentinel ---------- */
const SentinelTab: React.FC<any> = ({ data, pukoPhase, pukoPhases }) => (
  <div className="space-y-4 animate-fade-in">
    <h2 className="text-lg font-bold text-white">Cerebro Sentinel — AI Savunma</h2>

    <div className="card p-4 border border-matrix-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-matrix-900/30 border-2 border-matrix-500/40 dag-pulse">
          <Cpu className="h-6 w-6 text-matrix-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Cerebro AI</p>
          <p className="text-[10px] text-slate-500 font-mono">PUKO Dongusu Aktif</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-4">
        {pukoPhases.map((p: any, i: number) => {
          const active = pukoPhase === i;
          const PIcon = p.icon;
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <div className="p-3 rounded-lg transition-all" style={{ background: active ? `${p.color}20` : 'rgba(2,6,23,0.8)', border: `1px solid ${active ? `${p.color}60` : 'rgba(255,255,255,0.05)'}` }}>
                <PIcon className={`h-5 w-5 ${active ? 'animate-pulse' : ''}`} style={{ color: active ? p.color : '#475569' }} />
              </div>
              <span className="text-[10px] font-mono" style={{ color: active ? p.color : '#475569' }}>{p.label}</span>
            </div>
          );
        })}
      </div>
    </div>

    <div className="card p-4 border border-orange-500/20">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <span className="text-sm font-bold text-white">Tehdit Kayitlari</span>
      </div>
      <div className="space-y-2">
        {data.threats.map((t: any) => (
          <div key={t.id} className="flex items-center gap-3 p-3 rounded bg-slate-900/60 border border-slate-800">
            <div className="w-2 h-2 rounded-full" style={{ background: t.severity === 'critical' ? '#ef4444' : t.severity === 'high' ? '#f59e0b' : t.severity === 'medium' ? '#fbbf24' : '#39ff14' }} />
            <div className="flex-1">
              <p className="text-sm text-white">{t.type}</p>
              <p className="text-[10px] text-slate-500 font-mono">Vektor: {t.vector}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-matrix-400" />
              <span className="text-[10px] text-matrix-400 font-mono">ENGELLENDI</span>
            </div>
            <span className="text-[10px] text-slate-500">{t.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Wallet (merged with Hybrid Wallet) ---------- */
const WalletTab: React.FC<any> = ({ data }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [expanded, setShowExpanded] = useState(false);
  const [quantumSigning, setQuantumSigning] = useState(false);

  const hybridAssets = [
    { symbol: 'CLB', name: 'Celebron Token', balance: '2,818,422.90', usdValue: '$8,455,268.70', color: '#00e5ff', icon: Globe },
    { symbol: 'DGCT', name: 'DigiGuard Token', balance: '12,450.75', usdValue: '$24,901.50', color: '#39ff14', icon: Shield },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.0428', usdValue: '$2,847.20', color: '#f59e0b', icon: Bitcoin },
    { symbol: 'ETH', name: 'Ethereum', balance: '1.8472', usdValue: '$6,292.80', color: '#60a5fa', icon: Coins },
  ];

  const totalUsd = hybridAssets.reduce((sum, a) => {
    const val = parseFloat(a.usdValue.replace(/[$,]/g, ''));
    return sum + val;
  }, 0);

  const handleQuantumTransfer = () => {
    setQuantumSigning(true);
    setTimeout(() => setQuantumSigning(false), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Hibrit Cuzdan</h2>
        <button onClick={() => setShowBalance(!showBalance)} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
          {showBalance ? <Eye className="h-4 w-4 text-slate-400" /> : <EyeOff className="h-4 w-4 text-slate-400" />}
        </button>
      </div>

      {/* DGU Balance Card */}
      <div className="card p-6 cyber-border cyber-glow text-center">
        <p className="text-xs text-slate-400 mb-1">{data.tokenomics.token}</p>
        <p className="text-4xl font-bold text-white font-mono">{showBalance ? data.tokenomics.balance.toLocaleString('tr') : '••••••'}</p>
        <p className="text-[10px] text-slate-500 mt-2">DGU Bakiye</p>
      </div>

      {/* DGU Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Staked" value={showBalance ? data.tokenomics.staked.toLocaleString('tr') : '••••'} icon={Lock} color="#a855f7" />
        <StatCard label="Odul" value={`+${data.tokenomics.rewards}`} icon={TrendingUp} color="#39ff14" />
        <StatCard label="APY" value={`%${data.tokenomics.apy}`} icon={Zap} color="#f59e0b" />
      </div>

      {/* Hybrid Portfolio Total */}
      <div className="card p-4 border border-cyber-500/20">
        <p className="text-[10px] text-slate-500 mb-1">Toplam Hibrit Portfoy (USD)</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold" style={{ background: 'linear-gradient(90deg, #00e5ff, #39ff14)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {showBalance ? `${totalUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••••'}
          </p>
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-matrix-400">
            <TrendingUp className="h-2.5 w-2.5" /> +18.7%
          </span>
        </div>
      </div>

      {/* Hybrid Assets List */}
      <div className="card p-4 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="h-4 w-4 text-cyber-400" />
          <span className="text-sm font-bold text-white">Kripto Varliklar</span>
        </div>
        <div className="space-y-2">
          {(expanded ? hybridAssets : hybridAssets.slice(0, 2)).map((asset, i) => {
            const AIcon = asset.icon;
            return (
              <div key={i} className="rounded-xl p-2.5 transition-all" style={{ background: `${asset.color}10`, border: `1px solid ${asset.color}25` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-900/60">
                      <AIcon className="h-4 w-4" style={{ color: asset.color }} />
                    </div>
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
            );
          })}
        </div>
        {hybridAssets.length > 2 && (
          <button onClick={() => setShowExpanded(!expanded)} className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] text-slate-400 hover:text-slate-200 transition-colors">
            {expanded ? <><ChevronUp className="h-3 w-3" /> Daha az</> : <><ChevronDown className="h-3 w-3" /> +{hybridAssets.length - 2} varlik daha</>}
          </button>
        )}
      </div>

      {/* Quantum Transfer */}
      <div className="card p-4 border border-slate-800">
        <button
          onClick={handleQuantumTransfer}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs transition-all"
          style={{
            background: quantumSigning ? 'linear-gradient(135deg, #39ff1440, #00e5ff40)' : 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(57,255,20,0.15))',
            border: `1px solid ${quantumSigning ? '#39ff14' : 'rgba(0,229,255,0.3)'}`,
            color: quantumSigning ? '#39ff14' : '#00e5ff',
          }}
        >
          {quantumSigning ? (
            <><Lock className="h-3.5 w-3.5 animate-pulse" /> Kuantum Imza Uygulaniyor...</>
          ) : (
            <><Zap className="h-3.5 w-3.5" /> Kuantum Guvenli Transfer Imzala</>
          )}
        </button>
        <div className="grid grid-cols-3 gap-1.5 mt-2">
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-[9px]" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00e5ff' }}>
            <ArrowRightLeft className="h-3.5 w-3.5" /> Transfer
          </button>
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-[9px]" style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid rgba(57,255,20,0.2)', color: '#39ff14' }}>
            <Download className="h-3.5 w-3.5" /> Al
          </button>
          <button className="flex flex-col items-center gap-1 py-2 rounded-lg transition-all text-[9px]" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
            <ExternalLink className="h-3.5 w-3.5" /> Gonder
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div className="card p-4 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-cyber-400" />
          <span className="text-sm font-bold text-white">Faturalar</span>
        </div>
        <div className="space-y-2">
          {data.invoices.map((inv: any) => (
            <div key={inv.id} className="flex items-center gap-3 p-2 rounded bg-slate-900/60">
              <span className="text-[10px] font-mono text-slate-500 flex-1">{inv.id}</span>
              <span className="text-sm text-white font-mono">{inv.amount.toLocaleString('tr')} {inv.currency}</span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                inv.status === 'paid' ? 'bg-matrix-900/30 text-matrix-400' :
                inv.status === 'pending' ? 'bg-cyber-900/30 text-cyber-400' :
                'bg-red-900/30 text-red-400'
              }`}>
                {inv.status === 'paid' ? 'Odendi' : inv.status === 'pending' ? 'Bekliyor' : 'Gecikmis'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Helpers ---------- */
const StatCard: React.FC<any> = ({ label, value, icon: Icon, color }) => (
  <div className="card p-3 border border-slate-800">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-lg font-bold text-white font-mono">{value}</p>
  </div>
);

const HashRow: React.FC<any> = ({ label, value, color, icon: Icon, copy, copied, id }) => (
  <div className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
    <Icon className="h-3.5 w-3.5" style={{ color }} />
    <span className="text-[10px] text-slate-400 w-20">{label}</span>
    <span className="text-[10px] font-mono break-all flex-1" style={{ color }}>{shortHash(value, 14)}</span>
    <button onClick={() => copy(value, id)} className="text-slate-500 hover:text-white">
      {copied === id ? <CheckCircle className="h-3.5 w-3.5 text-matrix-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  </div>
);
