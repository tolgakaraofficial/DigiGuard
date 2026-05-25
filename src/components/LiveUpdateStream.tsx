import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Users, Zap, X } from 'lucide-react';

interface Update {
  id: string;
  type: 'info' | 'alert' | 'success' | 'task';
  title: string;
  message: string;
  timestamp: Date;
  icon: React.ReactNode;
  color: string;
}

export const LiveUpdateStream: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const initialUpdates: Update[] = [
      {
        id: '1',
        type: 'success',
        title: 'Sistem Hazır',
        message: 'DigiGuard uygulaması başarıyla başlatıldı',
        timestamp: new Date(),
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      },
      {
        id: '2',
        type: 'info',
        title: 'Güvenlik Ekibi',
        message: 'Güvenlik uzmanları sistemi 24/7 izlemektedir',
        timestamp: new Date(Date.now() - 30000),
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
      },
      {
        id: '3',
        type: 'task',
        title: 'Blockchain Doğrulama',
        message: 'Tüm kayıtlar blockchain ağına kaydedilmektedir',
        timestamp: new Date(Date.now() - 60000),
        icon: <Zap className="w-5 h-5" />,
        color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
      },
      {
        id: '4',
        type: 'info',
        title: 'Ekip Sorumluluğu',
        message: 'Her bir ekip üyesi veri gizliliğini korumakla sorumludur',
        timestamp: new Date(Date.now() - 120000),
        icon: <Users className="w-5 h-5" />,
        color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
      },
    ];

    setUpdates(initialUpdates);

    const interval = setInterval(() => {
      const newUpdate: Update = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'info' : 'success',
        title: 'Sistem Güncellemesi',
        message: `Güvenlik protokolleri başarıyla doğrulandı - ${new Date().toLocaleTimeString('tr-TR')}`,
        timestamp: new Date(),
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
      };

      setUpdates((prev) => [newUpdate, ...prev].slice(0, 5));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Şimdi';
    if (minutes < 60) return `${minutes}m önce`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h önce`;
    return date.toLocaleDateString('tr-TR');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg z-40 transition-all hover:scale-110"
        title="Canlı Akışı Aç"
      >
        <Zap className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-96 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-white font-bold">Canlı Akış</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 space-y-3 p-4">
        {updates.map((update) => (
          <div
            key={update.id}
            className={`bg-gradient-to-r ${update.color} rounded-lg p-3 border transition-all hover:shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {update.type === 'success' && (
                  <div className="text-green-400">{update.icon}</div>
                )}
                {update.type === 'info' && (
                  <div className="text-cyan-400">{update.icon}</div>
                )}
                {update.type === 'task' && (
                  <div className="text-orange-400">{update.icon}</div>
                )}
                {update.type === 'alert' && (
                  <div className="text-red-400">{update.icon}</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white truncate">
                    {update.title}
                  </h4>
                  <span className="text-xs text-slate-400 flex-shrink-0">
                    {formatTime(update.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {update.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-700/50 border-t border-slate-600 p-3 text-xs text-slate-400 text-center">
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-3 h-3" />
          <span>Otomatik güncelleme: 15 saniye</span>
        </div>
      </div>
    </div>
  );
};
