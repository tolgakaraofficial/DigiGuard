import React from 'react';
import { Eye, Rocket, TrendingUp, Globe as Globe2, Brain, Shield } from 'lucide-react';

export const VisionPage: React.FC = () => {
  const visionPoints = [
    {
      icon: Globe2,
      title: 'Küresel Ölçekte Koruma',
      description: 'DigiGuard platformunu dünya çapında milyonlarca kullanıcıya ulaştırarak, dijital kimlik güvenliğini evrensel bir hak haline getirmeyi hedefliyoruz.'
    },
    {
      icon: Brain,
      title: 'Yapay Zeka Liderliği',
      description: 'Deepfake tespit ve önleme konusunda endüstri standardını belirleyen, en gelişmiş AI algoritmalarını geliştiriyoruz.'
    },
    {
      icon: Shield,
      title: 'Tam Güvenlik Ekosistemi',
      description: 'Bireylerden kurumlara, medyadan hukuka kadar tüm sektörleri kapsayan entegre bir dijital güvenlik ekosistemi oluşturuyoruz.'
    }
  ];

  const roadmap = [
    {
      year: '2026',
      title: 'Pazar Lansmanı',
      items: [
        'Beta sürüm kullanıcı testleri',
        'İlk 10.000 kullanıcı hedefi',
        'Mobil uygulama lansmanı',
        'Temel biyometrik doğrulama sistemi'
      ]
    },
    {
      year: '2027',
      title: 'Ölçeklendirme',
      items: [
        'Enterprise çözümler',
        'API platformu lansmanı',
        'Uluslararası pazar açılımı',
        'AI modellerinde v2.0 güncellemesi'
      ]
    },
    {
      year: '2028',
      title: 'Ekosistem Genişlemesi',
      items: [
        'Blockchain altyapısı genişletme',
        'Endüstri ortaklıkları',
        'Hukuki entegrasyon sistemleri',
        'IoT cihaz desteği'
      ]
    },
    {
      year: '2029+',
      title: 'Liderlik',
      items: [
        'Global standart haline gelme',
        'Yeni teknoloji entegrasyonları',
        'Akademik araştırma işbirlikleri',
        'Sürdürülebilir büyüme'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-2xl mb-6">
          <Eye className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Vizyonumuz</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Dijital dünyanın güvenilir ve doğrulanabilir olduğu bir gelecek inşa ediyoruz
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 mb-12 border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Ana Hedefimiz</h2>
        <p className="text-slate-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
          2030 yılına kadar, dijital kimlik doğrulama ve deepfake koruması alanında dünya çapında
          tanınan ve güvenilen platform olmak. İnternet üzerindeki her bireyin dijital varlığını
          koruyabileceği, güvenli ve şeffaf bir ekosistem yaratmak.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Vizyon Pillarımız</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all"
              >
                <div className="bg-purple-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-slate-400 leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-center mb-8">
          <Rocket className="h-8 w-8 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Yol Haritamız</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmap.map((phase, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all relative"
            >
              <div className="absolute -top-4 left-6 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                {phase.year}
              </div>
              <h3 className="text-lg font-semibold text-white mb-4 mt-2">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-400 text-sm flex items-start">
                    <TrendingUp className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-semibold text-white mb-2">Güvenlik</h3>
            <p className="text-slate-400 text-sm">
              Kullanıcı verilerinin korunması birinci önceliğimiz
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🌐</div>
            <h3 className="text-lg font-semibold text-white mb-2">Şeffaflık</h3>
            <p className="text-slate-400 text-sm">
              Blockchain ile tam şeffaf ve denetlenebilir sistem
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-lg font-semibold text-white mb-2">İnovasyon</h3>
            <p className="text-slate-400 text-sm">
              Sürekli gelişim ve teknoloji liderliği
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
