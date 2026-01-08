'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Briefcase, Award, Sparkles, Gem, ArrowRight, Lightbulb } from 'lucide-react';
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

import { trends2026 } from '@/lib/data/research';

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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
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

      {/* 2026 Trends Alignment */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <Heading as="h2" size="lg">Contexto de Mercado 2026</Heading>
          <Badge variant="gold">Pesquisa de Mercado</Badge>
        </motion.div>

        {/* Macro Trend Context - Expanded */}
        <motion.div variants={itemVariants} className="mb-4">
          <Card className="border-gold/30 bg-gold/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Gem className="w-5 h-5 text-gold" />
                <Text weight="bold" size="lg" className="text-gold">{trends2026.macroTrend.title}</Text>
              </div>
              <div className="space-y-3">
                <Text size="sm" variant="muted">{trends2026.macroTrend.description}</Text>
                <div className="p-3 rounded bg-white/5 border-l-2 border-gold">
                  <Text size="sm" weight="semibold" className="text-white mb-1">O que isso significa na prática:</Text>
                  <Text size="sm" variant="muted">
                    A busca por resultados naturais está transformando o setor. Segundo a Galderma (líder global em estética),
                    bioestimuladores cresceram 47% em 2024 enquanto preenchimentos tradicionais estagnaram.
                    Pacientes querem &quot;melhorar a qualidade da pele&quot;, não &quot;preencher rugas&quot;.
                  </Text>
                </div>
                <Text size="xs" variant="muted">Fonte: {trends2026.macroTrend.source}</Text>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services vs Trends Matrix - With explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends2026.ilpOpportunities.map((opp) => (
            <motion.div key={opp.service} variants={itemVariants}>
              <Card className="h-full hover:border-gold/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Text weight="bold">{opp.service}</Text>
                    <Badge variant={opp.trend.includes('ALTO') || opp.action.includes('ALTO') ? 'success' : 'gold'} className="text-xs">
                      {opp.trend}
                    </Badge>
                  </div>
                  <Text size="sm" variant="muted" className="mb-2">{opp.context}</Text>
                  <div className="p-2 rounded bg-accent/5 border-l-2 border-accent">
                    <div className="flex items-center gap-2 text-accent">
                      <ArrowRight className="w-4 h-4 shrink-0" />
                      <Text size="sm" weight="semibold">{opp.action}</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Insights Box - Rewritten */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-gold" />
              <Heading as="h3" size="sm">Análise do Mix de Serviços</Heading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold" />
                  <Text weight="semibold">Serviço Carro-Chefe</Text>
                </div>
                <Text size="sm" variant="muted">
                  <span className="text-gold font-semibold">Toxina Botulínica</span> representa 30,7% do faturamento.
                  Este é um serviço de entrada que fideliza pacientes para procedimentos mais complexos.
                  A alta demanda indica que a estratégia de comunicação está atraindo o público certo.
                </Text>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <Text weight="semibold">Oportunidade de Cross-Sell</Text>
                </div>
                <Text size="sm" variant="muted">
                  Os procedimentos de <span className="text-accent font-semibold">Bioestimuladores</span> (5,1%)
                  e <span className="text-accent font-semibold">Skinboosters</span> (2,3%) têm alto potencial de crescimento.
                  Pacientes de toxina são candidatos ideais para esses tratamentos complementares
                  focados em qualidade de pele.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
