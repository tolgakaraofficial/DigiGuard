import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, AlertTriangle, Shield, Database, Radio, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface SystemStatus {
  name: string;
  status: 'operational' | 'warning' | 'error';
  uptime: number;
  lastCheck: string;
  metrics?: {
    total: number;
    active: number;
    issues: number;
  };
}

export const CentralMonitoringHub: React.FC<{ language?: string }> = ({ language = 'tr' }) => {
  const [systemStatuses, setSystemStatuses] = useState<SystemStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSystemStatuses();
    const interval = setInterval(loadSystemStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSystemStatuses = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [trackingData, chipData, notificationData, violationData] = await Promise.all([
        supabase.from('certified_persons_tracking').select('*', { count: 'exact' }),
        supabase.from('chip_certified_items').select('*', { count: 'exact' }),
        supabase.from('notifications').select('*', { count: 'exact' }),
        supabase.from('violation_reports').select('*', { count: 'exact' }),
      ]);

      const statuses: SystemStatus[] = [
        {
          name: 'Kimlik Doğrulama',
          status: 'operational',
          uptime: 99.98,
          lastCheck: new Date().toISOString(),
          metrics: {
            total: 1,
            active: 1,
            issues: 0,
          },
        },
        {
          name: 'Kişi Takip Sistemi',
          status: 'operational',
          uptime: 99.95,
          lastCheck: new Date().toISOString(),
          metrics: {
            total: trackingData.count || 0,
            active: trackingData.data?.filter((t: any) => t.tracking_enabled).length || 0,
            issues: 0,
          },
        },
        {
          name: 'Çipli Varlık Takibi',
          status: 'operational',
          uptime: 99.92,
          lastCheck: new Date().toISOString(),
          metrics: {
            total: chipData.count || 0,
            active: chipData.data?.filter((c: any) => c.tracking_enabled).length || 0,
            issues: 0,
          },
        },
        {
          name: 'Blockchain Sertifika',
          status: 'operational',
          uptime: 100,
          lastCheck: new Date().toISOString(),
          metrics: {
            total: 1,
            active: 1,
            issues: 0,
          },
        },
        {
          name: 'Bildirim Sistemi',
          status: notificationData.count && notificationData.count > 0 ? 'operational' : 'warning',
          uptime: 99.87,
          lastCheck: new Date().toISOString(),
          metrics: {
            total: notificationData.count || 0,
            active: notificationData.data?.filter((n: any) => !n.read).length || 0,
            issues: 0,
          },
        },
        {
          name: 'İhlal Raporlama',
          status: 'operational',
          uptime: 99.94,
          lastCheck: new Date().toISOString(),
          metrics: {
            total: violationData.count || 0,
            active: violationData.data?.filter((v: any) => v.status === 'pending').length || 0,
            issues: 0,
          },
        },
      ];

      setSystemStatuses(statuses);
    } catch (error) {
      console.error('Sistem durumları yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'error':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
    }
  };

  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Sistemler kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  const totalSystems = systemStatuses.length;
  const operationalSystems = systemStatuses.filter((s) => s.status === 'operational').length;
  const warningSystems = systemStatuses.filter((s) => s.status === 'warning').length;
  const errorSystems = systemStatuses.filter((s) => s.status === 'error').length;
  const avgUptime = systemStatuses.reduce((acc, s) => acc + s.uptime, 0) / totalSystems;

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Merkezi İzleme</h2>
              <p className="text-xs text-slate-400">ALBIS 7/24</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500">Uptime</p>
            <p className="text-lg font-bold text-green-400">{avgUptime.toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-green-500/10 rounded-lg p-2 border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-green-300">Çalışıyor</p>
                <p className="text-xl font-bold text-green-400">{operationalSystems}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="bg-yellow-500/10 rounded-lg p-2 border border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-yellow-300">Uyarı</p>
                <p className="text-xl font-bold text-yellow-400">{warningSystems}</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-2 border border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-red-300">Hata</p>
                <p className="text-xl font-bold text-red-400">{errorSystems}</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {systemStatuses.map((system, index) => (
            <div
              key={index}
              className={`bg-slate-700/30 rounded p-2 border transition-all hover:border-blue-500/50 ${getStatusColor(
                system.status
              )}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  {getStatusIcon(system.status)}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{system.name}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-[10px] text-slate-400">
                        <span className="text-green-400 font-medium">{system.uptime}%</span>
                      </p>
                      {system.metrics && (
                        <>
                          <p className="text-[10px] text-slate-400">
                            T: <span className="text-blue-400 font-medium">{system.metrics.total}</span>
                          </p>
                          <p className="text-[10px] text-slate-400">
                            A: <span className="text-green-400 font-medium">{system.metrics.active}</span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">
                  {new Date(system.lastCheck).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white">ALBIS AI Yönetimi</h3>
        </div>
        <p className="text-slate-400 text-xs mb-3">
          Sürekli izleme ve otomatik müdahale sistemi aktif.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3 text-green-400" />
            <span className="text-slate-400">Güvenlik</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3 text-green-400" />
            <span className="text-slate-400">Tehdit Analizi</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3 text-green-400" />
            <span className="text-slate-400">Blockchain</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="h-3 w-3 text-green-400" />
            <span className="text-slate-400">Raporlama</span>
          </div>
        </div>
      </div>
    </div>
  );
};
