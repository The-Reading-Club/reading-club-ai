"use client";
import React, { Fragment } from "react";
import FeedHeader from "../../../_components/FeedHeader";
import { useUser } from "@/lib/hooks/useUsers";

import { ClipLoader } from "react-spinners";
import UserHero from "../../../_components/users/UserHero";
import UserBio from "../../../_components/users/UserBio";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import DraftItem from "@/app/[lang]/(urgentfix)/(server)/(client)/(main)/_components/DraftItem/DraftItem";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Share } from "@/components/Share";

interface UserViewPageParams {
  params: {
    userId: string;
  };
}

const UserViewPage = ({ params }: UserViewPageParams) => {
  const { userId } = params;

  const { data: fetchedUser, isLoading } = useUser(userId);

  const session = useSession();
  const user = session.data?.user;

  const apiDocumentsFunction =
    user?.id == userId ? api.documents.getShared : api.documents.getPublished;

  const documents = useQuery(apiDocumentsFunction, {
    userOauthId: userId,
  });

  const router = useRouter();

  const onRedirect = (documentId: string) => {
    router.push(`/preview/${documentId}`);
  };

  if (isLoading == true || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#FFC122" size={80} />
      </div>
    );
  }

  return (
    <>
      <FeedHeader showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />

      <div className="flex flex-row gap-5 p-5 flex-wrap justify-center">
        {documents?.map((document) => {
          // <div key={document._id + "docprofile"}>{document.title}</div>
          if (false)
            return (
              <Share
                key={document._id + "sharebuttonprofile"}
                documentId={document._id}
              >
                <div>This is a fucking test</div>
              </Share>
            );

          const draftItemComponent = (
            <div className="basis-[250px] flex flex-row items-stretch">
              <DraftItem
                key={document._id + "docprofile"}
                title={document.title}
                author={document.author ?? ""}
                coverUrl={document.coverImage ?? ""}
                onClick={() => {
                  // devAlert("Clicked on a book");

                  if (document.isPublished) onRedirect(document._id);
                }}
                showCoverImage={true}
                // colorClassName="bg-accent2"
                // titleBgColorClassname=""
                hoverColorClassName="bg-accent"
                colorClassName={`bg-primary ${
                  !document.isPublished && "opacity-50"
                }`}
                showUnpublishedWatermark={!document.isPublished}
              />
            </div>
          );

          const profileBookKey = document._id + "sharebuttonprofile";

          if (document.isPublished)
            return (
              <Fragment key={profileBookKey}>{draftItemComponent}</Fragment>
            );
          else
            return (
              <Share key={profileBookKey} documentId={document._id}>
                {draftItemComponent}
              </Share>
            );

          // return (
          //   <Share key={profileBookKey} documentId={document._id}>
          //     {draftItemComponent}
          //   </Share>
          // );
        })}
      </div>
      {/* <p>This is the document variable {JSON.stringify(documents, null, 2)}</p> */}
    </>
  );
};

export default UserViewPage;
