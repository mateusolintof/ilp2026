/**
 * Script de Extração de Dados de Criativos
 *
 * Este script lê os arquivos Excel de performance de criativos
 * e estrutura os dados para análise
 */

import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { CreativeData, CreativeMetrics, CampaignType, CreativeFormat } from '../src/types';

const DATA_PATH = path.join(__dirname, '../data/relatorios-pago/performance-criativos');
const OUTPUT_PATH = path.join(__dirname, '../src/lib/data');

// Função para converter valor numérico (detecta formato automaticamente)
function parseNumber(value: unknown): number {
  if (value === null || value === undefined || value === '-' || value === '') return 0;
  if (typeof value === 'number') return value;

  const str = String(value);

  // Se contém vírgula como decimal (formato brasileiro: 1.234,56)
  if (str.includes(',') && !str.includes('.')) {
    return parseFloat(str.replace(',', '.')) || 0;
  }

  // Se contém ponto seguido de vírgula (1.234,56) - formato brasileiro
  if (str.includes('.') && str.includes(',') && str.indexOf('.') < str.indexOf(',')) {
    return parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0;
  }

  // Caso padrão: formato US/internacional (1234.56 ou 1,234.56)
  return parseFloat(str.replace(/,/g, '')) || 0;
}

// Função para determinar o tipo de campanha pelo nome do arquivo
function getCampaignTypeFromFile(fileName: string): CampaignType {
  const upperName = fileName.toUpperCase();
  if (upperName.includes('MSG') || upperName.includes('MENSAGEM')) {
    return 'MENSAGEM';
  }
  return 'AUDIENCIA';
}

// Função para determinar o formato do criativo pelo nome
function getCreativeFormat(name: string): CreativeFormat {
  const upperName = name.toUpperCase();
  if (upperName.includes('VIDEO') || upperName.includes('VÍDEO')) return 'VIDEO';
  if (upperName.includes('CARROSSEL') || upperName.includes('CAROUSEL')) return 'CAROUSEL';
  if (upperName.includes('STORY') || upperName.includes('STORIES')) return 'STORY';
  return 'IMAGE';
}

// Função para extrair métricas de uma linha
function extractCreativeMetrics(row: Record<string, unknown>): CreativeMetrics {
  return {
    results: parseNumber(row['Resultados'] || row['Results']),
    resultType: String(row['Tipo de resultado'] || row['Result type'] || ''),
    costPerResult: parseNumber(row['Custo por resultado'] || row['Cost per result']),
    spent: parseNumber(row['Valor usado (BRL)'] || row['Amount spent (BRL)']),
    reach: parseNumber(row['Alcance'] || row['Reach']),
    impressions: parseNumber(row['Impressões'] || row['Impressions']),
    clicks: parseNumber(row['Cliques (todos)'] || row['Clicks (all)']),
    linkClicks: parseNumber(row['Cliques no link'] || row['Link clicks']),
    ctr: parseNumber(row['CTR (%)'] || row['CTR']),
    videoViews25: parseNumber(row['Reproduções de 25% do vídeo']),
    videoViews100: parseNumber(row['Reproduções de 100% do vídeo']),
  };
}

// Função para processar um arquivo Excel
function processCreativeFile(filePath: string, fileName: string): CreativeData[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

  const creatives: CreativeData[] = [];
  const campaignType = getCampaignTypeFromFile(fileName);

  for (const row of data) {
    const creativeName = String(row['Anúncios'] || row['Ads'] || '');
    const campaignName = String(row['Nome da campanha'] || row['Campaign name'] || '');

    if (!creativeName) continue;

    const creative: CreativeData = {
      id: `creative-${creatives.length + 1}-${fileName.replace('.xlsx', '')}`,
      name: creativeName,
      campaignName: campaignName,
      campaignType: campaignType,
      format: getCreativeFormat(creativeName),
      metrics: extractCreativeMetrics(row),
    };

    creatives.push(creative);
  }

  return creatives;
}

// Função principal de extração
async function extractCreatives(): Promise<void> {
  console.log('🚀 Iniciando extração de dados de criativos...\n');

  const allCreatives: CreativeData[] = [];
  const files = fs.readdirSync(DATA_PATH).filter(f => f.endsWith('.xlsx'));

  console.log(`📁 Arquivos encontrados: ${files.length}`);

  for (const file of files) {
    const filePath = path.join(DATA_PATH, file);
    console.log(`  📄 Processando: ${file}`);

    try {
      const creatives = processCreativeFile(filePath, file);
      allCreatives.push(...creatives);
      console.log(`     ✓ ${creatives.length} criativos extraídos`);
    } catch (error) {
      console.log(`     ✗ Erro ao processar: ${error}`);
    }
  }

  // Separar por tipo de campanha
  const mensagemCreatives = allCreatives.filter(c => c.campaignType === 'MENSAGEM');
  const audienciaCreatives = allCreatives.filter(c => c.campaignType === 'AUDIENCIA');

  console.log(`\n📊 Total de criativos:`);
  console.log(`   - MENSAGEM: ${mensagemCreatives.length}`);
  console.log(`   - AUDIENCIA: ${audienciaCreatives.length}`);

  // Ordenar por resultados (top performers)
  const sortByResults = (a: CreativeData, b: CreativeData) => b.metrics.results - a.metrics.results;

  const topMensagem = [...mensagemCreatives].sort(sortByResults).slice(0, 10);
  const topAudiencia = [...audienciaCreatives].sort(sortByResults).slice(0, 10);

  // Criar diretório de saída se não existir
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  // Salvar dados estruturados
  const outputData = {
    extractedAt: new Date().toISOString(),
    summary: {
      totalCreatives: allCreatives.length,
      mensagem: mensagemCreatives.length,
      audiencia: audienciaCreatives.length,
      byFormat: {
        video: allCreatives.filter(c => c.format === 'VIDEO').length,
        carousel: allCreatives.filter(c => c.format === 'CAROUSEL').length,
        image: allCreatives.filter(c => c.format === 'IMAGE').length,
        story: allCreatives.filter(c => c.format === 'STORY').length,
      },
    },
    topPerformers: {
      mensagem: topMensagem,
      audiencia: topAudiencia,
    },
    creatives: {
      mensagem: mensagemCreatives,
      audiencia: audienciaCreatives,
    },
  };

  const outputFile = path.join(OUTPUT_PATH, 'creatives.ts');
  const tsContent = `// Dados de Criativos - Gerado automaticamente
// Última atualização: ${new Date().toISOString()}

import { CreativeData } from '@/types';

export const creativeData = ${JSON.stringify(outputData, null, 2)} as const;

export const mensagemCreatives: CreativeData[] = creativeData.creatives.mensagem;
export const audienciaCreatives: CreativeData[] = creativeData.creatives.audiencia;

export const topMensagemCreatives = creativeData.topPerformers.mensagem;
export const topAudienciaCreatives = creativeData.topPerformers.audiencia;

export const creativeSummary = creativeData.summary;
`;

  fs.writeFileSync(outputFile, tsContent);
  console.log(`\n✅ Dados salvos em: ${outputFile}`);

  // Resumo dos top performers
  console.log('\n🏆 TOP 5 CRIATIVOS - MENSAGEM:');
  topMensagem.slice(0, 5).forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.name.substring(0, 50)}...`);
    console.log(`      Resultados: ${c.metrics.results} | Custo/Resultado: R$ ${c.metrics.costPerResult.toFixed(2)}`);
  });

  console.log('\n🏆 TOP 5 CRIATIVOS - AUDIÊNCIA:');
  topAudiencia.slice(0, 5).forEach((c, i) => {
    console.log(`   ${i + 1}. ${c.name.substring(0, 50)}...`);
    console.log(`      Resultados: ${c.metrics.results} | Custo/Resultado: R$ ${c.metrics.costPerResult.toFixed(2)}`);
  });
}

// Executar
extractCreatives().catch(console.error);
