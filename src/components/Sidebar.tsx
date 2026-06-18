import React from 'react';
import { ChevronLeft, ChevronRight, Users, Globe as Globe2, Workflow, Heart, Network, BookOpen, Shield, Info, Menu, Award, CreditCard, BarChart3, Cpu, Link2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenUserScenarios: () => void;
  onOpenGlobalReach: () => void;
  onOpenIntegrations: () => void;
  onOpenPublicBenefit: () => void;
  onOpenTurkeyCertificate: () => void;
  onOpenPricing: () => void;
  onOpenSecurityMetrics: () => void;
  onOpenSecurityEvolution?: () => void;
  onOpenERPIntegration?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onOpenUserScenarios,
  onOpenGlobalReach,
  onOpenIntegrations,
  onOpenPublicBenefit,
  onOpenTurkeyCertificate,
  onOpenPricing,
  onOpenSecurityMetrics,
  onOpenSecurityEvolution,
  onOpenERPIntegration,
}) => {
  const menuItems = [
    {
      icon: Users,
      label: 'Kullanıcı Senaryoları',
      color: 'from-blue-600 to-cyan-600',
      action: onOpenUserScenarios,
    },
    {
      icon: Globe2,
      label: 'Küresel Erişim',
      color: 'from-green-600 to-emerald-600',
      action: onOpenGlobalReach,
    },
    {
      icon: Link2,
      label: 'ERP, CRM, SOAP/REST',
      color: 'from-emerald-600 to-teal-600',
      action: onOpenERPIntegration || (() => {}),
    },
    {
      icon: Workflow,
      label: 'Entegrasyonlar',
      color: 'from-purple-600 to-pink-600',
      action: onOpenIntegrations,
    },
    {
      icon: Heart,
      label: 'Kamu Yararı',
      color: 'from-pink-600 to-rose-600',
      action: onOpenPublicBenefit,
    },
    {
      icon: Award,
      label: 'Türkiye Sertifika',
      color: 'from-red-600 to-red-700',
      action: onOpenTurkeyCertificate,
    },
    {
      icon: CreditCard,
      label: 'Fiyatlandırma',
      color: 'from-green-600 to-emerald-600',
      action: onOpenPricing,
    },
    {
      icon: BarChart3,
      label: 'Güvenlik Metrikleri',
      color: 'from-cyan-600 to-blue-600',
      action: onOpenSecurityMetrics,
    },
    {
      icon: Cpu,
      label: 'Self-Evolving Security',
      color: 'from-emerald-600 to-teal-600',
      action: onOpenSecurityEvolution || (() => {}),
    },
    {
      icon: Network,
      label: 'Ekip İşbirliği',
      color: 'from-indigo-600 to-blue-600',
      action: () => alert('Takımlar arası KYC yönetimi, rol tabanlı erişim kontrolleri ve kurumsal dashboard özellikleri yakında!'),
    },
    {
      icon: BookOpen,
      label: 'Eğitim',
      color: 'from-yellow-600 to-orange-600',
      action: () => alert('Video eğitim kütüphanesi, interaktif rehberler ve sertifika programları hazırlanıyor!'),
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-slate-800 p-2 rounded-lg border border-cyan-500/50 shadow-lg"
      >
        <Menu className="h-6 w-6 text-cyan-400" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-slate-900/95 backdrop-blur-md border-r border-cyan-500/30 transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              {isOpen && (
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white font-bold">DigiGuard</span>
                </div>
              )}
              <button
                onClick={onToggle}
                className="ml-auto p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isOpen ? (
                  <ChevronLeft className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-2 px-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full group relative"
                >
                  <div
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-slate-800 ${
                      !isOpen && 'justify-center'
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${item.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    {isOpen && (
                      <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap border border-cyan-500/30 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          {isOpen && (
            <div className="p-4 border-t border-slate-700">
              <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      DigiGuard ile kimliğinizi koruyun, güvenle dijital dünyada yaşayın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
