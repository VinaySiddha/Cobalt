'use client';

import { useState, useTransition, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  PRICING_CONFIG,
  ServiceSize,
  TimelineType,
} from '@/config/pricing';
import { submitQuoteAction } from '@/app/actions/quote';
import {
  Check,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Zap,
  Lock,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface SelectedServiceState {
  serviceId: string;
  size: ServiceSize;
}

export default function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial query params if user came from a specific service CTA
  const initialService = searchParams.get('service');
  const initialSize = (searchParams.get('size') as ServiceSize) || 'medium';

  const defaultServices: SelectedServiceState[] = useMemo(() => {
    if (initialService && PRICING_CONFIG.services.some((s) => s.id === initialService)) {
      return [{ serviceId: initialService, size: initialSize }];
    }
    // Default to Web App Development (Medium)
    return [{ serviceId: 'web-app-development', size: 'medium' }];
  }, [initialService, initialSize]);

  const [selectedServices, setSelectedServices] = useState<SelectedServiceState[]>(defaultServices);
  const [timeline, setTimeline] = useState<TimelineType>('standard');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Quick bundle preset selector
  const handleSelectBundle = (bundleServices: SelectedServiceState[], bundleTimeline: TimelineType = 'standard') => {
    setSelectedServices(bundleServices);
    setTimeline(bundleTimeline);
    setGeneralError(null);
  };

  // Service toggle/addition handlers
  const handleToggleService = (serviceId: string) => {
    setGeneralError(null);
    const existingIndex = selectedServices.findIndex((s) => s.serviceId === serviceId);

    if (existingIndex >= 0) {
      if (selectedServices.length === 1) {
        setGeneralError('Please keep at least one service selected.');
        return;
      }
      setSelectedServices(selectedServices.filter((s) => s.serviceId !== serviceId));
    } else {
      setSelectedServices([...selectedServices, { serviceId, size: 'medium' }]);
    }
  };

  const handleUpdateSize = (serviceId: string, newSize: ServiceSize) => {
    setSelectedServices(
      selectedServices.map((item) =>
        item.serviceId === serviceId ? { ...item, size: newSize } : item
      )
    );
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    if (selectedServices.length === 0) {
      setGeneralError('Please select at least one service.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitQuoteAction({
          fullName,
          email,
          phone,
          company: company || undefined,
          services: selectedServices,
          timeline,
          description,
          website_url_hp: honeypot,
        });

        if (!result.success) {
          if (result.errors) {
            setFieldErrors(result.errors);
          }
          if (result.message) {
            setGeneralError(result.message);
          }
          window.scrollTo({ top: 100, behavior: 'smooth' });
          return;
        }

        if (result.reference) {
          router.push(`/thank-you?ref=${encodeURIComponent(result.reference)}`);
        }
      } catch {
        setGeneralError('A network error occurred. Please check your connection and try again.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">

      {/* ========================================================================= */}
      {/* 1. SIGNATURE PRESET BUNDLES (NO RAW PRICES)                               */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="overline-tag">PRE-CONFIGURED SPRINTS</span>
            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-1">
              Curated architectural packages
            </h3>
          </div>
          <span className="text-xs text-[#787c6f] hidden sm:block">
            Click any package to auto-populate scope selection
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Bundle 1 */}
          <div
            onClick={() =>
              handleSelectBundle([
                { serviceId: 'web-app-development', size: 'small' },
                { serviceId: 'seo', size: 'small' },
              ])
            }
            className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[11px] font-semibold text-[#b6b8a9] uppercase tracking-wider">
                  Founder MVP
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">
                  2 Sprints
                </span>
              </div>
              <div className="text-2xl font-medium text-white mb-2">
                Focused Launch Scope
              </div>
              <p className="text-xs text-[#787c6f] leading-relaxed mb-4">
                Single-purpose MVP web app + foundational search engine indexation & schema architecture.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c9ef4f] font-semibold group-hover:underline">
              <span>Select this scope package</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bundle 2 (Featured / Choice) */}
          <div
            onClick={() =>
              handleSelectBundle([
                { serviceId: 'web-app-development', size: 'medium' },
                { serviceId: 'ai-solutions', size: 'medium' },
                { serviceId: 'data-analysis', size: 'medium' },
              ])
            }
            className="rounded-2xl p-6 cursor-pointer border border-[#c9ef4f]/40 bg-gradient-to-b from-[#1c2616] via-[#10170d] to-[#070a06] flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9ef4f]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#c9ef4f] uppercase tracking-wider">
                  <Sparkles size={13} />
                  Growth & AI Engine
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#c9ef4f] text-[#060807]">
                  RECOMMENDED
                </span>
              </div>
              <div className="text-2xl font-medium text-white mb-2">
                Full Production Scope
              </div>
              <p className="text-xs text-[#b6b8a9] leading-relaxed mb-4">
                Full-stack web platform + customized LLM automation workflows & business intelligence dashboards.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c9ef4f] font-semibold group-hover:underline">
              <span>Select this scope package</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bundle 3 */}
          <div
            onClick={() =>
              handleSelectBundle([
                { serviceId: 'ai-governance', size: 'large' },
                { serviceId: 'mcp-services', size: 'large' },
              ])
            }
            className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[11px] font-semibold text-[#b6b8a9] uppercase tracking-wider">
                  Enterprise AI & Governance
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">
                  Audited
                </span>
              </div>
              <div className="text-2xl font-medium text-white mb-2">
                Enterprise Architecture
              </div>
              <p className="text-xs text-[#787c6f] leading-relaxed mb-4">
                Enterprise compliance, automated agent protocol bridges (MCP), and comprehensive model security guardrails.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c9ef4f] font-semibold group-hover:underline">
              <span>Select this scope package</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* General Error Alert */}
      {generalError && (
        <div
          role="alert"
          className="p-4 bg-red-950/60 border border-red-500/40 rounded-2xl text-red-200 flex items-start gap-3 shadow-lg"
        >
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-400" />
          <div className="text-sm">
            <strong className="font-bold block">Submission Attention Needed</strong>
            <span>{generalError}</span>
          </div>
        </div>
      )}

      {/* Honeypot field (hidden from visual users & screen readers) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website_url_hp">Leave this empty</label>
        <input
          id="website_url_hp"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CONFIGURATOR GRID (LEFT: CONTROLS, RIGHT: FINANCIAL SUMMARY)       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

        {/* ── Left Column: Configurator Steps ── */}
        <div className="lg:col-span-7 space-y-8">

          {/* STEP 1: SERVICES SELECTION */}
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="overline-tag">STEP 01</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-0.5">
                  Choose services & scope tiers
                </h3>
              </div>
              <span className="text-xs text-[#c9ef4f] font-mono">
                {selectedServices.length} Selected
              </span>
            </div>

            {fieldErrors.services && (
              <p className="text-red-400 text-xs font-semibold">
                {fieldErrors.services}
              </p>
            )}

            <div className="space-y-3.5">
              {PRICING_CONFIG.services.map((service) => {
                const selectedItem = selectedServices.find((s) => s.serviceId === service.id);
                const isSelected = Boolean(selectedItem);

                return (
                  <div
                    key={service.id}
                    className={`rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-[#c9ef4f]/40 bg-[#162113]/60 shadow-lg'
                        : 'border-white/10 hover:border-white/20 bg-black/20'
                    }`}
                  >
                    {/* Header Row / Clickable Toggle */}
                    <div
                      onClick={() => handleToggleService(service.id)}
                      className="p-4 sm:p-5 flex items-start justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-[#c9ef4f] border-[#c9ef4f] text-[#060807]'
                              : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {isSelected && <Check size={13} strokeWidth={3} />}
                        </div>
                        <div>
                          <div className="font-semibold text-base text-white flex items-center gap-2">
                            <span>{service.name}</span>
                          </div>
                          <p className="text-xs text-[#787c6f] mt-1 leading-relaxed max-w-md">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <span className="text-[10px] text-[#787c6f] uppercase block tracking-wider">Availability</span>
                        <span className="text-sm font-semibold text-white">
                          Immediate
                        </span>
                      </div>
                    </div>

                    {/* Tier Selector (Revealed when selected) */}
                    {isSelected && selectedItem && (
                      <div className="px-4 pb-5 sm:px-5 border-t border-white/10 pt-4 bg-black/30 rounded-b-2xl">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#b6b8a9] mb-2.5">
                          Configure {service.name} Scope Level:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {(['small', 'medium', 'large'] as const).map((sizeKey) => {
                            const isSizeActive = selectedItem.size === sizeKey;
                            const sizeDetail = service.sizes[sizeKey];
                            return (
                              <button
                                key={sizeKey}
                                type="button"
                                onClick={() => handleUpdateSize(service.id, sizeKey)}
                                className={`p-3 text-left rounded-xl border transition-all ${
                                  isSizeActive
                                    ? 'bg-[#c9ef4f] text-[#060807] border-[#c9ef4f] shadow-md font-semibold'
                                    : 'bg-white/5 text-white border-white/10 hover:border-white/25 hover:bg-white/10'
                                }`}
                              >
                                <div className="flex justify-between items-baseline mb-1">
                                  <span className="text-[11px] uppercase tracking-wider font-bold">
                                    {sizeDetail.label}
                                  </span>
                                  <span className={`text-[10px] font-mono uppercase ${isSizeActive ? 'text-[#060807]' : 'text-[#c9ef4f]'}`}>
                                    Tier {sizeKey === 'small' ? 'I' : sizeKey === 'medium' ? 'II' : 'III'}
                                  </span>
                                </div>
                                <div className={`text-[10px] leading-snug line-clamp-2 ${isSizeActive ? 'text-[#1c2419]' : 'text-[#787c6f]'}`}>
                                  {sizeDetail.scopeSummary}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: DELIVERY RHYTHM / TIMELINE */}
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="overline-tag">STEP 02</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-0.5">
                  Select delivery rhythm
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Standard */}
              <div
                onClick={() => setTimeline('standard')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  timeline === 'standard'
                    ? 'border-[#c9ef4f] bg-[#162113]/60 shadow-lg'
                    : 'border-white/10 hover:border-white/20 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white text-sm">Standard Delivery</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#b6b8a9]">
                    Standard Pace
                  </span>
                </div>
                <p className="text-xs text-[#787c6f] leading-relaxed">
                  Balanced engineering pace following milestone-based development and weekly review cycles.
                </p>
              </div>

              {/* Fast / Expedited */}
              <div
                onClick={() => setTimeline('fast')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  timeline === 'fast'
                    ? 'border-[#c9ef4f] bg-[#162113]/60 shadow-lg'
                    : 'border-white/10 hover:border-white/20 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                    <Zap size={14} className="text-[#c9ef4f]" />
                    Expedited Sprint
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c9ef4f]/20 text-[#c9ef4f] font-bold">
                    Priority Bandwidth
                  </span>
                </div>
                <p className="text-xs text-[#787c6f] leading-relaxed">
                  Dedicated priority engineering bandwidth, daily standup reports, and accelerated milestone shipping.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3: CONTACT INFORMATION & GOALS */}
          <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="overline-tag">STEP 03</span>
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight mt-0.5">
                  Project brief & contact
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#b6b8a9] uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="input-dark"
                  />
                  {fieldErrors.fullName && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#b6b8a9] uppercase tracking-wider mb-1.5">
                    Business Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="input-dark"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#b6b8a9] uppercase tracking-wider mb-1.5">
                    Phone / Telegram <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="input-dark"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-semibold text-[#b6b8a9] uppercase tracking-wider mb-1.5">
                    Company / Venture <span className="text-[#787c6f] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Labs"
                    className="input-dark"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-semibold text-[#b6b8a9] uppercase tracking-wider mb-1.5">
                  Architecture Goals & Specifications <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your current tech stack, target deliverables, or any immediate architectural deadlines..."
                  className="input-dark"
                />
                {fieldErrors.description && (
                  <p className="text-red-400 text-xs mt-1">{fieldErrors.description}</p>
                )}
                <p className="text-[11px] text-[#787c6f] mt-1">
                  Minimum 10 characters. Plain language is preferred.
                </p>
              </div>
            </div>
          </div>

        </div>


        {/* ── Right Column: Sticky Project Scope Overview (NO PRICES) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">

          {/* Main Card */}
          <div className="glass-card rounded-[2.25rem] p-7 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#162114] via-[#0d140c] to-[#070a06]">
            {/* Ambient chartreuse top accent glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#c9ef4f]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#c9ef4f] text-sm">❖</span>
                <span className="overline-tag">SCOPE & SPRINT SUMMARY</span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-white uppercase tracking-wider">
                Live Brief
              </span>
            </div>

            {/* Scope Summary Badge */}
            <div className="mb-6">
              <span className="text-xs text-[#787c6f] uppercase tracking-wider block mb-1">
                Configured Engagement Plan
              </span>
              <div className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                {selectedServices.length} {selectedServices.length === 1 ? 'Service Selected' : 'Services Bundled'}
              </div>
              <span className="inline-block text-[11px] text-[#c9ef4f] mt-1 capitalize font-medium">
                {timeline === 'fast' ? 'Expedited priority sprint cadence' : 'Standard milestone development cadence'}
              </span>
            </div>

            {/* Itemized Services List (NO DOLLAR AMOUNTS) */}
            <div className="space-y-3 py-4 border-t border-b border-white/10 mb-6">
              {selectedServices.map((item) => {
                const service = PRICING_CONFIG.services.find((s) => s.id === item.serviceId);
                const sizeConfig = service?.sizes[item.size];
                return (
                  <div key={item.serviceId} className="flex justify-between items-start text-xs gap-3">
                    <div>
                      <span className="font-semibold text-white block">{service?.name}</span>
                      <span className="text-[10px] text-[#787c6f] capitalize">{sizeConfig?.label} scope tier</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#c9ef4f] capitalize bg-white/5 px-2 py-0.5 rounded">
                      {item.size}
                    </span>
                  </div>
                );
              })}

              <div className="flex justify-between items-center text-xs pt-2 text-[#787c6f]">
                <span>Delivery Cadence</span>
                <span className="font-mono text-white capitalize">{timeline === 'fast' ? 'Expedited (+25% Speed)' : 'Standard Rhythm'}</span>
              </div>
            </div>

            {/* Milestone Governance Model (NO RAW DOLLAR PRICES) */}
            <div className="rounded-2xl bg-black/40 border border-[#c9ef4f]/30 p-4 sm:p-5 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#c9ef4f] block uppercase tracking-wider">
                    30% Kickoff Advance
                  </span>
                  <span className="text-[10px] text-[#787c6f]">Secures dedicated sprint allocation</span>
                </div>
                <div className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#c9ef4f]/20 text-[#c9ef4f]">
                  Phase I
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white font-semibold block">70% Milestone Settlement</span>
                  <span className="text-[10px] text-[#787c6f]">Released upon verified deliverables</span>
                </div>
                <div className="text-xs font-mono text-[#b6b8a9] bg-white/5 px-2 py-1 rounded">
                  Phase II
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full btn-primary-white py-4 text-sm font-bold shadow-2xl active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin text-black" />
                  <span>Processing Scope Plan...</span>
                </>
              ) : (
                <>
                  <span>Request Scope Plan & Reserve Sprint</span>
                  <span className="w-5 h-5 rounded-full bg-[#060807] text-white flex items-center justify-center text-[10px]">
                    ➔
                  </span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#787c6f] mt-4">
              Zero upfront commitment. Exact schedule and milestones confirmed during technical intake call.
            </p>
          </div>

          {/* Institutional Trust Badges */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex items-center gap-3 text-xs text-[#b6b8a9]">
              <ShieldCheck size={16} className="text-[#c9ef4f] shrink-0" />
              <span>100% Client Intellectual Property & Source Code Ownership</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#b6b8a9]">
              <Lock size={16} className="text-[#c9ef4f] shrink-0" />
              <span>Mutual Non-Disclosure Agreement (NDA) automatically executed</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#b6b8a9]">
              <Calendar size={16} className="text-[#c9ef4f] shrink-0" />
              <span>Leadership intake review completed within 24 business hours</span>
            </div>
          </div>

        </div>

      </div>

    </form>
  );
}
