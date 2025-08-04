import { cookies } from "next/headers";
import { fetchAllPerksForRole } from "@/features/perkBuilder/services/perks.service";
import MakeYourBuildClient from "@/features/perkBuilder/components/MakeYourBuildClient";
import * as mockApi from "@/common/services/mockApi.service";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import { ROLES } from "@/common/types/GeneralTypes";
import PageLayout from "@/common/components/layout/PageLayout";

const isDevelopment = process.env.NODE_ENV === "development";

export default async function MakeYourOwnBuildPage() {
  const useMockCookie =
    isDevelopment && (await cookies()).get("useMockData")?.value === "true";

  const [survivorPerks, killerPerks] = useMockCookie
    ? await Promise.all([
        mockApi.fetchAllPerksForRole(ROLES.SURVIVOR),
        mockApi.fetchAllPerksForRole(ROLES.KILLER),
      ])
    : await Promise.all([
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
