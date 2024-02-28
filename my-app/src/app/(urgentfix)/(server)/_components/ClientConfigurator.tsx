"use client";
import { TRCRateLimits, useTRCAppConfigStore } from "@/stores/store";
import React, { useEffect } from "react";

interface ClientConfiguratorProps {
  isPlus: boolean;
  rateLimits: TRCRateLimits;
}

const ClientConfigurator: React.FC<ClientConfiguratorProps> = ({
  isPlus,
  rateLimits,
}) => {
  // zustand app config state
  const { setIsPlus, setRateLimits } = useTRCAppConfigStore();

  useEffect(() => {
    setIsPlus(isPlus);
    setRateLimits(rateLimits);
  }, [isPlus, rateLimits]);
  return <></>;
};

export default ClientConfigurator;
