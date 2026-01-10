'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PotStats {
  ducks: number;
  total: number;
  winnerPot: number;
  scholarshipPot: number;
}

interface Stats {
  totalDucks: number;
  totalAmount: number;
  pots: Record<number, PotStats>;
}

const TIERS = [
  { price: 10, payout: 30, color: 'bg-amber-600' },
  { price: 25, payout: 35, color: 'bg-emerald-600' },
  { price: 50, payout: 40, color: 'bg-blue-600' },
  { price: 100, payout: 50, color: 'bg-purple-600' },
];

export default function BuyPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [numDucks, setNumDucks] = useState(1);
  const [formData, setFormData] = useState({
    buyerName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [purchaseResult, setPurchaseResult] = useState<{
    tier: number;
    duckNumbers: number[];
    amountPaid: number;
  } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      setError('Please select a race');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
          numDucks,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit purchase');
      }

      setPurchaseResult({
        tier: data.tier,
        duckNumbers: data.duckNumbers,
        amountPaid: data.amountPaid,
      });
      setSuccess(true);
      fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit purchase');
    } finally {
      setSubmitting(false);
    }
  };

  const totalCost = selectedTier ? selectedTier * numDucks : 0;

  if (success && purchaseResult) {
    const tierInfo = TIERS.find(t => t.price === purchaseResult.tier);
    return (
      <div className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">Thank You!</h1>
            <p className="text-lg mb-2">
              You&apos;re in the <strong>${purchaseResult.tier} Race</strong>!
            </p>
            <p className="text-[var(--muted)] mb-6">
              If your duck wins, you get {tierInfo?.payout}% of the ${purchaseResult.tier} pot!
            </p>

            <div className="bg-[var(--background)] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Your ${purchaseResult.tier} Duck Numbers</h2>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {purchaseResult.duckNumbers.map(num => (
                  <span key={num} className="bg-[var(--primary)] text-white px-4 py-2 rounded-full font-bold">
                    #{num}
                  </span>
                ))}
              </div>
              <p className="text-[var(--muted)]">
                Amount: <span className="font-bold text-[var(--foreground)]">${purchaseResult.amountPaid}</span>
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/" className="btn-primary">Return Home</Link>
              <button
                onClick={() => {
                  setSuccess(false);
                  setPurchaseResult(null);
                  setSelectedTier(null);
                  setNumDucks(1);
                  setFormData({
                    buyerName: '',
                    phone: '',
                    email: '',
                    address: '',
                    paymentMethod: 'cash',
                    notes: '',
                  });
                }}
                className="btn-accent"
              >
                Buy More Ducks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Buy Your Ducks</h1>
          <p className="text-lg opacity-90">4 Races &bull; 4 Pots &bull; 4 Winners</p>
        </div>
      </section>

      {/* 4 Pots Display */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-6">Current Pots</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map(tier => {
              const pot = stats?.pots?.[tier.price] || { ducks: 0, winnerPot: 0 };
              return (
                <div key={tier.price} className={`${tier.color} text-white rounded-lg p-4 text-center`}>
                  <div className="text-2xl font-bold">${tier.price}</div>
                  <div className="text-sm opacity-80 mb-2">Race</div>
                  <div className="text-3xl font-bold">${pot.winnerPot}</div>
                  <div className="text-xs opacity-80">Winner takes {tier.payout}%</div>
                  <div className="text-sm mt-2">{pot.ducks} ducks</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tier Selection */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-6">Choose Your Race</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {TIERS.map(tier => (
              <div
                key={tier.price}
                onClick={() => setSelectedTier(tier.price)}
                className={`tier-card ${selectedTier === tier.price ? 'selected ring-2 ring-[var(--secondary)]' : ''}`}
              >
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">${tier.price}</div>
                <div className="text-sm text-[var(--muted)] mb-2">per duck</div>
                <div className="text-sm font-semibold text-[var(--secondary)]">{tier.payout}% payout</div>
              </div>
            ))}
          </div>

          {/* Form */}
          {selectedTier && (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div className="bg-[var(--background)] rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg">${selectedTier} Race</span>
                    <span className="text-[var(--muted)] ml-2">
                      ({TIERS.find(t => t.price === selectedTier)?.payout}% winner payout)
                    </span>
                  </div>
                  <button type="button" onClick={() => setSelectedTier(null)} className="text-[var(--muted)] hover:text-[var(--primary)]">
                    Change
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
                )}

                <div>
                  <label htmlFor="numDucks" className="block font-medium mb-2">How many ${selectedTier} ducks?</label>
                  <input
                    type="number"
                    id="numDucks"
                    value={numDucks}
                    onChange={(e) => setNumDucks(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="50"
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="buyerName" className="block font-medium mb-2">Full Name *</label>
                  <input type="text" id="buyerName" name="buyerName" value={formData.buyerName} onChange={handleChange} required className="input-field" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block font-medium mb-2">Phone *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block font-medium mb-2">Address *</label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="input-field" />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block font-medium mb-2">Payment Method *</label>
                  <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="input-field">
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="venmo">Venmo</option>
                    <option value="paypal">PayPal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="border-t border-[var(--border)] pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">{numDucks} × ${selectedTier} duck{numDucks > 1 ? 's' : ''}</span>
                    <span className="text-2xl font-bold text-[var(--primary)]">${totalCost}</span>
                  </div>
                  <button type="submit" disabled={submitting} className="btn-accent w-full text-lg py-4 disabled:opacity-50">
                    {submitting ? 'Processing...' : `Buy ${numDucks} Duck${numDucks > 1 ? 's' : ''}`}
                  </button>
                </div>
              </form>
            </div>
          )}

          {!selectedTier && (
            <p className="text-center text-[var(--muted)]">Select a race above to continue</p>
          )}
        </div>
      </section>
    </div>
  );
}
