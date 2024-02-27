"use client";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";

import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
// import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  // const session = await auth();
  const session = useSession();

  const currentUser = session?.data?.user;

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
      // icon: async () => {
      //   "use server";
      //   // https://stackoverflow.com/questions/75676177/error-functions-cannot-be-passed-directly-to-client-components-unless-you-expli
      //   return BsHouseFill;
      // },
    },
    // {
    //   label: "Notifications",
    //   href: "/notifications",
    //   icon: BsBellFill,
    // },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          {/* {<p>User: {JSON.stringify(currentUser, null, 2)}</p>} */}
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
