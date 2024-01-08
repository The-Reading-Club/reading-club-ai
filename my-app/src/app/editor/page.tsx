import React from "react";
// import ReadingClubEditor from "./ReadingClubEditor";
import Tiptap from "@/components/tiptap-tests/Tiptap";

const page = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // border: "5px solid red",
        // height: "650px",
        // overflow
        // overflow: "scroll",
      }}
      className="bg-[#FCF29A]"
    >
      {/* <ReadingClubEditor /> */}
      <Tiptap />
    </div>
  );
};

export default page;
