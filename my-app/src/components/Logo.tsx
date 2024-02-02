"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 300, height = 300 }) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className="block cursor-pointer"
      height={width}
      width={height}
      src="/reading-club-ai-white-logo-new.png"
    ></Image>
  );
};

export default Logo;
