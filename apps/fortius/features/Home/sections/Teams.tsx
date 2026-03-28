'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const teams = [
  {
    id: '01',
    name: 'VALORANT',
    category: 'Tactical FPS',
    detail: 'Precision, strategy, and split-second execution on the global stage.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '02',
    name: 'MOBILE LEGENDS',
    category: 'Mobile MOBA',
    detail: "Dominating Southeast Asia's most competitive mobile battlefield.",
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '03',
    name: 'PUBG MOBILE',
    category: 'Battle Royale',
    detail: 'Elite marksmanship and tactical awareness across every drop zone.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
  },
];

const TRANSITION = 0.12;

function TeamSlide({
  team,
  index,
  count,
  scrollYProgress,
}: {
  team: (typeof teams)[number];
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
}) {
  const slot = 1 / count;

  const entryStart = index * slot - TRANSITION;
  const entryEnd   = index * slot;
  const exitStart  = (index + 1) * slot - TRANSITION;
  const exitEnd    = (index + 1) * slot;
  const isFirst    = index === 0;
  const isLast     = index === count - 1;

  const y = useTransform(
    scrollYProgress,
    isFirst
      ? [exitStart, exitEnd]
      : isLast
        ? [Math.max(0, entryStart), entryEnd]
        : [Math.max(0, entryStart), entryEnd, exitStart, exitEnd],
    isFirst
      ? ['0vh', '-100vh']
      : isLast
        ? ['100vh', '0vh']
        : ['100vh', '0vh', '0vh', '-100vh']
  );

  return (
    <motion.div
      style={{ y, zIndex: index + 1 }}
      className="absolute inset-0 will-change-transform bg-[#0a000f]"
    >
      <h2
        className="absolute left-[5%] font-oswald font-black uppercase leading-none text-white whitespace-nowrap select-none"
        style={{
          fontFamily: 'var(--font-oswald)',
          fontSize: 'clamp(56px, 13vw, 210px)',
          top: 'calc(52px + 2vh)',   /* just below marquee */
          zIndex: 20,
        }}
      >
        {team.name}
      </h2>
      <div
        className="absolute left-[5%] right-[5%] rounded-[1.5rem] overflow-hidden"
        style={{
          top: 'calc(52px + 9vh)',   /* image top sits ~60% down the title */
          height: '62vh',
          zIndex: 10,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={team.image}
          alt={team.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-7 left-8 flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full border border-white/50 bg-transparent px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] text-white uppercase">
            {team.category}
          </span>
          <p className="text-white text-base md:text-xl font-medium leading-snug max-w-[40ch]">
            {team.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DotIndicator({
  index,
  count,
  scrollYProgress,
}: {
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
}) {
  const slot   = 1 / count;
  const start  = index * slot;
  const end    = (index + 1) * slot;
  const buffer = 0.03;

  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - buffer),
      Math.min(1, start + buffer),
      Math.max(0, end - buffer),
      Math.min(1, end + buffer),
    ],
    index === 0 ? [1, 1, 1, 0.25] : [0.25, 1, 1, 0.25]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - buffer),
      Math.min(1, start + buffer),
      Math.max(0, end - buffer),
      Math.min(1, end + buffer),
    ],
    index === 0 ? [1.4, 1.4, 1.4, 0.7] : [0.7, 1.4, 1.4, 0.7]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-2 h-2 rounded-full bg-white"
    />
  );
}

export default function Teams() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      data-bg="#0a000f"
      id="teams"
      className="h-[400vh] relative z-30"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a000f]">
        <div className="absolute top-0 left-0 right-0 z-50 overflow-hidden border-b border-white/10 py-3 backdrop-blur-md bg-black/40">
          <div className="flex w-[200vw] animate-scroll-rl will-change-transform">
            {[0, 1].map((n) => (
              <h2
                key={n}
                className="text-outline text-5xl md:text-6xl font-oswald font-bold whitespace-nowrap px-8 tracking-impact-extreme uppercase"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS •{' '}
              </h2>
            ))}
          </div>
        </div>
        {teams.map((team, i) => (
          <TeamSlide
            key={team.id}
            team={team}
            index={i}
            count={teams.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {teams.map((_, i) => (
            <DotIndicator
              key={i}
              index={i}
              count={teams.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
