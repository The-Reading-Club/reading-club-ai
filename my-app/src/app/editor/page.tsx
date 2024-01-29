import EditorPageWrapper from "@/components/EditorPageWrapper";
import { checkSubscription } from "@/lib/subscription";

const page = async () => {
  const isPlus = await checkSubscription();
  return (
    <>
      <EditorPageWrapper editorKey="trc-editor-spage" isPlus={isPlus} />
    </>
  );
};

export default page;
