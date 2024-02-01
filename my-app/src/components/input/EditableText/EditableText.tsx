import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";

interface EditableTextProps {
  textState: string;
  setTextState: (text: string) => void;
  submitTextData: Function;
  editableElement?: string | React.FunctionComponent<any>;
  nonEditableElement?: string | React.FunctionComponent<any>;
}

const EditableText: React.FC<EditableTextProps> = ({
  textState,
  setTextState,
  submitTextData,
  editableElement = Textarea, //"input",
  nonEditableElement = "div",
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const setEditableFalseAndSubmit = () => {
    setIsEditable(false);

    submitTextData();
  };

  const handleKeyDown = (e: React.KeyboardEvent /*<HTMLDivElement>*/) => {
    if (e.key === "Enter") {
      setEditableFalseAndSubmit();
    }
  };

  return (
    <div>
      {isEditable
        ? React.createElement(editableElement, {
            value: textState,
            onChange: (e: InputEvent) => {
              if (!e.target)
                throw new Error("evt.target is null in EditableText component");

              setTextState((e.target as HTMLInputElement).value);
            },
            onKeyDown: handleKeyDown,
            autoFocus: true,
            onBlur: setEditableFalseAndSubmit,
            // style: {
            //   width: `${textState.toString().length}ch`,
            // },
            rows: 8,
          })
        : React.createElement(
            "div",
            {
              onClick: () => setIsEditable(true),
              // onKeyDown: handleKeyDown,
              // tabIndex: 0,
              // value: textState,
            },
            textState // children
          )}
    </div>
  );
};

export default EditableText;
