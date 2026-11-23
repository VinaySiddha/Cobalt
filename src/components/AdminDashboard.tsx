'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DBQuoteRequest } from '@/lib/db';
import { QuoteStatus } from '@prisma/client';
import { updateQuoteStatusAction, logoutAdminAction } from '@/app/actions/admin';
import {
  Search,
  LogOut,
  X,
  FileText,
} from 'lucide-react';

interface AdminDashboardProps {
  initialQuotes: DBQuoteRequest[];
}

const STATUS_OPTIONS = [
  { value: 'NEW', label: 'New', color: 'bg-lime-100 text-lime-800 border-lime-300' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'ADVANCE_PAID', label: 'Approved', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { value: 'COMPLETED', label: 'Completed', color: 'bg-neutral-100 text-neutral-800 border-neutral-300' },
] as const;

export default function AdminDashboard({ initialQuotes }: AdminDashboardProps) {
  const router = useRouter();
  const [quotes, setQuotes] = useState<DBQuoteRequest[]>(initialQuotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedQuote, setSelectedQuote] = useState<DBQuoteRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Filtered quotes
  const filteredQuotes = quotes.filter((q) => {
    const matchesFilter = statusFilter === 'ALL' || q.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      q.reference.toLowerCase().includes(query) ||
      q.name.toLowerCase().includes(query) ||
      q.email.toLowerCase().includes(query) ||
      (q.company && q.company.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  // Calculate metrics
  const totalCount = quotes.length;
  const newCount = quotes.filter((q) => q.status === 'NEW').length;
  const contactedCount = quotes.filter((q) => q.status === 'CONTACTED').length;
  const advancePaidCount = quotes.filter((q) => q.status === 'ADVANCE_PAID').length;
  const completedCount = quotes.filter((q) => q.status === 'COMPLETED').length;

  // Status update handler
  const handleStatusChange = async (
    quoteId: string,
    newStatus: 'NEW' | 'CONTACTED' | 'ADVANCE_PAID' | 'COMPLETED'
  ) => {
    setUpdatingId(quoteId);
    startTransition(async () => {
      const result = await updateQuoteStatusAction({ quoteId, status: newStatus });
      setUpdatingId(null);
      if (result.success) {
        setQuotes((prev) =>
          prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus as QuoteStatus } : q))
        );
        if (selectedQuote && selectedQuote.id === quoteId) {
          setSelectedQuote({ ...selectedQuote, status: newStatus as QuoteStatus });
        }
      } else {
        alert(result.message || 'Status update failed.');
      }
    });
  };

  const handleLogout = async () => {
    await logoutAdminAction();
    router.refresh();
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-200 p-6 gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#113FCB] mb-1">
              Owner Administration Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Project Brief Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white border border-gray-200 p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
              Total Briefs
            </span>
            <div className="text-2xl font-black text-black mt-1">{totalCount}</div>
            <div className="text-xs text-neutral-500 mt-1">
              Active project pipeline
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-5 border-l-4 border-l-lime-500">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-700 block">
              New (Pending)
            </span>
            <div className="text-2xl font-black text-lime-700 mt-1">{newCount}</div>
            <div className="text-xs text-neutral-500 mt-1">Awaiting first contact</div>
          </div>

          <div className="bg-white border border-gray-200 p-5 border-l-4 border-l-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
              Contacted
            </span>
            <div className="text-2xl font-black text-amber-700 mt-1">{contactedCount}</div>
            <div className="text-xs text-neutral-500 mt-1">Scope in discussion</div>
          </div>

          <div className="bg-white border border-gray-200 p-5 border-l-4 border-l-emerald-600">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
              Scope Approved
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{advancePaidCount}</div>
            <div className="text-xs text-neutral-500 mt-1">Ready for delivery</div>
          </div>

          <div className="bg-white border border-gray-200 p-5 border-l-4 border-l-neutral-700 col-span-2 md:col-span-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
              Completed
            </span>
            <div className="text-2xl font-black text-neutral-900 mt-1">{completedCount}</div>
            <div className="text-xs text-neutral-500 mt-1">Full delivery signed</div>
          </div>
        </div>

        {/* Controls: Search & Filters */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, client name, email, company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#113FCB]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            {['ALL', 'NEW', 'CONTACTED', 'ADVANCE_PAID', 'COMPLETED'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 border transition-colors cursor-pointer ${statusFilter === status
                    ? 'bg-[#113FCB] text-white border-[#113FCB]'
                    : 'bg-white text-neutral-700 border-gray-300 hover:bg-neutral-100'
                  }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white border border-gray-200 overflow-x-auto">
          {filteredQuotes.length === 0 ? (
            <div className="p-12 text-center">
              <FileText size={36} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-base font-bold text-black">No project briefs found</p>
              <p className="text-sm text-neutral-500 mt-1">
                {searchQuery || statusFilter !== 'ALL'
                  ? 'Try adjusting your search query or status filter.'
                  : 'New client briefs will appear here immediately.'}
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-neutral-700 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="py-3 px-4">Ref & Date</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Services</th>
                  <th className="py-3 px-4 text-center">Delivery</th>
                  <th className="py-3 px-4 text-center">Scope</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-normal">
                {filteredQuotes.map((quote) => {
                  const currentStatusConfig =
                    STATUS_OPTIONS.find((s) => s.value === quote.status) || STATUS_OPTIONS[0];

                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-neutral-50/80 transition-colors"
                    >
                      {/* Ref & Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-[#113FCB] block">
                          {quote.reference}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(quote.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-black">{quote.name}</div>
                        <div className="text-xs text-neutral-600">
                          <a
                            href={`mailto:${quote.email}`}
                            className="hover:underline hover:text-[#113FCB]"
                          >
                            {quote.email}
                          </a>
                        </div>
                        <div className="text-xs text-neutral-500">{quote.phone}</div>
                        {quote.company && (
                          <div className="text-xs text-neutral-400 italic">
                            {quote.company}
                          </div>
                        )}
                      </td>

                      {/* Services */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="space-y-1">
                          {quote.items.map((item, idx) => (
                            <div key={idx} className="text-xs">
                              <span className="font-semibold text-neutral-800">
                                {item.service}
                              </span>{' '}
                              <span className="text-neutral-500 text-[11px] capitalize">
                                ({item.size})
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[11px] text-[#113FCB] font-semibold mt-1">
                          Timeline: {quote.timeline === 'fast' ? 'Fast (+25%)' : 'Standard'}
                        </div>
                      </td>

                      {/* Delivery */}
                      <td className="py-3.5 px-4 text-center font-bold text-black whitespace-nowrap">
                        {quote.timeline === 'fast' ? 'Fast' : 'Standard'}
                      </td>

                      {/* Scope */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="font-bold text-lime-700 block">{quote.items.length} services</span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <select
                          value={quote.status}
                          disabled={updatingId === quote.id}
                          onChange={(e) =>
                            handleStatusChange(
                              quote.id,
                              e.target.value as 'NEW' | 'CONTACTED' | 'ADVANCE_PAID' | 'COMPLETED'
                            )
                          }
                          className={`text-xs font-bold uppercase tracking-wider py-1 px-2.5 border rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#113FCB] ${currentStatusConfig.color
                            }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ADVANCE_PAID">APPROVED</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </td>

                      {/* View Details */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedQuote(quote)}
                          className="text-xs font-bold text-[#113FCB] hover:underline cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
        >
          <div className="bg-white border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#113FCB] block mb-1">
                  Quote Details
                </span>
                <h2 className="text-2xl font-black text-black">
                  Ref: {selectedQuote.reference}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Submitted on {new Date(selectedQuote.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                aria-label="Close quote modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-2 gap-4 text-sm bg-neutral-50 p-4 border border-gray-200 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Client Name
                </span>
                <span className="font-bold text-black">{selectedQuote.name}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Company
                </span>
                <span className="font-semibold text-black">
                  {selectedQuote.company || 'Not provided'}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Email
                </span>
                <a
                  href={`mailto:${selectedQuote.email}`}
                  className="text-[#113FCB] hover:underline"
                >
                  {selectedQuote.email}
                </a>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Phone
                </span>
                <a
                  href={`tel:${selectedQuote.phone}`}
                  className="text-black font-semibold hover:underline"
                >
                  {selectedQuote.phone}
                </a>
              </div>
            </div>

            {/* Services Line Items */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              Selected Services & Scope
            </h3>
            <div className="border border-gray-200 divide-y divide-gray-200 mb-6">
              {selectedQuote.items.map((item, idx) => (
                <div key={idx} className="p-3 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold text-black">{item.service}</span>
                    <span className="text-xs text-neutral-500 block capitalize">
                      Scope Size: {item.size}
                    </span>
                  </div>
                  <div className="font-bold text-neutral-900">{item.size} scope</div>
                </div>
              ))}
            </div>

            {/* Delivery overview */}
            <div className="bg-lime-50 border border-lime-200 p-4 text-sm mb-6 space-y-2">
              <div className="flex justify-between">
                <span>Timeline Delivery:</span>
                <span className="font-bold capitalize">{selectedQuote.timeline}</span>
              </div>
              <div className="flex justify-between font-bold text-black text-base border-t border-lime-200 pt-2">
                <span>Services selected:</span>
                <span className="text-lg">{selectedQuote.items.length}</span>
              </div>
              <div className="flex justify-between text-neutral-600 text-xs">
                <span>Next step:</span>
                <span>Engineering review</span>
              </div>
            </div>

            {/* Project Description */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              Project Description & Requirements
            </h3>
            <div className="p-4 bg-white border border-gray-200 text-sm leading-relaxed text-neutral-800 whitespace-pre-wrap mb-6">
              {selectedQuote.description}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Update Status:
                </span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedQuote.id,
                      e.target.value as 'NEW' | 'CONTACTED' | 'ADVANCE_PAID' | 'COMPLETED'
                    )
                  }
                  className="text-xs font-bold uppercase py-1 px-3 border border-gray-300"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="ADVANCE_PAID">APPROVED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
