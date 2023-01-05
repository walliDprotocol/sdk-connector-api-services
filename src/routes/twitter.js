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

    response.json({ userInfo: userData.data, tokenInfo: tokenInfo });
  } catch (ex) {
    console.error("/login/reddit ", ex);
    response.status(500).json({ error: ex });
  }
});

router.post("/footprint", async (request, response) => {
  try {
    console.log("Get social info from reddit ", request.body.tokens);
    if (!(request.body && request.body.tokens)) {
      throw "You should supply tokens!";
    }

    response.json({
      friends: [],
      posts: [],
    });
  } catch (ex) {
    console.error("/footprint/reddit ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
