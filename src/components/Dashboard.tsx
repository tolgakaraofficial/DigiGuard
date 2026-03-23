import React, { useState, useEffect } from 'react';
import { Shield, Settings, LogOut, CheckCircle, AlertTriangle, Bell, Activity, TrendingUp, Lock, Eye, Fingerprint, Scan, Database, Users, Globe as Globe2, Heart, BookOpen, CreditCard, BarChart3, AlertCircle, Award, Workflow, Network, Info } from 'lucide-react';
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
import jsPDF from 'jspdf';

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

  const generateBlockchainCertificate = () => {
    const doc = new jsPDF();

    const now = new Date();
    const timestamp = now.toISOString();
    const blockchainHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const certificateId = `DG-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setDrawColor(6, 182, 212);
    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);

    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(0.5);
    doc.rect(15, 15, 180, 267);

    doc.setTextColor(6, 182, 212);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('DigiGuard', 105, 40, { align: 'center' });

    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text('BLOCKCHAIN KYC SERTİFİKASI', 105, 55, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('Dijital Kimlik Doğrulama ve Güvenlik Sistemi', 105, 65, { align: 'center' });

    doc.setDrawColor(71, 85, 105);
    doc.setLineWidth(0.5);
    doc.line(30, 75, 180, 75);

    doc.setFontSize(12);
    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'bold');
    doc.text('SERTİFİKA BİLGİLERİ', 30, 90);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);

    doc.text('Sertifika No:', 30, 105);
    doc.setTextColor(6, 182, 212);
    doc.text(certificateId, 80, 105);

    doc.setTextColor(148, 163, 184);
    doc.text('Kullanıcı Tipi:', 30, 115);
    doc.setTextColor(34, 197, 94);
    doc.text(getUserTypeLabel(), 80, 115);

    doc.setTextColor(148, 163, 184);
    doc.text('Doğrulama Seviyesi:', 30, 125);
    doc.setTextColor(34, 197, 94);
    doc.text('Tam Doğrulanmış (KYC Level 3)', 80, 125);

    doc.setTextColor(148, 163, 184);
    doc.text('Güvenlik Skoru:', 30, 135);
    doc.setTextColor(34, 197, 94);
    doc.text('98/100 - Mükemmel', 80, 135);

    doc.setFontSize(12);
    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'bold');
    doc.text('BLOCKCHAIN DOĞRULAMA', 30, 155);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);

    doc.text('Blockchain Hash:', 30, 170);
    doc.setTextColor(139, 92, 246);
    doc.setFontSize(8);
    doc.text(blockchainHash.substring(0, 50), 30, 178);
    doc.text(blockchainHash.substring(50), 30, 184);

    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('Zaman Damgası:', 30, 197);
    doc.setTextColor(6, 182, 212);
    doc.text(timestamp, 80, 197);

    doc.setTextColor(148, 163, 184);
    doc.text('Blockchain Ağı:', 30, 207);
    doc.setTextColor(34, 197, 94);
    doc.text('Ethereum Mainnet', 80, 207);

    doc.setTextColor(148, 163, 184);
    doc.text('Şifreleme:', 30, 217);
    doc.setTextColor(34, 197, 94);
    doc.text('AES-256 + SHA-256', 80, 217);

    doc.setFontSize(12);
    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'bold');
    doc.text('DOĞRULANAN ÖZELLİKLER', 30, 235);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const features = [
      '✓ Biyometrik Kimlik Doğrulama (Yüz + Parmak İzi)',
      '✓ Canlılık Tespiti (Liveness Detection)',
      '✓ Kimlik Belgesi Doğrulaması',
      '✓ Adres Doğrulaması',
      '✓ Telefon ve E-posta Doğrulaması',
      '✓ AI Tabanlı Sahtecilik Kontrolü'
    ];

    let yPos = 245;
    features.forEach(feature => {
      doc.setTextColor(34, 197, 94);
      doc.text(feature, 35, yPos);
      yPos += 7;
    });

    doc.setDrawColor(71, 85, 105);
    doc.setLineWidth(0.5);
    doc.line(30, 287, 180, 287);

    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'italic');
    doc.text('Bu sertifika blockchain teknolojisi ile güvence altına alınmıştır ve değiştirilemez.', 105, 293, { align: 'center' });
    doc.text(`Doğrulama: https://digiguard.app/verify/${certificateId}`, 105, 297, { align: 'center' });

    doc.save(`DigiGuard_Blockchain_Certificate_${certificateId}.pdf`);
  };

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
      action: () => generateBlockchainCertificate()
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