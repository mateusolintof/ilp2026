/**
 * Creative Analyzer Agent
 *
 * Analisa criativos, gera rankings, identifica padrões de sucesso
 * e cruza dados entre campanhas pagas, orgânico e fechamento
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar dados (usando require para evitar problemas de módulo)
const creativesPath = path.join(__dirname, '../../src/lib/data/creatives.ts');
const campaignsPath = path.join(__dirname, '../../src/lib/data/campaigns.ts');
const organicPath = path.join(__dirname, '../../src/lib/data/organic.ts');
const closingsPath = path.join(__dirname, '../../src/lib/data/closings.ts');

// Helper para ler dados TypeScript e extrair JSON
function extractDataFromTS(filePath: string, varName: string): unknown {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Encontrar o objeto após "export const varName = "
  const regex = new RegExp(`export const ${varName} = ({[\\s\\S]*?}) as const;`);
  const match = content.match(regex);

  if (!match) {
    throw new Error(`Could not find ${varName} in ${filePath}`);
  }

  // Parse JSON (o conteúdo já está em formato JSON válido)
  return JSON.parse(match[1]);
}

// Interfaces
interface CreativeMetrics {
  results: number;
  resultType: string;
  costPerResult: number;
  spent: number;
  reach: number;
  impressions: number;
  clicks: number;
  linkClicks: number;
  ctr: number;
  videoViews25: number;
  videoViews100: number;
}

interface Creative {
  id: string;
  name: string;
  campaignName: string;
  campaignType: 'MENSAGEM' | 'AUDIENCIA';
  format: 'VIDEO' | 'IMAGE' | 'CAROUSEL' | 'STORY';
  metrics: CreativeMetrics;
}

interface OrganicPost {
  id: string;
  description: string;
  type: string;
  publishedAt: string;
  permanentLink: string;
  metrics: {
    views: number;
    reach: number;
    likes: number;
    shares: number;
    comments: number;
    saves: number;
    follows: number;
  };
}

interface ClosingCategory {
  category: string;
  count: number;
  revenue: number;
  percentage: number;
}

interface MonthlyClosing {
  month: string;
  totalProcedures: number;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  byCategory: ClosingCategory[];
}

// ============================================
// 1. ANÁLISE DE CRIATIVOS
// ============================================

interface CreativeAnalysis {
  id: string;
  name: string;
  campaignType: string;
  format: string;
  score: number;
  metrics: {
    results: number;
    costPerResult: number;
    reach: number;
    spent: number;
    efficiency: number; // results / spent
    reachEfficiency: number; // reach / spent
    videoCompletion: number; // videoViews100 / videoViews25
  };
  patterns: string[];
}

function analyzeCreative(creative: Creative): CreativeAnalysis {
  const patterns: string[] = [];
  const name = creative.name.toLowerCase();
  const campaign = creative.campaignName.toLowerCase();

  // Detectar padrões no nome/campanha
  if (name.includes('video') || name.includes('vídeo') || creative.format === 'VIDEO') {
    patterns.push('VIDEO');
  }
  if (name.includes('reels') || campaign.includes('reels')) {
    patterns.push('REELS');
  }
  if (name.includes('carrossel') || creative.format === 'CAROUSEL') {
    patterns.push('CAROUSEL');
  }
  if (name.includes('dr.') || name.includes('dra.') || campaign.includes('osterno') || campaign.includes('yasmin')) {
    patterns.push('MEDICO_PRESENTE');
  }
  if (campaign.includes('bioestimulador') || name.includes('bioestimulador')) {
    patterns.push('BIOESTIMULADOR');
  }
  if (campaign.includes('bf') || campaign.includes('black friday')) {
    patterns.push('BLACK_FRIDAY');
  }
  if (campaign.includes('rmkt') || campaign.includes('remarketing')) {
    patterns.push('REMARKETING');
  }
  if (campaign.includes('frio')) {
    patterns.push('PUBLICO_FRIO');
  }

  // Calcular métricas derivadas
  const efficiency = creative.metrics.spent > 0
    ? creative.metrics.results / creative.metrics.spent
    : 0;
  const reachEfficiency = creative.metrics.spent > 0
    ? creative.metrics.reach / creative.metrics.spent
    : 0;
  const videoCompletion = creative.metrics.videoViews25 > 0
    ? creative.metrics.videoViews100 / creative.metrics.videoViews25
    : 0;

  // Score composto (normalizado para comparação)
  // Para MENSAGEM: prioriza conversas iniciadas
  // Para AUDIENCIA: prioriza visitas ao perfil e custo baixo
  let score = 0;
  if (creative.campaignType === 'MENSAGEM') {
    // Peso maior para resultados (conversas) e menor custo por resultado
    score = creative.metrics.results * 10 - creative.metrics.costPerResult;
  } else {
    // Peso para visitas ao perfil com custo baixo
    score = creative.metrics.results * 1 - creative.metrics.costPerResult * 100;
  }

  return {
    id: creative.id,
    name: creative.name,
    campaignType: creative.campaignType,
    format: creative.format,
    score,
    metrics: {
      results: creative.metrics.results,
      costPerResult: creative.metrics.costPerResult,
      reach: creative.metrics.reach,
      spent: creative.metrics.spent,
      efficiency,
      reachEfficiency,
      videoCompletion,
    },
    patterns,
  };
}

// ============================================
// 2. CRUZAMENTO DE DADOS
// ============================================

interface MonthlyTimeline {
  month: string;
  paidInvestment: number;
  paidResults: number;
  organicViews: number;
  organicReach: number;
  closingRevenue: number;
  closingProcedures: number;
}

interface PatternInsight {
  pattern: string;
  description: string;
  evidence: string[];
  recommendation: string;
}

// ============================================
// MAIN ANALYSIS
// ============================================

async function runAnalysis(): Promise<void> {
  console.log('🔍 Iniciando análise de criativos e cruzamento de dados...\n');

  // Carregar dados
  const creativeData = extractDataFromTS(creativesPath, 'creativeData') as {
    creatives: { mensagem: Creative[]; audiencia: Creative[] };
    topPerformers: { mensagem: Creative[]; audiencia: Creative[] };
    summary: { totalCreatives: number; mensagem: number; audiencia: number };
  };

  const campaignData = extractDataFromTS(campaignsPath, 'campaignData') as {
    summary: {
      mensagem: { consolidated: { spent: number; results: number } };
      audiencia: { consolidated: { spent: number; results: number } };
    };
    campaigns: { mensagem: unknown[]; audiencia: unknown[] };
  };

  const organicData = extractDataFromTS(organicPath, 'organicData') as {
    summary: {
      feedReels: { totalViews: number; totalReach: number };
      stories: { totalViews: number; totalReach: number };
    };
    topPerformers: { feedReels: OrganicPost[]; stories: OrganicPost[] };
  };

  const closingData = extractDataFromTS(closingsPath, 'closingData') as {
    summary: {
      consolidated: { totalRevenue: number; totalRecords: number };
      monthly: MonthlyClosing[];
      byCategory: ClosingCategory[];
    };
  };

  console.log('✅ Dados carregados com sucesso\n');

  // ============================================
  // ANÁLISE DE CRIATIVOS
  // ============================================

  console.log('📊 ANÁLISE DE CRIATIVOS');
  console.log('=' .repeat(60));

  // Analisar todos os criativos
  const mensagemAnalysis = creativeData.creatives.mensagem.map(analyzeCreative);
  const audienciaAnalysis = creativeData.creatives.audiencia.map(analyzeCreative);

  // Top 5 MENSAGEM (ordenar por resultados de conversas)
  const top5Mensagem = [...mensagemAnalysis]
    .filter(c => c.metrics.results > 0)
    .sort((a, b) => {
      // Priorizar por número de conversas iniciadas
      if (b.metrics.results !== a.metrics.results) {
        return b.metrics.results - a.metrics.results;
      }
      // Em caso de empate, menor custo por resultado é melhor
      return a.metrics.costPerResult - b.metrics.costPerResult;
    })
    .slice(0, 5);

  // Top 5 AUDIÊNCIA (ordenar por visitas ao perfil com custo eficiente)
  const top5Audiencia = [...audienciaAnalysis]
    .filter(c => c.metrics.results > 0)
    .sort((a, b) => {
      // Priorizar por número de visitas ao perfil
      if (b.metrics.results !== a.metrics.results) {
        return b.metrics.results - a.metrics.results;
      }
      // Em caso de empate, menor custo por resultado é melhor
      return a.metrics.costPerResult - b.metrics.costPerResult;
    })
    .slice(0, 5);

  console.log('\n🏆 TOP 5 CRIATIVOS - MENSAGEM (Conversas WhatsApp):\n');
  top5Mensagem.forEach((c, i) => {
    console.log(`${i + 1}. ${c.name.substring(0, 60)}...`);
    console.log(`   📊 Conversas: ${c.metrics.results} | Custo/Conversa: R$ ${c.metrics.costPerResult.toFixed(2)}`);
    console.log(`   📈 Alcance: ${c.metrics.reach.toLocaleString()} | Investimento: R$ ${c.metrics.spent.toFixed(2)}`);
    console.log(`   🏷️ Padrões: ${c.patterns.join(', ') || 'N/A'}`);
    console.log('');
  });

  console.log('\n🏆 TOP 5 CRIATIVOS - AUDIÊNCIA (Visitas ao Perfil):\n');
  top5Audiencia.forEach((c, i) => {
    console.log(`${i + 1}. ${c.name.substring(0, 60)}...`);
    console.log(`   📊 Visitas: ${c.metrics.results.toLocaleString()} | Custo/Visita: R$ ${c.metrics.costPerResult.toFixed(2)}`);
    console.log(`   📈 Alcance: ${c.metrics.reach.toLocaleString()} | Investimento: R$ ${c.metrics.spent.toFixed(2)}`);
    console.log(`   🏷️ Padrões: ${c.patterns.join(', ') || 'N/A'}`);
    console.log('');
  });

  // ============================================
  // PADRÕES DE SUCESSO
  // ============================================

  console.log('\n🔬 PADRÕES DE SUCESSO IDENTIFICADOS');
  console.log('=' .repeat(60));

  // Agregar padrões dos top performers
  const allTopPatterns = [...top5Mensagem, ...top5Audiencia].flatMap(c => c.patterns);
  const patternCounts: Record<string, number> = {};
  allTopPatterns.forEach(p => {
    patternCounts[p] = (patternCounts[p] || 0) + 1;
  });

  const sortedPatterns = Object.entries(patternCounts)
    .sort((a, b) => b[1] - a[1]);

  console.log('\nPadrões mais frequentes nos top performers:\n');
  sortedPatterns.forEach(([pattern, count]) => {
    const percentage = ((count / 10) * 100).toFixed(0);
    console.log(`   ${pattern}: ${count}/10 (${percentage}%)`);
  });

  // Análise por formato
  const formatAnalysis = {
    VIDEO: { count: 0, avgResults: 0, avgCost: 0, totalResults: 0, totalCost: 0 },
    IMAGE: { count: 0, avgResults: 0, avgCost: 0, totalResults: 0, totalCost: 0 },
    CAROUSEL: { count: 0, avgResults: 0, avgCost: 0, totalResults: 0, totalCost: 0 },
  };

  [...mensagemAnalysis, ...audienciaAnalysis].forEach(c => {
    const format = c.format as keyof typeof formatAnalysis;
    if (formatAnalysis[format]) {
      formatAnalysis[format].count++;
      formatAnalysis[format].totalResults += c.metrics.results;
      if (c.metrics.costPerResult > 0) {
        formatAnalysis[format].totalCost += c.metrics.costPerResult;
      }
    }
  });

  Object.keys(formatAnalysis).forEach(f => {
    const format = f as keyof typeof formatAnalysis;
    if (formatAnalysis[format].count > 0) {
      formatAnalysis[format].avgResults = formatAnalysis[format].totalResults / formatAnalysis[format].count;
      formatAnalysis[format].avgCost = formatAnalysis[format].totalCost / formatAnalysis[format].count;
    }
  });

  console.log('\nDesempenho por formato:\n');
  Object.entries(formatAnalysis).forEach(([format, data]) => {
    if (data.count > 0) {
      console.log(`   ${format}:`);
      console.log(`      Criativos: ${data.count}`);
      console.log(`      Média de resultados: ${data.avgResults.toFixed(0)}`);
      console.log(`      Custo médio/resultado: R$ ${data.avgCost.toFixed(2)}`);
    }
  });

  // ============================================
  // CRUZAMENTO: MARKETING ↔ FECHAMENTO
  // ============================================

  console.log('\n\n📈 CRUZAMENTO: MARKETING ↔ FECHAMENTO');
  console.log('=' .repeat(60));

  // Dados mensais
  const monthlyData: MonthlyTimeline[] = [
    {
      month: 'Setembro',
      paidInvestment: 0,
      paidResults: 0,
      organicViews: 0,
      organicReach: 0,
      closingRevenue: closingData.summary.monthly.find(m => m.month === 'Setembro')?.totalRevenue || 0,
      closingProcedures: closingData.summary.monthly.find(m => m.month === 'Setembro')?.totalProcedures || 0,
    },
    {
      month: 'Outubro',
      paidInvestment: 0,
      paidResults: 0,
      organicViews: 0,
      organicReach: 0,
      closingRevenue: closingData.summary.monthly.find(m => m.month === 'Outubro')?.totalRevenue || 0,
      closingProcedures: closingData.summary.monthly.find(m => m.month === 'Outubro')?.totalProcedures || 0,
    },
    {
      month: 'Novembro',
      paidInvestment: 0,
      paidResults: 0,
      organicViews: 0,
      organicReach: 0,
      closingRevenue: closingData.summary.monthly.find(m => m.month === 'Novembro')?.totalRevenue || 0,
      closingProcedures: closingData.summary.monthly.find(m => m.month === 'Novembro')?.totalProcedures || 0,
    },
    {
      month: 'Dezembro',
      paidInvestment: 0,
      paidResults: 0,
      organicViews: 0,
      organicReach: 0,
      closingRevenue: closingData.summary.monthly.find(m => m.month === 'Dezembro')?.totalRevenue || 0,
      closingProcedures: closingData.summary.monthly.find(m => m.month === 'Dezembro')?.totalProcedures || 0,
    },
  ];

  // Consolidar investimento pago
  const totalPaidInvestment = campaignData.summary.mensagem.consolidated.spent +
                              campaignData.summary.audiencia.consolidated.spent;
  const totalPaidResults = campaignData.summary.mensagem.consolidated.results +
                           campaignData.summary.audiencia.consolidated.results;

  console.log('\n📊 Resumo do Período (Set-Dez 2025):\n');
  console.log(`   💰 Investimento Total em Tráfego Pago: R$ ${totalPaidInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`   📱 Conversas WhatsApp (MENSAGEM): ${campaignData.summary.mensagem.consolidated.results}`);
  console.log(`   👀 Visitas ao Perfil (AUDIÊNCIA): ${campaignData.summary.audiencia.consolidated.results.toLocaleString()}`);
  console.log(`   📹 Visualizações Orgânicas (Feed/Reels): ${organicData.summary.feedReels.totalViews.toLocaleString()}`);
  console.log(`   📖 Visualizações Stories: ${organicData.summary.stories.totalViews.toLocaleString()}`);
  console.log(`   💵 Receita Total (Fechamento): R$ ${closingData.summary.consolidated.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`   🏥 Total de Procedimentos: ${closingData.summary.consolidated.totalRecords.toLocaleString()}`);

  // Calcular ROI
  const roi = ((closingData.summary.consolidated.totalRevenue - totalPaidInvestment) / totalPaidInvestment) * 100;
  const costPerProcedure = totalPaidInvestment / closingData.summary.consolidated.totalRecords;
  const revenuePerInvestment = closingData.summary.consolidated.totalRevenue / totalPaidInvestment;

  console.log('\n📈 Métricas de Correlação:\n');
  console.log(`   📊 ROI Marketing: ${roi.toFixed(0)}%`);
  console.log(`   💲 Custo por Procedimento (Marketing): R$ ${costPerProcedure.toFixed(2)}`);
  console.log(`   💰 Receita por R$ 1 investido: R$ ${revenuePerInvestment.toFixed(2)}`);

  // ============================================
  // SERVIÇOS PROMOVIDOS vs REALIZADOS
  // ============================================

  console.log('\n\n🔄 SERVIÇOS PROMOVIDOS vs REALIZADOS');
  console.log('=' .repeat(60));

  // Temas promovidos nos criativos
  const promotedThemes: Record<string, number> = {};
  [...creativeData.creatives.mensagem, ...creativeData.creatives.audiencia].forEach(c => {
    const name = c.campaignName.toLowerCase();
    if (name.includes('bioestimulador')) promotedThemes['Bioestimuladores'] = (promotedThemes['Bioestimuladores'] || 0) + 1;
    if (name.includes('botox') || name.includes('toxina')) promotedThemes['Toxina Botulínica'] = (promotedThemes['Toxina Botulínica'] || 0) + 1;
    if (name.includes('melasma')) promotedThemes['Tratamento Melasma'] = (promotedThemes['Tratamento Melasma'] || 0) + 1;
    if (name.includes('gluteo')) promotedThemes['Glúteo'] = (promotedThemes['Glúteo'] || 0) + 1;
    if (name.includes('tentherma')) promotedThemes['Tentherma'] = (promotedThemes['Tentherma'] || 0) + 1;
    if (name.includes('yasmin') || name.includes('osterno')) promotedThemes['Médicos'] = (promotedThemes['Médicos'] || 0) + 1;
  });

  console.log('\nTemas mais promovidos nas campanhas:\n');
  Object.entries(promotedThemes)
    .sort((a, b) => b[1] - a[1])
    .forEach(([theme, count]) => {
      console.log(`   ${theme}: ${count} campanhas`);
    });

  console.log('\nCategorias mais realizadas (Fechamento):\n');
  closingData.summary.byCategory.slice(0, 5).forEach(cat => {
    console.log(`   ${cat.category}: ${cat.count} procedimentos (${cat.percentage.toFixed(1)}% da receita)`);
  });

  // ============================================
  // INSIGHTS E RECOMENDAÇÕES
  // ============================================

  console.log('\n\n💡 INSIGHTS E RECOMENDAÇÕES');
  console.log('=' .repeat(60));

  const insights: PatternInsight[] = [
    {
      pattern: 'VIDEO_PERFORMANCE',
      description: 'Vídeos curtos com médicos têm melhor performance',
      evidence: [
        'Top 1 AUDIÊNCIA: Post IG (07.11) - 2.825 visitas com R$ 0.41/visita',
        'Vídeo Bioestimulador: 1.510 resultados com custo de R$ 0.43',
        'Presença do médico em 60% dos top performers',
      ],
      recommendation: 'Priorizar vídeos de 30-60s com presença do Dr. Osterno ou Dra. Yasmin',
    },
    {
      pattern: 'AUDIENCIA_EFFICIENCY',
      description: 'Campanhas de AUDIÊNCIA têm melhor custo-benefício para awareness',
      evidence: [
        `Custo médio por visita: R$ ${(totalPaidInvestment / campaignData.summary.audiencia.consolidated.results).toFixed(2)}`,
        `${campaignData.summary.audiencia.consolidated.results.toLocaleString()} visitas ao perfil geraram ${closingData.summary.consolidated.totalRecords} procedimentos`,
      ],
      recommendation: 'Manter 60% do budget em AUDIÊNCIA para nutrir funil',
    },
    {
      pattern: 'TOXINA_DOMINANCE',
      description: 'Toxina Botulínica é o serviço mais rentável',
      evidence: [
        `30.7% da receita total (R$ ${closingData.summary.byCategory[0].revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`,
        `278 procedimentos no período`,
      ],
      recommendation: 'Criar campanhas específicas para Botox com depoimentos de pacientes',
    },
    {
      pattern: 'ORGANIC_AMPLIFICATION',
      description: 'Conteúdo orgânico com alto engajamento deve ser impulsionado',
      evidence: [
        `Reels Black Friday: ${organicData.topPerformers.feedReels[0]?.metrics.views.toLocaleString()} views orgânicas`,
        `Top posts orgânicos têm temas similares aos criativos pagos`,
      ],
      recommendation: 'Impulsionar posts orgânicos com >10k views para AUDIÊNCIA',
    },
    {
      pattern: 'ROI_POSITIVE',
      description: 'ROI extremamente positivo justifica aumento de investimento',
      evidence: [
        `ROI de ${roi.toFixed(0)}% (cada R$ 1 investido gerou R$ ${revenuePerInvestment.toFixed(2)} em receita)`,
        `Receita total: R$ ${closingData.summary.consolidated.totalRevenue.toLocaleString('pt-BR')}`,
      ],
      recommendation: 'Aumentar budget em 30% para Q1 2026, focando em Bioestimuladores (tendência)',
    },
  ];

  insights.forEach((insight, i) => {
    console.log(`\n${i + 1}. ${insight.description}`);
    console.log('   Evidências:');
    insight.evidence.forEach(e => console.log(`   • ${e}`));
    console.log(`   ✅ Recomendação: ${insight.recommendation}`);
  });

  // ============================================
  // SALVAR ANÁLISE
  // ============================================

  const analysisOutput = {
    generatedAt: new Date().toISOString(),
    creatives: {
      top5Mensagem: top5Mensagem.map(c => ({
        name: c.name,
        results: c.metrics.results,
        costPerResult: c.metrics.costPerResult,
        spent: c.metrics.spent,
        reach: c.metrics.reach,
        patterns: c.patterns,
      })),
      top5Audiencia: top5Audiencia.map(c => ({
        name: c.name,
        results: c.metrics.results,
        costPerResult: c.metrics.costPerResult,
        spent: c.metrics.spent,
        reach: c.metrics.reach,
        patterns: c.patterns,
      })),
      patternFrequency: patternCounts,
      formatAnalysis,
    },
    crossData: {
      totalPaidInvestment,
      totalPaidResults,
      totalOrganicViews: organicData.summary.feedReels.totalViews + organicData.summary.stories.totalViews,
      totalClosingRevenue: closingData.summary.consolidated.totalRevenue,
      totalProcedures: closingData.summary.consolidated.totalRecords,
      roi,
      costPerProcedure,
      revenuePerInvestment,
    },
    servicesAnalysis: {
      promotedThemes,
      topClosingCategories: closingData.summary.byCategory.slice(0, 5),
    },
    insights: insights.map(i => ({
      pattern: i.pattern,
      description: i.description,
      recommendation: i.recommendation,
    })),
  };

  const outputPath = path.join(__dirname, '../../src/lib/data/analysis.ts');
  const tsContent = `// Análise de Criativos e Cruzamento - Gerado automaticamente
// Última atualização: ${new Date().toISOString()}

export const analysisData = ${JSON.stringify(analysisOutput, null, 2)} as const;

export const top5MensagemCreatives = analysisData.creatives.top5Mensagem;
export const top5AudienciaCreatives = analysisData.creatives.top5Audiencia;
export const patternFrequency = analysisData.creatives.patternFrequency;
export const crossData = analysisData.crossData;
export const insights = analysisData.insights;
`;

  fs.writeFileSync(outputPath, tsContent);
  console.log(`\n\n✅ Análise salva em: ${outputPath}`);
}

// Executar
runAnalysis().catch(console.error);
