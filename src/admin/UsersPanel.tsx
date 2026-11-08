import { useEffect, useMemo, useState } from 'react';
import { Search, Loader2, BadgeCheck, Ban } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { StatusBadge } from './StatusBadge';
import type { AdminUserRow } from './types';

const USER_COLUMNS = 'id, email, full_name, phone, user_type, kyc_verified, created_at';

export function UsersPanel() {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    const { data, error } = await supabase
      .from('users')
      .select(USER_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(500);
    if (error || !Array.isArray(data)) {
      setLoadError('Users could not be loaded. Please refresh and try again.');
    } else {
      setUsers(data as AdminUserRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.email.toLowerCase().includes(q) || (u.full_name ?? '').toLowerCase().includes(q),
    );
  }, [users, query]);

  const toggleVerified = async (user: AdminUserRow) => {
    setBusyId(user.id);
    setActionError(null);
    const { data, error } = await supabase
      .from('users')
      .update({ kyc_verified: !user.kyc_verified })
      .eq('id', user.id)
      .select('id');
    setBusyId(null);
    if (error || !data || data.length === 0) {
      setActionError('The verification status could not be changed. Please try again.');
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, kyc_verified: !u.kyc_verified } : u)));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/20"
          />
        </div>
        <p className="text-sm text-slate-500">{users.length} registered accounts</p>
      </div>

      {actionError && <p className="rounded-lg bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{actionError}</p>}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          </div>
        ) : loadError ? (
          <p className="px-6 py-12 text-center text-sm text-rose-700">{loadError}</p>
        ) : filtered.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">No accounts match this search.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Identity</th>
                  <th className="px-4 py-3">Registered</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{user.full_name || 'Unnamed'}</td>
                    <td className="px-4 py-3 text-slate-600">{user.email}</td>
                    <td className="px-4 py-3 capitalize text-slate-600">{user.user_type}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={user.kyc_verified ? 'verified' : 'pending'} />
                    </td>
                    <td className="px-4 py-3 text-slate-600">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled={busyId === user.id}
                        onClick={() => toggleVerified(user)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                          user.kyc_verified
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {busyId === user.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : user.kyc_verified ? (
                          <Ban className="h-3.5 w-3.5" />
                        ) : (
                          <BadgeCheck className="h-3.5 w-3.5" />
                        )}
                        {user.kyc_verified ? 'Revoke' : 'Mark verified'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
