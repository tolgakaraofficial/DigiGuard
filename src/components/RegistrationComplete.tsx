import React, { useState } from 'react';
import { CheckCircle, Shield, Download, Eye } from 'lucide-react';
import { PersonalInfo, IdentityInfo, MediaFiles } from '../types';

interface RegistrationCompleteProps {
  personalInfo: PersonalInfo;
  identityInfo: IdentityInfo;
  mediaFiles: MediaFiles;
  onComplete: () => void;
}

export const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({
  personalInfo,
  identityInfo,
  mediaFiles,
  onComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleComplete = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onComplete();
    setIsProcessing(false);
  };

  const totalFiles = mediaFiles.photos.length + mediaFiles.videos.length + mediaFiles.audioRecordings.length;

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-600 p-4 rounded-full">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Kayıt Tamamlandı!</h2>
        <p className="text-slate-300 text-lg">
          Dijital kimlik profiliniz başarıyla oluşturuldu
        </p>
      </div>

      <div className="bg-slate-700 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-400" />
          <span>Kayıt Özeti</span>
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-600">
            <span className="text-slate-300">Ad Soyad:</span>
            <span className="text-white font-medium">
              {personalInfo.firstName} {personalInfo.lastName}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-600">
            <span className="text-slate-300">Kimlik Türü:</span>
            <span className="text-white font-medium">
              {identityInfo.idType === 'tc' ? 'T.C. Kimlik Kartı' : 
               identityInfo.idType === 'passport' ? 'Pasaport' : 'Diğer'}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-600">
            <span className="text-slate-300">Kimlik Numarası:</span>
            <span className="text-white font-medium">
              {identityInfo.idNumber.replace(/./g, '*').slice(0, -4) + identityInfo.idNumber.slice(-4)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-slate-300">Yüklenen Dosyalar:</span>
            <span className="text-white font-medium">{totalFiles} dosya</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-xl p-6 mb-8 border border-blue-500/30">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-400 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Güvenlik Bilgisi</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              Tüm verileriniz end-to-end şifreleme ile korunmaktadır. Kişisel bilgileriniz ve medya dosyalarınız 
              sadece kimlik doğrulama süreçlerinde kullanılacak ve üçüncü taraflarla paylaşılmayacaktır.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => {/* Generate certificate */}}
          className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="h-5 w-5" />
          <span>Sertifika İndir</span>
        </button>

        <button
          onClick={() => {/* View profile */}}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="h-5 w-5" />
          <span>Profili Görüntüle</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleComplete}
          disabled={isProcessing}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>İşleniyor...</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-6 w-6" />
              <span>Uygulamaya Başla</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};