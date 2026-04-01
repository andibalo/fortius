'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const preventScroll = useRef<(e: Event) => void>(() => {});

  useEffect(() => {
    preventScroll.current = (e: Event) => e.preventDefault();
    
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.width = '100%';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';

    document.addEventListener('wheel', preventScroll.current, { passive: false });
    document.addEventListener('touchmove', preventScroll.current, { passive: false });

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 4;
        if (next >= 100) {
          clearInterval(intervalRef.current!);
          setTimeout(() => setDone(true), 500);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  useEffect(() => {
    if (done) {
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
      document.body.style.pointerEvents = '';
      document.removeEventListener('wheel', preventScroll.current);
      document.removeEventListener('touchmove', preventScroll.current);
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            className="text-white font-oswald font-bold text-8xl md:text-[14rem] tracking-impact-extreme"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {progress}%
          </div>
          <div className="w-48 md:w-64 h-1 bg-white/10 mt-4 overflow-hidden rounded-full relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#9b00e8] rounded-full shadow-[0_0_25px_rgba(155,0,232,0.8)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
