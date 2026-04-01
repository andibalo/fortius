'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { clamp, mapRange } from '@/lib/scrollUtils';

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const visionOpacity = useTransform(scrollYProgress, (p) => {
    const fadeIn = clamp((p - 0) / 0.1, 0, 1);
    const fadeOut = 1 - clamp((p - 0.3) / 0.1, 0, 1);
    return fadeIn * fadeOut;
  });
  const visionScale = useTransform(scrollYProgress, (p) => {
    const scaleIn = mapRange(p, 0, 0.1, 0.8, 1);
    const scaleOut = mapRange(p, 0.3, 0.4, 1, 0.5);
    return scaleIn * scaleOut;
  });
  const visionX = useTransform(scrollYProgress, [0.3, 0.4], ['0vw', '60vw']);
  const visionY = useTransform(scrollYProgress, [0, 0.1], ['100px', '0px']);

  const missionOpacity = useTransform(scrollYProgress, (p) => {
    const fadeIn = clamp((p - 0.3) / 0.1, 0, 1);
    const fadeOut = 1 - clamp((p - 0.7) / 0.1, 0, 1);
    return fadeIn * fadeOut;
  });
  const missionScale = useTransform(scrollYProgress, (p) => {
    const scaleIn = mapRange(p, 0.3, 0.4, 0.5, 1);
    const scaleOut = mapRange(p, 0.7, 0.8, 1, 0.5);
    return scaleIn * scaleOut;
  });
  const missionX = useTransform(scrollYProgress, (p) => {
    const enterX = mapRange(p, 0.3, 0.4, -60, 0);
    const exitX = mapRange(p, 0.7, 0.8, 0, 60);
    return `${enterX + exitX}vw`;
  });

  return (
    <section
      ref={sectionRef}
      data-bg="#080010"
      id="scroll-track"
      className="h-[350vh] relative z-20"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">

        {/* ── MISSION PANEL ─────────────────────────────────────────────── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <motion.div
            style={{ x: missionX, opacity: missionOpacity, scale: missionScale }}
            className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center will-change-transform"
          >
            {/* Left — text */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center pointer-events-auto">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-bold tracking-widest text-[#050505] bg-[#9b00e8] rounded-full px-4 py-1">
                  02
                </span>
                <h2
                  className="text-sm font-bold tracking-widest text-[#9b00e8] font-oswald text-xl content-hover"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  MISSION
                </h2>
              </div>
              <p className="text-gray-400 text-xl md:text-3xl leading-tight mb-10 tracking-tight">
                <span className="content-hover">
                  Menjadi wadah bagi mahasiswa untuk <strong className="text-white font-bold">mengembangkan bakat dan hobinya di bidang non-akademik</strong>, sekaligus meraih prestasi melalui esports
                </span>
              </p>
            </div>

            {/* Right — images */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative w-full aspect-[4/3] mx-auto animate-float-1 pointer-events-auto">
              <div className="absolute inset-0 bg-[#111] visor-mask overflow-hidden shadow-2xl img-hover-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                  className="img-hover-target w-full h-full object-cover opacity-60 blend-lum"
                  alt="Mission bg"
                />
              </div>
              <div className="absolute -left-12 bottom-12 w-2/3 aspect-video glass-box rounded-2xl z-10 border border-white/20 bg-[#050505]/60 overflow-hidden img-hover-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
                  className="img-hover-target w-full h-full object-cover opacity-80 mix-blend-overlay"
                  alt="Mission overlay"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── VISION PANEL ──────────────────────────────────────────────── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <motion.div
            style={{ x: visionX, y: visionY, opacity: visionOpacity, scale: visionScale }}
            className="max-w-[90rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center will-change-transform"
          >
            <div className="lg:col-span-7 relative w-full aspect-[4/3] mx-auto animate-float-2 pointer-events-auto">
              <div className="absolute inset-0 bg-[#111] visor-mask overflow-hidden shadow-2xl img-hover-wrap border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
                  className="img-hover-target w-full h-full object-cover opacity-50 blend-lum"
                  alt="Vision bg"
                />
              </div>
              <div className="absolute -right-12 top-12 w-2/3 aspect-square glass-box rounded-full z-10 border border-[#9b00e8]/50 bg-[#050505]/40 overflow-hidden img-hover-wrap flex items-center justify-center backdrop-blur-3xl">
                <h2
                  className="font-oswald text-[10vw] font-bold text-white tracking-impact opacity-20 content-hover"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  VISION
                </h2>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center pointer-events-auto">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-bold tracking-widest text-[#050505] bg-white rounded-full px-4 py-1">
                  01
                </span>
                <h2
                  className="text-sm font-bold tracking-widest text-white font-oswald text-xl content-hover"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  VISION
                </h2>
              </div>
              <p className="text-gray-400 text-xl md:text-3xl leading-tight mb-10 tracking-tight">
                <span className="content-hover">
                  Menjadi organisasi esports universitas terdepan yang mampu <strong className="text-white font-bold">mengasah bakat, mendorong inovasi, serta membangun komunitas yang dinamis</strong>, 
                  di mana mahasiswa dapat berprestasi baik dalam kompetisi maupun peran industri kreatif dan esports.
                </span>
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
