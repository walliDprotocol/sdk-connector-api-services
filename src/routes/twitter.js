"use strict";

const express = require("express");
const axios = require("axios");
const router = new express.Router();
const { TwitterApi } = require("twitter-api-v2");

const clientId = process.env.TWITTER_CLIENT_ID;
const clientSecret = process.env.TWITTER_CLIENT_SECRET;
//const redirectUri = "https://sdk-iframe.herokuapp.com";
console.log("Twitter clientID: ", clientId);
console.log("Twitter secret: ", clientSecret);

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

    const client = new TwitterApi({
      clientId: clientId,
      clientSecret: clientSecret,
    });

    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      //process.env.TWITTER_CALLBACK,
      request.query.redirectUrl,
      { scope: ["tweet.read", "users.read", "follows.read", "offline.access"] }
    );
    console.log("URL  : ", url);
    console.log("codeVerifier :   ", codeVerifier);
    console.log("state  ", state);
    response.json({ codeVerifier, redirectURL: url, state });
  } catch (ex) {
    console.error("/reddit/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

// https://discord.com/developers/docs/topics/oauth2
// console.log("decoded uri ", decodeURIComponent(code));
router.post("/authcode", async (request, response) => {
  try {
    let state = request.body.state;
    let code = request.body.code;
    let codeVerifier = request.body.codeVerifier;

    if (!code) {
      console.error("Should supply twitter code ", code);
      throw "Should supply twitter code";
    }
    if (!codeVerifier) {
      console.error("Should supply twitter codeVerifier ", codeVerifier);
      throw "Should supply twitter codeVerifier";
    }
    if (!(request.body && request.body.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    const {
      client: loggedClient,
      accessToken,
      refreshToken,
      //   expiresIn,
    } = await client.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: request.body.redirectUrl,
    });

    // {loggedClient} is an authenticated client in behalf of some user
    // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
    // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)

    console.log("accessToken : ", accessToken);
    console.log("refreshToken : ", refreshToken);

    // Example request
    const { data: userObject } = await loggedClient.v2.me();

    console.log("user data : ", userObject);

    response.json({
      userInfo: userObject,
      tokenInfo: { refreshToken, accessToken },
    });
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
