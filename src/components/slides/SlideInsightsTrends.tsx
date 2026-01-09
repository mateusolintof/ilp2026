'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShoppingCart,
  Search,
  Megaphone,
  Video,
  Layers,
  Target,
  ExternalLink,
  Star,
  Gem,
  Droplets,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

// Import data (keep the screenshot section intact)
import { trends2026 } from '@/lib/data/research';

export function SlideInsightsTrends() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Icon mapping for the “print” section
  const trendIcons: Record<string, ReactNode> = {
    gem: <Gem className="w-6 h-6 text-gold" />,
    droplets: <Droplets className="w-6 h-6 text-gold" />,
    refresh: <RefreshCw className="w-6 h-6 text-gold" />,
    sparkles: <Sparkles className="w-6 h-6 text-gold" />,
  };

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 7 de 7</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Estratégias & Tendências 2026
        </Heading>
        <Text variant="muted" size="lg">
          Tendências do mercado + plano estratégico de aquisição e conteúdo
        </Text>
      </motion.div>

      {/* Section 1 — Trends */}
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
          <Heading as="h2" size="lg">Tendências 2026</Heading>
          <Badge variant="gold">Visão de mercado</Badge>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <Card className="border-l-2 border-l-gold/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-gold" />
                <Text weight="bold" className="text-gold">
                  Ponto central para 2026
                </Text>
              </div>
              <Text size="sm" variant="muted">
                Cresceu a demanda por <strong>resultados naturais</strong> + <strong>alta tecnologia</strong> +{' '}
                <strong>rotinas mais simples</strong>, e o digital ganhou peso real na descoberta, decisão e compra.
              </Text>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-info" />
                  <Text weight="bold">Macro mercado e canais</Text>
                </div>
                <ul className="space-y-2 text-sm text-muted list-disc pl-4">
                  <li>Descoberta por conteúdo, decisão por prova social e conversão por conveniência.</li>
                  <li>E-commerce e comportamento “digital-first” aceleram (pesquisa → clique → agenda).</li>
                  <li>Panoramas setoriais (ex.: ABIHPEC) reforçam amadurecimento e continuidade do crescimento.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingCart className="w-5 h-5 text-info" />
                  <Text weight="bold">O que o consumidor busca (25–26)</Text>
                </div>
                <ul className="space-y-2 text-sm text-muted list-disc pl-4">
                  <li><strong>Skinimalism</strong>: menos passos, mais eficácia (praticidade + ciência).</li>
                  <li><strong>Quiet beauty</strong>: resultado natural e credível (anti-promessa).</li>
                  <li>Mais interesse por procedimentos tecnológicos e narrativa de segurança.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-5 h-5 text-info" />
                  <Text weight="bold">O que muda no conteúdo</Text>
                </div>
                <ul className="space-y-2 text-sm text-muted list-disc pl-4">
                  <li>Educação curta (“1 problema → 1 explicação → 1 opção”) tende a performar melhor.</li>
                  <li>Prova de credibilidade via processo (bastidores, planejamento, expectativas realistas).</li>
                  <li>Ciência e rotina: microbioma, filtros solares, ativos — linguagem “médica” porém simples.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Keep (PRINT) — Procedures in High Demand + K-Beauty */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {trends2026.procedures.map((proc) => (
              <Card key={proc.name} className="h-full text-center p-3 border-l-2 border-l-gold/30">
                {trendIcons[proc.icon] || <Star className="w-6 h-6 mx-auto mb-2 text-gold" />}
                <Text weight="bold" size="sm" className="mb-1">{proc.name}</Text>
                <Text size="xs" variant="muted" className="mb-2">{proc.description}</Text>
                <Badge variant={proc.potential === 'ALTO' ? 'success' : 'gold'} className="text-xs">
                  Potencial {proc.potential}
                </Badge>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-2 border-l-accent/40">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-accent" />
                <Text weight="bold">Influência K-Beauty no Brasil</Text>
                <Badge variant="default">{trends2026.kBeauty.growth} busca por &quot;{trends2026.kBeauty.term}&quot;</Badge>
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

      {/* Section 2 — Strategic Plan */}
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
          <Heading as="h2" size="lg">Plano Estratégico</Heading>
          <Badge variant="success">Campanhas + Criativo</Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="h-full border-l-2 border-l-info/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Search className="w-5 h-5 text-info" />
                  <Text weight="bold">Google (alta intenção)</Text>
                </div>
                <Text size="sm" variant="muted" className="mb-2">
                  Campanhas por clusters (intenção alta → agendamento):
                </Text>
                <ul className="space-y-1.5 text-sm text-muted list-disc pl-4">
                  <li><strong>Estética recorrente:</strong> botox, preenchimento, bioestimulador.</li>
                  <li><strong>Tecnologia:</strong> skin tightening, CO2, lasers (manchas/textura).</li>
                  <li><strong>Dermato clínica/cirúrgica:</strong> câncer de pele, nevo, cisto, verruga.</li>
                  <li><strong>Capilar:</strong> queda de cabelo, alopecia, transplante.</li>
                </ul>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/4 p-3">
                  <Text size="xs" variant="muted">Métrica de ouro</Text>
                  <Text size="sm" weight="semibold" className="mt-1">
                    Custo por consulta comparecida + % que vira procedimento em 30 dias
                  </Text>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full border-l-2 border-l-accent/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Megaphone className="w-5 h-5 text-accent" />
                  <Text weight="bold">Meta (demanda latente + prova social)</Text>
                </div>
                <Text size="sm" variant="muted" className="mb-2">
                  Criativos vencedores tendem a ser:
                </Text>
                <ul className="space-y-1.5 text-sm text-muted list-disc pl-4">
                  <li>Educação curta: “1 problema → 1 explicação → 1 opção de tratamento”.</li>
                  <li>Bastidores de tecnologia (equipamento + por que funciona), com cautela e sem sensacionalismo.</li>
                  <li>Sequências: topo (descoberta) → meio (prova) → fundo (agenda limitada/triagem).</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full border-l-2 border-l-gold/40">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="w-5 h-5 text-gold" />
                  <Text weight="bold">Criativo & Comunicação</Text>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text weight="semibold">Prova visual “de processo”</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      Mostrar bastidor, marcação/planejamento, pós-imediato realista e orientações (menos “resultado” e mais credibilidade).
                    </Text>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text weight="semibold">Multi-formato (curto + longo)</Text>
                    <Text size="sm" variant="muted" className="mt-1">
                      10s/30s para captura (Reels/Shorts) + 3–8min para conversão (YouTube) em temas complexos (melasma, acne, rosácea, capilar).
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-4">
          <Card className="border-l-2 border-l-white/10">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-muted" />
                  <div>
                    <Text weight="semibold">Próximo passo recomendado</Text>
                    <Text size="sm" variant="muted">
                      Conectar campanha → atendimento → CRM para medir conversão real por canal.
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <ExternalLink className="w-4 h-4" />
                  Referências e detalhes técnicos em `TECHNICAL.md`
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>
    </div>
  );
}
