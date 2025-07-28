"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DefinedImagesForBackground } from "@/common/assets/DefinedImagesForBackground";
import { ScreenBorderGlow, ActiveSide } from "./ScreenBorderGlow";

export function AnimatedRoleSection() {
  const [activeSide, setActiveSide] = useState<ActiveSide>("killer");
  const t = useTranslations("mainPage");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSide((prevSide) =>
        prevSide === "killer" ? "survivor" : "killer"
      );
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const cardBaseStyles =
    "flex flex-col items-center text-center p-6 rounded-lg transition-all duration-1000 ease-in-out";
  const activeStyles = "scale-100 opacity-100";
  const inactiveStyles = "scale-90 opacity-40 filter grayscale";

  return (
    <>
      <ScreenBorderGlow activeSide={activeSide} />
      <section className="mt-16 flex min-h-[600px] flex-col items-center justify-around gap-8 lg:flex-row">
        <div
          className={`${cardBaseStyles} ${
            activeSide === "survivor" ? activeStyles : inactiveStyles
          }`}
        >
          <Image
            width={300}
            height={100}
            src={DefinedImagesForBackground.SurvivorMain}
            alt="Survivors"
            className="mb-4 drop-shadow-lg"
          />
          <div
            className={`transition-opacity duration-700 ${
              activeSide === "survivor" ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="mb-4 text-3xl font-bold">{t("survivorTitle")}</h2>
            <ul className="inline-block list-disc space-y-2 text-left">
              <li>{t("survivorPoints.point1")}</li>
              <li>{t("survivorPoints.point2")}</li>
              <li>{t("survivorPoints.point3")}</li>
              <li>{t("survivorPoints.point4")}</li>
            </ul>
          </div>
        </div>
        <div
          className={`${cardBaseStyles} ${
            activeSide === "killer" ? activeStyles : inactiveStyles
          }`}
        >
          <Image
            width={400}
            height={100}
            src={DefinedImagesForBackground.KillerMain}
            alt="Killers"
            className="mb-4 drop-shadow-lg"
          />

          <div
            className={`transition-opacity duration-700 ${
              activeSide === "killer" ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="mb-4 text-3xl font-bold">{t("killerTitle")}</h2>
            <ul className="inline-block list-disc space-y-2 text-left">
              <li>{t("killerPoints.point1")}</li>
              <li>{t("killerPoints.point2")}</li>
              <li>{t("killerPoints.point3")}</li>
              <li>{t("killerPoints.point4")}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
