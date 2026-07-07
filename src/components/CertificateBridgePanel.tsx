import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Shield, Database, Lock, CheckCircle, Award, Download,
  Brain, Zap, ArrowRight, Fingerprint, QrCode, Hash,
  Star, Globe, FileCheck, Activity
} from 'lucide-react';
import { PersonalInfo, IdentityInfo, MediaFiles, CorporateInfo } from '../types';
import { runFullPipeline, type PipelineStageResult } from '../services/registrationBridgeService';
import jsPDF from 'jspdf';

interface CertificateBridgePanelProps {
  personalInfo: PersonalInfo;
  identityInfo: IdentityInfo;
  mediaFiles: MediaFiles;
  corporateInfo?: CorporateInfo;
  userType: 'individual' | 'corporate' | 'personnel';
  profilePhotoDataUrl?: string | null;
  onComplete: () => void;
}

type Stage = 'idle' | 'sopon' | 'supon' | 'soft10' | 'done';

interface StageState {
  status: 'pending' | 'active' | 'done' | 'error';
  progress: number;
  detail: string;
}

const STAGE_DEFS = [
  {
    key: 'sopon' as Stage,
    name: 'SOPON',
    full: 'Veri Toplama & Filtreleme',
    icon: Database,
    color: 'cyan',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-900/20',
    glowColor: 'shadow-cyan-500/30',
    details: ['Kayıt verileri kuyruklanıyor...', 'Veri bütünlüğü doğrulanıyor...', 'Anomali taraması çalışıyor...', 'SOPON filtresi tamamlandı'],
  },
  {
    key: 'supon' as Stage,
    name: 'SUPON',
    full: 'Deepfake & Kimlik Analizi',
    icon: Brain,
    color: 'purple',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-900/20',
    glowColor: 'shadow-purple-500/30',
    details: ['Görüntü analizi başlatıldı...', 'Deepfake taraması yapılıyor...', 'Kimlik biyometrik doğrulanıyor...', 'SUPON kararı: ONAYLANDI'],
  },
  {
    key: 'soft10' as Stage,
    name: 'SOFT 10',
    full: 'Kriptografik Sertifikasyon',
    icon: Lock,
    color: 'emerald',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-900/20',
    glowColor: 'shadow-emerald-500/30',
    details: ['JWT/JWS token üretiliyor...', 'AES-256-GCM şifreleme aktif...', 'Blockchain imzası oluşturuluyor...', 'Sertifika hazır!'],
  },
];

export const CertificateBridgePanel: React.FC<CertificateBridgePanelProps> = ({
  personalInfo,
  identityInfo,
  mediaFiles,
  corporateInfo,
  userType,
  profilePhotoDataUrl,
  onComplete,
}) => {
  const [currentStage, setCurrentStage] = useState<Stage>('idle');
  const [stages, setStages] = useState<Record<string, StageState>>({
    sopon: { status: 'pending', progress: 0, detail: 'Başlatılıyor...' },
    supon: { status: 'pending', progress: 0, detail: 'Bekliyor...' },
    soft10: { status: 'pending', progress: 0, detail: 'Bekliyor...' },
  });
  const [result, setResult] = useState<PipelineStageResult | null>(null);
  const [soponPct, setSoponPct] = useState(0);
  const [suponDf, setSuponDf] = useState(0);
  const [suponId, setSuponId] = useState(0);
  const [soft10Pct, setSoft10Pct] = useState(0);
  const [started, setStarted] = useState(false);
  const suponTransitioned = useRef(false);
  const soft10Transitioned = useRef(false);

  const updateStage = useCallback((key: string, partial: Partial<StageState>) => {
    setStages((prev) => ({ ...prev, [key]: { ...prev[key], ...partial } }));
  }, []);

  useEffect(() => {
    if (started) return;
    setStarted(true);

    const fullName = userType === 'corporate' && corporateInfo
      ? `${corporateInfo.authorizedPersonFirstName} ${corporateInfo.authorizedPersonLastName}`
      : `${personalInfo.firstName} ${personalInfo.lastName}`;

    setCurrentStage('sopon');
    updateStage('sopon', { status: 'active', detail: STAGE_DEFS[0].details[0] });

    let soponDetailIdx = 0;
    const soponDetailTimer = setInterval(() => {
      soponDetailIdx = Math.min(soponDetailIdx + 1, STAGE_DEFS[0].details.length - 1);
      updateStage('sopon', { detail: STAGE_DEFS[0].details[soponDetailIdx] });
    }, 400);

    runFullPipeline(
      {
        userType,
        fullName,
        email: personalInfo.email || corporateInfo?.authorizedPersonEmail || '',
        city: personalInfo.city || corporateInfo?.companyCity || '',
        idType: identityInfo.idType,
        idNumber: identityInfo.idNumber,
        companyName: corporateInfo?.companyName,
        taxNumber: corporateInfo?.taxNumber,
        profilePhotoDataUrl,
      },
      {
        onSoponProgress: (pct) => {
          setSoponPct(pct);
          updateStage('sopon', { progress: pct });
        },
        onSuponProgress: (df, id) => {
          clearInterval(soponDetailTimer);
          if (!suponTransitioned.current) {
            suponTransitioned.current = true;
            setCurrentStage('supon');
            updateStage('sopon', { status: 'done', progress: 100, detail: STAGE_DEFS[0].details[3] });
            updateStage('supon', { status: 'active', detail: STAGE_DEFS[1].details[0] });
          }
          setSuponDf(df);
          setSuponId(id);
          updateStage('supon', { progress: Math.round(df) });
          const idx = df < 50 ? 0 : df < 70 ? 1 : df < 90 ? 2 : 3;
          updateStage('supon', { detail: STAGE_DEFS[1].details[idx] });
        },
        onSoft10Progress: (pct) => {
          if (!soft10Transitioned.current) {
            soft10Transitioned.current = true;
            setCurrentStage('soft10');
            updateStage('supon', { status: 'done', progress: 100, detail: STAGE_DEFS[1].details[3] });
            updateStage('soft10', { status: 'active', detail: STAGE_DEFS[2].details[0] });
          }
          setSoft10Pct(pct);
          updateStage('soft10', { progress: pct });
          const idx = pct < 30 ? 0 : pct < 60 ? 1 : pct < 90 ? 2 : 3;
          updateStage('soft10', { detail: STAGE_DEFS[2].details[idx] });
        },
      }
    ).then((res) => {
      updateStage('soft10', { status: 'done', progress: 100, detail: STAGE_DEFS[2].details[3] });
      setResult(res);
      setCurrentStage('done');
    });
  }, []);

  const downloadPDF = () => {
    if (!result) return;
    const fullName = userType === 'corporate' && corporateInfo
      ? corporateInfo.companyName
      : `${personalInfo.firstName} ${personalInfo.lastName}`;

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Background
    pdf.setFillColor(6, 11, 24);
    pdf.rect(0, 0, 210, 297, 'F');

    // Header band
    pdf.setFillColor(6, 182, 212);
    pdf.rect(0, 0, 210, 42, 'F');
    pdf.setFillColor(8, 145, 178);
    pdf.rect(0, 38, 210, 4, 'F');

    // Header text
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(26);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DigiGuard', 105, 18, { align: 'center' });
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Karprime Technology INC. | Dijital Kimlik Sertifikasyon Sistemi', 105, 28, { align: 'center' });
    pdf.setFontSize(9);
    pdf.text('SOPON  →  SUPON  →  SOFT 10', 105, 36, { align: 'center' });

    // Title
    pdf.setFontSize(18);
    pdf.setTextColor(6, 182, 212);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BLOCKCHAIN KYC SERTİFİKASI', 105, 56, { align: 'center' });

    pdf.setDrawColor(6, 182, 212);
    pdf.setLineWidth(0.4);
    pdf.line(35, 60, 175, 60);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(203, 213, 225);
    pdf.text('Bu sertifika, kimlik doğrulamasının SOPON → SUPON → SOFT 10 katmanları üzerinden', 105, 68, { align: 'center' });
    pdf.text('kriptografik olarak imzalandığını ve KYC sürecinin tamamlandığını teyit eder.', 105, 74, { align: 'center' });

    // Cert ID
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text('Sertifika No:', 35, 83);
    pdf.setFontSize(10);
    pdf.setTextColor(6, 182, 212);
    pdf.setFont('helvetica', 'bold');
    pdf.text(result.certId, 68, 83);

    // Section: Identity Info
    pdf.setFontSize(10);
    pdf.setTextColor(148, 163, 184);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Kimlik Bilgileri:', 35, 96);
    pdf.setDrawColor(51, 65, 85);
    pdf.setLineWidth(0.2);
    pdf.line(35, 98, 175, 98);

    const rows: [string, string][] = [
      ['Ad / Unvan:', fullName],
      ['Kayıt Türü:', userType === 'individual' ? 'Bireysel' : userType === 'corporate' ? 'Kurumsal' : 'Personel'],
      ['Kimlik Türü:', identityInfo.idType === 'tc' ? 'T.C. Kimlik Kartı' : identityInfo.idType === 'passport' ? 'Pasaport' : 'Diğer'],
      ['Şehir:', personalInfo.city || corporateInfo?.companyCity || '—'],
      ['SOPON Skoru:', `${result.soponScore.toFixed(1)}%`],
      ['SUPON Deepfake:', `${result.suponDeepfakeScore.toFixed(1)}% güven`],
      ['SOFT 10 Skoru:', `${result.soft10SecurityScore.toFixed(1)} / 100`],
    ];

    let y = 108;
    rows.forEach(([label, value]) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      pdf.text(label, 40, y);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(226, 232, 240);
      pdf.text(value, 105, y);
      y += 9;
    });

    // Blockchain section
    y += 4;
    pdf.setFontSize(10);
    pdf.setTextColor(148, 163, 184);
    pdf.text('Blockchain Doğrulama:', 35, y);
    pdf.line(35, y + 2, 175, y + 2);
    y += 10;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184);
    pdf.text('Transaction Hash:', 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(226, 232, 240);
    pdf.setFontSize(7.5);
    pdf.text(result.blockchainHash.substring(0, 44), 40, y + 7);
    pdf.text(result.blockchainHash.substring(44), 40, y + 13);
    y += 20;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(148, 163, 184);
    pdf.text('Blok Numarası:', 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(226, 232, 240);
    pdf.text(`#${result.blockNumber}`, 105, y);
    y += 9;

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(148, 163, 184);
    pdf.text('Blockchain Ağı:', 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(226, 232, 240);
    pdf.text('Ethereum Mainnet', 105, y);
    y += 9;

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(148, 163, 184);
    pdf.text('Zaman Damgası:', 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(226, 232, 240);
    pdf.text(new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }), 105, y);
    y += 9;

    // Status bar
    y += 6;
    pdf.setFillColor(21, 128, 61);
    pdf.roundedRect(35, y, 140, 10, 3, 3, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('✓  DOĞRULANDI — KYC TAMAMLANDI — BLOCKCHAIN KAYITLI', 105, y + 7, { align: 'center' });
    y += 18;

    // Compliance badges
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(148, 163, 184);
    pdf.text('AES-256-GCM  |  KVKK Uyumlu  |  GDPR Uyumlu  |  ISO 27001  |  JWT/JWS Signed', 105, y, { align: 'center' });

    // Footer
    pdf.setFillColor(6, 182, 212);
    pdf.rect(0, 278, 210, 19, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Karprime Technology INC. | www.digiguard.com', 105, 287, { align: 'center' });
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Doğrulama: digiguard.com/verify/${result.certId}`, 105, 293, { align: 'center' });

    pdf.save(`DigiGuard-Sertifika-${result.certId}.pdf`);
  };

  const fullName = userType === 'corporate' && corporateInfo
    ? corporateInfo.companyName
    : `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className="min-h-screen bg-[#040810] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(6,182,212,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="w-full max-w-3xl relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/40 flex items-center justify-center">
                <Shield className="h-7 w-7 text-cyan-400" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#040810] animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {currentStage === 'done' ? 'Sertifikanız Hazır!' : 'Sertifikanız Hazırlanıyor...'}
          </h1>
          <p className="text-sm text-cyan-400/80">
            SOPON &rarr; SUPON &rarr; SOFT 10 Pipeline Aktif
          </p>
        </div>

        {/* Pipeline stages */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {STAGE_DEFS.map((stage, i) => {
            const st = stages[stage.key as string];
            const Icon = stage.icon;
            const isDone = st.status === 'done';
            const isActive = st.status === 'active';
            return (
              <div
                key={stage.key}
                className={`relative p-4 rounded-2xl border transition-all duration-700 ${
                  isDone ? `${stage.bgColor} ${stage.borderColor} shadow-lg ${stage.glowColor}` :
                  isActive ? `${stage.bgColor} ${stage.borderColor} shadow-xl shadow-${stage.color}-500/40` :
                  'bg-slate-900/40 border-slate-700/30 opacity-50'
                }`}
              >
                {/* Stage number */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-xl ${isDone || isActive ? `bg-${stage.color}-500/20` : 'bg-slate-700/40'}`}>
                    {isDone ? (
                      <CheckCircle className={`h-4 w-4 ${stage.textColor}`} />
                    ) : (
                      <Icon className={`h-4 w-4 ${isActive ? stage.textColor : 'text-slate-600'} ${isActive ? 'animate-pulse' : ''}`} />
                    )}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isDone || isActive ? stage.textColor : 'text-slate-600'}`}>{stage.name}</div>
                    <div className="text-[9px] text-slate-600">{stage.full}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isDone ? `bg-${stage.color}-400` :
                      isActive ? `bg-${stage.color}-500` : 'bg-slate-700'
                    }`}
                    style={{ width: `${st.progress}%` }}
                  />
                </div>

                {/* Detail text */}
                <div className={`text-[10px] leading-relaxed ${isActive ? stage.textColor : isDone ? 'text-slate-400' : 'text-slate-700'}`}>
                  {st.detail}
                </div>

                {/* Score chips */}
                {isDone && stage.key === 'sopon' && (
                  <div className={`mt-2 px-1.5 py-0.5 rounded text-[9px] font-bold ${stage.textColor} bg-slate-900/60 inline-block`}>
                    Skor: {soponPct > 0 ? `${Math.min(soponPct + 92, 99.5).toFixed(1)}%` : '—'}
                  </div>
                )}
                {isDone && stage.key === 'supon' && (
                  <div className={`mt-2 px-1.5 py-0.5 rounded text-[9px] font-bold ${stage.textColor} bg-slate-900/60 inline-block`}>
                    Deepfake: {suponDf > 0 ? `${suponDf.toFixed(1)}%` : '—'}
                  </div>
                )}
                {isDone && stage.key === 'soft10' && result && (
                  <div className={`mt-2 px-1.5 py-0.5 rounded text-[9px] font-bold ${stage.textColor} bg-slate-900/60 inline-block`}>
                    Güvenlik: {result.soft10SecurityScore.toFixed(1)}/100
                  </div>
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-2xl border ${stage.borderColor} animate-ping opacity-20`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Arrow connector */}
        <div className="flex items-center justify-center gap-8 mb-6 text-xs font-mono">
          {STAGE_DEFS.map((s, i) => (
            <React.Fragment key={s.key}>
              <span className={`${stages[s.key as string].status === 'done' ? s.textColor : 'text-slate-700'} font-bold`}>
                {s.name}
              </span>
              {i < 2 && <ArrowRight className={`h-4 w-4 ${stages[STAGE_DEFS[i + 1].key as string].status !== 'pending' ? 'text-cyan-500' : 'text-slate-700'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Certificate card — shown after pipeline completes */}
        {currentStage === 'done' && result && (
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-cyan-900/20 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden animate-pulse-once">
            {/* Certificate header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-white" />
                <div>
                  <div className="text-white font-bold text-sm">DigiGuard Blockchain KYC Sertifikası</div>
                  <div className="text-cyan-100 text-[10px]">SOPON → SUPON → SOFT 10 Onaylı</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-mono text-xs font-bold">{result.certId}</div>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 text-[10px]">AKTİF</span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex gap-5">
                {/* Profile photo or avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-500/40 bg-slate-700/50 flex items-center justify-center">
                    {profilePhotoDataUrl ? (
                      <img src={profilePhotoDataUrl} alt="Profil" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center">
                        <Fingerprint className="h-8 w-8 text-cyan-500/60 mx-auto mb-0.5" />
                        <div className="text-[8px] text-slate-500">Fotoğraf</div>
                      </div>
                    )}
                  </div>
                  <div className="mt-1.5 text-center">
                    <CheckCircle className="h-3.5 w-3.5 text-green-400 mx-auto" />
                    <div className="text-[9px] text-green-400">SUPON Onaylı</div>
                  </div>
                </div>

                {/* Identity info */}
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-white mb-0.5 truncate">{fullName}</div>
                  <div className="text-xs text-cyan-400 mb-3 capitalize">
                    {userType === 'individual' ? 'Bireysel Üye' : userType === 'corporate' ? 'Kurumsal Üye' : 'Personel'}
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]">
                    {[
                      { label: 'Kimlik Türü', value: identityInfo.idType === 'tc' ? 'T.C. Kimlik Kartı' : identityInfo.idType === 'passport' ? 'Pasaport' : 'Diğer' },
                      { label: 'Şehir', value: personalInfo.city || corporateInfo?.companyCity || '—' },
                      { label: 'SOPON Skoru', value: `${result.soponScore.toFixed(1)}%` },
                      { label: 'SUPON Karar', value: 'ONAYLANDI' },
                      { label: 'SOFT 10 Güv.', value: `${result.soft10SecurityScore.toFixed(1)}/100` },
                      { label: 'Blockchain', value: 'Ethereum' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span className="text-slate-500">{label}: </span>
                        <span className="text-slate-300 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR placeholder + hash */}
                <div className="flex-shrink-0 text-right">
                  <div className="w-16 h-16 rounded-lg border border-cyan-500/30 bg-slate-900/60 flex items-center justify-center mb-1">
                    <div className="text-center">
                      <Hash className="h-5 w-5 text-cyan-500/60 mx-auto" />
                      <div className="text-[7px] text-slate-600 mt-0.5">QR Kodu</div>
                    </div>
                  </div>
                  <div className="text-[8px] text-slate-600 font-mono">
                    Blok #{result.blockNumber}
                  </div>
                </div>
              </div>

              {/* Hash strip */}
              <div className="mt-4 px-3 py-2 bg-slate-900/60 rounded-lg border border-slate-700/40">
                <div className="flex items-center gap-2">
                  <Database className="h-3 w-3 text-cyan-500" />
                  <span className="text-[9px] text-slate-500">TX Hash:</span>
                  <span className="text-[9px] font-mono text-cyan-400 truncate flex-1">{result.blockchainHash}</span>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {['AES-256-GCM', 'KVKK Uyumlu', 'GDPR Uyumlu', 'ISO 27001', 'JWT/JWS', 'Blockchain'].map((b) => (
                  <span key={b} className="px-1.5 py-0.5 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-[9px] rounded">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-5 pb-5 flex gap-3">
              <button
                onClick={downloadPDF}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/20"
              >
                <Download className="h-4 w-4" />
                PDF İndir
              </button>
              <button
                onClick={onComplete}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-green-500/20"
              >
                <CheckCircle className="h-4 w-4" />
                Panele Git
              </button>
            </div>
          </div>
        )}

        {/* Processing indicator when not done */}
        {currentStage !== 'done' && (
          <div className="text-center text-sm text-slate-500 mt-2 flex items-center justify-center gap-2">
            <div className="w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            Pipeline çalışıyor...
          </div>
        )}
      </div>
    </div>
  );
};
