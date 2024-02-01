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
import {
  IllustrationGenerationBody,
  handleIllustrationGeneration,
} from "./illustration-generation/illustration-generation-handle";

export const uploadKey = new PluginKey("upload-image");

const UploadImagesPlugin = () =>
  new Plugin({
    key: uploadKey,
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        // See if transaction adds or removes any placeholders
        const action = tr.getMeta(this as any);
        if (action && action.add) {
          const { id, pos, src } = action.add;

          const placeholder = document.createElement("div");
          placeholder.setAttribute("class", "img-placeholder");
          const image = document.createElement("img");
          image.setAttribute(
            "class",
            "opacity-40 rounded-lg border border-stone-200"
          );
          image.src = src;
          placeholder.appendChild(image);
          const deco = Decoration.widget(pos + 1, placeholder, {
            id,
          });
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(
            set.find(
              null as any,
              null as any,
              (spec) => spec.id == action.remove.id
            )
          );
        }
        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

export default UploadImagesPlugin;

// Utilities

export function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id === id);

  return found.length ? found[0].from : null;
}
// https://chat.openai.com/c/74e8273c-4be2-4409-a8a9-fd9d202005e8
export function parseJSONChunk(
  chunk: string
): Array<{ key: string; value: string }> {
  // Verify type of chunk parameter
  if (typeof chunk !== "string") {
    devAlert("Invalid type for chunk parameter.");
    throw new Error("Invalid type for chunk parameter.");
  }

  // DEBUT PARAMETERS AS MUCH AS POSSIBLE, VERIFY TYPES, EVERYTHING
  console.log("parseJSONChunk CHUNK: " + chunk);
  console.log("parseJSONChunk CHUNK TYPE: " + typeof chunk);
  console.log("parseJSONChunk CHUNK LENGTH: " + chunk.length);

  const regex = /\"(\w+)\"\s*:\s*\"([^\"]+)\"/g;
  let match;
  const results = [];

  while ((match = regex.exec(chunk)) !== null) {
    results.push({ key: match[1], value: match[2] });
  }

  // log results
  // devAlert("RESULTS: " + JSON.stringify(results));
  console.log("RESULTS: " + JSON.stringify(results));
  return results;
}
