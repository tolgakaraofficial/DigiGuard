import React, { useState } from 'react';
import {
  Mail, Lock, ArrowRight, Eye, EyeOff, Shield, Fingerprint, Ghost,
  KeyRound, Wallet, Network, RefreshCw, CheckCircle, Zap, AlertCircle,
} from 'lucide-react';
import { generateGhostId, generateSponHash } from '../lib/crypto';

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
    setGhostId(generateGhostId());
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
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 hex-grid relative">
      <div className="scanline" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex p-3 rounded-2xl cyber-border cyber-glow mb-3">
            <Shield className="h-8 w-8 text-cyber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">DigiGuard Giris</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Kuantum sonrasi kimlik dogrulama</p>
        </div>

        <form onSubmit={submit} className="card p-6 space-y-4 cyber-border">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">E-posta</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kullanici@digiwork.tr"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyber-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Sifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyber-500 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-cyber rounded-lg py-2.5 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <span>Giris Yap</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <div className="flex-1 h-px bg-slate-800" />
            <span>VEYA</span>
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
              Ghost ID / SPON ile Giris
            </span>
            <ArrowRight className={`h-4 w-4 text-slate-500 transition-transform ${showGhost ? 'rotate-90' : ''}`} />
          </button>

          {showGhost && (
            <div className="mt-3 space-y-2 animate-fade-in">
              <p className="text-[10px] text-slate-500">
                Anonim kimlik ile PII ifşa etmeden giris yapin.
              </p>
              {ghostId && (
                <div className="space-y-1 p-2 rounded bg-slate-900/60">
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
                  <><CheckCircle className="h-3.5 w-3.5" /> Ghost ID Olusturuldu</>
                ) : (
                  <><RefreshCw className="h-3.5 w-3.5" /> Ghost ID Olustur</>
                )}
              </button>
              {ghostId && (
                <button
                  onClick={() => onLogin(`ghost:${ghostId.slice(0, 10)}`)}
                  className="w-full btn-ghost rounded-lg py-2 text-xs font-semibold"
                >
                  Ghost ID ile Devam Et
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
              Web3 Hibrit Giris
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
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-slate-600 transition disabled:opacity-50"
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

        {/* Security badges */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { label: 'AES-256-GCM', icon: Lock, color: '#00e5ff' },
            { label: 'Dilithium+Kyber-1024', icon: KeyRound, color: '#a855f7' },
            { label: 'Ghost ID / SPON', icon: Ghost, color: '#a855f7' },
            { label: 'Biyometrik KYC', icon: Fingerprint, color: '#39ff14' },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800"
            >
              <b.icon className="h-3 w-3" style={{ color: b.color }} />
              <span className="text-[10px] text-slate-400">{b.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-xs text-slate-500">
          Hesabiniz yok mu?{' '}
          <button onClick={onSwitchToRegister} className="text-cyber-400 hover:text-cyber-300 font-semibold">
            Kayit Ol
          </button>
        </div>

        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-blue-900/20 border border-blue-500/20">
          <AlertCircle className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-200/80 leading-relaxed">
            <Zap className="inline h-3 w-3" /> Demo modu: herhangi bir e-posta/sifre ile giris yapabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};
