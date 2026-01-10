import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cameron Britton & Jason Toyne Memorial Duck Race",
  description: "Support the Cameron Britton and Jason Toyne Memorial Scholarship Fund - community involvement and being there when needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="bg-[var(--primary)] text-white py-4 px-6 no-print">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              Memorial Duck Race
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-[var(--secondary)] transition-colors">
                Home
              </Link>
              <Link href="/buy" className="hover:text-[var(--secondary)] transition-colors">
                Buy Ducks
              </Link>
              <Link href="/admin" className="hover:text-[var(--secondary)] transition-colors">
                Admin
              </Link>
            </div>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="bg-[var(--primary)] text-white py-6 px-6 mt-12 no-print">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[var(--secondary)]">
              Cameron Britton and Jason Toyne Memorial Scholarship
            </p>
            <p className="text-sm mt-2 opacity-80">
              Community involvement and being there when needed
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
