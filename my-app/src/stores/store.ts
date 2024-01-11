import { create } from "zustand";

type Suggestion = {
  id: string;
};

interface TRCEditorState {
  suggestionsIDs: string[];
  setSuggestionsIDs: (suggestionsIDs: string[]) => void;

  //   suggestions: Suggestion[];
  //   setSuggestions: (suggestions: Suggestion[]) => void;
}

export const useTRCEditorStore = create<TRCEditorState>((set) => ({
  suggestionsIDs: [],
  setSuggestionsIDs: (suggestionsIDs) => set({ suggestionsIDs }),

  //   suggestions: [],
  //   setSuggestions: (suggestions) => set({ suggestions }),
}));
