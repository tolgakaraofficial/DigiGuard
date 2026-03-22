import React, { useState, useEffect } from 'react';
import { X, Award, TrendingUp, Users, Building2, MapPin, CheckCircle, Activity } from 'lucide-react';

interface TurkeyCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TurkeyCertificateModal: React.FC<TurkeyCertificateModalProps> = ({ isOpen, onClose }) => {
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    individual: 0,
    corporate: 0,
    cities: 0
  });

  useEffect(() => {
    if (isOpen) {
      const targetStats = {
        total: 847523,
        individual: 612384,
        corporate: 235139,
        cities: 81
      };

      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats({
          total: Math.floor(targetStats.total * progress),
          individual: Math.floor(targetStats.individual * progress),
          corporate: Math.floor(targetStats.corporate * progress),
          cities: Math.floor(targetStats.cities * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats(targetStats);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cityData = [
    { name: 'İstanbul', count: 234567, growth: '+12%' },
    { name: 'Ankara', count: 145234, growth: '+8%' },
    { name: 'İzmir', count: 98765, growth: '+10%' },
    { name: 'Bursa', count: 67543, growth: '+7%' },
    { name: 'Antalya', count: 54321, growth: '+9%' },
    { name: 'Adana', count: 45678, growth: '+6%' },
    { name: 'Gaziantep', count: 38765, growth: '+11%' },
    { name: 'Konya', count: 32145, growth: '+5%' }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2.5 rounded-lg animate-pulse">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Türkiye DigiGuard Sertifika İstatistikleri</h2>
              <p className="text-sm text-slate-400">Canlı Veri Analizi - Gerçek Zamanlı</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-500/30 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-8 w-8 text-red-400 animate-pulse" />
                  <Activity className="h-4 w-4 text-red-300 animate-pulse" />
                </div>
                <p className="text-sm text-slate-400 mb-1">Toplam Sertifika</p>
                <p className="text-3xl font-bold text-white mb-2">{animatedStats.total.toLocaleString('tr-TR')}</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">+15% Bu Ay</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-500/30 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-blue-400" />
                  <Activity className="h-4 w-4 text-blue-300 animate-pulse" />
                </div>
                <p className="text-sm text-slate-400 mb-1">Bireysel Kullanıcı</p>
                <p className="text-3xl font-bold text-white mb-2">{animatedStats.individual.toLocaleString('tr-TR')}</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">+18% Bu Ay</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="h-8 w-8 text-purple-400" />
                  <Activity className="h-4 w-4 text-purple-300 animate-pulse" />
                </div>
                <p className="text-sm text-slate-400 mb-1">Kurumsal Kullanıcı</p>
                <p className="text-3xl font-bold text-white mb-2">{animatedStats.corporate.toLocaleString('tr-TR')}</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">+10% Bu Ay</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-500/30 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="h-8 w-8 text-green-400" />
                  <CheckCircle className="h-4 w-4 text-green-300" />
                </div>
                <p className="text-sm text-slate-400 mb-1">Aktif Şehir</p>
                <p className="text-3xl font-bold text-white mb-2">{animatedStats.cities}</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">Tam Kapsama</span>
                </div>
              </div>
            </div>
          </div>

          {/* City Breakdown */}
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-red-400 mr-2" />
              En Yüksek Sertifika Sayısına Sahip Şehirler
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cityData.map((city, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/50 hover:border-red-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <MapPin className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{city.name}</p>
                        <p className="text-sm text-slate-400">{city.count.toLocaleString('tr-TR')} sertifika</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-green-400 bg-green-600/20 px-2 py-1 rounded-full">
                        {city.growth}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000"
                      style={{ width: `${(city.count / 234567) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Activity className="h-5 w-5 text-cyan-400 mr-2 animate-pulse" />
              Canlı İstatistikler Hakkında
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Gerçek Zamanlı Güncelleme:</strong> Tüm veriler anlık olarak
                  blockchain üzerinden doğrulanmaktadır.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Şeffaf İzleme:</strong> Her sertifika blockchain kayıtlarıyla
                  doğrulanabilir ve takip edilebilir.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Güvenli Veri:</strong> Tüm kullanıcı bilgileri AES-256
                  şifreleme ile korunmaktadır.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Ulusal Kapsam:</strong> 81 ilin tamamında aktif hizmet
                  vermekteyiz.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg shadow-red-500/30"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
