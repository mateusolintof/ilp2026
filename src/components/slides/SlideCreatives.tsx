'use client';

import { motion } from 'framer-motion';
import { Video, Image as ImageIcon, LayoutGrid, Award, TrendingUp, Eye, MessageCircle } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import {
  topMensagemCreatives,
  topAudienciaCreatives,
  creativeSummary,
} from '@/lib/data/creatives';

export function SlideCreatives() {
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

  // Pattern analysis
  const patterns = [
    { name: 'REELS', percentage: 40, color: 'var(--color-accent)' },
    { name: 'MÉDICO PRESENTE', percentage: 40, color: 'var(--color-gold)' },
    { name: 'BLACK FRIDAY', percentage: 40, color: 'var(--color-success)' },
    { name: 'VIDEO', percentage: 20, color: 'var(--color-info)' },
    { name: 'CARROSSEL', percentage: 20, color: 'var(--color-chart-5)' },
  ];

  const formatIcon = (format: string) => {
    switch (format) {
      case 'VIDEO':
        return <Video className="w-4 h-4" />;
      case 'CAROUSEL':
        return <LayoutGrid className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 4 de 8</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Análise de Criativos
        </Heading>
        <Text variant="muted" size="lg">
          Performance e padrões dos criativos mais eficientes
        </Text>
      </motion.div>

      {/* Format Summary */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4">
            <Video className="w-8 h-8 mx-auto mb-2 text-accent" />
            <Text size="xl" weight="bold">{creativeSummary.byFormat.video}</Text>
            <Text size="sm" variant="muted">Vídeos</Text>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gold" />
            <Text size="xl" weight="bold">{creativeSummary.byFormat.image}</Text>
            <Text size="sm" variant="muted">Imagens</Text>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="text-center p-4">
            <LayoutGrid className="w-8 h-8 mx-auto mb-2 text-info" />
            <Text size="xl" weight="bold">{creativeSummary.byFormat.carousel}</Text>
            <Text size="sm" variant="muted">Carrosséis</Text>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Creatives - MENSAGEM */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-accent" />
          <Heading as="h2" size="lg">Top 5 Criativos - MENSAGEM</Heading>
        </motion.div>

        <div className="space-y-3">
          {topMensagemCreatives.slice(0, 5).map((creative, index) => (
            <motion.div key={creative.id} variants={itemVariants}>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {formatIcon(creative.format)}
                      <Text weight="semibold" className="truncate">
                        {creative.name}
                      </Text>
                    </div>
                    <Text size="sm" variant="muted" className="truncate">
                      {creative.campaignName}
                    </Text>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-accent" />
                      <Text weight="bold">{formatNumber(creative.metrics.results || 0)}</Text>
                    </div>
                    <Text size="sm" variant="muted">
                      {formatCurrency(creative.metrics.costPerResult)}/resultado
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top Creatives - AUDIÊNCIA */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-gold" />
          <Heading as="h2" size="lg">Top 5 Criativos - AUDIÊNCIA</Heading>
        </motion.div>

        <div className="space-y-3">
          {topAudienciaCreatives.slice(0, 5).map((creative, index) => (
            <motion.div key={creative.id} variants={itemVariants}>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/20 text-gold font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {formatIcon(creative.format)}
                      <Text weight="semibold" className="truncate">
                        {creative.name}
                      </Text>
                    </div>
                    <Text size="sm" variant="muted" className="truncate">
                      {creative.campaignName}
                    </Text>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-gold" />
                      <Text weight="bold">{formatNumber(creative.metrics.results || 0)}</Text>
                    </div>
                    <Text size="sm" variant="muted">
                      {formatCurrency(creative.metrics.costPerResult)}/resultado
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pattern Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card variant="glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Padrões de Sucesso Identificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patterns.map((pattern) => (
                <div key={pattern.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Text weight="medium">{pattern.name}</Text>
                    <Badge variant="outline">{pattern.percentage}% dos top performers</Badge>
                  </div>
                  <ProgressBar
                    value={pattern.percentage}
                    variant={pattern.percentage >= 40 ? 'accent' : 'default'}
                    size="sm"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Text size="sm" variant="muted" className="mb-2">Recomendações:</Text>
              <ul className="list-disc list-inside space-y-1">
                <li><Text size="sm" as="span">Priorizar formato REELS para novos criativos</Text></li>
                <li><Text size="sm" as="span">Incluir médico(a) no criativo aumenta engajamento</Text></li>
                <li><Text size="sm" as="span">Vídeos têm melhor custo/resultado em campanhas MSG</Text></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
