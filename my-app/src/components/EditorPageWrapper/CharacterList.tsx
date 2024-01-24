import React, { useState } from "react";
import "./CharacterList.css"; // Assume you have some CSS for styling
import { capitalizeFirstLetter } from "@/lib/utils";
import useMounted from "@/lib/hooks/useMounted";
import { CharacterAttributes } from "@/data/character";

// Define the types for your character properties
type Character = {
  name: string;
  description: string;
  isExpanded: boolean;
};

// Define the props for the CharacterCard component
type CharacterCardProps = {
  character: Character;
  definition: CharacterAttributes;
  onClick: () => void; // Function to handle the click event
};

// CharacterCard Component
const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  definition,
  onClick,
}) => {
  //   if (!character) return <></>;

  return (
    <div className="character-card text-darkFont bg-white" onClick={onClick}>
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
  characters: Character[];
  characterDefinitions: CharacterAttributes[];
};

// CharacterList Component
const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  characterDefinitions,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const mounted = useMounted();

  const handleCardClick = (characterName: string) => {
    setExpandedCard(expandedCard === characterName ? null : characterName);
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
        />
      ))}
    </div>
  );
};

export default CharacterList;
