"use client";

import { ROLES } from "../types/GeneralTypes";

export type ActiveSide = "survivor" | "killer";

interface ScreenBorderGlowProps {
  activeSide: ActiveSide;
}

export function ScreenBorderGlow({ activeSide }: ScreenBorderGlowProps) {
  const killerGlow = "shadow-red-500/80";
  const survivorGlow = "shadow-cyan-400/80";

  const glowClass = activeSide === ROLES.KILLER ? killerGlow : survivorGlow;

  return (
    <>
      <div
        className={`fixed left-full top-0 bottom-0 z-30 w-10 bg-transparent ${glowClass} shadow-[10px_0_50px_0px] transition-all duration-1000 ease-in-out pointer-events-none`}
      />
      <div
        className={`fixed right-full top-0 bottom-0 z-30 w-10 bg-transparent ${glowClass} shadow-[-10px_0_50px_0px] transition-all duration-1000 ease-in-out pointer-events-none`}
      />
    </>
  );
}
