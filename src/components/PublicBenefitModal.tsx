import React from 'react';
import { X, Heart, Users, Shield, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

interface PublicBenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicBenefitModal: React.FC<PublicBenefitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2.5 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Public Benefiti ve Social ki</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              Toplumsal Fayda Icin Teknoloji
            </h3>
            <p className="text-slate-200 leading-relaxed">
              DigiGuard, sadece bir teknoloji platformu degil, ayni zamanda toplumsal fayda yaratan bir sosyal sorumluluk projesidir.
              Identity hirsizligi, sahtecilik ve veri ihlallerine karsi toplumu korumak icin calisiyoruz.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Users className="h-5 w-5 text-blue-400 mr-2" />
              Toplumsal Fayda Getanlari
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Identity Hirsizliginin Onlenmesi</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Her yil milyonlarca insan kimlik hirsizliginin magduru oluyor. DigiGuard, biyometrik verification
                  ve blockchain teknolojisi ile kimliklerinizi koruyor, sahtecilik oranlarini %95 oraninda azaltiyor.
                </p>
                <div className="flex items-center text-xs text-blue-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Annual 2M+ kimlik hirsizligi onleniyor</span>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Social Helplarda Seffaflik</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Government yardimlari ve hayir institutionlari, DigiGuard ile dogru ihtiyac ownlerine ulasabiliyor.
                  Cift kayit ve sahtecilik engelleniyor, kaynaklar verimli kullaniliyor.
                </p>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>%40 daha fazla ihtiyac sahibine ulasim</span>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Dijital Esitlik ve Kapsayicilik</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Herkes icin erisilebilir dijital kimlik services sunuyoruz. Engelli bireylere ozel arayuzler,
                  dusuk gelirli kesimler icin ucretsiz temel hizmetler ve yaslilara teknik destek.
                </p>
                <div className="flex items-center text-xs text-purple-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>500K+ ucretsiz hesap saglandi</span>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-5 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Multeci ve Gocmenlere Support</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Identity belgelerini kaybetmis multeci ve gocmenler, DigiGuard ile yeni yasam alanlarina
                  entegre olabiliyor. Biyometrik kimlik, saglik, egitim ve istihdam servicesne erisimi kolaylastiriyor.
                </p>
                <div className="flex items-center text-xs text-orange-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>150K+ multeciye kimlik hizmeti</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              Ekonomik ve Social kiler
            </h3>

            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Ekonomik Buyumeye Katki</h4>
                <p className="text-slate-300 text-sm">
                  Dijital kimlik altyapisi, online ticaretin buyumesini hizlandiriyor. Guvenli KYC sureciyle
                  e-ticaret hacmi artiyor, ekonomiye yillik $50B+ katki saglaniyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Isgucu Piyasasina Reach</h4>
                <p className="text-slate-300 text-sm">
                  Dogrulanmis dijital kimlik profilleri, ise basvuru sureclerini hizlandiriyor. Issizlik orani
                  azaliyor, kalifiye elemanlara erisim kolaylasiyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Egitim ve Saglik Servicelerine Reach</h4>
                <p className="text-slate-300 text-sm">
                  Identity verification ile online egitim platformlarina kayit, hasta randevulari ve teletip
                  services daha guvenli hale geliyor. Herkese esit erisim saglaniyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Kadin ve Cocuk Haklari</h4>
                <p className="text-slate-300 text-sm">
                  Kadinlarin ve cocuklarin kimlik haklari DigiGuard ile korunuyor. Zorla evlilik, insan ticareti
                  ve cocuk istismari vakalarinda identity verification kritik rol oynuyor.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-5">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-cyan-400" />
              Social Questionmluluk Projelerimiz
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>Gelisim guzergahindaki ulkelerde ucretsiz temel kimlik services</span>
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>Okullarda dijital okuryazarlik ve siber security egitim programlari</span>
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>Kadin girisimciler icin ozel KYC destek paketleri</span>
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>Openil durum ve dogal afetlerde fast kimlik kurtarma sistemleri</span>
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>STK ve hayir institutionlarina %50 indirimli institutionsal paketler</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-5 border border-slate-600">
            <h4 className="font-semibold text-white mb-3">Toplumsal ki Reportlari</h4>
            <p className="text-slate-300 text-sm mb-3">
              Her yil toplumsal etki raporlarimizi yayinliyoruz. Seffaflik ilkemiz geregi, ne kadar insana
              ulastigimizi, hangi alanlarda fayda sagladigimizi ve gelecek hedeflerimizi acik acik paylasiyoruz.
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">15M+</div>
                <p className="text-xs text-slate-400">Korunan Identity</p>
              </div>
              <div className="bg-slate-800/50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
                <p className="text-xs text-slate-400">Fakecilik Onleme</p>
              </div>
              <div className="bg-slate-800/50 rounded p-3 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">120+</div>
                <p className="text-xs text-slate-400">Country ve Region</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
