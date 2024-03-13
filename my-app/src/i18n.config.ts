export const i18n = {
  defaultLocale: "en",
  locales: [
    "en",
    "es",
    "uk",
    // "zh-CN"
  ],
} as const;

export type Locale = (typeof i18n.locales)[number];

// https://stackoverflow.com/questions/69709824/what-is-the-typical-chinese-language-code-for-the-accept-language-header
// https://www.ibm.com/docs/en/sva/8.0.1?topic=responses-accept-language-http-header
