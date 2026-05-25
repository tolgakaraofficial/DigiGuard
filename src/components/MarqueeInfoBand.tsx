import React, { useEffect, useState } from 'react';
import { Zap, Shield, Lock, Smartphone } from 'lucide-react';

interface InfoItem {
  icon: React.ReactNode;
  text: string;
  color: string;
}

export const MarqueeInfoBand: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 2) % 2000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const infoItems: InfoItem[] = [
    { icon: <Shield className="w-5 h-5" />, text: 'Blockchain teknolojisi ile güvenli kimlik doğrulama', color: 'from-cyan-500 to-blue-500' },
    { icon: <Lock className="w-5 h-5" />, text: 'AES-256 şifreleme ve end-to-end koruması', color: 'from-green-500 to-emerald-500' },
    { icon: <Smartphone className="w-5 h-5" />, text: 'Biyometrik doğrulama ve AI tabanlı KYC sistemi', color: 'from-purple-500 to-pink-500' },
    { icon: <Zap className="w-5 h-5" />, text: 'Gerçek zamanlı tehdit analizi ve otomatik uyarılar', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/30 overflow-hidden">
      <div className="relative h-14 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 pointer-events-none z-10"></div>

        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            transform: `translateX(${offset}px)`,
            transition: 'none',
          }}
        >
          {[...infoItems, ...infoItems].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 flex-shrink-0"
            >
              <div className={`bg-gradient-to-r ${item.color} p-1.5 rounded-lg`}>
                <span className="text-white">{item.icon}</span>
              </div>
              <span className="text-slate-200 text-sm font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
