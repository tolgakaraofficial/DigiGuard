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
            <h2 className="text-xl font-bold text-white mb-2">Hata Olustu</h2>
            <p className="text-slate-400 text-sm mb-4">{this.state.error?.message || 'Bilinmeyen hata'}</p>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-cyber-500 to-matrix-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyber-500/50 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4" />
              Sayfayi Yenile
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
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center max-w-7xl mx-auto px-4">
            <div className="w-full lg:w-[580px] lg:flex-shrink-0 order-2 lg:order-1">
              <LoginForm onLogin={handleLogin} />
            </div>
            <div className="w-full lg:w-[560px] lg:flex-shrink-0 space-y-6 order-1 lg:order-2">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
                <div className="p-6">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fillRule="evenodd" d="M4 4a2 2 0 01 2-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm2 5a1 1 0 000 2h6a1 1 0 000-2H6zm0 4a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                    Blockchain Sertifikalar
                  </h3>
                </div>

                <div className="relative">
                  <div className="relative h-96 overflow-hidden bg-slate-900">
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        carouselIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src="/ad.png"
                        alt="DigiGuard Certificate"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div
                      className={`absolute inset-0 transition-opacity duration-500 p-6 flex flex-col justify-center ${
                        carouselIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
                          <h4 className="font-semibold text-white mb-2 text-sm">Kimlik Dogrulama Sertifikasi</h4>
                          <p className="text-slate-300 text-xs leading-relaxed mb-3">
                            Blockchain teknolojisi ile guvence altina alinmis, degistirilemez kimlik dogrulama sertifikasi.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span className="text-slate-300 ml-1">AES-256 Sifreleme</span>
                            </div>
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span className="text-slate-300 ml-1">Zaman Damgasi</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 transition-opacity duration-500 p-6 flex flex-col justify-center ${
                        carouselIndex === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                          <h4 className="font-semibold text-white mb-2 text-sm">KYC & Biyometrik Onay</h4>
                          <p className="text-slate-300 text-xs leading-relaxed mb-3">
                            Gelimis biyometrik analiz ve yapay zeka ile dogrulanan kimlik bilgileri.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-3">
                    <button
                      onClick={() => setCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))}
                      className="pointer-events-auto bg-cyan-600/80 hover:bg-cyan-600 text-white p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-cyan-500/50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))}
                      className="pointer-events-auto bg-cyan-600/80 hover:bg-cyan-600 text-white p-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-cyan-500/50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCarouselIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          carouselIndex === index
                            ? 'bg-cyan-400 w-8'
                            : 'bg-slate-600 w-2 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-cyber-500/30">
                <h4 className="text-sm font-semibold text-slate-300 mb-4 text-center">Bizi Takip Edin</h4>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-700/20 hover:bg-blue-700/40 border border-blue-600/30 hover:border-blue-600/60 transition-all duration-300 group">
                    <svg className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-12 h-12 rounded-lg bg-sky-500/20 hover:bg-sky-500/40 border border-sky-400/30 hover:border-sky-400/60 transition-all duration-300 group">
                    <svg className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-600/20 hover:bg-pink-600/40 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 group">
                    <svg className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 group">
                    <svg className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-500/20 hover:bg-slate-500/40 border border-slate-400/30 hover:border-slate-400/60 transition-all duration-300 group">
                    <svg className="w-6 h-6 text-slate-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 group">
                    <svg className="w-6 h-6 text-blue-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
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
        return <div className="text-white text-center p-8">Yukleniyor...</div>;
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
