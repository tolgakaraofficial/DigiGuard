import React, { useState } from 'react';
import {
  FileText, Globe, CheckCircle, ChevronDown, ChevronUp, Shield,
  Lock, Scale, ArrowRight, ArrowLeft, Building2, User,
} from 'lucide-react';

interface DigitalContractProps {
  userType: 'individual' | 'corporate';
  onAccept: () => void;
  onBack: () => void;
}

const countries = [
  {
    code: 'CH', name: 'Isvicre', nameEn: 'Switzerland',
    law: 'Crypto Valley Zug - Blockchain Act',
    desc: 'Dijital varliklar ve blockchain tabanli kimlik sistemleri icin dunya lideri hukuk cercevesi',
  },
  {
    code: 'SG', name: 'Singapur', nameEn: 'Singapore',
    law: 'Smart Nation Initiative - Digital Identity Act',
    desc: 'Asya-Pasifik dijital kimlik ve veri koruma merkezi, PDPA uyumlu',
  },
  {
    code: 'EE', name: 'Estonya', nameEn: 'Estonia',
    law: 'e-Residency Program - Digital Identity Law',
    desc: 'Dunyanin ilk dijital vatandaslik programi, X-Road altyapisi ile guvenli kimlik',
  },
  {
    code: 'TR', name: 'Turkiye', nameEn: 'Turkey',
    law: 'KVKK - Kişisel Verilerin Korunması Kanunu',
    desc: 'Turkiye dijital kimlik koruma ve veri isleme mevzuati',
  },
  {
    code: 'EU', name: 'Avrupa Birligi', nameEn: 'European Union',
    law: 'GDPR - General Data Protection Regulation',
    desc: 'AB genel veri koruma regulasyonu, dijital kimlik haklari',
  },
  {
    code: 'US', name: 'ABD', nameEn: 'United States',
    law: 'CCPA / State Privacy Laws',
    desc: 'Amerika Birlilik Devletleri eyalet bazli veri koruma kanunlari',
  },
];

export const DigitalContract: React.FC<DigitalContractProps> = ({ userType, onAccept, onBack }) => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [acceptedCountries, setAcceptedCountries] = useState<Set<string>>(new Set());
  const [allAccepted, setAllAccepted] = useState(false);
  const [processing, setProcessing] = useState(false);

  const toggleCountry = (code: string) => {
    setExpandedCountry(expandedCountry === code ? null : code);
  };

  const toggleAccept = (code: string) => {
    const next = new Set(acceptedCountries);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setAcceptedCountries(next);
    setAllAccepted(next.size === countries.length);
  };

  const handleFinalAccept = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setProcessing(false);
    onAccept();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 hex-grid">
      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl cyber-border cyber-glow mb-3">
            <Scale className="h-8 w-8 text-cyber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Kuresel Dijital Sozlesme</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            {userType === 'individual' ? 'Bireysel' : 'Kurumsal'} uyelik - Uluslararasi dijital hukuk sozlesmesi
          </p>
        </div>

        {/* User type badge */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${userType === 'individual' ? 'bg-cyber-900/30 border-cyber-500/30 text-cyber-300' : 'bg-purple-900/30 border-purple-500/30 text-purple-300'}`}>
            {userType === 'individual' ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
            <span className="text-sm font-semibold">{userType === 'individual' ? 'Bireysel Uyelik' : 'Kurumsal Uyelik'}</span>
          </div>
        </div>

        {/* Contract info banner */}
        <div className="mb-4 p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-200/80 leading-relaxed">
              <p className="font-semibold text-blue-300 mb-1">Cok Uluslu Dijital Kimlik Sozlesmesi</p>
              <p>
                DigiGuard & Cerebro Network, dunyanin farkli ulkelerindeki dijital hukuk sistemleriyle uyumlu calisir.
                Asagidaki ulkelerin dijital hukuk sozlesmelerini kabul etmeniz gerekmektedir.
                Bu sozlesmeler, kimlik verilerinizin korunmasi ve dijital haklarinizin guvence altina alinmasi icin hazirlanmistir.
              </p>
            </div>
          </div>
        </div>

        {/* Countries list */}
        <div className="card p-6 cyber-border space-y-3">
          {countries.map((country) => {
            const expanded = expandedCountry === country.code;
            const accepted = acceptedCountries.has(country.code);
            return (
              <div key={country.code} className={`rounded-xl border transition-all ${accepted ? 'border-matrix-500/40 bg-matrix-900/10' : 'border-slate-700 bg-slate-900/40'}`}>
                {/* Country header */}
                <div className="flex items-center gap-3 p-3">
                  <button
                    onClick={() => toggleCountry(country.code)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 ${accepted ? 'bg-matrix-900/40' : 'bg-slate-800'}`}>
                      {accepted ? (
                        <CheckCircle className="h-4 w-4 text-matrix-400" />
                      ) : (
                        <FileText className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{country.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-slate-800">{country.code}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{country.law}</p>
                    </div>
                    {expanded ? <ChevronUp className="h-4 w-4 text-slate-500" /> : <ChevronDown className="h-4 w-4 text-slate-500" />}
                  </button>

                  {/* Accept checkbox */}
                  <button
                    onClick={() => toggleAccept(country.code)}
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      accepted ? 'bg-matrix-500 border-matrix-500' : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    {accepted && <CheckCircle className="h-4 w-4 text-white" />}
                  </button>
                </div>

                {/* Expanded content */}
                {expanded && (
                  <div className="px-3 pb-3 animate-fade-in">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-3.5 w-3.5 text-cyber-400" />
                        <span className="text-xs font-semibold text-cyber-300">{country.law}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{country.desc}</p>

                      {/* Contract terms */}
                      <div className="space-y-1.5">
                        {userType === 'individual' ? [
                          'Kimlik verilerimin AES-256 ile sifrelenerek saklanmasini kabul ediyorum',
                          'Ghost ID / SPON anonim kimlik sistemini kabul ediyorum',
                          'Biyometrik verilerimin blockchain uzerinde guvenli saklanmasini onayliyorum',
                          `${country.name} dijital hukuk mevzuatina uymayi kabul ediyorum`,
                          'Veri ihlali durumunda ilgili mercilere bildirim yapilmasini onayliyorum',
                        ] : [
                          'Sirket verilerinin AES-256 ile sifrelenerek saklanmasini kabul ediyorum',
                          'Kurumsal Ghost ID / SPON anonim kimlik sistemini kabul ediyorum',
                          'Sirket yetkilisi biyometrik verilerinin guvenli saklanmasini onayliyorum',
                          `${country.name} sirket dijital hukuk mevzuatina uymayi kabul ediyorum`,
                          'KVKK/GDPR kapsaminda veri isleme onayi veriyorum',
                        ].map((term, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] text-slate-500">
                            <CheckCircle className={`h-3 w-3 mt-0.5 flex-shrink-0 ${accepted ? 'text-matrix-400' : 'text-slate-600'}`} />
                            <span>{term}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Progress */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-500 font-mono">
                {acceptedCountries.size} / {countries.length} ulke kabul edildi
              </span>
              <span className="text-[10px] font-mono" style={{ color: allAccepted ? '#39ff14' : '#f59e0b' }}>
                {allAccepted ? 'TAMAM' : `${Math.round((acceptedCountries.size / countries.length) * 100)}%`}
              </span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(acceptedCountries.size / countries.length) * 100}%`,
                  background: allAccepted ? 'linear-gradient(90deg, #39ff14, #00e5ff)' : 'linear-gradient(90deg, #f59e0b, #f97316)',
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button onClick={onBack} className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium flex items-center gap-2 hover:bg-slate-700 transition">
              <ArrowLeft className="h-4 w-4" /> Geri
            </button>
            <button
              onClick={handleFinalAccept}
              disabled={!allAccepted || processing}
              className="flex-1 btn-cyber rounded-lg py-2.5 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sozlesme Islemleniyor...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  Tum Sozlesmeleri Kabul Et ve Devam Et
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Security badges */}
        <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-slate-600">
          <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> AES-256-GCM</span>
          <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> KVKK / GDPR</span>
          <span className="flex items-center gap-1"><Scale className="h-3 w-3" /> ISO 27001</span>
        </div>
      </div>
    </div>
  );
};
