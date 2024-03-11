"use client";
import React from "react";
import FeedHeader from "../_components/FeedHeader";
import { useSession } from "next-auth/react";
import NewsFeed from "../_components/NewsFeed";

const FeedPage = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FeedHeader label="Discover" />
      <NewsFeed userId={userId} />
    </div>
  );
};

export default FeedPage;
