import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { Perk } from "@/common/types/GeneralTypes";
import { usePerkSelection } from "@/features/perkBuilder/hooks/usePerkSelection";

describe("usePerkSelection", () => {
  const perkDePrueba: Perk = {
    id: 1,
    name: "Sprint Burst",
    description: "Increases speed.",
    icon: "sprint.png",
    code: "sprint",
  };

  it("it should initialize with an empty array and limit not reached of perks", () => {
    const { result } = renderHook(() => usePerkSelection({ maxPerks: 4 }));
    expect(result.current.selectedPerks).toEqual([]);
    expect(result.current.isLimitReached).toBe(false);
  });

  it("it should get a perk when calling handlePerkSelect", () => {
    const { result } = renderHook(() => usePerkSelection({ maxPerks: 4 }));

    act(() => {
      result.current.handleTogglePerk(perkDePrueba);
    });

    expect(result.current.selectedPerks).toHaveLength(1);
    expect(result.current.selectedPerks[0]).toEqual(perkDePrueba);
  });
});
