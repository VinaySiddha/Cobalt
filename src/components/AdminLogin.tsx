'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdminAction } from '@/app/actions/admin';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('password', password);

    startTransition(async () => {
      const res = await loginAdminAction(formData);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message || 'Incorrect password.');
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-md w-full bg-white border-2 border-black p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#113FCB] text-white mx-auto flex items-center justify-center rounded-sm mb-4">
            <Lock size={22} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-[#113FCB]">
            Cobalt Management
          </span>
          <h1 className="text-2xl font-black tracking-tight text-black mt-1">
            Owner Admin Access
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Enter administrative password to view and manage project briefs.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 p-3 bg-red-50 border-l-4 border-red-600 text-red-900 text-xs flex items-center gap-2"
          >
            <AlertCircle size={16} className="shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="adminPassword"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1"
            >
              Password
            </label>
            <input
              id="adminPassword"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#113FCB]"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Unlock Admin Portal</span>
            )}
          </button>
        </form>

        <p className="text-[11px] text-neutral-400 text-center mt-6">
          Default password for development: <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">cobalt2026</code> (configurable via <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-700">ADMIN_PASSWORD</code>)
        </p>
      </div>
    </div>
  );
}
