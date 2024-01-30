import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import ReactPDF from "@react-pdf/renderer";
import MyDocument from "../MyDocument";
import DownloadStoryPDFLink from "../StoryPDF/DownloadPDFLink";
import StoryPDF from "../StoryPDF";
import { StoryData, useTRCEditorStore } from "@/stores/store";
import useMounted from "@/lib/hooks/useMounted";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useProModal } from "@/lib/hooks/useProModal";
import { Zap } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";

interface RightPanelProps {
  storyData: StoryData;
  isPlus: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ storyData, isPlus }) => {
  //   const downloadPDF = () => {
  //     ReactPDF.render(<MyDocument />, `${__dirname}/downloads/example.pdf`);
  //   };

  const mounted = useMounted();

  const proModal = useProModal();

  // const isPro = await checkSubscription();

  const proOnClick = () => {
    proModal.onOpen();
  };

  const [documentGenerated, setDocumentGenerated] = React.useState(false);
  return (
    <div className="basis-1/4 text-center font-semibold lg:pt-0 pt-6">
      <h1 className="text-2xl font text-darkFont">
        {`Welcome to Reading Club AI!`}
      </h1>
      <br />
      <p className="text-md text-darkFont">{`Start creating a story.`}</p>
      <p className="text-md text-darkFont">
        {`Press '++' for suggestions, or`}
      </p>
      <p className="text-md text-darkFont">{`'/' for illustrations.`}</p>
      {/* <br /> */}
      {/* <p className="text-md text-darkFont">{`Note: This is a research demo. There's no autosave, so make sure to copy & paste anything you like. Autocompletions are rate limited to a few dozens per day.`}</p> */}
      {/* sign up as an early tester here */}
      <br />
      {/* <p className="text-md text-darkFont">
        Sign up as an early tester{" "}
        <Link
          href="https://forms.gle/eDiYjELhFcGiZ58T6"
          target="_blank"
          rel="noopener noreferrer"
          // className="text-white "
        >
          here.
        </Link>
      </p>
      <br /> */}
      <div
        //   style={{ border: "2px solid red" }}
        className=""
      >
        <Link
          href="https://readingclub.canny.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white "
        >
          <Button
            //   className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent"
            className="bg-white text-darkFont border-2 border-primary rounded-full font-bold text-xl py-7 px-14 hover:bg-primary lg:min-w-[90%] min-w-[90%]"
          >
            Request Feature
          </Button>
        </Link>
      </div>
      <div
        //   style={{ border: "2px solid red" }}
        className="mt-10"
      >
        {documentGenerated == false ? (
          <Button
            className="bg-white text-darkFont border-2 border-primary rounded-full font-bold text-xl py-7 px-14 hover:bg-primary lg:min-w-[90%] min-w-[90%]"
            // A process should be started to change the UI with a debounced
            // callback to trigger the PDF generation
            onClick={() => setDocumentGenerated(true)}
          >
            Generate PDF
          </Button>
        ) : (
          // It's very important to remember not rendering this thing too much
          // cause otherwise it degrades performance
          // Probably better to create the component in a useEffect function
          // or something like that
          <DownloadStoryPDFLink document={<StoryPDF storyData={storyData} />}>
            <Button
              className="bg-accent2 text-white border-2 border-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent lg:min-w-[90%] min-w-[90%]"
              //   should probably change to false when the story is updated
              //   onClick={() => setDocumentGenerated(false)}
            >
              Download Story
            </Button>
          </DownloadStoryPDFLink>
        )}
      </div>
      {/* <div className="mt-10">
        <Button
          className="bg-accent2 text-white border-2 border-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent lg:min-w-[90%] min-w-[90%]"
          //   should probably change to false when the story is updated
          //   onClick={() => setDocumentGenerated(false)}
        >
          Order Hardcover
        </Button>
      </div> */}

      {/* If you keep rendering your pdf document multiple times you app performance will get affected and thereby decline. Make sure to toggle the PDFDonwloadLink component properly.
       */}
      {/* <PDFDownloadLink document={<StoryPDF storyData={storyData} />}>
        GENERATE PDF
      </PDFDownloadLink> */}
      {/* {!documentGenerated ? (
        <button className="btn" onClick={() => setDocumentGenerated(true)}>
          Generate PDF
        </button>
      ) : (
        <PDFDownloadLink
          document={<StoryPDF storyData={storyData} />}
          //   fileName={outputFilename}
          className="btn btn-primary"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Document is ready!"
          }
        </PDFDownloadLink>
      )} */}
      <div className="mt-10">
        {isPlus == false ? (
          <Button
            onClick={proOnClick}
            className="bg-white rounded-full font-bold text-xl py-7 px-14 hover:bg-primary lg:min-w-[90%] min-w-[90%]"
            variant="premium"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        ) : (
          // Tell user they are currently subscribed, and offer link to go to settings
          <Link href="/settings">
            <Button
              className="bg-accent2 rounded-full font-bold text-xl py-7 px-14 hover:bg-accent lg:min-w-[90%] min-w-[90%]"
              variant="premium"
            >
              Manage Subscription
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
