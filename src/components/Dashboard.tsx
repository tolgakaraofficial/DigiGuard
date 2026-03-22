import React, { useState, useEffect } from 'react';
import { Shield, User, FileText, Settings, LogOut, CheckCircle, AlertTriangle, Bell, Activity, TrendingUp, Award, Lock, Eye, Fingerprint, Scan, Database, Users, Globe as Globe2, Workflow, Heart, Network, BookOpen, Download, CreditCard, BarChart3, TrendingDown, AlertCircle } from 'lucide-react';
import { UserScenariosModal } from './UserScenariosModal';
import { GlobalReachModal } from './GlobalReachModal';
import { IntegrationsModal } from './IntegrationsModal';
import { PublicBenefitModal } from './PublicBenefitModal';
import { PricingModal } from './PricingModal';
import { Sidebar } from './Sidebar';
import { AlbisChatBot } from './AlbisChatBot';
import { detectLanguage, translations, type Language } from '../utils/i18n';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [userScenariosOpen, setUserScenariosOpen] = useState(false);
  const [globalReachOpen, setGlobalReachOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);
  const [publicBenefitOpen, setPublicBenefitOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<Language>('tr');

  useEffect(() => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
  }, []);

  const t = translations[language];
  const stats = [
    { label: t.biometricStatus, value: t.verified, color: 'text-matrix-400', icon: Fingerprint, trend: '+100%' },
    { label: t.securityScore, value: '98/100', color: 'text-cyber-400', icon: Shield, trend: '+5%' },
    { label: t.activeProtection, value: '24/7', color: 'text-secure-400', icon: Activity, trend: language === 'tr' ? 'Sürekli' : 'Continuous' },
    { label: t.kycControl, value: language === 'tr' ? '2 saat önce' : '2 hours ago', color: 'text-slate-400', icon: Scan, trend: t.current },
  ];

  const features = [
    {
      title: 'Biyometrik Kimlik Dogrulama',
      description: 'AI destekli yuz tanima, parmak izi ve ses analizi ile kimliginizi dogrulayin',
      icon: Fingerprint,
      color: 'bg-gradient-to-br from-cyber-600 to-cyber-700',
      status: 'Aktif',
      lastUsed: '1 saat once',
      action: () => alert('Biyometrik dogrulama sistemi aktif!')
    },
    {
      title: 'Blockchain Guvenlik Sertifikasi',
      description: 'Blockchain tabanli KYC sertifikanizi goruntuyleyin, paylasin ve indirin',
      icon: Database,
      color: 'bg-gradient-to-br from-matrix-600 to-matrix-700',
      status: 'Guncel',
      lastUsed: 'Dun',
      action: () => alert('Sertifika indirme yakinda aktif olacak!')
    },
    {
      title: 'KYC Profil Yonetimi',
      description: 'Kisisel bilgilerinizi, guvenlik ayarlarinizi ve gizlilik tercihlerinizi yonetin',
      icon: Settings,
      color: 'bg-gradient-to-br from-slate-600 to-slate-700',
      status: 'Yapilandirildi',
      lastUsed: '3 gun once',
      action: () => alert('Profil yonetimi paneli yakinda aktif olacak!')
    },
    {
      title: 'Siber Tehdit Izleme',
      description: 'Dark web ve internette kimliginizle ilgili sahte icerikleri tespit edin',
      icon: Eye,
      color: 'bg-gradient-to-br from-red-600 to-red-700',
      status: 'Izleniyor',
      lastUsed: 'Surekli',
      action: () => alert('Tehdit izleme sistemi 7/24 aktif!')
    },
    {
      title: 'Guvenlik Analiz Raporlari',
      description: 'Detayli siber guvenlik analizleri ve kimlik koruma raporlarini inceleyin',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-secure-600 to-secure-700',
      status: 'Hazir',
      lastUsed: '1 hafta once',
      action: () => alert('Raporlar hazirlaniyor!')
    },
    {
      title: 'Acil Durum Mudahale',
      description: 'Kimlik hirsizligi ve siber saldiri durumunda aninda mudahale sistemi',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-amber-600 to-orange-600',
      status: 'Standby',
      lastUsed: 'Hic kullanilmadi',
      action: () => alert('Acil durum sistemi standby modunda!')
    },
    {
      title: 'Kullanici Senaryolari',
      description: 'Bireysel, kurumsal ve kamu kullanim senaryolarini inceleyin',
      icon: Users,
      color: 'bg-gradient-to-br from-blue-600 to-cyan-600',
      status: 'Bilgilendirme',
      lastUsed: 'Yeni',
      action: () => setUserScenariosOpen(true)
    },
    {
      title: 'Kuresel Erisim (7 Kita)',
      description: 'DigiGuard\'in dunya capindaki etkisini ve vizyonunu kesfedin',
      icon: Globe2,
      color: 'bg-gradient-to-br from-green-600 to-emerald-600',
      status: 'Global',
      lastUsed: 'Yeni',
      action: () => setGlobalReachOpen(true)
    },
    {
      title: 'Entegrasyonlar ve API',
      description: 'Sistemlerinize DigiGuard\'i kolayca entegre edin',
      icon: Workflow,
      color: 'bg-gradient-to-br from-purple-600 to-pink-600',
      status: 'Gelistirici',
      lastUsed: 'Yeni',
      action: () => setIntegrationsOpen(true)
    },
    {
      title: 'Kamu Yarari ve Sosyal Etki',
      description: 'Toplumsal fayda projeleri ve sosyal sorumluluk calismalari',
      icon: Heart,
      color: 'bg-gradient-to-br from-pink-600 to-rose-600',
      status: 'Sosyal',
      lastUsed: 'Yeni',
      action: () => setPublicBenefitOpen(true)
    },
    {
      title: 'Ekip Isbirligi Senaryolari',
      description: 'Kurumsal ekiplerde DigiGuard kullanimi ve yonetimi',
      icon: Network,
      color: 'bg-gradient-to-br from-indigo-600 to-blue-600',
      status: 'Kurumsal',
      lastUsed: 'Yeni',
      action: () => alert('Takimlar arası KYC yonetimi, rol tabanli erisim kontrolleri ve kurumsal dashboard ozellikleri yakinda!')
    },
    {
      title: 'Egitim ve Dokumantasyon',
      description: 'Video egitimler, kullanim kilavuzlari ve en iyi uygulamalar',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-yellow-600 to-orange-600',
      status: 'Egitim',
      lastUsed: 'Yeni',
      action: () => alert('Video egitim kutuphanesi, interaktif rehberler ve sertifika programlari hazirlaniyor!')
    },
    {
      title: 'Hizmetler ve Fiyatlandirma',
      description: 'Paketler, odeme secenekleri ve abonelik yonetimi',
      icon: CreditCard,
      color: 'bg-gradient-to-br from-green-600 to-emerald-600',
      status: 'Premium',
      lastUsed: 'Yeni',
      action: () => setPricingOpen(true)
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
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
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
            <span className="px-2 py-1 bg-cyber-600/30 text-cyber-300 text-xs rounded-full border border-cyber-500/50">
              AES-256
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
          <button
            onClick={onLogout}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-red-500/30"
          >
            <LogOut className="h-4 w-4" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-cyber-500/20 hover:border-cyber-500/50 transition-all shadow-lg hover:shadow-cyber-500/20 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-cyber-500/10 to-matrix-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.trend}</p>
              </div>
              <div className="relative">
                <stat.icon className={`h-10 w-10 ${stat.color}`} />
                <div className="absolute inset-0 blur-md opacity-50">
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Alert */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl p-6 mb-8 border border-amber-500/30 hover:border-amber-400/50 transition-all shadow-lg shadow-amber-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="flex items-start space-x-3 relative z-10">
          <AlertTriangle className="h-6 w-6 text-amber-400 mt-1 animate-pulse" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center flex-wrap gap-2">
              Siber Güvenlik Bildirimi
              <span className="px-2 py-1 bg-amber-600/30 text-amber-300 text-xs rounded-full border border-amber-500/50 animate-pulse">
                YENİ
              </span>
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              Son 24 saatte 3 adet sahte profil tespit edildi ve AI tabanlı sistemimiz tarafından otomatik olarak engellendi.
              Biyometrik kimlik korumanız başarıyla çalışıyor.
            </p>
            <div className="flex items-center flex-wrap gap-4 text-xs">
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

      {/* Security Metrics Panel */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyber-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <BarChart3 className="h-5 w-5 text-cyber-400 mr-2" />
            Güvenlik ve Risk Metrikleri
          </h3>
          <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
            Son Güncelleme: Az önce
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 hover:border-cyber-500/50 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.inverse ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20' : 'bg-gradient-to-br from-cyber-600/20 to-matrix-600/20'}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metric.inverse
                    ? 'bg-amber-600/20 text-amber-300'
                    : 'bg-green-600/20 text-green-300'
                }`}>
                  {metric.trend}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-slate-400">{metric.label}</span>
                  <span className={`text-2xl font-bold ${metric.color}`}>{metric.score}</span>
                </div>
                <div className="w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${metric.bgColor} rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Durum:</span>
                <span className={`text-xs font-medium ${metric.color}`}>{metric.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-green-300/80">Genel Güvenlik Skoru</p>
                <p className="text-2xl font-bold text-green-400">96.4/100</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-300/80">Tespit Edilen Tehdit</p>
                <p className="text-2xl font-bold text-amber-400">3 Engellendi</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyber-900/30 to-matrix-900/30 border border-cyber-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-cyber-500/20 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-cyber-400 animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-cyber-300/80">Aktif Koruma</p>
                <p className="text-2xl font-bold text-cyber-400">7/24</p>
              </div>
            </div>
          </div>
        </div>
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
              Biyometrik Aktivite Geçmişi
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

          <UserScenariosModal isOpen={userScenariosOpen} onClose={() => setUserScenariosOpen(false)} />
          <GlobalReachModal isOpen={globalReachOpen} onClose={() => setGlobalReachOpen(false)} />
          <IntegrationsModal isOpen={integrationsOpen} onClose={() => setIntegrationsOpen(false)} />
          <PublicBenefitModal isOpen={publicBenefitOpen} onClose={() => setPublicBenefitOpen(false)} />
          <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
        </div>
      </div>

      <AlbisChatBot language={language} />
    </div>
  );
};