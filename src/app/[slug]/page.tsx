import { client } from "@/sanity/lib/client";
import {
  FIRST_PAGE_OF_SECTION_QUERY,
  PAGE_BY_SLUG_QUERY,
} from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { redirect, notFound } from "next/navigation";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Check if this slug is a section — if so, redirect to its first page
  const firstPage = await client.fetch(
    FIRST_PAGE_OF_SECTION_QUERY,
    { section: slug },
    { next: { revalidate: 60 } }
  );

  if (firstPage) {
    if (firstPage.externalUrl) redirect(firstPage.externalUrl);
    redirect(`/${slug}/${firstPage.slug.current}`);
  }

  // Otherwise fetch as a top-level page
  const page = await client.fetch(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!page) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-splj-bordeaux mb-4">{page.title}</h1>

      {page.excerpt && (
        <p className="text-lg text-splj-bordeaux-medium/80 mb-8">{page.excerpt}</p>
      )}

      {page.content && (
        <div className="prose prose-slate max-w-none">
          <PortableText
              value={page.content}
              components={{
                types: {
                  callout: ({ value }) => (
                      <div className="border-l-4 border-gray-400 pl-4 my-4">
                        {value.title && <p className="font-bold mb-2">{value.title}</p>}
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