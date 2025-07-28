"use client";

import { useState, useEffect } from "react";
import type { Perk } from "../../../common/types/GeneralTypes";
import { fetchAllPerksForRole } from "@/features/perkBuilder/services/perks.service";

export function useCombinedRolePerks({
  role,
  enabled,
}: {
  role: "killer" | "survivor";
  enabled: boolean;
}) {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllPerksForRole(role);
        setPerks(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Error"));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [role, enabled]);

  return {
    allPerks: perks,
    isLoadingAllPerks: isLoading,
    errorAllPerks: error,
  };
}
