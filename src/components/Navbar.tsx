'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { X, Menu, ArrowRight, CheckCircle2 } from 'lucide-react';

/* Cirform exact palette */
const CF = {
  blue: '#C9EF4F',
  purple: '#DCED9A',
  ice: '#DCED9A',
  white: '#F5F4ED',
  gray: '#B6B8A9',
  navy: '#10130D',
  black: '#050605',
};

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
      <header className="sticky top-0 z-40 w-full pt-4 sm:pt-5 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left Dark Capsule: Logo + Nav Items */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center rounded-full p-1.5 pl-2 pr-5 backdrop-blur-xl transition-all"
            style={{
              background: 'rgba(16, 19, 13, 0.86)',
              border: '1px solid rgba(245, 244, 237, 0.12)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.50)',
            }}
          >
            {/* White Circular Logo Emblem */}
            <Link
              href="/"
              aria-label="Cobalt Home"
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-tight shadow-xs select-none mr-2 shrink-0 transition-transform hover:scale-105"
              style={{ background: CF.white, color: CF.navy }}
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
                    className="text-sm font-medium transition-all rounded-full px-3.5 py-1.5"
                    style={
                      active
                        ? {
                          background: 'rgba(201, 239, 79, 0.16)',
                          color: CF.ice,
                          border: '1px solid rgba(201,239,79,0.35)',
                        }
                        : {
                          color: CF.gray,
                        }
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right CTA Capsule — Cirform royal blue */}
          <div
            className="hidden md:flex items-center rounded-full p-1 pl-5 pr-1 gap-3 backdrop-blur-sm transition-all"
            style={{
              background: CF.blue,
              border: '1px solid rgba(201,239,79,0.70)',
              boxShadow: `0 4px 20px rgba(201,239,79,0.24)`,
            }}
          >
            <button
              type="button"
              onClick={() => setFreeModalOpen(true)}
              className="font-medium text-sm transition-opacity cursor-pointer select-none hover:opacity-80"
              style={{ color: CF.ice }}
            >
              Get Free
            </button>
            <Link
              href="/quote"
              className="font-semibold text-sm px-4 py-2 rounded-full shadow-sm transition-all active:scale-95"
              style={{ background: CF.white, color: CF.navy }}
            >
              Get a quote
            </Link>
          </div>

          {/* Mobile logo + trigger */}
          <div className="flex md:hidden items-center justify-between w-full">
            <Link
              href="/"
              aria-label="Cobalt Home"
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-tight shadow-md active:scale-95 transition-transform border"
              style={{ background: CF.navy, color: CF.ice, borderColor: 'rgba(157,184,224,0.15)' }}
            >
              sh
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-full border active:scale-95 transition-all"
              style={{ background: 'rgba(16,19,13,0.86)', borderColor: 'rgba(245,244,237,0.14)', color: CF.ice, backdropFilter: 'blur(12px)' }}
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
          <div
            className="relative w-77.5 sm:w-85 max-w-[85vw] h-full shadow-2xl p-6 flex flex-col justify-between z-10 transition-transform"
            style={{ background: CF.black, border: `1px solid rgba(157,184,224,0.09)`, borderLeft: `1px solid rgba(201,239,79,0.25)` }}
          >
            <div>
              {/* Top Row: logo + close */}
              <div className="flex items-center justify-between">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-tight shadow-sm select-none"
                  style={{ background: CF.navy, color: CF.ice }}
                >
                  sh
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"
                  style={{ border: `1px solid rgba(245,244,237,0.18)`, color: CF.gray, background: 'rgba(16,19,13,0.72)' }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 space-y-1" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-medium transition-colors"
                      style={
                        active
                          ? { background: 'rgba(201,239,79,0.16)', color: CF.ice, border: '1px solid rgba(201,239,79,0.30)' }
                          : { color: CF.gray }
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 space-y-3">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); setFreeModalOpen(true); }}
                className="w-full py-3.5 px-4 rounded-full font-semibold text-sm text-center block transition-all active:scale-[0.98]"
                style={{
                  border: `1px solid rgba(157,184,224,0.20)`,
                  background: 'rgba(16,19,13,0.72)',
                  color: CF.ice,
                }}
              >
                Get Free
              </button>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-full font-semibold text-sm text-center block transition-all active:scale-[0.98]"
                style={{
                  background: CF.blue,
                  color: CF.white,
                  boxShadow: `0 4px 16px rgba(201,239,79,0.24)`,
                }}
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
                <div className="w-12 h-12 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Session Requested!</h3>
                <p className="text-sm text-gray-600">
                  Our engineering team will reach out to {freeEmail} within 2 business hours.
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-block px-3 py-1 bg-lime-100 text-lime-700 text-xs font-semibold rounded-full mb-3">
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
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-lime-300 hover:bg-lime-200 text-stone-950 font-semibold text-sm rounded-full shadow-md shadow-lime-300/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Request Free Session</span>
                    <ArrowRight size={16} />
                  </button>

                  <p className="text-[11px] text-center text-gray-400 mt-3">
                    Prefer a direct project brief?{' '}
                    <Link
                      href="/quote"
                      onClick={() => setFreeModalOpen(false)}
                      className="text-lime-700 font-medium underline"
                    >
                      Use project planner
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