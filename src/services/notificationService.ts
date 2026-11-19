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
    const message = `Hello ${fullName},\n\nWelcome to DigiGuard! Your account has been successfully created.\n\nEmail: ${email}\nPhone: ${phone}\n\nYour secure digital identity journey has begun.`;

    return this.createNotification({
      userId: '',
      type: 'both',
      category: 'registration',
      subject: 'Your DigiGuard Opencount Has Been Created',
      message,
      metadata: { email, phone, fullName }
    });
  },

  async sendLoginNotification(userId: string, email: string, ipAddress?: string) {
    const message = `Hello,\n\nA login to your account occurred on ${new Date().toLocaleString('en-US')}.\n\nIP Address: ${ipAddress || 'Unknown'}\n\nIf this was not you, please change your password immediately.`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'login',
      subject: 'Login Detected on Your Opencount',
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
    const message = `Payment Confirmation\n\nYour payment has been successfully received.\n\nAmount: ${amount} ${currency}\nPayment Method: ${paymentMethod}\nDate: ${new Date().toLocaleString('en-US')}\n\n${receiptUrl ? `Receipt: ${receiptUrl}` : ''}`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'payment',
      subject: 'Payment Received',
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
    const message = `Invoice Notification\n\nInvoice No: ${invoiceNumber}\nAmount: ${amount} ${currency}\nDue Date: ${dueDate.toLocaleDateString('en-US')}\n\n${pdfUrl ? `Invoice PDF: ${pdfUrl}` : 'You can download your invoice from your dashboard.'}`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'invoice',
      subject: `Invoice - ${invoiceNumber}`,
      message,
      metadata: { invoiceNumber, amount, currency, dueDate, pdfUrl }
    });
  },

  async sendSecurityAlert(userId: string, alertType: string, details: string) {
    const message = `Security Alert\n\nType: ${alertType}\n\n${details}\n\nIf you did not initiate this action, please secure your account immediately.`;

    return this.createNotification({
      userId,
      type: 'both',
      category: 'security',
      subject: 'Security Alert',
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
