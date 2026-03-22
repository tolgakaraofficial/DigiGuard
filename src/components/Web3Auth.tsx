import React, { useState } from 'react';
import { Wallet, Fingerprint, Smartphone, Globe } from 'lucide-react';

interface Web3AuthProps {
  onAuthenticate: (method: string, data: any) => void;
}

export const Web3Auth: React.FC<Web3AuthProps> = ({ onAuthenticate }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const authMethods = [
    {
      id: 'web3-wallet',
      name: 'Web3 Cüzdan',
      description: 'MetaMask, WalletConnect ile bağlan',
      icon: Wallet,
      color: 'from-orange-500 to-yellow-500',
      version: 'Web3',
    },
    {
      id: 'web4-did',
      name: 'Merkezi Olmayan Kimlik (DID)',
      description: 'Web4 DID protokolü ile kimlik doğrula',
      icon: Fingerprint,
      color: 'from-purple-500 to-pink-500',
      version: 'Web4',
    },
    {
      id: 'web5-decentralized',
      name: 'Web5 Kişisel Veri',
      description: 'Kendi verilerinizi kontrol edin',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500',
      version: 'Web5',
    },
    {
      id: 'biometric',
      name: 'Biyometrik Doğrulama',
      description: 'Parmak izi veya yüz tanıma',
      icon: Globe,
      color: 'from-cyan-500 to-blue-500',
      version: 'Biometric',
    },
  ];

  const handleAuthenticate = async (methodId: string) => {
    setSelectedMethod(methodId);
    setIsConnecting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const authData = {
      method: methodId,
      timestamp: new Date().toISOString(),
      verified: true,
    };

    onAuthenticate(methodId, authData);
    setIsConnecting(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Gelişmiş Kimlik Doğrulama
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Web3, Web4, Web5 ve Biyometrik teknolojiler ile güvenli giriş
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {authMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            const isLoading = isConnecting && isSelected;

            return (
              <button
                key={method.id}
                onClick={() => handleAuthenticate(method.id)}
                disabled={isConnecting}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-blue-500 bg-slate-700/50'
                    : 'border-slate-600 bg-slate-700/30 hover:border-slate-500 hover:bg-slate-700/50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${method.color} flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        {method.name}
                      </h3>
                      <span className="text-xs font-medium text-slate-400 bg-slate-600/50 px-2 py-1 rounded">
                        {method.version}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {method.description}
                    </p>
                  </div>
                </div>

                {isLoading && (
                  <div className="absolute inset-0 bg-slate-800/80 rounded-xl flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-white text-sm">Bağlanıyor...</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Globe className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-blue-300 font-medium text-sm mb-1">
                Yeni Nesil Web Teknolojileri
              </h4>
              <p className="text-blue-200/80 text-xs">
                Web3, Web4 ve Web5 protokolleri ile merkezi olmayan, güvenli ve
                kullanıcı odaklı kimlik doğrulama deneyimi yaşayın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
