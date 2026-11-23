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
    <div className="relative">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-lime-300/08 rounded-full blur-[90px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="chip mx-auto w-fit mb-5">Direct Communication</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            Contact Cobalt
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            No sales intermediaries. Speak directly with senior technical staff about your architecture, timeline, and requirements.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Contact Details */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-card rounded-2xl border border-white/[0.07] overflow-hidden">
                {[
                  {
                    icon: <Mail size={18} className="text-lime-300" />,
                    label: 'Email Inquiries',
                    value: 'contact@cobalt.tech',
                    sub: 'Expected response within 1 business day.',
                    href: 'mailto:contact@cobalt.tech',
                  },
                  {
                    icon: <Phone size={18} className="text-lime-200" />,
                    label: 'Direct Telephone',
                    value: '+1 (800) 555-0198',
                    sub: 'Toll-free in North America.',
                    href: 'tel:+18005550198',
                  },
                  {
                    icon: <MapPin size={18} className="text-emerald-200" />,
                    label: 'Physical Address',
                    value: 'Cobalt Technology Services LLC',
                    sub: '100 Technology Square, Suite 400\nCambridge, MA 02139, United States',
                    href: null,
                  },
                  {
                    icon: <Clock size={18} className="text-lime-300" />,
                    label: 'Operating Hours',
                    value: 'Mon – Fri · 9:00 AM – 6:00 PM EST',
                    sub: 'Emergency SLA support available for active retainer clients.',
                    href: null,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-5 sm:p-6 ${i < 3 ? 'border-b border-white/[0.06]' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-base font-bold text-white hover:text-lime-300 transition-colors block">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-bold text-white">{item.value}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-0.5 whitespace-pre-line">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-6 space-y-4">
              {/* Quote CTA */}
              <div className="glass-card rounded-2xl border border-lime-300/25 p-7 sm:p-9 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-lime-300/08 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="chip mb-4 w-fit">Fastest Path to a Plan</div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                    Need a plan for an upcoming project?
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Skip back-and-forth emails. Use our project planner to select services, configure scope tiers, and send a complete brief to the engineering team.
                  </p>
                  <Link
                    href="/quote"
                    className="btn-primary inline-flex items-center gap-2 text-sm"
                  >
                    Build a Project Brief
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Engagement Standards */}
              <div className="glass-card rounded-2xl border border-white/[0.07] p-7 sm:p-9">
                <h3 className="text-base font-bold text-white pb-4 mb-5 border-b border-white/[0.06]">
                  Engagement Standards
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      title: 'Engagement Rhythm',
                      desc: 'Every project begins with a clear scope review, shared milestones, and a delivery rhythm agreed by both teams.',
                    },
                    {
                      title: 'Confidentiality & NDAs',
                      desc: 'We routinely execute mutual NDAs before reviewing proprietary source code or confidential business data.',
                    },
                    {
                      title: 'Code Ownership',
                      desc: 'Clients retain 100% intellectual property ownership of all custom software, models, and documentation created during the engagement.',
                    },
                  ].map((item) => (
                    <div key={item.title}>
                      <span className="block text-xs font-bold text-slate-300 mb-1">{item.title}</span>
                      <span className="text-xs text-slate-500 leading-relaxed">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
