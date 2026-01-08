'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Eye, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { BarChart } from '../charts/BarChart';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';

// Import data
import {
  mensagemCampaigns,
  audienciaCampaigns,
  mensagemSummary,
  audienciaSummary,
} from '@/lib/data/campaigns';

export function SlidePaidTraffic() {
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

  // Prepare chart data for campaigns
  const mensagemChartData = mensagemCampaigns
    .filter(c => (c.metrics.conversationsStarted || 0) > 0)
    .sort((a, b) => (b.metrics.conversationsStarted || 0) - (a.metrics.conversationsStarted || 0))
    .slice(0, 5)
    .map(c => ({
      name: c.name.length > 25 ? c.name.substring(0, 25) + '...' : c.name,
      value: c.metrics.conversationsStarted || 0,
    }));

  const audienciaChartData = audienciaCampaigns
    .filter(c => (c.metrics.profileVisits || 0) > 0)
    .sort((a, b) => (b.metrics.profileVisits || 0) - (a.metrics.profileVisits || 0))
    .slice(0, 5)
    .map(c => ({
      name: c.name.length > 25 ? c.name.substring(0, 25) + '...' : c.name,
      value: c.metrics.profileVisits || 0,
    }));

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 3 de 8</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Tráfego Pago
        </Heading>
        <Text variant="muted" size="lg">
          Performance das campanhas Meta Ads por objetivo
        </Text>
      </motion.div>

      {/* MENSAGEM Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <MessageCircle className="w-6 h-6 text-accent" />
          </div>
          <div>
            <Heading as="h2" size="lg">Campanhas de Mensagem</Heading>
            <Text size="sm" variant="muted">Objetivo: Conversas via WhatsApp</Text>
          </div>
          <Badge variant="default" className="ml-auto">{mensagemSummary.count} campanhas</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Investimento"
              value={formatCurrency(mensagemSummary.consolidated.spent)}
              icon={<DollarSign className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Conversas Iniciadas"
              value={formatNumber(mensagemSummary.consolidated.conversationsStarted)}
              icon={<MessageCircle className="w-5 h-5" />}
              size="sm"
              variant="accent"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Custo por Conversa"
              value={formatCurrency(mensagemSummary.consolidated.costPerResult)}
              subtitle="Benchmark: R$ 5-15"
              icon={<Target className="w-5 h-5" />}
              size="sm"
              variant="success"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Alcance Total"
              value={formatNumber(mensagemSummary.consolidated.reach)}
              icon={<Users className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Campanhas - Conversas</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={mensagemChartData}
                height={200}
                layout="vertical"
                colors={['var(--color-accent)']}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* AUDIÊNCIA Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Eye className="w-6 h-6 text-gold" />
          </div>
          <div>
            <Heading as="h2" size="lg">Campanhas de Audiência</Heading>
            <Text size="sm" variant="muted">Objetivo: Visitas ao Perfil do Instagram</Text>
          </div>
          <Badge variant="gold" className="ml-auto">{audienciaSummary.count} campanhas</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Investimento"
              value={formatCurrency(audienciaSummary.consolidated.spent)}
              icon={<DollarSign className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Visitas ao Perfil"
              value={formatNumber(audienciaSummary.consolidated.profileVisits)}
              icon={<Eye className="w-5 h-5" />}
              size="sm"
              variant="gold"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Custo por Visita"
              value={formatCurrency(audienciaSummary.consolidated.costPerResult)}
              subtitle="Benchmark: R$ 0.30-0.80"
              icon={<Target className="w-5 h-5" />}
              size="sm"
              variant="success"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="CTR Médio"
              value={formatPercent(audienciaSummary.consolidated.ctr)}
              subtitle="Benchmark: 0.5-1.5%"
              icon={<TrendingUp className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Campanhas - Visitas ao Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={audienciaChartData}
                height={200}
                layout="vertical"
                colors={['var(--color-gold)']}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Insights Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <Heading as="h3" size="sm" className="mb-4">Insights do Tráfego Pago</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Text size="sm" variant="muted">Distribuição de Budget</Text>
                <Text weight="semibold">
                  MSG: {formatPercent((mensagemSummary.consolidated.spent / (mensagemSummary.consolidated.spent + audienciaSummary.consolidated.spent)) * 100)} |
                  AUD: {formatPercent((audienciaSummary.consolidated.spent / (mensagemSummary.consolidated.spent + audienciaSummary.consolidated.spent)) * 100)}
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Custo MSG abaixo do benchmark</Text>
                <Text weight="semibold" className="text-success">
                  R$ {mensagemSummary.consolidated.costPerResult.toFixed(2)} vs R$ 5-15 (mercado)
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Recomendação</Text>
                <Text weight="semibold" className="text-accent">
                  Aumentar budget em 30% para Q1 2026
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
