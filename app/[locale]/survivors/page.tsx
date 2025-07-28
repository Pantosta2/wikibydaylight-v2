import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import { getSurvivors } from "@/common/services/dbdApi.service";
import DisplayCharacterData from "@/features/characterDisplay/components/DisplayCharacterData";
import PageLayout from "@/common/components/layout/PageLayout";

export default async function SurvivorsPage() {
  const killersResponse = await getSurvivors();
  const initialSurvivor = killersResponse.data.data || [];

  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <PageLayout backgroundImage={DefinedImagesForBackground.Kitchen}>
        <DisplayCharacterData
          initialCharacters={initialSurvivor}
          characterRole="survivor"
        />
      </PageLayout>
    </div>
  );
}
