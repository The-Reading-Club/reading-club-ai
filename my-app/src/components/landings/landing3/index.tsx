import React from "react";
import Landing3Server from "./Landing3Server";
import { Dictionary } from "@/app/[lang]/dictionaries";

interface Landing3Props {
  page: Dictionary;
}

const Landing3: React.FC<Landing3Props> = ({ page }) => {
  return <Landing3Server page={page} />;
};

export default Landing3;
