import React, { useState } from 'react';
import { IndividualPersonalInfoStep } from './IndividualPersonalInfoStep';
import { CorporatePersonalInfoStep } from './CorporatePersonalInfoStep';
import { IdentityInfoStep } from './IdentityInfoStep';
import { MediaUploadStep } from './MediaUploadStep';
import { RegistrationComplete } from './RegistrationComplete';
import { PersonalInfo, CorporateInfo, IdentityInfo, MediaFiles } from '../types';
import { User, Building2, Ghost, Fingerprint, KeyRound, CheckCircle, Shield } from 'lucide-react';

interface RegistrationFormProps {
  onComplete: () => void;
  userType?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'individual' | 'corporate' | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    birthDate: '',
    nationality: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [corporateInfo, setCorporateInfo] = useState<CorporateInfo>({
    companyName: '',
    companyType: 'limited',
    taxNumber: '',
    tradeRegistryNumber: '',
    foundationDate: '',
    mersisNumber: '',
    companyAddress: '',
    companyCity: '',
    companyPostalCode: '',
    authorizedPersonFirstName: '',
    authorizedPersonLastName: '',
    authorizedPersonTitle: '',
    authorizedPersonIdNumber: '',
    authorizedPersonPhone: '',
    authorizedPersonEmail: '',
    companyPhone: '',
    companyEmail: '',
    employeeCount: '',
    sector: '',
    website: '',
  });
  const [identityInfo, setIdentityInfo] = useState<IdentityInfo>({
    idNumber: '',
    idType: 'tc',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
  });
  const [mediaFiles, setMediaFiles] = useState<MediaFiles>({
    photos: [],
    videos: [],
    audioRecordings: [],
  });
  const [ghostId, setGhostId] = useState('');
  const [sponHash, setSponHash] = useState('');

  const generateHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  React.useEffect(() => {
    if (currentStep === 4 || (userType === 'corporate' && currentStep === 3)) {
      if (!ghostId) {
        setGhostId(`0x${generateHex(40)}`);
        setSponHash(`SPON-${generateHex(16).toUpperCase()}`);
      }
    }
  }, [currentStep, userType, ghostId]);

  const getSteps = () => {
    if (!userType) return [];
    if (userType === 'individual') {
      return [
        { number: 1, title: 'Kişisel Bilgiler', completed: currentStep > 1 },
        { number: 2, title: 'Kimlik Bilgileri', completed: currentStep > 2 },
        { number: 3, title: 'Medya Dosyaları', completed: currentStep > 3 },
        { number: 4, title: 'Ghost ID / Tamamlandı', completed: currentStep > 4 },
      ];
    } else {
      return [
        { number: 1, title: 'Şirket Bilgileri', completed: currentStep > 1 },
        { number: 2, title: 'Medya Dosyaları', completed: currentStep > 2 },
        { number: 3, title: 'Ghost ID / Tamamlandı', completed: currentStep > 3 },
      ];
    }
  };

  const steps = getSteps();

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Kayıt Türü Seçin</h2>
          <p className="text-slate-300 mb-8 text-center">
            Bireysel veya kurumsal kayıt yapmak istediğinizi seçin
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => {
                setUserType('individual');
                setCurrentStep(1);
              }}
              className="group relative bg-gradient-to-br from-cyber-600/20 to-matrix-600/20 hover:from-cyber-600/30 hover:to-matrix-600/30 border-2 border-cyber-500/50 hover:border-cyber-500 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-cyber-500/30"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-cyber-600 to-matrix-600 rounded-full">
                  <User className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Bireysel Kayıt</h3>
                <p className="text-slate-300 text-sm text-center">
                  Şahsi kimlik bilgileriniz ile kayıt oluşturun
                </p>
                <div className="mt-4 text-cyber-400 font-medium flex items-center space-x-2">
                  <span>Devam Et</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setUserType('corporate');
                setCurrentStep(1);
              }}
              className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border-2 border-purple-500/50 hover:border-purple-500 rounded-xl p-8 transition-all hover:shadow-xl hover:shadow-purple-500/30"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
                  <Building2 className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Kurumsal Kayıt</h3>
                <p className="text-slate-300 text-sm text-center">
                  Şirket bilgileriniz ile kayıt oluşturun
                </p>
                <div className="mt-4 text-purple-400 font-medium flex items-center space-x-2">
                  <span>Devam Et</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (userType === 'individual') {
      switch (currentStep) {
        case 1:
          return (
            <IndividualPersonalInfoStep
              data={personalInfo}
              onChange={setPersonalInfo}
              onNext={() => setCurrentStep(2)}
            />
          );
        case 2:
          return (
            <IdentityInfoStep
              data={identityInfo}
              onChange={setIdentityInfo}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          );
        case 3:
          return (
            <MediaUploadStep
              data={mediaFiles}
              onChange={setMediaFiles}
              onNext={() => setCurrentStep(4)}
              onBack={() => setCurrentStep(2)}
            />
          );
        case 4:
          return (
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-cyber-500/30">
              {/* Ghost ID Assignment */}
              <div className="mb-6 p-4 rounded-xl border" style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Ghost className="h-5 w-5" style={{ color: '#a855f7' }} />
                  <h3 className="text-sm font-bold text-white">Ghost ID / SPON Ataması</h3>
                  <CheckCircle className="h-4 w-4" style={{ color: '#39ff14' }} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                    <Ghost className="h-3.5 w-3.5" style={{ color: '#a855f7' }} />
                    <span className="text-[10px] text-slate-400 flex-1">Ghost ID</span>
                    <span className="text-[10px] font-mono break-all" style={{ color: '#a855f7' }}>{ghostId}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                    <Fingerprint className="h-3.5 w-3.5" style={{ color: '#00e5ff' }} />
                    <span className="text-[10px] text-slate-400 flex-1">SPON Hash</span>
                    <span className="text-[10px] font-mono" style={{ color: '#00e5ff' }}>{sponHash}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Ghost ID kimliğiniz anonim olarak oluşturuldu. PII verileri ifşa edilmez.</p>
              </div>

              <RegistrationComplete
                personalInfo={personalInfo}
                identityInfo={identityInfo}
                mediaFiles={mediaFiles}
                onComplete={onComplete}
              />
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return (
            <CorporatePersonalInfoStep
              data={corporateInfo}
              onChange={setCorporateInfo}
              onNext={() => setCurrentStep(2)}
            />
          );
        case 2:
          return (
            <MediaUploadStep
              data={mediaFiles}
              onChange={setMediaFiles}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          );
        case 3:
          return (
            <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-purple-500/30">
              {/* Ghost ID Assignment */}
              <div className="mb-6 p-4 rounded-xl border" style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.3)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Ghost className="h-5 w-5" style={{ color: '#a855f7' }} />
                  <h3 className="text-sm font-bold text-white">Kurumsal Ghost ID / SPON Ataması</h3>
                  <CheckCircle className="h-4 w-4" style={{ color: '#39ff14' }} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                    <Ghost className="h-3.5 w-3.5" style={{ color: '#a855f7' }} />
                    <span className="text-[10px] text-slate-400 flex-1">Ghost ID</span>
                    <span className="text-[10px] font-mono break-all" style={{ color: '#a855f7' }}>{ghostId}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(2,6,23,0.6)' }}>
                    <Fingerprint className="h-3.5 w-3.5" style={{ color: '#00e5ff' }} />
                    <span className="text-[10px] text-slate-400 flex-1">SPON Hash</span>
                    <span className="text-[10px] font-mono" style={{ color: '#00e5ff' }}>{sponHash}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Kurumsal Ghost ID oluşturuldu. Şirket kimliği anonim olarak doğrulanacaktır.</p>
              </div>

              <RegistrationComplete
                personalInfo={personalInfo}
                identityInfo={identityInfo}
                mediaFiles={mediaFiles}
                onComplete={onComplete}
              />
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Steps */}
      {currentStep > 0 && steps.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : currentStep === step.number
                      ? userType === 'individual'
                        ? 'bg-cyber-600 border-cyber-600 text-white'
                        : 'bg-purple-600 border-purple-600 text-white'
                      : 'border-slate-600 text-slate-400'
                  }`}
                >
                  {step.completed ? '✓' : step.number}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      step.completed || currentStep === step.number
                        ? 'text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      step.completed ? 'bg-emerald-600' : 'bg-slate-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      {renderStep()}
    </div>
  );
};