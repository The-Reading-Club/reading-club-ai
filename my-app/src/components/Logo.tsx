"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  width?: number;
  height?: number;
  padding?: number;
}

const Logo: React.FC<LogoProps> = ({
  width = 250,
  height = 250,
  padding = 2,
}) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="Logo"
      className={`block cursor-pointer p-${2}`}
      height={width}
      width={height}
      src="/reading-club-ai-logo-horizontal-white-v2.png"
    ></Image>
  );
};

export default Logo;
