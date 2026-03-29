'use client';

import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer
      data-bg="#050505"
      id="contact"
      className="relative z-20 border-t border-white/10 overflow-hidden"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start px-6 md:px-12 py-12 md:py-16">
            <div className="w-full text-center md:text-left mb-8 md:mb-12">
              <p className="text-xs md:text-[11px] lg:text-sm text-gray-400 leading-relaxed font-medium content-hover">
Universitas Multimedia Nusantara Jl. Scientia Boulevard, Gading Serpong Tangerang, Banten  -  15811  Indonesia
              </p>
              <p className="text-xs md:text-[11px] lg:text-sm text-gray-400 leading-relaxed font-medium content-hover">
                 (t) +62-21.5422.0808; (f) +62-21.5422.0800
              </p>
            </div>
            <div className="w-full flex justify-center md:justify-start mb-3">
              <a
                href="https://instagram.com/fortiusesports"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[color:var(--primary)] transition-colors interactive flex items-center gap-3"
                aria-label="Fortius Esports Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm4.25 4a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.5 6.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
                <span className="text-xs md:text-[11px] lg:text-sm font-medium">@fortiusesports</span>
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center justify-center py-12 md:py-16 md:py-0">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-6 relative">
                <Image
                  src="/logo.png"
                  alt="Fortius Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <p className="text-xs md:text-[11px] text-center text-gray-400 font-medium">FORTIUS ESPORTS</p>
              <p className="text-[10px] md:text-[9px] text-center text-gray-500 mt-2">© 2026 All Rights Reserved</p>
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center md:items-end px-6 md:px-12 py-12 md:py-16">
            <div className="flex items-center justify-center md:justify-end gap-6">
              <a href="#" className="group">
                  <Image
                    src="/images/logo-bem.png"
                    alt="BEM Logo"
                    width={100}
                    height={100}
                    className="w-full h-24 object-contain p-2"
                  />
              </a>
              <a href="#" className="group">
                  <Image
                    src="/images/logo-umn.png"
                    alt="UMN Logo"
                    width={100}
                    height={100}
                    className="w-full h-24 object-contain p-2"
                  />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HUD Status Bar */}
      <div className="w-full border-t border-white/20 bg-black/40 backdrop-blur-xl flex justify-between items-center px-6 md:px-12 py-3 text-[10px] md:text-xs font-bold tracking-widest text-white uppercase z-20">
        <span className="content-hover">Fortius Esports // 2026</span>
        <span className="hidden md:block text-[#9b00e8] content-hover">Dominate</span>
        <span className="hidden md:block text-[#9b00e8] content-hover">Win</span>
        <span className="content-hover">Fight. Dominate. Win.</span>
      </div>
    </footer>
  );
}
