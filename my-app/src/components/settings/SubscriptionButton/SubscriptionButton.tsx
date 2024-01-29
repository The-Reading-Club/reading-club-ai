"use client";
import { Button } from "@/components/ui/button";
import { devAlert } from "@/lib/utils";
import axios from "axios";
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
      className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent min-w-[325px]"
    >
      {isPlus == true ? "Manage Subscription" : "Get Plus"}
    </Button>
  );
};

export default SubscriptionButton;
