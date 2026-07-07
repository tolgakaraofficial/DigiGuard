import React, { useState, useEffect, useCallback } from 'react';
import {
  X, Server, Layers, Shield, Zap, Activity, DollarSign,
  Building2, Key, CheckCircle, AlertTriangle, Clock,
  TrendingUp, TrendingDown, Cpu, Globe, Lock, ChevronRight,
  Plus, Copy, RefreshCw, Eye, EyeOff, Network, Gauge,
} from 'lucide-react';
import {
  fetchServices, fetchTiers, fetchTenants, fetchTenantSubscriptions,
  fetchSlaMetrics, fetchGatewayLogs, createTenant, updateTenantStatus,
  subscribeTenantToService, generateApiKey,
  type CorporateService, type ServiceTier, type CorporateTenant,
  type TenantSubscription, type SlaMetric, type ApiGatewayLog,
} from '../services/corporateServiceService';

interface CorporateServicePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'catalog' | 'tiers' | 'tenants' | 'sla';

const LAYER_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  SOPON: { bg: 'bg-cyan-900/20', border: 'border-cyan-500/40', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  SUPON: { bg: 'bg-purple-900/20', border: 'border-purple-500/40', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  SOFT10: { bg: 'bg-emerald-900/20', border: 'border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  CROSS_LAYER: { bg: 'bg-amber-900/20', border: 'border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  identity: Shield,
  security: Lock,
  certification: CheckCircle,
  ai_analysis: Cpu,
  integration: Network,
  monitoring: Activity,
};

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  trial: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  suspended: 'bg-red-500/20 text-red-300 border-red-500/30',
  expired: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

export const CorporateServicePanel: React.FC<CorporateServicePanelProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<Tab>('catalog');
  const [services, setServices] = useState<CorporateService[]>([]);
  const [tiers, setTiers] = useState<ServiceTier[]>([]);
  const [tenants, setTenants] = useState<CorporateTenant[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<CorporateTenant | null>(null);
  const [subscriptions, setSubscriptions] = useState<TenantSubscription[]>([]);
  const [slaMetrics, setSlaMetrics] = useState<SlaMetric[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<ApiGatewayLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantEmail, setNewTenantEmail] = useState('');
  const [newTenantTier, setNewTenantTier] = useState('');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [svc, t, tn] = await Promise.all([fetchServices(), fetchTiers(), fetchTenants()]);
    setServices(svc);
    setTiers(t);
    setTenants(tn);
    if (tn.length > 0 && !selectedTenant) setSelectedTenant(tn[0]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen, loadData]);

  useEffect(() => {
    if (!selectedTenant) return;
    (async () => {
      const [subs, sla, logs] = await Promise.all([
        fetchTenantSubscriptions(selectedTenant.id),
        fetchSlaMetrics(selectedTenant.id, 7),
        fetchGatewayLogs(20),
      ]);
      setSubscriptions(subs);
      setSlaMetrics(sla);
      setGatewayLogs(logs);
    })();
  }, [selectedTenant]);

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyKey = (key: string, id: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddTenant = async () => {
    if (!newTenantName.trim() || !newTenantTier) return;
    const tenant = await createTenant({
      company_name: newTenantName.trim(),
      contact_email: newTenantEmail.trim() || undefined,
      tier_id: newTenantTier,
    });
    if (tenant) {
      setShowAddTenant(false);
      setNewTenantName('');
      setNewTenantEmail('');
      setNewTenantTier('');
      await loadData();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await updateTenantStatus(id, status);
    await loadData();
  };

  const maskKey = (key: string) => {
    if (key.length < 12) return key;
    return `${key.substring(0, 10)}${'*'.repeat(16)}${key.substring(key.length - 4)}`;
  };

  if (!isOpen) return null;

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'catalog', label: 'Servis Kataloğu', icon: Layers },
    { key: 'tiers', label: 'Paket & Fiyatlandırma', icon: DollarSign },
    { key: 'tenants', label: 'Kurumsal Müşteriler', icon: Building2 },
    { key: 'sla', label: 'SLA & API Gateway', icon: Gauge },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 min-h-full p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30">
              <Server className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Kurumsal Servis Mimarisi</h2>
              <p className="text-xs text-slate-400">Corporate Service Architecture — SOPON / SUPON / SOFT 10 katmanlı servis yönetimi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
          >
            <X className="h-5 w-5 text-slate-300" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Aktif Servisler', value: services.length, icon: Layers, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
            { label: 'Paket Seviyeleri', value: tiers.length, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Kurumsal Müşteri', value: tenants.length, icon: Building2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            {
              label: 'Bu Ay API Çağrısı',
              value: tenants.reduce((s, t) => s + (t.total_api_calls_this_month || 0), 0).toLocaleString('tr-TR'),
              icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10',
            },
          ].map((s, i) => (
            <div key={i} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.key
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* TAB: Service Catalog */}
            {tab === 'catalog' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((svc) => {
                  const lc = LAYER_COLORS[svc.layer] || LAYER_COLORS.CROSS_LAYER;
                  const CatIcon = CATEGORY_ICONS[svc.service_category] || Server;
                  return (
                    <div key={svc.id} className={`rounded-xl border ${lc.border} ${lc.bg} p-5 hover:scale-[1.02] transition-transform`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-lg ${lc.badge} border`}>
                            <CatIcon className={`h-5 w-5 ${lc.text}`} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{svc.service_name}</h4>
                            <p className="text-[10px] text-slate-500 font-mono">{svc.service_code}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-1 rounded border ${lc.badge}`}>{svc.layer}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-4 leading-relaxed">{svc.service_description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 uppercase">Aylık Taban</span>
                          <p className="text-lg font-bold text-white">${svc.base_price_monthly.toFixed(0)}<span className="text-xs text-slate-500">/ay</span></p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 uppercase">Çağrı Başına</span>
                          <p className="text-sm font-semibold text-cyan-400">${svc.price_per_call.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <span className={`text-[10px] uppercase tracking-wider ${lc.text}`}>{svc.service_category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: Tiers & Pricing */}
            {tab === 'tiers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tiers.map((tier, idx) => {
                  const isPopular = tier.tier_code === 'PROFESSIONAL';
                  const isEnterprise = tier.tier_code === 'ENTERPRISE';
                  return (
                    <div key={tier.id} className={`relative rounded-2xl border p-6 ${
                      isEnterprise ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-900/20 to-slate-900/40' :
                      isPopular ? 'border-emerald-500/50 bg-gradient-to-b from-emerald-900/20 to-slate-900/40' :
                      'border-slate-700/50 bg-slate-900/40'
                    }`}>
                      {isEnterprise && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                          EN YÜKSEK
                        </div>
                      )}
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                          POPÜLER
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-white">{tier.tier_name}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">{tier.tier_description}</p>
                      </div>
                      <div className="text-center mb-5">
                        {tier.monthly_price_usd > 0 ? (
                          <>
                            <span className="text-3xl font-bold text-white">${tier.monthly_price_usd.toFixed(0)}</span>
                            <span className="text-sm text-slate-500">/ay</span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-cyan-400">Özel Teklif</span>
                        )}
                      </div>
                      <div className="space-y-2.5 mb-5">
                        {[
                          { icon: Activity, label: `${tier.max_api_calls_per_month.toLocaleString('tr-TR')} API çağrısı/ay` },
                          { icon: Zap, label: `${tier.max_concurrent_requests} eşzamanlı istek` },
                          { icon: Gauge, label: `%${tier.sla_uptime_percent} uptime SLA` },
                          { icon: Clock, label: `${tier.sla_response_time_ms}ms yanıt süresi` },
                          { icon: Shield, label: tier.sla_support_hours },
                        ].map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <f.icon className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                            <span>{f.label}</span>
                          </div>
                        ))}
                      </div>
                      {tier.features && tier.features.length > 0 && (
                        <div className="pt-4 border-t border-slate-700/50">
                          <p className="text-[10px] text-slate-500 uppercase mb-2">Dahil Edilen Özellikler</p>
                          <div className="flex flex-wrap gap-1.5">
                            {tier.features.map((f, i) => (
                              <span key={i} className="text-[10px] px-2 py-1 bg-slate-800/60 text-slate-300 rounded border border-slate-700/50">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: Tenants */}
            {tab === 'tenants' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-300">Kurumsal Müşteri Kayıtları</h3>
                  <button
                    onClick={() => setShowAddTenant(!showAddTenant)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Yeni Müşteri
                  </button>
                </div>

                {showAddTenant && (
                  <div className="mb-4 p-4 bg-slate-900/60 rounded-xl border border-cyan-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Şirket Adı"
                        value={newTenantName}
                        onChange={(e) => setNewTenantName(e.target.value)}
                        className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 text-sm focus:outline-none focus:border-cyan-500/50"
                      />
                      <input
                        type="email"
                        placeholder="E-posta"
                        value={newTenantEmail}
                        onChange={(e) => setNewTenantEmail(e.target.value)}
                        className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 text-sm focus:outline-none focus:border-cyan-500/50"
                      />
                      <select
                        value={newTenantTier}
                        onChange={(e) => setNewTenantTier(e.target.value)}
                        className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 text-sm focus:outline-none focus:border-cyan-500/50"
                      >
                        <option value="">Paket Seç...</option>
                        {tiers.map((t) => (
                          <option key={t.id} value={t.id}>{t.tier_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleAddTenant}
                        disabled={!newTenantName.trim() || !newTenantTier}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Oluştur
                      </button>
                      <button
                        onClick={() => setShowAddTenant(false)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {tenants.map((tenant) => {
                    const tier = tenant.tier;
                    const statusStyle = STATUS_STYLES[tenant.subscription_status] || STATUS_STYLES.pending;
                    const isKeyVisible = visibleKeys.has(tenant.id);
                    return (
                      <div key={tenant.id} className="bg-slate-900/60 rounded-xl border border-slate-700/50 p-4 hover:border-slate-600 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                              <Building2 className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-white">{tenant.company_name}</h4>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${statusStyle}`}>
                                  {tenant.subscription_status.toUpperCase()}
                                </span>
                                {tier && (
                                  <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">
                                    {tier.tier_name}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1.5 text-[11px] text-slate-500">
                                {tenant.contact_email && <span>{tenant.contact_email}</span>}
                                {tenant.tax_number && <span>VKN: {tenant.tax_number}</span>}
                                {tenant.onboarding_date && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(tenant.onboarding_date).toLocaleDateString('tr-TR')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[10px] text-slate-500 uppercase">Bu Ay Çağrı</p>
                            <p className="text-sm font-bold text-cyan-400">{(tenant.total_api_calls_this_month || 0).toLocaleString('tr-TR')}</p>
                          </div>
                        </div>

                        {/* API Key */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex-1 flex items-center gap-2 bg-slate-950/60 rounded-lg px-3 py-2 border border-slate-700/50">
                            <Key className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                            <code className="text-xs text-slate-400 font-mono flex-1 truncate">
                              {isKeyVisible ? tenant.api_key : maskKey(tenant.api_key || '')}
                            </code>
                          </div>
                          <button
                            onClick={() => toggleKeyVisibility(tenant.id)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            {isKeyVisible ? <EyeOff className="h-3.5 w-3.5 text-slate-400" /> : <Eye className="h-3.5 w-3.5 text-slate-400" />}
                          </button>
                          <button
                            onClick={() => copyKey(tenant.api_key || '', tenant.id)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            {copiedKey === tenant.id ? (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </button>
                        </div>

                        {/* Status Actions */}
                        <div className="mt-3 flex items-center gap-2">
                          <select
                            value={tenant.subscription_status}
                            onChange={(e) => handleStatusChange(tenant.id, e.target.value)}
                            className="bg-slate-800 text-slate-300 px-2 py-1.5 rounded-lg border border-slate-700 text-xs focus:outline-none focus:border-cyan-500/50"
                          >
                            <option value="active">Aktif</option>
                            <option value="trial">Deneme</option>
                            <option value="suspended">Askıya Alındı</option>
                            <option value="expired">Süresi Doldu</option>
                            <option value="pending">Beklemede</option>
                          </select>
                          <span className="text-[10px] text-slate-500">
                            Rate Limit: {tenant.rate_limit_per_minute}/dk
                          </span>
                          {tenant.contract_end_date && (
                            <span className="text-[10px] text-slate-500 ml-auto">
                              Sözleşme: {new Date(tenant.contract_end_date).toLocaleDateString('tr-TR')}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: SLA & Gateway */}
            {tab === 'sla' && (
              <div>
                {/* Tenant Selector */}
                <div className="flex items-center gap-3 mb-5">
                  <label className="text-xs text-slate-400">Müşteri:</label>
                  <select
                    value={selectedTenant?.id || ''}
                    onChange={(e) => {
                      const t = tenants.find((t) => t.id === e.target.value);
                      if (t) setSelectedTenant(t);
                    }}
                    className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 text-sm focus:outline-none focus:border-cyan-500/50"
                  >
                    {tenants.map((t) => (
                      <option key={t.id} value={t.id}>{t.company_name}</option>
                    ))}
                  </select>
                </div>

                {/* SLA Summary Cards */}
                {selectedTenant && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {(() => {
                      const totalReq = slaMetrics.reduce((s, m) => s + m.total_requests, 0);
                      const totalSuccess = slaMetrics.reduce((s, m) => s + m.successful_requests, 0);
                      const totalFail = slaMetrics.reduce((s, m) => s + m.failed_requests, 0);
                      const avgUptime = slaMetrics.length > 0
                        ? slaMetrics.reduce((s, m) => s + Number(m.uptime_percent), 0) / slaMetrics.length
                        : 100;
                      const avgResp = slaMetrics.length > 0
                        ? slaMetrics.reduce((s, m) => s + Number(m.avg_response_time_ms), 0) / slaMetrics.length
                        : 0;
                      return [
                        { label: 'Toplam İstek (7 gün)', value: totalReq.toLocaleString('tr-TR'), icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                        { label: 'Başarılı', value: totalSuccess.toLocaleString('tr-TR'), icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        { label: 'Ortalama Uptime', value: `%${avgUptime.toFixed(2)}`, icon: TrendingUp, color: avgUptime >= 99.9 ? 'text-emerald-400' : 'text-amber-400', bg: 'bg-amber-500/10' },
                        { label: 'Ort. Yanıt Süresi', value: `${avgResp.toFixed(0)}ms`, icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                      ];
                    })().map((s, i) => (
                      <div key={i} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] text-slate-500 uppercase">{s.label}</p>
                          <div className={`p-1.5 rounded-lg ${s.bg}`}>
                            <s.icon className={`h-4 w-4 ${s.color}`} />
                          </div>
                        </div>
                        <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subscriptions */}
                {selectedTenant && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">Aktif Servis Abonelikleri</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {subscriptions.map((sub) => {
                        const svc = sub.service;
                        const lc = svc ? LAYER_COLORS[svc.layer] || LAYER_COLORS.CROSS_LAYER : LAYER_COLORS.CROSS_LAYER;
                        const usagePct = sub.monthly_quota > 0 ? (sub.calls_this_month / sub.monthly_quota) * 100 : 0;
                        return (
                          <div key={sub.id} className={`rounded-xl border ${lc.border} ${lc.bg} p-4`}>
                            <div className="flex items-center justify-between mb-2">
                              <h5 className={`text-xs font-bold ${lc.text}`}>{svc?.service_name || 'Servis'}</h5>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded border ${lc.badge}`}>{svc?.layer}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                              <span>{sub.calls_this_month.toLocaleString('tr-TR')} / {sub.monthly_quota.toLocaleString('tr-TR')}</span>
                              <span className={usagePct > 80 ? 'text-red-400' : 'text-slate-500'}>%{usagePct.toFixed(1)}</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  usagePct > 80 ? 'bg-red-500' : usagePct > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min(usagePct, 100)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                      {subscriptions.length === 0 && (
                        <p className="text-xs text-slate-500 col-span-full text-center py-4">Bu müşterinin aktif aboneliği bulunamadı.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* SLA Metrics Table */}
                {selectedTenant && slaMetrics.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3">SLA Metrikleri (Son 7 Gün)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="text-left py-2 px-3 text-slate-400 font-medium">Tarih</th>
                            <th className="text-right py-2 px-3 text-slate-400 font-medium">Toplam İstek</th>
                            <th className="text-right py-2 px-3 text-slate-400 font-medium">Başarılı</th>
                            <th className="text-right py-2 px-3 text-slate-400 font-medium">Başarısız</th>
                            <th className="text-right py-2 px-3 text-slate-400 font-medium">Ort. Yanıt</th>
                            <th className="text-right py-2 px-3 text-slate-400 font-medium">Uptime</th>
                            <th className="text-center py-2 px-3 text-slate-400 font-medium">SLA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {slaMetrics.slice(0, 14).map((m) => (
                            <tr key={m.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                              <td className="py-2 px-3 text-slate-300">{new Date(m.metric_date).toLocaleDateString('tr-TR')}</td>
                              <td className="py-2 px-3 text-right text-slate-300">{m.total_requests.toLocaleString('tr-TR')}</td>
                              <td className="py-2 px-3 text-right text-emerald-400">{m.successful_requests.toLocaleString('tr-TR')}</td>
                              <td className="py-2 px-3 text-right text-red-400">{m.failed_requests}</td>
                              <td className="py-2 px-3 text-right text-slate-300">{Number(m.avg_response_time_ms).toFixed(0)}ms</td>
                              <td className="py-2 px-3 text-right text-cyan-400">%{Number(m.uptime_percent).toFixed(2)}</td>
                              <td className="py-2 px-3 text-center">
                                {m.sla_breached ? (
                                  <span className="inline-flex items-center gap-1 text-red-400">
                                    <AlertTriangle className="h-3 w-3" />
                                    İHLAL
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-emerald-400">
                                    <CheckCircle className="h-3 w-3" />
                                    OK
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* API Gateway Logs */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <Network className="h-4 w-4 text-cyan-400" />
                    API Gateway Log Akışı
                  </h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {gatewayLogs.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-sm">
                        <Activity className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        Henüz API gateway log kaydı bulunmuyor.
                      </div>
                    ) : (
                      gatewayLogs.map((log) => {
                        const is2xx = log.status_code >= 200 && log.status_code < 300;
                        const is4xx = log.status_code >= 400 && log.status_code < 500;
                        const is5xx = log.status_code >= 500;
                        return (
                          <div key={log.id} className="flex items-center gap-3 p-3 bg-slate-900/40 rounded-lg border border-slate-800/50 text-xs">
                            <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                              is2xx ? 'bg-emerald-500/20 text-emerald-400' :
                              is4xx ? 'bg-amber-500/20 text-amber-400' :
                              is5xx ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'
                            }`}>
                              {log.status_code || '---'}
                            </span>
                            <span className="text-slate-500 font-mono w-12">{log.method}</span>
                            <span className="text-slate-300 flex-1 truncate font-mono">{log.endpoint || '/api/...'}</span>
                            <span className="text-slate-500">{log.response_time_ms || 0}ms</span>
                            {log.sopon_processed && <span className="text-[9px] px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded">SOPON</span>}
                            {log.supon_decision && <span className="text-[9px] px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded">{log.supon_decision}</span>}
                            {log.soft10_certified && <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded">SOFT10</span>}
                            <span className="text-slate-600 text-[10px]">{new Date(log.created_at).toLocaleTimeString('tr-TR')}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
