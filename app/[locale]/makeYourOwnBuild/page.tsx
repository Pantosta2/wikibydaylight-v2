import { fetchAllPerksForRole } from "@/services/GeneralGetService";
import MakeYourBuildClient from "@/components/MakeYourBuildComponents/MakeYourBuildClient";
import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";

export default async function MakeYourOwnBuildPage() {
  const [survivorPerks, killerPerks] = await Promise.all([
    fetchAllPerksForRole("survivor"),
    fetchAllPerksForRole("killer"),
  ]);

  return (
    <div
      className="sticky inset-0 bg-cover bg-center z-20"
      style={{
        backgroundImage: `url(${DefinedImagesForBackground.RedForest.src})`,
      }}
    >
      <MakeYourBuildClient
        initialSurvivorPerks={survivorPerks}
        initialKillerPerks={killerPerks}
      />
    </div>
  );
}
