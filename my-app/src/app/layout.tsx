import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Nunito } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const font = Nunito({
  subsets: ["latin"],
  // https://nextjs.org/docs/pages/api-reference/components/font
  weight: ["400", "800"], // can add more weights, pretty cool
  // style: "italic",
  variable: "--font-title",
});

export const metadata: Metadata = {
  title: "Reading Club AI",
  description: "Write & Publish Children's Books with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
