import type { AxiosResponse } from "axios";
import PortraitCharacterList from "./PortraitCharacterList";
import PerkDisplayList from "./PerkDisplayList";
import KillerDetailsDisplay from "./KillerDetailsDisplay";
import SurvivorDetailsDisplay from "./SurvivorDetailsDisplay";
import { useModal } from "../../hooks/useModal";
import { useCharacterPerks } from "../../hooks/useCharacterPerks";
import { useKillerPower } from "../../hooks/useKillerPower";
import type {
  CharacterProfileData,
  CharacterListEnvelope,
} from "../../services/GeneralGetService";
import type { KillerApiData, SurvivorApiData } from "../../Types/GeneralTypes";

type DisplayCharacterDataProps = {
  fetchFunction: () => Promise<AxiosResponse<CharacterListEnvelope>>;
  characterRole: "killer" | "survivor";
};

export default function DisplayCharacterData({
  fetchFunction,
  characterRole,
}: DisplayCharacterDataProps) {
  const {
    isModalOpen,
    selectedItem: selectedCharacter,
    openModal: openCharacterModal,
    closeModal: closeCharacterModal,
  } = useModal<CharacterProfileData>();

  const {
    perks: specificPerks,
    isLoadingPerks,
    errorPerks,
  } = useCharacterPerks({
    characterRole: characterRole,
    characterCode: selectedCharacter?.code,
    enabled: isModalOpen && !!selectedCharacter,
  });

  const {
    power: powerDetails,
    isLoadingPower,
    errorPower,
  } = useKillerPower({
    characterRole: characterRole,
    characterCode: selectedCharacter?.code,
    enabled: isModalOpen && !!selectedCharacter,
  });

  const handlePortraitClick = (character: CharacterProfileData) => {
    openCharacterModal(character);
  };

  return (
    <>
      <PortraitCharacterList
        onButtonClick={handlePortraitClick}
        fetchFunction={fetchFunction}
      />

      {isModalOpen && selectedCharacter && (
        <div className="fixed -inset-1 bg-gradient-to-b from-black via-red-900 to-red bg-gray-900/75 z-30 flex flex-col items-center justify-center p-4">
          <div
            className="relative bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeCharacterModal}>
              <span className="text-4xl font-bold select-none text-amber-50">
                x
              </span>
            </button>
            <h2 className="text-3xl text-center text-white font-extrabold mb-4">
              {selectedCharacter.name}
            </h2>
            <div className="overflow-y-auto text-amber-50 pr-2">
              <h3 className="text-2xl font-bold">Overview</h3>
              <p className="mb-3">{selectedCharacter.overview}</p>
              <h3 className="border-t border-gray-700 pt-3 mt-3 font-bold text-2xl">
                Backstory
              </h3>
              <p className="mb-3">{selectedCharacter.backstory}</p>
              {characterRole === "killer" && (
                <KillerDetailsDisplay
                  killer={selectedCharacter as KillerApiData}
                  power={powerDetails}
                  isLoadingPower={isLoadingPower}
                  errorPower={errorPower}
                />
              )}

              {characterRole === "survivor" && (
                <SurvivorDetailsDisplay
                  survivor={selectedCharacter as SurvivorApiData}
                />
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
      )}
    </>
  );
}
