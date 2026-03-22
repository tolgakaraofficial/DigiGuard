import React, { useState } from 'react';
import { Mail, Phone, ArrowRight, Shield, Eye, EyeOff } from 'lucide-react';

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
      <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-600 p-2.5 rounded-full">
              <Shield className="h-7 w-7 text-white" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Güvenli Giriş</h2>
          <p className="text-sm sm:text-base text-slate-300">
            Dijital kimliğinizi korumak için giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 ${
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
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 ${
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
                className={`w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 ${
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
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center space-x-2"
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

        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">veya</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/50"
          >
            <Shield className="h-5 w-5" />
            <span>Biyometrik Kimlik Doğrulama</span>
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