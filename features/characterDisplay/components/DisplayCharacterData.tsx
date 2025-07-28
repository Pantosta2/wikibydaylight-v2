"use client";

import PortraitCharacterList from "./PortraitCharacterList";
import CharacterModalContainer from "./CharacterModalContainer";
import { useModal } from "@/common/hooks/useModal";
import type { CharacterProfileData } from "@/common/types/GeneralTypes";

type DisplayCharacterDataProps = {
  initialCharacters: CharacterProfileData[];
  characterRole: "killer" | "survivor";
};

export default function DisplayCharacterData({
  initialCharacters,
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
        <CharacterModalContainer
          character={selectedCharacter}
          onClose={closeCharacterModal}
        />
      )}
    </>
  );
}
