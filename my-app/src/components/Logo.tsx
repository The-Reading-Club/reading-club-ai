"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height="300"
      width="300"
      src="/reading-club-ai-white-logo-new.png"
    ></Image>
  );
};

export default Logo;
