import { fetchAllPerksForRole } from "@/services/GeneralGetService";
import MakeYourBuildClient from "@/components/MakeYourBuildComponents/MakeYourBuildClient";
import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import PageLayout from "@/components/layout/PageLayout";

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
