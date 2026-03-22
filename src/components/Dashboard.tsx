import React from 'react';
import { Shield, User, FileText, Settings, LogOut, CheckCircle, AlertTriangle, Bell, Activity, TrendingUp, Award, Lock, Eye, Fingerprint, Scan, Database } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const stats = [
    { label: 'Biyometrik Durum', value: 'Doğrulandı', color: 'text-matrix-400', icon: Fingerprint, trend: '+100%' },
    { label: 'Güvenlik Skoru', value: '98/100', color: 'text-cyber-400', icon: Shield, trend: '+5%' },
    { label: 'Aktif Koruma', value: '24/7', color: 'text-secure-400', icon: Activity, trend: 'Sürekli' },
    { label: 'KYC Kontrol', value: '2 saat önce', color: 'text-slate-400', icon: Scan, trend: 'Güncel' },
  ];

  const features = [
    {
      title: 'Biyometrik Kimlik Doğrulama',
      description: 'AI destekli yüz tanıma, parmak izi ve ses analizi ile kimliğinizi doğrulayın',
      icon: Fingerprint,
      color: 'bg-gradient-to-br from-cyber-600 to-cyber-700',
      status: 'Aktif',
      lastUsed: '1 saat önce'
    },
    {
      title: 'Blockchain Güvenlik Sertifikası',
      description: 'Blockchain tabanlı KYC sertifikanızı görüntüleyin, paylaşın ve indirin',
      icon: Database,
      color: 'bg-gradient-to-br from-matrix-600 to-matrix-700',
      status: 'Güncel',
      lastUsed: 'Dün'
    },
    {
      title: 'KYC Profil Yönetimi',
      description: 'Kişisel bilgilerinizi, güvenlik ayarlarınızı ve gizlilik tercihlerinizi yönetin',
      icon: Settings,
      color: 'bg-gradient-to-br from-slate-600 to-slate-700',
      status: 'Yapılandırıldı',
      lastUsed: '3 gün önce'
    },
    {
      title: 'Siber Tehdit İzleme',
      description: 'Dark web ve internette kimliğinizle ilgili sahte içerikleri tespit edin',
      icon: Eye,
      color: 'bg-gradient-to-br from-red-600 to-red-700',
      status: 'İzleniyor',
      lastUsed: 'Sürekli'
    },
    {
      title: 'Güvenlik Analiz Raporları',
      description: 'Detaylı siber güvenlik analizleri ve kimlik koruma raporlarını inceleyin',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-secure-600 to-secure-700',
      status: 'Hazır',
      lastUsed: '1 hafta önce'
    },
    {
      title: 'Acil Durum Müdahale',
      description: 'Kimlik hırsızlığı ve siber saldırı durumunda anında müdahale sistemi',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-amber-600 to-orange-600',
      status: 'Standby',
      lastUsed: 'Hiç kullanılmadı'
    },
  ];

  const recentActivities = [
    { action: 'Kimlik doğrulama başarılı', time: '2 saat önce', type: 'success' },
    { action: 'Güvenlik taraması tamamlandı', time: '6 saat önce', type: 'info' },
    { action: 'Profil bilgileri güncellendi', time: '1 gün önce', type: 'warning' },
    { action: 'Yeni cihaz girişi tespit edildi', time: '2 gün önce', type: 'alert' },
  ];
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-400 via-matrix-400 to-secure-400 bg-clip-text text-transparent mb-2">
            DigiGuard Biyometrik Kontrol Merkezi
          </h1>
          <p className="text-slate-300 flex items-center flex-wrap gap-2">
            <Fingerprint className="h-4 w-4 text-matrix-400 animate-fingerprint-pulse" />
            KYC kimliğiniz aktif olarak korunuyor
            <span className="ml-2 px-2 py-1 bg-matrix-600/30 text-matrix-300 text-xs rounded-full border border-matrix-500/50 animate-pulse">
              CANLI
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
            <span>Güvenli Çıkış</span>
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

      {/* Recent Activities */}
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyber-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="h-5 w-5 text-cyber-400 mr-2" />
          Biyometrik Aktivite Geçmişi
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors border-l-2 border-l-transparent hover:border-l-cyber-400">
              <div className="flex items-center space-x-3">
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  activity.type === 'success' ? 'bg-matrix-400' :
                  activity.type === 'info' ? 'bg-cyber-400' :
                  activity.type === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                <span className="text-white text-sm">{activity.action}</span>
              </div>
              <span className="text-slate-400 text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-cyber-500/20 hover:border-cyber-500/50 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-cyber-500/20 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-cyber-500/10 to-matrix-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className={`${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full border ${
                feature.status === 'Aktif' ? 'bg-matrix-600/30 text-matrix-300 border-matrix-500/50' :
                feature.status === 'Güncel' ? 'bg-cyber-600/30 text-cyber-300 border-cyber-500/50' :
                feature.status === 'İzleniyor' ? 'bg-red-600/30 text-red-300 border-red-500/50' :
                'bg-slate-600/30 text-slate-300 border-slate-500/50'
              }`}>
                {feature.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-3 relative z-10">{feature.description}</p>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs text-slate-500">Son: {feature.lastUsed}</span>
              <span className="text-cyber-400 text-sm font-medium group-hover:text-cyber-300 transition-colors">
                Aç →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};