import { i18n } from "@/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";

// https://www.youtube.com/watch?v=hA0Wp3KQYGU

let defaultLocale = "en";

// const locales = ["en", "es"];

export function getLocaleFromRequest(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are read only
  const locales: string[] = i18n.locales;

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, defaultLocale);

  return locale;
}

export function getLocaleFromHeadersList(headers: Headers) {
  try {
    const negotiatorHeaders: Record<string, string> = {};
    headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are read only
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();

    const locale = matchLocale(languages, locales, defaultLocale);

    return locale;
  } catch (error) {
    console.error("Error in getLocaleFromHeadersList headers", headers);
    console.error("Error in getLocaleFromHeadersList error: ", error);
    throw error;
  }
}

//   const acceptLanguage = headers.get("accept-language");
//   if (acceptLanguage) {
//     const locale = match(acceptLanguage, ["en", "es", "fr"], {
//       defaultLocale: "en",
//     });
//     return locale;
//   }
//   return "en";

// https://chat.openai.com/
// Extracts the locale from the path if present and returns the locale and the base path
export function extractLocaleAndBasePath(pathname: string) {
  const segments = pathname.split("/");

  // @ts-ignore locales are read only
  const locales: string[] = i18n.locales;

  if (segments.length > 1 && locales.includes(segments[1])) {
    // If the first segment is a locale, remove it from the path
    return {
      locale: segments[1],
      basePath: "/" + segments.slice(2).join("/"),
    };
  }
  // No locale found, return the original path as basePath
  return { locale: null, basePath: pathname };
}
