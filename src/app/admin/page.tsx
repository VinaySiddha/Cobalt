import { checkIsAdminAuthenticated } from '@/app/actions/admin';
import { quoteRepository } from '@/lib/db';
import AdminDashboard from '@/components/AdminDashboard';
import AdminLogin from '@/components/AdminLogin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal | Cobalt Project Management',
  description: 'Manage and review submitted project briefs and status updates.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuthenticated = await checkIsAdminAuthenticated();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const quotes = await quoteRepository.getAllQuotes();

  return <AdminDashboard initialQuotes={quotes} />;
}
