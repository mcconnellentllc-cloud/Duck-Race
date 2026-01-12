import Link from 'next/link';

export default function LegalPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Legal Information</h1>
          <p className="text-lg opacity-90">
            Colorado charitable gaming requirements for this duck race
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Important Notice */}
          <div className="card bg-red-50 border-2 border-red-200">
            <h2 className="text-xl font-bold text-red-800 mb-4">
              Important: Colorado Charitable Gaming License Required
            </h2>
            <p className="text-red-700 mb-4">
              Under Colorado law, a duck race where participants purchase entries for a chance
              to win prizes is classified as a <strong>raffle</strong> and requires a charitable
              gaming license from the Colorado Secretary of State.
            </p>
            <p className="text-red-700 text-sm">
              <strong>Do NOT conduct a raffle without first obtaining a charitable gaming license.</strong>
              {' '}&mdash; Colorado Secretary of State
            </p>
          </div>

          {/* Who Can Get a License */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Who Can Obtain a License?
            </h2>
            <p className="mb-4">
              Only specific types of organizations that have existed for <strong>5 or more years</strong> in
              Colorado can obtain a charitable gaming license. Qualified organizations include:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--muted)]">
              <li>Religious organizations</li>
              <li>Charitable organizations</li>
              <li>Fraternal organizations</li>
              <li>Educational organizations</li>
              <li><strong>Voluntary firefighter organizations</strong></li>
              <li>Veterans organizations</li>
              <li>Labor organizations</li>
            </ul>
            <p className="text-sm text-[var(--muted)]">
              The organization must operate without profit to members, have dues-paying membership,
              and have been carrying out organizational objectives for the entire 5-year period.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> As of 2025, Amendment F (passed in 2022) allows the legislature
                to reduce this 5-year requirement. The period was reduced to 3 years through January 1, 2025.
                Check current requirements with the Secretary of State.
              </p>
            </div>
          </div>

          {/* License Requirements */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              License Requirements
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                <div>
                  <strong>Submit Application</strong>
                  <p className="text-sm text-[var(--muted)]">File a bingo-raffle license application with the Secretary of State. Fee: $100</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                <div>
                  <strong>Designate a Games Manager</strong>
                  <p className="text-sm text-[var(--muted)]">Must complete state-required training and certification</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                <div>
                  <strong>Submit Sample Tickets (if prizes exceed $1,000)</strong>
                  <p className="text-sm text-[var(--muted)]">Voided sample ticket must be submitted at least 7 business days before sales begin</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-[var(--primary)] text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
                <div>
                  <strong>Keep Records</strong>
                  <p className="text-sm text-[var(--muted)]">Maintain all ticket stubs and unsold tickets for 6 months after the raffle quarter</p>
                </div>
              </li>
            </ul>
            <p className="text-sm text-[var(--muted)] mt-4">
              Allow 1-6 weeks for application processing.
            </p>
          </div>

          {/* Duck Race Specific */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Duck Race Classification
            </h2>
            <p className="mb-4">
              A duck race operates the same as a traditional raffle except that winning entries
              are determined by numbered rubber ducks crossing a finish line rather than drawing
              ticket stubs from a container.
            </p>
            <p className="mb-4">
              Under Colorado law, raffles include games where &ldquo;prizes are allotted by chance.&rdquo;
              Since the winning duck is determined by chance (water currents, etc.), this qualifies
              as a raffle requiring licensure.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Recommendation:</strong> Contact the Colorado Secretary of State&apos;s Charitable
                Gaming section directly to confirm duck race classification and requirements.
              </p>
            </div>
          </div>

          {/* 501(c)(3) Status */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              501(c)(3) Tax-Exempt Status
            </h2>
            <p className="mb-4">
              To obtain a Colorado charitable gaming license, organizations must be
              <strong> tax-exempt under the Internal Revenue Code</strong>. This typically means
              having 501(c)(3) or similar tax-exempt status.
            </p>
            <div className="bg-[var(--background)] rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-2">Options for This Fundraiser:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[var(--muted)]">
                <li>
                  <strong>Partner with an existing 501(c)(3)</strong> - A local fire department
                  auxiliary, VFW, or community foundation could sponsor the event
                </li>
                <li>
                  <strong>Fiscal sponsorship</strong> - An established nonprofit can act as the
                  legal sponsor and license holder
                </li>
                <li>
                  <strong>Form a new 501(c)(3)</strong> - Requires IRS application and waiting
                  period, plus 5-year existence requirement for gaming license
                </li>
              </ul>
            </div>
            <p className="text-sm text-[var(--muted)]">
              <strong>Important:</strong> Purchases of raffle/duck race entries are generally
              NOT tax-deductible for buyers, as they represent payment for a chance to win
              rather than a pure charitable donation.
            </p>
          </div>

          {/* Penalties */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Penalties for Violations
            </h2>
            <p className="mb-4">
              Colorado&apos;s charitable gaming regulations include fines for violations:
            </p>
            <ul className="space-y-2 text-[var(--muted)]">
              <li><strong>Class 1 violation:</strong> $175 fine</li>
              <li><strong>Class 2 violation:</strong> $125 fine</li>
              <li><strong>Class 3 violation:</strong> $50 (first offense) or $75 (repeated)</li>
            </ul>
            <p className="text-sm text-[var(--muted)] mt-4">
              Operating without a required license may result in additional penalties.
            </p>
          </div>

          {/* Distribution of Proceeds */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              4 Separate Races - 4 Winners
            </h2>
            <p className="mb-4">
              This duck race consists of 4 separate races, each with its own pot and winner:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>$10 Race:</strong> $10 per duck entry, 30% of pot to winner, 70% to scholarship</li>
              <li><strong>$25 Race:</strong> $25 per duck entry, 35% of pot to winner, 65% to scholarship</li>
              <li><strong>$50 Race:</strong> $50 per duck entry, 40% of pot to winner, 60% to scholarship</li>
              <li><strong>$100 Race:</strong> $100 per duck entry, 50% of pot to winner, 50% to scholarship</li>
            </ul>
            <p className="text-[var(--muted)] mb-2">
              Each entry is for 1 duck in that specific race. If you purchase a $10 duck, you are only
              eligible to win from the $10 race pot.
            </p>
            <p className="text-[var(--muted)]">
              Scholarship funds support education and community service initiatives in honor
              of Cameron Britton and Jason Toyne.
            </p>
          </div>

          {/* Eligibility & Terms */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Participation Terms
            </h2>
            <ul className="space-y-3 text-[var(--muted)]">
              <li>Participants must be 18 years of age or older</li>
              <li>Purchasing an entry does not guarantee any prize</li>
              <li>Winners are determined solely by the duck race outcome</li>
              <li>All sales are final and non-refundable</li>
              <li>Winner must be present or reachable to claim prize</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="card bg-[var(--primary)] text-white">
            <h2 className="text-2xl font-bold mb-4">Colorado Secretary of State</h2>
            <p className="mb-4">
              For questions about charitable gaming licenses and requirements:
            </p>
            <ul className="space-y-2 mb-4">
              <li><strong>Phone:</strong> (303) 869-4910</li>
              <li><strong>Email:</strong> licensing@coloradosos.gov</li>
              <li>
                <strong>Website:</strong>{' '}
                <a
                  href="https://www.sos.state.co.us/pubs/bingo_raffles/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[var(--secondary)]"
                >
                  sos.state.co.us/pubs/bingo_raffles
                </a>
              </li>
            </ul>
            <p className="text-sm opacity-80">
              This page provides general information only and does not constitute legal advice.
              Consult with the Secretary of State or a qualified attorney for specific guidance.
            </p>
          </div>

          {/* Sources */}
          <div className="card bg-gray-50">
            <h3 className="font-bold text-[var(--primary)] mb-3">Sources</h3>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>
                <a href="https://www.sos.state.co.us/pubs/bingo_raffles/FAQs/licenses.html" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                  Colorado Secretary of State - Bingo and Raffles FAQs
                </a>
              </li>
              <li>
                <a href="https://www.zeffy.com/blog/nonprofit-raffle-laws-in-colorado" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                  Zeffy - Colorado Raffle Laws for Nonprofits (2025)
                </a>
              </li>
              <li>
                <a href="https://www.sos.state.co.us/pubs/bingo_raffles/files/PlanningARaffle.pdf" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                  Colorado Secretary of State - Planning a Raffle (PDF)
                </a>
              </li>
              <li>
                <a href="https://ballotpedia.org/Colorado_Amendment_F,_Charitable_Gaming_Measure_(2022)" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
                  Ballotpedia - Colorado Amendment F (2022)
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
