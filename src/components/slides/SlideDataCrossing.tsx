'use client';

import { motion } from 'framer-motion';
import { GitBranch, Zap, Calendar, Clock, TrendingUp, BarChart3, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { BarChart } from '../charts/BarChart';
import { LineChart } from '../charts/LineChart';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import {
  crossData,
  dayAnalysis,
  timeAnalysis,
  monthlyPerformance,
  behaviorInsights,
} from '@/lib/data/analysis';

import {
  correlations,
  regression,
  seasonality,
} from '@/lib/data/research';

export function SlideDataCrossing() {
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

  // Prepare chart data for day analysis
  const dayChartData = dayAnalysis.map(d => ({
    name: d.day,
    value: d.avgViews,
  }));

  // Prepare chart data for time analysis
  const timeChartData = timeAnalysis.map(t => ({
    name: t.slot.split(' ')[0],
    value: t.avgViews,
  }));

  // Prepare chart data for monthly performance
  const monthlyChartData = monthlyPerformance.map(m => ({
    name: m.month.substring(0, 3),
    value: m.revenue,
  }));

  // Correlation data for display
  const correlationData = [
    correlations.investimentoVsViewsOrganicos,
    correlations.viewsVsProcedimentos,
    correlations.investimentoVsReceita,
    correlations.resultadosVsProcedimentos,
  ];

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 7 de 8</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Cruzamento de Dados
        </Heading>
        <Text variant="muted" size="lg">
          Correlações Estatísticas (Pearson) e Padrões Comportamentais
        </Text>
      </motion.div>

      {/* Marketing vs Revenue Flow */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <GitBranch className="w-6 h-6 text-accent" />
          </div>
          <Heading as="h2" size="lg">Fluxo: Marketing - Resultados</Heading>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card variant="bordered">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Investimento</Text>
                  <Text size="xl" weight="bold" className="text-accent">
                    {formatCurrency(crossData.totalPaidInvestment)}
                  </Text>
                </div>
                <Zap className="w-6 h-6 text-gold" />
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Views Orgânicos</Text>
                  <Text size="xl" weight="bold" className="text-info">
                    {formatNumber(crossData.totalOrganicViews)}
                  </Text>
                </div>
                <Zap className="w-6 h-6 text-gold" />
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Procedimentos</Text>
                  <Text size="xl" weight="bold" className="text-gold">
                    {formatNumber(crossData.totalProcedures)}
                  </Text>
                </div>
                <Zap className="w-6 h-6 text-gold" />
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Faturamento</Text>
                  <Text size="xl" weight="bold" className="text-success">
                    {formatCurrency(crossData.totalClosingRevenue)}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Statistical Correlations - NEW */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10">
            <Activity className="w-6 h-6 text-info" />
          </div>
          <Heading as="h2" size="lg">Correlações Estatísticas (Pearson)</Heading>
          <Badge variant="info">Análise Python</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {correlationData.map((corr) => (
            <motion.div key={corr.name} variants={itemVariants}>
              <Card className={`h-full ${corr.isSignificant ? 'border-success/50' : 'border-white/10'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{corr.icon}</span>
                      <Text weight="semibold" size="sm">{corr.name}</Text>
                    </div>
                    {corr.isSignificant ? (
                      <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Significativo
                      </Badge>
                    ) : (
                      <Badge variant="default" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Não Significativo
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <Text size="xs" variant="muted">Coef. Pearson (r)</Text>
                      <Text size="lg" weight="bold" className={corr.r > 0.7 ? 'text-success' : corr.r > 0.4 ? 'text-gold' : 'text-white/70'}>
                        {corr.r.toFixed(2)}
                      </Text>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <Text size="xs" variant="muted">p-value</Text>
                      <Text size="lg" weight="bold" className={corr.pValue < 0.05 ? 'text-success' : 'text-white/70'}>
                        {corr.pValue.toFixed(2)}
                      </Text>
                    </div>
                  </div>

                  {/* Expanded explanations */}
                  <div className="space-y-2 border-t border-white/10 pt-3">
                    <div>
                      <Text size="xs" weight="semibold" className="text-white/80 mb-0.5">O que significa:</Text>
                      <Text size="xs" variant="muted">{corr.whatItMeans}</Text>
                    </div>
                    <div>
                      <Text size="xs" weight="semibold" className="text-white/80 mb-0.5">Por que importa:</Text>
                      <Text size="xs" variant="muted">{corr.whyItMatters}</Text>
                    </div>
                    <div className={`p-2 rounded ${corr.isSignificant ? 'bg-success/10 border-l-2 border-success' : 'bg-white/5 border-l-2 border-white/20'}`}>
                      <Text size="xs" className={corr.isSignificant ? 'text-success' : 'text-white/60'}>
                        {corr.conclusion}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Regression Model - With Context */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-gold/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-gold" />
                <Text weight="semibold">Modelo de Regressão Linear</Text>
                <Badge variant="gold">Indicativo</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-accent/10 text-center">
                  <Text size="xs" variant="muted" className="mb-1">Equação</Text>
                  <Text size="sm" weight="bold" className="text-accent font-mono">
                    {regression.equation}
                  </Text>
                </div>
                <div className="p-3 rounded-lg bg-gold/10 text-center">
                  <Text size="xs" variant="muted" className="mb-1">R² (Coef. Determinação)</Text>
                  <Text size="lg" weight="bold" className="text-gold">
                    {(regression.rSquared * 100).toFixed(2)}%
                  </Text>
                </div>
                <div className="p-3 rounded-lg bg-white/5 text-center">
                  <Text size="xs" variant="muted" className="mb-1">Interpretação</Text>
                  <Text size="sm" weight="semibold" className="text-white">
                    R$ 1 investido → ~R$ {regression.slope.toFixed(0)} receita
                  </Text>
                </div>
              </div>

              {/* Limitations explanation */}
              <div className="p-3 rounded bg-white/5 border-l-2 border-gold">
                <Text size="xs" weight="semibold" className="text-gold mb-1">Contexto Importante:</Text>
                <Text size="xs" variant="muted">
                  O R² de {(regression.rSquared * 100).toFixed(0)}% indica que o modelo explica apenas {(regression.rSquared * 100).toFixed(0)}% da variação na receita.
                  Isso é esperado: a receita de uma clínica depende de muitos fatores além do marketing (sazonalidade, capacidade operacional,
                  ticket médio, indicações). O modelo é útil para estimar tendências, mas não deve ser usado para projeções precisas.
                </Text>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Behavioral Patterns */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Calendar className="w-6 h-6 text-gold" />
          </div>
          <Heading as="h2" size="lg">Padrões Comportamentais</Heading>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  Performance por Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={dayChartData}
                  height={150}
                  colors={['var(--color-accent)']}
                />
                <div className="mt-3 p-2 rounded-lg bg-accent/10 text-center">
                  <Text size="xs" variant="muted">Melhor Dia</Text>
                  <Text weight="bold" className="text-accent">{behaviorInsights.bestDay}</Text>
                  <Text size="xs" variant="muted">+{seasonality.daily.improvement} vs pior dia</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  Performance por Horário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={timeChartData}
                  height={150}
                  colors={['var(--color-gold)']}
                />
                <div className="mt-3 p-2 rounded-lg bg-gold/10 text-center">
                  <Text size="xs" variant="muted">Melhor Horário</Text>
                  <Text weight="bold" className="text-gold">{behaviorInsights.bestTime}</Text>
                  <Text size="xs" variant="muted">{formatNumber(seasonality.hourly.bestSlotViews)} views/post</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  Receita Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={monthlyChartData}
                  height={150}
                  lines={[{ key: 'value', color: 'var(--color-success)', name: 'Receita' }]}
                  showLegend={false}
                />
                <div className="mt-3 p-2 rounded-lg bg-success/10 text-center">
                  <Text size="xs" variant="muted">Melhor Mês</Text>
                  <Text weight="bold" className="text-success">{behaviorInsights.bestMonth}</Text>
                  <Text size="xs" variant="muted">{formatCurrency(seasonality.monthly.bestMonthRevenue)}</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Insight Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-success/50 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-success/20">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <Text weight="bold" className="text-success mb-1">
                  Insight Principal: Correlação r = 0.99 (p = 0.02)
                </Text>
                <Text size="sm" variant="muted" className="mb-2">
                  A correlação quase perfeita entre investimento em Meta Ads e views orgânicos prova estatisticamente que:
                </Text>
                <Text weight="semibold">
                  Campanhas pagas NÃO competem com orgânico - elas AMPLIFICAM o alcance orgânico.
                </Text>
                <Text size="sm" variant="muted" className="mt-2">
                  Fonte: Análise estatística Python com correlação Pearson e p-value &lt; 0.05
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
