import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, RotateCcw, AlertCircle, Camera, Scan, Fingerprint, UserCheck, Ghost, KeyRound, Lock, RefreshCw, Activity, ShieldCheck, Zap, AlertTriangle, Layers } from 'lucide-react';

interface VerificationFormProps {
  email: string;
  phone: string;
  onVerify: () => void;
}

type PUKOPhase = 'proactive' | 'warning' | 'protection' | 'repair';

export const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  phone,
  onVerify,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState({
    faceVerification: false,
    documentVerification: false,
    biometricScan: false,
  });
  const [ghostId, setGhostId] = useState('');
  const [sponHash, setSponHash] = useState('');
  const [softonToken, setSoftonToken] = useState('');
  const [ghostStep, setGhostStep] = useState(0);
  const [pukoPhase, setPukoPhase] = useState<PUKOPhase>('proactive');

  const generateHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const allVerified = kycStatus.faceVerification && kycStatus.documentVerification && kycStatus.biometricScan;

  // PUKO cycle animation
  useEffect(() => {
    const phases: PUKOPhase[] = ['proactive', 'warning', 'protection', 'repair'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setPukoPhase(phases[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Ghost ID / SPON / SOFTON flow
  useEffect(() => {
    if (allVerified && ghostStep === 0) {
      setGhostStep(1);
      const runFlow = async () => {
        await new Promise(r => setTimeout(r, 800));
        setGhostId(`0x${generateHex(40)}`);
        setGhostStep(2);
        await new Promise(r => setTimeout(r, 800));
        setSponHash(`SPON-${generateHex(16).toUpperCase()}`);
        setGhostStep(3);
        await new Promise(r => setTimeout(r, 800));
        setSoftonToken(`SOFTON-${generateHex(20).toUpperCase()}`);
        setGhostStep(4);
      };
      runFlow();
    }
  }, [allVerified, ghostStep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allVerified) {
      alert('Lütfen tüm doğrulama adımlarını tamamlayın.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onVerify();
    setIsLoading(false);
  };

  const pukoPhases: { phase: PUKOPhase; label: string; color: string; icon: React.ElementType }[] = [
    { phase: 'proactive', label: 'Proaktif', color: '#39ff14', icon: Shield },
    { phase: 'warning', label: 'Uyari', color: '#f59e0b', icon: AlertTriangle },
    { phase: 'protection', label: 'Koruma', color: '#00e5ff', icon: Lock },
    { phase: 'repair', label: 'Onarim', color: '#a855f7', icon: RefreshCw },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyber-500/30">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-cyber-600 to-matrix-600 p-3 rounded-full animate-pulse">
              <UserCheck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent mb-2">
            KYC Kimlik Doğrulama
          </h2>
          <p className="text-slate-300 text-sm">
            Biyometrik doğrulama + Ghost ID / SPON / SOFTON protokolü
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-200 text-sm">
                <span className="font-semibold">Kullanıcı Bilgileri:</span>
              </p>
              <p className="text-blue-300 text-xs mt-1">E-posta: {email}</p>
              <p className="text-blue-300 text-xs">Telefon: {phone}</p>
            </div>
          </div>
        </div>

        {/* PUKO Dongusu Status */}
        <div className="mb-6 p-3 rounded-lg border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.15)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4" style={{ color: '#00e5ff' }} />
            <span className="text-xs font-bold text-white">PUKO Dongusu (Proaktif-Uyari-Koruma-Onarim)</span>
          </div>
          <div className="flex items-center justify-between gap-1">
            {pukoPhases.map((p) => {
              const isActive = pukoPhase === p.phase;
              return (
                <div key={p.phase} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: isActive ? `${p.color}20` : 'rgba(2,6,23,0.8)',
                      border: `1px solid ${isActive ? `${p.color}60` : 'rgba(255,255,255,0.05)'}`,
                    }}
                  >
                    <p.icon
                      className={`h-4 w-4 ${isActive ? 'animate-pulse' : ''}`}
                      style={{ color: isActive ? p.color : '#475569' }}
                    />
                  </div>
                  <span className="text-[9px] font-mono" style={{ color: isActive ? p.color : '#475569' }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* Face Verification */}
            <div className={`flex items-center justify-between p-4 rounded-lg transition-all ${kycStatus.faceVerification ? 'bg-green-900/30 border-2 border-green-500/50' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'}`}>
              <div className="flex items-center space-x-3">
                <Camera className={`h-6 w-6 ${kycStatus.faceVerification ? 'text-green-400' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${kycStatus.faceVerification ? 'text-green-300' : 'text-slate-200'}`}>
                    Yüz Tarama ve Canlılık Tespiti
                  </p>
                  <p className="text-xs text-slate-400">Kamera ile yüz doğrulama ve canlılık kontrolü</p>
                </div>
              </div>
              {kycStatus.faceVerification ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => setKycStatus({...kycStatus, faceVerification: true})}
                  className="text-sm bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Başlat
                </button>
              )}
            </div>

            {/* Document Verification */}
            <div className={`flex items-center justify-between p-4 rounded-lg transition-all ${kycStatus.documentVerification ? 'bg-green-900/30 border-2 border-green-500/50' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'}`}>
              <div className="flex items-center space-x-3">
                <Scan className={`h-6 w-6 ${kycStatus.documentVerification ? 'text-green-400' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${kycStatus.documentVerification ? 'text-green-300' : 'text-slate-200'}`}>
                    Kimlik Belgesi Tarama
                  </p>
                  <p className="text-xs text-slate-400">TC Kimlik, Pasaport veya Ehliyet doğrulama</p>
                </div>
              </div>
              {kycStatus.documentVerification ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => setKycStatus({...kycStatus, documentVerification: true})}
                  className="text-sm bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Tarayın
                </button>
              )}
            </div>

            {/* Biometric Scan */}
            <div className={`flex items-center justify-between p-4 rounded-lg transition-all ${kycStatus.biometricScan ? 'bg-green-900/30 border-2 border-green-500/50' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'}`}>
              <div className="flex items-center space-x-3">
                <Fingerprint className={`h-6 w-6 ${kycStatus.biometricScan ? 'text-green-400' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${kycStatus.biometricScan ? 'text-green-300' : 'text-slate-200'}`}>
                    Biyometrik Veri Tarama
                  </p>
                  <p className="text-xs text-slate-400">Parmak izi veya retina taraması</p>
                </div>
              </div>
              {kycStatus.biometricScan ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => setKycStatus({...kycStatus, biometricScan: true})}
                  className="text-sm bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Tarayın
                </button>
              )}
            </div>
          </div>

          {/* Ghost ID / SPON / SOFTON Flow */}
          {allVerified && (
            <div className="p-4 rounded-lg border-2 animate-fadeIn" style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.3)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Ghost className="h-5 w-5" style={{ color: '#a855f7' }} />
                <h3 className="text-sm font-bold text-white">Ghost ID / SPON / SOFTON Akışı</h3>
                {ghostStep === 4 && <CheckCircle className="h-4 w-4" style={{ color: '#39ff14' }} />}
              </div>

              <div className="space-y-2">
                {/* Step 1: Ghost ID */}
                <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: ghostStep >= 1 ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.05)', color: ghostStep >= 1 ? '#a855f7' : '#475569' }}>1</div>
                  <Ghost className="h-3.5 w-3.5" style={{ color: ghostStep >= 1 ? '#a855f7' : '#475569' }} />
                  <span className="text-[10px] text-slate-400 flex-1">Ghost ID</span>
                  {ghostId ? (
                    <span className="text-[10px] font-mono break-all" style={{ color: '#a855f7' }}>{ghostId.slice(0, 20)}...</span>
                  ) : ghostStep >= 1 ? (
                    <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin" />
                  ) : null}
                </div>

                {/* Step 2: SPON KYC */}
                <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: ghostStep >= 2 ? 'rgba(0,229,255,0.3)' : 'rgba(255,255,255,0.05)', color: ghostStep >= 2 ? '#00e5ff' : '#475569' }}>2</div>
                  <Fingerprint className="h-3.5 w-3.5" style={{ color: ghostStep >= 2 ? '#00e5ff' : '#475569' }} />
                  <span className="text-[10px] text-slate-400 flex-1">SPON KYC Hash</span>
                  {sponHash ? (
                    <span className="text-[10px] font-mono" style={{ color: '#00e5ff' }}>{sponHash}</span>
                  ) : ghostStep >= 2 ? (
                    <div className="w-3 h-3 border border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : null}
                </div>

                {/* Step 3: SOFTON Token */}
                <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: ghostStep >= 3 ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.05)', color: ghostStep >= 3 ? '#f59e0b' : '#475569' }}>3</div>
                  <KeyRound className="h-3.5 w-3.5" style={{ color: ghostStep >= 3 ? '#f59e0b' : '#475569' }} />
                  <span className="text-[10px] text-slate-400 flex-1">SOFTON Token</span>
                  {softonToken ? (
                    <span className="text-[10px] font-mono break-all" style={{ color: '#f59e0b' }}>{softonToken.slice(0, 20)}...</span>
                  ) : ghostStep >= 3 ? (
                    <div className="w-3 h-3 border border-amber-400 border-t-transparent rounded-full animate-spin" />
                  ) : null}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(ghostStep / 4) * 100}%`, background: 'linear-gradient(90deg, #a855f7, #00e5ff, #f59e0b, #39ff14)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {allVerified && ghostStep === 4 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-lg animate-pulse">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-green-300 font-bold">
                    KYC + Ghost ID Doğrulama Tamamlandı!
                  </p>
                  <p className="text-xs text-green-400">Tüm biyometrik kontroller başarılı - SOFTON tokenı oluşturuldu</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !allVerified || ghostStep < 4}
            className="w-full bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RotateCcw className="h-5 w-5 animate-spin" />
                <span>Doğrulanıyor...</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                <span>Doğrulamayı Tamamla</span>
              </>
            )}
          </button>

          {/* Quantum Resistance Indicators */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(168,85,247,0.2)' }}>
              <KeyRound className="h-3.5 w-3.5" style={{ color: '#a855f7' }} />
              <span className="text-[10px] text-slate-400">Dilithium+Kyber-1024</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.2)' }}>
              <Lock className="h-3.5 w-3.5" style={{ color: '#00e5ff' }} />
              <span className="text-[10px] text-slate-400">AES-256 Şifreleme</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(57,255,20,0.2)' }}>
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />
              <span className="text-[10px] text-slate-400">PUKO Dongusu Aktif</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(245,158,11,0.2)' }}>
              <Layers className="h-3.5 w-3.5" style={{ color: '#f59e0b' }} />
              <span className="text-[10px] text-slate-400">5 Katmanlı Mimari</span>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 mt-4">
            <p>KYC + Ghost ID/SPON/SOFTON doğrulama tamamlandıktan sonra Dashboard'a yönlendirileceksiniz.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
