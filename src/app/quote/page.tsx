import { Suspense } from 'react';
import QuoteForm from '@/components/QuoteForm';
import { Loader2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Project Planner',
  description:
    'Transparent technology services pricing. Configure your scope, review instant milestone breakdowns with 30% advance deposits, and reserve your sprint.',
};

export default function QuotePage() {
  return (
    <div className="min-h-screen pt-12 pb-24 relative overflow-hidden">

      {/* Atmospheric ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c9ef4f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-[#385325]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="overline-tag mb-4 block">TRANSPARENT PRICING & SCOPE</span>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.04] text-[#f5f4ed] mb-6">
            Transparent pricing
            <br />
            <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
              for ambitious builders
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#b6b8a9] leading-relaxed max-w-2xl mx-auto">
            Select your technical capabilities, customize scope sizes, and receive an instant itemized estimate with our 30% advance deposit model.
          </p>
        </div>

        {/* Interactive Form with Suspense fallback */}
        <Suspense
          fallback={
            <div className="p-20 flex flex-col items-center justify-center text-[#787c6f]">
              <Loader2 size={36} className="animate-spin text-[#c9ef4f] mb-4" />
              <p className="text-sm font-semibold text-white">Initializing pricing calculator...</p>
            </div>
          }
        >
          <QuoteForm />
        </Suspense>

        {/* ========================================================================= */}
        {/* PRICING & GOVERNANCE FAQ SECTION                                          */}
        {/* ========================================================================= */}
        <div className="mt-28 pt-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="overline-tag mb-3 block">CLEAR STANDARDS</span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3">
              Frequently asked questions
            </h2>
            <p className="text-xs sm:text-sm text-[#787c6f]">
              Everything you need to know about our milestone governance and sprint allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">

            <div className="glass-card rounded-[2rem] p-7 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-[#c9ef4f]">❖</span>
                How does the 30% advance deposit work?
              </h4>
              <p className="text-xs text-[#b6b8a9] leading-relaxed">
                Once we mutually finalize your technical scope, a 30% advance deposit secures your sprint allocation and senior engineer commitment. Work begins immediately upon confirmation.
              </p>
            </div>

            <div className="glass-card rounded-[2rem] p-7 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-[#c9ef4f]">❖</span>
                When is the remaining 70% balance paid?
              </h4>
              <p className="text-xs text-[#b6b8a9] leading-relaxed">
                The remaining 70% is due only upon completion and formal client sign-off of your agreed sprint deliverables, ensuring zero delivery risk for your business.
              </p>
            </div>

            <div className="glass-card rounded-[2rem] p-7 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-[#c9ef4f]">❖</span>
                Who owns the code and intellectual property?
              </h4>
              <p className="text-xs text-[#b6b8a9] leading-relaxed">
                You retain 100% intellectual property ownership of all source code, models, database schemas, and documentation created during our engagement from day one.
              </p>
            </div>

            <div className="glass-card rounded-[2rem] p-7 border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-[#c9ef4f]">❖</span>
                Can I adjust or expand scope during development?
              </h4>
              <p className="text-xs text-[#b6b8a9] leading-relaxed">
                Yes. If requirements change mid-flight, we draft a concise scope change addendum with transparent pricing adjustments before executing any modified code.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
