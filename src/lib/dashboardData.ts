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
  assets: { id: string; title: string; hash: string; creator: string; category: string; certified: boolean; mesam: boolean; royalties: { stakeholder: string; share: number }[]; timestamp: string }[];
  constitution: { article: number; title: string; text: string; status: 'active' | 'pending' }[];
  tokenomics: { token: string; balance: number; staked: number; rewards: number; apy: number };
  invoices: { id: string; amount: number; currency: string; status: 'pending' | 'paid' | 'overdue'; due: string }[];
}

export const initDashboard = (email: string, phone: string, userType: 'individual' | 'corporate'): DashboardData => {
  const ghostId = generateGhostId();
  const sponHash = generateSponHash();
  const softonToken = generateSoftonToken();

  const protocolSteps = [
    { step: 1, name: 'Ghost ID Olusturma', description: 'Anonim kimlik katmani', status: 'complete' as const },
    { step: 2, name: 'SPON KYC Hash', description: 'Biyometrik KYC dogrulama', status: 'complete' as const },
    { step: 3, name: 'SOFTON Token', description: 'Oturum tokeni olusturma', status: 'complete' as const },
    { step: 4, name: 'DAG Dugum Kaydi', description: 'Sovereign Bridge DAG kaydi', status: 'complete' as const },
    { step: 5, name: 'Cerebro Sentinel', description: 'AI tehdit tespiti', status: 'complete' as const },
    { step: 6, name: 'PUKO Dongusu', description: 'Proaktif savunma döngüsü', status: 'complete' as const },
    { step: 7, name: 'Anayasa Onayi', description: '6 madde dijital anayasa', status: 'complete' as const },
    { step: 8, name: 'MESAM Telif', description: 'Telif hakki kaydi', status: 'complete' as const },
    { step: 9, name: 'Akıllı Sozlesme', description: 'Otomatik ödeme dağitim', status: 'complete' as const },
    { step: 10, name: 'Marka Suistimal', description: 'Polimorfik kimlik korumasi', status: 'complete' as const },
    { step: 11, name: 'Egemenlik', description: 'Tam teşekküllü dönüşüm', status: 'complete' as const },
  ];

  const dagNodes = Array.from({ length: 12 }, (_, i) => ({
    id: `node-${i}`,
    x: 50 + Math.cos((i / 12) * Math.PI * 2) * 35,
    y: 50 + Math.sin((i / 12) * Math.PI * 2) * 35,
    active: Math.random() > 0.3,
    type: i % 3 === 0 ? 'sentinel' as const : i % 2 === 0 ? 'validator' as const : 'relay' as const,
  }));

  const threats = [
    { id: 'T1', type: 'Phishing', severity: 'medium' as const, blocked: true, vector: 'email', timestamp: '2 dk once' },
    { id: 'T2', type: 'Brute Force', severity: 'high' as const, blocked: true, vector: 'auth', timestamp: '8 dk once' },
    { id: 'T3', type: 'Deepfake', severity: 'critical' as const, blocked: true, vector: 'media', timestamp: '15 dk once' },
    { id: 'T4', type: 'Quantum Probe', severity: 'high' as const, blocked: true, vector: 'network', timestamp: '32 dk once' },
    { id: 'T5', type: 'SQL Injection', severity: 'low' as const, blocked: true, vector: 'api', timestamp: '1 sa once' },
  ];

  const assets = [
    {
      id: 'A1', title: 'Mavi Saatler (Müzik)', hash: generateAssetHash(), creator: 'Ayse Y.',
      category: 'Müzik', certified: true, mesam: true,
      royalties: [{ stakeholder: 'Besteci', share: 60 }, { stakeholder: 'Söz Yazarı', share: 25 }, { stakeholder: 'DigiGuard', share: 15 }],
      timestamp: '2026-07-18',
    },
    {
      id: 'A2', title: 'Sehir Nefesi (Foto)', hash: generateAssetHash(), creator: 'Mehmet K.',
      category: 'Gorsel', certified: true, mesam: false,
      royalties: [{ stakeholder: 'Fotografci', share: 85 }, { stakeholder: 'DigiGuard', share: 15 }],
      timestamp: '2026-07-17',
    },
  ];

  const constitution = [
    { article: 1, title: 'Egemenlik', text: 'Kullanici kendi verisinin egemenidir. Onay olmadan islenemez.', status: 'active' as const },
    { article: 2, title: 'Anonimlik', text: 'Ghost ID ile PII ifşa edilmeden kimlik dogrulanir.', status: 'active' as const },
    { article: 3, title: 'Kuantum Direnci', text: 'Dilithium+Kyber-1024 ve AES-256-GCM zorunludur.', status: 'active' as const },
    { article: 4, title: 'Telif Hakki', text: 'MESAM uyumlu akıllı sozlesmeler ile telif dagitimi.', status: 'active' as const },
    { article: 5, title: 'Savunma', text: 'PUKO döngüsü ile proaktif tehdit savunmasi.', status: 'active' as const },
    { article: 6, title: 'Donusum', text: 'Tam teşekküllü dönüşüm protokolü 11 adimda tamamlanir.', status: 'active' as const },
  ];

  const tokenomics = {
    token: 'DGU (DigiGuard Unit)',
    balance: 12500,
    staked: 8000,
    rewards: 320,
    apy: 8.4,
  };

  const invoices = [
    { id: generateInvoiceId(), amount: 2500, currency: 'DGU', status: 'paid' as const, due: '2026-07-10' },
    { id: generateInvoiceId(), amount: 1800, currency: 'DGU', status: 'pending' as const, due: '2026-07-25' },
    { id: generateInvoiceId(), amount: 950, currency: 'DGU', status: 'overdue' as const, due: '2026-07-05' },
  ];

  return { user: { email, phone, userType, ghostId, sponHash, softonToken }, protocolSteps, pukoPhase: 'proactive', dagNodes, threats, assets, constitution, tokenomics, invoices };
};

export { pqcSign };
