import Link from 'next/link';
import { PRICING_CONFIG, formatCurrency } from '@/config/pricing';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#F0F4FF] border border-[#CDD9FF] text-[#113FCB] text-xs font-semibold uppercase tracking-wider mb-6">
              Engineering & Technology Services
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black leading-tight sm:leading-none mb-6">
              Technology services built for business results.
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-600 font-normal leading-relaxed mb-10">
              Select your services, receive an instant fixed-tier estimate, and agree on a 30% advance before kickoff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2"
              >
                <span>Get a Quote</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="btn-secondary text-base px-8 py-4 text-center"
              >
                View Services & Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 lg:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-black">
                Our Services
              </h2>
              <p className="text-neutral-600 mt-2 text-base">
                Plain-language technical execution across six core domains.
              </p>
            </div>
            <Link
              href="/services"
              className="text-[#113FCB] font-semibold text-sm hover:underline mt-4 md:mt-0 flex items-center gap-1"
            >
              Detailed scope breakdown <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRICING_CONFIG.services.map((service) => (
              <div
                key={service.id}
                className="border border-gray-200 p-8 flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-[#113FCB] uppercase tracking-wider mb-2">
                    Starting from {formatCurrency(service.sizes.small.price)}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {service.name}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-[#113FCB] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/quote?service=${service.id}`}
                    className="text-xs font-bold text-[#113FCB] hover:text-[#0D32A3] uppercase tracking-wider flex items-center gap-1"
                  >
                    Configure in quote <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Process) Section */}
      <section className="py-20 lg:py-24 bg-neutral-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl font-black tracking-tight text-black">
              How We Work
            </h2>
            <p className="text-neutral-600 mt-2 text-base">
              A transparent four-step process from quotation to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 border border-gray-200">
              <span className="text-3xl font-black text-[#113FCB] block mb-3">01</span>
              <h3 className="text-base font-bold text-black mb-2">Instant Estimate</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Select your required services and project sizes. Our calculator computes a live price and advance breakdown.
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <span className="text-3xl font-black text-[#113FCB] block mb-3">02</span>
              <h3 className="text-base font-bold text-black mb-2">Technical Review</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Our leadership reviews your submission within one business day and contacts you to finalize specifications.
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <span className="text-3xl font-black text-[#113FCB] block mb-3">03</span>
              <h3 className="text-base font-bold text-black mb-2">30% Advance</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Both parties sign off on scope. The client transfers an agreed 30% advance deposit to secure sprint allocation.
              </p>
            </div>

            <div className="bg-white p-6 border border-gray-200">
              <span className="text-3xl font-black text-[#113FCB] block mb-3">04</span>
              <h3 className="text-base font-bold text-black mb-2">Execution & Delivery</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Work begins immediately. Deliverables undergo rigorous QA, and the remaining 70% balance is settled upon milestone completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Principles */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-black mb-6">
                Why clients choose Cobalt
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                We eliminate the uncertainty of traditional technology agencies. We do not charge open-ended consulting retainers or hide behind complex proposals.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-[#113FCB] pl-4">
                  <h4 className="font-bold text-black text-base">Direct Engineer Collaboration</h4>
                  <p className="text-neutral-600 text-sm mt-1">
                    You communicate directly with senior technical leads who write the code, not account managers.
                  </p>
                </div>
                <div className="border-l-2 border-[#113FCB] pl-4">
                  <h4 className="font-bold text-black text-base">Strict Milestone Governance</h4>
                  <p className="text-neutral-600 text-sm mt-1">
                    Every project begins with clear deliverables and a fair 30% advance, with balance due only upon delivery.
                  </p>
                </div>
                <div className="border-l-2 border-[#113FCB] pl-4">
                  <h4 className="font-bold text-black text-base">Enterprise Standards</h4>
                  <p className="text-neutral-600 text-sm mt-1">
                    Production code with TypeScript, comprehensive tests, modern cloud setups, and secure architectures.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#113FCB] text-white p-10 sm:p-14">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                Ready for a clear estimate?
              </h3>
              <p className="text-blue-100 text-base leading-relaxed mb-8">
                Build your service bundle now. You will receive an instant itemized breakdown and our team will get in touch within 24 hours.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center bg-white text-[#113FCB] font-bold px-8 py-4 text-base hover:bg-neutral-100 transition-colors w-full sm:w-auto"
              >
                Configure Your Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
