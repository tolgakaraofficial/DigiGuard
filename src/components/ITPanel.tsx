import React, { useState, useEffect } from 'react';
import {
  X, Monitor, Server, Wifi, Database, AlertTriangle, CheckCircle,
  Activity, Shield, Lock, TrendingUp, Clock, Cpu, HardDrive,
  BarChart2, Eye, RefreshCw, AlertCircle, Globe, Zap
} from 'lucide-react';

interface ITPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThreatEntry {
  id: string;
  type: 'brute_force' | 'port_scan' | 'malware' | 'data_exfiltration' | 'ddos' | 'zero_day';
  source_ip: string;
  target: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'blocked' | 'investigating' | 'mitigated';
  timestamp: string;
  ai_action: string;
  confidence: number;
}

interface ServerStatus {
  id: string;
  name: string;
  role: string;
  cpu: number;
  ram: number;
  disk: number;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  uptime: string;
  location: string;
}

const THREATS: ThreatEntry[] = [
  { id: 'THR-001', type: 'brute_force', source_ip: '185.220.101.45', target: 'auth.digiguard.app', severity: 'critical', status: 'blocked', timestamp: '2 dk önce', ai_action: 'IP otomatik engellendi, kullanıcı askıya alındı', confidence: 98.7 },
  { id: 'THR-002', type: 'port_scan', source_ip: '45.142.212.100', target: 'db-primary.internal', severity: 'high', status: 'blocked', timestamp: '8 dk önce', ai_action: 'Port erişimi engellendi, güvenlik duvarı kuralı eklendi', confidence: 94.2 },
  { id: 'THR-003', type: 'data_exfiltration', source_ip: '10.0.0.147', target: 'storage.digiguard.app', severity: 'critical', status: 'investigating', timestamp: '15 dk önce', ai_action: 'Oturum kapatıldı, ağ trafiği izolasyon modunda', confidence: 91.5 },
  { id: 'THR-004', type: 'malware', source_ip: 'ENDPOINT-42', target: 'workstation-42', severity: 'high', status: 'mitigated', timestamp: '1 saat önce', ai_action: 'Karantinaya alındı, temizleme tamamlandı', confidence: 99.1 },
  { id: 'THR-005', type: 'ddos', source_ip: 'Botnet (847 IP)', target: 'api.digiguard.app', severity: 'high', status: 'blocked', timestamp: '3 saat önce', ai_action: 'CDN DDoS koruması devreye girdi, rate limiting aktif', confidence: 97.8 },
];

const SERVERS: ServerStatus[] = [
  { id: 'SRV-001', name: 'db-primary', role: 'PostgreSQL Primary', cpu: 34, ram: 68, disk: 52, status: 'healthy', uptime: '99.98%', location: 'TR-IST-1' },
  { id: 'SRV-002', name: 'db-replica', role: 'PostgreSQL Replica', cpu: 18, ram: 45, disk: 51, status: 'healthy', uptime: '99.97%', location: 'TR-ANK-1' },
  { id: 'SRV-003', name: 'api-gateway', role: 'API Gateway', cpu: 72, ram: 61, disk: 28, status: 'warning', uptime: '99.95%', location: 'TR-IST-1' },
  { id: 'SRV-004', name: 'auth-service', role: 'Auth & KYC', cpu: 45, ram: 55, disk: 33, status: 'healthy', uptime: '100%', location: 'TR-IST-2' },
  { id: 'SRV-005', name: 'ai-engine', role: 'SUPON AI Engine', cpu: 89, ram: 78, disk: 45, status: 'warning', uptime: '99.9%', location: 'TR-IST-1' },
];

const LIVE_LOGS = [
  { time: '00:00:01', level: 'INFO', source: 'auth-service', msg: 'Kullanıcı KYC doğrulaması tamamlandı — USR-77821' },
  { time: '00:00:03', level: 'WARN', source: 'api-gateway', msg: 'Yüksek istek hacmi tespit edildi — rate limit devreye girdi' },
  { time: '00:00:05', level: 'CRIT', source: 'sopon-layer', msg: 'Anomali tespit edildi — IP: 185.220.101.45 — aksiyon: engellendi' },
  { time: '00:00:07', level: 'INFO', source: 'soft10', msg: 'Sertifika başarıyla imzalandı — CERT-DG-2026-7891' },
  { time: '00:00:10', level: 'INFO', source: 'db-primary', msg: 'Sorgu performansı normal — avg: 2.3ms' },
  { time: '00:00:12', level: 'WARN', source: 'ai-engine', msg: 'CPU kullanımı %89 — auto-scaling tetikleniyor' },
];

const getServerStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return { text: 'text-green-400', bg: 'bg-green-500/20', bar: 'bg-green-500' };
    case 'warning': return { text: 'text-amber-400', bg: 'bg-amber-500/20', bar: 'bg-amber-500' };
    case 'critical': return { text: 'text-red-400', bg: 'bg-red-500/20', bar: 'bg-red-500' };
    case 'offline': return { text: 'text-slate-500', bg: 'bg-slate-500/20', bar: 'bg-slate-600' };
    default: return { text: 'text-slate-400', bg: 'bg-slate-500/20', bar: 'bg-slate-500' };
  }
};

const getMetricColor = (value: number) => {
  if (value < 60) return 'bg-green-500';
  if (value < 80) return 'bg-amber-500';
  return 'bg-red-500';
};

const getThreatSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    case 'medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
    default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
  }
};

const LOG_LEVEL_COLORS: Record<string, string> = {
  INFO: 'text-cyan-400',
  WARN: 'text-amber-400',
  CRIT: 'text-red-400 font-bold',
  DEBUG: 'text-slate-500',
};

export const ITPanel: React.FC<ITPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'threats' | 'servers' | 'logs'>('threats');
  const [logIndex, setLogIndex] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(LIVE_LOGS.slice(0, 4));

  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => {
      setLogIndex((i) => {
        const next = (i + 1) % LIVE_LOGS.length;
        setVisibleLogs((prev) => [LIVE_LOGS[next], ...prev.slice(0, 5)]);
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, [isOpen]);

  if (!isOpen) return null;

  const criticalThreats = THREATS.filter((t) => t.severity === 'critical' && t.status !== 'mitigated').length;
  const warningServers = SERVERS.filter((s) => s.status === 'warning' || s.status === 'critical').length;

  const networkMetrics = [
    { label: 'Bant Genişliği Kullanımı', value: 62, unit: '%', color: 'bg-cyan-500' },
    { label: 'Paket Kaybı', value: 0.02, unit: '%', color: 'bg-green-500' },
    { label: 'Gecikme (ms)', value: 4, unit: 'ms', color: 'bg-green-500' },
    { label: 'Engellenen İstek', value: 1284, unit: '/gün', color: 'bg-red-500', raw: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-auto">
      <div className="w-full max-w-5xl bg-[#060b18] border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 bg-purple-500/20 rounded-xl border border-purple-500/30">
              <Monitor className="h-5 w-5 text-purple-400" />
              {criticalThreats > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Bilgi Teknolojileri Paneli</h2>
              <p className="text-xs text-purple-400/70">IT-Agent v3.0 — PUKO: ÖNLEM AL Aşaması — AI SIEM Aktif</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {criticalThreats > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-lg animate-pulse">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                <span className="text-red-400 text-xs font-semibold">{criticalThreats} Kritik Tehdit</span>
              </div>
            )}
            {warningServers > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-amber-400 text-xs">{warningServers} Sunucu Uyarısı</span>
              </div>
            )}
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Network Metrics Bar */}
        <div className="grid grid-cols-4 gap-0 border-b border-purple-500/10 flex-shrink-0">
          {networkMetrics.map((m, i) => (
            <div key={i} className="p-4 border-r border-purple-500/10 last:border-r-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-slate-500">{m.label}</span>
                <span className="text-xs font-bold text-white">{m.value}{m.unit}</span>
              </div>
              {!m.raw && (
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: `${Math.min(Number(m.value), 100)}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-purple-500/10 flex-shrink-0">
          {[
            { key: 'threats', label: 'Tehdit Akışı (AI SIEM)', icon: Shield },
            { key: 'servers', label: 'Sunucu Durumu', icon: Server },
            { key: 'logs', label: 'Canlı Loglar', icon: Activity },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-purple-400 text-purple-400 bg-purple-900/10'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.key === 'threats' && criticalThreats > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full font-bold">{criticalThreats}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-5">
          {activeTab === 'threats' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2">SUPON AI Karar Motoru tarafından anlık tarama — brute-force, port scan, malware, DDoS tespiti</div>
              {THREATS.map((threat) => (
                <div key={threat.id} className={`p-4 rounded-xl border ${getThreatSeverityColor(threat.severity).replace('text-', 'border-').replace('400', '500/30')} bg-slate-800/30`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getThreatSeverityColor(threat.severity)}`}>
                        {threat.severity.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-white capitalize">{threat.type.replace(/_/g, ' ')}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] border ${
                        threat.status === 'blocked' ? 'text-green-400 border-green-500/30 bg-green-500/10' :
                        threat.status === 'mitigated' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' :
                        'text-amber-400 border-amber-500/30 bg-amber-500/10'
                      }`}>
                        {threat.status === 'blocked' ? 'ENGELLENDİ' : threat.status === 'mitigated' ? 'GİDERİLDİ' : 'İNCELENİYOR'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">{threat.timestamp}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2 ml-1">
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-600">Kaynak: </span>
                      <span className="font-mono text-red-300">{threat.source_ip}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-600">Hedef: </span>
                      <span className="font-mono text-slate-300">{threat.target}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-green-400">
                      <Zap className="h-3 w-3" />
                      <span>{threat.ai_action}</span>
                    </div>
                    <span className="text-[10px] text-slate-600">AI güven: {threat.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'servers' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2">IT-Agent anlık sunucu metrikleri — CPU, RAM, Disk kullanımı ve uptime takibi</div>
              {SERVERS.map((server) => {
                const sc = getServerStatusColor(server.status);
                return (
                  <div key={server.id} className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${sc.bg}`}>
                        <Server className={`h-4 w-4 ${sc.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white font-mono">{server.name}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${sc.bg} ${sc.text} border border-current/20`}>
                            {server.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">{server.role} — {server.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-400 font-semibold">{server.uptime}</div>
                        <div className="text-[10px] text-slate-600">uptime</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'CPU', value: server.cpu },
                        { label: 'RAM', value: server.ram },
                        { label: 'Disk', value: server.disk },
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>{metric.label}</span>
                            <span className={`font-semibold ${metric.value >= 80 ? 'text-red-400' : metric.value >= 60 ? 'text-amber-400' : 'text-green-400'}`}>
                              {metric.value}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full ${getMetricColor(metric.value)} rounded-full transition-all duration-1000`} style={{ width: `${metric.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="text-xs text-slate-500">AI SIEM anlık log akışı — SOPON filtre katmanından geçirilmiş kayıtlar</div>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400 font-mono">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="bg-slate-950/80 border border-slate-700/50 rounded-xl overflow-hidden font-mono text-[11px]">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700/40 bg-slate-900/60">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-[9px] text-slate-500">IT-AGENT / AI-SIEM / LIVE LOG STREAM</span>
                </div>
                <div className="p-4 space-y-1.5 min-h-[300px]">
                  {visibleLogs.map((log, i) => (
                    <div key={i} className={`flex items-start gap-3 ${i === 0 ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
                      <span className="text-slate-600 text-[10px] whitespace-nowrap">{log.time}</span>
                      <span className={`text-[10px] font-bold min-w-[36px] ${LOG_LEVEL_COLORS[log.level] || 'text-slate-400'}`}>{log.level}</span>
                      <span className="text-cyan-600 text-[10px] min-w-[80px]">[{log.source}]</span>
                      <span className={`text-[10px] leading-relaxed ${i === 0 ? 'text-slate-200' : 'text-slate-600'}`}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
