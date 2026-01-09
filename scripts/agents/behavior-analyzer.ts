/**
 * Behavior Analyzer Agent
 *
 * Analisa padrões comportamentais de:
 * - Dias da semana com melhor performance orgânica
 * - Horários de publicação vs engajamento
 * - Padrões de fechamento da clínica
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const organicPath = path.join(__dirname, '../../src/lib/data/organic.ts');
const closingsPath = path.join(__dirname, '../../src/lib/data/closings.ts');

// Helper para ler dados TypeScript e extrair JSON
function extractDataFromTS(filePath: string, varName: string): unknown {
  const content = fs.readFileSync(filePath, 'utf-8');
  const regex = new RegExp(`export const ${varName} = ({[\\s\\S]*?}) as const;`);
  const match = content.match(regex);
  if (!match) throw new Error(`Could not find ${varName} in ${filePath}`);
  return JSON.parse(match[1]);
}

// Nomes dos dias da semana
const DAYS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Parse date from "MM/DD/YYYY HH:MM" format
function parseDate(dateStr: string): Date | null {
  const match = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/);
  if (!match) return null;
  const [, month, day, year, hour, minute] = match;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
}

// Categorize time of day
function getTimeSlot(hour: number): string {
  if (hour >= 6 && hour < 12) return 'Manhã (6h-12h)';
  if (hour >= 12 && hour < 18) return 'Tarde (12h-18h)';
  if (hour >= 18 && hour < 22) return 'Noite (18h-22h)';
  return 'Madrugada (22h-6h)';
}

interface OrganicPost {
  id: string;
  type: string;
  publishedAt: string;
  metrics: {
    views: number;
    reach: number;
    likes: number;
    shares: number;
    comments: number;
  };
}

interface DayAnalysis {
  day: string;
  posts: number;
  totalViews: number;
  avgViews: number;
  totalEngagement: number;
  avgEngagement: number;
}

interface TimeAnalysis {
  slot: string;
  posts: number;
  totalViews: number;
  avgViews: number;
}

async function runBehaviorAnalysis(): Promise<void> {
  console.log('🕐 Iniciando análise de padrões comportamentais...\n');

  // Carregar dados
  const organicData = extractDataFromTS(organicPath, 'organicData') as {
    posts: { feedReels: OrganicPost[]; stories: OrganicPost[] };
    topPerformers: { feedReels: OrganicPost[]; stories: OrganicPost[] };
  };

  const closingData = extractDataFromTS(closingsPath, 'closingData') as {
    summary: {
      monthly: Array<{
        month: string;
        totalProcedures: number;
        totalRevenue: number;
        topServices: Array<{ service: string; count: number; revenue: number }>;
      }>;
    };
    records: Array<{
      date: string;
      procedure: string;
      value: number;
      status: string;
    }>;
  };

  // ============================================
  // ANÁLISE DE POSTS ORGÂNICOS POR DIA DA SEMANA
  // ============================================

  console.log('📅 ANÁLISE POR DIA DA SEMANA');
  console.log('=' .repeat(60));

  const dayStats: Record<string, { posts: number; views: number; engagement: number }> = {};
  DAYS_PT.forEach(day => dayStats[day] = { posts: 0, views: 0, engagement: 0 });

  // Processar Feed/Reels (usar topPerformers que já tem os dados)
  const allPosts = organicData.topPerformers?.feedReels || [];

  allPosts.forEach((post: OrganicPost) => {
    const date = parseDate(post.publishedAt);
    if (!date) return;

    const dayName = DAYS_PT[date.getDay()];
    dayStats[dayName].posts++;
    dayStats[dayName].views += post.metrics.views;
    dayStats[dayName].engagement += post.metrics.likes + post.metrics.comments + post.metrics.shares;
  });

  const dayAnalysis: DayAnalysis[] = DAYS_PT.map(day => ({
    day,
    posts: dayStats[day].posts,
    totalViews: dayStats[day].views,
    avgViews: dayStats[day].posts > 0 ? dayStats[day].views / dayStats[day].posts : 0,
    totalEngagement: dayStats[day].engagement,
    avgEngagement: dayStats[day].posts > 0 ? dayStats[day].engagement / dayStats[day].posts : 0,
  })).sort((a, b) => b.avgViews - a.avgViews);

  console.log('\nDesempenho por dia da semana (Top Performers):\n');
  dayAnalysis.forEach((d, i) => {
    if (d.posts > 0) {
      console.log(`${i + 1}. ${d.day}:`);
      console.log(`   📊 Posts: ${d.posts} | Total Views: ${d.totalViews.toLocaleString()}`);
      console.log(`   📈 Média Views: ${d.avgViews.toLocaleString()} | Engajamento: ${d.totalEngagement}`);
    }
  });

  // ============================================
  // ANÁLISE POR HORÁRIO
  // ============================================

  console.log('\n\n⏰ ANÁLISE POR HORÁRIO DE PUBLICAÇÃO');
  console.log('=' .repeat(60));

  const timeStats: Record<string, { posts: number; views: number }> = {
    'Manhã (6h-12h)': { posts: 0, views: 0 },
    'Tarde (12h-18h)': { posts: 0, views: 0 },
    'Noite (18h-22h)': { posts: 0, views: 0 },
    'Madrugada (22h-6h)': { posts: 0, views: 0 },
  };

  allPosts.forEach((post: OrganicPost) => {
    const date = parseDate(post.publishedAt);
    if (!date) return;

    const slot = getTimeSlot(date.getHours());
    timeStats[slot].posts++;
    timeStats[slot].views += post.metrics.views;
  });

  const timeAnalysis: TimeAnalysis[] = Object.entries(timeStats)
    .map(([slot, data]) => ({
      slot,
      posts: data.posts,
      totalViews: data.views,
      avgViews: data.posts > 0 ? data.views / data.posts : 0,
    }))
    .sort((a, b) => b.avgViews - a.avgViews);

  console.log('\nDesempenho por horário:\n');
  timeAnalysis.forEach((t, i) => {
    if (t.posts > 0) {
      console.log(`${i + 1}. ${t.slot}:`);
      console.log(`   📊 Posts: ${t.posts} | Total Views: ${t.totalViews.toLocaleString()}`);
      console.log(`   📈 Média Views: ${Math.round(t.avgViews).toLocaleString()}`);
    }
  });

  // ============================================
  // ANÁLISE DE FECHAMENTO MENSAL
  // ============================================

  console.log('\n\n📊 ANÁLISE DE FECHAMENTO POR MÊS');
  console.log('=' .repeat(60));

  const monthlyData = closingData.summary.monthly || [];

  console.log('\nEvolução mensal:\n');
  monthlyData.forEach((m, i) => {
    console.log(`${i + 1}. ${m.month}:`);
    console.log(`   📊 Procedimentos: ${m.totalProcedures} | Receita: R$ ${m.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    console.log(`   💰 Ticket Médio: R$ ${(m.totalRevenue / m.totalProcedures).toFixed(2)}`);
    if (m.topServices && m.topServices.length > 0) {
      console.log(`   🏆 Top Serviço: ${m.topServices[0].service} (${m.topServices[0].count}x)`);
    }
  });

  // ============================================
  // INSIGHTS COMPORTAMENTAIS
  // ============================================

  console.log('\n\n💡 INSIGHTS COMPORTAMENTAIS');
  console.log('=' .repeat(60));

  // Melhor dia
  const bestDay = dayAnalysis.find(d => d.posts > 0);
  if (bestDay) {
    console.log(`\n1. 📅 Melhor dia para publicação: ${bestDay.day}`);
    console.log(`   Média de ${bestDay.avgViews.toLocaleString()} views por post`);
  }

  // Melhor horário
  const bestTime = timeAnalysis.find(t => t.posts > 0);
  if (bestTime) {
    console.log(`\n2. ⏰ Melhor horário para publicação: ${bestTime.slot}`);
    console.log(`   Média de ${Math.round(bestTime.avgViews).toLocaleString()} views por post`);
  }

  // Mês mais forte
  const bestMonth = [...monthlyData].sort((a, b) => b.totalRevenue - a.totalRevenue)[0];
  if (bestMonth) {
    console.log(`\n3. 📈 Mês mais forte: ${bestMonth.month}`);
    console.log(`   Receita: R$ ${bestMonth.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  }

  // ============================================
  // SALVAR ANÁLISE
  // ============================================

  const behaviorOutput = {
    generatedAt: new Date().toISOString(),
    dayAnalysis: dayAnalysis.filter(d => d.posts > 0),
    timeAnalysis: timeAnalysis.filter(t => t.posts > 0),
    monthlyPerformance: monthlyData.map(m => ({
      month: m.month,
      procedures: m.totalProcedures,
      revenue: m.totalRevenue,
      ticketMedio: m.totalRevenue / m.totalProcedures,
    })),
    insights: {
      bestDay: bestDay?.day || 'N/A',
      bestTime: bestTime?.slot || 'N/A',
      bestMonth: bestMonth?.month || 'N/A',
    },
  };

  // Atualizar o arquivo analysis.ts existente
  const analysisPath = path.join(__dirname, '../../src/lib/data/analysis.ts');
  let existingContent = fs.readFileSync(analysisPath, 'utf-8');

  // Adicionar behaviorData ao arquivo
  const behaviorExport = `

// Dados de Comportamento - Gerado automaticamente
export const behaviorData = ${JSON.stringify(behaviorOutput, null, 2)} as const;

export const dayAnalysis = behaviorData.dayAnalysis;
export const timeAnalysis = behaviorData.timeAnalysis;
export const monthlyPerformance = behaviorData.monthlyPerformance;
export const behaviorInsights = behaviorData.insights;
`;

  // Verificar se já existe behaviorData
  if (!existingContent.includes('behaviorData')) {
    existingContent += behaviorExport;
    fs.writeFileSync(analysisPath, existingContent);
    console.log(`\n✅ Análise comportamental adicionada ao arquivo: ${analysisPath}`);
  } else {
    console.log(`\n⚠️ behaviorData já existe no arquivo. Pulando atualização.`);
  }
}

// Executar
runBehaviorAnalysis().catch(console.error);
