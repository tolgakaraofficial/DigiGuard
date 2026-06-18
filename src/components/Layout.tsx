import React, { useState } from 'react';
import { Shield, Fingerprint, Lock, Info, Users, Lock as LockIcon, Shield as ShieldIcon } from 'lucide-react';
import { SecurityInfoModal } from './SecurityInfoModal';
import { AboutModal } from './AboutModal';
import { TeamModal } from './TeamModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-x-hidden flex flex-col">
      {/* Cyber background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-matrix-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Scanning line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-400 to-transparent animate-scan-line"></div>
      </div>

      <header className="relative z-10 bg-slate-900/80 backdrop-blur-md border-b border-cyber-500/30 shadow-lg shadow-cyber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 relative">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Shield className="h-10 w-10 text-cyber-400 animate-fingerprint-pulse" />
                <div className="absolute inset-0 bg-cyber-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyber-400 via-matrix-400 to-secure-400 bg-clip-text text-transparent">
                  DigiGuard
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Biyometrik Kimlik Doğrulama Sistemi
                </p>
              </div>
            </div>

            {/* Center Action Buttons */}
            <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-2">
              <button
                onClick={() => setShowSecurityModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/20 text-xs"
              >
                <LockIcon className="h-3.5 w-3.5" />
                SHA-256
              </button>
              <button
                onClick={() => setShowAboutModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-orange-500/20 text-xs"
              >
                <Info className="h-3.5 w-3.5" />
                Hakkında
              </button>
              <button
                onClick={() => setShowTeamModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20 text-xs"
              >
                <Users className="h-3.5 w-3.5" />
                Ekip
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-900/50 to-matrix-900/50 border border-cyber-500/30">
                <Fingerprint className="h-5 w-5 text-matrix-400" />
                <div className="text-xs">
                  <div className="text-slate-400">Güvenlik</div>
                  <div className="text-matrix-400 font-bold">AES-256</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full py-8">
        {children}
      </main>

      {/* Footer with security badges */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              © 2024 Karprime Technology INC. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-xs px-3 py-1 rounded-full bg-cyber-900/50 text-cyber-400 border border-cyber-500/30">
                ISO 27001
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-matrix-900/50 text-matrix-400 border border-matrix-500/30">
                KVKK Uyumlu
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-secure-900/50 text-secure-400 border border-secure-500/30">
                GDPR Uyumlu
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                Blockchain Secured
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SecurityInfoModal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />
    </div>
  );
};