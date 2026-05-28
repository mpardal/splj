import Card from "@/components/ui/Card";

export const metadata = {
  title: "La vie spirituelle — Saint Pierre-Le-Jeune",
  description:
    "Vie de la paroisse, horaires des messes, confession, chapelet, rosaire, adoration, vie de quartier | Paroisse Saint Pierre le Jeune Catholique à Strasbourg",
};

export default function VieSpirituelle() {
  const vieSpirituelles = [
    {
      title: "Adorateurs et Adoratrices",
      description: "Qu'est ce que les adorateurs et adoratrices ?",
      link: "/vie-spirituelle/adorateurs",
      target: false,
    },
    {
      title: "Veilleurs de St-Pierre",
      description: "Qu'est ce que les veilleurs de Saint-Pierre ?",
      link: "/vie-spirituelle/veilleurs-st-pierre",
      target: false,
    },
    {
      title: "Première communion",
      description: "u'est ce que les fraternités mariales ?",
      link: "/vie-spirituelle/fraternite-mariale",
      target: false,
    },
  ];

  return (
    <>
      <h1 className="text-3xl text-splj-or bg-splj-bordeaux mx-auto text-center py-5 mb-2">
        Vie Spirituelle
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vieSpirituelles.map((vieSpirituelle) => (
          <Card
            key={vieSpirituelle.link}
            link={vieSpirituelle.link}
            title={vieSpirituelle.title}
            description={vieSpirituelle.description}
            target={vieSpirituelle.target}
          />
        ))}
      </div>
    </>
  );
}
