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
  mesam: boolean;
  timestamp: string;
  royalties: { stakeholder: string; share: number }[];
}

export interface ProtocolStep {
  step: number;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
}
