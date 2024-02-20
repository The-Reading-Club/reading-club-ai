"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/lib/hooks/useModals";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { BookPlusIcon, Check, PersonStandingIcon, Zap } from "lucide-react";
import { cn, devAlert } from "@/lib/utils";
import { Button } from "../../ui/button";
import SubscriptionButton from "../../settings/SubscriptionButton";
import axios from "axios";

const ProModal = () => {
  const proModal = useProModal();

  const [loading, setLoading] = useState(false);

  const upgradeOnClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe`
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
      devAlert("BILLING_ERROR " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 text-darkFont">
              Upgrade to Reading Club AI
              <Badge
                className="bg-accent uppercase text-sm py-1 font-bold"
                variant={"premium"}
              >
                plus
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {features.map((feature) => (
              <Card
                key={`feature-promodal-${feature.label}`}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", feature.bgColor)}>
                    <feature.icon className={cn("w-6 h-6", feature.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-darkFont">
                      {feature.label}
                    </p>
                  </div>
                </div>
                <Check className="text-accent2 w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={upgradeOnClick}
            //   className="bg-accent2 rounded-full font-bold"
            size="lg"
            variant="premium"
            className="rounded-full font-bold w-full"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
          {/* <SubscriptionButton isPlus={false} /> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

// const features = [
//   "Unlimited stories",
//   "Unlimited characters",
//   "Unlimited chapters",
//   "Unlimited word count",
//   "Unlimited exports",
//   "Unlimited revisions",
//   "Unlimited everything",
// ];

// const features = [
//   // Unlimited stories
//   {
//     label: "Unlimited stories",
//     icon: "📚",
//     color: "bg-accent",
//     bgColor: "bg-accent-light",
//   },
//   // Unlimited characters
//   {
//     label: "Unlimited characters",
//     icon: "👥",
//     color: "bg-primary",
//     bgColor: "bg-primary-light",
//   },
// ];

// features again, but icons must be lucide-react icons
const features = [
  // Unlimited stories
  {
    // label: "Unlimited stories",
    label: "Unlimited generations",
    // icon: "📚",
    icon: BookPlusIcon,
    color: "text-accent2",
    bgColor: "bg-primary/30",
  },
  // Unlimited characters
  {
    // label: "Unlimited characters",
    label: "Unlimited illustrations",
    // icon: "👥",
    icon: PersonStandingIcon,
    color: "text-accent2",
    bgColor: "bg-primary/30",
  },
  // Unlimited chapters
  //   {
  //     label: "Unlimited chapters",
  //     icon: "📖",
  //     color: "bg-secondary",
  //     bgColor: "bg-secondary-light",
  //   },
  //   // Unlimited word count
  //   {
  //     label: "Unlimited word count",
  //     icon: "📝",
  //     color: "bg-zinc",
  //     bgColor: "bg-zinc-light",
  //   },
  //   // Unlimited exports
  //   {
  //     label: "Unlimited exports",
  //     icon: "📤",
  //     color: "bg-zinc",
  //     bgColor: "bg-zinc-light",
  //   },
  //   // Unlimited revisions
  //   {
  //     label: "Unlimited revisions",
  //     icon: "🔄",
  //     color: "bg-zinc",
  //     bgColor: "bg-zinc-light",
  //   },
  //   // Unlimited everything
  //   {
  //     label: "Unlimited everything",
  //     icon: "🚀",
  //     color: "bg-zinc",
  //     bgColor: "bg-zinc-light",
  //   },
];
