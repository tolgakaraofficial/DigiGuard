import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { CyberBackground } from './CyberBackground';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  duration = 7000
}) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <>
      <CyberBackground />
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 transition-opacity duration-500 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <Shield className="w-32 h-32 text-blue-400 opacity-20" />
        </div>

        <div className="relative animate-bounce-slow">
          <Shield className="w-32 h-32 text-white drop-shadow-2xl" />
        </div>
      </div>

      <div className="mt-12 text-center space-y-4">
        <h1 className="text-4xl font-bold text-white animate-fade-in-up">
          DigiGuard
        </h1>

        <p className="text-lg text-blue-200 animate-fade-in-up-delay">
          Karprime Technology INC.
        </p>

        <div className="flex items-center justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 100ms;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
    </>
  );
};
