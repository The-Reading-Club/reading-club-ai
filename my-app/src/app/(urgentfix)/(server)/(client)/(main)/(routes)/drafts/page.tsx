"use client";

import { signOut, useSession } from "next-auth/react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { devAlert } from "@/lib/utils";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";
import DraftItem from "../../_components/DraftItem/DraftItem";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DraftsPage = () => {
  // https://github.com/nextauthjs/next-auth/issues/7760
  const session = useSession();
  const { status } = session;

  const create = useMutation(api.documents.create);

  // https://docs.convex.dev/functions/error-handling/
  // I should have handled errors with react error boundaries
  // well, later...
  const documents = useQuery(api.documents.get, {
    userId: session.data?.user?.email ?? undefined,
  });

  // Example error handling function
  // const handleSessionError = (error: any) => {
  //   console.error(error);
  //   // Check if the error is related to an invalid session, then sign out
  //   // This condition should be tailored based on the actual error structure and message
  //   if (
  //     error.message.includes("Server Error") ||
  //     error.message.includes("Invalid session")
  //   ) {
  //     signOut();
  //   }
  // };

  // useEffect to handle session issues
  useEffect(() => {
    if (status === "unauthenticated") {
      signOut(); // This will redirect to login by default
    }
  }, [status]);

  const onCreate = () => {
    devAlert(JSON.stringify(session));
    // A little workaround... this is cheating
    // I could probably do usernames instead
    const userId = session.data?.user?.email;

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const promise = create({
      title: "",
      // author: "New Author"
      author: session.data?.user.name ?? "New Author",
      userId: userId,
    })
      .then((documentID) => {
        devAlert("Created a new book");
        devAlert(JSON.stringify(documentID));
        // onRedirect(d._id)
        onRedirect(documentID);
      })
      .catch((error) => {
        console.error(error);
        devAlert(JSON.stringify(error));
        throw error;
      });

    toast.promise(promise, {
      loading: "Creating a new book...",
      success: "Book created!",
      error: "Failed to create a new book",
    });
  };

  const router = useRouter();

  if (session.status === "loading") return <p>Loading</p>;

  const onRedirect = (documentId: string) => {
    router.push(`/drafts/${documentId}`);
  };

  return (
    <>
      {/* <div>Books Page</div> */}
      {/* <p>{JSON.stringify(session)}</p> */}
      <div className="flex flex-row gap-5 p-5 flex-wrap justify-center">
        {/* <div
          className="bg-accent2 rounded-xl hover:bg-accent"
          style={{ height: "auto", width: 240 }}
          onClick={onCreate}
        >
          <div className="p-5 text-center text-white flex flex-col justify-center items-center">
            <div className="font-bold border-2 border-white rounded-lg  h-[200px] w-full flex flex-col justify-center items-center gap-5">
              Write a new book
              <PlusCircleIcon size={50} />
            </div>
            <div></div>
          </div>
        </div> */}
        <DraftItem
          key={"draft-item-add-book-default"}
          title={""}
          // author={"By...you?"}
          author={""}
          coverUrl={""}
          onClick={onCreate}
          colorClassName="bg-accent2"
          titleBgColorClassname=""
          showCoverImage={false}
        />
        {documents?.map((d, i) => {
          return (
            <DraftItem
              key={i + "draft-item-" + d._id}
              title={d.title}
              author={d.author ?? ""}
              coverUrl={d.coverImage ?? ""}
              onClick={() => {
                // devAlert("Clicked on a book");
                onRedirect(d._id);
              }}
              hoverColorClassName="bg-accent"
            />
          );
        })}

        {/* <button onClick={onCreate}>Create</button> */}
      </div>
    </>
  );
};

export default DraftsPage;
