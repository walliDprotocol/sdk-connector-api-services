let { google } = require("googleapis");

const GOOGLE_CLIENT_ID =
  "708942184051-jiv7km3e8ujg2mn3d7s9pcjvk47avi1s.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  "https://sdk-iframe.herokuapp.com"
);

function getGoogleAuthURL() {
  /*
   * Generate a url that asks permissions to the user's email and profile
   */
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes, // If you only need one scope you can pass it as string
  });
}

console.log("Get Google : ", getGoogleAuthURL());
