'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Initialises a single Lenis smooth-scroll instance and wires it into
 * the RAF loop. Returns the Lenis instance so callers can use it for
 * scroll-to or event listening if needed.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let raf: number;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
