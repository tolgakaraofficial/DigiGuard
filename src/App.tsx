import { useState, useEffect, useCallback } from 'react';
import { Splash } from './components/Splash';
import { Login } from './components/Login';
import { RegistrationForm } from './components/RegistrationForm';
import { DigitalContract } from './components/DigitalContract';
import { Verify } from './components/Verify';
import { Dashboard } from './components/Dashboard';
import { GifCurtain } from './components/GifCurtain';
import { initDashboard, type DashboardData } from './lib/dashboardData';
import { playTransitionSound } from './lib/transitionSound';

type Page = 'splash' | 'login' | 'register' | 'contract' | 'verify' | 'dashboard';

export default function App() {
  const [page, setPage] = useState<Page>('splash');
  const [displayedPage, setDisplayedPage] = useState<Page>('splash');
  const [booting, setBooting] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<'individual' | 'corporate'>('individual');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const navigateTo = useCallback((next: Page) => {
    if (next === page) return;
    playTransitionSound();
    setTransitioning(true);
    window.setTimeout(() => {
      setPage(next);
      setDisplayedPage(next);
    }, 2000);
    window.setTimeout(() => setTransitioning(false), 2000);
  }, [page]);

  const handleEnter = () => navigateTo('login');

  const handleLogin = (loginEmail: string) => {
    setEmail(loginEmail);
    setPhone('+90 5xx xxx xx xx');
    setUserType('individual');
    const data = initDashboard(loginEmail, '+90 5xx xxx xx xx', 'individual');
    setDashboardData(data);
    navigateTo('dashboard');
  };

  const handleRegisterComplete = (regEmail: string, regPhone: string, type: 'individual' | 'corporate') => {
    setEmail(regEmail);
    setPhone(regPhone);
    setUserType(type);
    navigateTo('contract');
  };

  const handleContractAccept = () => {
    navigateTo('verify');
  };

  const handleVerify = () => {
    const data = initDashboard(email, phone, userType);
    setDashboardData(data);
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    setDashboardData(null);
    setEmail('');
    setPhone('');
    navigateTo('login');
  };

  useEffect(() => {
    if (!booting) return;
    const t = window.setTimeout(() => setBooting(false), 4000);
    return () => window.clearTimeout(t);
  }, [booting]);

  const renderPage = () => {
    switch (displayedPage) {
      case 'splash':
        return <Splash onEnter={handleEnter} />;
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToRegister={() => navigateTo('register')} />;
      case 'register':
        return <RegistrationForm onComplete={() => navigateTo('contract')} />;
      case 'contract':
        return <DigitalContract userType={userType} onAccept={handleContractAccept} onBack={() => navigateTo('register')} />;
      case 'verify':
        return <Verify email={email} phone={phone} onVerify={handleVerify} onBack={() => navigateTo('register')} />;
      case 'dashboard':
        return dashboardData ? <Dashboard data={dashboardData} onLogout={handleLogout} /> : <Splash onEnter={handleEnter} />;
      default:
        return <Splash onEnter={handleEnter} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {booting && <GifCurtain opening onComplete={() => setBooting(false)} />}
      {transitioning && <GifCurtain onComplete={() => setTransitioning(false)} />}
      {renderPage()}
    </div>
  );
}
