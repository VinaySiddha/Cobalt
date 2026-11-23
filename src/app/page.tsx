import Link from 'next/link';
import { PRICING_CONFIG } from '@/config/pricing';
import { ArrowRight, Zap, Shield, TrendingUp, Code2, BarChart3, Bot, ChevronRight, Star } from 'lucide-react';
import type { ReactNode } from 'react';

/* ── Cirform palette tokens (inline, matches globals.css) ── */
const CF = {
  blue: '#C9EF4F',
  purple: '#DCED9A',
  ice: '#DCED9A',
  plum: '#4A5036',
  white: '#F5F4ED',
  gray: '#B6B8A9',
  navy: '#10130D',
  black: '#050605',
};

const STAT_CARDS = [
  { label: 'Projects Shipped', value: '120+', delta: '+18 this year', color: CF.ice },
  { label: 'Avg Delivery Time', value: '3.2wk', delta: 'vs 6wk industry avg', color: CF.ice },
  { label: 'Client Retention', value: '94%', delta: 'return for more', color: CF.purple },
];

interface WhyCard {
  icon: ReactNode;
  title: string;
  desc: string;
  topGlow: string;   // inline bg rgba
  borderGlow: string; // inline border rgba
}

const WHY_CARDS: WhyCard[] = [
  {
    icon: <Zap size={18} style={{ color: CF.ice }} />,
    title: 'Instant Scope Planner',
    desc: 'Multi-service configuration with a clear, server-validated project brief. Choose only what you need.',
    topGlow: 'rgba(201, 239, 79, 0.10)',
    borderGlow: 'rgba(201, 239, 79, 0.30)',
  },
  {
    icon: <Shield size={18} style={{ color: CF.purple }} />,
    title: 'Secure Milestone Model',
    desc: 'A clear engagement path keeps the work focused from kickoff through verified delivery.',
    topGlow: 'rgba(220, 237, 154, 0.10)',
    borderGlow: 'rgba(220, 237, 154, 0.28)',
  },
  {
    icon: <TrendingUp size={18} style={{ color: CF.ice }} />,
    title: 'Direct Engineer Access',
    desc: 'You speak to the engineers building your product. No account managers, no telephone game.',
    topGlow: 'rgba(220, 237, 154, 0.08)',
    borderGlow: 'rgba(220, 237, 154, 0.20)',
  },
];

const SERVICE_ICONS: Record<string, ReactNode> = {
  'web-app-development': <Code2 size={20} style={{ color: CF.ice }} />,
  'seo': <TrendingUp size={20} style={{ color: CF.purple }} />,
  'data-analysis': <BarChart3 size={20} style={{ color: CF.ice }} />,
  'ai-solutions': <Bot size={20} style={{ color: CF.ice }} />,
  'ai-governance': <Shield size={20} style={{ color: CF.purple }} />,
  'mcp-services': <Zap size={20} style={{ color: CF.ice }} />,
};

export default function HomePage() {
  return (
    <div className="relative">

      {/* ================================================================ */}
      {/* HERO SECTION                                                      */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Cirform hero glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-120 rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(ellipse, rgba(201,239,79,0.12) 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-24 -left-12 w-85 h-85 rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(ellipse, rgba(220,237,154,0.10) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-10 right-0 w-70 h-70 rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(ellipse, rgba(74,80,54,0.12) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">

            {/* Overline chip */}
            <div className="inline-flex items-center chip mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: CF.ice }}
              />
              Cobalt · Engineering & Technology Services
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] mb-6"
              style={{ color: CF.white }}
            >
              <span className="gradient-text">Precision-engineered</span>
              <br />
              <span className="editorial-serif">tech services.</span>
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
              style={{ color: CF.gray }}>
              Select your services, outline your goals, and send a server-validated project brief directly to the engineering team.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2">
                Build Your Quote <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2">
                Explore Services <ChevronRight size={16} className="opacity-60" />
              </Link>
            </div>
          </div>

          {/* ── Floating Dashboard Mockup ── */}
          <div className="relative max-w-5xl mx-auto">
            <div
              className="glass-card rounded-2xl p-4 sm:p-6 shadow-2xl"
              style={{ boxShadow: '0 24px 80px rgba(1,2,11,0.60), 0 0 0 1px rgba(157,184,224,0.08)' }}
            >
              {/* Browser chrome top bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,100,80,0.7)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(240,180,50,0.7)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(50,210,100,0.7)' }} />
                </div>
                <span className="text-xs font-mono" style={{ color: CF.gray }}>cobalt.tech — Scope Planner</span>
                <div className="chip text-[10px] py-0.5 px-2.5">Live</div>
              </div>

              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                {STAT_CARDS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-4 border"
                    style={{
                      background: 'rgba(23, 28, 17, 0.72)',
                      borderColor: 'rgba(157, 184, 224, 0.09)',
                    }}
                  >
                    <p className="text-xs mb-1" style={{ color: CF.gray }}>{s.label}</p>
                    <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'rgba(185,185,184,0.45)' }}>{s.delta}</p>
                  </div>
                ))}
              </div>

              {/* Bar Chart Row */}
              <div
                className="rounded-xl p-4 border"
                style={{ background: 'rgba(23, 28, 17, 0.62)', borderColor: 'rgba(245, 244, 237, 0.10)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold" style={{ color: CF.ice }}>Service Demand · Last 6 Months</span>
                  <div className="chip text-[10px]">Web Apps leading</div>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                  {[55, 70, 45, 85, 60, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${h}%`,
                        background: i === 5
                          ? `linear-gradient(to top, ${CF.blue}, ${CF.ice})`
                          : 'rgba(157, 184, 224, 0.08)',
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((m) => (
                    <span key={m} className="text-[10px] flex-1 text-center" style={{ color: 'rgba(185,185,184,0.40)' }}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating side cards */}
            <div
              className="hidden lg:flex absolute -left-14 top-1/3 w-44 rounded-2xl p-3.5 flex-col gap-1.5 shadow-xl"
              style={{ background: 'rgba(16,19,13,0.78)', border: `1px solid rgba(245,244,237,0.11)`, backdropFilter: 'blur(16px)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,239,79,0.18)' }}>
                  <Star size={11} style={{ color: CF.ice }} />
                </div>
                <span className="text-[11px] font-semibold" style={{ color: CF.white }}>New Quote</span>
              </div>
              <p className="text-[10px]" style={{ color: CF.gray }}>AI Solutions · Medium scope</p>
              <p className="text-xs font-bold" style={{ color: CF.ice }}>Scope ready for review</p>
            </div>

            <div
              className="hidden lg:flex absolute -right-14 top-1/4 w-44 rounded-2xl p-3.5 flex-col gap-1.5 shadow-xl"
              style={{ background: 'rgba(16,19,13,0.78)', border: `1px solid rgba(245,244,237,0.11)`, backdropFilter: 'blur(16px)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(220,237,154,0.16)' }}>
                  <Shield size={11} style={{ color: CF.purple }} />
                </div>
                <span className="text-[11px] font-semibold" style={{ color: CF.white }}>Secure</span>
              </div>
              <p className="text-[10px] leading-snug" style={{ color: CF.gray }}>Server-validated scope. Zod schema enforced.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* WHY COBALT — 3 GLASSMORPHIC BENTO CARDS                          */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Why Cobalt</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: CF.white }}>
              Built differently. Scoped transparently.
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm" style={{ color: CF.gray }}>
              We replaced the consulting retainer model with a fixed-tier, milestone-based system that works in your favour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHY_CARDS.map((card) => (
              <div
                key={card.title}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 relative overflow-hidden"
                style={{ borderColor: card.borderGlow }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
                  style={{ background: `linear-gradient(to bottom, ${card.topGlow}, transparent)` }}
                />
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-5 border"
                    style={{ background: 'rgba(1,2,11,0.60)', borderColor: 'rgba(157,184,224,0.10)' }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: CF.white }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: CF.gray }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SERVICES GRID                                                     */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-eyebrow mb-2">Services</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: CF.white }}>
                Six focused domains.
              </h2>
              <p className="mt-2 max-w-lg text-sm" style={{ color: CF.gray }}>
                Clearly scoped. Transparent tiers. No ambiguity in what you receive.
              </p>
            </div>
            <Link
              href="/services"
              className="font-semibold text-sm flex items-center gap-1 shrink-0 transition-colors hover:opacity-80"
              style={{ color: CF.ice }}
            >
              Full scope breakdown <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRICING_CONFIG.services.map((service) => (
              <div
                key={service.id}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border"
                      style={{ background: 'rgba(1,2,11,0.50)', borderColor: 'rgba(157,184,224,0.09)' }}
                    >
                      {SERVICE_ICONS[service.id] ?? <Zap size={18} style={{ color: CF.ice }} />}
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{
                        color: CF.ice,
                        background: 'rgba(201,239,79,0.10)',
                        borderColor: 'rgba(201,239,79,0.30)',
                      }}
                    >
                      scope ready
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: CF.white }}>{service.name}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: CF.gray }}>{service.shortDescription}</p>

                  <ul className="space-y-1.5 mb-6">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2" style={{ color: CF.gray }}>
                        <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: CF.ice }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/quote?service=${service.id}`}
                  className="flex items-center justify-between text-xs font-semibold pt-4 transition-colors"
                  style={{
                    borderTop: '1px solid rgba(157,184,224,0.07)',
                    color: CF.ice,
                  }}
                >
                  <span>Configure in quote</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Client perspective</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: CF.white }}>
              Built for clarity.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { quote: 'The scope was clear from day one, and the delivery felt unusually calm.', name: 'Maya R.', role: 'Founder, Northstar Labs' },
              { quote: 'We knew exactly what we were paying for before the first sprint began.', name: 'Daniel K.', role: 'Operations Lead, Fieldwork' },
              { quote: 'Direct access to the engineers made every decision faster and sharper.', name: 'Priya S.', role: 'Product Director, Lumen' },
            ].map((testimonial) => (
              <figure key={testimonial.name} className="glass-card rounded-2xl p-6 sm:p-8">
                <blockquote className="testimonial-copy" style={{ color: CF.white }}>
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-8">
                  <div className="text-sm font-semibold" style={{ color: CF.white }}>{testimonial.name}</div>
                  <div className="text-xs mt-1" style={{ color: CF.gray }}>{testimonial.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PROCESS STEPS                                                     */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: CF.white }}>
              From brief to delivery in 4 steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: '01', title: 'Project Brief', desc: 'Select services and project sizes. The planner records a clear, server-validated scope in real time.' },
              { n: '02', title: 'Technical Review', desc: 'Our lead engineers review your submission within one business day and reach out to finalize specifications.' },
              { n: '03', title: 'Sprint Alignment', desc: 'Both parties agree on scope, timing, and responsibilities before work begins.' },
              { n: '04', title: 'Delivery & Review', desc: 'Deliverables pass rigorous QA and move through milestone review with your team.' },
            ].map((step) => (
              <div key={step.n} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div
                  className="absolute -top-5 -right-5 text-7xl font-black select-none pointer-events-none"
                  style={{ color: 'rgba(201,239,79,0.08)' }}
                >
                  {step.n}
                </div>
                <span className="gradient-text-olive text-3xl font-black block mb-4">{step.n}</span>
                <h3 className="text-sm font-bold mb-2" style={{ color: CF.white }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: CF.gray }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA BANNER                                                        */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative glass-card rounded-3xl p-10 sm:p-16 overflow-hidden text-center"
            style={{ borderColor: 'rgba(201,239,79,0.35)' }}
          >
            {/* Inner glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-45 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(201,239,79,0.14) 0%, transparent 70%)', filter: 'blur(40px)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-70 h-50 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(220,237,154,0.10) 0%, transparent 70%)', filter: 'blur(50px)' }}
            />

            <div className="relative">
              <div className="chip mx-auto w-fit mb-5">Ready to build?</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ color: CF.white }}>
                Get your project brief in<br />
                <span className="gradient-text">under 2 minutes.</span>
              </h2>
              <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: CF.gray }}>
                Build your service bundle, describe the outcome, and submit — the engineering team will respond within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/quote" className="btn-primary text-base px-10 py-4 flex items-center justify-center gap-2">
                  Configure Your Quote <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="btn-secondary text-base px-8 py-4 text-center">
                  Talk to an Engineer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
