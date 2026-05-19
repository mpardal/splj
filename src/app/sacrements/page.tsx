import Card from "@/components/ui/Card";

export const metadata = {
  title: "Les sacrements — Saint Pierre-Le-Jeune",
  description:
    "Faire les sacrements à la paroisse Saint Pierre-Le-Jeune de Strasbourg.",
};

export default function Sacrements() {
  const sacrements = [
    {
      title: "Baptême des enfants",
      description:
        "Vous désirez faire baptiser votre enfant en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?",
      link: "/sacrements/bapteme-enfants",
      target: false,
    },
    {
      title: "Baptême des adultes",
      description:
        "Vous désirez vous baptiser en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdb5IrujWfjsf7vsgzeyOxbkw_17DUg0CTjs63biCEgUkkN6A/viewform",
      target: true,
    },
    {
      title: "Réconciliation",
      description: "Vous désirez faire votre confession",
      link: "/sacrements/reconciliation",
      target: false,
    },
    {
      title: "Première communion",
      description:
        "Vous désirez faire la première communion de votre enfant en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?",
      link: "/sacrements/premiere-communion",
      target: false,
    },
    {
      title: "Confirmation des jeunes",
      description:
        "Vous désirez faire confirmer votre enfant en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?",
      link: "/sacrements/confirmation-jeunes",
      target: false,
    },
    {
      title: "Confirmation des adultes",
      description:
        "Vous désirez vous confirmer en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScjG6gj54s8efRCyjaMIFtqbaQ7H9M1YI5amc0W4uUpzSQwFw/viewform",
      target: true,
    },
    {
      title: "Préparation au mariage",
      description:
        "Vous désirez vous marier ou obtenir des renseignements concernant la préparation au mariage qu'offre notre famille paroissiale ?",
      link: "/sacrements/preparation-mariage",
      target: false,
    },
    {
      title: "Les sacrements des malades",
      description:
        "Vous désirez recevoir le sacrement des malades en l'église du Sacré Coeur de la paroisse Saint-Pierre-le-Jeune de Strasbourg ?",
      link: "/sacrements/sacrement-malade",
      target: false,
    },
  ];

  return (
    <>
      <h1 className="text-3xl text-splj-or bg-splj-bordeaux mx-auto text-center py-5 mb-2">
        Sacrements
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sacrements.map((sacrement) => (
          <Card
            key={sacrement.link}
            link={sacrement.link}
            title={sacrement.title}
            description={sacrement.description}
            target={sacrement.target}
          />
        ))}
      </div>
    </>
  );
}
