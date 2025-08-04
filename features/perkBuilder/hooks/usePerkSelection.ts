import { useState, useCallback } from "react";
import type { Perk } from "@/common/types/GeneralApiTypes";

interface UsePerkSelectionProps {
  maxPerks?: number;
}

export function usePerkSelection({ maxPerks = 4 }: UsePerkSelectionProps) {
  const [selectedPerks, setSelectedPerks] = useState<Perk[]>([]);
  const isLimitReached = selectedPerks.length >= maxPerks;

  const handlePerkRemove = (perkIdToRemove: number) => {
    setSelectedPerks((prev) => prev.filter((p) => p.id !== perkIdToRemove));
  };

  const handleTogglePerk = useCallback(
    (perkToToggle: Perk) => {
      setSelectedPerks((currentPerks) => {
        const isAlreadySelected = currentPerks.some(
          (p) => p.id === perkToToggle.id
        );

        if (isAlreadySelected) {
          return currentPerks.filter((p) => p.id !== perkToToggle.id);
        }

        if (currentPerks.length < maxPerks) {
          return [...currentPerks, perkToToggle];
        }
        return currentPerks;
      });
    },
    [maxPerks]
  );

  return {
    selectedPerks,
    handleTogglePerk,
    handlePerkRemove,
    isLimitReached,
  };
}
