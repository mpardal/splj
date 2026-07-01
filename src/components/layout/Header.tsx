"use client";

import Logo from "@/components/ui/Logo";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { navigation, standaloneLinks, type NavSection } from "@/lib/navigation";

function DesktopDropdown({ section }: { section: NavSection }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const firstHref = section.items[0]?.href ?? "#";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={firstHref}
        className="hover:text-splj-or uppercase tracking-widest text-xs whitespace-nowrap transition-colors duration-150"
        onClick={() => setOpen(false)}
      >
        {section.label}
      </Link>

      {/* Dropdown */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-splj-creme shadow-xl border border-splj-bordeaux/10 z-50 min-w-52 overflow-hidden
          transition-all duration-200 origin-top
          ${open ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"}`}
      >
        {/* Triangle pointeur */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-splj-creme border-l border-t border-splj-bordeaux/10 rotate-45" />

        {section.items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={`block px-5 py-2.5 text-xs text-splj-bordeaux hover:bg-splj-bordeaux hover:text-splj-creme whitespace-nowrap transition-colors duration-100
              ${i < section.items.length - 1 ? "border-b border-splj-bordeaux/8" : ""}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileSection({
  section,
  onClose,
}: {
  section: NavSection;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const firstHref = section.items[0]?.href ?? "#";

  return (
    <div>
      <div className="flex justify-between items-center border-b border-splj-creme/10">
        <Link
          href={firstHref}
          className="flex-1 py-3 text-sm hover:text-splj-or uppercase tracking-widest transition-colors duration-150"
          onClick={onClose}
        >
          {section.label}
        </Link>
        <button
          className="px-3 py-3 hover:text-splj-or transition-colors duration-150"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir sous-menu"
        >
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-4 border-l-2 border-splj-or/40 ml-3 py-1">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="block py-2 text-xs text-splj-creme/80 hover:text-splj-or transition-colors duration-150"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-splj-bordeaux-medium text-splj-creme shadow-md">
      {/* Barre principale */}
      <div className="flex flex-row justify-between items-center md:flex-col gap-1 px-3 md:px-0">
        <Logo isFooter={false} />
        <hr className="hidden md:block border-splj-creme/10 w-[70%] mx-auto" />

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-row flex-wrap gap-x-5 gap-y-2 tracking-widest text-xs my-3 mx-auto pb-3 justify-center px-4">
          {navigation.map((section) => (
            <DesktopDropdown key={section.label} section={section} />
          ))}
          {standaloneLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-splj-or uppercase tracking-widest text-xs whitespace-nowrap transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-splj-or transition-all duration-200 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-splj-or transition-all duration-200 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-splj-or transition-all duration-200 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col bg-splj-bordeaux-medium text-splj-creme pb-4 px-6">
          {navigation.map((section) => (
            <MobileSection key={section.label} section={section} onClose={close} />
          ))}
          {standaloneLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-sm hover:text-splj-or uppercase tracking-widest border-b border-splj-creme/10 transition-colors duration-150"
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}