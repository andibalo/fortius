const galleryImages = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1564049489314-60d154ff107d?q=80&w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&h=300&fit=crop',
];

export default function FooterSection() {
  return (
    <footer
      data-bg="#050505"
      id="contact"
      className="relative z-20 pt-24 pb-8 border-t border-white/10 overflow-hidden"
    >
      {/* Image strip */}
      <div className="flex gap-4 px-4 overflow-hidden mb-32 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 interactive">
        {galleryImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            className={`${i === 5 ? 'hidden md:block' : ''} w-32 h-32 md:w-56 md:h-56 rounded-2xl object-cover hover:scale-105 transition-transform duration-1000`}
            alt={`Gallery ${i + 1}`}
          />
        ))}
      </div>

      {/* Back to top */}
      <div className="flex flex-col items-center justify-center mb-32">
        <p className="text-sm text-gray-400 tracking-widest uppercase mb-8 text-center max-w-sm font-bold content-hover">
          Forged in the fires of competition. Built for legacy.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-swipe border border-white rounded-full px-12 py-4 text-sm font-bold tracking-widest text-white hover:text-black transition-all duration-500 interactive"
        >
          <span>BACK TO TOP</span>
        </button>
      </div>

      {/* Links */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10">
        <div className="mb-12 md:mb-0">
          <h4
            className="text-white font-oswald text-2xl font-bold mb-6 tracking-wide"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Quick Links
          </h4>
          <div className="flex flex-col gap-3 text-base text-gray-500 font-medium">
            {['Home', 'Gallery', 'Work', 'Contact'].map((label) => (
              <a
                key={label}
                href={label === 'Gallery' ? '#gallery-track' : label === 'Work' ? '#teams' : label === 'Contact' ? '#contact' : '#'}
                className="hover:text-[#9b00e8] hover:pl-2 transition-all interactive"
              >
                <span className="hover-smooth">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-left md:text-right">
          <h4
            className="text-white font-oswald text-2xl font-bold mb-6 tracking-wide"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Networks
          </h4>
          <div className="flex flex-col gap-3 text-base text-gray-500 font-medium">
            {['Instagram', 'Twitter', 'Dribbble'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="hover:text-[#9b00e8] md:hover:pr-2 transition-all interactive"
              >
                <span className="hover-smooth">{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ©2026 large text */}
      <div className="w-full overflow-hidden flex justify-center mt-16 opacity-80 pointer-events-none relative z-10">
        <h1
          className="font-oswald text-[30vw] font-bold tracking-impact-extreme leading-none text-white/5 mix-blend-screen"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          ©2026
        </h1>
      </div>
    </footer>
  );
}
