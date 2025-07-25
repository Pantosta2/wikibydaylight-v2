import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import { getSurvivors } from "@/services/GeneralGetService";
import DisplayCharacterData from "@/components/CharactersStaticData/DisplayCharacterData";
import PageLayout from "@/components/layout/PageLayout";

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
