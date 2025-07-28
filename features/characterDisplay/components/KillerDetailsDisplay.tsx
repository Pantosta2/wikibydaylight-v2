import type {
  KillerApiData,
  PowerDetails,
} from "../../../common/types/GeneralTypes";

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
        {isLoadingPower && (
          <p className="text-amber-100/70">Loading power...</p>
        )}
        {errorPower && <p className="text-red-500">{errorPower}</p>}
        {power && !isLoadingPower && (
          <>
            <p className="font-semibold text-lg">{power.powerName}</p>
            <p className="text-sm mt-1">{power.description}</p>
          </>
        )}
        {!power && !isLoadingPower && killer.power?.powerName && (
          <p className="font-semibold text-lg">{killer.power.powerName}</p>
        )}
      </div>
    </div>
  );
}
