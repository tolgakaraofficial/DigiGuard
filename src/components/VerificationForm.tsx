import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, RotateCcw } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
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
              onChange={(e) => setEmailCode(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-center text-lg tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
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
              onChange={(e) => setPhoneCode(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-center text-lg tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400">
              Kodların süresi: {formatTime(timeLeft)}
            </p>
            {timeLeft === 0 && (
              <button
                type="button"
                onClick={() => {
                  setTimeLeft(300);
                  // Here you would normally call an API to resend codes
                }}
                className="text-blue-400 hover:text-blue-300 text-sm mt-2"
              >
                <RotateCcw className="h-4 w-4 inline mr-1" />
                Yeni kod gönder
              </button>
            )}
          </div>

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