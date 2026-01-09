'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Heading Component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  gradient?: boolean;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size = 'lg', gradient = false, children, ...props }, ref) => {
    const sizes = {
      xs: 'text-base md:text-lg font-semibold tracking-tight',
      sm: 'text-lg md:text-xl font-semibold tracking-tight',
      md: 'text-xl md:text-2xl font-semibold tracking-tight',
      lg: 'text-2xl md:text-3xl font-bold tracking-tight',
      xl: 'text-3xl md:text-4xl font-bold tracking-tight',
      '2xl': 'text-4xl md:text-5xl font-bold tracking-tight',
      '3xl': 'text-5xl md:text-6xl font-bold tracking-tight',
    };

    const gradientClass = gradient
      ? 'bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent'
      : 'text-foreground';

    return (
      <Component
        ref={ref}
        className={cn(sizes[size], 'leading-tight', gradientClass, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

// Text Component
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'default' | 'muted' | 'subtle' | 'accent' | 'success' | 'warning' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = 'p', size = 'md', variant = 'default', weight = 'normal', children, ...props }, ref) => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    };

    const variants = {
      default: 'text-foreground',
      muted: 'text-muted',
      subtle: 'text-subtle',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(sizes[size], variants[variant], weights[weight], 'leading-normal', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// Label Component
export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ className, size = 'sm', children, ...props }, ref) => {
    const sizes = {
      sm: 'text-[0.72rem]',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(sizes[size], 'font-medium text-muted uppercase tracking-widest', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Label.displayName = 'Label';

export { Heading, Text, Label };
