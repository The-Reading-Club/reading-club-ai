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
import {
  useTRCAppConfigStore,
  useTRCAppStore,
  useTRCEditorStore,
} from "@/stores/store";
import { use } from "react";
import { useProModal } from "@/lib/hooks/useModals";
import { unknown } from "zod";

export const handleImageUpload = (file: File) => {
  devAlert("handleImageUpload START " + file.name);
  return new Promise((resolve) => {
    toast.promise(
      axios
        .post("/api/upload", {
          method: "POST",
          headers: {
            "content-type": file?.type || "application/octet-stream",
            // "x-vercel-file-name": file?.name || "image",
          },
          body: file,
        })
        .then(async (res) => {
          devAlert("handleImageUpload FETCH FINISHED " + file.name);
          resolve({ result: file.name }); // think of it as a url
          return;

          // Successfully uploaded image
          if (res.status === 200) {
            // const { url } = await res.json();
            const { url } = await JSON.parse(res.data);

            let image = new Image();
            image.src = url;
            image.onload = () => {
              resolve(url);
            };
          } // for dev purposes now
          else if (res.status === 401) {
            resolve(file);
            throw new Error("Reading image locally");
          } // Unkown error
          else {
            throw new Error("Error uploading image.");
          }
        }),
      {
        loading:
          useTRCAppConfigStore.getState().dictionary?.toasts.uploadingImage,
        success:
          useTRCAppConfigStore.getState().dictionary?.toasts.imageUploaded,
        error: (e) => e.message,
      }
    );
  });
};
