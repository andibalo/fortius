const teams = [
  {
    id: '01',
    name: 'VALORANT',
    category: 'Tactical FPS',
    detail: 'Recognized for bold execution, visual rhythm, and design consistency.',
    dotColor: 'bg-white',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '02',
    name: ['MOBILE', 'LEGENDS'],
    category: 'Mobile MOBA',
    detail: 'Awarded for outstanding execution, seamless animation, and originality.',
    dotColor: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '03',
    name: ['PUBG', 'MOBILE'],
    category: 'Battle Royale',
    detail: 'Celebrated for front end excellence, design innovation, and development.',
    dotColor: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function Teams() {
  return (
    <section
      data-bg="#150020"
      id="teams"
      className="relative z-30 pb-32 pt-20 border-t border-white/5"
    >
      {/* Sticky marquee header */}
      <div className="sticky top-0 w-full overflow-hidden border-y border-white/10 py-4 z-20 shadow-2xl backdrop-blur-md bg-black/30">
        <div className="flex w-[200vw] md:w-[200%] animate-scroll-rl will-change-transform">
          <h2
            className="text-outline text-7xl md:text-[8rem] font-oswald font-bold whitespace-nowrap px-8 tracking-impact-extreme uppercase"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS •{' '}
          </h2>
          <h2
            className="text-outline text-7xl md:text-[8rem] font-oswald font-bold whitespace-nowrap px-8 tracking-impact-extreme uppercase"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS • TEAMS •{' '}
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col relative z-20 mt-12">
        {/* Column headers */}
        <div className="hidden md:flex justify-between items-center gap-8 px-6 md:px-12 py-4 text-xs font-bold tracking-widest text-gray-500 uppercase border-b border-white/20">
          <div className="w-24">ID</div>
          <div className="flex-1">DIVISION</div>
          <div className="w-64 text-right">CATEGORY</div>
        </div>

        {/* Team rows */}
        {teams.map(({ id, name, category, detail, dotColor, image }) => (
          <div
            key={id}
            className="team-row group cursor-pointer relative px-6 md:px-12 border-b border-white/10 interactive overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
              {/* ID + Name */}
              <div className="flex items-center gap-4 md:gap-8 shrink-0">
                <div className="text-2xl md:text-3xl text-gray-500 font-bold font-mono group-hover:text-[#9b00e8] transition-colors duration-500">
                  {id}
                </div>
                <h3
                  className="font-oswald text-5xl md:text-6xl lg:text-[5.5rem] font-bold uppercase text-white group-hover:text-[#9b00e8] tracking-impact transition-colors duration-500 leading-none"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  {Array.isArray(name) ? (
                    <>
                      {name[0]}
                      <br className="hidden md:block" />
                      {name[1]}
                    </>
                  ) : (
                    name
                  )}
                </h3>
              </div>

              {/* Reveal image */}
              <div className="team-image-reveal md:block rounded-2xl overflow-hidden border border-[#9b00e8]/30 shadow-[0_0_30px_rgba(155,0,232,0.4)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-[800ms] mix-blend-luminosity group-hover:mix-blend-normal"
                  alt={Array.isArray(name) ? name.join(' ') : name}
                />
              </div>

              {/* Category + detail */}
              <div className="md:text-right text-gray-400 group-hover:text-white transition-colors duration-500 min-w-0 flex-shrink flex-1 md:flex-none ml-auto md:max-w-[280px] mt-4 md:mt-0">
                <h4 className="font-bold mb-0 tracking-widest text-sm uppercase flex items-center md:justify-end gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${dotColor} group-hover:bg-[#9b00e8] transition-colors duration-500 shadow-[0_0_10px_rgba(155,0,232,0.8)]`}
                  />
                  {category}
                </h4>
                <div className="expandable-content">
                  <div className="expandable-inner">
                    <p className="text-sm leading-relaxed font-medium pb-2">
                      <span className="content-hover">{detail}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
