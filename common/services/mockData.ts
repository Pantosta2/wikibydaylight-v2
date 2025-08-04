import {
  KillerApiData,
  SurvivorApiData,
  Perk,
  ROLES,
} from "@/common/types/GeneralApiTypes";

export const mockKillers: KillerApiData[] = [
  {
    number: 1,
    code: "trapper",
    name: "The Trapper",
    fullName: "Evan MacMillan",
    gender: "Male",
    role: ROLES.KILLER,
    overview:
      "Un asesino basado en el control del mapa que pone trampas para osos.",
    backstory: "La historia de Evan es una de riqueza y abuso...",
    nationality: "American",
    dlc: "Base Game",
    difficulty: "Fácil",
    moveSpeed: 4.6,
    terrorRadius: 32,
    powerName: "Bear Trap",
    description: "Usa trampas para inmovilizar a los supervivientes.",
    power: {
      powerName: "Bear Trap",
      powerCode: "trapper-power",
    },
    imgs: {
      portrait: "/damien-devaux-dbd-alftd-killer-character-art-Photoroom.png",
    },
  },
  {
    number: 2,
    code: "wraith",
    name: "The Wraith",
    fullName: "Philip Ojomo",
    gender: "Male",
    role: ROLES.KILLER,
    overview: "Un asesino sigiloso que puede volverse invisible.",
    backstory: "Philip era un inmigrante que fue engañado...",
    nationality: "Nigerian",
    dlc: "Base Game",
    difficulty: "Fácil",
    moveSpeed: 4.6,
    terrorRadius: 32,
    powerName: "Wailing Bell",
    description:
      "Le permite volverse invisible y emboscar a los supervivientes.",
    power: {
      powerName: "Wailing Bell",
      powerCode: "wraith-power",
    },
    imgs: {
      portrait: "/damien-devaux-dbd-alftd-killer-character-art-Photoroom.png",
    },
  },
  {
    number: 3,
    code: "huntress",
    name: "The Huntress",
    fullName: "Anna",
    gender: "Female",
    role: ROLES.KILLER,
    overview: "Una asesina a distancia que lanza hachas de caza.",
    backstory: "Anna fue criada en el bosque por su madre...",
    nationality: "Russian",
    dlc: "A Lullaby for the Dark",
    difficulty: "Moderado",
    moveSpeed: 4.4,
    terrorRadius: 20,
    powerName: "Hunting Hatchets",
    description: "Lanza hachas para herir a los supervivientes desde lejos.",
    power: {
      powerName: "Hunting Hatchets",
      powerCode: "huntress-power",
    },
    imgs: {
      portrait: "/damien-devaux-dbd-alftd-killer-character-art-Photoroom.png",
    },
  },
];

export const mockSurvivors: SurvivorApiData[] = [
  {
    number: 1,
    code: "dwight",
    name: "Dwight Fairfield",
    role: ROLES.SURVIVOR,
    overview: "Un líder nervioso que mejora la eficiencia del equipo.",
    backstory: "Dwight era un estudiante tímido y torpe...",
    nationality: "American",
    dlc: "Base Game",
    imgs: {
      portrait: "/haddonfield_realm_lampkinlane_map_9827b7adfc.jpg",
    },
  },
  {
    number: 2,
    code: "meg",
    name: "Meg Thomas",
    role: ROLES.SURVIVOR,
    overview: "Una atleta enérgica capaz de correr a gran velocidad.",
    backstory:
      "Meg era una estrella del atletismo que se rebeló contra su madre...",
    nationality: "American",
    dlc: "Base Game",
    imgs: {
      portrait: "/haddonfield_realm_lampkinlane_map_9827b7adfc.jpg",
    },
  },
  {
    number: 3,
    code: "claudette",
    name: "Claudette Morel",
    role: ROLES.SURVIVOR,
    overview: "Una botánica estudiosa que se especializa en la curación.",
    backstory:
      "Claudette es una entusiasta de la ciencia que prefiere la soledad...",
    nationality: "Canadian",
    dlc: "Base Game",
    imgs: {
      portrait: "/haddonfield_realm_lampkinlane_map_9827b7adfc.jpg",
    },
  },
];

export const mockPerks: Perk[] = [
  {
    id: 101,
    name: "Sloppy Butcher",
    description: "Las heridas causan más sangrado y tardan más en sanar.",
    icon: null,
    code: "sloppy",
    killerCode: "",
    survivorCode: null,
  },
  {
    id: 102,
    name: "Hex: No One Escapes Death",
    description:
      "Una vez que las puertas de salida están energizadas, ganas un gran aumento de velocidad.",
    icon: null,
    code: "noed",
    killerCode: "",
    survivorCode: null,
  },

  {
    id: 201,
    name: "Kindred",
    description:
      "Cuando estás en el gancho, las auras de todos los jugadores se revelan entre sí.",
    icon: null,
    code: "kindred",
    killerCode: null,
    survivorCode: "",
  },
  {
    id: 202,
    name: "We'll Make It",
    description:
      "Después de desenganchar a un superviviente, ganas velocidad de curación adicional.",
    icon: null,
    code: "wellmakeit",
    killerCode: null,
    survivorCode: "",
  },

  {
    id: 3,
    name: "Leader",
    description:
      "Aumenta la velocidad de acción de otros supervivientes cercanos.",
    icon: null,
    code: "leader",
    killerCode: null,
    survivorCode: "dwight",
  },
  {
    id: 4,
    name: "Sprint Burst",
    description:
      "Al empezar a correr, esprinta a un 150% de tu velocidad normal.",
    icon: null,
    code: "sprint",
    killerCode: null,
    survivorCode: "meg",
  },
  {
    id: 5,
    name: "Beast of Prey",
    description: "La mancha de sangre desaparece después de ganar Bloodlust.",
    icon: null,
    code: "beastofprey",
    killerCode: "huntress",
    survivorCode: null,
  },
];
