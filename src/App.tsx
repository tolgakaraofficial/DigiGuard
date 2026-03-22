import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoginForm } from './components/LoginForm';
import { VerificationForm } from './components/VerificationForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import { HashDemo } from './components/HashDemo';
import { SplashScreen } from './components/SplashScreen';
import { Navigation, PageType } from './components/Navigation';
import { AboutPage } from './components/AboutPage';
import { VisionPage } from './components/VisionPage';
import { UseCasesPage } from './components/UseCasesPage';
import { CertificatePage } from './components/CertificatePage';
import { TeamPage } from './components/TeamPage';
import { LogOut, Shield } from 'lucide-react';

type AppState = 'splash' | 'login' | 'verification' | 'registration' | 'dashboard' | 'hashDemo' | 'about' | 'team';

interface User {
  email: string;
  phone: string;
  isVerified: boolean;
  isRegistered: boolean;
}

function App() {
  const [state, setState] = useState<AppState>('splash');
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const handleSplashComplete = () => {
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
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderDashboardContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <AboutPage />;
      case 'vision':
        return <VisionPage />;
      case 'usecases':
        return <UseCasesPage />;
      case 'team':
        return <TeamPage />;
      case 'certificate':
        return <CertificatePage />;
      default:
        return <Dashboard />;
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} duration={7000} />;
      case 'login':
        return (
          <div>
            <LoginForm
              onLogin={handleLogin}
              onShowHashDemo={() => setState('hashDemo')}
              onShowAbout={() => setState('about')}
              onShowTeam={() => setState('team')}
            />
          </div>
        );
      case 'hashDemo':
        return (
          <div>
            <button
              onClick={() => setState('login')}
              className="mb-6 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              ← Geri Dön
            </button>
            <HashDemo />
          </div>
        );
      case 'about':
        return (
          <div>
            <button
              onClick={() => setState('login')}
              className="mb-6 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              ← Geri Dön
            </button>
            <AboutPage />
          </div>
        );
      case 'team':
        return (
          <div>
            <button
              onClick={() => setState('login')}
              className="mb-6 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              ← Geri Dön
            </button>
            <TeamPage />
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
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">DigiGuard</h1>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
            <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
            {renderDashboardContent()}
          </div>
        );
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