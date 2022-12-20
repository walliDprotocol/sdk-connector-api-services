const clientId = "";
const clientSecret = "";
const redirectUri = "https://sdk-iframe.herokuapp.com/";

// https://medium.com/@jackrobertscott/facebook-auth-with-node-js-c4bb90d03fc0
const axios = require("axios");
const queryString = require("querystring");

let getAuthUrl = function () {
  const stringifiedParams = queryString.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: ["email", "user_friends"].join(","), // comma seperated string
    response_type: "code",
    auth_type: "rerequest",
    display: "popup",
  });

  const facebookLoginUrl = `https://www.facebook.com/v7.0/dialog/oauth?${stringifiedParams}`;

  console.log("auth url ", facebookLoginUrl);
};

let getUserTokensAndData = async function (code) {
  console.log("Code : ", code);
  let user = {};

  try {
    const { data } = await axios({
      url: "https://graph.facebook.com/v7.0/oauth/access_token",
      method: "get",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      },
    });
    console.log("facebook oauth tokens : ", data); // { access_token, token_type, expires_in }

    let tokenInfo = data;
    // let access_token =
    //   "EAAJ4tPvkDgoBACQqpZAb7xD3ZAsZCWLZAd8MZCSFN352SNMXt8BY6H6TnxoWQIOOoYXnw5oFjZC6NnpX7fmpFE6k4a8LOqb1ZCmrc5iY8HfZCOfw2ZCluuoGMVLZBouqAJBo7Vq5WUOUX1lDZCVH6EvYvQMvECxq5kZAhly39o5bGF1cup09SR3o3dphZAUqfP5bfJJjMhNSZBJOVWo64mC2MIoOa9Rq1DBSTK6PXb0a3MvAoTWnTI7aT2ZApqqy8xqFOiGa392UJkTNHIRhwZDZD";

    let params = {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: tokenInfo.access_token,
    };

    const userData = await axios.get("https://graph.facebook.com/v15.0/me", {
      params,
    });

    console.log("User info ", userData.data);

    //console.log("github user :", user.data);
  } catch (ex) {
    console.log("error getting token ", ex);
    //throw ex;
  }
};

/**
 *
 * User code
 *
 */

//getAuthUrl();

let code =
  "AQCngdUm7eBEb8W0EylAnwQfcN2qrV2X8UZ1Vfkc30Whe7qftIeQ6Nl95-GVq_sh9zBeQj_18xCWey2PDl042DA7V10PnPcnhEdJNlHHtGTeXpNObej3JSrNbD1JpuDp1DKj-TLcR-fM0L4-0u7APnI8C1cnYV8oZxUzrqXVAdGAi6pu5tOq3iwf88TDGKjLs7MnBNf4-hVhnT-vDEm4nJTFrLNpOJxRI5LRjJe6ArTdbkeE9O48P-ezM30CL3ZwU8AVltc7uV8PPbAiKwV8bA-sbZ4mU55oRU3mosCOLoPR-3QsBZAUOSsUPOM3uOSheg8Y6gF9qQPACmA-KlAmtOr1hzEZATQx2AmfLz05R1NPlLNXFIn6ijpBLRhD08ptT8t0ZYM2qlMIzRaH3Vp6VT7tD3LWyOmJF61AW5hjR9qm4eTtmZqhRYCI8QO7tzSSNE4";
console.log("code : ", decodeURIComponent(code));
async function run() {
  console.log(
    "gihub user ; ",
    await getUserTokensAndData(decodeURIComponent(code))
  );
}

run();
