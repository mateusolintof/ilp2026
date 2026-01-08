'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Eye, FileText, DollarSign, Briefcase, TrendingUp, Users } from 'lucide-react';
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
        className="mb-8"
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Investimento Total"
            value={formatCurrency(totalInvestment)}
            subtitle="Meta Ads (Set-Dez)"
            icon={<DollarSign className="w-5 h-5" />}
            variant="default"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Faturamento Total"
            value={formatCurrency(totalRevenue)}
            subtitle="Receita clínica"
            icon={<Briefcase className="w-5 h-5" />}
            variant="gold"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Procedimentos"
            value={formatNumber(totalProcedures)}
            subtitle="Total realizados"
            icon={<Users className="w-5 h-5" />}
            variant="accent"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Ticket Médio"
            value={formatCurrency(totalRevenue / totalProcedures)}
            subtitle="Receita / Procedimentos"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="success"
          />
        </motion.div>
      </motion.div>

      {/* Charts Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Evolução Mensal do Faturamento</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlyRevenueData}
                height={220}
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
                height={220}
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Mensagem Campaign */}
        <motion.div variants={itemVariants}>
          <Card variant="bordered" className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <Text weight="semibold">Campanhas de Mensagem</Text>
                  <Text size="sm" variant="muted">WhatsApp Business</Text>
                </div>
              </div>
              <div className="space-y-3">
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
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gold/10">
                  <Eye className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <Text weight="semibold">Campanhas de Audiência</Text>
                  <Text size="sm" variant="muted">Visitas ao Perfil</Text>
                </div>
              </div>
              <div className="space-y-3">
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
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-info/10">
                  <FileText className="w-5 h-5 text-info" />
                </div>
                <div>
                  <Text weight="semibold">Performance Orgânica</Text>
                  <Text size="sm" variant="muted">Feed, Reels & Stories</Text>
                </div>
              </div>
              <div className="space-y-3">
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
