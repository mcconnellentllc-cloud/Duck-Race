import Link from 'next/link';
import Image from 'next/image';

export default function CameronPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Cameron Britton</h1>
          <p className="text-xl text-[var(--secondary)]">United States Marine</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            {/* Photo */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[var(--secondary)] shadow-lg">
                <Image
                  src="/cameron.jpg"
                  alt="Cameron Britton"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 text-center">
              Marine, Community Leader, Always There When Needed
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Cameron Britton served his country as a United States Marine, carrying the values
              of honor, courage, and commitment into everything he did. His dedication to service
              didn&apos;t end when he came home - it defined how he lived every day.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Cameron believed in being there when people needed him most. Whether it was
              a neighbor in need or a community project that needed volunteers, Cameron showed up.
              His selfless spirit touched everyone who knew him.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Like Jason Toyne, Cameron embodied the true meaning of community involvement.
              Together, their legacy inspires the next generation to serve others.
            </p>

            <div className="bg-[var(--background)] rounded-lg p-6 my-8">
              <h3 className="font-bold text-lg text-[var(--primary)] mb-4">His Legacy</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>United States Marine</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Dedicated community member</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Always willing to lend a hand</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Inspired others through his actions</span>
                </li>
              </ul>
            </div>

            <blockquote className="border-l-4 border-[var(--secondary)] pl-6 my-8 italic text-lg text-[var(--muted)]">
              &ldquo;Once a Marine, always a Marine - and Cameron lived that creed every single day.&rdquo;
            </blockquote>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Link href="/jason" className="btn-primary">
              Read Jason&apos;s Story
            </Link>
            <Link href="/buy" className="btn-accent">
              Honor His Memory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
