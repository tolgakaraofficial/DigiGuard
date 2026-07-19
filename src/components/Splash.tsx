import React, { useState, useEffect } from 'react';
import { Shield, Ghost, Network, Cpu, ArrowRight, Lock, Zap } from 'lucide-react';

interface SplashProps {
  onEnter: () => void;
}

const scenes = [
  {
    title: 'Sahne I — Hayaletlerin Anayasası',
    subtitle: 'Kimliğinizi ifşa etmeden egemenlik',
    body: 'Geleneksel kimlik sistemleri çöktü. İnsanlar artık verilerini devretmek istemiyor. DigiGuard, Ghost ID ile anonim bir kimlik katmanı sunar: sizin adınıza konuşan bir hayalet.',
    icon: Ghost,
    color: '#a855f7',
  },
  {
    title: 'Sahne II — Kuantum Tehdidi',
    subtitle: 'Shor algoritması RSA/ECC\'yi kırar',
    body: 'Kuantum bilgisayarlar 2048-bit RSA anahtarlarını saatler içinde çözebilir. Cerebro Sentinel, Dilithium+Kyber-1024 ile kuantum sonrası şifrelemeyi standart hale getirir.',
    icon: Cpu,
    color: '#00e5ff',
  },
  {
    title: 'Sahne III — DAG Topolojisi',
    subtitle: 'Blok zincir değil, yönlü döngüsüz graf',
    body: 'Sovereign Bridge DAG\'si binlerce işlemi saniyede paralel doğrular. Madenci yok, blok yok, gecikme yok. Her düğüm kendi doğrulamasını yapar.',
    icon: Network,
    color: '#f97316',
  },
  {
    title: 'Sahne IV — Cerebro Sentinel',
    subtitle: 'Yapay zeka destekli savunma',
    body: 'Cerebro, tehditleri PUKO döngüsü ile proaktif tespit eder: Proaktif → Uygulama → Kontrol → Ölçüm. Saldırı olmadan önce durdurur.',
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 50);
    return () => clearInterval(interval);
  }, [scene]);

  const current = scenes[scene];
  const Icon = current.icon;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden hex-grid">
      <div className="scanline" />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${current.color}33, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl w-full px-6 text-center">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center animate-fade-in">
          <div className="relative mb-6">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-40"
              style={{ background: current.color }}
            />
            <div
              className="relative p-6 rounded-2xl border-2 transition-all duration-700"
              style={{ borderColor: current.color, boxShadow: `0 0 40px ${current.color}40` }}
            >
              <Icon className="h-12 w-12" style={{ color: current.color }} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="text-white">DigiGuard</span>
            <span className="text-slate-500 mx-2">&</span>
            <span style={{ color: current.color }}>Cerebro</span>
          </h1>
          <p className="mt-3 text-sm font-mono text-slate-400 tracking-widest uppercase">
            Kuantum Sonrasi Siber Egemenlik
          </p>
        </div>

        {/* Scene card */}
        <div
          key={scene}
          className="card p-6 sm:p-8 mb-6 animate-fade-in cyber-border"
          style={{ borderColor: `${current.color}40` }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lock className="h-4 w-4" style={{ color: current.color }} />
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: current.color }}>
              {current.subtitle}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{current.title}</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{current.body}</p>
        </div>

        {/* Scene indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {scenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setScene(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === scene ? 32 : 12,
                background: i === scene ? current.color : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-0.5 bg-slate-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full transition-all duration-75"
            style={{ width: `${progress}%`, background: current.color }}
          />
        </div>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl btn-cyber font-semibold text-sm"
        >
          <Zap className="h-4 w-4" />
          <span>Egemenlige Basla</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-6 text-[10px] font-mono text-slate-600 tracking-wider">
          v1.0.0 · Dilithium+Kyber-1024 · AES-256-GCM · SHA-3-512 · PUKO Dongusu
        </p>
      </div>
    </div>
  );
};
