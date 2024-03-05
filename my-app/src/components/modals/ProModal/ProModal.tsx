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
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 text-darkFont">
              Upgrade to readingclub.ai
              <Badge
                className="bg-accent uppercase text-sm py-1 font-bold"
                variant={"premium"}
              >
                plus
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {/* Big banner saying "Enable creative writing at any literacy level" */}
            <div className="lg:text-4xl text-2xl font-semibold text-darkFont">
              {/* Enable Creative Writing at any Literacy Level */}
              {`Be a prolific storybook writer`}
            </div>
            {/* Description paragraph */}
            <div className="w-full py-6">
              <p className="text-lg">
                {/* Unlock the full potential of Reading Club AI with unlimited
              stories, characters, chapters, word count, exports, revisions, and
              everything else. */}
                No matter your age, craft stories for (and with!) young readers
                in 50+ languages, assisted by AI.
              </p>
              <br />
              {/* <p>
              Users retain ownership of their stories, which can be published on
              Amazon, and shared with others.
            </p> */}
              {/* <p className="text-lg">
                The tools{" "}
                <span className="font-semibold">
                  fosters creativity, helps overcome writer's block, and makes
                  writing enjoyable
                </span>{" "}
                for beginners and experts.
              </p> */}
              <p className="text-lg">
                Beginner or expert,{" "}
                <span className="font-semibold">
                  {`foster your creativity, overcome writer's block, and enjoy writing creatively`}
                </span>
                .
              </p>
            </div>
            {/* SHOW % 20 / Month pricing */}
            <div className="flex justify-around gap-6">
              <div className="text-3xl font-bold text-darkFont py-6">
                US$20 / Month
              </div>
              {true && (
                <div className="basis-[50%]">
                  {features.map((feature) => (
                    <Card
                      key={`feature-promodal-${feature.label}`}
                      className="p-3 border-black/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-x-4">
                        <div
                          className={cn(
                            "p-2 w-fit rounded-md",
                            feature.bgColor
                          )}
                        >
                          <feature.icon
                            className={cn("w-6 h-6", feature.color)}
                          />
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
                </div>
              )}
            </div>
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
            Upgrade to Plus
            <Zap className="w-4 h-4 ml-2 fill-white" />
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
    label: "Enjoy writing unlimited professional-quality storybooks",
    // icon: "📚",
    icon: BookPlusIcon,
    color: "text-accent2",
    bgColor: "bg-primary/30",
  },
  // Unlimited characters
  {
    // label: "Unlimited characters",
    label: "Motivate young readers with unlimited personalized illustrations",
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
