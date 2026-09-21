// Central source of truth for site-wide constants (SEO, business info,
// zone d'intervention, services). Edit here, not in individual pages.

export const site = {
  url: "https://metrie-gp.fr",
  name: "Metrie GP",
  legalName: "Metrie GP SAS",
  tagline: "Scan 3D laser & modélisation BIM en Guadeloupe",
  description:
    "Studio de scan 3D laser et de modélisation BIM basé en Guadeloupe. Relevé d'existant haute précision, nuage de points, maquette Revit / ArchiCAD et plans DWG pour architectes, bureaux d'études et collectivités — Grande-Terre, Basse-Terre, Marie-Galante, Les Saintes et La Désirade.",
  locale: "fr-FR",
  founder: "Luidgi DRACON",
  email: "contact@metrie-gp.fr",
  phone: ["+33766176126", "+33687471493", "+590690374142"],
  phoneDisplay: ["+33 7 66 17 61 26", "+33 6 87 47 14 93", "+590 690 37 41 42"],
  address: {
    street: "2 Rue Gédéon",
    postalCode: "97190",
    locality: "Le Gosier",
    region: "Guadeloupe",
    country: "FR",
    countryName: "France",
  },
  capital: "3 000 €",
  rcs: "Pointe-à-Pitre",
  rcsNumber: "104 330 014",
  siren: "104330014",
  vat: "FR57104330014",
  ape: "71.12B",
  apeLabel: "Ingénierie, études techniques",
  legalForm: "Société par Actions Simplifiée (SAS)",
  legalFormCode: "5710",
  creationDate: "2026-04-28",
  ogImage: "/img/og-metrie-gp.jpg",
  // Signaux LocalBusiness attendus par Google (fiche + rich results).
  priceRange: "€€",
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
} as const;

/* ------------------------------------------------------------------
   ZONE D'INTERVENTION — Guadeloupe
   Le site est volontairement recentré sur la Guadeloupe : une zone
   traitée en profondeur ranke mieux que cinq zones survolées.
   Ces communes alimentent le JSON-LD (areaServed) et les pages.
   ------------------------------------------------------------------ */
export const serviceArea = {
  region: "Guadeloupe",
  departmentCode: "971",
  inseeRegion: "01",
  prefecture: "Basse-Terre",
  largestCity: "Les Abymes",
  responseTime: "48 h",
  blurb:
    "La Guadeloupe est notre unique terrain d'intervention, et c'est un choix. Connaître le bâti local — la case créole, le béton des années 70, l'entrepôt de Jarry, l'hôtellerie du littoral — change la façon dont on prépare une acquisition. Mise en place sous 48 h sur l'ensemble de l'archipel, îles du Sud comprises.",
  areas: [
    {
      name: "Grande-Terre",
      cities: [
        "Pointe-à-Pitre",
        "Les Abymes",
        "Le Gosier",
        "Sainte-Anne",
        "Saint-François",
        "Le Moule",
        "Morne-à-l'Eau",
        "Petit-Canal",
        "Port-Louis",
        "Anse-Bertrand",
      ],
    },
    {
      name: "Basse-Terre",
      cities: [
        "Baie-Mahault",
        "Basse-Terre",
        "Petit-Bourg",
        "Lamentin",
        "Sainte-Rose",
        "Capesterre-Belle-Eau",
        "Saint-Claude",
        "Gourbeyre",
        "Deshaies",
        "Bouillante",
        "Vieux-Habitants",
        "Trois-Rivières",
      ],
    },
    {
      name: "Îles du Sud",
      cities: [
        "Grand-Bourg (Marie-Galante)",
        "Capesterre-de-Marie-Galante",
        "Saint-Louis (Marie-Galante)",
        "Terre-de-Haut (Les Saintes)",
        "Terre-de-Bas (Les Saintes)",
        "La Désirade",
      ],
    },
  ],
} as const;

/** Toutes les communes à plat — pratique pour le JSON-LD et les listings. */
export const allCities: readonly string[] = serviceArea.areas.flatMap((a) => a.cities);

/* ------------------------------------------------------------------
   CARACTÉRISTIQUES TECHNIQUES
   Source unique pour les chiffres affichés sur le site. Toute valeur
   annoncée publiquement doit venir d'ici, pour éviter les
   contradictions entre pages (cf. l'écart précision home / FAQ).
   ------------------------------------------------------------------ */
export const specs = {
  scanner: "FJD Trion P2",
  range: "40 à 70 m",
  rangeDetail: "selon réflectivité (> 10 % ou > 80 %)",
  precisionRelative: "± 1,2 cm",
  precisionAbsolute: "± 3 cm",
  lod: "LOD 200 à LOD 400",
  deliveryCloud: "5 jours",
  deliveryBim: "2 à 4 semaines",
  quoteDelay: "24 h ouvrées",
  mobilization: "48 h",
} as const;

/* ------------------------------------------------------------------
   SERVICES — une page de destination par service
   Chaque entrée génère /services/<slug> via src/pages/services/[slug].astro.
   Rédigé pour l'intention de recherche : requête → page dédiée.
   ⚠ Copy rédigée par IA, à relire avant mise en ligne définitive.
   ------------------------------------------------------------------ */
export type Service = {
  slug: string;
  num: string;
  name: string;
  navLabel: string;
  h1: string;
  h1Em: string;
  title: string;
  description: string;
  keywords: string;
  short: string;
  lede: string;
  sections: { h2: string; body: readonly string[] }[];
  deliverables: readonly string[];
  formats: readonly string[];
  useCases: readonly string[];
  faq: { q: string; a: string }[];
  related: readonly string[];
};

export const services: readonly Service[] = [
  {
    slug: "scan-3d-laser",
    num: "01",
    name: "Scan 3D laser & nuage de points",
    navLabel: "Scan 3D laser",
    h1: "Scan 3D laser",
    h1Em: "en Guadeloupe.",
    title: "Scan 3D laser en Guadeloupe — relevé LiDAR & nuage de points",
    description:
      "Relevé 3D par scanner laser en Guadeloupe : nuage de points géoréférencé, précision relative ± 1,2 cm, livraison en 5 jours. Bâtiments, sites industriels et patrimoine, y compris en exploitation.",
    keywords:
      "scan 3D Guadeloupe, scanner laser 3D, relevé LiDAR Guadeloupe, nuage de points, relevé 3D bâtiment, E57 LAS, FJD Trion P2, relevé existant 971",
    short:
      "Relevé exhaustif de l'existant au scanner laser. La base géométrique la plus fidèle de votre bâtiment.",
    lede: "Le scan 3D laser capture la géométrie réelle d'un bâtiment en millions de points mesurés, pas en cotes relevées à la main. Ce que vous obtenez n'est pas une interprétation du site : c'est le site.",
    sections: [
      {
        h2: "Ce qu'est réellement un nuage de points",
        body: [
          "Un scanner laser mesure la distance qui le sépare de chaque surface autour de lui, des dizaines de milliers de fois par seconde. Le résultat est un nuage de points : un relevé dense et continu où chaque point porte une coordonnée X, Y, Z, et où toute mesure reste possible après coup — y compris celles auxquelles personne n'avait pensé le jour de la visite.",
          "C'est la différence de fond avec un relevé traditionnel. Au mètre laser, on mesure ce qu'on a décidé de mesurer ; une cote oubliée impose un retour sur site. Au scan, la totalité de la géométrie est enregistrée en une passe. Les questions qui arrivent trois semaines plus tard se traitent depuis le bureau.",
        ],
      },
      {
        h2: "Comment nous intervenons sur site",
        body: [
          "L'acquisition se fait en plusieurs stations, recalées entre elles pour couvrir l'intérieur, l'enveloppe et les abords. Le nuage consolidé est ensuite nettoyé — végétation, passants, véhicules — puis segmenté par zones ou par niveaux selon l'usage prévu.",
          "En Guadeloupe, cette préparation compte autant que la captation. Végétation en limite de parcelle, forte réflectivité des toitures claires, sites occupés qu'on ne peut pas fermer : ce sont des contraintes de terrain récurrentes, qui se règlent en amont dans le plan de stationnement plutôt qu'en post-traitement.",
          "Les bâtiments en exploitation ne posent pas de difficulté particulière. Le scan est non intrusif et ne demande ni contact avec les surfaces ni interruption d'activité — un point qui compte pour l'hôtellerie, la distribution et les sites industriels.",
        ],
      },
      {
        h2: "Précision : ce que recouvrent les chiffres",
        body: [
          "Nous annonçons une précision relative de ± 1,2 cm et une précision absolue de ± 3 cm. Ces deux nombres ne disent pas la même chose et méritent d'être distingués.",
          "La précision relative décrit l'écart entre deux points du même nuage — c'est elle qui gouverne vos métrés, vos hauteurs sous plafond et vos épaisseurs de mur. La précision absolue décrit le positionnement de l'ensemble dans un système de coordonnées géoréférencé, ce qui devient déterminant dès qu'il faut raccorder le relevé à un fond de plan, à un cadastre ou à un autre lot.",
          "Pour une étude de transformation, la précision relative est celle qui compte. Pour un projet d'aménagement raccordé à des données externes, il faut regarder les deux.",
        ],
      },
    ],
    deliverables: [
      "Nuage de points consolidé et nettoyé",
      "Segmentation par zones, niveaux ou éléments",
      "Colorisation par altimétrie (option)",
      "Orthophotos de plans, coupes et façades",
      "Rapport de relevé accompagnant la livraison",
    ],
    formats: ["E57", "LAS", "XYZ", "RCP / RCS (Recap)"],
    useCases: [
      "Étude de transformation ou d'extension sur bâtiment existant",
      "Relevé d'un site industriel en exploitation",
      "Constat d'état avant travaux ou dossier assurantiel",
      "Numérisation de patrimoine bâti créole",
      "Vérification de conformité entre exécuté et projeté",
    ],
    faq: [
      {
        q: "Combien de temps faut-il pour scanner un bâtiment ?",
        a: "La captation sur site prend généralement une demi-journée à deux jours selon la surface et la complexité. Le nuage de points livrable est ensuite disponible sous 5 jours.",
      },
      {
        q: "Faut-il libérer les lieux pendant le scan ?",
        a: "Non. Le scan laser est non intrusif et fonctionne en site occupé. Nous adaptons simplement le plan de stationnement à l'activité en cours, avec possibilité d'intervention en dehors des heures d'ouverture sur les zones sensibles.",
      },
      {
        q: "Dans quels formats le nuage est-il livré ?",
        a: "E57, LAS, XYZ ou RCP selon votre chaîne logicielle. L'E57 reste le format d'échange le plus universel et fonctionne dans la quasi-totalité des logiciels du marché.",
      },
      {
        q: "Le nuage de points suffit-il, ou faut-il une maquette BIM ?",
        a: "Cela dépend de l'usage. Pour mesurer, vérifier et documenter, le nuage suffit. Pour concevoir, modifier et coordonner dans un logiciel BIM, il faut passer par une modélisation — c'est l'objet de notre prestation Scan-to-BIM.",
      },
    ],
    related: [
      "precision-nuage-de-points-georeferencement",
      "scan-3d-vs-releve-traditionnel",
      "releve-site-industriel-jarry",
    ],
  },
  {
    slug: "scan-to-bim",
    num: "02",
    name: "Scan-to-BIM — maquette Revit & ArchiCAD",
    navLabel: "Scan-to-BIM",
    h1: "Scan-to-BIM",
    h1Em: "Revit & ArchiCAD.",
    title: "Scan-to-BIM en Guadeloupe — maquette Revit, ArchiCAD & IFC",
    description:
      "Transformation de votre nuage de points en maquette BIM exploitable : Revit, ArchiCAD ou IFC, du LOD 200 au LOD 400. Modélisation fidèle à l'existant, livrée en 2 à 4 semaines.",
    keywords:
      "scan to BIM Guadeloupe, maquette BIM existant, modélisation Revit Guadeloupe, ArchiCAD, IFC, LOD 300, nuage de points vers Revit, BIM relevé existant",
    short:
      "Modélisation numérique fidèle à l'existant, produite à partir du nuage de points et structurée pour vos usages.",
    lede: "Un nuage de points se mesure, mais ne se modifie pas. Le Scan-to-BIM le convertit en objets paramétriques — murs, dalles, poteaux, menuiseries — pour que l'existant devienne une base de conception, et non plus seulement un constat.",
    sections: [
      {
        h2: "Du point mesuré à l'objet paramétrique",
        body: [
          "La modélisation consiste à interpréter le nuage pour en extraire des éléments constructifs : un plan de points devient un mur porteur avec une épaisseur, une hauteur et un matériau ; une série d'arêtes devient une menuiserie positionnée dans sa baie.",
          "Ce travail reste un travail d'interprétation, et c'est précisément là que l'expertise bâtiment compte. Un mur existant n'est jamais parfaitement d'aplomb, une dalle n'est jamais parfaitement plane. Décider de ce qu'on redresse et de ce qu'on conserve tel quel est un arbitrage de projet, pas un réglage logiciel — nous le calons avec vous avant de démarrer.",
        ],
      },
      {
        h2: "Choisir le bon niveau de détail",
        body: [
          "Nous modélisons du LOD 200 au LOD 400. Monter en LOD n'est pas systématiquement une amélioration : c'est un coût, un délai et un poids de fichier supplémentaires, qui ne se justifient que si le projet les exploite.",
          "En LOD 200, vous obtenez les volumes et l'enveloppe — suffisant pour une faisabilité, une étude de capacité ou un avant-projet. En LOD 300, les éléments constructifs sont dimensionnés et positionnés avec précision, ce qui couvre la majorité des projets de réhabilitation. Le LOD 400 ne se justifie que sur les lots où l'exécution se prépare directement depuis la maquette.",
          "Si vous hésitez, décrivez-nous l'usage plutôt que le LOD : nous vous proposerons le niveau qui correspond.",
        ],
      },
      {
        h2: "Intégration dans votre environnement de travail",
        body: [
          "La maquette est structurée selon vos conventions : arborescence, nomenclature, gabarits d'agence. Nous livrons en format natif Revit (.rvt) ou ArchiCAD (.pln), ou en IFC pour une interopérabilité complète avec les autres intervenants du projet.",
          "Le nuage de points d'origine peut être fourni avec la maquette, calé dans le même repère. Vous conservez ainsi la possibilité de vérifier n'importe quel élément modélisé contre la mesure réelle — ce qui reste la meilleure garantie de fiabilité sur un relevé d'existant.",
        ],
      },
    ],
    deliverables: [
      "Maquette BIM structurée, du LOD 200 au LOD 400",
      "Arborescence et nomenclature adaptées à vos gabarits",
      "Nuage de points d'origine calé dans le même repère",
      "Plans, coupes et façades extraits de la maquette",
      "Export IFC pour la coordination inter-lots",
    ],
    formats: ["RVT (Revit)", "PLN (ArchiCAD)", "IFC 2x3 / IFC 4", "DWG"],
    useCases: [
      "Réhabilitation lourde ou restructuration",
      "Extension et surélévation sur bâti existant",
      "Dossier de permis de construire sur existant",
      "Coordination inter-lots sur un bâtiment non documenté",
      "Constitution d'un référentiel patrimonial pour un gestionnaire",
    ],
    faq: [
      {
        q: "Quel est le délai pour une maquette BIM ?",
        a: "Comptez 2 à 4 semaines après la livraison du nuage de points, selon la surface et le LOD demandé. Les deux prestations peuvent être commandées ensemble : le nuage part en premier pour que vous puissiez commencer à travailler.",
      },
      {
        q: "Pouvez-vous travailler avec les gabarits de notre agence ?",
        a: "Oui. Fournissez-nous votre template Revit ou ArchiCAD et vos conventions de nommage, et la maquette est produite directement dedans. C'est le moyen le plus sûr d'éviter une reprise complète à la réception.",
      },
      {
        q: "Modélisez-vous les réseaux et la structure ?",
        a: "Oui, dans la limite de ce qui est visible au scan. Les réseaux encastrés ou situés en faux plafond fermé ne sont pas captés par un scanner laser : ils doivent être ouverts au moment du relevé ou reconstitués à partir de vos documents existants.",
      },
      {
        q: "Faut-il déjà disposer d'un nuage de points ?",
        a: "Non, nous réalisons généralement les deux. Si vous disposez déjà d'un nuage produit par un tiers, nous pouvons partir de celui-ci après vérification de sa densité et de sa qualité de recalage.",
      },
    ],
    related: [
      "scan-to-bim-nuage-de-points-revit",
      "precision-nuage-de-points-georeferencement",
      "scan-3d-vs-releve-traditionnel",
    ],
  },
  {
    slug: "plans-2d-dwg",
    num: "03",
    name: "Plans, coupes & façades DWG",
    navLabel: "Plans DWG",
    h1: "Plans, coupes",
    h1Em: "& façades.",
    title: "Plans, coupes et façades DWG en Guadeloupe — relevé architectural",
    description:
      "Production de plans de niveau, coupes et façades DWG à partir d'un relevé 3D laser en Guadeloupe. Documents 2D fidèles à l'existant, prêts pour l'étude et le dossier administratif.",
    keywords:
      "plan DWG Guadeloupe, relevé architectural, plan de niveau, coupe façade, plan de récolement, AutoCAD, dossier permis de construire existant",
    short:
      "Documents 2D produits depuis le relevé ou la maquette, prêts pour l'étude et la phase administrative.",
    lede: "Beaucoup de projets n'ont pas besoin d'une maquette BIM : ils ont besoin de plans justes. Nous extrayons directement du relevé 3D les documents 2D dont vous vous servez réellement.",
    sections: [
      {
        h2: "Des plans extraits de la mesure, pas redessinés",
        body: [
          "Un plan produit depuis un nuage de points n'est pas un dessin d'interprétation : c'est une coupe dans la géométrie réelle du bâtiment. Les décalages, les murs non parallèles et les épaisseurs variables y apparaissent tels qu'ils sont, au lieu d'être lissés par habitude de dessin.",
          "C'est ce qui évite le scénario classique de la réhabilitation : un plan propre en phase étude, et un écart de plusieurs centimètres découvert au moment de l'exécution.",
        ],
      },
      {
        h2: "Ce que nous produisons",
        body: [
          "Plans de niveau, plans de toiture, coupes longitudinales et transversales, élévations de façade. Chaque document est calé sur le même relevé, ce qui garantit leur cohérence entre eux — un point qui n'a rien d'évident quand les plans proviennent de sources et d'époques différentes.",
          "Les fichiers sont livrés en DWG structuré par calques, selon vos conventions si vous en avez. Nous fournissons également un PDF coté pour la diffusion et la validation.",
        ],
      },
    ],
    deliverables: [
      "Plans de niveau et plan de toiture",
      "Coupes longitudinales et transversales",
      "Élévations de façade",
      "Fichiers DWG structurés par calques",
      "PDF cotés pour diffusion",
    ],
    formats: ["DWG", "DXF", "PDF"],
    useCases: [
      "Dossier de permis de construire sur bâtiment existant",
      "Plan de récolement après travaux",
      "Consultation d'entreprises et appel d'offres",
      "Diagnostic technique ou étude de faisabilité",
      "Mise à jour d'archives de plans obsolètes",
    ],
    faq: [
      {
        q: "Les plans sont-ils cotés ?",
        a: "Oui. Nous livrons un DWG structuré par calques ainsi qu'un PDF coté prêt à diffuser. Le niveau de cotation est adapté à l'usage : dossier administratif, consultation d'entreprises ou étude technique.",
      },
      {
        q: "Peut-on commander uniquement des plans, sans nuage ni maquette ?",
        a: "Oui. Le relevé 3D reste réalisé, puisque c'est lui qui garantit la justesse des plans, mais la livraison peut se limiter aux documents 2D si c'est tout ce dont vous avez besoin.",
      },
      {
        q: "Respectez-vous nos conventions de calques ?",
        a: "Oui, transmettez-nous votre charte et nous produisons directement dedans. À défaut, nous appliquons une structure de calques standard et lisible.",
      },
    ],
    related: ["scan-3d-vs-releve-traditionnel", "scan-to-bim-nuage-de-points-revit"],
  },
  {
    slug: "modelisation-3d-visite-virtuelle",
    num: "04",
    name: "Modèle 3D & visite virtuelle",
    navLabel: "Modèle 3D & visite virtuelle",
    h1: "Modèle 3D",
    h1Em: "& visite virtuelle.",
    title: "Modèle 3D et visite virtuelle en Guadeloupe — jumeau numérique",
    description:
      "Modèle 3D texturé et visite virtuelle web à partir d'un scan 3D en Guadeloupe. Valorisation, validation à distance et jumeau numérique consultable depuis un navigateur.",
    keywords:
      "visite virtuelle Guadeloupe, modèle 3D bâtiment, jumeau numérique, maquette 3D texturée, WebGL, mesh photoréaliste, valorisation immobilière 3D",
    short:
      "Restitution immersive du bâtiment relevé, consultable dans un navigateur, sans logiciel spécifique.",
    lede: "Tout le monde ne sait pas lire un plan, et personne n'installe un logiciel BIM pour valider une idée. Le modèle 3D et la visite virtuelle rendent le relevé lisible par l'ensemble des interlocuteurs d'un projet.",
    sections: [
      {
        h2: "Un support que tout le monde peut ouvrir",
        body: [
          "La visite virtuelle se consulte depuis un navigateur, sur ordinateur comme sur téléphone, par simple lien. Pas d'installation, pas de licence, pas de format propriétaire à convertir.",
          "C'est souvent ce qui débloque les échanges avec un maître d'ouvrage, un investisseur ou une commission : la géométrie est la même que celle du relevé, mais elle est enfin lisible sans compétence technique.",
        ],
      },
      {
        h2: "Décider et valider sans se déplacer",
        body: [
          "En Guadeloupe, la distance est un coût réel — entre les îles du Sud et la Grande-Terre, entre l'archipel et un donneur d'ordre en métropole. Un bâtiment consultable en ligne remplace une part significative des visites de site.",
          "Le modèle peut également être exporté vers des moteurs 3D (Blender, Unreal, Unity) pour du rendu architectural, de la production audiovisuelle ou des contenus interactifs.",
        ],
      },
    ],
    deliverables: [
      "Visite virtuelle web (WebGL), accessible par lien",
      "Mesh photoréaliste texturé",
      "Modèle 3D exportable vers Blender, Unreal ou Unity",
      "Archivage haute densité du bâtiment relevé",
    ],
    formats: ["Lien web (WebGL)", "GLB / glTF", "OBJ", "FBX"],
    useCases: [
      "Échange et validation à distance avec le maître d'ouvrage",
      "Valorisation d'un bien immobilier ou hôtelier",
      "Suivi de projet sans déplacement sur site",
      "Archivage d'un édifice patrimonial avant travaux",
      "Rendu architectural et production de contenus",
    ],
    faq: [
      {
        q: "Peut-on prendre des mesures dans la visite virtuelle ?",
        a: "Les outils de mesure dépendent de la plateforme de diffusion retenue ; nous calons ce point avec vous au devis. Pour un métré contractuel, c'est le nuage de points qui fait foi.",
      },
      {
        q: "La visite virtuelle est-elle accessible publiquement ?",
        a: "Vous choisissez. Le lien peut rester privé et partagé aux seules personnes concernées, ou être diffusé publiquement pour un usage de valorisation.",
      },
      {
        q: "Quelle différence avec une visite photo à 360° ?",
        a: "Une visite photo juxtapose des panoramiques ; notre restitution repose sur la géométrie mesurée du bâtiment. On s'y déplace librement et les proportions sont réelles, ce qui n'est pas le cas d'un assemblage de photos.",
      },
    ],
    related: ["numeriser-patrimoine-creole-antilles", "scan-3d-vs-releve-traditionnel"],
  },
] as const;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/projets", label: "Nos projets" },
  { href: "/outils", label: "Nos outils" },
  { href: "/blog", label: "Blog" },
] as const;
