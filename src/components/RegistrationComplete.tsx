import React, { useState } from 'react';
import { CheckCircle, Shield, Download, Eye, Star, Award, Lock, FileCheck, Fingerprint, Database } from 'lucide-react';
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
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-cyber-500/30 relative overflow-hidden">
      {/* Cyber background effects */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-matrix-500/10 rounded-full blur-3xl"></div>

      <div className="text-center mb-8 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="bg-gradient-to-r from-matrix-600 to-cyber-600 p-4 rounded-full animate-pulse">
              <Award className="h-12 w-12 text-white" />
            </div>
            <div className="absolute inset-0 bg-cyber-400/30 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-matrix-400 via-cyber-400 to-secure-400 bg-clip-text text-transparent mb-2">
          Biyometrik KYC Kaydı Tamamlandı!
        </h2>
        <p className="text-slate-300 text-lg mb-4 flex items-center justify-center gap-2">
          <Fingerprint className="h-5 w-5 text-cyber-400" />
          Blockchain tabanlı kimlik profiliniz oluşturuldu
        </p>
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>

      {/* Başarı İstatistikleri */}
      <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
        <div className="bg-matrix-600/20 border border-matrix-500/30 rounded-lg p-4 text-center hover:bg-matrix-600/30 transition-all">
          <Fingerprint className="h-8 w-8 text-matrix-400 mx-auto mb-2 animate-fingerprint-pulse" />
          <p className="text-matrix-300 font-semibold">Biyometrik</p>
          <p className="text-matrix-200 text-sm">AI Doğrulandı</p>
        </div>
        <div className="bg-cyber-600/20 border border-cyber-500/30 rounded-lg p-4 text-center hover:bg-cyber-600/30 transition-all">
          <Shield className="h-8 w-8 text-cyber-400 mx-auto mb-2" />
          <p className="text-cyber-300 font-semibold">AES-256</p>
          <p className="text-cyber-200 text-sm">Şifreleme Aktif</p>
        </div>
        <div className="bg-secure-600/20 border border-secure-500/30 rounded-lg p-4 text-center hover:bg-secure-600/30 transition-all">
          <Database className="h-8 w-8 text-secure-400 mx-auto mb-2" />
          <p className="text-secure-300 font-semibold">Blockchain</p>
          <p className="text-secure-200 text-sm">Kayıt Güvenli</p>
        </div>
      </div>
      <div className="bg-slate-700/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cyber-500/20 relative z-10">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <FileCheck className="h-5 w-5 text-cyber-400" />
          <span>KYC Kayıt Özeti</span>
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

      <div className="bg-gradient-to-r from-cyber-600/20 to-matrix-600/20 rounded-xl p-6 mb-8 border border-cyber-500/30 relative z-10">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-cyber-400 mt-1 animate-cyber-glow" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Database className="h-5 w-5 text-matrix-400" />
              Blockchain Güvenlik Sertifikası
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Biyometrik verileriniz AES-256 şifreleme ile korunmakta ve blockchain üzerinde değiştirilemez kayıtlar olarak saklanmaktadır.
              Kişisel bilgileriniz sadece KYC doğrulama süreçlerinde kullanılacak ve üçüncü taraflarla asla paylaşılmayacaktır.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="flex items-center px-2 py-1 rounded-full bg-cyber-900/50 text-cyber-300 border border-cyber-500/30">
                <Lock className="h-3 w-3 mr-1" />
                KVKK Uyumlu
              </span>
              <span className="flex items-center px-2 py-1 rounded-full bg-matrix-900/50 text-matrix-300 border border-matrix-500/30">
                <Shield className="h-3 w-3 mr-1" />
                GDPR Uyumlu
              </span>
              <span className="flex items-center px-2 py-1 rounded-full bg-secure-900/50 text-secure-300 border border-secure-500/30">
                <FileCheck className="h-3 w-3 mr-1" />
                ISO 27001
              </span>
              <span className="flex items-center px-2 py-1 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
                <Database className="h-3 w-3 mr-1" />
                Blockchain Secured
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 relative z-10">
        <button
          onClick={handleDownloadCertificate}
          className={`flex-1 font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg ${
            certificateGenerated
              ? 'bg-gradient-to-r from-matrix-600 to-matrix-700 hover:from-matrix-700 hover:to-matrix-800 text-white shadow-matrix-500/30'
              : 'bg-slate-600 hover:bg-slate-700 text-white'
          }`}
        >
          <Download className="h-5 w-5" />
          <span>{certificateGenerated ? 'Blockchain Sertifikası İndirildi' : 'Blockchain Sertifikası İndir'}</span>
        </button>

        <button
          onClick={() => alert('KYC profil görüntüleme özelliği yakında eklenecek!')}
          className="flex-1 bg-gradient-to-r from-cyber-600 to-cyber-700 hover:from-cyber-700 hover:to-cyber-800 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyber-500/30"
        >
          <Eye className="h-5 w-5" />
          <span>KYC Profili Görüntüle</span>
        </button>
      </div>

      <div className="mt-8 text-center relative z-10">
        <button
          onClick={handleComplete}
          disabled={isProcessing}
          className="bg-gradient-to-r from-matrix-600 via-cyber-600 to-secure-600 hover:from-matrix-700 hover:via-cyber-700 hover:to-secure-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto transform hover:scale-105 shadow-xl shadow-cyber-500/30 animate-cyber-glow"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Biyometrik Sistem Hazırlanıyor...</span>
            </>
          ) : (
            <>
              <Fingerprint className="h-6 w-6" />
              <span>DigiGuard KYC'ye Hoş Geldiniz!</span>
            </>
          )}
        </button>

        {!isProcessing && (
          <p className="text-slate-400 text-sm mt-4">
            Biyometrik kimliğiniz blockchain üzerinde güvende! Kontrol panelinize yönlendiriliyorsunuz...
          </p>
        )}
      </div>
    </div>
  );
};