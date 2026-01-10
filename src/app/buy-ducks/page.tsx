'use client';

import { useState } from 'react';
import Link from 'next/link';

type DuckTier = 'A' | 'B' | 'C' | 'D';
type PaymentMethod = 'cash' | 'check' | 'venmo';
type FormMode = 'ducks' | 'donate';

const TIER_CONFIG = {
  A: { price: 10, winnerPercent: 30, label: '$10 Duck' },
  B: { price: 25, winnerPercent: 35, label: '$25 Duck' },
  C: { price: 50, winnerPercent: 40, label: '$50 Duck' },
  D: { price: 100, winnerPercent: 50, label: '$100 Duck' },
};

export default function BuyDucks() {
  const [mode, setMode] = useState<FormMode>('ducks');
  const [formData, setFormData] = useState({
    buyerName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: '' as PaymentMethod | '',
    notes: '',
  });
  const [duckQuantities, setDuckQuantities] = useState<Record<DuckTier, number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ message: string; duckNumbers?: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateTotal = () => {
    if (mode === 'donate') {
      return donationAmount;
    }
    return Object.entries(duckQuantities).reduce((total, [tier, qty]) => {
      return total + (TIER_CONFIG[tier as DuckTier].price * qty);
    }, 0);
  };

  const getTotalDucks = () => {
    return Object.values(duckQuantities).reduce((a, b) => a + b, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (tier: DuckTier, value: number) => {
    setDuckQuantities(prev => ({
      ...prev,
      [tier]: Math.max(0, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = mode === 'donate' ? '/api/donations' : '/api/orders';
      const body = mode === 'donate'
        ? {
            donorName: formData.buyerName,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            amount: donationAmount,
            paymentMethod: formData.paymentMethod,
            notes: formData.notes,
            anonymous,
          }
        : {
            buyerName: formData.buyerName,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            ducks: Object.entries(duckQuantities)
              .filter(([, qty]) => qty > 0)
              .map(([tier, quantity]) => ({ tier, quantity })),
            paymentMethod: formData.paymentMethod,
            notes: formData.notes,
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      if (mode === 'donate') {
        setSuccess({
          message: `Thank you for your generous donation of $${donationAmount}. 100% goes to the scholarship fund.`,
        });
      } else {
        setSuccess({
          message: `Order confirmed. You purchased ${getTotalDucks()} duck(s) for $${calculateTotal()}.`,
          duckNumbers: data.order?.ducks?.flatMap((d: { duckNumbers: string[] }) => d.duckNumbers) || [],
        });
      }

      // Reset form
      setFormData({
        buyerName: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: '',
        notes: '',
      });
      setDuckQuantities({ A: 0, B: 0, C: 0, D: 0 });
      setDonationAmount(0);
      setAnonymous(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const total = calculateTotal();
  const totalDucks = getTotalDucks();

  return (
    <div className="py-12 bg-haynes-100 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-wrangler-800 mb-4">
            Support the Scholarship
          </h1>
          <p className="text-carhartt-700">
            Buy ducks for the race or make a direct donation
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md inline-flex border border-carhartt-200">
            <button
              onClick={() => setMode('ducks')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                mode === 'ducks'
                  ? 'bg-wrangler-600 text-white'
                  : 'text-wrangler-700 hover:bg-wrangler-50'
              }`}
            >
              Buy Ducks
            </button>
            <button
              onClick={() => setMode('donate')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                mode === 'donate'
                  ? 'bg-wrangler-600 text-white'
                  : 'text-wrangler-700 hover:bg-wrangler-50'
              }`}
            >
              Donate
            </button>
          </div>
        </div>

        {success && (
          <div className="bg-wrangler-50 border border-wrangler-300 text-wrangler-800 px-6 py-4 rounded-lg mb-8">
            <p className="font-semibold">{success.message}</p>
            {success.duckNumbers && success.duckNumbers.length > 0 && (
              <div className="mt-2">
                <p className="text-sm">Your duck numbers:</p>
                <p className="font-mono text-lg mt-1 text-wrangler-700">{success.duckNumbers.join(', ')}</p>
              </div>
            )}
            <button
              onClick={() => setSuccess(null)}
              className="mt-4 bg-wrangler-600 text-white px-4 py-2 rounded hover:bg-wrangler-700"
            >
              Continue
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-lg mb-8">
            <p>{error}</p>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Duck Selection (only in ducks mode) */}
            {mode === 'ducks' && (
              <div className="card">
                <h2 className="text-xl font-bold text-wrangler-800 mb-6">
                  Select Your Ducks
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose how many ducks you want in each tier. Each tier races separately with its own winner.
                </p>

                <div className="space-y-4">
                  {(Object.entries(TIER_CONFIG) as [DuckTier, typeof TIER_CONFIG.A][]).map(([tier, config]) => (
                    <div
                      key={tier}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                        duckQuantities[tier] > 0
                          ? 'border-wrangler-400 bg-wrangler-50'
                          : 'border-carhartt-200 bg-white'
                      }`}
                    >
                      <div>
                        <span className="text-2xl font-bold text-wrangler-700">{tier}</span>
                        <span className="ml-2 font-semibold text-gray-700">{config.label}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          (Winner gets {config.winnerPercent}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(tier, duckQuantities[tier] - 1)}
                          className="w-10 h-10 rounded-full bg-carhartt-200 hover:bg-carhartt-300 text-xl font-bold text-carhartt-800"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={duckQuantities[tier]}
                          onChange={(e) => handleQuantityChange(tier, parseInt(e.target.value) || 0)}
                          className="w-16 text-center border-2 border-carhartt-300 rounded-lg py-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(tier, duckQuantities[tier] + 1)}
                          className="w-10 h-10 rounded-full bg-wrangler-600 hover:bg-wrangler-700 text-white text-xl font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Donation Amount (only in donate mode) */}
            {mode === 'donate' && (
              <div className="card">
                <h2 className="text-xl font-bold text-wrangler-800 mb-4">
                  Make a Donation
                </h2>
                <p className="text-gray-600 mb-6">
                  100% of your donation goes directly to the Toyne-Britton Memorial Scholarship fund.
                  Donations are not part of the duck race pot.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount
                    </label>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl text-gray-600">$</span>
                      <input
                        type="number"
                        min="1"
                        value={donationAmount || ''}
                        onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                        placeholder="Enter amount"
                        className="input-field text-2xl"
                        required={mode === 'donate'}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {[10, 25, 50, 100, 250, 500].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                          donationAmount === amount
                            ? 'border-wrangler-500 bg-wrangler-50 text-wrangler-800'
                            : 'border-carhartt-200 hover:border-wrangler-300'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 mt-4">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-5 h-5 rounded border-carhartt-300 text-wrangler-600"
                    />
                    <span className="text-gray-700">Make this donation anonymous</span>
                  </label>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="card">
              <h2 className="text-xl font-bold text-wrangler-800 mb-6">
                Your Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address {mode === 'ducks' ? '*' : '(optional)'}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required={mode === 'ducks'}
                    className="input-field"
                    placeholder="Street, City, State, ZIP"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method *
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select payment method</option>
                    <option value="cash">Cash</option>
                    <option value="venmo">Venmo</option>
                    <option value="paypal">PayPal</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    Payments can be made to: Jan Toyne, Vance McCormick, or Kyle McConnell
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field"
                    placeholder="Any additional notes or messages..."
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="card bg-carhartt-50 border-carhartt-200">
              <h2 className="text-xl font-bold text-wrangler-800 mb-4">
                {mode === 'ducks' ? 'Order Summary' : 'Donation Summary'}
              </h2>

              {mode === 'ducks' && totalDucks > 0 && (
                <div className="space-y-2 mb-4">
                  {(Object.entries(duckQuantities) as [DuckTier, number][])
                    .filter(([, qty]) => qty > 0)
                    .map(([tier, qty]) => (
                      <div key={tier} className="flex justify-between text-gray-700">
                        <span>{qty}x {TIER_CONFIG[tier].label}</span>
                        <span>${qty * TIER_CONFIG[tier].price}</span>
                      </div>
                    ))}
                </div>
              )}

              <div className="border-t-2 border-carhartt-200 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-wrangler-800">
                  {mode === 'ducks' ? `Total (${totalDucks} ducks)` : 'Donation Amount'}
                </span>
                <span className="text-3xl font-bold text-wrangler-700">
                  ${total}
                </span>
              </div>

              {mode === 'donate' && (
                <p className="text-sm text-wrangler-700 mt-2">
                  100% goes to the scholarship fund
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || (mode === 'ducks' ? totalDucks === 0 : donationAmount <= 0)}
              className="w-full bg-wrangler-600 hover:bg-wrangler-700 text-white font-bold text-xl py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {submitting
                ? 'Processing...'
                : mode === 'ducks'
                  ? `Complete Purchase - $${total}`
                  : `Complete Donation - $${total}`}
            </button>

            <p className="text-center text-gray-600 text-sm">
              By submitting, you agree to pay the amount shown above.
              <br />
              You will be contacted with payment instructions.
            </p>
          </form>
        )}

        <div className="text-center mt-8">
          <Link href="/" className="text-wrangler-700 hover:text-wrangler-900 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
