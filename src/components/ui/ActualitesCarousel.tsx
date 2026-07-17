"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

type Actualite = {
  _id: string;
  titre: string;
  slug: string;
  categorie: string;
  date: string;
  resume: string;
};

function IconArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function Card({ a }: { a: Actualite }) {
  return (
    <Link
      href={`/actualites/${a.slug}`}
      className="group bg-white border border-splj-bordeaux/10 p-5 flex flex-col gap-3 hover:border-splj-bordeaux/30 hover:shadow-sm transition-all h-full"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux/50">
        {a.categorie}
      </p>
      <h3 className="font-bold text-splj-bordeaux text-base leading-snug group-hover:underline underline-offset-2 flex-1">
        {a.titre}
      </h3>
      <p className="text-sm text-splj-bordeaux/70 line-clamp-3">{a.resume}</p>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-1.5 text-xs text-splj-bordeaux/50">
          <IconCalendar />
          <span>{formatDate(a.date)}</span>
        </div>
        <span className="text-xs text-splj-bordeaux/40 group-hover:text-splj-bordeaux transition-colors flex items-center gap-1">
          Lire
          <IconArrowRight />
        </span>
      </div>
    </Link>
  );
}

const VISIBLE = 3;

export default function ActualitesCarousel({ items }: { items: Actualite[] }) {
  const [index, setIndex] = useState(0);
  const N = items.length;
  const max = Math.max(0, N - VISIBLE);

  return (
    <div>
      {/* Mobile: stack all */}
      <div className="flex flex-col gap-4 md:hidden">
        {items.map((a) => (
          <Card key={a._id} a={a} />
        ))}
      </div>

      {/* Desktop: sliding carousel */}
      <div className="hidden md:block">
        <div className="overflow-hidden -mx-2">
          <div
            className="flex"
            style={{
              width: `${(N / VISIBLE) * 100}%`,
              transform: `translateX(-${index * (100 / N)}%)`,
              transition: "transform 0.35s ease-in-out",
            }}
          >
            {items.map((a) => (
              <div
                key={a._id}
                style={{ width: `${100 / N}%` }}
                className="px-2"
              >
                <Card a={a} />
              </div>
            ))}
          </div>
        </div>

        {N > VISIBLE && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {Array.from({ length: max + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-splj-bordeaux"
                      : "w-1.5 bg-splj-bordeaux/25 hover:bg-splj-bordeaux/50"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="w-9 h-9 flex items-center justify-center border border-splj-bordeaux/20 text-splj-bordeaux disabled:opacity-30 disabled:pointer-events-none hover:bg-splj-bordeaux hover:text-splj-creme hover:border-splj-bordeaux transition-all"
                aria-label="Précédent"
              >
                <IconArrowLeft />
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(max, i + 1))}
                disabled={index >= max}
                className="w-9 h-9 flex items-center justify-center border border-splj-bordeaux/20 text-splj-bordeaux disabled:opacity-30 disabled:pointer-events-none hover:bg-splj-bordeaux hover:text-splj-creme hover:border-splj-bordeaux transition-all"
                aria-label="Suivant"
              >
                <IconArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
