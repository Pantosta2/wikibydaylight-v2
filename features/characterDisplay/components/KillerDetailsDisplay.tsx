import type {
  KillerApiData,
  PowerDetails,
} from "../../../common/types/GeneralTypes";
import { AsyncContent } from "@/common/components/AsyncContent";

interface KillerDetailsProps {
  killer: KillerApiData;
  power: PowerDetails | null;
  isLoadingPower: boolean;
  errorPower: string | null;
}
export default function KillerDetailsDisplay({
  killer,
  power,
  isLoadingPower,
  errorPower,
}: KillerDetailsProps) {
  return (
    <div className="border-t border-gray-700 pt-3 mt-3">
      <h3 className="text-2xl font-bold mb-2">Killer Details</h3>
      <p>
        <span className="font-bold">Full name: </span>
        {killer.fullName}
      </p>
      <p>
        <span className="font-bold">Difficulty: </span>
        {killer.difficulty}
      </p>
      <p>
        <span className="font-bold">Move speed: </span>
        {killer.moveSpeed}
      </p>
      <p>
        <span className="font-bold">Terror radius: </span>
        {killer.terrorRadius}
      </p>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <h4 className="font-bold text-xl">Power</h4>
        <AsyncContent
          isLoading={isLoadingPower}
          error={errorPower}
          data={power ? [power] : []}
          loadingMessage="Loading power..."
          emptyMessage={
            killer.power?.powerName || "No power details available."
          }
        >
          {(powerDetails) => (
            <>
              <p className="font-semibold text-lg">
                {powerDetails[0].powerName}
              </p>
              <p className="text-sm mt-1">{powerDetails[0].description}</p>
            </>
          )}
        </AsyncContent>
      </div>
    </div>
  );
}
