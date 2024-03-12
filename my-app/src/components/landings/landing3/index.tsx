import React from "react";
import Landing3Server from "./Landing3Server";
import { TRCDictionary } from "@/lib/internationalization/dictionary";

interface Landing3Props {
  dictionary: TRCDictionary;
}

const Landing3: React.FC<Landing3Props> = ({ dictionary }) => {
  return <Landing3Server dictionary={dictionary} />;
};

export default Landing3;
