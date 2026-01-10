'use client';

import { useEffect, useState } from 'react';

interface TierStats {
  tier: string;
  label: string;
  price: number;
  winnerPercent: number;
  scholarshipPercent: number;
  ducksSold: number;
  totalPot: number;
  winnerPayout: number;
  scholarshipFund: number;
}

interface Stats {
  tiers: TierStats[];
  grandTotal: {
    ducksSold: number;
    totalPot: number;
    scholarshipFund: number;
    donationsTotal: number;
  };
}

export default function PotTracker() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-carhartt-200">
        <div className="animate-pulse">
          <div className="h-6 bg-carhartt-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-carhartt-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-carhartt-200">
        <p className="text-center text-gray-600">Unable to load stats</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-carhartt-200">
        <h2 className="text-2xl font-bold text-wrangler-800 text-center mb-2">
          Live Pot Tracker
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          4 Races &middot; 4 Winners &middot; Everyone Has a Chance
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.tiers.map((tier) => (
            <div
              key={tier.tier}
              className="bg-haynes-200 rounded-lg p-4 border border-carhartt-200 shadow-sm"
            >
              <div className="text-center mb-3 pb-2 border-b border-carhartt-200">
                <span className="text-2xl font-bold text-wrangler-700">
                  {tier.tier}
                </span>
                <span className="ml-2 text-sm font-semibold text-carhartt-700">
                  {tier.label}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between bg-white rounded px-2 py-1">
                  <span className="text-gray-600">Ducks Sold:</span>
                  <span className="font-bold text-gray-800">{tier.ducksSold}</span>
                </div>
                <div className="flex justify-between bg-white rounded px-2 py-1">
                  <span className="text-gray-600">Total Pot:</span>
                  <span className="font-bold text-wrangler-700">{formatCurrency(tier.totalPot)}</span>
                </div>
                <div className="flex justify-between bg-white rounded px-2 py-1">
                  <span className="text-gray-600">Winner ({tier.winnerPercent}%):</span>
                  <span className="font-bold text-carhartt-700">{formatCurrency(tier.winnerPayout)}</span>
                </div>
                <div className="flex justify-between bg-white rounded px-2 py-1">
                  <span className="text-gray-600">Scholarship:</span>
                  <span className="font-bold text-wrangler-600">{formatCurrency(tier.scholarshipFund)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grand Totals */}
      <div className="bg-wrangler-700 rounded-xl p-6 shadow-lg text-white">
        <h3 className="text-xl font-bold text-center mb-4">
          Grand Totals
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-wrangler-600 rounded-lg p-4">
            <div className="text-3xl font-bold">{stats.grandTotal.ducksSold}</div>
            <div className="text-sm text-wrangler-200">Total Ducks</div>
          </div>
          <div className="bg-wrangler-600 rounded-lg p-4">
            <div className="text-3xl font-bold">{formatCurrency(stats.grandTotal.totalPot)}</div>
            <div className="text-sm text-wrangler-200">Race Total</div>
          </div>
          <div className="bg-wrangler-600 rounded-lg p-4">
            <div className="text-3xl font-bold">{formatCurrency(stats.grandTotal.donationsTotal)}</div>
            <div className="text-sm text-wrangler-200">Donations</div>
          </div>
          <div className="bg-carhartt-500 rounded-lg p-4">
            <div className="text-3xl font-bold text-wrangler-900">{formatCurrency(stats.grandTotal.scholarshipFund)}</div>
            <div className="text-sm text-wrangler-800">To Scholarship</div>
          </div>
        </div>
      </div>
    </div>
  );
}
