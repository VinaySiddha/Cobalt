'use server';

import { headers } from 'next/headers';
import { quoteSubmissionSchema, QuoteSubmissionInput } from '@/lib/validation';
import { calculateQuote, SelectedServiceItem } from '@/config/pricing';
import { quoteRepository } from '@/lib/db';
import { sendQuoteEmails } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

export interface SubmitQuoteResponse {
  success: boolean;
  reference?: string;
  errors?: Record<string, string>;
  message?: string;
}

function generateReference(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return `COB-${code}`;
}

export async function submitQuoteAction(
  data: QuoteSubmissionInput
): Promise<SubmitQuoteResponse> {
  try {
    // 1. Rate limiting
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : headerList.get('x-real-ip') || '127.0.0.1';

    const rateLimit = checkRateLimit(clientIp, 8, 5 * 60 * 1000); // 8 requests per 5 minutes
    if (!rateLimit.success) {
      return {
        success: false,
        message: `Too many quote requests. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
      };
    }

    // 2. Honeypot spam protection
    if (data.website_url_hp && data.website_url_hp.length > 0) {
      // Bot trapped in honeypot field. Return simulated success to avoid training spammers.
      return {
        success: true,
        reference: 'COB-SPAM-PREVENTED',
      };
    }

    // 3. Server-side validation using Zod
    const validationResult = quoteSubmissionSchema.safeParse(data);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const path = issue.path.join('.');
        fieldErrors[path] = issue.message;
      }
      return {
        success: false,
        errors: fieldErrors,
        message: 'Please resolve the highlighted validation errors.',
      };
    }

    const validData = validationResult.data;

    // 4. Recalculate the price on the server (never trust client)
    const selectedItems: SelectedServiceItem[] = validData.services.map((s) => ({
      serviceId: s.serviceId,
      size: s.size,
    }));

    const calculation = calculateQuote(selectedItems, validData.timeline);

    if (calculation.items.length === 0) {
      return {
        success: false,
        message: 'Please select at least one valid service to generate a quote.',
      };
    }

    // 5. Generate unique reference ID
    const reference = generateReference();

    // 6. Save quote request to database
    await quoteRepository.createQuote({
      reference,
      name: validData.fullName,
      email: validData.email,
      phone: validData.phone,
      company: validData.company || null,
      description: validData.description,
      timeline: validData.timeline,
      total: calculation.total,
      advance: calculation.advance,
      items: calculation.items.map((item) => ({
        service: item.serviceName,
        size: item.size,
        price: item.basePrice,
      })),
    });

    // 7. Dispatch asynchronous notification emails (don't block user on email provider failure)
    try {
      await sendQuoteEmails({
        reference,
        name: validData.fullName,
        email: validData.email,
        phone: validData.phone,
        company: validData.company,
        description: validData.description,
        calculation,
      });
    } catch (emailErr) {
      console.error('Email dispatch error (request was saved):', emailErr);
    }

    return {
      success: true,
      reference,
    };
  } catch (err: unknown) {
    console.error('Error submitting quote:', err);
    return {
      success: false,
      message: 'An unexpected error occurred while processing your quote. Please try again.',
    };
  }
}
