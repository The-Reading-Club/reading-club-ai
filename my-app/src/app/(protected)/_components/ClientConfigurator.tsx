"use client";
import { useTRCAppConfigStore } from "@/stores/store";
import React, { useEffect } from "react";

interface ClientConfiguratorProps {
  isPlus: boolean;
}

const ClientConfigurator: React.FC<ClientConfiguratorProps> = ({ isPlus }) => {
  // zustand app config state
  const { setIsPlus } = useTRCAppConfigStore();

  useEffect(() => {
    setIsPlus(isPlus);
  }, [isPlus]);
  return <></>;
};

export default ClientConfigurator;
