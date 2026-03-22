import React from 'react';
import { Shield, Users, Lock, Globe, Award, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Gelişmiş Güvenlik',
      description: 'SHA-256 şifreleme ve blockchain teknolojisi ile verileriniz tamamen güvende.'
    },
    {
      icon: Lock,
      title: 'Biyometrik Doğrulama',
      description: 'Yüz ve ses tanıma ile benzersiz kimlik doğrulama sistemi.'
    },
    {
      icon: Globe,
      title: 'Merkezi Olmayan Yapı',
      description: 'Web3 ve Web4 teknolojileri ile dağıtık ve şeffaf bir sistem.'
    },
    {
      icon: Award,
      title: 'Sertifikalandırma',
      description: 'Dijital kimliğiniz için blockchain tabanlı doğrulanabilir sertifika.'
    },
    {
      icon: Users,
      title: 'Kullanıcı Odaklı',
      description: 'Kolay kullanım ve anlaşılır arayüz ile herkes için erişilebilir.'
    },
    {
      icon: Zap,
      title: 'Hızlı ve Güvenilir',
      description: 'Anlık doğrulama ve yüksek performans garantisi.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full"></div>
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl">
            <Shield className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">DigiGuard Hakkında</h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Dijital kimliğinizi deepfake ve sahte içeriklerden koruyan yeni nesil güvenlik platformu
        </p>

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div className="flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-lg border border-blue-500/30">
            <Lock className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-medium text-sm">256-bit Şifreleme</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-600/20 px-4 py-2 rounded-lg border border-emerald-500/30">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-sm">Blockchain Güvenlik</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-500/30">
            <Award className="h-4 w-4 text-purple-400" />
            <span className="text-purple-400 font-medium text-sm">AI Korumalı</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">DigiGuard Nedir?</h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          DigiGuard, yapay zeka destekli sahte içerik (deepfake) tehdidine karşı bireylerin ve kurumların
          dijital kimliklerini korumak için geliştirilmiş yeni nesil güvenlik platformudur.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          Modern teknolojilerin getirdiği tehditler karşısında, kullanıcılarımıza biyometrik doğrulama,
          blockchain tabanlı kimlik kaydı ve yapay zeka destekli tehdit tespit sistemleri sunuyoruz.
        </p>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Kimler İçin?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Bireyler İçin</h4>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>• Dijital kimliğinizi deepfake saldırılarından koruyun</li>
              <li>• Biyometrik verilerinizi güvenli şekilde saklayın</li>
              <li>• Blockchain tabanlı kimlik sertifikası alın</li>
              <li>• Sosyal medya ve online platformlarda güvenliğinizi artırın</li>
            </ul>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-emerald-400 mb-2">Kurumlar İçin</h4>
            <ul className="text-slate-300 space-y-2 text-sm">
              <li>• Çalışanlarınızın kimliklerini güvenli şekilde doğrulayın</li>
              <li>• Deepfake saldırılarına karşı kurumsal koruma</li>
              <li>• Blockchain ile şeffaf ve denetlenebilir sistem</li>
              <li>• API entegrasyonu ile mevcut sistemlerinize kolayca ekleyin</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 mt-8">Nasıl Çalışır?</h3>
        <div className="bg-slate-700 rounded-lg p-6">
          <ol className="text-slate-300 space-y-4">
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">1</span>
              <div>
                <strong className="text-white">Kayıt:</strong> Yüz ve ses biyometrileriniz SHA-256 ile şifrelenerek güvenli bir şekilde kaydedilir.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">2</span>
              <div>
                <strong className="text-white">Blockchain Kaydı:</strong> Kimliğiniz Web3/Web4 blockchain ağına kaydedilir ve değiştirilemez hale gelir.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">3</span>
              <div>
                <strong className="text-white">Doğrulama:</strong> İhtiyaç duyulduğunda kimliğiniz blockchain üzerinden anında doğrulanabilir.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">4</span>
              <div>
                <strong className="text-white">Koruma:</strong> AI destekli sistem, sahte içerik girişimlerini otomatik olarak tespit eder ve engeller.
              </div>
            </li>
          </ol>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mt-8">
          <strong className="text-white">Karprime Technology INC.</strong> olarak, dijital güvenliğin geleceğini inşa ediyoruz.
          DigiGuard ile dijital dünyanın tehditlerine karşı en güvenli kalkan sizinle birlikte.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Temel Özellikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-all group"
              >
                <div className="bg-blue-600/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <Icon className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Teknoloji Yığınımız</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">SHA-256</div>
              <div className="text-slate-300 text-sm">Şifreleme</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">Web3</div>
              <div className="text-slate-300 text-sm">Blockchain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">AI/ML</div>
              <div className="text-slate-300 text-sm">Yapay Zeka</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">Biometric</div>
              <div className="text-slate-300 text-sm">Biyometrik</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
