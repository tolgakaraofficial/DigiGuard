import { supabase } from './supabaseClient';

export interface CorporateService {
  id: string;
  service_code: string;
  service_name: string;
  service_description: string;
  service_category: string;
  layer: string;
  base_price_monthly: number;
  price_per_call: number;
  is_active: boolean;
}

export interface ServiceTier {
  id: string;
  tier_code: string;
  tier_name: string;
  tier_description: string;
  max_api_calls_per_month: number;
  max_concurrent_requests: number;
  sla_uptime_percent: number;
  sla_response_time_ms: number;
  sla_support_hours: string;
  monthly_price_usd: number;
  features: string[];
  is_active: boolean;
}

export interface CorporateTenant {
  id: string;
  company_name: string;
  tax_number: string;
  contact_email: string;
  contact_phone: string;
  tier_id: string;
  subscription_status: string;
  api_key: string;
  rate_limit_per_minute: number;
  total_api_calls_this_month: number;
  last_api_call_at: string;
  onboarding_date: string;
  contract_end_date: string;
  metadata: Record<string, unknown>;
  tier?: ServiceTier;
}

export interface TenantSubscription {
  id: string;
  tenant_id: string;
  service_id: string;
  status: string;
  monthly_quota: number;
  calls_this_month: number;
  last_called_at: string;
  activated_at: string;
  service?: CorporateService;
}

export interface SlaMetric {
  id: string;
  tenant_id: string;
  service_id: string;
  metric_date: string;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  avg_response_time_ms: number;
  max_response_time_ms: number;
  uptime_percent: number;
  sla_breached: boolean;
  incident_count: number;
}

export interface ApiGatewayLog {
  id: string;
  tenant_id: string;
  service_id: string;
  endpoint: string;
  method: string;
  status_code: number;
  response_time_ms: number;
  request_ip: string;
  sopon_processed: boolean;
  supon_decision: string;
  soft10_certified: boolean;
  created_at: string;
  tenant?: { company_name: string };
  service?: { service_name: string };
}

export async function fetchServices(): Promise<CorporateService[]> {
  try {
    const { data, error } = await supabase
      .from('corporate_services')
      .select('*')
      .eq('is_active', true)
      .order('service_category', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchTiers(): Promise<ServiceTier[]> {
  try {
    const { data, error } = await supabase
      .from('service_tiers')
      .select('*')
      .eq('is_active', true)
      .order('monthly_price_usd', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchTenants(): Promise<CorporateTenant[]> {
  try {
    const { data, error } = await supabase
      .from('corporate_tenants')
      .select('*, tier:service_tiers(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchTenantSubscriptions(tenantId: string): Promise<TenantSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('tenant_service_subscriptions')
      .select('*, service:corporate_services(*)')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchSlaMetrics(tenantId: string, days = 7): Promise<SlaMetric[]> {
  try {
    const { data, error } = await supabase
      .from('sla_metrics')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('metric_date', { ascending: false })
      .limit(days * 10);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export async function fetchGatewayLogs(limit = 20): Promise<ApiGatewayLog[]> {
  try {
    const { data, error } = await supabase
      .from('api_gateway_logs')
      .select('*, tenant:corporate_tenants(company_name), service:corporate_services(service_name)')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export function generateApiKey(): string {
  const hex = '0123456789abcdef';
  let suffix = '';
  for (let i = 0; i < 24; i++) suffix += hex[Math.floor(Math.random() * 16)];
  return `dg_sk_${suffix}`;
}

export async function createTenant(input: {
  company_name: string;
  tax_number?: string;
  contact_email?: string;
  contact_phone?: string;
  tier_id: string;
  rate_limit_per_minute?: number;
}): Promise<CorporateTenant | null> {
  const apiKey = generateApiKey();
  try {
    const { data, error } = await supabase
      .from('corporate_tenants')
      .insert({
        company_name: input.company_name,
        tax_number: input.tax_number || null,
        contact_email: input.contact_email || null,
        contact_phone: input.contact_phone || null,
        tier_id: input.tier_id,
        subscription_status: 'active',
        api_key: apiKey,
        rate_limit_per_minute: input.rate_limit_per_minute || 100,
        total_api_calls_this_month: 0,
        onboarding_date: new Date().toISOString(),
        contract_end_date: new Date(Date.now() + 365 * 86400000).toISOString(),
        metadata: {},
      })
      .select('*, tier:service_tiers(*)')
      .single();
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function updateTenantStatus(tenantId: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('corporate_tenants')
      .update({ subscription_status: status })
      .eq('id', tenantId);
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}

export async function subscribeTenantToService(
  tenantId: string,
  serviceId: string,
  monthlyQuota: number
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('tenant_service_subscriptions')
      .insert({
        tenant_id: tenantId,
        service_id: serviceId,
        status: 'active',
        monthly_quota: monthlyQuota,
        calls_this_month: 0,
        activated_at: new Date().toISOString(),
      });
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}
