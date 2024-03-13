"use client";
import React from "react";
import FeedHeader from "../_components/FeedHeader";
import { useSession } from "next-auth/react";
import NewsFeed from "../_components/NewsFeed";
import { useTRCAppConfigStore } from "@/stores/store";

const FeedPage = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { dictionary } = useTRCAppConfigStore();

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FeedHeader
        label={dictionary?.page.feed.newsfeed.discoverHeader ?? "Discover"}
      />
      <NewsFeed userId={userId} />
    </div>
  );
};

export default FeedPage;
