'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

const NEWS_ITEMS = [
  {
    id: '01',
    category: 'COMMUNITY',
    date: 'JAN 2026',
    title: 'Fortius Website: Your Ultimate Esports Hub',
    description:
      'Fortius Website akan segera hadir sebagai pusat esports yang lengkap. Nantinya, Anda dapat mendaftar turnamen, membeli merchandise resmi, dan selalu mengikuti perkembangan terbaru dunia esports melalui satu platform yang terintegrasi.',
    gradientClass: 'from-[#9b00e8]/20 via-[#c1121f]/10 to-[#050505]',
    badgeClass: 'bg-[#9b00e8] text-white',
    accentColor: '#9b00e8',
  },
  {
    id: '02',
    category: 'RECRUITMENT',
    date: 'JAN 2026',
    title: 'Fortius Newcomers 2026',
    description:
      'Fortius dengan penuh semangat menyambut talenta baru melalui open recruitment pertama di 2026. Kami yakin setiap anggota akan membawa energi dan prestasi gemilang. Ikuti media sosial kami untuk info rekrutmen berikutnya!',
    gradientClass: 'from-[#9b00e8]/70 via-[#4a0070]/50 to-[#0a0010]',
    badgeClass: 'bg-[#9b00e8] text-white',
    accentColor: '#9b00e8',
  },
];

export default function NewsMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section
      ref={sectionRef}
      data-bg="#050505"
      className="relative z-20 py-12"
    >
      <div className="w-full px-4">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-baseline gap-4 mb-8">
            <span
              className="font-oswald font-bold leading-none text-[#9b00e8] text-5xl"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              NEWS
            </span>
            <span className="text-xs font-mono text-gray-500 ml-auto">
              {NEWS_ITEMS.length} ARTICLES
            </span>
          </div>
        </div>

        {/* News cards stack */}
        <div className="space-y-6">
          {NEWS_ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="news-card glass-box bg-[#0e0e0e] rounded-xl border border-white/20 overflow-hidden interactive"
            >
              {/* Image area */}
              <div className={`relative overflow-hidden aspect-[4/3] bg-[#111] bg-gradient-to-br ${item.gradientClass}`}>
                <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                <div className="absolute inset-0 bg-hatch opacity-10" />
                <span
                  className="absolute bottom-3 right-3 font-oswald font-bold text-3xl leading-none opacity-20"
                  style={{ fontFamily: 'var(--font-oswald)', color: item.accentColor }}
                >
                  {item.id}
                </span>
              </div>

              {/* Content area */}
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-[9px] font-bold tracking-widest rounded-full px-2 py-1 uppercase ${item.badgeClass}`}>
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono text-gray-500">{item.date}</span>
                  </div>
                  <h3
                    className="font-oswald text-lg font-bold text-white tracking-impact mb-2 leading-tight"
                    style={{ fontFamily: 'var(--font-oswald)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}