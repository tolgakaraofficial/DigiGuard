import React from 'react';
import { Shield, Users, Globe, Lock, Zap, Award, X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">DigiGuard About</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              Dijital Kimliginizin Secure Gelecegi
            </h3>
            <p className="text-slate-200 leading-relaxed">
              DigiGuard, bireylerin ve kamu institutionlarinin dijital kimlik verification sureclerini
              en ust duzey security standartlariyla yonetmesini saglayan yeni nesil bir platformdur.
              Blockchain teknolojisi, biyometrik verification ve Web3/Web4/Web5 entegrasyonu ile
              kimlik bilgilerinizi koruma altina aliyoruz.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Temel Featureler</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">SHA-256 Passwordleme</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  Tum verileriniz endustri standardi SHA-256 algoritmasi ile sifrelenir
                  ve guvenli sekilde saklanir.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-cyan-600 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Biyometrik Securek</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  Parmak izi ve yuz tanima teknolojileri ile kimlik verificationnizi
                  daha guvenli hale getirin.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Web3/Web4/Web5</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  Center olmayan kimlik protokolleri ile kendi verilerinizin
                  tam kontrolu sizde olsun.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Blockchain Gettyapisi</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  Identity kayitlariniz blockchain uzerinde degistirilemez sekilde
                  saklanir ve dogrulanir.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span>Kimler Icin?</span>
            </h3>

            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">👤 Individual Userlar</h4>
                <p className="text-slate-300 text-sm">
                  Identity bilgilerinizi guvenle saklayin, dijital islemlerinizde kolayca
                  verification yapin. Personsel verilerinizin kontrolu tamamen sizde olsun.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">🏛️ Public Enterpriselari</h4>
                <p className="text-slate-300 text-sm">
                  Your citizens' identity verification in a secure, fast and transparent
                  sekilde gerceklestirin. E-devlet entegrasyonu ile surecleri kolaylastirin.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">🏢 Corporate Cozumler</h4>
                <p className="text-slate-300 text-sm">
                  Calisan kimlik yonetimi, erisim kontrolu ve guvenli belge verification
                  sistemleri kurun. KVKK ve GDPR uyumlu cozumler sunun.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-5 border border-slate-600">
            <h4 className="font-semibold text-white mb-3">📊 Securek Standartlari</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>ISO 27001 Information Securegi Yonetim Systemi</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>KVKK ve GDPR Uyumlu Data Yonetimi</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>SOC 2 Type II Certificatesyonu</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>End-to-End Passwordleme</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
