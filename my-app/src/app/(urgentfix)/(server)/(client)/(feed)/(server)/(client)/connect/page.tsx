"use client";
import { useUsers } from "@/lib/hooks/useUsers";
import React from "react";
import { ClipLoader } from "react-spinners";
import FeedHeader from "../../_components/FeedHeader";
import Avatar from "../../_components/Avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ConnectPage = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading == true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#FFC122" size={40} />
      </div>
    );
  }

  return (
    <>
      <FeedHeader showBackArrow label={`Connect (${users.length} members)`} />
      <div className="overflow-y-auto h-full">
        {users.map((user: Record<string, any>, i: number) => {
          // return <div key={u.id}>{u.name}</div>;

          return (
            <div
              key={`connect-page-${user.id}`}
              className="flex gap-4 items-center px-4 py-4 bg-secondary justify-between hover:bg-secondary3"
            >
              {/* <Avatar userId={user.id} /> */}
              <div className="flex gap-4 items-center">
                <Image
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                </div>
              </div>
              <Link href={`/users/${user.id}`}>
                <Button size={"sm"} variant={"accent"}>
                  See profile
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConnectPage;
