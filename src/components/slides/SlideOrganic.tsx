'use client';

import { motion } from 'framer-motion';
import { Play, LayoutGrid, Image as ImageIcon, TrendingUp, Eye, Heart, Share2, MessageCircle, Bookmark, Users, CheckCircle, Target, Zap } from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MetricCard } from '../charts/MetricCard';
import { BarChart } from '../charts/BarChart';
import { formatNumber, formatPercent } from '@/lib/utils';

// Import data
import {
  organicSummary,
  topFeedReelsPosts,
} from '@/lib/data/organic';

import { competitors, correlations } from '@/lib/data/research';

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

  // Top 5 feed/reels posts for chart
  const topPostsChartData = topFeedReelsPosts.slice(0, 5).map((post, index) => ({
    name: `Post ${index + 1}`,
    value: post.metrics.views,
  }));

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 5 de 8</Label>
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

        {/* Content Type Distribution */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-accent/10">
                  <Play className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <Text size="xl" weight="bold">{organicSummary.byType.reels}</Text>
                  <Text size="sm" variant="muted">Reels</Text>
                </div>
                <div className="p-4 rounded-lg bg-gold/10">
                  <LayoutGrid className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <Text size="xl" weight="bold">{organicSummary.byType.carousel}</Text>
                  <Text size="sm" variant="muted">Carrosséis</Text>
                </div>
                <div className="p-4 rounded-lg bg-info/10">
                  <ImageIcon className="w-6 h-6 mx-auto mb-2 text-info" />
                  <Text size="xl" weight="bold">{organicSummary.byType.image}</Text>
                  <Text size="sm" variant="muted">Imagens</Text>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Posts - Views</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={topPostsChartData}
                height={180}
                layout="vertical"
                colors={['var(--color-accent)']}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Feed/Reels Posts */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Top 5 Posts Feed/Reels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topFeedReelsPosts.slice(0, 5).map((post, index) => (
                  <div key={post.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {post.type === 'REEL' ? (
                          <Play className="w-4 h-4 text-accent" />
                        ) : post.type === 'CAROUSEL_ALBUM' ? (
                          <LayoutGrid className="w-4 h-4 text-gold" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-info" />
                        )}
                        <Text weight="semibold" className="truncate">
                          {post.description?.substring(0, 50) || 'Post sem descrição'}...
                        </Text>
                      </div>
                      <Text size="sm" variant="muted">{post.publishedAt}</Text>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-accent" />
                        <Text weight="semibold">{formatNumber(post.metrics.views)}</Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <Text>{formatNumber(post.metrics.likes)}</Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-4 h-4 text-blue-400" />
                        <Text>{formatNumber(post.metrics.shares)}</Text>
                      </div>
                    </div>
                  </div>
                ))}
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

      {/* Competitive Analysis */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10">
            <Users className="w-6 h-6 text-info" />
          </div>
          <Heading as="h2" size="lg">Análise Competitiva</Heading>
          <Badge variant="info">Benchmark Instagram</Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* ILP Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-accent/30 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Text weight="bold" className="text-accent">ILP</Text>
                  </div>
                  <div>
                    <Text weight="bold">@{competitors.ilp.username}</Text>
                    <Text size="xs" variant="muted">{competitors.ilp.position}</Text>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded bg-accent/10">
                    <Text size="xl" weight="bold" className="text-accent">{formatNumber(competitors.ilp.followers)}</Text>
                    <Text size="xs" variant="muted">Seguidores</Text>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <Text size="xl" weight="bold">{formatNumber(competitors.ilp.posts)}</Text>
                    <Text size="xs" variant="muted">Posts</Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benchmark Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-gold/30 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    {competitors.benchmark.isVerified && <CheckCircle className="w-4 h-4 text-gold" />}
                  </div>
                  <div>
                    <Text weight="bold">{competitors.benchmark.fullName}</Text>
                    <Text size="xs" variant="muted">Referência Nacional</Text>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded bg-gold/10">
                    <Text size="xl" weight="bold" className="text-gold">{formatNumber(competitors.benchmark.followers)}</Text>
                    <Text size="xs" variant="muted">Seguidores</Text>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <Text size="xl" weight="bold">{formatNumber(competitors.benchmark.posts)}</Text>
                    <Text size="xs" variant="muted">Posts</Text>
                  </div>
                </div>
                <div className="mt-2 p-2 rounded bg-gold/5 text-center">
                  <Text size="xs" variant="muted">{competitors.benchmark.differentiator}</Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Growth Potential Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-success/30 h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <Text weight="bold">Potencial de Crescimento</Text>
                    <Text size="xs" variant="muted">Gap vs Benchmark</Text>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Text size="sm">Seguidores</Text>
                    <Badge variant="success">+{formatNumber(competitors.benchmark.followers - competitors.ilp.followers)}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text size="sm">Posts</Text>
                    <Badge variant="gold">+{formatNumber(competitors.benchmark.posts - competitors.ilp.posts)}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text size="sm">Verificação</Text>
                    <Badge variant="info">Oportunidade</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key Insight - Paid amplifies Organic */}
        <motion.div variants={itemVariants}>
          <Card className="border-success/50 bg-success/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-success/20">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <div>
                  <Text weight="bold" className="text-success mb-1">
                    Correlação Descoberta: Pago Amplifica Orgânico (r = {correlations.investimentoVsViewsOrganicos.r.toFixed(2)})
                  </Text>
                  <Text size="sm" variant="muted">
                    {correlations.investimentoVsViewsOrganicos.conclusion}.
                    Investir em campanhas pagas NÃO compete com orgânico - os dois crescem juntos.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Insights Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card variant="glow">
          <CardContent className="p-6">
            <Heading as="h3" size="sm" className="mb-4">Insights do Tráfego Orgânico</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Text size="sm" variant="muted">Formato dominante</Text>
                <Text weight="semibold" className="text-accent">
                  Reels ({formatPercent((organicSummary.byType.reels / organicSummary.feedReels.totalPosts) * 100)} dos posts)
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Gap vs Benchmark</Text>
                <Text weight="semibold" className="text-gold">
                  {formatNumber(competitors.benchmark.followers - competitors.ilp.followers)} seguidores
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Recomendações</Text>
                <Text weight="semibold" className="text-accent">
                  Aumentar frequência de posts (+{formatPercent(((competitors.benchmark.posts - competitors.ilp.posts) / competitors.ilp.posts) * 100)})
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
