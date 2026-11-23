import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cobalt.tech'),
  title: {
    default: 'Cobalt | Technology Services',
    template: '%s | Cobalt',
  },
  description:
    'Production-grade technology services: Web Apps, SEO, Data Analysis, AI Solutions, AI Governance, and MCP Services.',
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
    title: 'Cobalt | Technology Services',
    description:
      'Transparent scope and direct technical execution. Select your services and send a project brief to the engineering team.',
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
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-lime-300/30 selection:text-lime-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
