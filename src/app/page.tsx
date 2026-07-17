import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { MESSES_QUERY, ACTUALITES_HOMEPAGE_QUERY } from "@/sanity/queries";
import ActualitesCarousel from "@/components/ui/ActualitesCarousel";

type Messe = { _id: string; jour: string; heure: string; label: string; note?: string | null };
type Actualite = { _id: string; titre: string; slug: string; categorie: string; date: string; resume: string };

const MESSES_FALLBACK: Messe[] = [
  { _id: "1", jour: "Mardi", heure: "18h30", label: "Messe du soir", note: null },
  { _id: "2", jour: "Mercredi", heure: "18h30", label: "Messe du soir", note: null },
  { _id: "3", jour: "Jeudi", heure: "18h30", label: "Messe du soir", note: null },
  { _id: "4", jour: "Vendredi", heure: "18h30", label: "Messe du soir", note: null },
  { _id: "5", jour: "Samedi", heure: "18h00", label: "Messe du soir", note: null },
  { _id: "6", jour: "Dimanche", heure: "10h30", label: "Messe dominicale", note: null },
  { _id: "7", jour: "Dimanche", heure: "18h00", label: "Messe du soir", note: null },
];

const sacrements = [
  { label: "Baptême", href: "/sacrements/bapteme-enfants", icon: <IconBapteme /> },
  { label: "Mariage", href: "/sacrements/preparation-mariage", icon: <IconMariage /> },
  { label: "Catéchisme", href: "/sacrements/premiere-communion", icon: <IconCatechisme /> },
  { label: "Confirmation", href: "/sacrements/confirmation-jeunes", icon: <IconConfirmation /> },
  { label: "Funérailles", href: "/funerailles", icon: <IconFunerailles /> },
  { label: "Eucharistie", href: "/sacrements", icon: <IconEucharistie /> },
];

function IconBapteme() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2c0 0-7 9-7 13a7 7 0 0 0 14 0c0-4-7-13-7-13z" />
    </svg>
  );
}

function IconMariage() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconCatechisme() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function IconConfirmation() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function IconFunerailles() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2c1 2 2 4 2 6H10c0-2 1-4 2-6z" fill="currentColor" stroke="none" />
      <rect x="9" y="8" width="6" height="12" rx="1" />
      <line x1="12" y1="8" x2="12" y2="20" />
    </svg>
  );
}

function IconEucharistie() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 3h8l-2 7H10L8 3z" />
      <path d="M10 10c0 3-2 5-2 7h8c0-2-2-4-2-7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 shrink-0">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

export default async function Home() {
  const [messesFromSanity, actualites]: [Messe[], Actualite[]] = await Promise.all([
    client.fetch(MESSES_QUERY, {}, { next: { revalidate: 300 } }),
    client.fetch(ACTUALITES_HOMEPAGE_QUERY, {}, { next: { revalidate: 300 } }),
  ]);
  const messes: Messe[] = messesFromSanity?.length ? messesFromSanity : MESSES_FALLBACK;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-splj-bordeaux text-splj-creme overflow-hidden">
        {/* Watermark cross */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none select-none" aria-hidden>
          <svg width="260" height="340" viewBox="0 0 260 340" fill="currentColor">
            <rect x="110" y="0" width="40" height="340" />
            <rect x="0" y="110" width="260" height="40" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28 text-center md:text-left">
          <p className="text-splj-or text-xs uppercase tracking-widest mb-4">
            Paroisse catholique — Strasbourg
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Bienvenue à Saint Pierre-Le-Jeune
          </h1>
          <p className="text-splj-creme/70 text-lg mb-10">
            Une communauté vivante au cœur de Strasbourg
          </p>

          {/* Desktop: single button */}
          <div className="hidden md:flex">
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 bg-splj-or text-splj-bordeaux font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
            >
              <IconCalendar />
              Voir les horaires de messes
            </Link>
          </div>

          {/* Mobile: two buttons */}
          <div className="flex md:hidden gap-3">
            <Link
              href="/agenda"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-splj-or text-splj-bordeaux font-semibold px-4 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              <IconCalendar />
              Messes
            </Link>
            <Link
              href="/la-paroisse"
              className="flex-1 inline-flex items-center justify-center gap-2 border border-splj-creme/40 text-splj-creme px-4 py-3 text-sm uppercase tracking-widest hover:border-splj-or hover:text-splj-or transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
              </svg>
              Paroisse
            </Link>
          </div>
        </div>
      </section>

      {/* ── Messes de la semaine ── */}
      <section className="bg-white border-b border-splj-bordeaux/8">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-splj-bordeaux mb-6">
            <IconClock />
            <h2 className="text-xs font-bold uppercase tracking-widest">Messes de la semaine</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {messes.map((m) => (
              <div
                key={m._id}
                className="relative flex flex-col gap-2 border border-splj-bordeaux/10 bg-splj-creme p-4 overflow-hidden group"
              >
                {/* Gold top accent bar */}
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-splj-or" />

                <p className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux/50 mt-1">
                  {m.jour}
                </p>
                <p className="text-2xl font-bold text-splj-bordeaux leading-none">
                  {m.heure}
                </p>
                <p className="text-xs text-splj-bordeaux/60 leading-snug">{m.label}</p>
                {m.note && (
                  <p className="text-xs text-splj-bordeaux/40 italic leading-snug">{m.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Actualités ── */}
      <section className="bg-splj-creme py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-splj-bordeaux">Actualités</h2>
            <Link
              href="/actualites"
              className="text-sm text-splj-bordeaux/60 hover:text-splj-bordeaux transition-colors flex items-center gap-1"
            >
              Toutes les actualités
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {actualites.length === 0 ? (
            <p className="text-sm text-splj-bordeaux/50 italic">Aucune actualité pour le moment.</p>
          ) : (
            <ActualitesCarousel items={actualites} />
          )}
        </div>
      </section>

      {/* ── Sacrements ── */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-splj-bordeaux mb-8">
            Sacrements &amp; vie chrétienne
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {sacrements.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col items-center gap-3 border border-splj-bordeaux/10 p-4 hover:border-splj-bordeaux/30 hover:shadow-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-splj-bordeaux-medium flex items-center justify-center text-splj-or group-hover:bg-splj-bordeaux transition-colors">
                  {s.icon}
                </div>
                <span className="text-xs text-splj-bordeaux font-medium text-center">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nous trouver ── */}
      <section className="bg-splj-creme py-12 px-6 border-t border-splj-bordeaux/8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux mb-6">
            Nous trouver
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-3 text-sm text-splj-bordeaux/80">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0 text-splj-bordeaux/50">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>7, rue Saint Léon, 67000 Strasbourg</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-splj-bordeaux/80">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0 text-splj-bordeaux/50">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6.13 6.13l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+33388324319" className="hover:text-splj-bordeaux transition-colors">
                03 88 32 43 19
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-splj-bordeaux/80">
              <IconClock />
              <span>Secrétariat : mar–ven, 9h–12h</span>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-splj-bordeaux text-splj-creme px-6 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-splj-bordeaux-medium transition-colors w-full md:w-auto justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            Envoyer un message
          </Link>
        </div>
      </section>
    </>
  );
}
