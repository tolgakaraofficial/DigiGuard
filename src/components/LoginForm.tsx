import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, Shield, Fingerprint, Info, Lock, ShieldCheck, Users } from 'lucide-react';
import { BiometricLogin } from './BiometricLogin';
import { BiometricData } from '../services/BiometricService';

interface LoginFormProps {
  onLogin: (email: string, phone: string) => void;
  onShowHashDemo: () => void;
  onShowAbout: () => void;
  onShowTeam: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onShowHashDemo, onShowAbout, onShowTeam }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricError, setBiometricError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin(email, phone);
    setIsLoading(false);
  };

  const handleBiometricSuccess = (biometricData: BiometricData) => {
    console.log('Biyometrik doğrulama başarılı:', biometricData);
    // Biyometrik verilerle otomatik giriş
    onLogin('biometric@digiguard.com', 'biometric-auth');
  };

  const handleBiometricError = (error: string) => {
    setBiometricError(error);
    setTimeout(() => setBiometricError(null), 5000);
  };

  if (showBiometric) {
    return (
      <div>
        <BiometricLogin 
          onSuccess={handleBiometricSuccess}
          onError={handleBiometricError}
        />
        {biometricError && (
          <div className="mt-4 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{biometricError}</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowBiometric(false)}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            ← Geleneksel girişe dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        <button
          onClick={onShowHashDemo}
          className="bg-blue-600/80 backdrop-blur-sm hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/50 hover:scale-105 text-sm"
        >
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">SHA-256 Güvenlik</span>
          <span className="sm:hidden">SHA-256</span>
        </button>
        <button
          onClick={onShowAbout}
          className="bg-emerald-600/80 backdrop-blur-sm hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-emerald-500/50 hover:scale-105 text-sm"
        >
          <Info className="h-4 w-4" />
          <span>Hakkında</span>
        </button>
        <button
          onClick={onShowTeam}
          className="bg-orange-600/80 backdrop-blur-sm hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-orange-500/50 hover:scale-105 text-sm"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">DigiGuard Ekibi</span>
          <span className="sm:hidden">Ekip</span>
        </button>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 hover:shadow-blue-500/20 transition-all duration-500">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-full animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg">Güvenli Giriş</h2>
              <p className="text-slate-300 text-sm">
                Dijital kimliğinizi koruyun
              </p>
            </div>
          </div>

          {/* Security Indicators */}
          <div className="flex items-center justify-start gap-3 pl-1">
            <div className="flex items-center space-x-1 text-xs text-emerald-400 drop-shadow-md">
              <ShieldCheck className="h-3 w-3" />
              <span>SSL Güvenli</span>
            </div>
            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
            <div className="flex items-center space-x-1 text-xs text-blue-400 drop-shadow-md">
              <Lock className="h-3 w-3" />
              <span>256-bit Şifreleme</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 drop-shadow-md">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-400 transition-all duration-300 text-sm drop-shadow-lg"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 drop-shadow-md">
              Telefon Numarası
            </label>
            <div className="relative">
              <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-400 transition-all duration-300 text-sm drop-shadow-lg"
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-blue-800 disabled:to-blue-900 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] text-sm"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Doğrulama Kodu Gönder</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Biometric Login Option */}
        <div className="mt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-slate-800/60 text-slate-400">veya</span>
            </div>
          </div>

          <button
            onClick={() => setShowBiometric(true)}
            className="mt-3 w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 backdrop-blur-sm text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] text-sm"
          >
            <Fingerprint className="h-4 w-4" />
            <span className="hidden sm:inline">Biyometrik Giriş (Web3/Web4/Web5)</span>
            <span className="sm:hidden">Biyometrik Giriş</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400 drop-shadow-md">
            Giriş yaparak{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Kullanım Koşulları
            </a>{' '}
            ve{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};