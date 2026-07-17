import { client } from "@/sanity/lib/client";
import {
  PAGE_BY_SECTION_AND_SLUG_QUERY,
  PAGES_BY_SECTION_QUERY,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string; subSlug: string }> };

type PageData = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[];
  externalUrl?: string;
  sectionTitle: string;
  sectionSlug: string;
};

type SiblingPage = { _id: string; title: string; slug: { current: string }; excerpt?: string; externalUrl?: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: section, subSlug } = await params;
  const page: PageData | null = await client.fetch(PAGE_BY_SECTION_AND_SLUG_QUERY, { section, slug: subSlug });
  if (!page) return {};
  return {
    title: `${page.title} — Paroisse Saint Pierre-Le-Jeune`,
    description: page.excerpt ?? undefined,
  };
}

export default async function SectionSubPage({ params }: Props) {
  const { slug: section, subSlug } = await params;

  const [page, siblings]: [PageData | null, SiblingPage[]] = await Promise.all([
    client.fetch(PAGE_BY_SECTION_AND_SLUG_QUERY, { section, slug: subSlug }, { next: { revalidate: 60 } }),
    client.fetch(PAGES_BY_SECTION_QUERY, { section }, { next: { revalidate: 60 } }),
  ]);

  if (!page) return notFound();
  if (page.externalUrl) redirect(page.externalUrl);

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
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{page.title}</h1>
          {page.excerpt && (
            <p className="text-splj-creme/70 mt-3 text-base max-w-2xl">{page.excerpt}</p>
          )}
        </div>
      </section>

      {/* Corps — sidebar + contenu */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">

        {/* Sidebar navigation */}
        {siblings.length > 1 && (
          <aside className="md:w-48 shrink-0">
            <p className="text-xs font-bold uppercase tracking-widest text-splj-bordeaux mb-3">
              {page.sectionTitle}
            </p>
            <nav className="flex flex-col">
              {siblings.map((s) => {
                const isActive = s.slug.current === subSlug && !s.externalUrl;
                const href = s.externalUrl ?? `/${section}/${s.slug.current}`;
                return (
                  <Link
                    key={s._id}
                    href={href}
                    target={s.externalUrl ? "_blank" : undefined}
                    rel={s.externalUrl ? "noopener noreferrer" : undefined}
                    className={`border-l-2 pl-3 py-2 text-sm transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? "border-splj-or text-splj-bordeaux font-semibold"
                        : "border-splj-bordeaux/10 text-splj-bordeaux/60 hover:text-splj-bordeaux hover:border-splj-bordeaux/30"
                    }`}
                  >
                    {s.title}
                    {s.externalUrl && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-3 shrink-0 opacity-50">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Contenu principal */}
        <article className="flex-1 min-w-0">
          {page.content && (
            <div className="prose max-w-none prose-headings:text-splj-bordeaux prose-headings:font-bold prose-p:text-splj-bordeaux/80 prose-a:text-splj-bordeaux prose-a:underline prose-strong:text-splj-bordeaux prose-li:text-splj-bordeaux/80">
              <PortableText
                value={page.content}
                components={{
                  types: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    callout: ({ value }: { value: any }) => (
                      <div className="border-l-4 border-splj-or bg-splj-or-light pl-4 pr-4 py-3 my-6">
                        {value.title && (
                          <p className="font-bold text-splj-bordeaux mb-2">{value.title}</p>
                        )}
                        <PortableText value={value.body} />
                      </div>
                    ),
                  },
                }}
              />
            </div>
          )}

          {page.image && (
            <Image
              src={urlFor(page.image).width(900).url()}
              alt={page.title}
              width={900}
              height={600}
              className="w-full h-auto mt-10"
              priority
            />
          )}
        </article>
      </div>
    </>
  );
}
