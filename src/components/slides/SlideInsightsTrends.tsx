'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, TrendingUp, Sparkles, ArrowRight, CheckCircle, Star, Rocket, ExternalLink, Gem, Droplets, RefreshCw, Zap } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

// Import data
import { actionableInsights, trends2026, strategicRecommendations } from '@/lib/data/research';

export function SlideInsightsTrends() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Icon mapping for trends
  const trendIcons: Record<string, React.ReactNode> = {
    '💎': <Gem className="w-6 h-6 text-accent" />,
    '💧': <Droplets className="w-6 h-6 text-info" />,
    '🔄': <RefreshCw className="w-6 h-6 text-gold" />,
    '✨': <Sparkles className="w-6 h-6 text-success" />,
  };

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 8 de 8</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Insights & Tendências 2026
        </Heading>
        <Text variant="muted" size="lg">
          Conclusões baseadas em dados e recomendações estratégicas
        </Text>
      </motion.div>

      {/* Key Insights from Statistical Analysis */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Lightbulb className="w-6 h-6 text-accent" />
          </div>
          <Heading as="h2" size="lg">Insights Acionáveis</Heading>
          <Badge variant="default">Baseados em Dados</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionableInsights.slice(0, 5).map((insight) => (
            <motion.div key={insight.id} variants={itemVariants}>
              <Card className={`h-full hover:border-accent/50 transition-colors ${insight.priority === 'ALTA' ? 'border-success/30' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{insight.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Text weight="bold" size="sm">{insight.title}</Text>
                        <Badge variant={insight.priority === 'ALTA' ? 'success' : 'gold'} className="text-xs">
                          {insight.priority}
                        </Badge>
                      </div>
                      <Text size="xs" variant="muted" className="mb-2">
                        {insight.finding}
                      </Text>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-accent/5 border-l-2 border-accent">
                    <div className="flex items-center gap-1 text-accent">
                      <ArrowRight className="w-3 h-3" />
                      <Text size="xs" weight="semibold">{insight.action}</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 2026 Market Trends */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <Heading as="h2" size="lg">Tendências Dermatologia 2026</Heading>
          <Badge variant="gold">Pesquisa de Mercado</Badge>
        </motion.div>

        {/* Macro Trend */}
        <motion.div variants={itemVariants} className="mb-4">
          <Card className="border-gold/50 bg-gold/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-gold" />
                <Text weight="bold" className="text-gold">{trends2026.macroTrend.title}</Text>
              </div>
              <Text size="sm" variant="muted" className="mb-2">{trends2026.macroTrend.description}</Text>
              <Text size="xs" variant="muted" className="flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Fonte: {trends2026.macroTrend.source}
              </Text>
            </CardContent>
          </Card>
        </motion.div>

        {/* Procedures in High Demand */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {trends2026.procedures.map((proc) => (
            <motion.div key={proc.name} variants={itemVariants}>
              <Card className="h-full text-center p-3 hover:border-gold/50 transition-colors">
                {trendIcons[proc.icon] || <Star className="w-6 h-6 mx-auto mb-2 text-gold" />}
                <Text weight="bold" size="sm" className="mb-1">{proc.name}</Text>
                <Text size="xs" variant="muted" className="mb-2">{proc.description}</Text>
                <Badge variant={proc.potential === 'ALTO' ? 'success' : 'gold'} className="text-xs">
                  Potencial {proc.potential}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* K-Beauty Influence */}
        <motion.div variants={itemVariants}>
          <Card className="border-info/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-info" />
                <Text weight="bold">Influência K-Beauty no Brasil</Text>
                <Badge variant="info">{trends2026.kBeauty.growth} busca por &quot;{trends2026.kBeauty.term}&quot;</Badge>
              </div>
              <Text size="sm" variant="muted" className="mb-2">
                Conceito &quot;{trends2026.kBeauty.concept}&quot; está em alta
              </Text>
              <div className="flex flex-wrap gap-2">
                {trends2026.kBeauty.trends.map((trend) => (
                  <Badge key={trend} variant="default" className="text-xs">{trend}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Strategic Recommendations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-success/10">
            <Target className="w-6 h-6 text-success" />
          </div>
          <Heading as="h2" size="lg">Recomendações Estratégicas</Heading>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Immediate */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Rocket className="w-4 h-4 text-success" />
                  Imediato
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {strategicRecommendations.immediate.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <Text size="xs">{rec}</Text>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Short Term */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  Curto Prazo (Q1 2026)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {strategicRecommendations.shortTerm.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <Text size="xs">{rec}</Text>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Long Term */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-accent" />
                  Longo Prazo (2026)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {strategicRecommendations.longTerm.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <Text size="xs">{rec}</Text>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Card variant="glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <Star className="w-5 h-5 text-gold" />
              Resumo: Set-Dez 2025
              <Star className="w-5 h-5 text-gold" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <Text size="2xl" weight="bold" className="text-gold">
                  R$ 21.6K
                </Text>
                <Text size="xs" variant="muted">Investido</Text>
              </div>
              <div>
                <Text size="2xl" weight="bold" className="text-success">
                  R$ 2.3M
                </Text>
                <Text size="xs" variant="muted">Faturado</Text>
              </div>
              <div>
                <Text size="2xl" weight="bold" className="text-accent">
                  10.639%
                </Text>
                <Text size="xs" variant="muted">ROI</Text>
              </div>
              <div>
                <Text size="2xl" weight="bold" className="text-info">
                  r = 0.99
                </Text>
                <Text size="xs" variant="muted">Correlação Pago→Orgânico</Text>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <Text size="sm" className="text-success mb-1">
                Marketing amplifica alcance orgânico - não compete com ele.
              </Text>
              <Text size="xs" variant="muted">
                Instituto Luciane Prado - Performance Marketing Report | Período: Set-Dez 2025
              </Text>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
