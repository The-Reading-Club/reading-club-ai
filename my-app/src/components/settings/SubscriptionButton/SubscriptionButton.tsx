"use client";
import { Button } from "@/components/ui/button";
import { devAlert } from "@/lib/utils";
import { useTRCAppConfigStore } from "@/stores/store";
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

  const { dictionary } = useTRCAppConfigStore();

  const onClick = async () => {
    try {
      setLoading(true);

      const clientReferenceId = (window as any).Rewardful.referral;

      let stripeCheckOutUrl;

      if (clientReferenceId) {
        stripeCheckOutUrl = "api/stripe?clientReferenceId=" + clientReferenceId;
        // add `prefilled_promo_code` URL parameter as well
        // https://docs.stripe.com/payment-links/promotions#:~:text=Add%20promotion%20codes&text=Create%20a%20promotion%20code%20in,when%20sharing%20a%20payment%20link.
        const promoCode = "YOUTUBEFAN";
        stripeCheckOutUrl += "&prefilled_promo_code=" + promoCode;
      } else stripeCheckOutUrl = "api/stripe";

      const response = await axios.get(stripeCheckOutUrl);

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
      {isPlus == true
        ? dictionary?.components.proSubscriptionPanel.manageSubscription
        : dictionary?.components.proSubscriptionPanel.upgradeToPlus}
      {isPlus == true ? null : <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
