import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { securityService } from '../services/securityService';

interface SecurityDashboardProps {
  userId: string;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ userId }) => {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [securityEvents, setSecurityEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  useEffect(() => {
    loadSecurityData();
  }, [userId]);

  const loadSecurityData = async () => {
    try {
      setLoading(true);
      const [logs, events] = await Promise.all([
        securityService.getAuditLogs(20),
        securityService.getSecurityEvents(20)
      ]);
      setAuditLogs(logs);
      setSecurityEvents(events);
    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/20';
      case 'high':
        return 'text-orange-400 bg-orange-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'low':
        return 'text-blue-400 bg-blue-500/20';
      default:
        return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'INSERT':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'UPDATE':
        return <Activity className="h-4 w-4 text-blue-400" />;
      case 'DELETE':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Activity className="h-4 w-4 text-slate-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const criticalEvents = securityEvents.filter(e => e.severity === 'critical').length;
  const highEvents = securityEvents.filter(e => e.severity === 'high').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">{auditLogs.length}</span>
          </div>
          <p className="text-slate-400 text-sm">Toplam İşlem</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{securityEvents.length}</span>
          </div>
          <p className="text-slate-400 text-sm">Güvenlik Olayı</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-red-700">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="h-8 w-8 text-red-400" />
            <span className="text-2xl font-bold text-red-400">{criticalEvents}</span>
          </div>
          <p className="text-slate-400 text-sm">Kritik Olay</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-orange-700">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-orange-400">{highEvents}</span>
          </div>
          <p className="text-slate-400 text-sm">Yüksek Risk</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Güvenlik Olayları
          </h3>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">Yükleniyor...</p>
            </div>
          ) : securityEvents.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-slate-400">Güvenlik olayı bulunamadı</p>
              <p className="text-sm text-slate-500 mt-2">Sisteminiz güvenli görünüyor</p>
            </div>
          ) : (
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-slate-900 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(event.severity)}`}>
                          {event.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500">{event.event_type.replace(/_/g, ' ')}</span>
                      </div>
                      <p className="text-white font-medium mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{formatDate(event.created_at)}</span>
                        {event.ip_address && (
                          <span className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            {event.ip_address}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDetails(showDetails === event.id ? null : event.id)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {showDetails === event.id ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {showDetails === event.id && event.metadata && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 mb-2">Detaylar:</p>
                      <pre className="text-xs text-slate-300 bg-slate-950 p-3 rounded overflow-x-auto">
                        {JSON.stringify(event.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Denetim Günlükleri
          </h3>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">Yükleniyor...</p>
            </div>
          ) : auditLogs.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Henüz işlem geçmişi yok</p>
            </div>
          ) : (
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-slate-900 rounded-lg p-4 border border-slate-700 flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{log.action}</span>
                      <span className="text-slate-500">on</span>
                      <span className="text-cyan-400">{log.table_name}</span>
                    </div>
                    <p className="text-xs text-slate-400">{formatDate(log.created_at)}</p>
                  </div>
                  {log.success ? (
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
