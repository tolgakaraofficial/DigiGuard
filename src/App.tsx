import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AnimatedLogo } from './components/AnimatedLogo';
import { LoginForm } from './components/LoginForm';
import { VerificationForm } from './components/VerificationForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';

type AppState = 'splash' | 'login' | 'verification' | 'registration' | 'dashboard';

interface User {
  email: string;
  phone: string;
  isVerified: boolean;
  isRegistered: boolean;
}

function App() {
  const [state, setState] = useState<AppState>('splash');
  const [user, setUser] = useState<User | null>(null);

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
    setState('verification');
  };

  const handleVerification = () => {
    if (user) {
      setUser({ ...user, isVerified: true });
      setState('registration');
    }
  };

  const handleRegistrationComplete = () => {
    if (user) {
      setUser({ ...user, isRegistered: true });
      setState('dashboard');
    }
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
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-7xl mx-auto px-4">
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <LoginForm onLogin={handleLogin} />
            </div>
            <div className="w-full lg:w-[600px] lg:flex-shrink-0">
              <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-cyber-500/30">
                <h3 className="text-lg font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent mb-4">
                  Tanıtım Videosu
                </h3>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/k2AI3RdyVNA?start=749"
                    title="DigiGuard Tanıtım Videosu"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'verification':
        return user ? (
          <VerificationForm
            email={user.email}
            phone={user.phone}
            onVerify={handleVerification}
          />
        ) : null;
      case 'registration':
        return <RegistrationForm onComplete={handleRegistrationComplete} />;
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  if (state === 'splash') {
    return renderContent();
  }

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}

export default App;