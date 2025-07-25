"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Perk } from "../Types/GeneralTypes";

type RoleForSelection = "survivor" | "killer";

interface UsePerkBuildManagerProps {
  initialSurvivorPerks?: Perk[];
  initialKillerPerks?: Perk[];
  isLoadingSurvivors: boolean;
  isLoadingKillers: boolean;
  errorSurvivors?: Error | null;
  errorKillers?: Error | null;
  maxPerks?: number;
}

export function usePerkBuildManager({
  initialSurvivorPerks = [],
  initialKillerPerks = [],
  isLoadingSurvivors,
  isLoadingKillers,
  errorSurvivors,
  errorKillers,
  maxPerks = 4,
}: UsePerkBuildManagerProps) {
  const t = useTranslations();
  const [selectedPerks, setSelectedPerks] = useState<Perk[]>([]);
  const [currentRoleToList, setCurrentRoleToList] =
    useState<RoleForSelection>("survivor");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLimitReached, setIsLimitReached] = useState(false);

  const handlePerkSelect = (perkToAdd: Perk) => {
    if (selectedPerks.length >= maxPerks) {
      setIsLimitReached(true);
      return;
    }
    setIsLimitReached(false);
  };

  const handlePerkRemove = (perkIdToRemove: number) => {
    setSelectedPerks((prevSelectedPerks) =>
      prevSelectedPerks.filter((p) => p.id !== perkIdToRemove)
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleChange = (role: RoleForSelection) => {
    setCurrentRoleToList(role);
    setSearchQuery("");
  };

  const perksForCurrentRole = useMemo(() => {
    return currentRoleToList === "survivor"
      ? initialSurvivorPerks
      : initialKillerPerks;
  }, [currentRoleToList, initialSurvivorPerks, initialKillerPerks]);

  const isLoadingCurrentList = useMemo(() => {
    return currentRoleToList === "survivor"
      ? isLoadingSurvivors
      : isLoadingKillers;
  }, [currentRoleToList, isLoadingSurvivors, isLoadingKillers]);

  const errorCurrentList = useMemo(() => {
    return currentRoleToList === "survivor" ? errorSurvivors : errorKillers;
  }, [currentRoleToList, errorSurvivors, errorKillers]);

  const filteredPerksToDisplay = useMemo(() => {
    if (!perksForCurrentRole) return [];
    return perksForCurrentRole.filter((perk) => {
      const query = searchQuery.toLowerCase();
      const nameMatch = perk.name?.toLowerCase().includes(query) ?? false;
      const descriptionMatch =
        perk.description?.toLowerCase().includes(query) ?? false;
      return nameMatch || descriptionMatch;
    });
  }, [perksForCurrentRole, searchQuery]);

  return {
    selectedPerks,
    currentRoleToList,
    searchQuery,
    handlePerkSelect,
    handlePerkRemove,
    handleSearchChange,
    handleRoleChange,
    filteredPerksToDisplay,
    isLoadingCurrentList,
    errorCurrentList,
    isLimitReached,
    clearLimitReached: () => setIsLimitReached(false),
  };
}
