const clientId = "";
const clientSecret = "";
const redirectUri = "https://sdk-iframe.herokuapp.com/";
// reddit apps
// https://www.reddit.com/prefs/apps
// https://fusebit.io/blog/reddit-oauth/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
const axios = require("axios");
const queryString = require("querystring");

let getAuthUrl = function () {
  const DURATION = "permanent";
  const SCOPE = "identity edit flair history read vote wikiread wikiedit";
  const REDIRECT_URI = redirectUri;
  const RANDOM_STRING = "randomestringhere";
  const RESPONSE_TYPE = "code";
  const CLIENT_ID = "5oW2V6mCAmzCETYeclHnRQ";

  const URL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

  console.log("auth url ", URL);
};

let getUserTokensAndData = async function (code) {
  console.log("Code : ", code);
  let user = {};

  try {
    const REDIRECT_URI = redirectUri;
    const RANDOM_STRING = "randomestringhere";
    const CLIENT_ID = clientId;
    const CLIENT_SECRET = clientSecret;

    let body = {
      code: code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    };

    const data = await axios.post(
      "https://www.reddit.com/api/v1/access_token",
      queryString.stringify(body),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Data from reddit request : ", data.data);
    let tokenInfo = data.data;

    const userData = await axios.get("https://oauth.reddit.com//api/v1/me", {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        content_type: "application/json",
      },
    });

    console.log("User info ", userData.data);

    //console.log("github user :", user.data);
  } catch (ex) {
    console.log("error getting token ");
    //throw ex;
  }
};

getAuthUrl();

let code = "wHXmbO8Nj3hmwEyuy5EVqRSNP2FRiQ";
console.log("code : ", decodeURIComponent(code));
async function run() {
  console.log(
    "gihub user ; ",
    await getUserTokensAndData(decodeURIComponent(code))
  );
}

run();
