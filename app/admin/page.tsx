'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Purchase {
  _id: string;
  buyerName: string;
  phone: string;
  email: string;
  address: string;
  tier: number;
  numDucks: number;
  amountPaid: number;
  paymentMethod: string;
  purchaseDate: string;
  notes: string;
  duckNumbers: number[];
}

interface PotStats {
  ducks: number;
  total: number;
  winnerPot: number;
  scholarshipPot: number;
}

interface Stats {
  totalDucks: number;
  totalAmount: number;
  totalPurchases: number;
  pots: Record<number, PotStats>;
}

const TIERS = [
  { price: 10, payout: 30, color: 'bg-amber-600' },
  { price: 25, payout: 35, color: 'bg-emerald-600' },
  { price: 50, payout: 40, color: 'bg-blue-600' },
  { price: 100, payout: 50, color: 'bg-purple-600' },
];

export default function AdminPage() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stats, setStats] = useState<Stats>({ totalDucks: 0, totalAmount: 0, totalPurchases: 0, pots: {} });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  // New purchase form state
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    buyerName: '',
    phone: '',
    email: '',
    address: '',
    tier: 10,
    numDucks: 1,
    paymentMethod: 'cash',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState<{ duckNumbers: number[]; amountPaid: number } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      if (!res.ok) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      setAuthenticated(true);
      setAdminUser(data.user?.username || '');
      fetchData();
    } catch {
      router.push('/admin/login');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const fetchData = async () => {
    try {
      const [purchasesRes, statsRes] = await Promise.all([
        fetch('/api/purchases'),
        fetch('/api/stats'),
      ]);

      if (purchasesRes.ok) {
        const data = await purchasesRes.json();
        setPurchases(data);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Address', 'Race Tier', 'Ducks', 'Amount', 'Payment', 'Date', 'Duck Numbers', 'Notes'];
    const rows = purchases.map(p => [
      p.buyerName,
      p.phone,
      p.email,
      p.address,
      `$${p.tier}`,
      p.numDucks.toString(),
      p.amountPaid.toString(),
      p.paymentMethod,
      new Date(p.purchaseDate).toLocaleDateString(),
      p.duckNumbers.join('; '),
      p.notes,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `duck-race-orders-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const printReceipt = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleNewPurchaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPurchase(prev => ({ ...prev, [name]: name === 'tier' || name === 'numDucks' ? parseInt(value) : value }));
  };

  const handleSubmitPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(null);

    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPurchase),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to record purchase');
      }

      setSubmitSuccess({ duckNumbers: data.duckNumbers, amountPaid: data.amountPaid });
      // Reset form
      setNewPurchase({
        buyerName: '',
        phone: '',
        email: '',
        address: '',
        tier: 10,
        numDucks: 1,
        paymentMethod: 'cash',
        notes: '',
      });
      // Refresh data
      fetchData();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to record purchase');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate total scholarship fund across all pots
  const totalScholarship = TIERS.reduce((sum, tier) => {
    const pot = stats.pots?.[tier.price];
    return sum + (pot?.scholarshipPot || 0);
  }, 0);

  if (loading || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[var(--muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center no-print">
        <div>
          <h1 className="text-3xl font-bold text-[var(--primary)]">Admin Dashboard</h1>
          <p className="text-sm text-[var(--muted)]">Welcome, {adminUser}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setShowPurchaseForm(!showPurchaseForm); setSubmitSuccess(null); setSubmitError(''); }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Record Purchase
          </button>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-light)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Record Purchase Form */}
      {showPurchaseForm && (
        <div className="card no-print">
          <h2 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Record New Purchase
          </h2>

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{submitError}</div>
          )}

          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Purchase Recorded Successfully!</p>
              <p>Amount: ${submitSuccess.amountPaid}</p>
              <p>Duck Numbers: {submitSuccess.duckNumbers.map(n => `#${n}`).join(', ')}</p>
              <button
                onClick={() => setSubmitSuccess(null)}
                className="mt-2 text-sm underline"
              >
                Record Another
              </button>
            </div>
          )}

          {!submitSuccess && (
            <form onSubmit={handleSubmitPurchase} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="buyerName" className="block font-medium mb-1 text-sm">Contestant Name *</label>
                  <input
                    type="text"
                    id="buyerName"
                    name="buyerName"
                    value={newPurchase.buyerName}
                    onChange={handleNewPurchaseChange}
                    required
                    className="input-field"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-medium mb-1 text-sm">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newPurchase.phone}
                    onChange={handleNewPurchaseChange}
                    required
                    className="input-field"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block font-medium mb-1 text-sm">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newPurchase.email}
                    onChange={handleNewPurchaseChange}
                    required
                    className="input-field"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block font-medium mb-1 text-sm">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={newPurchase.address}
                    onChange={handleNewPurchaseChange}
                    className="input-field"
                    placeholder="Address (optional)"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="tier" className="block font-medium mb-1 text-sm">Race Tier *</label>
                  <select
                    id="tier"
                    name="tier"
                    value={newPurchase.tier}
                    onChange={handleNewPurchaseChange}
                    required
                    className="input-field"
                  >
                    {TIERS.map(tier => (
                      <option key={tier.price} value={tier.price}>
                        ${tier.price} Race ({tier.payout}% payout)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="numDucks" className="block font-medium mb-1 text-sm">Quantity *</label>
                  <input
                    type="number"
                    id="numDucks"
                    name="numDucks"
                    value={newPurchase.numDucks}
                    onChange={handleNewPurchaseChange}
                    min="1"
                    max="100"
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block font-medium mb-1 text-sm">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={newPurchase.paymentMethod}
                    onChange={handleNewPurchaseChange}
                    className="input-field"
                  >
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="venmo">Venmo</option>
                    <option value="paypal">PayPal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block font-medium mb-1 text-sm">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={newPurchase.notes}
                  onChange={handleNewPurchaseChange}
                  className="input-field"
                  rows={2}
                  placeholder="Optional notes..."
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <div className="text-lg">
                  <span className="text-[var(--muted)]">Total:</span>{' '}
                  <span className="font-bold text-[var(--primary)]">${newPurchase.tier * newPurchase.numDucks}</span>
                  <span className="text-sm text-[var(--muted)] ml-2">
                    ({newPurchase.numDucks} × ${newPurchase.tier})
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPurchaseForm(false)}
                    className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {submitting ? 'Recording...' : 'Record Purchase'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6 no-print">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--primary)]/10 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--primary)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalPurchases}</div>
              <div className="text-sm text-[var(--muted)]">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalDucks}</div>
              <div className="text-sm text-[var(--muted)]">Total Ducks</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">${stats.totalAmount.toLocaleString()}</div>
              <div className="text-sm text-[var(--muted)]">Total Collected</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--accent)]/10 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold">${totalScholarship.toLocaleString()}</div>
              <div className="text-sm text-[var(--muted)]">Scholarship Fund</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Race Pots */}
      <div className="no-print">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">4 Race Pots - 4 Winners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TIERS.map(tier => {
            const pot = stats.pots?.[tier.price] || { ducks: 0, total: 0, winnerPot: 0, scholarshipPot: 0 };
            return (
              <div key={tier.price} className={`${tier.color} text-white rounded-xl p-5 text-center`}>
                <div className="text-xl font-bold mb-1">${tier.price} Race</div>
                <div className="text-3xl font-bold my-2">${pot.winnerPot}</div>
                <div className="text-sm opacity-80">Winner takes {tier.payout}%</div>
                <div className="text-sm mt-2 opacity-90">{pot.ducks} ducks</div>
                <div className="text-xs mt-1 opacity-70">${pot.scholarshipPot} to scholarship</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="card no-print">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
          All Orders ({purchases.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-2 font-medium">Name</th>
                <th className="text-left py-3 px-2 font-medium">Contact</th>
                <th className="text-left py-3 px-2 font-medium">Race</th>
                <th className="text-left py-3 px-2 font-medium">Ducks</th>
                <th className="text-left py-3 px-2 font-medium">Amount</th>
                <th className="text-left py-3 px-2 font-medium">Payment</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-[var(--muted)]">
                    No orders yet
                  </td>
                </tr>
              ) : (
                purchases.map(purchase => {
                  const tierInfo = TIERS.find(t => t.price === purchase.tier);
                  return (
                    <tr key={purchase._id} className="border-b border-[var(--border)] hover:bg-[var(--background)]">
                      <td className="py-3 px-2">
                        <div className="font-medium">{purchase.buyerName}</div>
                        <div className="text-xs text-[var(--muted)] truncate max-w-[150px]">{purchase.address}</div>
                      </td>
                      <td className="py-3 px-2">
                        <div>{purchase.phone}</div>
                        <div className="text-xs text-[var(--muted)]">{purchase.email}</div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`${tierInfo?.color || 'bg-gray-500'} text-white px-2 py-1 rounded text-xs font-medium`}>
                          ${purchase.tier}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-medium">{purchase.numDucks}</div>
                        <div className="text-xs text-[var(--muted)]">
                          #{purchase.duckNumbers.slice(0, 3).join(', ')}
                          {purchase.duckNumbers.length > 3 && '...'}
                        </div>
                      </td>
                      <td className="py-3 px-2 font-medium">${purchase.amountPaid}</td>
                      <td className="py-3 px-2">
                        <span className="capitalize px-2 py-1 bg-[var(--background)] rounded text-xs">
                          {purchase.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-[var(--muted)]">
                        {formatDate(purchase.purchaseDate)}
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => setSelectedPurchase(purchase)}
                          className="text-[var(--primary)] hover:underline text-sm"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-lg max-w-md w-full m-4 max-h-[90vh] overflow-y-auto">
            <div ref={receiptRef} className="p-6">
              <div className="text-center border-b border-[var(--border)] pb-4 mb-4">
                <h2 className="text-xl font-bold text-[var(--primary)]">
                  Cameron Britton and Jason Toyne Memorial
                </h2>
                <p className="text-[var(--muted)]">Duck Race Receipt</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Name:</span>
                  <span className="font-medium">{selectedPurchase.buyerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Phone:</span>
                  <span>{selectedPurchase.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Email:</span>
                  <span>{selectedPurchase.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Address:</span>
                  <span className="text-right max-w-[200px]">{selectedPurchase.address}</span>
                </div>
                <div className="border-t border-[var(--border)] pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--muted)]">Race:</span>
                    <span className={`${TIERS.find(t => t.price === selectedPurchase.tier)?.color || 'bg-gray-500'} text-white px-3 py-1 rounded font-bold`}>
                      ${selectedPurchase.tier} Race
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Ducks Purchased:</span>
                    <span className="font-bold">{selectedPurchase.numDucks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Amount Paid:</span>
                    <span className="font-bold text-[var(--primary)]">${selectedPurchase.amountPaid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Payment Method:</span>
                    <span className="capitalize">{selectedPurchase.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Date:</span>
                    <span>{formatDate(selectedPurchase.purchaseDate)}</span>
                  </div>
                </div>
                <div className="border-t border-[var(--border)] pt-3">
                  <p className="text-[var(--muted)] mb-2">${selectedPurchase.tier} Race Duck Numbers:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPurchase.duckNumbers.map(num => (
                      <span key={num} className={`${TIERS.find(t => t.price === selectedPurchase.tier)?.color || 'bg-[var(--primary)]'} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        #{num}
                      </span>
                    ))}
                  </div>
                </div>
                {selectedPurchase.notes && (
                  <div className="border-t border-[var(--border)] pt-3">
                    <p className="text-[var(--muted)]">Notes:</p>
                    <p>{selectedPurchase.notes}</p>
                  </div>
                )}
              </div>

              <div className="text-center mt-6 pt-4 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--muted)]">
                  Thank you for supporting the scholarship fund!
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t border-[var(--border)] no-print">
              <button
                onClick={printReceipt}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                </svg>
                Print
              </button>
              <button
                onClick={() => setSelectedPurchase(null)}
                className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--background)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print Receipt Section */}
      {selectedPurchase && (
        <div className="hidden print:block">
          <div className="p-8">
            <div className="text-center border-b-2 border-black pb-4 mb-4">
              <h1 className="text-2xl font-bold">Cameron Britton and Jason Toyne Memorial</h1>
              <p className="text-lg">Duck Race Receipt</p>
            </div>

            <div className="space-y-2 mb-6">
              <p><strong>Name:</strong> {selectedPurchase.buyerName}</p>
              <p><strong>Phone:</strong> {selectedPurchase.phone}</p>
              <p><strong>Email:</strong> {selectedPurchase.email}</p>
              <p><strong>Address:</strong> {selectedPurchase.address}</p>
            </div>

            <div className="border-t-2 border-black pt-4 mb-6">
              <p><strong>Race:</strong> ${selectedPurchase.tier} Race</p>
              <p><strong>Ducks Purchased:</strong> {selectedPurchase.numDucks}</p>
              <p><strong>Amount Paid:</strong> ${selectedPurchase.amountPaid}</p>
              <p><strong>Payment Method:</strong> {selectedPurchase.paymentMethod}</p>
              <p><strong>Date:</strong> {formatDate(selectedPurchase.purchaseDate)}</p>
            </div>

            <div className="border-t-2 border-black pt-4 mb-6">
              <p className="font-bold mb-2">${selectedPurchase.tier} Race Duck Numbers:</p>
              <p>{selectedPurchase.duckNumbers.map(n => `#${n}`).join(', ')}</p>
            </div>

            {selectedPurchase.notes && (
              <div className="border-t-2 border-black pt-4 mb-6">
                <p><strong>Notes:</strong> {selectedPurchase.notes}</p>
              </div>
            )}

            <div className="text-center mt-8 pt-4 border-t-2 border-black">
              <p>Thank you for supporting the scholarship fund!</p>
              <p className="text-sm mt-2">Giving young people the strength and courage to face the world</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
