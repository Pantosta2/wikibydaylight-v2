import { cookies } from "next/headers";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import { getSurvivors } from "@/common/services/dbdApi.service";
import * as mockApi from "@/common/services/mockApi.service";
import DisplayCharacterData from "@/features/characterDisplay/components/DisplayCharacterData";
import PageLayout from "@/common/components/layout/PageLayout";

const isDevelopment = process.env.NODE_ENV === "development";
export default async function SurvivorsPage() {
  const useMock =
    isDevelopment && (await cookies()).get("useMockData")?.value === "true";

  const survivorsResponse = useMock
    ? await mockApi.getSurvivors()
    : await getSurvivors();

  const initialSurvivor = survivorsResponse.data.data || [];

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
