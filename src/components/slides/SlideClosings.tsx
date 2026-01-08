'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Briefcase, CheckCircle, Clock, Award } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { BarChart } from '../charts/BarChart';
import { PieChart } from '../charts/PieChart';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';

// Import data
import {
  consolidatedClosingSummary,
  closingsByCategory,
  monthlySummaries,
} from '@/lib/data/closings';

export function SlideClosings() {
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

  // Prepare pie chart data for top 5 categories
  const categoryPieData = closingsByCategory.slice(0, 5).map(cat => ({
    name: cat.category,
    value: cat.revenue,
    percentage: cat.percentage,
  }));

  // Monthly revenue chart data
  const monthlyChartData = monthlySummaries.map(month => ({
    name: month.month.substring(0, 3),
    value: month.totalRevenue,
  }));

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 6 de 8</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Fechamento da Clínica
        </Heading>
        <Text variant="muted" size="lg">
          Resultados de negócio no período Set-Dez 2025
        </Text>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Faturamento Total"
            value={formatCurrency(consolidatedClosingSummary.totalRevenue)}
            icon={<DollarSign className="w-5 h-5" />}
            variant="gold"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Procedimentos"
            value={formatNumber(consolidatedClosingSummary.totalRecords)}
            subtitle="Set-Dez 2025"
            icon={<Briefcase className="w-5 h-5" />}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(consolidatedClosingSummary.totalRevenue / consolidatedClosingSummary.totalRecords)}
            icon={<TrendingUp className="w-5 h-5" />}
            variant="accent"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Taxa Quitação"
            value={formatPercent((consolidatedClosingSummary.quitadoCount / consolidatedClosingSummary.totalRecords) * 100)}
            subtitle={`${consolidatedClosingSummary.quitadoCount} quitados`}
            icon={<CheckCircle className="w-5 h-5" />}
            variant="success"
          />
        </motion.div>
      </motion.div>

      {/* Revenue Status */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <Text weight="semibold">Receita Paga</Text>
              </div>
              <Text size="2xl" weight="bold" className="text-success">
                {formatCurrency(consolidatedClosingSummary.paidRevenue)}
              </Text>
              <Text size="sm" variant="muted">
                {formatPercent((consolidatedClosingSummary.paidRevenue / consolidatedClosingSummary.totalRevenue) * 100)} do total
              </Text>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <Text weight="semibold">Receita Pendente</Text>
              </div>
              <Text size="2xl" weight="bold" className="text-warning">
                {formatCurrency(consolidatedClosingSummary.pendingRevenue)}
              </Text>
              <Text size="sm" variant="muted">
                {consolidatedClosingSummary.emAbertoCount} procedimentos em aberto
              </Text>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <Text weight="semibold">Mês Destaque</Text>
              </div>
              <Text size="2xl" weight="bold" className="text-accent">
                Novembro
              </Text>
              <Text size="sm" variant="muted">
                {formatCurrency(monthlySummaries.find(m => m.month === 'Novembro')?.totalRevenue || 0)}
              </Text>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Receita por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                data={categoryPieData}
                height={250}
                showLegend
                showLabels
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={monthlyChartData}
                height={250}
                colors={['var(--color-gold)']}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Top Categorias por Receita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {closingsByCategory.slice(0, 6).map((cat, index) => (
                <div key={cat.category} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                    index === 0 ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <Text weight="semibold">{cat.category}</Text>
                    <Text size="sm" variant="muted">{cat.count} procedimentos</Text>
                  </div>
                  <div className="text-right">
                    <Text weight="bold">{formatCurrency(cat.revenue)}</Text>
                    <Badge variant={index === 0 ? 'gold' : 'outline'} className="ml-2">
                      {formatPercent(cat.percentage)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <Heading as="h3" size="sm" className="mb-4">Insights do Fechamento</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Text size="sm" variant="muted">Serviço carro-chefe</Text>
                <Text weight="semibold" className="text-gold">
                  Toxina Botulínica (30,7%)
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Crescimento Novembro</Text>
                <Text weight="semibold" className="text-success">
                  +29,8% vs Outubro
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Recomendação</Text>
                <Text weight="semibold" className="text-accent">
                  Criar campanhas específicas para Toxina
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
