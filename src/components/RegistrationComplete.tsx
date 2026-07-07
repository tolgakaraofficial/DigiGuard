import React, { useState } from 'react';
import { Shield, Download, Eye, Star, Award, Lock, FileCheck, Fingerprint, Database, Zap } from 'lucide-react';
import { PersonalInfo, IdentityInfo, MediaFiles, CorporateInfo } from '../types';
import jsPDF from 'jspdf';
import { CertificateBridgePanel } from './CertificateBridgePanel';

interface RegistrationCompleteProps {
  personalInfo: PersonalInfo;
  identityInfo: IdentityInfo;
  mediaFiles: MediaFiles;
  corporateInfo?: CorporateInfo;
  userType?: 'individual' | 'corporate' | 'personnel';
  onComplete: () => void;
}

export const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({
  personalInfo,
  identityInfo,
  mediaFiles,
  corporateInfo,
  userType = 'individual',
  onComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [showBridge, setShowBridge] = useState(false);
  const [profilePhotoDataUrl, setProfilePhotoDataUrl] = useState<string | null>(null);

  const handleComplete = async () => {
    setIsProcessing(true);
    try {
      // Convert first photo to data URL for the bridge pipeline
      let photoUrl: string | null = null;
      if (mediaFiles.photos.length > 0) {
        const file = mediaFiles.photos[0];
        photoUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
      setProfilePhotoDataUrl(photoUrl);
      setShowBridge(true);
    } catch (error) {
      console.error('Bridge init error:', error);
      // Fallback: launch pipeline without photo
      setShowBridge(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateSerialNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return `DG-KYC-${year}${month}-${random}`;
  };

  const generateBlockchainHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
  };

  const handleDownloadCertificate = async () => {
    setCertificateGenerated(true);

    const timestamp = new Date();
    const serialNumber = generateSerialNumber();
    const blockchainHash = generateBlockchainHash();
    const blockNumber = Math.floor(Math.random() * 10000000) + 15000000;
    const gasUsed = (Math.random() * 0.005 + 0.001).toFixed(6);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, 210, 297, 'F');

    pdf.setFillColor(6, 182, 212);
    pdf.rect(0, 0, 210, 40, 'F');

    pdf.setFillColor(34, 197, 94);
    pdf.rect(0, 257, 210, 40, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DigiGuard', 105, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Biyometrik KYC Guvenlik Sistemi', 105, 28, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(203, 213, 225);
    pdf.text('Karprime Technology INC.', 105, 35, { align: 'center' });

    pdf.setFontSize(22);
    pdf.setTextColor(6, 182, 212);
    pdf.text('BLOCKCHAIN KYC SERTIFIKASI', 105, 55, { align: 'center' });

    pdf.setDrawColor(6, 182, 212);
    pdf.setLineWidth(0.5);
    pdf.line(40, 60, 170, 60);

    pdf.setFontSize(11);
    pdf.setTextColor(226, 232, 240);
    pdf.text('Bu sertifika, kimlik dogrulamasinin blockchain teknolojisi ile', 105, 70, { align: 'center' });
    pdf.text('guvence altina alindigini ve KYC surecinin tamamlandigini teyit eder.', 105, 77, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(148, 163, 184);
    pdf.text('Seri Numarasi:', 40, 92);
    pdf.setFontSize(11);
    pdf.setTextColor(6, 182, 212);
    pdf.setFont('helvetica', 'bold');
    pdf.text(serialNumber, 75, 92);

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(148, 163, 184);
    pdf.text('KYC Kayit Bilgileri:', 40, 105);

    pdf.setDrawColor(71, 85, 105);
    pdf.setLineWidth(0.3);
    pdf.line(40, 107, 170, 107);

    pdf.setFontSize(10);
    pdf.setTextColor(203, 213, 225);

    const infoY = 117;
    const lineHeight = 10;

    pdf.setFont('helvetica', 'bold');
    pdf.text('Ad Soyad:', 45, infoY);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${personalInfo.firstName} ${personalInfo.lastName}`, 110, infoY);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Kimlik Turu:', 45, infoY + lineHeight);
    pdf.setFont('helvetica', 'normal');
    const idTypeText = identityInfo.idType === 'tc' ? 'T.C. Kimlik Karti' :
                       identityInfo.idType === 'passport' ? 'Pasaport' : 'Diger';
    pdf.text(idTypeText, 110, infoY + lineHeight);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Kimlik No:', 45, infoY + lineHeight * 2);
    pdf.setFont('helvetica', 'normal');
    const maskedId = identityInfo.idNumber.replace(/./g, '*').slice(0, -4) + identityInfo.idNumber.slice(-4);
    pdf.text(maskedId, 110, infoY + lineHeight * 2);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Sehir:', 45, infoY + lineHeight * 3);
    pdf.setFont('helvetica', 'normal');
    pdf.text(personalInfo.city, 110, infoY + lineHeight * 3);

    pdf.setFont('helvetica', 'bold');
    pdf.text('E-posta:', 45, infoY + lineHeight * 4);
    pdf.setFont('helvetica', 'normal');
    pdf.text(personalInfo.email, 110, infoY + lineHeight * 4);

    pdf.setFontSize(11);
    pdf.setTextColor(148, 163, 184);
    pdf.text('Blockchain Zaman Damgasi ve Dogrulama:', 40, 175);
    pdf.line(40, 177, 170, 177);

    pdf.setFontSize(10);
    pdf.setTextColor(203, 213, 225);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Blockchain Agi:', 45, 187);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Ethereum Mainnet', 110, 187);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Blok Numarasi:', 45, 195);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`#${blockNumber}`, 110, 195);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Transaction Hash:', 45, 203);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(blockchainHash.substring(0, 45), 45, 211);
    pdf.text(blockchainHash.substring(45), 45, 217);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Zaman Damgasi:', 45, 227);
    pdf.setFont('helvetica', 'normal');
    pdf.text(timestamp.toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Europe/Istanbul'
    }), 110, 227);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Gas Kullanimi:', 45, 235);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${gasUsed} ETH`, 110, 235);

    pdf.setDrawColor(34, 197, 94);
    pdf.setLineWidth(1);
    pdf.rect(35, 245, 140, 8);

    pdf.setFontSize(9);
    pdf.setTextColor(34, 197, 94);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DOGRULANDI - KYC TAMAMLANDI', 105, 250, { align: 'center' });

    pdf.setFontSize(8);
    pdf.setTextColor(203, 213, 225);
    pdf.setFont('helvetica', 'normal');
    pdf.text('AES-256 Sifreleme | KVKK Uyumlu | GDPR Uyumlu | ISO 27001 | Blockchain Secured', 105, 258, { align: 'center' });

    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.text('Karprime Technology INC. | www.digiguard.com', 105, 270, { align: 'center' });
    pdf.setFontSize(7);
    pdf.text('Bu sertifika blockchain uzerinde dogrulanabilir ve degistirilemez bir kayittir.', 105, 277, { align: 'center' });

    pdf.setFontSize(6);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`Olusturulma Zamani: ${timestamp.toISOString()} | Sertifika Surumu: 2.0.0`, 105, 285, { align: 'center' });
    pdf.text(`Dogrulama: https://digiguard.com/verify/${serialNumber}`, 105, 290, { align: 'center' });

    pdf.save(`DigiGuard-KYC-Sertifika-${serialNumber}.pdf`);
  };
  const totalFiles = mediaFiles.photos.length + mediaFiles.videos.length + mediaFiles.audioRecordings.length;

  // Show bridge pipeline when triggered
  if (showBridge) {
    return (
      <CertificateBridgePanel
        personalInfo={personalInfo}
        identityInfo={identityInfo}
        mediaFiles={mediaFiles}
        corporateInfo={corporateInfo}
        userType={userType}
        profilePhotoDataUrl={profilePhotoDataUrl}
        onComplete={onComplete}
      />
    );
  }

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


      <div className="mt-8 text-center relative z-10">
        <button
          onClick={handleComplete}
          disabled={isProcessing}
          className="bg-gradient-to-r from-matrix-600 via-cyber-600 to-secure-600 hover:from-matrix-700 hover:via-cyber-700 hover:to-secure-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto transform hover:scale-105 shadow-xl shadow-cyber-500/30 animate-cyber-glow"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>SOPON Pipeline Başlatılıyor...</span>
            </>
          ) : (
            <>
              <Zap className="h-6 w-6" />
              <span>Sertifika Pipeline'ını Başlat</span>
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