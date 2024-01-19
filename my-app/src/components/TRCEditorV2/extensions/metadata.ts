import { Extension } from "@tiptap/react";

interface MetadataOptions {
  key: string;
  name: string;
}

export const MetadataExtension = Extension.create<MetadataOptions>({
  name: "metadata",

  addOptions() {
    return {
      key: "",
      name: "",
    };
  },

  // Other necessary methods or properties can be added here

  // Method to access metadata
  getMetadata() {
    return this.options;
  },
});

// export default MetadataExtension;
