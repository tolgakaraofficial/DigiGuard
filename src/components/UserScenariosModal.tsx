import React from 'react';
import { X, Users, Building2, Globe as Globe2, CheckCircle } from 'lucide-react';

interface UserScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserScenariosModal: React.FC<UserScenariosModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Kullanici Senaryolari</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-400" />
              Bireysel Kullanici Senaryolari
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Online Bankacılık ve Finans
                </h4>
                <p className="text-slate-300 text-sm">
                  Ali Bey, yeni bir dijital bankacilik hesabi acmak istiyor. DigiGuard ile biyometrik kimligini dogrulatarak
                  saniyeler icinde hesap acabiliyor. Parmak izi ve yuz tanima ile her girisinde guvende kalıyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  E-Devlet Islemleri
                </h4>
                <p className="text-slate-300 text-sm">
                  Ayse Hanim, nufus cuzdani almak icin randevu alirken DigiGuard KYC sertifikasini kullanarak
                  kimlik dogrulamasini online tamamliyor. Kuruma gitmeden islemlerini hizla sonlandiriyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Kripto Para Borsalari
                </h4>
                <p className="text-slate-300 text-sm">
                  Mehmet Bey, kripto para borsasinda islem yapmak icin KYC surecini DigiGuard ile tamamliyor.
                  Blockchain tabanlı kimlik dogrulamasi ile hem hizli hem de guvenlı bir sekilde hesabini aktif ediyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Saglik Sistemleri
                </h4>
                <p className="text-slate-300 text-sm">
                  Zeynep Hanim, ozel hastanede tedavi olmak icin kimlik dogrulamasini DigiGuard ile yapiyor.
                  Tibbi kayitlari guvende, sadece yetkili doktorlar erisebiliyor.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-purple-400" />
              Kurumsal Kullanim Senaryolari
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Caliskan Kimlik Yonetimi
                </h4>
                <p className="text-slate-300 text-sm">
                  ABC Sirket, 500 calisaninin kimlik dogrulamasini DigiGuard ile merkezi olarak yonetiyor.
                  Biyometrik giris sistemleri ile fiziksel kartlara gerek kalmiyor, guvenlik maksimum seviyede.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Musteri KYC Surecleri
                </h4>
                <p className="text-slate-300 text-sm">
                  XYZ Bank, yeni musteri kayit surecinde DigiGuard API'sini entegre ederek KYC islemlerini
                  otomatize ediyor. Manuel inceleme suresi %90 azaliyor, musteri memnuniyeti artiyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Egitim Kurumları
                </h4>
                <p className="text-slate-300 text-sm">
                  Universiteler, online sinavlarda ogrenci kimlik dogrulamasini DigiGuard ile yapiyor.
                  Yuz tanima teknolojisi ile kopya ve sahteciligin onune geciliyor.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
              <Globe2 className="h-5 w-5 mr-2 text-green-400" />
              Kamu Kurumlari
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Secim ve Oy Sistemleri
                </h4>
                <p className="text-slate-300 text-sm">
                  Vatandaslar, online oylama sistemlerinde DigiGuard ile kimliklerini dogrulatarak
                  blockchain tabanli guvenlı oy kullanabiliyor. Her oy kayit altinda ve degistirilemez.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Sosyal Yardim Dagitimlari
                </h4>
                <p className="text-slate-300 text-sm">
                  Belediyeler, sosyal yardim dagitiminda DigiGuard kullanarak cift kayit ve sahtecilik
                  sorununu ortadan kaldiriyor. Her yararlanici biyometrik olarak dogrulanıyor.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Multechi ve Gocmen Kayitlari
                </h4>
                <p className="text-slate-300 text-sm">
                  Goc idaresi, multechi ve gocmen kayitlarini DigiGuard ile guvence altina aliyor.
                  Parmak izi ve iris taramasi ile ayni kisinin birden fazla kayit olusturmasi engelleniyor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
