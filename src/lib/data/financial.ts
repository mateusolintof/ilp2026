// Dados Financeiros (Fechamento Estruturado) - Gerado a partir de /data/fechamento-clinica
// Última atualização: 2026-01-09

export interface FinancialCategoryRow {
  category: string;
  count: number;
  revenue: number;
}

export interface FinancialMonthSummary {
  month: 'Setembro' | 'Outubro' | 'Novembro' | 'Dezembro';
  total: { count: number; revenue: number };
  technology: { count: number; revenue: number };
  injectables: { count: number; revenue: number };
  consulta: { count: number; revenue: number };
}

export interface FinancialTotals {
  revenue: number;
  count: number;
  technologyRevenue: number;
  technologyCount: number;
  injectablesRevenue: number;
  injectablesCount: number;
  technologyShareByMonth: Record<FinancialMonthSummary['month'], number>;
  injectablesShareByMonth: Record<FinancialMonthSummary['month'], number>;
}

export interface FinancialData {
  period: string;
  months: FinancialMonthSummary[];
  totals: FinancialTotals;
  categoriesPeriod: FinancialCategoryRow[];
  technologyBreakdown: FinancialCategoryRow[];
}

export const financialData: FinancialData = {
  period: 'Set–Dez 2025',
  months: [
    {
      month: 'Setembro',
      total: { count: 488, revenue: 545372.01 },
      technology: { count: 105, revenue: 121066.91833333333 },
      injectables: { count: 115, revenue: 198418.91999999998 },
      consulta: { count: 79, revenue: 57192.91666666666 },
    },
    {
      month: 'Outubro',
      total: { count: 465, revenue: 545941.5 },
      technology: { count: 118, revenue: 161536.48333333334 },
      injectables: { count: 111, revenue: 158792.56666666662 },
      consulta: { count: 81, revenue: 59718.33333333334 },
    },
    {
      month: 'Novembro',
      total: { count: 429, revenue: 690383.93 },
      technology: { count: 112, revenue: 196719.24404761902 },
      injectables: { count: 149, revenue: 285117.7488095239 },
      consulta: { count: 70, revenue: 55891.25 },
    },
    {
      month: 'Dezembro',
      total: { count: 347, revenue: 503512.3000000001 },
      technology: { count: 60, revenue: 88203.1619047619 },
      injectables: { count: 123, revenue: 215795.15 },
      consulta: { count: 77, revenue: 56898.33333333334 },
    },
  ],
  totals: {
    revenue: 2285209.74,
    count: 1729,
    technologyRevenue: 567525.8076190476,
    technologyCount: 395,
    injectablesRevenue: 858124.3854761905,
    injectablesCount: 498,
    technologyShareByMonth: {
      Setembro: 0.22198960730187334,
      Outubro: 0.29588606715798915,
      Novembro: 0.2849418062897539,
      Dezembro: 0.17517578399725664,
    },
    injectablesShareByMonth: {
      Setembro: 0.36382307188812274,
      Outubro: 0.29086004025461815,
      Novembro: 0.41298433584559807,
      Dezembro: 0.4285796990460808,
    },
  },
  categoriesPeriod: [
    { category: 'Tecnologia', count: 395, revenue: 567525.8076190476 },
    { category: 'Botox', count: 331, revenue: 459074.1104761905 },
    { category: 'Preenchimento', count: 130, revenue: 291993.60833333334 },
    { category: 'Cirurgia', count: 161, revenue: 291857.2976190476 },
    { category: 'Consulta', count: 307, revenue: 229700.83333333334 },
    { category: 'Bioestimulador', count: 37, revenue: 107056.66666666666 },
    { category: 'MMP Capilar', count: 58, revenue: 75762.74166666665 },
    { category: 'Transplante Capilar', count: 6, revenue: 37383.333333333336 },
    { category: 'Peeling', count: 34, revenue: 32401.630952380954 },
    { category: 'Limpeza de Pele', count: 66, revenue: 29716.41666666667 },
    { category: 'Retorno Botox', count: 14, revenue: 19472.916666666664 },
    { category: 'Outros', count: 4, revenue: 17559.96 },
    { category: 'Título Em Aberto Doctors', count: 23, revenue: 16715 },
    { category: 'Fios Evo Pdo Espiculado', count: 3, revenue: 14100 },
    { category: 'PRP', count: 8, revenue: 13029 },
    { category: 'Curetagem', count: 6, revenue: 9546.666666666668 },
    { category: 'Infiltração', count: 23, revenue: 9359.75 },
    { category: 'Meso Capilar', count: 12, revenue: 8970 },
    { category: 'Vacina Verruga', count: 23, revenue: 8561.666666666668 },
    { category: 'Avaliação', count: 3, revenue: 6878 },
    { category: 'Clareamento', count: 5, revenue: 6385 },
    { category: 'Retorno Preenchimento', count: 5, revenue: 5244.166666666666 },
    { category: 'Tratamento Vitiligo', count: 11, revenue: 5075 },
    { category: 'Carboxiterapia', count: 5, revenue: 4725 },
    { category: 'Retorno', count: 10, revenue: 3581 },
    { category: 'Hialuronidase', count: 4, revenue: 2810 },
    { category: 'Fio Aptos', count: 1, revenue: 2679.166666666667 },
    { category: 'Verruga', count: 3, revenue: 2000 },
    { category: 'Curetagem De Molusco', count: 2, revenue: 2000 },
    { category: 'Curativo', count: 4, revenue: 1195 },
    { category: 'Catio Vital', count: 3, revenue: 900 },
    { category: 'Retorno Exames', count: 4, revenue: 850 },
    { category: 'Desbridamento', count: 1, revenue: 800 },
    { category: 'Microagulhamento', count: 1, revenue: 200 },
    { category: 'Multiwaves', count: 1, revenue: 100 },
    { category: 'Retirada De Ponto', count: 25, revenue: 0 },
  ],
  technologyBreakdown: [
    { category: 'Tentherma', count: 110, revenue: 281987.1023809524 },
    { category: 'CO2', count: 38, revenue: 74320.60714285713 },
    { category: 'Tecnologia', count: 73, revenue: 62073.75 },
    { category: 'Redtouch', count: 89, revenue: 59309.88261904762 },
    { category: 'Fotona', count: 63, revenue: 45820.95833333333 },
    { category: 'Virtue', count: 9, revenue: 24354.583333333332 },
    { category: 'Laser', count: 13, revenue: 19658.92380952381 },
  ],
};

export const financialMonths = financialData.months;
export const financialTotals = financialData.totals;
export const financialCategoriesPeriod = financialData.categoriesPeriod;
export const financialTechnologyBreakdown = financialData.technologyBreakdown;

export const financialTopCategories = financialCategoriesPeriod
  .filter(row => row.revenue > 0)
  .slice()
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 8);

