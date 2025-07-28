"use client";

import PortraitCharacterList from "./PortraitCharacterList";
import CharacterModal from "./CharacterModal";
import { useModal } from "@/common/hooks/useModal";
import type { CharacterProfileData } from "@/common/types/GeneralTypes";

type DisplayCharacterDataProps = {
  initialCharacters: CharacterProfileData[];
  characterRole: "killer" | "survivor";
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

  return (
    <>
      <PortraitCharacterList
        onButtonClick={openCharacterModal}
        characters={initialCharacters}
      />

      {isModalOpen && selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          characterRole={characterRole}
          onClose={closeCharacterModal}
        />
      )}
    </>
  );
}
