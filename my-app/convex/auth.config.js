export default {
  providers: [
    // google
    {
      domain: "https://accounts.google.com/",
      applicationID: process.env.GOOGLE_CLIENT_ID,
    },
    // readingclub.ai
    {
      domain: "https://accounts.readingclub.ai/",
      applicationID: process.env.READINGCLUBAI_CLIENT_ID,
    },
  ],
};
