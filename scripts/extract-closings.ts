/**
 * Script de Extração de Dados de Fechamento
 *
 * Este script lê os arquivos Excel de fechamento da clínica
 * e estrutura os dados para análise de receita e procedimentos
 */

import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { ClosingRecord, ClosingSummary, CategorySummary, ServiceSummary, PaymentStatus } from '../src/types';

const DATA_PATH = path.join(__dirname, '../data/fechamento-clinica');
const OUTPUT_PATH = path.join(__dirname, '../src/lib/data');

// Mapeamento de meses
const MONTH_MAP: Record<string, string> = {
  'setembro': 'Setembro',
  'outubro': 'Outubro',
  'novembro': 'Novembro',
  'dezembro': 'Dezembro',
};

// Função para converter valor numérico
function parseNumber(value: unknown): number {
  if (value === null || value === undefined || value === '-' || value === '') return 0;
  if (typeof value === 'number') return value;
  const str = String(value).replace(/\./g, '').replace(',', '.');
  return parseFloat(str) || 0;
}

// Função para extrair mês do nome do arquivo
function getMonthFromFile(fileName: string): string {
  const lowerName = fileName.toLowerCase();
  for (const [key, value] of Object.entries(MONTH_MAP)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  return 'Desconhecido';
}

// Função para categorizar procedimento
function categorize(procedure: string): string {
  const upper = procedure.toUpperCase();

  // Consultas
  if (upper.includes('CONSULTA') || upper.includes('RETORNO')) {
    return 'Consultas';
  }

  // Botox
  if (upper.includes('BOTOX')) {
    return 'Toxina Botulínica';
  }

  // Preenchimentos
  if (upper.includes('PREENCHIMENTO') || upper.includes('FILLER') || upper.includes('ÁCIDO HIALURÔNICO')) {
    return 'Preenchimentos';
  }

  // Laser / Fotona
  if (upper.includes('FOTONA') || upper.includes('LASER') || upper.includes('LUZ PULSADA')) {
    return 'Laser e Tecnologias';
  }

  // Bioestimuladores
  if (upper.includes('BIOESTIMULADOR') || upper.includes('RADIESSE') || upper.includes('SCULPTRA') || upper.includes('ELLANSÉ')) {
    return 'Bioestimuladores';
  }

  // Peeling
  if (upper.includes('PEELING')) {
    return 'Peelings';
  }

  // Microagulhamento / MMP
  if (upper.includes('MMP') || upper.includes('MICROAGULHAMENTO')) {
    return 'Microagulhamento';
  }

  // Limpeza de pele
  if (upper.includes('LIMPEZA')) {
    return 'Limpeza de Pele';
  }

  // Cirurgias
  if (upper.includes('CIRURGIA') || upper.includes('EXÉRESE') || upper.includes('BIOPSIA')) {
    return 'Cirurgias';
  }

  // Skinbooster
  if (upper.includes('SKINBOOSTER') || upper.includes('VOLITE')) {
    return 'Skinbooster';
  }

  // Fios de PDO
  if (upper.includes('FIO') || upper.includes('PDO')) {
    return 'Fios de PDO';
  }

  // Ultraformer
  if (upper.includes('ULTRAFORMER') || upper.includes('ULTRASSOM')) {
    return 'Ultraformer';
  }

  return 'Outros';
}

// Função para processar um arquivo Excel
function processClosingFile(filePath: string, fileName: string): { records: ClosingRecord[]; month: string } {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

  const records: ClosingRecord[] = [];
  const month = getMonthFromFile(fileName);

  for (const row of data) {
    const clientName = String(row['Conta'] || '');
    const procedure = String(row['Procedimento'] || row['Descrição'] || '');

    if (!clientName || !procedure) continue;

    const value = parseNumber(row['Valor']);
    const paidValue = parseNumber(row['Valor Pago']);
    const statusStr = String(row['Situação'] || '');

    const record: ClosingRecord = {
      id: `closing-${records.length + 1}-${month}`,
      clientName,
      date: String(row['Data do Vencimento'] || ''),
      description: String(row['Descrição'] || ''),
      procedure,
      category: categorize(procedure),
      status: statusStr.toLowerCase().includes('quitado') ? 'Quitado' : 'Em aberto',
      value,
      paidValue,
    };

    records.push(record);
  }

  return { records, month };
}

// Função para gerar resumo de um mês
function generateMonthlySummary(records: ClosingRecord[], month: string): ClosingSummary {
  // Total de procedimentos (excluindo retornos e consultas sem valor)
  const procedimentosReais = records.filter(r =>
    r.value > 0 || r.category !== 'Consultas'
  );

  const totalProcedures = procedimentosReais.length;
  const totalRevenue = records.reduce((sum, r) => sum + r.value, 0);
  const paidRevenue = records.reduce((sum, r) => sum + r.paidValue, 0);
  const pendingRevenue = totalRevenue - paidRevenue;

  // Por categoria
  const categoryMap = new Map<string, { count: number; revenue: number }>();

  for (const record of records) {
    const existing = categoryMap.get(record.category) || { count: 0, revenue: 0 };
    categoryMap.set(record.category, {
      count: existing.count + 1,
      revenue: existing.revenue + record.value,
    });
  }

  const byCategory: CategorySummary[] = Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      count: data.count,
      revenue: data.revenue,
      percentage: totalRevenue > 0 ? (data.revenue / totalRevenue) * 100 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Top serviços (por procedimento específico)
  const serviceMap = new Map<string, { count: number; revenue: number }>();

  for (const record of records) {
    // Separar procedimentos múltiplos
    const procedures = record.procedure.split(',').map(p => p.trim());

    for (const proc of procedures) {
      if (!proc) continue;
      const existing = serviceMap.get(proc) || { count: 0, revenue: 0 };
      serviceMap.set(proc, {
        count: existing.count + 1,
        revenue: existing.revenue + (record.value / procedures.length),
      });
    }
  }

  const topServices: ServiceSummary[] = Array.from(serviceMap.entries())
    .map(([service, data]) => ({
      service,
      count: data.count,
      revenue: data.revenue,
      avgTicket: data.count > 0 ? data.revenue / data.count : 0,
    }))
    .filter(s => s.revenue > 0) // Remover serviços sem receita
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 15);

  return {
    month,
    totalProcedures,
    totalRevenue,
    paidRevenue,
    pendingRevenue,
    byCategory,
    topServices,
  };
}

// Função principal de extração
async function extractClosings(): Promise<void> {
  console.log('🚀 Iniciando extração de dados de fechamento...\n');

  const allRecords: ClosingRecord[] = [];
  const monthlySummaries: ClosingSummary[] = [];
  const recordsByMonth: Record<string, ClosingRecord[]> = {};

  const files = fs.readdirSync(DATA_PATH).filter(f => f.endsWith('.xlsx'));

  console.log(`📁 Arquivos encontrados: ${files.length}`);

  for (const file of files) {
    const filePath = path.join(DATA_PATH, file);
    console.log(`  📄 Processando: ${file}`);

    try {
      const { records, month } = processClosingFile(filePath, file);
      allRecords.push(...records);

      if (!recordsByMonth[month]) {
        recordsByMonth[month] = [];
      }
      recordsByMonth[month].push(...records);

      console.log(`     ✓ ${records.length} registros extraídos (${month})`);
    } catch (error) {
      console.log(`     ✗ Erro ao processar: ${error}`);
    }
  }

  // Gerar resumos mensais
  const monthOrder = ['Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  for (const month of monthOrder) {
    if (recordsByMonth[month]) {
      const summary = generateMonthlySummary(recordsByMonth[month], month);
      monthlySummaries.push(summary);
    }
  }

  console.log(`\n📊 Total de registros: ${allRecords.length}`);

  // Calcular totais consolidados
  const consolidatedSummary = {
    totalRecords: allRecords.length,
    totalRevenue: allRecords.reduce((sum, r) => sum + r.value, 0),
    paidRevenue: allRecords.reduce((sum, r) => sum + r.paidValue, 0),
    pendingRevenue: 0,
    quitadoCount: allRecords.filter(r => r.status === 'Quitado').length,
    emAbertoCount: allRecords.filter(r => r.status === 'Em aberto').length,
  };
  consolidatedSummary.pendingRevenue = consolidatedSummary.totalRevenue - consolidatedSummary.paidRevenue;

  // Categorias consolidadas
  const allCategoryMap = new Map<string, { count: number; revenue: number }>();
  for (const record of allRecords) {
    const existing = allCategoryMap.get(record.category) || { count: 0, revenue: 0 };
    allCategoryMap.set(record.category, {
      count: existing.count + 1,
      revenue: existing.revenue + record.value,
    });
  }

  const consolidatedCategories: CategorySummary[] = Array.from(allCategoryMap.entries())
    .map(([category, data]) => ({
      category,
      count: data.count,
      revenue: data.revenue,
      percentage: consolidatedSummary.totalRevenue > 0
        ? (data.revenue / consolidatedSummary.totalRevenue) * 100
        : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Criar diretório de saída
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  // Salvar dados estruturados
  const outputData = {
    extractedAt: new Date().toISOString(),
    summary: {
      consolidated: consolidatedSummary,
      byCategory: consolidatedCategories,
      monthly: monthlySummaries,
    },
    records: {
      all: allRecords,
      byMonth: recordsByMonth,
    },
  };

  const outputFile = path.join(OUTPUT_PATH, 'closings.ts');
  const tsContent = `// Dados de Fechamento - Gerado automaticamente
// Última atualização: ${new Date().toISOString()}

import { ClosingRecord, ClosingSummary, CategorySummary } from '@/types';

export const closingData = ${JSON.stringify(outputData, null, 2)} as const;

export const allClosingRecords: ClosingRecord[] = closingData.records.all;
export const closingsByMonth = closingData.records.byMonth;

export const consolidatedClosingSummary = closingData.summary.consolidated;
export const closingsByCategory: CategorySummary[] = closingData.summary.byCategory;
export const monthlySummaries: ClosingSummary[] = closingData.summary.monthly;
`;

  fs.writeFileSync(outputFile, tsContent);
  console.log(`\n✅ Dados salvos em: ${outputFile}`);

  // Resumo consolidado
  console.log('\n📈 RESUMO CONSOLIDADO (Set-Dez 2025):');
  console.log(`   - Total de Registros: ${consolidatedSummary.totalRecords}`);
  console.log(`   - Receita Total: R$ ${consolidatedSummary.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`   - Receita Quitada: R$ ${consolidatedSummary.paidRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`   - Receita Pendente: R$ ${consolidatedSummary.pendingRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  console.log(`   - Registros Quitados: ${consolidatedSummary.quitadoCount}`);
  console.log(`   - Registros Em Aberto: ${consolidatedSummary.emAbertoCount}`);

  console.log('\n📊 TOP 5 CATEGORIAS POR RECEITA:');
  consolidatedCategories.slice(0, 5).forEach((cat, i) => {
    console.log(`   ${i + 1}. ${cat.category}`);
    console.log(`      Receita: R$ ${cat.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${cat.percentage.toFixed(1)}%)`);
    console.log(`      Quantidade: ${cat.count}`);
  });

  console.log('\n📅 RESUMO MENSAL:');
  for (const summary of monthlySummaries) {
    console.log(`\n   ${summary.month}:`);
    console.log(`   - Procedimentos: ${summary.totalProcedures}`);
    console.log(`   - Receita: R$ ${summary.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    console.log(`   - Quitado: R$ ${summary.paidRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
  }
}

// Executar
extractClosings().catch(console.error);
