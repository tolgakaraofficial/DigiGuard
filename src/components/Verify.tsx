import React, { useState, useEffect } from 'react';
import {
  Shield, CheckCircle, RotateCcw, AlertCircle, Camera, Scan, Fingerprint,
  UserCheck, Ghost, KeyRound, Lock, RefreshCw, Activity, ShieldCheck,
  Zap, AlertTriangle, Layers, ArrowRight,
} from 'lucide-react';
import { generateGhostId, generateSponHash, generateSoftonToken } from '../lib/crypto';

interface VerifyProps {
  email: string;
  phone: string;
  onVerify: () => void;
  onBack: () => void;
}

type PUKOPhase = 'proactive' | 'warning' | 'protection' | 'repair';

export const Verify: React.FC<VerifyProps> = ({ email, phone, onVerify, onBack }) => {
  const [kyc, setKyc] = useState({ face: false, document: false, biometric: false });
  const [ghostId, setGhostId] = useState('');
  const [sponHash, setSponHash] = useState('');
  const [softonToken, setSoftonToken] = useState('');
  const [ghostStep, setGhostStep] = useState(0);
  const [pukoPhase, setPukoPhase] = useState<PUKOPhase>('proactive');
  const [loading, setLoading] = useState(false);

  const allVerified = kyc.face && kyc.document && kyc.biometric;

  useEffect(() => {
    const phases: PUKOPhase[] = ['proactive', 'warning', 'protection', 'repair'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setPukoPhase(phases[idx]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (allVerified && ghostStep === 0) {
      setGhostStep(1);
      const run = async () => {
        await new Promise((r) => setTimeout(r, 700));
        setGhostId(generateGhostId());
        setGhostStep(2);
        await new Promise((r) => setTimeout(r, 700));
        setSponHash(generateSponHash());
        setGhostStep(3);
        await new Promise((r) => setTimeout(r, 700));
        setSoftonToken(generateSoftonToken());
        setGhostStep(4);
      };
      run();
    }
  }, [allVerified, ghostStep]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allVerified || ghostStep < 4) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onVerify();
  };

  const pukoPhases: { phase: PUKOPhase; label: string; color: string; icon: React.ElementType }[] = [
    { phase: 'proactive', label: 'Proaktif', color: '#39ff14', icon: Shield },
    { phase: 'warning', label: 'Uyari', color: '#f59e0b', icon: AlertTriangle },
    { phase: 'protection', label: 'Koruma', color: '#00e5ff', icon: Lock },
    { phase: 'repair', label: 'Onarim', color: '#a855f7', icon: RefreshCw },
  ];

  const kycSteps = [
    { key: 'face', label: 'Yuz Tarama', desc: 'Canlilik tespiti', icon: Camera, val: kyc.face },
    { key: 'document', label: 'Belge Tarama', desc: 'TC Kimlik / Pasaport', icon: Scan, val: kyc.document },
    { key: 'biometric', label: 'Biyometrik', desc: 'Parmak izi / Retina', icon: Fingerprint, val: kyc.biometric },
  ] as const;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 hex-grid">
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl cyber-border cyber-glow mb-3">
            <UserCheck className="h-8 w-8 text-cyber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">KYC Kimlik Dogrulama</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Biyometrik + Ghost ID / SPON / SOFTON</p>
        </div>

        {/* User info */}
        <div className="mb-4 p-3 rounded-lg bg-blue-900/20 border border-blue-500/20 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="text-blue-200"><span className="font-semibold">E-posta:</span> {email}</p>
            <p className="text-blue-200"><span className="font-semibold">Telefon:</span> {phone}</p>
          </div>
        </div>

        {/* PUKO Dongusu */}
        <div className="mb-4 card p-3 border border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-cyber-400" />
            <span className="text-xs font-bold text-white">PUKO Dongusu</span>
          </div>
          <div className="flex items-center justify-between gap-1">
            {pukoPhases.map((p) => {
              const active = pukoPhase === p.phase;
              return (
                <div key={p.phase} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: active ? `${p.color}20` : 'rgba(2,6,23,0.8)',
                      border: `1px solid ${active ? `${p.color}60` : 'rgba(255,255,255,0.05)'}`,
                    }}
                  >
                    <p.icon
                      className={`h-4 w-4 ${active ? 'animate-pulse' : ''}`}
                      style={{ color: active ? p.color : '#475569' }}
                    />
                  </div>
                  <span className="text-[9px] font-mono" style={{ color: active ? p.color : '#475569' }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={submit} className="card p-6 cyber-border space-y-4">
          {/* KYC steps */}
          <div className="space-y-3">
            {kycSteps.map((s) => (
              <div
                key={s.key}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  s.val
                    ? 'bg-matrix-900/20 border-2 border-matrix-500/40'
                    : 'bg-slate-900/60 border-2 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <s.icon className={`h-5 w-5 ${s.val ? 'text-matrix-400' : 'text-slate-400'}`} />
                  <div>
                    <p className={`text-sm font-semibold ${s.val ? 'text-matrix-300' : 'text-slate-200'}`}>{s.label}</p>
                    <p className="text-[10px] text-slate-500">{s.desc}</p>
                  </div>
                </div>
                {s.val ? (
                  <CheckCircle className="h-5 w-5 text-matrix-400" />
                ) : (
                  <button
                    type="button"
                    onClick={() => setKyc({ ...kyc, [s.key]: true })}
                    className="text-xs btn-cyber px-3 py-1.5 rounded-lg font-semibold"
                  >
                    Baslat
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Ghost ID flow */}
          {allVerified && (
            <div className="p-4 rounded-lg border-2 animate-fade-in" style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.3)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Ghost className="h-5 w-5 text-ghost-400" />
                <h3 className="text-sm font-bold text-white">Ghost ID / SPON / SOFTON Akisi</h3>
                {ghostStep === 4 && <CheckCircle className="h-4 w-4 text-matrix-400" />}
              </div>

              <div className="space-y-2">
                {[
                  { n: 1, label: 'Ghost ID', val: ghostId, color: '#a855f7', icon: Ghost },
                  { n: 2, label: 'SPON KYC Hash', val: sponHash, color: '#00e5ff', icon: Fingerprint },
                  { n: 3, label: 'SOFTON Token', val: softonToken, color: '#f59e0b', icon: KeyRound },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{
                        background: ghostStep >= s.n ? `${s.color}30` : 'rgba(255,255,255,0.05)',
                        color: ghostStep >= s.n ? s.color : '#475569',
                      }}
                    >
                      {s.n}
                    </div>
                    <s.icon className="h-3.5 w-3.5" style={{ color: ghostStep >= s.n ? s.color : '#475569' }} />
                    <span className="text-[10px] text-slate-400 flex-1">{s.label}</span>
                    {s.val ? (
                      <span className="text-[10px] font-mono break-all" style={{ color: s.color }}>
                        {s.val.length > 24 ? `${s.val.slice(0, 20)}...` : s.val}
                      </span>
                    ) : ghostStep >= s.n ? (
                      <div className="w-3 h-3 border-2 rounded-full animate-spin" style={{ borderColor: `${s.color}40`, borderTopColor: s.color }} />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(ghostStep / 4) * 100}%`,
                    background: 'linear-gradient(90deg, #a855f7, #00e5ff, #f59e0b, #39ff14)',
                  }}
                />
              </div>
            </div>
          )}

          {ghostStep === 4 && (
            <div className="p-3 rounded-lg bg-matrix-900/20 border-2 border-matrix-500/40 animate-pulse">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-matrix-400" />
                <div>
                  <p className="text-sm text-matrix-300 font-bold">KYC + Ghost ID Dogrulama Tamamlandi!</p>
                  <p className="text-[10px] text-matrix-400">SOFTON tokeni olusturuldu</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button type="button" onClick={onBack} className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium">
              Geri
            </button>
            <button
              type="submit"
              disabled={loading || !allVerified || ghostStep < 4}
              className="flex-1 btn-cyber rounded-lg py-2.5 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><RotateCcw className="h-4 w-4 animate-spin" /> Dogrulaniyor...</>
              ) : (
                <><Shield className="h-4 w-4" /> Dogrulamayi Tamamla <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>

          {/* Quantum badges */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Dilithium+Kyber-1024', icon: KeyRound, color: '#a855f7' },
              { label: 'AES-256-GCM', icon: Lock, color: '#00e5ff' },
              { label: 'PUKO Dongusu', icon: ShieldCheck, color: '#39ff14' },
              { label: '5 Katmanli Mimari', icon: Layers, color: '#f97316' },
            ].map((b) => (
              <div key={b.label} className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <b.icon className="h-3 w-3" style={{ color: b.color }} />
                <span className="text-[10px] text-slate-400">{b.label}</span>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
