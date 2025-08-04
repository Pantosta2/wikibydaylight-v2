import type { AxiosResponse } from "axios";
import apiClient from "./api";
import type {
  CharacterListEnvelope,
  Perk,
  PowerDetails,
  CharacterProfileData,
  ApiResponse,
  ROLES,
} from "../types/GeneralTypes";

export const getKillers = async (): Promise<
  AxiosResponse<ApiResponse<CharacterProfileData[]>>
> => {
  const response = await apiClient.get<ApiResponse<CharacterProfileData[]>>(
    `/killer`
  );
  if (!response.data || !response.data.data) {
    throw new Error("Respuesta inválida de la API para Killers.");
  }
  return response;
};

export const getSurvivors = async (): Promise<
  AxiosResponse<CharacterListEnvelope>
> => {
  const response = await apiClient.get<CharacterListEnvelope>("/survivor");
  if (!response.data || !response.data.data) {
    throw new Error("Respuesta inválida de la API para Survivors.");
  }
  return response;
};

export const getCharacterPerks = (
  role: typeof ROLES.KILLER | typeof ROLES.SURVIVOR,
  characterCode: string
): Promise<AxiosResponse<ApiResponse<Perk[]>>> => {
  return apiClient.get<ApiResponse<Perk[]>>(`/${role}/${characterCode}/perk`);
};

export const getKillerPowerDetails = async (
  characterCode: string
): Promise<AxiosResponse<ApiResponse<PowerDetails[]>>> => {
  return apiClient.get<ApiResponse<PowerDetails[]>>(
    `/killer/${characterCode}/power`
  );
};
