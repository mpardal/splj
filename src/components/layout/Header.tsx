"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className="flex flex-row justify-between items-center md:flex-col gap-1 bg-splj-bordeaux-medium
    text-splj-creme px-3 md:pl-0"
      >
        <div className="flex items-center gap-3 md:mx-auto my-5">
          {/* Croix SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="10" y="0" width="4" height="24" fill="#F5D87A" />
            <rect x="0" y="8" width="24" height="4" fill="#F5D87A" />
          </svg>
          <div className="flex flex-col">
            <span className="font-bold">SAINT PIERRE-LE-JEUNE</span>
            <span className="font-extralight text-sm text-splj-or/70">
              STRASBOURG
            </span>
          </div>
        </div>
        <hr className="hidden md:block text-splj-creme/10 w-[70%] mx-auto" />
        <nav className="hidden md:flex flex-row gap-3 tracking-widest text-xs my-3 mx-auto pb-3">
          <Link href="/" className="hover:text-splj-or">
            ACCUEIL
          </Link>
          <Link href="/paroisse" className="hover:text-splj-or">
            LA PAROISSE
          </Link>
          <Link href="/sacrements" className="hover:text-splj-or">
            SACREMENTS
          </Link>
          <Link href="/groupes" className="hover:text-splj-or">
            GROUPES
          </Link>
          <Link href="/agenda" className="hover:text-splj-or">
            AGENDA
          </Link>
          <Link href="/contact" className="hover:text-splj-or">
            CONTACT
          </Link>
        </nav>
        <button
          className="flex flex-col gap-1 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="block w-5 h-0.5 bg-splj-or"></span>
          <span className="block w-5 h-0.5 bg-splj-or"></span>
          <span className="block w-5 h-0.5 bg-splj-or"></span>
        </button>
      </header>

      {isMenuOpen && (
        <nav
          className="md:hidden flex flex-col gap-3 tracking-widest text-xs z-20
        bg-splj-bordeaux-medium text-splj-creme py-5 px-20 h-full"
        >
          <Link
            href="/"
            className="hover:text-splj-or flex justify-between items-center"
          >
            <span>ACCUEIL</span>
            <svg
              className="w-2 h-2 text-splj-creme dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </Link>
          <Link
            href="/paroisse"
            className="hover:text-splj-or flex justify-between items-center"
          >
            <span>LA PAROISSE</span>
            <svg
              className="w-2 h-2 text-splj-creme dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </Link>
          <Link
            href="/sacrements"
            className="hover:text-splj-or flex justify-between items-center"
          >
            <span>SACREMENTS</span>
            <svg
              className="w-2 h-2 text-splj-creme dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </Link>
          <Link
            href="/groupes"
            className="hover:text-splj-or flex justify-between items-center"
          >
            <span>GROUPES</span>
            <svg
              className="w-2 h-2 text-splj-creme dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </Link>
          <Link
            href="/agenda"
            className="hover:text-splj-or flex justify-between items-center"
          >
            <span>AGENDA</span>
            <svg
              className="w-2 h-2 text-splj-creme dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="hover:text-splj-or flex justify-between items-center"
          >
            <span>CONTACT</span>
            <svg
              className="w-2 h-2 text-splj-creme dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
              />
            </svg>
          </Link>
        </nav>
      )}
    </>
  );
}
