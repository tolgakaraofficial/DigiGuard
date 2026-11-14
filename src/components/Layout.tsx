import React, { useState } from 'react';
import { Shield, Fingerprint, Lock } from 'lucide-react';
import { FounderProfileBar, FounderCVModal } from './FounderProfileBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showCV, setShowCV] = useState(false);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden flex flex-col" style={{ background: '#020617' }}>
      {/* Cyber background effects */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#00e5ff' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: '#39ff14' }} />
      </div>

      {/* Scanning line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10 z-0">
        <div className="absolute w-full h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)' }} />
      </div>

      <header className="relative z-10 border-b" style={{ background: 'rgba(2,6,23,0.95)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,229,255,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Shield className="h-10 w-10 animate-pulse" style={{ color: '#00e5ff' }} />
                <div className="absolute inset-0 rounded-full blur-xl" style={{ background: 'rgba(0,229,255,0.15)' }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span style={{ color: '#00e5ff' }}>Digi</span><span style={{ color: '#39ff14' }}>Guard</span>
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Cerebro Network Kimlik Dogrulama Sistemi
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg border" style={{ background: 'rgba(0,229,255,0.05)', borderColor: 'rgba(0,229,255,0.2)' }}>
                <Fingerprint className="h-5 w-5" style={{ color: '#39ff14' }} />
                <div className="text-xs">
                  <div className="text-slate-400">Guvenlik</div>
                  <div className="font-bold" style={{ color: '#39ff14' }}>AES-256 + Kyber-1024</div>
                </div>
              </div>
              <FounderProfileBar variant="compact" onOpenCV={() => setShowCV(true)} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full py-8">
        {children}
      </main>

      {/* Footer with security badges */}
      <footer className="relative z-10 border-t" style={{ background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(0,229,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              © 2024 Karprime Technology INC. Tum haklari saklidir.
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(0,229,255,0.1)', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>
                ISO 27001
              </span>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(57,255,20,0.1)', color: '#39ff14', border: '1px solid rgba(57,255,20,0.2)' }}>
                KVKK Uyumlu
              </span>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(0,229,255,0.1)', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>
                GDPR Uyumlu
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                Blockchain Secured
              </span>
            </div>
          </div>
        </div>
      </footer>

      <FounderCVModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </div>
  );
};