import React from 'react';
import { X, Check, Zap, Shield, Rocket, CreditCard, Building2, Globe } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Bireysel',
      icon: Shield,
      price: '99',
      period: '/ay',
      description: 'Kisisel kullanim icin ideal',
      color: 'from-blue-600 to-cyan-600',
      features: [
        'Biyometrik kimlik dogrulama',
        'Blockchain KYC sertifikasi',
        '5 cihaz destegi',
        '7/24 teknik destek',
        'Temel AI guvenlik analizi',
        'Mobil uygulama erisimi',
      ],
      popular: false,
    },
    {
      name: 'Profesyonel',
      icon: Zap,
      price: '299',
      period: '/ay',
      description: 'Kucuk isletmeler ve freelancerlar icin',
      color: 'from-purple-600 to-pink-600',
      features: [
        'Bireysel plandaki tum ozellikler',
        'Gelismis AI risk skorlamasi',
        '20 cihaz destegi',
        'API erisimi (10,000 istek/ay)',
        'Web3/Web4/Web5 entegrasyonu',
        'Oncelikli teknik destek',
        'Ozel dashboard raporlari',
        'Coklu kullanici yonetimi (5 kullanici)',
      ],
      popular: true,
    },
    {
      name: 'Kurumsal',
      icon: Rocket,
      price: 'Ozel',
      period: '',
      description: 'Buyuk olcekli organizasyonlar icin',
      color: 'from-orange-600 to-red-600',
      features: [
        'Profesyonel plandaki tum ozellikler',
        'Sinirsiz cihaz ve kullanici',
        'Sinirsiz API istekleri',
        'Ozel AI modelleri',
        'Dedicated sunucu secenegi',
        'SLA garantisi %99.99',
        '24/7 ozel destek ekibi',
        'On-premise kurulum',
        'Ozel egitim ve danismanlik',
        'White-label cozumler',
      ],
      popular: false,
    },
  ];

  const paymentMethods = [
    { name: 'Kredi/Banka Karti', icon: CreditCard, supported: ['Visa', 'Mastercard', 'Amex'] },
    { name: 'Kripto Para', icon: Globe, supported: ['Bitcoin', 'Ethereum', 'USDT'] },
    { name: 'Banka Havalesi', icon: Building2, supported: ['SWIFT', 'SEPA', 'EFT'] },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2.5 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Hizmetler ve Fiyatlandirma</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              Guveniniz Icin En Uygun Plani Secin
            </h3>
            <p className="text-slate-200 leading-relaxed">
              DigiGuard ile kimlik guvenliginizi profesyonel seviyeye tasıyin. Tum planlar 14 gun ucretsiz deneme ile baslar.
              Istediginiz zaman iptal edebilir, plan degistirebilirsiniz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-slate-700/50 rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 relative ${
                  plan.popular
                    ? 'border-purple-500 shadow-xl shadow-purple-500/20'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    EN POPÜLER
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.color} p-3 rounded-lg w-fit mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-white">
                      {plan.price === 'Ozel' ? plan.price : `₺${plan.price}`}
                    </span>
                    {plan.period && <span className="text-slate-400 ml-2 mb-1">{plan.period}</span>}
                  </div>
                  {plan.price !== 'Ozel' && (
                    <p className="text-xs text-slate-500 mt-1">KDV dahil, yillik odemede %20 indirim</p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                      : 'bg-slate-600 hover:bg-slate-500 text-white'
                  }`}
                >
                  {plan.price === 'Ozel' ? 'Iletisime Gecin' : '14 Gun Ucretsiz Deneyin'}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CreditCard className="h-5 w-5 text-green-400 mr-2" />
              Odeme Yontemleri
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <method.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{method.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {method.supported.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-600/30 text-green-300 text-xs rounded border border-green-500/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <Shield className="h-4 w-4 text-blue-400 mr-2" />
                Guvenli Odeme Garantisi
              </h4>
              <p className="text-slate-300 text-sm">
                Tum odemeleriniz 256-bit SSL sifreleme ile korunur. PCI DSS Level 1 uyumlu odeme altyapisi.
                Kredi karti bilgileriniz asla saklanmaz veya paylasilmaz.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sik Sorulan Sorular</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-1">Ucretsiz deneme suresi nasil calisir?</h4>
                <p className="text-slate-300 text-sm">
                  14 gun boyunca sectiginiz planin tum ozelliklerini ucretsiz kullanabilirsiniz. Kredi karti bilgisi
                  gereklidir ancak deneme suresi bitmeden iptal ederseniz ucret tahsil edilmez.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Plan degisikligi nasil yapilir?</h4>
                <p className="text-slate-300 text-sm">
                  Istediginiz zaman dashboard uzerinden planınızı yukseltilebilir veya dusurebirsiniz. Fark tutarlar
                  oransal olarak hesaplanir.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Kurumsal plan icin iletisim?</h4>
                <p className="text-slate-300 text-sm">
                  Kurumsal cozumler icin sales@digiguard.com adresinden veya +90 850 XXX XX XX numarasından
                  uzman ekibimize ulaşabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
