import { TRCRateLimits, useTRCAppConfigStore } from "@/stores/store";
import React, { use, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusSubscriptionPanel } from "../EditorPageWrapper/RightPanel";
import { useRouter } from "next/navigation";

interface FreeCounterProps {
  rateLimits: TRCRateLimits;
  isPlus: boolean;
}

const MAX_FREE_COUNT_ILLUSTRATION = 10; //10;
const MAX_FREE_COUNT_ILLUSTRATION_PROMPT = 40;
const MAX_FREE_COUNT_GENERATION = 10;

const FreeCounter: React.FC<FreeCounterProps> = ({ rateLimits, isPlus }) => {
  const {
    illustration: remainingIllustrations,
    illustrationPrompt: remainingIllustrationPrompts,
    generation: remainingGenerations,
  } = rateLimits;

  // I need to do the math to have 0 / MAX kind of counters

  const illustrationCount =
    remainingIllustrations == -1
      ? 0
      : MAX_FREE_COUNT_ILLUSTRATION - remainingIllustrations;
  const illustrationPromptCount =
    MAX_FREE_COUNT_ILLUSTRATION_PROMPT - remainingIllustrationPrompts;
  const generationCount =
    remainingGenerations == -1
      ? 0
      : MAX_FREE_COUNT_GENERATION - remainingGenerations;

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [useTRCAppConfigStore.getState().apiSuccessCallsCount]);

  if (isPlus == true) {
    return null;
  }

  return (
    <div className="px-0 mb-3">
      <Card
        className="bg-primary border-0"
        // style={{ border: "2px solid black" }}
      >
        <CardContent className="py-3">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p className="text-2xl font-bold">Today:</p>
            <p className="text-xl font-semibold">
              {illustrationCount} / {MAX_FREE_COUNT_ILLUSTRATION} free
              illustrations
            </p>
            <Progress
              className="h-3"
              value={(illustrationCount / MAX_FREE_COUNT_ILLUSTRATION) * 100}
            />
            {/* <p className="text-xl font-bold">
              {illustrationCount} / {MAX_FREE_COUNT_ILLUSTRATION} free
              illustrations
            </p>
            <Progress
              className="h-3"
              value={(illustrationCount / MAX_FREE_COUNT_ILLUSTRATION) * 100}
            /> */}
            <p className="text-xl font-semibold">
              {generationCount} / {MAX_FREE_COUNT_GENERATION} free generations
            </p>
            <Progress
              className="h-3"
              value={(generationCount / MAX_FREE_COUNT_GENERATION) * 100}
            />
            {/* <PlusSubscriptionPanel isPlus={false} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
