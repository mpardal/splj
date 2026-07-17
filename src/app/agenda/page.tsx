import { client } from "@/sanity/lib/client";
import { AGENDA_QUERY } from "@/sanity/queries";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda — Paroisse Saint Pierre-Le-Jeune",
  description: "Les événements et rendez-vous de la paroisse Saint Pierre-Le-Jeune de Strasbourg.",
};

type Evenement = {
  _id: string;
  titre: string;
  slug: string;
  categorie?: string;
  dateDebut: string;
  heureDebut?: string;
  dateFin?: string;
  heureFin?: string;
  lieu?: string;
  description?: string;
  lienInscription?: string;
  annule?: boolean;
};

const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const JOURS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function formatJour(iso: string) {
  const d = new Date(iso);
  return { jour: JOURS[d.getUTCDay()], num: d.getUTCDate() };
}

function formatMoisAnnee(iso: string) {
  const d = new Date(iso);
  return `${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function groupByMonth(events: Evenement[]) {
  const groups: Record<string, Evenement[]> = {};
  for (const e of events) {
    const key = formatMoisAnnee(e.dateDebut);
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  }
  return Object.entries(groups);
}

function IconLocation() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5 shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5 shrink-0">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5 shrink-0">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default async function AgendaPage() {
  const today = new Date().toISOString().split("T")[0];
  const evenements: Evenement[] = await client.fetch(
    AGENDA_QUERY,
    { today },
    { next: { revalidate: 300 } }
  );

  const grouped = groupByMonth(evenements);

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
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">Agenda</h1>
          <p className="text-splj-creme/70 mt-3 text-base">
            Les prochains rendez-vous de la vie paroissiale.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="bg-splj-creme py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {evenements.length === 0 ? (
            <p className="text-sm text-splj-bordeaux/50 italic">Aucun événement à venir pour le moment.</p>
          ) : (
            <div className="flex flex-col gap-12">
              {grouped.map(([mois, events]) => (
                <div key={mois}>
                  {/* En-tête de mois */}
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux">{mois}</h2>
                    <div className="flex-1 h-px bg-splj-bordeaux/10" />
                  </div>

                  {/* Événements du mois */}
                  <div className="flex flex-col gap-3">
                    {events.map((e) => {
                      const { jour, num } = formatJour(e.dateDebut);
                      return (
                        <div
                          key={e._id}
                          className={`flex gap-5 bg-white border p-5 transition-all ${e.annule ? "opacity-60 border-splj-bordeaux/10" : "border-splj-bordeaux/10 hover:border-splj-bordeaux/20 hover:shadow-sm"}`}
                        >
                          {/* Bloc date */}
                          <div className="flex flex-col items-center justify-start min-w-[48px]">
                            <span className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux/40">{jour}</span>
                            <span className="text-3xl font-bold text-splj-bordeaux leading-none">{num}</span>
                            {e.dateFin && e.dateFin !== e.dateDebut && (
                              <span className="text-xs text-splj-bordeaux/40 mt-0.5">→ {formatJour(e.dateFin).num}</span>
                            )}
                          </div>

                          {/* Séparateur vertical */}
                          <div className="w-px bg-splj-or self-stretch shrink-0" />

                          {/* Contenu */}
                          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className={`font-bold text-splj-bordeaux leading-snug ${e.annule ? "line-through" : ""}`}>
                                {e.titre}
                              </h3>
                              {e.annule && (
                                <span className="text-xs font-bold uppercase tracking-widest text-red-500 shrink-0">Annulé</span>
                              )}
                              {e.categorie && !e.annule && (
                                <span className="text-xs text-splj-bordeaux/40 shrink-0 hidden sm:block">{e.categorie}</span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                              {e.heureDebut && (
                                <span className="flex items-center gap-1 text-xs text-splj-bordeaux/60">
                                  <IconClock />
                                  {e.heureDebut}{e.heureFin ? ` – ${e.heureFin}` : ""}
                                </span>
                              )}
                              {e.lieu && (
                                <span className="flex items-center gap-1 text-xs text-splj-bordeaux/60">
                                  <IconLocation />
                                  {e.lieu}
                                </span>
                              )}
                            </div>

                            {e.description && (
                              <p className="text-sm text-splj-bordeaux/70 leading-snug mt-0.5">{e.description}</p>
                            )}

                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                              {e.lienInscription && (
                                <a
                                  href={e.lienInscription}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-splj-bordeaux uppercase tracking-widest hover:text-splj-bordeaux/70 transition-colors"
                                >
                                  <IconExternal />
                                  S'inscrire
                                </a>
                              )}
                              {e.description && (
                                <Link
                                  href={`/agenda/${e.slug}`}
                                  className="inline-flex items-center gap-1 text-xs text-splj-bordeaux/50 hover:text-splj-bordeaux transition-colors"
                                >
                                  En savoir plus
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                                    <path strokeLinecap="round" d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
