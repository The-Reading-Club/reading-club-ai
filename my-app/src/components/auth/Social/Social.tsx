"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FcGoogle } from "react-icons/fc";
// apple
import { FaApple } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      {/* <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaFacebookF className="w-5 h-5" />
      </Button> */}
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaApple className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Social;
