'use client';

import { motion } from 'framer-motion';
import { Video, Image as ImageIcon, LayoutGrid, TrendingUp, Eye, MessageCircle, Star, Sparkles, SplitSquareVertical, ShieldCheck, Stethoscope, Layers } from 'lucide-react';
import Image from 'next/image';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Import data
import { successPatterns } from '@/lib/data/research';

// Image mapping for creatives with thumbnails
const creativeImages: Record<string, string> = {
  'bioestimulador': '/creatives/bioestimulador.png',
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
    id: 'bioestimulador',
    name: 'Vídeo Bioestimulador (Colágeno)',
    campaignName: '[ILP] [St/Reels] [palmas +] [M] - interesses',
    campaignType: 'MENSAGEM' as const,
    format: 'VIDEO' as const,
    metrics: {
      results: 18,
      resultType: 'Conversas por mensagem iniciadas',
      costPerResult: 26.39,
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
  // Check by ID first
  if (creativeId.includes('bioestimulador')) {
    return creativeImages['bioestimulador'];
  }
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
        <Label className="mb-2 block">Slide 5 de 7</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Análise de Criativos
        </Heading>
        <Text variant="muted" size="lg">
          Performance e padrões dos criativos mais eficientes
        </Text>
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

      {/* Padrões + Pesquisa */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-accent" />
          <Heading as="h2" size="lg">Padrões de Sucesso Identificados</Heading>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card variant="glow">
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-5 h-5 text-accent" />
                    <Text weight="semibold">Melhor Formato</Text>
                  </div>
                  <Text weight="bold" className="text-foreground">Vídeo / Reels</Text>
                  <Text size="sm" variant="muted" className="mt-1">
                    Consistente nos top performers (captura rápida + prova visual).
                  </Text>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-gold" />
                    <Text weight="semibold">Serviço com Melhores Resultados</Text>
                  </div>
                  <Text weight="bold" className="text-foreground">Procedimentos Tecnológicos</Text>
                  <Text size="sm" variant="muted" className="mt-1">
                    Demonstração do processo + autoridade médica elevam intenção.
                  </Text>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <SplitSquareVertical className="w-5 h-5 text-info" />
                    <Text weight="semibold">Técnica do Criativo</Text>
                  </div>
                  <Text weight="bold" className="text-foreground">Explicação (para quem é + o que faz)</Text>
                  <Text size="sm" variant="muted" className="mt-1">
                    Texto na tela + depoimento / fala médica, sem sensacionalismo.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-gold" />
          <Heading as="h2" size="lg">Pesquisa de Tendências e Estratégias de Conteúdo</Heading>
          <Badge variant="gold">Ideias de criativos</Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-accent" />
                  <Text weight="bold">1) “O que acontece na sessão”</Text>
                </div>
                <Text size="sm" variant="muted">Bastidor + processo: o que é feito, em qual etapa e o que esperar.</Text>
                <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                  <Text size="xs" variant="muted">Objetivo</Text>
                  <Text size="sm" weight="semibold" className="mt-1">Aumentar confiança e reduzir dúvidas</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <Text weight="bold">2) “Expectativa realista” (anti-promessa)</Text>
                </div>
                <Text size="sm" variant="muted">
                  Formato 20–30s com 2 colunas: “o que melhora” / “o que não é mágico”.
                </Text>
                <Text size="sm" variant="muted">
                  Exemplos: melasma, cicatriz de acne. Vantagem: aumenta confiança e diminui lead ruim.
                </Text>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <SplitSquareVertical className="w-5 h-5 text-info" />
                  <Text weight="bold">3) “Comparativo médico” (qual serve para quê)</Text>
                </div>
                <Text size="sm" variant="muted">
                  Split-screen ou quadro branco (25–40s). Ex.: Botox vs Preenchimento vs Bioestimulador; Laser vs peelings; CO2 vs estímulo de colágeno.
                </Text>
                <div className="p-3 rounded-xl bg-white/4 border border-white/10">
                  <Text size="sm" variant="muted">
                    Observação: este formato segue a lógica dos melhores criativos do período — explicação do procedimento que converge, não só “educação genérica”.
                  </Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  <Text weight="bold">4) “Protocolos” (combos que aumentam ticket)</Text>
                </div>
                <Text size="sm" variant="muted">
                  Carrossel (Meta) ou vídeo 30s: problema → plano (2–3 etapas) → tempo estimado → CTA.
                </Text>
                <Text size="sm" variant="muted">
                  Naming (sem promessa): “Protocolo textura + viço”, “Protocolo manchas controladas”, “Protocolo firmeza + colágeno”.
                </Text>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-gold" />
                  <Text weight="bold">5) Dermato clínica/cirúrgica (intenção + autoridade)</Text>
                </div>
                <Text size="sm" variant="muted">
                  Vídeo educativo + CTA para consulta/triagem. Temas: câncer de pele, nevo, verruga, cisto, lesões suspeitas.
                </Text>
                <Text size="sm" variant="muted">
                  Canais: Google/YouTube + remarketing em Meta. Por que é forte: demanda perene e intenção alta.
                </Text>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-info" />
                  <Text weight="bold">6) “Antes/depois educativo” (quando fizer sentido)</Text>
                </div>
                <Text size="sm" variant="muted">
                  Sequência com contexto: indicação, fases, limitações e riscos/complicações possíveis.
                </Text>
                <Text size="sm" variant="muted">
                  Requisito: caráter educativo e 100% dentro das regras do CFM; evite “milagre”.
                </Text>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
