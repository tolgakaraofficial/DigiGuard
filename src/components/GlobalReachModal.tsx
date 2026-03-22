import React from 'react';
import { X, Globe as Globe2, TrendingUp, Users, Building2, Shield, Zap } from 'lucide-react';

interface GlobalReachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalReachModal: React.FC<GlobalReachModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2.5 rounded-lg">
              <Globe2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Kuresel Etki: 7 Kitada DigiGuard</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              Dijital Kimlik Devriminin Kuresel Vizyonu
            </h3>
            <p className="text-slate-200 leading-relaxed">
              DigiGuard, dunya genelinde milyarlarca insanin guvenlı dijital kimlik sistemlerine erişimini saglamak icin
              7 kitada yapilanma hedefliyor. Her kitada ozgun ihtiyaclara uygun cozumler sunarak global standart olmayı amacliyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-xl p-5 border border-blue-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-blue-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Avrupa</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                GDPR uyumlu kimlik yonetimi, dijital oturma izni ve sinir kontrollerinde biyometrik dogrulama.
                Schengen bolgesinde seyahatin dijitallesmesi.
              </p>
              <div className="flex items-center text-xs text-blue-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 450M+ kullanici</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-green-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-green-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Asya</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Nufus yogunlugu yuksek ulkelerde hizli kimlik dogrulamasi, mobil bankacilik entegrasyonu
                ve e-ticaret guvenligi. Hindistan ve Cin gibi dev pazarlarda buyuk potansiyel.
              </p>
              <div className="flex items-center text-xs text-green-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 2.5B+ kullanici</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-yellow-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Afrika</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Kimlik sistemlerine erisimi sinirli bolgeler icin temel dijital kimlik altyapisi.
                Mobil-first cozumler, finansal kapsayicilik ve saglik hizmetlerine erisim.
              </p>
              <div className="flex items-center text-xs text-yellow-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 800M+ kullanici</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-red-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-red-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Kuzey Amerika</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Kurumsal KYC cozumleri, siber guvenlik servisleri ve kimlik hirsizligina karsi koruma.
                Fintech ve kripto borsalari icin regülasyon uyumlu sistemler.
              </p>
              <div className="flex items-center text-xs text-red-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 350M+ kullanici</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-purple-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-purple-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Guney Amerika</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Devlet sistemleri ile entegrasyon, saglik ve egitim hizmetlerinde kimlik dogrulama.
                Sosyal yardim programlarinin seffaf yonetimi.
              </p>
              <div className="flex items-center text-xs text-purple-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 420M+ kullanici</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-cyan-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-cyan-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Okyanusya</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Yerleski halklarin kimlik haklarinin korunmasi, adalı ulkelerde dijital kimlik altyapisi
                ve turizm sektorunde hizli kimlik dogrulamasi.
              </p>
              <div className="flex items-center text-xs text-cyan-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 45M+ kullanici</span>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-orange-500/20">
              <div className="flex items-center mb-3">
                <div className="bg-orange-600 p-2 rounded-lg mr-3">
                  <Globe2 className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-bold text-white">Antartika</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                Bilimsel arastirma ekipleri ve mevsimlik personel icin guvenlı kimlik sistemi.
                Ekstrem kosullarda calisan blockchain tabanli offline dogrulama.
              </p>
              <div className="flex items-center text-xs text-orange-400">
                <Users className="h-3 w-3 mr-1" />
                <span>Hedef: 5K+ kullanici</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              Kuresel Etki Metrikleri
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">4.5B+</div>
                <p className="text-slate-300 text-sm">Toplam Hedef Kullanici</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">195+</div>
                <p className="text-slate-300 text-sm">Ulke ve Bolge</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                <p className="text-slate-300 text-sm">Dil Destegi</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-500/30 rounded-xl p-5">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-orange-400" />
              Surdurulebilir Kalkinma Hedefleri (SDG) ile Uyum
            </h4>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-start">
                <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                <span>SDG 16: Adalet, guclu kurumlar ve seffaflik icin dijital kimlik altyapisi</span>
              </p>
              <p className="flex items-start">
                <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                <span>SDG 10: Esitsizlikleri azaltmak icin herkese erisilebilir kimlik sistemleri</span>
              </p>
              <p className="flex items-start">
                <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                <span>SDG 8: Ekonomik buyume icin guvenlı dijital finansal hizmetler</span>
              </p>
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
