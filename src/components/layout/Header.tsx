"use client";

import Logo from "@/components/ui/Logo";
import { useState, useRef } from "react";
import Link from "next/link";
import { navigation, type NavSection } from "@/lib/navigation";

function DesktopDropdown({ section }: { section: NavSection }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  if (!section.items?.length) {
    return (
      <Link
        href={section.href}
        className="hover:text-splj-or uppercase tracking-widest text-xs whitespace-nowrap transition-colors duration-150"
      >
        {section.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={section.href}
        className="hover:text-splj-or uppercase tracking-widest text-xs whitespace-nowrap transition-colors duration-150"
        onClick={() => setOpen(false)}
      >
        {section.label}
      </Link>
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-splj-creme shadow-xl border border-splj-bordeaux/10 z-50 min-w-52 overflow-hidden
          transition-all duration-200 origin-top
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-splj-creme border-l border-t border-splj-bordeaux/10 rotate-45" />
        {section.items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={`block px-5 py-2.5 text-xs text-splj-bordeaux hover:bg-splj-bordeaux hover:text-splj-creme whitespace-nowrap transition-colors duration-100
              ${i < (section.items?.length ?? 0) - 1 ? "border-b border-splj-bordeaux/8" : ""}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-splj-bordeaux text-splj-creme shadow-md">
        <div className="flex items-center justify-between px-4 md:px-8 py-0">
          <Logo isFooter={false} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 tracking-widest text-xs">
            {navigation.map((section) => (
              <DesktopDropdown key={section.label} section={section} />
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="flex flex-col gap-1.5 md:hidden p-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <span className="block w-5 h-0.5 bg-splj-or" />
            <span className="block w-5 h-0.5 bg-splj-or" />
            <span className="block w-5 h-0.5 bg-splj-or" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-splj-bordeaux text-splj-creme flex flex-col md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header row inside overlay */}
        <div className="flex items-center justify-between px-4 py-0 border-b border-splj-creme/10">
          <Logo isFooter={false} />
          <button
            className="p-2 hover:text-splj-or transition-colors"
            onClick={close}
            aria-label="Fermer le menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col px-6 py-4 flex-1">
          {navigation.map((section) => (
            <div key={section.label} className="border-b border-splj-creme/10">
              <div className="flex items-center justify-between py-4">
                <Link
                  href={section.href}
                  className="uppercase tracking-widest text-sm hover:text-splj-or transition-colors"
                  onClick={close}
                >
                  {section.label}
                </Link>
                {section.items?.length ? (
                  <svg className="w-4 h-4 text-splj-creme/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M9 18l6-6-6-6" />
                  </svg>
                ) : null}
              </div>
            </div>
          ))}

          <Link
            href="/contact"
            onClick={close}
            className="mt-8 flex items-center justify-center gap-2 bg-splj-or text-splj-bordeaux uppercase tracking-widest text-sm font-semibold py-4 px-6 transition-opacity hover:opacity-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            Nous contacter
          </Link>
        </nav>
      </div>
    </>
  );
}
