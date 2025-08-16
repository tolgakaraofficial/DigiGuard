import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';

interface VerificationFormProps {
  email: string;
  phone: string;
  onVerify: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  phone,
  onVerify,
}) => {
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{emailCode?: string, phoneCode?: string}>({});
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendCode = () => {
    if (resendCount >= 3) {
      alert('Çok fazla kod gönderme isteği. Lütfen daha sonra tekrar deneyin.');
      return;
    }
    
    setTimeLeft(300);
    setResendCount(prev => prev + 1);
    // Burada gerçek API çağrısı yapılacak
    console.log('Yeni doğrulama kodları gönderiliyor...');
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    const newErrors: {emailCode?: string, phoneCode?: string} = {};
    
    if (!emailCode) {
      newErrors.emailCode = 'E-posta doğrulama kodu gereklidir';
    } else if (emailCode.length !== 6) {
      newErrors.emailCode = 'Doğrulama kodu 6 haneli olmalıdır';
    } else if (!/^\d{6}$/.test(emailCode)) {
      newErrors.emailCode = 'Doğrulama kodu sadece rakamlardan oluşmalıdır';
    }
    
    if (!phoneCode) {
      newErrors.phoneCode = 'SMS doğrulama kodu gereklidir';
    } else if (phoneCode.length !== 6) {
      newErrors.phoneCode = 'Doğrulama kodu 6 haneli olmalıdır';
    } else if (!/^\d{6}$/.test(phoneCode)) {
      newErrors.phoneCode = 'Doğrulama kodu sadece rakamlardan oluşmalıdır';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);

    // API çağrısı simülasyonu
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onVerify();
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Doğrulama</h2>
          <p className="text-slate-300">
            E-posta ve telefon numaranıza gönderilen kodları girin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              E-posta Doğrulama Kodu
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {email} adresine gönderildi
            </p>
            <input
              type="text"
              required
              value={emailCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setEmailCode(value);
              }}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-center text-lg tracking-widest ${
                errors.emailCode ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="000000"
              maxLength={6}
            />
            {errors.emailCode && <p className="text-red-400 text-sm mt-1">{errors.emailCode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              SMS Doğrulama Kodu
            </label>
            <p className="text-xs text-slate-400 mb-2">
              {phone} numarasına gönderildi
            </p>
            <input
              type="text"
              required
              value={phoneCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setPhoneCode(value);
              }}
              className={`w-full px-4 py-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-center text-lg tracking-widest ${
                errors.phoneCode ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="000000"
              maxLength={6}
            />
            {errors.phoneCode && <p className="text-red-400 text-sm mt-1">{errors.phoneCode}</p>}
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400">
              Kodların süresi: {formatTime(timeLeft)}
            </p>
            {timeLeft === 0 && (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCount >= 3}
                className={`text-sm mt-2 ${
                  resendCount >= 3 
                    ? 'text-slate-500 cursor-not-allowed' 
                    : 'text-blue-400 hover:text-blue-300 cursor-pointer'
                }`}
              >
                <RotateCcw className="h-4 w-4 inline mr-1" />
                {resendCount >= 3 ? 'Kod gönderme limiti aşıldı' : 'Yeni kod gönder'}
              </button>
            )}
            {resendCount > 0 && resendCount < 3 && (
              <p className="text-xs text-amber-400 mt-1">
                Kalan deneme hakkı: {3 - resendCount}
              </p>
            )}
          </div>

          {timeLeft > 0 && timeLeft < 60 && (
            <div className="bg-amber-600/20 border border-amber-500/30 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <p className="text-amber-300 text-sm">
                Kodlarınızın süresi dolmak üzere! Lütfen acele edin.
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || !emailCode || !phoneCode}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Doğrula</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};