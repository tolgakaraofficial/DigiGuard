import React, { useState, useEffect } from 'react';
import {
  Lock, Fingerprint, Shield, Cpu, Zap, CheckCircle, KeyRound,
  Activity, AlertTriangle, RefreshCw, Copy, Eye, EyeOff,
} from 'lucide-react';
import { generateGhostId, generateSponHash, generateHex, pqcSign } from '../lib/crypto';

type ProofState = 'idle' | 'generating' | 'verifying' | 'verified';

export const QuantumShieldPanel: React.FC = () => {
  const [proofState, setProofState] = useState<ProofState>('idle');
  const [proofData, setProofData] = useState<{ ghostId: string; sponHash: string; signature: string; proofHash: string; verifyTime: number } | null>(null);
  const [shorProgress, setShorProgress] = useState(0);
  const [groverProgress, setGroverProgress] = useState(0);
  const [kyberActive, setKyberActive] = useState(true);
  const [dilithiumActive, setDilithiumActive] = useState(true);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setShorProgress((p) => Math.min(2, p + Math.random() * 0.3));
      setGroverProgress((p) => Math.min(1.5, p + Math.random() * 0.2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (shorProgress >= 2) setTimeout(() => setShorProgress(0), 500);
    if (groverProgress >= 1.5) setTimeout(() => setGroverProgress(0), 500);
  }, [shorProgress, groverProgress]);

  const generateProof = () => {
    setProofState('generating');
    setTimeout(() => {
      const ghostId = generateGhostId();
      const sponHash = generateSponHash();
      const proofHash = `0x${generateHex(64)}`;
      const signature = pqcSign(ghostId + sponHash);
      setProofData({ ghostId, sponHash, signature, proofHash, verifyTime: 8 + Math.random() * 3 });
      setProofState('verifying');
      setTimeout(() => setProofState('verified'), 800);
    }, 1200);
  };

  const reset = () => {
    setProofState('idle');
    setProofData(null);
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1500);
  };

  const cryptoStandards = [
    { name: 'CRYSTALS-Kyber', type: 'Key Encapsulation', status: kyberActive, color: '#00e5ff', icon: KeyRound, detail: 'Lattice-based · NIST PQC · 256-bit security' },
    { name: 'CRYSTALS-Dilithium', type: 'Digital Signatures', status: dilithiumActive, color: '#39ff14', icon: Lock, detail: 'Lattice-based · NIST PQC · Level V' },
    { name: 'AES-256-GCM', type: 'Symmetric Encryption', status: true, color: '#a855f7', icon: Shield, detail: 'Expanded key schedule · Quantum-hardened' },
    { name: 'zk-SNARK Circuits', type: 'Zero-Knowledge Proofs', status: true, color: '#fbbf24', icon: Fingerprint, detail: 'Ghost ID protocol · < 12ms verification' },
  ];

  const threatDefenses = [
    { algorithm: "Shor's Algorithm", threat: 'Breaks RSA/ECC in polynomial time', defense: 'Lattice-based KEM (Kyber-1024)', progress: shorProgress, maxProgress: 2, color: '#ef4444' },
    { algorithm: "Grover's Algorithm", threat: 'Halves symmetric key strength', defense: 'Expanded AES-256 key schedules', progress: groverProgress, maxProgress: 1.5, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-matrix-400" />
        <h2 className="text-lg font-bold text-white">Post-Quantum Cryptographic Shield & Ghost ID Monitor</h2>
      </div>

      {/* Crypto Standards */}
      <div className="card p-4 matrix-border">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-matrix-400" />
          Active Cryptographic Standards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cryptoStandards.map((cs) => {
            const Icon = cs.icon;
            return (
              <div key={cs.name} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg" style={{ background: `${cs.color}15`, border: `1px solid ${cs.color}30` }}>
                  <Icon className="h-4 w-4" style={{ color: cs.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{cs.name}</span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: `${cs.color}15`, color: cs.color }}>
                      {cs.status ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{cs.type}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5 font-mono">{cs.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quantum Threat Defense */}
      <div className="card p-4 border border-red-500/20">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          Quantum Threat Mitigation
        </h3>
        <div className="space-y-3">
          {threatDefenses.map((td) => (
            <div key={td.algorithm} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-bold text-white">{td.algorithm}</p>
                  <p className="text-[10px] text-slate-500">{td.threat}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono" style={{ color: td.color }}>ATTACK PROGRESS</p>
                  <p className="text-sm font-bold" style={{ color: td.color }}>{((td.progress / td.maxProgress) * 100).toFixed(1)}%</p>
                </div>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(td.progress / td.maxProgress) * 100}%`, background: td.color }} />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-matrix-400" />
                <span className="text-[11px] text-matrix-400 font-mono">BLOCKED: {td.defense}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ghost ID ZKP Simulator */}
      <div className="card p-5 ghost-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-ghost-400" />
            Ghost ID & Zero-Knowledge Proof Simulator
          </h3>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
            <Activity className="h-3 w-3 text-ghost-400" />
            <span className="text-[9px] font-mono text-slate-400">SERVERLESS · ANONYMOUS</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Generate a cryptographically verifiable identity proof without exposing any personally identifiable information.
          The ZK-SNARK circuit confirms credential validity while preserving absolute anonymity.
        </p>

        {proofState === 'idle' && (
          <button
            onClick={generateProof}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-ghost font-semibold text-sm"
          >
            <Zap className="h-4 w-4" />
            Generate & Verify ZK-Proof
          </button>
        )}

        {proofState === 'generating' && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 py-3 text-ghost-400">
              <div className="w-4 h-4 border-2 border-ghost-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-mono">Generating ZK-SNARK witness...</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full animate-pulse" style={{ width: '60%', background: 'linear-gradient(90deg, #a855f7, #00e5ff)' }} />
            </div>
          </div>
        )}

        {proofState === 'verifying' && (
          <div className="flex items-center justify-center gap-2 py-3 text-cyber-400">
            <div className="w-4 h-4 border-2 border-cyber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono">Verifying proof via ALBIS-3...</span>
          </div>
        )}

        {proofState === 'verified' && proofData && (
          <div className="space-y-3 animate-fade-in">
            {/* Verified badge */}
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(57,255,20,0.1)', border: '1px solid rgba(57,255,20,0.3)' }}>
                <CheckCircle className="h-5 w-5 text-matrix-400" />
                <span className="text-sm font-bold text-matrix-400">VERIFIED</span>
                <span className="text-[10px] text-slate-500 font-mono ml-2">in {proofData.verifyTime.toFixed(1)}ms</span>
              </div>
            </div>

            {/* Proof hashes */}
            <div className="space-y-2">
              <HashField label="Ghost ID" value={proofData.ghostId} color="#a855f7" copied={copied} onCopy={copy} id="ghost" />
              <HashField label="SPON Hash" value={proofData.sponHash} color="#00e5ff" copied={copied} onCopy={copy} id="spon" />
              <HashField label="PQC Signature" value={proofData.signature} color="#39ff14" copied={copied} onCopy={copy} id="sig" />
              <HashField label="Proof Hash" value={proofData.proofHash} color="#fbbf24" copied={copied} onCopy={copy} id="proof" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <p className="text-[8px] text-slate-600 uppercase">VERIFY TIME</p>
                <p className="text-sm font-mono font-bold text-matrix-400">{proofData.verifyTime.toFixed(1)}ms</p>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <p className="text-[8px] text-slate-600 uppercase">PII EXPOSED</p>
                <p className="text-sm font-mono font-bold text-matrix-400">ZERO</p>
              </div>
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2 text-center">
                <p className="text-[8px] text-slate-600 uppercase">CIRCUIT</p>
                <p className="text-sm font-mono font-bold text-ghost-400">zk-SNARK</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition text-xs font-semibold"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Generate New Proof
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const HashField: React.FC<{ label: string; value: string; color: string; copied: string; onCopy: (text: string, id: string) => void; id: string }> = ({ label, value, color, copied, onCopy, id }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
      <span className="text-[10px] text-slate-500 w-24 flex-shrink-0">{label}</span>
      <span className="text-[10px] font-mono break-all flex-1" style={{ color: show ? color : '#475569' }}>
        {show ? value : `${value.slice(0, 10)}••••••••••••••••••••`}
      </span>
      <button onClick={() => setShow(!show)} className="text-slate-500 hover:text-slate-300 flex-shrink-0">
        {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
      <button onClick={() => onCopy(value, id)} className="text-slate-500 hover:text-white flex-shrink-0">
        {copied === id ? <CheckCircle className="h-3.5 w-3.5 text-matrix-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};
