import React, { useState, useEffect, useRef } from 'react';
import {
  X, Brain, Shield, Users, Monitor, Cpu, Activity, AlertTriangle, CheckCircle,
  Zap, Lock, Database, RefreshCw, TrendingUp, Eye, GitBranch, Server,
  AlertCircle, Clock, ArrowRight, Wifi, HardDrive, BarChart2, Target,
  FileText, UserCheck, Building2, Network, ChevronRight
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface AIOrchestratorDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IncidentAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  source_ip?: string;
  auto_action_taken?: string;
  ai_confidence?: number;
  status: string;
  detected_at: string;
}

interface Department {
  id: string;
  name_tr: string;
  code: string;
  department_type: string;
  agent_name: string;
  agent_status: string;
  puko_cycle_stage: string;
  config: Record<string, unknown>;
}

const PUKO_STAGES = [
  {
    key: 'planla',
    label: 'PLANLA',
    sublabel: 'Dinamik Politika',
    color: 'cyan',
    icon: Brain,
    description: 'Geçmiş anomalilere ve tehdit istihbaratına göre yeni güvenlik politikaları üretilir',
    example: 'JSON Politika ve Kural Üretimi',
    details: ['Tehdit istihbaratı analizi', 'Risk değerlendirmesi', 'Politika taslağı oluşturma', 'Departman kuralları entegrasyonu'],
    bgFrom: 'from-cyan-900/40',
    border: 'border-cyan-500/40',
    textColor: 'text-cyan-400',
  },
  {
    key: 'uygula',
    label: 'UYGULA',
    sublabel: 'Otonom İşleyiş',
    color: 'blue',
    icon: Zap,
    description: 'Kurallar uygulanır, kimlik doğrulama ve sertifikasyon süreçleri tetiklenir',
    example: 'Otonom Kimlik Doğrulama',
    details: ['Dinamik UI oluşturma', 'Kimlik doğrulama tetikleme', 'Sertifika süreçleri', 'Kullanıcı profil üretimi'],
    bgFrom: 'from-blue-900/40',
    border: 'border-blue-500/40',
    textColor: 'text-blue-400',
  },
  {
    key: 'kontrol_et',
    label: 'KONTROL ET',
    sublabel: 'Akıllı Anomali',
    color: 'amber',
    icon: Eye,
    description: 'SIEM mantığıyla loglar ve kullanıcı hareketleri anlık taranarak tehditler tespit edilir',
    example: 'Anlık Log ve Tehdit Tarama',
    details: ['Brute-force tespiti', 'Anomali skorlaması', 'SIEM log analizi', 'Davranışsal örüntü analizi'],
    bgFrom: 'from-amber-900/40',
    border: 'border-amber-500/40',
    textColor: 'text-amber-400',
  },
  {
    key: 'onlem_al',
    label: 'ÖNLEM AL',
    sublabel: 'Kendi Kendine İyileşme',
    color: 'red',
    icon: Shield,
    description: 'Otomatik defansif aksiyon alınır: IP engelleme, oturum kapatma, sertifika askıya alma',
    example: 'Otomatik Savunma Aksiyonları',
    details: ['IP engelleme', 'Kullanıcı askıya alma', 'Oturum sonlandırma', 'Politika otomatik güncelleme'],
    bgFrom: 'from-red-900/40',
    border: 'border-red-500/40',
    textColor: 'text-red-400',
  },
];

const LAYER_SYSTEMS = [
  {
    key: 'sopon',
    name: 'SOPON',
    full: 'Veri Toplama & Filtreleme',
    stage: 'Planla / Uygula',
    color: 'cyan',
    icon: Database,
    desc: 'Giriş verilerini anlık filtreler, regüle eder ve asenkron kuyruğa alır',
    metrics: { throughput: '12.4K req/s', filter_rate: '99.8%', latency: '2ms' },
    status: 'active',
  },
  {
    key: 'supon',
    name: 'SUPON',
    full: 'Davranışsal AI Karar Motoru',
    stage: 'Kontrol Et',
    color: 'purple',
    icon: Brain,
    desc: 'Logları ve hareketleri tarayarak anomalileri saptar ve kararlar alır',
    metrics: { accuracy: '98.7%', decisions_sec: '4.2K/s', model: 'v3.1' },
    status: 'active',
  },
  {
    key: 'soft10',
    name: 'SOFT 10',
    full: 'Dinamik Kriptografik Sertifikasyon',
    stage: 'Önlem Al',
    color: 'emerald',
    icon: Lock,
    desc: 'Güvenli kullanıcılara dinamik sertifikalar üretir, tehdit anında önlem alır',
    metrics: { certs_issued: '2,847', tokens: 'JWT/JWS', encryption: 'AES-256' },
    status: 'active',
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/40';
    case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/40';
    case 'medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
    case 'low': return 'text-green-400 bg-green-500/20 border-green-500/40';
    default: return 'text-slate-400 bg-slate-500/20 border-slate-500/40';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved': return 'text-green-400';
    case 'investigating': return 'text-amber-400';
    case 'open': return 'text-red-400 animate-pulse';
    default: return 'text-slate-400';
  }
};

const getDeptIcon = (type: string) => {
  switch (type) {
    case 'hr': return Users;
    case 'physical_security': return Shield;
    case 'it': return Monitor;
    default: return Building2;
  }
};

const getDeptColor = (type: string) => {
  switch (type) {
    case 'hr': return { from: 'from-blue-900/50', border: 'border-blue-500/40', text: 'text-blue-400', badge: 'bg-blue-500/20' };
    case 'physical_security': return { from: 'from-red-900/50', border: 'border-red-500/40', text: 'text-red-400', badge: 'bg-red-500/20' };
    case 'it': return { from: 'from-purple-900/50', border: 'border-purple-500/40', text: 'text-purple-400', badge: 'bg-purple-500/20' };
    default: return { from: 'from-slate-800', border: 'border-slate-600', text: 'text-slate-400', badge: 'bg-slate-500/20' };
  }
};

const getPukoLabel = (stage: string) => {
  switch (stage) {
    case 'planla': return { label: 'PLANLA', color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40' };
    case 'uygula': return { label: 'UYGULA', color: 'text-blue-400 bg-blue-500/20 border-blue-500/40' };
    case 'kontrol_et': return { label: 'KONTROL ET', color: 'text-amber-400 bg-amber-500/20 border-amber-500/40' };
    case 'onlem_al': return { label: 'ÖNLEM AL', color: 'text-red-400 bg-red-500/20 border-red-500/40' };
    default: return { label: stage, color: 'text-slate-400 bg-slate-500/20 border-slate-500/40' };
  }
};

export const AIOrchestratorDashboard: React.FC<AIOrchestratorDashboardProps> = ({ isOpen, onClose }) => {
  const [activePukoStage, setActivePukoStage] = useState(0);
  const [alerts, setAlerts] = useState<IncidentAlert[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiPulse, setAiPulse] = useState(0);
  const [liveLog, setLiveLog] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const LIVE_LOG_MESSAGES = [
    '[SOPON] Veri akışı filtresi aktif → 12.4K istek/sn işleniyor',
    '[SUPON] Davranışsal analiz: Kullanıcı 0x7F2A → risk skoru: 0.12',
    '[SOFT-10] Sertifika üretildi → TOKEN: DG-CERT-2026-7891',
    '[SOPON] Anomali öncesi veri temizlendi → kayıt: LOG-4421',
    '[AI-ORCH] HR-Agent → Yeni politika uygulandı: POL-HR-2026-09',
    '[SUPON] Brute-force tarama → 185.220.101.45 → IP engellendi',
    '[SOFT-10] JWT imzalandı → SHA3-256 doğrulaması tamamlandı',
    '[AI-ORCH] IT-Agent → Güvenlik açığı CVE-2026-4312 yamalandı',
    '[SOPON] Giriş verisi regüle edildi → Kullanıcı: USR-88821',
    '[SUPON] Anormal sertifika talebi tespit edildi → oturum sonlandırıldı',
    '[AI-ORCH] PhySec-Agent → Bölge B-4 erişim protokolü güncellendi',
    '[SOFT-10] Dinamik sertifika üretildi → AES-256-GCM şifreli',
  ];

  useEffect(() => {
    if (!isOpen) return;
    fetchData();
    intervalRef.current = setInterval(() => {
      setActivePukoStage((s) => (s + 1) % 4);
      setAiPulse((p) => p + 1);
      const msg = LIVE_LOG_MESSAGES[Math.floor(Math.random() * LIVE_LOG_MESSAGES.length)];
      const ts = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLiveLog((prev) => [`[${ts}] ${msg}`, ...prev.slice(0, 14)]);
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isOpen]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [liveLog]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [alertsRes, deptsRes] = await Promise.all([
        supabase.from('incident_alerts').select('*').order('detected_at', { ascending: false }).limit(8),
        supabase.from('departments').select('*').order('created_at', { ascending: true }),
      ]);
      if (alertsRes.data) setAlerts(alertsRes.data);
      if (deptsRes.data) setDepartments(deptsRes.data);
    } catch {
      // silently use seed data
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const activeStage = PUKO_STAGES[activePukoStage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 overflow-auto">
      <div className="w-full max-w-[1600px] bg-[#060b18] border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[97vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900 via-[#070e1f] to-slate-900 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/50 flex items-center justify-center">
                <Brain className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">DigiGuard AI Merkezi PUKO Mimarisi</h1>
              <p className="text-xs text-cyan-400/80">Merkezi AI Orchestrator &amp; LLM Agent — Otonom Departman Yönetim Sistemi</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">Tüm Sistemler Aktif</span>
            </div>
            <div className="text-xs text-slate-500 font-mono">{new Date().toLocaleString('tr-TR')}</div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Main 3-column layout */}
          <div className="grid grid-cols-[300px_1fr_300px] gap-0 min-h-[540px]">

            {/* LEFT: PUKO Steps */}
            <div className="border-r border-cyan-500/10 p-5 flex flex-col gap-3 bg-slate-900/30">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI-Destekli PUKO Döngüsü</div>
              {PUKO_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = idx === activePukoStage;
                return (
                  <button
                    key={stage.key}
                    onClick={() => setActivePukoStage(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? `bg-gradient-to-br ${stage.bgFrom} to-slate-900/60 ${stage.border} shadow-lg`
                        : 'bg-slate-800/20 border-slate-700/30 hover:border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${isActive ? `bg-${stage.color}-500/20` : 'bg-slate-700/40'}`}>
                        <Icon className={`h-4 w-4 ${isActive ? stage.textColor : 'text-slate-500'}`} />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isActive ? stage.textColor : 'text-slate-500'}`}>
                          {idx + 1}. {stage.label}
                        </div>
                        <div className="text-[10px] text-slate-500">{stage.sublabel}</div>
                      </div>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 bg-current rounded-full animate-pulse" style={{ color: `var(--color-${stage.color}-400)` }} />
                      )}
                    </div>
                    {isActive && (
                      <div className="mt-2">
                        <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">{stage.description}</p>
                        <div className={`px-2 py-1 rounded text-[10px] font-mono ${stage.textColor} bg-slate-900/60 border ${stage.border} mb-2`}>
                          {stage.example}
                        </div>
                        <div className="space-y-1">
                          {stage.details.map((d, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                              <ChevronRight className={`h-2.5 w-2.5 ${stage.textColor}`} />
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CENTER: AI Orchestrator Visualization */}
            <div className="flex flex-col items-center justify-start p-6 bg-gradient-to-b from-[#060b18] to-[#08101f] relative overflow-hidden">
              {/* Background grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }} />

              {/* Orbital rings */}
              <div className="relative flex items-center justify-center mb-6 mt-2">
                <div className="absolute w-64 h-64 border border-cyan-500/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute w-48 h-48 border border-blue-500/15 rounded-full animate-spin" style={{ animationDuration: '14s', animationDirection: 'reverse' }} />
                <div className="absolute w-36 h-36 border border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: '9s' }} />

                {/* Orbit nodes */}
                {['HR', 'IT', 'PS', 'OPS'].map((label, i) => {
                  const angle = (i / 4) * 2 * Math.PI - Math.PI / 2;
                  const r = 120;
                  const x = Math.cos(angle) * r;
                  const y = Math.sin(angle) * r;
                  const colors = ['text-blue-400', 'text-purple-400', 'text-red-400', 'text-green-400'];
                  return (
                    <div
                      key={label}
                      className="absolute flex flex-col items-center"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <div className={`w-9 h-9 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] font-bold ${colors[i]}`}>
                        {label}
                      </div>
                    </div>
                  );
                })}

                {/* Central core */}
                <div className="relative w-28 h-28 z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/30 animate-pulse" style={{ animationDuration: '2s' }} />
                  <div className="absolute inset-2 rounded-full bg-slate-900/90 border border-cyan-500/30 flex flex-col items-center justify-center">
                    <Brain className="h-8 w-8 text-cyan-400 mb-1" />
                    <span className="text-[9px] font-bold text-cyan-300">AI ORCH</span>
                    <span className="text-[8px] text-slate-500">LLM AGENT</span>
                  </div>
                  <div className="absolute -inset-3 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              {/* Active Stage Banner */}
              <div className={`w-full max-w-sm px-5 py-3 rounded-xl border bg-gradient-to-r ${activeStage.bgFrom} to-slate-900/60 ${activeStage.border} mb-5 text-center`}>
                <div className={`text-sm font-bold ${activeStage.textColor} mb-0.5`}>
                  Aktif PUKO Aşaması: {activeStage.label}
                </div>
                <div className="text-[11px] text-slate-400">{activeStage.example}</div>
              </div>

              {/* PUKO Stage flow arrows */}
              <div className="flex items-center gap-1 mb-5">
                {PUKO_STAGES.map((s, i) => (
                  <React.Fragment key={s.key}>
                    <div className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all duration-500 ${
                      i === activePukoStage
                        ? `${s.textColor} ${s.border} bg-slate-800/60`
                        : 'text-slate-600 border-slate-700/40'
                    }`}>
                      {s.label}
                    </div>
                    {i < 3 && <ArrowRight className={`h-3 w-3 ${i < activePukoStage ? 'text-cyan-500' : 'text-slate-700'}`} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Live log terminal */}
              <div className="w-full max-w-lg bg-slate-950/80 border border-slate-700/50 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700/40 bg-slate-900/60">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-[10px] text-slate-500 font-mono">AI-ORCHESTRATOR / LIVE STREAM</span>
                  <span className="ml-auto text-[10px] text-green-400 font-mono animate-pulse">● LIVE</span>
                </div>
                <div ref={logRef} className="h-36 overflow-y-auto p-3 space-y-1 font-mono text-[10px]">
                  {liveLog.length === 0 && (
                    <div className="text-slate-600">Sistem başlatılıyor...</div>
                  )}
                  {liveLog.map((msg, i) => {
                    const color = msg.includes('[SOPON]') ? 'text-cyan-400' :
                      msg.includes('[SUPON]') ? 'text-purple-400' :
                      msg.includes('[SOFT-10]') ? 'text-emerald-400' : 'text-blue-400';
                    return (
                      <div key={i} className={`${i === 0 ? color : 'text-slate-600'} leading-relaxed`}>
                        {msg}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2 w-full mt-5">
                {[
                  { label: 'Aktif Ajan', value: '4', icon: Cpu, color: 'text-cyan-400' },
                  { label: 'Politika', value: '47', icon: FileText, color: 'text-blue-400' },
                  { label: 'Karar/Sn', value: '4.2K', icon: Activity, color: 'text-purple-400' },
                  { label: 'Tehdit Bloke', value: '1,284', icon: Shield, color: 'text-green-400' },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-3 text-center">
                    <m.icon className={`h-4 w-4 ${m.color} mx-auto mb-1`} />
                    <div className={`text-base font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-[9px] text-slate-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Department Panels */}
            <div className="border-l border-cyan-500/10 p-4 flex flex-col gap-3 bg-slate-900/30">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Departman Ajanları</div>
              {departments.length === 0 && !loading && (
                <div className="text-slate-500 text-xs text-center py-4">Departman verisi yükleniyor...</div>
              )}
              {departments.map((dept) => {
                const Icon = getDeptIcon(dept.department_type);
                const color = getDeptColor(dept.department_type);
                const { label, color: pukoColor } = getPukoLabel(dept.puko_cycle_stage);
                const cfgEntries = Object.entries(dept.config || {}).slice(0, 3);
                return (
                  <div key={dept.id} className={`p-4 rounded-xl border bg-gradient-to-br ${color.from} to-slate-900/40 ${color.border} transition-all hover:border-opacity-70`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-1.5 rounded-lg ${color.badge}`}>
                        <Icon className={`h-4 w-4 ${color.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold ${color.text} truncate`}>{dept.name_tr}</div>
                        <div className="text-[9px] text-slate-500 truncate">{dept.agent_name}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${pukoColor}`}>{label}</span>
                    </div>
                    <div className="space-y-1">
                      {cfgEntries.map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500 capitalize">{k.replace(/_/g, ' ')}</span>
                          <span className={`font-semibold ${color.text}`}>{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Incident Summary */}
              <div className="mt-1 p-3 rounded-xl border border-red-500/20 bg-red-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs font-bold text-red-400">Son Olaylar</span>
                </div>
                <div className="space-y-1.5">
                  {alerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-start gap-1.5">
                      <span className={`text-[9px] font-bold px-1 py-0.5 rounded border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase().slice(0, 4)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-slate-300 leading-tight truncate">{alert.title}</div>
                        {alert.auto_action_taken && (
                          <div className="text-[9px] text-slate-600 truncate">{alert.auto_action_taken}</div>
                        )}
                      </div>
                      <span className={`text-[9px] font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status === 'resolved' ? '✓' : alert.status === 'investigating' ? '⟳' : '!'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: SOPON / SUPON / SOFT 10 + Tech Stack */}
          <div className="border-t border-cyan-500/10 bg-slate-900/40 px-5 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* SOPON/SUPON/SOFT-10 */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Katman Mimarisi: SOPON → SUPON → SOFT 10</div>
                <div className="flex gap-3">
                  {LAYER_SYSTEMS.map((layer, i) => {
                    const Icon = layer.icon;
                    const colorMap: Record<string, string> = {
                      cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-900/20',
                      purple: 'text-purple-400 border-purple-500/30 bg-purple-900/20',
                      emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-900/20',
                    };
                    const cls = colorMap[layer.color] || '';
                    return (
                      <React.Fragment key={layer.key}>
                        <div className={`flex-1 p-3 rounded-xl border ${cls}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-4 w-4 ${cls.split(' ')[0]}`} />
                            <span className={`text-xs font-bold ${cls.split(' ')[0]}`}>{layer.name}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mb-2 leading-relaxed">{layer.full}</div>
                          <div className="text-[9px] text-slate-500 mb-2">{layer.stage}</div>
                          <div className="space-y-1">
                            {Object.entries(layer.metrics).map(([k, v]) => (
                              <div key={k} className="flex justify-between text-[10px]">
                                <span className="text-slate-600 capitalize">{k.replace(/_/g, ' ')}</span>
                                <span className={`font-semibold ${cls.split(' ')[0]}`}>{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {i < 2 && <ArrowRight className="h-4 w-4 text-slate-600 self-center flex-shrink-0 mt-4" />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Tech Stack + Architecture */}
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Teknoloji Yığını & Esnek Veri Modeli</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3">
                    <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Tech Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'JSONB', 'LLM Agent', 'RAG', 'Docker', 'JWT/JWS'].map((t) => (
                        <span key={t} className="px-1.5 py-0.5 bg-slate-700/60 text-slate-300 text-[9px] rounded border border-slate-600/40">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3">
                    <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase">Esnek Veri Modeli</div>
                    <div className="space-y-1">
                      {['departments', 'core_policies', 'ai_generated_uis', 'realtime_logs', 'incident_alerts'].map((t) => (
                        <div key={t} className="flex items-center gap-1.5 text-[10px]">
                          <Database className="h-2.5 w-2.5 text-cyan-500" />
                          <span className="text-slate-400 font-mono">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Self-healing actions */}
                <div className="mt-3 flex gap-2">
                  {[
                    { label: 'IP Engelle', icon: Lock, color: 'text-red-400 border-red-500/30 bg-red-900/10' },
                    { label: 'IP Askıya Al', icon: UserCheck, color: 'text-amber-400 border-amber-500/30 bg-amber-900/10' },
                    { label: 'Kullanıcı Durdur', icon: AlertCircle, color: 'text-orange-400 border-orange-500/30 bg-orange-900/10' },
                    { label: 'Sertifika İptal', icon: X, color: 'text-red-400 border-red-500/30 bg-red-900/10' },
                  ].map((a) => (
                    <button key={a.label} className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg border text-[9px] font-semibold ${a.color} hover:opacity-80 transition-opacity`}>
                      <a.icon className="h-3 w-3" />
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Incident Alerts List */}
          {alerts.length > 0 && (
            <div className="border-t border-cyan-500/10 px-5 py-4 bg-slate-900/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold text-white">Olay Zaman Tüneli</span>
                <span className="ml-auto text-[10px] text-slate-500">{alerts.length} kayıt</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityColor(alert.severity)} bg-opacity-10`}>
                    <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold border self-start flex-shrink-0 ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white mb-0.5">{alert.title}</div>
                      {alert.description && <div className="text-[10px] text-slate-400 mb-1 leading-relaxed">{alert.description}</div>}
                      {alert.auto_action_taken && (
                        <div className="flex items-center gap-1 text-[10px] text-green-400">
                          <CheckCircle className="h-2.5 w-2.5" />
                          {alert.auto_action_taken}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-[10px] font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status === 'resolved' ? 'Çözüldü' : alert.status === 'investigating' ? 'İnceleniyor' : 'Açık'}
                      </span>
                      {alert.ai_confidence && (
                        <span className="text-[9px] text-slate-600">AI: {alert.ai_confidence}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
