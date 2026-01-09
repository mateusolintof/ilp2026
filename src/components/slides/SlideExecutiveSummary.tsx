'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Eye, FileText, DollarSign, Coins, Users, Target, Award, CheckCircle2, ExternalLink, Sparkles, BarChart3, Info } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { BarChart } from '../charts/BarChart';
import { LineChart } from '../charts/LineChart';
import { FinanceByCategoryChart } from '../charts/FinanceByCategoryChart';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import { mensagemSummary, audienciaSummary } from '@/lib/data/campaigns';
import { organicSummary } from '@/lib/data/organic';
import { ilpVsBenchmarks } from '@/lib/data/research';
import { financialMonths, financialTotals, financialTopCategories, financialTechnologyBreakdown, financialData } from '@/lib/data/financial';

export function SlideExecutiveSummary() {
  const totalInvestment = mensagemSummary.consolidated.spent + audienciaSummary.consolidated.spent;
  const totalRevenue = financialTotals.revenue;
  const totalProcedures = financialTotals.count;

  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);

  // Prepare monthly revenue chart data
  const monthlyRevenueData = useMemo(() => {
    return financialMonths.map(m => ({
      name: m.month.substring(0, 3),
      value: m.total.revenue,
    }));
  }, []);

  // Prepare channel distribution data
  const channelData = [
    { name: 'MSG (WhatsApp)', value: mensagemSummary.consolidated.spent },
    { name: 'AUD (Perfil)', value: audienciaSummary.consolidated.spent },
  ];

  const financeByCategoryData = useMemo(() => {
    return financialTopCategories.map((row) => ({
      category: row.category,
      revenue: row.revenue,
      count: row.count,
    }));
  }, []);

  const technologyRows = useMemo(() => {
    return financialTechnologyBreakdown
      .slice()
      .sort((a, b) => b.revenue - a.revenue);
  }, []);

  const financeHighlights = useMemo(() => {
    const categoryLookup = new Map(financialData.categoriesPeriod.map((row) => [row.category, row]));
    const techLookup = new Map(financialTechnologyBreakdown.map((row) => [row.category, row]));

    return {
      botox: categoryLookup.get('Botox')?.revenue ?? 0,
      preenchimento: categoryLookup.get('Preenchimento')?.revenue ?? 0,
      cirurgia: categoryLookup.get('Cirurgia')?.revenue ?? 0,
      consulta: categoryLookup.get('Consulta')?.revenue ?? 0,
      tentherma: techLookup.get('Tentherma')?.revenue ?? 0,
    };
  }, []);

  const mixShareData = useMemo(() => {
    return financialMonths.map((m) => ({
      name: m.month.substring(0, 3),
      Tecnologia: (m.technology.revenue / m.total.revenue) * 100,
      Injetaveis: (m.injectables.revenue / m.total.revenue) * 100,
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 2 de 7</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Resumo Executivo
        </Heading>
        <Text variant="muted" size="lg">
          Visão geral da performance de marketing do período Set-Dez 2025
        </Text>
      </motion.div>

      {/* Key Metrics Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Investimento Total"
            value={formatCurrency(totalInvestment)}
            subtitle="Meta Ads (Set-Dez)"
            icon={<DollarSign className="w-5 h-5" />}
            variant="default"
            size="sm"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Faturamento Total"
            value={formatCurrency(totalRevenue)}
            subtitle="Receita clínica"
            icon={<Coins className="w-5 h-5" />}
            variant="gold"
            size="sm"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Procedimentos"
            value={formatNumber(totalProcedures)}
            subtitle="Total realizados"
            icon={<Users className="w-5 h-5" />}
            variant="default"
            size="sm"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Conversas WhatsApp"
            value={formatNumber(mensagemSummary.consolidated.conversationsStarted)}
            subtitle="Leads gerados"
            icon={<MessageCircle className="w-5 h-5" />}
            variant="accent"
            size="sm"
          />
        </motion.div>
      </motion.div>

      {/* Benchmark Comparison - NEW */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10">
            <Target className="w-5 h-5 text-info" />
          </div>
          <Heading as="h2" size="lg">ILP vs Benchmarks de Mercado</Heading>
          <Badge variant="info">Fontes verificadas</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <Card className={`h-full border-l-2 ${ilpVsBenchmarks.custoConversa.status === 'DENTRO' ? 'border-l-success/40' : 'border-l-white/10'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Text size="sm" weight="semibold">Custo/Conversa WhatsApp</Text>
                  <Badge variant="success">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {ilpVsBenchmarks.custoConversa.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="p-2 rounded bg-accent/10 text-center">
                    <Text size="xs" variant="muted">ILP</Text>
                    <Text weight="bold" className="text-accent">R$ {ilpVsBenchmarks.custoConversa.ilp.toFixed(2)}</Text>
                  </div>
                  <div className="p-2 rounded bg-white/5 text-center">
                    <Text size="xs" variant="muted">Benchmark</Text>
                    <Text weight="bold">$ {ilpVsBenchmarks.custoConversa.benchmark}</Text>
                  </div>
                </div>
                <Text size="xs" variant="muted">{ilpVsBenchmarks.custoConversa.comparison}</Text>
                <Text size="xs" variant="muted" className="flex items-center gap-1 mt-1">
                  <ExternalLink className="w-3 h-3" />
                  Fonte: LocalIQ Healthcare CPL
                </Text>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className={`h-full border-l-2 ${ilpVsBenchmarks.custoVisita.status === 'EXCELENTE' ? 'border-l-gold/40' : 'border-l-white/10'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Text size="sm" weight="semibold">Custo/Visita ao Perfil</Text>
                  <Badge variant="gold">
                    <Award className="w-3 h-3 mr-1" />
                    {ilpVsBenchmarks.custoVisita.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="p-2 rounded bg-gold/10 text-center">
                    <Text size="xs" variant="muted">ILP</Text>
                    <Text weight="bold" className="text-gold">R$ {ilpVsBenchmarks.custoVisita.ilp.toFixed(2)}</Text>
                  </div>
                  <div className="p-2 rounded bg-white/5 text-center">
                    <Text size="xs" variant="muted">Benchmark</Text>
                    <Text weight="bold">R$ {ilpVsBenchmarks.custoVisita.benchmark.toFixed(2)}</Text>
                  </div>
                </div>
                <Text size="xs" variant="muted">{ilpVsBenchmarks.custoVisita.comparison}</Text>
                <Text size="xs" variant="muted" className="flex items-center gap-1 mt-1">
                  <ExternalLink className="w-3 h-3" />
                  Fonte: Madgicx Meta Ads Benchmarks
                </Text>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Charts Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Evolução Mensal do Faturamento</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlyRevenueData}
                height={180}
                lines={[{ key: 'value', color: 'var(--color-gold)', name: 'Receita' }]}
                showLegend={false}
              />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Distribuição do Investimento</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={channelData}
                height={180}
                colors={['var(--color-accent)', 'var(--color-gold)']}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Campaign Performance Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Mensagem Campaign */}
        <motion.div variants={itemVariants}>
          <Card variant="bordered" className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <Text weight="semibold">Campanhas de Mensagem</Text>
                  <Text size="xs" variant="muted">WhatsApp Business</Text>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Campanhas</Text>
                  <Badge variant="default">{mensagemSummary.count}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Investimento</Text>
                  <Text weight="semibold">{formatCurrency(mensagemSummary.consolidated.spent)}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Conversas</Text>
                  <Text weight="semibold">{formatNumber(mensagemSummary.consolidated.conversationsStarted)}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Custo/Conversa</Text>
                  <Text weight="semibold" className="text-accent">
                    {formatCurrency(mensagemSummary.consolidated.costPerResult)}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Audiência Campaign */}
        <motion.div variants={itemVariants}>
          <Card variant="bordered" className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-gold/10">
                  <Eye className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <Text weight="semibold">Campanhas de Audiência</Text>
                  <Text size="xs" variant="muted">Visitas ao Perfil</Text>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Campanhas</Text>
                  <Badge variant="gold">{audienciaSummary.count}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Investimento</Text>
                  <Text weight="semibold">{formatCurrency(audienciaSummary.consolidated.spent)}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Visitas</Text>
                  <Text weight="semibold">{formatNumber(audienciaSummary.consolidated.profileVisits)}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Custo/Visita</Text>
                  <Text weight="semibold" className="text-gold">
                    {formatCurrency(audienciaSummary.consolidated.costPerResult)}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Organic Performance */}
        <motion.div variants={itemVariants}>
          <Card variant="bordered" className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-info/10">
                  <FileText className="w-5 h-5 text-info" />
                </div>
                <div>
                  <Text weight="semibold">Performance Orgânica</Text>
                  <Text size="xs" variant="muted">Feed, Reels & Stories</Text>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Posts Feed/Reels</Text>
                  <Badge variant="info">{organicSummary.feedReels.totalPosts}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Stories</Text>
                  <Badge variant="info">{organicSummary.stories.totalStories}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Total Views</Text>
                  <Text weight="semibold">{formatNumber(organicSummary.feedReels.totalViews + organicSummary.stories.totalViews)}</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text size="sm" variant="muted">Total Alcance</Text>
                  <Text weight="semibold" className="text-info">
                    {formatNumber(organicSummary.feedReels.totalReach + organicSummary.stories.totalReach)}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Financial Data (Clinic) */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <BarChart3 className="w-5 h-5 text-gold" />
          </div>
          <Heading as="h2" size="lg">Dados Financeiro da Clínica</Heading>
          <Badge variant="gold">{financialData.period}</Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Receita e Volume por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <FinanceByCategoryChart data={financeByCategoryData} height={320} />
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  Receita (barra)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-info" />
                  Quantidade (linha)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                  <Info className="h-3.5 w-3.5" />
                  Tecnologia agregada (Tentherma, CO2, Redtouch, Fotona, Virtue, Laser)
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Tecnologia — Detalhamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="min-w-0">
                  <Text size="sm" variant="muted">Total (Set–Dez)</Text>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <Text as="span" weight="bold" className="text-gold tabular-nums">
                      {formatCurrency(financialTotals.technologyRevenue)}
                    </Text>
                    <Text as="span" size="sm" variant="muted" className="tabular-nums">
                      {formatNumber(financialTotals.technologyCount)} procedimentos
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info">Itens</Badge>
                  <Badge variant="gold">
                    {((financialTotals.technologyRevenue / financialTotals.revenue) * 100).toFixed(1)}% da receita
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {technologyRows.map((row) => (
                  <div
                    key={row.category}
                    className="flex items-center justify-between gap-4 rounded-xl bg-white/4 px-3 py-2 border border-white/8"
                  >
                    <div className="min-w-0">
                      <Text as="div" weight="semibold" className="truncate">
                        {row.category}
                      </Text>
                      <Text size="xs" variant="muted" className="tabular-nums">
                        {formatNumber(row.count)} procedimentos
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text as="div" weight="bold" className="tabular-nums text-gold">
                        {formatCurrency(row.revenue)}
                      </Text>
                      <Text size="xs" variant="muted" className="tabular-nums">
                        {((row.revenue / financialTotals.technologyRevenue) * 100).toFixed(1)}% da tecnologia
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div className="min-w-0">
              <Text weight="semibold">Análise do mix e sinais do funil</Text>
              <Text size="sm" variant="muted">Insights práticos para decisões de marketing e produto (modal fullscreen)</Text>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto border border-gold/30 bg-gold/10 text-gold hover:bg-gold/15"
            onClick={() => setIsFinanceModalOpen(true)}
          >
            Abrir análise completa
          </Button>
        </motion.div>

        <Modal
          open={isFinanceModalOpen}
          onOpenChange={setIsFinanceModalOpen}
          variant="fullscreen"
          title="Análise — Funil, mix e oportunidades (Set–Dez 2025)"
          description="Leitura orientada a decisões, baseada na composição de receita e volume por categoria."
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sinais fortes do funil e do mix</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Novembro é o “mês premium”</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Maior receita do período ({formatCurrency(financialMonths[2].total.revenue)}) e o maior ticket médio por item (~{formatCurrency(financialMonths[2].total.revenue / financialMonths[2].total.count)}), sugerindo um mix mais premium.
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Tecnologia variou bastante</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Participação de tecnologia na receita por mês: {((financialTotals.technologyShareByMonth.Setembro) * 100).toFixed(1)}% → {((financialTotals.technologyShareByMonth.Outubro) * 100).toFixed(1)}% → {((financialTotals.technologyShareByMonth.Novembro) * 100).toFixed(1)}% → {((financialTotals.technologyShareByMonth.Dezembro) * 100).toFixed(1)}%.
                    </Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Em dezembro houve queda forte de tecnologia, o que pressiona a receita total (padrão comum em fim de ano).
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Injetáveis dominam o faturamento</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Participação (Botox + Preenchimento + Bioestimulador): {((financialTotals.injectablesShareByMonth.Setembro) * 100).toFixed(1)}% / {((financialTotals.injectablesShareByMonth.Outubro) * 100).toFixed(1)}% / {((financialTotals.injectablesShareByMonth.Novembro) * 100).toFixed(1)}% / {((financialTotals.injectablesShareByMonth.Dezembro) * 100).toFixed(1)}%.
                    </Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Isso reforça o “core” do negócio em procedimentos de alta recorrência e alto valor percebido.
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Consulta é porta de entrada</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Consulta tem volume relevante e ticket menor — excelente para aquisição e triagem, mas precisa estar conectada a um próximo passo (CRM/retargeting e ofertas de 1º passo).
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Base para vender protocolos (combos)</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Indicador do funil sugere aumento de múltiplos procedimentos por fechamento (~19,8% em setembro → ~26–27% em novembro/dezembro).
                    </Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Implicação: desenhar ofertas de protocolos combinados (tecnologia + injetáveis) e padronizar o “próximo passo” no atendimento.
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Gargalo pós-consulta (a atacar)</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      “Consultas-only” (fechamentos só com consulta/retorno) sobem no período: ~16,9% (set) → ~20,6% (out) → ~19,1% (nov) → ~24,6% (dez).
                    </Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Interpretação: gargalo pós-consulta (ou conversão em outro mês). Oportunidade clara de CRM (follow-up), remarketing e oferta de 1º passo ainda na consulta.
                    </Text>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <Text weight="semibold">Onde está o dinheiro (set–dez somado)</Text>
                  <Text size="sm" variant="muted" className="mt-1">
                    Top por receita: Botox (~{formatCurrency(financeHighlights.botox)}), Preenchimento (~{formatCurrency(financeHighlights.preenchimento)}), Cirurgia (~{formatCurrency(financeHighlights.cirurgia)}), Tentherma (~{formatCurrency(financeHighlights.tentherma)}), Consulta (~{formatCurrency(financeHighlights.consulta)}).
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Implicação (core)</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Injetáveis são o produto de recorrência: focar em calendário de manutenção, recall e prova social.
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Implicação (ticket)</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Tecnologias são âncoras de aumento de ticket: protocolos e combos elevam valor sem parecer venda agressiva.
                    </Text>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <Text weight="semibold">Implicação (perene)</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Cirurgia/dermato clínica gera demanda de alta intenção (Google/SEO) e fortalece reputação médica.
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Visualizações rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text size="xs" variant="muted">Receita total</Text>
                    <Text weight="bold" className="mt-1 tabular-nums text-gold">{formatCurrency(financialTotals.revenue)}</Text>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text size="xs" variant="muted">Qtd. total</Text>
                    <Text weight="bold" className="mt-1 tabular-nums">{formatNumber(financialTotals.count)}</Text>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text size="xs" variant="muted">Tecnologia (R$)</Text>
                    <Text weight="bold" className="mt-1 tabular-nums text-gold">{formatCurrency(financialTotals.technologyRevenue)}</Text>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text size="xs" variant="muted">Injetáveis (R$)</Text>
                    <Text weight="bold" className="mt-1 tabular-nums text-gold">{formatCurrency(financialTotals.injectablesRevenue)}</Text>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <Text weight="semibold">Receita mensal</Text>
                  <LineChart
                    data={monthlyRevenueData}
                    height={180}
                    lines={[{ key: 'value', color: 'var(--color-gold)', name: 'Receita' }]}
                    showLegend={false}
                    formatValue={(v) => formatCurrency(v)}
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <Text weight="semibold">Participação (%)</Text>
                  <Text size="xs" variant="muted" className="mt-1">Tecnologia vs Injetáveis (por mês)</Text>
                  <LineChart
                    data={mixShareData}
                    height={180}
                    lines={[
                      { key: 'Tecnologia', color: 'var(--color-info)', name: 'Tecnologia' },
                      { key: 'Injetaveis', color: 'var(--color-gold)', name: 'Injetáveis' },
                    ]}
                    showLegend={false}
                    formatValue={(v) => `${v.toFixed(0)}%`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </Modal>
      </motion.section>
    </div>
  );
}
