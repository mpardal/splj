import { client } from "@/sanity/lib/client";
import { EVENEMENT_BY_SLUG_QUERY, AGENDA_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const JOURS_LONG = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

function formatDateLong(iso: string) {
  const d = new Date(iso);
  return `${JOURS_LONG[d.getUTCDay()]} ${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export async function generateStaticParams() {
  const today = new Date().toISOString().split("T")[0];
  const events: { slug: string }[] = await client.fetch(AGENDA_QUERY, { today });
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ev = await client.fetch(EVENEMENT_BY_SLUG_QUERY, { slug });
  if (!ev) return {};
  return {
    title: `${ev.titre} — Agenda — Paroisse Saint Pierre-Le-Jeune`,
    description: ev.description ?? undefined,
  };
}

export default async function EvenementPage({ params }: Props) {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ev: any = await client.fetch(
    EVENEMENT_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 300 } }
  );

  if (!ev) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      {/* Retour */}
      <Link
        href="/agenda"
        className="flex items-center gap-2 text-sm text-splj-bordeaux/60 hover:text-splj-bordeaux transition-colors mb-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
          <path d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        Retour à l'agenda
      </Link>

      {/* Catégorie + statut */}
      <div className="flex items-center gap-3 mb-3">
        {ev.categorie && (
          <span className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux/50">{ev.categorie}</span>
        )}
        {ev.annule && (
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Annulé</span>
        )}
      </div>

      <h1 className={`text-3xl font-bold text-splj-bordeaux mb-6 leading-tight ${ev.annule ? "line-through opacity-60" : ""}`}>
        {ev.titre}
      </h1>

      {/* Bloc infos */}
      <div className="bg-white border border-splj-bordeaux/10 p-5 mb-8 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0 text-splj-or mt-0.5">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <div className="text-sm text-splj-bordeaux">
            <span className="capitalize">{formatDateLong(ev.dateDebut)}</span>
            {ev.dateFin && ev.dateFin !== ev.dateDebut && (
              <span className="text-splj-bordeaux/60"> → {formatDateLong(ev.dateFin)}</span>
            )}
          </div>
        </div>

        {ev.heureDebut && (
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0 text-splj-or">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm text-splj-bordeaux">
              {ev.heureDebut}{ev.heureFin ? ` – ${ev.heureFin}` : ""}
            </span>
          </div>
        )}

        {ev.lieu && (
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 shrink-0 text-splj-or">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm text-splj-bordeaux">{ev.lieu}</span>
          </div>
        )}

        {ev.lienInscription && (
          <a
            href={ev.lienInscription}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 bg-splj-bordeaux text-splj-creme text-xs uppercase tracking-widest font-semibold px-5 py-2.5 hover:bg-splj-bordeaux-medium transition-colors w-fit"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            S'inscrire
          </a>
        )}
      </div>

      {/* Description courte */}
      {ev.description && (
        <p className="text-lg text-splj-bordeaux/70 mb-8 leading-relaxed">{ev.description}</p>
      )}

      {/* Contenu PortableText */}
      {ev.contenu && (
        <div className="prose max-w-none prose-headings:text-splj-bordeaux prose-headings:font-bold prose-p:text-splj-bordeaux/80 prose-a:text-splj-bordeaux prose-a:underline prose-strong:text-splj-bordeaux prose-li:text-splj-bordeaux/80 mb-8">
          <PortableText
            value={ev.contenu}
            components={{
              types: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                callout: ({ value }: { value: any }) => (
                  <div className="border-l-4 border-splj-or bg-splj-or-light pl-4 pr-4 py-3 my-6">
                    {value.title && <p className="font-bold text-splj-bordeaux mb-2">{value.title}</p>}
                    <PortableText value={value.body} />
                  </div>
                ),
              },
            }}
          />
        </div>
      )}

      {/* Image */}
      {ev.image && (
        <Image
          src={urlFor(ev.image).width(900).url()}
          alt={ev.titre}
          width={900}
          height={600}
          className="w-full h-auto"
        />
      )}
    </article>
  );
}
