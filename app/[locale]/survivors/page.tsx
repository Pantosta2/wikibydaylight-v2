import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import { getSurvivors } from "@/services/GeneralGetService";
import DisplayCharacterData from "@/components/CharactersStaticData/DisplayCharacterData";
import Image from "next/image";

export default function SurvivorsPage() {
  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <figure
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{
          backgroundImage: `url(${DefinedImagesForBackground.Kitchen})`,
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
          fetchFunction={getSurvivors}
          characterRole="survivor"
        />
      </figure>
    </div>
  );
}
