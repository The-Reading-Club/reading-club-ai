"use client";
import TRCEditorV2 from "@/components/TRCEditorV2";
import React from "react";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { useTiptapEditorContentFromConvex } from "@/app/(...server)/(client)/(main)/(routes)/drafts/[documentId]/utils";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const PreviewPage: React.FC<DocumentIdPageProps> = ({ params }) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const { initialContent } = useTiptapEditorContentFromConvex(
    params.documentId,
    document
  );

  if (!initialContent) {
    return null;
  }

  if (document?.isShared === false) {
    return (
      <div>
        <h1>This story is not shared</h1>
      </div>
    );
  }

  // should separate undefined from null states

  if (!document) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
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
      <TRCEditorV2
        editorKey={params.documentId}
        editable={false}
        editorContent={initialContent}
        title={document.title}
        author={document.author}
      />
    </div>
  );
};

export default PreviewPage;
