import type { AxiosResponse } from "axios";
import apiClient from "./api";
import axios from "axios";
import type {
  CharacterListEnvelope,
  Perk,
  PowerDetails,
  CharacterSpecificPerksResponse,
  CharacterProfileData,
  ApiResponse,
} from "../Types/GeneralTypes";

const Url = "http://localhost:3001/api";

const getKillers = async (): Promise<
  AxiosResponse<ApiResponse<CharacterProfileData[]>>
> => {
  return await apiClient.get<ApiResponse<CharacterProfileData[]>>(`/killer`);
};

const getSurvivors = async (): Promise<
  AxiosResponse<CharacterListEnvelope>
> => {
  return await apiClient.get<CharacterListEnvelope>("/survivor");
};

const getCharacterPerks = (
  role: "killer" | "survivor",
  characterCode: string
): Promise<AxiosResponse<ApiResponse<Perk[]>>> => {
  return apiClient.get<ApiResponse<Perk[]>>(`/${role}/${characterCode}/perk`);
};

const getKillerPowerDetails = (
  characterCode: string
): Promise<AxiosResponse<ApiResponse<PowerDetails[]>>> => {
  // Usa el tipo genérico
  return apiClient.get<ApiResponse<PowerDetails[]>>(
    `/killer/${characterCode}/power`
  );
};

export async function fetchAllPerksForRole(
  role: "killer" | "survivor"
): Promise<Perk[]> {
  try {
    const charactersPromise = role === "killer" ? getKillers() : getSurvivors();
    const generalPerksPromise = getCharacterPerks(role, "all");

    const [characterResponse, generalPerksResponse] = await Promise.all([
      charactersPromise,
      generalPerksPromise,
    ]);

    const characters = characterResponse.data.data || [];
    const combinedPerksList: Perk[] =
      (generalPerksResponse.data as any).data || [];

    const characterPerkPromises = characters.map((char) =>
      getCharacterPerks(role, char.code).catch(() => ({ data: { data: [] } }))
    );

    const characterPerksResponses = await Promise.all(characterPerkPromises);
    characterPerksResponses.forEach((response) => {
      const perks = (response.data as any).data || [];
      combinedPerksList.push(...perks);
    });

    const uniquePerksMap = new Map<number, Perk>();
    combinedPerksList.forEach((perk) => {
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

export { getKillers, getSurvivors, getCharacterPerks, getKillerPowerDetails };

export type {
  CharacterProfileData,
  Perk,
  CharacterListEnvelope,
  PowerDetails,
  CharacterSpecificPerksResponse,
};
