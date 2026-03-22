import React, { useState } from 'react';
import { Shield, CheckCircle, RotateCcw, AlertCircle, Camera, Scan, Fingerprint, UserCheck } from 'lucide-react';

interface VerificationFormProps {
  email: string;
  phone: string;
  onVerify: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  email,
  phone,
  onVerify,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [kycStatus, setKycStatus] = useState({
    faceVerification: false,
    documentVerification: false,
    biometricScan: false,
  });

  const allVerified = kycStatus.faceVerification && kycStatus.documentVerification && kycStatus.biometricScan;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allVerified) {
      alert('Lütfen tüm doğrulama adımlarını tamamlayın.');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onVerify();
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-cyber-500/30">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-cyber-600 to-matrix-600 p-3 rounded-full animate-pulse">
              <UserCheck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyber-400 to-matrix-400 bg-clip-text text-transparent mb-2">
            KYC Kimlik Doğrulama
          </h2>
          <p className="text-slate-300 text-sm">
            Biyometrik doğrulama ve kimlik bilgileri kontrolü
          </p>
        </div>

        <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-200 text-sm">
                <span className="font-semibold">Kullanıcı Bilgileri:</span>
              </p>
              <p className="text-blue-300 text-xs mt-1">E-posta: {email}</p>
              <p className="text-blue-300 text-xs">Telefon: {phone}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-4 rounded-lg transition-all ${kycStatus.faceVerification ? 'bg-green-900/30 border-2 border-green-500/50' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'}`}>
              <div className="flex items-center space-x-3">
                <Camera className={`h-6 w-6 ${kycStatus.faceVerification ? 'text-green-400' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${kycStatus.faceVerification ? 'text-green-300' : 'text-slate-200'}`}>
                    Yüz Tarama ve Canlılık Tespiti
                  </p>
                  <p className="text-xs text-slate-400">Kamera ile yüz doğrulama ve canlılık kontrolü</p>
                </div>
              </div>
              {kycStatus.faceVerification ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => setKycStatus({...kycStatus, faceVerification: true})}
                  className="text-sm bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Başlat
                </button>
              )}
            </div>

            <div className={`flex items-center justify-between p-4 rounded-lg transition-all ${kycStatus.documentVerification ? 'bg-green-900/30 border-2 border-green-500/50' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'}`}>
              <div className="flex items-center space-x-3">
                <Scan className={`h-6 w-6 ${kycStatus.documentVerification ? 'text-green-400' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${kycStatus.documentVerification ? 'text-green-300' : 'text-slate-200'}`}>
                    Kimlik Belgesi Tarama
                  </p>
                  <p className="text-xs text-slate-400">TC Kimlik, Pasaport veya Ehliyet doğrulama</p>
                </div>
              </div>
              {kycStatus.documentVerification ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => setKycStatus({...kycStatus, documentVerification: true})}
                  className="text-sm bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Tarayın
                </button>
              )}
            </div>

            <div className={`flex items-center justify-between p-4 rounded-lg transition-all ${kycStatus.biometricScan ? 'bg-green-900/30 border-2 border-green-500/50' : 'bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500'}`}>
              <div className="flex items-center space-x-3">
                <Fingerprint className={`h-6 w-6 ${kycStatus.biometricScan ? 'text-green-400' : 'text-slate-400'}`} />
                <div>
                  <p className={`text-sm font-semibold ${kycStatus.biometricScan ? 'text-green-300' : 'text-slate-200'}`}>
                    Biyometrik Veri Tarama
                  </p>
                  <p className="text-xs text-slate-400">Parmak izi veya retina taraması</p>
                </div>
              </div>
              {kycStatus.biometricScan ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => setKycStatus({...kycStatus, biometricScan: true})}
                  className="text-sm bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 text-white px-4 py-2 rounded-lg transition-all font-semibold"
                >
                  Tarayın
                </button>
              )}
            </div>
          </div>

          {allVerified && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 rounded-lg animate-pulse">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-green-300 font-bold">
                    KYC Doğrulama Tamamlandı!
                  </p>
                  <p className="text-xs text-green-400">Tüm biyometrik kontroller başarılı</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !allVerified}
            className="w-full bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RotateCcw className="h-5 w-5 animate-spin" />
                <span>Doğrulanıyor...</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                <span>Doğrulamayı Tamamla</span>
              </>
            )}
          </button>

          <div className="text-center text-xs text-slate-400 mt-4">
            <p>KYC doğrulama tamamlandıktan sonra Dashboard'a yönlendirileceksiniz.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
