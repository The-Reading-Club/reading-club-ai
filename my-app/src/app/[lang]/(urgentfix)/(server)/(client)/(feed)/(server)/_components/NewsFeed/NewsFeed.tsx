"use client";
import { useUser } from "@/lib/hooks/useUsers";
import React, { useMemo } from "react";

// import { useQuery } from "convex/react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../../../../../../../../../convex/_generated/api";
import DraftItem from "@/app/[lang]/(urgentfix)/(server)/(client)/(main)/_components/DraftItem/DraftItem";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import { format } from "date-fns";
import fetcher from "@/lib/fetcher";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import { ClipLoader } from "react-spinners";

interface NewsFeedProps {
  userId: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ userId }) => {
  const { data: fetchedUser, isLoading } = useUser(userId);

  // const documents = useQuery(api.documents.getFollowed, {
  //   userOauthIds: fetchedUser?.following ?? [],
  // });

  const {
    data: documentsData,
    isLoading: isLoadingDocuments,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["following-users-documents", fetchedUser?.following],
    queryFn: () => fetcher("/api/followed-stories"),
  });

  const router = useRouter();

  const onRedirect = (documentId: string) => {
    router.push(`/preview/${documentId}`);
  };

  // const createdAt = useMemo(() => {
  //   if (!fetchedUser?.register_date) {
  //     return null;
  //   }

  //   return format(new Date(fetchedUser.register_date), "MMMM dd, yyyy");
  // }, [fetchedUser?.register_date]);

  if (isLoading || isLoadingDocuments) {
    // return <div>Loading test...</div>;
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#FFC122" size={80} />
      </div>
    );
  }

  const documents = documentsData?.followingDocs;

  return (
    <div>
      <div className="flex flex-row gap-10 p-5 flex-wrap justify-center">
        {documents?.map((document: Doc<"documents">) => {
          // <div key={document._id + "docprofile"}>{document.title}</div>
          if (!document.userOauthId) return null;

          let paragraphContent;

          if (document.content) {
            // paragraphContent = JSON.parse(document.content)
            //   ?.content?.find((node: any) => node.type == "paragraph")
            //   ?.content?.find((node: any) => node.type == "text")
            //   ?.text as string;

            const paragraphs = JSON.parse(document.content)?.content?.filter(
              (node: any) => node.type == "paragraph"
            );

            if (paragraphs) {
              paragraphContent = paragraphs
                .slice(0, 3)
                .map((paragraph: any) => {
                  const textNode = paragraph.content?.find(
                    (innerNode: any) => innerNode.type == "text"
                  );
                  return textNode?.text as string;
                })
                .join("\n\n");
            }
          }

          // JSON.parse(document.content)
          //   ?.content?.find((node: any) => node.type == "paragraph")
          //   ?.content?.find((node: any) => node.type == "text")?.text as string;

          // https://chat.openai.com/c/d95aacd5-42dd-4a73-9db9-c678603225b4
          // let combinedParagraphContent = "";

          // if (document.content) {
          //   const documentContent = JSON.parse(document.content)?.content;
          //   let paragraphsFound = 0;

          //   for (const node of documentContent) {
          //     if (node.type == "paragraph" && paragraphsFound < 2) {
          //       // Ensure we only look for the first two paragraphs
          //       const textNode = node.content?.find(
          //         (innerNode: any) => innerNode.type == "text"
          //       );
          //       if (textNode?.text) {
          //         combinedParagraphContent +=
          //           (combinedParagraphContent ? " " : "") + textNode.text;
          //         paragraphsFound++;
          //       }
          //     }
          //     if (paragraphsFound >= 2) break; // Exit the loop after finding text from the first two paragraphs
          //   }
          // }

          return (
            <div
              className="flex flex-row gap-5 lg:gap-0 flex-wrap  justify-center lg:justify-between"
              key={`${document._id}-newsfeed-postwrapper`}
            >
              {/* The author created a story or something like that */}
              <div className="basis-[100%] lg:basis-[50%] flex flex-col gap-5">
                {/* <img
                  src={fetchedUser?.image}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                /> */}
                <div className="flex flex-row gap-2">
                  <Avatar
                    userId={document.userOauthId}
                    defaultH="h-10"
                    defaultW="w-10"
                  />
                  {/* "Add created a story text" */}
                  <p>
                    <span className="font-bold">{document?.author}</span>{" "}
                    created a story on{" "}
                    <span className="text-neutral-500">
                      {format(
                        new Date(document?._creationTime),
                        "MMMM dd, yyyy"
                      )}
                    </span>
                  </p>
                </div>
                {/* <p>created a story</p> */}
                {/* Let's show the start of the story here */}
                {/* <p>{document.content}</p> */}

                {paragraphContent && document.content && (
                  <p className="italic" style={{ whiteSpace: "break-spaces" }}>
                    {paragraphContent?.substring(0, 300) + "..."}
                  </p>
                )}
              </div>
              <DraftItem
                key={document._id + "newsfeeddoc"}
                title={document.title}
                author={document.author ?? ""}
                coverUrl={document.coverImage ?? ""}
                onClick={() => {
                  // devAlert("Clicked on a book");
                  onRedirect(document._id);
                }}
                showCoverImage={true}
                // colorClassName="bg-accent2"
                // titleBgColorClassname=""
                hoverColorClassName="bg-accent"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;
