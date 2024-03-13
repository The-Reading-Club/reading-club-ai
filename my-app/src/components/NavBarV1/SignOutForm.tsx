import React from "react";
import { signOut } from "@/auth";
import { TRCDictionary } from "@/lib/internationalization/dictionary";

interface SignOutFormProps {
  className?: string;
  dictionary: TRCDictionary;
}

const SignOutForm: React.FC<SignOutFormProps> = ({ className, dictionary }) => {
  return (
    <form
      className={className}
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
        {dictionary?.components.navbar.signout}
      </button>
    </form>
  );
};

export default SignOutForm;
