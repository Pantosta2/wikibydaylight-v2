"use client";

import PortraitCharacterList from "./PortraitCharacterList";
import CharacterModalContainer from "./CharacterModalContainer";
import { useModal } from "@/common/hooks/useModal";
import type { ROLES, CharacterProfileData } from "@/common/types/GeneralTypes";

type DisplayCharacterDataProps = {
  initialCharacters: CharacterProfileData[];
  characterRole: typeof ROLES.KILLER | typeof ROLES.SURVIVOR;
};

export default function DisplayCharacterData({
  initialCharacters,
  characterRole,
}: DisplayCharacterDataProps) {
  const {
    isModalOpen,
    selectedItem: selectedCharacter,
    openModal: openCharacterModal,
    closeModal: closeCharacterModal,
  } = useModal<CharacterProfileData>();

  const isLoading = false;
  const error = null;

  return (
    <>
      <PortraitCharacterList
        onButtonClick={openCharacterModal}
        characters={initialCharacters}
        isLoading={isLoading}
        error={error}
      />

      {isModalOpen && selectedCharacter && (
        <CharacterModalContainer
          character={selectedCharacter}
          characterRole={characterRole}
          onClose={closeCharacterModal}
        />
      )}
    </>
  );
}
