"use strict";

const express = require("express");
const axios = require("axios");
const router = new express.Router();
var queryString = require("querystring");

console.log("reddit clientID: ", process.env.REDDIT_CLIEND_ID);
console.log("reddit secret: ", process.env.REDDIT_CLIENT_SECRET);

const clientId = process.env.REDDIT_CLIEND_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
//const redirectUri = "https://sdk-iframe.herokuapp.com";

/**
 * Samples
 * https://fusebit.io/blog/reddit-oauth/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
 *
 */
router.get("/requestURL", async (request, response) => {
  try {
    //console.log("Get auth code discord ", request.query);
    if (!(request.query && request.query.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    const DURATION = "permanent";
    const SCOPE = "identity edit flair history read vote wikiread wikiedit";
    const REDIRECT_URI = request.query.redirectUrl;
    const RANDOM_STRING = "randomestringhere";
    const RESPONSE_TYPE = "code";
    const CLIENT_ID = clientId;

    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;

    response.json({ redirectURL: authUrl });
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
    const CLIENT_ID = clientId;
    const CLIENT_SECRET = clientSecret;

    let body = {
      code: request.body.code,
      grant_type: "authorization_code",
      redirect_uri: request.body.redirectUrl,
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

    console.log("reddit user data ", userData.data);
    response.json({ userInfo: userData.data, tokenInfo: tokenInfo });
  } catch (ex) {
    console.error("/login/reddit ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
