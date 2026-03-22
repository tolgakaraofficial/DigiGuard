import React, { useEffect, useState } from 'react';
import { X, Users, MapPin, TrendingUp, Sparkles, Activity, Building2, User, Briefcase } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface CityStatistics {
  id: string;
  city_name: string;
  city_code: string;
  certified_users: number;
  region: string;
  coordinates: { lat: number; lng: number };
  last_updated: string;
}

interface UserTypeStats {
  user_type: string;
  total_users: number;
  verified_users: number;
  pending_users: number;
  active_users: number;
}

interface TurkeyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalUsers: number;
}

export const TurkeyMapModal: React.FC<TurkeyMapModalProps> = ({ isOpen, onClose, totalUsers }) => {
  const [cityStats, setCityStats] = useState<CityStatistics[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityStatistics | null>(null);
  const [userTypeStats, setUserTypeStats] = useState<UserTypeStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchStatistics();
      const interval = setInterval(fetchStatistics, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const fetchStatistics = async () => {
    const [cityResult, typeResult] = await Promise.all([
      supabase.from('city_statistics').select('*').order('certified_users', { ascending: false }),
      supabase.from('user_type_statistics').select('*')
    ]);

    if (!cityResult.error && cityResult.data) {
      setCityStats(cityResult.data);
    }

    if (!typeResult.error && typeResult.data) {
      setUserTypeStats(typeResult.data);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  const topCities = cityStats.slice(0, 10);
  const regions = [...new Set(cityStats.map(c => c.region))];

  const getRegionTotal = (region: string) => {
    return cityStats
      .filter(c => c.region === region)
      .reduce((sum, c) => sum + c.certified_users, 0);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-cyber-500/30 relative">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-matrix-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-cyber-600 to-matrix-600 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent">
                  Türkiye Sertifika Haritası
                </h2>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-green-400 animate-pulse" />
                  Canlı İstatistikler
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-800/30 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <User className="h-7 w-7 text-blue-400" />
                  <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 tabular-nums">
                  {userTypeStats.find(s => s.user_type === 'individual')?.total_users.toLocaleString('tr-TR') || '0'}
                </div>
                <div className="text-xs text-slate-400">Bireysel Kullanıcı</div>
                <div className="mt-2 text-[10px] text-blue-300">
                  {userTypeStats.find(s => s.user_type === 'individual')?.verified_users.toLocaleString('tr-TR') || '0'} Doğrulanmış
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-pink-800/30 border border-purple-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Building2 className="h-7 w-7 text-purple-400" />
                  <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 tabular-nums">
                  {userTypeStats.find(s => s.user_type === 'corporate')?.total_users.toLocaleString('tr-TR') || '0'}
                </div>
                <div className="text-xs text-slate-400">Kurumsal Kullanıcı</div>
                <div className="mt-2 text-[10px] text-purple-300">
                  {userTypeStats.find(s => s.user_type === 'corporate')?.verified_users.toLocaleString('tr-TR') || '0'} Doğrulanmış
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-900/50 to-red-800/30 border border-orange-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="h-7 w-7 text-orange-400" />
                  <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 tabular-nums">
                  {userTypeStats.find(s => s.user_type === 'personnel')?.total_users.toLocaleString('tr-TR') || '0'}
                </div>
                <div className="text-xs text-slate-400">Personel Kullanıcı</div>
                <div className="mt-2 text-[10px] text-orange-300">
                  {userTypeStats.find(s => s.user_type === 'personnel')?.verified_users.toLocaleString('tr-TR') || '0'} Doğrulanmış
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyber-900/50 to-matrix-800/30 border border-cyber-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-7 w-7 text-cyber-400" />
                  <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-white mb-1 tabular-nums">
                  {totalUsers.toLocaleString('tr-TR')}
                </div>
                <div className="text-xs text-slate-400">Toplam Sertifikalı</div>
                <div className="mt-2 text-[10px] text-green-300">
                  {cityStats.length} Şehir • {regions.length} Bölge
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <TrendingUp className="h-5 w-5 text-cyber-400 mr-2" />
                    En Çok Sertifika Alan 10 Şehir
                  </h3>
                </div>

                <div className="space-y-2">
                  {topCities.map((city, index) => {
                    const percentage = (city.certified_users / totalUsers) * 100;
                    return (
                      <div
                        key={city.id}
                        className={`bg-slate-800/50 border rounded-lg p-4 hover:bg-slate-700/50 transition-all cursor-pointer ${
                          selectedCity?.id === city.id ? 'border-cyber-500 ring-2 ring-cyber-500/50' : 'border-slate-700'
                        }`}
                        onClick={() => setSelectedCity(city)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                              index === 1 ? 'bg-slate-400/20 text-slate-300' :
                              index === 2 ? 'bg-orange-500/20 text-orange-400' :
                              'bg-slate-600/20 text-slate-400'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-white flex items-center gap-2">
                                {city.city_name}
                                <span className="text-xs text-slate-500">({city.city_code})</span>
                              </div>
                              <div className="text-xs text-slate-400">{city.region}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-cyber-400 tabular-nums">
                              {city.certified_users.toLocaleString('tr-TR')}
                            </div>
                            <div className="text-xs text-slate-500">
                              %{percentage.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyber-500 to-matrix-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <MapPin className="h-5 w-5 text-matrix-400 mr-2" />
                    Bölgesel Dağılım
                  </h3>
                </div>

                <div className="space-y-3">
                  {regions.map((region) => {
                    const total = getRegionTotal(region);
                    const percentage = (total / totalUsers) * 100;
                    const cityCount = cityStats.filter(c => c.region === region).length;

                    return (
                      <div key={region} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-semibold text-white">{region}</div>
                            <div className="text-xs text-slate-400">{cityCount} şehir</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-matrix-400 tabular-nums">
                              {total.toLocaleString('tr-TR')}
                            </div>
                            <div className="text-xs text-slate-500">
                              %{percentage.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-matrix-500 to-green-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedCity && (
                  <div className="bg-gradient-to-br from-cyber-900/50 to-matrix-900/50 border border-cyber-500/50 rounded-xl p-6 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">Seçili Şehir Detayları</h4>
                      <button
                        onClick={() => setSelectedCity(null)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Şehir:</span>
                        <span className="text-white font-semibold">{selectedCity.city_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plaka Kodu:</span>
                        <span className="text-white font-semibold">{selectedCity.city_code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bölge:</span>
                        <span className="text-white font-semibold">{selectedCity.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sertifikalı Kullanıcı:</span>
                        <span className="text-cyber-400 font-bold tabular-nums">
                          {selectedCity.certified_users.toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-slate-700">
                        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                          <Activity className="h-3 w-3 text-green-400 animate-pulse" />
                          <span>Son güncelleme: {new Date(selectedCity.last_updated).toLocaleString('tr-TR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Activity className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5 animate-pulse" />
                <div className="flex-1">
                  <p className="text-blue-200 text-sm leading-relaxed">
                    <span className="font-semibold">Canlı İstatistikler:</span> Bu veriler her 5 saniyede bir otomatik olarak güncellenmektedir.
                    DigiGuard platformu üzerinden sertifika alan tüm kullanıcılar anlık olarak bu haritaya yansıtılmaktadır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
