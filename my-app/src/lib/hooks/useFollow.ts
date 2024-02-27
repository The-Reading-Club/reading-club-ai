import { useCallback, useMemo } from "react";
import { useCurrentUser, useUser } from "./useUsers";
import axios from "axios";
import { toast } from "sonner";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const {
    // data: userToFollow,
    mutate: mutateUserToFollow,
  } = useUser(userId);

  const isFollowing = useMemo(() => {
    // if (!currentUser) return false;
    // return currentUser.following.some((user) => user.id === userId);

    const list: String[] = currentUser?.following || [];

    return list.includes(userId);
  }, [
    userId,
    // currentUser,
    currentUser?.following,
  ]);

  //   const followUser = async () => {
  //     const response = await fetch("/api/follow", {
  //       method: "POST",
  //       body: JSON.stringify({ userId }),
  //     });

  //     if (response.ok) {
  //       mutateCurrentUser();
  //       mutateUserToFollow();
  //     }
  //   };

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      // should force to login
      // but for now the feed will be an auth route
    }

    try {
      let request;
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }

      await request();

      mutateCurrentUser();
      mutateUserToFollow();

      toast.success(isFollowing ? "Unfollowed" : "Followed");
    } catch (error) {}
  }, [
    currentUser,
    isFollowing,
    mutateCurrentUser,
    mutateUserToFollow,
    userId,
    // loginModal (?)
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
