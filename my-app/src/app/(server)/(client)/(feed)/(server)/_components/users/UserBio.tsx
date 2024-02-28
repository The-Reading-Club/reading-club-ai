import { useUser } from "@/lib/hooks/useUsers";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { BiCalendar } from "react-icons/bi";
import useFollow from "@/lib/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const session = useSession();

  const currentUser = session.data?.user;

  const { data: fetchedUser } = useUser(userId);

  // if (currentUser?.id !== userId) {
  //     return <div>Not your profile</div>;
  // }

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.register_date) {
      return null;
    }

    return format(new Date(fetchedUser.register_date), "MMMM yyyy");
  }, [fetchedUser?.register_date]);

  if (false)
    return (
      <>
        <div>{JSON.stringify(currentUser)}</div>
        <div>{JSON.stringify(fetchedUser)}</div>
      </>
    );

  return (
    <div className="border-b-[1px] border-primary pb-4">
      <div className="flex justify-end p-2">
        {
          // currentUser?.id === userId ?
          currentUser?.email === fetchedUser?.email ? (
            <Button
              //   variant={"accent"}
              //   className="border border-primary text-primary"
              //   className="bg-secondary text-primary border-primary"
              variant={"ghost"}
              className="text-primary border border-primary"
              //   className="text-accent2 border border-accent2"
            >
              Edit profile
            </Button>
          ) : (
            <Button
              onClick={toggleFollow}
              variant={isFollowing ? "ghost" : "accent"}
              // className={isFollowing ? "text-primary" : "text-neutral-500"}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )
        }
      </div>
      <div className="mt-8 px-4">
        {/* Name */}
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{fetchedUser?.name}</p>
        </div>
        {/* Username or email */}
        {/* <div className="text-md text-neutral-500">{fetchedUser?.email}</div> */}
        {/* Bio */}
        <div className="flex flex-col mt-4">
          <p className="">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        {/* Following */}
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="font-semibold">{fetchedUser?.followingCount || 0}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="font-semibold">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
