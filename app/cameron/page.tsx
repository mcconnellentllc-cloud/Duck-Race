import Link from 'next/link';

export default function CameronPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Cameron Britton</h1>
          <p className="text-xl text-[var(--secondary)]">Community Leader</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">
              A Life of Service
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Cameron Britton dedicated his life to serving others and building his community.
              His commitment to helping neighbors and giving back defined who he was.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Like Jason, Cameron believed in being there when people needed him most.
              Together, they represent the best of what community service means.
            </p>

            <div className="bg-[var(--background)] rounded-lg p-6 my-8">
              <h3 className="font-bold text-lg text-[var(--primary)] mb-4">His Legacy</h3>
              <ul className="space-y-3">
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

            <p className="text-lg leading-relaxed mb-6 text-[var(--muted)] italic">
              More details about Cameron&apos;s story coming soon.
            </p>
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
