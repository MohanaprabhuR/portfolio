"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * Content must never stay hidden. If IntersectionObserver never reports the
 * element (headless renderers, background tabs, odd browsers), a timer reveals
 * it anyway, and a <noscript> rule covers JS being off entirely.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const shown = inView || fallback || reduced;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
