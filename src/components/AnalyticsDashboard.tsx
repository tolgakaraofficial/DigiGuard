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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-cyan-500/10 rounded-lg">
                <Users className="h-4 w-4 text-cyan-400" />
              </div>
              <TrendingUp className="h-3 w-3 text-green-400" />
            </div>
            <p className="text-xs text-slate-400">Toplam</p>
            <p className="text-xl font-bold text-white">{analytics.totalUsers.toLocaleString('tr-TR')}</p>
            <p className="text-[10px] text-green-400 mt-0.5">+{analytics.growthRate}%</p>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-blue-500/10 rounded-lg">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <Activity className="h-3 w-3 text-blue-300" />
            </div>
            <p className="text-xs text-slate-400">Bireysel</p>
            <p className="text-xl font-bold text-white">{analytics.individualUsers.toLocaleString('tr-TR')}</p>
            <p className="text-[10px] text-blue-300 mt-0.5">{((analytics.individualUsers / analytics.totalUsers) * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50 relative overflow-hidden group hover:border-purple-500/50 transition-all">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-purple-500/10 rounded-lg">
                <Building2 className="h-4 w-4 text-purple-400" />
              </div>
              <Activity className="h-3 w-3 text-purple-300" />
            </div>
            <p className="text-xs text-slate-400">Kurumsal</p>
            <p className="text-xl font-bold text-white">{analytics.corporateUsers.toLocaleString('tr-TR')}</p>
            <p className="text-[10px] text-purple-300 mt-0.5">{((analytics.corporateUsers / analytics.totalUsers) * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50 relative overflow-hidden group hover:border-orange-500/50 transition-all">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-orange-500/10 rounded-lg">
                <Award className="h-4 w-4 text-orange-400" />
              </div>
              <Activity className="h-3 w-3 text-orange-300" />
            </div>
            <p className="text-xs text-slate-400">Personel</p>
            <p className="text-xl font-bold text-white">{analytics.personnelUsers.toLocaleString('tr-TR')}</p>
            <p className="text-[10px] text-orange-300 mt-0.5">{((analytics.personnelUsers / analytics.totalUsers) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <PieChart className="h-4 w-4 text-cyan-400" />
              Kullanıcı Dağılımı
            </h3>
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">
              Canlı
            </span>
          </div>

          <div className="space-y-3">
            {userTypeData.map((item, index) => {
              const percentage = analytics.totalUsers > 0 ? (item.value / analytics.totalUsers) * 100 : 0;
              return (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`bg-gradient-to-r ${item.color} p-1 rounded`}>
                        <item.icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white text-sm">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{item.value.toLocaleString('tr-TR')}</p>
                      <p className="text-[10px] text-slate-400">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
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

        <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-400" />
              Aktif Şehirler
            </h3>
            <span className="text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">
              Top 5
            </span>
          </div>

          <div className="space-y-2">
            {analytics.topCities.map((city, index) => {
              const maxCount = analytics.topCities[0]?.count || 1;
              const percentage = (city.count / maxCount) * 100;
              return (
                <div key={index} className="bg-slate-700/30 rounded p-2 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500/10 p-1 rounded">
                        <MapPin className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-white text-sm">{city.city}</span>
                    </div>
                    <span className="text-green-400 font-bold text-sm">{city.count.toLocaleString('tr-TR')}</span>
                  </div>
                  <div className="w-full bg-slate-600/30 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/40 backdrop-blur-sm border border-green-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-400" />
              Sistem Performansı
            </h3>
            <p className="text-slate-400 text-xs">Optimal performans</p>
          </div>
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-slate-700/50"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - analytics.activeRate / 100)}`}
                  className="text-green-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{analytics.activeRate.toFixed(0)}%</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Aktiflik</p>
          </div>
        </div>
      </div>
    </div>
  );
};
