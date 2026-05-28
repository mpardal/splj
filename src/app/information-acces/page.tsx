import Image from "next/image";

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl text-splj-or bg-splj-bordeaux mx-auto text-center py-5 mb-2">
        Informations pratique
      </h1>
      <p>Église ouverte tous les jours de 9h à 18h, hors offices religieux</p>
      <h2>Contact</h2>
      <p>
        Marie Conrath | <a href="tel::0388324319">03 88 32 43 19</a>
      </p>
      <p>7, rue Saint Léon 67000 STRASBOURG</p>
      <p>
        <Image src="/fleche.png" alt="fleche" height={7} width={13} />
        <a href="mailto:accueil@splj-cath.fr">Envoyer un mail</a>
      </p>
      <h2>Ouverture du secrétariat :</h2>
      <p>Mardi, Jeudi et Vendredi : 8h45 à 12h30</p>
      <p>et Mercredi de 10h30 à 12h30 et 14h30 à 18h30</p>
      <h2>Foyer</h2>
      <p>4 rue Gloxin</p>
      <h2>Chapelle Notre Dame du Wacken</h2>
      <p>
        6 rue Léon Boll - <a href="/chapelle-wacken">c&aposest ici</a>
      </p>
      <h2>Locaux scouts</h2>
      <p>6 rue Léon Boll (Jeannettes, Louveteaux, Guides, Scouts)</p>
      <p>8 rue du Général Rapp (Caravelles, Pionniers)</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.1191944942425!2d7.746266611843192!3d48.588416571177014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8501da89fd1%3A0x25feae1a68488346!2s7%20Rue%20Saint-L%C3%A9on%2C%2067000%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1779396079417!5m2!1sfr!2sfr"
        width="600"
        height={450}
        className="border"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}
