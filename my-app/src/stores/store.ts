import { JSONContent } from "@tiptap/react";
import React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Suggestion = {
  id: string;
};

export type StoryData = {
  characters: any[];
  characterDefinitions: any[];
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
}

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
    }),
    {
      name: "trc-editor-local-storage-test",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // editorContent: state.editorContent,
        storiesData: state.storiesData,
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
  setDefaultModalOnClose: (defaultModalOnClose) => set({ defaultModalOnClose }),
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
