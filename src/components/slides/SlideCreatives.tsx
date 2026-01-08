'use client';

import { motion } from 'framer-motion';
import { Video, Image as ImageIcon, LayoutGrid, TrendingUp, Eye, MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import { creativeSummary } from '@/lib/data/creatives';
import { successPatterns } from '@/lib/data/research';

// Image mapping for creatives with thumbnails
const creativeImages: Record<string, string> = {
  '05/11': '/creatives/post-05-11.png',
  '07.11': '/creatives/post-07-11.png',
  '07/11': '/creatives/post-07-11.png',
  '12.11': '/creatives/post-12-11.png',
  '12/11': '/creatives/post-12-11.png',
  '28/09': '/creatives/post-28-09.png',
};

// Melhores Criativos - Lista unificada com dados verificados
const melhoresCreativos = [
  {
    id: 'bioestimulador',
    name: 'Video Bioestimulador',
    campaignName: '[ILP] [Audiencia] [Trafego -> View Ig] [Pub. Frio]',
    campaignType: 'MENSAGEM' as const,
    format: 'VIDEO' as const,
    metrics: {
      results: 1510,
      resultType: 'Visitas ao perfil do Instagram',
      costPerResult: 0.43,
    },
    hasThumb: false,
  },
  {
    id: 'post-07-11',
    name: 'Post IG (07.11)',
    campaignName: '[ILP] [BF] [Audiencia] [Trafego -> Visitou Perfil IG]',
    campaignType: 'AUDIENCIA' as const,
    format: 'IMAGE' as const,
    metrics: {
      results: 2825,
      resultType: 'Visitas ao perfil do Instagram',
      costPerResult: 0.41,
    },
    hasThumb: true,
  },
  {
    id: 'post-12-11',
    name: 'Post IG (12.11) - Dra. Yasmin',
    campaignName: '[ILP] [BF] [Audiencia] [Trafego -> Visitou Perfil IG]',
    campaignType: 'AUDIENCIA' as const,
    format: 'IMAGE' as const,
    metrics: {
      results: 1957,
      resultType: 'Visitas ao perfil do Instagram',
      costPerResult: 0.40,
    },
    hasThumb: true,
  },
  {
    id: 'post-28-09',
    name: 'Post Reels 28/09 (Dra. Yasmin)',
    campaignName: '[ILP] [Audiencia] [Trafego -> Visitou Perfil IG]',
    campaignType: 'AUDIENCIA' as const,
    format: 'IMAGE' as const,
    metrics: {
      results: 1502,
      resultType: 'Visitas ao perfil do Instagram',
      costPerResult: 0.37,
    },
    hasThumb: true,
  },
  {
    id: 'post-05-11',
    name: 'Post Carrossel 05/11',
    campaignName: '[ILP] [BF] [Msg] [Vendas -> Wpp] [Rmkt]',
    campaignType: 'MENSAGEM' as const,
    format: 'CAROUSEL' as const,
    metrics: {
      results: 37,
      resultType: 'Conversas por mensagem iniciadas',
      costPerResult: 55.46,
    },
    hasThumb: true,
  },
];

// Helper to find image for a creative
const getCreativeImage = (creativeName: string): string | null => {
  for (const [dateKey, imagePath] of Object.entries(creativeImages)) {
    if (creativeName.includes(dateKey)) {
      return imagePath;
    }
  }
  return null;
};

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

  // Pattern analysis from research data
  const patternColors: Record<string, string> = {
    'REELS': 'var(--color-accent)',
    'MEDICO_PRESENTE': 'var(--color-gold)',
    'BLACK_FRIDAY': 'var(--color-success)',
    'VIDEO': 'var(--color-info)',
    'BIOESTIMULADOR': 'var(--color-chart-5)',
  };

  const patternLabels: Record<string, string> = {
    'REELS': 'REELS',
    'MEDICO_PRESENTE': 'MÉDICO PRESENTE',
    'BLACK_FRIDAY': 'BLACK FRIDAY',
    'VIDEO': 'VÍDEO',
    'BIOESTIMULADOR': 'BIOESTIMULADOR',
  };

  const patterns = successPatterns.top10Patterns.slice(0, 5).map(p => ({
    name: patternLabels[p.pattern] || p.pattern,
    percentage: p.percentage,
    frequency: p.frequency,
    color: patternColors[p.pattern] || 'var(--color-accent)',
  }));

  // Format performance from research
  const formatPerformance = successPatterns.formatPerformance;

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

      {/* Melhores Criativos - Seção Unificada */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <Star className="w-6 h-6 text-gold" />
          <Heading as="h2" size="lg">Melhores Criativos</Heading>
          <Badge variant="gold">Top Performers</Badge>
        </motion.div>

        <div className="space-y-3">
          {melhoresCreativos.map((creative, index) => {
            const imagePath = getCreativeImage(creative.name);
            const isAudiencia = creative.campaignType === 'AUDIENCIA';
            return (
              <motion.div key={creative.id} variants={itemVariants}>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isAudiencia ? 'bg-gold/20 text-gold' : 'bg-accent/20 text-accent'} font-bold shrink-0`}>
                      {index + 1}
                    </div>
                    {imagePath ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <Image
                          src={imagePath}
                          alt={creative.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg shrink-0 border border-white/10 bg-accent/10 flex items-center justify-center">
                        <Video className="w-6 h-6 text-accent" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {formatIcon(creative.format)}
                        <Text weight="semibold" className="truncate">
                          {creative.name}
                        </Text>
                        <Badge variant={isAudiencia ? 'gold' : 'default'} className="text-xs">
                          {creative.campaignType}
                        </Badge>
                      </div>
                      <Text size="sm" variant="muted" className="truncate">
                        {creative.metrics.resultType}
                      </Text>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1">
                        {isAudiencia ? (
                          <Eye className="w-4 h-4 text-gold" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-accent" />
                        )}
                        <Text weight="bold">{formatNumber(creative.metrics.results)}</Text>
                      </div>
                      <Text size="sm" variant="muted">
                        {formatCurrency(creative.metrics.costPerResult)}/resultado
                      </Text>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Format Performance Comparison */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-success" />
          <Heading as="h2" size="lg">Performance por Formato</Heading>
          <Badge variant="success">Análise Comparativa</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="text-center p-4 border-accent/30">
              <Video className="w-8 h-8 mx-auto mb-2 text-accent" />
              <Text size="xl" weight="bold" className="text-accent">{formatNumber(formatPerformance.video.avgResults)}</Text>
              <Text size="sm" variant="muted" className="mb-2">Resultados médios</Text>
              <Badge variant="default">{formatCurrency(formatPerformance.video.avgCost)}/resultado</Badge>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="text-center p-4 border-gold/30">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gold" />
              <Text size="xl" weight="bold" className="text-gold">{formatNumber(formatPerformance.image.avgResults)}</Text>
              <Text size="sm" variant="muted" className="mb-2">Resultados médios</Text>
              <Badge variant="gold">{formatCurrency(formatPerformance.image.avgCost)}/resultado</Badge>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="text-center p-4 border-info/30">
              <LayoutGrid className="w-8 h-8 mx-auto mb-2 text-info" />
              <Text size="xl" weight="bold" className="text-info">{formatNumber(formatPerformance.carousel.avgResults)}</Text>
              <Text size="sm" variant="muted" className="mb-2">Resultados médios</Text>
              <Badge variant="info">{formatCurrency(formatPerformance.carousel.avgCost)}/resultado</Badge>
            </Card>
          </motion.div>
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
                    <div className="flex items-center gap-2">
                      <Text weight="medium">{pattern.name}</Text>
                      <Text size="xs" variant="muted">({pattern.frequency} de 10)</Text>
                    </div>
                    <Badge variant={pattern.percentage >= 40 ? 'success' : 'outline'}>
                      {pattern.percentage}% dos top performers
                    </Badge>
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
              <Text size="sm" variant="muted" className="mb-2">Insight Principal:</Text>
              <Text weight="semibold" className="text-accent mb-3">
                {successPatterns.keyInsight}
              </Text>
              <Text size="sm" variant="muted" className="mb-2">Recomendações:</Text>
              <ul className="list-disc list-inside space-y-1">
                <li><Text size="sm" as="span">Priorizar formato REELS - 40x mais resultados que carrossel</Text></li>
                <li><Text size="sm" as="span">Presença médica aumenta confiança e engajamento</Text></li>
                <li><Text size="sm" as="span">Vídeos têm 25% melhor custo/resultado que imagens</Text></li>
                <li><Text size="sm" as="span">Datas promocionais (Black Friday) são oportunidades-chave</Text></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
