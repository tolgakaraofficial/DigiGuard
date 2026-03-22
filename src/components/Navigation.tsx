import React from 'react';
import { Home, Info, Target, BookOpen, FileText, Shield } from 'lucide-react';

export type PageType = 'dashboard' | 'about' | 'vision' | 'usecases' | 'certificate';

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard' as PageType, label: 'Ana Sayfa', icon: Home },
    { id: 'about' as PageType, label: 'Hakkında', icon: Info },
    { id: 'vision' as PageType, label: 'Vizyon', icon: Target },
    { id: 'usecases' as PageType, label: 'Kullanım Senaryoları', icon: BookOpen },
    { id: 'certificate' as PageType, label: 'Sertifikam', icon: FileText },
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700 mb-8">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-500 text-blue-400 bg-slate-700/50'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
