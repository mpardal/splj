import { client } from "@/sanity/lib/client";
import { PAGE_BY_SECTION_AND_SLUG_QUERY } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SectionSubPage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug: section, subSlug } = await params;

  const page = await client.fetch(
    PAGE_BY_SECTION_AND_SLUG_QUERY,
    { section, slug: subSlug },
    { next: { revalidate: 60 } }
  );

  if (!page) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href={`/${page.sectionSlug}`}
        className="flex items-center gap-2 text-sm text-splj-bordeaux-medium mb-6 hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        {page.sectionTitle}
      </Link>

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