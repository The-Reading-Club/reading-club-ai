"use client";
import { TRCRateLimits, useTRCAppConfigStore } from "@/stores/store";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusSubscriptionPanel } from "../EditorPageWrapper/RightPanel";
import { useRouter } from "next/navigation";
import { getTimeUntilReset, pastTime } from "@/lib/utils";
import { MAX_FREE_COUNT_ILLUSTRATION } from "@/lib/utils";

interface FreeCounterProps {
  rateLimits: TRCRateLimits;
  isPlus: boolean;
}

// THIS WASN'T WORKING AND WAS BEING USED AS A DAMN NULL
// THE PROBLEM IS THAT THIS CONSTANT IS BEING DEFINED IN THE CLIENT AND NOT IN THE SERVER
// export const MAX_FREE_COUNT_ILLUSTRATION = 10; //10;
const MAX_FREE_COUNT_ILLUSTRATION_PROMPT = 40;
const MAX_FREE_COUNT_GENERATION = 10;

const FreeCounter: React.FC<FreeCounterProps> = ({ rateLimits, isPlus }) => {
  const { dictionary } = useTRCAppConfigStore();

  const {
    illustration: remainingIllustrations,
    illustrationPrompt: remainingIllustrationPrompts,
    generation: remainingGenerations,
  } = rateLimits;

  // I need to do the math to have 0 / MAX kind of counters

  const currentTime: Date = new Date();

  const illustrationCount =
    remainingIllustrations == -1
      ? 0
      : MAX_FREE_COUNT_ILLUSTRATION - remainingIllustrations;
  const illustrationPromptCount =
    MAX_FREE_COUNT_ILLUSTRATION_PROMPT - remainingIllustrationPrompts;
  let generationCount =
    remainingGenerations == -1
      ? 0
      : MAX_FREE_COUNT_GENERATION - remainingGenerations;

  if (currentTime.getTime() - rateLimits.generationReset * 1000 > 0) {
  }

  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [useTRCAppConfigStore.getState().apiSuccessCallsCount]);

  // Convert Unix timestamp to milliseconds
  const resetTimestampMs = rateLimits.generationReset * 1000;

  const calculateTimeLeft = () => {
    const difference = resetTimestampMs - new Date().getTime();
    return difference;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Update the countdown every second
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [timeLeft]);

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
            <p className="text-2xl font-bold">
              {dictionary?.components.freeCounter.thisWeek}
            </p>
            <p className="text-xl font-semibold">
              {pastTime(rateLimits.illustrationReset) ? 0 : illustrationCount} /{" "}
              {MAX_FREE_COUNT_ILLUSTRATION}{" "}
              {dictionary?.components.freeCounter.freeIllustrations}
            </p>
            {rateLimits.illustrationReset != -10 && (
              <p className="text-sm">
                {getTimeUntilReset(rateLimits.illustrationReset)}
              </p>
            )}
            <Progress
              className="h-3"
              value={
                (pastTime(rateLimits.illustrationReset)
                  ? 0
                  : illustrationCount / MAX_FREE_COUNT_ILLUSTRATION) * 100
              }
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
              {pastTime(rateLimits.generationReset) ? 0 : generationCount} /{" "}
              {MAX_FREE_COUNT_GENERATION}{" "}
              {dictionary?.components.freeCounter.freeGenerations}
            </p>
            {/* How is this countdown working if this is not a state x.x */}
            {
              <p className="text-sm">
                {getTimeUntilReset(rateLimits.generationReset)}
              </p>
            }
            {/* <p className="text-sm">{timeLeft}</p>
            <p className="text-sm">{getTimeUntilReset(timeLeft)}</p> */}
            <Progress
              className="h-3"
              value={
                (pastTime(rateLimits.generationReset)
                  ? 0
                  : generationCount / MAX_FREE_COUNT_GENERATION) * 100
              }
            />
            {/* <PlusSubscriptionPanel isPlus={false} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
