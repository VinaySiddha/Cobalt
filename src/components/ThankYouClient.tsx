'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Printer, PhoneCall, Mail } from 'lucide-react';

interface ThankYouClientProps {
  reference: string;
}

export default function ThankYouClient({ reference }: ThankYouClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (reference) {
      navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white">
      {/* Top Banner */}
      <div className="border border-gray-200 p-8 sm:p-12 mb-12">
        <div className="w-12 h-12 bg-[#113FCB] text-white flex items-center justify-center rounded-sm mb-6">
          <Check size={28} strokeWidth={3} />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-[#113FCB] block mb-2">
          Request Confirmed
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black mb-4">
          Thank you. Your quotation request has been received.
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed mb-8">
          A confirmation has been sent to your email. Our team has received your full project specifications and is preparing a detailed review.
        </p>

        {/* Reference Number Box */}
        <div className="bg-[#F0F4FF] border-2 border-[#113FCB] p-6 max-w-md">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
            Your Reference ID
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl sm:text-3xl font-black tracking-wider text-[#113FCB]">
              {reference || 'COB-PENDING'}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#CDD9FF] text-xs font-bold text-[#113FCB] hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-neutral-600 mt-2">
            Save this reference number for all future correspondence regarding this project.
          </p>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-black tracking-tight text-black mb-6">
          What Happens Next?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-gray-200 p-6 bg-white">
            <div className="text-sm font-black text-[#113FCB] uppercase tracking-wider mb-2">
              Phase 01
            </div>
            <h3 className="font-bold text-base text-black mb-2">Engineering Review</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Our technical lead analyzes your project description, selected services, and timeline feasibility within 1 business day.
            </p>
          </div>

          <div className="border border-gray-200 p-6 bg-white">
            <div className="text-sm font-black text-[#113FCB] uppercase tracking-wider mb-2">
              Phase 02
            </div>
            <h3 className="font-bold text-base text-black mb-2">Direct Consultation</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We reach out via your preferred channel (email or phone) to verify requirements, edge cases, and milestone timelines.
            </p>
          </div>

          <div className="border border-gray-200 p-6 bg-white">
            <div className="text-sm font-black text-[#113FCB] uppercase tracking-wider mb-2">
              Phase 03
            </div>
            <h3 className="font-bold text-base text-black mb-2">30% Advance Agreement</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Upon mutual agreement on the exact scope and estimate, we issue an invoice for the 30% advance deposit.
            </p>
          </div>

          <div className="border border-gray-200 p-6 bg-white">
            <div className="text-sm font-black text-[#113FCB] uppercase tracking-wider mb-2">
              Phase 04
            </div>
            <h3 className="font-bold text-base text-black mb-2">Project Kickoff</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Sprint work starts immediately upon receipt of the advance. Remaining 70% balance is settled upon milestone completion.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <Link href="/" className="btn-primary w-full sm:w-auto text-center">
            Return to Homepage
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="btn-secondary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Printer size={16} />
            <span>Print Confirmation</span>
          </button>
        </div>

        <div className="text-xs text-neutral-500 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Mail size={14} className="text-[#113FCB]" />
            contact@cobalt.tech
          </span>
          <span className="flex items-center gap-1">
            <PhoneCall size={14} className="text-[#113FCB]" />
            +1 (800) 555-0198
          </span>
        </div>
      </div>
    </div>
  );
}
