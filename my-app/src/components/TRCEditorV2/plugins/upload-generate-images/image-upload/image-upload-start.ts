import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import { toast } from "sonner";
import axios from "axios";
import { dev } from "@/config";
import {
  capitalizeFirstLetter,
  devAlert,
  devConsoleLog,
  fetchAndReadStream,
  wrapWithToast,
} from "@/lib/utils";
import { useTRCAppStore, useTRCEditorStore } from "@/stores/store";
import { use } from "react";
import { useProModal } from "@/lib/hooks/useModals";
import { unknown } from "zod";
import { handleImageUpload } from "./image-upload-handle";
import { findPlaceholder, uploadKey } from "..";

export function startImageUpload(file: File, view: EditorView, pos: number) {
  devAlert("startImageUpload TEST " + file.name);
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
  devAlert("replace selection with placeholder START");
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();
  devAlert("replace selection with placeholder END");

  const reader = new FileReader();

  devAlert("reader.readAsDataURL START");
  reader.readAsDataURL(file);
  devAlert("reader.readAsDataURL END");

  devAlert("reader.onload START");
  reader.onload = () => {
    tr.setMeta(uploadKey, {
      add: { id, pos, src: reader.result },
    });
    view.dispatch(tr);
  };
  devAlert("reader.onload END");

  handleImageUpload(file).then((src) => {
    devConsoleLog("handleImageUpload PROMISE START");

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
    devConsoleLog("handleImageUpload PROMISE  END");
  });
}
