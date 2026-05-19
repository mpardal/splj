import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row md:justify-around justify-center items-center gap-1 bg-splj-bordeaux-medium
    text-splj-creme px-3 md:pl-0"
    >
      <Logo isFooter={true} />
      <div>
        <p>7, rue Saint Léon</p>
        <p>67000 Strasbourg</p>
      </div>
      <div className="flex flex-col md:justify-start justify-center my-4 md:my-0">
        <p>
          <span className="hidden md:inline-block">
            Vous pouvez nous joindre au :
          </span>
          <a href="tel:+33388324319"> 03 88 32 43 19</a>
        </p>
        <a href="mailto:accueil@splj-cath.fr">Envoyer un mail</a>
      </div>
    </footer>
  );
}
