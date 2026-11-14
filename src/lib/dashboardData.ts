import { generateHex, generateGhostId, generateSponHash, generateSoftonToken, generateAssetHash, generateInvoiceId, pqcSign } from './crypto';

export interface DashboardData {
  user: {
    email: string;
    phone: string;
    userType: 'individual' | 'corporate';
    ghostId: string;
    sponHash: string;
    softonToken: string;
  };
  protocolSteps: { step: number; name: string; description: string; status: 'pending' | 'active' | 'complete' }[];
  pukoPhase: 'proactive' | 'apply' | 'control' | 'measure';
  dagNodes: { id: string; x: number; y: number; active: boolean; type: 'validator' | 'relay' | 'sentinel' }[];
  threats: { id: string; type: string; severity: 'low' | 'medium' | 'high' | 'critical'; blocked: boolean; vector: string; timestamp: string }[];
  assets: { id: string; title: string; hash: string; creator: string; category: string; certified: boolean; license: boolean; royalties: { stakeholder: string; share: number }[]; timestamp: string }[];
  constitution: { article: number; title: string; text: string; status: 'active' | 'pending' }[];
  tokenomics: { token: string; balance: number; staked: number; rewards: number; apy: number };
  invoices: { id: string; amount: number; currency: string; status: 'pending' | 'paid' | 'overdue'; due: string }[];
}

export const initDashboard = (email: string, phone: string, userType: 'individual' | 'corporate'): DashboardData => {
  const ghostId = generateGhostId();
  const sponHash = generateSponHash();
  const softonToken = generateSoftonToken();

  const protocolSteps = [
    { step: 1, name: 'Ghost ID Generation', description: 'Anonymous identity layer', status: 'complete' as const },
    { step: 2, name: 'SPON KYC Hash', description: 'Biometric KYC verification', status: 'complete' as const },
    { step: 3, name: 'SOFTON Token', description: 'Session token creation', status: 'complete' as const },
    { step: 4, name: 'DAG Node Registration', description: 'Sovereign Bridge DAG record', status: 'complete' as const },
    { step: 5, name: 'Cerebro Sentinel', description: 'AI threat detection', status: 'complete' as const },
    { step: 6, name: 'PUKO Cycle', description: 'Proactive defense cycle', status: 'complete' as const },
    { step: 7, name: 'Constitution Approval', description: '6-article digital constitution', status: 'complete' as const },
    { step: 8, name: 'Asset Registration', description: 'Universal asset and copyright registration', status: 'complete' as const },
    { step: 9, name: 'Smart Contract', description: 'Automated payment distribution', status: 'complete' as const },
    { step: 10, name: 'Brand Protection', description: 'Polymorphic identity protection', status: 'complete' as const },
    { step: 11, name: 'Sovereignty', description: 'Full transformation protocol', status: 'complete' as const },
  ];

  const dagNodes = Array.from({ length: 12 }, (_, i) => ({
    id: `node-${i}`,
    x: 50 + Math.cos((i / 12) * Math.PI * 2) * 35,
    y: 50 + Math.sin((i / 12) * Math.PI * 2) * 35,
    active: Math.random() > 0.3,
    type: i % 3 === 0 ? 'sentinel' as const : i % 2 === 0 ? 'validator' as const : 'relay' as const,
  }));

  const threats = [
    { id: 'T1', type: 'Phishing', severity: 'medium' as const, blocked: true, vector: 'email', timestamp: '2 min ago' },
    { id: 'T2', type: 'Brute Force', severity: 'high' as const, blocked: true, vector: 'auth', timestamp: '8 min ago' },
    { id: 'T3', type: 'Deepfake', severity: 'critical' as const, blocked: true, vector: 'media', timestamp: '15 min ago' },
    { id: 'T4', type: 'Quantum Probe', severity: 'high' as const, blocked: true, vector: 'network', timestamp: '32 min ago' },
    { id: 'T5', type: 'SQL Injection', severity: 'low' as const, blocked: true, vector: 'api', timestamp: '1 hr ago' },
  ];

  const assets = [
    {
      id: 'A1', title: 'Blue Hours (Music Composition)', hash: generateAssetHash(), creator: 'Ayse Y.',
      category: 'Digital Content', certified: true, license: true,
      royalties: [{ stakeholder: 'Composer', share: 60 }, { stakeholder: 'Lyricist', share: 25 }, { stakeholder: 'DigiGuard', share: 15 }],
      timestamp: '2026-07-18',
    },
    {
      id: 'A2', title: 'City Breath (Photography)', hash: generateAssetHash(), creator: 'Mehmet K.',
      category: 'Digital Content', certified: true, license: false,
      royalties: [{ stakeholder: 'Photographer', share: 85 }, { stakeholder: 'DigiGuard', share: 15 }],
      timestamp: '2026-07-17',
    },
    {
      id: 'A3', title: 'Olive Tree #A-2847', hash: generateAssetHash(), creator: 'Farmer Hasan T.',
      category: 'Plant', certified: true, license: true,
      royalties: [{ stakeholder: 'Producer', share: 90 }, { stakeholder: 'DigiGuard', share: 10 }],
      timestamp: '2026-07-15',
    },
    {
      id: 'A4', title: 'Max (Golden Retriever)', hash: generateAssetHash(), creator: 'Owner Elif D.',
      category: 'Animal', certified: true, license: true,
      royalties: [{ stakeholder: 'Owner', share: 95 }, { stakeholder: 'DigiGuard', share: 5 }],
      timestamp: '2026-07-12',
    },
    {
      id: 'A5', title: 'Karprime Technology Inc.', hash: generateAssetHash(), creator: 'Corporate Registry',
      category: 'Corporate', certified: true, license: true,
      royalties: [{ stakeholder: 'Corporation', share: 92 }, { stakeholder: 'DigiGuard', share: 8 }],
      timestamp: '2026-07-08',
    },
    {
      id: 'A6', title: 'Tolga Kara (Individual)', hash: generateAssetHash(), creator: 'Personal Registry',
      category: 'Individual', certified: true, license: false,
      royalties: [{ stakeholder: 'Individual', share: 95 }, { stakeholder: 'DigiGuard', share: 5 }],
      timestamp: '2026-07-01',
    },
    {
      id: 'A7', title: 'iPhone 15 Pro Max', hash: generateAssetHash(), creator: 'Apple Inc.',
      category: 'Product', certified: true, license: true,
      royalties: [{ stakeholder: 'Manufacturer', share: 88 }, { stakeholder: 'DigiGuard', share: 12 }],
      timestamp: '2026-06-28',
    },
    {
      id: 'A8', title: 'Smart Agriculture Sensor #42', hash: generateAssetHash(), creator: 'Kocaeli Greenhouse',
      category: 'Product', certified: false, license: false,
      royalties: [{ stakeholder: 'Producer', share: 90 }, { stakeholder: 'DigiGuard', share: 10 }],
      timestamp: '2026-06-20',
    },
  ];

  const constitution = [
    { article: 1, title: 'Sovereignty', text: 'The user is the sovereign owner of their data. No processing without consent.', status: 'active' as const },
    { article: 2, title: 'Anonymity', text: 'Ghost ID enables identity verification without exposing PII.', status: 'active' as const },
    { article: 3, title: 'Quantum Resistance', text: 'Dilithium+Kyber-1024 and AES-256-GCM are mandatory.', status: 'active' as const },
    { article: 4, title: 'Asset Rights', text: 'Universal asset registration and smart contracts for royalty distribution.', status: 'active' as const },
    { article: 5, title: 'Defense', text: 'PUKO cycle for proactive threat defense.', status: 'active' as const },
    { article: 6, title: 'Transformation', text: 'Full transformation protocol in 11 steps.', status: 'active' as const },
  ];

  const tokenomics = {
    token: 'DGD (Digiguard Native Utility Token)',
    balance: 12500,
    staked: 8000,
    rewards: 320,
    apy: 8.4,
  };

  const invoices = [
    { id: generateInvoiceId(), amount: 2500, currency: 'DGD', status: 'paid' as const, due: '2026-07-10' },
    { id: generateInvoiceId(), amount: 1800, currency: 'DGD', status: 'pending' as const, due: '2026-07-25' },
    { id: generateInvoiceId(), amount: 950, currency: 'DGD', status: 'overdue' as const, due: '2026-07-05' },
  ];

  return { user: { email, phone, userType, ghostId, sponHash, softonToken }, protocolSteps, pukoPhase: 'proactive', dagNodes, threats, assets, constitution, tokenomics, invoices };
};

export { pqcSign };
