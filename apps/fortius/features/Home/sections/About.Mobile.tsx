'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { clamp, easeOutBack } from '@/lib/scrollUtils';

const STATS = [
  {
    value: '20+',
    label: 'CHAMPIONSHIPS',
    detail: 'Secured across multiple university and public tournaments.',
  },
  {
    value: '300jt+',
    label: 'PRIZE POOL EARNINGS',
    detail: 'Accumulated from tournament victories.',
  },
  {
    value: '5+',
    label: 'ROSTERS',
    detail: 'Elite teams competing across Indonesia and beyond.',
  },
  {
    value: '15+',
    label: 'TOURNAMENTS HOSTED',
    detail: 'Community events fostering competitive esports growth.',
  },
];

function StatCardMobile({ value, label, detail }: (typeof STATS)[number]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="stat-card relative glass-box p-4 rounded-lg border border-white/10 hover:border-white hover:bg-white interactive group overflow-hidden cursor-pointer will-change-transform min-h-[160px]"
    >
      <div className="relative z-10 flex flex-col justify-center transition-transform duration-700 group-hover:-translate-y-2">
        <span
          className="font-oswald text-2xl font-bold text-white group-hover:text-black transition-colors tracking-impact"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          {value}
        </span>
        <span className="text-[10px] font-bold tracking-widest text-gray-500 group-hover:text-black mt-3 block uppercase transition-colors">
          {label}
        </span>
        <p className="text-[9px] text-white leading-tight font-bold mt-3">
          {detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      data-bg="#0a0014"
      id="about-track"
      className="relative z-20 py-16"
    >
      <div className="w-full flex flex-col justify-center">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[20rem] h-[20rem] bg-[#6200a8] rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="relative z-10 w-full px-4">
          {/* QR Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group interactive mb-12"
          >
            <div className="absolute inset-0 bg-[#9b00e8] rounded-xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="clip-reveal relative aspect-[4/5] glass-box rounded-xl border border-white/20 p-4 flex flex-col justify-between overflow-hidden group-hover:-translate-y-4 shadow-2xl transition-transform duration-700">
              <div className="absolute inset-0 bg-hatch opacity-30 mix-blend-overlay" />
              <div className="relative z-10 flex justify-between items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                  alt="QR Registration"
                  className="w-12 h-12 invert opacity-90 rounded-lg bg-white/10 p-2 mix-blend-screen transition-transform duration-700 group-hover:scale-110"
                />
                <span className="text-[9px] tracking-widest font-bold border border-white/30 rounded-full px-2 py-1 bg-[#050505]/80 backdrop-blur-md text-white hover-smooth">
                  ESPORTS
                </span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3
                  className="text-2xl font-oswald font-bold tracking-impact uppercase mb-2 text-white"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  <span className="content-hover">LINK</span>
                  <br />
                  <span className="content-hover">Registrasi</span>
                </h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-[#9b00e8] hover:text-white transition-colors duration-500"
                >
                  <span className="hover-smooth">tinyurl.com/FORTIUSGEN7</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform duration-500">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-xl font-oswald font-bold tracking-widest uppercase mb-6 text-white flex items-center gap-3"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              <span className="content-hover">ABOUT US</span>
              <span className="w-8 h-[2px] bg-[#9b00e8] flex-shrink-0" />
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 tracking-tight">
              <span className="content-hover">
                <strong className="text-white font-medium">Fortius Esports</strong> adalah organisasi olahraga elektronik <strong className="text-white font-medium">Universitas Multimedia Nusantara</strong> yang didirikan pada Februari 2019.
                Kami menyediakan wadah bagi mahasiswa untuk mengeksplorasi dan mengembangkan bakat mereka di dunia esports yang dinamis, baik sebagai pemain kompetitif maupun sebagai bagian dari tim manajemen.
              </span>
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {STATS.map((stat) => (
              <StatCardMobile key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}