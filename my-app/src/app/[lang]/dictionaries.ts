import "server-only";

import type { Locale } from "@/i18n.config";

const dictionaries =
  //: Record<string, () => Promise<{}>>
  {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
  };

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

// export type Dictionary = ReturnType<typeof getDictionary>;
export type Dictionary = {
  [key: string]: string;
};
