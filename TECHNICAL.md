# Documentação Técnica — ILP Performance Report

Aplicação web em Next.js (App Router) que renderiza um relatório em formato de slides com dados consolidados de marketing e fechamento (Set–Dez/2025), incluindo benchmarks verificáveis e análises estatísticas quando aplicável.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4 (tokens em `src/app/globals.css`)
- Framer Motion (animações)
- Recharts (gráficos)
- React Three Fiber (background 3D)
- Lucide React (ícones)

## Rodando localmente

```bash
npm install
npm run dev
```

Comandos úteis:

```bash
npm run lint
npm run build
```

## Arquitetura (alto nível)

- **Entrada**: `src/app/page.tsx`
  - Controla estado do slide atual, navegação (setas/teclado/indicadores) e scroll vertical por slide.
  - Mantém header/footer fixos e conteúdo central com scroll.
- **Slides**: `src/components/slides/*`
  - Cada slide é um componente React, focado em narrativa + visualização.
- **Design System**: `src/components/ui/*` + tokens em `src/app/globals.css`
  - Componentes base (Card, Badge, Typography, etc.) e padrões de cores/espaçamento.
- **Dados**: `src/lib/data/*`
  - Dados estruturados (campanhas, orgânico, fechamento, pesquisa/benchmarks).
  - Sem chamadas externas em runtime: o dashboard é essencialmente “data-driven” local.

## Dados (fontes e organização)

### Dados estruturados (runtime)

- `src/lib/data/campaigns.ts`: tráfego pago, separado por objetivo (**MSG** vs **AUD**).
- `src/lib/data/organic.ts`: orgânico (Feed/Reels/Stories).
- `src/lib/data/closings.ts`: fechamentos (procedimentos, receita, mix, mensal).
- `src/lib/data/creatives.ts` + `src/lib/data/analysis.ts`: criativos e consolidações/rankings.

### Pesquisa / benchmarks / estatística (central)

`src/lib/data/research.ts` concentra “dados de referência” (mercado) e explicações:

- `benchmarks`: benchmarks por métrica/setor (com fontes).
- `ilpVsBenchmarks`: comparação ILP vs mercado (ex.: custo conversa, custo visita).
- `correlations`: correlações de Pearson com `r`, `pValue`, `whatItMeans`, `whyItMatters`.
- `regression`: modelo linear + limitações (amostra pequena, variáveis externas, sazonalidade).
- `seasonality`: padrões por dia/horário/mês.
- `trends2026`: tendências 2026 + oportunidades ILP (ação sugerida por oportunidade).
- `actionableInsights` e `strategicRecommendations`: insights priorizados e recomendações por horizonte.

> Observação: métricas derivadas que exigem atribuição/CRM (ex.: ROI “fechado”) foram evitadas/removidas quando não verificáveis.

## Mapeamento de slides → dados

- `SlideCover`: contextualização (sem cálculos críticos).
- `SlideExecutiveSummary`: KPIs + `ilpVsBenchmarks`.
- `SlidePaidTraffic`: MSG vs AUD + `benchmarks` e `ilpVsBenchmarks`.
- `SlideCreatives`: top performers e padrões (thumbnails em `public/creatives/*`).
- `SlideOrganic`: orgânico + correlação pago→orgânico (`correlations`).
- `SlideClosings`: fechamento + oportunidades 2026 (`trends2026`).
- `SlideDataCrossing`: correlações, regressão e sazonalidade (`correlations`, `regression`, `seasonality`).
- `SlideInsightsTrends`: insights acionáveis + tendências + recomendações (`actionableInsights`, `trends2026`, `strategicRecommendations`).

## Scripts (extração e análise)

Os scripts ficam em `scripts/` e servem para transformar planilhas/exports em dados tipados.

```bash
npx ts-node scripts/extract-campaigns.ts
npx ts-node scripts/extract-creatives.ts
npx ts-node scripts/extract-organic.ts
npx ts-node scripts/extract-closings.ts
python3 scripts/statistical-analysis.py
```

Entradas (dados brutos): `data/` (relatórios pago/orgânico/fechamento).

Saídas típicas: `src/lib/data/*` (dados tipados) e `outputs/*` (artefatos de análise/scraping).

## Deploy

- Vercel (auto-deploy via GitHub no branch `main`).

## Notas de manutenção

- **Tipagem + lint**: rode `npm run lint` antes de commits.
- **Recharts**: os wrappers em `src/components/charts/*` já tratam responsividade e estilos consistentes.
- **Arquivo grande**: `src/lib/data/closings.ts` pode gerar aviso do Babel por tamanho; não é erro de build.
