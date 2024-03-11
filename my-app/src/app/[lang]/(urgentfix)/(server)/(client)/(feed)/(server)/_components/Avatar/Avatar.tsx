"use client";
import { useUser } from "@/lib/hooks/useUsers";
import { devAlert } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useCallback } from "react";
import { ClipLoader } from "react-spinners";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  defaultW?: string;
  defaultH?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
  defaultH = "h-12",
  defaultW = "w-12",
}) => {
  const router = useRouter();
  const { data: fetchedUser, isLoading } = useUser(userId);

  const onClick = useCallback(
    ((event) => {
      devAlert(JSON.stringify(fetchedUser, null, 2));
      event.stopPropagation();

      const url = `/users/${fetchedUser.id}`;

      router.push(url);
    }) as MouseEventHandler<HTMLImageElement>,
    [router, userId, fetchedUser]
  );

  if (isLoading == true) {
    // return <div>Loading...</div>;
    return <ClipLoader color="#FFC122" size={20} />;
  }

  if (fetchedUser == null) {
    return <div>No user</div>;
  }

  if (fetchedUser == undefined) {
    return <div>No image</div>;
  }

  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-secondary" : ""}
        ${isLarge ? "h-32" : defaultH}
        ${isLarge ? "w-32" : defaultW}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative

        shrink-0
    `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser.image || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;

//   https://chat.openai.com/c/7a634ee0-7279-4a85-9bd2-c9fafdbd4633
//   const handleClick: MouseEventHandler<HTMLImageElement> = (event) => {
//     event.stopPropagation();

//     const url = `/users/${fetchedUser.id}`;

//     router.push(url);
//   };
