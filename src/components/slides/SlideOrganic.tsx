'use client';

import { motion } from 'framer-motion';
import { Play, LayoutGrid, Image as ImageIcon, TrendingUp, Eye, Heart, MessageCircle, Bookmark, Target, Zap, ExternalLink } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { formatNumber, formatPercent } from '@/lib/utils';

// Import data
import {
  organicSummary,
  topFeedReelsPosts,
} from '@/lib/data/organic';

import { correlations } from '@/lib/data/research';

export function SlideOrganic() {
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
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 4 de 7</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Tráfego Orgânico
        </Heading>
        <Text variant="muted" size="lg">
          Performance do conteúdo orgânico no Instagram
        </Text>
      </motion.div>

      {/* Feed/Reels Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Play className="w-6 h-6 text-accent" />
          </div>
          <div>
            <Heading as="h2" size="lg">Feed & Reels</Heading>
            <Text size="sm" variant="muted">Conteúdo permanente do perfil</Text>
          </div>
          <Badge variant="default" className="ml-auto">{organicSummary.feedReels.totalPosts} posts</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Total Views"
              value={formatNumber(organicSummary.feedReels.totalViews)}
              icon={<Eye className="w-5 h-5" />}
              size="sm"
              variant="accent"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Alcance"
              value={formatNumber(organicSummary.feedReels.totalReach)}
              icon={<TrendingUp className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Likes"
              value={formatNumber(organicSummary.feedReels.totalLikes)}
              icon={<Heart className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Engagement"
              value={formatPercent(organicSummary.feedReels.avgEngagement)}
              subtitle="Benchmark: 1-3%"
              icon={<MessageCircle className="w-5 h-5" />}
              size="sm"
              variant="success"
            />
          </motion.div>
        </div>

        {/* Content Type Summary (inline) */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card variant="bordered" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <Play className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <Text size="sm" variant="muted">Reels</Text>
                <Text weight="bold" className="tabular-nums">{formatNumber(organicSummary.byType.reels)}</Text>
              </div>
            </div>
          </Card>
          <Card variant="bordered" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <LayoutGrid className="w-5 h-5 text-gold" />
              </div>
              <div className="min-w-0">
                <Text size="sm" variant="muted">Carrosséis</Text>
                <Text weight="bold" className="tabular-nums">{formatNumber(organicSummary.byType.carousel)}</Text>
              </div>
            </div>
          </Card>
          <Card variant="bordered" className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                <ImageIcon className="w-5 h-5 text-info" />
              </div>
              <div className="min-w-0">
                <Text size="sm" variant="muted">Imagens</Text>
                <Text weight="bold" className="tabular-nums">{formatNumber(organicSummary.byType.image)}</Text>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Best Feed/Reels Posts (table) */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Melhores Posts Orgânicos (Feed/Reels)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-[820px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest">#</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest">Tipo</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest">Post</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest text-right">Views</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest text-right">Reach</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest text-right">Likes</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest text-right">Comentários</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest text-right">Saves</th>
                      <th className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-widest text-right">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topFeedReelsPosts.slice(0, 10).map((post, index) => {
                      const typeIcon =
                        post.type === 'REEL'
                          ? <Play className="w-4 h-4 text-accent" />
                          : post.type === 'CAROUSEL_ALBUM'
                            ? <LayoutGrid className="w-4 h-4 text-gold" />
                            : <ImageIcon className="w-4 h-4 text-info" />;

                      const title = (post.description || 'Post sem descrição')
                        .replace(/\n+/g, ' ')
                        .trim()
                        .slice(0, 96);

                      return (
                        <tr key={post.id} className="bg-white/3 border-b border-white/8">
                          <td className="px-3 py-3 text-sm text-muted tabular-nums">{index + 1}</td>
                          <td className="px-3 py-3">{typeIcon}</td>
                          <td className="px-3 py-3 min-w-0">
                            <Text as="div" weight="semibold" className="truncate max-w-[420px]">{title}{title.length >= 96 ? '…' : ''}</Text>
                            <Text size="xs" variant="muted">{post.publishedAt}</Text>
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            <Text as="span" weight="semibold">{formatNumber(post.metrics.views)}</Text>
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            <Text as="span">{formatNumber(post.metrics.reach)}</Text>
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            <Text as="span">{formatNumber(post.metrics.likes)}</Text>
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            <Text as="span">{formatNumber(post.metrics.comments)}</Text>
                          </td>
                          <td className="px-3 py-3 text-right tabular-nums">
                            <Text as="span">{formatNumber(post.metrics.saves)}</Text>
                          </td>
                          <td className="px-3 py-3 text-right">
                            <a
                              href={post.permanentLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                              aria-label="Abrir post"
                            >
                              <ExternalLink className="w-4 h-4 text-foreground" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Stories Section */}
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
            <Heading as="h2" size="lg">Stories</Heading>
            <Text size="sm" variant="muted">Conteúdo temporário (24h)</Text>
          </div>
          <Badge variant="gold" className="ml-auto">{organicSummary.stories.totalStories} stories</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Total Views"
              value={formatNumber(organicSummary.stories.totalViews)}
              icon={<Eye className="w-5 h-5" />}
              size="sm"
              variant="gold"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Alcance"
              value={formatNumber(organicSummary.stories.totalReach)}
              icon={<TrendingUp className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Respostas"
              value={formatNumber(organicSummary.stories.totalReplies)}
              icon={<MessageCircle className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <MetricCard
              title="Interações Sticker"
              value={formatNumber(organicSummary.stories.totalStickerTaps)}
              icon={<Bookmark className="w-5 h-5" />}
              size="sm"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Key Insight - Paid amplifies Organic */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-success/10">
            <Zap className="w-6 h-6 text-success" />
          </div>
          <Heading as="h2" size="lg">Descoberta Estatística</Heading>
          <Badge variant="success">Correlação Pearson</Badge>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-success/50 bg-success/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-full bg-success/20">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <Text weight="bold" size="lg" className="text-success mb-2">
                    Tráfego Pago Potencializa Alcance Orgânico
                  </Text>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 rounded bg-success/10 text-center">
                      <Text size="xs" variant="muted">Coef. Pearson (r)</Text>
                      <Text size="xl" weight="bold" className="text-success">{correlations.investimentoVsViewsOrganicos.r.toFixed(2)}</Text>
                    </div>
                    <div className="p-2 rounded bg-white/5 text-center">
                      <Text size="xs" variant="muted">p-value</Text>
                      <Text size="xl" weight="bold">{correlations.investimentoVsViewsOrganicos.pValue.toFixed(2)}</Text>
                    </div>
                  </div>
                </div>
              </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                <div>
                  <Text size="sm" weight="semibold" className="text-foreground mb-1">O que isso significa:</Text>
                  <Text size="sm" variant="muted">
                    {correlations.investimentoVsViewsOrganicos.whatItMeans}
                  </Text>
                </div>
                <div>
                  <Text size="sm" weight="semibold" className="text-foreground mb-1">Por que importa:</Text>
                  <Text size="sm" variant="muted">
                    {correlations.investimentoVsViewsOrganicos.whyItMatters}
                  </Text>
                </div>
                <div className="p-3 rounded bg-success/10 border-l-2 border-success">
                  <Text size="sm" weight="semibold" className="text-success mb-1">Conclusão:</Text>
                  <Text size="sm" className="text-foreground">
                    {correlations.investimentoVsViewsOrganicos.conclusion}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <Heading as="h3" size="sm" className="mb-4">Análise de Performance Orgânica</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-accent" />
                  <Text weight="semibold">Formato com Melhor Performance</Text>
                </div>
                <Text size="sm" variant="muted">
                  Reels representam {formatPercent((organicSummary.byType.reels / organicSummary.feedReels.totalPosts) * 100)} dos posts
                  e geram o maior alcance orgânico. O algoritmo do Instagram prioriza vídeos curtos em 2025,
                  especialmente conteúdo educativo e demonstrações de procedimentos.
                </Text>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gold" />
                  <Text weight="semibold">Oportunidade de Crescimento</Text>
                </div>
                <Text size="sm" variant="muted">
                  A taxa de engajamento de {formatPercent(organicSummary.feedReels.avgEngagement)} está dentro do benchmark
                  do setor (1-3%). Para aumentar, focar em conteúdo que gere comentários: perguntas, enquetes em Stories,
                  e CTAs que incentivem interação direta.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
