import { SkillTable } from "./schema";

const intelligenceSkills: (typeof SkillTable.$inferInsert)[] = [
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
const constitutionSkills: (typeof SkillTable.$inferInsert)[] = [
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
const forceSkills: (typeof SkillTable.$inferInsert)[] = [
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
const powerSkills: (typeof SkillTable.$inferInsert)[] = [
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
const willSkills: (typeof SkillTable.$inferInsert)[] = [
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
const socialSkills: (typeof SkillTable.$inferInsert)[] = [
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
const knowHowSkills: (typeof SkillTable.$inferInsert)[] = [
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
const agilitySkills: (typeof SkillTable.$inferInsert)[] = [
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
const sociableSkills: (typeof SkillTable.$inferInsert)[] = [
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
