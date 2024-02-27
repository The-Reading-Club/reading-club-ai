"use client";
import { IconNode, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { IconType as ReactIcon } from "react-icons";

interface SidebarItemProps {
  href: string;
  label: string;
  // icon: LucideIcon | ReactIcon;
  // icon: LucideIcon | ReactIcon;
  icon: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  icon: Icon,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 2-14 flex items-center justify-center p-4 hover:bg-primary hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} className="text-primary" />
      </div>
      <div
        className="
    relative
    hidden
    lg:flex
    items-center
    gap-4
    p-4
    rounded-full
    hover:bg-primary
    hover:bg-opacity-10
    cursor-pointer
    "
      >
        <Icon size={28} className="text-primary" />
        <p className="hidden lg:block text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
