import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

const HeroParticleSphere = dynamic(() => import('./HeroParticleSphere'), { ssr: false });

const words = [
  { text: 'FIGHT', className: 'text-white', delay: 0 },
  { text: 'DOMINATE', className: 'text-white', delay: 0.1 },
  { text: 'WIN', className: 'text-[#9b00e8]', delay: 0.2 },
];

export default function Hero() {
  return (
    <section
      data-bg="#050505"
      className="min-h-screen relative flex flex-col justify-center overflow-hidden z-10 pt-20 pb-40"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Large glow blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] md:w-[90rem] h-[60rem] md:h-[90rem] bg-[#4a0070] rounded-full mix-blend-screen filter blur-[200px] md:blur-[300px] opacity-60 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[20rem] h-[20rem] bg-white rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-float-1 pointer-events-none" />

      {/* Three.js sphere */}
      <HeroParticleSphere />

      {/* FIGHT / DOMINATE / WIN */}
      <div className="px-6 md:px-12 w-full max-w-screen-2xl mx-auto relative z-30 grid grid-cols-1 gap-4 items-center pointer-events-none">
        <div
          className="flex flex-col w-max font-oswald text-[15vw] md:text-[8rem] lg:text-[10rem] font-bold tracking-impact uppercase drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          {words.map(({ text, className, delay }) => (
            <div key={text} className="overflow-hidden pb-4 md:pb-6">
              <motion.div
                className={`whitespace-nowrap pr-8 content-hover ${className}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.8 + delay, ease: [0.19, 1, 0.22, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Large background FORTIUS text */}
      <div className="w-full absolute bottom-4 md:bottom-8 flex flex-col items-center justify-center opacity-10 z-20 pointer-events-none">
        <div className="animate-snap-down text-center will-change-transform">
          <h1
            className="text-[35vw] md:text-[28vw] font-oswald font-bold tracking-impact-extreme text-white leading-[0.75]"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            FORTIUS
          </h1>
        </div>
      </div>

      {/* HUD status bar */}
      <div className="absolute bottom-0 w-full border-y border-white/20 bg-black/40 backdrop-blur-xl flex justify-between px-6 py-4 text-[10px] md:text-xs font-bold tracking-widest text-white uppercase z-20">
        <span className="content-hover">Fortius Esports // 2026</span>
        <span className="hidden md:block text-[#9b00e8] content-hover">Dominate</span>
        <span className="hidden md:block text-[#9b00e8] content-hover">Win</span>
        <span className="content-hover">Fight. Dominate. Win.</span>
      </div>
    </section>
  );
}
