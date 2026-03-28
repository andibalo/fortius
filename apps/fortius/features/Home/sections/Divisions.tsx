'use client';

import { useRef, useEffect } from 'react';
import { clamp, mapRange, easeOutBack } from '@/lib/scrollUtils';

const ITEMS: {
  index: number;
  finalX: number;
  finalY: number;
  finalRot: number;
  className: string;
  imgSrc: string;
  imgAlt: string;
  label?: string;
}[] = [
  { index: 0, finalX: -36, finalY: -30, finalRot: -2, className: 'w-32 md:w-48 aspect-[3/4] opacity-70', imgSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Cairo' },
  { index: 1, finalX: -12, finalY: -30, finalRot: 1, className: 'w-32 md:w-48 aspect-square', imgSrc: 'https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=2000&auto=format&fit=crop', imgAlt: 'Manila' },
  { index: 2, finalX: 12, finalY: -30, finalRot: -1, className: 'w-32 md:w-48 aspect-[4/5]', imgSrc: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop', imgAlt: 'Oslo' },
  { index: 3, finalX: 36, finalY: -30, finalRot: 2, className: 'w-32 md:w-48 aspect-square', imgSrc: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Tokyo' },
  { index: 4, finalX: -42, finalY: 0, finalRot: -1, className: 'w-32 md:w-48 aspect-video', imgSrc: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', imgAlt: 'London' },
  { index: 5, finalX: -21, finalY: 0, finalRot: 2, className: 'w-32 md:w-48 aspect-[3/4]', imgSrc: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Seoul' },
  { index: 6, finalX: 0, finalY: 0, finalRot: 0, className: 'w-56 md:w-80 aspect-[16/9] z-10 glass-box', imgSrc: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Sydney', label: 'SYDNEY' },
  { index: 7, finalX: 21, finalY: 0, finalRot: -1, className: 'w-32 md:w-48 aspect-square', imgSrc: 'https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=2000&auto=format&fit=crop', imgAlt: 'Berlin', label: 'Berlin' },
  { index: 8, finalX: 42, finalY: 0, finalRot: 1, className: 'w-32 md:w-48 aspect-video', imgSrc: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Paris' },
  { index: 9, finalX: -40, finalY: 30, finalRot: 2, className: 'w-32 md:w-48 aspect-square', imgSrc: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Bogota' },
  { index: 10, finalX: -20, finalY: 30, finalRot: -2, className: 'w-32 md:w-48 aspect-video', imgSrc: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop', imgAlt: 'Miami' },
  { index: 11, finalX: 0, finalY: 30, finalRot: 0, className: 'w-32 md:w-48 aspect-video', imgSrc: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Madrid', label: 'MADRID' },
  { index: 12, finalX: 20, finalY: 30, finalRot: -1, className: 'w-32 md:w-48 aspect-[3/4]', imgSrc: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Dallas' },
  { index: 13, finalX: 40, finalY: 30, finalRot: 1, className: 'w-32 md:w-48 aspect-square', imgSrc: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', imgAlt: 'Tokyo 2' },
];

export default function Divisions() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textMoverRef = useRef<HTMLDivElement>(null);
  const TOTAL = ITEMS.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const gProgress = rect.top <= 0
        ? clamp(Math.abs(rect.top) / (section.offsetHeight - vh), 0, 1)
        : 0;

      if (textMoverRef.current) {
        textMoverRef.current.style.transform = `translate3d(-${gProgress * 50}%, 0, 0)`;
      }

      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;
        const { finalX, finalY, finalRot } = ITEMS[i];
        const startP = i * (0.8 / TOTAL);
        const localP = clamp((gProgress - startP) / 0.35, 0, 1);
        const easeSnap = easeOutBack(localP);

        const opacity = mapRange(localP, 0, 0.15, 0, 1);
        const scale = mapRange(easeSnap, 0, 1, 0.05, 1);

        const direction = i % 2 === 0 ? 1 : -1;
        const sweepAngle = mapRange(easeSnap, 0, 1, Math.PI * 1.5, 0);
        const sweepRadiusX = mapRange(easeSnap, 0, 1, 50, 0);
        const spiralX = Math.sin(sweepAngle) * sweepRadiusX * direction;
        const spiralY = mapRange(easeSnap, 0, 1, 100 + i * 8, 0);
        const spiralZ = mapRange(easeSnap, 0, 1, -2000, 0);

        const rotY = mapRange(easeSnap, 0, 1, 90 * direction, 0);
        const rotZ = mapRange(easeSnap, 0, 1, 60 * direction, finalRot);
        const rotX = mapRange(easeSnap, 0, 1, 45, 0);

        wrapper.style.opacity = String(opacity);
        wrapper.style.transform = `translate3d(calc(-50% + ${finalX + spiralX}vw), calc(-50% + ${finalY + spiralY}vh), ${spiralZ}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [TOTAL]);

  return (
    <section
      ref={sectionRef}
      data-bg="#05000a"
      id="gallery-track"
      className="h-[800vh] relative z-20"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-[#4a0070] rounded-full mix-blend-screen filter blur-[250px] opacity-40" />

        {/* Scrolling DIVISION text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-10 pointer-events-none opacity-[0.08] overflow-hidden">
          <div ref={textMoverRef} className="flex whitespace-nowrap will-change-transform w-[400vw]">
            {[...Array(4)].map((_, i) => (
              <h2
                key={i}
                className="font-oswald text-[#9b00e8] text-[25vw] md:text-[20vw] font-bold tracking-impact-extreme uppercase px-8"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                DIVISION
              </h2>
            ))}
          </div>
        </div>

        {/* 3D card grid */}
        <div className="relative w-full max-w-[120rem] mx-auto h-full perspective-scene z-30 pointer-events-none">
          {ITEMS.map(({ index, className, imgSrc, imgAlt, label }) => (
            <div
              key={index}
              ref={(el) => { wrapperRefs.current[index] = el; }}
              className="spiral-wrapper"
            >
              <div
                className={`division-item ${className} rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group interactive pointer-events-auto relative`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  className="w-full h-full object-cover blend-lum group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-1000"
                  alt={imgAlt}
                />
                {label && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center pb-6 opacity-90 group-hover:opacity-100 transition-opacity">
                    <h3
                      className="font-oswald text-3xl md:text-5xl font-bold tracking-impact-extreme text-white drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      {label}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
