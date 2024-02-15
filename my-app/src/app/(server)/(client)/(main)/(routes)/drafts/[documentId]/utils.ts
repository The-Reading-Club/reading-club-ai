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

export const useTiptapEditorContentFromConvex = (
  documentId: Id<"documents">,
  document: Doc<"documents"> | undefined | null
) => {
  const [initialContent, setInitialContent] = useState<JSONContent | null>(
    null
  );

  const [storyTitle, setStoryTitle] = useState<string>("");

  const [storyData_, setStoryData] = useTRCEditorStore((state) => [
    state.storiesData[documentId],
    (data: StoryData) => state.setStoriesData({ [documentId]: data }),
  ]);

  const [storyDataInitialized, setStoryDataInitialized] = useState(false);

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

        setStoryTitle(document.title);

        if (document.storyData) {
          const parsed = JSON.parse(document.storyData);
          if (parsed && typeof parsed === "object") {
            setStoryData(parsed);
          }
        }
      } catch (error) {
        console.error("Error parsing JSON content", error);
        setInitialContent({});
      }

      setStoryDataInitialized(true);
    }
  }, [document?._id]);

  return {
    initialContent,
    storyTitle,
    setStoryTitle,
    storyData_,
    setStoryData,
    storyDataInitialized,
  };
};
