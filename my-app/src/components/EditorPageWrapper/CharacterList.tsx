import React from "react";
import "./CharacterList.css"; // Assume you have some CSS for styling
import { capitalizeFirstLetter } from "@/lib/utils";

// Define the types for your character properties
type Character = {
  name: string;
  description: string;
};

// Define the props for the CharacterCard component
type CharacterCardProps = {
  character: Character;
};

// CharacterCard Component
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  //   if (!character) return <></>;

  return (
    <div className="character-card text-darkFont bg-white">
      <h3 className="font-bold text-xl">{character.name}</h3>
      <p className="text-sm">
        {capitalizeFirstLetter(character.description) + "."}
      </p>
    </div>
  );
};

// Define the props for the CharacterList component
type CharacterListProps = {
  characters: Character[];
};

// CharacterList Component
const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  if (!characters) return <></>;

  return (
    <div className="character-list">
      {characters.map((character, index) => (
        <CharacterCard key={index} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
