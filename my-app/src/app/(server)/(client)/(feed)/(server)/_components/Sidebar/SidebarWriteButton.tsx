import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";

// import useLoginModal from "@/hooks/useLoginModal";
// import useCurrentUser from "@/hooks/useCurrentUser";

interface SidebarWriteButtonProps {
  onClick: () => void;
}

const SidebarWriteButton: React.FC<SidebarWriteButtonProps> = ({ onClick }) => {
  return (
    <div
      // for now I don't want to show the write button on desktop
      className="lg:hidden"
      onClick={onClick}
    >
      <div
        className="
        mt-6
        lg:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-accent2 
        hover:bg-opacity-80 
        transition 
        cursor-pointer
      "
      >
        <FaFeather size={24} color="white" />
      </div>
      {/* <div
        className="
        mt-6
        hidden 
        lg:block 
        px-4
        py-2
        rounded-full
        bg-accent2
        hover:bg-opacity-90 
        cursor-pointer
      "
      >
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          Write
        </p>
      </div> */}
    </div>
  );
};

export default SidebarWriteButton;
