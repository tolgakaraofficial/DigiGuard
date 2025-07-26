import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PersonalInfoStep } from './PersonalInfoStep';
import { IdentityInfoStep } from './IdentityInfoStep';
import { MediaUploadStep } from './MediaUploadStep';
import { RegistrationComplete } from './RegistrationComplete';
import { PersonalInfo, IdentityInfo, MediaFiles } from '../types';

interface RegistrationFormProps {
  onComplete: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step.number} style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                step.completed && styles.stepCompleted,
                currentStep === step.number && styles.stepActive,
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  (step.completed || currentStep === step.number) && styles.stepNumberActive,
                ]}
              >
                {step.completed ? '✓' : step.number}
              </Text>
            </View>
            <Text
              style={[
                styles.stepTitle,
                (step.completed || currentStep === step.number) && styles.stepTitleActive,
              ]}
            >
              {step.title}
            </Text>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  step.completed && styles.stepLineCompleted,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      {/* Step Content */}
      {renderStep()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCompleted: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  stepActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
  },
  stepTitleActive: {
    color: '#ffffff',
  },
  stepLine: {
    position: 'absolute',
    top: 20,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: '#475569',
    zIndex: -1,
  },
  stepLineCompleted: {
    backgroundColor: '#059669',
  },
});