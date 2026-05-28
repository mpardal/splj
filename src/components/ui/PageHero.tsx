import Link from "next/link";

export default function PageHero({
  title,
  description,
  subDescription,
  telephone,
  backLink,
  backLabel,
}: {
  title: string;
  description: string;
  subDescription: string;
  telephone?: string;
  backLink: string;
  backLabel: string;
}) {
  return (
    <article>
      <Link
        href={backLink}
        title={backLabel}
        className="flex flex-row gap-2 p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        {backLabel}
      </Link>
      <section>
        <h2 className="text-splj-bordeaux-medium text-2xl text-center">
          {title}
        </h2>
        <p className="p-10 w-200">{description}</p>
        <p className="px-10 w-200">
          {subDescription}
          {telephone && <a href={`tel:${telephone}`}>{telephone}</a>}
        </p>
      </section>
    </article>
  );
}
