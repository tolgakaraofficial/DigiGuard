import { supabase } from '../lib/supabase';
import type { DetailField, IdentityRegistration } from './types';

const INDIVIDUAL_COLUMNS =
  'id, first_name, last_name, birth_date, nationality, address, city, postal_code, id_number, id_type, id_issue_date, id_expiry_date, id_issuing_authority, phone, email, photo_urls, video_urls, audio_urls, registration_status, verification_status, created_at';

const CORPORATE_COLUMNS =
  'id, company_name, company_type, tax_number, trade_registry_number, mersis_number, company_address, company_city, company_postal_code, authorized_person_first_name, authorized_person_last_name, authorized_person_title, authorized_person_id_number, authorized_person_phone, authorized_person_email, company_phone, company_email, employee_count, sector, website, photo_urls, video_urls, audio_urls, document_urls, registration_status, verification_status, created_at';

type Row = Record<string, unknown>;

function text(value: unknown): string | null {
  if (typeof value === 'string' && value.trim() !== '') return value;
  if (typeof value === 'number') return String(value);
  return null;
}

function maskId(value: unknown): string | null {
  const v = text(value);
  return v ? `•••• ${v.slice(-4)}` : null;
}

function safeLink(value: unknown): string | null {
  const v = text(value);
  return v && v.startsWith('https://') ? v : null;
}

function mediaUrls(...values: unknown[]): string[] {
  return values.flatMap((value) => {
    const list = Array.isArray(value) ? value : value && typeof value === 'object' ? Object.values(value) : [];
    return list.filter((item): item is string => typeof item === 'string' && item.startsWith('https://'));
  });
}

function mapIndividual(row: Row): IdentityRegistration {
  const name = [text(row.first_name), text(row.last_name)].filter(Boolean).join(' ') || 'Unnamed applicant';
  return {
    id: String(row.id),
    kind: 'individual',
    name,
    email: text(row.email),
    phone: text(row.phone),
    city: text(row.city),
    registration_status: text(row.registration_status) ?? 'draft',
    verification_status: text(row.verification_status) ?? 'pending',
    created_at: String(row.created_at),
    details: [
      { label: 'Date of birth', value: text(row.birth_date) },
      { label: 'Nationality', value: text(row.nationality) },
      { label: 'ID type', value: text(row.id_type) },
      { label: 'ID number', value: maskId(row.id_number) },
      { label: 'Issued', value: text(row.id_issue_date) },
      { label: 'Expires', value: text(row.id_expiry_date) },
      { label: 'Issuing authority', value: text(row.id_issuing_authority) },
      { label: 'Address', value: text(row.address) },
      { label: 'Postal code', value: text(row.postal_code) },
    ],
    mediaUrls: mediaUrls(row.photo_urls, row.video_urls, row.audio_urls),
  };
}

function mapCorporate(row: Row): IdentityRegistration {
  const authorized = [text(row.authorized_person_first_name), text(row.authorized_person_last_name)]
    .filter(Boolean)
    .join(' ');
  const details: DetailField[] = [
    { label: 'Company type', value: text(row.company_type) },
    { label: 'Tax number', value: maskId(row.tax_number) },
    { label: 'Trade registry', value: text(row.trade_registry_number) },
    { label: 'MERSIS number', value: maskId(row.mersis_number) },
    { label: 'Sector', value: text(row.sector) },
    { label: 'Employees', value: text(row.employee_count) },
    { label: 'Address', value: text(row.company_address) },
    { label: 'Postal code', value: text(row.company_postal_code) },
    { label: 'Company phone', value: text(row.company_phone) },
    { label: 'Company email', value: text(row.company_email) },
    { label: 'Website', value: safeLink(row.website) },
    { label: 'Authorized person', value: authorized || null },
    { label: 'Title', value: text(row.authorized_person_title) },
    { label: 'Authorized ID', value: maskId(row.authorized_person_id_number) },
    { label: 'Authorized phone', value: text(row.authorized_person_phone) },
    { label: 'Authorized email', value: text(row.authorized_person_email) },
  ];
  return {
    id: String(row.id),
    kind: 'corporate',
    name: text(row.company_name) ?? 'Unnamed company',
    email: text(row.company_email),
    phone: text(row.company_phone),
    city: text(row.company_city),
    registration_status: text(row.registration_status) ?? 'draft',
    verification_status: text(row.verification_status) ?? 'pending',
    created_at: String(row.created_at),
    details,
    mediaUrls: mediaUrls(row.photo_urls, row.video_urls, row.audio_urls, row.document_urls),
  };
}

export async function fetchIdentityRegistrations(): Promise<IdentityRegistration[] | null> {
  const [individual, corporate] = await Promise.all([
    supabase.from('individual_registrations').select(INDIVIDUAL_COLUMNS).order('created_at', { ascending: false }).limit(300),
    supabase.from('corporate_registrations').select(CORPORATE_COLUMNS).order('created_at', { ascending: false }).limit(300),
  ]);
  if (individual.error || corporate.error || !Array.isArray(individual.data) || !Array.isArray(corporate.data)) {
    return null;
  }
  const merged = [
    ...(individual.data as Row[]).map(mapIndividual),
    ...(corporate.data as Row[]).map(mapCorporate),
  ];
  return merged.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function tableForKind(kind: IdentityRegistration['kind']): 'individual_registrations' | 'corporate_registrations' {
  return kind === 'individual' ? 'individual_registrations' : 'corporate_registrations';
}
