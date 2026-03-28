'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Mission panel — visible from 0→30%, exits 30→40%
  const missionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0]);
  const missionX = useTransform(scrollYProgress, [0.3, 0.4], ['0vw', '60vw']);
  const missionY = useTransform(scrollYProgress, [0, 0.1], ['100px', '0px']);
  const missionScale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0.8, 1, 1, 0.5]);

  // Vision panel — enters 30→40%, visible 40→70%, exits 70→80%
  const visionOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0, 1, 1, 0]);
  const visionX = useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], ['-60vw', '0vw', '0vw', '60vw']);
  const visionScale = useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0.5, 1, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      data-bg="#080010"
      id="scroll-track"
      className="h-[500vh] relative z-20"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">

        {/* Mission Panel */}
        <motion.div
          className="absolute max-w-[90rem] w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{ opacity: missionOpacity, x: missionX, y: missionY, scale: missionScale }}
        >
          {/* Text */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold tracking-widest text-[#050505] bg-white rounded-full px-4 py-1">01</span>
              <h2
                className="text-sm font-bold tracking-widest text-white font-oswald text-xl content-hover"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                MISSION
              </h2>
            </div>
            <p className="text-gray-400 text-xl md:text-3xl leading-tight mb-10 pointer-events-auto tracking-tight">
              <span className="content-hover">
                Every project is a chance to blend design and development, shaping bold interactive ideas into{' '}
                <strong className="text-white font-bold">sleek digital realities — built with</strong> intent, speed,
                and visual clarity that attracts lot of peoples.
              </span>
            </p>
            <a
              href="#"
              className="btn-swipe w-max inline-block border border-white/30 rounded-full px-10 py-4 text-sm font-bold tracking-widest text-white hover:border-white pointer-events-auto interactive"
            >
              <span>SEE WORKS</span>
            </a>
          </div>

          {/* Image collage */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative w-full aspect-[4/3] mx-auto animate-float-1 pointer-events-auto">
            <div className="absolute inset-0 bg-[#111] visor-mask overflow-hidden shadow-2xl img-hover-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                className="img-hover-target w-full h-full object-cover opacity-60 blend-lum"
                alt="Mission background"
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

        {/* Vision Panel */}
        <motion.div
          className="absolute max-w-[90rem] w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          style={{ opacity: visionOpacity, x: visionX, scale: visionScale }}
        >
          {/* Image collage */}
          <div className="lg:col-span-7 relative w-full aspect-[4/3] mx-auto animate-float-2 pointer-events-auto">
            <div className="absolute inset-0 bg-[#111] visor-mask overflow-hidden shadow-2xl img-hover-wrap border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
                className="img-hover-target w-full h-full object-cover opacity-50 blend-lum"
                alt="Vision background"
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

          {/* Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold tracking-widest text-[#050505] bg-[#9b00e8] rounded-full px-4 py-1">02</span>
              <h2
                className="text-sm font-bold tracking-widest text-[#9b00e8] font-oswald text-xl content-hover"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                VISION
              </h2>
            </div>
            <p className="text-gray-400 text-xl md:text-3xl leading-tight mb-10 pointer-events-auto tracking-tight">
              <span className="content-hover">
                Redefining the standard of web aesthetics by pushing the boundaries of what&apos;s possible in the
                browser. We create{' '}
                <strong className="text-white font-bold">immersive and tactile experiences</strong> that leave a
                lasting impact.
              </span>
            </p>
            <a
              href="#"
              className="btn-swipe btn-swipe-primary w-max inline-block border border-[#9b00e8] text-[#9b00e8] rounded-full px-10 py-4 text-sm font-bold tracking-widest pointer-events-auto interactive shadow-[0_0_20px_rgba(155,0,232,0.2)]"
            >
              <span>DISCOVER</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
