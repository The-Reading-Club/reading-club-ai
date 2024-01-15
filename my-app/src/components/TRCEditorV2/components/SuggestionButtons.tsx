import React from "react";

interface SuggestionButtonsProps {
  onAccept: () => void;
  onReject: () => void;
  position: { top: number; left: number };
}

const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({
  onAccept,
  onReject,
  position,
}) => {
  return (
    <div
      className="suggestion-buttons"
      style={{ top: position.top, left: position.left }}
    >
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default SuggestionButtons;
