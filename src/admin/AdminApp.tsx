import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminShell } from './AdminShell';

type GateState = 'loading' | 'signed_out' | 'denied' | 'authorized';

export function AdminApp() {
  const [gate, setGate] = useState<GateState>('loading');

  useEffect(() => {
    let active = true;

    const resolve = async (session: Session | null) => {
      if (!session) {
        if (active) setGate('signed_out');
        return;
      }
      const { data, error } = await supabase.rpc('is_admin');
      if (!active) return;
      setGate(!error && data === true ? 'authorized' : 'denied');
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        await resolve(session);
      })();
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (gate === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
      </div>
    );
  }

  if (gate === 'signed_out') return <AdminLogin />;

  if (gate === 'denied') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <ShieldAlert className="mx-auto mb-3 h-8 w-8 text-rose-600" />
          <h1 className="text-lg font-semibold text-slate-900">Access not available</h1>
          <p className="mt-2 text-sm text-slate-500">
            This account does not have administrator access to the console.
          </p>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            className="mt-5 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <AdminShell />;
}
