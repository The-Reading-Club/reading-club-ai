import { create } from "zustand";

interface useProModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProModal = create<useProModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

interface useIllustrationModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  revisedPrompt: string;
  setRevisedPrompt: (revisedPrompt: string) => void;
  imageSrc: string;
  setImageSrc: (imageSrc: string) => void;
}

export const useIllustrationModal = create<useIllustrationModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    revisedPrompt: "This is the revised prompt.",
    setRevisedPrompt: (revisedPrompt: string) => set({ revisedPrompt }),
    imageSrc: "",
    setImageSrc: (imageSrc: string) => set({ imageSrc }),
  })
);

interface useUserEditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUserEditModal = create<useUserEditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
