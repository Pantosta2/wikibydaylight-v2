"use client";

import { useState, useEffect } from "react";
import { getKillerPowerDetails } from "../../../common/services/dbdApi.service";
import { PowerDetails, ROLES } from "@/common/types/GeneralApiTypes";

interface UseKillerPowerParams {
  characterRole: "killer" | "survivor";
  characterCode: string | undefined;
  enabled: boolean;
}

interface UseKillerPowerReturn {
  power: PowerDetails | null;
  isLoadingPower: boolean;
  errorPower: string | null;
}

export function useKillerPower({
  characterRole,
  characterCode,
  enabled,
}: UseKillerPowerParams): UseKillerPowerReturn {
  const [power, setPower] = useState<PowerDetails | null>(null);
  const [isLoadingPower, setIsLoadingPower] = useState<boolean>(false);
  const [errorPower, setErrorPower] = useState<string | null>(null);

  useEffect(() => {
    if (enabled && characterRole === ROLES.KILLER && characterCode) {
      const fetchPower = async () => {
        setIsLoadingPower(true);
        setErrorPower(null);
        try {
          const response = await getKillerPowerDetails(characterCode);

          const powerData = response.data.data[0];

          if (powerData) {
            setPower(powerData);
          } else {
            setErrorPower("Formato de poder inesperado.");
            setPower(null);
          }
        } catch (err) {
          setErrorPower("No se pudo cargar el poder del asesino.");
        } finally {
          setIsLoadingPower(false);
        }
      };
      fetchPower();
    } else {
      setPower(null);
      setIsLoadingPower(false);
      setErrorPower(null);
    }
  }, [characterRole, characterCode, enabled]);

  return { power, isLoadingPower, errorPower };
}
