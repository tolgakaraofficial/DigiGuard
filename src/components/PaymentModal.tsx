import React, { useState } from 'react';
import { X, CreditCard, Wallet, Check, AlertCircle } from 'lucide-react';
import { paymentService } from '../services/paymentService';
import { invoiceService } from '../services/invoiceService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  amount: number;
  currency: string;
  planType: string;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  userId,
  amount,
  currency,
  planType,
  onSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'metamask'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardData({ ...cardData, cardNumber: formatted });
  };

  const handleConnectMetaMask = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      const address = await paymentService.connectMetaMask();
      setWalletAddress(address);
      await paymentService.saveWalletConnection(userId, address);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardPayment = async () => {
    try {
      setError(null);
      setIsProcessing(true);

      const payment = await paymentService.processCardPayment(
        {
          userId,
          amount,
          currency,
          paymentMethod: 'card'
        },
        cardData
      );

      await invoiceService.createInvoice({
        userId,
        paymentId: payment.id,
        amount,
        currency,
        items: [
          {
            description: `DigiGuard ${planType} Plan`,
            quantity: 1,
            unitPrice: amount,
            total: amount
          }
        ]
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMetaMaskPayment = async () => {
    try {
      setError(null);
      setIsProcessing(true);

      const recipientAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

      const payment = await paymentService.processMetaMaskPayment(
        {
          userId,
          amount: amount / 1000,
          currency: 'ETH',
          paymentMethod: 'metamask'
        },
        recipientAddress
      );

      await invoiceService.createInvoice({
        userId,
        paymentId: payment.id,
        amount,
        currency,
        items: [
          {
            description: `DigiGuard ${planType} Plan (Crypto)`,
            quantity: 1,
            unitPrice: amount,
            total: amount
          }
        ]
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30 shadow-2xl">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Ödeme Yap
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ödeme Başarılı!</h3>
              <p className="text-slate-400">Faturanız e-posta ve SMS ile gönderildi.</p>
            </div>
          ) : (
            <>
              <div className="bg-slate-800 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Plan:</span>
                  <span className="text-white font-semibold">{planType}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-slate-400">Toplam:</span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {amount} {currency}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                  <span className="text-white font-semibold">Kredi Kartı</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('metamask')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'metamask'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <Wallet className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                  <span className="text-white font-semibold">MetaMask</span>
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Kart Sahibi
                    </label>
                    <input
                      type="text"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value.toUpperCase() })}
                      placeholder="AD SOYAD"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Ay
                      </label>
                      <input
                        type="text"
                        value={cardData.expiryMonth}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').substring(0, 2);
                          setCardData({ ...cardData, expiryMonth: value });
                        }}
                        placeholder="MM"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                        maxLength={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Yıl
                      </label>
                      <input
                        type="text"
                        value={cardData.expiryYear}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').substring(0, 2);
                          setCardData({ ...cardData, expiryYear: value });
                        }}
                        placeholder="YY"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                        maxLength={2}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                          setCardData({ ...cardData, cvv: value });
                        }}
                        placeholder="123"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCardPayment}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'İşleniyor...' : `${amount} ${currency} Öde`}
                  </button>
                </div>
              )}

              {paymentMethod === 'metamask' && (
                <div className="space-y-4">
                  {!walletAddress ? (
                    <button
                      onClick={handleConnectMetaMask}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Wallet className="h-5 w-5" />
                      {isProcessing ? 'Bağlanıyor...' : 'MetaMask Bağla'}
                    </button>
                  ) : (
                    <>
                      <div className="bg-slate-800 rounded-lg p-4">
                        <p className="text-sm text-slate-400 mb-1">Bağlı Cüzdan</p>
                        <p className="text-white font-mono text-sm break-all">{walletAddress}</p>
                      </div>

                      <button
                        onClick={handleMetaMaskPayment}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'İşleniyor...' : `${(amount / 1000).toFixed(4)} ETH Öde`}
                      </button>
                    </>
                  )}
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                  Ödemeniz 256-bit SSL şifreleme ile korunmaktadır
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
