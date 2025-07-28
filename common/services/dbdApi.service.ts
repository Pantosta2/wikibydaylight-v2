import type { AxiosResponse } from "axios";
import apiClient from "./api";
import type {
  CharacterListEnvelope,
  Perk,
  PowerDetails,
  CharacterProfileData,
  ApiResponse,
} from "../types/GeneralTypes";

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
  return apiClient.get<ApiResponse<PowerDetails[]>>(
    `/killer/${characterCode}/power`
  );
};

export { getKillers, getSurvivors, getCharacterPerks, getKillerPowerDetails };
