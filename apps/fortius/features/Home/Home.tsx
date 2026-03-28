'use client';

import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/components/layout/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import VisionMission from './sections/VisionMission';
import Teams from './sections/Teams';
import Divisions from './sections/Divisions';
import News from './sections/News';
import QnA from './sections/QnA';
import FooterSection from './sections/FooterSection';

export default function HomeClient() {
  useLenis();

  return (
    <>
      {/* Background marquee (fixed, behind everything) */}
      <div
        id="main-marquee"
        className="fixed top-[15%] left-0 w-full z-0 opacity-[0.04] pointer-events-none overflow-hidden mix-blend-screen"
      >
        <div className="flex w-[200vw] md:w-[200%] animate-scroll-lr will-change-transform">
          <h1
            className="text-outline text-[25vw] md:text-[16vw] font-oswald font-bold whitespace-nowrap px-4 tracking-impact-extreme"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            OUR VISION AND MISSION • OUR VISION AND MISSION •{' '}
          </h1>
          <h1
            className="text-outline text-[25vw] md:text-[16vw] font-oswald font-bold whitespace-nowrap px-4 tracking-impact-extreme"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            OUR VISION AND MISSION • OUR VISION AND MISSION •{' '}
          </h1>
        </div>
      </div>
      <Navigation />
      <Hero />
      <About />
      <VisionMission />
      <Teams />
      <Divisions />
      <News />
      <QnA />
      <FooterSection />
    </>
  );
}
