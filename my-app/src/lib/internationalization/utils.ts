import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// https://www.youtube.com/watch?v=hA0Wp3KQYGU

let defaultLocale = "en";

const locales = ["en", "es"];

export function getLocaleFromHeadersList(headers: Headers) {
  const negotiatorHeaders: Record<string, string> = {};
  headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, defaultLocale);

  return locale;
}

//   const acceptLanguage = headers.get("accept-language");
//   if (acceptLanguage) {
//     const locale = match(acceptLanguage, ["en", "es", "fr"], {
//       defaultLocale: "en",
//     });
//     return locale;
//   }
//   return "en";
