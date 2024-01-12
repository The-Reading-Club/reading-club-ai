import { EditorState, PluginKey } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { toast } from "sonner";

const uploadKey = new PluginKey("upload-image");

export function startImageUpload(file: File, view: EditorView, pos: number) {
  // check if the file is an image
  if (!file.type.includes("image/")) {
    toast.error("File is not supported.");
    return;
  }

  // check if the file size is less than 20MB
  // dalle has heavy images, I think?
  if (file.size > 20 * 1024 * 1024) {
    toast.error("File size exceeds 20MB.");
    return;
  }

  // A fresh object to act as the ID for this upload
  const id = {};

  // Replace the selection with a placeholder
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: { id, pos, src: reader.result },
    });
    view.dispatch(tr);
  };

  handleImageUpload(file).then((src) => {
    const { schema } = view.state;

    let pos = findPlaceholder(view.state, id);

    // If the content around the placeholder has been deleted
    // drop the image
    if (pos == null) return; // what is this for actually?

    // Otherwise, insert it at the placeholder's position,
    // and remove the placeholder

    // confused about this line
    // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
    // the image locally
    const imageSrc = typeof src === "object" ? reader.result : src;

    const node = schema.nodes.image.create({ src: imageSrc });
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

export const handleImageUpload = (file: File) => {
  return new Promise((resolve) => {
    toast.promise(
      fetch("/api/upload", {
        method: "POST",
        headers: {
          "content-type": file?.type || "application/octet-stream",
          //   "x-vercel-file-name": file?.name || "image",
        },
        body: file,
      }).then(async (res) => {
        // Successfully uploaded image
        if (res.status === 200) {
          const { url } = await res.json();

          let image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
        } // for dev purposes now
        else if (res.status === 401) {
          resolve(file);
          throw new Error("DEV ENVIRONMENT, reading image locally instead");
        } // Unkown error
        else {
          throw new Error("Error uploading image.");
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: "Error uploading image.",
      }
    );
  });
};

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id === id);

  return found.length ? found[0].from : null;
}
