import React, { useState, useEffect } from 'react';
import { X, Users, UserCheck, UserX, Clock, CheckCircle, AlertTriangle, Search, Filter, Download, RefreshCw, FileText, Shield, Brain, TrendingUp, ChevronDown, ChevronUp, Plus, Eye, CreditCard as Edit2, BarChart2 } from 'lucide-react';

interface HRPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  kyc_status: 'verified' | 'pending' | 'rejected' | 'expired';
  risk_level: 'low' | 'medium' | 'high';
  last_verification: string;
  access_level: number;
  puko_stage: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: 'EMP-001', name: 'Ahmet Yılmaz', department: 'Güvenlik', role: 'Güvenlik Uzmanı', kyc_status: 'verified', risk_level: 'low', last_verification: '2 saat önce', access_level: 3, puko_stage: 'kontrol_et' },
  { id: 'EMP-002', name: 'Zeynep Kara', department: 'İK', role: 'İK Müdürü', kyc_status: 'verified', risk_level: 'low', last_verification: '5 saat önce', access_level: 4, puko_stage: 'uygula' },
  { id: 'EMP-003', name: 'Mehmet Demir', department: 'IT', role: 'Sistem Yöneticisi', kyc_status: 'pending', risk_level: 'medium', last_verification: '2 gün önce', access_level: 5, puko_stage: 'planla' },
  { id: 'EMP-004', name: 'Fatma Şahin', department: 'Operasyon', role: 'Operasyon Direktörü', kyc_status: 'verified', risk_level: 'low', last_verification: '1 gün önce', access_level: 5, puko_stage: 'onlem_al' },
  { id: 'EMP-005', name: 'Ali Öztürk', department: 'Güvenlik', role: 'Fiziksel Güvenlik', kyc_status: 'expired', risk_level: 'high', last_verification: '35 gün önce', access_level: 2, puko_stage: 'planla' },
  { id: 'EMP-006', name: 'Selin Aydın', department: 'IT', role: 'Ağ Mühendisi', kyc_status: 'verified', risk_level: 'low', last_verification: '6 saat önce', access_level: 4, puko_stage: 'uygula' },
];

const ROLE_MATRIX = [
  { role: 'Admin', zones: ['A', 'B', 'C', 'D', 'E'], level: 5 },
  { role: 'Direktör', zones: ['A', 'B', 'C', 'D'], level: 4 },
  { role: 'Uzman', zones: ['A', 'B', 'C'], level: 3 },
  { role: 'Personel', zones: ['A', 'B'], level: 2 },
  { role: 'Misafir', zones: ['A'], level: 1 },
];

const AI_SUGGESTIONS = [
  { type: 'warning', message: 'EMP-005 KYC süresi dolmuş. Acil yenileme gerekiyor.', action: 'Otomatik Bildirim Gönder' },
  { type: 'info', message: 'EMP-003 orta risk seviyesi. Ek doğrulama öneriliyor.', action: 'İncelemeye Al' },
  { type: 'success', message: 'Bu ay 138 personel KYC doğrulaması başarıyla tamamlandı.', action: 'Rapor Al' },
];

const kycColor = (status: string) => {
  switch (status) {
    case 'verified': return 'text-green-400 bg-green-500/20 border-green-500/30';
    case 'pending': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    case 'rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
    case 'expired': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
  }
};

const riskColor = (level: string) => {
  switch (level) {
    case 'low': return 'text-green-400';
    case 'medium': return 'text-amber-400';
    case 'high': return 'text-red-400';
    default: return 'text-slate-400';
  }
};

export const HRPanel: React.FC<HRPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'employees' | 'roles' | 'ai'>('employees');
  const [search, setSearch] = useState('');
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);
  const [aiPulse, setAiPulse] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => setAiPulse((p) => !p), 2000);
    return () => clearInterval(t);
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = MOCK_EMPLOYEES.filter(
    (e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: MOCK_EMPLOYEES.length,
    verified: MOCK_EMPLOYEES.filter((e) => e.kyc_status === 'verified').length,
    pending: MOCK_EMPLOYEES.filter((e) => e.kyc_status === 'pending').length,
    expired: MOCK_EMPLOYEES.filter((e) => e.kyc_status === 'expired').length,
    high_risk: MOCK_EMPLOYEES.filter((e) => e.risk_level === 'high').length,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-auto">
      <div className="w-full max-w-4xl bg-[#060b18] border border-blue-500/20 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">İnsan Kaynakları Paneli</h2>
              <p className="text-xs text-blue-400/70">HR-Agent v2.1 — PUKO: UYGULA Aşaması</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Brain className={`h-3.5 w-3.5 text-blue-400 ${aiPulse ? 'animate-pulse' : ''}`} />
              <span className="text-blue-400 text-xs">AI Aktif</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-0 border-b border-blue-500/10 flex-shrink-0">
          {[
            { label: 'Toplam Personel', value: stats.total, icon: Users, color: 'text-blue-400' },
            { label: 'KYC Doğrulandı', value: stats.verified, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Beklemede', value: stats.pending, icon: Clock, color: 'text-amber-400' },
            { label: 'Süresi Dolmuş', value: stats.expired, icon: AlertTriangle, color: 'text-orange-400' },
            { label: 'Yüksek Risk', value: stats.high_risk, icon: Shield, color: 'text-red-400' },
          ].map((s, i) => (
            <div key={i} className="p-4 text-center border-r border-blue-500/10 last:border-r-0">
              <s.icon className={`h-4 w-4 ${s.color} mx-auto mb-1`} />
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-blue-500/10 flex-shrink-0">
          {[
            { key: 'employees', label: 'Personel KYC', icon: UserCheck },
            { key: 'roles', label: 'Yetki Matrisi', icon: Shield },
            { key: 'ai', label: 'AI Önerileri', icon: Brain },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-blue-400 text-blue-400 bg-blue-900/10'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-5">
          {activeTab === 'employees' && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Personel ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-300 text-sm focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <button className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl hover:bg-blue-500/20 transition-colors">
                  <Filter className="h-4 w-4 text-blue-400" />
                </button>
                <button className="p-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors">
                  <Download className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-2">
                {filtered.map((emp) => (
                  <div key={emp.id} className="bg-slate-800/40 border border-slate-700/30 rounded-xl overflow-hidden">
                    <button
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-800/60 transition-colors"
                      onClick={() => setExpandedEmployee(expandedEmployee === emp.id ? null : emp.id)}
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-300">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{emp.name}</span>
                          <span className="text-[10px] text-slate-500">{emp.id}</span>
                        </div>
                        <div className="text-xs text-slate-400">{emp.role} — {emp.department}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${kycColor(emp.kyc_status)}`}>
                          {emp.kyc_status === 'verified' ? 'DOĞRULANDI' : emp.kyc_status === 'pending' ? 'BEKLEMEDE' : emp.kyc_status === 'expired' ? 'SÜRE DOLDU' : 'REDDEDİLDİ'}
                        </span>
                        <span className={`text-xs font-medium ${riskColor(emp.risk_level)}`}>
                          {emp.risk_level === 'low' ? 'Düşük Risk' : emp.risk_level === 'medium' ? 'Orta Risk' : 'Yüksek Risk'}
                        </span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full mr-0.5 ${i < emp.access_level ? 'bg-blue-400' : 'bg-slate-700'}`} />
                          ))}
                        </div>
                        {expandedEmployee === emp.id ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                      </div>
                    </button>
                    {expandedEmployee === emp.id && (
                      <div className="px-4 pb-4 border-t border-slate-700/30 pt-3">
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="bg-slate-900/50 rounded-lg p-2.5">
                            <div className="text-[10px] text-slate-500 mb-0.5">Son Doğrulama</div>
                            <div className="text-xs text-slate-300">{emp.last_verification}</div>
                          </div>
                          <div className="bg-slate-900/50 rounded-lg p-2.5">
                            <div className="text-[10px] text-slate-500 mb-0.5">PUKO Aşaması</div>
                            <div className="text-xs text-cyan-400 uppercase">{emp.puko_stage.replace('_', ' ')}</div>
                          </div>
                          <div className="bg-slate-900/50 rounded-lg p-2.5">
                            <div className="text-[10px] text-slate-500 mb-0.5">Erişim Seviyesi</div>
                            <div className="text-xs text-blue-400">Seviye {emp.access_level}/5</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1.5">
                            <Eye className="h-3 w-3" /> Profil Görüntüle
                          </button>
                          <button className="flex-1 py-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-lg hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1.5">
                            <RefreshCw className="h-3 w-3" /> KYC Yenile
                          </button>
                          <button className="flex-1 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-1.5">
                            <FileText className="h-3 w-3" /> Sertifika Al
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div>
              <div className="text-xs text-slate-500 mb-4">AI tarafından dinamik olarak üretilen yetki matrisi — departman PUKO politikalarına göre güncellenir</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-semibold">Rol</th>
                      <th className="text-center py-3 px-3 text-xs text-slate-500 font-semibold">Seviye</th>
                      {['A', 'B', 'C', 'D', 'E'].map((z) => (
                        <th key={z} className="text-center py-3 px-3 text-xs text-slate-500 font-semibold">Bölge {z}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROLE_MATRIX.map((row, i) => (
                      <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                        <td className="py-3 px-4 text-sm text-white font-medium">{row.role}</td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex justify-center">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <div key={j} className={`w-2 h-2 rounded-full mr-0.5 ${j < row.level ? 'bg-blue-400' : 'bg-slate-700'}`} />
                            ))}
                          </div>
                        </td>
                        {['A', 'B', 'C', 'D', 'E'].map((z) => (
                          <td key={z} className="py-3 px-3 text-center">
                            {row.zones.includes(z) ? (
                              <CheckCircle className="h-4 w-4 text-green-400 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-slate-700 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400">AI Politika Motoru</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div>Son politika güncellemesi: <span className="text-blue-300">2 saat önce</span></div>
                  <div>AI güven skoru: <span className="text-green-400">97.4%</span></div>
                  <div>Aktif kural sayısı: <span className="text-cyan-400">47</span></div>
                  <div>PUKO döngü durumu: <span className="text-amber-400">UYGULA</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 mb-2">HR-Agent tarafından oluşturulan AI önerileri ve aksiyon önerileri</div>
              {AI_SUGGESTIONS.map((s, i) => (
                <div key={i} className={`p-4 rounded-xl border ${
                  s.type === 'warning' ? 'bg-amber-900/10 border-amber-500/30' :
                  s.type === 'info' ? 'bg-blue-900/10 border-blue-500/30' :
                  'bg-green-900/10 border-green-500/30'
                }`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {s.type === 'warning' ? <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" /> :
                       s.type === 'info' ? <Brain className="h-4 w-4 text-blue-400 flex-shrink-0" /> :
                       <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />}
                      <p className="text-sm text-slate-300">{s.message}</p>
                    </div>
                    <button className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      s.type === 'warning' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20' :
                      s.type === 'info' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20' :
                      'text-green-400 border-green-500/30 bg-green-500/10 hover:bg-green-500/20'
                    }`}>
                      {s.action}
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">KYC Dağılım Grafiği</span>
                </div>
                {[
                  { label: 'Doğrulandı', value: stats.verified, max: stats.total, color: 'bg-green-500' },
                  { label: 'Beklemede', value: stats.pending, max: stats.total, color: 'bg-amber-500' },
                  { label: 'Süresi Dolmuş', value: stats.expired, max: stats.total, color: 'bg-orange-500' },
                ].map((bar) => (
                  <div key={bar.label} className="mb-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{bar.label}</span>
                      <span className="text-white">{bar.value}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${bar.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${(bar.value / bar.max) * 100}%` }}
                      />
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
