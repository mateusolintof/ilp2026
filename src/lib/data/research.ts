// Dados de Pesquisa e Análise Estatística - Consolidado
// Gerado em: 2026-01-08
// Fontes: WordStream, Superads, Bestever AI, LocalIQ, Apify, Análise Estatística Python

// =============================================================================
// BENCHMARKS META ADS 2025
// =============================================================================

export const benchmarks = {
  healthcare: {
    ctr: { value: 0.83, unit: '%', source: 'WordStream 2025' },
    cpc: { value: 1.32, unit: 'USD', source: 'WordStream 2025' },
    cvr: { value: 11.00, unit: '%', source: 'Bestever AI' },
    cpl: { value: 47.47, unit: 'USD', source: 'LocalIQ' },
  },
  beauty: {
    ctr: { min: 1.16, max: 2.55, unit: '%', source: 'Bestever AI, LocalIQ' },
    cpc: { value: 1.81, unit: 'USD', source: 'Bestever AI' },
    cvr: { value: 7.10, unit: '%', source: 'Bestever AI' },
    cpl: { value: 51.42, unit: 'USD', source: 'LocalIQ' },
    cpm: { value: 8.41, unit: 'USD', source: 'Lebesgue' },
    cac: { value: 17.69, unit: 'USD', source: 'Lebesgue' },
  },
  healthFitness: {
    ctr: { min: 1.63, max: 1.72, unit: '%', source: 'WordStream, LocalIQ' },
    cpc: { min: 0.71, max: 1.90, unit: 'USD', source: 'Madgicx, Bestever AI' },
    cvr: { min: 5.78, max: 14.29, unit: '%', source: 'Madgicx, Bestever AI' },
    cpl: { value: 52.98, unit: 'USD', source: 'LocalIQ' },
  },
  global2025: {
    ctr: { value: 2.0, unit: '%', change: '+122%', source: 'TheeDigital 2025' },
    cpc: { value: 1.38, unit: 'USD', change: '-19.8%', source: 'TheeDigital 2025' },
    cvr: { value: 8.25, unit: '%', change: '-10.4%', source: 'TheeDigital 2025' },
  },
  sources: [
    { name: 'WordStream', url: 'https://www.wordstream.com/blog/facebook-ads-benchmarks-2025' },
    { name: 'Bestever AI', url: 'https://www.bestever.ai/post/facebook-ads-benchmarks' },
    { name: 'Superads', url: 'https://www.superads.ai/facebook-ads-costs/cpc-cost-per-click' },
    { name: 'LocalIQ', url: 'https://localiq.com/blog/facebook-advertising-benchmarks/' },
    { name: 'Lebesgue', url: 'https://lebesgue.io/facebook-ads/facebook-benchmarks-by-industry-ctr-cpm-cr-and-cac' },
    { name: 'Madgicx', url: 'https://madgicx.com/blog/meta-ads-benchmarking' },
  ],
} as const;

// =============================================================================
// ILP VS BENCHMARKS
// =============================================================================

export const ilpVsBenchmarks = {
  custoConversa: {
    ilp: 43.14,
    benchmark: 47.47,
    unit: 'R$',
    status: 'DENTRO' as const,
    comparison: 'Abaixo do benchmark healthcare (CPL)',
  },
  custoVisita: {
    ilp: 0.46,
    benchmark: 1.00,
    unit: 'R$',
    status: 'EXCELENTE' as const,
    comparison: '54% abaixo do benchmark típico',
  },
  roi: {
    ilp: 10638.79,
    benchmark: 500, // ROI médio marketing digital
    unit: '%',
    status: 'EXCEPCIONAL' as const,
    comparison: '21x acima da média de mercado',
  },
} as const;

// =============================================================================
// CORRELAÇÕES ESTATÍSTICAS (Pearson)
// =============================================================================

export const correlations = {
  investimentoVsViewsOrganicos: {
    name: 'Investimento Pago → Views Orgânicos',
    r: 0.9897,
    pValue: 0.0204,
    interpretation: 'Muito Forte Positiva',
    isSignificant: true,
    conclusion: 'Campanhas pagas IMPULSIONAM alcance orgânico',
    icon: '🚀',
  },
  viewsVsProcedimentos: {
    name: 'Views Orgânicos → Procedimentos',
    r: 0.4181,
    pValue: 0.8252,
    interpretation: 'Fraca Positiva',
    isSignificant: false,
    conclusion: 'Correlação não conclusiva',
    icon: '📊',
  },
  investimentoVsReceita: {
    name: 'Investimento → Receita',
    r: 0.3517,
    pValue: 0.8763,
    interpretation: 'Fraca Positiva',
    isSignificant: false,
    conclusion: 'Muitas variáveis externas afetam receita',
    icon: '💰',
  },
  resultadosVsProcedimentos: {
    name: 'Resultados Pagos → Procedimentos',
    r: 0.3344,
    pValue: 0.8882,
    interpretation: 'Fraca Positiva',
    isSignificant: false,
    conclusion: 'Jornada de conversão é longa',
    icon: '📈',
  },
} as const;

export const regression = {
  equation: 'Receita = 57.50 × Investimento + 269.870',
  slope: 57.50,
  intercept: 269870.57,
  rSquared: 0.1237,
  interpretation: 'Cada R$ 1 em marketing gera ~R$ 57.50 em receita adicional',
  prediction: {
    if10k: 844913.37,
    description: 'Se investir R$ 10.000, expectativa: R$ 844.913',
  },
} as const;

// =============================================================================
// MÉTRICAS DE PERFORMANCE
// =============================================================================

export const performanceMetrics = {
  roi: {
    value: 10638.79,
    label: 'ROI Marketing',
    description: 'Retorno sobre investimento em marketing',
    icon: '📈',
  },
  revenuePerReal: {
    value: 107.39,
    label: 'Receita/R$ Investido',
    description: 'Cada R$ 1 investido gerou R$ 107,39',
    icon: '💰',
  },
  costPerProcedure: {
    value: 13.35,
    label: 'Custo/Procedimento',
    description: 'Custo de marketing por procedimento realizado',
    icon: '🎯',
  },
  avgTicket: {
    value: 1433.61,
    label: 'Ticket Médio',
    description: 'Receita média por procedimento',
    icon: '💳',
  },
} as const;

// =============================================================================
// SAZONALIDADE E COMPORTAMENTO
// =============================================================================

export const seasonality = {
  daily: {
    bestDay: 'Sexta',
    bestDayViews: 58000,
    worstDay: 'Domingo',
    worstDayViews: 28000,
    improvement: '107.1%',
  },
  monthly: {
    bestMonth: 'Novembro',
    bestMonthRevenue: 707847.43,
    worstMonth: 'Setembro',
    worstMonthRevenue: 353841.25,
    growth: '102.6%',
  },
  hourly: {
    bestSlot: 'Manhã (6h-12h)',
    bestSlotViews: 132600,
    recommendation: 'Publicar conteúdo importante antes do meio-dia',
  },
} as const;

// =============================================================================
// ANÁLISE COMPETITIVA
// =============================================================================

export const competitors = {
  ilp: {
    username: 'institutolucianeprado',
    followers: 24643,
    posts: 739,
    position: '2º lugar entre analisados',
    isVerified: false,
  },
  benchmark: {
    username: 'drlucasmiranda.dermato',
    fullName: 'Dr. Lucas Miranda - Dermatologista',
    followers: 125467,
    posts: 1969,
    isVerified: true,
    positioning: 'Referência nacional em rejuvenescimento',
    differentiator: 'Criador de técnica própria (APhen Peel)',
    relevance: 'ALTA - Benchmark de conteúdo',
  },
  similar: {
    username: 'clinicamichelineneves',
    followers: 8710,
    posts: 1169,
    positioning: 'Rejuvenescimento natural',
    relevance: 'MÉDIA - Posicionamento similar',
  },
  insights: [
    'Dr. Lucas Miranda é referência com 125k+ seguidores - modelo a estudar',
    'ILP tem bom posicionamento regional (24k seguidores)',
    'Frequência de posts do ILP (739) está abaixo da concorrência grande',
    'Verificação do perfil seria diferencial importante',
  ],
  opportunities: [
    'Aumentar frequência de publicação para ~1500 posts',
    'Desenvolver técnica/protocolo próprio como diferencial',
    'Buscar verificação do perfil Instagram',
    'Criar mais conteúdo educativo (benchmark Dr. Lucas)',
  ],
} as const;

// =============================================================================
// TENDÊNCIAS 2026
// =============================================================================

export const trends2026 = {
  macroTrend: {
    title: 'Regeneração > Preenchimento',
    description: 'A artificialidade está fora de moda. Foco em qualidade do tecido, não quantidade de produto.',
    source: 'Galderma, PR Newswire',
  },
  procedures: [
    {
      name: 'Bioestimuladores Regenerativos',
      description: 'Sculptra (ácido poli-L-lático) - líder de mercado',
      potential: 'ALTO',
      icon: '💎',
    },
    {
      name: 'Skinboosters',
      description: 'Hidratação profunda injetável com ácido hialurônico',
      potential: 'ALTO',
      icon: '💧',
    },
    {
      name: 'Tratamentos Combinados',
      description: 'Botox + PDRN, Laser + Preenchimento',
      potential: 'MÉDIO-ALTO',
      icon: '🔄',
    },
    {
      name: 'Skincare Regenerativo',
      description: 'Alastin com Tecnologia TriHex',
      potential: 'MÉDIO',
      icon: '✨',
    },
  ],
  kBeauty: {
    growth: '+1.150%',
    term: 'Peeling coreano',
    concept: 'Glass Skin - pele luminosa como vidro polido',
    trends: ['Hidratação intensa', 'Poros refinados', 'Tom homogêneo'],
  },
  newDemands: [
    {
      name: 'Derretimento Facial Pós-Emagrecimento',
      context: 'Ozempic e Mounjaro criaram nova demanda',
      solution: 'Bioestimuladores + preventivo durante emagrecimento',
    },
    {
      name: 'Personalização Total',
      context: 'Fim do modelo genérico',
      solution: 'IA para diagnóstico + protocolos individualizados',
    },
  ],
  ilpOpportunities: [
    { service: 'Toxina Botulínica', trend: 'Tratamentos combinados', action: 'Comunicar como parte de protocolo completo' },
    { service: 'Bioestimuladores', trend: 'Regeneração profunda', action: 'ALTO POTENCIAL - tendência central 2026' },
    { service: 'Lasers', trend: 'Protocolos híbridos', action: 'Combinar com skinboosters' },
    { service: 'Peelings', trend: 'K-Beauty influence', action: 'Posicionar como "glass skin"' },
  ],
  communicationShifts: [
    { from: 'Rejuvenescimento', to: 'Regeneração' },
    { from: 'Anti-aging', to: 'Pro-aging saudável' },
    { from: 'Correção', to: 'Prevenção' },
    { from: 'Padronização', to: 'Personalização' },
  ],
} as const;

// =============================================================================
// PADRÕES DE SUCESSO (Top Criativos)
// =============================================================================

export const successPatterns = {
  top5Patterns: [
    { pattern: 'REELS', frequency: 4, percentage: 40 },
    { pattern: 'MEDICO_PRESENTE', frequency: 4, percentage: 40 },
    { pattern: 'BLACK_FRIDAY', frequency: 4, percentage: 40 },
    { pattern: 'VIDEO', frequency: 2, percentage: 20 },
    { pattern: 'BIOESTIMULADOR', frequency: 1, percentage: 10 },
  ],
  formatPerformance: {
    video: { avgResults: 764, avgCost: 15.30 },
    image: { avgResults: 716, avgCost: 20.49 },
    carousel: { avgResults: 19, avgCost: 40.75 },
  },
  keyInsight: 'Reels com presença médica em datas promocionais têm melhor performance',
} as const;

// =============================================================================
// INSIGHTS ACIONÁVEIS
// =============================================================================

export const actionableInsights = [
  {
    id: 1,
    title: 'Pago Amplifica Orgânico',
    finding: 'Correlação de 0.99 entre investimento pago e views orgânicos (p=0.02)',
    implication: 'Investir em tráfego pago não compete com orgânico - AMPLIFICA',
    action: 'Manter investimento consistente para efeito multiplicador',
    priority: 'ALTA',
    icon: '🚀',
  },
  {
    id: 2,
    title: 'ROI Justifica Aumento',
    finding: 'Cada R$ 1 investido gerou R$ 107,39 em receita',
    implication: 'Marketing está sub-investido dado o retorno excepcional',
    action: 'Aumentar budget em 30-50% para Q1 2026',
    priority: 'ALTA',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Sexta-Feira é Ouro',
    finding: 'Sexta tem 107% mais views que domingo',
    implication: 'Performance varia drasticamente por dia da semana',
    action: 'Concentrar publicações importantes na sexta-feira',
    priority: 'MÉDIA',
    icon: '📅',
  },
  {
    id: 4,
    title: 'Bioestimuladores são Tendência',
    finding: 'Bioestimuladores são a tendência #1 para 2026',
    implication: 'ILP já oferece o serviço, precisa comunicar melhor',
    action: 'Criar série de conteúdo sobre regeneração (não preenchimento)',
    priority: 'ALTA',
    icon: '💎',
  },
  {
    id: 5,
    title: 'Médicos Vendem',
    finding: '40% dos top criativos têm presença do médico',
    implication: 'Humanização através de profissionais gera confiança',
    action: 'Mais conteúdo com Dra. Luciane, Dr. Osterno e Dra. Yasmin',
    priority: 'MÉDIA',
    icon: '👨‍⚕️',
  },
] as const;

// =============================================================================
// RECOMENDAÇÕES ESTRATÉGICAS
// =============================================================================

export const strategicRecommendations = {
  immediate: [
    'Aumentar frequência de publicação (atual: 739 posts, meta: +50% em 2026)',
    'Criar calendário de conteúdo focado em sextas-feiras',
    'Desenvolver série sobre bioestimuladores regenerativos',
  ],
  shortTerm: [
    'Aumentar budget de marketing em 30% (justificado pelo ROI de 10.638%)',
    'Testar mais formatos de Reels com presença médica',
    'Implementar protocolo de impulsionamento de posts orgânicos >10k views',
  ],
  longTerm: [
    'Desenvolver técnica/protocolo proprietário como diferencial',
    'Buscar verificação do perfil Instagram',
    'Posicionar ILP como referência em "regeneração natural"',
  ],
} as const;
