import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[#060807]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-semibold text-xl tracking-tight w-fit"
            >
              <span className="text-[#c9ef4f] text-2xl leading-none">❖</span>
              <span className="font-sans font-bold text-[#f5f4ed] tracking-tight">Cobalt</span>
            </Link>
            <p className="text-xs sm:text-sm text-[#787c6f] leading-relaxed max-w-xs">
              AI-driven intelligence and financial workflow platform designed for high-performing founders, investors, and modern enterprises.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#b6b8a9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9ef4f] animate-pulse" />
              <span>Institutional security · Real-time automation</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="overline-tag mb-4">Intelligence</h3>
            <ul className="space-y-2.5 text-xs">
              {[
                ['Natural Language Queries', '/services#queries'],
                ['Predictive Analysis', '/services#predictive'],
                ['Smart Categorization', '/services#categorization'],
                ['Cash Flow Analytics', '/services#cash-flow'],
                ['Due Diligence Engine', '/services#due-diligence'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[#787c6f] hover:text-[#f5f4ed] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="overline-tag mb-4">Platform</h3>
            <ul className="space-y-2.5 text-xs">
              {[
                ['Home', '/'],
                ['Services & Scope', '/services'],
                ['Start Free Trial', '/quote'],
                ['Contact Advisor', '/contact'],
                ['Login Portal', '/admin'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[#787c6f] hover:text-[#f5f4ed] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="overline-tag mb-4">Contact</h3>
            <div className="space-y-3 text-xs text-[#b6b8a9]">
              <div>
                <span className="block text-[10px] text-[#787c6f] uppercase tracking-wider font-semibold mb-0.5">Direct Line</span>
                <a href="mailto:advisor@cobalt.tech" className="text-[#f5f4ed] hover:text-[#c9ef4f] transition-colors">
                  advisor@cobalt.tech
                </a>
              </div>
              <div>
                <span className="block text-[10px] text-[#787c6f] uppercase tracking-wider font-semibold mb-0.5">Global Desk</span>
                <span>Mon – Fri · 24/5 Concierge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#787c6f] gap-3">
          <p>© {year} Cobalt Intelligence. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[11px]">
            <span className="w-1 h-1 rounded-full bg-[#c9ef4f]" />
            Engineered with editorial precision & institutional security
          </p>
        </div>
      </div>
    </footer>
  );
}
