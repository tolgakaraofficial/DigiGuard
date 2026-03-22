import React, { useState, useEffect } from 'react';
import { Download, Shield, CheckCircle, Calendar, Hash, FileText, Award } from 'lucide-react';

interface CertificateData {
  fullName: string;
  email: string;
  userId: string;
  issuedDate: string;
  expiryDate: string;
  certificateId: string;
  blockchainHash: string;
  securityLevel: string;
}

export const CertificatePage: React.FC = () => {
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const mockCertificate: CertificateData = {
      fullName: 'Örnek Kullanıcı',
      email: 'kullanici@example.com',
      userId: 'DG-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      issuedDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      certificateId: 'CERT-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
      blockchainHash: '0x' + Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join(''),
      securityLevel: 'Yüksek'
    };
    setCertificate(mockCertificate);
  }, []);

  const generateCertificateSVG = (data: CertificateData): string => {
    return `
<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7e22ce;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="2" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="800" height="1000" fill="#0f172a"/>

  <rect x="20" y="20" width="760" height="960" fill="url(#grad1)" opacity="0.1" rx="10"/>

  <rect x="40" y="40" width="720" height="920" fill="none" stroke="url(#grad1)" stroke-width="2" rx="10"/>

  <text x="400" y="100" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#60a5fa" text-anchor="middle">
    DigiGuard
  </text>

  <text x="400" y="140" font-family="Arial, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">
    Dijital Kimlik Doğrulama Sertifikası
  </text>

  <circle cx="400" cy="240" r="60" fill="url(#grad1)" opacity="0.2"/>
  <path d="M 400 200 L 400 220 M 380 240 L 400 260 L 440 220" stroke="#60a5fa" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

  <text x="400" y="340" font-family="Arial, sans-serif" font-size="16" fill="#cbd5e1" text-anchor="middle">
    Bu sertifika aşağıdaki kişinin dijital kimliğinin
  </text>
  <text x="400" y="365" font-family="Arial, sans-serif" font-size="16" fill="#cbd5e1" text-anchor="middle">
    DigiGuard platformu tarafından doğrulandığını belgeler
  </text>

  <text x="400" y="430" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#f1f5f9" text-anchor="middle">
    ${data.fullName}
  </text>

  <line x1="200" y1="450" x2="600" y2="450" stroke="#475569" stroke-width="1"/>

  <g transform="translate(100, 500)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" font-weight="bold">
      Kullanıcı ID:
    </text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="16" fill="#e2e8f0">
      ${data.userId}
    </text>
  </g>

  <g transform="translate(100, 570)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" font-weight="bold">
      E-posta:
    </text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="16" fill="#e2e8f0">
      ${data.email}
    </text>
  </g>

  <g transform="translate(100, 640)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" font-weight="bold">
      Sertifika No:
    </text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="16" fill="#e2e8f0">
      ${data.certificateId}
    </text>
  </g>

  <g transform="translate(100, 710)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" font-weight="bold">
      Düzenlenme Tarihi:
    </text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="16" fill="#e2e8f0">
      ${new Date(data.issuedDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
    </text>
  </g>

  <g transform="translate(100, 780)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" font-weight="bold">
      Geçerlilik Tarihi:
    </text>
    <text x="0" y="25" font-family="Arial, sans-serif" font-size="16" fill="#e2e8f0">
      ${new Date(data.expiryDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
    </text>
  </g>

  <g transform="translate(100, 850)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" font-weight="bold">
      Blockchain Hash:
    </text>
    <text x="0" y="25" font-family="monospace" font-size="11" fill="#60a5fa">
      ${data.blockchainHash.substring(0, 40)}...
    </text>
  </g>

  <text x="400" y="935" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">
    Karprime Technology INC. - DigiGuard Platform
  </text>

  <text x="400" y="955" font-family="Arial, sans-serif" font-size="10" fill="#475569" text-anchor="middle">
    Bu sertifika blockchain teknolojisi ile doğrulanabilir ve değiştirilemez
  </text>
</svg>
    `.trim();
  };

  const handleDownload = () => {
    if (!certificate) return;

    setIsDownloading(true);

    const svg = generateCertificateSVG(certificate);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DigiGuard_Certificate_${certificate.certificateId}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  if (!certificate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Sertifika yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-2xl mb-6">
          <Award className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Dijital Kimlik Sertifikam</h1>
        <p className="text-xl text-slate-300">
          Blockchain tabanlı doğrulanabilir kimlik sertifikanız
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Sertifika Bilgileri</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-semibold text-slate-400">Ad Soyad</label>
              </div>
              <p className="text-white text-lg">{certificate.fullName}</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-semibold text-slate-400">Kullanıcı ID</label>
              </div>
              <p className="text-white font-mono">{certificate.userId}</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-semibold text-slate-400">Sertifika No</label>
              </div>
              <p className="text-white font-mono">{certificate.certificateId}</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-semibold text-slate-400">Düzenlenme Tarihi</label>
              </div>
              <p className="text-white">
                {new Date(certificate.issuedDate).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-semibold text-slate-400">Geçerlilik Tarihi</label>
              </div>
              <p className="text-white">
                {new Date(certificate.expiryDate).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-slate-400" />
                <label className="text-sm font-semibold text-slate-400">Güvenlik Seviyesi</label>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                {certificate.securityLevel}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <Hash className="h-8 w-8 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Blockchain Doğrulama</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-slate-400 mb-2 block">
                Blockchain Hash
              </label>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <p className="text-blue-400 font-mono text-xs break-all">
                  {certificate.blockchainHash}
                </p>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Güvenli ve Değiştirilemez</h4>
                  <p className="text-slate-300 text-sm">
                    Bu sertifika Ethereum blockchain üzerinde kayıtlıdır ve içeriği değiştirilemez.
                    Hash değeri ile dilediğiniz zaman doğrulama yapabilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Doğrulanabilir</h4>
                  <p className="text-slate-300 text-sm">
                    Herhangi bir üçüncü taraf bu sertifikayı blockchain üzerinden doğrulayabilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Sertifikanızı İndirin</h3>
        <p className="text-slate-300 mb-6">
          Dijital kimlik sertifikanızı SVG formatında indirerek saklayabilir veya paylaşabilirsiniz.
          Sertifika üzerindeki blockchain hash ile doğrulama yapılabilir.
        </p>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-4 px-8 rounded-lg transition-all inline-flex items-center space-x-3 text-lg"
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>İndiriliyor...</span>
            </>
          ) : (
            <>
              <Download className="h-6 w-6" />
              <span>Sertifikayı İndir (SVG)</span>
            </>
          )}
        </button>
        <p className="text-slate-400 text-sm mt-4">
          İndirilme Zamanı: {new Date().toLocaleString('tr-TR')}
        </p>
      </div>
    </div>
  );
};
