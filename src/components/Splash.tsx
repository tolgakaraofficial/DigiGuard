import React, { useState, useEffect } from 'react';
import { Shield, Ghost, Network, Cpu, ArrowRight, Lock, Zap, Fingerprint } from 'lucide-react';

interface SplashProps {
  onEnter: () => void;
}

const scenes = [
  {
    title: 'Sovereignty Without Exposure',
    subtitle: 'Identity Layer · Anonymous by Design',
    body: 'Traditional identity systems demand you surrender your data. DigiGuard introduces Ghost ID — an anonymous identity layer that speaks on your behalf without ever revealing who you are.',
    icon: Ghost,
    color: '#a855f7',
  },
  {
    title: 'The Quantum Threat Is Here',
    subtitle: 'Post-Quantum Cryptography',
    body: 'Quantum computers can break 2048-bit RSA in hours. Cerebro Sentinel makes post-quantum encryption the default with Dilithium and Kyber-1024 — built for a world where classical crypto no longer holds.',
    icon: Cpu,
    color: '#00e5ff',
  },
  {
    title: 'DAG Topology, Not Blockchain',
    subtitle: 'Sovereign Bridge · Parallel Verification',
    body: 'The Sovereign Bridge DAG validates thousands of transactions per second in parallel. No miners, no blocks, no latency. Every node independently verifies — finality in milliseconds.',
    icon: Network,
    color: '#f97316',
  },
  {
    title: 'AI-Powered Proactive Defense',
    subtitle: 'Cerebro Sentinel · PUKO Cycle',
    body: 'Cerebro detects threats proactively through the PUKO cycle: Proactive, Execution, Control, Measurement. It stops attacks before they materialize — not after the damage is done.',
    icon: Shield,
    color: '#39ff14',
  },
];

export const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScene((s) => (s + 1) % scenes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 1.5));
    }, 50);
    return () => clearInterval(interval);
  }, [scene]);

  const current = scenes[scene];
  const Icon = current.icon;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient layers */}
      <div className="absolute inset-0 intro-aurora" />
      <div className="absolute inset-0 intro-grid" />
      <div
        className="absolute inset-0 opacity-25 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${current.color}22, transparent 55%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl w-full px-6 text-center">
        {/* Logo + Orb */}
        <div className="mb-10 flex flex-col items-center animate-fade-in">
          <div className="relative mb-6">
            <div className="intro-orb-glow" style={{ color: current.color }} />
            <div className="intro-orb">
              <div className="intro-orb-core" />
              <div className="intro-orb-ring" style={{ borderColor: `${current.color}55` }} />
              <Fingerprint className="relative h-12 w-12 text-white z-10" />
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-white">DigiGuard</span>
            <span className="text-slate-600 mx-2.5 font-light">&</span>
            <span className="text-shimmer">Cerebro</span>
          </h1>
          <p className="mt-4 text-xs font-mono text-slate-500 tracking-[0.3em] uppercase">
            Post-Quantum Digital Sovereignty
          </p>
          <div className="mt-4 flex items-center gap-1.5" style={{ color: current.color }}>
            <span className="intro-dot" />
            <span className="intro-dot" style={{ animationDelay: '0.2s' }} />
            <span className="intro-dot" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Scene card */}
        <div
          key={scene}
          className="card p-6 sm:p-8 mb-6 animate-fade-in"
          style={{ borderColor: `${current.color}30` }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="h-3.5 w-3.5" style={{ color: current.color }} />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
              {current.subtitle}
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
            {current.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {current.body}
          </p>
        </div>

        {/* Scene indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {scenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setScene(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === scene ? 36 : 10,
                background: i === scene ? current.color : 'rgba(255,255,255,0.12)',
                opacity: i === scene ? 1 : 0.5,
              }}
              aria-label={`Scene ${i + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-slate-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full transition-all duration-75 rounded-full"
            style={{ width: `${progress}%`, background: current.color }}
          />
        </div>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl btn-cyber font-display font-semibold text-sm tracking-wide"
        >
          <Zap className="h-4 w-4" />
          <span>Enter the Platform</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Security credentials */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10px] font-mono text-slate-600 tracking-wider">
          <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" /> AES-256-GCM</span>
          <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> Dilithium+Kyber-1024</span>
          <span className="flex items-center gap-1.5"><Network className="h-3 w-3" /> DAG Topology</span>
          <span className="flex items-center gap-1.5"><Cpu className="h-3 w-3" /> PUKO Cycle</span>
        </div>

        <p className="mt-5 text-[10px] font-mono text-slate-700 tracking-wider">
          v1.0.0 · Karprime Technology Inc.
        </p>
      </div>
    </div>
  );
};
