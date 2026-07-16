import React, { useState } from 'react';
import { BookOpen, Scale, Shield, Layers, Gavel, FileText, Lock, Eye, Server, Cloud, Cpu, Users, ChevronDown, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

interface LayerDef {
  id: number;
  name: string;
  englishName: string;
  icon: React.ElementType;
  color: string;
  description: string;
  responsibilities: string[];
  status: 'active' | 'standby';
}

const layers: LayerDef[] = [
  {
    id: 1,
    name: 'Kimlik Katmani',
    englishName: 'Identity Layer',
    icon: Users,
    color: '#00e5ff',
    description: 'Bireysel ve kurumsal kimlik tanimi, KYC dogrulamasi ve biyometrik guvenlik',
    responsibilities: ['Biyometrik dogrulama (yuz, parmak izi, ses)', 'KYC protokolu (SPON/SOFTON)', 'Ghost ID olusturma', 'dNFT kimlik sertifikasi'],
    status: 'active',
  },
  {
    id: 2,
    name: 'Guvenlik Katmani',
    englishName: 'Security Layer',
    icon: Shield,
    color: '#39ff14',
    description: 'Siber guvenlik, tehdit tespiti, PUKO dongusu ve otonom onarim',
    responsibilities: ['PUKO dongusu (Proaktif-Uyari-Koruma-Onarim)', 'Sopon DeAI tehdit tarama', 'AES-256 + Kyber-1024 sifreleme', 'Otonom hata onarim kodlari'],
    status: 'active',
  },
  {
    id: 3,
    name: 'Ag Katmani',
    englishName: 'Network Layer',
    icon: Server,
    color: '#a855f7',
    description: 'Cerebro Network 5 katmanli mimari, DAG mutabakat ve NetMesh yapisi',
    responsibilities: ['DAG mutabakat (1402 node)', 'NetMesh dagitik yapi', 'Kuantum direncli iletisim', 'Sovereign Bridge protokolu'],
    status: 'active',
  },
  {
    id: 4,
    name: 'Veri Katmani',
    englishName: 'Data Layer',
    icon: Database,
    color: '#f59e0b',
    description: 'Immutable blockchain kayitlari, sertifika olusturma ve veri yonetimi',
    responsibilities: ['Blockchain immutable kayit', 'dNFT sertifika olusturma', 'IoT varlik takip verisi', 'Hybrid wallet (CLB/DGCT/BTC/ETH)'],
    status: 'active',
  },
  {
    id: 5,
    name: 'Web4 Kopru Katmani',
    englishName: 'Web4 Bridge Layer',
    icon: Cloud,
    color: '#ec4899',
    description: 'Web3-Web4 kopru, otonom tuzuk ve kuantum sonrasi gecis protokolu',
    responsibilities: ['Web4 otonom tuzuk', 'Kuantum sonrasi gecis', 'Coklu evrensel kimlik koprueleri', 'Dilithium + Kyber-1024 imza'],
    status: 'active',
  },
];

interface ConstitutionArticle {
  id: string;
  title: string;
  category: 'Kimlik' | 'Guvenlik' | 'Ag' | 'Veri' | 'Web4';
  summary: string;
  status: 'approved' | 'review' | 'draft';
}

const articles: ConstitutionArticle[] = [
  { id: 'A1', title: 'Kimlik Egemenligi', category: 'Kimlik', summary: 'Her birey ve kurulus kimlik verileri uzerinde tam egemenlige sahiptir. Kimlik verileri acik riza olmadan paylasilamaz.', status: 'approved' },
  { id: 'A2', title: 'Biyometrik Koruma', category: 'Kimlik', summary: 'Biyometrik veriler AES-256 ile sifrelenir ve sadece kullanicinin cihazinda tutulur. Sunucuya sadece hash gonderilir.', status: 'approved' },
  { id: 'A3', title: 'Ghost ID Anonimligi', category: 'Kimlik', summary: 'Ghost ID protokolu ile PII verileri ifsa edilmeden anonim dogrulama yapilir.', status: 'approved' },
  { id: 'A4', title: 'SPON/SOFTON Donusum', category: 'Kimlik', summary: "Sovereign Proof of Identity Number ile dogrulanan kimlik, SOFTON tokenina donusturulerek blockchain'e kaydedilir.", status: 'approved' },
  { id: 'A5', title: 'PUKO Dongusu', category: 'Guvenlik', summary: 'Proaktif -> Uyari -> Koruma -> Onarim dongusu tum tehditler icin isler. Otonom onarim kodlari aktiftir.', status: 'approved' },
  { id: 'A6', title: 'Kuantum Direnci', category: 'Guvenlik', summary: 'Dilithium + Kyber-1024 post-kuantum sifreleme standarttir. Kuantum bilgisayarlara karsi direncli.', status: 'approved' },
  { id: 'A7', title: 'Siber Savunma', category: 'Guvenlik', summary: 'Otonom hata onarim kodlari ve siber savunma protokolleri 7/24 isler durumda tutulur.', status: 'approved' },
  { id: 'A8', title: 'DAG Mutabakat', category: 'Ag', summary: 'Cerebro Network 1402 node ile DAG mutabakati saglar. Node sayisi dinamik olarak guncellenir.', status: 'approved' },
  { id: 'A9', title: 'NetMesh Yapisi', category: 'Ag', summary: 'NetMesh dagitik ag yapisi ile tek nokta hatasi (SPOF) onlenir. Yedeklilik %99.99 garantilenir.', status: 'approved' },
  { id: 'A10', title: 'Sovereign Bridge', category: 'Ag', summary: 'Non-custodial fee bridge protokolu ile varliklar kullanici kontrolunde tutulur. 0.8s ortalama islem suresi.', status: 'approved' },
  { id: 'A11', title: 'Immutable Kayit', category: 'Veri', summary: "Tum kimlik dogrulama kayitlari blockchain'e immutable olarak yazilir. Geri alinamaz veya degistirilemez.", status: 'approved' },
  { id: 'A12', title: 'dNFT Sertifika', category: 'Veri', summary: 'Kimlik sertifikalari dNFT olarak mint edilir. Sahiplik kaniti blockchain uzerinde tutulur.', status: 'approved' },
  { id: 'A13', title: 'IoT Varlik Takibi', category: 'Veri', summary: 'IoT cihazlari, araclar, giyilebilir cihazlar kimlik baglamasi ile takip edilir.', status: 'approved' },
  { id: 'A14', title: 'Web4 Otonom Tuzuk', category: 'Web4', summary: 'Web4 otonom tuzuk ile sistem kendini yonetir. Akil sozlesmeler ile otonom karar verilir.', status: 'approved' },
  { id: 'A15', title: 'Kuantum Sonrasi Gecis', category: 'Web4', summary: "Kuantum sonrasi gecis protokolu ile Web3'ten Web4'e guvenli gecis saglanir.", status: 'approved' },
  { id: 'A16', title: 'Coklu Evrensel Kimlik', category: 'Web4', summary: 'Coklu evrensel kimlik koprueleri ile farkli zincirler arasi kimlik tasinabilir.', status: 'approved' },
];

const categoryColors: Record<string, string> = {
  'Kimlik': '#00e5ff',
  'Guvenlik': '#39ff14',
  'Ag': '#a855f7',
  'Veri': '#f59e0b',
  'Web4': '#ec4899',
};

const statusConfig: Record<string, { color: string; label: string; icon: React.ElementType }> = {
  approved: { color: '#39ff14', label: 'Onaylandi', icon: CheckCircle },
  review: { color: '#f59e0b', label: 'Incelemede', icon: Eye },
  draft: { color: '#64748b', label: 'Taslak', icon: FileText },
};

export const SystemConstitutionPanel: React.FC = () => {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(1);
  const [filter, setFilter] = useState<string>('all');

  const filteredArticles = filter === 'all' ? articles : articles.filter(a => a.category === filter);

  return (
    <div className="space-y-6">
      {/* Constitution Header */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.15)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg" style={{ background: 'rgba(0,229,255,0.1)' }}>
            <Scale className="h-6 w-6" style={{ color: '#00e5ff' }} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Sistem Anayasasi</h2>
            <p className="text-xs text-slate-400">Cilt 11: DigiGuard Cerebro Network sistem anayasasi ve 5 katmanli mimari</p>
          </div>
        </div>

        {/* 5 Layer Architecture */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4" style={{ color: '#00e5ff' }} />
            <h3 className="text-sm font-bold text-white">5 Katmanli Mimari</h3>
          </div>
          {layers.map((layer) => (
            <div key={layer.id} className="rounded-lg border overflow-hidden transition-all" style={{ background: 'rgba(2,6,23,0.8)', borderColor: expandedLayer === layer.id ? `${layer.color}40` : 'rgba(255,255,255,0.05)' }}>
              <button
                onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
                className="w-full flex items-center gap-3 p-3 hover:bg-slate-800/40 transition-all"
              >
                <div className="p-2 rounded-lg" style={{ background: `${layer.color}15` }}>
                  <layer.icon className="h-5 w-5" style={{ color: layer.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">#{layer.id}</span>
                    <span className="text-sm font-bold text-white">{layer.name}</span>
                    <span className="text-[10px] text-slate-500">/ {layer.englishName}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{layer.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: `${layer.color}15`, color: layer.color }}>
                    {layer.status === 'active' ? 'AKTIF' : 'STANDBY'}
                  </span>
                  {expandedLayer === layer.id ? <ChevronDown className="h-4 w-4 text-slate-500" /> : <ChevronRight className="h-4 w-4 text-slate-500" />}
                </div>
              </button>
              {expandedLayer === layer.id && (
                <div className="px-4 pb-3 pt-1">
                  <div className="space-y-1">
                    {layer.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <div className="w-1 h-1 rounded-full" style={{ background: layer.color }} />
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Constitution Articles Table */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(0,229,255,0.15)' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" style={{ color: '#00e5ff' }} />
            <h3 className="text-sm font-bold text-white">Anayasa Maddeleri</h3>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${filter === 'all' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              style={filter === 'all' ? { background: 'rgba(0,229,255,0.15)' } : {}}
            >
              Tumu ({articles.length})
            </button>
            {Object.keys(categoryColors).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${filter === cat ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                style={filter === cat ? { background: `${categoryColors[cat]}20` } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Table */}
        <div className="space-y-1">
          <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-2 text-[10px] font-mono text-slate-500 border-b" style={{ borderColor: 'rgba(0,229,255,0.08)' }}>
            <div className="col-span-1">MADDE</div>
            <div className="col-span-3">BASLIK</div>
            <div className="col-span-2">KATEGORI</div>
            <div className="col-span-4">OZET</div>
            <div className="col-span-2">DURUM</div>
          </div>
          {filteredArticles.map((article) => {
            const sc = statusConfig[article.status];
            const cc = categoryColors[article.category];
            return (
              <div key={article.id} className="grid grid-cols-12 gap-2 px-3 py-2.5 rounded-lg transition-all hover:bg-slate-800/30" style={{ background: 'rgba(2,6,23,0.3)' }}>
                <div className="col-span-2 md:col-span-1 flex items-center">
                  <span className="text-[10px] font-mono font-bold" style={{ color: cc }}>{article.id}</span>
                </div>
                <div className="col-span-4 md:col-span-3 flex items-center">
                  <span className="text-xs text-white font-medium">{article.title}</span>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: `${cc}15`, color: cc }}>{article.category}</span>
                </div>
                <div className="col-span-12 md:col-span-4 flex items-center">
                  <span className="text-[10px] text-slate-400">{article.summary}</span>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center gap-1">
                  <sc.icon className="h-3.5 w-3.5" style={{ color: sc.color }} />
                  <span className="text-[10px] font-bold" style={{ color: sc.color }}>{sc.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" style={{ color: '#39ff14' }} /> {articles.filter(a => a.status === 'approved').length} Onaylandi</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" style={{ color: '#f59e0b' }} /> {articles.filter(a => a.status === 'review').length} Incelemede</span>
            <span className="flex items-center gap-1"><FileText className="h-3 w-3" style={{ color: '#64748b' }} /> {articles.filter(a => a.status === 'draft').length} Taslak</span>
          </div>
          <span>Toplam {articles.length} madde | {Object.keys(categoryColors).length} kategori</span>
        </div>
      </div>

      {/* Protocol Approvals */}
      <div className="rounded-xl p-5 border" style={{ background: 'rgba(2,6,23,0.6)', borderColor: 'rgba(57,255,20,0.15)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Gavel className="h-5 w-5" style={{ color: '#39ff14' }} />
          <h3 className="text-sm font-bold text-white">Protokol Onaylari</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'Sovereign Bridge v2', version: 'v2.0', date: '2026-07-16', status: 'approved' },
            { name: 'Ghost ID / SPON / SOFTON', version: 'v1.4', date: '2026-07-16', status: 'approved' },
            { name: 'PUKO Dongusu', version: 'v3.1', date: '2026-07-15', status: 'approved' },
            { name: 'DAG Mutabakat (1402 Node)', version: 'v4.0', date: '2026-07-14', status: 'approved' },
            { name: 'Dilithium + Kyber-1024', version: 'v2.2', date: '2026-07-13', status: 'approved' },
            { name: 'Web4 Otonom Tuzuk', version: 'v1.0', date: '2026-07-12', status: 'approved' },
          ].map((proto, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border" style={{ background: 'rgba(2,6,23,0.8)', borderColor: 'rgba(57,255,20,0.1)' }}>
              <div>
                <p className="text-xs font-bold text-white">{proto.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">{proto.version} · {proto.date}</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: 'rgba(57,255,20,0.1)' }}>
                <CheckCircle className="h-3.5 w-3.5" style={{ color: '#39ff14' }} />
                <span className="text-[10px] font-bold" style={{ color: '#39ff14' }}>ONAYLANDI</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
