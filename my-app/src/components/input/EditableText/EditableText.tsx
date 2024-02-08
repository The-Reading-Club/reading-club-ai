import React, { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { on } from "events";
import { devAlert } from "@/lib/utils";

interface EditableTextProps {
  textState: string;
  setTextState: (text: string) => void;
  submitTextData: Function;
  editableElement?: string | React.FunctionComponent<any>;
  nonEditableElement?: string | React.FunctionComponent<any>;
  onEditClickCallback?: () => void;
  placeholder?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  textState,
  setTextState,
  submitTextData,
  editableElement = Textarea, //"input",
  nonEditableElement = "div",
  onEditClickCallback,
  placeholder = "",
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
            onClick: (e: Event) => {
              // devAlert("EditableText onClick");
              e.stopPropagation();
            },
            onKeyDown: handleKeyDown,
            autoFocus: true,
            onBlur: (e: Event) => {
              setEditableFalseAndSubmit();
              // e.stopPropagation();
            },
            // style: {
            //   width: `${textState.toString().length}ch`,
            // },
            rows: 8,
          })
        : React.createElement(
            nonEditableElement,
            {
              onClick: (e: Event) => {
                setIsEditable(true);
                // e.preventDefault();
                e.stopPropagation();

                onEditClickCallback && onEditClickCallback();
              },
              // onKeyDown: handleKeyDown,
              // tabIndex: 0,
              // value: textState,
            },
            textState == "" ? placeholder : textState // children
          )}
    </div>
  );
};

export default EditableText;
