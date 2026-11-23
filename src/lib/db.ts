import { PrismaClient, QuoteStatus } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export interface DBQuoteItem {
  id: string;
  quoteId: string;
  service: string;
  size: string;
  price: number;
}

export interface DBQuoteRequest {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  description: string;
  timeline: string;
  total: number;
  advance: number;
  status: QuoteStatus;
  createdAt: Date;
  updatedAt: Date;
  items: DBQuoteItem[];
}

// Fallback JSON-file store for development when DATABASE_URL is not provided or DB is offline
const DEV_DB_FILE = path.join(process.cwd(), '.dev_quotes_storage.json');

function readDevQuotes(): DBQuoteRequest[] {
  try {
    if (!fs.existsSync(DEV_DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DEV_DB_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.map((q: DBQuoteRequest) => ({
      ...q,
      createdAt: new Date(q.createdAt),
      updatedAt: new Date(q.updatedAt),
    }));
  } catch (err) {
    console.error('Error reading dev storage:', err);
    return [];
  }
}

function writeDevQuotes(quotes: DBQuoteRequest[]) {
  try {
    fs.writeFileSync(DEV_DB_FILE, JSON.stringify(quotes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing dev storage:', err);
  }
}

export const quoteRepository = {
  async createQuote(data: {
    reference: string;
    name: string;
    email: string;
    phone: string;
    company?: string | null;
    description: string;
    timeline: string;
    total: number;
    advance: number;
    items: { service: string; size: string; price: number }[];
  }): Promise<DBQuoteRequest> {
    const isDbConfigured = Boolean(process.env.DATABASE_URL);

    if (isDbConfigured) {
      try {
        const created = await prisma.quoteRequest.create({
          data: {
            reference: data.reference,
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company || null,
            description: data.description,
            timeline: data.timeline,
            total: data.total,
            advance: data.advance,
            status: QuoteStatus.NEW,
            items: {
              create: data.items.map((item) => ({
                service: item.service,
                size: item.size,
                price: item.price,
              })),
            },
          },
          include: {
            items: true,
          },
        });
        return created;
      } catch (error) {
        console.warn(
          'Prisma DB insert failed or connection refused. Falling back to local store:',
          error
        );
      }
    }

    // Local dev fallback
    const id = 'dev_' + Math.random().toString(36).substring(2, 11);
    const now = new Date();
    const newQuote: DBQuoteRequest = {
      id,
      reference: data.reference,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      description: data.description,
      timeline: data.timeline,
      total: data.total,
      advance: data.advance,
      status: 'NEW' as QuoteStatus,
      createdAt: now,
      updatedAt: now,
      items: data.items.map((item, idx) => ({
        id: `${id}_item_${idx}`,
        quoteId: id,
        service: item.service,
        size: item.size,
        price: item.price,
      })),
    };

    const quotes = readDevQuotes();
    quotes.unshift(newQuote);
    writeDevQuotes(quotes);

    return newQuote;
  },

  async getAllQuotes(): Promise<DBQuoteRequest[]> {
    const isDbConfigured = Boolean(process.env.DATABASE_URL);

    if (isDbConfigured) {
      try {
        const quotes = await prisma.quoteRequest.findMany({
          orderBy: { createdAt: 'desc' },
          include: { items: true },
        });
        return quotes;
      } catch (error) {
        console.warn(
          'Prisma query failed. Reading from dev storage instead:',
          error
        );
      }
    }

    return readDevQuotes();
  },

  async getQuoteByReference(reference: string): Promise<DBQuoteRequest | null> {
    const isDbConfigured = Boolean(process.env.DATABASE_URL);

    if (isDbConfigured) {
      try {
        const quote = await prisma.quoteRequest.findUnique({
          where: { reference },
          include: { items: true },
        });
        if (quote) return quote;
      } catch (error) {
        console.warn('Prisma reference lookup failed:', error);
      }
    }

    const quotes = readDevQuotes();
    return quotes.find((q) => q.reference === reference) || null;
  },

  async updateQuoteStatus(
    id: string,
    status: QuoteStatus
  ): Promise<DBQuoteRequest | null> {
    const isDbConfigured = Boolean(process.env.DATABASE_URL);

    if (isDbConfigured) {
      try {
        const updated = await prisma.quoteRequest.update({
          where: { id },
          data: { status },
          include: { items: true },
        });
        return updated;
      } catch (error) {
        console.warn('Prisma status update failed, trying dev storage:', error);
      }
    }

    const quotes = readDevQuotes();
    const index = quotes.findIndex((q) => q.id === id);
    if (index === -1) return null;

    quotes[index].status = status;
    quotes[index].updatedAt = new Date();
    writeDevQuotes(quotes);

    return quotes[index];
  },
};
