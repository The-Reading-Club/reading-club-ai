import { JSONContent } from "@tiptap/react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Suggestion = {
  id: string;
};

interface TRCEditorState {
  suggestionsIDs: string[];
  setSuggestionsIDs: (suggestionsIDs: string[]) => void;

  //   suggestions: Suggestion[];
  //   setSuggestions: (suggestions: Suggestion[]) => void;

  // editorContent: JSONContent | null;
  // setEditorContent: (editorContent: JSONContent) => void;
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
    }),
    {
      name: "trc-editor-local-storage-test",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // editorContent: state.editorContent,
      }),
    }
  )
);
