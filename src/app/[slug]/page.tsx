import { client } from "@/sanity/lib/client";
import {
  FIRST_PAGE_OF_SECTION_QUERY,
  PAGE_BY_SLUG_QUERY,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch(PAGE_BY_SLUG_QUERY, { slug });
  if (!page) return {};
  return {
    title: `${page.title} — Paroisse Saint Pierre-Le-Jeune`,
    description: page.excerpt ?? undefined,
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const firstPage = await client.fetch(
    FIRST_PAGE_OF_SECTION_QUERY,
    { section: slug },
    { next: { revalidate: 60 } }
  );

  if (firstPage) {
    if (firstPage.externalUrl) redirect(firstPage.externalUrl);
    redirect(`/${slug}/${firstPage.slug.current}`);
  }

  const page = await client.fetch(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!page) return notFound();

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
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{page.title}</h1>
          {page.excerpt && (
            <p className="text-splj-creme/70 mt-3 text-base max-w-2xl">{page.excerpt}</p>
          )}
        </div>
      </section>

      {/* Contenu */}
      <article className="max-w-3xl mx-auto px-6 py-12">
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
    </>
  );
}
