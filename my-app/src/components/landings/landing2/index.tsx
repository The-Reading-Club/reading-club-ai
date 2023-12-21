"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XeOpj6rL5KI
 */
import Link from "next/link";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";

export default function Landing2() {
  return (
    <main className="w-full py-0 md:py-0 lg:py-0 bg-[#FAF8DA]">
      <header className="flex justify-between items-center p-5 bg-[#FFC122]">
        <h1 className="text-3xl font-bold tracking-tighter text-[#FFF]">
          Reading Club AI
        </h1>
        <NavigationMenu className="flex gap-4">
          <Link
            className="text-lg font-semibold text-[#FFF] hover:underline"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-lg font-semibold text-[#FFF] hover:underline"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-lg font-semibold text-[#FFF] hover:underline"
            href="#"
          >
            Contact
          </Link>
        </NavigationMenu>
        <Button className="bg-[#FCA436] text-white">Sign Up</Button>
      </header>
      <section className="container mx-auto my-10 px-5">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter text-[#F5911F]">
              {`Write & Publish Children's Books with AI`}
            </h2>
            <p className="text-lg text-[#F5911F] py-5">
              {`Join Reading Club AI and let's write the future together!`}
            </p>
            <Button className="bg-[#FCA436] text-white py-2 px-4 rounded">
              Learn More
            </Button>
          </div>
          <div>
            <img
              alt="Placeholder"
              className="w-full h-[400px] object-contain"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto my-10 px-5">
        <h3 className="text-3xl font-bold text-center mb-5 text-[#F5911F]">
          Our Features
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="text-2xl font-semibold text-[#F5911F]">
              AI Writing
            </CardHeader>
            <CardContent className="text-[#F5911F]">
              {`Our advanced AI can help you write children's books.`}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-2xl font-semibold text-[#F5911F]">
              Publishing
            </CardHeader>
            <CardContent className="text-[#F5911F]">
              We help you publish your books and share them with the world.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-2xl font-semibold text-[#F5911F]">
              Community
            </CardHeader>
            <CardContent className="text-[#F5911F]">
              Join a community of writers and learn from each other.
            </CardContent>
          </Card>
        </div>
      </section>
      <footer className="bg-[#FFC122] p-5">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold text-[#F5911F]">
              © 2020-2023 The Reading Club, Inc.
            </span>
          </div>
          <NavigationMenu className="flex gap-4">
            <Link
              className="text-lg font-semibold text-[#F5911F] hover:underline"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-lg font-semibold text-[#F5911F] hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
          </NavigationMenu>
        </div>
      </footer>
    </main>
  );
}
