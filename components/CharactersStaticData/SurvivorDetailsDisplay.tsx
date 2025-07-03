import type { SurvivorApiData } from "../../Types/GeneralTypes";

interface SurvivorDetailsProps {
  survivor: SurvivorApiData;
}

export default function SurvivorDetailsDisplay({
  survivor,
}: SurvivorDetailsProps) {
  return (
    <div className="border-t border-gray-700 pt-3 mt-3">
      <h3 className="text-2xl font-bold mb-2">Survivor Details</h3>
      <p>
        <span className="font-bold">Nationality: </span>
        {survivor.nationality}
      </p>
      <p>
        <span className="font-bold">DLC: </span>
        {survivor.dlc}
      </p>
    </div>
  );
}
