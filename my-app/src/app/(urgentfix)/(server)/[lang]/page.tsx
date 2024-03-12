import { redirect } from "next/navigation";
import React from "react";

const LangPageDefaultPrallelRoute = () => {
  // redirect to "/"

  //   https://nextjs.org/docs/app/api-reference/functions/redirect
  redirect("/");

  return null;
  //   return <div>LangPageDefaultPrallelRoute</div>;
};

export default LangPageDefaultPrallelRoute;
