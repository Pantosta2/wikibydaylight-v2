import type { Perk } from "../../../common/types/GeneralApiTypes";
import PerkCard from "./PerkCard";
import { AsyncContent } from "@/common/components/AsyncContent";

interface PerkListDisplayProps {
  perks: Perk[];
  isLoading: boolean;
  error: Error | string | null;
  title: string;
  onPerkSelect?: (perk: Perk) => void;
  selectedPerkIds?: number[];
  maxPerksReached?: boolean;
}

const PerkListDisplay: React.FC<PerkListDisplayProps> = ({
  perks,
  isLoading,
  error,
  onPerkSelect,
  selectedPerkIds,
  maxPerksReached,
}) => {
  return (
    <AsyncContent
      isLoading={isLoading}
      error={error}
      data={perks}
      loadingMessage="Loading perks..."
      emptyMessage="No perks found."
    >
      {(loadedPerks) => {
        const sortedPerks = [...loadedPerks].sort((a, b) => {
          const isAGeneral = !a.survivorCode && !a.killerCode;
          const isBGeneral = !b.survivorCode && !b.killerCode;
          if (isAGeneral && !isBGeneral) return -1;
          if (!isAGeneral && isBGeneral) return 1;
          return a.name.localeCompare(b.name);
        });

        return (
          <div className="flex flex-wrap justify-center items-stretch gap-x-5 gap-y-6">
            {sortedPerks.map((perk) => (
              <PerkCard
                key={perk.id}
                perk={perk}
                onSelect={onPerkSelect}
                isSelected={selectedPerkIds?.includes(perk.id)}
                isDisabled={
                  maxPerksReached && !selectedPerkIds?.includes(perk.id)
                }
              />
            ))}
          </div>
        );
      }}
    </AsyncContent>
  );
};

export default PerkListDisplay;
