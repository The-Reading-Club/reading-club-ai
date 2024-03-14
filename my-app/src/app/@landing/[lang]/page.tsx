import React from "react";

import { Locale, i18n } from "@/i18n.config";
import { getDictionary } from "@/lib/internationalization/dictionary";
import Landing3 from "@/components/landings/landing3";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
  // filter out default locale
  // .filter((locale) => locale.lang !== "en")
}

const LocalizedHome = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);

  // return <h1>HELLO WORLD FROM LANDING LANG</h1>;
  return <Landing3 dictionary={dictionary} />;
};

export default LocalizedHome;
