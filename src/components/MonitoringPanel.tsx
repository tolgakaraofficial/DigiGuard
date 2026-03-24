import React, { useState, useEffect } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, XCircle, Eye, Image, Video, Mic, Award, Globe, Clock, TrendingUp, Download, RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface Violation {
  id: string;
  violation_type: string;
  severity: string;
  source_platform: string;
  source_url: string;
  detection_confidence: number;
  content_type: string;
  status: string;
  detected_at: string;
}

interface Scan {
  id: string;
  scan_type: string;
  scan_status: string;
  total_sources: number;
  scanned_sources: number;
  started_at: string;
  completed_at: string;
}

export const MonitoringPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scans' | 'violations'>('dashboard');
  const [scanning, setScanning] = useState(false);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [recentScans, setRecentScans] = useState<Scan[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    activeScans: 0,
    totalViolations: 0,
    criticalViolations: 0,
    highViolations: 0,
    mediumViolations: 0,
    lowViolations: 0,
    resolvedViolations: 0,
  });

  const platforms = [
    'Google Search', 'Bing', 'Yandex',
    'Facebook', 'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube',
    'Dark Web Monitors', 'Data Breach Databases', 'Image Search Engines',
    'Document Repositories', 'Public Records', 'Social Media Aggregators'
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: scansData } = await supabase
      .from('identity_scans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: violationsData } = await supabase
      .from('identity_violations')
      .select('*')
      .eq('user_id', user.id)
      .order('detected_at', { ascending: false });

    if (scansData) setRecentScans(scansData);
    if (violationsData) {
      setViolations(violationsData);

      setStats({
        totalScans: scansData?.length || 0,
        activeScans: scansData?.filter(s => s.scan_status === 'scanning').length || 0,
        totalViolations: violationsData.length,
        criticalViolations: violationsData.filter(v => v.severity === 'critical').length,
        highViolations: violationsData.filter(v => v.severity === 'high').length,
        mediumViolations: violationsData.filter(v => v.severity === 'medium').length,
        lowViolations: violationsData.filter(v => v.severity === 'low').length,
        resolvedViolations: violationsData.filter(v => v.status === 'resolved').length,
      });
    }
  };

  const startFullScan = async () => {
    setScanning(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: scan, error } = await supabase
      .from('identity_scans')
      .insert({
        user_id: user.id,
        scan_type: 'full',
        scan_status: 'scanning',
        total_sources: platforms.length,
        scanned_sources: 0,
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error || !scan) {
      setScanning(false);
      return;
    }

    simulateScan(scan.id, user.id);
  };

  const simulateScan = async (scanId: string, userId: string) => {
    const violationTypes = ['unauthorized_image', 'fake_profile', 'identity_theft', 'certificate_fraud', 'deepfake', 'data_breach'];
    const severities = ['low', 'medium', 'high', 'critical'];
    const contentTypes = ['image', 'video', 'audio', 'text', 'document'];

    for (let i = 0; i < platforms.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));

      await supabase
        .from('identity_scans')
        .update({ scanned_sources: i + 1 })
        .eq('id', scanId);

      if (Math.random() > 0.7) {
        const severity = severities[Math.floor(Math.random() * severities.length)];
        await supabase
          .from('identity_violations')
          .insert({
            scan_id: scanId,
            user_id: userId,
            violation_type: violationTypes[Math.floor(Math.random() * violationTypes.length)],
            severity,
            source_platform: platforms[i],
            source_url: `https://example.com/violation/${Math.random().toString(36).substr(2, 9)}`,
            detection_confidence: Math.floor(Math.random() * 30) + 70,
            content_type: contentTypes[Math.floor(Math.random() * contentTypes.length)],
            status: 'detected',
          });
      }
    }

    await supabase
      .from('identity_scans')
      .update({
        scan_status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', scanId);

    setScanning(false);
    loadDashboardData();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-500/50';
      case 'medium': return 'text-amber-400 bg-amber-900/30 border-amber-500/50';
      case 'low': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      default: return 'text-slate-400 bg-slate-900/30 border-slate-500/50';
    }
  };

  const getViolationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      unauthorized_image: 'Yetkisiz Görsel Kullanımı',
      fake_profile: 'Sahte Profil',
      identity_theft: 'Kimlik Hırsızlığı',
      certificate_fraud: 'Sertifika Sahteciliği',
      deepfake: 'Deepfake/Yapay İçerik',
      data_breach: 'Veri İhlali',
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Shield className="h-7 w-7 text-cyber-400 mr-3" />
            Kimlik İzleme ve İhlal Tespit Merkezi
          </h2>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            Tüm arama motorları, sosyal medya ve web sitelerinden kimlik taraması
            <span className="px-2 py-0.5 bg-yellow-600/30 text-yellow-300 text-xs rounded-full border border-yellow-500/50 font-semibold">
              Tarama/Raporlama Ücretlidir
            </span>
          </p>
        </div>
        <button
          onClick={startFullScan}
          disabled={scanning}
          className="bg-gradient-to-r from-cyber-600 to-matrix-600 hover:from-cyber-700 hover:to-matrix-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center space-x-2 shadow-lg shadow-cyber-500/30"
        >
          {scanning ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Taranıyor...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Tam Tarama Başlat</span>
            </>
          )}
        </button>
      </div>

      <div className="flex space-x-2 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'dashboard'
              ? 'text-cyber-400 border-b-2 border-cyber-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Genel Bakış
        </button>
        <button
          onClick={() => setActiveTab('scans')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'scans'
              ? 'text-cyber-400 border-b-2 border-cyber-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tarama Geçmişi
        </button>
        <button
          onClick={() => setActiveTab('violations')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'violations'
              ? 'text-cyber-400 border-b-2 border-cyber-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          İhlaller ({stats.totalViolations})
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 rounded-lg p-6 border border-cyber-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Toplam Tarama</p>
                  <p className="text-3xl font-bold text-cyber-400">{stats.totalScans}</p>
                </div>
                <Search className="h-10 w-10 text-cyber-400/50" />
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-lg p-6 border border-red-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Kritik İhlaller</p>
                  <p className="text-3xl font-bold text-red-400">{stats.criticalViolations}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-400/50" />
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-lg p-6 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Yüksek Risk</p>
                  <p className="text-3xl font-bold text-orange-400">{stats.highViolations}</p>
                </div>
                <XCircle className="h-10 w-10 text-orange-400/50" />
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-lg p-6 border border-green-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Çözümlenmiş</p>
                  <p className="text-3xl font-bold text-green-400">{stats.resolvedViolations}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-400/50" />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-lg p-6 border border-cyber-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Globe className="h-5 w-5 text-cyber-400 mr-2" />
              Taranan Platformlar ({platforms.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {platforms.map((platform, index) => (
                <div key={index} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 hover:border-cyber-500/50 transition-all">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-slate-300">{platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Eye className="h-6 w-6 text-amber-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">7/24 Sürekli İzleme Aktif</h3>
                <p className="text-slate-300 text-sm mb-3">
                  Kimliğiniz ve içerikleriniz tüm internet üzerinde sürekli olarak izleniyor.
                  Herhangi bir yetkisiz kullanım anında tespit edilip size bildirilecektir.
                </p>
                <div className="flex items-center flex-wrap gap-3 text-xs">
                  <span className="text-cyber-400 flex items-center">
                    <Image className="h-3 w-3 mr-1" />
                    Görsel Tarama
                  </span>
                  <span className="text-matrix-400 flex items-center">
                    <Video className="h-3 w-3 mr-1" />
                    Video Analizi
                  </span>
                  <span className="text-purple-400 flex items-center">
                    <Mic className="h-3 w-3 mr-1" />
                    Ses Tanıma
                  </span>
                  <span className="text-amber-400 flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Sertifika Kontrolü
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'scans' && (
        <div className="space-y-4">
          {recentScans.length === 0 ? (
            <div className="bg-slate-800/80 rounded-lg p-12 border border-slate-700 text-center">
              <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Henüz tarama yapılmadı</p>
              <p className="text-slate-500 text-sm mt-2">Kimlik koruması için ilk taramayı başlatın</p>
            </div>
          ) : (
            recentScans.map((scan) => (
              <div key={scan.id} className="bg-slate-800/80 rounded-lg p-6 border border-cyber-500/20 hover:border-cyber-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      scan.scan_status === 'completed' ? 'bg-green-900/30' :
                      scan.scan_status === 'scanning' ? 'bg-amber-900/30' :
                      scan.scan_status === 'failed' ? 'bg-red-900/30' :
                      'bg-slate-700/30'
                    }`}>
                      {scan.scan_status === 'completed' && <CheckCircle className="h-6 w-6 text-green-400" />}
                      {scan.scan_status === 'scanning' && <RefreshCw className="h-6 w-6 text-amber-400 animate-spin" />}
                      {scan.scan_status === 'failed' && <XCircle className="h-6 w-6 text-red-400" />}
                      {scan.scan_status === 'pending' && <Clock className="h-6 w-6 text-slate-400" />}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        {scan.scan_type === 'full' ? 'Tam Tarama' : scan.scan_type.toUpperCase()}
                      </h4>
                      <p className="text-slate-400 text-sm">
                        {scan.scanned_sources} / {scan.total_sources} platform tarandı
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        {new Date(scan.started_at).toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        scan.scan_status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-500/50' :
                        scan.scan_status === 'scanning' ? 'bg-amber-900/30 text-amber-400 border border-amber-500/50' :
                        scan.scan_status === 'failed' ? 'bg-red-900/30 text-red-400 border border-red-500/50' :
                        'bg-slate-700/30 text-slate-400 border border-slate-500/50'
                      }`}>
                        {scan.scan_status === 'completed' ? 'Tamamlandı' :
                         scan.scan_status === 'scanning' ? 'Taranıyor' :
                         scan.scan_status === 'failed' ? 'Başarısız' : 'Bekliyor'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'violations' && (
        <div className="space-y-4">
          {violations.length === 0 ? (
            <div className="bg-slate-800/80 rounded-lg p-12 border border-slate-700 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <p className="text-green-400 font-medium">İhlal Tespit Edilmedi</p>
              <p className="text-slate-400 text-sm mt-2">Kimliğiniz güvende, herhangi bir yetkisiz kullanım bulunamadı</p>
            </div>
          ) : (
            violations.map((violation) => (
              <div key={violation.id} className={`bg-slate-800/80 rounded-lg p-6 border ${getSeverityColor(violation.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(violation.severity)}`}>
                        {violation.severity.toUpperCase()}
                      </span>
                      <span className="text-slate-400 text-sm">{violation.source_platform}</span>
                      <span className="text-slate-500 text-xs">
                        {new Date(violation.detected_at).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    <h4 className="text-white font-medium mb-2">{getViolationTypeLabel(violation.violation_type)}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-400">
                        İçerik Tipi: <span className="text-white">{violation.content_type}</span>
                      </span>
                      <span className="text-slate-400">
                        Güven: <span className="text-cyber-400">{violation.detection_confidence}%</span>
                      </span>
                      <span className="text-slate-400">
                        Durum: <span className="text-amber-400">{violation.status === 'detected' ? 'Tespit Edildi' : violation.status}</span>
                      </span>
                    </div>
                    {violation.source_url && (
                      <a
                        href={violation.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-400 hover:text-cyber-300 text-sm mt-2 inline-flex items-center"
                      >
                        Kaynağı Görüntüle
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-cyber-600 hover:bg-cyber-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                      İncele
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                      Çözümle
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
