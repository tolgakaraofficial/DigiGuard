import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, Shield, Eye, EyeOff, Lock, Info, Users, Fingerprint, Scan } from 'lucide-react';
import { SecurityInfoModal } from './SecurityInfoModal';
import { AboutModal } from './AboutModal';
import { TeamModal } from './TeamModal';

interface LoginFormProps {
  onLogin: (email: string, phone: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string, phone?: string, password?: string}>({});
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

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
    
    onLogin(email, phone);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setShowSecurityModal(true)}
          className="flex-1 bg-gradient-to-r from-cyber-600 to-secure-600 hover:from-cyber-700 hover:to-secure-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyber-500/50"
        >
          <Lock className="h-4 w-4" />
          <span className="text-sm">SHA-256 Güvenlik</span>
        </button>
        <button
          onClick={() => setShowAboutModal(true)}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-500/50 hover:shadow-green-500/70"
        >
          <Info className="h-4 w-4" />
          <span className="text-sm">Hakkında</span>
        </button>
        <button
          onClick={() => setShowTeamModal(true)}
          className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70"
        >
          <Users className="h-4 w-4" />
          <span className="text-sm">DigiGuard Ekibi</span>
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
              <Scan className="h-3.5 w-3.5 text-cyber-400" />
              KYC Kimlik Doğrulama
            </p>
          </div>
        </div>

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
              <span className="px-2 bg-slate-800 text-slate-400">veya</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-gradient-to-r from-matrix-600 to-matrix-700 hover:from-matrix-700 hover:to-matrix-800 text-white font-medium py-2.5 px-4 text-sm rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-matrix-500/30 hover:shadow-matrix-500/50 animate-cyber-glow"
          >
            <Fingerprint className="h-4 w-4" />
            <span>Biyometrik Doğrulama</span>
          </button>
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
        <div className="mt-3 grid grid-cols-3 gap-1.5 relative z-10">
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
        </div>
      </div>

      <SecurityInfoModal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />
    </div>
  );
};