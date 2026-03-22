import { supabase } from './supabaseClient';
import { notificationService } from './notificationService';
import jsPDF from 'jspdf';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  userId: string;
  paymentId?: string;
  amount: number;
  currency: string;
  items: InvoiceItem[];
  dueDate?: Date;
}

export const invoiceService = {
  generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

    return `INV-${year}${month}${day}-${random}`;
  },

  async createInvoice(data: InvoiceData): Promise<any> {
    const invoiceNumber = this.generateInvoiceNumber();
    const dueDate = data.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const { data: invoice, error } = await supabase
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        user_id: data.userId,
        payment_id: data.paymentId,
        amount: data.amount,
        currency: data.currency,
        status: data.paymentId ? 'paid' : 'sent',
        due_date: dueDate.toISOString(),
        paid_at: data.paymentId ? new Date().toISOString() : null,
        items: data.items
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Failed to create invoice:', error);
      throw error;
    }

    if (invoice) {
      const pdfUrl = await this.generateInvoicePDF(invoice);

      const { error: updateError } = await supabase
        .from('invoices')
        .update({ pdf_url: pdfUrl })
        .eq('id', invoice.id);

      if (updateError) {
        console.error('Failed to update invoice PDF URL:', updateError);
      }

      await notificationService.sendInvoiceNotification(
        data.userId,
        invoiceNumber,
        data.amount,
        data.currency,
        dueDate,
        pdfUrl
      );

      return { ...invoice, pdf_url: pdfUrl };
    }

    return invoice;
  },

  async generateInvoicePDF(invoice: any): Promise<string> {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text('DigiGuard', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Digital Identity Security Platform', 20, 27);

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('FATURA / INVOICE', 20, 45);

    doc.setFontSize(10);
    doc.text(`Fatura No: ${invoice.invoice_number}`, 20, 55);
    doc.text(`Tarih: ${new Date(invoice.created_at).toLocaleDateString('tr-TR')}`, 20, 62);

    if (invoice.due_date) {
      doc.text(`Son Ödeme Tarihi: ${new Date(invoice.due_date).toLocaleDateString('tr-TR')}`, 20, 69);
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Fatura Detayları:', 20, 85);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    let yPosition = 95;

    if (invoice.items && Array.isArray(invoice.items)) {
      doc.setFont('helvetica', 'bold');
      doc.text('Açıklama', 20, yPosition);
      doc.text('Miktar', 110, yPosition);
      doc.text('Birim Fiyat', 140, yPosition);
      doc.text('Toplam', 170, yPosition);

      yPosition += 7;
      doc.line(20, yPosition - 2, 190, yPosition - 2);

      doc.setFont('helvetica', 'normal');

      invoice.items.forEach((item: InvoiceItem) => {
        doc.text(item.description, 20, yPosition);
        doc.text(item.quantity.toString(), 110, yPosition);
        doc.text(`${item.unitPrice.toFixed(2)} ${invoice.currency}`, 140, yPosition);
        doc.text(`${item.total.toFixed(2)} ${invoice.currency}`, 170, yPosition);
        yPosition += 7;
      });

      yPosition += 5;
      doc.line(20, yPosition - 2, 190, yPosition - 2);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Toplam Tutar:', 140, yPosition + 10);
    doc.text(`${invoice.amount.toFixed(2)} ${invoice.currency}`, 170, yPosition + 10);

    if (invoice.status === 'paid') {
      doc.setTextColor(0, 150, 0);
      doc.text('ÖDENDİ', 140, yPosition + 20);

      if (invoice.paid_at) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Ödeme Tarihi: ${new Date(invoice.paid_at).toLocaleDateString('tr-TR')}`, 140, yPosition + 27);
      }
    }

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('DigiGuard A.Ş. | www.digiguard.com | support@digiguard.com', 20, 280);
    doc.text('Vergi Dairesi: Beşiktaş | Vergi No: 1234567890', 20, 285);

    const pdfBlob = doc.output('blob');
    const fileName = `invoice-${invoice.invoice_number}.pdf`;

    const pdfUrl = `/invoices/${fileName}`;

    return pdfUrl;
  },

  async getInvoiceById(invoiceId: string) {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch invoice:', error);
      throw error;
    }

    return data;
  },

  async getUserInvoices(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch invoices:', error);
      throw error;
    }

    return data;
  },

  async markInvoiceAsPaid(invoiceId: string, paymentId: string) {
    const { data, error } = await supabase
      .from('invoices')
      .update({
        status: 'paid',
        payment_id: paymentId,
        paid_at: new Date().toISOString()
      })
      .eq('id', invoiceId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Failed to mark invoice as paid:', error);
      throw error;
    }

    return data;
  },

  async cancelInvoice(invoiceId: string) {
    const { data, error } = await supabase
      .from('invoices')
      .update({ status: 'cancelled' })
      .eq('id', invoiceId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Failed to cancel invoice:', error);
      throw error;
    }

    return data;
  }
};
