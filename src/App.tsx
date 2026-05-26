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
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://www.youtube.com/@digiguard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 group"
                  >
                    <svg className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
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
