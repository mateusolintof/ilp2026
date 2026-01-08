/**
 * Script de Extração de Dados de Campanhas Pagas
 *
 * Este script lê os CSVs de performance de campanhas e estrutura
 * os dados separando por tipo (MENSAGEM vs AUDIÊNCIA)
 */

import * as fs from 'fs';
import * as path from 'path';
import { CampaignData, CampaignMetrics, CampaignType, MonthlyComparison } from '../src/types';

const DATA_PATH = path.join(__dirname, '../data/relatorios-pago/performance-campanha');
const OUTPUT_PATH = path.join(__dirname, '../src/lib/data');

// Função para parsear CSV
function parseCSV(content: string): Record<string, string>[] {
  const lines = content.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const data: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.replace(/"/g, '').trim() || '';
    });

    data.push(row);
  }

  return data;
}

// Função para parsear linha CSV (tratando vírgulas dentro de aspas)
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

// Função para converter valor numérico (detecta formato automaticamente)
function parseNumber(value: string): number {
  if (!value || value === '-' || value === '') return 0;

  // Se contém vírgula como decimal (formato brasileiro: 1.234,56)
  if (value.includes(',') && !value.includes('.')) {
    return parseFloat(value.replace(',', '.')) || 0;
  }

  // Se contém ponto seguido de vírgula (1.234,56) - formato brasileiro
  if (value.includes('.') && value.includes(',') && value.indexOf('.') < value.indexOf(',')) {
    return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
  }

  // Caso padrão: formato US/internacional (1234.56 ou 1,234.56)
  return parseFloat(value.replace(/,/g, '')) || 0;
}

// Função para determinar o tipo de campanha pelo nome
function getCampaignType(name: string): CampaignType {
  const upperName = name.toUpperCase();
  if (upperName.includes('MENSAGEM') || upperName.includes('MSG')) {
    return 'MENSAGEM';
  }
  return 'AUDIENCIA';
}

// Função para extrair métricas de uma linha
function extractMetrics(row: Record<string, string>): CampaignMetrics {
  return {
    results: parseNumber(row['Resultados'] || row['Results'] || '0'),
    resultType: row['Indicador de resultados'] || row['Result indicator'] || '',
    costPerResult: parseNumber(row['Custo por resultados'] || row['Cost per result'] || '0'),
    spent: parseNumber(row['Valor usado (BRL)'] || row['Amount spent (BRL)'] || '0'),
    reach: parseNumber(row['Alcance'] || row['Reach'] || '0'),
    impressions: parseNumber(row['Impressões'] || row['Impressions'] || '0'),
    clicks: parseNumber(row['Cliques (todos)'] || row['Clicks (all)'] || '0'),
    linkClicks: parseNumber(row['Cliques no link'] || row['Link clicks'] || '0'),
    cpc: parseNumber(row['CPC (BRL)'] || row['CPC'] || '0'),
    ctr: parseNumber(row['CTR (%)'] || row['CTR'] || '0'),
    cpm: parseNumber(row['CPM (BRL)'] || row['CPM'] || '0'),
    videoViews25: parseNumber(row['Reproduções de 25% do vídeo'] || '0'),
    videoViews100: parseNumber(row['Reproduções de 100% do vídeo'] || '0'),
    conversationsStarted: parseNumber(row['Conversas por mensagem iniciadas'] || '0'),
    profileVisits: parseNumber(row['Visitas ao perfil do Instagram'] || '0'),
  };
}

// Função para processar um arquivo CSV
function processCampaignFile(filePath: string): CampaignData[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content);
  const campaigns: CampaignData[] = [];

  for (const row of rows) {
    const campaignName = row['Nome da campanha'] || row['Campaign name'] || '';
    if (!campaignName) continue;

    const campaign: CampaignData = {
      id: `campaign-${campaigns.length + 1}`,
      name: campaignName,
      type: getCampaignType(campaignName),
      period: {
        start: row['Início dos relatórios'] || row['Report start'] || '',
        end: row['Término dos relatórios'] || row['Report end'] || '',
      },
      status: (row['Veiculação da campanha'] || '').toLowerCase() as 'active' | 'inactive',
      budget: parseNumber(row['Orçamento do conjunto de anúncios'] || '0'),
      budgetType: (row['Tipo de orçamento'] || '').toLowerCase().includes('diário') ? 'daily' : 'total',
      metrics: extractMetrics(row),
    };

    campaigns.push(campaign);
  }

  return campaigns;
}

// Função principal de extração
async function extractCampaigns(): Promise<void> {
  console.log('🚀 Iniciando extração de dados de campanhas...\n');

  const allCampaigns: CampaignData[] = [];
  const files = fs.readdirSync(DATA_PATH).filter(f => f.endsWith('.csv'));

  console.log(`📁 Arquivos encontrados: ${files.length}`);

  for (const file of files) {
    const filePath = path.join(DATA_PATH, file);
    console.log(`  📄 Processando: ${file}`);

    const campaigns = processCampaignFile(filePath);
    allCampaigns.push(...campaigns);

    console.log(`     ✓ ${campaigns.length} campanhas extraídas`);
  }

  // Separar por tipo
  const mensagemCampaigns = allCampaigns.filter(c => c.type === 'MENSAGEM');
  const audienciaCampaigns = allCampaigns.filter(c => c.type === 'AUDIENCIA');

  console.log(`\n📊 Total de campanhas:`);
  console.log(`   - MENSAGEM: ${mensagemCampaigns.length}`);
  console.log(`   - AUDIENCIA: ${audienciaCampaigns.length}`);

  // Calcular métricas consolidadas
  const consolidateMetrics = (campaigns: CampaignData[]): CampaignMetrics => {
    return campaigns.reduce((acc, campaign) => ({
      results: acc.results + campaign.metrics.results,
      resultType: campaign.metrics.resultType,
      costPerResult: 0, // Será calculado depois
      spent: acc.spent + campaign.metrics.spent,
      reach: acc.reach + campaign.metrics.reach,
      impressions: acc.impressions + campaign.metrics.impressions,
      clicks: acc.clicks + campaign.metrics.clicks,
      linkClicks: acc.linkClicks + campaign.metrics.linkClicks,
      cpc: 0, // Será calculado depois
      ctr: 0, // Será calculado depois
      cpm: 0, // Será calculado depois
      videoViews25: (acc.videoViews25 || 0) + (campaign.metrics.videoViews25 || 0),
      videoViews100: (acc.videoViews100 || 0) + (campaign.metrics.videoViews100 || 0),
      conversationsStarted: (acc.conversationsStarted || 0) + (campaign.metrics.conversationsStarted || 0),
      profileVisits: (acc.profileVisits || 0) + (campaign.metrics.profileVisits || 0),
    }), {
      results: 0, resultType: '', costPerResult: 0, spent: 0, reach: 0,
      impressions: 0, clicks: 0, linkClicks: 0, cpc: 0, ctr: 0, cpm: 0,
      videoViews25: 0, videoViews100: 0, conversationsStarted: 0, profileVisits: 0,
    } as CampaignMetrics);
  };

  const mensagemConsolidated = consolidateMetrics(mensagemCampaigns);
  mensagemConsolidated.costPerResult = mensagemConsolidated.results > 0
    ? mensagemConsolidated.spent / mensagemConsolidated.results
    : 0;
  mensagemConsolidated.ctr = mensagemConsolidated.impressions > 0
    ? (mensagemConsolidated.clicks / mensagemConsolidated.impressions) * 100
    : 0;
  mensagemConsolidated.cpc = mensagemConsolidated.clicks > 0
    ? mensagemConsolidated.spent / mensagemConsolidated.clicks
    : 0;

  const audienciaConsolidated = consolidateMetrics(audienciaCampaigns);
  audienciaConsolidated.costPerResult = audienciaConsolidated.results > 0
    ? audienciaConsolidated.spent / audienciaConsolidated.results
    : 0;
  audienciaConsolidated.ctr = audienciaConsolidated.impressions > 0
    ? (audienciaConsolidated.clicks / audienciaConsolidated.impressions) * 100
    : 0;
  audienciaConsolidated.cpc = audienciaConsolidated.clicks > 0
    ? audienciaConsolidated.spent / audienciaConsolidated.clicks
    : 0;

  // Criar diretório de saída se não existir
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  // Salvar dados estruturados
  const outputData = {
    extractedAt: new Date().toISOString(),
    summary: {
      totalCampaigns: allCampaigns.length,
      mensagem: {
        count: mensagemCampaigns.length,
        consolidated: mensagemConsolidated,
      },
      audiencia: {
        count: audienciaCampaigns.length,
        consolidated: audienciaConsolidated,
      },
    },
    campaigns: {
      mensagem: mensagemCampaigns,
      audiencia: audienciaCampaigns,
    },
  };

  const outputFile = path.join(OUTPUT_PATH, 'campaigns.ts');
  const tsContent = `// Dados de Campanhas Pagas - Gerado automaticamente
// Última atualização: ${new Date().toISOString()}

import { CampaignData, CampaignMetrics } from '@/types';

export const campaignData = ${JSON.stringify(outputData, null, 2)} as const;

export const mensagemCampaigns: CampaignData[] = campaignData.campaigns.mensagem;
export const audienciaCampaigns: CampaignData[] = campaignData.campaigns.audiencia;

export const mensagemSummary = campaignData.summary.mensagem;
export const audienciaSummary = campaignData.summary.audiencia;
`;

  fs.writeFileSync(outputFile, tsContent);
  console.log(`\n✅ Dados salvos em: ${outputFile}`);

  // Resumo final
  console.log('\n📈 RESUMO CONSOLIDADO:');
  console.log('\n   MENSAGEM (WhatsApp):');
  console.log(`   - Investimento Total: R$ ${mensagemConsolidated.spent.toFixed(2)}`);
  console.log(`   - Conversas Iniciadas: ${mensagemConsolidated.results}`);
  console.log(`   - Custo por Conversa: R$ ${mensagemConsolidated.costPerResult.toFixed(2)}`);
  console.log(`   - CTR: ${mensagemConsolidated.ctr.toFixed(2)}%`);

  console.log('\n   AUDIÊNCIA (Instagram):');
  console.log(`   - Investimento Total: R$ ${audienciaConsolidated.spent.toFixed(2)}`);
  console.log(`   - Visitas ao Perfil: ${audienciaConsolidated.results}`);
  console.log(`   - Custo por Visita: R$ ${audienciaConsolidated.costPerResult.toFixed(2)}`);
  console.log(`   - CTR: ${audienciaConsolidated.ctr.toFixed(2)}%`);
}

// Executar
extractCampaigns().catch(console.error);
