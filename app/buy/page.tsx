'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  totalDucks: number;
  totalAmount: number;
}

interface Tier {
  id: number;
  name: string;
  ducks: number;
  price: number;
  pricePerDuck: number;
  payout: number;
  popular?: boolean;
}

const TIERS: Tier[] = [
  { id: 1, name: 'Bronze', ducks: 1, price: 10, pricePerDuck: 10, payout: 30 },
  { id: 2, name: 'Silver', ducks: 3, price: 25, pricePerDuck: 8.33, payout: 35 },
  { id: 3, name: 'Gold', ducks: 6, price: 50, pricePerDuck: 8.33, payout: 40, popular: true },
  { id: 4, name: 'Platinum', ducks: 12, price: 100, pricePerDuck: 8.33, payout: 50 },
];

export default function BuyPage() {
  const [stats, setStats] = useState<Stats>({ totalDucks: 0, totalAmount: 0 });
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
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
    duckNumbers: number[];
    amountPaid: number;
  } | null>(null);

  useEffect(() => {
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
    fetchStats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      setError('Please select a tier');
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
          numDucks: selectedTier.ducks,
          tierName: selectedTier.name,
          tierPrice: selectedTier.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit purchase');
      }

      setPurchaseResult({
        duckNumbers: data.duckNumbers,
        amountPaid: data.amountPaid,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit purchase');
    } finally {
      setSubmitting(false);
    }
  };

  if (success && purchaseResult) {
    return (
      <div className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">
              Thank You for Your Purchase!
            </h1>
            <p className="text-lg mb-6">
              Your support helps fund the Britton-Toyne Memorial Scholarship.
            </p>

            <div className="bg-[var(--background)] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Your Duck Numbers</h2>
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

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Payment Instructions:</strong> Please complete your payment using your selected method.
                Keep your duck numbers safe - you&apos;ll need them on race day!
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Return Home
              </Link>
              <button
                onClick={() => {
                  setSuccess(false);
                  setPurchaseResult(null);
                  setSelectedTier(null);
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
          <p className="text-lg opacity-90">
            Higher tiers = higher winner payouts (30% to 50%)
          </p>
          <div className="mt-4 bg-white/10 rounded-lg inline-block px-6 py-3">
            <span className="text-sm opacity-80">Current Pot: </span>
            <span className="text-2xl font-bold text-[var(--secondary)]">
              ${stats.totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Tier Selection */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[var(--primary)] mb-8">
            Choose Your Tier
          </h2>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {TIERS.map(tier => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={`tier-card relative ${selectedTier?.id === tier.id ? 'selected' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--secondary)] text-white text-xs px-3 py-1 rounded-full font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-lg text-[var(--primary)] mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-[var(--secondary)] mb-2">
                  ${tier.price}
                </div>
                <div className="text-[var(--muted)] mb-2">
                  {tier.ducks} duck{tier.ducks > 1 ? 's' : ''}
                </div>
                <div className="text-sm font-semibold text-[var(--primary)] bg-[var(--background)] rounded-full px-3 py-1">
                  {tier.payout}% Winner Payout
                </div>
                {selectedTier?.id === tier.id && (
                  <div className="absolute top-2 right-2 text-[var(--secondary)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          {selectedTier && (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div className="bg-[var(--background)] rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Selected: {selectedTier.name}</span>
                    <span className="text-xl font-bold text-[var(--primary)]">
                      {selectedTier.ducks} duck{selectedTier.ducks > 1 ? 's' : ''} - ${selectedTier.price}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="buyerName" className="block font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="buyerName"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block font-medium mb-2">
                    Mailing Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="123 Main St, Sedgwick, CO 80749"
                  />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block font-medium mb-2">
                    Payment Method *
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="venmo">Venmo</option>
                    <option value="paypal">PayPal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block font-medium mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="input-field"
                    placeholder="Any additional information..."
                  />
                </div>

                <div className="border-t border-[var(--border)] pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total:</span>
                    <span className="text-2xl font-bold text-[var(--primary)]">
                      ${selectedTier.price}
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-accent w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : `Purchase ${selectedTier.ducks} Duck${selectedTier.ducks > 1 ? 's' : ''}`}
                  </button>
                </div>
              </form>
            </div>
          )}

          {!selectedTier && (
            <div className="text-center text-[var(--muted)] py-8">
              <p className="text-lg">Select a tier above to continue</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="font-bold text-lg text-[var(--primary)] mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
                How It Works
              </h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--primary)]">1.</span>
                  Choose your tier and fill out the form
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--primary)]">2.</span>
                  Receive your unique duck numbers
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--primary)]">3.</span>
                  Complete payment via your chosen method
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--primary)]">4.</span>
                  Watch for your duck on race day!
                </li>
              </ol>
            </div>

            <div className="card bg-[var(--secondary)] text-white">
              <h3 className="font-bold text-lg mb-4">Tiered Payouts</h3>
              <p className="mb-4">
                The higher your tier, the bigger your potential payout if your duck wins!
                The rest funds the Britton-Toyne Memorial Scholarship.
              </p>
              <ul className="text-sm space-y-1">
                <li>Bronze ($10): 30% to winner</li>
                <li>Silver ($25): 35% to winner</li>
                <li>Gold ($50): 40% to winner</li>
                <li>Platinum ($100): 50% to winner</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
