import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import DisplayCharacterData from "@/components/CharactersStaticData/DisplayCharacterData";
import { getKillers } from "@/services/GeneralGetService";
import Image from "next/image";

export default function KillersPage() {
  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <figure
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${DefinedImagesForBackground.GardenOfJoy})`,
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
          fetchFunction={getKillers}
          characterRole="killer"
        />
      </figure>
    </div>
  );
}
