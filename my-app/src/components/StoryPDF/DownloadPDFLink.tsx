// THIS SHIT IS MAKING LOADING EVERYTHING MORE SLOW
// https://stackoverflow.com/questions/58753720/react-pdf-slow-performance-with-large-pdf#:~:text=If%20you%20keep%20rendering%20your,toggle%20the%20PDFDonwloadLink%20component%20properly.
"use client";
// import { usePDF } from "@react-pdf/renderer";
// https://github.com/diegomura/react-pdf/issues/934
// https://github.com/diegomura/react-pdf/issues/613

import { usePDF } from "@react-pdf/renderer";
import Link from "next/link";
import React, { ReactElement } from "react";

interface DownloadPDFLinkProps {
  document: ReactElement;
}

const DownloadStoryPDFLink: React.FC<
  DownloadPDFLinkProps & React.PropsWithChildren
> = ({ document, children }) => {
  // https://stackoverflow.com/questions/76007339/server-error-error-pdfdownloadlink-is-a-web-specific-api-youre-either-using-t
  const [instance, updateInstance] = usePDF({ document: document });

  //   if (instance.loading) return <div>Loading ...</div>;
  if (instance.loading) return <></>;

  //   if (instance.error) return <div>Something went wrong: {instance.error}</div>;
  if (instance.error) return <></>;
  if (instance.url == null) return <></>;

  return (
    // <a href={instance.url} download="test.pdf">
    //   Download
    // </a>
    <Link
      href={instance.url}
      target="_blank"
      rel="noopener noreferrer"
      //   className="text-white "
    >
      {children}
    </Link>
  );
};

export default DownloadStoryPDFLink;
