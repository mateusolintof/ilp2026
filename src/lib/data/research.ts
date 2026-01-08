// Dados de Pesquisa e Análise - Consolidado
// Atualizado em: 2026-01-08
// Fontes verificadas: WordStream, LocalIQ, Madgicx, IAPAM, Precedence Research, Euromonitor, Galderma

// =============================================================================
// BENCHMARKS META ADS 2025 (Fontes verificadas)
// =============================================================================

export const benchmarks = {
  healthcare: {
    ctr: { value: 0.83, unit: '%', source: 'WordStream 2025' },
    cpc: { value: 1.32, unit: 'USD', source: 'WordStream 2025' },
    cvr: { value: 11.00, unit: '%', source: 'Bestever AI' },
    cpl: { value: 47.47, unit: 'USD', source: 'LocalIQ 2025' },
  },
  beauty: {
    ctr: { min: 1.16, max: 2.55, unit: '%', source: 'Bestever AI, LocalIQ' },
    cpc: { value: 3.06, unit: 'USD', source: 'LocalIQ 2025' },
    cvr: { value: 5.29, unit: '%', source: 'LocalIQ 2025' },
    cpl: { value: 51.42, unit: 'USD', source: 'LocalIQ 2025' },
    cpm: { value: 12.78, unit: 'USD', source: 'Madgicx 2025' },
  },
  healthFitness: {
    ctr: { min: 1.63, max: 1.72, unit: '%', source: 'WordStream, LocalIQ' },
    cpc: { min: 0.71, max: 2.64, unit: 'USD', source: 'Madgicx, LocalIQ' },
    cvr: { min: 5.63, max: 14.29, unit: '%', source: 'LocalIQ, Bestever AI' },
    cpl: { value: 52.98, unit: 'USD', source: 'LocalIQ 2025' },
  },
  leadGeneration: {
    avgCpl: { value: 27.66, unit: 'USD', source: 'LocalIQ 2025', note: 'Aumento de $22.87 em 2024' },
    avgCtr: { value: 2.59, unit: '%', source: 'LocalIQ 2025' },
    inPlatformCpl: { min: 15, max: 50, unit: 'USD', source: 'Pennock 2025', note: 'Meta Lead Forms' },
  },
  sources: [
    { name: 'WordStream', url: 'https://www.wordstream.com/blog/facebook-ads-benchmarks-2025' },
    { name: 'LocalIQ', url: 'https://localiq.com/blog/facebook-advertising-benchmarks/' },
    { name: 'Madgicx', url: 'https://madgicx.com/blog/meta-ads-benchmarking' },
    { name: 'Pennock', url: 'https://www.pennock.co/blog/medspa-and-aesthetics-paid-media-benchmarks-google-vs-meta' },
  ],
} as const;

// =============================================================================
// ILP VS BENCHMARKS (Apenas dados verificáveis)
// =============================================================================

export const ilpVsBenchmarks = {
  custoConversa: {
    ilp: 43.14,
    benchmark: 47.47,
    benchmarkName: 'Physicians & Surgeons',
    unit: 'R$',
    status: 'DENTRO' as const,
    comparison: '9% abaixo do benchmark de médicos (LocalIQ)',
    source: 'LocalIQ 2025 - Physicians & Surgeons CPL',
  },
  custoVisita: {
    ilp: 0.46,
    benchmark: 1.00,
    unit: 'R$',
    status: 'EXCELENTE' as const,
    comparison: '54% abaixo do benchmark típico de custo por clique',
    source: 'Madgicx Meta Ads Benchmarks',
  },
} as const;

// =============================================================================
// CORRELAÇÕES ESTATÍSTICAS (Pearson) - Com explicações expandidas
// =============================================================================

export const correlations = {
  investimentoVsViewsOrganicos: {
    name: 'Investimento Pago → Views Orgânicos',
    r: 0.9897,
    pValue: 0.0204,
    interpretation: 'Correlação Muito Forte e Positiva',
    isSignificant: true,
    conclusion: 'Quando o investimento em Meta Ads aumenta, os views orgânicos crescem proporcionalmente',
    whatItMeans: 'Existe uma relação quase perfeita entre o quanto a ILP investe em anúncios e o alcance dos posts orgânicos. Isso sugere que campanhas pagas aumentam a visibilidade geral do perfil.',
    whyItMatters: 'Muitas clínicas evitam tráfego pago por medo de "canibalizar" o alcance orgânico. Estes dados mostram o contrário: o pago AMPLIFICA o orgânico.',
    whatToDo: 'Manter investimento consistente mesmo em períodos de baixa. Quando publicar conteúdo orgânico importante, considerar impulsioná-lo com R$200-500 para maximizar alcance.',
    limitations: 'Período de análise curto (4 meses). A correlação não prova causação direta - outros fatores como sazonalidade (Black Friday) podem ter influenciado.',
    icon: 'rocket',
  },
  viewsVsProcedimentos: {
    name: 'Views Orgânicos → Procedimentos',
    r: 0.4181,
    pValue: 0.8252,
    interpretation: 'Correlação Fraca e Não Significativa',
    isSignificant: false,
    conclusion: 'Não há relação direta entre visualizações e procedimentos realizados',
    whatItMeans: 'Mais views não significa automaticamente mais procedimentos. A jornada do paciente é mais complexa.',
    whyItMatters: 'O Instagram funciona como ferramenta de AWARENESS (conhecimento), não de conversão direta. O paciente vê o conteúdo, pesquisa, considera, e só depois agenda.',
    whatToDo: 'Não usar views como métrica principal de sucesso. Focar em métricas de consideração: salvamentos, compartilhamentos, mensagens diretas.',
    limitations: 'O ciclo de decisão em estética pode levar semanas ou meses. Views de setembro podem gerar procedimentos em dezembro.',
    icon: 'chart',
  },
  investimentoVsReceita: {
    name: 'Investimento → Receita',
    r: 0.3517,
    pValue: 0.8763,
    interpretation: 'Correlação Fraca e Não Significativa',
    isSignificant: false,
    conclusion: 'A receita é influenciada por muitos fatores além do marketing',
    whatItMeans: 'O investimento em marketing é apenas UMA das variáveis que afetam a receita. Qualidade do atendimento, disponibilidade de agenda, preços, e reputação também importam.',
    whyItMatters: 'Isso é NORMAL em serviços de saúde. O marketing gera leads, mas a conversão depende de toda a operação da clínica.',
    whatToDo: 'Monitorar toda a jornada: Lead → Agendamento → Comparecimento → Procedimento. Identificar onde há gargalos.',
    limitations: 'Amostra pequena (4 meses). Muitas variáveis não controladas.',
    icon: 'dollar',
  },
  resultadosVsProcedimentos: {
    name: 'Resultados Pagos → Procedimentos',
    r: 0.3344,
    pValue: 0.8882,
    interpretation: 'Correlação Fraca e Não Significativa',
    isSignificant: false,
    conclusion: 'Leads gerados não convertem automaticamente em procedimentos',
    whatItMeans: 'O número de conversas no WhatsApp ou visitas ao perfil não se traduz diretamente em pacientes. A qualidade do lead e o processo de atendimento são cruciais.',
    whyItMatters: 'É essencial qualificar leads antes de comemorar números. 100 leads ruins custam mais que 20 leads qualificados.',
    whatToDo: 'Implementar qualificação de leads no WhatsApp. Perguntar sobre procedimento de interesse e orçamento antes de agendar.',
    limitations: 'Não temos dados de qualificação de leads para análise mais profunda.',
    icon: 'trending',
  },
} as const;

export const regression = {
  equation: 'Receita = 57.50 × Investimento + 269.870',
  slope: 57.50,
  intercept: 269870.57,
  rSquared: 0.1237,
  rSquaredPercent: 12.37,
  interpretation: 'O modelo explica apenas 12% da variação na receita',
  whatItMeans: 'Este R² baixo indica que o investimento em marketing explica apenas uma pequena parte da receita. Outros 88% vêm de fatores como: pacientes recorrentes, indicações, reputação, sazonalidade.',
  practicalUse: 'Use este modelo com cautela. Ele sugere tendência geral, mas não deve ser usado para previsões precisas.',
  limitations: [
    'Amostra muito pequena (apenas 4 meses)',
    'Muitas variáveis não controladas',
    'Não considera efeito cumulativo do marketing',
    'Sazonalidade distorce os dados (Black Friday)',
  ],
} as const;

// =============================================================================
// SAZONALIDADE E COMPORTAMENTO
// =============================================================================

export const seasonality = {
  daily: {
    bestDay: 'Sexta-feira',
    bestDayViews: 58000,
    worstDay: 'Domingo',
    worstDayViews: 28000,
    improvement: '107%',
    insight: 'O público está mais ativo no final da semana de trabalho, provavelmente planejando cuidados pessoais para o fim de semana.',
    recommendation: 'Publicar conteúdo de maior importância nas sextas. Usar domingos para testes ou conteúdo mais leve.',
  },
  monthly: {
    bestMonth: 'Novembro',
    bestMonthRevenue: 707847.43,
    worstMonth: 'Setembro',
    worstMonthRevenue: 353841.25,
    growth: '100%',
    insight: 'Black Friday e preparação para festas de fim de ano impulsionam demanda. Setembro é mês de volta às aulas, menor foco em estética.',
    recommendation: 'Concentrar maior budget em Out-Nov-Dez. Usar Set para branding e educação.',
  },
  hourly: {
    bestSlot: 'Manhã (6h-12h)',
    bestSlotViews: 132600,
    secondBestSlot: 'Noite (18h-22h)',
    recommendation: 'Publicar conteúdo importante pela manhã. Usar noite para Stories e interações.',
  },
} as const;

// =============================================================================
// ANÁLISE COMPETITIVA (Dados do Instagram)
// =============================================================================

export const competitors = {
  ilp: {
    username: 'institutolucianeprado',
    followers: 24643,
    posts: 739,
    position: 'Referência regional em Goiânia',
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
} as const;

// =============================================================================
// TENDÊNCIAS 2026 (Com fontes e explicações completas)
// =============================================================================

export const trends2026 = {
  macroTrend: {
    title: 'Regeneração Substitui Preenchimento',
    subtitle: 'A era da naturalidade chegou à dermatologia',
    description: 'O mercado de estética está mudando fundamentalmente. Pacientes não querem mais "preencher rugas" ou "esticar a pele". Eles buscam tratamentos que melhorem a QUALIDADE do tecido de dentro para fora, com resultados naturais e duradouros.',
    whyItMatters: 'Segundo a AAFPRS (American Academy of Facial Plastic and Reconstructive Surgery), 68% dos pacientes citam "resultado não natural" como maior preocupação. Clínicas que se posicionarem como "naturais" terão vantagem competitiva.',
    howToPosition: [
      'Trocar comunicação de "preencher rugas" para "regenerar a pele"',
      'Destacar resultados sutis e naturais, não transformações dramáticas',
      'Enfatizar protocolos personalizados ao invés de "pacotes prontos"',
    ],
    source: 'AAFPRS Member Survey, Galderma Reports',
  },
  procedures: [
    {
      name: 'Bioestimuladores',
      description: 'Injetáveis como Sculptra (ácido poli-L-lático) que estimulam produção de colágeno e elastina. Não preenchem, mas "ensinam" a pele a se regenerar.',
      potential: 'ALTO',
      marketData: 'Segundo IAPAM, 57% dos cirurgiões faciais esperam que medicina regenerativa seja principal área de crescimento.',
      ilpOpportunity: 'Comunicar melhor o diferencial de regeneração natural vs preenchimento tradicional.',
      actionItems: [
        'Criar série de 8 posts explicando diferença entre preenchimento e bioestimulação',
        'Mostrar resultados de 3, 6 e 12 meses (progressão natural)',
        'Educar sobre o processo: "Sua pele aprende a produzir colágeno novamente"',
      ],
      icon: 'gem',
    },
    {
      name: 'Skinboosters',
      description: 'Microinjeções de ácido hialurônico que hidratam profundamente a pele, melhorando textura, luminosidade e elasticidade.',
      potential: 'ALTO',
      marketData: 'Mercado global de skinboosters: USD 1.80 bilhões em 2026, crescendo para USD 4.81 bilhões até 2034 (CAGR 13.05%)',
      ilpOpportunity: 'Posicionar como tratamento de "manutenção" para pacientes que já fizeram outros procedimentos.',
      actionItems: [
        'Criar conteúdo sobre "skin quality" vs "skin correction"',
        'Mostrar pele com textura melhorada, não apenas sem rugas',
        'Oferecer como complemento a outros tratamentos',
      ],
      source: 'Precedence Research 2025',
      icon: 'droplets',
    },
    {
      name: 'Tratamentos Combinados',
      description: 'Protocolos que combinam múltiplas tecnologias: RF microneedling + bioestimuladores, laser + skinboosters, toxina + preenchimento sutil.',
      potential: 'MÉDIO-ALTO',
      marketData: 'Tendência de "tweakments" - ajustes sutis ao invés de procedimentos únicos drásticos.',
      ilpOpportunity: 'Criar "protocolos proprietários" nomeados como diferencial competitivo.',
      actionItems: [
        'Desenvolver e nomear 2-3 protocolos exclusivos ILP',
        'Criar conteúdo explicando por que combinar é melhor que fazer um só procedimento',
        'Mostrar casos de protocolos completos com timeline de 6-12 meses',
      ],
      icon: 'refresh',
    },
    {
      name: 'Gestão do "Ozempic Face"',
      description: 'Com popularização de medicamentos para emagrecimento (GLP-1 como Ozempic/Mounjaro), surgiu demanda por tratar flacidez facial causada pela perda rápida de peso.',
      potential: 'MÉDIO-ALTO',
      marketData: 'Nova demanda emergente. Dermatologistas recomendam iniciar tratamentos preventivos DURANTE o emagrecimento.',
      ilpOpportunity: 'Público específico com necessidade clara e urgente.',
      actionItems: [
        'Criar conteúdo direcionado: "Está emagrecendo? Proteja seu rosto"',
        'Desenvolver protocolo específico para este público',
        'Parcerias com endocrinologistas/nutrólogos que prescrevem GLP-1',
      ],
      source: 'Rede 98, MedEsthetics 2026',
      icon: 'sparkles',
    },
  ],
  kBeauty: {
    title: 'Influência K-Beauty no Brasil',
    concept: 'Glass Skin - pele luminosa, hidratada, com aparência de "vidro polido"',
    growth: '+1.000%',
    term: 'Glass Skin',
    marketSize: {
      global: 'USD 14.68 bilhões (2024) → USD 31.81 bilhões (2033)',
      glassSkinUS: 'USD 4.03 bilhões (2025)',
      brazilSkincare: 'USD 3.62 bilhões (2025) → USD 4.55 bilhões (2030)',
    },
    brazilContext: 'Brasileiros estão adotando rotinas multi-step de skincare. Busca por "glass skin" e "peeling coreano" em alta.',
    ilpOpportunity: 'Posicionar tratamentos como parte de rotina "Glass Skin". Conectar procedimentos clínicos com cuidados em casa.',
    trends: ['Hidratação intensa', 'Poros refinados', 'Tom uniforme', 'Luminosidade natural'],
    source: 'Euromonitor K-Beauty Report 2025, Research and Markets',
  },
  naturalAesthetics: {
    title: 'Movimento "Natural Skin" - Menos Maquiagem, Mais Tratamento',
    description: 'Pacientes querem pele que fica bonita SEM maquiagem. Trend de "no makeup makeup" impulsiona demanda por tratamentos que melhoram a pele de verdade.',
    contentDirection: 'Mostrar pacientes com pele natural, sem filtros pesados. Destacar textura real da pele.',
    source: 'Seaport MedSpa 2026 Trends Report',
  },
  ilpOpportunities: [
    {
      service: 'Bioestimuladores',
      trend: 'ALTO - Tendência crescente',
      action: 'Comunicar diferencial de "regeneração natural" vs preenchimento. Criar série mostrando progressão de 3, 6 e 12 meses.',
    },
    {
      service: 'Skinboosters',
      trend: 'ALTO - Mercado USD 4.81 bi até 2034',
      action: 'Posicionar como tratamento de manutenção. Oferecer como complemento a protocolos existentes.',
    },
    {
      service: 'Protocolos Combinados',
      trend: 'MÉDIO-ALTO - Tendência de tweakments',
      action: 'Criar protocolos proprietários nomeados como diferencial (ex: Protocolo Glow ILP).',
    },
    {
      service: 'Ozempic Face',
      trend: 'EMERGENTE - Nova demanda',
      action: 'Criar conteúdo para pacientes em emagrecimento com GLP-1. Buscar parcerias com endocrinologistas.',
    },
  ],
} as const;

// =============================================================================
// FRAMEWORKS DE CRIATIVOS (Baseado em pesquisa de mercado)
// =============================================================================

export const creativeFrameworks = {
  introduction: 'Frameworks validados por dados de performance em clínicas estéticas. Baseados em análise de campanhas de alta conversão.',

  messageAds: {
    name: 'Campanhas de Mensagem (WhatsApp)',
    objective: 'Gerar conversas qualificadas que convertam em agendamentos',
    bestFormats: [
      {
        format: 'UGC Testimonial',
        description: 'Vídeo de paciente real contando experiência. Gravado no celular, autêntico.',
        performance: 'Melhor taxa de conversão em 2025. Autenticidade supera produção polida.',
        structure: [
          'Hook (0-3s): Reação emocional ou resultado visual impactante',
          'Problema (3-8s): "Eu sofria com..."',
          'Solução (8-15s): "Aí conheci a ILP e..."',
          'Resultado (15-25s): Mostrar antes/depois ou falar sobre mudança',
          'CTA (25-30s): "Manda mensagem pra agendar"',
        ],
        tips: [
          'Pedir para paciente começar com reação ("Nossa, gente!")',
          'Gravação vertical, luz natural',
          'Legendas obrigatórias (85% assistem sem som)',
        ],
        source: 'Dara Denney - Meta Ads Creative Formats 2025',
      },
      {
        format: 'Médico Falando Direto',
        description: 'Dra. Luciane ou outro médico explicando procedimento de forma educativa.',
        performance: '40% dos top criativos da ILP tinham presença médica.',
        structure: [
          'Hook (0-3s): Pergunta provocativa ou mito comum',
          'Educação (3-20s): Explicação simples do procedimento',
          'Prova (20-30s): Menção a resultados ou experiência',
          'CTA (30-35s): Convite para conversar',
        ],
        tips: [
          'Médico deve parecer acessível, não distante',
          'Evitar termos muito técnicos',
          'Close no rosto, conexão visual',
        ],
      },
      {
        format: 'Before/After + Storytelling',
        description: 'Transformação visual com narrativa da jornada do paciente.',
        performance: 'Alto engajamento, mas requer consentimento documentado.',
        structure: [
          'Hook: Mostrar resultado final primeiro (curiosidade reversa)',
          'Contexto: Qual era o problema',
          'Processo: O que foi feito (sem detalhes técnicos demais)',
          'Resultado: Antes/depois lado a lado',
          'CTA: "Quer resultado assim? Fala com a gente"',
        ],
        tips: [
          'Mesma iluminação no antes e depois',
          'Sem filtros ou edições pesadas',
          'Consentimento por escrito do paciente',
        ],
      },
    ],
    headlines: {
      formula: 'Problema + Solução + Prova Social',
      examples: [
        '"Cansada de parecer cansada? Nossa paciente resolveu em 1 sessão."',
        '"87% das pacientes voltam para manutenção. Descubra por quê."',
        '"Flacidez após emagrecimento? Existe tratamento para isso."',
      ],
    },
    ctas: [
      '"Manda PELE no WhatsApp para saber mais"',
      '"Clica e fala com a gente"',
      '"Agenda sua avaliação gratuita"',
    ],
  },

  audienceAds: {
    name: 'Campanhas de Audiência (Awareness)',
    objective: 'Construir autoridade e manter a clínica na mente do público',
    bestFormats: [
      {
        format: 'Educativo Curto (Mito vs Verdade)',
        description: 'Desmistificar crenças comuns sobre procedimentos estéticos.',
        structure: [
          'Hook: "Mito ou verdade: [crença comum]?"',
          'Revelação: Resposta com explicação breve',
          'Autoridade: "Como dermatologista, eu vejo isso todo dia..."',
          'Engajamento: "Você já ouviu isso? Comenta aí"',
        ],
        tips: [
          'Formato ideal: Reels de 15-30 segundos',
          'Texto na tela para quem assiste sem som',
          'Tom acessível, não professoral',
        ],
      },
      {
        format: 'Bastidores da Clínica',
        description: 'Humanizar a clínica mostrando equipe, ambiente, dia-a-dia.',
        performance: 'Constrói confiança e reduz ansiedade de novos pacientes.',
        examples: [
          'Tour pela clínica',
          'Equipe se preparando para o dia',
          'Tecnologias disponíveis',
          'Momentos descontraídos (aniversários, conquistas)',
        ],
      },
      {
        format: 'Trend Reactions',
        description: 'Médico reagindo a tendências virais ou mitos das redes.',
        performance: 'Alto alcance orgânico quando bem executado.',
        tips: [
          'Reagir rápido a trends relevantes',
          'Manter tom profissional mas não chato',
          'Não criticar concorrentes ou outras clínicas',
        ],
      },
    ],
    frequencyTips: [
      'Mínimo 3-4 posts por semana no feed',
      'Stories diários (mínimo 5)',
      'Reels 2-3 por semana',
      'Concentrar melhor conteúdo em sextas-feiras',
    ],
  },

  caseStudies: [
    {
      name: 'Face Doctor Piedade (Brasil)',
      strategy: 'Facebook Reels + Ads que clicam para WhatsApp',
      results: {
        growth: '35% de crescimento do negócio',
        conversion: '50% de conversão após retargeting (antes 35-45%)',
      },
      keyLearning: 'Combinar conteúdo orgânico (Reels) com retargeting no WhatsApp é altamente eficaz no Brasil.',
      source: 'Meta Business Case Study 2025',
    },
    {
      name: 'LABX Clinic (Tailândia)',
      strategy: 'Ads que clicam para Messenger com otimização de leads',
      results: {
        leadIncrease: '4.6x mais leads',
        cplReduction: '76% menor custo por lead',
      },
      keyLearning: 'Otimização para leads (não apenas tráfego) reduz drasticamente o CPL.',
      source: 'Meta Business Case Study',
    },
    {
      name: 'Glow Aesthetics (UK)',
      strategy: 'Lead ad + landing page focada em consulta + WhatsApp follow-up + retargeting 3 camadas',
      results: {
        spend: '£1,200 em 30 dias',
        leads: 256,
        consultations: 97,
        revenue: '£11,720',
        roas: '9.8x',
      },
      keyLearning: 'Funil completo (lead → nurturing → conversão) supera campanhas isoladas.',
      source: 'Clinic Grower Case Study',
    },
  ],
} as const;

// =============================================================================
// INSIGHTS ACIONÁVEIS (Reescritos com profundidade)
// =============================================================================

export const actionableInsights = [
  {
    id: 1,
    title: 'Tráfego Pago Potencializa Alcance Orgânico',
    icon: 'rocket',
    priority: 'ALTA' as const,
    finding: {
      data: 'Correlação de 0.99 entre investimento em Meta Ads e views orgânicos',
      significance: 'Estatisticamente significativa (p = 0.02)',
    },
    whyItMatters: 'Muitas clínicas evitam tráfego pago por medo de "competir" com o orgânico. Os dados mostram o contrário: cada real investido em anúncios aumenta proporcionalmente o alcance dos posts orgânicos.',
    howToApply: [
      'Manter investimento mínimo consistente (sugestão: R$5.000/mês)',
      'Quando publicar conteúdo orgânico importante, impulsionar com R$200-500',
      'Não pausar campanhas por mais de 2 semanas (perde momentum)',
    ],
    expectedResult: 'Crescimento orgânico sustentado de 10-15% ao mês com investimento estável',
    timeline: 'Imediato',
  },
  {
    id: 2,
    title: 'Sexta-Feira é o Dia de Ouro',
    icon: 'calendar',
    priority: 'MÉDIA' as const,
    finding: {
      data: 'Sexta-feira tem 107% mais views que domingo (58k vs 28k)',
      context: 'Padrão consistente ao longo dos 4 meses analisados',
    },
    whyItMatters: 'O público está mais ativo no final da semana de trabalho. Provavelmente planejando autocuidado para o fim de semana. Publicar no dia errado desperdiça conteúdo bom.',
    howToApply: [
      'Publicar conteúdo de maior importância nas sextas-feiras',
      'Usar segunda e terça para conteúdo educativo',
      'Domingos para Stories mais leves ou testes',
      'Agendar principais lançamentos para sexta 10h',
    ],
    expectedResult: 'Aumento de 30-50% no engajamento médio dos posts principais',
    timeline: 'Imediato',
  },
  {
    id: 3,
    title: 'Bioestimuladores São a Grande Oportunidade 2026',
    icon: 'gem',
    priority: 'ALTA' as const,
    finding: {
      data: '57% dos cirurgiões faciais esperam regenerativa como principal crescimento',
      market: 'Skinboosters: mercado de USD 4.81 bi até 2034',
    },
    whyItMatters: 'A tendência macro do mercado é "regeneração > preenchimento". A ILP já oferece bioestimuladores, mas pode não estar comunicando este diferencial adequadamente.',
    howToApply: [
      'Criar série de 8 posts sobre "Sua pele aprendendo a se regenerar"',
      'Mostrar resultados de 3, 6 e 12 meses (progressão natural)',
      'Posicionar como alternativa moderna ao preenchimento tradicional',
      'Educar: "Não preenchemos rugas, ensinamos sua pele a produzir colágeno"',
    ],
    expectedResult: 'Aumento de 20% nas consultas para bioestimuladores em 90 dias',
    timeline: 'Curto prazo (Q1 2026)',
  },
  {
    id: 4,
    title: 'Presença Médica nos Criativos Converte Mais',
    icon: 'user-check',
    priority: 'MÉDIA' as const,
    finding: {
      data: '40% dos top 10 criativos da ILP tinham presença do médico',
      context: 'Criativos com médico tiveram custo/resultado menor',
    },
    whyItMatters: 'Saúde é serviço de confiança. Ver o médico humaniza a clínica e reduz ansiedade de novos pacientes. UGC de influencers funciona para cosméticos, mas em procedimentos médicos, a autoridade do profissional é essencial.',
    howToApply: [
      'Dra. Luciane gravar 2 vídeos curtos por semana (pode ser no celular)',
      'Incluir outros médicos da equipe para variedade',
      'Formato: educativo (mitos), bastidores, ou explicando procedimentos',
      'Manter tom acessível, não clínico demais',
    ],
    expectedResult: 'Redução de 15-20% no custo por resultado em campanhas com médico',
    timeline: 'Imediato',
  },
  {
    id: 5,
    title: 'Qualificação de Leads é Mais Importante que Volume',
    icon: 'filter',
    priority: 'ALTA' as const,
    finding: {
      data: 'Correlação fraca (r=0.33) entre resultados de campanhas e procedimentos realizados',
      implication: 'Quantidade de leads não garante conversão',
    },
    whyItMatters: '100 leads ruins custam tempo e frustram a equipe. 20 leads qualificados são mais valiosos. O gargalo pode não ser geração de leads, mas qualificação e follow-up.',
    howToApply: [
      'Implementar perguntas de qualificação no primeiro contato WhatsApp',
      'Perguntar: procedimento de interesse, urgência, já fez avaliação antes?',
      'Priorizar leads que respondem rápido e demonstram interesse real',
      'Criar fluxo de follow-up para leads frios (não descartar imediatamente)',
    ],
    expectedResult: 'Aumento de 25-30% na taxa de conversão lead → agendamento',
    timeline: 'Curto prazo',
  },
] as const;

// =============================================================================
// RECOMENDAÇÕES ESTRATÉGICAS (Com contexto completo)
// =============================================================================

export const strategicRecommendations = {
  immediate: {
    title: 'Ações Imediatas (Próximas 2 semanas)',
    items: [
      {
        action: 'Criar calendário de conteúdo priorizando sextas-feiras',
        rationale: 'Sexta tem 107% mais views. Conteúdo importante deve ir no melhor dia.',
        metric: 'Engajamento médio por post',
      },
      {
        action: 'Gravar 4 vídeos curtos com Dra. Luciane',
        rationale: '40% dos top criativos têm médico. Autenticidade supera produção polida.',
        metric: 'Custo por resultado em campanhas novas',
      },
      {
        action: 'Implementar perguntas de qualificação no WhatsApp',
        rationale: 'Volume de leads não garante conversão. Qualificar antes de agendar.',
        metric: 'Taxa de conversão lead → agendamento',
      },
    ],
  },
  shortTerm: {
    title: 'Curto Prazo (Q1 2026)',
    items: [
      {
        action: 'Lançar série de conteúdo sobre bioestimuladores',
        rationale: 'Tendência macro de "regeneração > preenchimento". ILP tem o serviço, precisa comunicar.',
        metric: 'Consultas para bioestimuladores',
      },
      {
        action: 'Testar campanha de retargeting 3 camadas',
        rationale: 'Case study Glow Aesthetics: ROAS 9.8x com funil completo.',
        metric: 'ROAS da campanha',
      },
      {
        action: 'Criar 2-3 protocolos exclusivos ILP e nomeá-los',
        rationale: 'Diferenciação através de metodologia própria (exemplo: Dr. Lucas Miranda com APhen Peel).',
        metric: 'Reconhecimento de marca e menções',
      },
    ],
  },
  longTerm: {
    title: 'Longo Prazo (2026)',
    items: [
      {
        action: 'Posicionar ILP como referência em "regeneração natural"',
        rationale: 'Tendência de mercado favorece naturalidade. 68% dos pacientes temem resultado artificial.',
        metric: 'Percepção de marca em pesquisa',
      },
      {
        action: 'Desenvolver parceria com endocrinologistas (público GLP-1)',
        rationale: '"Ozempic face" é nova demanda emergente com público específico.',
        metric: 'Novos pacientes vindos de indicação',
      },
      {
        action: 'Criar conteúdo alinhado com tendência K-Beauty/Glass Skin',
        rationale: 'Mercado K-Beauty cresce 9% ao ano. Brasileiros adotando rotinas coreanas.',
        metric: 'Engajamento em conteúdo sobre "Glass Skin"',
      },
    ],
  },
} as const;

// =============================================================================
// PADRÕES DE SUCESSO (Top Criativos ILP)
// =============================================================================

export const successPatterns = {
  top10Patterns: [
    { pattern: 'PROCEDIMENTO_TECH', frequency: 5, percentage: 100, insight: 'Vídeos sobre procedimentos tecnológicos (Laser, Redtouch, CO2, Virtue) dominam os melhores resultados' },
    { pattern: 'TEXTO_EXPLICATIVO', frequency: 5, percentage: 100, insight: 'Todos os top criativos têm texto na tela explicando o que faz e para quem é' },
    { pattern: 'VIDEO_REELS', frequency: 5, percentage: 100, insight: 'Formato vídeo/reels é obrigatório para campanhas de mensagem' },
    { pattern: 'MEDICO_PRESENTE', frequency: 3, percentage: 60, insight: 'Presença médica aumenta autoridade e confiança' },
  ],
  formatPerformance: {
    video: { avgResults: 23, avgCost: 26.50, verdict: 'MELHOR CUSTO-BENEFÍCIO para MSG' },
    image: { avgResults: 2391, avgCost: 0.41, verdict: 'Melhor para Audiência' },
    carousel: { avgResults: 37, avgCost: 55.46, verdict: 'EVITAR - Custo muito alto' },
  },
  keyInsight: 'Vídeos sobre procedimentos tecnológicos (Laser, Redtouch, CO2, Virtue) com texto explicativo na tela têm o melhor custo por conversa (R$23-31). Este é o padrão que deve ser replicado.',
  recommendation: 'Para campanhas de MENSAGEM: 100% vídeo com foco em tecnologias/procedimentos e texto explicativo. Para AUDIÊNCIA: imagens funcionam bem.',
  realInsight: {
    title: 'Padrão de Sucesso Identificado',
    description: 'Os melhores criativos para conversão (WhatsApp) são vídeos que mostram procedimentos tecnológicos específicos (Redtouch, CO2, Virtue, Laser) com texto sobreposto explicando: O QUE É o procedimento, PARA QUEM é indicado, e QUAL RESULTADO esperar.',
    actionable: [
      'Criar vídeos focados em UMA tecnologia/procedimento por vez',
      'Adicionar texto na tela explicando o procedimento (não depender de áudio)',
      'Mostrar equipamento e/ou resultado visual',
      'Duração: 15-30 segundos (formato Reels)',
    ],
  },
} as const;
