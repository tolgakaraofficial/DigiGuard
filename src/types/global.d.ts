// Global type definitions for Web3/Web4/Web5 integrations

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    };
    webkitAudioContext?: typeof AudioContext;
  }
}

// Web3 Types
export interface Web3Provider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
}

// Web4 AI Types
export interface AICapability {
  type: 'vision' | 'audio' | 'nlp' | 'multimodal';
  model: string;
  confidence: number;
}

// Web5 DID Types
export interface DIDDocument {
  '@context': string[];
  id: string;
  verificationMethod: VerificationMethod[];
  authentication: string[];
  service?: ServiceEndpoint[];
}

export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyJwk?: any;
}

export interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string;
}

// Biometric Types
export interface BiometricTemplate {
  type: 'face' | 'voice' | 'fingerprint';
  data: Float32Array;
  quality: number;
  timestamp: number;
}

export interface LivenessDetection {
  isLive: boolean;
  confidence: number;
  challenges: string[];
  responses: any[];
}

export {};