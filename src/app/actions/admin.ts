'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { quoteRepository } from '@/lib/db';
import { QuoteStatus } from '@prisma/client';
import { adminStatusSchema } from '@/lib/validation';

const ADMIN_COOKIE_NAME = 'cobalt_admin_session';

export async function loginAdminAction(formData: FormData): Promise<{
  success: boolean;
  message?: string;
}> {
  const password = formData.get('password') as string;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'cobalt2026';

  if (!password || password !== configuredPassword) {
    return {
      success: false,
      message: 'Invalid administrative password.',
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return { success: true };
}

export async function logoutAdminAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  revalidatePath('/admin');
}

export async function checkIsAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === 'authenticated';
}

export async function updateQuoteStatusAction(data: {
  quoteId: string;
  status: 'NEW' | 'CONTACTED' | 'ADVANCE_PAID' | 'COMPLETED';
}): Promise<{ success: boolean; message?: string }> {
  const isAuthenticated = await checkIsAdminAuthenticated();
  if (!isAuthenticated) {
    return { success: false, message: 'Unauthorized. Please login again.' };
  }

  const parsed = adminStatusSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: 'Invalid status provided.' };
  }

  try {
    const updated = await quoteRepository.updateQuoteStatus(
      parsed.data.quoteId,
      parsed.data.status as QuoteStatus
    );

    if (!updated) {
      return { success: false, message: 'Quote request not found.' };
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update quote status:', error);
    return { success: false, message: 'Failed to update quote status.' };
  }
}
