import { mockKillers, mockSurvivors, mockPerks } from "./mockData";
import { ROLES } from "@/common/types/GeneralTypes";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
const createApiResponse = (data: any): Promise<AxiosResponse> => {
  const mockResponse: AxiosResponse = {
    data: {
      data: data,
    },
    status: 200,
    statusText: "OK (from Mock)",
    headers: {},
    config: {} as InternalAxiosRequestConfig,
  };
  return Promise.resolve(mockResponse);
};

export const getKillers = async () => {
  console.log("Fetching MOCK Killers");
  return createApiResponse(mockKillers);
};

export const getSurvivors = async () => {
  console.log("Fetching MOCK Survivors");
  return createApiResponse(mockSurvivors);
};

export const getCharacterPerks = async (
  role: string,
  characterCode: string
) => {
  console.log(`Fetching MOCK perks for ${role}: ${characterCode}`);
  if (characterCode === "all") {
    const generalPerks = mockPerks.filter(
      (p) => p.killerCode === null && p.survivorCode === null
    );
    return createApiResponse(generalPerks);
  }

  const characterPerks = mockPerks.filter(
    (p) => p.killerCode === characterCode || p.survivorCode === characterCode
  );
  return createApiResponse(characterPerks);
};

export const fetchAllPerksForRole = async (role: string) => {
  console.log(`Fetching ALL MOCK perks for ${role}`);
  if (role === ROLES.KILLER) {
    return mockPerks.filter(
      (p) => p.killerCode !== null || p.survivorCode === null
    );
  }
  if (role === ROLES.SURVIVOR) {
    return mockPerks.filter(
      (p) => p.survivorCode !== null || p.killerCode === null
    );
  }
  return [];
};
