"use client";
import React from "react";
// import ReadingClubEditor from "./ReadingClubEditor";
import Tiptap from "@/components/tiptap-tests/Tiptap";
import TRCChatVO from "@/components/TRCChatV0";
import TRCEditorV2 from "@/components/TRCEditorV2";

const page = () => {
  return (
    <div //className="h-[100%] overflow-auto"
      style={{
        // height: "100vh",
        border: "2px solid red",
        // overflow: "scroll",
        // overflow: "scroll",
        // height: 100,
      }}
    >
      <div
        // className="flex justify-around overflow-scroll"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          border: "5px solid green",
          // width: "1000px",
          // overflow: "scroll",
          // scrollPaddingLeft: 1000,
          // marginLeft: "100%",
        }}
      >
        {/* <div> */}
        <TRCChatVO />
        {/* </div> */}
        <div
          className="flex" // THIS IS THE PROBLEM
          // OTHERWISE SCROLL OVERFLOW DOESNT WORK
          style={{
            flexDirection: "column",
            // flexDirection: "row",
            alignItems: "center",
            height: "100vh", // could be max height
            // minWidth: "500px",
            minWidth: "60%",
            border: "5px solid black",
          }}
        >
          <TRCEditorV2 />
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // border: "5px solid red",
            // height: "650px",
            // overflow
            overflow: "scroll",
          }}
          className="bg-[#FCF29A]"
        ></div> */}
      </div>
    </div>
  );
};

export default page;
