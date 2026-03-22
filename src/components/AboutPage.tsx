import React from 'react';
import { Shield, Users, Lock, Globe, Award, Zap } from 'lucide-react';
import { TechStackStarfield } from './TechStackStarfield';

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
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="relative inline-block mb-5">
          <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full animate-pulse"></div>
          <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-2xl hover:scale-110 transition-transform duration-300">
            <Shield className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg">DigiGuard Hakkında</h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto drop-shadow-md">
          Dijital kimliğinizi deepfake ve sahte içeriklerden koruyan yeni nesil güvenlik platformu
        </p>

        {/* Security Badges */}
        <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
          <div className="flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105">
            <Lock className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-blue-400 font-medium text-xs drop-shadow-md">256-bit Şifreleme</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-600/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:bg-emerald-600/30 transition-all duration-300 hover:scale-105">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs drop-shadow-md">Blockchain Güvenlik</span>
          </div>
          <div className="flex items-center space-x-2 bg-orange-600/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-orange-500/30 hover:bg-orange-600/30 transition-all duration-300 hover:scale-105">
            <Award className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-orange-400 font-medium text-xs drop-shadow-md">AI Korumalı</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 md:p-8 mb-10 border border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-5 drop-shadow-lg">DigiGuard Nedir?</h2>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-5 drop-shadow-md">
          DigiGuard, yapay zeka destekli sahte içerik (deepfake) tehdidine karşı bireylerin ve kurumların
          dijital kimliklerini korumak için geliştirilmiş yeni nesil güvenlik platformudur.
        </p>
        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-5 drop-shadow-md">
          Modern teknolojilerin getirdiği tehditler karşısında, kullanıcılarımıza biyometrik doğrulama,
          blockchain tabanlı kimlik kaydı ve yapay zeka destekli tehdit tespit sistemleri sunuyoruz.
        </p>

        <h3 className="text-lg md:text-xl font-bold text-white mb-4 mt-6 drop-shadow-lg">Kimler İçin?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300">
            <h4 className="font-semibold text-blue-400 mb-2 drop-shadow-md">Bireyler İçin</h4>
            <ul className="text-slate-300 space-y-1.5 text-sm drop-shadow-sm">
              <li>• Dijital kimliğinizi deepfake saldırılarından koruyun</li>
              <li>• Biyometrik verilerinizi güvenli şekilde saklayın</li>
              <li>• Blockchain tabanlı kimlik sertifikası alın</li>
              <li>• Sosyal medya ve online platformlarda güvenliğinizi artırın</li>
            </ul>
          </div>
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600/50 hover:border-emerald-500/50 transition-all duration-300">
            <h4 className="font-semibold text-emerald-400 mb-2 drop-shadow-md">Kurumlar İçin</h4>
            <ul className="text-slate-300 space-y-1.5 text-sm drop-shadow-sm">
              <li>• Çalışanlarınızın kimliklerini güvenli şekilde doğrulayın</li>
              <li>• Deepfake saldırılarına karşı kurumsal koruma</li>
              <li>• Blockchain ile şeffaf ve denetlenebilir sistem</li>
              <li>• API entegrasyonu ile mevcut sistemlerinize kolayca ekleyin</li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-4 mt-6 drop-shadow-lg">Nasıl Çalışır?</h3>
        <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-slate-600/50">
          <ol className="text-slate-300 space-y-3 md:space-y-4">
            <li className="flex items-start space-x-3">
              <span className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg text-sm">1</span>
              <div className="drop-shadow-sm">
                <strong className="text-white drop-shadow-md">Kayıt:</strong> Yüz ve ses biyometrileriniz SHA-256 ile şifrelenerek güvenli bir şekilde kaydedilir.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg text-sm">2</span>
              <div className="drop-shadow-sm">
                <strong className="text-white drop-shadow-md">Blockchain Kaydı:</strong> Kimliğiniz Web3/Web4 blockchain ağına kaydedilir ve değiştirilemez hale gelir.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg text-sm">3</span>
              <div className="drop-shadow-sm">
                <strong className="text-white drop-shadow-md">Doğrulama:</strong> İhtiyaç duyulduğunda kimliğiniz blockchain üzerinden anında doğrulanabilir.
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg text-sm">4</span>
              <div className="drop-shadow-sm">
                <strong className="text-white drop-shadow-md">Koruma:</strong> AI destekli sistem, sahte içerik girişimlerini otomatik olarak tespit eder ve engeller.
              </div>
            </li>
          </ol>
        </div>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed mt-6 drop-shadow-md">
          <strong className="text-white drop-shadow-lg">Karprime Technology INC.</strong> olarak, dijital güvenliğin geleceğini inşa ediyoruz.
          DigiGuard ile dijital dünyanın tehditlerine karşı en güvenli kalkan sizinle birlikte.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">Temel Özellikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
              >
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600/30 transition-all duration-300 shadow-lg">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2 drop-shadow-md">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed drop-shadow-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative bg-black rounded-xl p-6 md:p-8 border border-blue-500/30 shadow-2xl overflow-hidden">
        <TechStackStarfield />
        <div className="relative z-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 drop-shadow-lg">Teknoloji Yığınımız</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
            <div className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">SHA-256</div>
              <div className="text-slate-300 text-xs md:text-sm drop-shadow-md">Şifreleme</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">Web3</div>
              <div className="text-slate-300 text-xs md:text-sm drop-shadow-md">Blockchain</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">AI/ML</div>
              <div className="text-slate-300 text-xs md:text-sm drop-shadow-md">Yapay Zeka</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">Biometric</div>
              <div className="text-slate-300 text-xs md:text-sm drop-shadow-md">Biyometrik</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
