import React from "react";

import { auth, signOut } from "@/auth";
import SubscriptionButton from "@/components/settings/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const session = await auth();

  // I feel this shoudl have been a hook and while waiting for the hook to resolve,
  // we should have shown a loading spinner (anything really)
  const isPro = await checkSubscription();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server"; // dark magic lol

          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
      <SubscriptionButton isPlus={isPro} />
    </div>
  );
};

export default SettingsPage;
