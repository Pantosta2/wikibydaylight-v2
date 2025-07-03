import type { AxiosResponse } from "axios";
import axios from "axios";
import type {
  CharacterListEnvelope,
  Perk,
  PowerDetails,
  CharacterSpecificPerksResponse,
  CharacterProfileData
} from "../Types/GeneralTypes";

const Url = "http://localhost:3001/api"; 

const getKillers = async (): Promise<AxiosResponse<CharacterListEnvelope>> => {
  return await axios.get<CharacterListEnvelope>(`${Url}/killer`);
};

const getSurvivors = async (): Promise<AxiosResponse<CharacterListEnvelope>> => {
  return await axios.get<CharacterListEnvelope>(`${Url}/survivor`);
};

const getCharacterPerks = (
  role: "killer" | "survivor",
  characterCode: string
): Promise<AxiosResponse<CharacterSpecificPerksResponse>> => {
  return axios.get<CharacterSpecificPerksResponse>(`${Url}/${role}/${characterCode}/perk`);
};

const getKillerPowerDetails = (
  characterCode: string
): Promise<AxiosResponse<PowerDetails>> => {
  return axios.get<PowerDetails>(`${Url}/killer/${characterCode}/power`);
};

export async function fetchAllPerksForRole(role: "killer" | "survivor"): Promise<Perk[]> {
  try {
    const charactersPromise = role === "killer" ? getKillers() : getSurvivors();
    const generalPerksPromise = getCharacterPerks(role, "all");

    const [characterResponse, generalPerksResponse] = await Promise.all([
      charactersPromise,
      generalPerksPromise,
    ]);

    const characters = characterResponse.data.data || [];
    const combinedPerksList: Perk[] = (generalPerksResponse.data as any).data || [];

    const characterPerkPromises = characters.map(char =>
      getCharacterPerks(role, char.code).catch(() => ({ data: { data: [] } }))
    );

    const characterPerksResponses = await Promise.all(characterPerkPromises);
    characterPerksResponses.forEach(response => {
      const perks = (response.data as any).data || [];
      combinedPerksList.push(...perks);
    });

    const uniquePerksMap = new Map<number, Perk>();
    combinedPerksList.forEach(perk => {
      if (perk && perk.id) {
        uniquePerksMap.set(perk.id, perk);
      }
    });

    return Array.from(uniquePerksMap.values());
  } catch (error) {
    console.error(`Error al obtener perks para ${role}:`, error);
    return [];
  }
}

export {
  getKillers,
  getSurvivors,
  getCharacterPerks,
  getKillerPowerDetails
};

export type {
  CharacterProfileData,
  Perk,
  CharacterListEnvelope,
  PowerDetails,
  CharacterSpecificPerksResponse
};