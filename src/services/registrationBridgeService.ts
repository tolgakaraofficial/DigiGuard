import { supabase } from './supabaseClient';

export interface PipelineRegistrationData {
  userType: 'individual' | 'corporate' | 'personnel';
  fullName: string;
  email?: string;
  city?: string;
  idType?: string;
  idNumber?: string;
  companyName?: string;
  taxNumber?: string;
  profilePhotoFile?: File | null;
  profilePhotoDataUrl?: string | null;
}

export interface PipelineStageResult {
  pipelineId: string;
  certId: string;
  blockchainHash: string;
  blockNumber: number;
  soponScore: number;
  suponDeepfakeScore: number;
  suponIdentityScore: number;
  soft10SecurityScore: number;
  soft10Token: string;
}

function generateCertId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DG-CERT-${y}${m}-${rand}`;
}

function generateHash(): string {
  return `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
}

function generateToken(): string {
  return `eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
    iss: 'digiguard.soft10',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 315360000,
    sub: `dg-${Math.random().toString(36).substring(2, 10)}`,
  })).replace(/=/g, '')}.SOFT10_SIGNATURE`;
}

export async function initiatePipeline(data: PipelineRegistrationData): Promise<string> {
  const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  try {
    const { data: row, error } = await supabase
      .from('registration_pipeline')
      .insert({
        registration_id: registrationId,
        user_type: data.userType,
        full_name: data.fullName,
        email: data.email || null,
        city: data.city || null,
        id_type: data.idType || null,
        company_name: data.companyName || null,
        tax_number: data.taxNumber || null,
        has_profile_photo: !!data.profilePhotoDataUrl,
        photo_url: data.profilePhotoDataUrl || null,
        overall_status: 'initiated',
      })
      .select('id')
      .single();

    if (error) throw error;
    return row.id;
  } catch {
    // Offline mode — return a local UUID
    return `local-${Date.now()}`;
  }
}

export async function runSoponStage(
  pipelineId: string,
  onProgress?: (score: number) => void
): Promise<number> {
  // Simulate async SOPON data filtering (800ms-1.5s)
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((r) => setTimeout(r, 80 + Math.random() * 60));
    onProgress?.(i);
  }
  const score = 92 + Math.random() * 7.5;

  try {
    await supabase
      .from('registration_pipeline')
      .update({
        sopon_status: 'completed',
        sopon_score: score,
        sopon_completed_at: new Date().toISOString(),
        overall_status: 'supon_processing',
        sopon_metadata: {
          throughput: '12.4K req/s',
          filter_pass: true,
          anomaly_flags: 0,
          data_quality: 'high',
        },
      })
      .eq('id', pipelineId);
  } catch { /* offline */ }

  return score;
}

export async function runSuponStage(
  pipelineId: string,
  hasPhoto: boolean,
  onProgress?: (deepfakeScore: number, identityScore: number) => void
): Promise<{ deepfakeScore: number; identityScore: number; decision: string }> {
  // Simulate SUPON deepfake + identity scan (1.2-2s)
  for (let i = 0; i <= 100; i += 5) {
    await new Promise((r) => setTimeout(r, 90 + Math.random() * 80));
    const df = hasPhoto ? 94 + (i / 100) * 4.5 : 88 + (i / 100) * 7;
    const id = 90 + (i / 100) * 8;
    onProgress?.(df, id);
  }

  const deepfakeScore = hasPhoto ? 96.2 + Math.random() * 3 : 90 + Math.random() * 7;
  const identityScore = 91 + Math.random() * 8;
  const decision = deepfakeScore > 85 && identityScore > 80 ? 'approved' : 'manual_review';

  try {
    await supabase
      .from('registration_pipeline')
      .update({
        supon_status: 'completed',
        supon_deepfake_score: deepfakeScore,
        supon_identity_score: identityScore,
        supon_decision: decision,
        supon_completed_at: new Date().toISOString(),
        overall_status: 'soft10_processing',
      })
      .eq('id', pipelineId);
  } catch { /* offline */ }

  return { deepfakeScore, identityScore, decision };
}

export async function runSoft10Stage(
  pipelineId: string,
  data: PipelineRegistrationData,
  onProgress?: (progress: number) => void
): Promise<{ certId: string; hash: string; blockNumber: number; token: string; securityScore: number }> {
  // Simulate SOFT10 cryptographic signing (1-1.8s)
  for (let i = 0; i <= 100; i += 8) {
    await new Promise((r) => setTimeout(r, 70 + Math.random() * 90));
    onProgress?.(i);
  }

  const certId = generateCertId();
  const hash = generateHash();
  const blockNumber = Math.floor(Math.random() * 10000000) + 15000000;
  const token = generateToken();
  const securityScore = 94 + Math.random() * 5.5;

  try {
    await supabase
      .from('registration_pipeline')
      .update({
        soft10_status: 'completed',
        soft10_cert_id: certId,
        soft10_token: token,
        soft10_blockchain_hash: hash,
        soft10_block_number: blockNumber,
        soft10_security_score: securityScore,
        soft10_completed_at: new Date().toISOString(),
        certificate_status: 'ready',
        certificate_ready_at: new Date().toISOString(),
        overall_status: 'completed',
      })
      .eq('id', pipelineId);
  } catch { /* offline */ }

  return { certId, hash, blockNumber, token, securityScore };
}

export async function runFullPipeline(
  data: PipelineRegistrationData,
  callbacks: {
    onSoponProgress?: (pct: number) => void;
    onSuponProgress?: (df: number, id: number) => void;
    onSoft10Progress?: (pct: number) => void;
  }
): Promise<PipelineStageResult> {
  const pipelineId = await initiatePipeline(data);

  const soponScore = await runSoponStage(pipelineId, callbacks.onSoponProgress);
  const { deepfakeScore, identityScore } = await runSuponStage(
    pipelineId,
    !!data.profilePhotoDataUrl,
    callbacks.onSuponProgress
  );
  const { certId, hash, blockNumber, token, securityScore } = await runSoft10Stage(
    pipelineId,
    data,
    callbacks.onSoft10Progress
  );

  return {
    pipelineId,
    certId,
    blockchainHash: hash,
    blockNumber,
    soponScore,
    suponDeepfakeScore: deepfakeScore,
    suponIdentityScore: identityScore,
    soft10SecurityScore: securityScore,
    soft10Token: token,
  };
}
