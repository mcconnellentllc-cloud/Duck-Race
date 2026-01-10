'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalDucks: number;
  totalAmount: number;
  totalPurchases: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ totalDucks: 0, totalAmount: 0, totalPurchases: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
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
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const winnerPot = stats.totalAmount / 2;
  const scholarshipPot = stats.totalAmount / 2;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">
          Cameron Britton &amp; Jason Toyne Memorial Duck Race
        </h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
          Community involvement and being there when needed
        </p>
      </section>

      {/* Live Pot Tracker */}
      <section className="card bg-gradient-to-r from-[var(--primary)] to-[#a0522d] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Live Race Tracker
          </h2>
          {loading ? (
            <div className="animate-pulse">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold">{stats.totalDucks}</div>
                <div className="text-[var(--secondary)]">Ducks Sold</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold text-green-300">${winnerPot.toLocaleString()}</div>
                <div className="text-[var(--secondary)]">Winner&apos;s Pot</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-4xl font-bold text-[var(--accent-light)]">${scholarshipPot.toLocaleString()}</div>
                <div className="text-[var(--secondary)]">Scholarship Fund</div>
              </div>
            </div>
          )}
          <div className="mt-6">
            <Link href="/buy" className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
              Buy Your Ducks - $100 Each
            </Link>
          </div>
        </div>
      </section>

      {/* About Jason */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Remembering Jason Toyne
          </h2>
          <p className="text-lg mb-4">
            <strong>1982 - 2025</strong>
          </p>
          <p className="mb-4">
            Jason Toyne was a Sedgwick County farmer who dedicated his life to serving his community.
            For 25 years, he served as a volunteer fire chief, always answering the call when
            his neighbors needed him.
          </p>
          <p className="mb-4">
            Known for his unwavering willingness to help anyone who called, Jason embodied
            the spirit of community involvement. Whether it was fighting fires, helping a neighbor
            with their farm, or lending a hand wherever needed, Jason was always there.
          </p>
          <p className="text-[var(--muted)]">
            Jason passed away on March 9, 2025, leaving behind his beloved wife Jan and
            their children Jennifer and Flynt. His legacy of community service continues through
            this memorial scholarship.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
            The Scholarship
          </h2>
          <p className="mb-4">
            The Cameron Britton and Jason Toyne Memorial Scholarship honors their spirit of
            <strong className="text-[var(--accent)]"> community involvement and being there when needed</strong>.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)] mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span><strong>College Education:</strong> Support for pursuing higher education</span>
            </div>
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)] mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span><strong>Trade School Tools:</strong> Equipment for vocational training</span>
            </div>
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent)] mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <span><strong>Community Service Awards:</strong> Recognition for those who serve others</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="card">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 text-center flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
          How the Duck Race Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold mb-2">Buy Your Ducks</h3>
            <p className="text-[var(--muted)]">
              Purchase rubber ducks at $100 each. Each duck is assigned a unique number.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold mb-2">Race Day</h3>
            <p className="text-[var(--muted)]">
              All ducks are released into the water and race to the finish line!
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold mb-2">50/50 Split</h3>
            <p className="text-[var(--muted)]">
              The winning duck&apos;s owner gets half the pot. The other half funds scholarships.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/buy" className="btn-accent inline-block">
            Get Your Ducks Now
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8 border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
          Honor Their Legacy
        </h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto mb-6">
          Every duck you purchase helps support young people who embody the spirit
          of community involvement - being there when others need them most.
        </p>
        <Link href="/buy" className="btn-primary inline-block">
          Support the Scholarship Fund
        </Link>
      </section>
    </div>
  );
}
