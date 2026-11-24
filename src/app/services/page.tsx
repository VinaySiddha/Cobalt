import Link from 'next/link';
import { PRICING_CONFIG, formatCurrency } from '@/config/pricing';
import { ArrowRight, Check, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Scope',
  description:
    'Explore Cobalt technology services: Web App Development, SEO, Data Analysis, AI Solutions, AI Governance, and MCP Services with transparent scope.',
};

export default function ServicesPage() {
  return (
    <div className="relative text-[#f5f4ed]">
      {/* Hero Header */}
      <section className="relative pt-24 sm:pt-32 pb-16 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c9ef4f]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="overline-tag mb-4 block">SIX CORE DOMAINS</span>
          <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.04] text-[#f5f4ed] mb-5">
            Specialized capabilities
            <br />
            <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
              engineered for growth
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#b6b8a9] max-w-2xl mx-auto leading-relaxed">
            Clearly scoped. Transparent engagement tiers. No retainers, no ambiguity — only what you agree on.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section id="capabilities" className="py-10 pb-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {PRICING_CONFIG.services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="glass-card rounded-[2rem] border border-white/10 overflow-hidden scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Service Overview */}
                <div className="lg:col-span-5 p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="overline-tag mb-2 block">
                      Service {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3">
                      {service.name}
                    </h2>
                    <p className="text-[#b6b8a9] text-xs sm:text-sm leading-relaxed mb-6">
                      {service.fullDescription}
                    </p>

                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#787c6f] mb-3">
                      Core Deliverables
                    </h3>
                    <ul className="space-y-2 mb-8">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f5f4ed]">
                          <Check size={15} className="text-[#c9ef4f] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/quote?service=${service.id}`}
                    className="btn-primary-white py-3 px-6 text-xs font-semibold self-start"
                  >
                    <span>Configure in pricing calculator</span>
                    <span>➔</span>
                  </Link>
                </div>

                {/* Right: Scope Tiers */}
                <div className="lg:col-span-7 p-7 sm:p-9 bg-black/20">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#787c6f] mb-5">
                    Scope Tiers & Pricing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                    {(['small', 'medium', 'large'] as const).map((tierKey) => {
                      const tier = service.sizes[tierKey];
                      const isRecommended = tierKey === 'medium';
                      return (
                        <div
                          key={tierKey}
                          className={`rounded-2xl p-5 flex flex-col justify-between border transition-all ${
                            isRecommended
                              ? 'border-[#c9ef4f]/40 bg-[#162113]/70 shadow-lg'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[11px] font-bold uppercase tracking-widest text-[#787c6f]">
                                {tier.label}
                              </span>
                              {isRecommended && (
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#c9ef4f] text-[#060807] px-2 py-0.5 rounded-full">
                                  Choice
                                </span>
                              )}
                            </div>
                            <div className="text-2xl font-bold text-white mb-2">
                              {formatCurrency(tier.price)}
                            </div>
                            <p className="text-xs text-[#b6b8a9] leading-relaxed">
                              {tier.scopeSummary}
                            </p>
                          </div>

                          <div className="mt-5 pt-3 border-t border-white/10">
                            <Link
                              href={`/quote?service=${service.id}&size=${tierKey}`}
                              className="text-xs font-semibold text-[#c9ef4f] hover:underline flex items-center justify-between"
                            >
                              <span>Select {tier.label}</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl p-3.5 bg-white/5 border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-[#787c6f]">
                    <span className="flex items-center gap-1.5 text-[#b6b8a9]">
                      <Zap size={13} className="text-[#c9ef4f]" />
                      Expedited sprint capacity available (+25% speed)
                    </span>
                    <span className="font-semibold text-white">30% advance on approval</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-card rounded-[2.5rem] p-10 sm:p-14 border border-white/15 overflow-hidden text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[200px] bg-[#c9ef4f]/12 blur-[100px] pointer-events-none" />
            <div className="relative">
              <span className="overline-tag mb-3 block">CUSTOM ENGAGEMENTS</span>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
                Need a multi-service bundle?
              </h2>
              <p className="text-[#b6b8a9] text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                Our interactive quotation engine allows you to combine multiple services, customize individual tier sizes, and receive an instant advance breakdown.
              </p>
              <Link href="/quote" className="btn-primary-white py-3.5 px-8 text-sm font-semibold inline-flex items-center gap-2">
                <span>Open Instant Pricing Calculator</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
