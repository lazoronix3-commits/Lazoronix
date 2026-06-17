'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * SectionReveal Component
 * 
 * Provides a clinical, institutional reveal animation for sections and elements.
 * Adheres to the "Mission Control" motion principles:
 * - 30px translateY to 0
 * - 500ms duration (default)
 * - Controlled stagger via delay
 * - No soft blurs or bouncy easing
 */
export function SectionReveal({ 
  children, 
  className, 
  delay = 0, 
  duration = 500,
  threshold = 0.1,
  once = true
}: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      });
    }, {
      threshold,
      rootMargin: '0px 0px -50px 0px'
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={domRef}
      className={cn(
        'opacity-0 translate-y-8 transition-all', // 30px is approx translate-y-8
        isVisible && 'opacity-100 translate-y-0 active',
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' // Clinical terminal easing
      }}
    >
      {children}
    </div>
  );
}
