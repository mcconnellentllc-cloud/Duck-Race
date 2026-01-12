import Link from 'next/link';
import Image from 'next/image';

export default function JasonPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Jason Toyne</h1>
          <p className="text-xl text-[var(--secondary)]">1982 - 2025</p>
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
                  src="/jason.jpg"
                  alt="Jason Toyne"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[var(--primary)] mb-6 text-center">
              Farmer, Beekeeper, Cattleman, Fire Chief
            </h2>

            <p className="text-lg leading-relaxed mb-6">
              Jason Toyne was a Sedgwick County farmer who wore many hats - literally and figuratively.
              As a farmer, beekeeper, and cattleman, he worked the land and tended to his animals with
              dedication and care. But his service extended far beyond his own property.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              For 25 years, Jason served as a volunteer fire chief, always answering the call when
              his neighbors needed him. He was the kind of person who showed up - whether it was
              fighting fires, helping a neighbor with their harvest, or lending a hand wherever needed.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Known for his unwavering willingness to help anyone who called, Jason embodied
              the spirit of community involvement. He never said no when someone needed help.
              That was just who Jason was.
            </p>

            <div className="bg-[var(--background)] rounded-lg p-6 my-8">
              <h3 className="font-bold text-lg text-[var(--primary)] mb-4">His Legacy</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>25 years as volunteer fire chief</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Dedicated Sedgwick County farmer</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Beekeeper caring for his hives</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Cattleman working the land</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <span>Always there when neighbors needed help</span>
                </li>
              </ul>
            </div>

            <h3 className="font-bold text-lg text-[var(--primary)] mb-4">Family</h3>
            <p className="text-lg leading-relaxed mb-6">
              Jason passed away on March 9, 2025, leaving behind his beloved wife Jan and
              their children Jennifer and Flynt. His legacy of community service continues through
              this memorial scholarship, inspiring the next generation to follow his example of
              selfless dedication to others.
            </p>

            <blockquote className="border-l-4 border-[var(--secondary)] pl-6 my-8 italic text-lg text-[var(--muted)]">
              &ldquo;He never said no when someone needed help. That was just who Jason was.&rdquo;
            </blockquote>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Link href="/cameron" className="btn-primary">
              Read Cameron&apos;s Story
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
