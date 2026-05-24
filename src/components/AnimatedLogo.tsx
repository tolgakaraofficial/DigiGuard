import React, { useEffect, useState } from 'react';
import { Shield, Fingerprint } from 'lucide-react';

interface AnimatedLogoProps {
  onAnimationComplete: () => void;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ onAnimationComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onAnimationComplete();
      }, 500);
    }, 5500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center transition-opacity duration-500 relative overflow-hidden ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Cyber background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-matrix-500 rounded-full filter blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Matrix-style falling code effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-10 w-1 h-20 bg-gradient-to-b from-matrix-400 to-transparent animate-matrix-rain"></div>
        <div className="absolute top-0 left-32 w-1 h-32 bg-gradient-to-b from-cyber-400 to-transparent animate-matrix-rain" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-0 right-20 w-1 h-24 bg-gradient-to-b from-matrix-400 to-transparent animate-matrix-rain" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 right-40 w-1 h-28 bg-gradient-to-b from-cyber-400 to-transparent animate-matrix-rain" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="text-center relative z-10">
        <div className="mb-8 animate-bounce-slow">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-500 to-matrix-500 p-6 rounded-3xl blur-2xl opacity-60 animate-pulse-slow"></div>
            <div className="relative bg-gradient-to-r from-cyber-600 to-matrix-600 p-6 rounded-3xl shadow-2xl animate-cyber-glow">
              <Fingerprint className="h-24 w-24 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-8 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyber-500 animate-expand-left"></div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyber-400 via-matrix-400 to-secure-400 text-transparent bg-clip-text animate-glow tracking-wide">
              DigiGuard
            </h1>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-matrix-500 animate-expand-right"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-medium text-slate-300 animate-slide-in tracking-wider">
            Karprime Technology INC.
          </h2>
          <p className="text-slate-300 text-lg animate-fade-in-delayed flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-cyber-400" />
            Biyometrik KYC Güvenlik Sistemi
          </p>
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-cyber-500 rounded-full animate-pulse-1"></div>
          <div className="w-3 h-3 bg-matrix-500 rounded-full animate-pulse-2"></div>
          <div className="w-3 h-3 bg-secure-500 rounded-full animate-pulse-3"></div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(0, 153, 230, 0.5),
                         0 0 40px rgba(0, 153, 230, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(0, 230, 118, 0.8),
                         0 0 60px rgba(0, 230, 118, 0.5);
          }
        }

        @keyframes expand-left {
          0% {
            width: 0;
          }
          100% {
            width: 3rem;
          }
        }

        @keyframes expand-right {
          0% {
            width: 0;
          }
          100% {
            width: 3rem;
          }
        }

        @keyframes pulse-1 {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes pulse-2 {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes pulse-3 {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }

        .animate-slide-in {
          animation: slide-in 1s ease-out forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-expand-left {
          animation: expand-left 1s ease-out forwards;
          animation-delay: 1.2s;
        }

        .animate-expand-right {
          animation: expand-right 1s ease-out forwards;
          animation-delay: 1.2s;
        }

        .animate-fade-in-delayed {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 1.5s;
          opacity: 0;
        }

        .animate-pulse-1 {
          animation: pulse-1 1.5s ease-in-out infinite;
          animation-delay: 0s;
        }

        .animate-pulse-2 {
          animation: pulse-2 1.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .animate-pulse-3 {
          animation: pulse-3 1.5s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};