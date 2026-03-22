import { supabase } from './supabaseClient';
import { notificationService } from './notificationService';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface PaymentRequest {
  userId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'metamask' | 'bank_transfer';
}

export interface CardPaymentData {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export const paymentService = {
  async connectMetaMask(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      return accounts[0];
    } catch (error: any) {
      console.error('MetaMask connection failed:', error);
      throw new Error(error.message || 'MetaMask bağlantısı başarısız');
    }
  },

  async getMetaMaskBalance(address: string): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });

      const ethBalance = parseInt(balance, 16) / Math.pow(10, 18);
      return ethBalance.toFixed(4);
    } catch (error: any) {
      console.error('Failed to get balance:', error);
      throw new Error('Bakiye alınamadı');
    }
  },

  async processMetaMaskPayment(
    paymentRequest: PaymentRequest,
    recipientAddress: string
  ): Promise<any> {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed');
    }

    try {
      const accounts = await this.connectMetaMask();
      const fromAddress = accounts;

      const amountInWei = Math.floor(paymentRequest.amount * Math.pow(10, 18)).toString(16);

      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: fromAddress,
            to: recipientAddress,
            value: '0x' + amountInWei,
            gas: '0x5208',
          }
        ]
      });

      const payment = await this.recordPayment({
        ...paymentRequest,
        paymentMethod: 'metamask',
        transactionHash,
        paymentStatus: 'completed'
      });

      await notificationService.sendPaymentNotification(
        paymentRequest.userId,
        paymentRequest.amount,
        paymentRequest.currency,
        'MetaMask (Crypto)',
        payment.receipt_url
      );

      return payment;
    } catch (error: any) {
      console.error('MetaMask payment failed:', error);

      await this.recordPayment({
        ...paymentRequest,
        paymentMethod: 'metamask',
        paymentStatus: 'failed'
      });

      throw new Error(error.message || 'Ödeme başarısız');
    }
  },

  async processCardPayment(
    paymentRequest: PaymentRequest,
    cardData: CardPaymentData
  ): Promise<any> {
    try {
      const isValid = this.validateCard(cardData);
      if (!isValid) {
        throw new Error('Geçersiz kart bilgileri');
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      const cardBrand = this.detectCardBrand(cardData.cardNumber);
      const last4 = cardData.cardNumber.slice(-4);

      const payment = await this.recordPayment({
        ...paymentRequest,
        paymentMethod: 'card',
        paymentStatus: 'completed',
        cardLast4: last4,
        cardBrand
      });

      await notificationService.sendPaymentNotification(
        paymentRequest.userId,
        paymentRequest.amount,
        paymentRequest.currency,
        `${cardBrand} ****${last4}`,
        payment.receipt_url
      );

      return payment;
    } catch (error: any) {
      console.error('Card payment failed:', error);

      await this.recordPayment({
        ...paymentRequest,
        paymentMethod: 'card',
        paymentStatus: 'failed'
      });

      throw error;
    }
  },

  validateCard(cardData: CardPaymentData): boolean {
    const cardNumber = cardData.cardNumber.replace(/\s/g, '');

    if (!/^\d{13,19}$/.test(cardNumber)) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  detectCardBrand(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (/^4/.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'Discover';
    if (/^35/.test(cleanNumber)) return 'JCB';
    if (/^30[0-5]/.test(cleanNumber)) return 'Diners Club';
    if (/^62/.test(cleanNumber)) return 'UnionPay';

    return 'Unknown';
  },

  async recordPayment(data: {
    userId: string;
    subscriptionId?: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentStatus: string;
    transactionHash?: string;
    cardLast4?: string;
    cardBrand?: string;
  }): Promise<any> {
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        user_id: data.userId,
        subscription_id: data.subscriptionId,
        amount: data.amount,
        currency: data.currency,
        payment_method: data.paymentMethod,
        payment_status: data.paymentStatus,
        transaction_hash: data.transactionHash,
        card_last4: data.cardLast4,
        card_brand: data.cardBrand,
        receipt_url: data.paymentStatus === 'completed'
          ? `/receipts/${Date.now()}.pdf`
          : undefined,
        metadata: {
          timestamp: new Date().toISOString(),
          ip: 'system'
        }
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Failed to record payment:', error);
      throw error;
    }

    return payment;
  },

  async getUserPayments(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch payments:', error);
      throw error;
    }

    return data;
  },

  async getPaymentById(paymentId: string) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch payment:', error);
      throw error;
    }

    return data;
  },

  async saveWalletConnection(userId: string, walletAddress: string, walletType = 'metamask') {
    const { data, error } = await supabase
      .from('wallet_connections')
      .insert({
        user_id: userId,
        wallet_address: walletAddress,
        wallet_type: walletType,
        is_primary: true
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Failed to save wallet connection:', error);
      throw error;
    }

    return data;
  },

  async getUserWallets(userId: string) {
    const { data, error } = await supabase
      .from('wallet_connections')
      .select('*')
      .eq('user_id', userId)
      .order('connected_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch wallets:', error);
      throw error;
    }

    return data;
  }
};
