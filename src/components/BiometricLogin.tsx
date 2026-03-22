import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Shield, Eye, Fingerprint, Zap, Globe, Brain } from 'lucide-react';
import { biometricService, BiometricData } from '../services/BiometricService';
import { web3Service } from '../services/Web3Service';
import { web4Service } from '../services/Web4Service';

interface BiometricLoginProps {
  onSuccess: (biometricData: BiometricData) => void;
  onError: (error: string) => void;
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({ onSuccess, onError }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'init' | 'face' | 'voice' | 'web3' | 'complete'>('init');
  const [biometricData, setBiometricData] = useState<BiometricData | null>(null);
  const [web3Connected, setWeb3Connected] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      biometricService.cleanup();
    };
  }, []);

  const initializeServices = async () => {
    setIsInitializing(true);
    try {
      // Biyometrik servisleri başlat
      await biometricService.initialize();

      // Web4 AI agents kaydet
      web4Service.registerAIAgents();

      setCurrentStep('face');
    } catch (error) {
      onError(`Servis başlatma hatası: ${error.message}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const startFaceCapture = async () => {
    try {
      setIsCapturing(true);
      
      // Kamera erişimi
      const stream = await biometricService.requestCameraAccess();
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // 3 saniye sonra yakalama
        setTimeout(async () => {
          try {
            const faceData = await biometricService.captureFaceBiometric(videoRef.current!);
            setBiometricData(prev => ({ ...prev, ...faceData }));
            setCurrentStep('voice');
          } catch (error) {
            onError(`Yüz tanıma hatası: ${error.message}`);
          } finally {
            setIsCapturing(false);
            stream.getTracks().forEach(track => track.stop());
          }
        }, 3000);
      }
    } catch (error) {
      onError(`Kamera erişim hatası: ${error.message}`);
      setIsCapturing(false);
    }
  };

  const startVoiceCapture = async () => {
    try {
      setIsCapturing(true);
      
      // Mikrofon erişimi
      const stream = await biometricService.requestMicrophoneAccess();
      
      // 5 saniye ses kaydı
      const voiceData = await biometricService.captureVoiceBiometric(stream, 5000);
      
      setBiometricData(prev => ({ 
        ...prev, 
        ...voiceData,
        confidence: ((prev?.confidence || 0) + voiceData.confidence) / 2
      }));
      
      stream.getTracks().forEach(track => track.stop());
      setCurrentStep('web3');
    } catch (error) {
      onError(`Ses tanıma hatası: ${error.message}`);
    } finally {
      setIsCapturing(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      setIsCapturing(true);
      
      // MetaMask bağlantısı
      const connection = await web3Service.connectMetaMask();
      setWeb3Connected(true);

      // Blockchain'e kimlik hash'i kaydet
      if (biometricData) {
        const identityHash = JSON.stringify({
          faceHash: biometricData.faceDescriptor ? Array.from(biometricData.faceDescriptor.slice(0, 10)) : null,
          voiceHash: biometricData.voiceprint ? Array.from(biometricData.voiceprint.slice(0, 10)) : null,
          timestamp: Date.now()
        });

        await web3Service.deployIdentityContract(identityHash);
      }

      setCurrentStep('complete');
    } catch (error) {
      onError(`Web3 bağlantı hatası: ${error.message}`);
    } finally {
      setIsCapturing(false);
    }
  };

  const completeAuthentication = async () => {
    if (!biometricData) {
      onError('Biyometrik veri eksik');
      return;
    }

    try {
      // Web4 AI risk değerlendirmesi
      const riskAssessment = await web4Service.assessSecurityRisk({
        biometric: biometricData,
        web3Connected: web3Connected,
        timestamp: Date.now()
      });

      onSuccess({
        ...biometricData,
        web3Connected,
        riskAssessment: riskAssessment
      } as any);

    } catch (error) {
      onError(`Kimlik doğrulama tamamlama hatası: ${error.message}`);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'init':
        return (
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="bg-blue-600 p-3 rounded-full">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="bg-purple-600 p-3 rounded-full">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="bg-emerald-600 p-3 rounded-full">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Web3/Web4 Biyometrik Giriş
            </h3>
            <p className="text-slate-300 mb-6">
              Gelişmiş biyometrik doğrulama ve blockchain tabanlı kimlik sistemi
            </p>
            <button
              onClick={initializeServices}
              disabled={isInitializing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              {isInitializing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Shield className="h-5 w-5" />
              )}
              <span>{isInitializing ? 'Başlatılıyor...' : 'Başlat'}</span>
            </button>
          </div>
        );

      case 'face':
        return (
          <div className="text-center">
            <div className="bg-emerald-600 p-4 rounded-full w-fit mx-auto mb-6">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Yüz Tanıma</h3>
            <p className="text-slate-300 mb-6">
              Kameraya bakın ve yüzünüzün tanınmasını bekleyin
            </p>
            
            <div className="relative mb-6">
              <video
                ref={videoRef}
                className="w-full max-w-md mx-auto rounded-lg"
                autoPlay
                muted
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ display: 'none' }}
              />
              {isCapturing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p>Yüz tanınıyor...</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={startFaceCapture}
              disabled={isCapturing}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Eye className="h-5 w-5" />
              <span>Yüz Tanımayı Başlat</span>
            </button>
          </div>
        );

      case 'voice':
        return (
          <div className="text-center">
            <div className="bg-purple-600 p-4 rounded-full w-fit mx-auto mb-6">
              <Mic className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Ses Tanıma</h3>
            <p className="text-slate-300 mb-6">
              "Merhaba, ben DigiGuard kullanıcısıyım" cümlesini söyleyin
            </p>
            
            {isCapturing && (
              <div className="mb-6">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white">Kayıt ediliyor...</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            )}

            <button
              onClick={startVoiceCapture}
              disabled={isCapturing}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Mic className="h-5 w-5" />
              <span>{isCapturing ? 'Kaydediliyor...' : 'Ses Kaydını Başlat'}</span>
            </button>
          </div>
        );

      case 'web3':
        return (
          <div className="text-center">
            <div className="bg-orange-600 p-4 rounded-full w-fit mx-auto mb-6">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Web3 Bağlantısı</h3>
            <p className="text-slate-300 mb-6">
              MetaMask cüzdanınızı bağlayın ve kimliğinizi blockchain'e kaydedin
            </p>
            
            {web3Connected && (
              <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-lg p-4 mb-6">
                <p className="text-emerald-400 text-sm">✓ Web3 bağlantısı başarılı</p>
              </div>
            )}

            <button
              onClick={connectWeb3}
              disabled={isCapturing || web3Connected}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              {isCapturing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Globe className="h-5 w-5" />
              )}
              <span>
                {web3Connected ? 'Bağlandı' : isCapturing ? 'Bağlanıyor...' : 'MetaMask Bağla'}
              </span>
            </button>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center">
            <div className="bg-emerald-600 p-4 rounded-full w-fit mx-auto mb-6">
              <Fingerprint className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Doğrulama Tamamlandı</h3>
            <p className="text-slate-300 mb-6">
              Biyometrik verileriniz kaydedildi ve merkezi olmayan kimliğiniz oluşturuldu
            </p>
            
            <div className="bg-slate-700 rounded-lg p-4 mb-6 text-left">
              <h4 className="text-white font-medium mb-2">Doğrulama Özeti:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>✓ Yüz tanıma: {biometricData?.faceDescriptor ? 'Başarılı' : 'Başarısız'}</li>
                <li>✓ Ses tanıma: {biometricData?.voiceprint ? 'Başarılı' : 'Başarısız'}</li>
                <li>✓ Canlılık tespiti: {(biometricData?.livenessScore || 0) > 0.6 ? 'Başarılı' : 'Başarısız'}</li>
                <li>✓ Web3 bağlantısı: {web3Connected ? 'Aktif' : 'Pasif'}</li>
              </ul>
            </div>

            <button
              onClick={completeAuthentication}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
            >
              <Shield className="h-5 w-5" />
              <span>Kimlik Doğrulamayı Tamamla</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {['init', 'face', 'voice', 'web3', 'complete'].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentStep === step
                    ? 'bg-blue-500'
                    : ['init', 'face', 'voice', 'web3', 'complete'].indexOf(currentStep) > index
                    ? 'bg-emerald-500'
                    : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {renderStep()}

        {/* Web Technologies Info */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-600/20 rounded-lg p-3">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xs text-blue-400 font-medium">Web3</p>
              <p className="text-xs text-slate-400">Blockchain</p>
            </div>
            <div className="bg-purple-600/20 rounded-lg p-3">
              <Brain className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs text-purple-400 font-medium">Web4</p>
              <p className="text-xs text-slate-400">AI-Native</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};