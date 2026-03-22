import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, Shield, Fingerprint, Info } from 'lucide-react';
import { BiometricLogin } from './BiometricLogin';
import { BiometricData } from '../services/BiometricService';

interface LoginFormProps {
  onLogin: (email: string, phone: string) => void;
  onShowHashDemo: () => void;
  onShowAbout: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onShowHashDemo, onShowAbout }) => {
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
    <div className="max-w-md mx-auto">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={onShowHashDemo}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
        >
          <Shield className="h-5 w-5" />
          <span>SHA-256 Güvenlik Alanı</span>
        </button>
        <button
          onClick={onShowAbout}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
        >
          <Info className="h-5 w-5" />
          <span>Hakkında</span>
        </button>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Güvenli Giriş</h2>
          <p className="text-slate-300">
            Dijital kimliğinizi korumak için giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                placeholder="ornek@email.com"
              />
            </div>
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
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
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

        {/* Biometric Login Option */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">veya</span>
            </div>
          </div>
          
          <button
            onClick={() => setShowBiometric(true)}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
          >
            <Fingerprint className="h-5 w-5" />
            <span>Biyometrik Giriş (Web3/Web4/Web5)</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Giriş yaparak{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Kullanım Koşulları
            </a>{' '}
            ve{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};