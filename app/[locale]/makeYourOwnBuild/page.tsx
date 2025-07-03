import { fetchAllPerksForRole } from "@/services/GeneralGetService";
import MakeYourBuildClient from "@/components/MakeYourBuildComponents/MakeYourBuildClient";

export default async function MakeYourOwnBuildPage() {
  const [survivorPerks, killerPerks] = await Promise.all([
    fetchAllPerksForRole("survivor"),
    fetchAllPerksForRole("killer"),
  ]);

  return (
    <MakeYourBuildClient
      initialSurvivorPerks={survivorPerks}
      initialKillerPerks={killerPerks}
    />
  );
}
