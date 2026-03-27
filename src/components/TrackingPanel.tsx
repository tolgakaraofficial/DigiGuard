import React, { useState, useEffect } from 'react';
import { MapPin, Radio, Search, Navigation, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { trackingService, PersonTracking, ChipItem } from '../services/trackingService';

interface TrackingPanelProps {
  language?: string;
}

export const TrackingPanel: React.FC<TrackingPanelProps> = ({ language = 'tr' }) => {
  const [personTracking, setPersonTracking] = useState<PersonTracking[]>([]);
  const [chipItems, setChipItems] = useState<ChipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<'person' | 'chip' | null>('person');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    loadTrackingData();
  }, []);

  const loadTrackingData = async () => {
    try {
      const [persons, chips] = await Promise.all([
        trackingService.getMyTracking(),
        trackingService.getMyChipItems(),
      ]);
      setPersonTracking(persons || []);
      setChipItems(chips || []);
    } catch (error) {
      console.error('Takip verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentLocation = async (id: string, type: 'person' | 'chip') => {
    try {
      const location = await trackingService.getCurrentLocation();
      await trackingService.updateLocation(id, type, location);
      await loadTrackingData();
      alert('Konum güncellendi!');
    } catch (error) {
      console.error('Konum güncellenirken hata:', error);
      alert('Konum alınamadı. Lütfen konum izinlerini kontrol edin.');
    }
  };

  const toggleTracking = async (id: string, type: 'person' | 'chip', currentStatus: boolean) => {
    try {
      await trackingService.toggleTracking(id, type, !currentStatus);
      await loadTrackingData();
    } catch (error) {
      console.error('Takip durumu değiştirilirken hata:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <button
          onClick={() => setExpandedSection(expandedSection === 'person' ? null : 'person')}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">Kişi Takibi</h3>
              <p className="text-sm text-slate-400">{personTracking.length} aktif kayıt</p>
            </div>
          </div>
          {expandedSection === 'person' ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedSection === 'person' && (
          <div className="space-y-3">
            {personTracking.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Radio className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Henüz kayıtlı kişi takibi yok</p>
              </div>
            ) : (
              personTracking.map((person) => (
                <div
                  key={person.id}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white">Sertifika: {person.certificate_id}</span>
                        {person.tracking_enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400">GSM: {person.gsm_number}</p>
                      <p className="text-sm text-slate-400">Baz İstasyonu: {person.last_base_station || 'Bilinmiyor'}</p>
                      {person.current_location && (
                        <p className="text-xs text-blue-400 mt-1">
                          Konum: {person.current_location.lat.toFixed(6)}, {person.current_location.lng.toFixed(6)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateCurrentLocation(person.id, 'person')}
                        className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-all"
                        title="Konumu Güncelle"
                      >
                        <Navigation className="w-4 h-4 text-blue-400" />
                      </button>
                      <button
                        onClick={() => toggleTracking(person.id, 'person', person.tracking_enabled)}
                        className={`p-2 rounded-lg transition-all ${
                          person.tracking_enabled
                            ? 'bg-green-500/10 hover:bg-green-500/20'
                            : 'bg-red-500/10 hover:bg-red-500/20'
                        }`}
                        title={person.tracking_enabled ? 'Takibi Durdur' : 'Takibi Başlat'}
                      >
                        {person.tracking_enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
        <button
          onClick={() => setExpandedSection(expandedSection === 'chip' ? null : 'chip')}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Radio className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white">Çipli Varlık Takibi</h3>
              <p className="text-sm text-slate-400">{chipItems.length} kayıtlı varlık</p>
            </div>
          </div>
          {expandedSection === 'chip' ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {expandedSection === 'chip' && (
          <div className="space-y-3">
            {chipItems.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Henüz kayıtlı çipli varlık yok</p>
              </div>
            ) : (
              chipItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-white">{item.item_name}</span>
                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs rounded-full">
                          {item.item_type}
                        </span>
                        {item.tracking_enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400">Çip: {item.chip_code}</p>
                      <p className="text-sm text-slate-400">Sertifika: {item.certificate_id}</p>
                      {item.current_location && (
                        <p className="text-xs text-purple-400 mt-1">
                          Konum: {item.current_location.lat.toFixed(6)}, {item.current_location.lng.toFixed(6)}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mt-1">
                        Son görülme: {new Date(item.last_seen).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateCurrentLocation(item.id, 'chip')}
                        className="p-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-all"
                        title="Konumu Güncelle"
                      >
                        <Navigation className="w-4 h-4 text-purple-400" />
                      </button>
                      <button
                        onClick={() => toggleTracking(item.id, 'chip', item.tracking_enabled)}
                        className={`p-2 rounded-lg transition-all ${
                          item.tracking_enabled
                            ? 'bg-green-500/10 hover:bg-green-500/20'
                            : 'bg-red-500/10 hover:bg-red-500/20'
                        }`}
                        title={item.tracking_enabled ? 'Takibi Durdur' : 'Takibi Başlat'}
                      >
                        {item.tracking_enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
