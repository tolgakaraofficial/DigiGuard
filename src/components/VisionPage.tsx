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
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="relative inline-block mb-5">
          <div className="absolute inset-0 bg-cyan-500/40 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl shadow-2xl hover:scale-110 transition-transform duration-300">
            <Eye className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">Vizyonumuz</h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto drop-shadow-md">
          Dijital dünyanın güvenilir ve doğrulanabilir olduğu bir gelecek inşa ediyoruz
        </p>
      </div>

      <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-md rounded-xl p-6 md:p-8 mb-10 border border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-5 text-center drop-shadow-lg">Ana Hedefimiz</h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto drop-shadow-md">
          2030 yılına kadar, dijital kimlik doğrulama ve deepfake koruması alanında dünya çapında
          tanınan ve güvenilen platform olmak. İnternet üzerindeki her bireyin dijital varlığını
          koruyabileceği, güvenli ve şeffaf bir ekosistem yaratmak.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Vizyon Pillarımız</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {visionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
              >
                <div className="bg-cyan-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-3 shadow-lg">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2 drop-shadow-md">{point.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm drop-shadow-sm">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-center mb-6">
          <Rocket className="h-7 w-7 text-blue-400 mr-2 drop-shadow-lg" />
          <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">Yol Haritamız</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {roadmap.map((phase, index) => (
            <div
              key={index}
              className="bg-slate-800/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 relative hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
            >
              <div className="absolute -top-3 left-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {phase.year}
              </div>
              <h3 className="text-base font-semibold text-white mb-3 mt-2 drop-shadow-md">{phase.title}</h3>
              <ul className="space-y-1.5">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-slate-400 text-xs flex items-start drop-shadow-sm">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-400 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 md:p-8 border border-slate-700/50 shadow-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-5 text-center drop-shadow-lg">Değerlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <div className="text-center bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-base font-semibold text-white mb-2 drop-shadow-md">Güvenlik</h3>
            <p className="text-slate-400 text-sm drop-shadow-sm">
              Kullanıcı verilerinin korunması birinci önceliğimiz
            </p>
          </div>
          <div className="text-center bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="text-base font-semibold text-white mb-2 drop-shadow-md">Şeffaflık</h3>
            <p className="text-slate-400 text-sm drop-shadow-sm">
              Blockchain ile tam şeffaf ve denetlenebilir sistem
            </p>
          </div>
          <div className="text-center bg-slate-700/30 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-base font-semibold text-white mb-2 drop-shadow-md">İnovasyon</h3>
            <p className="text-slate-400 text-sm drop-shadow-sm">
              Sürekli gelişim ve teknoloji liderliği
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
