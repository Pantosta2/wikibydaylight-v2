"use client";

import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import { usePerkBuildManager } from "@/hooks/usePerkBuildManager";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Perk } from "@/Types/GeneralTypes";

import SelectedPerksRhombus from "./SelectedPerksRhombus";
import RoleSelection from "./RoleSelection";
import PerkSearchInput from "./PerkSearchInput";
import PerkListDisplay from "./PerkListDisplay";

interface MakeYourBuildClientProps {
  initialSurvivorPerks: Perk[];
  initialKillerPerks: Perk[];
}

export default function MakeYourBuildClient({
  initialSurvivorPerks,
  initialKillerPerks,
}: MakeYourBuildClientProps) {
  const t = useTranslations("makeYourBuild");

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
    selectedPerksCount,
    maxPerks,
  } = usePerkBuildManager({
    initialSurvivorPerks: initialSurvivorPerks,
    initialKillerPerks: initialKillerPerks,
    isLoadingSurvivors: false,
    isLoadingKillers: false,
    errorSurvivors: null,
    errorKillers: null,
  });

  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-900">
        <figure
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${DefinedImagesForBackground.RedForest})`,
            opacity: 0.25,
          }}
        />
        <Image
          src={DefinedImagesForBackground.Fog}
          alt=""
          className="absolute -bottom-20 md:-bottom-40 w-full object-cover z-0 opacity-40"
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow px-4 py-10 sm:px-6 md:px-8 flex flex-col">
            <header className="text-center mb-8 mt-6">
              <p className="text-md sm:text-lg text-gray-300 mt-3 max-w-2xl mx-auto">
                {t("header.selectInstruction", {
                  maxPerks: maxPerks,
                  selectedCount: selectedPerksCount,
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
                maxPerksReached={selectedPerksCount >= maxPerks}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
