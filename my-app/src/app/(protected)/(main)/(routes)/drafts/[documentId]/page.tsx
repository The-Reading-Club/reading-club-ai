"use client";
import EditorPageWrapper from "@/components/EditorPageWrapper";
import { checkSubscription } from "@/lib/subscription";
import { Id } from "@/../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import TRCEditorV2 from "@/components/TRCEditorV2";
import { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { set } from "zod";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPagePage = ({ params }: DocumentIdPageProps) => {
  const [initialContent, setInitialContent] = useState<JSONContent | null>(
    null
  );

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (jsonContent: JSONContent) => {
    const content = JSON.stringify(jsonContent);

    update({
      id: params.documentId,
      content,
    });
  };

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

  return (
    <>
      {/* <EditorPageWrapper
        editorKey={params.documentId}
        isPlus={true}
        // new props
        onChange={onChange}
        initialContent={document.content ?? ""}
      /> */}

      <TRCEditorV2
        editorKey={params.documentId}
        enableLocalStorage={false}
        // new props
        editorContent={initialContent}
        onEditorChange={onChange}
      />
    </>
  );
};

export default DocumentIdPagePage;
