# SPEC.md – Aplicação Web: Dashboard de Performance Marketing
## Instituto Luciane Prado – Dermatologia & Estética

**Objetivo:** Apresentacao Horizontal (`/`) — Slides interativos com scroll horizontal e background 3D, que consolide dados de tráfego pago e fechamento de vendas de serviços, análise orgânica, insights de criativos, projeção de tendencias, apresentando ao cliente (dono da clínica) dados acionáveis com foco visual e narrativa estratégica.

---

## 1. ESTRUTURA GERAL (Não Técnica e Técnica)

A Apresentação deve funcionar como um **relatório executivo vivo**, onde cada slide conta uma história de performance.

### Dados importantes
1. **Visão Geral**
2. **Performance Tráfego Pago** ( pode consolidar dados mas é importante ter a separação de dados por campanhas de mensagem e campanhas de audiência)
3. **Análise de Criativos** (o que funcionou e por quê -> puxar visualmente os criativos que mais funcionaram e criar uma lista com top 5 criativos por objetivo)
4. **Dados Fechamentos** (sao os dados de fechamento da clinica -> isso nos dará insights diversos, um deles é entender os serviços que são mais buscados, serviços que podem ser mais explorados - alinhando com pesquisa de mercado e tendencias)
5. **Insights, Recomendações, Projeções e Tentendencias do Nicho para 2026** 

## Possibilidade de Stack Tecnico

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Next.js | 16.1.1 |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Tipagem estatica |
| Tailwind CSS | v4 | `@theme inline` |
| Framer Motion | 12.x | Animacoes |
| React Three Fiber | 9.x | Background 3D |
| HeroUI | 2.8.7 | Componentes base |
| Recharts | 3.6.0 | Graficos |
| XYFlow React | 12.10 | Diagramas de fluxo |
| Lucide | 0.562 | Icones |

### Apresentacao Principal (`/`)

- Scroll horizontal
- Gerenciamento de estado para modais (`useState<ModalKind>`) -> se for usar modal
- Navegacao por teclado (←, →, Space, Home, End)
- Conversao de mouse wheel para scroll horizontal
- Progress bar animada com Framer Motion
- Background 3D com particulas

Observação: 
1. Revise a experiencia de scroll para que o scroll nao fique travado, limitando a experiencia
2. Nao limite o tamanho dos Slides, cada slide pode ter scroll vertical, ou seja, pode ir rodando a tela para baixo, de modo que seja possível colocar mais conteúdo.
3. Padronize tamanho de títulos, subtitulos, textos.
4. Atenção para enquadramento correto, espaçamentos e grid. 
5. Crie um design system.

---

## 2. DADOS DE TRAFEGO PAGO
- **Extrair Dados das Planilhas** 
  - Na pasta "data" temos tres sub pastas -> "relatorios-pago", "relatorios-organico" e "fechamento-clinica".
  - **Preciso que voce estruture os dados, extraia os dados dessas planilhas, revise para que de fato tenha sido extraido corretamente e gere um arquivo com os dados extraidos e estruturados**.

### Relatorios-pago:
- Duas subpastas: "performance-campanha" e "performance-criativos"
  - Performance-campanha: trazem dados de setembro até dezembro, separando Campanhas com objetivo de Mensagem para WhatsApp (a métrica principal é conversas por mensagem iniciadas) e Campanhas  de Trafego para o perfil do Instagram (Audiencia e Engajamento) - a métricas principal é visitas ao perfil do IG (ou cliques no link, visto que chegará ao mesmo resultado nessa campanha)

### Relatorios-organico: planilhas no formato .csv
- Dados de trafego organico, tanto dados de post Feed/Reels quanto de Stories:
  - "Organico-FEED-REELS-SETeOUT.csv" e "Organico-FEED-REELS-NOVeDEZ.csv" -> ou seja, dados de setembro/outubro e novembro/dezembro. (fiz assim, porque nao dava pra tirar dos 4 meses de uma vez).
  - "Organico-Stories-SETeOUT.csv" e "Organico-Stories-NOVeDEZ.csv"

#### Lógica de Trafego Pago.
- **CAMPANHA DE MENSAGEM PARA WHATSAPP**
  - A métrica principal dessa campanha é Custo por Conversas por Mensagens Iniciadas
  Métricas secundárias:
    - Alcance/Impressões + CPM + CTR% e outra que julgar importante ser citada.
- **CAMPANHA DE AUDIENCIA** -> tecnicamente é uma campanha de objetivo de trafego para visitas ao perfil do Instagram
Métricas Principal: 
  - Visitas ao perfil do Instagram (caso nao tenha essa métrica, pode usar a métrica de cliques no link que da na mesma)
  Como visitas ao perfil é o objetivo a ser alcançado a métrica principal para analise técnica é "custo por visitas ao perfil" ou "custo por clique no link".
Métricas Secundárias:
  - CTR%
  - Alcance/Impressoes/CPM
  e outras que julgar necessário.
Obs: Eu chamo essa campanha de audiencia, porque é ela tem como objetivo não técnico, gerar mais audiencia para a Marca, ou seja, gerar engajamento, criação de base de público e fortalecimento de marca. 
- **ANALISE**
  - Lembre-se de que as métricas, benchmark e etc.. sao totalmente diferentes por tipo de campanha. Um custo por clique na campanha de mensagem é totalmente diferente do custo na campanha de audiencia. Portanto, precisa ser separado. Se consolidar os dados e usar para comparar com dados de mercado, gerará resultado falso.


---

## 3. ANALISES E INSIGHTS

- **O objetivo central da apresentação é não apenas apresentar os dados gerais, mas tentar gerar insights valiosos**.
  Exemplo:
  - Identificar padrões de criativos que mais funcionaram ao longo do tempo -> não apenas formato de criativo, mas conteúdo do criativo e estrutura visual (necessário realizar uma analise visual dos melhores criativos identificar se possível padrões)
- **Fazer cruzamento de dados**, se possível, de modo que possamos usa-los como insights para futuras campanhas e estratégias (ou seja, cruzar dados de trafego pago, trafego organico e dados de fechamento)
  - Use agentes especificos para isso, de modo a sermos mais assertivos.
Observação: **não force analises e nem invente dados** -> sempre itere se de fato essa analise ou insight é útil.
- **IMPORTANTISSIMO** Analisar criativos próprios e buscar referencias e tendencias do mercado (pegar exemplos visuais, ou seja, trazer link e fazer scraping do vídeo ou criativo estático). Entender **VISUALMENTE E EMOCIONALMENTE** por que alguns criativos performaram melhor, não apenas olhar métricas.
  - Criativos próprios: como já foi falado é necessário identificar padroes dos criativos que mais geram resultados
    - Identificar os melhores e criar uma tabela de top 5 por tipo de campanha e também do trafego organico e extrair visualmente o top 3 criativo geral (sempre justificar o porque - nao apenas com dados e métricas mas explicacao textual para leigos com explicacao visual e de conteudo, sempre ancorando a analise)
  - Tendencias e Referencias de mercado
    - Buscar tendencias atuais (estamos em 2026) entao precisa ser dos ultimos 3 meses mas já buscar tendencia para 2026 também. 
      - trazer exemplos: explicar o porque desses criativos, trazer links e também o critivo visualmente 
- Usar os MCPs disponíveis (Apify, Tavily, Playwright) para:
  - Buscar criativos top da própria ILP (Ads Library / Instagram).
  - Capturar screenshots/prints.
  - Coletar referências de criativos de outras clínicas de dermato/estética no Brasil.
  - E outras atividades necessárias.
**Se necessário**, instale outros MCPs ou crie outras TOOLs essenciais para realizar essas atividades acima e outras atividades que eu nao tiver citado mas que sao importantes. Caso algo um MCP ou TOOL precise de APIKEY, me solicite que eu gero. O importante é nao improvisar, precisamos realizar um trabalho excelente e completo.
  - Crie agents e/ou scripts para as tarefas.
  - Se julgar necessário incluir alguma LLM nesses agents ou scripts, me solicite a APIKEY.

**REGRA**:

- Não busque o caminho mais fácil, me solicite o que for preciso, mesmo que nao tenha acesso agora, como alguma tool ou ferramenta, só me pedir a APIKEY ou TOKEN que eu gero.

---

## 4. ESTRUTURA VISUAL

- SEMPRE QUE APLICÁVEL E QUE IRÁ DEIXAR A APRESENTAÇÃO MELHOR:
  - Use gráficos 
  - Use tabelas comparativos
- Use imagens 

---

## 5. DOCUMENTOS ADICIONAIS

Na pasta "docs" você tem acesso à dois arquivos:
- "ilp-context.md" que é um breve resumo sobre o Instituto Luciane Prado
  - Acesse o instagram e outros canais para fazer scraping de mais informacoes, se necessário.
- "marketing-research.md" 
  - Pesquisa realizada do nicho que o Instituto está inserido.
    - Seja **critico e questionador** quanto ao estudo feito. Valide os dados e informacoes de tendencias, estudo de criativos, servicos, valores e etc.. O estudo foi bem feito mas ele nao é fonte da verdade, preciso que voce itere e questione.
**PRINCIPALMENTE VOCE PRECISA VALIDAR SE É DE FATO ATUALIZADO ESSA PESQUISA. PORQUE NAO IMPORTA DADOS QUE SEJAM DO INICIO DE 2025 OU DE 2024. SO IMPORTA DO ULTIMO 3-4 MESES. LEMBRANDO QUE HOJE É 08/01/2026.**
ATÉ PORQUE, QUANDO EU LI, SENTI QUE MUITA DAS TENDENCIAS DE CRIATIVOS E ESTRATÉGIAS, SÃO COISAS QUE FUNCIONAVAM ANTIGAMENTE E QUE JÁ SE TORNARAM OBSOLETAS, PORTANTO, O TÍTULO DE QUE A PESQUISA É ATUAL, pode ser mentirosa, visto que não foi eu quem realizou a pesquisa.

---

## 6. MILESTONES E CHECKBOX

**Crie milestones do projeto e checklist com checkbox das tarefas para que vá sendo marcado à medida que a tarefa for concluída**.

---

## 7. STATUS DE IMPLEMENTAÇÃO (Atualizado 08/01/2026)

### Milestones Concluídos

- [x] 1. Setup e Infraestrutura (Next.js 16.1.1, TypeScript, Tailwind v4)
- [x] 2. Extração de Dados (4 scripts TypeScript)
- [x] 3. Pesquisa e Validação (Benchmarks com fontes verificáveis)
- [x] 4. Análise de Criativos (Rankings, padrões, thumbnails)
- [x] 5. Design System (Tokens, componentes UI, gráficos, 3D)
- [x] 6-9. Slides (8 slides implementados)
- [x] 10. Navegação (Setas, teclado, indicadores)
- [x] 11. Pesquisa de Mercado (Benchmarks, tendências 2026)
- [x] 12. Análise Estatística (Correlações Pearson, p-value, regressão)
- [x] 13. Integração Dados nos Slides
- [x] 14. Deploy (Vercel - auto-deploy via GitHub)
- [x] 15. Imagens dos Criativos (6 thumbnails)
- [x] 16. Refatoração e Limpeza (Remoção de dados não verificáveis)

### Requisitos da Spec - Status

| Requisito | Status | Observação |
|-----------|--------|------------|
| Separar dados MSG vs AUD | ✅ | Implementado em SlidePaidTraffic |
| Top 5 criativos por objetivo | ✅ | Unificado em SlideCreatives com badge de tipo |
| Cruzamento de dados | ✅ | SlideDataCrossing com correlações Pearson |
| Análise visual dos criativos | ✅ | Thumbnails + padrões de sucesso |
| Tendências 2026 | ✅ | SlideInsightsTrends + SlideClosings |
| Benchmarks com fontes | ✅ | research.ts com citação de fontes |
| Validar pesquisa marketing-research.md | ✅ | Atualizado com status de uso |

### Mudanças vs Spec Original

**Removidos por não atender qualidade/verificabilidade:**
- Análise competitiva (spec item 3) - apenas seguidores, sem insight real
- Métricas de ROI calculado - atribuição problemática
- Funil de conversão estimado - sem dados de CRM

**Adicionados além da spec:**
- Explicações expandidas em cada correlação
- ilpOpportunities com ações concretas por serviço
- Limitações documentadas nos modelos estatísticos
- Ícones Lucide para consistência visual



