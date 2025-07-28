import {
  getKillers,
  getSurvivors,
  getCharacterPerks,
} from "@/common/services/dbdApi.service";
import type { Perk } from "@/common/types/GeneralTypes";

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
