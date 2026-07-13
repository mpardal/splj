import Image from "next/image";
import Link from "next/link";

export default function Logo({ isFooter }: { isFooter?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-3 my-4 ${isFooter ? "opacity-80 hover:opacity-100 transition-opacity" : ""}`}>
      <Image src="/logo_or.png" alt="logo" width={36} height={36} />
      <div className="flex flex-col leading-none">
        <span className="font-bold text-sm tracking-wide text-splj-creme">
          SAINT PIERRE-LE-JEUNE
        </span>
        <span className="text-splj-or/70 text-xs font-light tracking-widest">
          STRASBOURG
        </span>
      </div>
    </Link>
  );
}
