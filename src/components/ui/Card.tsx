import Link from "next/link";

export default function Card({
  link,
  title,
  description,
  target,
}: {
  link: string;
  title: string;
  description: string;
  target: boolean;
}) {
  return (
    <Link
      href={link}
      target={target ? "_blank" : "_self"}
      className="block bg-splj-creme p-5 rounded-xl hover:scale-102"
    >
      <article>
        <h2 className="text-splj-bordeaux text-center text-xl underline">
          {title}
        </h2>
        <p className="text-splj-bordeaux-medium p-8">{description}</p>
      </article>
      <div className="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </Link>
  );
}
