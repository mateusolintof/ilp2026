'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home as HomeIcon } from 'lucide-react';
import { ParticleBackground } from '@/components/3d/ParticleBackground';
import {
  SlideCover,
  SlideExecutiveSummary,
  SlidePaidTraffic,
  SlideCreatives,
  SlideOrganic,
  SlideClosings,
  SlideDataCrossing,
  SlideInsightsTrends,
} from '@/components/slides';

const slides = [
  { id: 1, component: SlideCover, title: 'Capa' },
  { id: 2, component: SlideExecutiveSummary, title: 'Resumo Executivo' },
  { id: 3, component: SlidePaidTraffic, title: 'Tráfego Pago' },
  { id: 4, component: SlideCreatives, title: 'Criativos' },
  { id: 5, component: SlideOrganic, title: 'Orgânico' },
  { id: 6, component: SlideClosings, title: 'Fechamento' },
  { id: 7, component: SlideDataCrossing, title: 'Cruzamento' },
  { id: 8, component: SlideInsightsTrends, title: 'Insights' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, []);

  // Navigate next/previous
  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* 3D Background */}
      <ParticleBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent to-gold z-50"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => goToSlide(0)}
          className="p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
          aria-label="Go to start"
        >
          <HomeIcon className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Spacer to balance layout */}
        <div className="w-9" />
      </header>

      {/* Slides Container */}
      <div ref={containerRef} className="h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <div className="slide-content h-full w-full overflow-y-auto pt-20 pb-24 px-6 md:px-12 lg:px-16">
              <div className="max-w-7xl mx-auto">
                {(() => {
                  const CurrentSlideComponent = slides[currentSlide].component;
                  return <CurrentSlideComponent />;
                })()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-3 rounded-full bg-white/10 backdrop-blur-sm transition-all ${
            currentSlide === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/20 hover:scale-110'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-accent'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`p-3 rounded-full bg-white/10 backdrop-blur-sm transition-all ${
            currentSlide === slides.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/20 hover:scale-110'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-6 right-6 text-xs text-muted hidden md:block">
        <span className="opacity-50">
          Use <kbd className="px-1 py-0.5 bg-white/10 rounded">←</kbd> <kbd className="px-1 py-0.5 bg-white/10 rounded">→</kbd> para navegar
        </span>
      </div>
    </div>
  );
}
