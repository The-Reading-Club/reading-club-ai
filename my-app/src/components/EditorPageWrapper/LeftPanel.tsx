import React from "react";
import CharacterList from "./CharacterList";
import { StoryData } from "@/stores/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BasicCharacterAttributes } from "@/app/api/character/identify/utils";

interface EditorPageWrapperProps {
  storyData: StoryData;
  setStoryData: (data: StoryData) => void;
}
const LeftPanel: React.FC<EditorPageWrapperProps> = ({
  storyData,
  setStoryData,
}) => {
  const setCharacterList = (characters: BasicCharacterAttributes[]) => {
    const characterNames = characters.map((character) => character.name);

    const characterDefinitions = storyData.characterDefinitions.filter(
      (definition) => characterNames.includes(definition.name)
    );
    setStoryData({ ...storyData, characters, characterDefinitions });
  };

  return (
    <div
      className="basis-1/4 lg:flex hidden flex-col justify-center pt-8 lg:p-10 text-center"
      style={{ height: "100vh" }}
    >
      {/* <div>
  <p>{JSON.stringify(useTRCEditorStore.getState().storiesData)}</p>
</div> */}
      <div>
        {/* <p>{JSON.stringify(storyData.characters)}</p> */}
        <CharacterList
          characters={storyData?.characters}
          characterDefinitions={storyData?.characterDefinitions}
          setCharacterList={setCharacterList}
        />
      </div>
      {false && (
        <div>
          <h1 className="lg:block hidden text-2xl font text-darkFont ">
            Proof of Concept
          </h1>
          <br className="lg:block hidden" />
          <Link
            href="https://readingclub.canny.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white "
          >
            <Button className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent">
              Request a Feature
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
