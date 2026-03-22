import React from 'react';
import { Briefcase, Video, Scale, GraduationCap, Heart, Building, Newspaper, ShieldCheck } from 'lucide-react';

export const UseCasesPage: React.FC = () => {
  const useCases = [
    {
      icon: Briefcase,
      title: 'Kurumsal Kimlik Doğrulama',
      description: 'Şirketlerin çalışanlarını ve iş ortaklarını güvenli şekilde doğrulaması',
      scenarios: [
        'Uzaktan çalışan kimlik kontrolü',
        'Hassas belgelere erişim yetkilendirmesi',
        'Toplantı ve konferans katılımcı doğrulaması',
        'Şirket içi veri güvenliği'
      ],
      color: 'blue'
    },
    {
      icon: Video,
      title: 'Medya ve İçerik Üreticileri',
      description: 'İçerik üreticilerinin orijinal eserlerini sahte içeriklerden koruma',
      scenarios: [
        'Video ve fotoğraf orijinallik sertifikası',
        'Deepfake tespit ve uyarı sistemi',
        'Telif hakkı koruma',
        'İçerik doğrulama damgası'
      ],
      color: 'purple'
    },
    {
      icon: Scale,
      title: 'Hukuk ve Adli Sistem',
      description: 'Mahkemelerde delil olarak kullanılabilecek dijital kimlik doğrulama',
      scenarios: [
        'Dijital delil otantikasyonu',
        'Tanık ve uzman doğrulaması',
        'Elektronik imza güvenliği',
        'Video konferans mahkeme oturumları'
      ],
      color: 'emerald'
    },
    {
      icon: GraduationCap,
      title: 'Eğitim Kurumları',
      description: 'Öğrenci kimlik doğrulama ve online sınav güvenliği',
      scenarios: [
        'Online sınav kimlik kontrolü',
        'Diploma ve sertifika doğrulama',
        'Öğrenci kayıt ve devam takibi',
        'Uzaktan eğitim katılımcı kontrolü'
      ],
      color: 'orange'
    },
    {
      icon: Heart,
      title: 'Sağlık Sektörü',
      description: 'Hasta ve sağlık personeli kimlik doğrulama',
      scenarios: [
        'Tele-sağlık hasta doğrulaması',
        'Elektronik reçete güvenliği',
        'Tıbbi kayıt erişim kontrolü',
        'Sağlık personeli yetkilendirmesi'
      ],
      color: 'red'
    },
    {
      icon: Building,
      title: 'Bankacılık ve Finans',
      description: 'Finansal işlemlerde güvenli kimlik doğrulama',
      scenarios: [
        'Uzaktan hesap açma',
        'Büyük tutarlı işlem onayı',
        'Kredi başvuru doğrulaması',
        'Dolandırıcılık önleme'
      ],
      color: 'cyan'
    },
    {
      icon: Newspaper,
      title: 'Gazetecilik ve Basın',
      description: 'Haber kaynaklarının doğruluğunu garanti altına alma',
      scenarios: [
        'Kaynak doğrulama',
        'Röportaj kişisi kimlik kontrolü',
        'Fotoğraf ve video orijinalliği',
        'Fake news önleme'
      ],
      color: 'indigo'
    },
    {
      icon: ShieldCheck,
      title: 'Kamu Hizmetleri',
      description: 'Vatandaşların kamu hizmetlerine güvenli erişimi',
      scenarios: [
        'e-Devlet kimlik doğrulaması',
        'Sosyal yardım başvuruları',
        'Vergi ve resmi işlemler',
        'Dijital vatandaşlık hizmetleri'
      ],
      color: 'teal'
    }
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/50' },
    purple: { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-500/50' },
    emerald: { bg: 'bg-emerald-600/20', text: 'text-emerald-400', border: 'border-emerald-500/50' },
    orange: { bg: 'bg-orange-600/20', text: 'text-orange-400', border: 'border-orange-500/50' },
    red: { bg: 'bg-red-600/20', text: 'text-red-400', border: 'border-red-500/50' },
    cyan: { bg: 'bg-cyan-600/20', text: 'text-cyan-400', border: 'border-cyan-500/50' },
    indigo: { bg: 'bg-indigo-600/20', text: 'text-indigo-400', border: 'border-indigo-500/50' },
    teal: { bg: 'bg-teal-600/20', text: 'text-teal-400', border: 'border-teal-500/50' }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-2xl mb-6">
          <Briefcase className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Kullanım Senaryoları</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          DigiGuard'ın farklı sektörlerde ve kullanım alanlarında nasıl değer yarattığını keşfedin
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-2xl p-8 mb-12 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Gerçek Dünya Problemleri, Gerçek Çözümler</h2>
        <p className="text-slate-300 text-center max-w-4xl mx-auto leading-relaxed">
          Deepfake teknolojisinin yaygınlaşmasıyla birlikte, dijital kimlik doğrulama ihtiyacı her sektörde kritik hale geldi.
          DigiGuard, bu ihtiyaca kapsamlı ve güvenilir çözümler sunuyor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          const colors = colorClasses[useCase.color];

          return (
            <div
              key={index}
              className={`bg-slate-800 rounded-xl p-6 border border-slate-700 hover:${colors.border} transition-all`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`${colors.bg} w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-7 w-7 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                  <p className="text-slate-400 text-sm">{useCase.description}</p>
                </div>
              </div>

              <div className="ml-[72px]">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Kullanım Alanları:</h4>
                <ul className="space-y-2">
                  {useCase.scenarios.map((scenario, scenarioIndex) => (
                    <li key={scenarioIndex} className="flex items-start text-slate-400 text-sm">
                      <span className={`${colors.text} mr-2 mt-1`}>•</span>
                      <span>{scenario}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Başarı Metrikleri</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-slate-300 text-sm">Doğruluk Oranı</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">&lt;2s</div>
            <div className="text-slate-300 text-sm">Doğrulama Süresi</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">8+</div>
            <div className="text-slate-300 text-sm">Sektör Desteği</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
            <div className="text-slate-300 text-sm">Kesintisiz Hizmet</div>
          </div>
        </div>
      </div>
    </div>
  );
};
