"use client";
import { useUser } from "@/lib/hooks/useUsers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: fetchedUser, isLoading } = useUser(userId);

  const onClick = useCallback(
    ((event) => {
      alert(JSON.stringify(fetchedUser, null, 2));
      event.stopPropagation();

      const url = `/users/${fetchedUser.id}`;

      router.push(url);
    }) as MouseEventHandler<HTMLImageElement>,
    [router, userId, fetchedUser]
  );

  if (isLoading == true) {
    return <div>Loading...</div>;
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
      ${hasBorder ? "border-4 border-primary" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
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
