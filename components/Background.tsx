import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import Image from "next/image";

export function Background() {
  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${DefinedImagesForBackground.Haddonfiled.src})`,
        }}
      />

      <Image
        src={DefinedImagesForBackground.Fog}
        alt="Fog overlay"
        layout="fill"
        objectFit="cover"
        className="opacity-60"
      />
    </div>
  );
}
