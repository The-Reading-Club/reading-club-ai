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
    if (!headers) {
      return defaultLocale;
    }

    // If it doesn't have the accept language header
    // Not sure, I wouldn't want to block it unless I'm 100% sure I should expect this header but I am not certain how the Negotiator works
    if (!headers.has("accept-language")) {
      console.error("No accept-language header found in headers", headers);
      // return defaultLocale;
    }

    const negotiatorHeaders: Record<string, string> = {};
    headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are read only
    const locales: string[] = i18n.locales;

    console.log("locales", locales);

    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();

    console.log("languages", languages);

    const locale = matchLocale(languages, locales, defaultLocale);

    console.log("locale", locale);

    return locale;
  } catch (error) {
    console.error("Error in getLocaleFromHeadersList headers", headers);
    console.error("Error in getLocaleFromHeadersList error: ", error);
    return defaultLocale;
    // throw error;
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
  try {
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
  } catch (error) {
    console.error("Error in extractLocaleAndBasePath pathname", pathname);
    console.error("Error in extractLocaleAndBasePath error: ", error);
    throw error;
  }
}
