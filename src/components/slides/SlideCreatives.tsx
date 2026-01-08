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
  'redtouch': '/creatives/redtouch.png',
  'co2': '/creatives/co2-virtue.png',
  'virtue': '/creatives/co2-virtue.png',
  '07.11': '/creatives/post-07-11.png',
  '07/11': '/creatives/post-07-11.png',
  '12.11': '/creatives/post-12-11.png',
  '12/11': '/creatives/post-12-11.png',
  '28/09': '/creatives/post-28-09.png',
};

// Melhores Criativos - Lista unificada com dados verificados
// PADRÃO IDENTIFICADO: Vídeos de procedimentos tecnológicos (Laser, Redtouch, CO2, Virtue)
// com texto na tela explicando o procedimento performam MUITO melhor
const melhoresCreativos = [
  // TOP MENSAGEM - Vídeos de tecnologia/laser com texto explicativo
  {
    id: 'co2-virtue',
    name: 'Vídeo CO2 e Virtue',
    campaignName: '[ILP] [St/Reels] [palmas +] [M] - interesses',
    campaignType: 'MENSAGEM' as const,
    format: 'VIDEO' as const,
    metrics: {
      results: 31,
      resultType: 'Conversas por mensagem iniciadas',
      costPerResult: 24.68,
    },
    hasThumb: true,
  },
  {
    id: 'redtouch-pro-2',
    name: 'Vídeo RedTouch PRO',
    campaignName: '[ILP] [St/Reels] [palmas +] [M] - interesses',
    campaignType: 'MENSAGEM' as const,
    format: 'VIDEO' as const,
    metrics: {
      results: 13,
      resultType: 'Conversas por mensagem iniciadas',
      costPerResult: 23.45,
    },
    hasThumb: true,
  },
  {
    id: 'redtouch-pro-1',
    name: 'Vídeo RedtouchPro (26 conv)',
    campaignName: '[ILP] [St/Reels] [palmas +] [M] - interesses',
    campaignType: 'MENSAGEM' as const,
    format: 'VIDEO' as const,
    metrics: {
      results: 26,
      resultType: 'Conversas por mensagem iniciadas',
      costPerResult: 31.38,
    },
    hasThumb: true,
  },
  // TOP AUDIÊNCIA - Mantidos os melhores
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
];

// Helper to find image for a creative
const getCreativeImage = (creativeId: string, creativeName: string): string | null => {
  // Check by ID first (for redtouch and co2-virtue)
  if (creativeId.includes('redtouch')) {
    return creativeImages['redtouch'];
  }
  if (creativeId.includes('co2') || creativeId.includes('virtue')) {
    return creativeImages['co2'];
  }
  // Then check by name for date-based posts
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
    'PROCEDIMENTO_TECH': 'var(--color-success)',
    'TEXTO_EXPLICATIVO': 'var(--color-gold)',
    'VIDEO_REELS': 'var(--color-accent)',
    'MEDICO_PRESENTE': 'var(--color-info)',
  };

  const patternLabels: Record<string, string> = {
    'PROCEDIMENTO_TECH': 'PROCEDIMENTO TECNOLÓGICO',
    'TEXTO_EXPLICATIVO': 'TEXTO NA TELA',
    'VIDEO_REELS': 'FORMATO VÍDEO/REELS',
    'MEDICO_PRESENTE': 'MÉDICO PRESENTE',
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {melhoresCreativos.map((creative, index) => {
            const imagePath = getCreativeImage(creative.id, creative.name);
            const isAudiencia = creative.campaignType === 'AUDIENCIA';
            return (
              <motion.div key={creative.id} variants={itemVariants}>
                <Card className="p-4 h-full">
                  <div className="flex flex-col h-full">
                    {/* Header com ranking e badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isAudiencia ? 'bg-gold/20 text-gold' : 'bg-accent/20 text-accent'} font-bold`}>
                        {index + 1}
                      </div>
                      <Badge variant={isAudiencia ? 'gold' : 'default'} className="text-xs">
                        {creative.campaignType}
                      </Badge>
                    </div>

                    {/* Thumbnail maior */}
                    {imagePath ? (
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-white/10 mb-3">
                        <Image
                          src={imagePath}
                          alt={creative.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-lg border border-white/10 bg-accent/10 flex items-center justify-center mb-3">
                        <Video className="w-12 h-12 text-accent" />
                      </div>
                    )}

                    {/* Info do criativo */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {formatIcon(creative.format)}
                        <Text weight="semibold" size="sm" className="line-clamp-1">
                          {creative.name}
                        </Text>
                      </div>
                      <Text size="xs" variant="muted" className="line-clamp-1 mb-2">
                        {creative.metrics.resultType}
                      </Text>
                    </div>

                    {/* Métricas */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        {isAudiencia ? (
                          <Eye className="w-4 h-4 text-gold" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-accent" />
                        )}
                        <Text weight="bold">{formatNumber(creative.metrics.results)}</Text>
                      </div>
                      <Text size="sm" variant="muted">
                        {formatCurrency(creative.metrics.costPerResult)}/res.
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
                    </div>
                    <Badge variant={pattern.percentage >= 60 ? 'success' : 'gold'}>
                      {pattern.percentage}% dos top criativos
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
              <Text weight="semibold" className="text-success mb-3">
                {successPatterns.keyInsight}
              </Text>
              <Text size="sm" variant="muted" className="mb-2">Como Replicar o Padrão de Sucesso:</Text>
              <ul className="list-disc list-inside space-y-1">
                {successPatterns.realInsight.actionable.map((action, i) => (
                  <li key={i}><Text size="sm" as="span">{action}</Text></li>
                ))}
              </ul>
              <div className="mt-3 p-2 rounded bg-gold/10 border-l-2 border-gold">
                <Text size="xs" variant="muted">
                  <span className="text-gold font-semibold">Nota:</span> Para campanhas de MENSAGEM, evitar carrosséis (custo muito alto). Para AUDIÊNCIA, imagens funcionam bem com custo ~R$0,40/visita.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
