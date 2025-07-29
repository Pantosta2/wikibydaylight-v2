import { fetchAllPerksForRole } from "@/features/perkBuilder/services/perks.service";
import MakeYourBuildClient from "@/features/perkBuilder/components/MakeYourBuildClient";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import { ROLES } from "@/common/types/GeneralTypes";
import PageLayout from "@/common/components/layout/PageLayout";

export default async function MakeYourOwnBuildPage() {
  const [survivorPerks, killerPerks] = await Promise.all([
    fetchAllPerksForRole(ROLES.SURVIVOR),
    fetchAllPerksForRole(ROLES.KILLER),
  ]);

  return (
    <PageLayout backgroundImage={DefinedImagesForBackground.RedForest}>
      <MakeYourBuildClient
        initialSurvivorPerks={survivorPerks}
        initialKillerPerks={killerPerks}
      />
    </PageLayout>
  );
}
