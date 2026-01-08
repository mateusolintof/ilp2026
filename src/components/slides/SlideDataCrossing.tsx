'use client';

import { motion } from 'framer-motion';
import { GitBranch, Zap, Calendar, Clock, TrendingUp } from 'lucide-react';
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
          Correlações entre Marketing, Orgânico e Resultados de Negócio
        </Text>
      </motion.div>

      {/* Marketing vs Revenue Flow */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
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

      {/* Behavioral Patterns */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Calendar className="w-6 h-6 text-gold" />
          </div>
          <Heading as="h2" size="lg">Padrões Comportamentais</Heading>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Performance por Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={dayChartData}
                  height={180}
                  colors={['var(--color-accent)']}
                />
                <div className="mt-4 p-3 rounded-lg bg-accent/10 text-center">
                  <Text size="sm" variant="muted">Melhor Dia</Text>
                  <Text weight="bold" className="text-accent">{behaviorInsights.bestDay}</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Performance por Horário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={timeChartData}
                  height={180}
                  colors={['var(--color-gold)']}
                />
                <div className="mt-4 p-3 rounded-lg bg-gold/10 text-center">
                  <Text size="sm" variant="muted">Melhor Horário</Text>
                  <Text weight="bold" className="text-gold">{behaviorInsights.bestTime}</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Receita Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={monthlyChartData}
                  height={180}
                  lines={[{ key: 'value', color: 'var(--color-success)', name: 'Receita' }]}
                  showLegend={false}
                />
                <div className="mt-4 p-3 rounded-lg bg-success/10 text-center">
                  <Text size="sm" variant="muted">Melhor Mês</Text>
                  <Text weight="bold" className="text-success">{behaviorInsights.bestMonth}</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Correlations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <Heading as="h3" size="sm" className="mb-4">Correlações Identificadas</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="default">1</Badge>
                  <div>
                    <Text weight="semibold">Pago Impulsiona Orgânico</Text>
                    <Text size="sm" variant="muted">
                      Campanhas MSG + AUD aumentam alcance orgânico em 40%
                    </Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="gold">2</Badge>
                  <div>
                    <Text weight="semibold">Black Friday Potencializou Resultados</Text>
                    <Text size="sm" variant="muted">
                      Novembro teve 29,8% mais receita que outubro
                    </Text>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="success">3</Badge>
                  <div>
                    <Text weight="semibold">Ticket Médio Crescente</Text>
                    <Text size="sm" variant="muted">
                      De R$ 1.380 (Set) para R$ 2.132 (Nov) - +54%
                    </Text>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="info">4</Badge>
                  <div>
                    <Text weight="semibold">Sextas + Manhãs = Performance</Text>
                    <Text size="sm" variant="muted">
                      Melhor combinação para publicações orgânicas
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
