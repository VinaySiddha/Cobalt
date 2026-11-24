'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  activeMatch: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    activeMatch: (path) => path === '/',
  },
  {
    label: 'Work',
    href: '/work',
    activeMatch: (path) => path === '/work' || path.startsWith('/services'),
  },
  {
    label: 'Gallery',
    href: '/gallery',
    activeMatch: (path) => path === '/gallery',
  },
  {
    label: 'Plans',
    href: '/plans',
    activeMatch: (path) => path === '/plans' || path.startsWith('/quote') || path.startsWith('/pricing'),
  },
  {
    label: 'Story',
    href: '/story',
    activeMatch: (path) => path === '/story' || path.startsWith('/contact'),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop & Mobile Header Bar */}
      <header className="sticky top-0 z-40 w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

          {/* Left Pill (Desktop): Brand circle + Home, Work, Gallery, Plans, Story */}
          <div className="hidden md:flex items-center bg-[#0a0e14]/90 backdrop-blur-md border border-white/10 rounded-full p-1 pl-1.5 pr-3 shadow-xl transition-all">
            <Link
              href="/"
              className="w-8 h-8 rounded-full bg-white text-[#0a0e14] font-bold flex items-center justify-center text-xs tracking-tight shadow-sm hover:scale-105 transition-transform mr-1 shrink-0"
              title="Home"
            >
              sh
            </Link>

            <nav aria-label="Primary Navigation" className="flex items-center space-x-0.5">
              {NAV_ITEMS.map((item) => {
                const active = item.activeMatch(pathname);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
                      active
                        ? 'bg-[#1e2532] text-white font-semibold shadow-xs'
                        : 'text-[#9aa4b2] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Left Brand Pill (Circle sh logo) */}
          <div className="flex md:hidden items-center">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-[#0a0e14] border border-white/20 text-white font-bold flex items-center justify-center text-xs tracking-tight shadow-md"
            >
              sh
            </Link>
          </div>

          {/* Right Action Capsule: Vibrant Blue Pill with [Get Free] + [Get a quote (white pill)] */}
          <div className="hidden md:flex items-center">
            <div className="bg-[#2b75ff] hover:bg-[#2566ea] rounded-full p-1 pl-5 pr-1 flex items-center gap-3.5 shadow-lg shadow-blue-500/25 transition-all">
              <Link
                href="/contact"
                className="text-white font-semibold text-xs tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Get Free
              </Link>
              <Link
                href="/plans"
                className="bg-white hover:bg-slate-50 text-[#0f172a] font-semibold text-xs px-4 py-2 rounded-full shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                Get a quote
              </Link>
            </div>
          </div>

          {/* Mobile Right Controls: Compact Blue Action + Drawer Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <div className="bg-[#2b75ff] rounded-full p-0.5 pl-3 pr-0.5 flex items-center gap-2 shadow-md">
              <Link
                href="/plans"
                className="bg-white text-[#0f172a] font-semibold text-xs px-3 py-1.5 rounded-full shadow-xs whitespace-nowrap"
              >
                Get a quote
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-full border border-white/20 bg-[#0a0e14]/80 text-[#f5f4ed] flex items-center justify-center active:scale-95 transition-all"
              aria-label="Open Navigation Drawer"
            >
              <Menu size={18} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Over Drawer (Clean White Card Drawer matching user reference) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden animate-fade-in">
          {/* Backdrop with blur - reveals blurred background with logo like in screenshot */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Card */}
          <div className="relative w-[320px] max-w-[85vw] h-full bg-white text-slate-900 shadow-2xl p-6 flex flex-col justify-between z-10 animate-slide-left">
            <div>
              {/* Top Row: Circular dark badge `sh` on left + Circular close `✕` on right */}
              <div className="flex items-center justify-between pb-6">
                <div className="w-10 h-10 rounded-full bg-[#0d1219] text-white font-bold flex items-center justify-center text-sm shadow-sm select-none">
                  sh
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition-all"
                  aria-label="Close Navigation Drawer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Vertical Menu Items */}
              <nav className="mt-2 space-y-1.5" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => {
                  const active = item.activeMatch(pathname);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-[#f1f3f5] text-slate-950 font-semibold'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Buttons: [Get Free (white outline pill)] & [Get a quote (dark pill)] */}
            <div className="pt-6 space-y-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-medium text-sm text-center shadow-xs transition-all block"
              >
                Get Free
              </Link>
              <Link
                href="/plans"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-full bg-[#303741] hover:bg-[#222830] text-white font-medium text-sm text-center shadow-md transition-all block"
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
