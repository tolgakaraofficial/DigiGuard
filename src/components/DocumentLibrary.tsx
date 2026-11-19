import React, { useState, useMemo } from 'react';
import {
  FileText, Download, ExternalLink, Search, Filter,
  BookOpen, Shield, Gavel, Cpu, Wallet, Network, Award,
  FileStack, ChevronRight, X, Eye,
} from 'lucide-react';

interface DocItem {
  filename: string;
  title: string;
  category: string;
  description: string;
}

const DOCUMENTS: DocItem[] = [
  // Constitution (Constitution) - Cilt 1-7
  { filename: 'Digiguard_Cerebro_Constitution_Cilt1.pdf', title: 'Constitution Cilt 1', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Temel Ilkeler' },
  { filename: 'Digiguard_Cerebro_Constitution_Cilt2.pdf', title: 'Constitution Cilt 2', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Yonetim Doisi' },
  { filename: 'Digiguard_Cerebro_Constitution_Cilt3.pdf', title: 'Constitution Cilt 3', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Hak ve Questionmluluklar' },
  { filename: 'Digiguard_Cerebro_Constitution_Cilt4.pdf', title: 'Constitution Cilt 4', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Security Protocols' },
  { filename: 'Digiguard_Cerebro_Constitution_Cilt5.pdf', title: 'Constitution Cilt 5', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Data Yonetimi' },
  { filename: 'Digiguard_Cerebro_Constitution_Cilt6.pdf', title: 'Constitution Cilt 6', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Integration Rulelari' },
  { filename: 'Digiguard_Cerebro_Constitution_Cilt7.pdf', title: 'Constitution Cilt 7', category: 'Constitution', description: 'DigiGuard Cerebro Constitution - Gelecek Vizyon' },
  { filename: 'dguard_anayasasi_cilt14.pdf', title: 'Constitution Cilt 14', category: 'Constitution', description: 'DGuard Constitution - Cilt 14' },
  { filename: 'dguard_anayasasi_cilt15.pdf', title: 'Constitution Cilt 15', category: 'Constitution', description: 'DGuard Constitution - Cilt 15' },
  { filename: 'DOC-SUPREME-CONSTITUTION-2026.pdf', title: 'Supreme Constitution 2026', category: 'Constitution', description: 'Supreme Constitution Document 2026' },

  // Celebron Ciltleri (Volumes)
  { filename: 'digiguard_celebron_cilt1.pdf', title: 'Celebron Cilt 1', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 1' },
  { filename: 'digiguard_celebron_cilt2.pdf', title: 'Celebron Cilt 2', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 2' },
  { filename: 'digiguard_celebron_cilt3.pdf', title: 'Celebron Cilt 3', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 3' },
  { filename: 'digiguard_celebron_cilt4.pdf', title: 'Celebron Cilt 4', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 4' },
  { filename: 'digiguard_celebron_cilt5.pdf', title: 'Celebron Cilt 5', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 5' },
  { filename: 'digiguard_celebron_cilt7.pdf', title: 'Celebron Cilt 7', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 7' },
  { filename: 'digiguard_celebron_cilt8.pdf', title: 'Celebron Cilt 8', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 8' },
  { filename: 'digiguard_celebron_cilt9.pdf', title: 'Celebron Cilt 9', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 9' },
  { filename: 'digiguard_celebron_cilt10.pdf', title: 'Celebron Cilt 10', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 10' },
  { filename: 'digiguard_celebron_cilt11.pdf', title: 'Celebron Cilt 11', category: 'Celebron Serisi', description: 'DigiGuard Celebron - Cilt 11' },

  // Teknik El Continentbi (Technical Manual)
  { filename: 'digiguard_teknik_el_kitabi_cilt_8.pdf', title: 'Teknik El Continentbi Cilt 8', category: 'Teknik Dokumantasyon', description: 'DigiGuard Teknik El Continentbi - Cilt 8' },
  { filename: 'digiguard_teknik_el_kitabi_cilt_9.pdf', title: 'Teknik El Continentbi Cilt 9', category: 'Teknik Dokumantasyon', description: 'DigiGuard Teknik El Continentbi - Cilt 9' },
  { filename: 'digiguard_teknik_el_kitabi_cilt_10.pdf', title: 'Teknik El Continentbi Cilt 10', category: 'Teknik Dokumantasyon', description: 'DigiGuard Teknik El Continentbi - Cilt 10' },
  { filename: 'dguard_documentation_v1.pdf', title: 'DGuard Documentation v1', category: 'Teknik Dokumantasyon', description: 'DGuard General Documentation v1' },
  { filename: 'dguard_documentation_cilt11.pdf', title: 'Dokumantasyon Cilt 11', category: 'Teknik Dokumantasyon', description: 'DGuard Documentation - Cilt 11' },
  { filename: 'dguard_documentation_cilt12.pdf', title: 'Dokumantasyon Cilt 12', category: 'Teknik Dokumantasyon', description: 'DGuard Documentation - Cilt 12' },
  { filename: 'dguard_documentation_cilt13.pdf', title: 'Dokumantasyon Cilt 13', category: 'Teknik Dokumantasyon', description: 'DGuard Documentation - Cilt 13' },
  { filename: 'dguard_cilt14.pdf', title: 'DGuard Cilt 14', category: 'Teknik Dokumantasyon', description: 'DGuard Documentation - Cilt 14' },
  { filename: 'dguard_cilt15.pdf', title: 'DGuard Cilt 15', category: 'Teknik Dokumantasyon', description: 'DGuard Documentation - Cilt 15' },

  // Monitoring ve Protocoller (Monitoring & Protocols)
  { filename: 'Dguard_Cilt16_Monitoring_Protocols_ve_Cerebro_NetMesh.pdf', title: 'Monitoring Protocols ve NetMesh', category: 'Monitoring ve Protocoller', description: 'Cilt 16 - Monitoring Protocols ve Cerebro NetMesh' },
  { filename: 'Dguard_Cilt17_Coklu_Evrensel_Identity_Bridgeleri_ve_Kuantum_Sonrasi_Gecis.pdf', title: 'Coklu Evrensel Identity Bridgeleri', category: 'Monitoring ve Protocoller', description: 'Cilt 17 - Coklu Evrensel Identity Bridgeleri ve Kuantum Sonrasi Gecis' },
  { filename: 'Dguard_Cilt18_Otonom_Error_Onarim_Kodlari_ve_Siber_Savunma.pdf', title: 'Otonom Error Onarim ve Siber Savunma', category: 'Monitoring ve Protocoller', description: 'Cilt 18 - Otonom Error Onarim Kodlari ve Siber Savunma' },

  // Master Plan ve Tuzuk (Master Plan & Charter)
  { filename: 'Digiguard_Cerebro_Master_Plan.pdf', title: 'Cerebro Master Plan', category: 'Master Plan ve Tuzuk', description: 'DigiGuard Cerebro Master Plani' },
  { filename: 'Digiguard_Cerebro_Web4_Otonom_Tuzuk.pdf', title: 'Web4 Otonom Tuzuk', category: 'Master Plan ve Tuzuk', description: 'DigiGuard Cerebro Web4 Otonom Tuzuk' },
  { filename: 'DigiGuard_Global_Integration_Master_Plani.pdf', title: 'Global Integration Master Plani', category: 'Master Plan ve Tuzuk', description: 'DigiGuard Global Integration Master Plani' },
  { filename: 'DigiGuard_Ultimate_Master_Plan_With_Enterprise_VIP.pdf', title: 'Ultimate Master Plan (Enterprise VIP)', category: 'Master Plan ve Tuzuk', description: 'DigiGuard Ultimate Master Plan - Enterprise VIP' },

  // Cerebro Network (Network Architectureure)
  { filename: 'Cerebro_Network_Dynamic_Lifecycle_KYC_Bridge.pdf', title: 'Dynamic Lifecycle KYC Bridge', category: 'Cerebro Network', description: 'Cerebro Network Dynamic Lifecycle KYC Bridge' },
  { filename: 'Cerebro_Network_Quantum_Integration_Blueprint.pdf', title: 'Quantum Integration Blueprint', category: 'Cerebro Network', description: 'Cerebro Network Quantum Integration Blueprint' },
  { filename: 'Cerebro_Network_Universal_Language_Blueprint.pdf', title: 'Universal Language Blueprint', category: 'Cerebro Network', description: 'Cerebro Network Universal Language Blueprint' },
  { filename: 'Cerebro_IP_Vault_Closed_Circuit_Architectureure.pdf', title: 'IP Vault Closed Circuit', category: 'Cerebro Network', description: 'Cerebro IP Vault Closed Circuit Architectureure' },

  // Spesifikasyonlar (Specifications)
  { filename: 'DigiGuard_Celebron_Specification.pdf', title: 'Celebron Specification', category: 'Spesifikasyonlar', description: 'DigiGuard Celebron Specification' },
  { filename: 'DigiGuard_Comprehensive_Ultimate_Specification.pdf', title: 'Comprehensive Ultimate Specification', category: 'Spesifikasyonlar', description: 'DigiGuard Comprehensive Ultimate Specification' },
  { filename: 'DigiGuard_Final_Master_Specification.pdf', title: 'Final Master Specification', category: 'Spesifikasyonlar', description: 'DigiGuard Final Master Specification' },
  { filename: 'DigiGuard_Master_Code_Specification.pdf', title: 'Master Code Specification', category: 'Spesifikasyonlar', description: 'DigiGuard Master Code Specification' },
  { filename: 'DigiGuard_Master_Specification_Complete.pdf', title: 'Master Specification Complete', category: 'Spesifikasyonlar', description: 'DigiGuard Master Specification Complete' },
  { filename: 'DigiGuard_Master_Specification_Vol1.pdf', title: 'Master Specification Vol 1', category: 'Spesifikasyonlar', description: 'DigiGuard Master Specification Volume 1' },
  { filename: 'DigiGuard_Kuantum_Login_Architecture_Sartnamesi.pdf', title: 'Kuantum Login Architecture Sartnamesi', category: 'Spesifikasyonlar', description: 'DigiGuard Kuantum Login Architecture Sartnamesi' },
  { filename: 'digiguard_celebron_master_specification-v2.pdf', title: 'Celebron Master Specification v2', category: 'Spesifikasyonlar', description: 'DigiGuard Celebron Master Specification v2' },

  // Defense & Security (Defense & Security)
  { filename: 'digiguard_celebron_defense_spec.pdf', title: 'Defense Specification', category: 'Defense & Security', description: 'DigiGuard Celebron Defense Specification' },
  { filename: 'digiguard_celebron_forensic_osint_v3.pdf', title: 'Forensic OSINT v3', category: 'Defense & Security', description: 'DigiGuard Celebron Forensic OSINT v3' },
  { filename: 'digiguard_celebron_liability_shield_v5.pdf', title: 'Liability Shield v5', category: 'Defense & Security', description: 'DigiGuard Celebron Liability Shield v5' },

  // Ekosistem ve Wallet (Ecosystem & Wallet)
  { filename: 'digiguard_celebron_master_ecosystem.pdf', title: 'Master Ecosystem', category: 'Ekosistem ve Wallet', description: 'DigiGuard Celebron Master Ecosystem' },
  { filename: 'digiguard_celebron_master_recovery.pdf', title: 'Master Recovery', category: 'Ekosistem ve Wallet', description: 'DigiGuard Celebron Master Recovery' },
  { filename: 'digiguard_celebron_integrated_wallet-v2.pdf', title: 'Integrated Wallet v2', category: 'Ekosistem ve Wallet', description: 'DigiGuard Celebron Integrated Wallet v2' },
  { filename: 'digiguard_celebron_web4.pdf', title: 'Celebron Web4', category: 'Ekosistem ve Wallet', description: 'DigiGuard Celebron Web4' },
  { filename: 'digiguard_celebron_login_theme.pdf', title: 'Login Theme', category: 'Ekosistem ve Wallet', description: 'DigiGuard Celebron Login Theme' },

  // Certificatesyon (Certification)
  { filename: 'digiguard_sertifikasyon_sistemi.pdf', title: 'Certificatesyon Systemi', category: 'Certificatesyon', description: 'DigiGuard Certificatesyon Systemi' },

  // Patent ve Donanim (Patents & Hardware)
  { filename: 'Cerebro_Patent_Documentleri_Birlesik.pdf', title: 'Patent Documentleri (Birlesik)', category: 'Patent ve Donanim', description: 'Cerebro Patent Documentleri - Birlesik' },
  { filename: 'DOC-ADVANCED-HARDWARE-EVALUATION-2026.pdf', title: 'First Namevanced Hardware Evaluation 2026', category: 'Patent ve Donanim', description: 'First Namevanced Hardware Evaluation 2026' },

  // Investor & Prototype (Investor & Prototype)
  { filename: 'dguard_investor_summary.pdf', title: 'Investor Summary', category: 'Investor & Prototype', description: 'DGuard Investor Summary' },
  { filename: 'dguard_tam_comprehensive_investor_summary.pdf', title: 'Comprehensive Investor Summary', category: 'Investor & Prototype', description: 'DGuard Comprehensive Investor Summary' },
  { filename: 'dguard_prototype_adim6.pdf', title: 'Prototype Step 6', category: 'Investor & Prototype', description: 'DGuard Prototype - Step 6' },
  { filename: 'dguard_prototype_adim7.pdf', title: 'Prototype Step 7', category: 'Investor & Prototype', description: 'DGuard Prototype - Step 7' },
  { filename: 'dguard_prototype_adim8.pdf', title: 'Prototype Step 8', category: 'Investor & Prototype', description: 'DGuard Prototype - Step 8' },
  { filename: 'dguard_prototype_adim9.pdf', title: 'Prototype Step 9', category: 'Investor & Prototype', description: 'DGuard Prototype - Step 9' },

  // Master Ozetler (Master Summaries)
  { filename: 'digiguard_master_architecture.pdf', title: 'Master Architectureure', category: 'Master Ozetler', description: 'DigiGuard Master Architectureure' },
  { filename: 'digiguard_master_summary.pdf', title: 'Master Summary', category: 'Master Ozetler', description: 'DigiGuard Master Summary' },

  // Tesvik (Incentives)
  { filename: 'turkiye_tesvik_rehberi.pdf', title: 'Turkey Tesvik Rehberi', category: 'Tesvik', description: 'Turkey Tesvik Rehberi' },
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Constitution': Gavel,
  'Celebron Serisi': BookOpen,
  'Teknik Dokumantasyon': FileText,
  'Monitoring ve Protocoller': Cpu,
  'Master Plan ve Tuzuk': FileStack,
  'Cerebro Network': Network,
  'Spesifikasyonlar': Shield,
  'Defense & Security': Shield,
  'Ekosistem ve Wallet': Wallet,
  'Certificatesyon': Award,
  'Patent ve Donanim': Cpu,
  'Investor & Prototype': BookOpen,
  'Master Ozetler': FileStack,
  'Tesvik': FileText,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Constitution': '#ef4444',
  'Celebron Serisi': '#a855f7',
  'Teknik Dokumantasyon': '#00e5ff',
  'Monitoring ve Protocoller': '#39ff14',
  'Master Plan ve Tuzuk': '#f97316',
  'Cerebro Network': '#00e5ff',
  'Spesifikasyonlar': '#06b6d4',
  'Defense & Security': '#ef4444',
  'Ekosistem ve Wallet': '#f59e0b',
  'Certificatesyon': '#22c55e',
  'Patent ve Donanim': '#a855f7',
  'Investor & Prototype': '#3b82f6',
  'Master Ozetler': '#f97316',
  'Tesvik': '#06b6d4',
};

export const DocumentLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setOpentiveCategory] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(DOCUMENTS.map((d) => d.category));
    return Array.from(cats).sort();
  }, []);

  const filteredDocs = useMemo(() => {
    return DOCUMENTS.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const groupedDocs = useMemo(() => {
    const groups: Record<string, DocItem[]> = {};
    filteredDocs.forEach((doc) => {
      if (!groups[doc.category]) groups[doc.category] = [];
      groups[doc.category].push(doc);
    });
    return groups;
  }, [filteredDocs]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <FileStack className="h-5 w-5 text-cyber-400" />
        <h2 className="text-lg font-bold text-white">Document Kutuphanesi</h2>
        <span className="text-xs text-slate-500 font-mono ml-2">({DOCUMENTS.length} belge)</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Document ara..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-500/50 focus:ring-1 focus:ring-cyber-500/30 transition"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
        <button
          onClick={() => setOpentiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
            activeCategory === 'all'
              ? 'bg-slate-800 text-white border border-slate-600'
              : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-300'
          }`}
        >
          Getl
        </button>
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat] || FileText;
          const color = CATEGORY_COLORS[cat] || '#00e5ff';
          return (
            <button
              key={cat}
              onClick={() => setOpentiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-slate-800 text-white border'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-300'
              }`}
              style={activeCategory === cat ? { borderColor: `${color}50` } : undefined}
            >
              <Icon className="h-3 w-3" style={{ color }} />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-[10px] text-slate-500 font-mono">
        {filteredDocs.length} belge bulundu
        {activeCategory !== 'all' && ` - ${activeCategory}`}
      </p>

      {/* Document Groups */}
      <div className="space-y-6">
        {Object.entries(groupedDocs).map(([category, docs]) => {
          const Icon = CATEGORY_ICONS[category] || FileText;
          const color = CATEGORY_COLORS[category] || '#00e5ff';
          return (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                <h3 className="text-sm font-bold text-white">{category}</h3>
                <span className="text-[10px] text-slate-500 font-mono">({docs.length})</span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
              </div>

              {/* Document cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {docs.map((doc) => (
                  <div
                    key={doc.filename}
                    className="card p-4 border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-slate-800/80 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FileText className="h-5 w-5" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-cyber-300 transition-colors">
                          {doc.title}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{doc.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-slate-700 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Searchnizla eslesen belge bulunamadi.</p>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl border border-slate-700 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-cyber-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">{selectedDoc.title}</p>
                  <p className="text-[10px] text-slate-500">{selectedDoc.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/documents/${selectedDoc.filename}`}
                  download={selectedDoc.filename}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <a
                  href={`/documents/${selectedDoc.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  New Sekme
                </a>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 overflow-hidden bg-slate-950">
              <iframe
                src={`/documents/${selectedDoc.filename}`}
                title={selectedDoc.title}
                className="w-full h-full"
                style={{ minHeight: '70vh' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
