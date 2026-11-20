# Cobalt — Technology Services Quotation Platform

Production-ready quotation web application for **Cobalt**, an engineered technology services startup. Clients configure custom service scopes, receive instant itemized pricing with a 30% advance deposit breakdown, and submit formal quote requests directly to leadership.

---

## Table of Contents
1. [Key Features](#key-features)
2. [Tech Stack](#tech-stack)
3. [Architecture & Project Structure](#architecture--project-structure)
4. [Environment Variables](#environment-variables)
5. [Local Development Setup](#local-development-setup)
6. [Database Setup (PostgreSQL / Neon / Supabase)](#database-setup-postgresql--neon--supabase)
7. [Email Configuration (Resend / SMTP)](#email-configuration-resend--smtp)
8. [How to Adjust Pricing & Tiers](#how-to-adjust-pricing--tiers)
9. [Admin Portal](#admin-portal)
10. [Spam Protection & Rate Limiting](#spam-protection--rate-limiting)
11. [Production Deployment](#production-deployment)

---

## Key Features

- **Instant Quote Engine:** Interactive multi-service selection with dynamic scoping (Small, Medium, Large) and real-time client-side calculation.
- **Server-Side Price Recalculation:** Client submissions are validated against a central pricing configuration on the server using Zod—client-submitted dollar values are never trusted.
- **30% Advance Deposit Model:** Automatic calculation of the 30% advance required before sprint kickoff and the remaining 70% milestone balance.
- **Dual Email Notification:** Instant formatted HTML notifications dispatched to the owner (with full technical and pricing details) and a confirmation email to the client with their unique quote reference.
- **Owner Admin Portal:** Password-protected dashboard with status management (`NEW`, `CONTACTED`, `ADVANCE_PAID`, `COMPLETED`), search, status filters, and detailed quote inspection.
- **Spam Defense:** Dual-layer protection featuring a hidden honeypot trap and in-memory sliding window IP rate limiting.
- **Robust Database Abstraction:** Prisma ORM connected to PostgreSQL (Neon, Supabase, RDS) with seamless zero-config local storage fallback for rapid testing.
- **Enterprise Design Standards:** Strict typography, accessible contrast, mobile-first responsive layout, and clean `#113FCB` brand palette.

---

## Tech Stack

- **Framework:** Next.js (App Router, Server Actions, Server Components)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Validation:** Zod (shared schemas between client and server)
- **Email:** Resend / Nodemailer
- **Icons:** Lucide React

---

## Architecture & Project Structure

```
.
├── prisma/
│   └── schema.prisma              # Database schema (QuoteRequest, QuoteItem)
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── quote.ts           # Server Action for quote submission, validation, DB & email
│   │   │   └── admin.ts           # Server Action for admin auth & status updates
│   │   ├── admin/
│   │   │   └── page.tsx           # Password-protected admin dashboard
│   │   ├── contact/
│   │   │   └── page.tsx           # Direct contact details & engagement terms
│   │   ├── quote/
│   │   │   └── page.tsx           # Interactive quote builder & live price calculator
│   │   ├── services/
│   │   │   └── page.tsx           # Plain-language service catalog with tier scopes
│   │   ├── thank-you/
│   │   │   └── page.tsx           # Confirmation page with reference ID & next steps
│   │   ├── globals.css            # Tailwind CSS styling and theme configuration
│   │   ├── layout.tsx             # Root layout with Navbar and Footer
│   │   ├── page.tsx               # Homepage with value statement & services grid
│   │   ├── robots.ts              # Search engine crawler policies
│   │   └── sitemap.ts             # Dynamic XML sitemap
│   ├── components/
│   │   ├── AdminDashboard.tsx     # Admin table, metrics, filters, and detail modal
│   │   ├── AdminLogin.tsx         # Password authentication component
│   │   ├── Footer.tsx             # Global site footer
│   │   ├── Navbar.tsx             # Responsive global navigation
│   │   ├── QuoteForm.tsx          # Real-time multi-step quote calculator
│   │   └── ThankYouClient.tsx     # Copy-to-clipboard & print confirmation tools
│   ├── config/
│   │   └── pricing.ts             # SINGLE SOURCE OF TRUTH for all pricing & tiers
│   └── lib/
│       ├── db.ts                  # Prisma client & resilient repository pattern
│       ├── email.ts               # Resend & Nodemailer dispatch handlers
│       ├── rate-limit.ts          # In-memory sliding window rate limiter
│       └── validation.ts          # Zod validation schemas
├── .env.example                   # Template for environment variables
└── README.md                      # Complete documentation
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (Neon / Supabase) | `postgresql://user:pass@host/db?sslmode=require` |
| `OWNER_EMAIL` | Email address where quote notifications are sent | `owner@cobalt.tech` |
| `ADMIN_PASSWORD` | Password used to log into `/admin` | `cobalt2026` |
| `NEXT_PUBLIC_APP_URL` | Canonical site URL for metadata & sitemaps | `http://localhost:3000` |
| `RESEND_API_KEY` | Resend API key for outbound transactional emails | `re_123456789...` |
| `EMAIL_FROM` | Verified sender address for quote emails | `Cobalt Quotes <quotes@cobalt.tech>` |
| `SMTP_HOST` | *(Optional)* Custom SMTP host if not using Resend | `smtp.mailgun.org` |
| `SMTP_PORT` | *(Optional)* SMTP port | `587` |
| `SMTP_USER` | *(Optional)* SMTP username | `user@domain.com` |
| `SMTP_PASS` | *(Optional)* SMTP password | `password` |

> **Development Note:** If `DATABASE_URL` is omitted, the application automatically uses a local file storage (`.dev_quotes_storage.json`) so you can test quote submissions and admin features out of the box without spinning up PostgreSQL. If `RESEND_API_KEY` is omitted, emails are logged directly to the console.

---

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## Database Setup (PostgreSQL / Neon / Supabase)

To connect a production PostgreSQL database:

1. Obtain your PostgreSQL connection string from [Neon](https://neon.tech), [Supabase](https://supabase.com), or your preferred cloud provider.
2. Set `DATABASE_URL` in your `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@ep-bold-sunset-1234.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```
3. Push the Prisma schema directly to your database:
   ```bash
   npx prisma db push
   ```
4. Verify models using Prisma Studio (optional):
   ```bash
   npx prisma studio
   ```

### Database Tables
- **QuoteRequest:** `id`, `reference` (unique), `name`, `email`, `phone`, `company`, `description`, `timeline`, `total`, `advance`, `status`, `createdAt`, `updatedAt`
- **QuoteItem:** `id`, `quoteId` (FK), `service`, `size`, `price`

---

## Email Configuration (Resend / SMTP)

When a client submits a quote:
1. **To Owner (`OWNER_EMAIL`):** Comprehensive notification containing the client's contact info, itemized services, sizes, pricing calculation, timeline choice, and full project description.
2. **To Client:** Professional acknowledgment with their unique reference code (`COB-XXXXXX`), summary, and explanation of next steps (review within 1 business day, personal contact, and 30% advance requirement).

To activate real email dispatch:
1. Create a free account at [Resend](https://resend.com).
2. Add your verified domain and generate an API key.
3. Set `RESEND_API_KEY="re_..."` and `EMAIL_FROM="Cobalt <quotes@yourdomain.com>"` in `.env`.

---

## How to Adjust Pricing & Tiers

All pricing logic, service descriptions, scope tiers, and multipliers live in **one single file**:

👉 `src/config/pricing.ts`

### 1. Changing Service Prices or Scopes
In `src/config/pricing.ts`, locate the service definition under `PRICING_CONFIG.services`:

```typescript
{
  id: 'web-app-development',
  name: 'Web App Development',
  sizes: {
    small: {
      price: 3500, // Change base price here
      label: 'Small',
      scopeSummary: 'Single-purpose app or MVP...',
    },
    medium: {
      price: 7500,
      label: 'Medium',
      scopeSummary: 'Multi-feature web platform...',
    },
    large: {
      price: 15000,
      label: 'Large',
      scopeSummary: 'Enterprise-grade portal...',
    },
  },
}
```

### 2. Changing the Fast Timeline Multiplier
In `src/config/pricing.ts`:

```typescript
timelines: {
  standard: {
    label: 'Standard Timeline',
    multiplier: 1.0, // Base
  },
  fast: {
    label: 'Fast Delivery',
    multiplier: 1.25, // 25% expedited surge
  },
}
```

### 3. Changing the Advance Percentage
In `src/config/pricing.ts`:

```typescript
advancePercentage: 0.30, // 30% advance
balancePercentage: 0.70, // 70% balance
```

Because both the frontend quote calculator and the server-side validator import this file, modifying `src/config/pricing.ts` automatically updates both the client-side calculator and server validation instantly without code duplication.

---

## Admin Portal

- **URL:** `/admin`
- **Default Password:** `cobalt2026` (change via `ADMIN_PASSWORD` in `.env`)
- **Capabilities:**
  - View incoming quotation requests in real-time.
  - Filter requests by status: `NEW`, `CONTACTED`, `ADVANCE_PAID`, `COMPLETED`.
  - Search by reference code, client name, email, or company.
  - Update status inline or inside the inspection modal.
  - View total pipeline valuation and pending advance totals.

---

## Spam Protection & Rate Limiting

1. **Honeypot Trap:**
   The form includes a hidden field `website_url_hp` invisible to normal users. If an automated bot populates this field, the submission is rejected immediately without polluting your database or sending emails.
2. **IP Rate Limiting:**
   A sliding window in-memory rate limiter in `src/lib/rate-limit.ts` restricts submissions to **8 requests per 5 minutes per IP address**, preventing denial-of-service or inbox flooding.

---

## Production Deployment

This project is optimized for deployment on Vercel, Railway, or AWS Amplify.

### Deploying to Vercel
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. Configure the environment variables (`DATABASE_URL`, `RESEND_API_KEY`, `OWNER_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_APP_URL`).
4. Set Build Command: `prisma generate && next build`.
5. Deploy.
