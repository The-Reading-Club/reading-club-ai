import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Nunito } from "next/font/google";
import Providers from "./providers";

import GoogleAnalytics from "./GoogleAnalytics";
import { dev } from "@/config";
import TestModal from "@/components/modals/TestModal";
import DefaultAppModal from "@/components/modals/DefaultAppModal";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { SessionProvider } from "next-auth/react";

import { Locale, i18n } from "@/i18n.config";

const inter = Inter({ subsets: ["latin"] });

const font = Nunito({
  subsets: ["latin"],
  // https://nextjs.org/docs/pages/api-reference/components/font
  // https://chat.openai.com/c/1721c5a6-e167-4fb0-b86c-8952a530ab1b
  // // Add 600 and 700 for semi-bold and bold
  weight: ["400", "600", "800", "800"], // can add more weights, pretty cool
  // style: "italic",
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "readingclub.ai",
  description: "Enable Creative Writing at Any Literacy Level",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  landing,
  params,
}: // feed,
// common,
{
  children: React.ReactNode;
  landing: React.ReactNode;
  // feed: React.ReactNode;
  // common: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await auth();

  let userIsLoggedIn = false;

  if (session && session.user && session.user.email) {
    userIsLoggedIn = true;
  }

  // let pathname: string | null = null;

  // const headerList = headers();
  // if (headerList && headerList.get("x-pathname")) {
  //   pathname = headerList.get("x-pathname") as string;
  // }

  // const isLandingPage = pathname === "/";

  // console.log("THIS IS THE STUPID PATHNAME", pathname);

  // if (!params) return <p>Esta mierda no sirve</p>;
  // else return <p>Esta mierda si sirve</p>;

  return (
    <html
      lang="en"
      // because this is async this can be undefined
      // https://github.com/HamedBahram/next-i18n/blob/main/app/%5Blang%5D/layout.tsx
      // https://github.com/vercel/next.js/discussions/58995
      // https://www.reddit.com/r/nextjs/comments/14niltx/dynamic_route_params_is_undefined_in_prod_env/
      // https://dev.to/deepcodes/fixing-nextjs-router-query-param-returning-undefined-on-initial-render-5f80
      // https://stackoverflow.com/questions/76594955/getting-undefined-params-in-my-compoment-with-generatestaticparams-nextjs-13-ho
      // lang={params ? params?.lang : "en"}
    >
      {dev == false && (
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.GA_TRACKING_ID as string}
        />
      )}
      <body className={`${font.className}`}>
        {/* <Header lang=params.lang /> */}

        {/* <TestModal /> */}
        <DefaultAppModal />
        {/* <SessionProvider session={session}> */}
        <Providers>
          {/* <p>pathname {pathname}</p> */}
          {/* {children} */}
          {/* {children} */}
          {/* {landing} */}
          {/* {userIsLoggedIn == false && isLandingPage == true
            ? landing
            : children} */}
          {/* SOFT NAVIGATION AND PARALLEL ROUTES */}
          {/* https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#active-state-and-navigation */}
          {/* https://github.com/vercel/next.js/issues/48719 */}
          {/* https://github.com/vercel/next.js/issues/48719#issuecomment-1794680696 */}
          {/* https://github.com/vercel/next.js/issues/51714#issuecomment-1697615626 */}
          {userIsLoggedIn == false && landing}
          {children}
          {/* {common} */}
          {/* {userIsLoggedIn == false ? children : feed} */}
        </Providers>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
