import React from 'react';
import { Shield, User, FileText, Settings, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const stats = [
    { label: 'Doğrulanmış Profil', value: 'Aktif', color: 'text-emerald-400', icon: CheckCircle },
    { label: 'Güvenlik Seviyesi', value: 'Yüksek', color: 'text-blue-400', icon: Shield },
    { label: 'Son Güncelleme', value: '2 gün önce', color: 'text-slate-400', icon: FileText },
  ];

  const features = [
    {
      title: 'Kimlik Doğrulama',
      description: 'Yüz ve ses tanıma ile kimliğinizi doğrulayın',
      icon: User,
      color: 'bg-blue-600',
    },
    {
      title: 'Güvenlik Sertifikası',
      description: 'Dijital kimlik sertifikanızı görüntüleyin ve indirin',
      icon: FileText,
      color: 'bg-emerald-600',
    },
    {
      title: 'Profil Yönetimi',
      description: 'Kişisel bilgilerinizi ve güvenlik ayarlarınızı yönetin',
      icon: Settings,
      color: 'bg-purple-600',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kontrol Paneli</h1>
          <p className="text-slate-300">Dijital kimlik korumanız aktif ve güvenli</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Çıkış Yap</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Security Alert */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl p-6 mb-8 border border-amber-500/30">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-amber-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Güvenlik Uyarısı</h3>
            <p className="text-slate-300 text-sm">
              Yakın zamanda internette sahte içerik tespit edildi. Dijital kimlik korumanızın aktif olduğundan emin olun.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer group">
            <div className={`${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.description}</p>
            <div className="mt-4">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                Devam et →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};