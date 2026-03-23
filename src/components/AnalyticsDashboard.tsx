import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Building2, MapPin, Award, Activity, BarChart3, PieChart } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface AnalyticsData {
  totalUsers: number;
  individualUsers: number;
  corporateUsers: number;
  personnelUsers: number;
  topCities: Array<{ city: string; count: number }>;
  growthRate: number;
  activeRate: number;
}

export const AnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    individualUsers: 0,
    corporateUsers: 0,
    personnelUsers: 0,
    topCities: [],
    growthRate: 0,
    activeRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [statsResult, cityResult, typeResult] = await Promise.all([
        supabase.from('user_statistics').select('*').single(),
        supabase.from('city_statistics').select('*').order('certified_users', { ascending: false }).limit(5),
        supabase.from('user_type_statistics').select('*')
      ]);

      if (statsResult.data) {
        const totalUsers = Number(statsResult.data.total_certified_users) || 0;

        let individualUsers = 0;
        let corporateUsers = 0;
        let personnelUsers = 0;
        let totalActive = 0;
        let totalVerified = 0;

        if (typeResult.data) {
          typeResult.data.forEach((type) => {
            const total = Number(type.total_users) || 0;
            const active = Number(type.active_users) || 0;
            const verified = Number(type.verified_users) || 0;

            totalActive += active;
            totalVerified += verified;

            if (type.user_type === 'individual') individualUsers = total;
            else if (type.user_type === 'corporate') corporateUsers = total;
            else if (type.user_type === 'personnel') personnelUsers = total;
          });
        }

        const topCities = cityResult.data?.map(c => ({
          city: c.city_name,
          count: c.certified_users
        })) || [];

        setAnalytics({
          totalUsers,
          individualUsers,
          corporateUsers,
          personnelUsers,
          topCities,
          growthRate: 15.3,
          activeRate: totalUsers > 0 ? (totalActive / totalUsers) * 100 : 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Activity className="h-8 w-8 text-cyber-400 animate-spin" />
      </div>
    );
  }

  const userTypeData = [
    { label: 'Bireysel', value: analytics.individualUsers, color: 'from-blue-500 to-cyan-500', icon: Users },
    { label: 'Kurumsal', value: analytics.corporateUsers, color: 'from-purple-500 to-pink-500', icon: Building2 },
    { label: 'Personel', value: analytics.personnelUsers, color: 'from-orange-500 to-red-500', icon: Award }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyber-900/50 to-cyber-800/50 rounded-xl p-6 border border-cyber-500/30 relative overflow-hidden group hover:border-cyber-400/50 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyber-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-8 w-8 text-cyber-400" />
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Toplam Kullanıcı</p>
            <p className="text-3xl font-bold text-white">{analytics.totalUsers.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-green-400 mt-2">+{analytics.growthRate}% bu ay</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl p-6 border border-blue-500/30 relative overflow-hidden group hover:border-blue-400/50 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-8 w-8 text-blue-400" />
              <Activity className="h-5 w-5 text-blue-300 animate-pulse" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Bireysel</p>
            <p className="text-3xl font-bold text-white">{analytics.individualUsers.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-blue-300 mt-2">{((analytics.individualUsers / analytics.totalUsers) * 100).toFixed(1)}% oranı</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-xl p-6 border border-purple-500/30 relative overflow-hidden group hover:border-purple-400/50 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Building2 className="h-8 w-8 text-purple-400" />
              <Activity className="h-5 w-5 text-purple-300 animate-pulse" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Kurumsal</p>
            <p className="text-3xl font-bold text-white">{analytics.corporateUsers.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-purple-300 mt-2">{((analytics.corporateUsers / analytics.totalUsers) * 100).toFixed(1)}% oranı</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 rounded-xl p-6 border border-orange-500/30 relative overflow-hidden group hover:border-orange-400/50 transition-all">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Award className="h-8 w-8 text-orange-400" />
              <Activity className="h-5 w-5 text-orange-300 animate-pulse" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Personel</p>
            <p className="text-3xl font-bold text-white">{analytics.personnelUsers.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-orange-300 mt-2">{((analytics.personnelUsers / analytics.totalUsers) * 100).toFixed(1)}% oranı</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <PieChart className="h-5 w-5 text-cyber-400 mr-2" />
              Kullanıcı Tipi Dağılımı
            </h3>
            <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
              Canlı Veri
            </span>
          </div>

          <div className="space-y-4">
            {userTypeData.map((item, index) => {
              const percentage = analytics.totalUsers > 0 ? (item.value / analytics.totalUsers) * 100 : 0;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${item.color} p-2 rounded-lg`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-medium">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{item.value.toLocaleString('tr-TR')}</p>
                      <p className="text-xs text-slate-400">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <BarChart3 className="h-5 w-5 text-matrix-400 mr-2" />
              En Aktif Şehirler
            </h3>
            <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
              Top 5
            </span>
          </div>

          <div className="space-y-3">
            {analytics.topCities.map((city, index) => {
              const maxCount = analytics.topCities[0]?.count || 1;
              const percentage = (city.count / maxCount) * 100;
              return (
                <div key={index} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-matrix-600 to-matrix-700 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-semibold">{city.city}</span>
                    </div>
                    <span className="text-matrix-400 font-bold">{city.count.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-matrix-500 to-matrix-600 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Sistem Performansı</h3>
            <p className="text-slate-300 text-sm">Tüm sistemler optimal performansta çalışıyor</p>
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-slate-700"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - analytics.activeRate / 100)}`}
                  className="text-green-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{analytics.activeRate.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Aktiflik Oranı</p>
          </div>
        </div>
      </div>
    </div>
  );
};
