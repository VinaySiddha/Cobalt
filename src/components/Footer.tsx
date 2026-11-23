import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/[0.06]">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-lime-300/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-white flex items-baseline w-fit"
            >
              Cobalt<span className="text-lime-300 text-3xl leading-none">.</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Engineered technology services for growing companies. Direct technical execution with transparent scoping and fixed-tier milestones.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-300 animate-pulse" />
              <span className="text-xs text-slate-600">Clear scope · Work starts with alignment</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Web App Development', '/services#web-app-development'],
                ['SEO Optimization', '/services#seo'],
                ['Data Analysis', '/services#data-analysis'],
                ['AI Solutions', '/services#ai-solutions'],
                ['AI Governance', '/services#ai-governance'],
                ['MCP Services', '/services#mcp-services'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-500 hover:text-slate-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['Home', '/'],
                ['Services', '/services'],
                ['Plan a Project', '/quote'],
                ['Contact', '/contact'],
                ['Owner Portal', '/admin'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-500 hover:text-slate-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-[11px] text-slate-600 uppercase tracking-wider font-semibold mb-0.5">Email</span>
                <a href="mailto:contact@cobalt.tech" className="text-slate-400 hover:text-lime-300 transition-colors">
                  contact@cobalt.tech
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-slate-600 uppercase tracking-wider font-semibold mb-0.5">Phone</span>
                <a href="tel:+18005550198" className="text-slate-400 hover:text-slate-200 transition-colors">
                  +1 (800) 555-0198
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-slate-600 uppercase tracking-wider font-semibold mb-0.5">Hours</span>
                <span className="text-slate-500">Mon – Fri · 9am – 6pm EST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-3">
          <p>© {year} Cobalt Technology Services. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-lime-300/60" />
            Production engineering · 100% transparent scope
          </p>
        </div>
      </div>
    </footer>
  );
}
