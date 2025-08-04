import React from "react";
import type { Perk } from "@/common/types/GeneralTypes";
import { useTranslations } from "next-intl";

interface PerkCardProps {
  perk: Perk;
  onSelect?: (perk: Perk) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}

const PerkCard: React.FC<PerkCardProps> = ({
  perk,
  onSelect,
  isSelected,
  isDisabled,
}) => {
  const t = useTranslations("components");
  const handleCardClick = () => {
    if (onSelect && !isDisabled) {
      onSelect(perk);
    }
  };

  return (
    <button
      onClick={handleCardClick}
      disabled={isDisabled}
      title={
        perk.name +
        (isSelected ? t("selected") : isDisabled ? t("limitReached") : "")
      }
      className={`bg-gray-800 text-white border border-gray-700 rounded-lg shadow-xl p-4 m-2 flex flex-col items-center text-center w-full max-w-[260px] sm:w-64 transition-all duration-300 ease-in-out
        ${
          isSelected
            ? "ring-4 ring-offset-2 ring-offset-gray-800 ring-yellow-500 opacity-80"
            : onSelect && !isDisabled
            ? "hover:scale-105 hover:border-yellow-400"
            : ""
        }
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <img
        src={perk.icon}
        alt={perk.name}
        className="w-20 h-20 mb-3 border-2 border-gray-600 rounded-md object-contain"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.onerror = null;
          target.src = `...text=${t("icon")}`;
        }}
        loading="lazy"
      />
      <h3 className="text-base font-bold text-yellow-400 mb-1 h-12 flex items-center justify-center">
        {perk.name}
      </h3>
      <p className="text-xs text-gray-300 leading-snug h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-1">
        {perk.description}
      </p>
    </button>
  );
};

export default React.memo(PerkCard);
