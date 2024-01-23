import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";
import { toast } from "sonner";
import axios from "axios";
import { dev } from "@/config";
import { devAlert, devConsoleLog } from "@/lib/utils";
import { useTRCAppStore, useTRCEditorStore } from "@/stores/store";

const uploadKey = new PluginKey("upload-image");

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
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      }
    );
  });
};

function findPlaceholder(state: EditorState, id: {}) {
  const decos = uploadKey.getState(state);
  const found = decos.find(null, null, (spec: any) => spec.id === id);

  return found.length ? found[0].from : null;
}

// ILLUSTRATION GENERATION

export interface CharacterIdentificationBody {
  existingCharacters: any;
  storyText: string;
}

export interface IllustrationGenerationBody {
  prevContextText: string;
  prevParagraphText: string;
  postContextText: string;
  editorKey: string;
  existingCharacters: any;
  characterDefinitions: any;
}

export function startIllustrationGeneration(
  body: IllustrationGenerationBody,
  view: EditorView,
  pos: number
) {
  // A fresh object to act as the ID for this generation
  const id = {};

  // Replace the selection with a placeholder
  // We dont need this for illustration generation
  const tr = view.state.tr;
  if (!tr.selection.empty) tr.deleteSelection();

  tr.setMeta(uploadKey, {
    // no placeholder because we aren't updating anything
    // unless I could have a default placeholder manually...
    add: { id, pos, src: null /*reader.result*/ },
  });
  view.dispatch(tr);

  // We are going to do some JavaScript magic here
  useTRCAppStore.getState().setDefaultModalOpen(true);
  useTRCAppStore.getState().setDefaultModalTitle("Learn about your characters");

  handleCharacterIdentification({
    existingCharacters: body.existingCharacters,
    storyText: body.prevContextText + body.postContextText,
  }).then((res) => {
    console.log("handleCharacterIdentification RES", res);
    devAlert("handleCharacterIdentification RES " + JSON.stringify(res));

    // show content on modal
    // useTRCAppStore.getState().setDefaultModalBody(
    //   <div>
    //     <p>{JSON.stringify(res, null, 2)}</p>
    //   </div>
    // );
  });

  return;

  handleIllustrationGeneration(body).then((src) => {
    useTRCAppStore.getState().setDefaultModalOpen(false);

    const { schema } = view.state;

    let pos = findPlaceholder(view.state, id);

    // If the content around the placeholder has been deleted
    // drop the image
    if (pos == null) return;

    // Otherwise, insert it at the placeholder's position,
    // and remove the placeholder

    // When BLOB_READ_WRITE_TOKEN is not valid or unavailable, read
    // the image locally
    const imageSrc = src;

    const node = schema.nodes.image.create({ src: imageSrc });
    const transaction = view.state.tr
      .replaceWith(pos, pos, node)
      .setMeta(uploadKey, { remove: { id } });
    view.dispatch(transaction);
  });
}

function handleCharacterIdentification(body: CharacterIdentificationBody) {
  return new Promise((resolve) => {
    toast.promise(
      fetch("/api/character/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
        // https://apidog.com/articles/axios-stream/
        // responseType: "stream",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // https://chat.openai.com/c/cdd17c3d-d691-4294-a924-1689fe3b5883
          const reader = response.body!.getReader();
          const decoder = new TextDecoder("utf-8"); // Creates a TextDecoder instance
          let content = "";

          return reader
            .read()
            .then(function processText({ done, value }): Promise<string> {
              if (done) {
                return Promise.resolve(content);
              }

              // Decode the Uint8Array to a string and append it to content
              content += decoder.decode(value, { stream: true });

              const pChunks = parseJSONChunk(content).map((chunk) => {
                return <p>{chunk.key + ": " + chunk.value}</p>;
              });

              useTRCAppStore
                .getState()
                .setDefaultModalBody(<div>{pChunks}</div>);

              // Read the next chunk
              return reader.read().then(processText);
            });
        })
        .then(async (res) => {
          resolve(res);
          // // Let's do streaming instead
          // // https://www.youtube.com/watch?v=wDtjBb4ZJwA
          // const reader = res.body!.getReader();
          // let resultMsg = "";
          // while (true) {
          //   const chunk = await reader.read();
          //   const { done, value } = chunk;
          //   if (done) {
          //     break;
          //   }
          //   // do something with value
          //   // console.log(value);
          //   resultMsg += value;
          //   useTRCAppStore
          //     .getState()
          //     .setDefaultModalBody(<div>{resultMsg}</div>);
          // }
          // ***********
          // AXIOS STYLE
          // // Successfully identified characters
          // if (res.status === 200) {
          //   devAlert(
          //     "Characters identified successfully." + JSON.stringify(res.data)
          //   );
          //   // const { newCharacters, characterDefinitions } = res.data;
          //   // Save state to Zustand
          //   devAlert("NOT SAVING TO ZUSTAND");
          //   // not now for testing
          //   // if (dev == false)
          //   //   useTRCEditorStore.getState().setStoriesData({
          //   //     [body.editorKey]: {
          //   //       ...useTRCEditorStore.getState().storiesData[body.editorKey],
          //   //       characters: newCharacters,
          //   //       characterDefinitions: characterDefinitions,
          //   //     },
          //   //   });
          //   resolve(res.data);
          // } else if (res.status === 429) {
          //   throw new Error("Rate limited.");
          // }
          // // Unkown error
          // else {
          //   throw new Error("Error uploading image.");
          // }
        })
    );
  });
}

function handleIllustrationGeneration(body: IllustrationGenerationBody) {
  return new Promise((resolve) => {
    toast.promise(
      axios
        .post("/api/illustration", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: body, //{},
        })
        .then(async (res) => {
          // Successfully generate illustration
          if (res.status === 200) {
            devAlert(
              "Illustration generated successfully." + JSON.stringify(res.data)
            );
            const {
              imageData,
              newCharacters,
              characterDefinitions,
              storedImageUrl,
            } = res.data as GenerateIllustrationResponse;

            const { url } = imageData;

            // Save state to Zustand
            devAlert("NOT SAVING TO ZUSTAND");
            // not now for testing
            if (dev == false)
              useTRCEditorStore.getState().setStoriesData({
                [body.editorKey]: {
                  ...useTRCEditorStore.getState().storiesData[body.editorKey],
                  characters: [...body.existingCharacters, ...newCharacters],
                  characterDefinitions: [
                    body.characterDefinitions,
                    ...characterDefinitions,
                  ],
                },
              });

            let image = new Image();
            image.src = storedImageUrl;
            image.onload = () => {
              resolve(storedImageUrl);
            };
          } else if (res.status === 429) {
            throw new Error("Rate limited.");
          }
          // Unkown error
          else {
            throw new Error("Error uploading image.");
          }
        }),
      {
        loading: "Generating illustration...",
        success: "Illustration generated successfully.",
        error: (e) => e.message,
      }
    );
  });
}

// https://chat.openai.com/c/74e8273c-4be2-4409-a8a9-fd9d202005e8
function parseJSONChunk(chunk: string): Array<{ key: string; value: string }> {
  const regex = /\"(\w+)\":\"([^\"]+)\"/g;
  let match;
  const results = [];

  while ((match = regex.exec(chunk)) !== null) {
    results.push({ key: match[1], value: match[2] });
  }

  return results;
}
