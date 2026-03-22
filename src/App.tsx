import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoginForm } from './components/LoginForm';
import { VerificationForm } from './components/VerificationForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import { HashDemo } from './components/HashDemo';
import { SplashScreen } from './components/SplashScreen';

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
  };

  const renderContent = () => {
    switch (state) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} duration={4000} />;
      case 'login':
        return (
          <div>
            <LoginForm onLogin={handleLogin} />
            <div className="mt-8">
              <HashDemo />
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