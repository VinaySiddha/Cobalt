import { Suspense } from 'react';
import QuoteForm from '@/components/QuoteForm';
import { Loader2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Project',
  description:
    'Configure your technology services, outline your scope, and submit a project brief for senior engineering review.',
};

export default function QuotePage() {
  return (
    <div className="plans-page min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="chip w-fit mb-5">
            Project planner
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4">
            Shape your next project
          </h1>
          <p className="text-lg text-[#B6B8A9] leading-relaxed">
            Choose the capabilities you need, set the delivery rhythm, and send your brief directly to the engineering team. We will follow up with a considered plan for the work.
          </p>
        </div>

        {/* Interactive Form with Suspense fallback */}
        <Suspense
          fallback={
            <div className="p-16 flex flex-col items-center justify-center text-neutral-500">
              <Loader2 size={32} className="animate-spin text-lime-300 mb-4" />
              <p className="text-sm font-semibold text-white">Loading project planner...</p>
            </div>
          }
        >
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
