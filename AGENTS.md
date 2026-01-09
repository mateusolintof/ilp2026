# Instruções (AGENTS)

## Documentação oficial (ler antes de decidir)

Este projeto usa **apenas 3 documentos oficiais**:

1. `README.md` — Visão **não técnica** (propósito, narrativa e o que contém em cada slide).
2. `TECHNICAL.md` — Visão **técnica** (arquitetura, dados, scripts, deploy, padrões de código).
3. `DESIGN_GUIDE.md` — Guia de **design** (tokens, tipografia, grid, componentes, gráficos).

## Regras de trabalho

- Antes de qualquer decisão, revise os 3 docs acima para alinhar **conteúdo + técnica + design**.
- Não invente métricas/benchmarks: tudo deve estar em `src/lib/data/*` (ou ter fonte verificável e entrar no `research.ts`).
- Priorize tipagem e qualidade:
  - rode `npm run lint` antes de commit
  - rode `npm run build` antes de push
- Em mudanças de UI:
  - use o design system em `src/components/ui/*`
  - mantenha a paleta contida e a hierarquia tipográfica (ver `DESIGN_GUIDE.md`)
- Em tarefas complexas (extração, scraping, research, automações), crie scripts/agents em `scripts/` quando fizer sentido.

## Git / Deploy

- Repositório remoto: https://github.com/mateusolintof/ilp2026.git
- Branch principal: `main`
- Deploy: Vercel com auto-deploy via GitHub (`push` em `main`).
