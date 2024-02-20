import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { Editor } from "@tiptap/core";
import CustomImage from ".";
import { devAlert } from "@/lib/utils";
import { EditorView } from "@tiptap/pm/view";
import { NodeViewRenderer } from "@tiptap/core";
import { useIllustrationModal } from "@/lib/hooks/useModals";

// // Correctly defining a function that matches the NodeViewRenderer signature
// const CustomImageView: NodeViewRenderer = (
//   node: ProseMirrorNode,
//   view: EditorView,
//   getPos: () => number
// ) => {
//   const dom = document.createElement("div");
//   const img = document.createElement("img");
//   img.src = node.attrs.src;
//   img.alt = node.attrs.alt || "Image";
//   // Define your onClick event here
//   img.onclick = () => console.log("Image was clicked!");
//   dom.appendChild(img);

//   // Return an object that matches the expected structure of a NodeView
//   return {
//     dom,
//     contentDOM: null, // Specify if your node view has content that should be editable
//   };
// };

// const CustomImageView: NodeViewRenderer = (
//   node: ProseMirrorNode,
//   view: EditorView,
//   getPos: () => number
// ) => {
//   const dom = document.createElement("div");
//   const img = document.createElement("img");
//   img.src = node.attrs.src;
//   img.alt = node.attrs.alt || "Image";
//   img.addEventListener("click", () => {
//     console.log("Image clicked!");
//   });
//   dom.appendChild(img);

//   return {
//     dom,
//     contentDOM: null,
//   };
// };

// const CustomImageView = (
//   node: ProseMirrorNode,
//   editor: Editor,
//   getPos: () => number
// ) => ({
//   contentDOM: null,
//   dom: document.createElement("div"),
//   mount: () => {
//     const reactComponent = (
//       <NodeViewWrapper>
//         <CustomImage
//           src={node.attrs.src}
//           alt={node.attrs.alt}
//           //   onClick={() => console.log("Image clicked!")}
//           onClick={() => devAlert("Image clicked!")}
//         />
//       </NodeViewWrapper>
//     );
//     // Render your reactComponent into this.dom
//     // You might use ReactDOM.render for this purpose or any other method you prefer
//   },
//   // Implement any other necessary methods for your custom node view
// });

// This time I am positively impressed with their docs
// https://tiptap.dev/docs/editor/guide/node-views/react

interface CustomImageViewProps {
  node: ProseMirrorNode;
  // editor: Editor;
  // getPos: () => number;
}
const CustomImageView: React.FC<CustomImageViewProps> = (
  // node: ProseMirrorNode,
  // editor: Editor,
  // getPos: () => number
  { node }
) => {
  const {
    setRevisedPrompt,
    onOpen: onIllustrationModalOpen,
    setImageSrc,
  } = useIllustrationModal();
  return (
    <NodeViewWrapper>
      <CustomImage
        src={node.attrs.src}
        // src={
        //   "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/beta/images/2024-01-30/71407-9A1gBspyVR-T7We7qVdq1lH20fbwL5sbrIDDzrzIG.png"
        // }
        alt={node.attrs.alt}
        // alt={"alt text test"}
        //   onClick={() => console.log("Image clicked!")}
        onClick={() => {
          devAlert(JSON.stringify(node.attrs));
          // devAlert(node.attrs.alt);
          setRevisedPrompt(node.attrs.alt);
          setImageSrc(node.attrs.src);
          onIllustrationModalOpen();
        }}
      />
    </NodeViewWrapper>
  );
};

export default CustomImageView;
