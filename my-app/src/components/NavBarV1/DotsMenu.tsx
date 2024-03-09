import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import SignOutForm from "./SignOutForm";
import Link from "next/link";

interface DotsMenuProps {
  showSignout?: boolean;
}

const DotsMenu: React.FC<DotsMenuProps> = ({ showSignout = true }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-transparent hover:text-white focus-visible:border-0 block lg:hidden"
      >
        <Button size="sm" variant={"ghost"}>
          {/* used to be h-4 w-4 */}
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // className="w-60"
        align="end"
        alignOffset={8}
        forceMount
        className="border-0"
      >
        {/* <DropdownMenuItem>Item 1</DropdownMenuItem> */}
        <DropdownMenuItem className="">
          <a
            href="https://readingclub.canny.io"
            className="text-black absolute top-0 left-0 right-0 bottom-0 py-1.5 pl-2 pr-2"
          >
            Feedback
          </a>
          <a href="https://readingclub.canny.io" className="invisible">
            Feedback
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/settings"
            className="text-black absolute top-0 left-0 right-0 bottom-0 py-1.5 pl-2 pr-2"
          >
            Settings
          </Link>
          <Link href="/settings" className="invisible">
            Settings
          </Link>
        </DropdownMenuItem>
        {showSignout == true && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{<SignOutForm className="" />}</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DotsMenu;
