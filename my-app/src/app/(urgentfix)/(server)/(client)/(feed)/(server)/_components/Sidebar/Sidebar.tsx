"use client";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import React from "react";
import SidebarItem from "./SidebarItem";

import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
// import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import DraftItem from "@/app/(urgentfix)/(server)/(client)/(main)/_components/DraftItem/DraftItem";
import { useMutation } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SidebarWriteButton from "./SidebarWriteButton";

const Sidebar = () => {
  // const session = await auth();
  const session = useSession();

  const currentUser = session?.data?.user;

  // This could be a custom hook
  const create = useMutation(api.documents.create);

  const router = useRouter();

  const onRedirect = (documentId: string) => {
    router.push(`/drafts/${documentId}`);
  };

  const onCreate = () => {
    if (!currentUser || !currentUser.email) {
      return;
    }

    const promise = create({
      title: "Untitled",
      author: currentUser?.name ?? "New Author",
      // Wondering how I can move away from emails here...
      // Just stop... authentication will have oAuthId on
      // convex and I can use that to create documents
      // Just need to verify that all users have an oAuthId
      userId: currentUser?.email,
    })
      .then((documentID) => {
        onRedirect(documentID);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });

    toast.promise(promise, {
      loading: "Creating a new book...",
      success: "Book created!",
      error: "Failed to create a new book",
    });
  };

  const items = [
    {
      label: "News Feed",
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
          <SidebarWriteButton onClick={onCreate} />
        </div>
      </div>
      <div className="mt-5 pl-10 scale-90 hidden lg:block">
        <DraftItem
          key={"draft-item-add-book-default-newsfeed"}
          title={"A Great Story"}
          author={"By you"}
          coverUrl={""}
          onClick={onCreate}
          colorClassName="bg-accent2"
          titleBgColorClassname=""
          showCoverImage={false}
          titleColorClassname="text-white opacity-80"
          authorColorClassname="text-white opacity-80"
        />
      </div>
    </div>
  );
};

export default Sidebar;
