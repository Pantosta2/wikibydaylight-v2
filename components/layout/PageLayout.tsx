import { DefinedImagesForBackground } from "@/assets/DefinedImagesForBackground";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface PageLayoutProps {
  children: React.ReactNode;
  backgroundImage: StaticImageData | string;
}

export default function PageLayout({
  children,
  backgroundImage,
}: PageLayoutProps) {
  const bgImageSrc =
    typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src;

  return (
    <div className="absolute h-screen w-full overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-10"
        style={{ backgroundImage: `url(${bgImageSrc})` }}
      >
        <Image
          src={DefinedImagesForBackground.Fog}
          alt="Atmospheric fog overlay"
          className="absolute -bottom-40 w-full scale-160 z-10"
        />
        <Image
          src={DefinedImagesForBackground.Fog}
          alt="Atmospheric fog overlay"
          className="absolute -bottom-40 w-full scale-160 z-10"
        />
        {children}
      </div>
    </div>
  );
}
