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
  phone?: string;
  email?: string;
  gender?: 'male' | 'female';
}

export interface CorporateInfo {
  companyName: string;
  companyType: 'limited' | 'anonim' | 'sahis' | 'komandit' | 'kolektif' | 'cooperative' | 'other';
  taxNumber: string;
  tradeRegistryNumber: string;
  foundationDate: string;
  mersisNumber: string;
  companyAddress: string;
  companyCity: string;
  companyPostalCode: string;
  authorizedPersonFirstName: string;
  authorizedPersonLastName: string;
  authorizedPersonTitle: string;
  authorizedPersonIdNumber: string;
  authorizedPersonPhone: string;
  authorizedPersonEmail: string;
  companyPhone: string;
  companyEmail: string;
  employeeCount: string;
  sector: string;
  website: string;
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