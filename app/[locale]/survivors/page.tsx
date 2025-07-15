import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import { getSurvivors } from "@/services/GeneralGetService";
import DisplayCharacterData from "@/components/CharactersStaticData/DisplayCharacterData";
import Image from "next/image";

export default async function SurvivorsPage() {
  const killersResponse = await getSurvivors();
  const initialSurvivor = killersResponse.data.data || [];



  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
     <div
        className="absolute inset-0 bg-cover bg-center z-30"
        style={{
          backgroundImage: `url(${DefinedImagesForBackground.Kitchen.src})`,
        }}
      >
        <Image
          src={DefinedImagesForBackground.Fog}
          alt=""
          className="absolute -bottom-40 w-full scale-160 z-10"
        />
        <Image
          src={DefinedImagesForBackground.Fog}
          alt=""
          className="absolute -bottom-40 w-full scale-160 z-10"
        />
        <DisplayCharacterData
          initialCharacters={initialSurvivor}
          characterRole="survivor"
        />
      </div>
    </div>
  );
}
