// ============================================
// TIPOS TYPESCRIPT - ILP Dashboard
// ============================================

// ============================================
// DADOS DE CAMPANHAS PAGAS
// ============================================

export type CampaignType = 'MENSAGEM' | 'AUDIENCIA';

export interface CampaignData {
  id: string;
  name: string;
  type: CampaignType;
  period: {
    start: string;
    end: string;
  };
  status: 'active' | 'inactive';
  budget: number;
  budgetType: 'daily' | 'total';
  metrics: CampaignMetrics;
}

export interface CampaignMetrics {
  results: number;
  resultType: string; // 'profile_visit_view' | 'messaging_conversation_started'
  costPerResult: number;
  spent: number;
  reach: number;
  impressions: number;
  clicks: number;
  linkClicks: number;
  cpc: number;
  ctr: number;
  cpm: number;
  videoViews25?: number;
  videoViews100?: number;
  conversationsStarted?: number;
  profileVisits?: number;
}

export interface MonthlyComparison {
  month: string; // 'Setembro' | 'Outubro' | 'Novembro' | 'Dezembro'
  mensagem: CampaignMetrics;
  audiencia: CampaignMetrics;
  totalSpent: number;
  totalResults: number;
}

// ============================================
// DADOS DE CRIATIVOS
// ============================================

export type CreativeFormat = 'VIDEO' | 'CAROUSEL' | 'IMAGE' | 'STORY';

export interface CreativeData {
  id: string;
  name: string;
  campaignName: string;
  campaignType: CampaignType;
  format: CreativeFormat;
  metrics: CreativeMetrics;
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: number; // em segundos
}

export interface CreativeMetrics {
  results: number;
  resultType: string;
  costPerResult: number;
  spent: number;
  reach: number;
  impressions: number;
  clicks: number;
  linkClicks: number;
  ctr: number;
  videoViews25?: number;
  videoViews100?: number;
}

export interface TopCreative extends CreativeData {
  rank: number;
  justification: string;
  patterns: string[];
}

// ============================================
// DADOS ORGÂNICOS
// ============================================

export type OrganicPostType = 'REEL' | 'CAROUSEL' | 'IMAGE' | 'STORY';

export interface OrganicPost {
  id: string;
  accountId: string;
  accountName: string;
  description: string;
  type: OrganicPostType;
  publishedAt: string;
  permanentLink: string;
  duration?: number;
  metrics: OrganicMetrics;
}

export interface OrganicMetrics {
  views: number;
  reach: number;
  likes: number;
  shares: number;
  comments?: number;
  saves?: number;
  replies?: number; // Stories
  stickerTaps?: number; // Stories
  navigation?: number; // Stories
  profileVisits?: number;
  linkClicks?: number;
  follows?: number;
}

export interface OrganicSummary {
  period: string;
  feedReels: {
    totalPosts: number;
    totalViews: number;
    totalReach: number;
    totalLikes: number;
    totalShares: number;
    avgEngagement: number;
  };
  stories: {
    totalStories: number;
    totalViews: number;
    totalReach: number;
    totalReplies: number;
    avgCompletion: number;
  };
}

// ============================================
// DADOS DE FECHAMENTO
// ============================================

export type PaymentStatus = 'Quitado' | 'Em aberto';

export interface ClosingRecord {
  id: string;
  clientName: string;
  date: string;
  description: string;
  procedure: string;
  category: string;
  status: PaymentStatus;
  value: number;
  paidValue: number;
}

export interface ClosingSummary {
  month: string;
  totalProcedures: number;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  byCategory: CategorySummary[];
  topServices: ServiceSummary[];
}

export interface CategorySummary {
  category: string;
  count: number;
  revenue: number;
  percentage: number;
}

export interface ServiceSummary {
  service: string;
  count: number;
  revenue: number;
  avgTicket: number;
}

// ============================================
// CRUZAMENTO DE DADOS
// ============================================

export interface DataCrossing {
  timeline: TimelinePoint[];
  correlations: Correlation[];
  patterns: Pattern[];
}

export interface TimelinePoint {
  date: string;
  paidInvestment: number;
  paidResults: number;
  organicReach: number;
  closings: number;
  revenue: number;
}

export interface Correlation {
  type: 'pago-organico' | 'marketing-fechamento' | 'servico-campanha';
  description: string;
  strength: 'strong' | 'moderate' | 'weak';
  insight: string;
}

export interface Pattern {
  type: 'temporal' | 'behavioral' | 'content';
  description: string;
  data: Record<string, number>;
}

// ============================================
// INSIGHTS E TENDÊNCIAS
// ============================================

export interface Insight {
  id: string;
  category: 'performance' | 'creative' | 'audience' | 'conversion';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  dataSupport: string;
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  expectedImpact: string;
  effort: 'low' | 'medium' | 'high';
}

export interface Trend {
  name: string;
  description: string;
  relevance: 'high' | 'medium' | 'low';
  examples?: string[];
  sources?: string[];
}

// ============================================
// BENCHMARKS
// ============================================

export interface Benchmark {
  metric: string;
  value: number;
  unit: string;
  source: string;
  context: string;
}

export interface PerformanceVsBenchmark {
  metric: string;
  actual: number;
  benchmark: number;
  difference: number;
  percentageDiff: number;
  status: 'above' | 'below' | 'at';
}

// ============================================
// DASHBOARD/UI
// ============================================

export interface Slide {
  id: number;
  title: string;
  component: string;
}

export interface KPICard {
  label: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon?: string;
  color?: 'accent' | 'gold' | 'success' | 'warning' | 'error';
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}
