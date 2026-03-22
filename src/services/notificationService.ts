import { supabase } from './supabaseClient';
import { securityService } from './securityService';

export interface NotificationData {
  userId: string;
  type: 'email' | 'sms' | 'both';
  category: 'registration' | 'login' | 'payment' | 'invoice' | 'security' | 'system';
  subject: string;
  message: string;
  metadata?: Record<string, any>;
}

export const notificationService = {
  async sendRegistrationNotification(email: string, phone: string, fullName: string) {
    const message = `Merhaba ${fullName},\n\nDigiGuard'a hoş geldiniz! Hesabınız başarıyla oluşturuldu.\n\nE-posta: ${email}\nTelefon: ${phone}\n\nGüvenli dijital kimlik yolculuğunuz başladı.`;

    return this.createNotification({
      userId: '',
      type: 'both',
      category: 'registration',
      subject: 'DigiGuard Hesabınız Oluşturuldu',
      message,
      metadata: { email, phone, fullName }
    });
  },

  async sendLoginNotification(userId: string, email: string, ipAddress?: string) {
    const message = `Merhaba,\n\nHesabınıza ${new Date().toLocaleString('tr-TR')} tarihinde giriş yapıldı.\n\nIP Adresi: ${ipAddress || 'Bilinmiyor'}\n\nBu siz değilseniz, lütfen hemen şifrenizi değiştirin.`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'login',
      subject: 'Hesabınıza Giriş Yapıldı',
      message,
      metadata: { email, ipAddress, timestamp: new Date().toISOString() }
    });
  },

  async sendPaymentNotification(
    userId: string,
    amount: number,
    currency: string,
    paymentMethod: string,
    receiptUrl?: string
  ) {
    const message = `Ödeme Onayı\n\nÖdemeniz başarıyla alındı.\n\nTutar: ${amount} ${currency}\nÖdeme Yöntemi: ${paymentMethod}\nTarih: ${new Date().toLocaleString('tr-TR')}\n\n${receiptUrl ? `Fatura: ${receiptUrl}` : ''}`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'payment',
      subject: 'Ödemeniz Alındı',
      message,
      metadata: { amount, currency, paymentMethod, receiptUrl }
    });
  },

  async sendInvoiceNotification(
    userId: string,
    invoiceNumber: string,
    amount: number,
    currency: string,
    dueDate: Date,
    pdfUrl?: string
  ) {
    const message = `Fatura Bildirimi\n\nFatura No: ${invoiceNumber}\nTutar: ${amount} ${currency}\nSon Ödeme Tarihi: ${dueDate.toLocaleDateString('tr-TR')}\n\n${pdfUrl ? `Fatura PDF: ${pdfUrl}` : 'Faturanızı kontrol panelinizden indirebilirsiniz.'}`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'invoice',
      subject: `Fatura - ${invoiceNumber}`,
      message,
      metadata: { invoiceNumber, amount, currency, dueDate, pdfUrl }
    });
  },

  async sendSecurityAlert(userId: string, alertType: string, details: string) {
    const message = `Güvenlik Uyarısı\n\nTür: ${alertType}\n\n${details}\n\nBu işlemi siz yapmadıysanız, lütfen hesabınızı güvence altına alın.`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'security',
      subject: 'Güvenlik Uyarısı',
      message,
      metadata: { alertType, details, timestamp: new Date().toISOString() }
    });
  },

  async createNotification(data: NotificationData) {
    const sanitizedSubject = securityService.validateInput(data.subject, 'subject');
    const sanitizedMessage = securityService.validateInput(data.message, 'message');

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: data.userId,
        type: data.type,
        category: data.category,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        metadata: data.metadata || {}
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }

    if (notification && (data.type === 'email' || data.type === 'both')) {
      await this.sendEmail(data);
    }

    if (notification && (data.type === 'sms' || data.type === 'both')) {
      await this.sendSMS(data);
    }

    return notification;
  },

  async sendEmail(data: NotificationData) {
    console.log('Sending email notification:', data.subject);
    return true;
  },

  async sendSMS(data: NotificationData) {
    console.log('Sending SMS notification:', data.subject);
    return true;
  },

  async getUserNotifications(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }

    return data;
  },

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }

    return true;
  }
};
