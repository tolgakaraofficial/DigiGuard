import React, { useState, useEffect } from 'react';
import {
  X, Shield, Camera, Lock, Unlock, MapPin, AlertTriangle, CheckCircle,
  Activity, Eye, Thermometer, Wifi, Radio, RefreshCw, Clock, Zap
} from 'lucide-react';

interface PhysicalSecurityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Zone {
  id: string;
  name: string;
  level: 'A' | 'B' | 'C' | 'D' | 'E';
  status: 'secure' | 'alert' | 'lockdown' | 'maintenance';
  sensors: number;
  cameras: number;
  personnel: number;
  last_event: string;
  access_count_today: number;
}

interface Sensor {
  id: string;
  type: 'motion' | 'door' | 'camera' | 'temperature' | 'smoke';
  location: string;
  status: 'active' | 'triggered' | 'offline' | 'maintenance';
  last_ping: string;
  value?: string;
}

const ZONES: Zone[] = [
  { id: 'Z-A', name: 'Genel Giriş', level: 'A', status: 'secure', sensors: 12, cameras: 8, personnel: 45, last_event: '3 dk önce', access_count_today: 284 },
  { id: 'Z-B', name: 'Ofis Katı', level: 'B', status: 'secure', sensors: 18, cameras: 12, personnel: 87, last_event: '1 dk önce', access_count_today: 521 },
  { id: 'Z-C', name: 'Sunucu Odası', level: 'C', status: 'alert', sensors: 24, cameras: 16, personnel: 6, last_event: '45 sn önce', access_count_today: 12 },
  { id: 'Z-D', name: 'Yönetim Katı', level: 'D', status: 'secure', sensors: 20, cameras: 10, personnel: 14, last_event: '8 dk önce', access_count_today: 78 },
  { id: 'Z-E', name: 'Kısıtlı Bölge', level: 'E', status: 'lockdown', sensors: 30, cameras: 20, personnel: 3, last_event: '2 sn önce', access_count_today: 4 },
];

const SENSORS: Sensor[] = [
  { id: 'SN-001', type: 'motion', location: 'Giriş Holü', status: 'active', last_ping: '1 sn', value: 'Hareket Yok' },
  { id: 'SN-002', type: 'door', location: 'Sunucu Odası Kapısı', status: 'triggered', last_ping: '45 sn', value: 'AÇIK' },
  { id: 'SN-003', type: 'camera', location: 'Güney Koridoru', status: 'active', last_ping: '2 sn', value: 'Kayıt Aktif' },
  { id: 'SN-004', type: 'temperature', location: 'Sunucu Odası', status: 'triggered', last_ping: '30 sn', value: '28.4°C ⚠' },
  { id: 'SN-005', type: 'smoke', location: 'Kısıtlı Bölge', status: 'active', last_ping: '1 sn', value: 'Temiz' },
  { id: 'SN-006', type: 'motion', location: 'Otoparkın', status: 'offline', last_ping: '4 dk', value: 'Çevrimdışı' },
];

const getZoneStatusColor = (status: string) => {
  switch (status) {
    case 'secure': return { text: 'text-green-400', bg: 'bg-green-500/20 border-green-500/30', dot: 'bg-green-400', label: 'GÜVENLİ' };
    case 'alert': return { text: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30', dot: 'bg-amber-400', label: 'UYARI' };
    case 'lockdown': return { text: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30', dot: 'bg-red-500', label: 'KİLİTLİ' };
    case 'maintenance': return { text: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30', dot: 'bg-blue-400', label: 'BAKIM' };
    default: return { text: 'text-slate-400', bg: 'bg-slate-500/20 border-slate-500/30', dot: 'bg-slate-400', label: 'BİLİNMİYOR' };
  }
};

const getSensorStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-400';
    case 'triggered': return 'text-red-400 animate-pulse';
    case 'offline': return 'text-slate-500';
    case 'maintenance': return 'text-blue-400';
    default: return 'text-slate-400';
  }
};

const getSensorIcon = (type: string) => {
  switch (type) {
    case 'motion': return Radio;
    case 'door': return Lock;
    case 'camera': return Camera;
    case 'temperature': return Thermometer;
    case 'smoke': return Activity;
    default: return Wifi;
  }
};

export const PhysicalSecurityPanel: React.FC<PhysicalSecurityPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'zones' | 'sensors' | 'incidents'>('zones');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => setTick((p) => p + 1), 3000);
    return () => clearInterval(t);
  }, [isOpen]);

  if (!isOpen) return null;

  const alertZones = ZONES.filter((z) => z.status === 'alert' || z.status === 'lockdown');
  const triggeredSensors = SENSORS.filter((s) => s.status === 'triggered');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-auto">
      <div className="w-full max-w-4xl bg-[#060b18] border border-red-500/20 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-gradient-to-r from-red-900/20 to-slate-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 bg-red-500/20 rounded-xl border border-red-500/30">
              <Shield className="h-5 w-5 text-red-400" />
              {alertZones.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Fiziksel Güvenlik Paneli</h2>
              <p className="text-xs text-red-400/70">PhySec-Agent v1.8 — PUKO: KONTROL ET Aşaması</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {alertZones.length > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-lg animate-pulse">
                <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                <span className="text-red-400 text-xs font-semibold">{alertZones.length} Aktif Uyarı</span>
              </div>
            )}
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-5 gap-0 border-b border-red-500/10 flex-shrink-0">
          {[
            { label: 'Toplam Bölge', value: ZONES.length, icon: MapPin, color: 'text-red-400' },
            { label: 'Güvenli', value: ZONES.filter((z) => z.status === 'secure').length, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Uyarı', value: ZONES.filter((z) => z.status === 'alert').length, icon: AlertTriangle, color: 'text-amber-400' },
            { label: 'Kilitli', value: ZONES.filter((z) => z.status === 'lockdown').length, icon: Lock, color: 'text-red-400' },
            { label: 'Toplam Sensör', value: SENSORS.length, icon: Radio, color: 'text-cyan-400' },
          ].map((s, i) => (
            <div key={i} className="p-4 text-center border-r border-red-500/10 last:border-r-0">
              <s.icon className={`h-4 w-4 ${s.color} mx-auto mb-1`} />
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-red-500/10 flex-shrink-0">
          {[
            { key: 'zones', label: 'Bölge Haritası', icon: MapPin },
            { key: 'sensors', label: 'Sensör Grid', icon: Radio },
            { key: 'incidents', label: 'Olaylar', icon: AlertTriangle },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-red-400 text-red-400 bg-red-900/10'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.key === 'sensors' && triggeredSensors.length > 0 && (
                <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] rounded-full font-bold">
                  {triggeredSensors.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-5">
          {activeTab === 'zones' && (
            <div className="grid grid-cols-1 gap-3">
              {/* Floor plan placeholder */}
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-4 mb-2">
                <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Tesis Katı Planı — AI Anomali Haritalaması Aktif
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {ZONES.map((zone) => {
                    const sc = getZoneStatusColor(zone.status);
                    return (
                      <button
                        key={zone.id}
                        onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
                        className={`relative p-3 rounded-lg border ${sc.bg} text-center transition-all hover:scale-105`}
                      >
                        <div className={`text-lg font-bold ${sc.text}`}>{zone.level}</div>
                        <div className="text-[9px] text-slate-400 leading-tight mt-0.5">{zone.name}</div>
                        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${sc.dot} ${zone.status !== 'secure' ? 'animate-pulse' : ''}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {ZONES.map((zone) => {
                const sc = getZoneStatusColor(zone.status);
                const isSelected = selectedZone === zone.id;
                return (
                  <div key={zone.id} className={`bg-slate-800/40 border rounded-xl overflow-hidden transition-all ${isSelected ? sc.bg : 'border-slate-700/30'}`}>
                    <button
                      className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-800/60 transition-colors"
                      onClick={() => setSelectedZone(isSelected ? null : zone.id)}
                    >
                      <div className={`w-10 h-10 rounded-xl ${sc.bg} border flex items-center justify-center`}>
                        <span className={`text-sm font-bold ${sc.text}`}>{zone.level}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{zone.name}</span>
                          <span className={`w-2 h-2 rounded-full ${sc.dot} ${zone.status !== 'secure' ? 'animate-pulse' : ''}`} />
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${sc.bg} ${sc.text}`}>{sc.label}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Son olay: {zone.last_event}</div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <div className="text-center">
                          <div className="font-semibold text-slate-300">{zone.personnel}</div>
                          <div className="text-[9px]">Personel</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-slate-300">{zone.cameras}</div>
                          <div className="text-[9px]">Kamera</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-slate-300">{zone.access_count_today}</div>
                          <div className="text-[9px]">Giriş/Gün</div>
                        </div>
                      </div>
                    </button>
                    {isSelected && (
                      <div className="px-4 pb-4 border-t border-slate-700/30 pt-3">
                        <div className="flex gap-2">
                          {zone.status === 'lockdown' ? (
                            <button className="flex-1 py-2 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-lg hover:bg-green-500/30 transition-colors flex items-center justify-center gap-1.5">
                              <Unlock className="h-3 w-3" /> Kilidi Aç
                            </button>
                          ) : (
                            <button className="flex-1 py-2 bg-red-500/20 border border-red-500/30 text-red-400 text-xs rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-1.5">
                              <Lock className="h-3 w-3" /> Kilitle
                            </button>
                          )}
                          <button className="flex-1 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center justify-center gap-1.5">
                            <Eye className="h-3 w-3" /> Kamera Görüntüsü
                          </button>
                          <button className="flex-1 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-lg hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-1.5">
                            <Zap className="h-3 w-3" /> Alarm Tetikle
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'sensors' && (
            <div className="grid grid-cols-1 gap-3">
              <div className="text-xs text-slate-500 mb-1">PhySec-Agent anlık sensör verilerini SUPON motoru üzerinden tarar ve anomalileri tespit eder</div>
              {SENSORS.map((sensor) => {
                const Icon = getSensorIcon(sensor.type);
                const statusColor = getSensorStatusColor(sensor.status);
                return (
                  <div key={sensor.id} className={`flex items-center gap-4 p-4 rounded-xl border ${
                    sensor.status === 'triggered' ? 'bg-red-900/10 border-red-500/30' :
                    sensor.status === 'offline' ? 'bg-slate-800/20 border-slate-700/20 opacity-60' :
                    'bg-slate-800/40 border-slate-700/30'
                  }`}>
                    <div className={`p-2.5 rounded-xl ${sensor.status === 'triggered' ? 'bg-red-500/20' : 'bg-slate-700/40'}`}>
                      <Icon className={`h-4 w-4 ${statusColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{sensor.id}</span>
                        <span className="text-[10px] text-slate-500">— {sensor.location}</span>
                        {sensor.status === 'triggered' && (
                          <span className="px-1.5 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 text-[9px] rounded font-bold animate-pulse">TETİKLENDİ</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 capitalize">{sensor.type.replace('_', ' ')} Sensörü</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold ${statusColor}`}>{sensor.value}</div>
                      <div className="text-[10px] text-slate-600 flex items-center gap-1 justify-end mt-0.5">
                        <Clock className="h-2.5 w-2.5" /> {sensor.last_ping}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2">AI SIEM motoru tarafından tespit edilen fiziksel güvenlik olayları</div>
              {[
                { time: '2 sn önce', title: 'Yetkisiz Bölge E Erişim Girişimi', desc: 'Bilinmeyen kişi Bölge E girişine yaklaştı. Biyometrik doğrulama başarısız.', severity: 'critical', action: 'Kapı kilitlendi, güvenlik uyarıldı' },
                { time: '45 sn önce', title: 'Sunucu Odası Kapısı Açık Kaldı', desc: 'Yetkili personel kapıyı açık bıraktı (>30 sn). Otomatik alarm tetiklendi.', severity: 'high', action: 'Uyarı sinyali gönderildi' },
                { time: '3 dk önce', title: 'Sunucu Odası Sıcaklık Artışı', desc: 'Sunucu odası sıcaklığı 28.4°C\'ye ulaştı. Kritik eşik: 30°C.', severity: 'medium', action: 'Soğutma sistemi devreye alındı' },
                { time: '8 dk önce', title: 'Normal Mesai Dışı Giriş', desc: 'Yönetim katında mesai saatleri dışında giriş algılandı.', severity: 'low', action: 'Kayıt altına alındı' },
              ].map((inc, i) => {
                const colors: Record<string, string> = {
                  critical: 'bg-red-900/10 border-red-500/30 text-red-400',
                  high: 'bg-orange-900/10 border-orange-500/30 text-orange-400',
                  medium: 'bg-amber-900/10 border-amber-500/30 text-amber-400',
                  low: 'bg-green-900/10 border-green-500/30 text-green-400',
                };
                return (
                  <div key={i} className={`p-4 rounded-xl border ${colors[inc.severity]}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-semibold text-white">{inc.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">{inc.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2 ml-6">{inc.desc}</p>
                    <div className="flex items-center gap-1.5 ml-6 text-[11px]">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-green-400">{inc.action}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
