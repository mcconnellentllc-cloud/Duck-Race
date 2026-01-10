'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-wrangler-700 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-carhartt-400 rounded-full flex items-center justify-center">
              <span className="text-wrangler-800 font-bold text-sm">TB</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Toyne-Britton</span>
              <span className="text-xs text-wrangler-200 leading-tight">Memorial Scholarship</span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-carhartt-300 transition-colors">
              Home
            </Link>
            <Link
              href="/buy-ducks"
              className="bg-carhartt-500 hover:bg-carhartt-600 px-4 py-2 rounded-lg font-semibold transition-colors text-wrangler-900"
            >
              Buy Ducks
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-wrangler-600 space-y-3">
            <Link
              href="/"
              className="block hover:text-carhartt-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/buy-ducks"
              className="block bg-carhartt-500 hover:bg-carhartt-600 px-4 py-2 rounded-lg font-semibold transition-colors text-center text-wrangler-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Buy Ducks
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
