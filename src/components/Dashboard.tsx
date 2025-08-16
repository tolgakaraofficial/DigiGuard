import React from 'react';
import { Shield, User, FileText, Settings, LogOut, CheckCircle, AlertTriangle, Bell, Activity, TrendingUp, Award, Lock, Eye } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const stats = [
    { label: 'Kimlik Durumu', value: 'Doğrulandı', color: 'text-emerald-400', icon: CheckCircle, trend: '+100%' },
    { label: 'Güvenlik Skoru', value: '98/100', color: 'text-blue-400', icon: Shield, trend: '+5%' },
    { label: 'Aktif Koruma', value: '24/7', color: 'text-purple-400', icon: Activity, trend: 'Sürekli' },
    { label: 'Son Kontrol', value: '2 saat önce', color: 'text-slate-400', icon: FileText, trend: 'Güncel' },
  ];

  const features = [
    {
      title: 'Gelişmiş Kimlik Doğrulama',
      description: 'AI destekli yüz, ses ve davranış analizi ile kimliğinizi doğrulayın',
      icon: User,
      color: 'bg-blue-600',
      status: 'Aktif',
      lastUsed: '1 saat önce'
    },
    {
      title: 'Dijital Güvenlik Sertifikası',
      description: 'Blockchain tabanlı sertifikanızı görüntüleyin, paylaşın ve indirin',
      icon: FileText,
      color: 'bg-emerald-600',
      status: 'Güncel',
      lastUsed: 'Dün'
    },
    {
      title: 'Akıllı Profil Yönetimi',
      description: 'Kişisel bilgilerinizi, güvenlik ayarlarınızı ve gizlilik tercihlerinizi yönetin',
      icon: Settings,
      color: 'bg-purple-600',
      status: 'Yapılandırıldı',
      lastUsed: '3 gün önce'
    },
    {
      title: 'Tehdit İzleme',
      description: 'İnternette kimliğinizle ilgili sahte içerikleri tespit edin ve engelleyin',
      icon: Eye,
      color: 'bg-red-600',
      status: 'İzleniyor',
      lastUsed: 'Sürekli'
    },
    {
      title: 'Güvenlik Raporları',
      description: 'Detaylı güvenlik analizleri ve kimlik koruma raporlarını inceleyin',
      icon: TrendingUp,
      color: 'bg-indigo-600',
      status: 'Hazır',
      lastUsed: '1 hafta önce'
    },
    {
      title: 'Acil Durum Koruması',
      description: 'Kimlik hırsızlığı durumunda anında müdahale ve koruma sistemi',
      icon: AlertTriangle,
      color: 'bg-orange-600',
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            DigiGuard Kontrol Merkezi
          </h1>
          <p className="text-slate-300 flex items-center">
            <Shield className="h-4 w-4 text-emerald-400 mr-2" />
            Dijital kimliğiniz aktif olarak korunuyor
            <span className="ml-2 px-2 py-1 bg-emerald-600/20 text-emerald-300 text-xs rounded-full">
              CANLI
            </span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Güvenli Çıkış</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.trend}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Security Alert */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl p-6 mb-8 border border-amber-500/30 hover:border-amber-400/50 transition-colors">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-amber-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              Güvenlik Bildirimi
              <span className="ml-2 px-2 py-1 bg-amber-600/30 text-amber-300 text-xs rounded-full">
                YENİ
              </span>
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              Son 24 saatte 3 adet sahte profil tespit edildi ve otomatik olarak engellendi. 
              Dijital kimlik korumanız başarıyla çalışıyor.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-emerald-400 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Otomatik Koruma Aktif
              </span>
              <span className="text-blue-400 flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Veriler Güvende
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="h-5 w-5 text-blue-400 mr-2" />
          Son Aktiviteler
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-emerald-400' :
                  activity.type === 'info' ? 'bg-blue-400' :
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
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-slate-900/50">
            <div className={`${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                feature.status === 'Aktif' ? 'bg-emerald-600/20 text-emerald-300' :
                feature.status === 'Güncel' ? 'bg-blue-600/20 text-blue-300' :
                feature.status === 'İzleniyor' ? 'bg-red-600/20 text-red-300' :
                'bg-slate-600/20 text-slate-300'
              }`}>
                {feature.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-3">{feature.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Son: {feature.lastUsed}</span>
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                Aç →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};