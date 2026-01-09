'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { Heading, Text, Label } from '../ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { formatCurrency, formatNumber } from '@/lib/utils';

import { mensagemSummary, audienciaSummary } from '@/lib/data/campaigns';
import { organicSummary } from '@/lib/data/organic';
import { financialTotals } from '@/lib/data/financial';
import { correlations } from '@/lib/data/research';

export function SlideDataCrossing() {
  const [isPearsonModalOpen, setIsPearsonModalOpen] = useState(false);

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

  const totals = useMemo(() => {
    const totalPaidInvestment =
      mensagemSummary.consolidated.spent + audienciaSummary.consolidated.spent;
    const totalOrganicViews =
      organicSummary.feedReels.totalViews + organicSummary.stories.totalViews;

    return {
      totalPaidInvestment,
      totalOrganicViews,
      totalProcedures: financialTotals.count,
      totalRevenue: financialTotals.revenue,
    };
  }, []);

  const paidAmplifiesOrganic = correlations.investimentoVsViewsOrganicos;
  const organicViewsVsProcedures = correlations.viewsVsProcedimentos;
  const paidResultsVsProcedures = correlations.resultadosVsProcedimentos;

  const combinedProceduresIsSignificant = useMemo(() => {
    return organicViewsVsProcedures.isSignificant || paidResultsVsProcedures.isSignificant;
  }, [organicViewsVsProcedures.isSignificant, paidResultsVsProcedures.isSignificant]);

  return (
    <div className="min-h-full pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Label className="mb-2 block">Slide 6 de 7</Label>
        <Heading as="h1" size="2xl" className="mb-2">
          Análise de Dados e Insights
        </Heading>
        <Text variant="muted" size="lg">
          Correlações Estatísticas (Pearson) e Insights
        </Text>
      </motion.div>

      {/* Marketing vs Results Flow */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <GitBranch className="w-6 h-6 text-accent" />
          </div>
          <Heading as="h2" size="lg">Fluxo: Marketing - Resultados</Heading>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card variant="bordered">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Investimento</Text>
                  <Text size="xl" weight="bold" className="text-foreground tabular-nums">
                    {formatCurrency(totals.totalPaidInvestment)}
                  </Text>
                </div>
                <Zap className="w-6 h-6 text-white/25" />
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Views Orgânicos</Text>
                  <Text size="xl" weight="bold" className="text-foreground tabular-nums">
                    {formatNumber(totals.totalOrganicViews)}
                  </Text>
                </div>
                <Zap className="w-6 h-6 text-white/25" />
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Procedimentos</Text>
                  <Text size="xl" weight="bold" className="text-foreground tabular-nums">
                    {formatNumber(totals.totalProcedures)}
                  </Text>
                </div>
                <Zap className="w-6 h-6 text-white/25" />
                <div className="text-center px-4 py-2 flex-1 min-w-[120px]">
                  <Text size="sm" variant="muted" className="mb-1">Faturamento</Text>
                  <Text size="xl" weight="bold" className="text-gold tabular-nums">
                    {formatCurrency(totals.totalRevenue)}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* Statistical Correlations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10">
            <Activity className="w-6 h-6 text-info" />
          </div>
          <Heading as="h2" size="lg">Correlações Estatísticas (Pearson)</Heading>
          <Badge variant="info">Explicado para leigos</Badge>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <motion.div variants={itemVariants}>
            <Card className={`h-full border-l-2 ${paidAmplifiesOrganic.isSignificant ? 'border-l-success/40' : 'border-l-white/10'}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Zap className="w-4 h-4 text-success" />
                    </div>
                    <Text weight="semibold" size="sm">{paidAmplifiesOrganic.name}</Text>
                  </div>
                  {paidAmplifiesOrganic.isSignificant ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Significativo
                    </Badge>
                  ) : (
                    <Badge variant="default" className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Não significativo
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <Text size="xs" variant="muted">Coef. Pearson (r)</Text>
                    <Text size="lg" weight="bold" className="text-foreground tabular-nums">
                      {paidAmplifiesOrganic.r.toFixed(2)}
                    </Text>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <Text size="xs" variant="muted">p-value</Text>
                    <Text size="lg" weight="bold" className={paidAmplifiesOrganic.pValue < 0.05 ? 'text-success tabular-nums' : 'text-foreground tabular-nums'}>
                      {paidAmplifiesOrganic.pValue.toFixed(2)}
                    </Text>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3">
                  <div>
                    <Text size="xs" weight="semibold" variant="muted" className="mb-0.5">O que significa:</Text>
                    <Text size="xs" variant="muted">{paidAmplifiesOrganic.whatItMeans}</Text>
                  </div>
                  <div>
                    <Text size="xs" weight="semibold" variant="muted" className="mb-0.5">Por que importa:</Text>
                    <Text size="xs" variant="muted">{paidAmplifiesOrganic.whyItMatters}</Text>
                  </div>
                  <div className="p-2 rounded bg-white/5 border-l-2 border-success/40">
                    <Text size="xs" className="text-foreground">
                      {paidAmplifiesOrganic.conclusion}
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants}>
            <Card className={`h-full border-l-2 ${combinedProceduresIsSignificant ? 'border-l-success/40' : 'border-l-white/10'}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/5">
                      <Activity className="w-4 h-4 text-muted" />
                    </div>
                    <Text weight="semibold" size="sm">Views Orgânicos/Pagos → Procedimentos</Text>
                  </div>
                  {combinedProceduresIsSignificant ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Significativo
                    </Badge>
                  ) : (
                    <Badge variant="default" className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Não significativo
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <Text size="xs" variant="muted">Views orgânicos (r / p)</Text>
                    <Text size="lg" weight="bold" className="text-foreground tabular-nums">
                      {organicViewsVsProcedures.r.toFixed(2)} / {organicViewsVsProcedures.pValue.toFixed(2)}
                    </Text>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <Text size="xs" variant="muted">Resultados pagos (r / p)</Text>
                    <Text size="lg" weight="bold" className="text-foreground tabular-nums">
                      {paidResultsVsProcedures.r.toFixed(2)} / {paidResultsVsProcedures.pValue.toFixed(2)}
                    </Text>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3">
                  <div>
                    <Text size="xs" weight="semibold" variant="muted" className="mb-0.5">O que significa:</Text>
                    <Text size="xs" variant="muted">
                      Mais views orgânicos e mais investimento em tráfego pago podem (ou não) se traduzir em mais procedimentos — mas há dois pontos-chave:
                    </Text>
                    <ul className="mt-2 space-y-1 text-xs text-muted list-disc pl-4">
                      <li>Sem dados de conversão por canal, não dá para afirmar causalidade (apenas relação estatística).</li>
                      <li>A conversão depende de fatores operacionais: atendimento, agenda, preços e reputação.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-4">
          <Button
            type="button"
            variant="secondary"
            className="w-full md:w-auto"
            onClick={() => setIsPearsonModalOpen(true)}
          >
            <Info className="w-4 h-4" />
            Como funciona a correlação de Pearson?
          </Button>
        </motion.div>

        <Modal
          open={isPearsonModalOpen}
          onOpenChange={setIsPearsonModalOpen}
          title="Pearson (r) em linguagem simples"
          description="Como interpretar r e p-value e por que isso ajuda na tomada de decisão."
          variant="dialog"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <Text weight="semibold">O que é “r”?</Text>
              <Text size="sm" variant="muted" className="mt-1">
                O coeficiente de Pearson (r) mede a força e direção de uma relação linear entre duas variáveis.
                Vai de <strong>-1</strong> (inverso) a <strong>+1</strong> (direto). Perto de <strong>0</strong> sugere relação fraca.
              </Text>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <Text weight="semibold">O que é p-value?</Text>
              <Text size="sm" variant="muted" className="mt-1">
                O p-value indica quão provável é observar um r como esse “por acaso”.
                Em geral, <strong>p &lt; 0,05</strong> sugere significância estatística (não garante causalidade).
              </Text>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <Text weight="semibold">Por que usar?</Text>
              <Text size="sm" variant="muted" className="mt-1">
                Ajuda a priorizar hipóteses e decisões: onde faz sentido investir mais teste/medição.
                O ideal é combinar com dados de conversão (CRM) para fechar o loop.
              </Text>
            </div>
          </div>
        </Modal>
      </motion.section>

      {/* Actionable Insights */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gold/10">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <Heading as="h2" size="lg">Insights acionáveis</Heading>
          <Badge variant="gold">O que fazer a partir do mix</Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <Card className="border-l-2 border-l-success/40">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-success" />
                    Tráfego Pago Potencializa Alcance Orgânico
                  </span>
                  <Badge variant="success">r {paidAmplifiesOrganic.r.toFixed(2)} • p {paidAmplifiesOrganic.pValue.toFixed(2)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Text size="sm" variant="muted">
                  Direção prática: usar paid como “amplificador” (não como concorrente do orgânico).
                  Estruture campanhas que impulsionem conteúdos que já performam bem e fechem o loop com remarketing.
                </Text>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text size="xs" variant="muted">Ação</Text>
                    <Text size="sm" weight="semibold" className="mt-1">
                      Impulsionar vencedores (Reels) + sequências
                    </Text>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/4 p-3">
                    <Text size="xs" variant="muted">Resultado esperado</Text>
                    <Text size="sm" weight="semibold" className="mt-1">
                      Mais alcance orgânico + demanda aquecida
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Insight A — Novembro é o seu “pico premium”: replique o motor do ticket alto</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <Text size="xs" variant="muted" className="uppercase tracking-widest">Diagnóstico</Text>
                  <Text size="sm" variant="muted" className="mt-1">
                    Novembro concentrou o mix mais premium (Botox/Tentherma/Preenchimento), elevando receita e ticket.
                  </Text>
                </div>
                <div>
                  <Text size="xs" variant="muted" className="uppercase tracking-widest">Ação</Text>
                  <ul className="mt-2 space-y-1 text-sm text-muted list-disc pl-4">
                    <li>Calendário 2026 orientado a ticket: preparação → conversão premium → manutenção.</li>
                    <li>Campanha “conversão premium”: protocolos completos, agenda limitada e prova social.</li>
                    <li>Campanha “manutenção”: Botox, retornos e skincare médico para reduzir queda.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Insight B — Injetáveis são recorrência; tecnologia é aumento de ticket</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <Text size="xs" variant="muted" className="uppercase tracking-widest">Ação (produto e oferta)</Text>
                  <ul className="mt-2 space-y-1 text-sm text-muted list-disc pl-4">
                    <li><strong>Programa Botox 365</strong>: recall automático, janela ideal e prioridade de agenda.</li>
                    <li><strong>Protocolos combinados</strong>: tecnologia + bioestimulador / tecnologia + skincare médico.</li>
                    <li>Vender “plano” (2–3 etapas) com tempo estimado e expectativa realista.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Insight C — Hair (MMP/meso/PRP/transplante) merece funil próprio</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <div>
                  <Text size="xs" variant="muted" className="uppercase tracking-widest">Diagnóstico</Text>
                  <Text size="sm" variant="muted" className="mt-1">
                    Existe demanda e receita relevante, e tratamentos capilares têm alta intenção de busca.
                  </Text>
                </div>
                <div>
                  <Text size="xs" variant="muted" className="uppercase tracking-widest">Ação</Text>
                  <ul className="mt-2 space-y-1 text-sm text-muted list-disc pl-4">
                    <li>Landing page + Google Ads para termos de alta intenção (queda de cabelo, alopecia, transplante).</li>
                    <li>Conteúdo serializado (Reels): mito vs verdade, diagnóstico e continuidade (conforme CFM).</li>
                    <li>Remarketing para consulta/triagem e sequência de educação até decisão.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

