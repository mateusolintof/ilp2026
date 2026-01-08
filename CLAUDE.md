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

---

## Estrutura de Arquivos

```
/ILP-Report
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
│   │   │   ├── SlideExecutiveSummary.tsx # 2. Resumo Executivo + ROI
│   │   │   ├── SlidePaidTraffic.tsx    # 3. Trafego Pago + Benchmarks
│   │   │   ├── SlideCreatives.tsx      # 4. Criativos + Padroes
│   │   │   ├── SlideOrganic.tsx        # 5. Organico + Competidores
│   │   │   ├── SlideClosings.tsx       # 6. Fechamento + Tendencias
│   │   │   ├── SlideDataCrossing.tsx   # 7. Cruzamento + Correlacoes
│   │   │   └── SlideInsightsTrends.tsx # 8. Insights + Recomendacoes
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
│   │   │   └── research.ts    # ⭐ NOVO: Benchmarks, correlacoes, tendencias
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
    └── marketing-research.md  # Benchmarks e tendencias (legado)
```

---

## Arquivo de Dados Centralizado (research.ts)

O arquivo `src/lib/data/research.ts` centraliza todos os dados de pesquisa e analise estatistica:

### Exports Disponiveis

| Export | Descricao | Uso |
|--------|-----------|-----|
| `benchmarks` | Meta Ads benchmarks 2025 por setor | SlidePaidTraffic |
| `ilpVsBenchmarks` | Comparacao ILP vs mercado | SlideExecutiveSummary, SlidePaidTraffic |
| `correlations` | Correlacoes Pearson com p-value | SlideDataCrossing |
| `regression` | Modelo de regressao linear | SlideDataCrossing |
| `performanceMetrics` | ROI, custo/procedimento, ticket medio | SlideExecutiveSummary, SlideClosings |
| `seasonality` | Padroes por dia, hora, mes | SlideDataCrossing |
| `competitors` | Analise competitiva Instagram | SlideOrganic |
| `trends2026` | Tendencias dermatologia 2026 | SlideInsightsTrends, SlideClosings |
| `successPatterns` | Padroes de sucesso criativos | SlideCreatives |
| `actionableInsights` | Insights acionaveis | SlideInsightsTrends |
| `strategicRecommendations` | Recomendacoes por prazo | SlideInsightsTrends |

### Fontes Verificadas

- **WordStream 2025** - Benchmarks CTR, CPC por industria
- **Superads** - CPC Facebook Ads
- **Bestever AI** - CTR, CVR Beauty/Healthcare
- **LocalIQ** - CPL por setor
- **Lebesgue** - CPM, CAC Beauty
- **Madgicx** - Meta Ads benchmarking
- **Apify** - Scraping Instagram (perfis, posts)
- **Tavily** - Pesquisa tendencias 2026

---

## Detalhes por Slide

### Slide 2: Resumo Executivo
**Arquivo:** `SlideExecutiveSummary.tsx`
**Dados importados:** `performanceMetrics`, `ilpVsBenchmarks`

Conteudo adicionado:
- Secao ROI Highlight com 4 metricas-chave
- Comparacao ILP vs benchmarks de mercado
- Status indicators (EXCELENTE, DENTRO, EXCEPCIONAL)

### Slide 3: Trafego Pago
**Arquivo:** `SlidePaidTraffic.tsx`
**Dados importados:** `benchmarks`, `ilpVsBenchmarks`

Conteudo adicionado:
- Secao "ILP vs Benchmarks de Mercado"
- Cards comparativos CTR, CPL, CPC, CVR
- Citacao de fontes (WordStream, LocalIQ, Bestever AI)
- Insights box atualizado com dados reais

### Slide 4: Criativos
**Arquivo:** `SlideCreatives.tsx`
**Dados importados:** `successPatterns`

Conteudo adicionado:
- Secao "Performance por Formato" (video vs imagem vs carrossel)
- Padroes de sucesso vindos de research.ts
- Key insight principal
- Recomendacoes baseadas em dados

### Slide 5: Organico
**Arquivo:** `SlideOrganic.tsx`
**Dados importados:** `competitors`, `correlations`

Conteudo adicionado:
- Secao "Analise Competitiva" com 3 cards:
  - ILP (@institutolucianeprado)
  - Benchmark (@drlucasmiranda.dermato)
  - Potencial de Crescimento
- Card insight correlacao pago-organico (r=0.99)
- Gap vs benchmark atualizado

### Slide 6: Fechamento
**Arquivo:** `SlideClosings.tsx`
**Dados importados:** `trends2026`, `performanceMetrics`

Conteudo adicionado:
- Secao "Alinhamento com Tendencias 2026"
- Macro trend (Regeneracao > Preenchimento)
- Matrix servicos vs tendencias com acoes
- Insights box com ROI e custo/procedimento

### Slide 7: Cruzamento
**Arquivo:** `SlideDataCrossing.tsx`
**Dados importados:** `correlations`, `regression`, `seasonality`

Conteudo adicionado:
- Secao "Correlacoes Estatisticas (Pearson)"
- 4 cards com r, p-value, interpretacao
- Indicadores de significancia estatistica
- Modelo de regressao linear
- Insight principal com citacao metodologica

### Slide 8: Insights
**Arquivo:** `SlideInsightsTrends.tsx`
**Dados importados:** `actionableInsights`, `trends2026`, `strategicRecommendations`

Conteudo adicionado:
- 5 insights acionaveis com prioridade
- Tendencias dermatologia 2026
- Influencia K-Beauty
- Recomendacoes por prazo (imediato, curto, longo)

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
- **Interpretacao pratica**: Cada R$ 1 em marketing gera ~R$ 57 em receita adicional

---

## Metricas Principais

### ROI e Performance
- **ROI Marketing:** 10.639%
- **Receita por R$ 1 investido:** R$ 107,39
- **Custo por procedimento:** R$ 13,35
- **Investimento total:** R$ 21.640,08
- **Faturamento total:** R$ 2.323.874,90

### Padroes de Sucesso (Top 10 Criativos)
- **REELS:** 40% (4 de 10)
- **MEDICO_PRESENTE:** 40% (4 de 10)
- **BLACK_FRIDAY:** 40% (4 de 10)
- **VIDEO:** 20% (2 de 10)
- **BIOESTIMULADOR:** 10% (1 de 10)

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

## Analise Competitiva

| Perfil | Seguidores | Posts | Relevancia |
|--------|------------|-------|------------|
| @drlucasmiranda.dermato | 125.467 | 1.969 | ALTA - Benchmark nacional |
| @institutolucianeprado (ILP) | 24.643 | 739 | 2o lugar |
| @clinicamichelineneves | 8.710 | 1.169 | MEDIA - Posicionamento similar |

### Gap vs Benchmark
- **Seguidores:** +100.824 para alcançar benchmark
- **Posts:** +1.230 para alcançar benchmark
- **Verificacao:** Oportunidade (benchmark e verificado)

---

## Navegacao do Dashboard

O dashboard possui 8 slides navegaveis:

1. **Capa** - Contexto e KPIs principais
2. **Resumo Executivo** - ROI highlight, benchmarks, status
3. **Trafego Pago** - Campanhas MSG/AUD, ILP vs mercado
4. **Criativos** - Performance por formato, padroes de sucesso
5. **Organico** - Analise competitiva, correlacao pago-organico
6. **Fechamento** - Tendencias 2026, oportunidades por servico
7. **Cruzamento** - Correlacoes Pearson, regressao, sazonalidade
8. **Insights** - Insights acionaveis, recomendacoes estrategicas

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
- ⏳ **OpenAI** - Disponivel se necessario para analise visual

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
| 2026-01-08 | a03e409 | feat: Add data-driven research, statistical analysis |
| 2026-01-08 | 04e1624 | feat: Add data-driven research (previous) |
| 2026-01-07 | a6f5829 | fix: Ajustes visuais nos slides |
| 2026-01-07 | d70a496 | fix: Remove hamburger menu |
| 2026-01-07 | ff66454 | feat: Complete Milestones 5-10 |

---

## Proximos Passos (Opcoes Futuras)

1. ⏳ Adicionar galeria visual de criativos (thumbnails)
2. ⏳ Implementar exportacao PDF dos slides
3. ⏳ Criar versao interativa com filtros
4. ⏳ Adicionar mais metricas de tendencias em tempo real
5. ⏳ Dashboard de acompanhamento continuo
