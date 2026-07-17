import { client } from "@/sanity/lib/client";
import { ACTUALITES_ALL_QUERY } from "@/sanity/queries";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";

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

type Actualite = {
  _id: string;
  titre: string;
  slug: string;
  categorie: string;
  date: string;
  resume: string;
};

export const metadata = {
  title: "Actualités — Paroisse Saint Pierre-Le-Jeune",
  description: "Toutes les actualités de la paroisse Saint Pierre-Le-Jeune de Strasbourg.",
};

export default async function ActualitesPage() {
  const actualites: Actualite[] = await client.fetch(
    ACTUALITES_ALL_QUERY,
    {},
    { next: { revalidate: 300 } }
  );

  return (
    <>
      {/* Hero */}
      <section className="relative bg-splj-bordeaux text-splj-creme overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none select-none" aria-hidden>
          <svg width="200" height="260" viewBox="0 0 260 340" fill="currentColor">
            <rect x="110" y="0" width="40" height="340" />
            <rect x="0" y="110" width="260" height="40" />
          </svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20">
          <p className="text-splj-or text-xs uppercase tracking-widest mb-3">Paroisse catholique — Strasbourg</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">Actualités</h1>
          <p className="text-splj-creme/70 mt-3 text-base">
            La vie de la paroisse, ses événements et ses annonces.
          </p>
        </div>
      </section>

      {/* Liste */}
      <section className="bg-splj-creme py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {actualites.length === 0 ? (
            <p className="text-sm text-splj-bordeaux/50 italic">Aucune actualité pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {actualites.map((a) => (
                <Link
                  key={a._id}
                  href={`/actualites/${a.slug}`}
                  className="group bg-white border border-splj-bordeaux/10 p-5 flex flex-col gap-3 hover:border-splj-bordeaux/30 hover:shadow-sm transition-all"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux/50">
                    {a.categorie}
                  </p>
                  <h2 className="font-bold text-splj-bordeaux text-lg leading-snug group-hover:underline underline-offset-2">
                    {a.titre}
                  </h2>
                  <p className="text-sm text-splj-bordeaux/70 flex-1">{a.resume}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-splj-bordeaux/50">
                      <IconCalendar />
                      <span>{formatDate(a.date)}</span>
                    </div>
                    <span className="text-xs text-splj-bordeaux/40 group-hover:text-splj-bordeaux transition-colors flex items-center gap-1">
                      Lire
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                        <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
