import React, { useState } from 'react';
import {
  Mail, Github, Linkedin, Youtube, FileText, Award, X,
  Shield, Cpu, Network, Lock, Zap, Globe, Building2, GraduationCap,
  ExternalLink, Download, CheckCircle, TrendingUp, BookOpen, Fingerprint,
} from 'lucide-react';

const CONTACT_LINKS = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:tlgkr66@gmail.com',
    icon: Mail,
    color: '#00e5ff',
    hoverBg: 'rgba(0,229,255,0.15)',
    hoverBorder: 'rgba(0,229,255,0.5)',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/tolgakaraofficial',
    icon: Github,
    color: '#e2e8f0',
    hoverBg: 'rgba(226,232,240,0.12)',
    hoverBorder: 'rgba(226,232,240,0.4)',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tolga-kara-53b953323/',
    icon: Linkedin,
    color: '#38bdf8',
    hoverBg: 'rgba(56,189,248,0.15)',
    hoverBorder: 'rgba(56,189,248,0.5)',
  },
  {
    id: 'medium',
    label: 'Medium',
    href: 'https://medium.com/@tolgakaraofficiall',
    icon: BookOpen,
    color: '#f59e0b',
    hoverBg: 'rgba(245,158,11,0.15)',
    hoverBorder: 'rgba(245,158,11,0.5)',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@karprimetechnology',
    icon: Youtube,
    color: '#ef4444',
    hoverBg: 'rgba(239,68,68,0.15)',
    hoverBorder: 'rgba(239,68,68,0.5)',
  },
];

interface FounderProfileBarProps {
  variant?: 'header' | 'compact';
  onOpenCV?: () => void;
}

export const FounderProfileBar: React.FC<FounderProfileBarProps> = ({ variant = 'header', onOpenCV }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        {CONTACT_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 text-[11px] font-medium"
              style={{
                background: hovered === link.id ? link.hoverBg : 'rgba(15,23,42,0.6)',
                border: `1px solid ${hovered === link.id ? link.hoverBorder : 'rgba(51,65,85,0.5)'}`,
                color: hovered === link.id ? link.color : '#94a3b8',
              }}
              onMouseEnter={() => setHovered(link.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: link.color }} />
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          );
        })}
        {onOpenCV && (
          <button
            onClick={onOpenCV}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 text-[11px] font-bold"
            style={{
              background: hovered === 'cv' ? 'rgba(57,255,20,0.15)' : 'rgba(15,23,42,0.6)',
              border: `1px solid ${hovered === 'cv' ? 'rgba(57,255,20,0.5)' : 'rgba(51,65,85,0.5)'}`,
              color: hovered === 'cv' ? '#39ff14' : '#94a3b8',
            }}
            onMouseEnter={() => setHovered('cv')}
            onMouseLeave={() => setHovered(null)}
          >
            <Award className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />
            <span className="hidden sm:inline">CV</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {CONTACT_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 relative overflow-hidden"
            style={{
              background: hovered === link.id ? link.hoverBg : 'rgba(2,6,23,0.6)',
              border: `1px solid ${hovered === link.id ? link.hoverBorder : 'rgba(51,65,85,0.4)'}`,
            }}
            onMouseEnter={() => setHovered(link.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle at center, ${link.color}15, transparent 70%)` }}
            />
            <Icon className="h-4 w-4 relative z-10 transition-transform group-hover:scale-110" style={{ color: link.color }} />
            <span
              className="text-xs font-semibold relative z-10 transition-colors"
              style={{ color: hovered === link.id ? link.color : '#94a3b8' }}
            >
              {link.label}
            </span>
          </a>
        );
      })}
      {onOpenCV && (
        <button
          onClick={onOpenCV}
          className="group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 relative overflow-hidden"
          style={{
            background: hovered === 'cv' ? 'rgba(57,255,20,0.12)' : 'rgba(2,6,23,0.6)',
            border: `1px solid ${hovered === 'cv' ? 'rgba(57,255,20,0.5)' : 'rgba(51,65,85,0.4)'}`,
          }}
          onMouseEnter={() => setHovered('cv')}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'radial-gradient(circle at center, rgba(57,255,20,0.12), transparent 70%)' }}
          />
          <Award className="h-4 w-4 relative z-10 transition-transform group-hover:scale-110" style={{ color: '#39ff14' }} />
          <span
            className="text-xs font-bold relative z-10 transition-colors"
            style={{ color: hovered === 'cv' ? '#39ff14' : '#94a3b8' }}
          >
            Founder CV
          </span>
        </button>
      )}
    </div>
  );
};

/* ---------- Full CV Modal ---------- */

const CV_SECTIONS = [
  {
    icon: Shield,
    title: 'Vision & Mission',
    color: '#00e5ff',
    content: `DigiGuard & Cerebro Protocol is the culmination of years of research into post-quantum cybersecurity, decentralized identity, and sovereign digital infrastructure. The mission is clear: to provide nations, institutions, and individuals with a cryptographic identity framework that remains unbreakable even in the quantum era — while preserving absolute privacy through Zero-Knowledge Proofs.`,
  },
  {
    icon: Cpu,
    title: 'Architectural Achievements',
    color: '#39ff14',
    bullets: [
      'Designed and specified the ALBIS Engine — a 6-module post-quantum cryptographic pipeline (ALBIS-1 through ALBIS-6)',
      'Architected the Ghost ID Zero-Knowledge identity protocol for passwordless, document-free authentication',
      'Engineered the Sovereign Bridge DAG topology for parallel, miner-free, asynchronous consensus',
      'Implemented the Cerebro Sentinel AI defense system using the PUKO cycle (Proactive, Warning, Protection, Recovery)',
      'Specified lattice-based cryptographic primitives (Kyber-1024, Dilithium) resistant to Shor\'s and Grover\'s quantum algorithms',
    ],
  },
  {
    icon: Network,
    title: 'Mathematical & Cryptographic Foundation',
    color: '#a855f7',
    bullets: [
      'Post-Quantum Key Encapsulation using lattice-based CRYSTALS-Kyber (NIST PQC standard)',
      'Quantum-resistant digital signatures via CRYSTALS-Dilithium (NIST PQC standard)',
      'Zero-Knowledge Proof circuits for privacy-preserving identity verification (zk-SNARKs)',
      'DAG-based consensus with O(n log n) tip selection complexity',
      'AES-256-GCM symmetric encryption with expanded key schedules for quantum resistance',
      'Forensic watermarking using lattice-based integrity seals for tamper-proof asset verification',
    ],
  },
  {
    icon: Globe,
    title: 'Institutional & Strategic Impact',
    color: '#f59e0b',
    bullets: [
      'Designed for national-scale digital identity infrastructure for governments and public institutions',
      'KVKK, GDPR, and ISO 27001 compliant architecture for enterprise and regulatory adoption',
      'Web3/Web4/Web5 integration framework for cross-platform decentralized identity portability',
      'Hybrid wallet infrastructure supporting both cryptographic tokens (DGU, CLB) and traditional crypto assets (BTC, ETH)',
      'Marketplace ecosystem with quantum-secured digital asset trading and certificate issuance',
    ],
  },
  {
    icon: BookOpen,
    title: 'Research & Publications',
    color: '#38bdf8',
    bullets: [
      '18-volume Cerebro Constitution — comprehensive governance and constitutional framework',
      'DigiGuard Master Specification — complete architectural blueprint',
      'Post-Quantum Cryptographic Integration Blueprint',
      'Cerebro Network Universal Language Specification',
      'Quantum Integration Architecture Whitepaper',
      'Digital Identity Bridge Framework for National KYC Systems',
      'Published technical articles on Medium covering cybersecurity, quantum threats, and decentralized identity',
    ],
  },
];

const METRICS = [
  { label: 'ALBIS Modules', value: '6', icon: Cpu, color: '#39ff14' },
  { label: 'Constitution Volumes', value: '18', icon: BookOpen, color: '#00e5ff' },
  { label: 'Crypto Standards', value: 'NIST PQC', icon: Lock, color: '#a855f7' },
  { label: 'Compliance', value: 'ISO/KVKK/GDPR', icon: Shield, color: '#f59e0b' },
];

interface FounderCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FounderCVModal: React.FC<FounderCVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto border shadow-2xl"
        style={{ background: '#0a0f1e', borderColor: 'rgba(0,229,255,0.2)' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-6 border-b"
          style={{
            background: 'linear-gradient(135deg, rgba(2,6,23,0.98), rgba(10,15,30,0.98))',
            borderColor: 'rgba(0,229,255,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl relative"
                style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(57,255,20,0.1))', border: '1px solid rgba(0,229,255,0.3)' }}
              >
                <div className="absolute inset-0 rounded-xl blur-lg" style={{ background: 'rgba(0,229,255,0.1)' }} />
                <Shield className="h-7 w-7 relative z-10" style={{ color: '#00e5ff' }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Founder & Lead Architect CV</h2>
                <p className="text-sm text-slate-400 mt-0.5">Professional Profile — Investor & Institutional Relations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Identity Card */}
          <div
            className="rounded-xl p-6 border"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(57,255,20,0.03))',
              borderColor: 'rgba(0,229,255,0.2)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
                  style={{ background: 'linear-gradient(135deg, #0a0f1e, #1a1f3e)', border: '2px solid rgba(0,229,255,0.3)' }}
                >
                  <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: 'rgba(0,229,255,0.1)' }} />
                  <Fingerprint className="h-12 w-12 relative z-10" style={{ color: '#00e5ff' }} />
                </div>
              </div>

              {/* Identity */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">Tolga Kara</h3>
                <p className="text-sm font-mono mt-1" style={{ color: '#39ff14' }}>
                  Lead Architect · Founder · Karprime Technology Inc.
                </p>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  Post-quantum cybersecurity architect and decentralized identity pioneer. Creator of the
                  DigiGuard & Cerebro Protocol — a serverless, quantum-resistant digital sovereignty framework
                  designed for nations, enterprises, and individuals navigating the post-quantum threat landscape.
                </p>

                {/* Contact buttons */}
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  {CONTACT_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 text-xs font-semibold hover:scale-105"
                        style={{
                          background: `${link.color}10`,
                          border: `1px solid ${link.color}30`,
                          color: link.color,
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {METRICS.map((m) => {
              const MIcon = m.icon;
              return (
                <div
                  key={m.label}
                  className="rounded-xl p-4 border text-center"
                  style={{ background: `${m.color}08`, borderColor: `${m.color}20` }}
                >
                  <MIcon className="h-5 w-5 mx-auto mb-2" style={{ color: m.color }} />
                  <p className="text-lg font-bold text-white font-mono">{m.value}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              );
            })}
          </div>

          {/* CV Sections */}
          {CV_SECTIONS.map((section, idx) => {
            const SIcon = section.icon;
            return (
              <div
                key={idx}
                className="rounded-xl p-5 border"
                style={{ background: 'rgba(10,15,30,0.6)', borderColor: `${section.color}20` }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: `${section.color}15`, border: `1px solid ${section.color}30` }}>
                    <SIcon className="h-4 w-4" style={{ color: section.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">{section.title}</h3>
                </div>

                {section.content && (
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">{section.content}</p>
                )}

                {section.bullets && (
                  <ul className="space-y-2">
                    {section.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: section.color }} />
                        <span className="text-sm text-slate-300 leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Institution */}
          <div
            className="rounded-xl p-6 border"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.05), rgba(168,85,247,0.03))',
              borderColor: 'rgba(0,229,255,0.2)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5" style={{ color: '#00e5ff' }} />
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">Institution — Karprime Technology Inc.</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Karprime Technology Inc. is the institutional home of the DigiGuard & Cerebro Protocol. Under the
              leadership of Founder and Lead Architect Tolga Kara, the organization drives research, development,
              and deployment of post-quantum cybersecurity infrastructure for governments, enterprises, and
              individuals worldwide. The Karprime Technology Academy serves as the educational arm, producing
              technical content and training the next generation of quantum-aware security engineers.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(0,229,255,0.05)' }}>
                <TrendingUp className="h-4 w-4" style={{ color: '#39ff14' }} />
                <span className="text-xs text-slate-300">Active Beta — 6-phase development roadmap in progress</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg" style={{ background: 'rgba(57,255,20,0.05)' }}>
                <Zap className="h-4 w-4" style={{ color: '#f59e0b' }} />
                <span className="text-xs text-slate-300">Open to investor relations and strategic partnerships</span>
              </div>
            </div>
          </div>

          {/* Download CV */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              <span className="text-xs text-slate-500">Detailed CV available in PDF format</span>
            </div>
            <a
              href="/Tolga_Kara_CV.pdf"
              download
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(57,255,20,0.1))',
                border: '1px solid rgba(0,229,255,0.3)',
                color: '#00e5ff',
              }}
            >
              <Download className="h-4 w-4" />
              Download Full CV (PDF)
            </a>
          </div>
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 p-4 border-t flex items-center justify-between"
          style={{ background: 'rgba(2,6,23,0.95)', borderColor: 'rgba(0,229,255,0.1)', backdropFilter: 'blur(10px)' }}
        >
          <span className="text-[10px] text-slate-600 font-mono">
            © 2024 Karprime Technology Inc. — All rights reserved.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
