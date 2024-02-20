"use client";
import { Button } from "@/components/ui/button";
import { devAlert } from "@/lib/utils";
import axios from "axios";
import { Zap } from "lucide-react";
import React, { useState } from "react";

interface SubscriptionButtonProps {
  isPlus: boolean;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  isPlus = false,
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
      devAlert("BILLING_ERROR " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onClick}
      // className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent min-w-[325px]"
      variant={isPlus == true ? "accent" : "premium"}
      size={"lg"}
    >
      {isPlus == true ? "Manage Subscription" : "Upgrade to Plus"}
      {isPlus == true ? null : <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
