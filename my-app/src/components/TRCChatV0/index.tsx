"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";

const TRCChatVO = () => {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  // msgs
  console.log("TRCChatVO messages", messages);
  // input
  console.log("TRCChatVO input", input);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);

  const scrollToBottom = () => {
    // if (isAutoScrollActive) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsAutoScrollActive(true); // Re-enable auto-scrolling after manual trigger
    // }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const isAtBottom =
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
        containerRef.current.clientHeight;
      setIsAutoScrollActive(isAtBottom);
    }
  };

  useEffect(() => {
    if (isAutoScrollActive) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className="bg-secondary p-3 rounded-md text-brownFont"
      style={{
        border: "5px solid purple",
        height: "100vh", // could be max height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="text-2xl font-bold mb-8">Reading Club Coauthor</h2>
      <div
        ref={containerRef}
        className="basis-2/3 b-4 border-black overflow-scroll"
      >
        <div>
          <h3 className="text-lg font-semibold mt-2">Coauthor</h3>
          <p>I am here to help you write a story 10x faster</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mt-2">Jose</h3>
          <p>
            Write a story that teaches a kid about the economy. The morale is
            that a free market is not a zero-sum game.
          </p>
        </div>
        {messages.map((msg) => (
          <div>
            <h3 className="text-lg font-semibold mt-2">
              {msg.role == "assistant" ? "Coauthor" : "Jose"}
            </h3>
            <p style={{ whiteSpace: "preserve-breaks" }}>{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {!isAutoScrollActive && (
        <button
          onClick={scrollToBottom}
          style={
            {
              // position: "absolute", // Or 'fixed' depending on the layout
              // right: "1rem",
              // bottom: "1rem",
              // cursor: "pointer",
            }
          }
        >
          {/* You can replace the text with an icon or image */}↓TEST
        </button>
      )}
      <form className="mt-8" onSubmit={handleSubmit}>
        <p className="font-semibold">You</p>
        <div className="[&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] border border-token-border-heavy rounded-2xl">
          <textarea
            className="mt-2 w-full bg-secondary p-2 
            text-darkFont
            placeholder-black/50 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
            placeholder="Message Coauthor..."
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <button className="trcButton">Send message</button>
      </form>
    </div>
  );
};

export default TRCChatVO;
