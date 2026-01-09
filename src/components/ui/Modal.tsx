'use client';

import { useEffect, useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  variant?: 'dialog' | 'fullscreen';
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  variant = 'dialog',
  className,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const content = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          'relative w-full border border-white/10 bg-surface/85 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md',
          variant === 'fullscreen'
            ? 'h-full rounded-none'
            : 'max-w-4xl max-h-[85vh] rounded-2xl',
          className
        )}
      >
        <div className={cn('flex items-start justify-between gap-4 border-b border-white/10', variant === 'fullscreen' ? 'px-5 py-4' : 'px-5 py-4')}>
          <div className="min-w-0">
            {title && (
              <div id={titleId} className="text-lg font-semibold tracking-tight text-foreground">
                {title}
              </div>
            )}
            {description && (
              <div id={descriptionId} className="mt-1 text-sm text-muted">
                {description}
              </div>
            )}
          </div>
          <button
            type="button"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className={cn('overflow-y-auto', variant === 'fullscreen' ? 'h-[calc(100%-64px)] px-5 py-5' : 'px-5 py-5')}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

