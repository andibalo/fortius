"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "About", href: "/about" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const radians = (angleDeg * Math.PI) / 180;
  return {
    x: cx + Math.cos(radians) * r,
    y: cy + Math.sin(radians) * r,
  };
}

function describeRingSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
) {
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export default function Navigation() {
  const overlayId = useId();
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setHoveredIndex(null);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  const activeItem = NAV_ITEMS.find((item) => isActivePath(pathname, item.href));
  const activeLabel = (activeItem?.label ?? "Menu").toUpperCase();

  const wheelSize = 360;
  const radius = 140;
  const cx = wheelSize / 2;
  const cy = wheelSize / 2;
  const outerR = cx - 6;
  const innerR = 110;
  const slice = 360 / NAV_ITEMS.length;
  const gap = 3;

  const getIndexFromPointer = (clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < innerR || distance > outerR) {
      return null;
    }

    const angleFromTopCW = (Math.atan2(dy, dx) * 180) / Math.PI;
    const normalized = (angleFromTopCW + 90 + 360) % 360;
    const index = Math.floor((normalized + slice / 2) / slice) % NAV_ITEMS.length;

    const centerAngle = index * slice;
    const diff = Math.abs((((normalized - centerAngle + 540) % 360) - 180));
    const withinSlice = diff <= slice / 2 - gap / 2;

    return withinSlice ? index : null;
  };

  const updateHoveredFromPointer = (clientX: number, clientY: number) => {
    const next = getIndexFromPointer(clientX, clientY);
    setHoveredIndex((prev) => (prev === next ? prev : next));
  };

  const onWheelPointerDown = (clientX: number, clientY: number) => {
    const index = getIndexFromPointer(clientX, clientY);
    if (index === null) return;
    const href = NAV_ITEMS[index]?.href;
    if (!href) return;
    closeMenu();
    router.push(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
        <Link
          href="/"
          className="font-oswald text-2xl font-bold tracking-widest pointer-events-auto interactive flex items-center gap-2 transition-transform duration-500 hover:scale-105"
          aria-label="Go to home"
          onClick={closeMenu}
        >
          <Image src="/logo.png" alt="Fortius Logo" width={32} height={32} className="h-8 w-auto" />
          <span className="hover-smooth ml-1">FORTIUS</span>
        </Link>
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls={overlayId}
          className="pointer-events-auto interactive relative h-11 w-11 rounded-full flex items-center justify-center"
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          <span
            aria-hidden="true"
            className={
              "absolute block h-[2px] w-6 bg-current transition-transform duration-700 ease-[var(--ease-out-expo)] " +
              (isOpen ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0")
            }
          />
          <span
            aria-hidden="true"
            className={
              "absolute block h-[2px] w-6 bg-current transition-transform duration-700 ease-[var(--ease-out-expo)] " +
              (isOpen ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0")
            }
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={overlayId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[95] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-[color:var(--color-dark)]/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.92, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotate: 12 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              style={{ width: wheelSize, height: wheelSize }}
              ref={wheelRef}
              onPointerMove={(e) => updateHoveredFromPointer(e.clientX, e.clientY)}
              onPointerLeave={() => setHoveredIndex(null)}
              onPointerDown={(e) => onWheelPointerDown(e.clientX, e.clientY)}
            >
              <svg
                className="absolute inset-0"
                viewBox={`0 0 ${wheelSize} ${wheelSize}`}
                aria-hidden="true"
              >
                {NAV_ITEMS.map((item, index) => {
                  const segmentCenter = -90 + slice * index;
                  const start = segmentCenter - slice / 2 + gap / 2;
                  const end = segmentCenter + slice / 2 - gap / 2;
                  const active = isActivePath(pathname, item.href);
                  const isHighlighted = hoveredIndex === index || (hoveredIndex === null && active);

                  return (
                    <path
                      key={item.href}
                      d={describeRingSegmentPath(cx, cy, innerR, outerR, start, end)}
                      fill={isHighlighted ? "var(--primary)" : "white"}
                      fillOpacity={isHighlighted ? 0.22 : 0.06}
                      stroke={isHighlighted ? "var(--primary)" : "white"}
                      strokeOpacity={isHighlighted ? 0.65 : 0.12}
                      strokeWidth={1}
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}

              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-center px-6">
                  <div className="font-oswald tracking-widest">
                    <div className="text-[11px] opacity-70">ACTIVE</div>
                    <div className="text-lg font-bold" style={{ color: "var(--primary)" }}>
                      {activeLabel}
                    </div>
                    <div className="sr-only" aria-label="Menu links">
                      {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href} onClick={closeMenu}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Slots */}
              {NAV_ITEMS.map((item, index) => {
                const angle = -90 + (360 / NAV_ITEMS.length) * index;
                const radians = (angle * Math.PI) / 180;
                const x = Math.cos(radians) * radius;
                const y = Math.sin(radians) * radius;
                const active = isActivePath(pathname, item.href);

                return (
                  <div
                    key={item.href}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      style={{ x, y }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{
                        delay: 0.08 + index * 0.04,
                        duration: 0.55,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                    >
                      <div
                        className="pointer-events-none flex items-center justify-center h-14 w-14 md:h-16 md:w-16"
                        aria-hidden="true"
                      >
                        <span
                          className={
                            "font-oswald text-[10px] md:text-[11px] font-bold tracking-widest transition-colors duration-500 " +
                            (active ? "text-[color:var(--primary)]" : "text-white/80")
                          }
                        >
                          {item.label.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
