export const hex = (len: number) =>
  Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
export const generateHex = hex;

export const generateGhostId = () => `0x${hex(40)}`;
export const generateSponHash = () => `SPON-${hex(16).toUpperCase()}`;
export const generateSoftonToken = () => `SOFTON-${hex(20).toUpperCase()}`;
export const generateAssetHash = () => `0x${hex(64)}`;
export const generateInvoiceId = () => `INV-${Date.now()}-${hex(8).toUpperCase()}`;

export const shortHash = (h: string, n = 12) =>
  h.length > n * 2 + 2 ? `${h.slice(0, n)}...${h.slice(-6)}` : h;

export const pqcSign = (payload: string) =>
  `DILI-${btoa(payload).slice(0, 32).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24)}-${hex(8).toUpperCase()}`;
