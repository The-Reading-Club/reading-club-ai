import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Nunito } from "next/font/google";
import Providers from "./providers";

import GoogleAnalytics from "./GoogleAnalytics";
import { dev } from "@/config";
import TestModal from "@/components/modals/TestModal";
import DefaultAppModal from "@/components/modals/DefaultAppModal";

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
  title: "Reading Club AI",
  description: "Write & Share Children's Books with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {dev == false && (
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.GA_TRACKING_ID as string}
        />
      )}
      <body className={font.className}>
        {/* <TestModal /> */}
        <DefaultAppModal />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
