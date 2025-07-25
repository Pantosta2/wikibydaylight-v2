import { useState } from "react";
import type { Perk } from "@/Types/GeneralTypes";

interface UsePerkSelectionProps {
  maxPerks?: number;
}

export function usePerkSelection({ maxPerks = 4 }: UsePerkSelectionProps) {
  const [selectedPerks, setSelectedPerks] = useState<Perk[]>([]);
  const isLimitReached = selectedPerks.length >= maxPerks;

  const handlePerkSelect = (perkToAdd: Perk) => {
    if (isLimitReached || selectedPerks.find((p) => p.id === perkToAdd.id)) {
      return;
    }
    setSelectedPerks((prev) => [...prev, perkToAdd]);
  };

  const handlePerkRemove = (perkIdToRemove: number) => {
    setSelectedPerks((prev) => prev.filter((p) => p.id !== perkIdToRemove));
  };

  return {
    selectedPerks,
    handlePerkSelect,
    handlePerkRemove,
    isLimitReached,
  };
}
