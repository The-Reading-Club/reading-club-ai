// https://github.com/webdevcody/next-auth-convex/blob/main/convex/auth.config.js

export default {
  providers: [
    {
      domain: "https://accounts.google.com/",
      applicationID: process.env.GOOGLE_CLIENT_ID,
    },
  ],
};
