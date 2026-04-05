'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { useResponsive } from '@/hooks/useResponsive';
import NewsMobile from './News.Mobile';

const NEWS_ITEMS = [
  {
    id: '01',
    category: 'COMMUNITY',
    date: 'JAN 2026',
    title: 'Fortius Website: Your Ultimate Esports Hub',
    description:
      'Fortius Website akan segera hadir sebagai pusat esports yang lengkap. Nantinya, Anda dapat mendaftar turnamen, membeli merchandise resmi, dan selalu mengikuti perkembangan terbaru dunia esports melalui satu platform yang terintegrasi.',
    gradientClass: 'from-[#9b00e8]/20 via-[#c1121f]/10 to-[#050505]',
    badgeClass: 'bg-[#9b00e8] text-white',
    accentColor: '#9b00e8',
  },
  {
    id: '02',
    category: 'RECRUITMENT',
    date: 'JAN 2026',
    title: 'Fortius Newcomers 2026',
    description:
      'Fortius dengan penuh semangat menyambut talenta baru melalui open recruitment pertama di 2026. Kami yakin setiap anggota akan membawa energi dan prestasi gemilang. Ikuti media sosial kami untuk info rekrutmen berikutnya!',
    gradientClass: 'from-[#9b00e8]/70 via-[#4a0070]/50 to-[#0a0010]',
    badgeClass: 'bg-[#9b00e8] text-white',
    accentColor: '#9b00e8',
  },
];

const COUNT = NEWS_ITEMS.length;
const ENTRY_DUR = 0.12;
const STEP = COUNT > 1 ? (0.8 - ENTRY_DUR) / (COUNT - 1) : 0.68;
const SECTION_HEIGHT = `${COUNT * 150}vh`;

function yFrames(i: number): { input: number[]; output: string[] } {
  if (i >= COUNT) return { input: [0, 1], output: ['100vh', '100vh'] };
  const enter = i * STEP;
  const settle = enter + ENTRY_DUR;
  const input: number[] = [enter, settle];
  const output: string[] = ['100vh', '0vh'];

  for (let j = i + 1; j < COUNT; j++) {
    input.push(j * STEP + ENTRY_DUR);
    output.push(`${-(j - i) * 3}vh`);
  }
  return { input, output };
}

function scaleFrames(i: number): { input: number[]; output: number[] } {
  if (i >= COUNT) return { input: [0, 1], output: [0.85, 0.85] };
  const enter = i * STEP;
  const settle = enter + ENTRY_DUR;
  const input: number[] = [enter, settle];
  const output: number[] = [0.85, 1];
  for (let j = i + 1; j < COUNT; j++) {
    input.push(j * STEP + ENTRY_DUR);
    output.push(Math.max(0.85, 1 - 0.05 * (j - i)));
  }
  return { input, output };
}

const Y = [yFrames(0), yFrames(1), yFrames(2), yFrames(3)];
const SC = [scaleFrames(0), scaleFrames(1), scaleFrames(2), scaleFrames(3)];

function activeIdx(v: number): number {
  for (let i = COUNT - 1; i >= 0; i--) {
    if (v >= i * STEP) return i;
  }
  return 0;
}

function NewsDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const c0Y = useTransform(scrollYProgress, Y[0].input, Y[0].output);
  const c1Y = useTransform(scrollYProgress, Y[1].input, Y[1].output);
  const c2Y = useTransform(scrollYProgress, Y[2].input, Y[2].output);
  const c3Y = useTransform(scrollYProgress, Y[3].input, Y[3].output);

  const c0Scale = useTransform(scrollYProgress, SC[0].input, SC[0].output);
  const c1Scale = useTransform(scrollYProgress, SC[1].input, SC[1].output);
  const c2Scale = useTransform(scrollYProgress, SC[2].input, SC[2].output);
  const c3Scale = useTransform(scrollYProgress, SC[3].input, SC[3].output);

  const c0Opacity = useTransform(scrollYProgress, (v) => {
    if (COUNT < 1) return 0;
    if (v < 0) return 0;
    return COUNT === 1 || v < 1 * STEP + ENTRY_DUR ? 1 : 0;
  });
  const c1Opacity = useTransform(scrollYProgress, (v) => {
    if (COUNT < 2) return 0;
    if (v < 1 * STEP) return 0;
    return COUNT === 2 || v < 2 * STEP + ENTRY_DUR ? 1 : 0;
  });
  const c2Opacity = useTransform(scrollYProgress, (v) => {
    if (COUNT < 3) return 0;
    if (v < 2 * STEP) return 0;
    return COUNT === 3 || v < 3 * STEP + ENTRY_DUR ? 1 : 0;
  });
  const c3Opacity = useTransform(scrollYProgress, (v) => {
    if (COUNT < 4) return 0;
    return v >= 3 * STEP ? 1 : 0;
  });

  const cardTransforms = [
    { y: c0Y, scale: c0Scale, opacity: c0Opacity, zIndex: 10 },
    { y: c1Y, scale: c1Scale, opacity: c1Opacity, zIndex: 20 },
    { y: c2Y, scale: c2Scale, opacity: c2Opacity, zIndex: 30 },
    { y: c3Y, scale: c3Scale, opacity: c3Opacity, zIndex: 40 },
  ];

  const d0Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 0 ? 1 : 0.25);
  const d1Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 1 ? 1 : 0.25);
  const d2Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 2 ? 1 : 0.25);
  const d3Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 3 ? 1 : 0.25);

  const d0Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 0 ? '1.5rem' : '0.5rem');
  const d1Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 1 ? '1.5rem' : '0.5rem');
  const d2Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 2 ? '1.5rem' : '0.5rem');
  const d3Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 3 ? '1.5rem' : '0.5rem');

  const dotOpacities = [d0Opacity, d1Opacity, d2Opacity, d3Opacity];
  const dotWidths = [d0Width, d1Width, d2Width, d3Width];

  return (
    <section
      ref={sectionRef}
      data-bg="#050505"
      className="relative z-20"
      style={{ height: SECTION_HEIGHT }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
        {/* Section header */}
        <div className="absolute top-10 left-0 right-0 px-12 flex items-end justify-between z-50">
          <div className="flex items-baseline gap-4">
            <span
              className="font-oswald font-bold leading-none text-[#9b00e8]/15 text-[8vw]"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              NEWS
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {NEWS_ITEMS.map((_, i) => (
              <motion.div
                key={i}
                className="h-2 rounded-full bg-white"
                style={{ opacity: dotOpacities[i], width: dotWidths[i] }}
              />
            ))}
          </div>
        </div>

        {NEWS_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="absolute inset-0 flex items-center justify-center px-12"
            style={{ zIndex: cardTransforms[i].zIndex }}
          >
            <motion.article
              className="w-full max-w-5xl pointer-events-auto"
              style={{
                y: cardTransforms[i].y,
                scale: cardTransforms[i].scale,
                opacity: cardTransforms[i].opacity,
              }}
            >
              <div className="news-card glass-box bg-[#0e0e0e] rounded-[2rem] border border-white/20 overflow-hidden grid grid-cols-1 md:grid-cols-2 interactive">
                {/* Image area */}
                <div className={`relative overflow-hidden aspect-[4/3] md:aspect-auto bg-[#111] bg-gradient-to-br ${item.gradientClass}`}>
                  <div className="absolute inset-0 bg-grid-pattern" />
                  <div className="absolute inset-0 bg-hatch opacity-10" />
                  <span
                    className="absolute bottom-4 left-4 font-oswald font-bold text-[5rem] leading-none opacity-10"
                    style={{ fontFamily: 'var(--font-oswald)', color: item.accentColor }}
                  >
                    {item.id}
                  </span>
                </div>

                {/* Content area */}
                <div className="p-8 md:p-12 flex flex-col justify-between min-h-[22rem]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`text-xs font-bold tracking-widest rounded-full px-3 py-1 uppercase ${item.badgeClass}`}>
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-gray-500">{item.date}</span>
                    </div>
                    <h3
                      className="font-oswald text-2xl md:text-4xl font-bold text-white tracking-impact mb-4 leading-tight"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function News() {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return <NewsMobile />;
  }

  return <NewsDesktop />;
}