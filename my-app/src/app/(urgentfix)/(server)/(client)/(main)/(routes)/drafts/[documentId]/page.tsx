"use client";
import EditorPageWrapper from "@/components/EditorPageWrapper";
import { checkSubscription } from "@/lib/subscription";
import { Doc, Id } from "@/../convex/_generated/dataModel";
import {
  useMutation as useConvexMutation,
  useQuery as useConvexQuery,
} from "convex/react";
import { api } from "@/../convex/_generated/api";
import TRCEditorV2 from "@/components/TRCEditorV2";
import { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { set } from "zod";
import RightPanel, {
  DownloadPDFPanel,
  InstructionsPanel,
  PlusSubscriptionPanel,
  RequestAFeaturePanel,
} from "@/components/EditorPageWrapper/RightPanel";
import {
  StoryData,
  useTRCAppConfigStore,
  useTRCEditorStore,
} from "@/stores/store";
import CharactersPanel from "@/components/EditorPageWrapper/LeftPanel";

import {
  useQuery as useTanstackQuery,
  useMutation as useTanstackMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { devAlert } from "@/lib/utils";
import EditableText from "@/components/input/EditableText/EditableText";
import { Input } from "@/components/ui/input";
import Share from "@/components/Share/Share";
import { useTiptapEditorContentFromConvex } from "./utils";
import FreeCounter from "@/components/FreeCounter/FreeCounter";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPagePage = ({ params }: DocumentIdPageProps) => {
  const document = useConvexQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const { rateLimits, isPlus } = useTRCAppConfigStore();

  //#region useTiptapEditorContentFromConvex
  // const [initialContent, setInitialContent] = useState<JSONContent | null>(
  //   null
  // );

  // const [storyTitle, setStoryTitle] = useState<string>("");

  // const [storyData_, setStoryData] = useTRCEditorStore((state) => [
  //   state.storiesData[params.documentId],
  //   (data: StoryData) => state.setStoriesData({ [params.documentId]: data }),
  // ]);

  // const [storyDataInitialized, setStoryDataInitialized] = useState(false);

  // // Try parseing the content before rendering editor and set it on a state
  // useEffect(() => {
  //   // if (document?.content) {
  //   if (document) {
  //     if (document.content === null || document.content === undefined) {
  //       setInitialContent({});
  //       return;
  //     }
  //     try {
  //       const jsonContent = JSON.parse(document.content);
  //       setInitialContent(jsonContent);

  //       setStoryTitle(document.title);

  //       if (document.storyData) {
  //         const parsed = JSON.parse(document.storyData);
  //         if (parsed && typeof parsed === "object") {
  //           setStoryData(parsed);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error parsing JSON content", error);
  //       setInitialContent({});
  //     }

  //     setStoryDataInitialized(true);
  //   }
  // }, [document?._id]);
  //#endregion

  const {
    initialContent,
    storyTitle,
    setStoryTitle,
    storyData_,
    setStoryData,
    storyDataInitialized,
  } = useTiptapEditorContentFromConvex(params.documentId, document);

  // const storyDataQuery = useTanstackQuery({
  //   queryKey: ["storyData", params.documentId],
  //   queryFn: () => {
  //     devAlert("Fetching story data for " + params.documentId);
  //     const storyData = document?.storyData;
  //     if (storyData === null || storyData === undefined) {
  //       return {};
  //     }
  //     // PARSE IT
  //     try {
  //       const parsed = JSON.parse(storyData);
  //       devAlert(
  //         "Fetched story data for " + params.documentId + " " + storyData
  //       );
  //       devAlert("Parsed story data for " + params.documentId + " " + parsed);
  //       // evaluate type
  //       devAlert("Type of parsed " + typeof parsed);
  //       if (typeof parsed !== "object") {
  //         devAlert("Parsed is not an object");
  //         return {};
  //       }

  //       // Set the state based on convex data
  //       setStoryData(parsed);
  //       return parsed;
  //     } catch (error) {
  //       console.error("Error parsing story data", error);
  //       devAlert("Error parsing story data " + error);
  //       return {};
  //     }
  //   },
  //   enabled: document !== undefined && document !== null,
  // });

  const update = useConvexMutation(api.documents.update);

  const onChange = (jsonContent: JSONContent) => {
    const content = JSON.stringify(jsonContent);

    update({
      id: params.documentId,
      content,
    });

    // given how I set things up, I may need to keep a local copy too
    // but this shit would trigger a sync with the database
    // Would that be fine?
    // It's just so redundant...
    // It will work, BUT IDEAL WOULD BE FOR PDF COMPONENT TO READ CONTENT FROM THE DATABASE ON ITS OWN.
    // We will cheat a little
    // setStoryData({ ...storyData_, tiptapEditorContent: jsonContent });
  };

  // move to page
  const updateStoryDocument = useConvexMutation(api.documents.update);

  // const queryClient = useQueryClient();

  // const updateStoryDocumentMutation = useTanstackMutation(
  //   (data) => {
  //     return updateStoryDocument(data);
  //   },
  //   {
  //     onSuccess: (data: any) => {
  //       devAlert("Success updating story data " + JSON.stringify(data));
  //     },
  //     onError: (error: any) => {
  //       devAlert("Error updating story data " + JSON.stringify(error));
  //     },
  //   }
  // );

  useEffect(() => {
    if (!storyDataInitialized) return;

    // alert("Syncing character data with external database " + params.documentId);
    devAlert(
      "Syncing character data with external database " + params.documentId
    );

    if (!document?._id) return;

    devAlert(
      "About to trigger function character data with external database " +
        params.documentId +
        " " +
        JSON.stringify(storyData_)
    );

    updateStoryDocument({
      id: params.documentId,
      storyData: JSON.stringify(storyData_),
    });

    // https://www.codemzy.com/blog/react-query-force-refetch
    // queryClient.invalidateQueries({
    //   queryKey: ["storyData", params.documentId],
    //   refetchType: "all",
    // });
    // https://chat.openai.com/c/1d74fe51-a71a-4054-98cc-58d88ad0eac3
    // storyDataQuery.refetch();

    // This is meant only for the creation of new characters
  }, [storyData_]);

  // need to figure a way to do this once
  // const isPlus = await checkSubscription();

  if (document === undefined) {
    // return <div>Loading...</div>;
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#FFC122" size={80} />
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  if (initialContent === null) {
    return <div>Content is null</div>;
  }

  // if (storyDataQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (storyDataQuery.isError) {
  //   return <div>Error</div>;
  // }

  // if (storyDataQuery.data === undefined) {
  //   return <div>Undefined</div>;
  // }

  // if (storyDataQuery.data === null) {
  //   return <div>Not found</div>;
  // }

  // const storyData = storyDataQuery.data;

  return (
    <>
      {/* <EditorPageWrapper
        editorKey={params.documentId}
        isPlus={true}
        // new props
        onChange={onChange}
        initialContent={document.content ?? ""}
      /> */}
      <div
        className="flex lg:flex-row flex-col"
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
        <div
          className="basis-1/4 lg:flex hidden flex-col justify-center text-center pt-8 lg:p-10 gap-3"
          // style={{ border: "5px solid red" }}
        >
          {/* <h1>{`Title: ${document.title}`}</h1> */}
          <EditableText
            textState={storyTitle}
            setTextState={(newValue) => {
              setStoryTitle(newValue);

              // Probably no need of doing it in real time
              // update({
              //   id: params.documentId,
              //   title: newValue,
              // });
            }}
            submitTextData={() => {
              update({
                id: params.documentId,
                title: storyTitle,
              });
            }}
            placeholder="Click to edit title"
            nonEditableElementClassName="text-4xl font-bold"
            editableElement={Input}
          />
          {/* <br /> */}
          <h1 className="text-2xl font text-darkFont">{`By ${document.author}`}</h1>
          {/* <br /> */}
          <InstructionsPanel />
          {/* <br /> */}
          {/* <RequestAFeaturePanel /> */}
          {/* <br /> */}
          {document && document.content && (
            <DownloadPDFPanel
              storyData={
                {
                  // This is how I would cheat 100%
                  // characters: storyData_.characters,
                  // characterDefinitions: storyData_.characterDefinitions,
                  tiptapEditorContent: JSON.parse(document.content),
                } as StoryData
              }
            />
          )}
          {isPlus == false && (
            <>
              {/* <br /> */}
              <div>
                {/* <p>{`Rate limits: ${JSON.stringify(rateLimits)}`}</p> */}
                <FreeCounter rateLimits={rateLimits} isPlus={isPlus} />
              </div>
              <PlusSubscriptionPanel isPlus={isPlus} />
            </>
          )}
        </div>
        <div
          className="flex basis-1/2 shrink-0" // THIS IS THE PROBLEM
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
            editorKey={params.documentId}
            enableLocalStorage={false}
            // new props
            editorContent={initialContent}
            onEditorChange={onChange}
          />
        </div>
        {/* <div>Characters go hee</div> */}
        <div className="basis-1/4 h-[100vh] flex flex-col justify-start items-center pt-8 gap-2">
          <Share documentId={params.documentId}>
            <Button variant={"accent"} size={"lg"}>
              Share with family
            </Button>
          </Share>
          <RequestAFeaturePanel />
          <div
            className="lg:flex hidden flex-col justify-center lg:p-10 text-center h-[100vh] "
            // style={{ border: "2px solid red" }}
          >
            <CharactersPanel
              storyData={storyData_}
              setStoryData={setStoryData}
              documentId={params.documentId}
              className=""
            />
          </div>
        </div>
        {/* <RightPanel storyData={storyData} isPlus={true} /> */}
      </div>
    </>
  );
};

export default DocumentIdPagePage;
