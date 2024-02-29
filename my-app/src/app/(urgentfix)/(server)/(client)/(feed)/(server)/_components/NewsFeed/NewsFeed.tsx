"use client";
import { useUser } from "@/lib/hooks/useUsers";
import React, { useMemo } from "react";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import DraftItem from "@/app/(urgentfix)/(server)/(client)/(main)/_components/DraftItem/DraftItem";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import { format } from "date-fns";

interface NewsFeedProps {
  userId: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ userId }) => {
  const { data: fetchedUser, isLoading } = useUser(userId);

  const documents = useQuery(api.documents.getFollowed, {
    userOauthIds: fetchedUser?.following ?? [],
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

  return (
    <div>
      <div className="flex flex-row gap-10 p-5 flex-wrap justify-center">
        {documents?.map((document) => {
          // <div key={document._id + "docprofile"}>{document.title}</div>
          if (!document.userOauthId) return null;

          let paragraphContent;

          if (document.content) {
            paragraphContent = JSON.parse(document.content)
              ?.content?.find((node: any) => node.type == "paragraph")
              ?.content?.find((node: any) => node.type == "text")
              ?.text as string;
          }
          // JSON.parse(document.content)
          //   ?.content?.find((node: any) => node.type == "paragraph")
          //   ?.content?.find((node: any) => node.type == "text")?.text as string;

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
                  <p className="italic">
                    {paragraphContent?.substring(0, 200) + "..."}
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
