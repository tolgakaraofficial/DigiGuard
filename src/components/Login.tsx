import React, { useState } from 'react';
import {
  Mail, Lock, ArrowRight, Eye, EyeOff, Shield, Fingerprint, Ghost,
  KeyRound, Wallet, Network, RefreshCw, CheckCircle, Zap, AlertCircle,
} from 'lucide-react';
import { generateGhostId as generateGhostID, generateSponHash } from '../lib/crypto';

interface LoginProps {
  onLogin: (email: string) => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [showGhost, setShowGhost] = useState(false);
  const [showWeb3, setShowWeb3] = useState(false);
  const [ghostId, setGhostId] = useState('');
  const [sponHash, setSponHash] = useState('');
  const [web3Connecting, setWeb3Connecting] = useState<string | null>(null);

  const handleGhost = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setGhostId(generateGhostID());
    setSponHash(generateSponHash());
  };

  const handleWeb3 = async (m: string) => {
    setWeb3Connecting(m);
    await new Promise((r) => setTimeout(r, 1200));
    setWeb3Connecting(null);
    onLogin(`web3:${m}`);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onLogin(email);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Ambient layers */}
      <div className="absolute inset-0 intro-aurora" />
      <div className="absolute inset-0 intro-grid" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-7 animate-fade-in">
          <div className="relative inline-block mb-4">
            <div className="intro-orb-glow" style={{ color: '#00e5ff' }} />
            <div className="intro-orb" style={{ width: 72, height: 72 }}>
              <div className="intro-orb-core" />
              <div className="intro-orb-ring" />
              <Shield className="relative h-8 w-8 text-white z-10" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">Secure Sign In</h1>
          <p className="text-xs text-slate-500 mt-1.5 font-mono tracking-wide">Post-Quantum Identity Authentication</p>
        </div>

        {/* Form card */}
        <form onSubmit={submit} className="card p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
            <div className="relative prem-input pl-10 pr-3 py-2.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@digiguard.io"
                className="w-full bg-transparent border-0 outline-none text-sm text-white placeholder-slate-600 focus:ring-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
            <div className="relative prem-input pl-10 pr-10 py-2.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-0 outline-none text-sm text-white placeholder-slate-600 focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-cyber rounded-xl py-3 font-display font-semibold text-sm flex items-center justify-center gap-2 tracking-wide"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="font-mono uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
        </form>

        {/* Ghost ID Panel */}
        <div className="mt-3 card p-4 ghost-border animate-fade-in">
          <button
            onClick={() => setShowGhost(!showGhost)}
            className="w-full flex items-center justify-between"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <Ghost className="h-4 w-4 text-ghost-400" />
              Sign In with Ghost ID
            </span>
            <ArrowRight className={`h-4 w-4 text-slate-500 transition-transform ${showGhost ? 'rotate-90' : ''}`} />
          </button>

          {showGhost && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Enter anonymously without exposing personal identifiable information.
              </p>
              {ghostId && (
                <div className="space-y-1 p-2.5 rounded-lg bg-slate-900/60">
                  <div className="text-[10px] font-mono break-all text-ghost-400">{ghostId}</div>
                  <div className="text-[10px] font-mono text-cyber-400">{sponHash}</div>
                </div>
              )}
              <button
                onClick={handleGhost}
                disabled={!!ghostId}
                className="w-full btn-ghost rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {ghostId ? (
                  <><CheckCircle className="h-3.5 w-3.5" /> Ghost ID Generated</>
                ) : (
                  <><RefreshCw className="h-3.5 w-3.5" /> Generate Ghost ID</>
                )}
              </button>
              {ghostId && (
                <button
                  onClick={() => onLogin(`ghost:${ghostId.slice(0, 10)}`)}
                  className="w-full btn-ghost rounded-lg py-2 text-xs font-semibold"
                >
                  Continue with Ghost ID
                </button>
              )}
            </div>
          )}
        </div>

        {/* Web3 Panel */}
        <div className="mt-3 card p-4 border border-orange-500/20 animate-fade-in">
          <button
            onClick={() => setShowWeb3(!showWeb3)}
            className="w-full flex items-center justify-between"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <Wallet className="h-4 w-4 text-orange-400" />
              Web3 Hybrid Sign In
            </span>
            <ArrowRight className={`h-4 w-4 text-slate-500 transition-transform ${showWeb3 ? 'rotate-90' : ''}`} />
          </button>

          {showWeb3 && (
            <div className="mt-3 space-y-2 animate-fade-in">
              {[
                { id: 'metamask', name: 'MetaMask', icon: Wallet, color: '#f7931a' },
                { id: 'walletconnect', name: 'WalletConnect', icon: Network, color: '#3b99fc' },
                { id: 'did', name: 'Web4 DID', icon: KeyRound, color: '#a855f7' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleWeb3(m.id)}
                  disabled={!!web3Connecting}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-600 transition disabled:opacity-50"
                >
                  <m.icon className="h-4 w-4" style={{ color: m.color }} />
                  <span className="text-sm text-white flex-1 text-left">{m.name}</span>
                  {web3Connecting === m.id ? (
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Security credentials */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: 'AES-256-GCM', icon: Lock, color: '#00e5ff' },
            { label: 'Dilithium+Kyber-1024', icon: KeyRound, color: '#a855f7' },
            { label: 'Ghost ID / SPON', icon: Ghost, color: '#a855f7' },
            { label: 'Biometric KYC', icon: Fingerprint, color: '#39ff14' },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-slate-900/50 border border-slate-800/60"
            >
              <b.icon className="h-3 w-3" style={{ color: b.color }} />
              <span className="text-[10px] text-slate-400 font-mono">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-5 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-cyber-400 hover:text-cyber-300 font-semibold transition">
            Create One
          </button>
        </div>

        <div className="mt-2 text-center">
          <a href="/admin" className="inline-flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-300 transition">
            <Shield className="h-3 w-3" />
            Admin Console
          </a>
        </div>

        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-blue-900/15 border border-blue-500/15">
          <AlertCircle className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-200/70 leading-relaxed">
            <Zap className="inline h-3 w-3" /> Demo mode: sign in with any email and password.
          </p>
        </div>
      </div>
    </div>
  );
};
