import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, RefreshCw } from 'lucide-react';
import { Layout } from './components/Layout';
import { AnimatedLogo } from './components/AnimatedLogo';
import { LoginForm } from './components/LoginForm';
import { VerificationForm } from './components/VerificationForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import { AlbisChatBot } from './components/AlbisChatBot';
import { MarqueeInfoBand } from './components/MarqueeInfoBand';
import { detectLanguage } from './utils/i18n';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-red-500/30 max-w-md w-full text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Hata Oluştu</h2>
            <p className="text-slate-400 text-sm mb-4">{this.state.error?.message || 'Bilinmeyen hata'}</p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-cyber-500 to-matrix-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyber-500/50 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4" />
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

type AppState = 'splash' | 'login' | 'verification' | 'registration' | 'dashboard';

interface User {
  email: string;
  phone: string;
  userType?: string;
  isVerified: boolean;
  isRegistered: boolean;
}

function App() {
  const [state, setState] = useState<AppState>('splash');
  const [user, setUser] = useState<User>({
    email: '',
    phone: '',
    userType: 'individual',
    isVerified: false,
    isRegistered: false,
  });
  const [language, setLanguage] = useState('tr');
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    try {
      const detectedLang = detectLanguage();
      setLanguage(detectedLang);
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  }, []);

  const handleAnimationComplete = () => {
    setState('login');
  };

  const handleLogin = (email: string, phone: string) => {
    setUser((prev) => ({ ...prev, email, phone }));
    setState('registration');
  };

  const handleRegistrationComplete = (userType?: string) => {
    setUser((prev) => ({ ...prev, isRegistered: true, userType: userType || prev.userType }));
    setState('verification');
  };

  const handleVerification = () => {
    setUser((prev) => ({ ...prev, isVerified: true }));
    setState('dashboard');
  };

  const handleLogout = () => {
    setUser({
      email: '',
      phone: '',
      userType: 'individual',
      isVerified: false,
      isRegistered: false,
    });
    setState('login');
  };

  const renderContent = () => {
    switch (state) {
      case 'splash':
        return <AnimatedLogo onAnimationComplete={handleAnimationComplete} />;
      case 'login':
        return (
          <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4">
            {/* Investor Flash Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 p-1 shadow-2xl animate-pulse">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-white mb-1">Yatırımcı Arayışımız Devam Ediyor!</h2>
                      <p className="text-slate-300 text-sm">DigiGuard, Web4 ve Blockchain teknolojisiyle dijital kimliğin geleceğini inşa ediyor</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => alert('Yatırımcı bilgileri için: investors@digiguard.com')} className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all text-sm whitespace-nowrap">
                      Yatırımcı Olun
                    </button>
                    <button onClick={() => alert('Pitch Deck için: pitch@digiguard.com')} className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg border border-amber-500/30 transition-all text-sm whitespace-nowrap">
                      Pitch Deck
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">Soft ON Teknolojisi</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">Sub ON Abonelik</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Soph ON AI</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30">Web4.0 Hazır</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">A Serisi</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
              <div className="w-full lg:w-[580px] lg:flex-shrink-0 order-2 lg:order-1">
                <LoginForm onLogin={handleLogin} />
              </div>

              {/* Comprehensive Introduction Panel */}
              <div className="w-full lg:w-[560px] lg:flex-shrink-0 space-y-6 order-1 lg:order-2">
                {/* Main Hero Image */}
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
                  <img src="/ad.png" alt="DigiGuard Platform" className="w-full h-48 md:h-56 object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">DigiGuard Kimlik Platformu</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">Soft ON, Sub ON, Soph ON teknolojileriyle geleceğin güvenliği. Blockchain, Web4 ve AI entegrasyonu ile tam teşekküllü dijital kimlik çözümleri.</p>
                  </div>
                </div>

                {/* Feature Buttons Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => alert('Blockchain Sertifikası: Değiştirilemez, zaman damgalı kimlik doğrulama sertifikası. ETH, Polygon, BSC desteği.')} className="group p-4 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 hover:from-cyan-800/50 hover:to-blue-800/50 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-2.332 9-7.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                      </div>
                      <span className="text-white font-semibold text-sm">Blockchain Sertifikası</span>
                    </div>
                    <p className="text-slate-400 text-xs">AES-256, SHA-3, Zaman Damgası</p>
                  </button>

                  <button onClick={() => alert('Kripto Ödemeler: BTC, ETH, USDT, USDC ile anında ödeme. MetaMask entegrasyonu.')} className="group p-4 bg-gradient-to-br from-amber-900/40 to-orange-900/40 hover:from-amber-800/50 hover:to-orange-800/50 rounded-xl border border-amber-500/30 hover:border-amber-400/50 transition-all text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 0v1m0 0h.01M12 8H9m3 0h3m-3 4v1m0 0v1m0-1h.01M12 16H9m3 0h3"/></svg>
                      </div>
                      <span className="text-white font-semibold text-sm">Kripto Ödemeler</span>
                    </div>
                    <p className="text-slate-400 text-xs">BTC, ETH, USDT, USDC</p>
                  </button>

                  <button onClick={() => alert('Web4.0 Teknolojisi: DID, Zero-Knowledge Proofs, Merkle Tree, Layer 2 çözümleri.')} className="group p-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 hover:from-purple-800/50 hover:to-pink-800/50 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                      </div>
                      <span className="text-white font-semibold text-sm">Web4.0 Teknolojisi</span>
                    </div>
                    <p className="text-slate-400 text-xs">DID, ZK-Proofs, Merkle Tree</p>
                  </button>

                  <button onClick={() => alert('AI Entegrasyonu: ALBIS Yapay Zeka, Soft/Sub/Soph ON motorları, 7/24 tehdit tespiti.')} className="group p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/40 hover:from-green-800/50 hover:to-emerald-800/50 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <span className="text-white font-semibold text-sm">AI Entegrasyonu</span>
                    </div>
                    <p className="text-slate-400 text-xs">ALBIS, Soft/Sub/Soph ON</p>
                  </button>
                </div>

                {/* Payment Methods Strip */}
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-emerald-500/30">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg border border-slate-600 text-[10px] text-slate-300 font-medium">VISA</div>
                    <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg border border-slate-600 text-[10px] text-slate-300 font-medium">Mastercard</div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg text-[10px] text-white font-bold">BTC</div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-[10px] text-white font-bold">ETH</div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-[10px] text-white font-bold">USDT</div>
                    <div className="px-3 py-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg text-[10px] text-white font-bold">USDC</div>
                    <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg border border-slate-600 text-[10px] text-slate-300 font-medium">Apple Pay</div>
                    <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg border border-slate-600 text-[10px] text-slate-300 font-medium">Google Pay</div>
                  </div>
                  <p className="text-center text-slate-500 text-[10px] mt-2">Tüm ödeme yöntemleri aktif • 256-bit SSL şifreleme</p>
                </div>

                {/* Social Media */}
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700">
                  <h4 className="text-sm font-semibold text-slate-300 mb-3 text-center">Bizi Takip Edin</h4>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-700/20 hover:bg-blue-700/40 border border-blue-600/30 hover:border-blue-600/60 transition-all group">
                      <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-500/20 hover:bg-sky-500/40 border border-sky-400/30 hover:border-sky-400/60 transition-all group">
                      <svg className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-600/20 hover:bg-pink-600/40 border border-pink-500/30 hover:border-pink-500/60 transition-all group">
                      <svg className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 hover:border-red-500/60 transition-all group">
                      <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-500/20 hover:bg-slate-500/40 border border-slate-400/30 hover:border-slate-400/60 transition-all group">
                      <svg className="w-5 h-5 text-slate-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 hover:border-blue-400/60 transition-all group">
                      <svg className="w-5 h-5 text-blue-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'verification':
        return (
          <VerificationForm
            email={user.email}
            phone={user.phone}
            onVerify={handleVerification}
          />
        );
      case 'registration':
        return <RegistrationForm onComplete={handleRegistrationComplete} userType={user.userType} />;
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} userType={user.userType} />;
      default:
        return <div className="text-white text-center p-8">Yükleniyor...</div>;
    }
  };

  if (state === 'splash') {
    return renderContent();
  }

  return (
    <>
      <MarqueeInfoBand />
      <Layout>
        {renderContent()}
      </Layout>
      <AlbisChatBot language={language} />
    </>
  );
}

const AppWrapped = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWrapped;
