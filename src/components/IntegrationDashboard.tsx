import React, { useState, useEffect } from 'react';
import {
  X, RefreshCw, CheckCircle, AlertTriangle, XCircle, Clock,
  Server, Database, Cloud, Webhook, Link2, Activity, Shield,
  Play, Pause, Settings, TrendingUp, AlertCircle, FileText,
  ChevronDown, ChevronUp, Eye, Zap, Globe, Lock, Unlock
} from 'lucide-react';
import {
  ERPService,
  CRMService,
  SOAPService,
  RESTService,
  WebhookService,
  IntegrationManager,
  type ERPSystem,
  type CRMSystem,
  type SOAPService as SOAPServiceType,
  type RESTService as RESTServiceType,
  type WebhookConfig,
  type SyncJob,
  type IntegrationVerification,
  type IntegrationStats,
  type IntegrationType,
} from '../services/integrationService';

interface IntegrationDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActiveTab = 'overview' | 'erp' | 'crm' | 'soap' | 'rest' | 'webhooks' | 'sync' | 'verification';

export const IntegrationDashboard: React.FC<IntegrationDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [stats, setStats] = useState<IntegrationStats | null>(null);
  const [erpSystems, setErpSystems] = useState<ERPSystem[]>([]);
  const [crmSystems, setCrmSystems] = useState<CRMSystem[]>([]);
  const [soapServices, setSoapServices] = useState<SOAPServiceType[]>([]);
  const [restServices, setRestServices] = useState<RESTServiceType[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([]);
  const [verifications, setVerifications] = useState<IntegrationVerification[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isVerifying, setIsVerifying] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = () => {
    setStats(IntegrationManager.getStats());
    setErpSystems(ERPService.getAll());
    setCrmSystems(CRMService.getAll());
    setSoapServices(SOAPService.getAll());
    setRestServices(RESTService.getAll());
    setWebhooks(WebhookService.getAll());
    setSyncJobs(IntegrationManager.getSyncJobs());
    setVerifications(IntegrationManager.getVerifications());
  };

  const runVerification = async (id: string, type: IntegrationType) => {
    setIsVerifying(id);
    await IntegrationManager.verify(id, type);
    setVerifications(IntegrationManager.getVerifications());
    setIsVerifying(null);
  };

  const startSync = async (id: string, type: IntegrationType) => {
    await IntegrationManager.startSync(id, type);
    setSyncJobs(IntegrationManager.getSyncJobs());
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'synced':
      case 'passed':
      case 'completed':
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'syncing':
      case 'running':
      case 'pending':
      case 'scheduled':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'error':
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'inactive':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'synced':
      case 'passed':
      case 'completed':
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'syncing':
      case 'running':
        return <RefreshCw className="h-4 w-4 text-yellow-400 animate-spin" />;
      case 'pending':
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'error':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden border border-cyan-500/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Link2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">ERP, CRM, SOAP/REST Entegrasyonları</h2>
              <p className="text-slate-400 text-sm">Sistematik doğrulama ve iş akışı yönetimi</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 p-4 bg-slate-800/50 border-b border-slate-700">
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700 text-center">
              <p className="text-lg font-bold text-white">{stats.totalIntegrations}</p>
              <p className="text-[10px] text-slate-400">Toplam</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-green-500/30 text-center">
              <p className="text-lg font-bold text-green-400">{stats.activeIntegrations}</p>
              <p className="text-[10px] text-slate-400">Aktif</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700 text-center">
              <p className="text-lg font-bold text-white">{stats.runningSyncJobs}</p>
              <p className="text-[10px] text-slate-400">Çalışıyor</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700 text-center">
              <p className="text-lg font-bold text-white">{stats.totalRecordsProcessed.toLocaleString()}</p>
              <p className="text-[10px] text-slate-400">Kayıt</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700 text-center">
              <p className="text-lg font-bold text-white">{stats.averageResponseTime}ms</p>
              <p className="text-[10px] text-slate-400">Ort. Yanıt</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-green-500/30 text-center">
              <p className="text-lg font-bold text-green-400">{stats.uptime}%</p>
              <p className="text-[10px] text-slate-400">Uptime</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-yellow-500/30 text-center">
              <p className="text-lg font-bold text-yellow-400">{syncJobs.filter(j => j.status === 'running').length}</p>
              <p className="text-[10px] text-slate-400">Sync</p>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-cyan-500/30 text-center">
              <p className="text-lg font-bold text-cyan-400">{verifications.length}</p>
              <p className="text-[10px] text-slate-400">Doğrulama</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 p-4 bg-slate-900/50 border-b border-slate-800">
          {[
            { id: 'overview', label: 'Genel', icon: Activity },
            { id: 'erp', label: 'ERP', icon: Database },
            { id: 'crm', label: 'CRM', icon: Server },
            { id: 'soap', label: 'SOAP', icon: Globe },
            { id: 'rest', label: 'REST', icon: Cloud },
            { id: 'webhooks', label: 'Webhooks', icon: Webhook },
            { id: 'sync', label: 'Sync Jobs', icon: RefreshCw },
            { id: 'verification', label: 'Doğrulama', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 280px)' }}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-5 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-400 font-semibold">ERP Sistemleri</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{erpSystems.length}</p>
                  <p className="text-slate-400 text-sm">Aktif entegrasyon</p>
                  <div className="mt-3 space-y-1">
                    {erpSystems.slice(0, 2).map(erp => (
                      <div key={erp.id} className="flex items-center gap-2 text-xs">
                        {getStatusIcon(erp.status)}
                        <span className="text-slate-300">{erp.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-5 border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Server className="h-5 w-5 text-purple-400" />
                    <span className="text-purple-400 font-semibold">CRM Sistemleri</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{crmSystems.length}</p>
                  <p className="text-slate-400 text-sm">Aktif entegrasyon</p>
                  <div className="mt-3 space-y-1">
                    {crmSystems.slice(0, 2).map(crm => (
                      <div key={crm.id} className="flex items-center gap-2 text-xs">
                        {getStatusIcon(crm.status)}
                        <span className="text-slate-300">{crm.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-xl p-5 border border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Webhook className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">API & Webhooks</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{restServices.length + webhooks.length}</p>
                  <p className="text-slate-400 text-sm">REST + Webhooks</p>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Cloud className="h-3 w-3 text-cyan-400" />
                      {restServices.length} REST API
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Webhook className="h-3 w-3 text-orange-400" />
                      {webhooks.length} Webhook
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyan-400" />
                  Son Aktiviteler
                </h3>
                <div className="space-y-3">
                  {[
                    { time: '2 dk önce', event: 'Salesforce sync tamamlandı', type: 'success', icon: CheckCircle },
                    { time: '15 dk önce', event: 'SAP Finance modülü doğrulandı', type: 'success', icon: Shield },
                    { time: '30 dk önce', event: 'Payment Gateway API çağrısı', type: 'info', icon: Cloud },
                    { time: '1 saat önce', event: 'Legacy SOAP service timeout', type: 'warning', icon: AlertTriangle },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-800/80 rounded-lg">
                      <activity.icon className={`h-4 w-4 ${
                        activity.type === 'success' ? 'text-green-400' :
                        activity.type === 'warning' ? 'text-yellow-400' :
                        'text-cyan-400'
                      }`} />
                      <span className="text-slate-300 text-sm flex-1">{activity.event}</span>
                      <span className="text-slate-500 text-xs">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'erp' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">ERP Sistemleri</h3>
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5" />
                  Yeni ERP
                </button>
              </div>
              {erpSystems.map((erp) => (
                <div key={erp.id} className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => toggleExpanded(erp.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="text-white font-semibold">{erp.name}</p>
                          <p className="text-slate-400 text-xs">{erp.type} • {erp.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(erp.status)}`}>
                          {erp.status.toUpperCase()}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); startSync(erp.id, 'ERP'); }}
                          className="p-1.5 hover:bg-slate-600 rounded transition-colors"
                        >
                          <RefreshCw className="h-4 w-4 text-slate-400" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); runVerification(erp.id, 'ERP'); }}
                          className="p-1.5 hover:bg-slate-600 rounded transition-colors"
                        >
                          <Shield className={`h-4 w-4 ${isVerifying === erp.id ? 'text-yellow-400 animate-pulse' : 'text-slate-400'}`} />
                        </button>
                        {expandedItems.has(erp.id) ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                  </div>
                  {expandedItems.has(erp.id) && (
                    <div className="border-t border-slate-700 p-4 bg-slate-800/50">
                      <h4 className="text-sm font-semibold text-white mb-3">Modüller</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {erp.modules.map((module) => (
                          <div key={module.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-white">{module.name}</span>
                              <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(module.syncStatus)}`}>
                                {module.syncStatus}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-400">
                              <span>{module.recordsProcessed.toLocaleString()} kayıt</span>
                              {module.errors > 0 && <span className="text-red-400">{module.errors} hata</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Endpoint</p>
                          <p className="text-slate-300 truncate">{erp.endpoint}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Doğrulama</p>
                          <p className="text-emerald-400">{erp.verificationLevel}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Son Sync</p>
                          <p className="text-slate-300">{erp.lastSync ? erp.lastSync.toLocaleString('tr-TR') : 'Yok'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">CRM Sistemleri</h3>
                <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-lg flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5" />
                  Yeni CRM
                </button>
              </div>
              {crmSystems.map((crm) => (
                <div key={crm.id} className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => toggleExpanded(crm.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-white font-semibold">{crm.name}</p>
                          <p className="text-slate-400 text-xs">{crm.type} • {crm.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(crm.status)}`}>
                          {crm.status.toUpperCase()}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); startSync(crm.id, 'CRM'); }}
                          className="p-1.5 hover:bg-slate-600 rounded transition-colors"
                        >
                          <RefreshCw className="h-4 w-4 text-slate-400" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); runVerification(crm.id, 'CRM'); }}
                          className="p-1.5 hover:bg-slate-600 rounded transition-colors"
                        >
                          <Shield className={`h-4 w-4 ${isVerifying === crm.id ? 'text-yellow-400 animate-pulse' : 'text-slate-400'}`} />
                        </button>
                        {expandedItems.has(crm.id) ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                  </div>
                  {expandedItems.has(crm.id) && (
                    <div className="border-t border-slate-700 p-4 bg-slate-800/50">
                      <h4 className="text-sm font-semibold text-white mb-3">Entity'ler</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {crm.entities.map((entity) => (
                          <div key={entity.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="text-sm text-white">{entity.displayName}</span>
                                <span className="text-slate-500 text-xs ml-2">({entity.name})</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {!entity.enabled && <span className="text-slate-500 text-xs">Devre Dışı</span>}
                                <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(entity.syncStatus)}`}>
                                  {entity.syncStatus}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-slate-400">
                              {entity.recordCount.toLocaleString()} kayıt
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid md:grid-cols-3 gap-3 text-xs">
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Endpoint</p>
                          <p className="text-slate-300 truncate">{crm.endpoint}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Sync Interval</p>
                          <p className="text-slate-300">{crm.syncInterval} dk</p>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Son Sync</p>
                          <p className="text-slate-300">{crm.lastSync ? crm.lastSync.toLocaleString('tr-TR') : 'Yok'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'soap' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">SOAP Servisleri</h3>
              {soapServices.map((soap) => (
                <div key={soap.id} className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => toggleExpanded(soap.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-orange-400" />
                        <div>
                          <p className="text-white font-semibold">{soap.name}</p>
                          <p className="text-slate-400 text-xs">{soap.namespace}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(soap.status)}`}>
                          {soap.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded border border-orange-500/30">
                          {soap.operations.length} Ops
                        </span>
                        {expandedItems.has(soap.id) ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                  </div>
                  {expandedItems.has(soap.id) && (
                    <div className="border-t border-slate-700 p-4 bg-slate-800/50">
                      <h4 className="text-sm font-semibold text-white mb-3">Operations</h4>
                      <div className="space-y-2">
                        {soap.operations.map((op) => (
                          <div key={op.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="text-white font-medium">{op.name}</span>
                                <p className="text-slate-400 text-xs">{op.description}</p>
                              </div>
                              <div className="text-right text-xs">
                                <p className="text-slate-300">{op.callCount.toLocaleString()} çağrı</p>
                                <p className="text-slate-400">{op.avgResponseTime}ms ort.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-slate-500">Input: {op.inputType}</span>
                              <span className="text-slate-500">Output: {op.outputType}</span>
                              {op.errors > 0 && <span className="text-red-400">{op.errors} hata</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 bg-slate-900/50 rounded p-2 border border-slate-700 text-xs">
                        <p className="text-slate-400">WSDL</p>
                        <p className="text-slate-300 truncate">{soap.wsdlUrl}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rest' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">REST API'ler</h3>
                <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded-lg flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5" />
                  Yeni API
                </button>
              </div>
              {restServices.map((rest) => (
                <div key={rest.id} className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => toggleExpanded(rest.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cloud className="h-5 w-5 text-cyan-400" />
                        <div>
                          <p className="text-white font-semibold">{rest.name}</p>
                          <p className="text-slate-400 text-xs truncate max-w-xs">{rest.baseUrl}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(rest.status)}`}>
                          {rest.status.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded border border-cyan-500/30">
                          {rest.endpoints.length} EP
                        </span>
                        {expandedItems.has(rest.id) ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>
                    </div>
                  </div>
                  {expandedItems.has(rest.id) && (
                    <div className="border-t border-slate-700 p-4 bg-slate-800/50">
                      <h4 className="text-sm font-semibold text-white mb-3">Endpoints</h4>
                      <div className="space-y-2">
                        {rest.endpoints.map((ep) => (
                          <div key={ep.id} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                                  ep.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                                  ep.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                                  ep.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                                  ep.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                                  'bg-purple-500/20 text-purple-400'
                                }`}>
                                  {ep.method}
                                </span>
                                <span className="text-slate-300 text-sm font-mono">{ep.path}</span>
                              </div>
                              <div className="text-xs text-slate-400">
                                {ep.callCount.toLocaleString()} çağrı • {ep.avgResponseTime}ms
                              </div>
                            </div>
                            <p className="text-slate-400 text-xs">{ep.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Auth Type</p>
                          <p className="text-slate-300">{rest.authentication.type}</p>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                          <p className="text-slate-400">Rate Limit</p>
                          <p className="text-slate-300">{rest.rateLimit.requests}/{rest.rateLimit.period}s</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'webhooks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Webhooks</h3>
                <button className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs rounded-lg flex items-center gap-1.5">
                  <Webhook className="h-3.5 w-3.5" />
                  Yeni Webhook
                </button>
              </div>
              {webhooks.map((wh) => (
                <div key={wh.id} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Webhook className="h-5 w-5 text-orange-400" />
                      <div>
                        <p className="text-white font-semibold">{wh.name}</p>
                        <p className="text-slate-400 text-xs truncate max-w-sm">{wh.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs border ${wh.active ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-slate-500/20 text-slate-400 border-slate-500/50'}`}>
                        {wh.active ? 'AKTİF' : 'PASİF'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {wh.events.map((event, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
                        {event}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="h-3 w-3" />
                      {wh.successCount.toLocaleString()} başarılı
                    </span>
                    {wh.failureCount > 0 && (
                      <span className="flex items-center gap-1 text-red-400">
                        <XCircle className="h-3 w-3" />
                        {wh.failureCount} hata
                      </span>
                    )}
                    <span>•</span>
                    <span>Son: {wh.lastTriggered ? wh.lastTriggered.toLocaleString('tr-TR') : 'Yok'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'sync' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Sync Jobs</h3>
                <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg flex items-center gap-1.5">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Tazele
                </button>
              </div>
              {syncJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-slate-400">Henüz sync job yok</p>
                  <p className="text-slate-500 text-sm">Bir entegrasyonu sync etmek için Refresh butonuna tıklayın</p>
                </div>
              ) : (
                syncJobs.map((job) => (
                  <div key={job.id} className={`bg-slate-800/80 rounded-xl p-4 border ${
                    job.status === 'running' ? 'border-yellow-500/30' :
                    job.status === 'completed' ? 'border-green-500/30' :
                    job.status === 'failed' ? 'border-red-500/30' :
                    'border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="text-white font-semibold">{job.name}</p>
                          <p className="text-slate-400 text-xs">{job.id} • {job.integrationType}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(job.status)}`}>
                        {job.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            job.status === 'completed' ? 'bg-green-500' :
                            job.status === 'failed' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-xs text-slate-400">
                      <span>{job.recordsProcessed.toLocaleString()} / {job.recordsTotal.toLocaleString()} kayıt</span>
                      {job.recordsFailed > 0 && <span className="text-red-400">{job.recordsFailed} hata</span>}
                      <span>•</span>
                      <span>Başlangıç: {job.startedAt?.toLocaleString('tr-TR') || '-'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Doğrulama Sonuçları</h3>
                <button
                  onClick={() => { runVerification('ALL', 'ERP'); }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg flex items-center gap-1.5"
                >
                  <Shield className="h-3.5 w-3.5" />
                  Tümünü Doğrula
                </button>
              </div>
              {verifications.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                  <p className="text-slate-400">Henüz doğrulama yapılmadı</p>
                  <p className="text-slate-500 text-sm">Doğrulama için Shield butonuna tıklayın</p>
                </div>
              ) : (
                verifications.map((v) => (
                  <div key={v.id} className={`bg-slate-800/80 rounded-xl p-4 border ${
                    v.overallStatus === 'passed' ? 'border-green-500/30' :
                    v.overallStatus === 'warning' ? 'border-yellow-500/30' :
                    'border-red-500/30'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(v.overallStatus)}
                        <div>
                          <p className="text-white font-semibold">
                            {erpSystems.find(e => e.id === v.integrationId)?.name ||
                              crmSystems.find(c => c.id === v.integrationId)?.name ||
                              v.integrationId}
                          </p>
                          <p className="text-slate-400 text-xs">{v.integrationType} • Level: {v.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${
                          v.score >= 90 ? 'text-green-400' :
                          v.score >= 70 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {v.score.toFixed(0)}%
                        </p>
                        <p className="text-slate-400 text-xs">Score</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {v.checks.map((check) => (
                        <div key={check.id} className={`bg-slate-900/50 rounded-lg p-2 border ${
                          check.status === 'passed' ? 'border-green-500/20' :
                          check.status === 'warning' ? 'border-yellow-500/20' :
                          check.status === 'failed' ? 'border-red-500/20' :
                          'border-slate-700'
                        }`}>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(check.status)}
                            <span className="text-xs text-white">{check.name}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{check.message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-slate-400">
                      Sonraki doğrulama: {v.nextVerification.toLocaleString('tr-TR')}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900/95 border-t border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Enterprise Grade
            </span>
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> TLS 1.3
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-3 w-3" /> Real-time Sync
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
