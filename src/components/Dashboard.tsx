import React from 'react';
import { Shield, User, FileText, Settings, CheckCircle, AlertTriangle, Lock, ShieldCheck, Eye, Fingerprint } from 'lucide-react';
import { PaymentButtons } from './PaymentButtons';

interface DashboardProps {
  onLogout?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = () => {
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

  const handlePayment = (type: 'certificate' | 'report', amount: number) => {
    console.log(`Payment completed: ${type} - $${amount}`);
    // Here you can add logic to update user's premium features
  };
  return (
    <div>
      {/* Header with Security Badges */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Kontrol Paneli</h1>
            <p className="text-slate-300">Dijital kimlik korumanız aktif ve güvenli</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-emerald-600/20 px-4 py-2 rounded-lg border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold text-sm">Korumalı</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-lg border border-blue-500/30">
              <Lock className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm">Şifreli</span>
            </div>
          </div>
        </div>

        {/* Security Visual Banner */}
        <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-blue-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Güvenlik Sistemi Aktif</h2>
              <p className="text-slate-300">SHA-256 şifreleme, blockchain doğrulama ve AI koruma etkin</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <span className="text-xs text-slate-400">Blockchain</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-2">
                  <Fingerprint className="h-8 w-8 text-white" />
                </div>
                <span className="text-xs text-slate-400">Biyometrik</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-2">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <span className="text-xs text-slate-400">AI Tespit</span>
              </div>
            </div>
          </div>
        </div>
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

      {/* Premium Services Section */}
      <div className="mt-12">
        <PaymentButtons onPayment={handlePayment} />
      </div>
    </div>
  );
};