import { z } from 'zod';

export const quoteItemSchema = z.object({
  serviceId: z.string().min(1, { message: 'Service ID is required.' }),
  size: z.enum(['small', 'medium', 'large']),
});

export const quoteSubmissionSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid business email address.' })
    .max(150, { message: 'Email cannot exceed 150 characters.' }),
  phone: z
    .string()
    .trim()
    .min(6, { message: 'Please provide a valid phone number with country/area code.' })
    .max(30, { message: 'Phone number cannot exceed 30 characters.' }),
  company: z
    .string()
    .trim()
    .max(120, { message: 'Company name cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')),
  services: z
    .array(quoteItemSchema)
    .min(1, { message: 'Please select at least one service for your quote.' }),
  timeline: z.enum(['standard', 'fast']),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Project description must be at least 10 characters.' })
    .max(3000, { message: 'Project description cannot exceed 3000 characters.' }),
  // Honeypot field for spam bot protection
  website_url_hp: z.string().max(0, { message: 'Bot submission detected.' }).optional().or(z.literal('')),
});

export type QuoteSubmissionInput = z.infer<typeof quoteSubmissionSchema>;
export type QuoteItemInput = z.infer<typeof quoteItemSchema>;

export const adminStatusSchema = z.object({
  quoteId: z.string().min(1),
  status: z.enum(['NEW', 'CONTACTED', 'ADVANCE_PAID', 'COMPLETED']),
});

export type AdminStatusInput = z.infer<typeof adminStatusSchema>;
