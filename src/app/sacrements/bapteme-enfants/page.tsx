import PageHero from "@/components/ui/PageHero";

export const metadata = {
  title: "Baptême des enfants — Saint Pierre-Le-Jeune",
  description:
    "Faire baptiser votre enfant à la paroisse Saint Pierre-Le-Jeune de Strasbourg.",
};

export default function BaptemeEnfants() {
  return (
    <>
      <PageHero
        title="Le baptême pour les enfants"
        description="Vous désirez faire baptiser votre enfant en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?"
        subDescription="Merci de nous contacter au"
        telephone="06 63 91 15 19"
        backLink="/sacrements"
        backLabel=" Les sacrements"
      />
    </>
  );
}
