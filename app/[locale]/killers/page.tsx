import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import DisplayCharacterData from "@/features/characterDisplay/components/DisplayCharacterData";
import { getKillers } from "@/common/services/dbdApi.service";
import PageLayout from "@/common/components/layout/PageLayout";
import { ROLES } from "@/common/types/GeneralTypes";

export default async function KillersPage() {
  const killersResponse = await getKillers();
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
