# PLANO ESTRATÉGICO: Transformação do ILP Report

> **Data**: 08/01/2026
> **Status**: APROVADO - Em execução
> **Responsável**: Claude Code

---

## VISÃO GERAL

### Situação Atual
O dashboard existe visualmente mas o conteúdo é:
- Raso e genérico
- Sem embasamento em dados reais de mercado
- Sem análise de concorrentes
- Sem correlações estatísticas reais
- Sem insights acionáveis
- Sem visualização dos criativos reais

### Objetivo Final
Uma apresentação de dados **robusta, fundamentada e acionável** onde:
- Cada número tem fonte e contexto
- Concorrentes são analisados visualmente com criativos reais
- Correlações são estatisticamente válidas
- Insights são específicos e executáveis
- O cliente sai sabendo EXATAMENTE o que fazer

---

## ESTRUTURA DE OUTPUTS

```
/outputs/
├── /research/
│   ├── benchmarks-meta-ads-2025.md      # Benchmarks do mercado
│   ├── competitors-preliminary.md        # Pesquisa inicial de concorrentes
│   ├── competitors-audit.md              # Auditoria completa
│   └── market-trends-2026.md             # Tendências do setor
├── /scraped-data/
│   ├── ilp-instagram-profile.json        # Dados do @institutolucianeprado
│   ├── ilp-meta-ads.json                 # Anúncios do ILP no Meta
│   ├── competitors-meta-ads.json         # Anúncios dos concorrentes
│   └── competitors-instagram.json        # Perfis dos concorrentes
├── /analysis/
│   ├── statistical-correlations.md       # Análise estatística
│   ├── creative-patterns.md              # Padrões de criativos
│   └── actionable-insights.md            # Insights finais
└── /assets/
    ├── /ilp-creatives/                   # Thumbnails do ILP
    └── /competitor-creatives/            # Thumbnails concorrentes
```

---

## FASE 1: PESQUISA E COLETA DE DADOS

### 1.1 Benchmarks de Mercado (Meta Ads Brasil 2024-2025)

**Objetivo**: Obter benchmarks REAIS com FONTE para comparar performance do ILP

**Agente**: `benchmark-researcher`

**Ferramentas a usar**:
- `mcp__tavily-mcp__tavily-search` - Pesquisa de benchmarks
- `WebFetch` - Extrair dados de relatórios específicos

**Dados a coletar**:
| Métrica | Segmento | Fonte esperada |
|---------|----------|----------------|
| CPM médio | Saúde/Estética Brasil | WordStream, Hootsuite, Meta Business |
| CPC médio | Dermatologia | Relatórios de agências |
| CTR por formato | Reels, Stories, Feed | Estudos de performance |
| Custo por lead | Setor estética | Cases de mercado |
| Taxa conversão WhatsApp | Clínicas médicas | Benchmarks de agências |
| Engajamento médio Instagram | Saúde/Beleza | Sprout Social, Later |

**Output**: `/outputs/research/benchmarks-meta-ads-2025.md`

---

### 1.2 Auditoria de Concorrentes

**Objetivo**: Identificar e analisar 5-10 clínicas concorrentes relevantes

**Etapa 1: Descoberta de Concorrentes**

**Agente**: `competitor-discovery`

**Ferramentas**:
- `mcp__tavily-mcp__tavily-search` - Buscar clínicas de dermatologia
- `mcp__apify__search-actors` - Encontrar scrapers relevantes
- `mcp__apify__apify-slash-facebook-search-scraper` - Buscar páginas de clínicas

**Termos de busca**:
- "clínica dermatologia estética Instagram"
- "dermatologista botox bioestimuladores"
- "tratamento pele laser dermatologia"
- "clínica dermatologia [Palmas/Goiânia/Brasília]" (região próxima)

**Critérios de seleção**:
1. Clínica de DERMATOLOGIA (não cirurgia plástica)
2. Presença ativa no Instagram (>10k seguidores)
3. Anúncios ativos no Meta Ads Library
4. Serviços similares: Botox, bioestimuladores, lasers, peelings

---

**Etapa 2: Extração de Anúncios dos Concorrentes**

**Agente**: `competitor-ads-scraper`

**Ferramentas**:
- `mcp__apify__apify-slash-facebook-ads-scraper` - Extrair anúncios do Meta Ads Library
- `mcp__apify__curious_coder-slash-facebook-ads-library-scraper` - Alternativa

**Dados a extrair por concorrente**:
- Todos os anúncios ativos
- Formato (imagem, vídeo, carrossel)
- Copy do anúncio
- CTA usado
- Data de início
- Plataformas (FB, IG, Messenger)
- Preview/thumbnail URL

**Output**: `/outputs/scraped-data/competitors-meta-ads.json`

---

**Etapa 3: Extração de Perfis Instagram dos Concorrentes**

**Agente**: `competitor-instagram-scraper`

**Ferramentas**:
- `mcp__apify__apify-slash-instagram-profile-scraper` - Dados do perfil
- `mcp__apify__apify-slash-instagram-post-scraper` - Posts recentes
- `mcp__apify__apify-slash-instagram-reel-scraper` - Reels

**Dados a extrair**:
- Bio, seguidores, seguindo
- Últimos 30 posts (formato, engajamento, copy)
- Top 10 reels por views
- Frequência de postagem
- Hashtags mais usadas

**Output**: `/outputs/scraped-data/competitors-instagram.json`

---

### 1.3 Extração de Dados do ILP

**Objetivo**: Obter dados reais do Instagram e Meta Ads do Instituto Luciane Prado

**Agente**: `ilp-data-scraper`

**Ferramentas**:
- `mcp__apify__apify-slash-instagram-profile-scraper` - Perfil @institutolucianeprado
- `mcp__apify__apify-slash-instagram-post-scraper` - Posts
- `mcp__apify__apify-slash-instagram-reel-scraper` - Reels
- `mcp__apify__apify-slash-facebook-ads-scraper` - Anúncios ativos

**Dados a extrair**:
- Perfil completo do Instagram
- Todos os posts do período (Set-Dez 2025)
- Reels com métricas
- Anúncios ativos no Meta Ads Library
- Thumbnails/previews dos criativos

**Outputs**:
- `/outputs/scraped-data/ilp-instagram-profile.json`
- `/outputs/scraped-data/ilp-meta-ads.json`
- `/outputs/assets/ilp-creatives/` (thumbnails)

---

### 1.4 Pesquisa de Tendências 2026

**Objetivo**: Identificar tendências do setor para recomendações futuras

**Agente**: `trends-researcher`

**Ferramentas**:
- `mcp__tavily-mcp__tavily-search` - Pesquisa de tendências
- `WebSearch` - Busca complementar

**Tópicos a pesquisar**:
- Tendências dermatologia estética 2026
- Novos procedimentos em alta (bioestimuladores, etc)
- Mudanças em algoritmo Instagram 2025-2026
- Tendências de marketing para clínicas médicas
- Comportamento do consumidor de estética

**Output**: `/outputs/research/market-trends-2026.md`

---

## FASE 2: ANÁLISE ESTATÍSTICA

### 2.1 Correlações de Dados

**Objetivo**: Calcular correlações estatísticas reais entre variáveis

**Agente**: `statistical-analyzer`

**Script a criar**: `/scripts/agents/statistical-analyzer.ts`

**Análises a realizar**:

1. **Correlação Pearson: Investimento Pago → Engajamento Orgânico**
   - Variáveis: Budget semanal vs Views orgânicos
   - Lag: 0, 7, 14 dias
   - Output: r, p-value, interpretação

2. **Correlação: Engajamento Orgânico → Fechamentos**
   - Variáveis: Views/Alcance vs Procedimentos realizados
   - Lag: 7, 14, 21 dias
   - Hipótese: Mais engajamento = mais agendamentos

3. **Análise de Sazonalidade**
   - Dia da semana vs Performance
   - Horário de publicação vs Engajamento
   - Mês vs Receita

4. **Regressão: Investimento → Receita**
   - Modelo linear para prever impacto de aumento de budget

**Output**: `/outputs/analysis/statistical-correlations.md`

---

### 2.2 Análise de Padrões de Criativos

**Objetivo**: Identificar padrões de sucesso nos criativos (ILP + Concorrentes)

**Agente**: `creative-pattern-analyzer`

**Script a criar**: `/scripts/agents/creative-pattern-analyzer.ts`

**Análises**:
1. **Formatos que performam melhor** (Reels vs Imagem vs Carrossel)
2. **Elementos visuais de sucesso** (médico presente, antes/depois, tecnologia)
3. **Copies que convertem** (CTAs, gatilhos, tom de voz)
4. **Horários e dias de melhor performance**
5. **Comparativo ILP vs Concorrentes**

**Output**: `/outputs/analysis/creative-patterns.md`

---

## FASE 3: GERAÇÃO DE INSIGHTS ACIONÁVEIS

### 3.1 Insights Estratégicos

**Objetivo**: Transformar dados em ações específicas e executáveis

**Agente**: `insight-generator`

**Script a criar**: `/scripts/agents/insight-generator.ts`

**Estrutura de cada insight**:
```typescript
interface ActionableInsight {
  id: string;
  title: string;
  category: 'ESCALAR' | 'REPLICAR' | 'DESLIGAR' | 'TESTAR' | 'OTIMIZAR';
  problem: string;
  data: { metric: string; currentValue: number; benchmark: number; source: string; }[];
  action: { what: string; how: string; when: string; budget: number; };
  expectedResult: { metric: string; improvement: string; timeframe: string; };
  confidence: 'ALTA' | 'MÉDIA' | 'BAIXA';
  priority: 1 | 2 | 3;
}
```

**Insights a gerar**:
1. **ESCALAR**: Qual campanha aumentar budget
2. **REPLICAR**: Qual formato/criativo replicar
3. **DESLIGAR**: Qual campanha pausar
4. **OTIMIZAR**: Horário/dia de publicação
5. **TESTAR**: Novos formatos/abordagens

**Output**: `/outputs/analysis/actionable-insights.md`

---

## FASE 4: ATUALIZAÇÃO DOS SLIDES

### 4.1 Novos Componentes a Criar

| Componente | Função |
|------------|--------|
| `BenchmarkComparison.tsx` | Compara métrica ILP vs Mercado com fonte |
| `CreativeGallery.tsx` | Galeria de thumbnails dos criativos |
| `CompetitorCard.tsx` | Card com dados de um concorrente |
| `CorrelationChart.tsx` | Visualiza correlação com r e p-value |
| `ActionableInsightCard.tsx` | Card de insight estruturado |
| `SourceBadge.tsx` | Badge com link para fonte do dado |

### 4.2 Slides a Atualizar

| Slide | Melhorias |
|-------|-----------|
| 2 - Resumo Executivo | Benchmarks comparativos, fontes |
| 3 - Tráfego Pago | CPM/CPC/CTR vs mercado |
| 4 - Criativos | Galeria visual, comparativo concorrentes |
| 5 - Orgânico | Benchmarks engajamento |
| 7 - Cruzamento | Correlações com r e p-value |
| 8 - Insights | Insights acionáveis estruturados |

---

## FASE 5: ORDEM DE EXECUÇÃO

```
1. benchmark-researcher      → /outputs/research/benchmarks-meta-ads-2025.md
2. competitor-discovery      → Lista de concorrentes
3. competitor-ads-scraper    → /outputs/scraped-data/competitors-meta-ads.json  [PARALELO]
4. competitor-instagram      → /outputs/scraped-data/competitors-instagram.json [PARALELO]
5. ilp-data-scraper         → /outputs/scraped-data/ilp-*.json                  [PARALELO]
6. trends-researcher        → /outputs/research/market-trends-2026.md           [PARALELO]
7. statistical-analyzer     → /outputs/analysis/statistical-correlations.md
8. creative-pattern-analyzer → /outputs/analysis/creative-patterns.md
9. insight-generator        → /outputs/analysis/actionable-insights.md
10. slide-updater           → Slides atualizados
```

---

## SCRIPTS A CRIAR

| Script | Função |
|--------|--------|
| `/scripts/agents/benchmark-researcher.ts` | Pesquisa benchmarks via Tavily |
| `/scripts/agents/competitor-scraper.ts` | Extrai dados via Apify |
| `/scripts/agents/statistical-analyzer.ts` | Correlação Pearson, p-value, regressão |
| `/scripts/agents/creative-pattern-analyzer.ts` | Análise de padrões visuais |
| `/scripts/agents/insight-generator.ts` | Gera insights estruturados |

---

## CRITÉRIOS DE SUCESSO

- [ ] Todos os benchmarks têm fonte verificável com URL
- [ ] Mínimo 5 concorrentes analisados com dados reais
- [ ] Criativos do ILP visualizados com thumbnails
- [ ] Criativos de concorrentes para comparativo
- [ ] Correlações com coeficiente r e p-value
- [ ] Mínimo 5 insights acionáveis estruturados
- [ ] Cada insight tem: problema, dados, ação, resultado esperado
- [ ] Tendências 2026 com fontes
- [ ] Todos os slides atualizados com novos dados
- [ ] Pasta /outputs/ com toda documentação

---

## DEPENDÊNCIAS EXTERNAS

### APIs/Tokens:
- **Apify API Token**: Configurado no MCP
- **Tavily API**: Configurado no MCP

### Possíveis limitações:
- Rate limits do Apify
- Disponibilidade de dados no Meta Ads Library
- Perfis privados no Instagram
