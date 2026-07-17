import { client } from "@/sanity/lib/client";
import { ACTUALITE_BY_SLUG_QUERY, ACTUALITES_ALL_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/formatDate";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const actualites: { slug: string }[] = await client.fetch(ACTUALITES_ALL_QUERY);
  return actualites.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch(ACTUALITE_BY_SLUG_QUERY, { slug });
  if (!page) return {};
  return {
    title: `${page.titre} — Paroisse Saint Pierre-Le-Jeune`,
    description: page.resume,
  };
}

export default async function ActualitePage({ params }: Props) {
  const { slug } = await params;

  const page = await client.fetch(
    ACTUALITE_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 300 } }
  );

  if (!page) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      {/* Retour */}
      <Link
        href="/actualites"
        className="flex items-center gap-2 text-sm text-splj-bordeaux/60 hover:text-splj-bordeaux transition-colors mb-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
          <path d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        Toutes les actualités
      </Link>

      {/* Méta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux/50">
          {page.categorie}
        </span>
        <span className="text-splj-bordeaux/20">·</span>
        <span className="text-xs text-splj-bordeaux/50">{formatDate(page.date)}</span>
      </div>

      <h1 className="text-3xl font-bold text-splj-bordeaux mb-4 leading-tight">{page.titre}</h1>

      {page.resume && (
        <p className="text-lg text-splj-bordeaux/70 mb-8 leading-relaxed">{page.resume}</p>
      )}

      {page.image && (
        <Image
          src={urlFor(page.image).width(900).url()}
          alt={page.titre}
          width={900}
          height={600}
          className="w-full h-auto mb-8"
          priority
        />
      )}

      {page.contenu && (
        <div className="prose prose-slate max-w-none">
          <PortableText
            value={page.contenu}
            components={{
              types: {
                callout: ({ value }) => (
                  <div className="border-l-4 border-splj-or pl-4 my-4 bg-splj-or-light p-4">
                    {value.title && <p className="font-bold mb-2 text-splj-bordeaux">{value.title}</p>}
                    <PortableText value={value.body} />
                  </div>
                ),
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
