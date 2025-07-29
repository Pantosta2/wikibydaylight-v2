import React from "react";
import { useTranslations } from "next-intl";
import { ROLES } from "@/common/types/GeneralTypes";
type RoleForSelection = "survivor" | "killer";

interface RoleSelectionProps {
  currentRole: RoleForSelection;
  onRoleChange: (role: RoleForSelection) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const t = useTranslations("makeYourBuild");
  return (
    <div className="flex justify-center items-center mb-6 space-x-3 sm:space-x-4">
      <button
        onClick={() => onRoleChange(ROLES.SURVIVOR)}
        className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
        ${
          currentRole === ROLES.SURVIVOR
            ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-300"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {t("roles.survivorPerks")}
      </button>
      <button
        onClick={() => onRoleChange(ROLES.KILLER)}
        className={`py-2 px-4 sm:py-3 sm:px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base
        ${
          currentRole === ROLES.KILLER
            ? "bg-red-600 text-white shadow-lg ring-2 ring-red-400"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        {t("roles.killerPerks")}
      </button>
    </div>
  );
};

export default RoleSelection;
