"use client";

import { useSession } from "next-auth/react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { devAlert } from "@/lib/utils";

const BooksPage = () => {
  // https://github.com/nextauthjs/next-auth/issues/7760
  const session = useSession();

  const create = useMutation(api.documents.create);

  const documents = useQuery(api.documents.get, {
    userId: session.data?.user?.email ?? undefined,
  });

  const onCreate = () => {
    devAlert(JSON.stringify(session));
    // A little workaround... this is cheating
    // I could probably do usernames instead
    const userId = session.data?.user?.email;

    if (!userId) {
      throw new Error("Not authenticated");
    }

    const promise = create({
      title: "Another new book",
      // author: "New Author"
      userId: userId,
    }).catch((error) => {
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

  if (session.status === "loading") return <p>Loading</p>;

  return (
    <>
      <div>Books Page</div>
      <p>{JSON.stringify(session)}</p>
      <p>
        {documents?.map((d, i) => {
          return <div key={i + "book"}>{d.title}</div>;
        })}
      </p>
      <button onClick={onCreate}>Create</button>
    </>
  );
};

export default BooksPage;
