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
import { getDictionary } from "@/lib/internationalization/dictionary";

export default async function Home() {
  const dictionary = await getDictionary("en");
  return <Landing3 dictionary={dictionary} />;
}
