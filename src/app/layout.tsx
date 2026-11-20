import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cobalt.tech'),
  title: {
    default: 'Cobalt | Technology Services & Instant Quotation',
    template: '%s | Cobalt',
  },
  description:
    'Production-grade technology services: Web Apps, SEO, Data Analysis, AI Solutions, AI Governance, and MCP Services. Get an instant estimate online.',
  keywords: [
    'Technology Services',
    'Web Development',
    'AI Solutions',
    'AI Governance',
    'MCP Services',
    'Data Analysis',
    'SEO',
    'Cobalt',
  ],
  authors: [{ name: 'Cobalt Technology Services' }],
  openGraph: {
    title: 'Cobalt | Technology Services & Instant Quotation',
    description:
      'Transparent scope, fixed-tier pricing, and direct technical execution. Select your services and receive an instant estimate.',
    url: 'https://cobalt.tech',
    siteName: 'Cobalt',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-black antialiased selection:bg-[#113FCB] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
