import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from './components/Layout';
import { AnimatedLogo } from './components/AnimatedLogo';
import { LoginForm } from './components/LoginForm';
import { VerificationForm } from './components/VerificationForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import { AlbisChatBot } from './components/AlbisChatBot';
import { MarqueeInfoBand } from './components/MarqueeInfoBand';
import { detectLanguage } from './utils/i18n';

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
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('tr');
  const [hasError, setHasError] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    try {
      const detectedLang = detectLanguage();
      setLanguage(detectedLang);
    } catch (error) {
      console.error('Error detecting language:', error);
      setHasError(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setState('login');
  };

  const handleLogin = (email: string, phone: string) => {
    setUser({
      email,
      phone,
      isVerified: false,
      isRegistered: false,
    });
    setState('registration');
  };

  const handleRegistrationComplete = () => {
    const currentUser = user || { email: '', phone: '', isVerified: false };
    setUser({ ...currentUser, isRegistered: true });
    setState('verification');
  };

  const handleVerification = () => {
    const updatedUser = user || { email: 'verified@user.com', phone: '+90', isRegistered: true };
    setUser({ ...updatedUser, isVerified: true });
    setState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
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

                {/* Carousel */}
                <div className="relative">
                  <div className="relative h-96 overflow-hidden bg-slate-900">
                    {/* Slide 1: Certificate Image */}
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

                    {/* Slide 2: Features */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 p-6 flex flex-col justify-center ${
                        carouselIndex === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
                          <h4 className="font-semibold text-white mb-2 text-sm">Kimlik Doğrulama Sertifikası</h4>
                          <p className="text-slate-300 text-xs leading-relaxed mb-3">
                            Blockchain teknolojisi ile güvence altına alınmış, değiştirilemez kimlik doğrulama sertifikaları.
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span className="text-slate-300 ml-1">AES-256 Şifreleme</span>
                            </div>
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span className="text-slate-300 ml-1">Zaman Damgası</span>
                            </div>
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span className="text-slate-300 ml-1">QR Doğrulama</span>
                            </div>
                            <div className="bg-slate-800/50 rounded p-2 border border-cyan-500/20">
                              <span className="text-cyan-400 font-bold">✓</span>
                              <span className="text-slate-300 ml-1">PDF İndiri</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Slide 3: KYC & Biometric */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 p-6 flex flex-col justify-center ${
                        carouselIndex === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                          <h4 className="font-semibold text-white mb-2 text-sm">KYC & Biyometrik Onay</h4>
                          <p className="text-slate-300 text-xs leading-relaxed mb-3">
                            Gelişmiş biyometrik analiz ve yapay zeka ile doğrulanan kimlik bilgileri.
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300">
                              Yüz Tanıma
                            </span>
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300">
                              Ses Analizi
                            </span>
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300">
                              Parmak İzi
                            </span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-3 border border-amber-500/30 flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-500/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-amber-400 font-bold text-sm">!</span>
                          </div>
                          <p className="text-xs text-slate-300">
                            Kayıt tamamlandıktan sonra kontrol panelinden sertifikalarınızı PDF olarak indirebilirsiniz.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
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

                  {/* Indicators */}
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
                    title="YouTube"
                  >
                    <svg className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/digiguard-official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 group"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  <a
                    href="https://x.com/digiguardapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-600/20 hover:bg-slate-600/40 border border-slate-500/30 hover:border-slate-500/60 transition-all duration-300 group"
                    title="X (Twitter)"
                  >
                    <svg className="w-5 h-5 text-slate-300 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/digiguardapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 group"
                    title="Instagram"
                  >
                    <svg className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/digiguardapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-700/20 hover:bg-blue-700/40 border border-blue-600/30 hover:border-blue-600/60 transition-all duration-300 group"
                    title="Facebook"
                  >
                    <svg className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-cyber-500/30">
                  <h4 className="text-sm font-semibold text-matrix-400 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    Vizyon
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Dijital kimlik güvenliğinde dünya lideri olmak ve blockchain teknolojisi ile her bireyin kimliğini güvence altına almak.
                  </p>
                </div>

                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-cyber-500/30">
                  <h4 className="text-sm font-semibold text-cyber-400 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                    </svg>
                    Misyon
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Biyometrik doğrulama ve yapay zeka teknolojileriyle kimlik hırsızlığına karşı en güvenli çözümleri sunmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'verification':
        return (
          <VerificationForm
            email={user?.email || ''}
            phone={user?.phone || ''}
            onVerify={handleVerification}
          />
        );
      case 'registration':
        return <RegistrationForm onComplete={handleRegistrationComplete} userType={user?.userType || 'individual'} />;
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} userType={user?.userType || 'individual'} />;
      default:
        return null;
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-red-500/30 max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-2">Yapılandırma Hatası</h2>
          <p className="text-slate-300 text-center mb-4">
            Lütfen tarayıcınızı yenileyin. Sorun devam ederse geliştirici konsolunu kontrol edin.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-cyber-500 to-matrix-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyber-500/50 transition-all duration-300"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

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

export default App;