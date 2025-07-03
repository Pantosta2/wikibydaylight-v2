import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import DisplayCharacterData from "@/components/CharactersStaticData/DisplayCharacterData";
import { getKillers } from "@/services/GeneralGetService";
import Image from "next/image";

export default async function KillersPage() {
  const killersResponse = await getKillers();
  const initialKillers = killersResponse.data.data || [];

  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${DefinedImagesForBackground.GardenOfJoy.src})`,
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
          initialCharacters={initialKillers}
          characterRole="killer"
        />
      </div>
    </div>
  );
}
