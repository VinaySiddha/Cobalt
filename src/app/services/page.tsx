import Link from 'next/link';
import { PRICING_CONFIG } from '@/config/pricing';
import { ArrowRight, Check, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Scope',
  description:
    'Explore Cobalt technology services: Web App Development, SEO, Data Analysis, AI Solutions, AI Governance, and MCP Services with transparent scope.',
};

export default function ServicesPage() {
  return (
    <div className="relative">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-lime-300/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="chip mx-auto w-fit mb-5">Six Core Domains</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Services & Scope
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Clearly scoped. Transparent engagement levels. No retainers, no ambiguity — only what you agree on.
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
              className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Service Overview */}
                <div className="lg:col-span-5 p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/6">
                  <div className="section-eyebrow mb-3">Service {String(index + 1).padStart(2, '0')}</div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                    {service.name}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.fullDescription}
                  </p>

                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">
                    Core Deliverables
                  </h3>
                  <ul className="space-y-2 mb-7">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check size={15} className="text-lime-300 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/quote?service=${service.id}`}
                    className="btn-primary inline-flex items-center gap-2 text-sm"
                  >
                    <span>Plan this service</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Right: Scope Tiers */}
                <div className="lg:col-span-7 p-7 sm:p-9">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-5">
                    Scope levels
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {(['small', 'medium', 'large'] as const).map((tierKey) => {
                      const tier = service.sizes[tierKey];
                      const isRecommended = tierKey === 'medium';
                      return (
                        <div
                          key={tierKey}
                          className={`rounded-xl p-5 flex flex-col justify-between border transition-all hover:border-lime-300/30 ${isRecommended
                              ? 'border-lime-300/30 bg-lime-300/6'
                              : 'border-white/6 bg-white/2'
                            }`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                {tier.label}
                              </span>
                              {isRecommended && (
                                <span className="text-[9px] font-bold uppercase tracking-wider bg-lime-300/20 text-lime-200 px-2 py-0.5 rounded-full border border-lime-300/20">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="text-2xl font-black text-white mb-3">
                              {tier.scopeSummary}
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {tier.scopeSummary}
                            </p>
                          </div>
                          <div className="mt-5 pt-4 border-t border-white/5">
                            <Link
                              href={`/quote?service=${service.id}&size=${tierKey}`}
                              className="text-xs font-semibold text-lime-300 hover:text-lime-200 flex items-center justify-between transition-colors"
                            >
                              <span>Select {tier.label}</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="rounded-xl p-3.5 bg-white/2 border border-white/4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Zap size={11} className="text-lime-200" />
                      Fast delivery available for focused launches
                    </span>
                    <span className="font-semibold text-slate-400">Kickoff follows scope approval</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass-card rounded-3xl p-10 sm:p-14 border border-lime-300/20 overflow-hidden text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-40 bg-lime-300/12 blur-[70px] pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
                Need a bundle of services?
              </h2>
              <p className="text-slate-400 text-base mb-7 max-w-xl mx-auto">
                Our planner lets you combine multiple services, choose sizes independently, and send a complete project brief instantly.
              </p>
              <Link href="/quote" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">
                Open Project Planner <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
