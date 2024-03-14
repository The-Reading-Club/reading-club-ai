import "server-only";
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  uk: () => import("@/dictionaries/uk.json").then((module) => module.default),
  "zh-CN": () =>
    import("@/dictionaries/zh-CN.json").then((module) => module.default),
  hi: () => import("@/dictionaries/hi.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

// export type TRCDictionary = ReturnType<typeof getDictionary>;

// /https://chat.openai.com/c/50d0c407-2478-457e-8278-32d038ca7403
// Define a utility type to extract the type from a Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// Use the utility type to unwrap the promise and get the desired type
export type TRCDictionary = UnwrapPromise<ReturnType<typeof getDictionary>>;
