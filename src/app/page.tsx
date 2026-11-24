import Link from 'next/link';
import { ArrowRight, Star, Heart, Bookmark, ArrowUpRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative text-[#f5f4ed]">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (EXACT REPLICATION OF SYNERGEUS HERO)                    */}
      {/* ========================================================================= */}
      <section className="relative pt-16 sm:pt-24 pb-20 lg:pb-32 overflow-hidden">

        {/* Botanical leaf foliage ambient framing (simulating the lush tea leaves) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Top-left botanical silhouette */}
          <div className="absolute -top-12 -left-20 w-[420px] h-[420px] opacity-25 filter blur-[1px]">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#4a6b32]">
              <path d="M0 0C140 30 240 140 280 280C140 280 40 180 0 0Z" fill="currentColor" opacity="0.6"/>
              <path d="M80 0C190 60 270 170 320 320C210 290 120 190 80 0Z" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>
          {/* Top-right botanical silhouette */}
          <div className="absolute -top-16 -right-20 w-[460px] h-[460px] opacity-25 filter blur-[1px]">
            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#385325]">
              <path d="M400 0C260 30 160 140 120 280C260 280 360 180 400 0Z" fill="currentColor" opacity="0.6"/>
              <path d="M320 0C210 60 130 170 80 320C190 290 280 190 320 0Z" fill="currentColor" opacity="0.4"/>
            </svg>
          </div>
          {/* Warm chartreuse radial halo behind central card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[650px] h-[550px] bg-[#c9ef4f]/12 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Main Heading & CTA */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.04] text-[#f5f4ed] mb-8">
              <span>Our AI simplify</span>
              <br />
              <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
                your financial life
              </span>
            </h1>

            {/* White Pill Button with Black Arrow Circle */}
            <div className="flex justify-center">
              <Link
                href="/quote"
                className="btn-primary-white shadow-2xl active:scale-95 group"
              >
                <span>Start free trial now</span>
                <span className="w-5 h-5 rounded-full bg-[#060807] text-white flex items-center justify-center text-[11px] group-hover:translate-x-0.5 transition-transform">
                  ➔
                </span>
              </Link>
            </div>
          </div>

          {/* Central Hero Visual Showcase */}
          <div className="relative max-w-xl mx-auto mb-16">
            {/* Ambient chartreuse glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#c9ef4f]/30 via-[#c9ef4f]/10 to-transparent rounded-[2.5rem] filter blur-2xl -z-10" />

            {/* The Main Showcase Card */}
            <div className="relative rounded-[2.25rem] border border-white/20 bg-gradient-to-b from-[#232b1f] via-[#151c14] to-[#0c100c] p-4 sm:p-5 shadow-2xl overflow-hidden">

              {/* Card Header */}
              <div className="flex items-center justify-between px-2 pt-1 pb-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f5f4ed]">
                  <span className="text-[#c9ef4f] text-sm">❖</span>
                  <span>Cobalt</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#8a8f81] uppercase">AI Advisor</span>
              </div>

              {/* Persona Image Container with Radiant Lighting */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
                {/* Fallback styling with realistic advisor portrait graphic */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80')`,
                    filter: 'contrast(1.05) brightness(0.95)',
                  }}
                />
                {/* Lime-chartreuse ambient gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-transparent to-[#c9ef4f]/15" />

                {/* Card Lower Content */}
                <div className="relative z-10 p-5 sm:p-6 w-full">
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">
                    Guiding <span className="font-editorial text-2xl sm:text-3xl font-normal text-[#dced9a]">your</span> money
                  </h3>

                  {/* Interactive Badges & Icons */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md border border-white/20 text-[#f5f4ed]">
                      <Star size={12} className="text-[#c9ef4f] fill-[#c9ef4f]" />
                      Top Rated
                    </span>

                    <div className="flex items-center gap-2">
                      <button type="button" className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                        <Heart size={14} />
                      </button>
                      <button type="button" className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                        <Bookmark size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Bottom Split: Recognition on Left, Bio on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4 border-t border-white/10">

            {/* Left: Nationally Recognized + Logos */}
            <div className="md:col-span-6 space-y-3">
              <span className="overline-tag block">Nationally recognized</span>
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-bold tracking-wider text-[#787c6f] uppercase select-none">
                <span className="hover:text-white transition-colors">Y Combinator</span>
                <span className="hover:text-white transition-colors">HARRIS</span>
                <span className="hover:text-white transition-colors">SIEMENS</span>
                <span className="hover:text-white transition-colors">SUMMIT</span>
              </div>
            </div>

            {/* Right: Short Tagline + Learn More */}
            <div className="md:col-span-6 md:text-right space-y-2">
              <p className="text-xs sm:text-sm text-[#b6b8a9] max-w-md md:ml-auto leading-relaxed">
                Cobalt is your all-in-one financial home, now powered by your own intelligent AI advisor.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white underline underline-offset-4 hover:text-[#c9ef4f] transition-colors"
              >
                <span>Learn more</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. ABOUT US: "Trusted by investors around the globe"                      */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="overline-tag mb-4 block">ABOUT US</span>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-12">
            Trusted by investors
            <br />
            <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
              around the globe
            </span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm sm:text-base font-bold tracking-widest text-[#787c6f] uppercase select-none opacity-80">
            <span>Associates</span>
            <span>HARRIS</span>
            <span>SIEMENS</span>
            <span>SUMMIT PARTNERS</span>
            <span>Y COMBINATOR</span>
          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. ANALYTICS: "Smarter cash flow insights at a glance"                    */}
      {/* ========================================================================= */}
      <section id="work" className="py-20 lg:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="overline-tag mb-3 block">ANALYTICS</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              Smarter cash flow
              <br />
              <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
                insights at a glance
              </span>
            </h2>
            <p className="text-sm text-[#b6b8a9]">
              Keep your income and expense in sync with real-time AI
            </p>
          </div>

          {/* Dual Cards: Overview Card (Left) + Persona Transaction Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Left Card: Monthly Overview */}
            <div className="lg:col-span-7 glass-card rounded-[2rem] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="overline-tag">MONTHLY OVERVIEW</span>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider">
                    Monthly
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-10">
                  $14,250.00
                </div>

                {/* Progress lines */}
                <div className="space-y-6">
                  {/* Income */}
                  <div>
                    <div className="flex justify-between text-xs text-[#b6b8a9] mb-2 font-medium">
                      <span>Income</span>
                      <span className="text-white font-semibold">$15,500</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#10b981] rounded-full w-[85%] shadow-[0_0_12px_#10b981]" />
                    </div>
                  </div>

                  {/* Investment */}
                  <div>
                    <div className="flex justify-between text-xs text-[#b6b8a9] mb-2 font-medium">
                      <span>Investment</span>
                      <span className="text-white font-semibold">$4,250</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#f59e0b] rounded-full w-[45%]" />
                    </div>
                  </div>

                  {/* Expenses */}
                  <div>
                    <div className="flex justify-between text-xs text-[#b6b8a9] mb-2 font-medium">
                      <span>Expenses</span>
                      <span className="text-white font-semibold">$8,200</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#787c6f] rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs text-[#b6b8a9]">
                <span>Automated reconciliations active</span>
                <span className="text-[#c9ef4f] font-semibold">99.98% Accuracy</span>
              </div>
            </div>

            {/* Right Card: Persona Transaction Preview */}
            <div className="lg:col-span-5 relative rounded-[2rem] overflow-hidden border border-white/10 min-h-[380px] p-6 sm:p-8 flex flex-col justify-between">
              {/* Nature landscape image backdrop */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80')`,
                  filter: 'brightness(0.7) contrast(1.1)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060807] via-black/40 to-transparent" />

              {/* Floating top transaction badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-white/90 backdrop-blur-md text-black rounded-2xl p-3 px-4 shadow-xl">
                  <div className="text-xs font-bold">$925.00</div>
                  <div className="text-[10px] text-neutral-600">Sent today</div>
                  <Link href="/quote" className="inline-flex items-center gap-1 text-[10px] font-bold text-black mt-1 hover:underline">
                    <span>View transaction</span>
                    <span className="text-xs">➔</span>
                  </Link>
                </div>

                <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                  DAILY
                </span>
              </div>

              {/* Bottom persona note */}
              <div className="relative z-10">
                <p className="text-xs font-semibold text-white">Verified Account</p>
                <p className="text-[11px] text-[#b6b8a9]">Real-time portfolio synchronisation</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. AI INTELLIGENCE: "Your personal AI advisor" (THE 3 TALL CARDS)          */}
      {/* ========================================================================= */}
      <section id="gallery" className="py-20 lg:py-28 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="overline-tag mb-3 block">AI INTELLIGENCE</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              Your personal <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">AI advisor</span>
            </h2>
            <p className="text-sm text-[#b6b8a9]">
              Experience the power of artificial intelligence working for your financial well being
            </p>
          </div>

          {/* 3 Tall Vertical Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Natural Language Queries */}
            <div className="space-y-4">
              <div className="glass-card glass-card-hover rounded-[2rem] p-6 sm:p-7 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
                {/* Chat Mockup */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white pb-3 border-b border-white/10">
                    <span className="text-[#c9ef4f]">❖</span>
                    <span>Cobalt Assistant</span>
                  </div>

                  {/* Question Bubble */}
                  <div className="rounded-2xl bg-white/10 p-3.5 text-xs text-white">
                    Can I afford to invest $500 this month?
                  </div>

                  {/* Answer Box */}
                  <div className="rounded-2xl bg-black/40 border border-white/10 p-3.5 text-xs text-[#b6b8a9] leading-relaxed">
                    Based on your current income and expenses, you’ll have around $920 in available balance after bills, factoring $650 in reserve for unexpected events.
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-between text-xs">
                  <button type="button" className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#c9ef4f] transition-colors">
                    <span>View transaction</span>
                    <span>➔</span>
                  </button>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-semibold text-white uppercase">
                    ASK YOURS
                  </span>
                </div>
              </div>

              {/* Label & Description Below Card */}
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Natural Language Queries</h3>
                <p className="text-xs text-[#787c6f] leading-relaxed">
                  Ask questions about your finances in plain English and get instant, accurate answers.
                </p>
              </div>
            </div>

            {/* Card 2: Predictive Analysis */}
            <div className="space-y-4">
              <div className="glass-card glass-card-hover rounded-[2rem] p-6 sm:p-7 min-h-[380px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-[#1b2518] to-[#0e140f]">
                {/* Visual Chart with 3% badge */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] text-[#b6b8a9]">Expected yield trajectory</span>
                    <span className="text-3xl font-bold text-white tracking-tight">3%</span>
                  </div>

                  {/* Upward vector chart visualization */}
                  <div className="relative h-40 w-full flex items-end">
                    <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c9ef4f" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#c9ef4f" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path d="M 0 100 Q 60 90, 100 50 T 200 10 L 200 120 L 0 120 Z" fill="url(#chartGrad)"/>
                      <path d="M 0 100 Q 60 90, 100 50 T 200 10" fill="none" stroke="#c9ef4f" strokeWidth="2.5"/>
                    </svg>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-[#b6b8a9]">
                  AI algorithm patterns updated daily
                </div>
              </div>

              {/* Label & Description Below Card */}
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Predictive Analysis</h3>
                <p className="text-xs text-[#787c6f] leading-relaxed">
                  AI algorithms analyze patterns to forecast future expenses and income trends.
                </p>
              </div>
            </div>

            {/* Card 3: Smart Categorization */}
            <div className="space-y-4">
              <div className="glass-card glass-card-hover rounded-[2rem] p-6 sm:p-7 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
                {/* Node Flowchart Diagram */}
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-[11px] font-semibold border border-white/15 shadow-sm">
                      Categorization
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <div className="rounded-xl bg-black/40 border border-white/10 p-2.5 px-3 text-xs">
                      <div className="font-semibold text-white">Transportation</div>
                      <div className="text-[10px] text-[#787c6f]">Fuel, rides, car maintenance, public transit</div>
                    </div>

                    <div className="rounded-xl bg-black/40 border border-white/10 p-2.5 px-3 text-xs">
                      <div className="font-semibold text-white">Bills and Utilities</div>
                      <div className="text-[10px] text-[#787c6f]">Electricity, water, gas, internet, phone</div>
                    </div>

                    <div className="rounded-xl bg-black/40 border border-white/10 p-2.5 px-3 text-xs">
                      <div className="font-semibold text-white">Entertainment</div>
                      <div className="text-[10px] text-[#787c6f]">Streaming services, gaming, events</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-[#b6b8a9]">
                  Auto-categorised via machine learning
                </div>
              </div>

              {/* Label & Description Below Card */}
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Smart Categorization</h3>
                <p className="text-xs text-[#787c6f] leading-relaxed">
                  Automatically categorize transactions with machine learning that improves over time.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. TESTIMONIALS: "What people say about Cobalt" (SCROLLING MARQUEE)       */}
      {/* ========================================================================= */}
      <section id="story" className="py-20 lg:py-28 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="overline-tag mb-3 block">HEAR REAL VOICE</span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              What people say
              <br />
              <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
                about Cobalt
              </span>
            </h2>
            <p className="text-sm text-[#b6b8a9]">
              See why thousands of users trust Cobalt to guide their financial decisions with precision, clarity.
            </p>
          </div>
        </div>

        {/* Scrolling Testimonial Marquees with Edge Fade Masks */}
        <div className="relative w-full overflow-hidden marquee-mask space-y-5">

          {/* Row 1 — Scrolls Left */}
          <div className="animate-marquee flex gap-5 py-2">
            {[
              {
                quote: '“Cobalt has completely transformed the way I manage my finances. Its insights are incredibly accurate and easy to follow.”',
                author: 'Joshua L.',
                role: 'Small Business Owner',
                roleColor: 'text-[#c9ef4f]',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                gradient: 'from-[#223318] via-[#152010] to-[#0a0f07]',
                border: 'border-[#c9ef4f]/35',
                textColor: 'text-white',
              },
              {
                quote: '“Thanks to Cobalt, I feel in control of my financial future. Highly recommended for anyone serious about smart investing.”',
                author: 'Samantha K.',
                role: 'Angel Investor',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#1b2142] via-[#12162a] to-[#080914]',
                border: 'border-white/10',
                textColor: 'text-[#b6b8a9]',
              },
              {
                quote: '“Investing used to be intimidating. Cobalt made our portfolio modeling effortless and stress-free. I can’t imagine going back.”',
                author: 'Elena R.',
                role: 'Software Architect',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#2b2413] via-[#1a1710] to-[#0c0a07]',
                border: 'border-white/10',
                textColor: 'text-[#dced9a]',
              },
              {
                quote: '“I never thought managing portfolio allocations could be this effortless. Transparent, proactive, and exceptionally designed.”',
                author: 'David M.',
                role: 'CTO & Co-Founder',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#102b2a] via-[#0b1c1b] to-[#050c0c]',
                border: 'border-white/10',
                textColor: 'text-[#b6b8a9]',
              },
              {
                quote: '“Cobalt has completely transformed the way I manage my finances. Its insights are incredibly accurate and easy to follow.”',
                author: 'Joshua L.',
                role: 'Small Business Owner',
                roleColor: 'text-[#c9ef4f]',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                gradient: 'from-[#223318] via-[#152010] to-[#0a0f07]',
                border: 'border-[#c9ef4f]/35',
                textColor: 'text-white',
              },
              {
                quote: '“Thanks to Cobalt, I feel in control of my financial future. Highly recommended for anyone serious about smart investing.”',
                author: 'Samantha K.',
                role: 'Angel Investor',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#1b2142] via-[#12162a] to-[#080914]',
                border: 'border-white/10',
                textColor: 'text-[#b6b8a9]',
              },
              {
                quote: '“Investing used to be intimidating. Cobalt made our portfolio modeling effortless and stress-free. I can’t imagine going back.”',
                author: 'Elena R.',
                role: 'Software Architect',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#2b2413] via-[#1a1710] to-[#0c0a07]',
                border: 'border-white/10',
                textColor: 'text-[#dced9a]',
              },
              {
                quote: '“I never thought managing portfolio allocations could be this effortless. Transparent, proactive, and exceptionally designed.”',
                author: 'David M.',
                role: 'CTO & Co-Founder',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#102b2a] via-[#0b1c1b] to-[#050c0c]',
                border: 'border-white/10',
                textColor: 'text-[#b6b8a9]',
              },
            ].map((t, idx) => (
              <div
                key={`t1-${idx}`}
                className={`w-[320px] sm:w-[380px] shrink-0 rounded-[2rem] p-6 sm:p-7 border ${t.border} flex flex-col justify-between bg-gradient-to-b ${t.gradient} min-h-[300px] shadow-xl transition-transform hover:scale-[1.02] cursor-pointer`}
              >
                <div>
                  {t.avatar && (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9ef4f]/50 mb-4 shadow-lg">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${t.avatar}')` }}
                      />
                    </div>
                  )}
                  <p className={`text-sm ${t.textColor} font-normal leading-relaxed`}>
                    {t.quote}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <div className="text-xs font-semibold text-white">{t.author}</div>
                  <div className={`text-[10px] ${t.roleColor}`}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — Scrolls Right */}
          <div className="animate-marquee-reverse flex gap-5 py-2">
            {[
              {
                quote: '“The natural language query engine understands complex multi-asset scenarios better than most traditional advisory desks.”',
                author: 'Marcus V.',
                role: 'VP of Engineering',
                roleColor: 'text-[#c9ef4f]',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                gradient: 'from-[#192415] via-[#10170d] to-[#080c07]',
                border: 'border-white/10',
                textColor: 'text-white',
              },
              {
                quote: '“Instant due diligence and automated categorization saved our team over 20 hours every month. Flawless execution.”',
                author: 'Sophia T.',
                role: 'Private Wealth Principal',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#2c1d35] via-[#1c1222] to-[#0d0710]',
                border: 'border-white/10',
                textColor: 'text-[#dced9a]',
              },
              {
                quote: '“From smart cash flow forecasting to milestone governance, Cobalt is by far the most advanced financial platform we have used.”',
                author: 'Alexander P.',
                role: 'Growth Director',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#152332] via-[#0e1620] to-[#070b10]',
                border: 'border-white/10',
                textColor: 'text-[#b6b8a9]',
              },
              {
                quote: '“Real-time AI synchronization gave our leadership total clarity on capital runway. An indispensable platform for modern founders.”',
                author: 'Claire W.',
                role: 'Fintech Founder',
                roleColor: 'text-[#c9ef4f]',
                avatar: null,
                gradient: 'from-[#232812] via-[#161a0b] to-[#090b05]',
                border: 'border-white/10',
                textColor: 'text-white',
              },
              {
                quote: '“The natural language query engine understands complex multi-asset scenarios better than most traditional advisory desks.”',
                author: 'Marcus V.',
                role: 'VP of Engineering',
                roleColor: 'text-[#c9ef4f]',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                gradient: 'from-[#192415] via-[#10170d] to-[#080c07]',
                border: 'border-white/10',
                textColor: 'text-white',
              },
              {
                quote: '“Instant due diligence and automated categorization saved our team over 20 hours every month. Flawless execution.”',
                author: 'Sophia T.',
                role: 'Private Wealth Principal',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#2c1d35] via-[#1c1222] to-[#0d0710]',
                border: 'border-white/10',
                textColor: 'text-[#dced9a]',
              },
              {
                quote: '“From smart cash flow forecasting to milestone governance, Cobalt is by far the most advanced financial platform we have used.”',
                author: 'Alexander P.',
                role: 'Growth Director',
                roleColor: 'text-[#787c6f]',
                avatar: null,
                gradient: 'from-[#152332] via-[#0e1620] to-[#070b10]',
                border: 'border-white/10',
                textColor: 'text-[#b6b8a9]',
              },
              {
                quote: '“Real-time AI synchronization gave our leadership total clarity on capital runway. An indispensable platform for modern founders.”',
                author: 'Claire W.',
                role: 'Fintech Founder',
                roleColor: 'text-[#c9ef4f]',
                avatar: null,
                gradient: 'from-[#232812] via-[#161a0b] to-[#090b05]',
                border: 'border-white/10',
                textColor: 'text-white',
              },
            ].map((t, idx) => (
              <div
                key={`t2-${idx}`}
                className={`w-[320px] sm:w-[380px] shrink-0 rounded-[2rem] p-6 sm:p-7 border ${t.border} flex flex-col justify-between bg-gradient-to-b ${t.gradient} min-h-[300px] shadow-xl transition-transform hover:scale-[1.02] cursor-pointer`}
              >
                <div>
                  {t.avatar && (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#c9ef4f]/50 mb-4 shadow-lg">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${t.avatar}')` }}
                      />
                    </div>
                  )}
                  <p className={`text-sm ${t.textColor} font-normal leading-relaxed`}>
                    {t.quote}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <div className="text-xs font-semibold text-white">{t.author}</div>
                  <div className={`text-[10px] ${t.roleColor}`}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 6. DUE DILIGENCE (CALL TO ACTION HERO BANNER)                             */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-28 border-t border-white/10 relative overflow-hidden text-center">
        {/* Soft radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c9ef4f]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="overline-tag mb-4 block">DASHBOARD</span>

          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white mb-6">
            Due diligence
            <br />
            <span className="font-editorial text-[1.12em] font-normal text-[#f5f4ed]">
              at every step
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#b6b8a9] max-w-xl mx-auto mb-10 leading-relaxed">
            Experience institutional-grade financial intelligence tailored to your exact life and business goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/quote"
              className="btn-primary-white shadow-2xl active:scale-95 group w-full sm:w-auto"
            >
              <span>Start free trial now</span>
              <span className="w-5 h-5 rounded-full bg-[#060807] text-white flex items-center justify-center text-[11px] group-hover:translate-x-0.5 transition-transform">
                ➔
              </span>
            </Link>

            <Link
              href="/services"
              className="btn-pill-dark w-full sm:w-auto"
            >
              <span>Explore services</span>
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
