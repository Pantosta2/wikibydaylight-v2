// EN: hooks/useCombinedRolePerks.ts

"use client"

import { useState, useEffect } from "react";
// 1. Importa la función con la lógica extraída.
import { fetchAllPerksForRole } from "../services/GeneralGetService";
import type { Perk } from "../Types/GeneralTypes";

export function useCombinedRolePerks({ role, enabled }: { role: "killer" | "survivor", enabled: boolean }) {
  const [perks, setPerks] = useState<Perk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        // 2. El hook ahora solo llama a la lógica reutilizable.
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

  return { allPerks: perks, isLoadingAllPerks: isLoading, errorAllPerks: error };
}