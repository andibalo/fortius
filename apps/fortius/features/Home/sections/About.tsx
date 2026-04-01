'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { clamp, easeOutBack } from '@/lib/scrollUtils';

const STATS = [
  {
    value: '20+',
    label: 'CHAMPIONSHIPS',
    detail: 'Secured across multiple university and public tournaments.',
    fromX: -90, fromY: -60, fromRot: -22,
    range: [0.22, 0.48] as [number, number],
  },
  {
    value: '300jt+',
    label: 'PRIZE POOL EARNINGS',
    detail: 'Accumulated from tournament victories.',
    fromX: -40, fromY: 80, fromRot: 18,
    range: [0.30, 0.54] as [number, number],
  },
  {
    value: '5+',
    label: 'ROSTERS',
    detail: 'Elite teams competing across Indonesia and beyond.',
    fromX: 60, fromY: -70, fromRot: -14,
    range: [0.38, 0.60] as [number, number],
  },
  {
    value: '15+',
    label: 'TOURNAMENTS HOSTED',
    detail: 'Community events fostering competitive esports growth.',
    fromX: 100, fromY: 30, fromRot: 20,
    range: [0.45, 0.66] as [number, number],
  },
];

function useSnap(
  scrollYProgress: MotionValue<number>,
  range: [number, number]
): MotionValue<number> {
  return useTransform(scrollYProgress, (p) =>
    easeOutBack(clamp((p - range[0]) / (range[1] - range[0]), 0, 1))
  );
}

function StatCard({
  value,
  label,
  detail,
  fromX,
  fromY,
  fromRot,
  range,
  scrollYProgress,
}: (typeof STATS)[number] & { scrollYProgress: MotionValue<number> }) {
  const snap = useSnap(scrollYProgress, range);

  const x = useTransform(snap, [0, 1], [`${fromX}vw`, '0vw']);
  const y = useTransform(snap, [0, 1], [`${fromY}vh`, '0vh']);
  const rotate = useTransform(snap, [0, 1], [fromRot, 0]);
  const scale = useTransform(snap, [0, 1], [0.25, 1]);
  const opacity = useTransform(snap, [0, 0.25, 1], [0, 1, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="stat-card relative glass-box p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white hover:bg-white interactive group overflow-hidden cursor-pointer will-change-transform"
    >
      <div className="relative z-10 flex flex-col justify-center transition-transform duration-700 group-hover:-translate-y-2">
        <span
          className="font-oswald text-4xl lg:text-5xl font-bold text-white group-hover:text-black transition-colors tracking-impact"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          {value}
        </span>
        <span className="text-xs md:text-sm font-bold tracking-widest text-gray-500 group-hover:text-black mt-5 block uppercase transition-colors">
          {label}
        </span>
        <div className="expandable-content">
          <div className="expandable-inner">
            <p className="text-[11px] md:text-xs text-white leading-tight font-bold pb-2">{detail}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.12, 0.35], [0.1, 2.2, 1.4]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.08, 0.35], [0, 0.6, 0.25]);
  const glowY = useTransform(scrollYProgress, [0, 1], ['10%', '-25%']);

  const cardSnap = useSnap(scrollYProgress, [0.05, 0.38]);
  const cardX = useTransform(cardSnap, [0, 1], ['-130vw', '0vw']);
  const cardY = useTransform(cardSnap, [0, 1], ['25vh', '0vh']);
  const cardRotate = useTransform(cardSnap, [0, 1], [-28, 0]);
  const cardScale = useTransform(cardSnap, [0, 1], [0.4, 1]);
  const cardOpacity = useTransform(cardSnap, [0, 0.2, 1], [0, 1, 1]);

  const headSnap = useSnap(scrollYProgress, [0.10, 0.40]);
  const headX = useTransform(headSnap, [0, 1], ['90vw', '0vw']);
  const headY = useTransform(headSnap, [0, 1], ['-20vh', '0vh']);
  const headRotate = useTransform(headSnap, [0, 1], [12, 0]);
  const headOpacity = useTransform(headSnap, [0, 0.2, 1], [0, 1, 1]);

  const bodySnap = useSnap(scrollYProgress, [0.16, 0.44]);
  const bodyY = useTransform(bodySnap, [0, 1], ['60vh', '0vh']);
  const bodyOpacity = useTransform(bodySnap, [0, 0.3, 1], [0, 1, 1]);

  return (
    <section
      ref={sectionRef}
      data-bg="#0a0014"
      id="about-track"
      className="h-[350vh] relative z-20"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-[#6200a8] rounded-full mix-blend-screen filter blur-[180px] pointer-events-none"
          style={{ scale: glowScale, opacity: glowOpacity, y: glowY }}
        />
        <div className="relative z-10 max-w-screen-2xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <motion.div
            style={{ x: cardX, y: cardY, rotate: cardRotate, scale: cardScale, opacity: cardOpacity }}
            className="lg:col-span-5 relative group interactive animate-float-1 will-change-transform"
          >
            <div className="absolute inset-0 bg-[#9b00e8] rounded-[2rem] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="clip-reveal relative aspect-[4/5] glass-box rounded-[2rem] border border-white/20 p-8 flex flex-col justify-between overflow-hidden group-hover:-translate-y-4 shadow-2xl transition-transform duration-700">
              <div className="absolute inset-0 bg-hatch opacity-30 mix-blend-overlay" />
              <div className="relative z-10 flex justify-between items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  alt="QR Registration"
                  className="w-16 h-16 invert opacity-90 rounded-xl bg-white/10 p-2 mix-blend-screen transition-transform duration-700 group-hover:scale-110"
                />
                <span className="text-xs tracking-widest font-bold border border-white/30 rounded-full px-4 py-2 bg-[#050505]/80 backdrop-blur-md text-white hover-smooth">
                  ESPORTS
                </span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3
                  className="text-5xl md:text-6xl font-oswald font-bold tracking-impact uppercase mb-4 text-white"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  <span className="content-hover">LINK</span>
                  <br />
                  <span className="content-hover">Registrasi</span>
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#9b00e8] hover:text-white transition-colors duration-500"
                >
                  <span className="hover-smooth">tinyurl.com/FORTIUSGEN7</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform duration-500">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10">

            <motion.div style={{ x: headX, y: headY, rotate: headRotate, opacity: headOpacity }} className="will-change-transform">
              <h2
                className="text-2xl md:text-4xl text-white mb-8 font-bold tracking-widest uppercase flex items-center gap-6 font-oswald"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                <span className="content-hover">ABOUT US</span>
                <span className="w-24 h-[2px] bg-[#9b00e8] flex-shrink-0" />
              </h2>
            </motion.div>
            <motion.p
              style={{ y: bodyY, opacity: bodyOpacity }}
              className="text-xl md:text-3xl text-gray-400 leading-tight font-light mb-12 max-w-4xl tracking-tight will-change-transform"
            >
              <span className="content-hover">
                <strong className="text-white font-medium">Fortius Esports</strong> adalah organisasi olahraga elektronik <strong className="text-white font-medium">Universitas Multimedia Nusantara</strong> yang didirikan pada Februari 2019.
                Kami menyediakan wadah bagi mahasiswa untuk mengeksplorasi dan mengembangkan bakat mereka di dunia esports yang dinamis, baik sebagai pemain kompetitif maupun sebagai bagian dari tim manajemen.
              </span>
            </motion.p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-16 md:mt-24 w-full items-start">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
