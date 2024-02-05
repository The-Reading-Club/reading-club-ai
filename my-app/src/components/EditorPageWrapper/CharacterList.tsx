import React, { useState } from "react";
import "./CharacterList.css"; // Assume you have some CSS for styling
import { capitalizeFirstLetter, devAlert } from "@/lib/utils";
import useMounted from "@/lib/hooks/useMounted";
import { CharacterAttributes } from "@/data/character";
import { useTRCEditorStore } from "@/stores/store";
import { BasicCharacterAttributes } from "@/app/api/character/identify/utils";
import { IoMdClose } from "react-icons/io";

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
};

// CharacterCard Component
const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  definition,
  onClick,
  onDelete,
}) => {
  //   if (!character) return <></>;

  // Prevent click event from bubbling up
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
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
              "appearance",
              "species",
              "gender",
              "eyeColor",
              "hairColor",
              "distinguishingMarks",
              "height",
              "skinTone",
              "build",
              "physicalCondition",
            ]
              //   .includes(k)
              // )
              .map((key, index) => {
                const value = definition[key as keyof CharacterAttributes];
                if (value) {
                  return (
                    <div
                      className="mb-2"
                      key={`key-character-attribute-card-${index}-${key}`}
                    >
                      <p key={index} className="text-sm text-justify">
                        <span className="font-bold">
                          {capitalizeFirstLetter(key)}
                        </span>
                        {(": " + value + ".").replaceAll("..", ".")}
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
};

// CharacterList Component
const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  characterDefinitions,
  setCharacterList,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const mounted = useMounted();

  const handleCardClick = (characterName: string) => {
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
      {characters.map((character, index) => (
        <CharacterCard
          key={`character-list-card-${index}-${character.name}`}
          character={{
            ...character,
            isExpanded: character.name === expandedCard,
          }}
          definition={
            characterDefinitions?.find((c) => c.name === character.name)!
          }
          onClick={() => handleCardClick(character.name)}
          onDelete={() => handleDeleteCharacter(character.name)} // Pass the delete handler
        />
      ))}
    </div>
  );
};

export default CharacterList;
