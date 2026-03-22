import React, { useState } from 'react';
import { PersonalInfoStep } from './PersonalInfoStep';
import { IdentityInfoStep } from './IdentityInfoStep';
import { MediaUploadStep } from './MediaUploadStep';
import { RegistrationComplete } from './RegistrationComplete';
import { PersonalInfo, IdentityInfo, MediaFiles } from '../types';

interface RegistrationFormProps {
  onComplete: () => void;
  userType?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete, userType = 'individual' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    birthDate: '',
    nationality: '',
    address: '',
    city: '',
    postalCode: '',
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

  const steps = [
    { number: 1, title: 'Kişisel Bilgiler', completed: currentStep > 1 },
    { number: 2, title: 'Kimlik Bilgileri', completed: currentStep > 2 },
    { number: 3, title: 'Medya Dosyaları', completed: currentStep > 3 },
    { number: 4, title: 'Tamamlandı', completed: currentStep > 4 },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
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
          <RegistrationComplete
            personalInfo={personalInfo}
            identityInfo={identityInfo}
            mediaFiles={mediaFiles}
            onComplete={onComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  step.completed
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : currentStep === step.number
                    ? 'bg-blue-600 border-blue-600 text-white'
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

      {/* Step Content */}
      {renderStep()}
    </div>
  );
};