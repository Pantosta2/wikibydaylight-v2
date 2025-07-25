import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import DisplayCharacterData from "@/components/CharactersStaticData/DisplayCharacterData";
import { getKillers } from "@/services/GeneralGetService";
import PageLayout from "@/components/layout/PageLayout";

export default async function KillersPage() {
  const killersResponse = await getKillers();
  const initialKillers = killersResponse.data.data || [];

  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <PageLayout backgroundImage={DefinedImagesForBackground.GardenOfJoy}>
        <DisplayCharacterData
          initialCharacters={initialKillers}
          characterRole="killer"
        />
      </PageLayout>
    </div>
  );
}
