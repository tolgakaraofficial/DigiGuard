import { supabase } from './supabaseClient';

export interface LocationData {
  lat: number;
  lng: number;
  accuracy?: number;
}

export interface PersonTracking {
  id: string;
  user_id: string;
  certificate_id: string;
  gsm_number: string;
  identity_number: string;
  current_location: LocationData;
  last_base_station: string;
  tracking_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChipItem {
  id: string;
  user_id: string;
  certificate_id: string;
  chip_code: string;
  item_type: 'animal' | 'object' | 'vehicle' | 'other';
  item_name: string;
  current_location: LocationData;
  last_seen: string;
  tracking_enabled: boolean;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export const trackingService = {
  async createPersonTracking(data: {
    certificate_id: string;
    gsm_number: string;
    identity_number: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Kullanıcı bulunamadı');

    const { data: result, error } = await supabase
      .from('certified_persons_tracking')
      .insert({
        user_id: user.id,
        certificate_id: data.certificate_id,
        gsm_number: data.gsm_number,
        identity_number: data.identity_number,
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async createChipItem(data: {
    certificate_id: string;
    chip_code: string;
    item_type: 'animal' | 'object' | 'vehicle' | 'other';
    item_name: string;
    metadata?: any;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Kullanıcı bulunamadı');

    const { data: result, error } = await supabase
      .from('chip_certified_items')
      .insert({
        user_id: user.id,
        ...data,
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateLocation(
    trackingId: string,
    trackingType: 'person' | 'chip',
    location: LocationData,
    baseStation?: string
  ) {
    const { error } = await supabase.rpc('update_location', {
      p_tracking_id: trackingId,
      p_tracking_type: trackingType,
      p_location: location,
      p_base_station: baseStation,
    });

    if (error) throw error;
  },

  async getMyTracking() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Kullanıcı bulunamadı');

    const { data, error } = await supabase
      .from('certified_persons_tracking')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    return data;
  },

  async getMyChipItems() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Kullanıcı bulunamadı');

    const { data, error } = await supabase
      .from('chip_certified_items')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    return data;
  },

  async getLocationHistory(trackingId: string, trackingType: 'person' | 'chip') {
    const { data, error } = await supabase
      .from('location_history')
      .select('*')
      .eq('tracking_id', trackingId)
      .eq('tracking_type', trackingType)
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data;
  },

  async getNearbyItems(lat: number, lng: number, radiusKm: number = 10) {
    const { data, error } = await supabase.rpc('get_nearby_items', {
      p_lat: lat,
      p_lng: lng,
      p_radius_km: radiusKm,
    });

    if (error) throw error;
    return data;
  },

  async toggleTracking(id: string, type: 'person' | 'chip', enabled: boolean) {
    const table = type === 'person' ? 'certified_persons_tracking' : 'chip_certified_items';

    const { error } = await supabase
      .from(table)
      .update({ tracking_enabled: enabled })
      .eq('id', id);

    if (error) throw error;
  },

  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Tarayıcınız konum servislerini desteklemiyor'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
