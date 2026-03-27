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
    <div className="space-y-3">
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
        <button
          onClick={() => setExpandedSection(expandedSection === 'person' ? null : 'person')}
          className="w-full flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-500/10 rounded">
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-white">Kişi Takibi</h3>
              <p className="text-xs text-slate-400">{personTracking.length} kayıt</p>
            </div>
          </div>
          {expandedSection === 'person' ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {expandedSection === 'person' && (
          <div className="space-y-2">
            {personTracking.length === 0 ? (
              <div className="text-center py-4 text-slate-400">
                <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Henüz kayıt yok</p>
              </div>
            ) : (
              personTracking.map((person) => (
                <div
                  key={person.id}
                  className="bg-slate-700/30 rounded p-2 border border-slate-700 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm text-white">{person.certificate_id}</span>
                        {person.tracking_enabled ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{person.gsm_number}</p>
                      {person.current_location && (
                        <p className="text-[10px] text-blue-400 mt-0.5">
                          {person.current_location.lat.toFixed(4)}, {person.current_location.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateCurrentLocation(person.id, 'person')}
                        className="p-1 bg-blue-500/10 hover:bg-blue-500/20 rounded transition-all"
                        title="Konum Güncelle"
                      >
                        <Navigation className="w-3 h-3 text-blue-400" />
                      </button>
                      <button
                        onClick={() => toggleTracking(person.id, 'person', person.tracking_enabled)}
                        className={`p-1 rounded transition-all ${
                          person.tracking_enabled
                            ? 'bg-green-500/10 hover:bg-green-500/20'
                            : 'bg-red-500/10 hover:bg-red-500/20'
                        }`}
                        title={person.tracking_enabled ? 'Durdur' : 'Başlat'}
                      >
                        {person.tracking_enabled ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
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

      <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
        <button
          onClick={() => setExpandedSection(expandedSection === 'chip' ? null : 'chip')}
          className="w-full flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-500/10 rounded">
              <Radio className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-white">Çipli Varlık</h3>
              <p className="text-xs text-slate-400">{chipItems.length} varlık</p>
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
                  className="bg-slate-700/30 rounded p-2 border border-slate-700 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm text-white">{item.item_name}</span>
                        <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] rounded">
                          {item.item_type}
                        </span>
                        {item.tracking_enabled ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{item.chip_code}</p>
                      {item.current_location && (
                        <p className="text-[10px] text-purple-400 mt-0.5">
                          {item.current_location.lat.toFixed(4)}, {item.current_location.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => updateCurrentLocation(item.id, 'chip')}
                        className="p-1 bg-purple-500/10 hover:bg-purple-500/20 rounded transition-all"
                        title="Konum Güncelle"
                      >
                        <Navigation className="w-3 h-3 text-purple-400" />
                      </button>
                      <button
                        onClick={() => toggleTracking(item.id, 'chip', item.tracking_enabled)}
                        className={`p-1 rounded transition-all ${
                          item.tracking_enabled
                            ? 'bg-green-500/10 hover:bg-green-500/20'
                            : 'bg-red-500/10 hover:bg-red-500/20'
                        }`}
                        title={item.tracking_enabled ? 'Durdur' : 'Başlat'}
                      >
                        {item.tracking_enabled ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
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
