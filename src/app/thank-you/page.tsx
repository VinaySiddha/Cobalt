import ThankYouClient from '@/components/ThankYouClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quotation Confirmation',
  description:
    'Your quotation request has been submitted to Cobalt. Review your reference ID and next steps.',
};

interface ThankYouPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const resolvedParams = await searchParams;
  const reference = resolvedParams.ref || '';

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ThankYouClient reference={reference} />
      </div>
    </div>
  );
}
