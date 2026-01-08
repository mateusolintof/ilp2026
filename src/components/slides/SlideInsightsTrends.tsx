'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, TrendingUp, Sparkles, ArrowRight, CheckCircle, Star, Rocket } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

// Import data
import { insights } from '@/lib/data/analysis';

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

  // 2026 Trends based on research
  const trends2026 = [
    {
      name: 'Quiet Beauty',
      description: 'Procedimentos naturais e sutis em alta',
      icon: Sparkles,
      color: 'accent',
    },
    {
      name: 'Bioestimuladores',
      description: 'Crescimento de 25% projetado para 2026',
      icon: TrendingUp,
      color: 'success',
    },
    {
      name: 'UGC Content',
      description: 'Vídeos autênticos com 36.8% mais engajamento',
      icon: Star,
      color: 'gold',
    },
    {
      name: 'Reels Dominam',
      description: '40% dos top performers são Reels',
      icon: Rocket,
      color: 'info',
    },
  ];

  // Recommendations for 2026
  const recommendations = [
    {
      title: 'Aumentar Budget em 30%',
      description: 'ROI de 10.639% justifica expansão do investimento em Q1 2026',
      priority: 'Alta',
    },
    {
      title: 'Foco em Bioestimuladores',
      description: 'Criar campanhas específicas aproveitando a tendência de mercado',
      priority: 'Alta',
    },
    {
      title: 'Manter Proporção 60/40',
      description: '60% AUDIÊNCIA (awareness) + 40% MENSAGEM (conversão)',
      priority: 'Média',
    },
    {
      title: 'Vídeos com Médicos',
      description: 'Priorizar conteúdo com Dr. Osterno e Dra. Yasmin',
      priority: 'Alta',
    },
    {
      title: 'Impulsionar Orgânico',
      description: 'Posts com +10k views devem ser impulsionados como AUD',
      priority: 'Média',
    },
  ];

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
          Conclusões e recomendações estratégicas
        </Text>
      </motion.div>

      {/* Key Insights */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Lightbulb className="w-6 h-6 text-accent" />
          </div>
          <Heading as="h2" size="lg">Principais Insights</Heading>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div key={insight.pattern} variants={itemVariants}>
              <Card className="h-full hover:border-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1">
                        {insight.description}
                      </Text>
                      <div className="flex items-center gap-2 text-accent">
                        <ArrowRight className="w-4 h-4" />
                        <Text size="sm">{insight.recommendation}</Text>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 2026 Trends */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <Heading as="h2" size="lg">Tendências para 2026</Heading>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trends2026.map((trend) => (
            <motion.div key={trend.name} variants={itemVariants}>
              <Card className="h-full text-center p-4 hover:border-gold/50 transition-colors">
                <trend.icon className={`w-8 h-8 mx-auto mb-3 text-${trend.color}`} />
                <Text weight="bold" className="mb-1">{trend.name}</Text>
                <Text size="sm" variant="muted">{trend.description}</Text>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recommendations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-success/10">
            <Target className="w-6 h-6 text-success" />
          </div>
          <Heading as="h2" size="lg">Recomendações Estratégicas</Heading>
        </motion.div>

        <Card>
          <CardContent className="p-0">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.title}
                variants={itemVariants}
                className={`flex items-center gap-4 p-4 ${
                  index !== recommendations.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <CheckCircle className={`w-5 h-5 shrink-0 ${
                  rec.priority === 'Alta' ? 'text-success' : 'text-gold'
                }`} />
                <div className="flex-1">
                  <Text weight="semibold">{rec.title}</Text>
                  <Text size="sm" variant="muted">{rec.description}</Text>
                </div>
                <Badge variant={rec.priority === 'Alta' ? 'success' : 'gold'}>
                  {rec.priority}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <Text size="3xl" weight="bold" className="text-gold">
                  R$ 21.6K
                </Text>
                <Text size="sm" variant="muted">Investido</Text>
              </div>
              <div>
                <Text size="3xl" weight="bold" className="text-success">
                  R$ 2.3M
                </Text>
                <Text size="sm" variant="muted">Faturado</Text>
              </div>
              <div>
                <Text size="3xl" weight="bold" className="text-accent">
                  10.639%
                </Text>
                <Text size="sm" variant="muted">ROI</Text>
              </div>
              <div>
                <Text size="3xl" weight="bold" className="text-info">
                  1.621
                </Text>
                <Text size="sm" variant="muted">Procedimentos</Text>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <Text variant="muted" className="mb-2">
                Instituto Luciane Prado - Performance Marketing Report
              </Text>
              <Text size="sm" variant="muted">
                Período: Setembro - Dezembro 2025 | Gerado em Janeiro 2026
              </Text>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
