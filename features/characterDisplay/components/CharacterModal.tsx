"use client";

import { useCharacterPerks } from "@/features/characterDisplay/hooks/useCharacterPerks";
import { useKillerPower } from "@/features/characterDisplay/hooks/useKillerPower";
import type {
  CharacterProfileData,
  KillerApiData,
  SurvivorApiData,
} from "@/common/types/GeneralTypes";
import KillerDetailsDisplay from "./KillerDetailsDisplay";
import SurvivorDetailsDisplay from "@/features/characterDisplay/components/SurvivorDetailsDisplay";
import PerkDisplayList from "./PerkDisplayList";

interface CharacterModalProps {
  character: CharacterProfileData;
  characterRole: "killer" | "survivor";
  onClose: () => void;
}

export default function CharacterModal({
  character,
  characterRole,
  onClose,
}: CharacterModalProps) {
  const {
    perks: specificPerks,
    isLoadingPerks,
    errorPerks,
  } = useCharacterPerks({
    characterRole,
    characterCode: character.code,
    enabled: true,
  });

  const {
    power: powerDetails,
    isLoadingPower,
    errorPower,
  } = useKillerPower({
    characterRole,
    characterCode: character.code,
    enabled: characterRole === "killer",
  });

  return (
    <div
      className="fixed inset-0 bg-gray-900/75 z-30 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-4xl font-bold select-none text-amber-50"
        >
          &times;
        </button>
        <h2 className="text-3xl text-center text-white font-extrabold mb-4">
          {character.name}
        </h2>
        <div className="overflow-y-auto text-amber-50 pr-2">
          <h3 className="text-2xl font-bold">Overview</h3>
          <p className="mb-3">{character.overview}</p>
          <h3 className="border-t border-gray-700 pt-3 mt-3 font-bold text-2xl">
            Backstory
          </h3>
          <p className="mb-3">{character.backstory}</p>

          {characterRole === "killer" && (
            <KillerDetailsDisplay
              killer={character as KillerApiData}
              power={powerDetails}
              isLoadingPower={isLoadingPower}
              errorPower={errorPower}
            />
          )}

          {characterRole === "survivor" && (
            <SurvivorDetailsDisplay survivor={character as SurvivorApiData} />
          )}

          <div className="border-t border-gray-700 pt-3 mt-3">
            <PerkDisplayList
              perks={specificPerks}
              isLoading={isLoadingPerks}
              error={errorPerks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
