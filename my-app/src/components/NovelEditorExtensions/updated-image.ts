import Image from "@tiptap/extension-image";

const UpdatedImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        // not bad Jose not bad
        // https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/extensions/index.tsx
        default: "100%",
      },
      height: {
        default: null,
      },
    };
  },
});

export default UpdatedImage;
