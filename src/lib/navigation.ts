export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavSection = {
  label: string;
  href: string;
  items?: NavItem[];
};

export const navigation: NavSection[] = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "La paroisse",
    href: "/information-acces",
    items: [
      { label: "Contact | Plan d'accès", href: "/information-acces" },
      { label: "Eglise du Sacré-Cœur", href: "/art-histoire" },
      { label: "Chapelle Notre Dame du Wacken", href: "/chapelle-wacken" },
    ],
  },
  {
    label: "Sacrements",
    href: "/sacrements/bapteme-enfants",
    items: [
      { label: "Baptême des enfants", href: "/sacrements/bapteme-enfants" },
      {
        label: "Baptême des adultes",
        href: "https://forms.gle/CtEWerTX4oNUxWgQ7",
        external: true,
      },
      { label: "Sacrement du pardon", href: "/sacrements/reconciliation" },
      { label: "Première Communion", href: "/sacrements/premiere-communion" },
      { label: "Confirmation des jeunes", href: "/sacrements/confirmation-jeunes" },
      {
        label: "Confirmation des adultes",
        href: "https://forms.gle/UxKDyRAHJSxncZLH9",
        external: true,
      },
      { label: "Préparation au mariage", href: "/sacrements/preparation-mariage" },
      { label: "Sacrement des malades", href: "/sacrements/sacrement-malade" },
      { label: "Funérailles", href: "/funerailles" },
    ],
  },
  {
    label: "Groupes",
    href: "/vie-spirituelle/adorateurs",
    items: [
      // Vie Spirituelle
      { label: "Adorateurs | Adoratrices", href: "/vie-spirituelle/adorateurs" },
      { label: "Veilleurs de St Pierre", href: "/vie-spirituelle/veilleurs-st-pierre" },
      { label: "Fraternité mariale", href: "/vie-spirituelle/fraternite-mariale" },
      // Formations
      { label: "Catéchèse & formation jeunesse", href: "/formations/catechese-formation-jeunes-et-enfants" },
      { label: "Jeunes Pros - Cercle St Jean-Paul II", href: "/formations/jeunes-pros" },
      { label: "Adultes : Académie Benoît XVI", href: "/formations/formations-adultes" },
      // Fraternités & groupes adultes
      { label: "Cercle Charles et Zita", href: "/fraternites-et-groupes-adultes/cercle-charles-et-zita" },
      { label: "Groupe de Prière des mères", href: "/fraternites-et-groupes-adultes/priere-des-meres" },
      { label: "Groupe St Damien", href: "/fraternites-et-groupes-adultes/groupe-st-damien" },
      { label: "Cercle Biblique œcuménique", href: "/fraternites-et-groupes-adultes/cercle-biblique-oecumenique" },
      { label: "Cercle des juristes catholiques d'Alsace", href: "/fraternites-et-groupes-adultes/juristes-catholiques" },
      { label: "Les fraternités", href: "/fraternites-et-groupes-adultes/fraternites" },
      // Charité & Solidarité
      { label: "Conférence St Vincent de Paul", href: "/charite-et-solidarite/conference-st-vincent-paul" },
      { label: "Equipe Domus | Visiteurs", href: "/charite-et-solidarite/domus" },
      { label: "Maraudeurs du Sacré-Cœur", href: "/charite-et-solidarite/maraudeurs-sacre-coeur" },
      // Liturgie
      { label: "Servants de messe", href: "/liturgie/servants-autel" },
      { label: "Lecteurs | Animateurs", href: "/liturgie/lecteurs-animateurs" },
      { label: "Chœur de St Pierre", href: "/liturgie/chorale-schola" },
      { label: "Veillée musicale", href: "/liturgie/veillee-musicale" },
      { label: "Messe orchestre", href: "/liturgie/messe-orchestre" },
    ],
  },
  {
    label: "Agenda",
    href: "/agenda",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
