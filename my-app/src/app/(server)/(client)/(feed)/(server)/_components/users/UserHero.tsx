import React from "react";

import Image from "next/image";

import { useUser } from "@/lib/hooks/useUsers";

import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {
          // fetchedUser?.coverImage &&
          <Image
            // src={fetchedUser.coverImage}
            src={`/BG-Honeycomb.jpg`}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        }
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
