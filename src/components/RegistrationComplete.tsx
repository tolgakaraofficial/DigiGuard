import React, { useState } from 'react';
import { CheckCircle, Shield, Download, Eye, Star, Award, Lock, FileCheck } from 'lucide-react';
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
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const handleComplete = async () => {
    setIsProcessing(true);
    
    // İşleme süresi simülasyonu
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onComplete();
    setIsProcessing(false);
  };

  const handleDownloadCertificate = async () => {
    // Sertifika oluşturma simülasyonu
    setCertificateGenerated(true);
    
    // Gerçek uygulamada burada PDF oluşturulacak
    const certificateData = {
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      idNumber: identityInfo.idNumber,
      date: new Date().toLocaleDateString('tr-TR'),
      certificateId: `DG-${Date.now()}`
    };
    
    console.log('Sertifika oluşturuluyor:', certificateData);
    alert('Dijital kimlik sertifikanız başarıyla oluşturuldu ve indirildi!');
  };
  const totalFiles = mediaFiles.photos.length + mediaFiles.videos.length + mediaFiles.audioRecordings.length;

  return (
    <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-4 rounded-full animate-pulse">
            <Award className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Tebrikler! Kayıt Tamamlandı!
        </h2>
        <p className="text-slate-300 text-lg mb-4">
          Dijital kimlik profiliniz başarıyla oluşturuldu
        </p>
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>

      {/* Başarı İstatistikleri */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-lg p-4 text-center">
          <FileCheck className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-emerald-300 font-semibold">Doğrulandı</p>
          <p className="text-emerald-200 text-sm">Kimlik Bilgileri</p>
        </div>
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <p className="text-blue-300 font-semibold">Güvenli</p>
          <p className="text-blue-200 text-sm">Şifreleme Aktif</p>
        </div>
        <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 text-center">
          <Lock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <p className="text-purple-300 font-semibold">Korumalı</p>
          <p className="text-purple-200 text-sm">Medya Dosyaları</p>
        </div>
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

          <div className="flex justify-between items-center py-2 border-b border-slate-600">
            <span className="text-slate-300">Şehir:</span>
            <span className="text-white font-medium">{personalInfo.city}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-300">Yüklenen Dosyalar:</span>
            <div className="text-right">
              <span className="text-white font-medium">{totalFiles} dosya</span>
              <div className="text-xs text-slate-400">
                {mediaFiles.photos.length} fotoğraf, {mediaFiles.videos.length} video, {mediaFiles.audioRecordings.length} ses
              </div>
            </div>
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
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                KVKK Uyumlu
              </span>
              <span className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                GDPR Uyumlu
              </span>
              <span className="flex items-center">
                <FileCheck className="h-3 w-3 mr-1" />
                ISO 27001
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleDownloadCertificate}
          className={`flex-1 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
            certificateGenerated 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-slate-600 hover:bg-slate-700 text-white'
          }`}
        >
          <Download className="h-5 w-5" />
          <span>{certificateGenerated ? 'Sertifika İndirildi' : 'Sertifika İndir'}</span>
        </button>

        <button
          onClick={() => alert('Profil görüntüleme özelliği yakında eklenecek!')}
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
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:from-emerald-800 disabled:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto transform hover:scale-105"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sistem Hazırlanıyor...</span>
            </>
          ) : (
            <>
              <Award className="h-6 w-6" />
              <span>DigiGuard'a Hoş Geldiniz!</span>
            </>
          )}
        </button>
        
        {!isProcessing && (
          <p className="text-slate-400 text-sm mt-4">
            Artık dijital kimliğiniz güvende! Kontrol panelinize yönlendiriliyorsunuz...
          </p>
        )}
      </div>
    </div>
  );
};