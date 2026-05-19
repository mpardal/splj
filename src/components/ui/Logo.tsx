import Image from "next/image";

export default function Logo({ isFooter }: { isFooter?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 ${!isFooter ? `md:mx-auto` : null} my-5`}
    >
      {/* Croix SVG */}
      <Image src="/logo_or.png" alt="logo" width={50} height={50} />
      <div className="flex flex-col">
        <span className="font-bold">SAINT PIERRE-LE-JEUNE</span>
        <span className="font-extralight text-sm text-splj-or/70">
          STRASBOURG
        </span>
      </div>
    </div>
  );
}
