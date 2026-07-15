import React, { useState, useEffect, useRef } from 'react';
import { Shield, Settings, LogOut, CheckCircle, AlertTriangle, Bell, Activity, TrendingUp, Lock, Eye, Fingerprint, Scan, Database, Users, Globe as Globe2, Heart, BookOpen, CreditCard, BarChart3, AlertCircle, Award, Workflow, Network, Info, Download, X, ChevronDown, ChevronRight, Terminal } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { UserScenariosModal } from './UserScenariosModal';
import { GlobalReachModal } from './GlobalReachModal';
import { IntegrationsModal } from './IntegrationsModal';
import { PublicBenefitModal } from './PublicBenefitModal';
import { PricingModal } from './PricingModal';
import { TurkeyCertificateModal } from './TurkeyCertificateModal';
import { AboutModal } from './AboutModal';
import { TeamModal } from './TeamModal';
import { SecurityInfoModal } from './SecurityInfoModal';
import { SecurityMetricsModal } from './SecurityMetricsModal';
import { MonitoringPanel } from './MonitoringPanel';
import { TrackingPanel } from './TrackingPanel';
import { CentralMonitoringHub } from './CentralMonitoringHub';
import { CerebroNetworkPanel } from './CerebroNetworkPanel';
import { HybridWalletHub } from './HybridWalletHub';
import { EntityRegistryPanel } from './EntityRegistryPanel';
import { SoponDeAIPanel } from './SoponDeAIPanel';
import { CerebroCertificatePanel } from './CerebroCertificatePanel';
import { Web4BridgePanel } from './Web4BridgePanel';
import { AlbisChatBot } from './AlbisChatBot';
import { detectLanguage, translations, type Language } from '../utils/i18n';
import { generatePremiumCertificate } from '../services/certificateService';

interface DashboardProps {
  onLogout: () => void;
  userType?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout, userType = 'individual' }) => {
  const [userScenariosOpen, setUserScenariosOpen] = useState(false);
  const [globalReachOpen, setGlobalReachOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const [publicBenefitOpen, setPublicBenefitOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [turkeyCertificateOpen, setTurkeyCertificateOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [securityInfoOpen, setSecurityInfoOpen] = useState(false);
  const [securityMetricsOpen, setSecurityMetricsOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<'overview' | 'cerebro' | 'security' | 'web4' | 'wallet' | 'tracking'>('overview');
  const [language, setLanguage] = useState<Language>('tr');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [certData, setCertData] = useState<{
    userName: string;
    userEmail: string;
    registrationDate: string;
    userId: string;
  } | null>(null);
  const certCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
  }, []);

  const t = translations[language];

  const getUserTypeLabel = () => {
    if (userType === 'corporate') return language === 'tr' ? 'Kurumsal' : 'Corporate';
    if (userType === 'personnel') return language === 'tr' ? 'Personel' : 'Personnel';
    return language === 'tr' ? 'Bireysel' : 'Individual';
  };

  const getUserTypeColor = () => {
    if (userType === 'corporate') return 'from-purple-400 to-pink-400';
    if (userType === 'personnel') return 'from-orange-400 to-red-400';
    return 'from-blue-400 to-cyan-400';
  };

  const generateBlockchainCertificate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Kullanıcı bilgisi bulunamadı!');
      return;
    }

    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    setCertData({
      userName: userData?.full_name || user.email?.split('@')[0] || 'Kullanıcı',
      userEmail: user.email || '',
      registrationDate: userData?.created_at || user.created_at,
      userId: user.id,
    });
    setCertModalOpen(true);
  };

  const handleCertDownload = () => {
    generatePremiumCertificate({
      userType,
      language,
      userName: certData?.userName || 'Kullanıcı',
      userEmail: certData?.userEmail || '',
      registrationDate: certData?.registrationDate,
      userId: certData?.userId,
    });
  };

  const stats = [
    { label: t.biometricStatus, value: t.verified, color: 'text-matrix-400', icon: Fingerprint, trend: '+100%' },
    { label: t.securityScore, value: '98/100', color: 'text-cyber-400', icon: Shield, trend: '+5%' },
    { label: t.activeProtection, value: '24/7', color: 'text-secure-400', icon: Activity, trend: language === 'tr' ? 'Sürekli' : 'Continuous' },
    { label: t.kycControl, value: language === 'tr' ? '2 saat önce' : '2 hours ago', color: 'text-slate-400', icon: Scan, trend: t.current },
  ];

  const features = [
    {
      title: 'Biyometrik Kimlik Doğrulama',
      description: 'AI destekli yüz tanıma, parmak izi ve ses analizi ile kimliğinizi doğrulayın',
      icon: Fingerprint,
      color: 'bg-gradient-to-br from-cyber-600 to-cyber-700',
      status: 'Aktif',
      lastUsed: '1 saat önce',
      action: () => alert('Biyometrik doğrulama sistemi aktif!')
    },
    {
      title: 'Blockchain Güvenlik Sertifikası',
      description: 'Blockchain tabanlı KYC sertifikanızı görüntüleyin, paylaşın ve indirin',
      icon: Database,
      color: 'bg-gradient-to-br from-matrix-600 to-matrix-700',
      status: 'Güncel',
      lastUsed: 'Dün',
      action: () => generateBlockchainCertificate()
    },
    {
      title: 'KYC Profil Yönetimi',
      description: 'Kişisel bilgilerinizi, güvenlik ayarlarınızı ve gizlilik tercihlerinizi yönetin',
      icon: Settings,
      color: 'bg-gradient-to-br from-slate-600 to-slate-700',
      status: 'Yapılandırıldı',
      lastUsed: '3 gün önce',
      action: () => alert('Profil yönetimi paneli yakında aktif olacak!')
    },
    {
      title: 'Güvenlik Analiz Raporları',
      description: 'Detaylı siber güvenlik analizleri ve kimlik koruma raporlarını inceleyin',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-secure-600 to-secure-700',
      status: 'Hazır',
      lastUsed: '1 hafta önce',
      action: () => alert('Raporlar hazırlanıyor!')
    },
    {
      title: 'Acil Durum Müdahale',
      description: 'Kimlik hırsızlığı ve siber saldırı durumunda anında müdahale sistemi',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-amber-600 to-orange-600',
      status: 'Standby',
      lastUsed: 'Hiç kullanılmadı',
      action: () => alert('Acil durum sistemi standby modunda!')
    },
    {
      title: 'Ekip İşbirliği Senaryoları',
      description: 'Kurumsal ekiplerde DigiGuard kullanımı ve yönetimi',
      icon: Network,
      color: 'bg-gradient-to-br from-blue-600 to-cyan-600',
      status: 'Kurumsal',
      lastUsed: 'Yeni',
      action: () => alert('Takımlar arası KYC yönetimi, rol tabanlı erişim kontrolleri ve kurumsal dashboard özellikleri yakında!')
    },
    {
      title: 'Eğitim ve Dokümantasyon',
      description: 'Video eğitimler, kullanım kılavuzları ve en iyi uygulamalar',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-yellow-600 to-orange-600',
      status: 'Eğitim',
      lastUsed: 'Yeni',
      action: () => alert('Video eğitim kütüphanesi, interaktif rehberler ve sertifika programları hazırlanıyor!')
    },
  ];

  const recentActivities = [
    { action: 'Kimlik doğrulama başarılı', time: '2 saat önce', type: 'success' },
    { action: 'Güvenlik taraması tamamlandı', time: '6 saat önce', type: 'info' },
    { action: 'Profil bilgileri güncellendi', time: '1 gün önce', type: 'warning' },
    { action: 'Yeni cihaz girişi tespit edildi', time: '2 gün önce', type: 'alert' },
  ];

  const securityMetrics = [
    {
      label: 'Kimlik Güvenliği',
      score: 98,
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      icon: Shield,
      trend: '+2%',
      status: 'Mükemmel'
    },
    {
      label: 'Veri Şifreleme',
      score: 95,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500',
      icon: Lock,
      trend: '+1%',
      status: 'Çok İyi'
    },
    {
      label: 'Tehdit Seviyesi',
      score: 12,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500',
      icon: AlertCircle,
      trend: '-8%',
      status: 'Düşük Risk',
      inverse: true
    },
    {
      label: 'Biyometrik Doğruluk',
      score: 99,
      color: 'text-matrix-400',
      bgColor: 'bg-matrix-500',
      icon: Fingerprint,
      trend: '+3%',
      status: 'Optimal'
    },
    {
      label: 'Blockchain Entegrasyon',
      score: 100,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500',
      icon: Database,
      trend: '0%',
      status: 'Aktif'
    },
  ];
  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-x-hidden flex flex-col">
      <HybridWalletHub />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(0,229,255,0.03)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(57,255,20,0.03)', animationDelay: '1s' }} />
      </div>

      {/* ====== TOP COMMAND BAR (Cilt 7 Harfiyen) ====== */}
      <header className="relative z-20 border-b" style={{ background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,229,255,0.15)' }}>
        {/* Brand Row */}
        <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: 'rgba(0,229,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg blur-md" style={{ background: 'linear-gradient(135deg, #00e5ff, #39ff14)' }} />
              <div className="relative p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #00e5ff20, #39ff1420)' }}>
                <Shield className="h-5 w-5" style={{ color: '#00e5ff' }} />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                <span style={{ color: '#00e5ff' }}>Digi</span><span style={{ color: '#39ff14' }}>Guard</span>
                <span className="text-slate-600 font-normal text-xs ml-2">× Celebron</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-mono">CEREBRO NETWORK // WEB4 AUTONOMOUS BRIDGE</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
              <Fingerprint className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />
              <span className="text-xs font-mono text-slate-300">{getUserTypeLabel()}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded text-white font-bold" style={{ background: '#39ff1420', color: '#39ff14' }}>KYC 98%</span>
            </div>

            <button onClick={() => setAboutOpen(true)} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Info className="h-4 w-4 text-slate-400" />
            </button>
            <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Bell className="h-4 w-4 text-slate-400" />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] rounded-full h-3.5 w-3.5 flex items-center justify-center">3</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
              <LogOut className="h-3.5 w-3.5" /> {t.logout}
            </button>
          </div>
        </div>

        {/* 4-Group Dropdown Navigation */}
        <nav className="flex items-center px-6 py-1.5 gap-1">
          {[
            {
              id: 'network',
              label: 'Cerebro Network',
              icon: Network,
              color: '#39ff14',
              items: [
                { label: '5 Katmanli Mimari', dept: 'cerebro' as const },
                { label: 'Varlik Kayit (5 Kategori)', dept: 'cerebro' as const },
                { label: 'NetMesh Durumu', dept: 'cerebro' as const },
                { label: 'Kuantum Direnci', dept: 'cerebro' as const },
              ],
            },
            {
              id: 'security',
              label: 'Guvenlik & AI',
              icon: Shield,
              color: '#00e5ff',
              items: [
                { label: 'Sopon DeAI Motoru', dept: 'security' as const },
                { label: 'Kimlik Izleme', dept: 'security' as const },
                { label: 'Ihlal Tespit Merkezi', dept: 'security' as const },
                { label: 'PUKO Dongusu', dept: 'security' as const },
              ],
            },
            {
              id: 'bridge',
              label: 'Web4 Kopru',
              icon: Globe2,
              color: '#00e5ff',
              items: [
                { label: 'Dagitik Kopru Durumu', dept: 'web4' as const },
                { label: 'DAG Mutabakat (1402 Node)', dept: 'web4' as const },
                { label: 'Dilithium + Kyber-1024', dept: 'web4' as const },
                { label: 'Kuantum Tehdit Korumasi', dept: 'web4' as const },
              ],
            },
            {
              id: 'assets',
              label: 'Varlik & Sertifika',
              icon: Award,
              color: '#f59e0b',
              items: [
                { label: 'dNFT Kimlik Sertifikasi', dept: 'wallet' as const },
                { label: 'Hybrid Wallet (CLB/DGCT/BTC/ETH)', dept: 'wallet' as const },
                { label: 'Sertifika Indir', dept: 'wallet' as const },
                { label: 'Takip & Izleme', dept: 'tracking' as const },
              ],
            },
          ].map((group) => (
            <div key={group.id} className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all">
                <group.icon className="h-3.5 w-3.5" style={{ color: group.color }} />
                {group.label}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                style={{ background: 'rgba(2,6,23,0.98)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,229,255,0.15)' }}>
                <div className="p-2">
                  {group.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveDepartment(item.dept); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
                    >
                      <ChevronRight className="h-3 w-3 opacity-30" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Overview button */}
          <button
            onClick={() => setActiveDepartment('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ml-auto ${
              activeDepartment === 'overview'
                ? 'text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            style={activeDepartment === 'overview' ? { background: 'rgba(0,229,255,0.12)', color: '#00e5ff' } : {}}
          >
            <Activity className="h-3.5 w-3.5" /> Genel Bakis
          </button>
        </nav>
      </header>

      {/* ====== MAIN CONTENT AREA ====== */}
      <main className="relative z-10 flex-1 px-6 py-6 max-w-[1600px] w-full mx-auto">
        {/* Welcome banner */}
        <div className="mb-6 rounded-xl p-5 border glow-celebron" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.2)' }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">
                <span style={{ color: '#00e5ff' }}>{t.welcome}</span>
              </h2>
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Fingerprint className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />
                {t.subtitle}
                <span className="px-2 py-0.5 text-[10px] rounded-full font-mono animate-pulse" style={{ background: '#39ff1420', color: '#39ff14' }}>{t.live}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={generateBlockchainCertificate} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                <Award className="h-3.5 w-3.5" /> Sertifika Indir
              </button>
              <button onClick={() => setSecurityInfoOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', color: '#00e5ff' }}>
                <Lock className="h-3.5 w-3.5" /> AES-256
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl p-4 border transition-all hover:scale-[1.02]" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-1.5">
                <stat.icon className="h-5 w-5" style={{ color: stat.color === 'text-matrix-400' ? '#39ff14' : stat.color === 'text-cyber-400' ? '#00e5ff' : stat.color === 'text-secure-400' ? '#1ac5ff' : '#94a3b8' }} />
                <span className="text-[10px] text-slate-500 font-mono">{stat.trend}</span>
              </div>
              <p className="text-[10px] text-slate-500 mb-0.5">{stat.label}</p>
              <p className="text-lg font-bold" style={{ color: stat.color === 'text-matrix-400' ? '#39ff14' : stat.color === 'text-cyber-400' ? '#00e5ff' : stat.color === 'text-secure-400' ? '#1ac5ff' : '#94a3b8' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ====== DEPARTMENT CONTENT ====== */}

        {/* Overview */}
        {activeDepartment === 'overview' && (
          <div className="space-y-6">
            <CentralMonitoringHub language={language} />

            {/* Full-width features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <div key={i} onClick={feature.action} className="rounded-xl p-5 border cursor-pointer group transition-all hover:scale-[1.01] relative overflow-hidden"
                  style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.1)' }}>
                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,229,255,0.06)' }} />
                  <div className="p-2.5 rounded-lg w-fit mb-3" style={{ background: feature.color.includes('cyber') ? 'rgba(0,153,230,0.15)' : feature.color.includes('matrix') ? 'rgba(0,230,118,0.15)' : feature.color.includes('amber') ? 'rgba(245,158,11,0.15)' : 'rgba(100,116,139,0.15)' }}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-400 mb-2">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">Son: {feature.lastUsed}</span>
                    <span className="text-xs font-medium" style={{ color: '#00e5ff' }}>Ac →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Metrics */}
            <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.1)' }}>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" style={{ color: '#00e5ff' }} /> Guvenlik Metrikleri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {securityMetrics.map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-400">{m.label}</span>
                      <span className={`text-xs font-bold ${m.color}`}>{m.score}{m.inverse ? '%' : '/100'}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${m.bgColor} rounded-full transition-all duration-500`} style={{ width: `${m.inverse ? 100 - m.score : m.score}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{m.status} ({m.trend})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cerebro Network */}
        {activeDepartment === 'cerebro' && (
          <div className="space-y-6">
            <CerebroNetworkPanel />
            <EntityRegistryPanel />
          </div>
        )}

        {/* Security & AI */}
        {activeDepartment === 'security' && (
          <div className="space-y-6">
            <SoponDeAIPanel />
            <MonitoringPanel />
          </div>
        )}

        {/* Web4 Bridge */}
        {activeDepartment === 'web4' && (
          <Web4BridgePanel />
        )}

        {/* Wallet & Certificate */}
        {activeDepartment === 'wallet' && (
          <CerebroCertificatePanel language={language} />
        )}

        {/* Tracking */}
        {activeDepartment === 'tracking' && (
          <div className="space-y-6">
            <TrackingPanel language={language} />
            <CentralMonitoringHub language={language} />
          </div>
        )}
      </main>

      {/* ====== TERMINAL (Cilt 7 Harfiyen) ====== */}
      <footer className="relative z-10 border-t" style={{ background: '#010108', borderColor: 'rgba(0,229,255,0.1)' }}>
        <div className="px-6 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />
            <span className="text-[10px] font-mono text-slate-500">cerebro@digiguard:~$</span>
            <div className="flex-1 h-[1px]" style={{ background: 'rgba(0,229,255,0.08)' }} />
            <span className="text-[10px] font-mono" style={{ color: '#39ff14' }}>● ONLINE</span>
            <span className="text-[10px] font-mono text-slate-600">|</span>
            <span className="text-[10px] font-mono text-slate-500">1402 nodes</span>
            <span className="text-[10px] font-mono text-slate-600">|</span>
            <span className="text-[10px] font-mono text-slate-500">S_total: 99847.3K</span>
          </div>
          <div className="font-mono text-[11px] space-y-0.5 max-h-24 overflow-y-auto">
            <div className="terminal-line" style={{ color: '#39ff14' }}>[OK] Cerebro Network initialized — 5/5 layers active</div>
            <div className="terminal-line text-slate-400">[INFO] KYC verification: PASSED (score: 98/100)</div>
            <div className="terminal-line text-slate-400">[INFO] Dilithium+Kyber-1024 quantum shield: ACTIVE</div>
            <div className="terminal-line" style={{ color: '#00e5ff' }}>[BRIDGE] Web4 DAG consensus: 1402/1402 nodes synced</div>
            <div className="terminal-line text-slate-400">[SOPON] DeAI threat scan: 0 critical / 2 monitored</div>
            <div className="terminal-line" style={{ color: '#39ff14' }}>[PUKO] Proaktif → Uyari → Koruma → Onarim dongusu aktif</div>
            <div className="terminal-line text-slate-500">[WALLET] CLB: 2,818,422.90 | DGCT: 12,450.75 | BTC: 0.0428 | ETH: 1.8472</div>
            <div className="terminal-line terminal-cursor" style={{ color: '#39ff14' }}>cerebro@digiguard:~$</div>
          </div>
        </div>
      </footer>

      {/* ====== MODALS ====== */}
      <UserScenariosModal isOpen={userScenariosOpen} onClose={() => setUserScenariosOpen(false)} />
      <GlobalReachModal isOpen={globalReachOpen} onClose={() => setGlobalReachOpen(false)} />
      <IntegrationsModal isOpen={integrationsOpen} onClose={() => setIntegrationsOpen(false)} />
      <PublicBenefitModal isOpen={publicBenefitOpen} onClose={() => setPublicBenefitOpen(false)} />
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
      <TurkeyCertificateModal isOpen={turkeyCertificateOpen} onClose={() => setTurkeyCertificateOpen(false)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <TeamModal isOpen={teamOpen} onClose={() => setTeamOpen(false)} />
      <SecurityInfoModal isOpen={securityInfoOpen} onClose={() => setSecurityInfoOpen(false)} />
      <SecurityMetricsModal isOpen={securityMetricsOpen} onClose={() => setSecurityMetricsOpen(false)} />

      {/* Certificate Preview Modal */}
      {certModalOpen && certData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setCertModalOpen(false)}>
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setCertModalOpen(false)} className="absolute -top-3 -right-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-1.5 border border-slate-600 z-10 transition-colors">
              <X className="h-4 w-4" />
            </button>
            <div ref={certCardRef} className="rounded-xl overflow-hidden shadow-2xl border" style={{ aspectRatio: '1.48/1', borderColor: 'rgba(0,229,255,0.4)' }}>
              <div className="bg-[#0a1220] w-full h-full relative flex flex-col">
                <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #00e5ff, #39ff14)' }} />
                <div className="bg-[#0f1e37] px-5 py-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00e5ff, #39ff14)' }}>
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-white font-bold text-lg leading-tight">DigiGuard</h2>
                    <p className="text-[10px] font-medium tracking-wider" style={{ color: '#00e5ff' }}>DIGITAL IDENTITY VERIFICATION SYSTEM</p>
                    <p className="text-slate-500 text-[9px]">Karprime Technology INC.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-slate-500 text-[8px] font-mono">{`DG-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-XXXXXXX`}</p>
                    <p className="text-slate-600 text-[7px] font-mono">{`Block #${Math.floor(Math.random() * 10000000 + 15000000)}`}</p>
                  </div>
                </div>
                <div className="h-[2px]" style={{ background: '#00e5ff' }} />
                <div className="flex flex-1 px-5 py-3 gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-[85px] h-[105px] rounded-md bg-slate-800/80 border flex flex-col items-center justify-center" style={{ borderColor: 'rgba(0,229,255,0.3)' }}>
                      <div className="w-8 h-8 rounded-full bg-slate-700 mb-1" />
                      <div className="w-12 h-5 rounded-t-full bg-slate-700" />
                      <p className="text-[7px] text-slate-600 mt-1">BIYOMETRIK</p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <h3 className="font-bold text-sm tracking-wide" style={{ color: '#00e5ff' }}>KIMLIK DOGRULAMA KARTI</h3>
                      <p className="text-slate-500 text-[8px]">Identity Verification Card</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[8px]">AD SOYAD / FULL NAME</p>
                      <p className="text-white font-bold text-sm truncate">{certData.userName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[8px]">E-POSTA / EMAIL</p>
                      <p className="text-slate-300 text-[11px] truncate">{certData.userEmail}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-slate-500 text-[8px]">KULLANICI TIPI</p>
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: userType === 'corporate' ? '#a855f7' : userType === 'personnel' ? '#f97316' : '#00e5ff' }}>
                          {userType === 'corporate' ? 'KURUMSAL' : userType === 'personnel' ? 'PERSONEL' : 'BIREYSEL'}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[8px]">KAYIT TARIHI</p>
                        <p className="text-slate-300 text-[10px]">{certData.registrationDate ? new Date(certData.registrationDate).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR')}</p>
                      </div>
                    </div>
                    <div className="bg-[#0f1e37] border rounded p-2 space-y-1" style={{ borderColor: 'rgba(0,229,255,0.2)' }}>
                      <p className="font-bold text-[9px]" style={{ color: '#00e5ff' }}>BLOCKCHAIN DOGRULAMA</p>
                      <div className="flex items-center gap-1 text-[7px]">
                        <span className="text-slate-500">Ag:</span>
                        <span className="font-medium" style={{ color: '#39ff14' }}>Ethereum + Cerebro</span>
                        <span className="text-slate-600 mx-1">|</span>
                        <span className="text-slate-500">Sifreleme:</span>
                        <span className="font-medium" style={{ color: '#00e5ff' }}>AES-256 + Kyber-1024</span>
                      </div>
                      <div className="text-[6px] font-mono text-violet-400 leading-tight break-all">
                        {`0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`}
                      </div>
                      <p className="text-[7px] text-slate-500">Zaman Damgasi: <span style={{ color: '#39ff14' }}>{new Date().toLocaleString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' })}</span></p>
                    </div>
                  </div>
                </div>
                <div className="mx-5 mb-2">
                  <div className="rounded py-1 text-center" style={{ background: 'linear-gradient(90deg, #39ff14, #00e5ff)' }}>
                    <p className="text-white font-bold text-[10px] tracking-wider">DOGRLANDI - KYC TAMAMLANDI - VERIFIED</p>
                  </div>
                </div>
                <div className="px-5 pb-2 flex items-end justify-between">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-white rounded p-0.5">
                      <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-[1px]">
                        {Array.from({ length: 64 }, (_, i) => (
                          <div key={i} className={`rounded-[0.5px] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div>
                        <p className="text-slate-600 text-[7px]">Uyum:</p>
                        <div className="flex gap-1">
                          {['KVKK', 'GDPR', 'ISO'].map((b) => (
                            <span key={b} className="px-1 py-[1px] bg-slate-800 text-[6px] rounded font-bold" style={{ color: '#00e5ff' }}>{b}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-[6px] italic">Blockchain guvenceli, degistirilemez kayit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="border-t mb-1" style={{ width: '80px', borderColor: 'rgba(0,229,255,0.4)' }} />
                    <p className="text-[8px] font-bold" style={{ color: '#00e5ff' }}>Karprime Technology INC.</p>
                    <p className="text-slate-600 text-[7px] italic">Yetkili Imza</p>
                  </div>
                </div>
                <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #39ff14, #00e5ff)' }} />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button onClick={handleCertDownload} className="flex items-center gap-2 font-bold py-3 px-8 rounded-lg transition-all" style={{ background: 'linear-gradient(90deg, #00e5ff, #39ff14)', color: '#020617' }}>
                <Download className="h-5 w-5" /> PDF Olarak Indir
              </button>
            </div>
          </div>
        </div>
      )}

      <AlbisChatBot language={language} />
    </div>
  );
};