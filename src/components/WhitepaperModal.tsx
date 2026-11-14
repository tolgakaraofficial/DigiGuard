import React, { useState } from 'react';
import {
  FileText, X, BookOpen, Shield, Lock, Network, Cpu,
  Fingerprint, Award, Zap, ExternalLink, Download,
} from 'lucide-react';

const WHITEPAPERS = [
  { title: 'DigiGuard Master Specification', file: 'DigiGuard_Master_Specification_Complete.pdf', icon: FileText, color: '#00e5ff' },
  { title: 'Post-Quantum Cryptographic Integration Blueprint', file: 'DigiGuard_Kuantum_Giris_Mimari_Sartnamesi.pdf', icon: Lock, color: '#39ff14' },
  { title: 'Cerebro Network Quantum Integration Blueprint', file: 'Cerebro_Network_Quantum_Integration_Blueprint.pdf', icon: Cpu, color: '#a855f7' },
  { title: 'Cerebro Network Universal Language Blueprint', file: 'Cerebro_Network_Universal_Language_Blueprint.pdf', icon: Network, color: '#f97316' },
  { title: 'DigiGuard Comprehensive Ultimate Specification', file: 'DigiGuard_Comprehensive_Ultimate_Specification.pdf', icon: FileText, color: '#00e5ff' },
  { title: 'DigiGuard Master Code Specification', file: 'DigiGuard_Master_Code_Specification.pdf', icon: FileText, color: '#39ff14' },
  { title: 'Supreme Constitution 2026', file: 'DOC-SUPREME-CONSTITUTION-2026.pdf', icon: Shield, color: '#fbbf24' },
  { title: 'Advanced Hardware Evaluation 2026', file: 'DOC-ADVANCED-HARDWARE-EVALUATION-2026.pdf', icon: Cpu, color: '#ef4444' },
];

const CONSTITUTION_ARTICLES = [
  { article: 1, title: 'Sovereignty', text: 'The user is the sovereign owner of their data. No processing occurs without explicit consent.', icon: Shield, color: '#00e5ff' },
  { article: 2, title: 'Anonymity', text: 'Ghost ID enables identity verification without exposing PII. Zero-knowledge proofs are mandatory.', icon: Fingerprint, color: '#a855f7' },
  { article: 3, title: 'Quantum Resistance', text: 'Dilithium + Kyber-1024 and AES-256-GCM are the minimum cryptographic standards.', icon: Lock, color: '#39ff14' },
  { article: 4, title: 'Asset Rights', text: 'Universal asset registration and smart contracts enforce automated royalty distribution.', icon: Award, color: '#f97316' },
  { article: 5, title: 'Defense', text: 'The PUKO cycle (Proactive, Warning, Protection, Recovery) governs all threat defense operations.', icon: Zap, color: '#ef4444' },
  { article: 6, title: 'Transformation', text: 'The full transformation protocol completes in 11 steps, achieving complete digital sovereignty.', icon: Network, color: '#fbbf24' },
];

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'whitepapers' | 'constitution'>('whitepapers');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border shadow-2xl"
        style={{ background: '#0a0f1e', borderColor: 'rgba(0,229,255,0.2)' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-5 border-b flex items-center justify-between"
          style={{ background: 'rgba(2,6,23,0.98)', borderColor: 'rgba(0,229,255,0.15)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}>
              <BookOpen className="h-6 w-6 text-cyber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Whitepaper & Constitution</h2>
              <p className="text-xs text-slate-400">Technical documentation and governance framework</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-4 border-b border-slate-800">
          <button
            onClick={() => setTab('whitepapers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'whitepapers' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            style={tab === 'whitepapers' ? { borderBottom: '2px solid #00e5ff' } : undefined}
          >
            <FileText className="h-4 w-4" />
            Whitepapers
          </button>
          <button
            onClick={() => setTab('constitution')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === 'constitution' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            style={tab === 'constitution' ? { borderBottom: '2px solid #a855f7' } : undefined}
          >
            <Shield className="h-4 w-4" />
            Constitution
          </button>
        </div>

        <div className="p-5">
          {tab === 'whitepapers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
              {WHITEPAPERS.map((wp) => {
                const Icon = wp.icon;
                return (
                  <a
                    key={wp.file}
                    href={`/documents/${wp.file}`}
                    download
                    className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] group"
                    style={{ background: `${wp.color}08`, borderColor: `${wp.color}20` }}
                  >
                    <div className="p-2.5 rounded-lg" style={{ background: `${wp.color}15`, border: `1px solid ${wp.color}30` }}>
                      <Icon className="h-5 w-5" style={{ color: wp.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{wp.title}</p>
                      <p className="text-[10px] text-slate-500 font-mono truncate">{wp.file}</p>
                    </div>
                    <Download className="h-4 w-4 text-slate-600 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          )}

          {tab === 'constitution' && (
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.05), rgba(0,229,255,0.03))', border: '1px solid rgba(168,85,247,0.2)' }}>
                <h3 className="text-sm font-bold text-white mb-1">Cerebro Protocol Constitution</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The constitutional governance framework defining the rights, obligations, and cryptographic mandates
                  for all participants in the DigiGuard & Cerebro ecosystem. 6 active articles governing sovereignty,
                  privacy, quantum resistance, asset rights, defense, and transformation.
                </p>
              </div>

              {CONSTITUTION_ARTICLES.map((art) => {
                const Icon = art.icon;
                return (
                  <div key={art.article} className="flex items-start gap-3 p-4 rounded-xl border" style={{ background: `${art.color}08`, borderColor: `${art.color}20` }}>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${art.color}15`, border: `1px solid ${art.color}30` }}>
                        <Icon className="h-5 w-5" style={{ color: art.color }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-slate-600">ARTICLE {art.article}</span>
                        <span className="text-sm font-bold text-white">{art.title}</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(57,255,20,0.1)', color: '#39ff14' }}>ACTIVE</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{art.text}</p>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2">
                <a
                  href="/documents/DOC-SUPREME-CONSTITUTION-2026.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7' }}
                >
                  <Download className="h-4 w-4" />
                  Download Full Constitution (PDF)
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 p-4 border-t flex items-center justify-between" style={{ background: 'rgba(2,6,23,0.95)', borderColor: 'rgba(0,229,255,0.1)' }}>
          <span className="text-[10px] text-slate-600 font-mono">Karprime Technology Inc. — All rights reserved.</span>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
