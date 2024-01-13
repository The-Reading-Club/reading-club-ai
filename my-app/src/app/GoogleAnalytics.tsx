"use client";
import Script from "next/script";

// https://stackoverflow.com/questions/75749102/how-to-implement-google-analytics-with-nextjs-13

// https://dany-rivera.medium.com/how-to-integrate-google-analytics-on-your-next-js-13-app-easy-guide-c7389666831c
const GoogleAnalytics = ({ GA_TRACKING_ID }: { GA_TRACKING_ID: string }) => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', "${GA_TRACKING_ID}");
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
