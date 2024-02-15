import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
// import Share from "../Share/Share";

const NavBarV1 = () => {
  return (
    <nav className="bg-primary text-white px-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold text-white flex space-x-12">
          <Link href="/drafts" className="text-white">
            {/* <Logo width={150} height={150} padding={0} /> */}
            Stories
          </Link>
          {false && (
            <Link href="/editor" className="text-white">
              {/* <Logo width={150} height={150} padding={0} /> */}
              Editor
            </Link>
          )}
        </div>
        <div className="flex space-x-12 reset-a-styles font-semibold p-4">
          <Link href="/settings" className="text-white">
            Settings
          </Link>
          <form
            action={async () => {
              "use server"; // dark magic lol

              await signOut();
            }}
          >
            <button
              type="submit"
              // onClick={async () => {
              //   "use server"; // dark magic lol
              //   await signOut();
              // }}
              // className="bg-primary text-white rounded-md py-2 px-4"
              // className=""
            >
              Sign out
            </button>
          </form>

          {/* <Share /> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBarV1;
