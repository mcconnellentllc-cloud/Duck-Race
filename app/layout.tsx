import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Britton-Toyne Memorial Duck Race",
  description: "Support the Cameron Britton and Jason Toyne Memorial Scholarship Fund - community involvement and being there when needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <header className="bg-[var(--primary)] text-white py-4 px-6 no-print">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--secondary)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Britton-Toyne Memorial
            </Link>
            <div className="flex gap-4 text-sm md:text-base md:gap-6">
              <Link href="/" className="hover:text-[var(--secondary)] transition-colors">
                Home
              </Link>
              <Link href="/jason" className="hover:text-[var(--secondary)] transition-colors">
                Jason
              </Link>
              <Link href="/cameron" className="hover:text-[var(--secondary)] transition-colors">
                Cameron
              </Link>
              <Link href="/buy" className="hover:text-[var(--secondary)] transition-colors">
                Buy Ducks
              </Link>
            </div>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-[var(--primary)] text-white py-8 px-6 mt-12 no-print">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[var(--secondary)] text-lg font-semibold">
              Britton-Toyne Memorial Scholarship
            </p>
            <p className="text-sm mt-2 opacity-80">
              Community involvement and being there when needed
            </p>
            <div className="flex justify-center gap-6 mt-4 text-sm opacity-70">
              <Link href="/jason" className="hover:text-[var(--secondary)]">Jason&apos;s Story</Link>
              <Link href="/cameron" className="hover:text-[var(--secondary)]">Cameron&apos;s Story</Link>
              <Link href="/admin" className="hover:text-[var(--secondary)]">Admin</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
