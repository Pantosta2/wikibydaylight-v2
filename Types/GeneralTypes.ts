export type Perk = {
  id: number;
  name: string;
  description: string;
  icon: string;
  code: string;
  survivorCode?: string | null;
  killerCode?: string | null;
};

export type CharacterSpecificPerksResponse = Perk[];

type BaseCharacter = {
  number: number;
  code: string;
  name: string;
  overview: string;
  backstory: string;
  nationality: string;
  dlc: string;
  imgs: {
    portrait: string;
  };
};

export type PowerDetails = {
  powerName: string;
  killerCode: string;
  description: string;
};

export type KillerApiData = BaseCharacter & {
  role: 'killer';
  fullName: string;
  gender: string;
  difficulty: string;
  moveSpeed: number | string;
  terrorRadius: number | string;
  powerName: string;
  description: string;
  power: { 
    powerName: string;
    powerCode: string;
  };
};

export type SurvivorApiData = BaseCharacter & {
  role: "survivor";
};

export type CharacterProfileData = KillerApiData | SurvivorApiData;

export type CharacterListEnvelope = {
  data: CharacterProfileData[];
};

