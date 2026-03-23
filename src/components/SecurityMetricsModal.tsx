import React from 'react';
import { X, Shield, Lock, AlertCircle, Fingerprint, Database, TrendingUp, AlertTriangle } from 'lucide-react';

interface SecurityMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityMetricsModal: React.FC<SecurityMetricsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const securityMetrics = [
    {
      label: 'Kimlik Güvenliği',
      score: 98,
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      icon: Shield,
      trend: '+2%',
      status: 'Mükemmel'
    },
    {
      label: 'Veri Şifreleme',
      score: 95,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500',
      icon: Lock,
      trend: '+1%',
      status: 'Çok İyi'
    },
    {
      label: 'Tehdit Seviyesi',
      score: 12,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500',
      icon: AlertCircle,
      trend: '-8%',
      status: 'Düşük Risk',
      inverse: true
    },
    {
      label: 'Biyometrik Doğruluk',
      score: 99,
      color: 'text-matrix-400',
      bgColor: 'bg-matrix-500',
      icon: Fingerprint,
      trend: '+3%',
      status: 'Optimal'
    },
    {
      label: 'Blockchain Entegrasyon',
      score: 100,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500',
      icon: Database,
      trend: '0%',
      status: 'Aktif'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-cyber-500/30 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-cyber-900 to-matrix-900 p-6 border-b border-cyber-500/30 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Shield className="h-7 w-7 text-cyber-400 mr-3" />
            Güvenlik ve Risk Metrikleri
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/50 hover:border-cyber-500/50 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.inverse ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20' : 'bg-gradient-to-br from-cyber-600/20 to-matrix-600/20'}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    metric.inverse
                      ? 'bg-amber-600/20 text-amber-300'
                      : 'bg-green-600/20 text-green-300'
                  }`}>
                    {metric.trend}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-slate-400">{metric.label}</span>
                    <span className={`text-3xl font-bold ${metric.color}`}>{metric.score}</span>
                  </div>
                  <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${metric.bgColor} rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Durum:</span>
                  <span className={`text-sm font-medium ${metric.color}`}>{metric.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-300/80">Genel Güvenlik Skoru</p>
                  <p className="text-3xl font-bold text-green-400">96.4/100</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-500/20 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-amber-300/80">Tespit Edilen Tehdit</p>
                  <p className="text-3xl font-bold text-amber-400">3 Engellendi</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyber-900/30 to-matrix-900/30 border border-cyber-500/30 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-cyber-500/20 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-cyber-400 animate-pulse" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-cyber-300/80">Aktif Koruma</p>
                  <p className="text-3xl font-bold text-cyber-400">7/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
