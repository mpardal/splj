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
      className="bg-splj-creme p-5 rounded-xl"
    >
      <article>
        <h2 className="text-splj-bordeaux text-center text-xl underline">
          {title}
        </h2>
        <p className="text-splj-bordeaux-medium p-8">{description}</p>
      </article>
    </Link>
  );
}
