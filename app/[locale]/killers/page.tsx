import { cookies } from "next/headers";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import DisplayCharacterData from "@/features/characterDisplay/components/DisplayCharacterData";
import * as mockApi from "@/common/services/mockApi.service";
import { getKillers } from "@/common/services/dbdApi.service";
import PageLayout from "@/common/components/layout/PageLayout";
import { ROLES } from "@/common/types/GeneralApiTypes";

const isDevelopment = process.env.NODE_ENV === "development";

export default async function KillersPage() {
  const useMock =
    isDevelopment && (await cookies()).get("useMockData")?.value === "true";

  const killersResponse = useMock
    ? await mockApi.getKillers()
    : await getKillers();

  const initialKillers = killersResponse.data.data || [];

  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <PageLayout backgroundImage={DefinedImagesForBackground.GardenOfJoy}>
        <DisplayCharacterData
          initialCharacters={initialKillers}
          characterRole={ROLES.KILLER}
        />
      </PageLayout>
    </div>
  );
}
