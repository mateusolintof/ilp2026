# Guia de Design — ILP Performance Report

Este guia descreve como manter a apresentação consistente, mais “premium” e menos poluída: cores contidas, tipografia padronizada, grids previsíveis e gráficos legíveis.

## Princípios

- **Menos cor, mais hierarquia**: use cor para significado (estado/ênfase), não como decoração.
- **Legibilidade acima de tudo**: títulos claros, números com respiro e boa leitura no mobile.
- **Consistência**: mesmo padrão de títulos, cards, badges, ícones e gráficos em todos os slides.
- **Densidade controlada**: prefira 1 ideia por bloco; use espaçamento para separar narrativas.

## Tokens e cores

Tokens ficam em `src/app/globals.css`.

### Paleta recomendada (uso)

- `--color-accent` (rose): destaque “marketing/atenção” e elementos interativos.
- `--color-gold`: métricas de **receita/faturamento** e ênfase “premium”.
- `--color-success`, `--color-warning`, `--color-error`: estados (bom/atenção/ruim).
- `--color-info`: informações neutras (ex.: “fontes verificadas”, contexto).

Regras práticas:
- Evite múltiplos destaques concorrendo no mesmo bloco.
- Prefira borda esquerda (`border-l-*`) e fundo sutil (`bg-*/10`) ao invés de fundos sólidos.
- Charts devem usar a paleta `--color-chart-*` e gridlines discretas.

## Tipografia

Use os componentes em `src/components/ui/Typography.tsx`:

- `Label`: kicker (ex.: “Slide 2 de 8”), sempre discreto.
- `Heading`: títulos e subtítulos (padronizado).
- `Text`: corpo, legendas e métricas pontuais.

Padrão sugerido:
- Título do slide: `Heading size="2xl"`
- Título de seção: `Heading size="lg"`
- Texto de apoio: `Text size="lg" variant="muted"`
- Corpo: `Text size="md"` ou `Text size="sm"` em blocos densos

Números/KPIs:
- Prefira `MetricCard` (ver abaixo) para garantir responsividade e evitar estouro no mobile.

## Grid e espaçamento

Regras:
- Use grids responsivas: `grid-cols-1` no mobile, crescendo para `md:grid-cols-2` e `lg:grid-cols-4` quando fizer sentido.
- Evite alturas fixas em containers de conteúdo; deixe o slide ter scroll vertical.
- Para evitar overflow em textos e números longos: use `min-w-0` em colunas flexíveis e quebre o layout em blocos menores.

## Componentes principais

### Card

`src/components/ui/Card.tsx`

- `variant="default"` para a maioria dos blocos.
- `variant="glow"` apenas em caixas de resumo (no máximo 1 por slide).
- Evite sombras fortes repetidas: o fundo já tem profundidade.

### MetricCard

`src/components/charts/MetricCard.tsx`

Uso:
- KPIs do topo do slide: prefira `size="sm"` para preservar margens no mobile.
- `variant="gold"` para faturamento/receita.
- Ícones: use `w-5 h-5` dentro do container do card (consistência visual).

### Badge

`src/components/ui/Badge.tsx`

- Use para status (“EXCELENTE”, “DENTRO”) e contexto (“Fontes verificadas”).
- Evite badges demais na mesma seção.

## Ícones

- Use Lucide (`lucide-react`) com tamanhos consistentes (`w-4 h-4` em badges, `w-5 h-5` em cards).
- Escolha ícones “opticamente centrados” para evitar sensação de desalinhamento.
- Use ícones para significado (ex.: `CircleDollarSign` em faturamento), não para enfeitar.

## Gráficos

Regras:
- Sem arco-íris: use poucas cores e destaque apenas o que precisa.
- Reduza ruído: gridlines sutis, legendas opcionais, labels só quando ajudam.
- Para telas pequenas, priorize barras/linhas simples e evite labels densas.

Wrappers:
- `src/components/charts/BarChart.tsx`
- `src/components/charts/LineChart.tsx`
- `src/components/charts/PieChart.tsx`

## Motion (Framer Motion)

- Animações curtas e discretas (100–400ms).
- Evite “bounce” exagerado em números; use entrada suave e consistência entre slides.

## Checklist rápido (antes de finalizar um slide)

- Título/descrição seguem o mesmo padrão?
- KPIs cabem no mobile sem estourar margem?
- Cores estão “contidas” (máx. 1–2 destaques por seção)?
- Grid sem sobreposição/desalinhamento em `320px` e desktop?
- Ícones com tamanho e alinhamento consistentes?
