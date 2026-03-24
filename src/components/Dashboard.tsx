import React, { useState, useEffect } from 'react';
import { Shield, Settings, LogOut, CheckCircle, AlertTriangle, Bell, Activity, TrendingUp, Lock, Eye, Fingerprint, Scan, Database, Users, Globe as Globe2, Heart, BookOpen, CreditCard, BarChart3, AlertCircle, Award, Workflow, Network, Info } from 'lucide-react';
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
import { Sidebar } from './Sidebar';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<Language>('tr');

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

    generatePremiumCertificate({
      userType,
      language,
      userName: userData?.full_name || user.email?.split('@')[0] || 'Kullanıcı',
      userEmail: user.email || '',
      registrationDate: userData?.created_at || user.created_at,
      userId: user.id
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
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onOpenUserScenarios={() => setUserScenariosOpen(true)}
        onOpenGlobalReach={() => setGlobalReachOpen(true)}
        onOpenIntegrations={() => setIntegrationsOpen(true)}
        onOpenPublicBenefit={() => setPublicBenefitOpen(true)}
        onOpenTurkeyCertificate={() => setTurkeyCertificateOpen(true)}
        onOpenPricing={() => setPricingOpen(true)}
        onOpenSecurityMetrics={() => setSecurityMetricsOpen(true)}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-cyber-500/30 shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyber-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-matrix-500/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-500 via-matrix-500 to-secure-500 rounded-full animate-spin-slow opacity-75"></div>
                  <div className="absolute inset-1 bg-slate-800 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent">AI</div>
                      <div className="text-xs text-slate-400">ALBIS</div>
                    </div>
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyber-500/20 via-matrix-500/20 to-secure-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyber-400 animate-pulse" />
                  ALBIS Yapay Zeka Asistanı
                </h3>
                <p className="text-slate-300 text-sm mb-2">
                  Tüm raporlar, bildirimler ve güvenlik uyarıları ALBIS tarafından izleniyor ve yönetiliyor.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 px-2 py-1 bg-matrix-600/30 text-matrix-300 text-xs rounded-full border border-matrix-500/50">
                    <CheckCircle className="h-3 w-3" />
                    Aktif İzleme
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-cyber-600/30 text-cyber-300 text-xs rounded-full border border-cyber-500/50 animate-pulse">
                    <Activity className="h-3 w-3" />
                    Gerçek Zamanlı Analiz
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-secure-600/30 text-secure-300 text-xs rounded-full border border-secure-500/50">
                    <Shield className="h-3 w-3" />
                    7/24 Koruma
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-400 via-matrix-400 to-secure-400 bg-clip-text text-transparent mb-2">
            {t.welcome}
          </h1>
          <p className="text-slate-300 flex items-center flex-wrap gap-2">
            <Fingerprint className="h-4 w-4 text-matrix-400 animate-fingerprint-pulse" />
            {t.subtitle}
            <span className="ml-2 px-2 py-1 bg-matrix-600/30 text-matrix-300 text-xs rounded-full border border-matrix-500/50 animate-pulse">
              {t.live}
            </span>
            <span className={`px-2 py-1 bg-gradient-to-r ${getUserTypeColor()} bg-opacity-20 text-white text-xs rounded-full border border-white/30 font-semibold`}>
              {getUserTypeLabel()}
            </span>
            <span className="px-2 py-1 bg-cyber-600/30 text-cyber-300 text-xs rounded-full border border-cyber-500/50">
              AES-256
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSecurityInfoOpen(true)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium py-2 px-3.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-lg shadow-cyan-500/30 text-sm"
          >
            <Lock className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">SHA-256</span>
          </button>
          <button
            onClick={() => setAboutOpen(true)}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium py-2 px-3.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-lg shadow-orange-500/30 text-sm"
          >
            <Info className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Hakkında</span>
          </button>
          <button
            onClick={() => setTeamOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-3.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-lg shadow-purple-500/30 text-sm"
          >
            <Users className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Ekip</span>
          </button>
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse text-[10px]">
              3
            </span>
          </button>
          <button
            onClick={onLogout}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-3.5 rounded-lg transition-all flex items-center space-x-1.5 shadow-lg shadow-red-500/30 text-sm"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-cyber-500/20 hover:border-cyber-500/50 transition-all shadow-lg hover:shadow-cyber-500/20 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-20 h-20 bg-gradient-to-br from-cyber-500/10 to-matrix-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-slate-400 text-xs">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.trend}</p>
              </div>
              <div className="relative">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="absolute inset-0 blur-md opacity-50">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Alert */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-lg p-4 mb-6 border border-amber-500/30 hover:border-amber-400/50 transition-all shadow-lg shadow-amber-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="flex items-start space-x-3 relative z-10">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 animate-pulse" />
          <div>
            <h3 className="text-base font-semibold text-white mb-1.5 flex items-center flex-wrap gap-2">
              Siber Güvenlik Bildirimi
              <span className="px-2 py-0.5 bg-amber-600/30 text-amber-300 text-xs rounded-full border border-amber-500/50 animate-pulse">
                YENİ
              </span>
            </h3>
            <p className="text-slate-300 text-sm mb-2">
              Son 24 saatte 3 sahte profil tespit edildi ve AI sistemimiz tarafından otomatik engellendi.
            </p>
            <div className="flex items-center flex-wrap gap-3 text-xs">
              <span className="text-matrix-400 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                AI Koruma Aktif
              </span>
              <span className="text-cyber-400 flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Veriler Şifreli
              </span>
              <span className="text-secure-400 flex items-center">
                <Database className="h-3 w-3 mr-1" />
                Blockchain Kayıtlı
              </span>
            </div>
          </div>
        </div>
      </div>


      {/* Monitoring Panel */}
      <div className="mb-8">
        <MonitoringPanel />
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-6 mb-8">
        {/* Features Grid - Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-cyber-500/20 hover:border-cyber-500/50 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-cyber-500/20 relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-cyber-500/10 to-matrix-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full border ${
                    feature.status === 'Aktif' ? 'bg-matrix-600/30 text-matrix-300 border-matrix-500/50' :
                    feature.status === 'Guncel' ? 'bg-cyber-600/30 text-cyber-300 border-cyber-500/50' :
                    feature.status === 'Izleniyor' ? 'bg-red-600/30 text-red-300 border-red-500/50' :
                    feature.status === 'Bilgilendirme' ? 'bg-blue-600/30 text-blue-300 border-blue-500/50' :
                    feature.status === 'Global' ? 'bg-green-600/30 text-green-300 border-green-500/50' :
                    feature.status === 'Gelistirici' ? 'bg-purple-600/30 text-purple-300 border-purple-500/50' :
                    feature.status === 'Sosyal' ? 'bg-pink-600/30 text-pink-300 border-pink-500/50' :
                    feature.status === 'Kurumsal' ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50' :
                    feature.status === 'Egitim' ? 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50' :
                    feature.status === 'Premium' ? 'bg-green-600/30 text-green-300 border-green-500/50' :
                    feature.status === 'Canli' ? 'bg-red-600/30 text-red-300 border-red-500/50 animate-pulse' :
                    'bg-slate-600/30 text-slate-300 border-slate-500/50'
                  }`}>
                    {feature.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-3 relative z-10">{feature.description}</p>
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs text-slate-500">Son: {feature.lastUsed}</span>
                  <span className="text-cyber-400 text-sm font-medium group-hover:text-cyber-300 transition-colors">
                    Ac →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities - Right Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-cyber-500/20 sticky top-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="h-5 w-5 text-cyber-400 mr-2" />
              Aktivite Geçmişi
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors border-l-2 border-l-transparent hover:border-l-cyber-400">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                      activity.type === 'success' ? 'bg-matrix-400' :
                      activity.type === 'info' ? 'bg-cyber-400' :
                      activity.type === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                    }`} />
                    <span className="text-white text-sm leading-snug">{activity.action}</span>
                  </div>
                  <span className="text-slate-400 text-xs ml-5 block">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

          <div className="bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-sm rounded-lg p-5 border border-cyber-500/30 shadow-lg mt-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-400" />
              Sevdiklerinize Tavsiye Edin
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              DigiGuard'ı arkadaşlarınız ve ailenizle paylaşın. Her başarılı kayıt için özel avantajlar kazanın!
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                readOnly
                value="https://digiguard.app/ref/DG-2024-USER"
                className="flex-1 bg-slate-900/50 text-slate-300 px-4 py-2 rounded-lg border border-cyber-500/30 text-sm focus:outline-none focus:border-cyber-500/50"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://digiguard.app/ref/DG-2024-USER');
                  alert('Referans linki kopyalandı!');
                }}
                className="bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white font-medium px-6 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyber-500/30"
              >
                <Award className="h-4 w-4" />
                Kopyala
              </button>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-matrix-400" />
                0 Başarılı Referans
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3 text-cyber-400" />
                Premium Avantajlar
              </span>
            </div>
          </div>

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
        </div>
      </div>

      <AlbisChatBot language={language} />
    </div>
  );
};