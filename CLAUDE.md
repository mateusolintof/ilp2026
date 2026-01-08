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
| 3. Pesquisa e Validação | ✅ Concluído | Benchmarks validados, tendências 2026 |
| 4. Análise de Criativos | ✅ Concluído | Rankings, padrões, cruzamentos |
| 5. Design System | 🔄 Pendente | Próximo milestone |
| 6-9. Slides | 🔄 Pendente | 8 slides a implementar |
| 10. Navegação | 🔄 Pendente | Scroll horizontal, teclado |
| 11. Deploy | 🔄 Pendente | Vercel |

---

## Estrutura de Arquivos Criados

```
/ILP-Report
├── /src
│   ├── /lib/data/
│   │   ├── campaigns.ts      # 30 campanhas (11 MSG, 19 AUD)
│   │   ├── creatives.ts      # 33 criativos (15 MSG, 18 AUD)
│   │   ├── organic.ts        # 502 posts (57 Feed/Reels, 445 Stories)
│   │   ├── closings.ts       # 1.621 procedimentos
│   │   └── analysis.ts       # Rankings, insights, comportamento
│   └── /types/
│       └── index.ts          # Tipos TypeScript
├── /scripts/
│   ├── extract-campaigns.ts  # Extração de CSVs de campanhas
│   ├── extract-creatives.ts  # Extração de Excel de criativos
│   ├── extract-organic.ts    # Extração de CSVs orgânicos
│   ├── extract-closings.ts   # Extração de Excel de fechamento
│   └── /agents/
│       ├── creative-analyzer.ts   # Análise de criativos e cruzamentos
│       └── behavior-analyzer.ts   # Padrões comportamentais
└── /docs/
    └── marketing-research.md  # Benchmarks e tendências (atualizado)
```

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

## Análise Realizada (`analysis.ts`)

### Top 5 Criativos - MENSAGEM
| Criativo | Conversas | Custo/Conv | Padrões |
|----------|-----------|------------|---------|
| Video Bioestimulador | 1.510 | R$ 0,43 | VIDEO, BIOESTIMULADOR |
| Post Reels 09/09 | 270 | R$ 0,60 | REELS |
| Post Reels 04/09 | 71 | R$ 0,63 | REELS |
| Carrossel 05/11 | 37 | R$ 55,46 | CAROUSEL, BLACK_FRIDAY |
| Vídeo Osterno | 29 | R$ 70,49 | VIDEO, MEDICO_PRESENTE |

### Top 5 Criativos - AUDIÊNCIA
| Criativo | Visitas | Custo/Visita | Padrões |
|----------|---------|--------------|---------|
| Post IG (07.11) | 2.825 | R$ 0,41 | MEDICO_PRESENTE |
| 5ps | 2.172 | R$ 0,56 | - |
| Dra. Yasmin (12.11) | 1.957 | R$ 0,40 | MEDICO_PRESENTE |
| Depoimento Ultraformer | 1.574 | R$ 0,35 | REELS |
| Dra. Yasmin (28/09) | 1.502 | R$ 0,37 | REELS, MEDICO_PRESENTE |

### Padrões de Sucesso Identificados
- **REELS:** 40% dos top performers
- **MEDICO_PRESENTE:** 40% dos top performers
- **BLACK_FRIDAY:** 40% dos top performers
- **VIDEO:** 20% dos top performers

### Métricas de Cruzamento
- **ROI Marketing:** 10.639%
- **Receita por R$ 1 investido:** R$ 107,39
- **Custo por procedimento:** R$ 13,35

### Padrões Comportamentais
- **Melhor dia:** Sexta-feira (233.186 views/post)
- **Melhor horário:** Manhã 6h-12h (132.600 views/post)
- **Mês mais forte:** Novembro (R$ 707.847,43)

---

## Insights Gerados

1. **Vídeos com médicos performam melhor** - Presença do Dr. Osterno ou Dra. Yasmin aumenta engajamento
2. **AUDIÊNCIA tem melhor custo-benefício** - Manter 60% do budget para awareness
3. **Toxina Botulínica é o carro-chefe** - 30,7% da receita, criar campanhas específicas
4. **Conteúdo orgânico deve ser impulsionado** - Posts com >10k views para AUDIÊNCIA
5. **ROI justifica aumento de investimento** - Aumentar budget 30% em Q1 2026

---

## Próximos Passos

### Milestone 5: Design System
- [ ] Definir Design Tokens (cores, tipografia)
- [ ] Criar componentes base (Button, Card, Badge)
- [ ] Criar componentes de gráficos (BarChart, LineChart, PieChart)
- [ ] Criar Background 3D com partículas
- [ ] Criar SlideContainer

### Comandos Úteis

```bash
# Rodar scripts de extração
npx ts-node scripts/extract-campaigns.ts
npx ts-node scripts/extract-creatives.ts
npx ts-node scripts/extract-organic.ts
npx ts-node scripts/extract-closings.ts

# Rodar agentes de análise
npx ts-node scripts/agents/creative-analyzer.ts
npx ts-node scripts/agents/behavior-analyzer.ts

# Build e desenvolvimento
npm run dev
npm run build
npm run lint
```

---

## APIs Utilizadas

- ✅ **Tavily** - Pesquisa de tendências e benchmarks
- ✅ **Apify** - Disponível para scraping (não utilizado ainda)
- ⏳ **OpenAI** - Solicitar se necessário para análise visual
