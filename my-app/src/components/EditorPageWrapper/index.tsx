"use client";
import React from "react";
// import ReadingClubEditor from "./ReadingClubEditor";
import Tiptap from "@/components/tiptap-tests/Tiptap";
import TRCChatVO from "@/components/TRCChatV0";
import TRCEditorV2 from "@/components/TRCEditorV2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StoryData, useTRCEditorStore } from "@/stores/store";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../MyDocument";

interface EditorPageWrapperProps {
  editorKey: string;
  isPlus: boolean;
}
const EditorPageWrapper: React.FC<EditorPageWrapperProps> = ({
  editorKey,
  isPlus,
}) => {
  //   const { storiesData } = useTRCEditorStore();
  //   const [storyData, setStoryData] = React.useState<StoryData>(
  //     storiesData[editorKey]
  //   );

  const [storyData, setStoryData] = useTRCEditorStore((state) => [
    state.storiesData[editorKey],
    (data: StoryData) => state.setStoriesData({ [editorKey]: data }),
  ]);

  // React.useEffect(() => {
  //     setStoryData(storiesData[editorKey]);
  // }, [storiesData, editorKey]);
  const styles = {
    viewer: {
      width: "50vw", // 100% of the viewport width
      height: "50vh", // 100% of the viewport height
      border: "none", // Optional, removes the border
    },
  };

  //   https://react-pdf.org/advanced#using-the-usepdf-hook

  //   return (
  //     <PDFViewer style={styles.viewer}>
  //       <MyDocument />
  //     </PDFViewer>
  //   );

  return (
    <div //className="h-[100%] overflow-auto"
      className="px-3 lg:pb-0 pb-8"
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
        className="flex lg:flex-row-reverse flex-col-reverse"
        // className="flex justify-around overflow-scroll"
        style={{
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
        <LeftPanel storyData={storyData} setStoryData={setStoryData} />
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
          <TRCEditorV2
            editorKey={editorKey}
            // should be the other way around
            // enableLocalStorage
            enableLocalStorage={true}
          />
        </div>
        <RightPanel storyData={storyData} isPlus={isPlus} />
      </div>
    </div>
  );
};

export default EditorPageWrapper;
