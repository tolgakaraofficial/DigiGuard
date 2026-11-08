import { useState } from 'react';
import { Users, ShieldCheck, Store, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UsersPanel } from './UsersPanel';
import { IdentityReviewPanel } from './IdentityReviewPanel';
import { MarketplacePanel } from './MarketplacePanel';

type Section = 'users' | 'identity' | 'marketplace';

const SECTIONS: { id: Section; label: string; description: string; icon: typeof Users }[] = [
  { id: 'users', label: 'Users', description: 'Registered accounts and their verification state.', icon: Users },
  { id: 'identity', label: 'Identity review', description: 'Approve or reject submitted identity information.', icon: ShieldCheck },
  { id: 'marketplace', label: 'Marketplace', description: 'Approve or reject products before they go live.', icon: Store },
];

export function AdminShell() {
  const [section, setSection] = useState<Section>('identity');
  const active = SECTIONS.find((s) => s.id === section) ?? SECTIONS[0];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-slate-900 p-4 text-slate-300 md:flex">
        <div className="mb-8 flex items-center gap-2 px-2 pt-2">
          <ShieldCheck className="h-6 w-6 text-cyan-400" />
          <span className="text-base font-semibold text-white">DigiGuard Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {SECTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === section;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800/60 hover:text-slate-100"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 md:px-8">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{active.label}</h1>
            <p className="text-sm text-slate-500">{active.description}</p>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 md:hidden"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </header>

        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-6 py-2 md:hidden">
          {SECTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
                item.id === section ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-6 md:p-8">
          {section === 'users' && <UsersPanel />}
          {section === 'identity' && <IdentityReviewPanel />}
          {section === 'marketplace' && <MarketplacePanel />}
        </main>
      </div>
    </div>
  );
}
