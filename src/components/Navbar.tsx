'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { X, Menu, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  matchPrefix?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/services', matchPrefix: '/services' },
  { label: 'Gallery', href: '/services#capabilities' },
  { label: 'Plans', href: '/quote', matchPrefix: '/quote' },
  { label: 'Story', href: '/contact', matchPrefix: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [freeModalOpen, setFreeModalOpen] = useState(false);
  const [freeSubmitted, setFreeSubmitted] = useState(false);
  const [freeEmail, setFreeEmail] = useState('');
  const [freeName, setFreeName] = useState('');

  // Lock body scroll when mobile drawer or modal is open
  useEffect(() => {
    if (mobileMenuOpen || freeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, freeModalOpen]);

  const isItemActive = (item: NavItem) => {
    if (item.href === '/') {
      return pathname === '/';
    }
    if (item.matchPrefix) {
      return pathname.startsWith(item.matchPrefix);
    }
    return pathname === item.href;
  };

  const handleFreeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeEmail) return;
    setFreeSubmitted(true);
    setTimeout(() => {
      setFreeModalOpen(false);
      setFreeSubmitted(false);
      setFreeEmail('');
      setFreeName('');
    }, 2200);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP NAVBAR (MATCHING DESKTOP REFERENCE IMAGE)                         */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left Dark Capsule: Logo + Nav Items */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center bg-[#0B0F19] text-white rounded-full p-1.5 pl-2 pr-5 shadow-lg shadow-black/10 border border-white/10 backdrop-blur-md transition-all"
          >
            {/* White Circular Logo Emblem */}
            <Link
              href="/"
              aria-label="Cobalt Home"
              className="w-8 h-8 rounded-full bg-white text-[#0B0F19] flex items-center justify-center font-bold text-xs tracking-tight shadow-xs select-none mr-2 shrink-0 transition-transform hover:scale-105"
            >
              sh
            </Link>

            {/* Nav Links */}
            <div className="flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-sm font-medium transition-all ${
                      active
                        ? 'bg-[#1E2638] text-white px-4 py-1.5 rounded-full shadow-inner'
                        : 'text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Vibrant Blue Dual-CTA Capsule */}
          <div className="hidden md:flex items-center bg-[#2563EB] rounded-full p-1 pl-5 pr-1 gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
            <button
              type="button"
              onClick={() => setFreeModalOpen(true)}
              className="text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer select-none"
            >
              Get Free
            </button>
            <Link
              href="/quote"
              className="bg-white text-[#0B0F19] hover:bg-slate-50 font-semibold text-sm px-4 py-2 rounded-full shadow-sm transition-all active:scale-95"
            >
              Get a quote
            </Link>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE TOP BAR (MATCHING MOBILE REFERENCE LAYOUT)                         */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Dark Circular Logo Badge */}
            <Link
              href="/"
              aria-label="Cobalt Home"
              className="w-10 h-10 rounded-full bg-[#0B0F19] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-md border border-white/10 active:scale-95 transition-transform"
            >
              sh
            </Link>

            {/* Clean Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="bg-white/95 backdrop-blur-md border border-gray-200 text-gray-800 p-2.5 rounded-full shadow-sm hover:bg-gray-100 active:scale-95 transition-all"
              aria-label="Open Navigation Drawer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-OVER DRAWER (MATCHING MOBILE REFERENCE IMAGE)                 */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Left Dimmed & Blurred Backdrop with Watermark Emblem */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity"
          >
            {/* Soft Watermark Emblem visible on blurred background as in reference */}
            <div className="w-12 h-12 rounded-full bg-white/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-slate-800 font-bold text-base shadow-sm ml-6 mt-6 select-none opacity-80">
              sh
            </div>
          </div>

          {/* Right White Slide-over Card */}
          <div className="relative w-[310px] sm:w-[340px] max-w-[85vw] h-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10 transition-transform">
            <div>
              {/* Top Row: Logo Badge + Circular Close Button */}
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-full bg-[#0B0F19] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm select-none">
                  sh
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-gray-400 active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation List */}
              <nav className="mt-8 space-y-1.5" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        active
                          ? 'bg-[#F3F4F6] text-gray-900 font-semibold'
                          : 'text-gray-700 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions: Get Free + Get a quote */}
            <div className="mt-auto pt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFreeModalOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-full border border-gray-200 bg-white text-gray-900 font-semibold text-sm text-center block hover:bg-gray-50 active:scale-[0.98] transition-all shadow-xs"
              >
                Get Free
              </button>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-full bg-[#2F3542] hover:bg-[#1E232D] text-white font-semibold text-sm text-center block active:scale-[0.98] transition-all shadow-sm"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* "GET FREE" MODAL (DISCRETE SCOPING SESSION)                               */}
      {/* ========================================================================= */}
      {freeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setFreeModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 transition-all">
            <button
              type="button"
              onClick={() => setFreeModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
            >
              <X size={16} />
            </button>

            {freeSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Session Requested!</h3>
                <p className="text-sm text-gray-600">
                  Our engineering team will reach out to {freeEmail} within 2 business hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-block px-3 py-1 bg-blue-50 text-[#2563EB] text-xs font-semibold rounded-full mb-3">
                  Free 15-Min Engineering Scoping
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get a Free Scoping Call
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Discuss architecture, technical feasibility, and preliminary sizing with our lead engineers with zero commitment.
                </p>

                <form onSubmit={handleFreeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={freeName}
                      onChange={(e) => setFreeName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={freeEmail}
                      onChange={(e) => setFreeEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Request Free Session</span>
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-[11px] text-center text-gray-400 mt-3">
                    Prefer immediate itemized pricing?{' '}
                    <Link
                      href="/quote"
                      onClick={() => setFreeModalOpen(false)}
                      className="text-[#2563EB] font-medium underline"
                    >
                      Use instant quote engine
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}