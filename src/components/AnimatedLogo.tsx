import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

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
      className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mb-8 animate-bounce-slow">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-3xl shadow-2xl animate-pulse-slow">
            <Shield className="h-24 w-24 text-white" />
          </div>
        </div>

        <div className="space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide animate-slide-in">
            Karprime Technology INC.
          </h1>
          <div className="flex items-center justify-center space-x-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500 animate-expand-left"></div>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text animate-glow">
              DigiGuard
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500 animate-expand-right"></div>
          </div>
          <p className="text-slate-300 text-lg animate-fade-in-delayed">
            Dijital Kimlik Güvenliği
          </p>
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse-1"></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse-2"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse-3"></div>
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
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.5),
                         0 0 40px rgba(59, 130, 246, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(34, 211, 238, 0.8),
                         0 0 60px rgba(34, 211, 238, 0.5);
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
