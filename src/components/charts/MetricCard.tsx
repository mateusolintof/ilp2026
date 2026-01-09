'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '../ui/Card';
import { Text, Label } from '../ui/Typography';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function MetricCard({ className, title, value, subtitle, change, changeLabel, icon, variant = 'default', size = 'md' }: MetricCardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus className="w-4 h-4" />;
    return change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return 'text-muted';
    return change > 0 ? 'text-success' : 'text-error';
  };

  const variants = {
    default: {
      card: 'border-white/10 border-l-white/10',
      icon: 'bg-white/5 text-muted',
    },
    accent: {
      card: 'border-white/10 border-l-accent/40',
      icon: 'bg-accent/10 text-accent',
    },
    success: {
      card: 'border-white/10 border-l-success/40',
      icon: 'bg-success/10 text-success',
    },
    warning: {
      card: 'border-white/10 border-l-warning/40',
      icon: 'bg-warning/10 text-warning',
    },
    gold: {
      card: 'border-white/10 border-l-gold/40',
      icon: 'bg-gold/10 text-gold',
    },
  };

  const sizes = {
    sm: { padding: 'p-4', value: 'text-xl', icon: 'w-9 h-9', gap: 'gap-3' },
    md: { padding: 'p-5', value: 'text-2xl md:text-3xl', icon: 'w-10 h-10', gap: 'gap-4' },
    lg: { padding: 'p-6', value: 'text-3xl md:text-4xl', icon: 'w-11 h-11', gap: 'gap-4' },
  };

  const sizeConfig = sizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={cn(
          sizeConfig.padding,
          'border border-l-2',
          variants[variant].card,
          'hover:border-white/20 transition-colors',
          className
        )}
      >
        <div className={cn('flex items-start justify-between', sizeConfig.gap)}>
          <div className="flex-1 min-w-0">
            <Label className="mb-2 block">{title}</Label>
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.08, type: 'spring', stiffness: 180 }}
            >
              <Text as="span" className={cn(sizeConfig.value, 'font-bold text-foreground block tracking-tight leading-none tabular-nums')}>
                {value}
              </Text>
            </motion.div>
            {subtitle && (
              <Text size="sm" variant="muted" className="mt-1">
                {subtitle}
              </Text>
            )}
            {change !== undefined && (
              <div className={cn('flex items-center gap-1 mt-2', getTrendColor())}>
                {getTrendIcon()}
                <Text size="sm" as="span" className="font-medium">
                  {change > 0 ? '+' : ''}
                  {change.toFixed(1)}%
                </Text>
                {changeLabel && (
                  <Text size="xs" variant="muted" as="span" className="ml-1">
                    {changeLabel}
                  </Text>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                sizeConfig.icon,
                'flex items-center justify-center rounded-xl flex-shrink-0',
                variants[variant].icon
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export { MetricCard };
