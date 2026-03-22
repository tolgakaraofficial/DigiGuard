import React, { useState, useEffect } from 'react';
import { Bell, X, Mail, MessageSquare, CreditCard, FileText, Shield, Info, Check } from 'lucide-react';
import { notificationService } from '../services/notificationService';

interface Notification {
  id: string;
  type: string;
  category: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
  email_sent: boolean;
  sms_sent: boolean;
}

interface NotificationCenterProps {
  userId: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadNotifications();
    }
  }, [userId]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getUserNotifications(userId);
      setNotifications(data || []);
      setUnreadCount(data?.filter((n: Notification) => !n.read).length || 0);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'registration':
        return <Info className="h-5 w-5" />;
      case 'login':
        return <Shield className="h-5 w-5" />;
      case 'payment':
        return <CreditCard className="h-5 w-5" />;
      case 'invoice':
        return <FileText className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'registration':
        return 'bg-blue-500/20 text-blue-400';
      case 'login':
        return 'bg-green-500/20 text-green-400';
      case 'payment':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'invoice':
        return 'bg-purple-500/20 text-purple-400';
      case 'security':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Şimdi';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-cyan-500/30 shadow-2xl">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Bildirimler</h2>
                <p className="text-cyan-100 text-sm mt-1">
                  {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : 'Tüm bildirimler okundu'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-500 border-t-transparent"></div>
                  <p className="text-slate-400 mt-4">Yükleniyor...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Henüz bildiriminiz yok</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-slate-800/50 transition-colors ${
                        !notification.read ? 'bg-slate-800/30' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${getCategoryColor(notification.category)} flex items-center justify-center`}>
                          {getCategoryIcon(notification.category)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-white">{notification.subject}</h3>
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="flex-shrink-0 text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1"
                              >
                                <Check className="h-3 w-3" />
                                Okundu
                              </button>
                            )}
                          </div>

                          <p className="text-slate-400 text-sm whitespace-pre-line mb-3">
                            {notification.message}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>{formatDate(notification.created_at)}</span>
                            <div className="flex items-center gap-2">
                              {notification.email_sent && (
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  E-posta
                                </span>
                              )}
                              {notification.sms_sent && (
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  SMS
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
