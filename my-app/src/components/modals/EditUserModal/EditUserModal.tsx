"use  client";
import { useUserEditModal } from "@/lib/hooks/useModals";
import { useCurrentUser, useUser } from "@/lib/hooks/useUsers";
import axios from "axios";
// import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// MODAL
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const EditUserModal = () => {
  // This should be a hook of its own
  //   const session = useSession();
  //   const currentUser = session.data?.user;
  const { data: currentUser, refetch } = useCurrentUser();

  //   const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  const router = useRouter();

  //
  const editModal = useUserEditModal();

  const [isLoading, setIsLoading] = useState(false);

  const [bio, setBio] = useState("");

  useEffect(() => {
    if (currentUser) {
      setBio(currentUser?.bio);
      // setBio(JSON.stringify({ thisisthedata: currentUser }));
    }
  }, [currentUser?.bio, currentUser]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/user-edit", {
        bio,
      });
      //   mutateFetchedUser();
      // I wonder if Next Auth is smart enough to update the user
      // what a fucking disaster
      //   mutateFetchedUser();
      //   mutateFetchedUser();
      //   router.refresh();
      refetch();

      editModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  }, [bio, editModal, currentUser]);

  if (!currentUser) {
    // return <div>Not authenticated</div>;
    return null;
  }

  return (
    <Dialog open={editModal.isOpen} onOpenChange={editModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your bio</DialogTitle>
          <DialogDescription>
            <p>Write a little about yourself</p>
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <textarea
            className="w-full p-2 border border-primary rounded-md"
            value={bio}
            onChange={(e) => {
              // Block if longer than 160 chars

              if (e.target.value.length < 162) {
                setBio(e.target.value);
              }
            }}
          />
        </div>
        <DialogFooter>
          <button
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
