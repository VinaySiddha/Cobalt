export type ServiceSize = 'small' | 'medium' | 'large';
export type TimelineType = 'standard' | 'fast';

export interface ServiceSizePricing {
  price: number;
  label: string;
  scopeSummary: string;
}

export interface ServiceDefinition {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  sizes: Record<ServiceSize, ServiceSizePricing>;
}

export interface PricingConfig {
  services: ServiceDefinition[];
  timelines: Record<
    TimelineType,
    {
      label: string;
      description: string;
      multiplier: number;
    }
  >;
  advancePercentage: number;
  balancePercentage: number;
  disclaimer: string;
}

export const PRICING_CONFIG: PricingConfig = {
  advancePercentage: 0.3,
  balancePercentage: 0.7,
  disclaimer: 'This is an estimate. Final pricing is confirmed after review.',
  timelines: {
    standard: {
      label: 'Standard Timeline',
      description: 'Standard delivery pace with structured development milestones.',
      multiplier: 1.0,
    },
    fast: {
      label: 'Fast Delivery',
      description: 'Expedited delivery with dedicated sprint capacity (+25%).',
      multiplier: 1.25,
    },
  },
  services: [
    {
      id: 'web-app-development',
      name: 'Web App Development',
      shortDescription:
        'Production-grade full-stack web applications with modern architecture and high performance.',
      fullDescription:
        'Custom web applications engineered with Next.js, TypeScript, PostgreSQL, and scalable API layers. Designed for speed, security, and effortless maintenance.',
      deliverables: [
        'Responsive web interface',
        'Backend API & database schema',
        'Authentication & role-based access',
        'Automated CI/CD deployment pipeline',
      ],
      sizes: {
        small: {
          price: 3500,
          label: 'Small',
          scopeSummary: 'Single-purpose app or MVP with up to 4 core views and standard CRUD operations.',
        },
        medium: {
          price: 7500,
          label: 'Medium',
          scopeSummary: 'Multi-feature web platform with authentication, external integrations, and admin panel.',
        },
        large: {
          price: 15000,
          label: 'Large',
          scopeSummary: 'Enterprise-grade portal with complex data models, third-party APIs, and custom workflows.',
        },
      },
    },
    {
      id: 'seo',
      name: 'SEO',
      shortDescription:
        'Technical SEO audits, search performance optimization, and organic visibility enhancement.',
      fullDescription:
        'Technical search engine optimization focused on crawlability, Core Web Vitals, structured data, indexation strategy, and content taxonomy.',
      deliverables: [
        'Complete technical audit and code fixes',
        'Schema markup & structured data implementation',
        'Speed & Core Web Vitals optimization',
        'Keyword mapping and competitive analysis',
      ],
      sizes: {
        small: {
          price: 1200,
          label: 'Small',
          scopeSummary: 'One-time audit and foundational technical optimization for websites up to 20 pages.',
        },
        medium: {
          price: 2500,
          label: 'Medium',
          scopeSummary: 'Full technical remediation, schema architecture, and speed optimization for up to 100 pages.',
        },
        large: {
          price: 5000,
          label: 'Large',
          scopeSummary: 'Comprehensive enterprise SEO overhaul, internationalization, and programmatic SEO strategy.',
        },
      },
    },
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      shortDescription:
        'Actionable business intelligence, automated analytics pipelines, and clear executive reporting.',
      fullDescription:
        'We turn raw databases, analytics logs, and spreadsheets into clean, interactive dashboards and reliable data pipelines for decision-making.',
      deliverables: [
        'ETL pipeline and data modeling',
        'Interactive analytics dashboards',
        'Key performance indicator (KPI) metric definitions',
        'Executive insights report and documentation',
      ],
      sizes: {
        small: {
          price: 2000,
          label: 'Small',
          scopeSummary: 'Single data source ingestion with clean executive dashboard and core business metrics.',
        },
        medium: {
          price: 4500,
          label: 'Medium',
          scopeSummary: 'Multiple data sources, automated ETL synchronization, and custom analytical modeling.',
        },
        large: {
          price: 9000,
          label: 'Large',
          scopeSummary: 'Full data warehouse setup, predictive modeling pipelines, and self-serve team reporting.',
        },
      },
    },
    {
      id: 'ai-solutions',
      name: 'AI Solutions',
      shortDescription:
        'Custom LLM integrations, document retrieval (RAG), and intelligent workflow automation.',
      fullDescription:
        'Production AI tooling built for real business value. We deploy retrieval-augmented generation (RAG), custom agents, and automated task pipelines with strict accuracy boundaries.',
      deliverables: [
        'Custom LLM API orchestration',
        'Vector database and retrieval pipeline (RAG)',
        'Prompt engineering and response evaluation harness',
        'Cost and latency optimization controls',
      ],
      sizes: {
        small: {
          price: 4000,
          label: 'Small',
          scopeSummary: 'Targeted AI assistant or workflow automation tool for a single internal department.',
        },
        medium: {
          price: 9000,
          label: 'Medium',
          scopeSummary: 'Enterprise RAG system connected to private knowledge bases with citation tracking.',
        },
        large: {
          price: 18000,
          label: 'Large',
          scopeSummary: 'Autonomous multi-agent system with tools, specialized fine-tuning, and robust guardrails.',
        },
      },
    },
    {
      id: 'ai-governance',
      name: 'AI Governance',
      shortDescription:
        'Risk assessment, compliance frameworks, safety guardrails, and audit standards for AI systems.',
      fullDescription:
        'Ensure your AI deployments comply with emerging regulatory standards, protect private customer data, and eliminate unmonitored model drift or hallucination risks.',
      deliverables: [
        'AI inventory and risk classification report',
        'Data privacy & PII leakage prevention controls',
        'Model observability & evaluation protocols',
        'Policy documentation and team compliance guidelines',
      ],
      sizes: {
        small: {
          price: 3000,
          label: 'Small',
          scopeSummary: 'Baseline risk assessment and policy guidelines for company-wide internal AI tool usage.',
        },
        medium: {
          price: 6500,
          label: 'Medium',
          scopeSummary: 'Comprehensive governance framework, red-teaming audit, and guardrail implementation.',
        },
        large: {
          price: 12500,
          label: 'Large',
          scopeSummary: 'Full compliance program alignment (EU AI Act, NIST AI RMF, ISO 42001) and ongoing audit suite.',
        },
      },
    },
    {
      id: 'mcp-services',
      name: 'MCP Services',
      shortDescription:
        'Model Context Protocol (MCP) server development, agent tooling, and enterprise API integrations.',
      fullDescription:
        'Connect AI assistants safely to your internal systems via Model Context Protocol (MCP). We build custom servers, secure resource providers, and enterprise protocol bridges.',
      deliverables: [
        'Custom MCP server architecture',
        'Secure API & tool connector integration',
        'Authentication and sandbox permission enforcement',
        'Protocol testing and monitoring suite',
      ],
      sizes: {
        small: {
          price: 2500,
          label: 'Small',
          scopeSummary: 'Custom MCP server exposing up to 5 internal tools or database resources for AI agents.',
        },
        medium: {
          price: 5500,
          label: 'Medium',
          scopeSummary: 'Multi-system MCP server with authentication, rate limiting, and 15+ tool integrations.',
        },
        large: {
          price: 11000,
          label: 'Large',
          scopeSummary: 'Enterprise MCP gateway with high availability, logging, telemetry, and distributed auth.',
        },
      },
    },
  ],
};

export interface SelectedServiceItem {
  serviceId: string;
  size: ServiceSize;
}

export interface CalculatedItem {
  serviceId: string;
  serviceName: string;
  size: ServiceSize;
  sizeLabel: string;
  basePrice: number;
}

export interface CalculationResult {
  items: CalculatedItem[];
  subtotal: number;
  timeline: TimelineType;
  timelineLabel: string;
  timelineMultiplier: number;
  timelineAdjustment: number;
  total: number;
  advance: number;
  balance: number;
  disclaimer: string;
}

export function getServiceById(id: string): ServiceDefinition | undefined {
  return PRICING_CONFIG.services.find((s) => s.id === id);
}

export function calculateQuote(
  selectedItems: SelectedServiceItem[],
  timeline: TimelineType = 'standard'
): CalculationResult {
  const timelineConfig =
    PRICING_CONFIG.timelines[timeline] || PRICING_CONFIG.timelines.standard;

  const items: CalculatedItem[] = [];
  let subtotal = 0;

  for (const item of selectedItems) {
    const service = getServiceById(item.serviceId);
    if (!service) continue;

    const sizeConfig = service.sizes[item.size] || service.sizes.small;
    const basePrice = sizeConfig.price;

    items.push({
      serviceId: service.id,
      serviceName: service.name,
      size: item.size,
      sizeLabel: sizeConfig.label,
      basePrice,
    });

    subtotal += basePrice;
  }

  const multiplier = timelineConfig.multiplier;
  // Total = sum of selected service prices x timeline multiplier
  const total = Math.round(subtotal * multiplier);
  // Advance = 30% of total, rounded to the nearest whole number
  const advance = Math.round(total * PRICING_CONFIG.advancePercentage);
  // Balance = 70% of total
  const balance = total - advance;
  const timelineAdjustment = total - subtotal;

  return {
    items,
    subtotal,
    timeline,
    timelineLabel: timelineConfig.label,
    timelineMultiplier: multiplier,
    timelineAdjustment,
    total,
    advance,
    balance,
    disclaimer: PRICING_CONFIG.disclaimer,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
