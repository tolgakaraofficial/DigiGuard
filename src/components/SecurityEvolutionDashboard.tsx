import React, { useState, useEffect } from 'react';
import {
  Shield, AlertTriangle, CheckCircle, RefreshCw, Lock, Unlock, Activity,
  TrendingUp, AlertCircle, Bug, Download, Zap, Globe, Brain, Database,
  Server, Wifi, Eye, Cpu, ArrowUpRight, ArrowDownRight, Clock, X
} from 'lucide-react';
import {
  ThreatDetectionEngine,
  VulnerabilityManager,
  AutoUpdateSystem,
  TechnologyEvolutionTracker,
  ZeroTrustEngine,
  SecurityMetricsCollector,
  SelfHealingSystem,
  type SecurityThreat,
  type Vulnerability,
  type SecurityUpdate,
  type TechnologyTrend,
  type SecurityMetrics,
} from '../services/selfEvolvingSecurityService';

interface SecurityEvolutionDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityEvolutionDashboard: React.FC<SecurityEvolutionDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'threats' | 'vulnerabilities' | 'updates' | 'technology' | 'zerotrust'>('overview');
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [updates, setUpdates] = useState<SecurityUpdate[]>([]);
  const [technologies, setTechnologies] = useState<TechnologyTrend[]>([]);
  const [healingLog, setHealingLog] = useState<{ fixed: string[]; remaining: string[] } | null>(null);
  const [isHealing, setIsHealing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    const metricsData = await SecurityMetricsCollector.collectMetrics();
    setMetrics(metricsData);

    const threatsData = ThreatDetectionEngine.getActiveThreats();
    setThreats(threatsData);

    const vulnsData = await VulnerabilityManager.scanForVulnerabilities('system');
    setVulnerabilities(vulnsData);

    const updatesData = await AutoUpdateSystem.checkForUpdates();
    setUpdates(updatesData);

    const techData = await TechnologyEvolutionTracker.fetchLatestTrends();
    setTechnologies(techData);
  };

  const handleSelfHeal = async () => {
    setIsHealing(true);
    const result = await SelfHealingSystem.heal();
    setHealingLog(result);
    await loadAllData();
    setIsHealing(false);
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'adopt': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'monitor': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'research': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'avoid': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden border border-cyan-500/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Kendini Geliştiren Güvenlik Altyapısı
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/50">AKTİF</span>
              </h2>
              <p className="text-slate-400 text-sm">Zero-Trust • AI Destekli • Otomatik Koruma</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelfHeal}
              disabled={isHealing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isHealing ? 'animate-spin' : ''}`} />
              {isHealing ? 'İyileştiriliyor...' : 'Self-Heal'}
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 p-4 bg-slate-800/50 border-b border-slate-700">
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Shield className="h-3 w-3" />
                <span>Risk Skoru</span>
              </div>
              <p className="text-2xl font-bold text-white">{metrics.riskScore.toFixed(1)}</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <AlertTriangle className="h-3 w-3" />
                <span>Tehdit Engellendi</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{metrics.threatsBlocked}</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Bug className="h-3 w-3" />
                <span>Açıklar Yamanlandı</span>
              </div>
              <p className="text-2xl font-bold text-cyan-400">{metrics.vulnerabilitiesPatched}</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Activity className="h-3 w-3" />
                <span>Uptime</span>
              </div>
              <p className="text-2xl font-bold text-white">{metrics.uptime.toFixed(2)}%</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <CheckCircle className="h-3 w-3" />
                <span>Uyumluluk</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{metrics.complianceScore.toFixed(1)}%</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Brain className="h-3 w-3" />
                <span>AI Güveni</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">{metrics.aiConfidence.toFixed(1)}%</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Clock className="h-3 w-3" />
                <span>Son Olay</span>
              </div>
              <p className="text-lg font-bold text-white">{metrics.lastIncident ? 'Yeni' : 'Yok'}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 p-4 bg-slate-900/50 border-b border-slate-800">
          {[
            { id: 'overview', label: 'Genel Bakış', icon: Eye },
            { id: 'threats', label: 'Tehditler', icon: AlertTriangle },
            { id: 'vulnerabilities', label: 'Açıklar', icon: Bug },
            { id: 'updates', label: 'Güncellemeler', icon: Download },
            { id: 'technology', label: 'Teknoloji Takip', icon: TrendingUp },
            { id: 'zerotrust', label: 'Zero-Trust', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 280px)' }}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Self-Healing Log */}
              {healingLog && (
                <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-5 border border-green-500/30">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Self-Healing Sonuçları
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      < p className="text-green-400 text-sm font-semibold mb-2">Düzeltildi:</p>
                      <ul className="space-y-1">
                        {healingLog.fixed.map((item, idx) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-400 text-sm font-semibold mb-2">Bekleyen:</p>
                      <ul className="space-y-1">
                        {healingLog.remaining.length > 0 ? healingLog.remaining.map((item, idx) => (
                          <li key={idx} className="text-slate-400 text-sm flex items-center gap-2">
                            <Clock className="h-3 w-3 text-yellow-400" />
                            {item}
                          </li>
                        )) : <li className="text-green-400 text-sm">Tüm sorunlar çözüldü!</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-xl p-5 border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-cyan-400 font-semibold">Tehdit Koruması</h4>
                    <Shield className="h-5 w-5 text-cyan-400" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{threats.filter(t => t.status === 'blocked').length}</p>
                  <p className="text-slate-400 text-sm">Aktif tehdit engellendi</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Kritik: {threats.filter(t => t.level === 'critical').length}</span>
                    <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">Yüksek: {threats.filter(t => t.level === 'high').length}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-5 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-purple-400 font-semibold">Açık Taraması</h4>
                    <Bug className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{vulnerabilities.filter(v => !v.patched).length}</p>
                  <p className="text-slate-400 text-sm">Yamanmamış açık</p>
                  <div className="mt-3">
                    <p className="text-green-400 text-xs">Yamanlanmış: {vulnerabilities.filter(v => v.patched).length}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl p-5 border border-green-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-green-400 font-semibold">Teknoloji Güncelliği</h4>
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{technologies.filter(t => t.recommendation === 'adopt').length}</p>
                  <p className="text-slate-400 text-sm">Benimsenmesi önerilen teknoloji</p>
                  <div className="mt-3">
                    <p className="text-blue-400 text-xs">İzlenmeli: {technologies.filter(t => t.recommendation === 'monitor').length}</p>
                  </div>
                </div>
              </div>

              {/* Technology Gap Analysis */}
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-400" />
                  Teknoloji Gelişim Analizi
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {technologies.slice(0, 4).map((tech, idx) => (
                    <div key={idx} className="bg-slate-800/80 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">{tech.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${getRecommendationColor(tech.recommendation)}`}>
                          {tech.recommendation.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-400">
                        <p>Büyüme: <span className="text-green-400">{tech.growth}%</span></p>
                        <p>Benimsenme: <span className="text-cyan-400">{tech.adoption}%</span></p>
                        <p>Risk: <span className="text-yellow-400">{tech.risk}%</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'threats' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Aktif Tehditler</h3>
                <button
                  onClick={async () => {
                    const threat = await ThreatDetectionEngine.detectThreat({ ip: '192.168.1.' + Math.floor(Math.random() * 255) });
                    if (threat) setThreats([...threats, threat]);
                  }}
                  className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm rounded-lg border border-red-500/30 transition-all"
                >
                  Simülasyon Tehdidi
                </button>
              </div>
              <div className="space-y-3">
                {threats.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-400" />
                    <p>Aktif tehdit yok - Sistem güvenli</p>
                  </div>
                ) : (
                  threats.map((threat) => (
                    <div
                      key={threat.id}
                      className={`bg-slate-800/80 rounded-xl p-4 border ${getThreatLevelColor(threat.level)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5" />
                          <div>
                            <p className="text-white font-semibold">{threat.type.toUpperCase()}</p>
                            <p className="text-xs opacity-75">{threat.source} • {threat.timestamp.toLocaleString('tr-TR')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            threat.status === 'blocked' ? 'bg-green-500/20 text-green-400' :
                            threat.status === 'analyzing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {threat.status.toUpperCase()}
                          </span>
                          {threat.status !== 'blocked' && (
                            <button
                              onClick={() => {
                                ThreatDetectionEngine.blockThreat(threat.id);
                                setThreats([...threats]);
                              }}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded"
                            >
                              Engelle
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'vulnerabilities' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Açık Tarama Sonuçları</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-xs border-b border-slate-700">
                      <th className="p-3 text-left">CVE ID</th>
                      <th className="p-3 text-left">CVSS</th>
                      <th className="p-3 text-left">Etkilenen</th>
                      <th className="p-3 text-left">Exploit</th>
                      <th className="p-3 text-left">Durum</th>
                      <th className="p-3 text-left">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vulnerabilities.map((vuln, idx) => (
                      <tr key={idx} className={`border-b border-slate-800 ${vuln.patched ? 'bg-green-900/10' : 'bg-red-900/10'}`}>
                        <td className="p-3 text-white font-mono text-sm">{vuln.cveId}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            vuln.cvss >= 9 ? 'bg-red-500/20 text-red-400' :
                            vuln.cvss >= 7 ? 'bg-orange-500/20 text-orange-400' :
                            vuln.cvss >= 4 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {vuln.cvss.toFixed(1)}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300 text-sm">{vuln.affected.join(', ')}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            vuln.exploitLevel === 'active' ? 'bg-red-500/20 text-red-400' :
                            vuln.exploitLevel === 'poc' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {vuln.exploitLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3">
                          {vuln.patched ? (
                            <span className="flex items-center gap-1 text-green-400 text-sm">
                              <CheckCircle className="h-4 w-4" /> Yamanlandı
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-400 text-sm">
                              <AlertCircle className="h-4 w-4" /> Açık
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {!vuln.patched && (
                            <button
                              onClick={async () => {
                                await VulnerabilityManager.patchVulnerability(vuln.cveId);
                                setVulnerabilities([...vulnerabilities]);
                              }}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-xs rounded"
                            >
                              Yamala
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Bekleyen Güncellemeler</h3>
              <div className="space-y-3">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className={`bg-slate-800/80 rounded-xl p-4 border ${
                      update.priority === 'critical' ? 'border-red-500/50' :
                      update.priority === 'high' ? 'border-orange-500/50' :
                      'border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            update.type === 'security' ? 'bg-red-500/20 text-red-400' :
                            update.type === 'performance' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {update.type.toUpperCase()}
                          </span>
                          <span className="text-slate-400 text-xs">v{update.version}</span>
                          {update.priority === 'critical' && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded animate-pulse">KRİTİK</span>
                          )}
                        </div>
                        <p className="text-white font-semibold">{update.description}</p>
                        {update.changelog && (
                          <ul className="mt-2 space-y-1">
                            {update.changelog.map((item, idx) => (
                              <li key={idx} className="text-slate-400 text-xs flex items-center gap-2">
                                <ArrowUpRight className="h-3 w-3 text-cyan-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="text-right">
                        {update.installed ? (
                          <span className="flex items-center gap-1 text-green-400 text-sm">
                            <CheckCircle className="h-4 w-4" /> Kurulu
                          </span>
                        ) : (
                          <button
                            onClick={async () => {
                              await AutoUpdateSystem.installUpdate(update.id);
                              setUpdates([...updates]);
                            }}
                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm rounded-lg flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Kur
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Teknoloji Gelişim Takibi</h3>
              <p className="text-slate-400 text-sm">Dünya standartlarını takip ederek altyapınızı sürekli güncelleyin</p>
              <div className="grid md:grid-cols-2 gap-4">
                {technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className={`bg-slate-800/80 rounded-xl p-4 border ${getRecommendationColor(tech.recommendation)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {tech.category === 'ai' && <Brain className="h-5 w-5 text-purple-400" />}
                        {tech.category === 'security' && <Shield className="h-5 w-5 text-cyan-400" />}
                        {tech.category === 'blockchain' && <Database className="h-5 w-5 text-orange-400" />}
                        {tech.category === 'web' && <Globe className="h-5 w-5 text-blue-400" />}
                        {tech.category === 'quantum' && <Cpu className="h-5 w-5 text-pink-400" />}
                        <span className="text-white font-semibold">{tech.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${getRecommendationColor(tech.recommendation)}`}>
                        {tech.recommendation.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mb-3">{tech.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-slate-900/50 rounded p-2 text-center">
                        <p className="text-slate-500">Büyüme</p>
                        <p className="text-green-400 font-bold flex items-center justify-center gap-1">
                          <ArrowUpRight className="h-3 w-3" />
                          {tech.growth}%
                        </p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-2 text-center">
                        <p className="text-slate-500">Benimsenme</p>
                        <p className="text-cyan-400 font-bold">{tech.adoption}%</p>
                      </div>
                      <div className="bg-slate-900/50 rounded p-2 text-center">
                        <p className="text-slate-500">Risk</p>
                        <p className="text-yellow-400 font-bold">{tech.risk}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'zerotrust' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Zero-Trust Erişim Kontrolü</h3>
              <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-xl p-6 border border-cyan-500/30">
                <h4 className="text-cyan-400 font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Doğrulama Faktörleri
                </h4>
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { name: 'Biyometrik', icon: Eye, status: true },
                    { name: 'MFA', icon: Shield, status: true },
                    { name: 'Cihaz', icon: Server, status: false },
                    { name: 'Davranış', icon: Activity, status: true },
                    { name: 'Konum', icon: Wifi, status: false },
                  ].map((factor, idx) => (
                    <div key={idx} className={`bg-slate-800/80 rounded-lg p-4 border ${factor.status ? 'border-green-500/50' : 'border-red-500/50'}`}>
                      <factor.icon className={`h-6 w-6 mb-2 ${factor.status ? 'text-green-400' : 'text-red-400'}`} />
                      <p className="text-white text-sm">{factor.name}</p>
                      <p className={`text-xs ${factor.status ? 'text-green-400' : 'text-red-400'}`}>
                        {factor.status ? 'Doğrulandı' : 'Bekliyor'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Güven Skoru Hesaplama
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-slate-700 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-green-500 to-cyan-500 h-4 rounded-full"
                      style={{ width: '80%' }}
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">80%</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">Minimum erişim için %60 güven skoru gereklidir</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 border-t border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3" /> Auto-Heal Aktif
            </span>
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Zero-Trust
            </span>
            <span className="flex items-center gap-1">
              <Brain className="h-3 w-3" /> AI Destekli
            </span>
          </div>
          <button
            onClick={loadAllData}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Tazele
          </button>
        </div>
      </div>
    </div>
  );
};
