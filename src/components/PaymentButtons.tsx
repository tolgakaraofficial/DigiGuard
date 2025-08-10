import React, { useState } from 'react';
import { CreditCard, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface PaymentButtonsProps {
  onPayment?: (type: 'certificate' | 'report', amount: number) => void;
}

export const PaymentButtons: React.FC<PaymentButtonsProps> = ({ onPayment }) => {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [completedPayments, setCompletedPayments] = useState<Set<string>>(new Set());

  const handlePayment = async (type: 'certificate' | 'report', amount: number) => {
    setIsProcessing(type);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark as completed
      setCompletedPayments(prev => new Set([...prev, type]));
      
      // Call parent callback if provided
      onPayment?.(type, amount);
      
      // Show success message
      alert(`${type === 'certificate' ? 'Sertifika' : 'Rapor ve İhlal Bildirimi'} ödemesi başarıyla tamamlandı!`);
    } catch (error) {
      alert('Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(null);
    }
  };

  const paymentOptions = [
    {
      id: 'certificate',
      title: 'Dijital Güvenlik Sertifikası',
      description: 'X.509 standart dijital sertifika, blockchain hash kaydı ve QR kod doğrulama',
      price: 30,
      currency: 'USD',
      icon: Shield,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      features: [
        'X.509 Dijital Sertifika',
        'Blockchain Hash Kaydı',
        'QR Kod ile Doğrulama',
        'Uluslararası Geçerlilik',
        '1 Yıl Geçerlilik Süresi'
      ]
    },
    {
      id: 'report',
      title: 'Rapor ve İhlal Bildirimi',
      description: 'Detaylı güvenlik raporu, tehdit analizi ve ihlal bildirim sistemi',
      price: 20,
      currency: 'USD',
      icon: FileText,
      color: 'bg-emerald-600',
      hoverColor: 'hover:bg-emerald-700',
      features: [
        'Detaylı Güvenlik Raporu',
        'AI Analiz Sonuçları',
        'Tehdit Tespiti',
        'İhlal Bildirimi',
        'PDF Export'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Premium Hizmetler</h2>
        <p className="text-slate-300 text-lg">
          Dijital kimlik korumanızı güçlendirin ve detaylı raporlara erişin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {paymentOptions.map((option) => {
          const isCompleted = completedPayments.has(option.id);
          const isProcessingThis = isProcessing === option.id;
          
          return (
            <div
              key={option.id}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className={`${option.color} p-4 rounded-xl`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    ${option.price}
                  </div>
                  <div className="text-sm text-slate-400">{option.currency}</div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {option.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Dahil Olan Özellikler:</h4>
                <ul className="space-y-3">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Button */}
              <button
                onClick={() => handlePayment(option.id as 'certificate' | 'report', option.price)}
                disabled={isProcessingThis || isCompleted}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 ${
                  isCompleted
                    ? 'bg-emerald-600 cursor-not-allowed'
                    : isProcessingThis
                    ? 'bg-slate-600 cursor-not-allowed'
                    : `${option.color} ${option.hoverColor} hover:shadow-lg transform hover:scale-105`
                }`}
              >
                {isProcessingThis ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>İşleniyor...</span>
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Satın Alındı</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Şimdi Satın Al - ${option.price}</span>
                  </>
                )}
              </button>

              {/* Security Notice */}
              {!isCompleted && (
                <div className="mt-4 flex items-start space-x-2 text-xs text-slate-400">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p>
                    Güvenli ödeme sistemi ile korunmaktadır. Kart bilgileriniz şifrelenerek saklanır.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Methods */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-white mb-6">Kabul Edilen Ödeme Yöntemleri</h3>
        <div className="flex justify-center items-center space-x-8 opacity-70">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-slate-400" />
            <span className="text-slate-400">Kredi Kartı</span>
          </div>
          <div className="w-px h-6 bg-slate-600"></div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold">VISA</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold">MasterCard</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold">American Express</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6">Sık Sorulan Sorular</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Sertifika ne kadar süre geçerlidir?</h4>
            <p className="text-slate-300">Dijital güvenlik sertifikası 1 yıl boyunca geçerlidir ve yenilenebilir.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Rapor ne zaman hazır olur?</h4>
            <p className="text-slate-300">Ödeme sonrası 24 saat içinde detaylı rapor e-posta adresinize gönderilir.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">İade politikası nedir?</h4>
            <p className="text-slate-300">7 gün içinde koşulsuz iade garantisi sunuyoruz.</p>
          </div>
        </div>
      </div>
    </div>
  );
};