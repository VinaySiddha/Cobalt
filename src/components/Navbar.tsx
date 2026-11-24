'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { X, Menu, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  matchPrefix?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Advisors', href: '/services', matchPrefix: '/services' },
  { label: 'What we do', href: '/#what-we-do' },
  { label: 'AI Intelligence', href: '/#ai-intelligence' },
  { label: 'Pricing', href: '/quote', matchPrefix: '/quote' },
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

  const isItemActive = (item: NavItem) => {
    if (item.matchPrefix) {
      return pathname.startsWith(item.matchPrefix);
    }
    return pathname === item.href;
  };

  return (
    <>
      {/* Desktop / Sticky Header */}
      <header className="sticky top-0 z-40 w-full pt-4 sm:pt-6 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

          {/* Left Brand: Diamond Cross + Name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-semibold text-lg tracking-tight hover:opacity-90 transition-opacity"
          >
            <span className="text-[#c9ef4f] text-xl leading-none select-none">❖</span>
            <span className="font-sans font-bold text-[#f5f4ed] tracking-tight">Cobalt</span>
          </Link>

          {/* Center Capsule Nav (Matching exact reference screenshot) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center rounded-full p-1.5 px-4 backdrop-blur-xl border border-white/10 shadow-xl transition-all"
            style={{
              background: 'rgba(18, 24, 19, 0.75)',
            }}
          >
            <div className="flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
                      active
                        ? 'bg-white/10 text-white font-semibold shadow-xs'
                        : 'text-[#b6b8a9] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Action: Login + White Pill Button (Exact reference layout) */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/admin"
              className="text-xs font-semibold text-[#b6b8a9] hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#f0f0ee] text-[#060807] font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg transition-all active:scale-95"
            >
              <span>Find an advisor</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/quote"
              className="bg-white text-black font-semibold text-xs px-3.5 py-2 rounded-full shadow-md"
            >
              Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full border border-white/15 bg-white/5 text-[#f5f4ed] active:scale-95 transition-all"
              aria-label="Open Navigation Drawer"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-[300px] max-w-[85vw] h-full bg-[#0e120f] border-l border-white/10 p-6 flex flex-col justify-between z-10 shadow-2xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#c9ef4f] text-lg">❖</span>
                  <span className="font-bold text-white tracking-tight">Cobalt</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#b6b8a9] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-[#f5f4ed] hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-[#b6b8a9] hover:text-white hover:bg-white/5"
                >
                  Login
                </Link>
              </nav>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 border-t border-white/10">
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-full bg-white text-black font-semibold text-sm text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Find an advisor</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
