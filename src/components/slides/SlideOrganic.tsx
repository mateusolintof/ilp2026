'use client';

import { motion } from 'framer-motion';
import { Play, LayoutGrid, Image as ImageIcon, TrendingUp, Eye, Heart, Share2, MessageCircle, Bookmark } from 'lucide-react';
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

      {/* Insights Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
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
                <Text size="sm" variant="muted">Views médios/post</Text>
                <Text weight="semibold">
                  {formatNumber(Math.round(organicSummary.feedReels.totalViews / organicSummary.feedReels.totalPosts))}
                </Text>
              </div>
              <div className="space-y-1">
                <Text size="sm" variant="muted">Recomendação</Text>
                <Text weight="semibold" className="text-accent">
                  Impulsionar posts com +10k views
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
