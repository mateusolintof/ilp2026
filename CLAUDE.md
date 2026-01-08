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

# Documentação do Projeto - Status Atual

## Progresso Geral

| Milestone | Status | Descrição |
|-----------|--------|-----------|
| 1. Setup e Infraestrutura | ✅ Concluído | Next.js 16.1.1, TypeScript, Tailwind v4 |
| 2. Extração de Dados | ✅ Concluído | 4 scripts, dados estruturados |
| 3. Pesquisa e Validação | ✅ Concluído | Benchmarks com fontes, tendências 2026 |
| 4. Análise de Criativos | ✅ Concluído | Rankings, padrões, cruzamentos |
| 5. Design System | ✅ Concluído | Tokens, componentes UI, gráficos, 3D |
| 6-9. Slides | ✅ Concluído | 8 slides implementados |
| 10. Navegação | ✅ Concluído | Setas, teclado, indicadores |
| 11. Pesquisa de Mercado | ✅ Concluído | Benchmarks, tendências, concorrentes |
| 12. Análise Estatística | ✅ Concluído | Correlações Pearson, p-value, regressão |
| 13. Deploy | 🔄 Em Progresso | Vercel |

---

## Estrutura de Arquivos

```
/ILP-Report
├── /src
│   ├── /app/
│   │   ├── page.tsx           # Página principal com navegação
│   │   ├── layout.tsx         # Layout root
│   │   └── globals.css        # Design tokens e estilos
│   ├── /components/
│   │   ├── /3d/
│   │   │   └── ParticleBackground.tsx  # Background 3D com partículas
│   │   ├── /charts/
│   │   │   ├── BarChart.tsx   # Gráfico de barras
│   │   │   ├── LineChart.tsx  # Gráfico de linhas
│   │   │   ├── PieChart.tsx   # Gráfico de pizza
│   │   │   └── MetricCard.tsx # Card de métrica
│   │   ├── /slides/
│   │   │   ├── SlideCover.tsx          # 1. Capa
│   │   │   ├── SlideExecutiveSummary.tsx # 2. Resumo Executivo
│   │   │   ├── SlidePaidTraffic.tsx    # 3. Tráfego Pago
│   │   │   ├── SlideCreatives.tsx      # 4. Criativos
│   │   │   ├── SlideOrganic.tsx        # 5. Orgânico
│   │   │   ├── SlideClosings.tsx       # 6. Fechamento
│   │   │   ├── SlideDataCrossing.tsx   # 7. Cruzamento
│   │   │   └── SlideInsightsTrends.tsx # 8. Insights
│   │   └── /ui/
│   │       ├── Button.tsx     # Botões
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
│   │   │   └── analysis.ts    # Rankings, insights, comportamento
│   │   └── /utils/
│   │       └── index.ts       # Utilitários (formatCurrency, etc)
│   └── /types/
│       └── index.ts           # Tipos TypeScript
├── /scripts/
│   ├── extract-campaigns.ts   # Extração de CSVs de campanhas
│   ├── extract-creatives.ts   # Extração de Excel de criativos
│   ├── extract-organic.ts     # Extração de CSVs orgânicos
│   ├── extract-closings.ts    # Extração de Excel de fechamento
│   ├── statistical-analysis.py # Análise estatística com correlações
│   └── /agents/
│       ├── creative-analyzer.ts   # Análise de criativos
│       └── behavior-analyzer.ts   # Padrões comportamentais
├── /outputs/                   # ⭐ NOVA PASTA - Pesquisa e Análise
│   ├── /research/
│   │   ├── benchmarks-meta-ads-2025.md  # Benchmarks com fontes verificáveis
│   │   └── market-trends-2026.md        # Tendências do setor
│   ├── /scraped-data/
│   │   ├── ilp-instagram-profile.json   # Dados do @institutolucianeprado
│   │   └── competitors-instagram.json   # Perfis dos concorrentes
│   ├── /analysis/
│   │   └── statistical-correlations.json # Correlações Pearson, p-value
│   └── /assets/
│       ├── /ilp-creatives/              # Thumbnails do ILP
│       └── /competitor-creatives/       # Thumbnails concorrentes
└── /docs/
    ├── PLANO-ESTRATEGICO.md   # Plano aprovado de transformação
    └── marketing-research.md  # Benchmarks e tendências (legado)
```

---

## Outputs de Pesquisa (NOVO)

### /outputs/research/

| Arquivo | Descrição | Fontes |
|---------|-----------|--------|
| `benchmarks-meta-ads-2025.md` | Benchmarks CTR, CPC, CPM, CVR por setor | WordStream, Superads, Bestever AI, LocalIQ |
| `market-trends-2026.md` | Tendências dermatologia estética 2026 | PR Newswire, Forbes, Galderma |

### /outputs/scraped-data/

| Arquivo | Descrição | Ferramenta |
|---------|-----------|------------|
| `ilp-instagram-profile.json` | Perfil completo @institutolucianeprado | Apify Instagram Scraper |
| `competitors-instagram.json` | 4 concorrentes analisados | Apify Instagram Scraper |

### /outputs/analysis/

| Arquivo | Descrição | Método |
|---------|-----------|--------|
| `statistical-correlations.json` | Correlações Pearson com p-value | Python (scipy equivalent) |

---

## Análise Estatística

### Correlações Calculadas (Pearson)

| Correlação | r | p-value | Significância |
|------------|---|---------|---------------|
| Investimento Pago → Views Orgânicos | 0.99 | 0.02 | ✅ Significativo |
| Views Orgânicos → Procedimentos | 0.42 | 0.83 | ❌ Não significativo |
| Investimento → Receita | 0.35 | 0.88 | ❌ Não significativo |
| Resultados Pagos → Procedimentos | 0.33 | 0.89 | ❌ Não significativo |

### Insight Principal
**Correlação r=0.99** entre investimento pago e views orgânicos indica que campanhas pagas **amplificam** o alcance orgânico, não competem com ele.

### Regressão Linear
- **Modelo**: Receita = 57.50 × Investimento + 269.870
- **R²**: 0.12 (modelo explicativo fraco - muitas variáveis externas)
- **Interpretação prática**: Cada R$ 1 em marketing gera ~R$ 57 em receita adicional

---

## Dados Extraídos

### Campanhas Pagas (`campaigns.ts`)
- **Total:** 30 campanhas
- **MENSAGEM:** 11 campanhas | R$ 11.432,47 | 265 conversas WhatsApp
- **AUDIÊNCIA:** 19 campanhas | R$ 10.207,61 | 22.411 visitas ao perfil

### Criativos (`creatives.ts`)
- **Total:** 33 criativos
- **Formatos:** 7 vídeos, 24 imagens, 2 carrosséis
- **Top MENSAGEM:** Video Bioestimulador (1.510 resultados, R$ 0,43/resultado)
- **Top AUDIÊNCIA:** Post IG 07.11 (2.825 visitas, R$ 0,41/visita)

### Orgânico (`organic.ts`)
- **Feed/Reels:** 57 posts | 1.376.909 views | 451.965 alcance
- **Stories:** 445 stories | 163.087 views | 132.128 alcance
- **Tipos:** 36 Reels, 18 Carrosséis, 3 Imagens

### Fechamento (`closings.ts`)
- **Total:** 1.621 procedimentos | R$ 2.323.874,90
- **Top Categoria:** Toxina Botulínica (30,7% da receita)
- **Mês mais forte:** Novembro (R$ 707.847,43)

---

## Métricas Principais

### ROI e Performance
- **ROI Marketing:** 10.639%
- **Receita por R$ 1 investido:** R$ 107,39
- **Custo por procedimento:** R$ 13,35
- **Investimento total:** R$ 21.640,08
- **Faturamento total:** R$ 2.323.874,90

### Padrões de Sucesso
- **REELS:** 40% dos top performers
- **MEDICO_PRESENTE:** 40% dos top performers
- **BLACK_FRIDAY:** 40% dos top performers
- **VIDEO:** 20% dos top performers

### Padrões Comportamentais
- **Melhor dia:** Sexta-feira (58.000 views - 107% melhor que domingo)
- **Melhor horário:** Manhã 6h-12h (132.600 views/post)
- **Mês mais forte:** Novembro (R$ 707.847,43)

---

## Navegação do Dashboard

O dashboard possui 8 slides navegáveis:

1. **Capa** - Contexto e KPIs principais
2. **Resumo Executivo** - TL;DR com ROI e performance
3. **Tráfego Pago** - Campanhas MSG e AUD
4. **Criativos** - Top 5 rankings e padrões
5. **Orgânico** - Feed/Reels e Stories
6. **Fechamento** - Receita e procedimentos
7. **Cruzamento** - Correlações de dados
8. **Insights** - Tendências 2026 e recomendações

### Controles de Navegação
- **Setas na tela** - Clique para navegar
- **Teclado:** ← → (navegação), Space (próximo), Home/End (início/fim)
- **Indicadores** - Clique nos pontos para ir ao slide

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run lint         # Verificar ESLint

# Scripts de extração (TypeScript)
npx ts-node scripts/extract-campaigns.ts
npx ts-node scripts/extract-creatives.ts
npx ts-node scripts/extract-organic.ts
npx ts-node scripts/extract-closings.ts

# Agentes de análise (TypeScript)
npx ts-node scripts/agents/creative-analyzer.ts
npx ts-node scripts/agents/behavior-analyzer.ts

# Análise estatística (Python)
python3 scripts/statistical-analysis.py
```

---

## Tecnologias

- **Framework:** Next.js 16.1.1
- **Linguagem:** TypeScript + Python (análise)
- **Estilização:** Tailwind CSS v4
- **Animações:** Framer Motion
- **3D:** React Three Fiber
- **Gráficos:** Recharts
- **Ícones:** Lucide React

---

## APIs Utilizadas

- ✅ **Tavily** - Pesquisa de tendências e benchmarks
- ✅ **Apify** - Scraping Instagram e Meta Ads
- ⏳ **OpenAI** - Solicitar se necessário para análise visual

---

## Concorrentes Analisados

| Perfil | Seguidores | Posts | Relevância |
|--------|------------|-------|------------|
| @drlucasmiranda.dermato | 125.467 | 1.969 | ALTA - Benchmark nacional |
| @clinicamichelineneves | 8.710 | 1.169 | MÉDIA - Posicionamento similar |
| @institutofelici | 453 | 89 | BAIXA - Modelo diferente |
| @belapele.derma | 14 | 16 | BAIXA - Não concorrente |

**ILP Position:** 24.643 seguidores | 739 posts | 2º lugar entre analisados

---

## Próximos Passos

1. ⏳ Atualizar slides com dados de pesquisa real
2. ⏳ Adicionar componentes de benchmark comparativo
3. ⏳ Incluir galeria de criativos nos slides
4. ⏳ Deploy em Vercel
