import React, { useState, useEffect } from 'react';
import { Ghost, Fingerprint, Scan, ShieldCheck, ArrowRight, UserX, Eye, Lock, Database, CheckCircle, AlertTriangle, RefreshCw, KeyRound } from 'lucide-react';

type FlowStep = 'ghost_id' | 'spon_kyc' | 'softon_convert' | 'verified';

interface FlowState {
  step: FlowStep;
  ghostId: string;
  sponHash: string;
  softonToken: string;
  progress: number;
}

const stepConfig: Record<FlowStep, { label: string; icon: React.ElementType; color: string; desc: string }> = {
  ghost_id: { label: 'Ghost ID Olustur', icon: Ghost, color: '#a855f7', desc: 'Anonim kimlik tanimi olusturuluyor' },
  spon_kyc: { label: 'SPON KYC', icon: Fingerprint, color: '#00e5ff', desc: 'Sovereign Proof of Identity Number dogrulamasi' },
  softon_convert: { label: 'SOFTON Donusum', icon: RefreshCw, color: '#f59e0b', desc: 'Ghost ID -> SOFTON token donusumu' },
  verified: { label: 'Tamamlandi', icon: CheckCircle, color: '#39ff14', desc: 'Kimlik basariyla dogrulandi ve korumaya alindi' },
};

const stepOrder: FlowStep[] = ['ghost_id', 'spon_kyc', 'softon_convert', 'verified'];

export const GhostIDFlowPanel: React.FC = () => {
  const [flow, setFlow] = useState<FlowState>({
    step: 'ghost_id',
    ghostId: '',
    sponHash: '',
    softonToken: '',
    progress: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  const generateHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  const runFlow = async () => {
    setIsRunning(true);
    setFlow({ step: 'ghost_id', ghostId: '', sponHash: '', softonToken: '', progress: 0 });

    await new Promise(r => setTimeout(r, 800));
    setFlow(f => ({ ...f, step: 'spon_kyc', ghostId: `0x${generateHex(40)}`, progress: 25 }));

    await new Promise(r => setTimeout(r, 1200));
    setFlow(f => ({ ...f, step: 'softon_convert', sponHash: `SPON-${generateHex(16).toUpperCase()}`, progress: 50 }));

    await new Promise(r => setTimeout(r, 1000));
    setFlow(f => ({ ...f, softonToken: `SOFTON-${generateHex(20).toUpperCase()}`, progress: 75 }));

    await new Promise(r => setTimeout(r, 800));
    setFlow(f => ({ ...f, step: 'verified', progress: 100 }));
    setIsRunning(false);
  };

  useEffect(() => {
    runFlow();
  }, []);

  const currentIndex = stepOrder.indexOf(flow.step);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(168,85,247,0.2)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg" style={{ background: 'rgba(168,85,247,0.1)' }}>
              <Ghost className="h-6 w-6" style={{ color: '#a855f7' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Ghost ID - SPON/SOFTON Akisi</h2>
              <p className="text-xs text-slate-400">Cilt 10: Anonim kimlik donusum protokolu</p>
            </div>
          </div>
          <button
            onClick={runFlow}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
            style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7' }}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            Tekrar Calistir
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono text-slate-500">Akis Ilerlemesi</span>
            <span className="text-xs font-bold" style={{ color: stepConfig[flow.step].color }}>{flow.progress}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${flow.progress}%`, background: 'linear-gradient(90deg, #a855f7, #00e5ff, #f59e0b, #39ff14)' }}
            />
          </div>
        </div>

        {/* Step Flow */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {stepOrder.map((step, i) => {
            const cfg = stepConfig[step];
            const isActive = i === currentIndex;
            const isDone = i < currentIndex;
            return (
              <div key={step} className="flex items-center gap-2 flex-1 min-w-[140px]">
                <div
                  className="flex flex-col items-center gap-1 flex-1 p-3 rounded-lg border transition-all"
                  style={{
                    background: isActive ? `${cfg.color}15` : isDone ? 'rgba(57,255,20,0.05)' : 'rgba(2,6,23,0.4)',
                    borderColor: isActive ? `${cfg.color}40` : isDone ? 'rgba(57,255,20,0.2)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  <cfg.icon
                    className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`}
                    style={{ color: isDone ? '#39ff14' : cfg.color }}
                  />
                  <span className="text-[10px] font-semibold text-center" style={{ color: isDone ? '#39ff14' : isActive ? cfg.color : '#64748b' }}>
                    {cfg.label}
                  </span>
                </div>
                {i < stepOrder.length - 1 && (
                  <ArrowRight className="h-3 w-3 flex-shrink-0" style={{ color: isDone ? '#39ff14' : '#334155' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Detail */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          {React.createElement(stepConfig[flow.step].icon, { className: 'h-4 w-4', style: { color: stepConfig[flow.step].color } })}
          <h3 className="text-sm font-bold text-white">Akis Detayi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Ghost ID Card */}
          <div className="rounded-lg p-4 border" style={{ background: 'rgba(168,85,247,0.05)', borderColor: 'rgba(168,85,247,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Ghost className="h-4 w-4" style={{ color: '#a855f7' }} />
              <span className="text-xs font-bold text-white">Ghost ID</span>
              {flow.ghostId && <CheckCircle className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />}
            </div>
            <p className="text-[10px] text-slate-500 mb-2">Anonim kimlik tanimi (non-PII)</p>
            {flow.ghostId ? (
              <p className="text-[10px] font-mono break-all" style={{ color: '#a855f7' }}>{flow.ghostId}</p>
            ) : (
              <div className="h-4 bg-slate-800 rounded animate-pulse" />
            )}
          </div>

          {/* SPON KYC Card */}
          <div className="rounded-lg p-4 border" style={{ background: 'rgba(0,229,255,0.05)', borderColor: 'rgba(0,229,255,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint className="h-4 w-4" style={{ color: '#00e5ff' }} />
              <span className="text-xs font-bold text-white">SPON KYC Hash</span>
              {flow.sponHash && <CheckCircle className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />}
            </div>
            <p className="text-[10px] text-slate-500 mb-2">Sovereign Proof of Identity Number</p>
            {flow.sponHash ? (
              <p className="text-[10px] font-mono break-all" style={{ color: '#00e5ff' }}>{flow.sponHash}</p>
            ) : (
              <div className="h-4 bg-slate-800 rounded animate-pulse" />
            )}
          </div>

          {/* SOFTON Token Card */}
          <div className="rounded-lg p-4 border" style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <KeyRound className="h-4 w-4" style={{ color: '#f59e0b' }} />
              <span className="text-xs font-bold text-white">SOFTON Token</span>
              {flow.softonToken && <CheckCircle className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />}
            </div>
            <p className="text-[10px] text-slate-500 mb-2">Donusmus kimlik tokeni</p>
            {flow.softonToken ? (
              <p className="text-[10px] font-mono break-all" style={{ color: '#f59e0b' }}>{flow.softonToken}</p>
            ) : (
              <div className="h-4 bg-slate-800 rounded animate-pulse" />
            )}
          </div>

          {/* Verification Status Card */}
          <div className="rounded-lg p-4 border" style={{ background: flow.step === 'verified' ? 'rgba(57,255,20,0.05)' : 'rgba(2,6,23,0.4)', borderColor: flow.step === 'verified' ? 'rgba(57,255,20,0.3)' : 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-4 w-4" style={{ color: flow.step === 'verified' ? '#39ff14' : '#64748b' }} />
              <span className="text-xs font-bold text-white">Dogrulama Durumu</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-2">Cerebro Network kayit durumu</p>
            <div className="flex items-center gap-2">
              {flow.step === 'verified' ? (
                <>
                  <CheckCircle className="h-4 w-4" style={{ color: '#39ff14' }} />
                  <span className="text-xs font-bold" style={{ color: '#39ff14' }}>Dogrulandi & Kaydedildi</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />
                  <span className="text-xs text-slate-400">{stepConfig[flow.step].desc}...</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Protocol Info */}
        <div className="mt-4 rounded-lg p-3 border" style={{ background: 'rgba(2,6,23,0.8)', borderColor: 'rgba(0,229,255,0.08)' }}>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
            <div>
              <p className="text-[10px] text-slate-400">
                <strong className="text-slate-300">Protokol:</strong> Ghost ID, kullanicinin PII verilerini ifsa etmeden anonim kimlik dogrulamasi saglar.
                SPON (Sovereign Proof of Identity Number) ile biyometrik dogrulama yapilir, sonuc SOFTON tokenina donusturulerek
                Cerebro Network'e kaydedilir. Tum islem non-custodial ve AES-256 + Kyber-1024 ile sifrelenmistir.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { icon: UserX, label: 'PII Koruma', desc: 'Kisisel veriler ifsa edilmez', color: '#a855f7' },
          { icon: Lock, label: 'AES-256 Sifreleme', desc: 'Uçtan uca sifreli kanal', color: '#00e5ff' },
          { icon: Database, label: 'Immutable Kayit', desc: 'Cerebro Network blockchain', color: '#39ff14' },
        ].map((item, i) => (
          <div key={i} className="rounded-lg p-4 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(255,255,255,0.05)' }}>
            <item.icon className="h-5 w-5 mb-2" style={{ color: item.color }} />
            <p className="text-xs font-bold text-white mb-0.5">{item.label}</p>
            <p className="text-[10px] text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
