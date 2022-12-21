const clientId = "";
const clientSecret = "";
const redirectUri = "https://sdk-iframe.herokuapp.com/";

// https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1
const axios = require("axios");
const queryString = require("querystring");

let getAuthUrl = function () {
  const stringifiedParams = queryString.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: ["r_liteprofile", "r_emailaddress", "r_member_social"].join(" "), // comma seperated string
    response_type: "code",
    state: "rerequest",
  });

  const linkdinUrl = `https://www.linkedin.com/oauth/v2/authorization?${stringifiedParams}`;

  console.log("auth url ", linkdinUrl);
};

// https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1#step-3-exchange-authorization-code-for-an-access-token
let getUserTokensAndData = async function (code) {
  console.log("Code : ", code);
  let user = {};

  try {
    let body = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code,
      grant_type: "authorization_code",
    };

    const { data } = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      queryString.stringify(body),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("linkedin oauth tokens : ", data); // { access_token, token_type, expires_in }
    let tokenInfo = data;
    // let access_token =
    //   "EAAJ4tPvkDgoBACQqpZAb7xD3ZAsZCWLZAd8MZCSFN352SNMXt8BY6H6TnxoWQIOOoYXnw5oFjZC6NnpX7fmpFE6k4a8LOqb1ZCmrc5iY8HfZCOfw2ZCluuoGMVLZBouqAJBo7Vq5WUOUX1lDZCVH6EvYvQMvECxq5kZAhly39o5bGF1cup09SR3o3dphZAUqfP5bfJJjMhNSZBJOVWo64mC2MIoOa9Rq1DBSTK6PXb0a3MvAoTWnTI7aT2ZApqqy8xqFOiGa392UJkTNHIRhwZDZD";

    const userData = await axios.get("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: "Bearer " + tokenInfo.access_token,
      },
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

getAuthUrl();

let code =
  "AQTmsJZX3Q37yZHIjJ_OQI4mgXZoKCZI6oWnIcjIbdy4FDCmQRBAqEjf68adahQWrdb3hwt_0MTXqpxGqC40CvPGANSrfgMXfovv1qVYt28rAytgF85nSlEC_Pe6YTB5OUMAuS4eFs7fzy8i-fJDSf3htNXmvv3w5b75XNudBrk60SPnKmV-kCV4RBVkT-_cWVA1-HXX60OFCD-tEhA";
console.log("code : ", decodeURIComponent(code));
async function run() {
  console.log(
    "gihub user ; ",
    await getUserTokensAndData(decodeURIComponent(code))
  );
}

//run();
