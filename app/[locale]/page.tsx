import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import Image from "next/image";
export default function MainPage() {
  return (
    <div
      className="bg-cover bg-center h-screen w-full z-0"
      style={{
        backgroundImage: `url(${DefinedImagesForBackground.Haddonfiled.src})`,
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
    </div>
  );
}
