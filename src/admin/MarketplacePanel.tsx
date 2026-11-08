import { useEffect, useMemo, useState } from 'react';
import { Loader2, Check, X, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { StatusBadge } from './StatusBadge';
import type { MarketplaceProductRow, ProductStatus } from './types';

type Filter = ProductStatus | 'all';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'pending', label: 'Awaiting review' },
  { id: 'approved', label: 'Live' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'all', label: 'All' },
];

const PRODUCT_COLUMNS = 'id, title, category, price, currency, creator_name, status, file_url, created_at';

export function MarketplacePanel() {
  const [products, setProducts] = useState<MarketplaceProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('pending');
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    const { data, error } = await supabase
      .from('marketplace_products')
      .select(PRODUCT_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(500);
    if (error || !Array.isArray(data)) {
      setLoadError('Products could not be loaded. Please refresh and try again.');
    } else {
      setProducts(data as MarketplaceProductRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.status === filter)),
    [products, filter],
  );

  const setStatus = async (product: MarketplaceProductRow, status: ProductStatus) => {
    setBusyId(product.id);
    setActionError(null);
    const { data, error } = await supabase
      .from('marketplace_products')
      .update({ status })
      .eq('id', product.id)
      .select('id');
    setBusyId(null);
    if (error || !data || data.length === 0) {
      setActionError('The product status could not be changed. Please try again.');
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status } : p)));
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

      {actionError && <p className="rounded-lg bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{actionError}</p>}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          </div>
        ) : loadError ? (
          <p className="px-6 py-12 text-center text-sm text-rose-700">{loadError}</p>
        ) : visible.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-slate-500">No products in this view.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((product) => {
                  const busy = busyId === product.id;
                  return (
                    <tr key={product.id} className="transition hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{product.title}</p>
                        <p className="text-xs text-slate-500">{product.category ?? 'Uncategorized'}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{product.creator_name || 'Unknown'}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {product.price} {product.currency}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={product.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {product.status !== 'approved' && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setStatus(product, 'approved')}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Approve
                            </button>
                          )}
                          {product.status !== 'rejected' && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setStatus(product, 'rejected')}
                              className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
                            >
                              <X className="h-3.5 w-3.5" />
                              Reject
                            </button>
                          )}
                          {product.status !== 'pending' && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setStatus(product, 'pending')}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              Pending
                            </button>
                          )}
                          {busy && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
