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
      default: 'border-white/10',
      accent: 'border-accent/30 shadow-[0_0_15px_rgba(233,69,96,0.1)]',
      success: 'border-success/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
      warning: 'border-warning/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
      gold: 'border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]',
    };

    const sizes = {
      sm: { padding: 'p-4', value: 'text-2xl', icon: 'w-8 h-8' },
      md: { padding: 'p-6', value: 'text-3xl', icon: 'w-10 h-10' },
      lg: { padding: 'p-8', value: 'text-4xl', icon: 'w-12 h-12' },
    };

    const sizeConfig = sizes[size];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className={cn(
            sizeConfig.padding,
            variants[variant],
            'hover:border-accent/40 transition-all duration-300',
            className
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <Label className="mb-2 block">{title}</Label>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Text
                  as="span"
                  className={cn(sizeConfig.value, 'font-bold text-foreground block')}
                >
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
                    {change > 0 ? '+' : ''}{change.toFixed(1)}%
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
              <div className={cn(
                sizeConfig.icon,
                'flex items-center justify-center rounded-lg bg-accent/10 text-accent flex-shrink-0'
              )}>
                {icon}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    );
}

export { MetricCard };
