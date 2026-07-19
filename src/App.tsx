import { useState } from 'react';
import { Splash } from './components/Splash';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Verify } from './components/Verify';
import { Dashboard } from './components/Dashboard';
import { initDashboard, type DashboardData } from './lib/dashboardData';

type Page = 'splash' | 'login' | 'register' | 'verify' | 'dashboard';

export default function App() {
  const [page, setPage] = useState<Page>('splash');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<'individual' | 'corporate'>('individual');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const handleEnter = () => setPage('login');

  const handleLogin = (loginEmail: string) => {
    setEmail(loginEmail);
    setPhone('+90 5xx xxx xx xx');
    setUserType('individual');
    const data = initDashboard(loginEmail, '+90 5xx xxx xx xx', 'individual');
    setDashboardData(data);
    setPage('dashboard');
  };

  const handleRegisterComplete = (regEmail: string, regPhone: string, type: 'individual' | 'corporate') => {
    setEmail(regEmail);
    setPhone(regPhone);
    setUserType(type);
    setPage('verify');
  };

  const handleVerify = () => {
    const data = initDashboard(email, phone, userType);
    setDashboardData(data);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setDashboardData(null);
    setEmail('');
    setPhone('');
    setPage('login');
  };

  if (page === 'splash') return <Splash onEnter={handleEnter} />;
  if (page === 'login') return (
    <Login onLogin={handleLogin} onSwitchToRegister={() => setPage('register')} />
  );
  if (page === 'register') return (
    <Register onComplete={handleRegisterComplete} onBack={() => setPage('login')} />
  );
  if (page === 'verify') return (
    <Verify email={email} phone={phone} onVerify={handleVerify} onBack={() => setPage('register')} />
  );
  if (page === 'dashboard' && dashboardData) return (
    <Dashboard data={dashboardData} onLogout={handleLogout} />
  );

  return <Splash onEnter={handleEnter} />;
}
