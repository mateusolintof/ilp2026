'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  animated?: boolean;
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, variant = 'default', size = 'md', showValue = false, animated = true, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variants = {
      default: 'bg-white/20',
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      gold: 'bg-gold',
    };

    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className={cn('w-full bg-surface-elevated rounded-full overflow-hidden', sizes[size])}>
          {animated ? (
            <motion.div
              className={cn('h-full rounded-full', variants[variant])}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          ) : (
            <div
              className={cn('h-full rounded-full', variants[variant])}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        {showValue && (
          <span className="text-sm text-muted mt-1 block text-right">
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
