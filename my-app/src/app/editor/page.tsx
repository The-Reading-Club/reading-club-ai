"use client";
import React from "react";
// import ReadingClubEditor from "./ReadingClubEditor";
import Tiptap from "@/components/tiptap-tests/Tiptap";
import TRCChatVO from "@/components/TRCChatV0";
import TRCEditorV2 from "@/components/TRCEditorV2";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div //className="h-[100%] overflow-auto"
      className="bg-secondary px-3"
      style={
        {
          // height: "100vh",
          // border: "2px solid red",
          // overflow: "scroll",
          // overflow: "scroll",
          // height: 100,
        }
      }
    >
      <div
        // className="flex justify-around overflow-scroll"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          // border: "5px solid green",
          // width: "1000px",
          // overflow: "scroll",
          // scrollPaddingLeft: 1000,
          // marginLeft: "100%",
          justifyContent: "center",
        }}
      >
        {/* <div> */}
        {false && <TRCChatVO />}
        {/* </div> */}
        {/* <h1>TEST</h1> */}
        <div className="basis-1/4"></div>
        <div
          className="flex basis-1/2" // THIS IS THE PROBLEM
          // OTHERWISE SCROLL OVERFLOW DOESNT WORK
          style={{
            flexDirection: "column",
            // flexDirection: "row",
            alignItems: "center",
            height: "100vh", // could be max height
            // minWidth: "500px",
            // minWidth: "60%",
            // border: "5px solid black",
          }}
        >
          <TRCEditorV2 editorKey="trc-editor-spage" />
        </div>
        {/* <h1>TEST</h1> */}
        <div
          className="basis-1/4 flex flex-col justify-center p-10 text-center"
          style={{ height: "100vh" }}
        >
          <h1 className="text-2xl font">Proof of Concept</h1>
          <br />
          <Button className="bg-accent2 rounded-full font-bold text-xl py-7 px-8">
            Give Feedback
          </Button>
        </div>
        {/* <button className="bg-primary rounded-full">TEST</button> */}

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
