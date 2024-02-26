"use client";
import { useUsers } from "@/lib/hooks/useUsers";
import { devAlert } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";

const Followbar = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading == true) {
    return <div>Loading...</div>;
  }

  // devAlert(users);
  if (users.length == 0) {
    // return null;
    return <div>No users</div>;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-secondary3 rounded-xl p-4">
        <h2 className="text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {/* TODO USER LIST */}
          {users.map((user: Record<string, any>) => {
            if (false)
              return (
                <div key={user.id} className="flex flex-row gap-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{user.name}</p>
                  </div>
                </div>
              );

            if (false)
              return (
                <div key={user.id} className="flex gap-4 items-center">
                  <Image
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    {/* <p className="text-accent2">{user.email}</p> */}
                  </div>
                </div>
              );

            return (
              <div key={user.id} className="flex gap-4 items-center">
                {/* <Image
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                /> */}
                <Avatar userId={user.id} />
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  {/* <p className="text-accent2">{user.email}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Followbar;
