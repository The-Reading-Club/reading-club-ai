import { BasicCharacterAttributes } from "@/app/api/character/identify/utils";
import { CharacterAttributes } from "@/data/character";
import { Editor, JSONContent } from "@tiptap/react";
import React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../../convex/_generated/api";

type Suggestion = {
  id: string;
};

export type StoryData = {
  characters: BasicCharacterAttributes[];
  characterDefinitions: CharacterAttributes[];
  tiptapEditorContent: JSONContent | null;
};

export type StoriesData = {
  [key: string]: StoryData;
};

interface TRCEditorState {
  suggestionsIDs: string[];
  setSuggestionsIDs: (suggestionsIDs: string[]) => void;

  //   suggestions: Suggestion[];
  //   setSuggestions: (suggestions: Suggestion[]) => void;

  // editorContent: JSONContent | null;
  // setEditorContent: (editorContent: JSONContent) => void;

  storiesData: StoriesData;
  setStoriesData: (storiesData: StoriesData) => void;

  remoteStoriesData: StoriesData;
  setRemoteStoriesData: (remoteStoriesData: StoriesData) => void;

  editorInstance: Editor | null;
  setEditorInstance: (editor: Editor) => void;
}

// https://chat.openai.com/c/346671d1-2d61-44b1-b75c-950291387899
// const customDatabaseStorage = {
//   getItem: async (key: string) => {
//     // const value = localStorage.getItem(key);

//     const value = await api.documents..getEditorData(key);
//     return value;
//   },
//   setItem: (key: string, value: string) => {
//     localStorage.setItem(key, value);
//   },
// };

export const useTRCEditorStore = create<TRCEditorState>()(
  persist(
    (set) => ({
      suggestionsIDs: [],
      setSuggestionsIDs: (suggestionsIDs) => set({ suggestionsIDs }),

      //   suggestions: [],
      //   setSuggestions: (suggestions) => set({ suggestions }),

      // editorContent: null,
      // setEditorContent: (editorContent) => set({ editorContent }),

      storiesData: {},
      setStoriesData: (storiesData) => set({ storiesData }),

      remoteStoriesData: {},
      setRemoteStoriesData: (remoteStoriesData) => set({ remoteStoriesData }),

      // editor instance
      editorInstance: null,
      setEditorInstance: (editor) => set({ editorInstance: editor }),
    }),
    {
      name: "trc-editor-local-storage-test",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // storiesData: state.storiesData,
      }),
    }
  )
);

/**
 * 
 * DEFAULT MODAL PROPS
 * isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
 */

interface TRCAppState {
  defaultModalOpen: boolean;
  setDefaultModalOpen: (defaultModalOpen: boolean) => void;
  defaultModalOnClose: () => void;
  setDefaultModalOnClose: (defaultModalOnClose: () => void) => void;
  defaultModalOnSubmit: () => void;
  setDefaultModalOnSubmit: (defaultModalOnSubmit: () => void) => void;
  defaultModalTitle: string;
  setDefaultModalTitle: (defaultModalTitle: string) => void;
  defaultModalBody: React.ReactElement;
  setDefaultModalBody: (defaultModalBody: React.ReactElement) => void;
  defaultModalFooter: React.ReactElement;
  setDefaultModalFooter: (defaultModalFooter: React.ReactElement) => void;
  defaultModalActionLabel: string;
  setDefaultModalActionLabel: (defaultModalActionLabel: string) => void;
  defaultModalDisabled: boolean;
  setDefaultModalDisabled: (defaultModalDisabled: boolean) => void;
  defaultModalSecondaryAction: () => void;
  setDefaultModalSecondaryAction: (
    defaultModalSecondaryAction: () => void
  ) => void;
  defaultModalSecondaryActionLabel: string;
  setDefaultModalSecondaryActionLabel: (
    defaultModalSecondaryActionLabel: string
  ) => void;
}

export const useTRCAppStore = create<TRCAppState>((set) => ({
  // DEFAULT MODAL
  defaultModalOpen: false,
  setDefaultModalOpen: (defaultModalOpen) => set({ defaultModalOpen }),
  defaultModalOnClose: () => {
    set({ defaultModalOpen: false });
  },
  // setDefaultModalOnClose: (defaultModalOnClose) => set({ defaultModalOnClose }),
  setDefaultModalOnClose: (defaultModalOnClose) =>
    set({ defaultModalOpen: false }),
  defaultModalOnSubmit: () => {},
  setDefaultModalOnSubmit: (defaultModalOnSubmit) =>
    set({ defaultModalOnSubmit }),
  defaultModalTitle: "Reading Club AI",
  setDefaultModalTitle: (defaultModalTitle) => set({ defaultModalTitle }),
  defaultModalBody: React.createElement("div"),
  setDefaultModalBody: (defaultModalBody) => set({ defaultModalBody }),
  defaultModalFooter: React.createElement("div"),
  setDefaultModalFooter: (defaultModalFooter) => set({ defaultModalFooter }),
  defaultModalActionLabel: "Accept",
  setDefaultModalActionLabel: (defaultModalActionLabel) =>
    set({ defaultModalActionLabel }),
  defaultModalDisabled: false,
  setDefaultModalDisabled: (defaultModalDisabled) =>
    set({ defaultModalDisabled }),
  defaultModalSecondaryAction: () => {},
  setDefaultModalSecondaryAction: (defaultModalSecondaryAction) =>
    set({ defaultModalSecondaryAction }),
  defaultModalSecondaryActionLabel: "Cancel",
  setDefaultModalSecondaryActionLabel: (defaultModalSecondaryActionLabel) =>
    set({ defaultModalSecondaryActionLabel }),
}));

interface TRCAppConfig {
  isPlus: boolean;
  setIsPlus: (isPlus: boolean) => void;
}

export const useTRCAppConfigStore = create<TRCAppConfig>((set) => ({
  isPlus: false,
  setIsPlus: (isPlus) => set({ isPlus }),
}));
