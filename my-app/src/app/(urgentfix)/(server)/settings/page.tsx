import React from "react";

import { auth, signOut } from "@/auth";
import SubscriptionButton from "@/components/settings/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import { getLocaleFromHeadersList } from "@/lib/internationalization/utils";
import { getDictionary } from "@/lib/internationalization/dictionary";
import { Locale } from "@/i18n.config";

const SettingsPage = async () => {
  const session = await auth();

  // I feel this shoudl have been a hook and while waiting for the hook to resolve,
  // we should have shown a loading spinner (anything really)
  const isPro = await checkSubscription();

  const headerList = headers();
  const locale = getLocaleFromHeadersList(headerList);

  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className="p-16 flex flex-col gap-6 justify-start items-center">
      {/* <p style={{ wordWrap: "break-word", maxWidth: "75%" }}>
        {JSON.stringify(session, null, 2)}
      </p> */}
      {/* {JSON.stringify(session)}
      <form
        action={async () => {
          "use server"; // dark magic lol

          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form> */}
      <h1 className="text-6xl font-bold text-primary">
        {(await dictionary).page.settings.title}
      </h1>

      {/* Name */}
      <p className="text-2xl text-darkFont">{session?.user.name ?? ""}</p>
      {/* Email */}
      <p className="text-xl text-darkFont">
        {session?.user.email ?? "Your email"}
      </p>

      {/* Say that you are currently subscribed if so */}
      <p className="text-xl text-darkFont">
        {isPro
          ? dictionary.page.settings.paidPlan
          : dictionary.page.settings.freePlan}
      </p>
      <div
        // className="min-w-[250px]"
        style={
          {
            // border: "2px solid red",
            // display: "flex",
            // justifyContent: "stretch",
            // alignItems: "stretch",
          }
        }
      >
        <SubscriptionButton isPlus={isPro} />
      </div>
      {/* LOG OUT BUTTON */}
      {false && (
        <form
          action={async () => {
            "use server"; // dark magic lol

            await signOut();
          }}
        >
          <Button
            type="submit"
            // onClick={async () => {
            //   "use server"; // dark magic lol
            //   await signOut();
            // }}
            // className="bg-primary text-white rounded-md py-2 px-4"
            // className=""
            variant={"outline"}
          >
            Sign out
          </Button>
        </form>
      )}
    </div>
  );
};

export default SettingsPage;
