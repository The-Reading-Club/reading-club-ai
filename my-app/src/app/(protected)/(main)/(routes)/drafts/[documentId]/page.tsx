"use client";
import EditorPageWrapper from "@/components/EditorPageWrapper";
import { checkSubscription } from "@/lib/subscription";
import { Id } from "@/../convex/_generated/dataModel";
import { useMutation, useQuery as useConvexQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import TRCEditorV2 from "@/components/TRCEditorV2";
import { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { set } from "zod";
import RightPanel from "@/components/EditorPageWrapper/RightPanel";
import { StoryData, useTRCEditorStore } from "@/stores/store";
import CharactersPanel from "@/components/EditorPageWrapper/LeftPanel";

import { useQuery as useTanstackQuery } from "@tanstack/react-query";
import { devAlert } from "@/lib/utils";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPagePage = ({ params }: DocumentIdPageProps) => {
  const [initialContent, setInitialContent] = useState<JSONContent | null>(
    null
  );

  const document = useConvexQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const [storyData_, setStoryData] = useTRCEditorStore((state) => [
    state.storiesData[params.documentId],
    (data: StoryData) => state.setStoriesData({ [params.documentId]: data }),
  ]);

  const storyDataQuery = useTanstackQuery({
    queryKey: ["storyData", params.documentId],
    queryFn: () => {
      devAlert("Fetching story data for " + params.documentId);
      const storyData = document?.storyData;
      if (storyData === null || storyData === undefined) {
        return {};
      }
      // PARSE IT
      try {
        const parsed = JSON.parse(storyData);
        devAlert(
          "Fetched story data for " + params.documentId + " " + storyData
        );
        devAlert("Parsed story data for " + params.documentId + " " + parsed);
        // evaluate type
        devAlert("Type of parsed " + typeof parsed);
        if (typeof parsed !== "object") {
          devAlert("Parsed is not an object");
          return {};
        }
        return parsed;
      } catch (error) {
        console.error("Error parsing story data", error);
        devAlert("Error parsing story data " + error);
        return {};
      }
    },
    enabled: document !== undefined && document !== null,
  });

  const update = useMutation(api.documents.update);

  const onChange = (jsonContent: JSONContent) => {
    const content = JSON.stringify(jsonContent);

    update({
      id: params.documentId,
      content,
    });
  };

  // move to page
  const updateStoryDocument = useMutation(api.documents.update);
  useEffect(() => {
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
  }, [storyData_]);

  // Try parseing the content before rendering editor and set it on a state
  useEffect(() => {
    // if (document?.content) {
    if (document) {
      if (document.content === null || document.content === undefined) {
        setInitialContent({});
        return;
      }
      try {
        const jsonContent = JSON.parse(document.content);
        setInitialContent(jsonContent);
      } catch (error) {
        console.error("Error parsing JSON content", error);
        setInitialContent({});
      }
    }
    // }
  }, [document?._id]);

  // need to figure a way to do this once
  // const isPlus = await checkSubscription();

  if (document === undefined) {
    return <div>Undefined</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  if (initialContent === null) {
    return <div>Content is null</div>;
  }

  if (storyDataQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (storyDataQuery.isError) {
    return <div>Error</div>;
  }

  if (storyDataQuery.data === undefined) {
    return <div>Undefined</div>;
  }

  if (storyDataQuery.data === null) {
    return <div>Not found</div>;
  }

  const storyData = storyDataQuery.data;

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
        <div>
          <h1>{`Title: ${document.title}`}</h1>
          <h1>{`Author: ${document.title}`}</h1>
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
            editorKey={params.documentId}
            enableLocalStorage={false}
            // new props
            editorContent={initialContent}
            onEditorChange={onChange}
          />
        </div>
        {/* <div>Characters go hee</div> */}
        <CharactersPanel
          storyData={storyData}
          setStoryData={setStoryData}
          documentId={params.documentId}
        />
        {/* <RightPanel storyData={storyData} isPlus={true} /> */}
      </div>
    </>
  );
};

export default DocumentIdPagePage;
