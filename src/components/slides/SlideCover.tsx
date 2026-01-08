'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, Target } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';
import { Badge } from '../ui/Badge';

export function SlideCover() {
  return (
    <div className="min-h-[calc(100vh-11rem)] flex flex-col justify-center items-center text-center relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl"
      >
        {/* Logo / Brand Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Badge variant="gold" size="lg" className="px-6 py-2">
            Instituto Luciane Prado
          </Badge>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Heading as="h1" size="3xl" className="mb-4">
            Performance Report
          </Heading>
          <Heading as="h2" size="xl" gradient className="mb-8">
            Marketing Digital 2025/2026
          </Heading>
        </motion.div>

        {/* Period */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Calendar className="w-5 h-5 text-accent" />
          <Text size="lg" variant="muted">
            Setembro — Dezembro 2025
          </Text>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
        >
          <HighlightCard
            icon={<Target className="w-6 h-6" />}
            value="R$ 21.6K"
            label="Investido"
            delay={0.9}
          />
          <HighlightCard
            icon={<Users className="w-6 h-6" />}
            value="1.621"
            label="Procedimentos"
            delay={1.0}
          />
          <HighlightCard
            icon={<TrendingUp className="w-6 h-6" />}
            value="R$ 2.3M"
            label="Faturamento"
            delay={1.1}
          />
          <HighlightCard
            icon={<TrendingUp className="w-6 h-6" />}
            value="10.639%"
            label="ROI"
            delay={1.2}
          />
        </motion.div>

      </motion.div>

      {/* Navigation Hint - positioned at bottom of slide area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-12"
      >
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center justify-center gap-2"
        >
          <Text size="sm" variant="muted">
            Use as setas para navegar
          </Text>
          <svg
            className="w-5 h-5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface HighlightCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function HighlightCard({ icon, value, label, delay }: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface/50 border border-white/10 backdrop-blur"
    >
      <div className="text-accent">{icon}</div>
      <Text as="span" size="xl" weight="bold" className="text-foreground">
        {value}
      </Text>
      <Text as="span" size="sm" variant="muted">
        {label}
      </Text>
    </motion.div>
  );
}
