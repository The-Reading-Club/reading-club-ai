/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XeOpj6rL5KI
 */
import Link from "next/link";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Landing2 from "@/components/landings/landing2";
import Landing3 from "@/components/landings/landing3";

import { Locale } from "@/i18n.config";
import { Dictionary, getDictionary } from "../dictionaries";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page } = await getDictionary(lang);

  return <Landing3 page={page as Dictionary} />;
}
