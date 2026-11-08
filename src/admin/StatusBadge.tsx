const TONES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  submitted: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  draft: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  rejected: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  failed: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

export function StatusBadge({ value }: { value: string }) {
  const tone = TONES[value] ?? 'bg-slate-100 text-slate-600 ring-slate-500/20';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${tone}`}>
      {value}
    </span>
  );
}
