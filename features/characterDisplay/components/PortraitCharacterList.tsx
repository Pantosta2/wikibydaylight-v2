"use client";

import type { CharacterProfileData } from "@/common/types/GeneralTypes";

type PortraitListProps = {
  characters: CharacterProfileData[];
  onButtonClick: (characterData: CharacterProfileData) => void;
};

export default function PortraitCharacterList({
  characters,
  onButtonClick,
}: PortraitListProps) {
  if (!characters || characters.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">No characters found.</p>
    );
  }

  return (
    <section className="flex flex-row flex-wrap mx-[3rem] mt-26 text-center justify-center relative z-20">
      {characters.map((character) => (
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
  );
}
