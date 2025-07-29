import type {
  KillerApiData,
  PowerDetails,
} from "../../../common/types/GeneralTypes";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("killersPage.info_details");
  return (
    <div className="border-t border-gray-700 pt-3 mt-3">
      <h3 className="text-2xl font-bold mb-2">{t("title")}</h3>
      <p>
        <span className="font-bold">{t("fullName")}</span>
        {killer.fullName}
      </p>
      <p>
        <span className="font-bold">{t("difficulty")}</span>
        {killer.difficulty}
      </p>
      <p>
        <span className="font-bold">{t("moveSpeed")}</span>
        {killer.moveSpeed}
      </p>
      <p>
        <span className="font-bold">{t("terrorRadius")}</span>
        {killer.terrorRadius}
      </p>
      <div className="mt-2 pt-2 border-t border-gray-600">
        <h4 className="font-bold text-xl">{t("power.title")}</h4>
        <AsyncContent
          isLoading={isLoadingPower}
          error={errorPower}
          data={power ? [power] : []}
          loadingMessage={t("power.loadingMessage")}
          emptyMessage={killer.power?.powerName || t("power.emptyMessage")}
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
