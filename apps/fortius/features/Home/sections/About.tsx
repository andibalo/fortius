'use client';

import { motion } from 'motion/react';

const stats = [
  {
    value: '27x',
    label: 'CHAMPIONSHIPS',
    detail: 'Secured across multiple premier global tournaments.',
    delay: 0.1,
  },
  {
    value: '14x',
    label: 'MVP AWARDS',
    detail: 'Recognizing unparalleled individual dominance on stage.',
    delay: 0.2,
  },
  {
    value: '5+',
    label: 'ROSTERS',
    detail: 'Active elite rosters competing globally across regions.',
    delay: 0.3,
  },
  {
    value: '1M+',
    label: 'COMMUNITY',
    detail: 'Dedicated fanbase actively supporting our global legacy.',
    delay: 0.4,
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.2, delay, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
});

export default function About() {
  return (
    <section
      data-bg="#0a0014"
      className="min-h-screen relative z-10 py-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* QR / Registration Card */}
        <div className="lg:col-span-5 relative group interactive animate-float-1" data-parallax="0.15">
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
                <span className="content-hover">PENDAFTARAN</span>
              </h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-mono text-[#9b00e8] hover:text-white transition-colors duration-500"
              >
                <span className="hover-smooth">tinyurl.com/FORTIUSGEN7</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-2 transition-transform duration-500"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: text + stats */}
        <div className="lg:col-span-7 flex flex-col justify-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-2xl md:text-4xl text-white mb-8 font-bold tracking-widest uppercase flex items-center gap-6 font-oswald"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              <span className="content-hover">ABOUT US</span>
              <span className="w-24 h-[2px] bg-[#9b00e8] flex-shrink-0" />
            </h2>
            <p className="text-xl md:text-3xl text-gray-400 leading-tight font-light mb-12 max-w-4xl tracking-tight">
              <span className="content-hover">
                Founded with a vision to redefine competitive gaming. Fortius is more than a team; it&apos;s a{' '}
                <strong className="text-white font-medium">
                  syndicate of elite talent, strategic minds, and creative visionaries.
                </strong>{' '}
                We blend raw mechanical skill with sophisticated macro gameplay to dismantle opponents across every major title.
              </span>
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-16 md:mt-24 w-full items-start">
            {stats.map(({ value, label, detail, delay }) => (
              <motion.div
                key={label}
                {...fadeUp(delay)}
                className="stat-card relative glass-box p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white hover:bg-white interactive group overflow-hidden cursor-pointer"
              >
                <div className="relative z-10 flex flex-col justify-center transition-transform duration-700 group-hover:-translate-y-2">
                  <span
                    className="font-oswald text-5xl lg:text-6xl font-bold text-white group-hover:text-black transition-colors tracking-impact"
                    style={{ fontFamily: 'var(--font-oswald)' }}
                  >
                    {value}
                  </span>
                  <span className="text-xs md:text-sm font-bold tracking-widest text-gray-500 group-hover:text-black mt-5 block uppercase transition-colors">
                    {label}
                  </span>
                  <div className="expandable-content">
                    <div className="expandable-inner">
                      <p className="text-[11px] md:text-xs text-gray-800 leading-tight font-bold pb-2">{detail}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
