import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "../Logo";
import { Button } from "../ui/button";
import DotsMenu from "./DotsMenu";
import SignOutForm from "./SignOutForm";
import UnstyledExternalLink from "../UnstyledExternalLink";
import { TRCDictionary } from "@/lib/internationalization/dictionary";
// import Share from "../Share/Share";

interface NavBarV1Props {
  showSignout?: boolean;
  dictionary: TRCDictionary;
}

const NavBarV1: React.FC<NavBarV1Props> = ({
  showSignout = true,
  dictionary,
}) => {
  return (
    <nav className="bg-primary text-white px-5">
      <div className="container mx-auto flex justify-between items-center">
        {/* used to be xl */}
        <div className="text-2xl font-bold  flex space-x-12">
          <Link href="/" className="text-white">
            {/* <Logo width={150} height={150} padding={0} /> */}
            {dictionary.components.navbar.home}
          </Link>
          <Link href="/drafts" className="text-white">
            {/* <Logo width={150} height={150} padding={0} /> */}
            {dictionary.components.navbar.stories}
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
              <p className="text-white">
                {dictionary.components.navbar.feedback}
              </p>
            </UnstyledExternalLink>
          </div>
          <Link href="/settings" className="text-white hidden lg:block">
            {dictionary.components.navbar.settings}
          </Link>
          <div className="hidden lg:block">
            {showSignout == true && <SignOutForm dictionary={dictionary} />}
          </div>
          <DotsMenu dictionary={dictionary} />
          {/* <Share /> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBarV1;
