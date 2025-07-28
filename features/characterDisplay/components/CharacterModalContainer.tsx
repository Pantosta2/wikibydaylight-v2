"use client";

import { useCharacterPerks } from "@/features/characterDisplay/hooks/useCharacterPerks";
import { useKillerPower } from "@/features/characterDisplay/hooks/useKillerPower";
import type { CharacterProfileData } from "@/common/types/GeneralTypes";
import CharacterModal from "./CharacterModal";

interface CharacterModalContainerProps {
  character: CharacterProfileData;
  onClose: () => void;
}
export default function CharacterModalContainer({
  character,
  onClose,
}: CharacterModalContainerProps) {
  const { role, code } = character;

  const {
    perks: specificPerks,
    isLoadingPerks,
    errorPerks,
  } = useCharacterPerks({
    characterRole: role,
    characterCode: code,
    enabled: true,
  });

  const {
    power: powerDetails,
    isLoadingPower,
    errorPower,
  } = useKillerPower({
    characterRole: role,
    characterCode: code,
    enabled: role === "killer",
  });

  return (
    <CharacterModal
      character={character}
      perks={specificPerks}
      power={powerDetails}
      isLoadingPerks={isLoadingPerks}
      isLoadingPower={isLoadingPower}
      errorPerks={errorPerks}
      errorPower={errorPower}
      onClose={onClose}
    />
  );
}
