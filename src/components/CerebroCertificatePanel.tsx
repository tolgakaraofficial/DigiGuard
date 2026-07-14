import React, { useState } from 'react';
import {
  Award, Download, Share2, Shield, CheckCircle,
  Fingerprint, Database, Lock, Eye, Copy,
  Sparkles, X, QrCode, Network
} from 'lucide-react';

interface CertificateData {
  cerebroId: string;
  userName: string;
  userType: string;
  registrationDate: string;
  blockchainHash: string;
  dNftTokenId: string;
  network: string;
  kycScore: number;
}

export const CerebroCertificatePanel: React.FC<{ language?: string }> = ({ language = 'tr' }) => {
  const [showCert, setShowCert] = useState(false);

  const certData: CertificateData = {
    cerebroId: 'DG-IND-2026-04827',
    userName: 'Tolga Kara',
    userType: 'BIREYSEL',
    registrationDate: '2026-03-15',
    blockchainHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    dNftTokenId: '#DG-04827',
    network: 'Ethereum + Cerebro Chain',
    kycScore: 98,
  };

  return (
    <>
      <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-cyber-500/30 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-500 to-matrix-500 rounded-lg blur-md opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-cyber-600 to-matrix-600 p-3 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Cerebro Sertifika Sistemi</h2>
              <p className="text-xs text-slate-400">dNFT Tabanli Kimlik Sertifikasi</p>
            </div>
          </div>
          <span className="flex items-center gap-1 px-3 py-1.5 bg-matrix-600/20 text-matrix-300 text-xs rounded-full border border-matrix-500/40 font-semibold">
            <Sparkles className="h-3 w-3" /> dNFT MINTED
          </span>
        </div>

        {/* Certificate Preview Card */}
        <div
          onClick={() => setShowCert(true)}
          className="relative cursor-pointer group rounded-2xl overflow-hidden border border-cyber-500/40 hover:border-cyber-500/60 transition-all hover:shadow-2xl hover:shadow-cyber-500/20 hover:scale-[1.01]"
          style={{ aspectRatio: '1.586/1' }}
        >
          <div className="bg-[#0a1220] w-full h-full flex flex-col relative">
            {/* Holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 via-transparent to-matrix-500/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-matrix-500/5 rounded-full blur-3xl" />

            {/* Top bar */}
            <div className="h-1 bg-gradient-to-r from-cyber-500 via-matrix-500 to-secure-500" />

            {/* Header */}
            <div className="px-5 py-3 flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-500 to-matrix-500 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-base leading-tight">DigiGuard Cerebro</h3>
                <p className="text-cyber-400 text-[9px] font-medium tracking-wider">DIGITAL IDENTITY VERIFICATION SYSTEM</p>
                <p className="text-slate-500 text-[8px]">Karprime Technology INC.</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-cyber-400 text-[10px] font-mono font-bold">{certData.cerebroId}</p>
                <p className="text-matrix-400 text-[8px] font-mono">dNFT {certData.dNftTokenId}</p>
              </div>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-cyber-500 to-matrix-500" />

            {/* Body */}
            <div className="flex flex-1 px-5 py-3 gap-4 relative z-10">
              {/* Photo placeholder */}
              <div className="flex-shrink-0">
                <div className="w-20 h-24 rounded-md bg-slate-800/80 border border-cyber-500/30 flex flex-col items-center justify-center">
                  <Fingerprint className="h-6 w-6 text-cyber-400/60 mb-1" />
                  <p className="text-[7px] text-slate-600">BIYOMETRIK</p>
                  <p className="text-[7px] text-slate-600">VERIFIED</p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div>
                  <h4 className="text-cyber-400 font-bold text-xs tracking-wide">CEREBRO KIMLIK KARTI</h4>
                  <p className="text-slate-500 text-[7px]">Cerebro Identity Card</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[7px]">AD SOYAD / FULL NAME</p>
                  <p className="text-white font-bold text-sm truncate">{certData.userName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-slate-500 text-[7px]">KULLANICI TIPI</p>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-bold text-white bg-cyber-500">{certData.userType}</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[7px]">KYC SKORU</p>
                    <p className="text-matrix-400 text-[10px] font-bold">{certData.kycScore}/100</p>
                  </div>
                </div>

                {/* Blockchain box */}
                <div className="bg-[#0f1e37] border border-cyber-500/20 rounded p-1.5 space-y-0.5">
                  <p className="text-cyber-400 font-bold text-[8px]">BLOCKCHAIN DOGRULAMA</p>
                  <div className="flex items-center gap-1 text-[6px]">
                    <span className="text-slate-500">Ag:</span>
                    <span className="text-matrix-400 font-medium">{certData.network}</span>
                  </div>
                  <div className="text-[5px] font-mono text-violet-400 leading-tight break-all">
                    {certData.blockchainHash.slice(0, 42)}...
                  </div>
                </div>
              </div>
            </div>

            {/* Verified bar */}
            <div className="mx-5 mb-2 relative z-10">
              <div className="bg-gradient-to-r from-matrix-500 to-cyber-500 rounded py-1 text-center">
                <p className="text-white font-bold text-[9px] tracking-wider">DOGRLANDI - CEREBRO ID - dNFT CERTIFIED</p>
              </div>
            </div>

            {/* Bottom */}
            <div className="px-5 pb-2 flex items-end justify-between relative z-10">
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-white rounded p-0.5">
                  <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-[1px]">
                    {Array.from({ length: 36 }, (_, i) => (
                      <div key={i} className={`rounded-[0.5px] ${Math.random() > 0.4 ? 'bg-slate-900' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div>
                    <p className="text-slate-600 text-[6px]">Uyum:</p>
                    <div className="flex gap-0.5">
                      {['KVKK', 'GDPR', 'ISO'].map((b) => (
                        <span key={b} className="px-1 py-[1px] bg-slate-800 text-cyber-400 text-[5px] rounded font-bold">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-cyber-400 text-[7px] font-bold">Karprime Technology INC.</p>
                <p className="text-slate-600 text-[6px] italic">Yetkili Imza</p>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-secure-500 via-matrix-500 to-cyber-500" />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-cyber-500/0 group-hover:bg-cyber-500/5 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 px-4 py-2 rounded-lg border border-cyber-500/40">
              <p className="text-xs text-cyber-400 font-semibold flex items-center gap-1">
                <Eye className="h-3 w-3" /> Detaylari Görüntüle
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            onClick={() => setShowCert(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 bg-cyber-600/20 hover:bg-cyber-600/30 text-cyber-300 text-xs font-semibold rounded-lg border border-cyber-500/30 transition-all"
          >
            <Eye className="h-3.5 w-3.5" /> Görüntüle
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2.5 bg-matrix-600/20 hover:bg-matrix-600/30 text-matrix-300 text-xs font-semibold rounded-lg border border-matrix-500/30 transition-all">
            <Download className="h-3.5 w-3.5" /> Indir
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 text-xs font-semibold rounded-lg border border-amber-500/30 transition-all">
            <Share2 className="h-3.5 w-3.5" /> Paylas
          </button>
        </div>
      </div>

      {/* Full Certificate Modal */}
      {showCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setShowCert(false)}>
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowCert(false)} className="absolute -top-3 -right-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full p-1.5 border border-slate-600 z-10 transition-colors">
              <X className="h-4 w-4" />
            </button>

            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-cyber-500/40 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gradient-to-br from-cyber-500 to-matrix-500 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Cerebro Kimlik Sertifikasi</h3>
                  <p className="text-xs text-slate-400">dNFT Tabanli Dogrulanmis Kimlik</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { label: 'Cerebro ID', value: certData.cerebroId, icon: Fingerprint, color: 'text-cyber-400' },
                  { label: 'Ad Soyad', value: certData.userName, icon: Shield, color: 'text-white' },
                  { label: 'Kullanici Tipi', value: certData.userType, icon: Database, color: 'text-matrix-400' },
                  { label: 'dNFT Token ID', value: certData.dNftTokenId, icon: Sparkles, color: 'text-amber-400' },
                  { label: 'Blockchain Agi', value: certData.network, icon: Network, color: 'text-blue-400' },
                  { label: 'KYC Skoru', value: `${certData.kycScore}/100`, icon: CheckCircle, color: 'text-matrix-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <item.icon className={`h-4 w-4 ${item.color} flex-shrink-0`} />
                    <span className="text-xs text-slate-400 flex-1">{item.label}</span>
                    <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#0f1e37] rounded-lg p-4 border border-cyber-500/20 mb-5">
                <p className="text-cyber-400 text-xs font-bold mb-2 flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Blockchain Dogrulama Hash
                </p>
                <p className="text-[10px] font-mono text-violet-400 break-all leading-relaxed">
                  {certData.blockchainHash}
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(certData.blockchainHash)}
                  className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 hover:text-cyber-400 transition-colors"
                >
                  <Copy className="h-2.5 w-2.5" /> Hashi Kopyala
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white font-semibold rounded-lg transition-all shadow-lg">
                  <Download className="h-4 w-4" /> PDF Indir
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all border border-slate-600">
                  <QrCode className="h-4 w-4" /> QR Kod
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


