import React from "react";
import { signOut } from "@/auth";

interface SignOutFormProps {
  className?: string;
}

const SignOutForm: React.FC<SignOutFormProps> = ({ className }) => {
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
        Sign out
      </button>
    </form>
  );
};

export default SignOutForm;
