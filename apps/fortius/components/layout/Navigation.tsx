import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
      {/* Logo */}
      <div className="font-oswald text-2xl font-bold tracking-widest pointer-events-auto interactive flex items-center gap-2 transition-transform duration-500 hover:scale-105">
        <Image
          src="/logo.png"
          alt="Fortius Logo"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <span className="hover-smooth ml-1">FORTIUS</span>
      </div>

      {/* Nav Icons */}
      <div className="flex gap-6 nav-links pointer-events-auto interactive">
        {/* Home */}
        <a href="#" className="hover:text-gray-300 transition-colors group relative" aria-label="Home">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110 duration-500"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 font-bold tracking-widest">
            HOME
          </span>
        </a>

        {/* Gallery */}
        <a href="#gallery-track" className="hover:text-gray-300 transition-colors group relative" aria-label="Gallery">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110 duration-500"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 font-bold tracking-widest">
            GALLERY
          </span>
        </a>

        {/* Teams */}
        <a href="#teams" className="hover:text-gray-300 transition-colors group relative" aria-label="Teams">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:scale-110 duration-500"
          >
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 font-bold tracking-widest">
            TEAMS
          </span>
        </a>
      </div>
    </nav>
  );
}
