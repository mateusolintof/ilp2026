'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Eye, FileText, DollarSign, CircleDollarSign, Users, Target, Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { BarChart } from '../charts/BarChart';
import { LineChart } from '../charts/LineChart';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import { mensagemSummary, audienciaSummary } from '@/lib/data/campaigns';
import { organicSummary } from '@/lib/data/organic';
import { consolidatedClosingSummary, monthlySummaries } from '@/lib/data/closings';
import { ilpVsBenchmarks } from '@/lib/data/research';

export function SlideExecutiveSummary() {
  const totalInvestment = mensagemSummary.consolidated.spent + audienciaSummary.consolidated.spent;
  const totalRevenue = consolidatedClosingSummary.totalRevenue;
  const totalProcedures = consolidatedClosingSummary.totalRecords;

  // Prepare monthly revenue chart data
  const monthlyRevenueData = monthlySummaries.map(m => ({
    name: m.month.substring(0, 3),
    value: m.totalRevenue,
  }));

  // Prepare channel distribution data
  const channelData = [
    { name: 'MSG (WhatsApp)', value: mensagemSummary.consolidated.spent },
    { name: 'AUD (Perfil)', value: audienciaSummary.consolidated.spent },
  ];

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
        <Label className="mb-2 block">Slide 2 de 8</Label>
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
            icon={<CircleDollarSign className="w-5 h-5" />}
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
    </div>
  );
}
