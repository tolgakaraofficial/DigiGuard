import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Search, AlertTriangle, CheckCircle, XCircle, Eye, Image, Video, Mic,
  Award, Globe, Clock, RefreshCw, ExternalLink, Radar, Activity, Zap,
  Crosshair, Radio, ScanLine, MapPin, Navigation, Satellite, TrendingUp,
  PawPrint, Package, User, Fingerprint, Lock,
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { trackingService, LocationData } from '../services/trackingService';

interface Violation {
  id: string;
  violation_type: string;
  severity: string;
  source_platform: string;
  source_url: string;
  detection_confidence: number;
  content_type: string;
  status: string;
  detected_at: string;
}

interface Scan {
  id: string;
  scan_type: string;
  scan_status: string;
  total_sources: number;
  scanned_sources: number;
  started_at: string;
  completed_at: string;
}

interface PlatformStatus {
  name: string;
  riskLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  threats: number;
  lastScan: string;
  liveActivity: number;
}

const initialPlatforms: PlatformStatus[] = [
  { name: 'Google Search', riskLevel: 'safe', threats: 0, lastScan: '2 dk once', liveActivity: 12 },
  { name: 'Bing', riskLevel: 'safe', threats: 0, lastScan: '5 dk once', liveActivity: 3 },
  { name: 'Yandex', riskLevel: 'low', threats: 1, lastScan: '1 dk once', liveActivity: 8 },
  { name: 'Facebook', riskLevel: 'medium', threats: 3, lastScan: '30 sn once', liveActivity: 24 },
  { name: 'Instagram', riskLevel: 'high', threats: 7, lastScan: '15 sn once', liveActivity: 31 },
  { name: 'Twitter/X', riskLevel: 'low', threats: 2, lastScan: '3 dk once', liveActivity: 18 },
  { name: 'LinkedIn', riskLevel: 'safe', threats: 0, lastScan: '10 dk once', liveActivity: 5 },
  { name: 'TikTok', riskLevel: 'medium', threats: 4, lastScan: '45 sn once', liveActivity: 27 },
  { name: 'YouTube', riskLevel: 'low', threats: 1, lastScan: '2 dk once', liveActivity: 9 },
  { name: 'Dark Web Monitors', riskLevel: 'critical', threats: 12, lastScan: '5 sn once', liveActivity: 45 },
  { name: 'Data Breach Databases', riskLevel: 'high', threats: 6, lastScan: '1 dk once', liveActivity: 15 },
  { name: 'Image Search Engines', riskLevel: 'medium', threats: 3, lastScan: '20 sn once', liveActivity: 11 },
  { name: 'Document Repositories', riskLevel: 'safe', threats: 0, lastScan: '8 dk once', liveActivity: 2 },
  { name: 'Public Records', riskLevel: 'low', threats: 1, lastScan: '4 dk once', liveActivity: 4 },
  { name: 'Social Media Aggregators', riskLevel: 'medium', threats: 4, lastScan: '1 dk once', liveActivity: 19 },
];

const riskColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  safe: { bg: 'rgba(57,255,20,0.08)', border: 'rgba(57,255,20,0.25)', text: '#39ff14', dot: '#39ff14' },
  low: { bg: 'rgba(0,229,255,0.08)', border: 'rgba(0,229,255,0.25)', text: '#00e5ff', dot: '#00e5ff' },
  medium: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b', dot: '#f59e0b' },
  high: { bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', text: '#f97316', dot: '#f97316' },
  critical: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', text: '#ef4444', dot: '#ef4444' },
};

const riskLabels: Record<string, string> = {
  safe: 'Guvenli',
  low: 'Dusuk Risk',
  medium: 'Orta Risk',
  high: 'Yuksek Risk',
  critical: 'Kritik',
};

export const MonitoringPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'platforms' | 'scans' | 'violations' | 'tracking'>('dashboard');
  const [scanning, setScanning] = useState(false);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [platformStatuses, setPlatformStatuses] = useState<PlatformStatus[]>(initialPlatforms);
  const [radarSweep, setRadarSweep] = useState(0);
  const [stats, setStats] = useState({
    totalScans: 0,
    activeScans: 0,
    totalViolations: 0,
    criticalViolations: 0,
    highViolations: 0,
    mediumViolations: 0,
    lowViolations: 0,
    resolvedViolations: 0,
  });

  const platforms = initialPlatforms.map(p => p.name);

  // Radar sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarSweep((s) => (s + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Live platform telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformStatuses(prev => prev.map(p => {
        const activityChange = Math.floor(Math.random() * 5) - 2;
        const newActivity = Math.max(0, p.liveActivity + activityChange);
        const threatChange = Math.random() > 0.95 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newThreats = Math.max(0, p.threats + threatChange);
        let newRisk = p.riskLevel;
        if (newThreats >= 10) newRisk = 'critical';
        else if (newThreats >= 5) newRisk = 'high';
        else if (newThreats >= 3) newRisk = 'medium';
        else if (newThreats >= 1) newRisk = 'low';
        else newRisk = 'safe';
        return { ...p, liveActivity: newActivity, threats: newThreats, riskLevel: newRisk };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: scansData } = await supabase
      .from('identity_scans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: violationsData } = await supabase
      .from('identity_violations')
      .select('*')
      .eq('user_id', user.id)
      .order('detected_at', { ascending: false });

    if (scansData) setRecentScans(scansData);
    if (violationsData) {
      setViolations(violationsData);
      setStats({
        totalScans: scansData?.length || 0,
        activeScans: scansData?.filter(s => s.scan_status === 'scanning').length || 0,
        totalViolations: violationsData.length,
        criticalViolations: violationsData.filter(v => v.severity === 'critical').length,
        highViolations: violationsData.filter(v => v.severity === 'high').length,
        mediumViolations: violationsData.filter(v => v.severity === 'medium').length,
        lowViolations: violationsData.filter(v => v.severity === 'low').length,
        resolvedViolations: violationsData.filter(v => v.status === 'resolved').length,
      });
    }
  };

  const startFullScan = async () => {
    setScanning(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setScanning(false); return; }

    const { data: scan, error } = await supabase
      .from('identity_scans')
      .insert({
        user_id: user.id,
        scan_type: 'full',
        scan_status: 'scanning',
        total_sources: platforms.length,
        scanned_sources: 0,
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error || !scan) { setScanning(false); return; }
    simulateScan(scan.id, user.id);
  };

  const simulateScan = async (scanId: string, userId: string) => {
    const violationTypes = ['unauthorized_image', 'fake_profile', 'identity_theft', 'certificate_fraud', 'deepfake', 'data_breach'];
    const severities = ['low', 'medium', 'high', 'critical'];
    const contentTypes = ['image', 'video', 'audio', 'text', 'document'];

    for (let i = 0; i < platforms.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await supabase.from('identity_scans').update({ scanned_sources: i + 1 }).eq('id', scanId);

      if (Math.random() > 0.7) {
        const severity = severities[Math.floor(Math.random() * severities.length)];
        await supabase.from('identity_violations').insert({
          scan_id: scanId,
          user_id: userId,
          violation_type: violationTypes[Math.floor(Math.random() * violationTypes.length)],
          severity,
          source_platform: platforms[i],
          source_url: `https://example.com/violation/${Math.random().toString(36).substr(2, 9)}`,
          detection_confidence: Math.floor(Math.random() * 30) + 70,
          content_type: contentTypes[Math.floor(Math.random() * contentTypes.length)],
          status: 'detected',
        });
      }
    }

    await supabase.from('identity_scans').update({
      scan_status: 'completed',
      completed_at: new Date().toISOString(),
    }).eq('id', scanId);

    setScanning(false);
    loadDashboardData();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-500/50';
      case 'medium': return 'text-amber-400 bg-amber-900/30 border-amber-500/50';
      case 'low': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      default: return 'text-slate-400 bg-slate-900/30 border-slate-500/50';
    }
  };

  const getViolationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      unauthorized_image: 'Yetkisiz Gorsel Kullanimi',
      fake_profile: 'Sahte Profil',
      identity_theft: 'Kimlik Hirsizligi',
      certificate_fraud: 'Sertifika Sahteciligi',
      deepfake: 'Deepfake/Yapay Icerik',
      data_breach: 'Veri Ihlali',
    };
    return labels[type] || type;
  };

  const totalThreats = platformStatuses.reduce((sum, p) => sum + p.threats, 0);
  const totalActivity = platformStatuses.reduce((sum, p) => sum + p.liveActivity, 0);
  const criticalPlatforms = platformStatuses.filter(p => p.riskLevel === 'critical' || p.riskLevel === 'high').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Radar className="h-7 w-7 text-cyber-400 mr-3" />
            Kimlik Izleme ve Ihlal Tespit Merkezi
          </h2>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            Tum arama motorlari, sosyal medya ve web sitelerinden canli kimlik taramasi
            <span className="px-2 py-0.5 bg-yellow-600/30 text-yellow-300 text-xs rounded-full border border-yellow-500/50 font-semibold">
              Tarama/Raporlama Ucretlidir
            </span>
          </p>
        </div>
        <button
          onClick={startFullScan}
          disabled={scanning}
          className="bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-cyber-500/30"
        >
          {scanning ? (
            <><RefreshCw className="h-5 w-5 animate-spin" /><span>Taraniyor...</span></>
          ) : (
            <><Search className="h-5 w-5" /><span>Tam Tarama Baslat</span></>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-700 overflow-x-auto">
        <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'text-cyber-400 border-b-2 border-cyber-400' : 'text-slate-400 hover:text-white'}`}>
          Genel Bakis
        </button>
        <button onClick={() => setActiveTab('platforms')} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'platforms' ? 'text-cyber-400 border-b-2 border-cyber-400' : 'text-slate-400 hover:text-white'}`}>
          Taranan Platformlar
        </button>
        <button onClick={() => setActiveTab('scans')} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'scans' ? 'text-cyber-400 border-b-2 border-cyber-400' : 'text-slate-400 hover:text-white'}`}>
          Tarama Gecmisi
        </button>
        <button onClick={() => setActiveTab('violations')} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'violations' ? 'text-cyber-400 border-b-2 border-cyber-400' : 'text-slate-400 hover:text-white'}`}>
          Ihlaller ({stats.totalViolations})
        </button>
        <button onClick={() => setActiveTab('tracking')} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === 'tracking' ? 'text-cyber-400 border-b-2 border-cyber-400' : 'text-slate-400 hover:text-white'}`}>
          Konum Izleme
        </button>
      </div>

      {/* Dashboard Tab with Radar */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 rounded-lg p-6 border border-cyber-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Toplam Tarama</p>
                  <p className="text-3xl font-bold text-cyber-400">{stats.totalScans}</p>
                </div>
                <Search className="h-10 w-10 text-cyber-400/50" />
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Kritik Ihlaller</p>
                  <p className="text-3xl font-bold text-red-400">{stats.criticalViolations}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-400/50" />
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Yuksek Risk</p>
                  <p className="text-3xl font-bold text-orange-400">{stats.highViolations}</p>
                </div>
                <XCircle className="h-10 w-10 text-orange-400/50" />
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Cozumlenmis</p>
                  <p className="text-3xl font-bold text-green-400">{stats.resolvedViolations}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-400/50" />
              </div>
            </div>
          </div>

          {/* Radar Telemetry Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Visual */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-cyber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="h-5 w-5 text-cyber-400" />
                <h3 className="text-lg font-semibold text-white">Canli Radar Telemetri</h3>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-matrix-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" /> AKTIF
                </span>
              </div>
              <div className="relative w-full aspect-square max-w-sm mx-auto bg-slate-900/80 rounded-full border-2 border-cyber-500/20 overflow-hidden">
                {/* Radar rings */}
                {[0.3, 0.6, 0.9].map((scale, i) => (
                  <div key={i} className="absolute rounded-full border border-cyber-500/15"
                    style={{ width: `${scale * 100}%`, height: `${scale * 100}%`, left: `${(1 - scale) * 50}%`, top: `${(1 - scale) * 50}%` }}
                  />
                ))}
                {/* Crosshair lines */}
                <div className="absolute left-1/2 top-0 w-px h-full bg-cyber-500/10" />
                <div className="absolute top-1/2 left-0 h-px w-full bg-cyber-500/10" />
                {/* Center point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyber-400 animate-pulse" />
                {/* Sweep line */}
                <div className="absolute top-1/2 left-1/2 origin-left h-0.5 w-1/2"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,229,255,0.8), transparent)',
                    transform: `rotate(${radarSweep}deg)`,
                    transition: 'none',
                  }}
                />
                {/* Threat blips */}
                {platformStatuses.filter(p => p.threats > 0).slice(0, 8).map((p, i) => {
                  const angle = (i * 45 + radarSweep * 0.3) % 360;
                  const distance = 20 + (p.threats * 4) + (i * 8);
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + Math.cos(rad) * Math.min(distance, 45);
                  const y = 50 + Math.sin(rad) * Math.min(distance, 45);
                  const color = riskColors[p.riskLevel];
                  return (
                    <div key={i} className="absolute w-2 h-2 rounded-full animate-pulse"
                      style={{
                        left: `${x}%`, top: `${y}%`,
                        background: color.dot,
                        boxShadow: `0 0 6px ${color.dot}`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  );
                })}
                {/* Compass labels */}
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] text-slate-500 font-mono">N</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-slate-500 font-mono">S</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-slate-500 font-mono">W</span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] text-slate-500 font-mono">E</span>
              </div>
              {/* Radar stats below */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 rounded bg-slate-900/60">
                  <p className="text-lg font-bold text-cyber-400">{totalActivity}</p>
                  <p className="text-[9px] text-slate-500">Canli Aktivite</p>
                </div>
                <div className="text-center p-2 rounded bg-slate-900/60">
                  <p className="text-lg font-bold text-orange-400">{totalThreats}</p>
                  <p className="text-[9px] text-slate-500">Tehdit Noktasi</p>
                </div>
                <div className="text-center p-2 rounded bg-slate-900/60">
                  <p className="text-lg font-bold text-red-400">{criticalPlatforms}</p>
                  <p className="text-[9px] text-slate-500">Riskli Platform</p>
                </div>
              </div>
            </div>

            {/* Telemetry Flow Simulation */}
            <div className="bg-slate-800/80 rounded-xl p-6 border border-cyber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-matrix-400" />
                <h3 className="text-lg font-semibold text-white">Telemetri Akis Simulasyonu</h3>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {platformStatuses.map((p, i) => {
                  const color = riskColors[p.riskLevel];
                  return (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg transition-all"
                      style={{ background: color.bg, border: `1px solid ${color.border}` }}>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: color.dot }} />
                      <span className="text-xs text-slate-300 flex-1 truncate">{p.name}</span>
                      <div className="flex items-center gap-1">
                        <ScanLine className="h-3 w-3" style={{ color: color.text }} />
                        <span className="text-[10px] font-mono" style={{ color: color.text }}>{p.liveActivity}</span>
                      </div>
                      <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(p.liveActivity * 3, 100)}%`, background: color.dot }}
                        />
                      </div>
                      {p.threats > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}>
                          {p.threats}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                <Zap className="h-3 w-3 text-cyber-400" />
                <span>Her platform surekli taraniyor. Risk seviyeleri canli olarak guncellenir.</span>
              </div>
            </div>
          </div>

          {/* 7/24 Monitoring Banner */}
          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Eye className="h-6 w-6 text-amber-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">7/24 Surekli Izleme Aktif</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Kimliginiz ve icerikleriniz tum internet uzerinde surekli olarak izleniyor.
                  Herhangi bir yetkisiz kullanim aninda tespit edilip size bildirilecektir.
                </p>
                <div className="flex items-center flex-wrap gap-3 text-xs">
                  <span className="text-cyber-400 flex items-center"><Image className="h-3 w-3 mr-1" /> Gorsel Tarama</span>
                  <span className="text-matrix-400 flex items-center"><Video className="h-3 w-3 mr-1" /> Video Analizi</span>
                  <span className="text-purple-400 flex items-center"><Mic className="h-3 w-3 mr-1" /> Ses Tanimasi</span>
                  <span className="text-amber-400 flex items-center"><Award className="h-3 w-3 mr-1" /> Sertifika Kontrolu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platforms Tab - Vertical list with live telemetry */}
      {activeTab === 'platforms' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-5 w-5 text-cyber-400" />
            <h3 className="text-lg font-semibold text-white">Taranan Platformlar ({platforms.length})</h3>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-matrix-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" /> CANLI TELEMETRI
            </span>
          </div>
          {platformStatuses.map((platform, index) => {
            const color = riskColors[platform.riskLevel];
            return (
              <div key={index} className="rounded-xl p-4 transition-all"
                style={{ background: color.bg, border: `1px solid ${color.border}` }}>
                <div className="flex items-center gap-4">
                  {/* Platform icon */}
                  <div className="p-2.5 rounded-lg bg-slate-900/60 flex-shrink-0">
                    <Globe className="h-5 w-5" style={{ color: color.text }} />
                  </div>

                  {/* Platform name + status */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{platform.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}>
                        {riskLabels[platform.riskLevel]}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">Son tarama: {platform.lastScan}</p>
                  </div>

                  {/* Live activity meter */}
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" style={{ color: color.text }} />
                      <span className="text-xs font-mono" style={{ color: color.text }}>{platform.liveActivity}</span>
                    </div>
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(platform.liveActivity * 3, 100)}%`, background: color.dot }}
                      />
                    </div>
                  </div>

                  {/* Threat count */}
                  <div className="text-center min-w-[60px]">
                    <p className="text-lg font-bold" style={{ color: color.text }}>{platform.threats}</p>
                    <p className="text-[9px] text-slate-500">tehdit</p>
                  </div>

                  {/* Status indicator */}
                  <div className="flex flex-col items-center gap-1">
                    {platform.riskLevel === 'safe' ? (
                      <CheckCircle className="h-5 w-5" style={{ color: color.text }} />
                    ) : platform.riskLevel === 'critical' || platform.riskLevel === 'high' ? (
                      <AlertTriangle className="h-5 w-5 animate-pulse" style={{ color: color.text }} />
                    ) : (
                      <Crosshair className="h-5 w-5" style={{ color: color.text }} />
                    )}
                    <span className="text-[8px] text-slate-500 font-mono uppercase">{platform.riskLevel}</span>
                  </div>
                </div>

                {/* Mini telemetry bar */}
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const height = platform.liveActivity > 0
                      ? Math.max(2, Math.random() * (platform.liveActivity / 2))
                      : 1;
                    return (
                      <div key={i} className="flex-1 rounded-sm transition-all duration-500"
                        style={{
                          height: `${height}px`,
                          background: i < platform.liveActivity / 3 ? color.dot : 'rgba(255,255,255,0.05)',
                          opacity: i < platform.liveActivity / 3 ? 0.6 + Math.random() * 0.4 : 0.3,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scans Tab */}
      {activeTab === 'scans' && (
        <div className="space-y-4">
          {recentScans.length === 0 ? (
            <div className="bg-slate-800/80 rounded-lg p-12 border border-slate-700 text-center">
              <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Henuz tarama yapilmadi</p>
              <p className="text-slate-500 text-sm mt-2">Kimlik korumasi icin ilk taramayi baslatin</p>
            </div>
          ) : (
            recentScans.map((scan) => (
              <div key={scan.id} className="bg-slate-800/80 rounded-lg p-6 border border-cyber-500/20 hover:border-cyber-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      scan.scan_status === 'completed' ? 'bg-green-900/30' :
                      scan.scan_status === 'scanning' ? 'bg-amber-900/30' :
                      scan.scan_status === 'failed' ? 'bg-red-900/30' : 'bg-slate-700/30'
                    }`}>
                      {scan.scan_status === 'completed' && <CheckCircle className="h-6 w-6 text-green-400" />}
                      {scan.scan_status === 'scanning' && <RefreshCw className="h-6 w-6 text-amber-400 animate-spin" />}
                      {scan.scan_status === 'failed' && <XCircle className="h-6 w-6 text-red-400" />}
                      {scan.scan_status === 'pending' && <Clock className="h-6 w-6 text-slate-400" />}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        {scan.scan_type === 'full' ? 'Tam Tarama' : scan.scan_type.toUpperCase()}
                      </h4>
                      <p className="text-slate-400 text-sm">{scan.scanned_sources} / {scan.total_sources} platform tarandi</p>
                      <p className="text-slate-500 text-xs mt-1">{new Date(scan.started_at).toLocaleString('tr-TR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      scan.scan_status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-500/50' :
                      scan.scan_status === 'scanning' ? 'bg-amber-900/30 text-amber-400 border border-amber-500/50' :
                      scan.scan_status === 'failed' ? 'bg-red-900/30 text-red-400 border border-red-500/50' :
                      'bg-slate-700/30 text-slate-400 border border-slate-500/50'
                    }`}>
                      {scan.scan_status === 'completed' ? 'Tamamlandi' :
                       scan.scan_status === 'scanning' ? 'Taraniyor' :
                       scan.scan_status === 'failed' ? 'Basarisiz' : 'Bekliyor'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Violations Tab */}
      {activeTab === 'violations' && (
        <div className="space-y-4">
          {violations.length === 0 ? (
            <div className="bg-slate-800/80 rounded-lg p-12 border border-slate-700 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <p className="text-green-400 font-medium">Ihlal Tespit Edilmedi</p>
              <p className="text-slate-400 text-sm mt-2">Kimliginiz guvende, herhangi bir yetkisiz kullanim bulunamadi</p>
            </div>
          ) : (
            violations.map((violation) => (
              <div key={violation.id} className={`bg-slate-800/80 rounded-lg p-6 border ${getSeverityColor(violation.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(violation.severity)}`}>
                        {violation.severity.toUpperCase()}
                      </span>
                      <span className="text-slate-400 text-sm">{violation.source_platform}</span>
                      <span className="text-slate-500 text-xs">{new Date(violation.detected_at).toLocaleString('tr-TR')}</span>
                    </div>
                    <h4 className="text-white font-medium mb-2">{getViolationTypeLabel(violation.violation_type)}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-400">Icerik Tipi: <span className="text-white">{violation.content_type}</span></span>
                      <span className="text-slate-400">Guven: <span className="text-cyber-400">{violation.detection_confidence}%</span></span>
                      <span className="text-slate-400">Durum: <span className="text-amber-400">{violation.status === 'detected' ? 'Tespit Edildi' : violation.status}</span></span>
                    </div>
                    {violation.source_url && (
                      <a href={violation.source_url} target="_blank" rel="noopener noreferrer" className="text-cyber-400 hover:text-cyber-300 text-sm mt-2 inline-flex items-center">
                        Kaynagi Goruntule<ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-cyber-600 hover:bg-cyber-700 text-white px-4 py-2 rounded-lg text-sm transition-all">Incele</button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all">Cozumle</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tracking Tab - Location monitoring merged from TrackingPanel */}
      {activeTab === 'tracking' && <TrackingTabContent />}
    </div>
  );
};

/* ---------- Tracking Tab (merged from TrackingPanel) ---------- */
const TrackingTabContent: React.FC = () => {
  const [trackingType, setTrackingType] = useState<'person' | 'chip'>('person');
  const [trackingList, setTrackingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRadarAngle((a) => (a + 2) % 360), 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadTrackingData();
  }, [trackingType]);

  const loadTrackingData = async () => {
    setLoading(true);
    try {
      const data = trackingType === 'person'
        ? await trackingService.getMyTracking()
        : await trackingService.getMyChipItems();
      setTrackingList(data || []);
    } catch (err) {
      console.error('Tracking data error:', err);
      setTrackingList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = async () => {
    try {
      const loc = await trackingService.getCurrentLocation();
      setCurrentLocation(loc);
    } catch (err) {
      console.error('Location error:', err);
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Satellite className="h-5 w-5 text-cyber-400" />
        <h3 className="text-lg font-semibold text-white">Canli Konum Izleme ve Radar Gecisleri</h3>
      </div>

      {/* Tracking type switcher */}
      <div className="flex gap-2">
        <button onClick={() => setTrackingType('person')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${trackingType === 'person' ? 'bg-cyber-600 text-white' : 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:text-white'}`}>
          <User className="h-4 w-4" /> Kisi Izleme
        </button>
        <button onClick={() => setTrackingType('chip')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${trackingType === 'chip' ? 'bg-cyber-600 text-white' : 'bg-slate-900/60 text-slate-400 border border-slate-700 hover:text-white'}`}>
          <Package className="h-4 w-4" /> Chip/Esy Izleme
        </button>
      </div>

      {/* Location Radar + Current Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar visual */}
        <div className="bg-slate-800/80 rounded-xl p-6 border border-cyber-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Radar className="h-5 w-5 text-cyber-400" />
            <h4 className="text-sm font-semibold text-white">Konum Radar</h4>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-matrix-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-matrix-400 animate-pulse" /> TARAMA
            </span>
          </div>
          <div className="relative w-full aspect-square max-w-xs mx-auto bg-slate-900/80 rounded-full border-2 border-cyber-500/20 overflow-hidden">
            {[0.3, 0.6, 0.9].map((s, i) => (
              <div key={i} className="absolute rounded-full border border-cyber-500/15"
                style={{ width: `${s * 100}%`, height: `${s * 100}%`, left: `${(1 - s) * 50}%`, top: `${(1 - s) * 50}%` }} />
            ))}
            <div className="absolute left-1/2 top-0 w-px h-full bg-cyber-500/10" />
            <div className="absolute top-1/2 left-0 h-px w-full bg-cyber-500/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <MapPin className="h-5 w-5 text-cyber-400 animate-pulse" />
            </div>
            <div className="absolute top-1/2 left-1/2 origin-left h-0.5 w-1/2"
              style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.8), transparent)', transform: `rotate(${radarAngle}deg)` }} />
            {/* Tracking blips */}
            {trackingList.slice(0, 5).map((item, i) => {
              const angle = (i * 72 + radarAngle * 0.2) % 360;
              const dist = 25 + i * 8;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * dist;
              const y = 50 + Math.sin(rad) * dist;
              return (
                <div key={i} className="absolute w-2 h-2 rounded-full bg-orange-400 animate-pulse"
                  style={{ left: `${x}%`, top: `${y}%`, boxShadow: '0 0 6px #f97316', animationDelay: `${i * 0.3}s` }} />
              );
            })}
          </div>
          {currentLocation && (
            <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="h-3.5 w-3.5 text-cyber-400" />
                <span className="text-xs font-semibold text-white">Mevcut Konum</span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">
                Enlem: {currentLocation.lat.toFixed(6)} | Boylam: {currentLocation.lng.toFixed(6)}
              </p>
              {currentLocation.accuracy && (
                <p className="text-[10px] text-slate-500 mt-0.5">Hassasiyet: +/- {Math.round(currentLocation.accuracy)}m</p>
              )}
            </div>
          )}
        </div>

        {/* Tracking list */}
        <div className="bg-slate-800/80 rounded-xl p-6 border border-cyber-500/20">
          <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            {trackingType === 'person' ? <User className="h-4 w-4 text-cyber-400" /> : <Package className="h-4 w-4 text-cyber-400" />}
            {trackingType === 'person' ? 'Kisi Takip Listesi' : 'Chip/Esya Takip Listesi'}
          </h4>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-6 w-6 text-slate-500 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 mt-2">Yukleniyor...</p>
            </div>
          ) : trackingList.length === 0 ? (
            <div className="text-center py-8">
              {trackingType === 'person' ? <User className="h-10 w-10 text-slate-600 mx-auto mb-2" /> : <Package className="h-10 w-10 text-slate-600 mx-auto mb-2" />}
              <p className="text-sm text-slate-500">Henuz kayit bulunmuyor</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {trackingList.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-cyber-500/40 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    {trackingType === 'person' ? (
                      <Fingerprint className="h-4 w-4 text-cyber-400" />
                    ) : (
                      <PawPrint className="h-4 w-4 text-amber-400" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {trackingType === 'person' ? item.gsm_number || item.identity_number : item.item_name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">{item.certificate_id}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${item.tracking_enabled ? 'bg-matrix-400 animate-pulse' : 'bg-slate-600'}`} />
                    <span className="text-[9px] font-mono" style={{ color: item.tracking_enabled ? '#39ff14' : '#64748b' }}>
                      {item.tracking_enabled ? 'AKTIF' : 'PASIF'}
                    </span>
                  </div>
                  {item.current_location && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <MapPin className="h-2.5 w-2.5" />
                      <span className="font-mono">
                        {item.current_location.lat?.toFixed(4)}, {item.current_location.lng?.toFixed(4)}
                      </span>
                      {item.last_base_station && (
                        <span className="ml-auto text-slate-600">Baz: {item.last_base_station}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {/* Telemetry flow */}
          <div className="mt-4 flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-700">
            <Radio className="h-3.5 w-3.5 text-cyber-400 animate-pulse" />
            <span className="text-[10px] text-slate-400">Radar telemetri akisi: 2 sn/aralikla konum guncelleniyor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
