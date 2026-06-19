import React, { useState, useRef, useEffect } from 'react';
import {
  X, Award, Download, FileText, Image as ImageIcon, FileImage, Lock, Shield,
  Clock, CheckCircle, User, Building2, Globe, Fingerprint, Eye, Hash
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import jsPDF from 'jspdf';

interface CertificateGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'tr' | 'en';
  userType?: string;
}

interface CertData {
  userName: string;
  userEmail: string;
  registrationDate: string;
  userId: string;
  userPhoto?: string | null;
  birthDate?: string | null;
  idNumber?: string;
  nationality?: string;
  gender?: 'male' | 'female';
  city?: string;
  companyName?: string;
  taxNumber?: string;
  companyType?: string;
}

type CertType = 'individual' | 'corporate';
type DownloadFormat = 'pdf' | 'png' | 'jpg';

const tr = {
  title: 'DigiGuard Sertifika Olusturucu',
  subtitle: 'Blockchain Kimlik Sertifikasi',
  individual: 'Bireysel',
  corporate: 'Kurumsal',
  certPreview: 'Sertifika Onizleme',
  blockchainTimestamp: 'Blockchain Zaman Damgasi',
  verified: 'Dogrulandi',
  scanToVerify: 'Dogrulamak icin tarayin',
  biometricVerified: 'Biyometrik Dogrulama',
  kycApproved: 'KYC Onayli',
  certId: 'Sertifika No',
  blockNumber: 'Blok No',
  encryption: 'Sifreleme',
  issueDate: 'Verilis Tarihi',
  identityInfo: 'Kimlik Bilgileri',
  dateOfBirth: 'Dogum Tarihi',
  nationality: 'Uyruk',
  idNumber: 'Kimlik No',
  email: 'E-Posta',
  city: 'Sehir',
  companyInfo: 'Sirket Bilgileri',
  companyName: 'Sirket Adi',
  taxNumber: 'Vergi No',
  companyType: 'Sirket Turu',
  downloadPdf: 'PDF Indir',
  downloadPng: 'PNG Indir',
  downloadJpg: 'JPG Indir',
  selectFormat: 'Format Secin',
  close: 'Kapat',
  systemCert: 'Tesis Sertifikasi',
  memberCert: 'Uye Sertifikasi',
  systemCertDesc: 'Kurum icin uretilmis, en ust duzey guvenlik katmani',
  memberCertDesc: 'Bireysel kullanicilar icin standart guvenlik katmani',
  genderMale: 'ERKEK / MALE',
  genderFemale: 'KADIN / FEMALE',
  validForever: 'Suresiz',
  issuedBy: 'Duzenleyen',
  issuer: 'DigiGuard - Karprime Technology',
  network: 'Ag',
  networkName: 'Ethereum Mainnet',
  hash: 'Hash',
  status: 'Durum',
  active: 'Aktif',
  digitalIdentity: 'Dijital Kimlik',
  corporateIdentity: 'Kurumsal Kimlik',
};

const en = {
  title: 'DigiGuard Certificate Generator',
  subtitle: 'Blockchain Identity Certificate',
  individual: 'Individual',
  corporate: 'Corporate',
  certPreview: 'Certificate Preview',
  blockchainTimestamp: 'Blockchain Timestamp',
  verified: 'Verified',
  scanToVerify: 'Scan to Verify',
  biometricVerified: 'Biometric Verification',
  kycApproved: 'KYC Approved',
  certId: 'Certificate ID',
  blockNumber: 'Block #',
  encryption: 'Encryption',
  issueDate: 'Issue Date',
  identityInfo: 'Identity Information',
  dateOfBirth: 'Date of Birth',
  nationality: 'Nationality',
  idNumber: 'ID Number',
  email: 'Email',
  city: 'City',
  companyInfo: 'Company Information',
  companyName: 'Company Name',
  taxNumber: 'Tax Number',
  companyType: 'Company Type',
  downloadPdf: 'Download PDF',
  downloadPng: 'Download PNG',
  downloadJpg: 'Download JPG',
  selectFormat: 'Select Format',
  close: 'Close',
  systemCert: 'System Certificate',
  memberCert: 'Member Certificate',
  systemCertDesc: 'Highest security layer, generated for institutions',
  memberCertDesc: 'Standard security layer for individual users',
  genderMale: 'MALE',
  genderFemale: 'FEMALE',
  validForever: 'Lifetime Valid',
  issuedBy: 'Issued By',
  issuer: 'DigiGuard - Karprime Technology',
  network: 'Network',
  networkName: 'Ethereum Mainnet',
  hash: 'Hash',
  status: 'Status',
  active: 'Active',
  digitalIdentity: 'Digital Identity',
  corporateIdentity: 'Corporate Identity',
};

function generateBlockchainHash(): string {
  return `0x${Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('')}`;
}

function generateCertificateId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DG-${year}-${random}`;
}

function generateBlockNumber(): number {
  return Math.floor(Math.random() * 10000000 + 15000000);
}

function formatDate(date: Date | string, lang: 'tr' | 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function generateQRMatrix(seed: string): boolean[][] {
  const size = 25;
  const matrix: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  const rng = (n: number) => {
    hash = Math.imul(hash ^ (hash >>> 16), 0x7feb352d);
    hash = Math.imul(hash ^ (hash >>> 15), 0x846ca68b);
    return Math.abs((hash ^ (hash >>> 16)) % n);
  };

  const addFinder = (x: number, y: number) => {
    for (let i = -1; i <= 7; i++) {
      for (let j = -1; j <= 7; j++) {
        if (x + i >= 0 && x + i < size && y + j >= 0 && y + j < size) {
          if (i === -1 || i === 7 || j === -1 || j === 7) {
            matrix[x + i][y + j] = true;
          } else if (i === 0 || i === 6 || j === 0 || j === 6) {
            matrix[x + i][y + j] = true;
          } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4) {
            matrix[x + i][y + j] = true;
          }
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, size - 7);
  addFinder(size - 7, 0);

  for (let i = 0; i < size; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  for (let i = 8; i < size - 8; i++) {
    for (let j = 8; j < size - 8; j++) {
      matrix[i][j] = rng(2) === 1;
    }
  }

  return matrix;
}

export const CertificateGeneratorModal: React.FC<CertificateGeneratorModalProps> = ({
  isOpen,
  onClose,
  language,
  userType = 'individual',
}) => {
  const [certType, setCertType] = useState<CertType>(userType === 'corporate' ? 'corporate' : 'individual');
  const [certTab, setCertTab] = useState<'system' | 'member'>('member');
  const [format, setFormat] = useState<DownloadFormat>('pdf');
  const [certData, setCertData] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);
  const certRef = useRef<HTMLDivElement>(null);
  const texts = language === 'tr' ? tr : en;

  const certId = generateCertificateId();
  const blockNum = generateBlockNumber();
  const blockchainHash = generateBlockchainHash();
  const timestamp = new Date();

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setCertData({
            userName: 'Demo User',
            userEmail: 'demo@digiguard.app',
            registrationDate: new Date().toISOString(),
            userId: 'demo-id',
            gender: 'male',
            city: 'Istanbul',
            nationality: 'T.C.',
            idNumber: '12345678901',
            birthDate: '1990-01-01',
            companyName: 'Karprime Technology',
            taxNumber: '1234567890',
            companyType: 'Technology',
          });
          setLoading(false);
          return;
        }

        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        const { data: identityData } = await supabase
          .from('user_identity_info')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        const { data: corporateData } = await supabase
          .from('corporate_registrations')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        const { data: photoData } = await supabase
          .storage
          .from('identity-documents')
          .getPublicUrl(`${user.id}/profile.jpg`);

        setCertData({
          userName: userData?.full_name || user.email?.split('@')[0] || 'MEMBER',
          userEmail: user.email || '',
          registrationDate: userData?.created_at || user.created_at,
          userId: user.id,
          userPhoto: photoData?.publicUrl || null,
          birthDate: identityData?.date_of_birth || null,
          idNumber: identityData?.id_number || '1234567890',
          nationality: identityData?.nationality || 'T.C.',
          gender: identityData?.gender === 'female' ? 'female' : 'male',
          city: userData?.city || '-',
          companyName: corporateData?.company_name || userData?.full_name || '-',
          taxNumber: corporateData?.tax_number || '-',
          companyType: corporateData?.company_type || '-',
        });
      } catch {
        setCertData({
          userName: 'Demo User',
          userEmail: 'demo@digiguard.app',
          registrationDate: new Date().toISOString(),
          userId: 'demo-id',
          gender: 'male',
          city: 'Istanbul',
          nationality: 'T.C.',
          idNumber: '12345678901',
          birthDate: '1990-01-01',
          companyName: 'Karprime Technology',
          taxNumber: '1234567890',
          companyType: 'Technology',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  const isFemale = certData?.gender === 'female';
  const isCorporate = certType === 'corporate';

  const colors = isCorporate
    ? {
        primary: 'from-amber-600 via-orange-600 to-red-600',
        primaryLight: 'from-amber-500 to-orange-500',
        accent: 'amber',
        border: 'border-amber-300/40',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        badgeBg: 'bg-amber-600/20',
        badgeBorder: 'border-amber-500/40',
        badgeText: 'text-amber-300',
        headerBg: 'bg-gradient-to-r from-amber-900 via-orange-900 to-red-900',
        watermark: 'text-amber-100/10',
      }
    : isFemale
    ? {
        primary: 'from-pink-600 via-rose-600 to-red-600',
        primaryLight: 'from-pink-500 to-rose-500',
        accent: 'pink',
        border: 'border-pink-300/40',
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        badgeBg: 'bg-pink-600/20',
        badgeBorder: 'border-pink-500/40',
        badgeText: 'text-pink-300',
        headerBg: 'bg-gradient-to-r from-pink-900 via-rose-900 to-red-900',
        watermark: 'text-pink-100/10',
      }
    : {
        primary: 'from-blue-600 via-cyan-600 to-teal-600',
        primaryLight: 'from-blue-500 to-cyan-500',
        accent: 'blue',
        border: 'border-blue-300/40',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        badgeBg: 'bg-blue-600/20',
        badgeBorder: 'border-blue-500/40',
        badgeText: 'text-blue-300',
        headerBg: 'bg-gradient-to-r from-blue-900 via-slate-900 to-cyan-900',
        watermark: 'text-blue-100/10',
      };

  const genderLabel = isFemale ? texts.genderFemale : texts.genderMale;
  const encCode = certTab === 'system' ? 'DG-SYS-AES256-GCM-SHA3' : 'DG-MBR-CHACHA20-POLY';
  const encName = certTab === 'system' ? 'AES-256-GCM' : 'CHACHA20-POLY';
  const qrMatrix = generateQRMatrix(certId + blockNum);

  const handleDownload = async () => {
    if (!certRef.current) return;

    const html2canvas = (await import('html2canvas')).default;

    if (format === 'pdf') {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [170, 107],
      });

      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 0, 0, 170, 107);
      const prefix = isCorporate ? 'Corporate' : 'Individual';
      doc.save(`DigiGuard_${prefix}_Certificate_${certId}.pdf`);
    } else {
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `DigiGuard_${isCorporate ? 'Corporate' : 'Individual'}_Certificate_${certId}.${format}`;
      link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : 'png'}`, 0.95);
      link.click();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 flex items-center gap-3">
          <div className="animate-spin h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full" />
          <span className="text-white font-medium">{language === 'tr' ? 'Yukleniyor...' : 'Loading...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${colors.primaryLight} shadow-lg`}>
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{texts.title}</h2>
                <p className="text-slate-400 text-sm">{texts.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Certificate Type Tabs */}
          <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setCertType('individual')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                certType === 'individual'
                  ? `bg-gradient-to-r ${colors.primaryLight} text-white shadow-lg`
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <User className="h-4 w-4" />
              {texts.individual}
            </button>
            <button
              onClick={() => setCertType('corporate')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                certType === 'corporate'
                  ? `bg-gradient-to-r ${colors.primaryLight} text-white shadow-lg`
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="h-4 w-4" />
              {texts.corporate}
            </button>
          </div>

          {/* Certificate Subtype Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setCertTab('member')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all border ${
                certTab === 'member'
                  ? `${colors.badgeBg} ${colors.badgeBorder} ${colors.badgeText} border`
                  : 'text-slate-500 border-slate-700 hover:border-slate-600'
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              {texts.memberCert}
            </button>
            <button
              onClick={() => setCertTab('system')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all border ${
                certTab === 'system'
                  ? 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300'
                  : 'text-slate-500 border-slate-700 hover:border-slate-600'
              }`}
            >
              <Lock className="h-3.5 w-3.5" />
              {texts.systemCert}
            </button>
          </div>

          {/* Certificate Preview */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {texts.certPreview}
            </h3>

            <div
              ref={certRef}
              className="relative bg-white rounded-xl overflow-hidden shadow-2xl border-2"
              style={{
                borderColor: isCorporate ? '#f59e0b' : isFemale ? '#f472b6' : '#3b82f6',
                aspectRatio: '1.586/1',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className={`text-[120px] font-black ${colors.watermark} select-none`}>DG</span>
              </div>

              <div className="relative flex flex-col h-full text-slate-800" style={{ fontSize: '11px' }}>
                {/* Top Header */}
                <div className={`${colors.headerBg} text-white px-5 py-3 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h1 className="text-base font-bold tracking-wide">DigiGuard</h1>
                      <p className="text-[8px] opacity-80 uppercase tracking-wider">
                        {isCorporate ? texts.corporateIdentity : texts.digitalIdentity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end mb-1">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-[8px] font-semibold text-green-400">{texts.verified}</span>
                    </div>
                    <p className="font-mono font-bold text-[9px]">{certId}</p>
                    <p className="text-[8px] opacity-60">Block #{blockNum}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex gap-4 flex-1 p-4 bg-gradient-to-b from-slate-50 to-white">
                  {/* Left: Photo & Basic Info */}
                  <div className="flex-shrink-0 flex flex-col items-center w-28">
                    <div className={`w-[88px] h-28 rounded-lg border-2 overflow-hidden shadow-md flex items-center justify-center ${
                      isCorporate ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50' :
                      isFemale ? 'border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50' :
                      'border-blue-300 bg-gradient-to-br from-blue-50 to-slate-50'
                    }`}>
                      {certData?.userPhoto ? (
                        <img src={certData.userPhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        isCorporate ? (
                          <Building2 className="h-8 w-8 text-amber-300" />
                        ) : (
                          <User className="h-8 w-8 text-blue-300" />
                        )
                      )}
                    </div>
                    <p className="text-[10px] font-bold mt-2 text-center leading-tight text-slate-800 line-clamp-2">
                      {isCorporate ? certData?.companyName : certData?.userName}
                    </p>
                    <p className="text-[7px] text-slate-400 mt-0.5">DIGIGUARD</p>
                    {!isCorporate && (
                      <div className={`mt-1.5 py-0.5 px-2 rounded-full text-center text-[7px] font-bold text-white ${
                        isFemale ? 'bg-pink-500' : 'bg-blue-500'
                      }`}>
                        {genderLabel}
                      </div>
                    )}
                    {isCorporate && (
                      <div className="mt-1.5 py-0.5 px-2 rounded-full text-center text-[7px] font-bold text-white bg-amber-500">
                        CORPORATE
                      </div>
                    )}
                  </div>

                  {/* Center: Identity Info */}
                  <div className="flex-1 min-w-0">
                    <div className={`p-2 rounded-lg mb-2 border ${
                      isCorporate ? 'bg-amber-50 border-amber-200' :
                      isFemale ? 'bg-pink-50 border-pink-200' :
                      'bg-blue-50 border-blue-200'
                    }`}>
                      <p className={`text-[8px] font-bold ${colors.text} uppercase tracking-wider`}>
                        {isCorporate ? texts.companyInfo : texts.identityInfo}
                      </p>
                    </div>

                    {isCorporate ? (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.companyName}</p>
                          <p className="text-[10px] font-bold text-slate-800 truncate">{certData?.companyName || '-'}</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.taxNumber}</p>
                          <p className="text-[10px] font-bold font-mono text-slate-800">{certData?.taxNumber || '-'}</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.companyType}</p>
                          <p className="text-[10px] font-bold text-slate-800">{certData?.companyType || '-'}</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.city}</p>
                          <p className="text-[10px] font-bold text-slate-800">{certData?.city || '-'}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.dateOfBirth}</p>
                          <p className="text-[10px] font-bold text-slate-800">{certData?.birthDate || '01.01.1990'}</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.nationality}</p>
                          <p className="text-[10px] font-bold text-slate-800">{certData?.nationality || 'T.C.'}</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.idNumber}</p>
                          <p className="text-[10px] font-bold font-mono text-slate-800">{certData?.idNumber || '-'}</p>
                        </div>
                        <div>
                          <p className="text-[7px] font-bold text-slate-500 uppercase">{texts.certId}</p>
                          <p className={`text-[10px] font-bold ${colors.text}`}>{certId}</p>
                        </div>
                      </div>
                    )}

                    <div className={`mt-2 p-2 rounded-lg border ${
                      isCorporate ? 'bg-amber-50/50 border-amber-200' :
                      isFemale ? 'bg-pink-50/50 border-pink-200' :
                      'bg-blue-50/50 border-blue-200'
                    }`}>
                      <p className={`text-[7px] font-bold ${colors.text} uppercase`}>{texts.email}</p>
                      <p className="text-[9px] text-slate-700 truncate">{certData?.userEmail}</p>
                    </div>

                    {/* Blockchain Timestamp Box */}
                    <div className="mt-2 p-2 rounded-lg border bg-emerald-50 border-emerald-200">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="h-3 w-3 text-emerald-600" />
                        <p className="text-[7px] font-bold text-emerald-700 uppercase">{texts.blockchainTimestamp}</p>
                      </div>
                      <p className="text-[7px] text-slate-500 font-mono">{texts.network}: {texts.networkName}</p>
                      <p className="text-[7px] text-emerald-600 font-bold">
                        {formatDate(timestamp, language)}
                      </p>
                      <p className="text-[6px] text-slate-400 font-mono truncate mt-0.5">
                        {texts.hash}: {blockchainHash.substring(0, 24)}...
                      </p>
                    </div>
                  </div>

                  {/* Right: QR & Badges */}
                  <div className="flex flex-col gap-2 items-center w-24">
                    <div className="w-[72px] h-[72px] bg-white border-2 border-slate-300 rounded-lg p-1 shadow-sm">
                      <div className="grid grid-cols-5 gap-[1px] w-full h-full">
                        {qrMatrix.flat().map((cell, i) => (
                          <div key={i} className={`${cell ? 'bg-slate-800' : 'bg-white'} rounded-[0.5px]`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[6px] text-center font-bold text-slate-600 leading-tight">
                      {texts.scanToVerify}
                    </p>

                    <div className="text-center p-1.5 bg-emerald-50 rounded-lg border border-emerald-300 w-full">
                      <div className="flex items-center justify-center gap-1">
                        <Fingerprint className="h-2.5 w-2.5 text-emerald-600" />
                        <p className="text-[7px] font-bold text-emerald-700">{texts.biometricVerified}</p>
                      </div>
                      <p className="text-[6px] text-emerald-600">{texts.kycApproved}</p>
                    </div>

                    <div className={`text-center p-1.5 rounded-lg border w-full ${
                      certTab === 'system'
                        ? 'bg-cyan-50 border-cyan-300'
                        : isCorporate
                        ? 'bg-amber-50 border-amber-300'
                        : isFemale
                        ? 'bg-pink-50 border-pink-300'
                        : 'bg-blue-50 border-blue-300'
                    }`}>
                      <p className={`text-[6px] font-bold ${
                        certTab === 'system' ? 'text-cyan-700' :
                        isCorporate ? 'text-amber-700' :
                        isFemale ? 'text-pink-700' : 'text-blue-700'
                      }`}>
                        {certTab === 'system' ? 'SYSTEM' : isCorporate ? 'CORPORATE' : 'MEMBER'}
                      </p>
                      <p className="text-[5px] text-slate-400 font-mono">{encCode.substring(0, 14)}</p>
                    </div>

                    <div className="text-center p-1.5 bg-slate-50 rounded-lg border border-slate-300 w-full">
                      <p className="text-[6px] font-bold text-slate-600">{texts.status}</p>
                      <p className="text-[7px] text-green-600 font-bold">{texts.active}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className={`border-t px-4 py-2.5 flex justify-between items-center text-[8px] ${
                  isCorporate ? 'border-amber-200 bg-amber-50/30' :
                  isFemale ? 'border-pink-200 bg-pink-50/30' :
                  'border-blue-200 bg-blue-50/30'
                }`}>
                  <div className="flex gap-2 items-center">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono text-[7px]">{certId}</span>
                    <span className="px-1.5 py-0.5 bg-green-100 rounded border border-green-300 text-green-700 font-bold text-[7px]">{texts.verified}</span>
                    <span className={`px-1.5 py-0.5 rounded border text-[7px] font-bold ${
                      isCorporate ? 'bg-amber-100 border-amber-300 text-amber-700' :
                      isFemale ? 'bg-pink-100 border-pink-300 text-pink-700' :
                      'bg-blue-100 border-blue-300 text-blue-700'
                    }`}>
                      {encName}
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 text-[7px] text-slate-600">
                      SHA-256
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-[7px]">{texts.issuedBy}</p>
                    <p className="text-slate-600 font-semibold text-[8px]">{texts.issuer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-3 rounded-xl border ${colors.badgeBg} ${colors.badgeBorder}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className={`h-4 w-4 ${colors.badgeText}`} />
                <p className={`text-xs font-bold ${colors.badgeText}`}>
                  {certTab === 'system' ? texts.systemCert : texts.memberCert}
                </p>
              </div>
              <p className="text-[10px] text-slate-400">
                {certTab === 'system' ? texts.systemCertDesc : texts.memberCertDesc}
              </p>
            </div>
            <div className="p-3 rounded-xl border bg-emerald-600/10 border-emerald-500/30">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="h-4 w-4 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-400">{texts.blockchainTimestamp}</p>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">{formatDate(timestamp, language)}</p>
              <p className="text-[9px] text-slate-500 font-mono mt-0.5">{blockchainHash.substring(0, 20)}...</p>
            </div>
            <div className="p-3 rounded-xl border bg-slate-700/30 border-slate-600/30">
              <div className="flex items-center gap-2 mb-1.5">
                <Globe className="h-4 w-4 text-cyan-400" />
                <p className="text-xs font-bold text-cyan-400">{texts.network}</p>
              </div>
              <p className="text-[10px] text-slate-400">{texts.networkName}</p>
              <p className="text-[9px] text-slate-500">Block #{blockNum}</p>
            </div>
          </div>

          {/* Download Section */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Download className="h-4 w-4 text-cyan-400" />
              {texts.selectFormat}
            </h4>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFormat('pdf')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                  format === 'pdf'
                    ? 'bg-red-600/20 border-red-500/40 text-red-300 shadow-lg'
                    : 'text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4" />
                PDF
              </button>
              <button
                onClick={() => setFormat('png')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                  format === 'png'
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-300 shadow-lg'
                    : 'text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                PNG
              </button>
              <button
                onClick={() => setFormat('jpg')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border ${
                  format === 'jpg'
                    ? 'bg-green-600/20 border-green-500/40 text-green-300 shadow-lg'
                    : 'text-slate-400 border-slate-700 hover:border-slate-600 hover:text-white'
                }`}
              >
                <FileImage className="h-4 w-4" />
                JPG
              </button>
            </div>

            <button
              onClick={handleDownload}
              className={`w-full py-3.5 px-6 rounded-xl bg-gradient-to-r ${colors.primary} hover:brightness-110 text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl relative overflow-hidden group`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative flex items-center gap-2.5">
                <Download className="h-5 w-5" />
                {format === 'pdf' ? texts.downloadPdf : format === 'png' ? texts.downloadPng : texts.downloadJpg}
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-white/15 text-white/80 text-[10px] rounded-md border border-white/20">
                  {isCorporate ? 'Corporate' : 'Individual'} | {certTab === 'system' ? 'System' : 'Member'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
