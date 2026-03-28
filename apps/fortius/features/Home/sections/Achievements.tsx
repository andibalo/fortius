'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'motion/react';

const ITEMS = [
  {
    id: '01',
    category: 'VALORANT',
    title: 'REGIONAL\nCHAMPS',
    year: '2026',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '02',
    category: 'MOBILE LEGENDS',
    title: 'NATIONAL\nCUP',
    year: '2025',
    img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '03',
    category: 'PUBG MOBILE',
    title: 'GRAND\nFINALS',
    year: '2025',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '04',
    category: 'SEASON AWARD',
    title: 'MVP\nX14',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '05',
    category: 'COMMUNITY',
    title: '1M\nFANBASE',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070&auto=format&fit=crop',
  },
];

const X_POS = [+14,  +10,    0,   -38,   -58]; // vw
const Y_POS = [+90,  +40,    0,   -10,   -18]; // vh
const POS_KEYS = [-2, -1, 0, 1, 2];

function evalPath(pos: number, path: number[]): number {
  const p = Math.max(-2, Math.min(2, pos));
  for (let i = 0; i < POS_KEYS.length - 1; i++) {
    if (p >= POS_KEYS[i] && p <= POS_KEYS[i + 1]) {
      const t = (p - POS_KEYS[i]) / (POS_KEYS[i + 1] - POS_KEYS[i]);
      return path[i] + (path[i + 1] - path[i]) * t;
    }
  }
  return path[path.length - 1];
}

function useCardMotion(scroll: MotionValue<number>, index: number, total: number) {
  const pos = (p: number) => p * (total - 1) - index;

  const x      = useTransform(scroll, (p) => `${evalPath(pos(p), X_POS)}vw`);
  const y      = useTransform(scroll, (p) => `${evalPath(pos(p), Y_POS)}vh`);
  const scale  = useTransform(scroll, (p) => Math.max(0.05, 1 - Math.abs(pos(p)) * 0.54));
  const rotate = useTransform(scroll, (p) => -pos(p) * 4);
  const zIndex = useTransform(scroll, (p) => Math.max(0, Math.round(20 - Math.abs(pos(p)) * 8)));

  const opacity = useTransform(scroll, (p) => {
    const a = Math.abs(pos(p));
    if (a >= 2)   return 0;
    if (a >= 1.5) return 1 - (a - 1.5) * 2;
    return 1;
  });

  return { x, y, scale, rotate, zIndex, opacity };
}

function Card({
  item,
  index,
  scroll,
  total,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  scroll: MotionValue<number>;
  total: number;
}) {
  const { x, y, scale, rotate, zIndex, opacity } = useCardMotion(scroll, index, total);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        style={{ x, y, scale, rotate, zIndex, opacity }}
        className="w-[min(620px,80vw)] will-change-transform"
      >
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.img}
            className="w-full h-full object-cover"
            alt={item.title}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <span className="absolute top-5 right-6 text-[10px] font-mono text-white/40 tracking-widest">
            {item.year}
          </span>

          <div className="absolute bottom-7 left-7">
            <p className="text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase mb-2">
              {item.category}
            </p>
            <h3
              className="font-oswald font-bold text-white tracking-impact leading-none whitespace-pre-line"
              style={{
                fontFamily: 'var(--font-oswald)',
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              }}
            >
              {item.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const N = ITEMS.length;
  const dotY = useTransform(scrollYProgress, [0, 1], [0, 154]);

  return (
    <section
      ref={sectionRef}
      data-bg="#111111"
      id="gallery-track"
      className="h-[600vh] relative z-20"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-[#4a0070] rounded-full mix-blend-screen filter blur-[280px] opacity-20 pointer-events-none" />

        {ITEMS.map((item, i) => (
          <Card key={item.id} item={item} index={i} scroll={scrollYProgress} total={N} />
        ))}

        {/* Vertical progress indicator */}
        <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none z-50">
          <span
            className="font-oswald text-[11px] font-bold text-white/40 tracking-widest"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            01
          </span>
          <div className="relative h-40 w-px bg-white/15 rounded-full">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
              style={{ top: dotY }}
            />
          </div>
          <span
            className="font-oswald text-[11px] font-bold text-white/40 tracking-widest"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {String(N).padStart(2, '0')}
          </span>
        </div>

      </div>
    </section>
  );
}
