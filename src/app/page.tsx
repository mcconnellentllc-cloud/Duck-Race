import Link from 'next/link';
import PotTracker from '@/components/PotTracker';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-wrangler-700 to-wrangler-800 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Toyne-Britton<br />
              <span className="text-carhartt-300">Memorial Scholarship</span>
            </h1>
            <p className="text-xl text-carhartt-200 mb-6 italic">
              "Strength and courage to face the world."
            </p>
            <p className="text-wrangler-100 max-w-2xl mx-auto mb-8">
              Honoring two men who embodied service, hard work, and unwavering dedication
              to their communities through a scholarship that helps local kids build their future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/buy-ducks" className="bg-carhartt-500 hover:bg-carhartt-600 text-wrangler-900 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg text-center text-lg">
                Buy Your Ducks
              </Link>
              <a href="#jason" className="btn-outline border-white text-white hover:bg-white/10 text-center">
                Their Stories
              </a>
            </div>
          </div>

          {/* Two Photo placeholders side by side */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-wrangler-600/50 rounded-xl p-6 border-4 border-carhartt-400">
              <div className="aspect-[4/5] flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-carhartt-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-wrangler-800 font-bold text-2xl">JT</span>
                  </div>
                  <p className="text-wrangler-200 text-xs">(Photo placeholder)</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-white text-xl font-semibold">Jason Toyne</p>
                <p className="text-carhartt-300">1982 - 2025</p>
                <p className="text-wrangler-200 text-sm mt-2">Sedgwick, Colorado</p>
              </div>
            </div>

            <div className="bg-wrangler-600/50 rounded-xl p-6 border-4 border-carhartt-400">
              <div className="aspect-[4/5] flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-carhartt-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-wrangler-800 font-bold text-2xl">CB</span>
                  </div>
                  <p className="text-wrangler-200 text-xs">(Photo placeholder)</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-white text-xl font-semibold">Cameron Britton</p>
                <p className="text-carhartt-300">1987 - 2024</p>
                <p className="text-wrangler-200 text-sm mt-2">Ovid, Colorado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pot Tracker Section */}
      <section className="py-12 bg-carhartt-100">
        <div className="max-w-5xl mx-auto px-4">
          <PotTracker />
        </div>
      </section>

      {/* Race Event Section */}
      <section className="py-16 bg-wrangler-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Race Day: April 25, 2026
          </h2>
          <p className="text-xl text-carhartt-200 mb-8">
            A Day of Remembrance and Fellowship
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            <div className="bg-wrangler-600/50 rounded-xl p-6 border border-wrangler-500">
              <h3 className="text-lg font-bold text-carhartt-300 mb-3">Location</h3>
              <p className="text-wrangler-100">
                From the river bridge at Sedgwick to the Ovid bridge, or a built course
                in town. Final location will be announced as we get closer to race day.
              </p>
            </div>

            <div className="bg-wrangler-600/50 rounded-xl p-6 border border-wrangler-500">
              <h3 className="text-lg font-bold text-carhartt-300 mb-3">The Event</h3>
              <p className="text-wrangler-100">
                Join us for a day to remember Jason and Cameron, celebrate their lives,
                and come together as a community. Four races, four winners, and a chance
                to support local youth.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/buy-ducks" className="bg-carhartt-500 hover:bg-carhartt-600 text-wrangler-900 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg inline-block">
              Get Your Ducks Before Race Day
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-wrangler-600">
            <p className="text-carhartt-300 text-sm">
              Payment accepted via Cash, Venmo, or PayPal
            </p>
            <p className="text-wrangler-200 text-sm mt-1">
              Contact: Jan Toyne, Vance McCormick, or Kyle McConnell
            </p>
          </div>
        </div>
      </section>

      {/* About Jason Section */}
      <section id="jason" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-wrangler-800 text-center mb-12">
            Remembering Jason Toyne
          </h2>

          <div className="space-y-8">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-carhartt-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-carhartt-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-carhartt-800 mb-2">A Farming Legacy</h3>
                  <p className="text-gray-700">
                    Jason was a Sedgwick, Colorado farmer through and through. He worked the land
                    with dedication and pride, carrying on the agricultural traditions that built
                    our community. The fields he tended and the crops he raised were a testament
                    to his hard work and commitment to the land he loved.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrangler-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-wrangler-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-wrangler-700 mb-2">25 Years of Service</h3>
                  <p className="text-gray-700">
                    For a quarter century, Jason served as a volunteer firefighter, answering
                    the call whenever his community needed him. Day or night, rain or shine,
                    he was there—protecting homes, saving lives, and putting others before himself.
                    His courage and dedication to the fire department exemplified the very best
                    of what it means to serve.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-carhartt-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-carhartt-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-carhartt-800 mb-2">Always Just a Call Away</h3>
                  <p className="text-gray-700">
                    More than anything, Jason was known as someone you could count on. Whether
                    you needed help with a broken-down tractor, a hand during harvest, or just
                    someone to talk to, Jason was always just a call away. He never asked for
                    recognition or reward—he helped because that's who he was.
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-wrangler-50 border-wrangler-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrangler-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-wrangler-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-wrangler-800 mb-2">The South Platte</h3>
                  <p className="text-gray-700">
                    Jason loved floating the South Platte when the water ran high. Those peaceful
                    moments on the river—that's where we'll race the ducks in his memory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Cameron Section */}
      <section id="cameron" className="py-16 bg-haynes-200">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-wrangler-800 text-center mb-12">
            Remembering Cameron Britton
          </h2>

          <div className="space-y-8">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrangler-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-wrangler-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-wrangler-700 mb-2">A Marine and a Patriot</h3>
                  <p className="text-gray-700">
                    Cameron proudly served in the United States Marine Corps, earning an honorable
                    discharge. His military service shaped the disciplined, dedicated man who would
                    go on to serve his community in countless ways. He carried that sense of duty
                    and honor with him throughout his life.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-carhartt-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-carhartt-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-carhartt-800 mb-2">Master of All Trades</h3>
                  <p className="text-gray-700">
                    Cameron was a true jack-of-all-trades who could master any project. With a
                    degree in diesel mechanics from WyoTech, his expertise spanned mechanics,
                    plumbing, and electrical work. At just 12 years old, he rewired his family's
                    shop, confident he could do it better—and he was right.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-wrangler-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-wrangler-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-wrangler-700 mb-2">Community Builder</h3>
                  <p className="text-gray-700">
                    Cameron dedicated himself to building up those around him. He served as a
                    hunter safety instructor, led 4-H and Fairboard programs, volunteered with
                    the local ambulance service, and worked on town and county infrastructure.
                    When a fire devastated his parents' home, Cameron rebuilt it himself.
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-carhartt-50 border-carhartt-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-carhartt-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-carhartt-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-carhartt-800 mb-2">Family Man</h3>
                  <p className="text-gray-700">
                    Cameron and his wife Bridget built a life together on their farm near Ovid,
                    raising their four children—Phillip, Elizabeth, Georgianna, and Jojo. He loved
                    the outdoors, from hunting and fishing to camping and raising goats. His
                    family was his greatest joy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-wrangler-800 text-center mb-4">
            The Scholarship Mission
          </h2>
          <p className="text-center text-carhartt-700 mb-12 text-lg">
            Helping local kids build their future
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-16 h-16 bg-wrangler-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-wrangler-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-wrangler-800 mb-2">College</h3>
              <p className="text-gray-600">
                Support students pursuing higher education and academic dreams
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-carhartt-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-carhartt-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-carhartt-800 mb-2">Trade School</h3>
              <p className="text-gray-600">
                Help young people buy tools and equipment for skilled trades
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-wrangler-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-wrangler-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-wrangler-800 mb-2">Community Service</h3>
              <p className="text-gray-600">
                Reward exemplary service in the spirit of their legacy
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-wrangler-800 font-semibold italic">
              "Strength and courage to face the world."
            </p>
            <p className="text-carhartt-600 mt-2">
              — The guiding principle of the Toyne-Britton Memorial Scholarship
            </p>
          </div>
        </div>
      </section>

      {/* Duck Race Explanation Section */}
      <section className="py-16 bg-haynes-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-wrangler-800 text-center mb-4">
            The Duck Race
          </h2>
          <p className="text-center text-carhartt-700 mb-12">
            4 Races &middot; 4 Winners &middot; Pick Your Price Level
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-wrangler-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg text-wrangler-800">Choose Your Tier</h3>
                  <p className="text-gray-600">Pick from $10, $25, $50, or $100 ducks. Each tier races separately with its own winner.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-wrangler-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg text-wrangler-800">Race Day</h3>
                  <p className="text-gray-600">Four separate races on the South Platte. A, B, C, and D ducks each race their own group.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-wrangler-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg text-wrangler-800">4 Winners</h3>
                  <p className="text-gray-600">One winner from each tier. More affordable entry means more winners and more chances.</p>
                </div>
              </div>
            </div>

            <div className="card bg-white border-carhartt-200">
              <h3 className="text-2xl font-bold text-wrangler-900 mb-4 text-center">Duck Tiers</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-haynes-100 rounded-lg border border-carhartt-100">
                  <span className="font-bold text-wrangler-800">A - $10 Duck</span>
                  <span className="text-sm text-gray-600">Winner: 30% | Scholarship: 70%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-haynes-100 rounded-lg border border-carhartt-100">
                  <span className="font-bold text-wrangler-800">B - $25 Duck</span>
                  <span className="text-sm text-gray-600">Winner: 35% | Scholarship: 65%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-haynes-100 rounded-lg border border-carhartt-100">
                  <span className="font-bold text-wrangler-800">C - $50 Duck</span>
                  <span className="text-sm text-gray-600">Winner: 40% | Scholarship: 60%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-haynes-100 rounded-lg border border-carhartt-100">
                  <span className="font-bold text-wrangler-800">D - $100 Duck</span>
                  <span className="text-sm text-gray-600">Winner: 50% | Scholarship: 50%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/buy-ducks" className="bg-wrangler-600 hover:bg-wrangler-700 text-white font-bold text-xl px-8 py-4 rounded-lg inline-block transition-colors shadow-lg">
              Get Your Ducks Now
            </Link>
            <p className="text-carhartt-600 mt-4">
              Every duck you buy supports local youth and honors their memory
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
