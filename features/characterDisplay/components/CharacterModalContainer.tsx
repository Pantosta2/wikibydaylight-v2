"use client";

import { useCharacterPerks } from "@/features/characterDisplay/hooks/useCharacterPerks";
import { useKillerPower } from "@/features/characterDisplay/hooks/useKillerPower";
import type { CharacterProfileData, ROLES } from "@/common/types/GeneralTypes";
import CharacterModal from "./CharacterModal";

interface CharacterModalContainerProps {
  character: CharacterProfileData;
  characterRole: typeof ROLES.KILLER | typeof ROLES.SURVIVOR;
  onClose: () => void;
}
export default function CharacterModalContainer({
  character,
  characterRole,
  onClose,
}: CharacterModalContainerProps) {
  const { code } = character;

  const {
    perks: specificPerks,
    isLoadingPerks,
    errorPerks,
  } = useCharacterPerks({
    characterRole: characterRole,
    characterCode: code,
    enabled: true,
  });

  const {
    power: powerDetails,
    isLoadingPower,
    errorPower,
  } = useKillerPower({
    characterRole: characterRole,
    characterCode: code,
    enabled: characterRole === "killer",
  });

  return (
    <CharacterModal
      character={character}
      characterRole={characterRole}
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
