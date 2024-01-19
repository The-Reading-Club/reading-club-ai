"use client";
import React from "react";
// import ReadingClubEditor from "./ReadingClubEditor";
import Tiptap from "@/components/tiptap-tests/Tiptap";
import TRCChatVO from "@/components/TRCChatV0";
import TRCEditorV2 from "@/components/TRCEditorV2";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StoryData, useTRCEditorStore } from "@/stores/store";
import CharacterList from "./CharacterList";

interface EditorPageWrapperProps {
  editorKey: string;
}
const EditorPageWrapper: React.FC<EditorPageWrapperProps> = ({ editorKey }) => {
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

  return (
    <div //className="h-[100%] overflow-auto"
      className="bg-secondary px-3 lg:pb-0 pb-8"
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
        {/* <div> */}
        {false && <TRCChatVO />}
        {/* </div> */}
        {/* <h1>TEST</h1> */}
        <div
          className="basis-1/4 lg:flex hidden flex-col justify-center pt-8 lg:p-10 text-center"
          style={{ height: "100vh" }}
        >
          {/* <div>
        <p>{JSON.stringify(useTRCEditorStore.getState().storiesData)}</p>
      </div> */}
          <div>
            {/* <p>{JSON.stringify(storyData.characters)}</p> */}
            <CharacterList
              characters={storyData?.characters}
              characterDefinitions={storyData?.characterDefinitions}
            />
          </div>
          {false && (
            <div>
              <h1 className="lg:block hidden text-2xl font text-darkFont ">
                Proof of Concept
              </h1>
              <br className="lg:block hidden" />
              <Link
                href="https://readingclub.canny.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white "
              >
                <Button className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent">
                  Request a Feature
                </Button>
              </Link>
            </div>
          )}
        </div>
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
        <div className="basis-1/4 text-center font-semibold lg:pt-0 pt-6">
          <h1 className="text-2xl font text-darkFont">
            {`Welcome to Reading Club AI!`}
          </h1>
          <br />
          <p className="text-md text-darkFont">{`Start creating a story.`}</p>
          <p className="text-md text-darkFont">
            {`Press '++' for suggestions, or`}
          </p>
          <p className="text-md text-darkFont">{`'/' for illustrations.`}</p>
          <br />
          <p className="text-md text-darkFont">{`Note: This is a research demo. There's no autosave, so make sure to copy & paste anything you like. Autocompletions are rate limited to a few dozens per day.`}</p>
          {/* sign up as an early tester here */}
          <br />
          <p className="text-md text-darkFont">
            Sign up as an early tester{" "}
            <Link
              href="https://forms.gle/eDiYjELhFcGiZ58T6"
              target="_blank"
              rel="noopener noreferrer"
              // className="text-white "
            >
              here.
            </Link>
          </p>
          <br />
          <div className="">
            <Link
              href="https://readingclub.canny.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white "
            >
              <Button className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent">
                Request a Feature
              </Button>
            </Link>
          </div>
        </div>

        {/* <h1>TEST</h1> */}

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

export default EditorPageWrapper;
