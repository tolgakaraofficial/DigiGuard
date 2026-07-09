import React, { useEffect, useState, useRef } from 'react';

interface AnimatedLogoProps {
  onAnimationComplete: () => void;
}

const BOOT_LINES = [
  'INITIALIZING DIGIGUARD CORE PROTOCOL v4.2...',
  'LOADING SOPON FILTER LAYER............. OK',
  'LOADING SUPON DECISION ENGINE.......... OK',
  'LOADING SOFT-10 CRYPTO MODULE.......... OK',
  'CONNECTING TO CEREBRO GLOBAL NETWORK...',
  'BIO-ID REGISTRY SYNC.................. 152,847 ENTITIES',
  'BLOCKCHAIN NODE HANDSHAKE............. ETH MAINNET',
  'ZERO-TRUST VERIFICATION............... ACTIVE',
  'AES-256-GCM ENCRYPTION LAYER.......... ARMED',
  'NEURAL HOMEOSTASIS MONITOR............ ONLINE',
  'KYC BIOMETRIC PIPELINE................ READY',
  'SYSTEM STATUS: ALL NODES OPERATIONAL',
];

const ORBITAL_NODES = [
  { label: 'KYC', angle: 0, color: '#48CAE4', delay: 0 },
  { label: 'BIO', angle: 60, color: '#00C896', delay: 0.1 },
  { label: 'CHAIN', angle: 120, color: '#48CAE4', delay: 0.2 },
  { label: 'AI', angle: 180, color: '#00C896', delay: 0.3 },
  { label: 'ZERO', angle: 240, color: '#48CAE4', delay: 0.4 },
  { label: 'SOPON', angle: 300, color: '#00C896', delay: 0.5 },
];

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ onAnimationComplete }) => {
  const [phase, setPhase] = useState<'boot' | 'logo' | 'fadeout'>('boot');
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootIdx, setBootIdx] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [orbitActive, setOrbitActive] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Boot sequence
  useEffect(() => {
    if (phase !== 'boot') return;
    if (bootIdx >= BOOT_LINES.length) {
      setTimeout(() => setPhase('logo'), 300);
      return;
    }
    const t = setTimeout(() => {
      setBootLines(prev => [...prev, BOOT_LINES[bootIdx]]);
      setBootIdx(i => i + 1);
    }, bootIdx === 0 ? 200 : 180);
    return () => clearTimeout(t);
  }, [bootIdx, phase]);

  // Logo phase sequence
  useEffect(() => {
    if (phase !== 'logo') return;
    const t1 = setTimeout(() => setLogoVisible(true), 100);
    const t2 = setTimeout(() => setOrbitActive(true), 400);
    const t3 = setTimeout(() => setTaglineVisible(true), 900);
    const t4 = setTimeout(() => setStatsVisible(true), 1400);
    const t5 = setTimeout(() => setPhase('fadeout'), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [phase]);

  // Fade out → complete
  useEffect(() => {
    if (phase !== 'fadeout') return;
    const t = setTimeout(() => onAnimationComplete(), 600);
    return () => clearTimeout(t);
  }, [phase, onAnimationComplete]);

  // Scan line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(v => (v + 1) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Canvas particle / grid draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(72,202,228,0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(72,202,228,${p.alpha})`;
        ctx.fill();
      });

      // Connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(72,202,228,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: '#050d1a',
        transition: phase === 'fadeout' ? 'opacity 0.6s ease' : undefined,
        opacity: phase === 'fadeout' ? 0 : 1,
      }}
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: `${scanLine}%`,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(72,202,228,0.15), transparent)',
          transition: 'top 0.03s linear',
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: '#48CAE4' }} />
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: '#48CAE4' }} />
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: '#48CAE4' }} />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: '#48CAE4' }} />
      </div>

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs" style={{ color: '#48CAE4' }}>DIGIGUARD CORE PROTOCOL</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-slate-500">v4.2.1-ENTERPRISE</span>
          <span className="font-mono text-xs text-slate-500">KARPRIME TECHNOLOGY INC.</span>
        </div>
      </div>

      {/* BOOT PHASE */}
      {phase === 'boot' && (
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <div className="w-full max-w-2xl">
            <div
              className="rounded-lg p-6 border"
              style={{
                background: 'rgba(5,13,26,0.9)',
                borderColor: 'rgba(72,202,228,0.2)',
                boxShadow: '0 0 40px rgba(72,202,228,0.05)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(72,202,228,0.15)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-slate-500">SYSTEM BOOT — DIGIGUARD OS</span>
              </div>

              {/* Boot lines */}
              <div className="space-y-1 min-h-[240px]">
                {bootLines.map((line, i) => {
                  const isLast = i === bootLines.length - 1;
                  const isOk = line.includes('OK') || line.includes('READY') || line.includes('ACTIVE') || line.includes('ONLINE') || line.includes('ARMED') || line.includes('OPERATIONAL');
                  const isConnecting = line.includes('...');
                  return (
                    <div key={i} className="flex items-center gap-2 font-mono text-xs leading-relaxed"
                      style={{
                        animation: 'bootLine 0.15s ease forwards',
                        opacity: 0,
                        animationDelay: `${i * 0.01}s`,
                        animationFillMode: 'forwards',
                      }}
                    >
                      <span style={{ color: '#48CAE4', opacity: 0.5 }}>{'>'}</span>
                      <span className={isOk ? '' : 'text-slate-400'} style={isOk ? { color: '#00C896' } : undefined}>
                        {line.replace('OK', '').replace('READY', '').replace('ACTIVE', '').replace('ONLINE', '').replace('ARMED', '').replace('OPERATIONAL', '')}
                      </span>
                      {isOk && <span style={{ color: '#00C896', fontWeight: 700 }}>OK</span>}
                      {isOk && line.includes('READY') && <span style={{ color: '#00C896', fontWeight: 700 }}>READY</span>}
                      {line.includes('ACTIVE') && !line.includes('OK') && <span style={{ color: '#00C896', fontWeight: 700 }}>ACTIVE</span>}
                      {line.includes('ONLINE') && <span style={{ color: '#00C896', fontWeight: 700 }}>ONLINE</span>}
                      {line.includes('ARMED') && <span style={{ color: '#00C896', fontWeight: 700 }}>ARMED</span>}
                      {line.includes('OPERATIONAL') && <span style={{ color: '#00C896', fontWeight: 700 }}>OPERATIONAL</span>}
                      {isLast && isConnecting && (
                        <span className="inline-flex gap-1 ml-1">
                          <span className="animate-bounce" style={{ animationDelay: '0ms', color: '#48CAE4' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '150ms', color: '#48CAE4' }}>.</span>
                          <span className="animate-bounce" style={{ animationDelay: '300ms', color: '#48CAE4' }}>.</span>
                        </span>
                      )}
                    </div>
                  );
                })}
                {bootLines.length < BOOT_LINES.length && (
                  <div className="font-mono text-xs" style={{ color: '#48CAE4' }}>
                    <span style={{ opacity: 0.5 }}>{'>'}</span>
                    <span className="inline-block w-2 h-4 ml-1 align-middle animate-pulse" style={{ background: '#48CAE4' }} />
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: 'rgba(72,202,228,0.15)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-slate-500">BOOT PROGRESS</span>
                  <span className="font-mono text-xs" style={{ color: '#48CAE4' }}>
                    {Math.round((bootIdx / BOOT_LINES.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 rounded-full" style={{ background: 'rgba(72,202,228,0.1)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{
                      width: `${(bootIdx / BOOT_LINES.length) * 100}%`,
                      background: 'linear-gradient(90deg, #0077b3, #48CAE4)',
                      boxShadow: '0 0 8px rgba(72,202,228,0.6)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOGO PHASE */}
      {(phase === 'logo' || phase === 'fadeout') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Orbital ring system */}
          <div
            className="relative flex items-center justify-center mb-10"
            style={{
              width: 280,
              height: 280,
              opacity: logoVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            {/* Outer ring */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 260,
                height: 260,
                borderColor: 'rgba(72,202,228,0.12)',
                animation: 'spinSlow 20s linear infinite',
              }}
            />
            {/* Middle ring */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 200,
                height: 200,
                borderColor: 'rgba(0,200,150,0.15)',
                animation: 'spinSlow 14s linear infinite reverse',
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 148,
                height: 148,
                borderColor: 'rgba(72,202,228,0.2)',
                animation: 'spinSlow 9s linear infinite',
              }}
            />

            {/* Orbital nodes */}
            {ORBITAL_NODES.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = 130;
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <div
                  key={node.label}
                  className="absolute flex items-center justify-center rounded-full border font-mono font-bold"
                  style={{
                    width: 36,
                    height: 36,
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    borderColor: node.color,
                    background: `${node.color}15`,
                    color: node.color,
                    fontSize: 8,
                    opacity: orbitActive ? 1 : 0,
                    transition: `opacity 0.4s ease ${node.delay + 0.2}s`,
                    boxShadow: orbitActive ? `0 0 12px ${node.color}40` : 'none',
                  }}
                >
                  {node.label}
                </div>
              );
            })}

            {/* Core */}
            <div
              className="relative z-10 flex flex-col items-center justify-center rounded-full border-2"
              style={{
                width: 110,
                height: 110,
                borderColor: '#48CAE4',
                background: 'radial-gradient(circle, rgba(72,202,228,0.15) 0%, rgba(5,13,26,0.9) 70%)',
                boxShadow: '0 0 40px rgba(72,202,228,0.25), inset 0 0 30px rgba(72,202,228,0.08)',
              }}
            >
              {/* Hexagon-style shield SVG */}
              <svg width="44" height="50" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22 2L40 11V27C40 37 31.5 45.5 22 48C12.5 45.5 4 37 4 27V11L22 2Z"
                  stroke="#48CAE4"
                  strokeWidth="2"
                  fill="rgba(72,202,228,0.08)"
                />
                <path
                  d="M22 8L35 15V26C35 33.5 28.5 40 22 42C15.5 40 9 33.5 9 26V15L22 8Z"
                  fill="rgba(72,202,228,0.12)"
                  stroke="#48CAE4"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                {/* DG letters */}
                <text x="22" y="30" textAnchor="middle" fontFamily="monospace" fontWeight="800" fontSize="13" fill="#48CAE4">DG</text>
              </svg>
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{ background: 'radial-gradient(circle, rgba(72,202,228,0.12) 0%, transparent 70%)', animationDuration: '2s' }}
              />
            </div>

            {/* Ping ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: 130,
                height: 130,
                border: '1px solid rgba(72,202,228,0.3)',
                animation: 'pingRing 2.5s ease-out infinite',
              }}
            />
          </div>

          {/* Brand name */}
          <div
            className="text-center"
            style={{
              opacity: logoVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.3s',
            }}
          >
            <h1
              className="font-black tracking-[0.3em] uppercase"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                background: 'linear-gradient(135deg, #48CAE4 0%, #00C896 50%, #48CAE4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'shimmerText 4s linear infinite',
                textShadow: 'none',
                letterSpacing: '0.25em',
              }}
            >
              DIGIGUARD
            </h1>

            {/* Divider */}
            <div
              className="mx-auto my-3 h-px"
              style={{
                width: taglineVisible ? 320 : 0,
                background: 'linear-gradient(90deg, transparent, #48CAE4, #00C896, #48CAE4, transparent)',
                transition: 'width 0.8s ease',
                boxShadow: '0 0 8px rgba(72,202,228,0.4)',
              }}
            />

            {/* Taglines */}
            <div
              style={{
                opacity: taglineVisible ? 1 : 0,
                transform: taglineVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 0.6s ease',
              }}
            >
              <p className="font-mono text-sm tracking-[0.2em] uppercase mb-1" style={{ color: '#48CAE4' }}>
                Global Bio-Digital Identity Network
              </p>
              <p className="font-mono text-xs tracking-widest" style={{ color: 'rgba(72,202,228,0.5)' }}>
                CEREBRO INTEGRATION · SOPON → SUPON → SOFT 10 · BLOCKCHAIN KYC
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-0 mt-10"
            style={{
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.6s ease',
            }}
          >
            {[
              { value: '152K+', label: 'CERTIFIED IDs', color: '#48CAE4' },
              { value: '81', label: 'CITIES ACTIVE', color: '#00C896' },
              { value: '99.98%', label: 'UPTIME SLA', color: '#48CAE4' },
              { value: 'ETH', label: 'BLOCKCHAIN', color: '#00C896' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                <div className="text-center px-6 py-3">
                  <div className="font-mono font-black text-lg" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {stat.label}
                  </div>
                </div>
                {i < 3 && (
                  <div className="w-px h-8 self-center" style={{ background: 'rgba(72,202,228,0.2)' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Layer badges */}
          <div
            className="flex items-center gap-2 mt-6"
            style={{
              opacity: statsVisible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.2s',
            }}
          >
            {['SOPON', 'SUPON', 'SOFT 10', 'ZERO-TRUST', 'AES-256-GCM'].map((badge, i) => (
              <div
                key={badge}
                className="font-mono text-[9px] tracking-widest px-2 py-1 rounded border"
                style={{
                  borderColor: i % 2 === 0 ? 'rgba(72,202,228,0.3)' : 'rgba(0,200,150,0.3)',
                  color: i % 2 === 0 ? 'rgba(72,202,228,0.7)' : 'rgba(0,200,150,0.7)',
                  background: i % 2 === 0 ? 'rgba(72,202,228,0.05)' : 'rgba(0,200,150,0.05)',
                }}
              >
                {badge}
              </div>
            ))}
          </div>

          {/* Loading dots */}
          <div
            className="flex items-center gap-2 mt-8"
            style={{
              opacity: statsVisible ? 1 : 0,
              transition: 'opacity 0.4s ease 0.4s',
            }}
          >
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 2 ? 8 : 4,
                  height: i === 2 ? 8 : 4,
                  background: '#48CAE4',
                  opacity: 0.3,
                  animation: `loadDot 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* Bottom company */}
          <div
            className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1"
            style={{
              opacity: statsVisible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.5s',
            }}
          >
            <div className="font-mono text-xs tracking-[0.3em]" style={{ color: 'rgba(72,202,228,0.4)' }}>
              KARPRIME TECHNOLOGY INC.
            </div>
            <div className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>
              DIGIGUARD GLOBAL ENTERPRISE PLATFORM · INITIALIZED
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bootLine {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pingRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes shimmerText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes loadDot {
          0%, 80%, 100% { opacity: 0.15; transform: scale(1); }
          40% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
};
