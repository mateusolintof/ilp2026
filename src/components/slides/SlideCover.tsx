'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
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
