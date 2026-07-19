import React, { useState } from 'react';
import {
  User, Building2, ArrowRight, ArrowLeft, Mail, Phone, Lock, Ghost,
  Fingerprint, CheckCircle, Upload, FileText, Shield,
} from 'lucide-react';
import { generateGhostId, generateSponHash } from '../lib/crypto';

interface RegisterProps {
  onComplete: (email: string, phone: string, userType: 'individual' | 'corporate') => void;
  onBack: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onComplete, onBack }) => {
  const [userType, setUserType] = useState<'individual' | 'corporate' | ''>('');
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '',
    companyName: '', taxId: '', city: '',
  });
  const [ghostId, setGhostId] = useState('');
  const [sponHash, setSponHash] = useState('');

  const handleTypeSelect = (t: 'individual' | 'corporate') => {
    setUserType(t);
    setStep(1);
  };

  const handleComplete = () => {
    setGhostId(generateGhostId());
    setSponHash(generateSponHash());
    setStep(userType === 'individual' ? 3 : 2);
  };

  const finish = () => {
    onComplete(form.email, form.phone, userType as 'individual' | 'corporate');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 hex-grid">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">DigiGuard Kayit</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">Tam teşekküllü dönüşüm protokolü</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: userType === 'corporate' ? 3 : 4 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: step >= i ? 32 : 12,
                background: step >= i ? '#00e5ff' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        <div className="card p-6 cyber-border">
          {/* Step 0: User type */}
          {step === 0 && (
            <div className="space-y-3 animate-fade-in">
              <h2 className="text-sm font-semibold text-white mb-3">Hesap tipini secin</h2>
              <button
                onClick={() => handleTypeSelect('individual')}
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-cyber-500 transition group"
              >
                <User className="h-6 w-6 text-cyber-400" />
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-white">Bireysel</p>
                  <p className="text-xs text-slate-500">Kisi / Sanatci / Icerik ureticisi</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => handleTypeSelect('corporate')}
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-700 hover:border-ghost-500 transition group"
              >
                <Building2 className="h-6 w-6 text-ghost-400" />
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-white">Kurumsal</p>
                  <p className="text-xs text-slate-500">Sirket / STK / Kamu kurumu</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition" />
              </button>
            </div>
          )}

          {/* Step 1: Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-sm font-semibold text-white">
                {userType === 'individual' ? 'Kisisel bilgiler' : 'Sirket bilgileri'}
              </h2>

              {userType === 'individual' ? (
                <>
                  <Field label="Ad Soyad" icon={User} value={form.fullName}
                    onChange={(v) => setForm({ ...form, fullName: v })} placeholder="Ayse Yilmaz" />
                  <Field label="E-posta" icon={Mail} value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })} placeholder="ayse@digiwork.tr" type="email" />
                  <Field label="Telefon" icon={Phone} value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })} placeholder="+90 5xx xxx xx xx" />
                  <Field label="Sifre" icon={Lock} value={form.password}
                    onChange={(v) => setForm({ ...form, password: v })} placeholder="••••••••" type="password" />
                </>
              ) : (
                <>
                  <Field label="Sirket adi" icon={Building2} value={form.companyName}
                    onChange={(v) => setForm({ ...form, companyName: v })} placeholder="Digiwork A.S." />
                  <Field label="VKN / TCKN" icon={FileText} value={form.taxId}
                    onChange={(v) => setForm({ ...form, taxId: v })} placeholder="1234567890" />
                  <Field label="E-posta" icon={Mail} value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })} placeholder="info@sirket.tr" type="email" />
                  <Field label="Telefon" icon={Phone} value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })} placeholder="+90 2xx xxx xx xx" />
                  <Field label="Sehir" icon={User} value={form.city}
                    onChange={(v) => setForm({ ...form, city: v })} placeholder="Istanbul" />
                </>
              )}

              <div className="flex gap-2">
                <button onClick={() => setStep(0)} className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Geri
                </button>
                <button onClick={handleComplete} className="flex-1 btn-cyber rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
                  Devam <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 (corporate): Media */}
          {step === 2 && userType === 'corporate' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-sm font-semibold text-white">Belge yukle</h2>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Vergi levhasi, imza sirkusu (PDF/PNG)</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Geri
                </button>
                <button onClick={finish} className="flex-1 btn-cyber rounded-lg py-2.5 text-sm font-semibold">
                  Kaydi Tamamla
                </button>
              </div>
            </div>
          )}

          {/* Step 3 (individual): Media */}
          {step === 3 && userType === 'individual' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-sm font-semibold text-white">Medya dosyalari (opsiyonel)</h2>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Portre, sanat eseri, kimlik belgesi</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Geri
                </button>
                <button onClick={finish} className="flex-1 btn-cyber rounded-lg py-2.5 text-sm font-semibold">
                  Kaydi Tamamla
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ghost ID assignment */}
        {ghostId && (step === 3 || step === 2) && (
          <div className="mt-3 card p-4 ghost-border animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Ghost className="h-4 w-4 text-ghost-400" />
              <h3 className="text-sm font-bold text-white">Ghost ID / SPON Atamasi</h3>
              <CheckCircle className="h-4 w-4 text-matrix-400" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                <Ghost className="h-3.5 w-3.5 text-ghost-400" />
                <span className="text-[10px] text-slate-400 flex-1">Ghost ID</span>
                <span className="text-[10px] font-mono break-all text-ghost-400">{ghostId}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                <Fingerprint className="h-3.5 w-3.5 text-cyber-400" />
                <span className="text-[10px] text-slate-400 flex-1">SPON Hash</span>
                <span className="text-[10px] font-mono text-cyber-400">{sponHash}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Kimliginiz anonim olarak olusturuldu. PII verileri ifşa edilmez.
            </p>
          </div>
        )}

        <div className="mt-4 text-center">
          <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300">
            Giris ekranina don
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
          <Shield className="h-3 w-3" />
          <span>Dilithium+Kyber-1024 · AES-256-GCM · SHA-3-512</span>
        </div>
      </div>
    </div>
  );
};

const Field: React.FC<{
  label: string; icon: React.ElementType; value: string;
  onChange: (v: string) => void; placeholder: string; type?: string;
}> = ({ label, icon: Icon, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-600 focus:border-cyber-500 focus:outline-none transition"
      />
    </div>
  </div>
);
