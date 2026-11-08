import { useEffect, useMemo, useState } from 'react';
import { Loader2, ExternalLink, X, Check, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { StatusBadge } from './StatusBadge';
import { fetchIdentityRegistrations, tableForKind } from './identityMapper';
import type { IdentityRegistration, ReviewDecision } from './types';

type Filter = 'pending' | 'verified' | 'failed' | 'all';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'pending', label: 'Awaiting review' },
  { id: 'verified', label: 'Verified' },
  { id: 'failed', label: 'Failed' },
  { id: 'all', label: 'All' },
];

const DECISION_PATCH: Record<ReviewDecision, { registration_status: string; verification_status: string }> = {
  approve: { registration_status: 'approved', verification_status: 'verified' },
  reject: { registration_status: 'rejected', verification_status: 'failed' },
  reset: { registration_status: 'submitted', verification_status: 'pending' },
};

export function IdentityReviewPanel() {
  const [registrations, setRegistrations] = useState<IdentityRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('pending');
  const [selected, setSelected] = useState<IdentityRegistration | null>(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    const rows = await fetchIdentityRegistrations();
    if (rows) {
      setRegistrations(rows);
    } else {
      setLoadError('Submissions could not be loaded. Please refresh and try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? registrations : registrations.filter((r) => r.verification_status === filter)),
    [registrations, filter],
  );

  const applyDecision = async (decision: ReviewDecision) => {
    if (!selected) return;
    setBusy(true);
    setActionError(null);
    const { data, error } = await supabase
      .from(tableForKind(selected.kind))
      .update(DECISION_PATCH[decision])
      .eq('id', selected.id)
      .select('id');
    setBusy(false);
    if (error || !data || data.length === 0) {
      setActionError('The decision could not be saved. Please try again.');
      return;
    }
    setSelected(null);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              filter === f.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          </div>
        ) : loadError ? (
          <p className="px-6 py-12 text-center text-sm text-rose-700">{loadError}</p>
        ) : visible.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">No submissions in this view.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {visible.map((reg) => (
              <li key={`${reg.kind}-${reg.id}`}>
                <button
                  type="button"
                  onClick={() => {
                    setActionError(null);
                    setSelected(reg);
                  }}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">{reg.name}</p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      <span className="capitalize">{reg.kind}</span>
                      {reg.city ? ` · ${reg.city}` : ''} · Submitted {new Date(reg.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge value={reg.registration_status} />
                    <StatusBadge value={reg.verification_status} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8" role="dialog" aria-modal="true">
          <div className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 capitalize">{selected.kind} identity</p>
                <h2 className="truncate text-lg font-semibold text-slate-900">{selected.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <div className="flex flex-wrap gap-2">
                <StatusBadge value={selected.registration_status} />
                <StatusBadge value={selected.verification_status} />
              </div>

              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {selected.details
                  .filter((field) => field.value)
                  .map((field) => (
                    <div key={field.label}>
                      <dt className="text-xs font-medium text-slate-500">{field.label}</dt>
                      <dd className="mt-0.5 break-words text-sm text-slate-900">{field.value}</dd>
                    </div>
                  ))}
              </dl>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-900">Uploaded files ({selected.mediaUrls.length})</h3>
                {selected.mediaUrls.length === 0 ? (
                  <p className="text-sm text-slate-500">No files were uploaded with this submission.</p>
                ) : (
                  <ul className="space-y-2">
                    {selected.mediaUrls.map((url, index) => (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 hover:text-cyan-900"
                        >
                          File {index + 1}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {actionError && <p className="rounded-lg bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{actionError}</p>}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                disabled={busy}
                onClick={() => applyDecision('reset')}
                className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to pending
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => applyDecision('reject')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
              >
                <X className="h-4 w-4" />
                Reject
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => applyDecision('approve')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
