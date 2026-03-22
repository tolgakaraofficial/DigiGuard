import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowRight, Shield, Eye, EyeOff, Lock, Info, Users, Fingerprint, Scan, Wallet, Smartphone, Globe, Zap, Camera, UserCheck, CheckCircle, MapPin, Activity, Building2, User, Briefcase } from 'lucide-react';
import { SecurityInfoModal } from './SecurityInfoModal';
import { AboutModal } from './AboutModal';
import { TeamModal } from './TeamModal';
import { TurkeyMapModal } from './TurkeyMapModal';
import { supabase } from '../services/supabaseClient';

interface LoginFormProps {
  onLogin: (email: string, phone: string, userType: string) => void;
}

type UserType = 'corporate' | 'individual' | 'personnel';

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [userType, setUserType] = useState<UserType>('individual');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string, phone?: string, password?: string}>({});
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showKYCPanel, setShowKYCPanel] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [totalCertifiedUsers, setTotalCertifiedUsers] = useState(0);
  const [kycStatus, setKycStatus] = useState({
    faceVerification: false,
    documentVerification: false,
    biometricScan: false,
  });

  useEffect(() => {
    fetchUserStatistics();
    const interval = setInterval(fetchUserStatistics, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchUserStatistics = async () => {
    const { data, error } = await supabase
      .from('user_statistics')
      .select('total_certified_users')
      .single();

    if (!error && data) {
      setTotalCertifiedUsers(data.total_certified_users);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    const newErrors: {email?: string, phone?: string, password?: string} = {};
    
    if (!email) {
      newErrors.email = 'E-posta adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }
    
    if (!phone) {
      newErrors.phone = 'Telefon numarası gereklidir';
    } else if (!/^(\+90|0)?[5][0-9]{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir Türkiye telefon numarası girin';
    }
    
    if (!password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    
    // API çağrısı simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1500));

    onLogin(email, phone, userType);
    setIsLoading(false);
  };

  const userTypes = [
    {
      id: 'individual' as UserType,
      label: 'Bireysel',
      icon: User,
      color: 'from-blue-600 to-cyan-600',
      hoverColor: 'from-blue-700 to-cyan-700',
      borderColor: 'border-blue-500',
      description: 'Kişisel kullanım için'
    },
    {
      id: 'corporate' as UserType,
      label: 'Kurumsal',
      icon: Building2,
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'from-purple-700 to-pink-700',
      borderColor: 'border-purple-500',
      description: 'Şirket ve kuruluşlar için'
    },
    {
      id: 'personnel' as UserType,
      label: 'Personel',
      icon: Briefcase,
      color: 'from-orange-600 to-red-600',
      hoverColor: 'from-orange-700 to-red-700',
      borderColor: 'border-orange-500',
      description: 'Çalışanlar için'
    },
  ];

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="mb-4 flex gap-3 flex-wrap">
        <div className="flex gap-2 flex-1 min-w-[280px]">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = userType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setUserType(type.id)}
                className={`relative flex-1 p-2 rounded-lg transition-all border-2 ${
                  isSelected
                    ? `bg-gradient-to-br ${type.color} ${type.borderColor} shadow-lg scale-105`
                    : 'bg-slate-700/30 border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <div className={`text-[10px] font-semibold mt-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {type.label}
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowSecurityModal(true)}
          className="bg-gradient-to-r from-cyber-600 to-secure-600 hover:from-cyber-700 hover:to-secure-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyber-500/50 whitespace-nowrap"
        >
          <Lock className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">SHA-256</span>
        </button>
        <button
          onClick={() => setShowAboutModal(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-500/50 hover:shadow-green-500/70 whitespace-nowrap"
        >
          <Info className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">Hakkında</span>
        </button>
        <button
          onClick={() => setShowTeamModal(true)}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 whitespace-nowrap"
        >
          <Users className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">DigiGuard</span>
        </button>
      </div>

      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-2xl border border-cyber-500/30 relative overflow-hidden">
        {/* Cyber glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-matrix-500/20 rounded-full blur-3xl"></div>

        <div className="mb-5 relative z-10 flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="bg-gradient-to-br from-cyber-600 to-matrix-600 p-2.5 rounded-full animate-fingerprint-pulse">
              <Fingerprint className="h-6 w-6 text-white" />
            </div>
            <div className="absolute inset-0 bg-cyber-400/30 rounded-full blur-xl animate-pulse"></div>
          </div>
          <div className="flex-1 text-left">
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent">
              Biyometrik Giriş
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5">
              <UserCheck className="h-3.5 w-3.5 text-cyber-400" />
              KYC Kimlik Doğrulama
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowKYCPanel(!showKYCPanel)}
            className="bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white font-medium py-2 px-4 text-xs rounded-lg transition-all flex items-center space-x-2 shadow-lg"
          >
            <Scan className="h-4 w-4" />
            <span>KYC Doğrula</span>
          </button>
        </div>

        {showKYCPanel && (
          <div className="mb-5 p-4 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-cyber-500/30 relative z-10">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
              <UserCheck className="h-4 w-4 text-cyber-400 mr-2" />
              KYC Kimlik Doğrulama Süreci
            </h3>

            <div className="space-y-2">
              <div className={`flex items-center justify-between p-3 rounded-lg ${kycStatus.faceVerification ? 'bg-green-900/30 border border-green-500/50' : 'bg-slate-700/50 border border-slate-600'}`}>
                <div className="flex items-center space-x-3">
                  <Camera className={`h-5 w-5 ${kycStatus.faceVerification ? 'text-green-400' : 'text-slate-400'}`} />
                  <div>
                    <p className={`text-sm font-medium ${kycStatus.faceVerification ? 'text-green-300' : 'text-slate-300'}`}>
                      Yüz Tarama
                    </p>
                    <p className="text-xs text-slate-500">Canlılık tespiti ve yüz doğrulama</p>
                  </div>
                </div>
                {kycStatus.faceVerification ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <button
                    onClick={() => setKycStatus({...kycStatus, faceVerification: true})}
                    className="text-xs bg-cyber-600 hover:bg-cyber-700 text-white px-3 py-1.5 rounded-md transition-all"
                  >
                    Başlat
                  </button>
                )}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${kycStatus.documentVerification ? 'bg-green-900/30 border border-green-500/50' : 'bg-slate-700/50 border border-slate-600'}`}>
                <div className="flex items-center space-x-3">
                  <Scan className={`h-5 w-5 ${kycStatus.documentVerification ? 'text-green-400' : 'text-slate-400'}`} />
                  <div>
                    <p className={`text-sm font-medium ${kycStatus.documentVerification ? 'text-green-300' : 'text-slate-300'}`}>
                      Kimlik Belgesi Tarama
                    </p>
                    <p className="text-xs text-slate-500">TC Kimlik, Pasaport veya Ehliyet</p>
                  </div>
                </div>
                {kycStatus.documentVerification ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <button
                    onClick={() => setKycStatus({...kycStatus, documentVerification: true})}
                    className="text-xs bg-cyber-600 hover:bg-cyber-700 text-white px-3 py-1.5 rounded-md transition-all"
                  >
                    Tarayın
                  </button>
                )}
              </div>

              <div className={`flex items-center justify-between p-3 rounded-lg ${kycStatus.biometricScan ? 'bg-green-900/30 border border-green-500/50' : 'bg-slate-700/50 border border-slate-600'}`}>
                <div className="flex items-center space-x-3">
                  <Fingerprint className={`h-5 w-5 ${kycStatus.biometricScan ? 'text-green-400' : 'text-slate-400'}`} />
                  <div>
                    <p className={`text-sm font-medium ${kycStatus.biometricScan ? 'text-green-300' : 'text-slate-300'}`}>
                      Biyometrik Veri Tarama
                    </p>
                    <p className="text-xs text-slate-500">Parmak izi veya retina taraması</p>
                  </div>
                </div>
                {kycStatus.biometricScan ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <button
                    onClick={() => setKycStatus({...kycStatus, biometricScan: true})}
                    className="text-xs bg-cyber-600 hover:bg-cyber-700 text-white px-3 py-1.5 rounded-md transition-all"
                  >
                    Tarayın
                  </button>
                )}
              </div>
            </div>

            {kycStatus.faceVerification && kycStatus.documentVerification && kycStatus.biometricScan && (
              <div className="mt-3 p-3 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300 font-medium">
                    KYC Doğrulama Tamamlandı
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm bg-slate-700/80 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white placeholder-slate-400 transition-all relative z-10 ${
                  errors.email ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="ornek@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Telefon Numarası
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm bg-slate-700/80 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white placeholder-slate-400 transition-all relative z-10 ${
                  errors.phone ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Şifre
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-2 sm:py-2.5 text-sm bg-slate-700/80 border rounded-lg focus:ring-2 focus:ring-cyber-500 focus:border-transparent text-white placeholder-slate-400 transition-all relative z-10 ${
                  errors.password ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="Şifrenizi girin"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyber-600 to-cyber-700 hover:from-cyber-700 hover:to-cyber-800 disabled:from-cyber-800 disabled:to-cyber-900 text-white font-medium py-2.5 px-4 text-sm rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyber-500/30 hover:shadow-cyber-500/50 relative z-10"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Doğrulama Kodu Gönder</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 space-y-2.5 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-slate-800 text-slate-400">Gelecek Nesil Giriş Yöntemleri</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-medium py-3 px-2 text-xs rounded-lg transition-all flex flex-col items-center justify-center space-y-1 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 group"
              >
                <Wallet className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <div className="font-semibold text-xs">Web3</div>
                  <div className="text-[9px] opacity-80">Wallet</div>
                </div>
              </button>

              <button
                type="button"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-2 text-xs rounded-lg transition-all flex flex-col items-center justify-center space-y-1 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 group"
              >
                <Globe className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <div className="font-semibold text-xs">Web4</div>
                  <div className="text-[9px] opacity-80">DID</div>
                </div>
              </button>

              <button
                type="button"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-2 text-xs rounded-lg transition-all flex flex-col items-center justify-center space-y-1 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 group"
              >
                <Smartphone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="text-center">
                  <div className="font-semibold text-xs">Web5</div>
                  <div className="text-[9px] opacity-80">DWN</div>
                </div>
              </button>
            </div>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-matrix-600 to-matrix-700 hover:from-matrix-700 hover:to-matrix-800 text-white font-medium py-3 px-4 text-sm rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-matrix-500/30 hover:shadow-matrix-500/50 animate-cyber-glow group"
            >
              <Fingerprint className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Biyometrik Yüz & Parmak İzi Tarama</span>
              <Camera className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="p-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Zap className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <p className="text-blue-200 text-xs leading-relaxed">
                  <span className="font-semibold">Web3/Web4/Web5 Ready:</span> Merkeziyetsiz kimlik doğrulama, blockchain tabanlı güvenlik ve kullanıcı kontrolünde veri yönetimi ile geleceğe hazır altyapı. KYC doğrulama ile tam uyumluluk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center relative z-10">
          <p className="text-xs text-slate-400">
            Giriş yaparak{' '}
            <a href="#" className="text-cyber-400 hover:text-cyber-300">
              Kullanım Koşulları
            </a>{' '}
            ve{' '}
            <a href="#" className="text-cyber-400 hover:text-cyber-300">
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursunuz.
          </p>
        </div>

        {/* Security indicators */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 relative z-10">
          <div className="flex items-center justify-center gap-1 px-1.5 py-1 bg-slate-700/50 rounded-md border border-cyber-500/30">
            <Lock className="h-3 w-3 text-cyber-400" />
            <span className="text-xs text-slate-300">AES-256</span>
          </div>
          <div className="flex items-center justify-center gap-1 px-1.5 py-1 bg-slate-700/50 rounded-md border border-matrix-500/30">
            <Fingerprint className="h-3 w-3 text-matrix-400" />
            <span className="text-xs text-slate-300">Biyometrik</span>
          </div>
          <div className="flex items-center justify-center gap-1 px-1.5 py-1 bg-slate-700/50 rounded-md border border-secure-500/30">
            <Shield className="h-3 w-3 text-secure-400" />
            <span className="text-xs text-slate-300">Blockchain</span>
          </div>
          <button
            onClick={() => setShowMapModal(true)}
            className="flex items-center justify-center gap-1 px-1.5 py-1 bg-gradient-to-r from-green-700/50 to-emerald-700/50 hover:from-green-600/70 hover:to-emerald-600/70 rounded-md border border-green-500/50 hover:border-green-400/70 transition-all cursor-pointer group"
          >
            <Activity className="h-3 w-3 text-green-400 animate-pulse" />
            <span className="text-xs text-green-300 font-semibold tabular-nums">
              {totalCertifiedUsers.toLocaleString('tr-TR')}
            </span>
            <MapPin className="h-3 w-3 text-green-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <SecurityInfoModal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />
      <TurkeyMapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        totalUsers={totalCertifiedUsers}
      />
    </div>
  );
};