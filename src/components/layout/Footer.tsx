import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-splj-bordeaux text-splj-creme">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-8 py-4 text-sm text-splj-creme/70">
        <span>© 2025 Paroisse Saint Pierre-Le-Jeune, Strasbourg</span>
        <nav className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-splj-or transition-colors">
            Mentions légales
          </Link>
          <Link href="/contact" className="hover:text-splj-or transition-colors">
            Contact
          </Link>
          <Link href="/information-acces" className="hover:text-splj-or transition-colors">
            Plan d&apos;accès
          </Link>
        </nav>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center py-6 px-4 gap-4">
        <Logo isFooter={true} />
        <nav className="flex gap-4 text-sm text-splj-creme/70 flex-wrap justify-center">
          <Link href="/mentions-legales" className="hover:text-splj-or transition-colors">
            Mentions légales
          </Link>
          <Link href="/information-acces" className="hover:text-splj-or transition-colors">
            Plan d&apos;accès
          </Link>
          <Link href="/contact" className="hover:text-splj-or transition-colors">
            CGU
          </Link>
        </nav>
        <p className="text-xs text-splj-creme/50">© 2025 Paroisse Saint Pierre-Le-Jeune</p>
      </div>
    </footer>
  );
}
