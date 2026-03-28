'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

const NEWS_ITEMS = [
  {
    id: '01',
    category: 'TOURNAMENT',
    date: 'MAR 2026',
    title: 'Fortius Claims Regional Championship Title',
    description:
      'After a grueling 5-match grand final, our Valorant roster secured the top spot at the Asia-Pacific Regional Championship, cementing our place in the global circuit.',
    gradientClass: 'from-[#9b00e8]/40 via-[#4a0070]/20 to-[#050505]',
    badgeClass: 'bg-[#9b00e8] text-white',
    accentColor: '#9b00e8',
  },
  {
    id: '02',
    category: 'ROSTER',
    date: 'FEB 2026',
    title: 'Introducing Our New Mobile Legends Lineup',
    description:
      'Seven new players join the Fortius family as we expand our Mobile Legends division ahead of the 2026 season. Meet the squad built to dominate.',
    gradientClass: 'from-[#c1121f]/40 via-[#800010]/20 to-[#050505]',
    badgeClass: 'bg-[#c1121f] text-white',
    accentColor: '#c1121f',
  },
  {
    id: '03',
    category: 'PARTNERSHIP',
    date: 'JAN 2026',
    title: 'Fortius x TechArena: Official Gear Partnership',
    description:
      'We have partnered with TechArena to equip every Fortius athlete with cutting-edge peripherals and custom rigs, ensuring peak performance under pressure.',
    gradientClass: 'from-white/10 via-white/5 to-[#050505]',
    badgeClass: 'bg-white text-[#050505]',
    accentColor: '#ffffff',
  },
  {
    id: '04',
    category: 'COMMUNITY',
    date: 'DEC 2025',
    title: 'Fortius Academy Opens Applications for Gen 8',
    description:
      'Our talent pipeline program returns for its eighth cohort. Applications are now open for aspiring pros across all active titles. Limited slots available.',
    gradientClass: 'from-[#9b00e8]/20 via-[#c1121f]/10 to-[#050505]',
    badgeClass: 'bg-[#9b00e8] text-white',
    accentColor: '#9b00e8',
  },
];

export default function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.50, 0.75],
    ['100vh', '0vh', '-3vh', '-6vh', '-9vh']
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.50, 0.75],
    [0.85, 1, 0.95, 0.9, 0.85]
  );
  const card1Opacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  const card2Y = useTransform(
    scrollYProgress,
    [0.20, 0.32, 0.50, 0.75],
    ['100vh', '0vh', '-3vh', '-6vh']
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0.20, 0.32, 0.50, 0.75],
    [0.85, 1, 0.95, 0.9]
  );
  const card2Opacity = useTransform(scrollYProgress, [0.20, 0.26], [0, 1]);

  const card3Y = useTransform(
    scrollYProgress,
    [0.42, 0.54, 0.75],
    ['100vh', '0vh', '-3vh']
  );
  const card3Scale = useTransform(
    scrollYProgress,
    [0.42, 0.54, 0.75],
    [0.85, 1, 0.95]
  );
  const card3Opacity = useTransform(scrollYProgress, [0.42, 0.48], [0, 1]);

  const card4Y = useTransform(
    scrollYProgress,
    [0.65, 0.77],
    ['100vh', '0vh']
  );
  const card4Scale = useTransform(scrollYProgress, [0.65, 0.77], [0.85, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0.65, 0.71], [0, 1]);

  const cardTransforms = [
    { y: card1Y, scale: card1Scale, opacity: card1Opacity, zIndex: 10 },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity, zIndex: 20 },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity, zIndex: 30 },
    { y: card4Y, scale: card4Scale, opacity: card4Opacity, zIndex: 40 },
  ];

  const activeIdx = (v: number) => (v < 0.20 ? 0 : v < 0.42 ? 1 : v < 0.65 ? 2 : 3);
  const dot0Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 0 ? 1 : 0.25);
  const dot1Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 1 ? 1 : 0.25);
  const dot2Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 2 ? 1 : 0.25);
  const dot3Opacity = useTransform(scrollYProgress, (v) => activeIdx(v) === 3 ? 1 : 0.25);
  const dot0Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 0 ? '1.5rem' : '0.5rem');
  const dot1Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 1 ? '1.5rem' : '0.5rem');
  const dot2Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 2 ? '1.5rem' : '0.5rem');
  const dot3Width = useTransform(scrollYProgress, (v) => activeIdx(v) === 3 ? '1.5rem' : '0.5rem');

  const dotOpacities = [dot0Opacity, dot1Opacity, dot2Opacity, dot3Opacity];
  const dotWidths = [dot0Width, dot1Width, dot2Width, dot3Width];

  return (
    <section
      ref={sectionRef}
      data-bg="#050505"
      className="h-[600vh] relative z-20"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">

        {/* Section header */}
        <div className="absolute top-10 left-0 right-0 px-6 md:px-12 flex items-end justify-between z-50">
          <div className="flex items-baseline gap-4">
            <span
              className="font-oswald font-bold leading-none text-[#9b00e8]/15 text-[8vw]"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              05
            </span>
            <h2
              className="font-oswald text-4xl md:text-6xl font-bold tracking-impact text-white"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              NEWS
            </h2>
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
            className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
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
              <div className="news-card glass-box rounded-[2rem] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-2 interactive">

                {/* Image area */}
                <div className={`relative overflow-hidden aspect-[4/3] md:aspect-auto bg-gradient-to-br ${item.gradientClass}`}>
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
                  <a
                    href="#"
                    className="btn-swipe w-max mt-8 border border-white/30 rounded-full px-8 py-3 text-xs font-bold tracking-widest text-white inline-block"
                  >
                    <span>READ MORE</span>
                  </a>
                </div>

              </div>
            </motion.article>
          </div>
        ))}

      </div>
    </section>
  );
}
