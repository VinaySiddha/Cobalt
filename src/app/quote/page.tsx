import { Suspense } from 'react';
import QuoteForm from '@/components/QuoteForm';
import { Loader2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get an Instant Quote',
  description:
    'Configure your technology services, view live itemized pricing, and submit a formal quotation request with a 30% advance structure.',
};

export default function QuotePage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-block px-3 py-1 bg-[#F0F4FF] border border-[#CDD9FF] text-[#113FCB] text-xs font-semibold uppercase tracking-wider mb-4">
            Instant Cost Estimator
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black mb-4">
            Configure Your Project Quote
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Select the services you require and see live prices instantly. Submit your request for senior engineering review; work begins following mutual agreement and receipt of a 30% advance payment.
          </p>
        </div>

        {/* Interactive Form with Suspense fallback */}
        <Suspense
          fallback={
            <div className="p-16 flex flex-col items-center justify-center text-neutral-500">
              <Loader2 size={32} className="animate-spin text-[#113FCB] mb-4" />
              <p className="text-sm font-semibold">Loading quote calculator...</p>
            </div>
          }
        >
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
