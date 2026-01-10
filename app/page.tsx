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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[var(--primary)] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Britton-Toyne Memorial
            <span className="block text-[var(--secondary)]">Duck Race</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Community involvement and being there when needed
          </p>
          <Link href="/buy" className="inline-block bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg">
            Buy Your Ducks
          </Link>
        </div>
      </section>

      {/* Total Pot Tracker */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Current Pot</h2>
            {loading ? (
              <div className="text-5xl font-bold animate-pulse">Loading...</div>
            ) : (
              <>
                <div className="text-5xl md:text-6xl font-bold text-[var(--secondary)]">
                  ${stats.totalAmount.toLocaleString()}
                </div>
                <p className="mt-2 opacity-80">
                  {stats.totalDucks} ducks from {stats.totalPurchases} supporters
                </p>
                <p className="mt-4 text-sm opacity-70">
                  50% goes to the winner &bull; 50% funds scholarships
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About the Scholarship */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-8">
            About the Scholarship
          </h2>
          <div className="card">
            <p className="text-lg leading-relaxed mb-6">
              The Britton-Toyne Memorial Scholarship honors two men who embodied the true spirit of
              community service. Both Cameron Britton and Jason Toyne dedicated their lives to helping
              others, always being there when their neighbors needed them most.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              This scholarship supports young people who demonstrate the same commitment to their
              communities - whether through volunteer work, helping neighbors, or simply being there
              when someone needs a hand.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Link href="/jason" className="card hover:border-[var(--secondary)] transition-colors">
                <h3 className="font-bold text-lg text-[var(--primary)] mb-2">Jason Toyne</h3>
                <p className="text-[var(--muted)] text-sm">1982 - 2025</p>
                <p className="mt-2">25-year volunteer fire chief, Sedgwick County farmer</p>
                <span className="text-[var(--secondary)] text-sm mt-2 inline-block">Read his story →</span>
              </Link>
              <Link href="/cameron" className="card hover:border-[var(--secondary)] transition-colors">
                <h3 className="font-bold text-lg text-[var(--primary)] mb-2">Cameron Britton</h3>
                <p className="text-[var(--muted)] text-sm">Community Leader</p>
                <p className="mt-2">A life dedicated to service and helping others</p>
                <span className="text-[var(--secondary)] text-sm mt-2 inline-block">Read his story →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-8">
            How the Duck Race Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Choose Your Tier</h3>
              <p className="text-[var(--muted)] text-sm">
                Pick from 4 donation levels, each with more ducks and better odds
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Get Your Numbers</h3>
              <p className="text-[var(--muted)] text-sm">
                Receive unique duck numbers for each duck you sponsor
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Race Day</h3>
              <p className="text-[var(--muted)] text-sm">
                All ducks race down the water to the finish line
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--primary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Win Big</h3>
              <p className="text-[var(--muted)] text-sm">
                Winner takes 50% of the pot, 50% funds scholarships
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Race Details */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-[var(--secondary)] text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Race Details</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
                <p className="font-bold text-lg">Date TBD</p>
                <p className="text-sm opacity-80">Check back soon!</p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <p className="font-bold text-lg">Time TBD</p>
                <p className="text-sm opacity-80">Stay tuned!</p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <p className="font-bold text-lg">Location TBD</p>
                <p className="text-sm opacity-80">Coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-[var(--muted)] mb-8">
            Every duck you sponsor helps fund scholarships for young people committed to community service.
          </p>
          <Link href="/buy" className="btn-accent inline-block text-lg px-8 py-4">
            Buy Your Ducks Now
          </Link>
        </div>
      </section>
    </div>
  );
}
