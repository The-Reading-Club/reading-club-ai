"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const FeedHeader: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-primary p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default FeedHeader;
