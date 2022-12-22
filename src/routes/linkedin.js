"use strict";

const express = require("express");
const axios = require("axios");
const router = new express.Router();
var queryString = require("querystring");

console.log("linkedin clientID: ", process.env.LINKEDIN_CLIEND_ID);
console.log(
  "github GOOGLE_CLIENT_SECRET: ",
  process.env.LINKEDIN_CLIENT_SECRET
);

const clientId = process.env.LINKEDIN_CLIEND_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
//const redirectUri = "https://sdk-iframe.herokuapp.com";

/**
 * // https://tomanagle.medium.com/google-oauth-with-node-js-4bff90180fe6
 *
 */
router.get("/requestURL", async (request, response) => {
  try {
    //console.log("Get auth code discord ", request.query);
    if (!(request.query && request.query.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    const stringifiedParams = queryString.stringify({
      client_id: clientId,
      redirect_uri: redirectUri,
      //r_member_social
      scope: ["r_liteprofile", "r_emailaddress"].join(" "), // comma seperated string
      response_type: "code",
      state: "rerequest",
    });

    const linkdinUrl = `https://www.linkedin.com/oauth/v2/authorization?${stringifiedParams}`;
    response.json({ redirectURL: linkdinUrl });
  } catch (ex) {
    console.error("/reddit/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

// https://discord.com/developers/docs/topics/oauth2
// console.log("decoded uri ", decodeURIComponent(code));
router.post("/authcode", async (request, response) => {
  try {
    console.log("Get auth code discord ", request.body.code);
    if (!(request.body && request.body.code)) {
      throw "You should supply code!";
    }
    if (!(request.body && request.body.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    let body = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: request.body.redirectUrl,
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

    response.json({ userInfo: userData.data, tokenInfo: tokenInfo });
  } catch (ex) {
    console.error("/login/reddit ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
