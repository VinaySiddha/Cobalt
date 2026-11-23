import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Cobalt engineering leadership for custom technology engagements, technical questions, or project consultations.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="border-b border-gray-200 py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#F0F4FF] border border-[#CDD9FF] text-[#113FCB] text-xs font-semibold uppercase tracking-wider mb-4">
              Direct Communication
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black mb-4">
              Contact Cobalt
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">
              We operate without sales intermediaries. Speak directly with senior technical staff about your architecture, timeline, and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-black mb-2">
                  Company Headquarters
                </h2>
                <p className="text-neutral-600 text-sm">
                  Our core engineering and administrative team operates from Cambridge, Massachusetts.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 border border-gray-200">
                  <Mail className="text-[#113FCB] shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Email Inquiries
                    </h3>
                    <a
                      href="mailto:contact@cobalt.tech"
                      className="text-lg font-bold text-black hover:text-[#113FCB] transition-colors mt-0.5 block"
                    >
                      contact@cobalt.tech
                    </a>
                    <p className="text-xs text-neutral-500 mt-1">
                      Expected response within 1 business day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-gray-200">
                  <Phone className="text-[#113FCB] shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Direct Telephone
                    </h3>
                    <a
                      href="tel:+18005550198"
                      className="text-lg font-bold text-black hover:text-[#113FCB] transition-colors mt-0.5 block"
                    >
                      +1 (800) 555-0198
                    </a>
                    <p className="text-xs text-neutral-500 mt-1">
                      Toll-free in North America.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-gray-200">
                  <MapPin className="text-[#113FCB] shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Physical Address
                    </h3>
                    <p className="text-base font-bold text-black mt-0.5">
                      Cobalt Technology Services LLC
                    </p>
                    <p className="text-sm text-neutral-600 mt-0.5">
                      100 Technology Square, Suite 400<br />
                      Cambridge, MA 02139<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 border border-gray-200">
                  <Clock className="text-[#113FCB] shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Operating Hours
                    </h3>
                    <p className="text-sm font-bold text-black mt-0.5">
                      Monday through Friday: 9:00 AM – 6:00 PM EST
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Emergency SLA support available for active retainer clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Action Box & FAQ */}
            <div className="lg:col-span-6 space-y-8">
              <div className="bg-[#113FCB] text-white p-8 sm:p-10">
                <span className="text-xs font-black uppercase tracking-widest text-blue-200 block mb-2">
                  Fastest Route to Pricing
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                  Need a quote for an upcoming project?
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Skip back-and-forth emails. Use our interactive estimator to select services, configure scope tiers, and get live estimates with a 30% advance schedule.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-white text-[#113FCB] font-bold px-6 py-3.5 text-sm hover:bg-neutral-100 transition-colors"
                >
                  <span>Build an Instant Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Policy Notes */}
              <div className="border border-gray-200 p-8 space-y-6">
                <h3 className="text-lg font-bold text-black border-b border-gray-200 pb-3">
                  Engagement Standards
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <strong className="block text-black font-semibold">Payment Terms:</strong>
                    <span className="text-neutral-600">
                      All projects require an agreed 30% advance deposit prior to sprint commencement. The remaining 70% is billed upon satisfactory milestone delivery.
                    </span>
                  </div>

                  <div>
                    <strong className="block text-black font-semibold">Confidentiality & NDAs:</strong>
                    <span className="text-neutral-600">
                      We routinely execute mutual Non-Disclosure Agreements (NDAs) before reviewing proprietary source code or confidential business data.
                    </span>
                  </div>

                  <div>
                    <strong className="block text-black font-semibold">Code Ownership:</strong>
                    <span className="text-neutral-600">
                      Clients retain 100% intellectual property ownership of all custom software, scripts, models, and documentation created during the engagement.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
