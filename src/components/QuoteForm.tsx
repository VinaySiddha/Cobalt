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

    // Basic client check
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
          // Scroll to top of form
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
    <form onSubmit={handleSubmit} noValidate className="plans-form">
      {/* General Error Alert */}
      {generalError && (
        <div
          role="alert"
          className="mb-8 p-4 bg-red-50 border-l-4 border-red-600 text-red-900 flex items-start gap-3"
        >
          <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
          <div className="text-sm">
            <strong className="font-bold block">Submission Error</strong>
            <span>{generalError}</span>
          </div>
        </div>
      )}

      {/* Honeypot field (hidden from screen readers and visual users) */}
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-12">
          {/* Section 1: Services Selection */}
          <div className="plans-panel glass-card rounded-2xl p-6 sm:p-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <span className="section-eyebrow block mb-1">
                Step 1 of 3
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Select Services & Scope
              </h2>
              <p className="text-cf-gray text-sm mt-1">
                Select one or more services. Adjust project size for each to calibrate scope.
              </p>
            </div>

            {fieldErrors.services && (
              <p className="text-red-600 text-xs font-semibold mb-4">
                {fieldErrors.services}
              </p>
            )}

            <div className="space-y-4">
              {PRICING_CONFIG.services.map((service) => {
                const selectedItem = selectedServices.find(
                  (s) => s.serviceId === service.id
                );
                const isSelected = Boolean(selectedItem);

                return (
                  <div
                    key={service.id}
                    className={`border transition-all ${isSelected
                        ? 'border-lime-300 bg-lime-300/10'
                        : 'border-white/15 hover:border-white/35 bg-white/5'
                      }`}
                  >
                    {/* Header Row / Toggle */}
                    <div
                      onClick={() => handleToggleService(service.id)}
                      className="p-4 sm:p-5 flex items-start justify-between cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected
                              ? 'bg-lime-300 border-lime-300 text-stone-950'
                              : 'border-white/30 bg-transparent'
                            }`}
                        >
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <div className="font-bold text-base text-white flex items-center gap-2">
                            <span>{service.name}</span>
                          </div>
                          <p className="text-cf-gray text-xs mt-0.5 leading-relaxed">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <span className="text-xs text-[#777B6E] block">Scope</span>
                        <span className="text-sm font-bold text-white">Available</span>
                      </div>
                    </div>

                    {/* Size Selector (Visible only when selected) */}
                    {isSelected && selectedItem && (
                      <div className="px-4 pb-5 sm:px-5 border-t border-lime-300/20 pt-4 bg-lime-300/5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-cf-gray mb-2">
                          Project Size for {service.name}:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['small', 'medium', 'large'] as const).map((sizeKey) => {
                            const isSizeActive = selectedItem.size === sizeKey;
                            const sizeDetail = service.sizes[sizeKey];
                            return (
                              <button
                                key={sizeKey}
                                type="button"
                                onClick={() => handleUpdateSize(service.id, sizeKey)}
                                className={`p-2.5 text-left border rounded-sm transition-colors ${isSizeActive
                                    ? 'bg-lime-300 text-stone-950 border-lime-300'
                                    : 'bg-white/5 text-white border-white/20 hover:border-white/45'
                                  }`}
                              >
                                <div className="flex justify-between items-baseline">
                                  <span className="text-xs font-bold uppercase tracking-wider">
                                    {sizeDetail.label}
                                  </span>
                                </div>
                                <div
                                  className={`text-sm font-extrabold mt-1 ${isSizeActive ? 'text-stone-950' : 'text-white'
                                    }`}
                                >
                                  {sizeDetail.scopeSummary}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-xs text-cf-gray mt-2 italic">
                          {service.sizes[selectedItem.size].scopeSummary}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Delivery Timeline */}
          <div className="plans-panel glass-card rounded-2xl p-6 sm:p-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <span className="section-eyebrow block mb-1">
                Step 2 of 3
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Delivery Timeline
              </h2>
              <p className="text-cf-gray text-sm mt-1">
                Standard delivery follows our regular sprint cycles. Fast delivery expedites kickoff and dedicates engineering capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(['standard', 'fast'] as const).map((timelineKey) => {
                const config = PRICING_CONFIG.timelines[timelineKey];
                const isActive = timeline === timelineKey;

                return (
                  <div
                    key={timelineKey}
                    onClick={() => setTimeline(timelineKey)}
                    className={`border p-5 cursor-pointer rounded-sm transition-all ${isActive
                        ? 'border-lime-300 bg-lime-300/10 ring-1 ring-lime-300'
                        : 'border-white/15 hover:border-white/35 bg-white/5'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-base text-white">
                        {config.label}
                      </span>
                      {timelineKey === 'fast' && (
                        <span className="text-xs font-bold px-2 py-0.5 bg-lime-300 text-stone-950">
                          +25%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Contact & Project Details */}
          <div className="border border-gray-200 p-6 sm:p-8 bg-white">
            <div className="border-b border-white/10 pb-4 mb-6">
              <span className="section-eyebrow block mb-1">
                Step 3 of 3
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Contact & Requirements
              </h2>
              <p className="text-cf-gray text-sm mt-1">
                Where should we send your formal quote review?
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-cf-gray mb-1"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className={`plans-input w-full px-3.5 py-2.5 border text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-300 ${fieldErrors.fullName ? 'border-red-600 bg-red-50/20' : 'border-white/20'
                      }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Business Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane@company.com"
                    className={`plans-input w-full px-3.5 py-2.5 border text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-300 ${fieldErrors.email ? 'border-red-600 bg-red-50/20' : 'border-white/20'
                      }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`plans-input w-full px-3.5 py-2.5 border text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-300 ${fieldErrors.phone ? 'border-red-600 bg-red-50/20' : 'border-white/20'
                      }`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                  >
                    Company Name <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="plans-input w-full px-3.5 py-2.5 border border-white/20 text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
                >
                  Project Description & Goals <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline your project objectives, target completion date, or any existing system details..."
                  className={`plans-input w-full px-3.5 py-2.5 border text-sm text-white focus:outline-none focus:ring-2 focus:ring-lime-300 ${fieldErrors.description ? 'border-red-600 bg-red-50/20' : 'border-white/20'
                    }`}
                />
                {fieldErrors.description && (
                  <p className="text-red-600 text-xs mt-1">{fieldErrors.description}</p>
                )}
                <p className="text-xs text-[#777B6E] mt-1">
                  Minimum 10 characters. Plain language is preferred.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky project brief summary */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="plans-summary glass-card rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="section-eyebrow mb-2">
              Project brief
            </h3>
            <div className="text-2xl font-black text-white pb-4 border-b border-white/10">
              Your selected scope
            </div>

            {/* Selected services */}
            <div className="py-4 space-y-3 border-b border-white/10">
              {selectedServices.map((item) => {
                const service = PRICING_CONFIG.services.find((entry) => entry.id === item.serviceId);
                return (
                  <div key={item.serviceId} className="flex justify-between items-start text-sm gap-4">
                    <span className="font-bold text-white">{service?.name}</span>
                    <span className="text-xs text-cf-gray capitalize text-right">{item.size} scope</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center text-sm pt-3 text-lime-200">
                <span className="text-xs font-bold uppercase tracking-wider">Delivery rhythm</span>
                <span className="font-semibold capitalize">{timeline}</span>
              </div>
            </div>

            <div className="py-4 border-b border-white/10">
              <p className="text-sm font-semibold text-white mb-2">What happens next</p>
              <p className="text-xs text-cf-gray leading-relaxed">
                Send your requirements and the team will review your selected scope, clarify open questions, and return with the recommended engagement path.
              </p>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-lime-300 text-stone-950 text-xs font-black flex items-center justify-center">01</span>
                <span className="text-cf-gray">Engineering review</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-lime-300 text-stone-950 text-xs font-black flex items-center justify-center">02</span>
                <span className="text-cf-gray">Scope confirmation</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-lime-300 text-stone-950 text-xs font-black flex items-center justify-center">03</span>
                <span className="text-cf-gray">Sprint scheduling</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isPending}
                className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending Project Brief...</span>
                  </>
                ) : (
                  <>
                    <span>Send Project Brief</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#777B6E]">
              <ShieldCheck size={16} className="text-lime-300 shrink-0" />
              <span>We never sell data. You will hear from us within 1 business day.</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
