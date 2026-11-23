import Link from 'next/link';
import { PRICING_CONFIG, formatCurrency } from '@/config/pricing';
import { ArrowRight, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing Scope',
  description:
    'Explore Cobalt technology services: Web App Development, SEO, Data Analysis, AI Solutions, AI Governance, and MCP Services with transparent pricing.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-gray-200 py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black mb-4">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
              We provide six focused technology services with clearly defined scopes, realistic timelines, and transparent pricing tiers.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="capabilities" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {PRICING_CONFIG.services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="border-t-2 border-black pt-10 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Service Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-black uppercase tracking-widest text-[#113FCB]">
                    Service 0{index + 1}
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-black">
                    {service.name}
                  </h2>
                  <p className="text-neutral-700 text-base leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      Core Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-800">
                          <Check size={16} className="text-[#113FCB] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/quote?service=${service.id}`}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <span>Quote this service</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Scope Tiers */}
                <div className="lg:col-span-7">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">
                    Scope & Pricing Tiers
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(['small', 'medium', 'large'] as const).map((tierKey) => {
                      const tier = service.sizes[tierKey];
                      return (
                        <div
                          key={tierKey}
                          className="border border-gray-200 p-5 flex flex-col justify-between hover:border-neutral-400 transition-colors"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                {tier.label}
                              </span>
                            </div>
                            <div className="text-2xl font-black text-black mb-3">
                              {formatCurrency(tier.price)}
                            </div>
                            <p className="text-xs text-neutral-600 leading-relaxed">
                              {tier.scopeSummary}
                            </p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <Link
                              href={`/quote?service=${service.id}&size=${tierKey}`}
                              className="text-xs font-bold text-[#113FCB] hover:text-[#0D32A3] flex items-center justify-between"
                            >
                              <span>Select {tier.label}</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 bg-neutral-50 border border-gray-200 text-xs text-neutral-600 flex justify-between items-center">
                    <span>Expedited delivery available via Fast timeline (+25%).</span>
                    <span className="font-semibold text-neutral-900">30% advance on approval</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight mb-4">
            Need a combination of services?
          </h2>
          <p className="text-neutral-400 text-base mb-8">
            Our quotation calculator allows you to bundle multiple services, set their respective sizes, and calculate your total and advance payment in real time.
          </p>
          <Link
            href="/quote"
            className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
          >
            <span>Open Quote Calculator</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
