import React, { use, useState } from "react";
import "./CharacterList.css"; // Assume you have some CSS for styling
import {
  capitalizeFirstLetter,
  countStringSpaces,
  devAlert,
} from "@/lib/utils";
import useMounted from "@/lib/hooks/useMounted";
import { CharacterAttributes } from "@/data/character";
import { useTRCEditorStore } from "@/stores/store";
import { BasicCharacterAttributes } from "@/app/api/character/identify/utils";
import { IoMdClose } from "react-icons/io";
import EditableText from "../input/EditableText/EditableText";
import { Input } from "../ui/input";
import { set } from "zod";
import { useDebouncedCallback } from "use-debounce";

// Define the types for your character properties
type CharacterCardProperties = {
  name: string;
  description: string;
  isExpanded: boolean;
};

// Define the props for the CharacterCard component
type CharacterCardProps = {
  character: CharacterCardProperties;
  definition: CharacterAttributes;
  onClick: () => void; // Function to handle the click event
  onDelete: () => void; // New prop for delete handler
  setIsEditingCharacter: (isEditing: boolean) => void;
  onCharacterChange: (character: CharacterAttributes) => void;
};

// CharacterCard Component
const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  definition,
  onClick,
  onDelete,
  setIsEditingCharacter,
  onCharacterChange,
}) => {
  const [characterDefinitionState, setCharacterDefinitionState] =
    useState<CharacterAttributes>(definition);

  //   if (!character) return <></>;

  // Prevent click event from bubbling up
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  // const handleSubmitTextData = useDebouncedCallback(() => {
  //   // setIsEditingCharacter(false);
  // }, 1000);
  const handleSubmitTextData = () => {
    setIsEditingCharacter(false);
    onCharacterChange(characterDefinitionState);
  };

  return (
    <div className="character-card text-darkFont bg-white" onClick={onClick}>
      <button
        className="
                    top-2
                    right-2
                    absolute
                    p-0
                    m-0
                    hover:opacity-70
                    translation"
        // style={{ border: "1px solid brown" }}
        onClick={handleDeleteClick}
      >
        <IoMdClose size={18} />
      </button>
      <h3 className="font-bold text-xl">{character.name}</h3>
      <p className="text-sm">
        {capitalizeFirstLetter(character.description) + "."}
      </p>
      {definition && character.isExpanded && (
        <div className="text-left p-6 pt-3 pb-0 flex-col">
          {
            // Object.keys(definition)
            // .filter((k) =>
            [
              "gender",
              "age",
              // "appearance",
              "species",
              "eyeColor",
              "hairLength",
              "hairType",
              "hairColor",
              "skinTone",
              // "facialHair",
              "outfit",
              "placeOfOrigin",
              // "distinguishingMarks",
              // "height",
              // "build",
              // "physicalCondition",
            ]
              //   .includes(k)
              // )
              .map((key, index) => {
                const value =
                  characterDefinitionState[key as keyof CharacterAttributes];
                if (value !== undefined) {
                  return (
                    <div
                      className="mb-2"
                      key={`key-character-attribute-card-${index}-${key}`}
                    >
                      <p key={index} className="text-sm text-justify">
                        <span className="font-bold">
                          {capitalizeFirstLetter(key)}
                        </span>
                        {/* {(": " + value + ".").replaceAll("..", ".")} */}
                        {`: `}
                        {
                          <div
                            // className="p-1"
                            style={{ display: "inline-block" }}
                            // onClick={(e) => {
                            //   // e.stopPropagation();
                            //   devAlert("Editing character field");
                            // }}
                          >
                            <EditableText
                              textState={value}
                              setTextState={(newValue) => {
                                setCharacterDefinitionState({
                                  ...characterDefinitionState,
                                  [key as keyof CharacterAttributes]: newValue,
                                });
                              }}
                              submitTextData={handleSubmitTextData}
                              // editableElement={Input}
                              // nonEditableElement={React.Fragment}
                              onEditClickCallback={() => {
                                setIsEditingCharacter(true);
                              }}
                              // https://chat.openai.com/c/d826fdad-e3eb-4f16-a87e-24da69d972a9
                              {...(countStringSpaces(value) < 2 && {
                                editableElement: Input,
                              })}
                              placeholder="N/A"
                            />
                          </div>
                        }
                      </p>
                    </div>
                  );
                }
              })
          }
        </div>
      )}
      {/* {character.isExpanded && <p>MORE ATTRIBUTES</p>} */}
    </div>
  );
};

// Define the props for the CharacterList component
type CharacterListProps = {
  characters: BasicCharacterAttributes[];
  characterDefinitions: CharacterAttributes[];
  setCharacterList: (characters: BasicCharacterAttributes[]) => void;
  setCharacterDefinitions: (definitions: CharacterAttributes[]) => void;
};

// CharacterList Component
const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  characterDefinitions,
  setCharacterList,
  setCharacterDefinitions,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isEditingCharacter, setIsEditingCharacter] = useState<boolean>(false);

  const mounted = useMounted();

  const handleCharacterChange = (characterDef: CharacterAttributes) => {
    const newDefs = characterDefinitions.map((c) => {
      if (c.name === characterDef.name) {
        return characterDef;
      }
      return c;
    });
    // Save character to zustand state
    // setCharacterList(newCharacters);
    setCharacterDefinitions(newDefs);
  };

  const handleCardClick = (characterName: string) => {
    if (isEditingCharacter == true) {
      setIsEditingCharacter(false);
      return;
      // worst case, it just closes it, and doesnt open another editable box
    }

    setExpandedCard(expandedCard === characterName ? null : characterName);
  };

  const handleDeleteCharacter = (characterName: string) => {
    const newCharacters = characters.filter(
      (character) => character.name !== characterName
    );

    devAlert("CHARACTERS" + JSON.stringify(characters));
    devAlert("NEW CHARACTERS" + JSON.stringify(newCharacters));
    // return;

    setCharacterList(newCharacters);
  };

  if (mounted == false) return <></>;

  if (!characters) return <></>;

  return (
    <div className="character-list">
      {/* <h1>{`isEditingCharacter: ${isEditingCharacter}`}</h1> */}
      {characters.map((character, index) => {
        const characterDefinition = characterDefinitions?.find(
          (c) => c.name === character.name
        );

        if (!characterDefinition)
          return (
            <p
              key={`character-list-card-loading-${index}-${character.name}`}
            >{`Creating... (${character.name}) `}</p>
          );

        return (
          <CharacterCard
            key={`character-list-card-${index}-${character.name}`}
            character={{
              ...character,
              isExpanded: character.name === expandedCard,
            }}
            definition={characterDefinition}
            onClick={() => handleCardClick(character.name)}
            onDelete={() => handleDeleteCharacter(character.name)} // Pass the delete handler
            setIsEditingCharacter={setIsEditingCharacter}
            onCharacterChange={handleCharacterChange}
          />
        );
      })}
    </div>
  );
};

export default CharacterList;
