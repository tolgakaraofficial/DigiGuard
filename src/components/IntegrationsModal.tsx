import React from 'react';
import { X, Workflow, Cloud, Code, Database, Lock, Zap, CheckCircle } from 'lucide-react';

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2.5 rounded-lg">
              <Workflow className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Entegrasyonlar ve API</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              Hizli ve Guvenlı Entegrasyon
            </h3>
            <p className="text-slate-200 leading-relaxed">
              DigiGuard API'si ile mevcut sistemlerinize dakikalar icinde biyometrik KYC entegrasyonu yapabilirsiniz.
              RESTful API, WebSocket baglantilari ve SDK kutuphaneleri ile her platformda uyumlu calisir.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Code className="h-5 w-5 text-purple-400 mr-2" />
              Desteklenen Platformlar ve Teknolojiler
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Cloud className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Web Platformlari</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    React, Vue, Angular
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Node.js, Python, PHP
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    WordPress, Shopify eklentileri
                  </li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Mobil Uygulamalar</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    iOS SDK (Swift, Objective-C)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Android SDK (Kotlin, Java)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    React Native, Flutter
                  </li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Blockchain Aglar</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Ethereum, Polygon, BSC
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Solana, Avalanche
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Hyperledger Fabric
                  </li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">Kurumsal Sistemler</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    SAP, Oracle, Microsoft Dynamics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Salesforce, HubSpot CRM
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-400" />
                    Active Directory, LDAP
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Workflow className="h-5 w-5 text-cyan-400 mr-2" />
              Entegrasyon Senaryolari
            </h3>

            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  E-Ticaret Platformlari
                </h4>
                <p className="text-slate-300 text-sm mb-2">
                  Online magazalarda odeme oncesi kimlik dogrulamasi yaparak sahtecilik ve iadeleri azaltin.
                </p>
                <div className="bg-slate-800/50 rounded p-3 font-mono text-xs text-green-400">
                  POST /api/v1/verify/identity<br/>
                  Authorization: Bearer YOUR_API_KEY<br/>
                  {"{"} "userId": "12345", "action": "checkout" {"}"}
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Fintech Uygulamalar
                </h4>
                <p className="text-slate-300 text-sm mb-2">
                  Bankacilik ve finansal islemlerde real-time biyometrik dogrulama yaparak guvenlik seviyesini artirin.
                </p>
                <div className="bg-slate-800/50 rounded p-3 font-mono text-xs text-green-400">
                  POST /api/v1/kyc/validate<br/>
                  Authorization: Bearer YOUR_API_KEY<br/>
                  {"{"} "biometric": "fingerprint_data" {"}"}
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Saglik Bilisim Sistemleri
                </h4>
                <p className="text-slate-300 text-sm mb-2">
                  Hasta kayitlarına erisimde cift faktorlu kimlik dogrulamasi ile HIPAA uyumlulugu saglayin.
                </p>
                <div className="bg-slate-800/50 rounded p-3 font-mono text-xs text-green-400">
                  GET /api/v1/verify/mfa<br/>
                  Authorization: Bearer YOUR_API_KEY<br/>
                  X-Biometric-Token: ENCRYPTED_TOKEN
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  Devlet E-Hizmetler
                </h4>
                <p className="text-slate-300 text-sm mb-2">
                  Vatandas hizmetlerinde blockchain tabanli kimlik dogrulamasi ile seffaflik ve guvenlik.
                </p>
                <div className="bg-slate-800/50 rounded p-3 font-mono text-xs text-green-400">
                  POST /api/v1/gov/authenticate<br/>
                  Authorization: Bearer GOV_API_KEY<br/>
                  {"{"} "nationalId": "***", "service": "tax" {"}"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-5">
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-cyan-400" />
              Guvenlik ve Compliance
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>OAuth 2.0 ve OpenID Connect standartlari</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>TLS 1.3 ile sifrelenmis tum baglantılar</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>API rate limiting ve DDoS koruması</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>Webhook event notifications</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>GDPR, KVKK, SOC 2 uyumlu</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                <span>99.99% uptime SLA garantisi</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-5 border border-slate-600">
            <h4 className="font-semibold text-white mb-3">Dokumantasyon ve Destek</h4>
            <p className="text-slate-300 text-sm mb-3">
              Detayli API dokumantasyonu, kod ornekleri, interaktif playground ve 7/24 teknik destek ekibimizle
              entegrasyon sureci hizla tamamlanir.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full border border-blue-500/50">
                API Dokumantasyonu
              </span>
              <span className="px-3 py-1 bg-green-600/30 text-green-300 text-xs rounded-full border border-green-500/50">
                Kod Ornekleri
              </span>
              <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full border border-purple-500/50">
                Postman Collection
              </span>
              <span className="px-3 py-1 bg-orange-600/30 text-orange-300 text-xs rounded-full border border-orange-500/50">
                7/24 Teknik Destek
              </span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
