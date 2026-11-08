export type ReviewDecision = 'approve' | 'reject' | 'reset';

export type ProductStatus = 'pending' | 'approved' | 'rejected';

export interface AdminUserRow {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  user_type: string;
  kyc_verified: boolean;
  created_at: string;
}

export interface DetailField {
  label: string;
  value: string | null;
}

export interface IdentityRegistration {
  id: string;
  kind: 'individual' | 'corporate';
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  registration_status: string;
  verification_status: string;
  created_at: string;
  details: DetailField[];
  mediaUrls: string[];
}

export interface MarketplaceProductRow {
  id: string;
  title: string;
  category: string | null;
  price: number;
  currency: string;
  creator_name: string | null;
  status: ProductStatus;
  file_url: string | null;
  created_at: string;
}
