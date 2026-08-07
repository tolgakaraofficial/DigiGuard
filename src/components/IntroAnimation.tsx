import React, { useState, useEffect, useCallback } from 'react';
import {
  Shield, Ghost, Fingerprint, Lock, Cpu, Network, Wallet,
  Gavel, Award, Activity, Zap, CheckCircle, ArrowRight,
  User, Building2, Sparkles, X,
} from 'lucide-react';

interface IntroAnimationProps {
  userType: 'individual' | 'corporate';
  onComplete: () => void;
}

const phases = [
  { id: 0, icon: Shield, title: 'DigiGuard Cerebro', subtitle: 'Kuantum Sonrasi Siber Egemenlik', color: '#00e5ff' },
  { id: 1, icon: Ghost, title: 'Ghost ID Olusturma', subtitle: 'Anonim kimlik katmani devreye giriyor', color: '#a855f7' },
  { id: 2, icon: Fingerprint, title: 'SPON KYC Dogrulama', subtitle: 'Biyometrik kimlik hash olusturuldu', color: '#00e5ff' },
  { id: 3, icon: Lock, title: 'SOFTON Token', subtitle: 'Kuantum direncli oturum tokeni aktif', color: '#f59e0b' },
  { id: 4, icon: Network, title: 'Sovereign Bridge DAG', subtitle: 'DAG dugumleri kaydedildi, dogrulayicilar hazir', color: '#f97316' },
  { id: 5, icon: Cpu, title: 'Cerebro Sentinel', subtitle: 'AI tehdit tespiti ve PUKO dongusu basladi', color: '#39ff14' },
  { id: 6, icon: Gavel, title: 'Dijital Anayasa', subtitle: '6 madde anayasa yururluge girdi', color: '#ef4444' },
  { id: 7, icon: Award, title: 'MESAM Telif & Varliklar', subtitle: 'Dijital varliklar sertifikalandirildi', color: '#f59e0b' },
  { id: 8, icon: Wallet, title: 'DGU Cuzdan', subtitle: 'Akilli sozlesmeler ve odeme dagitim hazir', color: '#00e5ff' },
  { id: 9, icon: Sparkles, title: 'Tam Tesekkul', subtitle: 'Tam teşekküllü dönüşüm tamamlandi', color: '#39ff14' },
];

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ userType, onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const advance = useCallback(() => {
    setPhase((p) => {
      if (p >= phases.length - 1) {
        setTimeout(onComplete, 400);
        return p;
      }
      return p + 1;
    });
  }, [onComplete]);

  useEffect(() => {
    if (skipped) return;
    const timer = setInterval(advance, 1100);
    const progressTimer = setInterval(() => {
      setProgress((pr) => Math.min(pr + 100 / (phases.length * 28), 100));
    }, 40);
    return () => { clearInterval(timer); clearInterval(progressTimer); };
  }, [advance, skipped]);

  const skip = () => { setSkipped(true); onComplete(); };

  const current = phases[phase];
  const Icon = current.icon;
  const UserIcon = userType === 'corporate' ? Building2 : User;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center hex-grid" style={{ background: 'rgba(2,6,23,0.98)' }}>
      {/* Scanline */}
      <div className="scanline" style={{ top: `${progress}%` }} />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: current.color, transition: 'background 0.8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: current.color, transition: 'background 0.8s' }} />
      </div>

      {/* Skip button */}
      <button onClick={skip} className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition text-xs z-10">
        Atla <X className="h-3.5 w-3.5" />
      </button>

      <div className="relative w-full max-w-2xl px-6">
        {/* User type badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: `${current.color}40`, background: `${current.color}10` }}>
            <UserIcon className="h-4 w-4" style={{ color: current.color }} />
            <span className="text-xs font-mono" style={{ color: current.color }}>
              {userType === 'corporate' ? 'Kurumsal Hesap' : 'Bireysel Hesap'}
            </span>
          </div>
        </div>

        {/* Main icon with pulse rings */}
        <div className="relative flex items-center justify-center mb-8" style={{ height: '120px' }}>
          <div className="absolute w-24 h-24 rounded-full animate-ping opacity-20" style={{ background: current.color }} />
          <div className="absolute w-20 h-20 rounded-full opacity-30" style={{ background: current.color, animation: 'dagPulse 2s ease-in-out infinite' }} />
          <div className="relative p-6 rounded-full border-2" style={{ borderColor: `${current.color}60`, background: `${current.color}15`, transition: 'all 0.6s' }}>
            <Icon className="h-10 w-10" style={{ color: current.color }} />
          </div>
        </div>

        {/* Phase text */}
        <div className="text-center mb-8 animate-fade-in" key={phase}>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ textShadow: `0 0 20px ${current.color}40` }}>
            {current.title}
          </h2>
          <p className="text-sm text-slate-400">{current.subtitle}</p>
        </div>

        {/* Phase dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {phases.map((p, i) => (
            <div
              key={p.id}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === phase ? '32px' : '8px',
                background: i <= phase ? p.color : '#334155',
                boxShadow: i === phase ? `0 0 8px ${p.color}80` : 'none',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${current.color}, #39ff14)` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Adim {phase + 1} / {phases.length}</span>
          <span>%{Math.round(progress)}</span>
        </div>

        {/* Completed steps preview */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
          {phases.slice(0, phase + 1).map((p) => {
            const PIcon = p.icon;
            return (
              <div
                key={p.id}
                className="flex items-center gap-1 px-2 py-1 rounded-md border animate-fade-in"
                style={{ borderColor: `${p.color}30`, background: `${p.color}10` }}
              >
                <CheckCircle className="h-3 w-3" style={{ color: p.color }} />
                <PIcon className="h-3 w-3" style={{ color: p.color }} />
                <span className="text-[9px] font-mono" style={{ color: p.color }}>{p.title.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-slate-600">
          <Activity className="h-3 w-3 animate-pulse" style={{ color: current.color }} />
          <span>Cerebro Sentinel izliyor</span>
          <ArrowRight className="h-3 w-3" />
          <Zap className="h-3 w-3" style={{ color: '#f59e0b' }} />
          <span>PUKO Dongusu Aktif</span>
        </div>
      </div>
    </div>
  );
};
