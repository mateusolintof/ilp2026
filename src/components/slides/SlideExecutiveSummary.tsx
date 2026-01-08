'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Eye, FileText, TrendingUp, DollarSign, Award } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import { mensagemSummary, audienciaSummary } from '@/lib/data/campaigns';
import { organicSummary } from '@/lib/data/organic';
import { consolidatedClosingSummary } from '@/lib/data/closings';

export function SlideExecutiveSummary() {
  // Calculate totals
  const totalInvestment = mensagemSummary.consolidated.spent + audienciaSummary.consolidated.spent;
  const totalRevenue = consolidatedClosingSummary.totalRevenue;
  const roi = ((totalRevenue - totalInvestment) / totalInvestment) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-full">
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

      {/* KPI Cards Row */}
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
            title="Faturamento"
            value={formatCurrency(totalRevenue)}
            subtitle="1.621 procedimentos"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="gold"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="ROI Marketing"
            value={`${formatNumber(Math.round(roi))}%`}
            subtitle="Retorno sobre investimento"
            icon={<Award className="w-5 h-5" />}
            variant="success"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Retorno por R$ 1"
            value={formatCurrency(totalRevenue / totalInvestment)}
            subtitle="Receita / Investimento"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="accent"
          />
        </motion.div>
      </motion.div>

      {/* Campaign Performance Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
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
                  <Text size="sm" variant="muted">WhatsApp</Text>
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

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <Heading as="h3" size="sm" className="mb-4">
              Principais Destaques
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InsightItem
                title="Melhor Criativo MSG"
                value="Video Bioestimulador"
                detail="1.510 conversas | R$ 0.43/conv"
              />
              <InsightItem
                title="Melhor Criativo AUD"
                value="Post IG 07.11"
                detail="2.825 visitas | R$ 0.41/visita"
              />
              <InsightItem
                title="Melhor Dia"
                value="Sexta-feira"
                detail="233.186 views/post"
              />
              <InsightItem
                title="Top Serviço"
                value="Toxina Botulínica"
                detail="30.7% da receita"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

interface InsightItemProps {
  title: string;
  value: string;
  detail: string;
}

function InsightItem({ title, value, detail }: InsightItemProps) {
  return (
    <div className="space-y-1">
      <Text size="xs" variant="muted" className="uppercase tracking-wider">
        {title}
      </Text>
      <Text weight="semibold" className="text-accent">
        {value}
      </Text>
      <Text size="sm" variant="muted">
        {detail}
      </Text>
    </div>
  );
}
