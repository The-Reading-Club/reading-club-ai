"use client";
import { TRCDictionary } from "@/lib/internationalization/dictionary";
import { TRCRateLimits, useTRCAppConfigStore } from "@/stores/store";
import React, { useEffect } from "react";

interface ClientConfiguratorProps {
  isPlus: boolean;
  rateLimits: TRCRateLimits;
  dictionary: TRCDictionary;
}

const ClientConfigurator: React.FC<ClientConfiguratorProps> = ({
  isPlus,
  rateLimits,
  dictionary,
}) => {
  // zustand app config state
  const { setIsPlus, setRateLimits, setDictionary } = useTRCAppConfigStore();

  useEffect(() => {
    setDictionary(dictionary);
    setIsPlus(isPlus);
    setRateLimits(rateLimits);
  }, [isPlus, rateLimits]);
  return <></>;
};

export default ClientConfigurator;
