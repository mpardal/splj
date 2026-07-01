export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    label: "Accueil",
    items: [
      { label: "Contact | Plan d'accès", href: "/information-acces" },
      { label: "Eglise du Sacré-Cœur", href: "/art-histoire" },
      { label: "Chapelle Notre Dame du Wacken", href: "/chapelle-wacken" },
    ],
  },
  {
    label: "Vie Spirituelle",
    items: [
      { label: "Adorateurs | Adoratrices", href: "/vie-spirituelle/adorateurs" },
      { label: "Veilleurs de St Pierre", href: "/vie-spirituelle/veilleurs-st-pierre" },
      { label: "Fraternité mariale", href: "/vie-spirituelle/fraternite-mariale" },
    ],
  },
  {
    label: "Sacrements",
    items: [
      { label: "Baptême des enfants", href: "/sacrements/bapteme-enfants" },
      {
        label: "Baptême des adultes",
        href: "https://forms.gle/bapteme-adultes",
        external: true,
      },
      { label: "Sacrement du pardon", href: "/sacrements/reconciliation" },
      { label: "Première Communion", href: "/sacrements/premiere-communion" },
      { label: "Confirmation des jeunes", href: "/sacrements/confirmation-jeunes" },
      {
        label: "Confirmation des adultes",
        href: "https://forms.gle/confirmation-adultes",
        external: true,
      },
      { label: "Préparation au mariage", href: "/sacrements/preparation-mariage" },
      { label: "Sacrement des malades", href: "/sacrements/sacrement-malade" },
    ],
  },
  {
    label: "Formations",
    items: [
      {
        label: "Jeunesse",
        href: "/formations/catechese-formation-jeunes-et-enfants",
      },
      { label: "Etudiants et Jeunes Pro", href: "/formations/jeunes-pros" },
      { label: "Adultes : Académie Benoît XVI", href: "/formations/formations-adultes" },
    ],
  },
  {
    label: "Fraternités et Groupes Adultes",
    items: [
      {
        label: "Cercle Charles et Zita",
        href: "/fraternites-et-groupes-adultes/cercle-charles-et-zita",
      },
      {
        label: "Groupe de Prière des mères",
        href: "/fraternites-et-groupes-adultes/priere-des-meres",
      },
      {
        label: "Groupe St Damien",
        href: "/fraternites-et-groupes-adultes/groupe-st-damien",
      },
      {
        label: "Cercle Biblique œcuménique",
        href: "/fraternites-et-groupes-adultes/cercle-biblique-oecumenique",
      },
      {
        label: "Cercle des juristes catholiques d'Alsace",
        href: "/fraternites-et-groupes-adultes/juristes-catholiques",
      },
      {
        label: "Les fraternités",
        href: "/fraternites-et-groupes-adultes/fraternites",
      },
    ],
  },
  {
    label: "Charité | Solidarité",
    items: [
      {
        label: "Conférence St Vincent de Paul",
        href: "/charite-et-solidarite/conference-st-vincent-paul",
      },
      {
        label: "Equipe Domus | Visiteurs",
        href: "/charite-et-solidarite/domus",
      },
      {
        label: "Les Maraudeurs du Sacré-Cœur",
        href: "/charite-et-solidarite/maraudeurs-sacre-coeur",
      },
    ],
  },
  {
    label: "Liturgie",
    items: [
      { label: "Servants de messe", href: "/liturgie/servants-autel" },
      { label: "Lecteurs | Animateurs", href: "/liturgie/lecteurs-animateurs" },
      { label: "Chœur de St Pierre", href: "/liturgie/chorale-schola" },
      { label: "Messe musicale dominicale", href: "/liturgie/messe-dominicale" },
      { label: "Veillée musicale", href: "/liturgie/veillee-musicale" },
      { label: "Messe orchestre", href: "/liturgie/messe-orchestre" },
    ],
  },
  {
    label: "Funérailles",
    items: [
      { label: "Funérailles", href: "/funerailles" },
    ],
  },
];

export const standaloneLinks: NavItem[] = [
  { label: "Faire un don", href: "/don" },
];