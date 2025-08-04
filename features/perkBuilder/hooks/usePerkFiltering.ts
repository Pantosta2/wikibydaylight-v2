"use client";

import { useReducer, useMemo } from "react";
import { Perk, ROLES } from "@/common/types/GeneralApiTypes";

type RoleForSelection = "survivor" | "killer";

interface FilterState {
  role: RoleForSelection;
  searchQuery: string;
}

type FilterAction =
  | { type: "SET_ROLE"; payload: RoleForSelection }
  | { type: "SET_SEARCH_QUERY"; payload: string };

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

interface UsePerkFilteringProps {
  survivorPerks: Perk[];
  killerPerks: Perk[];
}

export function usePerkFiltering({
  survivorPerks,
  killerPerks,
}: UsePerkFilteringProps) {
  const [filters, dispatch] = useReducer(filterReducer, {
    role: ROLES.SURVIVOR,
    searchQuery: "",
  });

  const availablePerks = useMemo(() => {
    return filters.role === ROLES.SURVIVOR ? survivorPerks : killerPerks;
  }, [filters.role, survivorPerks, killerPerks]);

  const filteredPerks = useMemo(() => {
    if (!availablePerks) return [];
    const query = filters.searchQuery.toLowerCase();
    if (!query) return availablePerks;

    return availablePerks.filter(
      (perk) =>
        perk.name?.toLowerCase().includes(query) ||
        perk.description?.toLowerCase().includes(query)
    );
  }, [availablePerks, filters.searchQuery]);

  return {
    filters,
    dispatch,
    filteredPerks,
  };
}
