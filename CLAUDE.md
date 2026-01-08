# Instruções

- Sempre abra o spec.md e revise as informações para tomar qualquer decisão.
- Antes de realizar commit e push, revise o que foi feito, debugando.
- Priorize tipagem e rode sempre eslint para certificar que está tudo correto.
- Sempre que necessário, crie Scripts ou Subagents para tarefas mais complexas ou especificas.
    - Exemplo:
        - Um agente ou script para realizar research de mercado
        - Um agente ou script para buscar criativos, fazer scraping e etc.
        - Um agente ou script para extrair dados de planilhas, estruturar esses dados em um arquivo e revisar o que foi feito
    Entre outras possibilidades.


**Repositorio Remoto para realizar commit e push**: https://github.com/mateusolintof/ilp2026.git

---

# Documentacao do Projeto - Status Atual

## Progresso Geral

| Milestone | Status | Descricao |
|-----------|--------|-----------|
| 1. Setup e Infraestrutura | ✅ Concluido | Next.js 16.1.1, TypeScript, Tailwind v4 |
| 2. Extracao de Dados | ✅ Concluido | 4 scripts, dados estruturados |
| 3. Pesquisa e Validacao | ✅ Concluido | Benchmarks com fontes, tendencias 2026 |
| 4. Analise de Criativos | ✅ Concluido | Rankings, padroes, cruzamentos |
| 5. Design System | ✅ Concluido | Tokens, componentes UI, graficos, 3D |
| 6-9. Slides | ✅ Concluido | 8 slides implementados |
| 10. Navegacao | ✅ Concluido | Setas, teclado, indicadores |
| 11. Pesquisa de Mercado | ✅ Concluido | Benchmarks, tendencias, concorrentes |
| 12. Analise Estatistica | ✅ Concluido | Correlacoes Pearson, p-value, regressao |
| 13. Integracao Dados nos Slides | ✅ Concluido | Todos slides com dados reais |
| 14. Deploy | ✅ Concluido | Vercel (auto-deploy via GitHub) |
| 15. Imagens dos Criativos | ✅ Concluido | 6 thumbnails Instagram nos Top 5 |
| 16. Refatoracao e Limpeza | ✅ Concluido | Remocao de dados nao verificaveis, expansao de insights |

---

## Estrutura de Arquivos

```
/ILP-Report
├── /public
│   └── /creatives/            # Thumbnails dos criativos Instagram
│       ├── post-04-09.png     # Post Reels 04/09
│       ├── post-05-11.png     # Post Carrossel 05/11
│       ├── post-07-11.png     # Post IG 07.11
│       ├── post-09-09.png     # Post Reels 09/09
│       ├── post-12-11.png     # Post IG 12.11 (Dra. Yasmin)
│       └── post-28-09.png     # Post Reels 28/09 (Dra. Yasmin)
├── /src
│   ├── /app/
│   │   ├── page.tsx           # Pagina principal com navegacao
│   │   ├── layout.tsx         # Layout root
│   │   └── globals.css        # Design tokens e estilos
│   ├── /components/
│   │   ├── /3d/
│   │   │   └── ParticleBackground.tsx  # Background 3D com particulas
│   │   ├── /charts/
│   │   │   ├── BarChart.tsx   # Grafico de barras
│   │   │   ├── LineChart.tsx  # Grafico de linhas
│   │   │   ├── PieChart.tsx   # Grafico de pizza
│   │   │   └── MetricCard.tsx # Card de metrica
│   │   ├── /slides/
│   │   │   ├── SlideCover.tsx          # 1. Capa
│   │   │   ├── SlideExecutiveSummary.tsx # 2. Resumo Executivo + Benchmarks
│   │   │   ├── SlidePaidTraffic.tsx    # 3. Trafego Pago + Benchmarks
│   │   │   ├── SlideCreatives.tsx      # 4. Criativos + Imagens + Padroes
│   │   │   ├── SlideOrganic.tsx        # 5. Organico + Correlacao Pago-Organico
│   │   │   ├── SlideClosings.tsx       # 6. Fechamento + Oportunidades 2026
│   │   │   ├── SlideDataCrossing.tsx   # 7. Cruzamento + Correlacoes Expandidas
│   │   │   └── SlideInsightsTrends.tsx # 8. Insights Acionaveis + Recomendacoes
│   │   └── /ui/
│   │       ├── Button.tsx     # Botoes
│   │       ├── Card.tsx       # Cards
│   │       ├── Badge.tsx      # Badges
│   │       ├── ProgressBar.tsx # Barras de progresso
│   │       ├── Tooltip.tsx    # Tooltips
│   │       └── Typography.tsx # Tipografia
│   ├── /lib/
│   │   ├── /data/
│   │   │   ├── campaigns.ts   # 30 campanhas (11 MSG, 19 AUD)
│   │   │   ├── creatives.ts   # 33 criativos (15 MSG, 18 AUD)
│   │   │   ├── organic.ts     # 502 posts (57 Feed/Reels, 445 Stories)
│   │   │   ├── closings.ts    # 1.621 procedimentos
│   │   │   ├── analysis.ts    # Rankings, insights, comportamento
│   │   │   └── research.ts    # Benchmarks, correlacoes expandidas, tendencias, frameworks
│   │   └── /utils/
│   │       └── index.ts       # Utilitarios (formatCurrency, etc)
│   └── /types/
│       └── index.ts           # Tipos TypeScript
├── /scripts/
│   ├── extract-campaigns.ts   # Extracao de CSVs de campanhas
│   ├── extract-creatives.ts   # Extracao de Excel de criativos
│   ├── extract-organic.ts     # Extracao de CSVs organicos
│   ├── extract-closings.ts    # Extracao de Excel de fechamento
│   ├── statistical-analysis.py # Analise estatistica com correlacoes
│   └── /agents/
│       ├── creative-analyzer.ts   # Analise de criativos
│       └── behavior-analyzer.ts   # Padroes comportamentais
├── /outputs/
│   ├── /research/
│   │   ├── benchmarks-meta-ads-2025.md  # Benchmarks com fontes verificaveis
│   │   └── market-trends-2026.md        # Tendencias do setor
│   ├── /scraped-data/
│   │   ├── ilp-instagram-profile.json   # Dados do @institutolucianeprado
│   │   └── competitors-instagram.json   # Perfis dos concorrentes
│   ├── /analysis/
│   │   └── statistical-correlations.json # Correlacoes Pearson, p-value
│   └── /assets/
│       ├── /ilp-creatives/              # Thumbnails do ILP
│       └── /competitor-creatives/       # Thumbnails concorrentes
└── /docs/
    ├── PLANO-ESTRATEGICO.md   # Plano aprovado de transformacao
    ├── ilp-context.md         # Contexto do Instituto Luciane Prado
    └── marketing-research.md  # Benchmarks e tendencias
```

---

## Arquivo de Dados Centralizado (research.ts)

O arquivo `src/lib/data/research.ts` centraliza todos os dados de pesquisa e analise estatistica:

### Exports Disponiveis

| Export | Descricao | Uso |
|--------|-----------|-----|
| `benchmarks` | Meta Ads benchmarks 2025 por setor | SlidePaidTraffic |
| `ilpVsBenchmarks` | Comparacao ILP vs mercado (custo conversa, custo visita) | SlideExecutiveSummary, SlidePaidTraffic |
| `correlations` | Correlacoes Pearson com p-value e explicacoes expandidas | SlideDataCrossing, SlideOrganic |
| `regression` | Modelo de regressao linear com limitacoes documentadas | SlideDataCrossing |
| `seasonality` | Padroes por dia, hora, mes | SlideDataCrossing |
| `competitors` | Dados de perfis Instagram (ILP, benchmark) | Referencia |
| `trends2026` | Tendencias 2026, procedimentos, K-Beauty, ilpOpportunities | SlideInsightsTrends, SlideClosings |
| `creativeFrameworks` | Frameworks de criativos com cases e estruturas | Referencia |
| `successPatterns` | Padroes de sucesso criativos (formato, presenca medico) | SlideCreatives |
| `actionableInsights` | 5 insights acionaveis com prioridade e explicacoes | SlideInsightsTrends |
| `strategicRecommendations` | Recomendacoes por prazo (imediato, curto, longo) | SlideInsightsTrends |

### Fontes Verificadas

- **WordStream 2025** - Benchmarks CTR, CPC por industria
- **LocalIQ 2025** - CPL por setor (Physicians & Surgeons)
- **Madgicx 2025** - Meta Ads benchmarking
- **Bestever AI** - CTR, CVR Beauty/Healthcare
- **IAPAM** - Tendencias medicina regenerativa
- **Precedence Research** - Mercado skinboosters
- **Euromonitor** - K-Beauty Report 2025
- **Galderma Reports** - Tendencias estetica

---

## Detalhes por Slide

### Slide 2: Resumo Executivo
**Arquivo:** `SlideExecutiveSummary.tsx`
**Dados importados:** `ilpVsBenchmarks`

Conteudo:
- KPIs principais da operacao (investimento, resultados, receita)
- Comparacao ILP vs benchmarks de mercado (CPL, custo visita)
- Status indicators baseados em benchmarks verificaveis

**NOTA:** Removido card de "ROI Marketing" por ser calculo nao verificavel

### Slide 3: Trafego Pago
**Arquivo:** `SlidePaidTraffic.tsx`
**Dados importados:** `benchmarks`, `ilpVsBenchmarks`

Conteudo:
- Secao "ILP vs Benchmarks de Mercado"
- Cards comparativos CPL, custo visita
- Citacao de fontes (WordStream, LocalIQ, Madgicx)
- Performance por tipo de campanha (MSG vs AUD)

### Slide 4: Criativos
**Arquivo:** `SlideCreatives.tsx`
**Dados importados:** `successPatterns`, `creativeSummary`

Conteudo:
- Secao unificada "Melhores Criativos"
- 5 criativos selecionados com thumbnails visuais
- Badge indicando tipo de campanha (MENSAGEM/AUDIENCIA)
- Secao "Performance por Formato" (video vs imagem vs carrossel)
- Padroes de sucesso vindos de research.ts

### Slide 5: Organico
**Arquivo:** `SlideOrganic.tsx`
**Dados importados:** `correlations`

Conteudo:
- Metricas de trafego organico (posts, views, engagement)
- Insight expandido sobre correlacao pago-organico (r=0.99)
- Explicacao de "O que significa", "Por que importa", "Conclusao"

**NOTA:** Removida secao de "Analise Competitiva" (3 cards) por conter apenas comparacao superficial de seguidores

### Slide 6: Fechamento
**Arquivo:** `SlideClosings.tsx`
**Dados importados:** `trends2026`

Conteudo:
- KPIs de fechamento (total procedimentos, receita, ticket medio)
- Distribuicao por forma de pagamento
- Secao "Oportunidades ILP 2026" com 4 servicos estrategicos:
  - Bioestimuladores (ALTO)
  - Skinboosters (ALTO)
  - Protocolos Combinados (MEDIO-ALTO)
  - Ozempic Face (EMERGENTE)
- Cada oportunidade com contexto e acao recomendada

**NOTA:** Removidos cards de "Receita Paga/Pendente/Mes Destaque/Taxa Quitacao" por serem dados obvios sem insight

### Slide 7: Cruzamento
**Arquivo:** `SlideDataCrossing.tsx`
**Dados importados:** `correlations`, `regression`, `seasonality`

Conteudo:
- Secao "Correlacoes Estatisticas (Pearson)" com 4 cards expandidos:
  - Cada card mostra: r, p-value, interpretacao
  - Explicacao "O que significa" e "Por que importa"
  - Indicador de significancia estatistica
- Modelo de regressao linear com limitacoes documentadas
- Padroes de sazonalidade

### Slide 8: Insights
**Arquivo:** `SlideInsightsTrends.tsx`
**Dados importados:** `actionableInsights`, `trends2026`, `strategicRecommendations`

Conteudo:
- 5 insights acionaveis expandidos com:
  - Dados e significancia estatistica
  - "Por que importa" para contexto
  - "Como aplicar" com acoes concretas
  - Resultado esperado
- Tendencias dermatologia 2026
- Influencia K-Beauty (Glass Skin)
- Recomendacoes por prazo (imediato, curto, longo)

**NOTA:** Emojis substituidos por icones Lucide React para consistencia visual

---

## Analise Estatistica

### Correlacoes Calculadas (Pearson)

| Correlacao | r | p-value | Significancia |
|------------|---|---------|---------------|
| Investimento Pago → Views Organicos | 0.99 | 0.02 | ✅ Significativo |
| Views Organicos → Procedimentos | 0.42 | 0.83 | ❌ Nao significativo |
| Investimento → Receita | 0.35 | 0.88 | ❌ Nao significativo |
| Resultados Pagos → Procedimentos | 0.33 | 0.89 | ❌ Nao significativo |

### Insight Principal
**Correlacao r=0.99** entre investimento pago e views organicos indica que campanhas pagas **amplificam** o alcance organico, nao competem com ele.

### Regressao Linear
- **Modelo**: Receita = 57.50 x Investimento + 269.870
- **R2**: 0.12 (modelo explicativo fraco - muitas variaveis externas)
- **Limitacoes documentadas**: Amostra pequena (4 meses), variaveis nao controladas, sazonalidade (Black Friday)

---

## Metricas Verificaveis

### Dados de Campanhas (Set-Dez 2025)
- **Investimento total MSG:** R$ 11.432,47
- **Investimento total AUD:** R$ 10.207,61
- **Conversas geradas (MSG):** 265
- **Visitas ao perfil (AUD):** 22.411
- **Custo por conversa:** R$ 43,14
- **Custo por visita:** R$ 0,46

### Benchmarks de Mercado (Fontes Verificadas)
- **CPL Healthcare (LocalIQ):** $47.47 USD
- **CPC Meta Ads (Madgicx):** ~$1.00 USD
- **Custo visita ILP:** R$ 0,46 (54% abaixo benchmark)

### Padroes de Sucesso (Top 10 Criativos)
- **REELS:** 40% (4 de 10)
- **MEDICO_PRESENTE:** 40% (4 de 10)
- **BLACK_FRIDAY:** 40% (4 de 10)
- **VIDEO:** 20% (2 de 10)

### Performance por Formato
| Formato | Resultados Medios | Custo/Resultado |
|---------|-------------------|-----------------|
| Video | 764 | R$ 15,30 |
| Imagem | 716 | R$ 20,49 |
| Carrossel | 19 | R$ 40,75 |

### Padroes Comportamentais
- **Melhor dia:** Sexta-feira (58.000 views - 107% melhor que domingo)
- **Melhor horario:** Manha 6h-12h (132.600 views/post)
- **Mes mais forte:** Novembro (R$ 707.847,43)

---

## Navegacao do Dashboard

O dashboard possui 8 slides navegaveis:

1. **Capa** - Contexto e KPIs principais
2. **Resumo Executivo** - Benchmarks verificaveis, comparacao ILP vs mercado
3. **Trafego Pago** - Campanhas MSG/AUD, ILP vs benchmarks
4. **Criativos** - Performance por formato, padroes de sucesso
5. **Organico** - Metricas, correlacao pago-organico expandida
6. **Fechamento** - Procedimentos, oportunidades 2026 com contexto
7. **Cruzamento** - Correlacoes Pearson expandidas, regressao com limitacoes
8. **Insights** - Insights acionaveis detalhados, recomendacoes estrategicas

### Controles de Navegacao
- **Setas na tela** - Clique para navegar
- **Teclado:** ← → (navegacao), Space (proximo), Home/End (inicio/fim)
- **Indicadores** - Clique nos pontos para ir ao slide

---

## Comandos Uteis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de producao
npm run lint         # Verificar ESLint

# Scripts de extracao (TypeScript)
npx ts-node scripts/extract-campaigns.ts
npx ts-node scripts/extract-creatives.ts
npx ts-node scripts/extract-organic.ts
npx ts-node scripts/extract-closings.ts

# Agentes de analise (TypeScript)
npx ts-node scripts/agents/creative-analyzer.ts
npx ts-node scripts/agents/behavior-analyzer.ts

# Analise estatistica (Python)
python3 scripts/statistical-analysis.py
```

---

## Tecnologias

- **Framework:** Next.js 16.1.1
- **Linguagem:** TypeScript + Python (analise)
- **Estilizacao:** Tailwind CSS v4
- **Animacoes:** Framer Motion
- **3D:** React Three Fiber
- **Graficos:** Recharts
- **Icones:** Lucide React

---

## APIs Utilizadas

- ✅ **Tavily** - Pesquisa de tendencias e benchmarks
- ✅ **Apify** - Scraping Instagram e Meta Ads

---

## Deploy

- **Plataforma:** Vercel
- **Repositorio:** https://github.com/mateusolintof/ilp2026.git
- **Auto-deploy:** Ativado (push → deploy automatico)
- **Status:** ✅ Producao

---

## Historico de Commits Relevantes

| Data | Commit | Descricao |
|------|--------|-----------|
| 2026-01-08 | (pendente) | refactor: Remove unverifiable data, expand insights |
| 2026-01-08 | 60b1fab | feat: Add creative images to SlideCreatives |
| 2026-01-08 | a03e409 | feat: Add data-driven research, statistical analysis |
| 2026-01-07 | a6f5829 | fix: Ajustes visuais nos slides |
| 2026-01-07 | ff66454 | feat: Complete Milestones 5-10 |

---

## Mudancas Recentes (08/01/2026)

### Dados Removidos (nao verificaveis ou obvios)
- ❌ ROI Marketing 10.639% (calculo problematico)
- ❌ Custo por procedimento R$ 13,35 (atribuicao incerta)
- ❌ Receita por R$ 1 investido (derivado de ROI falso)
- ❌ Analise competitiva 3 cards (apenas seguidores, sem insight)
- ❌ Cards receita paga/pendente/mes destaque (dados obvios)
- ❌ Emojis nos insights (substituidos por Lucide icons)

### Dados Adicionados/Expandidos
- ✅ Explicacoes completas em cada correlacao (whatItMeans, whyItMatters)
- ✅ ilpOpportunities em trends2026 (4 servicos estrategicos)
- ✅ growth e term em kBeauty
- ✅ Limitacoes documentadas no modelo de regressao
- ✅ Contexto e acoes em cada oportunidade de servico

---

## Proximos Passos (Opcoes Futuras)

1. ⏳ Implementar exportacao PDF dos slides
2. ⏳ Criar versao interativa com filtros
3. ⏳ Adicionar mais metricas de tendencias em tempo real
4. ⏳ Dashboard de acompanhamento continuo
5. ⏳ Integracao com CRM para dados de conversao real
