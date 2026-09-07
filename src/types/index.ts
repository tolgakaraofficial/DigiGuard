export type AppPage = 'splash' | 'login' | 'register' | 'verify' | 'dashboard';

export type UserType = 'individual' | 'corporate';

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  userType: UserType;
  ghostId: string;
  sponHash: string;
  softonToken: string;
  kycVerified: boolean;
  createdAt: string;
}

export type PUKOPhase = 'proactive' | 'apply' | 'control' | 'measure';

export interface DAGNode {
  id: string;
  x: number;
  y: number;
  active: boolean;
  type: 'validator' | 'relay' | 'sentinel';
}

export interface ThreatEvent {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blocked: boolean;
  timestamp: string;
  vector: string;
}

export interface DigitalAsset {
  id: string;
  title: string;
  hash: string;
  creator: string;
  category: string;
  certified: boolean;
  license: boolean;
  timestamp: string;
  royalties: { stakeholder: string; share: number }[];
}

export interface ProtocolStep {
  step: number;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  telegram?: string;
  website?: string;
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
  socialLinks?: SocialLinks;
}

export interface CorporateInfo {
  companyName: string;
  companyType: string;
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
