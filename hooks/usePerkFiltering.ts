"use client";

import { useReducer, useMemo } from "react";
import type { Perk } from "@/Types/GeneralTypes";

type RoleForSelection = "survivor" | "killer";

interface FilterState {
  role: RoleForSelection;
  searchQuery: string;
}

type FilterAction =
  | { type: "SET_ROLE"; payload: RoleForSelection }
  | { type: "SET_SEARCH_QUERY"; payload: string };

interface UsePerkFilteringProps {
  survivorPerks: Perk[];
  killerPerks: Perk[];
}

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload, searchQuery: "" };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export function usePerkFiltering({
  survivorPerks,
  killerPerks,
}: UsePerkFilteringProps) {
  const [filters, dispatch] = useReducer(filterReducer, {
    role: "survivor",
    searchQuery: "",
  });

  const avaliblePerks = useMemo(() => {
    return filters.role === "survivor" ? survivorPerks : killerPerks;
  }, [filters.role, survivorPerks, killerPerks]);

  const filteredPerks = useMemo(() => {
    if (!avaliblePerks) return [];
    const query = searchQuery.toLowerCase();
    if (!query) return avaliblePerks;

    return avaliblePerks.filter(
      (perk) =>
        perk.name?.toLowerCase().includes(query) ||
        perk.description?.toLowerCase().includes(query)
    );
  }, [avaliblePerks, searchQuery]);

  return {
    currentRole,
    searchQuery,
    handleRoleChange,
    handleSearchChange,
    filteredPerks,
  };
}
