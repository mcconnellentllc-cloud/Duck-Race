import Link from 'next/link';

export default function LegalPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Legal Information</h1>
          <p className="text-lg opacity-90">
            Important disclosures about the duck race fundraiser
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Disclaimer */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Disclaimer</h2>
            <p className="mb-4">
              This website and the associated duck race event are organized as a community
              fundraiser to benefit the Cameron Britton and Jason Toyne Memorial Scholarship Fund.
              By participating, you acknowledge and agree to the following terms.
            </p>
          </div>

          {/* Charitable Gaming */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Charitable Gaming Considerations
            </h2>
            <p className="mb-4">
              Duck races with prizes are generally considered a form of charitable gaming
              or raffle. In Colorado and most states, charitable gaming activities may be
              subject to specific regulations including:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--muted)]">
              <li>Registration requirements with the Secretary of State</li>
              <li>Reporting requirements for proceeds and distributions</li>
              <li>Restrictions on who can conduct charitable gaming</li>
              <li>Limits on prize amounts or frequency of events</li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> The organizers of this event are responsible for
                ensuring compliance with all applicable state and local laws regarding
                charitable gaming and raffles.
              </p>
            </div>
          </div>

          {/* 501(c)(3) Status */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Tax-Exempt Status (501(c)(3))
            </h2>
            <p className="mb-4">
              A 501(c)(3) designation from the IRS provides tax-exempt status and allows
              donors to claim tax deductions for their contributions. Key considerations:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--muted)]">
              <li>
                <strong>For organizers:</strong> Operating under a 501(c)(3) organization
                may simplify compliance and provide credibility
              </li>
              <li>
                <strong>For participants:</strong> Purchases of duck race entries where a
                prize is offered are generally NOT tax-deductible, as they represent
                payment for a chance to win rather than a pure donation
              </li>
              <li>
                <strong>Fiscal sponsorship:</strong> Working with an existing 501(c)(3)
                organization may be an option for smaller fundraisers
              </li>
            </ul>
          </div>

          {/* Gaming License */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Gaming License Requirements
            </h2>
            <p className="mb-4">
              Colorado regulates charitable gaming under the Colorado Secretary of State.
              Depending on the size and nature of the event, you may need to:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-[var(--muted)]">
              <li>Register as a charitable gaming organization</li>
              <li>File annual reports on gaming activities</li>
              <li>Follow specific rules about advertising and ticket sales</li>
              <li>Ensure a minimum percentage of proceeds go to charitable purposes</li>
            </ul>
            <p className="text-sm text-[var(--muted)]">
              Small community fundraisers may qualify for exemptions. Contact the Colorado
              Secretary of State&apos;s office at (303) 894-2200 or visit{' '}
              <a
                href="https://www.sos.state.co.us"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                sos.state.co.us
              </a>{' '}
              for specific guidance.
            </p>
          </div>

          {/* How Funds Are Used */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Distribution of Proceeds
            </h2>
            <p className="mb-4">
              Proceeds from the duck race are distributed as follows based on the tier purchased:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Bronze tier ($10): 30% to winner, 70% to scholarship fund</li>
              <li>Silver tier ($25): 35% to winner, 65% to scholarship fund</li>
              <li>Gold tier ($50): 40% to winner, 60% to scholarship fund</li>
              <li>Platinum tier ($100): 50% to winner, 50% to scholarship fund</li>
            </ul>
            <p className="text-[var(--muted)]">
              Scholarship funds will be used to support education and community service
              initiatives in honor of Cameron Britton and Jason Toyne.
            </p>
          </div>

          {/* No Guarantee */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              No Guarantee of Winnings
            </h2>
            <p className="mb-4">
              Purchasing a duck race entry does not guarantee any prize or winnings.
              Winners are determined solely by the outcome of the duck race event.
              All sales are final and non-refundable.
            </p>
          </div>

          {/* Age Requirement */}
          <div className="card">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">
              Eligibility
            </h2>
            <p className="mb-4">
              Participants must be 18 years of age or older to purchase duck race entries.
              Entries purchased on behalf of minors are the responsibility of the
              purchasing adult.
            </p>
          </div>

          {/* Contact */}
          <div className="card bg-[var(--primary)] text-white">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="mb-4">
              If you have questions about the legality of this fundraiser or need
              additional information, please contact the event organizers.
            </p>
            <p className="text-sm opacity-80">
              This page provides general information only and does not constitute
              legal advice. Consult with a qualified attorney for specific legal guidance.
            </p>
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
