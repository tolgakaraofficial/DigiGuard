export interface User {
  id: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isRegistered: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface IdentityInfo {
  idNumber: string;
  idType: 'tc' | 'passport' | 'other';
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
}

export interface MediaFiles {
  photos: File[];
  videos: File[];
  audioRecordings: File[];
}

export interface RegistrationData {
  personalInfo: PersonalInfo;
  identityInfo: IdentityInfo;
  mediaFiles: MediaFiles;
}