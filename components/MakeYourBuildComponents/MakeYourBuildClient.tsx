"use client";

import { usePerkBuildManager } from "@/hooks/usePerkBuildManager";
import { useTranslations } from "next-intl";
import type { Perk } from "@/Types/GeneralTypes";
import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";

import SelectedPerksRhombus from "./SelectedPerksRhombus";
import RoleSelection from "./RoleSelection";
import PerkSearchInput from "./PerkSearchInput";
import PerkListDisplay from "./PerkListDisplay";
import Image from "next/image";

interface MakeYourBuildClientProps {
  initialSurvivorPerks: Perk[];
  initialKillerPerks: Perk[];
}

export default function MakeYourBuildClient({
  initialSurvivorPerks,
  initialKillerPerks,
}: MakeYourBuildClientProps) {
  const t = useTranslations("makeYourBuild");
  const maxPerks = 4;

  const {
    selectedPerks,
    currentRoleToList,
    searchQuery,
    handlePerkSelect,
    handlePerkRemove,
    handleSearchChange,
    handleRoleChange,
    filteredPerksToDisplay,
    isLoadingCurrentList,
    errorCurrentList,
  } = usePerkBuildManager({
    initialSurvivorPerks: initialSurvivorPerks,
    initialKillerPerks: initialKillerPerks,
    isLoadingSurvivors: false,
    isLoadingKillers: false,
    errorSurvivors: null,
    errorKillers: null,
    maxPerks: maxPerks,
  });

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900/50">
        <div className="relative z-10 flex flex-col min-h-screen">
          <Image
            src={DefinedImagesForBackground.Fog}
            alt=""
            className="absolute -bottom-40 w-full scale-160 -z-10"
          />
          <Image
            src={DefinedImagesForBackground.Fog}
            alt=""
            className="absolute -bottom-40 w-full scale-160 -z-10"
          />
          <main className="flex-grow px-4 py-10 sm:px-6 md:px-8 flex flex-col">
            <header className="text-center mb-8 mt-6">
              <p className="text-md sm:text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
                {t("header.selectInstruction", {
                  maxPerks: 4,
                  selectedCount: selectedPerks.length,
                })}
              </p>
            </header>

            <SelectedPerksRhombus
              perks={selectedPerks}
              onRemovePerk={handlePerkRemove}
            />

            <div className="mt-10 pt-8 border-t border-gray-700">
              <RoleSelection
                currentRole={currentRoleToList}
                onRoleChange={handleRoleChange}
              />
              <PerkSearchInput
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              <PerkListDisplay
                title=""
                perks={filteredPerksToDisplay}
                isLoading={isLoadingCurrentList}
                error={errorCurrentList}
                onPerkSelect={handlePerkSelect}
                selectedPerkIds={selectedPerks.map((p) => p.id)}
                maxPerksReached={selectedPerks.length >= maxPerks}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
