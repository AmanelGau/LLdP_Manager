import { skillTable, statEnum } from "./schema";

const intelligenceSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Connaissances des Créatures",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Connaissances des Cultures",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Connaissances de la Flore",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Connaissances des Gemmes",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Connaissances Autre",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Escroquerie",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Estimation",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Culture Artistique",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Géographie",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Le Tesérell 'akar",
    stat: "intelligence",
    basic: false,
  },
  {
    name: "L'Hélectyon",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Le Kotts",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "La Miallisim",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Le Garak",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Le Yulionn",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "L'Aresim",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "L'Ancien Reqw'em",
    stat: "intelligence",
    basic: false,
  },
  {
    name: "Mémoire",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Mythe des Gardiens",
    stat: "intelligence",
    basic: false,
  },
  {
    name: "Orientation",
    stat: "intelligence",
    basic: true,
  },
  {
    name: "Diagnostique",
    stat: "intelligence",
    basic: true,
  },
];
const constitutionSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Résistance magique / physique",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Mithridatisation",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Résistance aux maladie",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Vigueur",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Intimidation",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Bloquer",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Survie",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Manœuvre",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Apné",
    stat: "constitution",
    basic: true,
  },
  {
    name: "Résistance climatique",
    stat: "constitution",
    basic: true,
  },
];
const forceSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Athlétisme",
    stat: "force",
    basic: true,
  },
  {
    name: "Armes Contondantes",
    stat: "force",
    basic: true,
  },
  {
    name: "Armes Estocs",
    stat: "force",
    basic: true,
  },
  {
    name: "Armes Improvisées",
    stat: "force",
    basic: true,
  },
  {
    name: "Armes d'haste",
    stat: "force",
    basic: true,
  },
  {
    name: "Armes Tranchantes",
    stat: "force",
    basic: true,
  },
  {
    name: "Rixe",
    stat: "force",
    basic: true,
  },
  {
    name: "Parer",
    stat: "force",
    basic: true,
  },
  {
    name: "Natation",
    stat: "force",
    basic: true,
  },
  {
    name: "Escalade",
    stat: "force",
    basic: true,
  },
];
const powerSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Magie Arcanique",
    stat: "power",
    basic: true,
  },
  {
    name: "Magie Occulte",
    stat: "power",
    basic: true,
  },
  {
    name: "Magie Élémentaire",
    stat: "power",
    basic: true,
  },
  {
    name: "Magie Runique",
    stat: "power",
    basic: true,
  },
];
const willSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Écouter",
    stat: "will",
    basic: true,
  },
  {
    name: "Empathie",
    stat: "will",
    basic: true,
  },
  {
    name: "Fouille",
    stat: "will",
    basic: true,
  },
  {
    name: "Goûter",
    stat: "will",
    basic: true,
  },
  {
    name: "Intuition",
    stat: "will",
    basic: true,
  },
  {
    name: "Résistance à la magie psy",
    stat: "will",
    basic: true,
  },
  {
    name: "Sentir",
    stat: "will",
    basic: true,
  },
  {
    name: "Toucher",
    stat: "will",
    basic: true,
  },
  {
    name: "Vigilance",
    stat: "will",
    basic: true,
  },
  {
    name: "Observation",
    stat: "will",
    basic: true,
  },
  {
    name: "Courage",
    stat: "will",
    basic: true,
  },
];
const socialSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Baratin",
    stat: "social",
    basic: true,
  },
  {
    name: "Dressage",
    stat: "social",
    basic: true,
  },
  {
    name: "Mentir",
    stat: "social",
    basic: true,
  },
  {
    name: "Perspicacité",
    stat: "social",
    basic: true,
  },
  {
    name: "Persuasion",
    stat: "social",
    basic: true,
  },
  {
    name: "Séduction",
    stat: "social",
    basic: true,
  },
  {
    name: "Calme",
    stat: "social",
    basic: true,
  },
];
const knowHowSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Bricolage",
    stat: "knowHow",
    basic: true,
  },
  {
    name: "Métier",
    stat: "knowHow",
    basic: true,
  },
  {
    name: "Pratique artistique",
    stat: "knowHow",
    basic: true,
  },
  {
    name: "Pister",
    stat: "knowHow",
    basic: true,
  },
  {
    name: "Conduite",
    stat: "knowHow",
    basic: true,
  },
  {
    name: "Premier secours",
    stat: "knowHow",
    basic: true,
  },
  {
    name: "Jeu",
    stat: "knowHow",
    basic: true,
  },
];
const agilitySkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Acrobatie",
    stat: "agility",
    basic: true,
  },
  {
    name: "Arbalète",
    stat: "agility",
    basic: true,
  },
  {
    name: "Arc",
    stat: "agility",
    basic: true,
  },
  {
    name: "Armes Exotiques",
    stat: "agility",
    basic: true,
  },
  {
    name: "Armes de Sièges",
    stat: "agility",
    basic: true,
  },
  {
    name: "Armes de Jet",
    stat: "agility",
    basic: true,
  },
  {
    name: "Crochetage",
    stat: "agility",
    basic: true,
  },
  {
    name: "Dextérité",
    stat: "agility",
    basic: true,
  },
  {
    name: "Discrétion",
    stat: "agility",
    basic: true,
  },
  {
    name: "Equitation",
    stat: "agility",
    basic: true,
  },
  {
    name: "Esquive",
    stat: "agility",
    basic: true,
  },
  {
    name: "Tire-laine",
    stat: "agility",
    basic: true,
  },
  {
    name: "Dissimulation",
    stat: "agility",
    basic: true,
  },
  {
    name: "Reflexe",
    stat: "agility",
    basic: true,
  },
];
const sociableSkills: (typeof skillTable.$inferInsert)[] = [
  {
    name: "Relation",
    stat: "sociable",
    basic: true,
  },
  {
    name: "Tradition",
    stat: "sociable",
    basic: true,
  },
  {
    name: "Religion",
    stat: "sociable",
    basic: true,
  },
  {
    name: "Réputation",
    stat: "sociable",
    basic: true,
  },
  {
    name: "Apaisement",
    stat: "sociable",
    basic: true,
  },
];

export const skills = [
  ...intelligenceSkills,
  ...constitutionSkills,
  ...forceSkills,
  ...powerSkills,
  ...willSkills,
  ...socialSkills,
  ...knowHowSkills,
  ...agilitySkills,
  ...sociableSkills,
];

export const races = [
  {
    name: "Thalyphim",
    categorie: "Equinoxs",
    image: "",
    physique:
      "Prototype des anges, les Thalyphims possèdent une apparence se rapprochant davantage de la harpie que de l'ange contemporain, ces êtres sont très raffinés et élancés apparenté au Edragoness. Ils sont affublés d'un masque qui n'est jamais, au grand jamais retiré, seul les êtres composant cette espèce et leurs créateur en connaissent la raison. Les Thalyphims sont androgynes et pour certains ils présentent les deux sexes.",
    character:
      "On peut définir les Thalyphims comme d'humble créature possédant un grand respect pour autrui, mais cette considération devant être mutuelle si on lui en manque vous vous attirerez les foudres du Thalyphim en question. Traits communs à leurs successeur les Thalyphims savent exprimer une grande douceur et une empathie certaine pour les autres. Bien que leur visage soit caché ils savent démontrer tout un spectre émotionnel large et varié par les plumes dont ils sont parés, un changement de couleurs, de teinte, des plume vibrantes à différent rythme.",
    bonus: [
      {
        type: "default",
        stats: [
          [statEnum.enumValues[2], statEnum.enumValues[5]],
          [statEnum.enumValues[2], statEnum.enumValues[7]],
        ],
      },
    ],
  },
  {
    name: "Ange",
    categorie: "Eternels",
    image: "",
    physique:
      "Les Anges ont une apparence élancée. Ils ont la peau pâle, les cheveux et les yeux clairs. Ils ont de grandes ailes de couleur blanche en passant par le bleu ou jaune pastel/clair. Ils possèdent une auréole au-dessus de la tête qui représente leur vices (1 à 7 pics). L'auréole est invisible aux yeux des autres qui ne sont pas des anges (sauf pour ceux qui ont frôler la mort de très très près). Leurs tailles varient entre 1m65 et 1m90.",
    character:
      "Les Anges, avec 3 pics ou plus sont considérés comme une hérésie pour les autres anges. Ils ont un caractère généralement hautain. Ils jugent les autres races très facilement et déteste avoir tort ou se sentir inutile. Ils sont doués d'une facilité à cerner les autres races. Ils sont pourtant d'une grande douceur et d'un calme apaisant.",
    bonus: [
      {
        type: "default",
        stats: [[statEnum.enumValues[2], statEnum.enumValues[5]]],
      },
    ],
  },
  {
    name: "Demon",
    categorie: "Eternels",
    image: "",
    physique:
      "Les Démons font partie des races les plus hétéroclites des différents royaume, ils ne possèdent que très peu de caractéristique propres et certains représentant de cette espèce peuvent être assimilé à d'autre race. On note néanmoins une récurrence de la présence de queues, cornes, ailes, des canines proéminente, ainsi que des yeux de félins ou de serpents, bien sûr les Démons de possèdent pas tout à la fois mais généralement ils en cumulent deux ou trois, ce qui permet pour les plus fins observateurs de les différencier des autre races.",
    character:
      "Issu d'une société élitiste, les Démons possèdent un caractère au diapason de cette dernières, ils sont arrogant, manipulateur et baigne dans un orgueil cultivé par la pureté du sang. En complément de leurs facilité à évoluer en communauté ils suivent un code d'honneur appelé «La Daemonys»>, bien que les légendes les présentent comme des créatures abjectes et sans la moindre once de sentiment positif, ce grand sens de l'honneur et du devoir les placent comme allié fidèle lors des moment les plus sombre de votre aventure, si ces derniers sont de votre coté.",
    bonus: [
      {
        type: "Sang-Pur",
        stats: [
          [statEnum.enumValues[8], statEnum.enumValues[3]],
          [statEnum.enumValues[1], statEnum.enumValues[3]],
        ],
      },
      ,
      {
        type: "Dynastie",
        stats: [[statEnum.enumValues[0], statEnum.enumValues[2]]],
      },
      {
        type: "Demi-Sang",
        stats: [[statEnum.enumValues[1], statEnum.enumValues[2]]],
      },
    ],
  },
];
