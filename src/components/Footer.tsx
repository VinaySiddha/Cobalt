import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-white flex items-baseline"
            >
              Cobalt<span className="text-[#3b66ff] text-3xl leading-none">.</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Engineered technology services for growing companies. Direct technical execution with transparent scoping and fixed-tier milestones.
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              30% advance on approved scope. Work starts immediately upon confirmation.
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services#web-app-development" className="text-neutral-300 hover:text-white transition-colors">
                  Web App Development
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="text-neutral-300 hover:text-white transition-colors">
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link href="/services#data-analysis" className="text-neutral-300 hover:text-white transition-colors">
                  Data Analysis
                </Link>
              </li>
              <li>
                <Link href="/services#ai-solutions" className="text-neutral-300 hover:text-white transition-colors">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#ai-governance" className="text-neutral-300 hover:text-white transition-colors">
                  AI Governance
                </Link>
              </li>
              <li>
                <Link href="/services#mcp-services" className="text-neutral-300 hover:text-white transition-colors">
                  MCP Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-300 hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-neutral-300 hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-400 hover:text-neutral-200 transition-colors text-xs">
                  Owner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm text-neutral-300">
              <p>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">General Inquiries</span>
                <a href="mailto:contact@cobalt.tech" className="hover:text-white underline decoration-neutral-600 underline-offset-4">
                  contact@cobalt.tech
                </a>
              </p>
              <p>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">Phone</span>
                <a href="tel:+18005550198" className="hover:text-white">
                  +1 (800) 555-0198
                </a>
              </p>
              <p>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">Business Hours</span>
                <span>Mon – Fri, 9:00 AM – 6:00 PM EST</span>
              </p>
              <p>
                <span className="block text-xs text-neutral-500 uppercase tracking-wider font-semibold">Headquarters</span>
                <span>100 Technology Square, Suite 400<br />Cambridge, MA 02139</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <p>© 2026 Cobalt Technology Services LLC. All rights reserved.</p>
          <p>Production engineering with 100% transparent pricing.</p>
        </div>
      </div>
    </footer>
  );
}
