"use client";
import React from "react";

const TRCChatVO = () => {
  return (
    <div
      className="bg-secondary p-3 rounded-md text-brownFont"
      style={
        {
          //  border: "2px solid black"
        }
      }
    >
      <h2 className="text-2xl font-bold">Co-author</h2>
      <div className="mt-12">
        <p className="font-bold">User message:</p>
        <div className="[&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] border border-token-border-heavy rounded-2xl">
          <textarea
            className="mt-2 w-full bg-secondary p-2 placeholder-black/50 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
            placeholder="How can I help you write a story?"
          />
        </div>
        <button className="trcButton">Send message</button>
      </div>
    </div>
  );
};

export default TRCChatVO;
