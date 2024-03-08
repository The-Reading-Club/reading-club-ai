import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "../Logo";
import { Button } from "../ui/button";
import DotsMenu from "./DotsMenu";
import SignOutForm from "./SignOutForm";
import UnstyledExternalLink from "../UnstyledExternalLink";
// import Share from "../Share/Share";

const NavBarV1 = ({ showSignout = true }: { showSignout?: boolean }) => {
  return (
    <nav className="bg-primary text-white px-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* used to be xl */}
        <div className="text-2xl font-bold  flex space-x-12">
          <Link href="/" className="text-white">
            {/* <Logo width={150} height={150} padding={0} /> */}
            Home
          </Link>
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
        <div className="flex space-x-12 reset-a-styles font-semibold p-4 items-center">
          {/* <Link href="/settings" className="text-white hidden lg:block">
            Feedback
          </Link> */}
          <div className="hidden lg:block">
            <UnstyledExternalLink href="https://readingclub.canny.io">
              <p className="text-white">Feedback</p>
            </UnstyledExternalLink>
          </div>
          <Link href="/settings" className="text-white hidden lg:block">
            Settings
          </Link>
          <div className="hidden lg:block">
            {showSignout == true && <SignOutForm />}
          </div>
          <DotsMenu />
          {/* <Share /> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBarV1;
