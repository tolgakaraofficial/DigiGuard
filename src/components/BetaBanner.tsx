import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export const BetaBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldShow(false);
    }, 300);
  };

  if (!shouldShow) return null;

  return (
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg blur-xl opacity-75 animate-pulse"></div>

        <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg shadow-2xl border border-blue-400/50">
          <div className="px-6 py-4 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-8 w-8 text-yellow-300 opacity-75" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase">
                  Beta Demo
                </span>
                <span className="text-white font-bold text-lg">
                  DigiGuard Önizleme Sürümü
                </span>
              </div>
              <p className="text-blue-100 text-sm">
                Şu anda beta demo sürecindeyiz. Verileriniz test amaçlıdır ve gerçek doğrulama yapılmamaktadır.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="flex-shrink-0 text-white hover:text-blue-200 transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-1 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};
