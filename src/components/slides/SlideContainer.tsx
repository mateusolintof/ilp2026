'use client';

import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SlideContainerProps {
  children: ReactNode;
  className?: string;
  showProgress?: boolean;
  showNavigation?: boolean;
  showIndicators?: boolean;
}

export function SlideContainer({
  children,
  className,
  showProgress = true,
  showNavigation = true,
  showIndicators = true,
}: SlideContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Get total slides
  useEffect(() => {
    if (containerRef.current) {
      const slides = containerRef.current.querySelectorAll('.slide');
      setTotalSlides(slides.length);
    }
  }, [children]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    const slideWidth = containerRef.current.offsetWidth;
    const newSlide = Math.round(scrollLeft / slideWidth);

    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
    }
  }, [currentSlide]);

  // Convert wheel to horizontal scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current || isScrolling) return;

    const target = e.target as HTMLElement;
    const slide = target.closest('.slide');

    // Check if we're inside a scrollable element within a slide
    if (slide) {
      const scrollableContent = slide.querySelector('.slide-content');
      if (scrollableContent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableContent as HTMLElement;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // If scrolling down and not at bottom, allow vertical scroll
        if (e.deltaY > 0 && !isAtBottom) return;
        // If scrolling up and not at top, allow vertical scroll
        if (e.deltaY < 0 && !isAtTop) return;
      }
    }

    e.preventDefault();
    setIsScrolling(true);

    const slideWidth = containerRef.current.offsetWidth;
    const direction = e.deltaY > 0 ? 1 : -1;
    const targetScroll = (currentSlide + direction) * slideWidth;

    containerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });

    setTimeout(() => setIsScrolling(false), 500);
  }, [currentSlide, isScrolling]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!containerRef.current) return;

    const slideWidth = containerRef.current.offsetWidth;
    let targetSlide = currentSlide;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        targetSlide = Math.min(currentSlide + 1, totalSlides - 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        targetSlide = Math.max(currentSlide - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        targetSlide = 0;
        break;
      case 'End':
        e.preventDefault();
        targetSlide = totalSlides - 1;
        break;
      default:
        return;
    }

    containerRef.current.scrollTo({
      left: targetSlide * slideWidth,
      behavior: 'smooth',
    });
  }, [currentSlide, totalSlides]);

  // Navigate to slide
  const navigateToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;

    const slideWidth = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    });
  }, []);

  // Setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleScroll, handleWheel, handleKeyDown]);

  const progress = totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Progress Bar */}
      {showProgress && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-surface z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
      )}

      {/* Slide Container */}
      <div
        ref={containerRef}
        className={cn(
          'slide-container flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth',
          'h-full w-full',
          className
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Navigation Buttons */}
      {showNavigation && totalSlides > 1 && (
        <>
          <AnimatePresence>
            {currentSlide > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => navigateToSlide(currentSlide - 1)}
                className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface/80 backdrop-blur border border-white/10 text-foreground hover:bg-surface transition-colors"
                aria-label="Slide anterior"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {currentSlide < totalSlides - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => navigateToSlide(currentSlide + 1)}
                className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface/80 backdrop-blur border border-white/10 text-foreground hover:bg-surface transition-colors"
                aria-label="Próximo slide"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'w-8 bg-accent'
                  : 'bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="fixed bottom-6 right-6 z-50 text-sm text-muted">
        <span className="text-foreground font-medium">{currentSlide + 1}</span>
        <span className="mx-1">/</span>
        <span>{totalSlides}</span>
      </div>
    </div>
  );
}

// Slide Component
export interface SlideProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Slide({ children, className, id }: SlideProps) {
  return (
    <div
      id={id}
      className={cn(
        'slide flex-shrink-0 w-screen h-screen snap-start overflow-hidden',
        className
      )}
    >
      <div className="slide-content w-full h-full overflow-y-auto p-8 md:p-12 lg:p-16">
        {children}
      </div>
    </div>
  );
}
