let { google } = require("googleapis");
const axios = require("axios");

const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  /*
   * This is where Google will redirect the user after they
   * give permission to your application
   */
  "https://sdk-iframe.herokuapp.com"
);

// get Google Auth URL
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

//get google user
async function getGoogleUser({ code }) {
  console.log("Get google user ", code);
  const { tokens } = await oauth2Client.getToken(code);
  console.log("Tokens : ", tokens);

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });

  console.log("Google user : ", googleUser);

  return googleUser;
}

// request url
//console.log("Get Google URL : ", getGoogleAuthURL());

// 4%2F0AWgavdcKwZ9Q6Jq_no-nkUgIfxODaCEOU2tzr0U9XXw8LS5PkG6K-OkTWGT0b3cThFGDAw

// get google user
let code = decodeURIComponent(
  //"4/0AWgavdeqKrSoXRV5lVv1GzTK3-opHS3YZPh4E4z0BucFXS8hsHCLjbD50N4r-nw1OW3M1w";
  "4%2F0AWgavdfLvZeLYou_LBFT9wTjqzc-fhWEPJIuBzrmLXnzLnk_zjreGnCmtLzrzCSjLuSKkw"
);
console.log("decoded uri ", decodeURIComponent(code));

async function run() {
  let a = await getGoogleUser({ code });
  console.log("Value : ", a);
}

run();
