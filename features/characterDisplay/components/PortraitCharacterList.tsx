"use client";

import type { CharacterProfileData } from "@/common/types/GeneralTypes";
import { AsyncContent } from "@/common/components/AsyncContent";

type PortraitListProps = {
  characters: CharacterProfileData[];
  onButtonClick: (characterData: CharacterProfileData) => void;
  isLoading: boolean;
  error: string | Error | null;
};

export default function PortraitCharacterList({
  characters,
  onButtonClick,
  isLoading,
  error,
}: PortraitListProps) {
  return (
    <AsyncContent
      isLoading={isLoading}
      error={error}
      data={characters}
      loadingMessage="Loading characters..."
      emptyMessage="No characters found."
    >
      {(loadedCharacters) => (
        <section className="flex flex-row flex-wrap mx-[3rem] mt-26 text-center justify-center relative z-20">
          {loadedCharacters.map((character) => (
            <button
              key={character.number}
              className="flex flex-col mb-20 cursor-pointer hover:scale-105 transition-transform duration-300 relative"
              onClick={() => onButtonClick(character)}
            >
              <img
                src={character.imgs.portrait}
                alt={`Retrato de ${character.name}`}
                className="size-[20rem] block"
              />
              <p className=" bg-gray-600/70 text-white font-semibold text-2xl mx-[3rem] py-1 ">
                {character.name}
              </p>
            </button>
          ))}
        </section>
      )}
    </AsyncContent>
  );
}
