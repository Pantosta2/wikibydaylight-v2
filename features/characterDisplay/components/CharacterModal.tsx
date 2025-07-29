import KillerDetailsDisplay from "./KillerDetailsDisplay";
import SurvivorDetailsDisplay from "./SurvivorDetailsDisplay";
import PerkDisplayList from "./PerkDisplayList";
import { useTranslations } from "next-intl";
import {
  CharacterProfileData,
  KillerApiData,
  SurvivorApiData,
  Perk,
  PowerDetails,
  ROLES,
} from "@/common/types/GeneralTypes";

interface CharacterModalProps {
  character: CharacterProfileData;
  characterRole: typeof ROLES.KILLER | typeof ROLES.SURVIVOR;
  perks: Perk[];
  power: PowerDetails | null;
  isLoadingPerks: boolean;
  isLoadingPower: boolean;
  errorPerks: string | null;
  errorPower: string | null;
  onClose: () => void;
}

export default function CharacterModal({
  character,
  characterRole,
  perks,
  power,
  isLoadingPerks,
  isLoadingPower,
  errorPerks,
  errorPower,
  onClose,
}: CharacterModalProps) {
  const t = useTranslations("characterModal");

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
          <h3 className="text-2xl font-bold">{t("overview")}</h3>
          <p className="mb-3">{character.overview}</p>
          <h3 className="border-t border-gray-700 pt-3 mt-3 font-bold text-2xl">
            {t("backstory")}
          </h3>
          <p className="mb-3">{character.backstory}</p>

          {characterRole === ROLES.KILLER && (
            <KillerDetailsDisplay
              killer={character as KillerApiData}
              power={power}
              isLoadingPower={isLoadingPower}
              errorPower={errorPower}
            />
          )}

          {characterRole === ROLES.SURVIVOR && (
            <SurvivorDetailsDisplay survivor={character as SurvivorApiData} />
          )}

          <div className="border-t border-gray-700 pt-3 mt-3">
            <PerkDisplayList
              perks={perks}
              isLoading={isLoadingPerks}
              error={errorPerks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
