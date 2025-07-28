import { fetchAllPerksForRole } from "@/common/services/dbdApi.service";
import MakeYourBuildClient from "@/features/perkBuilder/components/MakeYourBuildClient";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import PageLayout from "@/common/components/layout/PageLayout";

export default async function MakeYourOwnBuildPage() {
  const [survivorPerks, killerPerks] = await Promise.all([
    fetchAllPerksForRole("survivor"),
    fetchAllPerksForRole("killer"),
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
