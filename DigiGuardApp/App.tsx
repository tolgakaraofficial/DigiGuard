import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoginForm } from './components/LoginForm';
import { VerificationForm } from './components/VerificationForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';

type AppState = 'login' | 'verification' | 'registration' | 'dashboard';

interface User {
  email: string;
  phone: string;
  isVerified: boolean;
  isRegistered: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>('login');
  const [user, setUser] = useState<User | null>(null);

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
      case 'login':
        return <LoginForm onLogin={handleLogin} />;
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

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}