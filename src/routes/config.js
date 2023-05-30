"use strict";

const express = require("express");
const axios = require("axios");
const router = new express.Router();
const { TwitterApi } = require("twitter-api-v2");
const validator = require("$core-services/parameterValidator");

const CREATE_PARAMTERS = [
  "workspaceId",
  "type",
  "name",
  "displayName",
  "providers",
];
const LIST = ["workspaceId"];
const GET = ["configId"];

const {
  createConfig,
  updateConfig,
  listConfig,
} = require("../services/config");

/**
 * Samples
 * https://fusebit.io/blog/reddit-oauth/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
 *
 */
router.post("/create", async (request, response) => {
  try {
    const { body } = validator(request.body, CREATE_PARAMTERS);
    let data = await createConfig(request.body);

    response.json({ data });
  } catch (ex) {
    console.error("/reddit/requestURL/", ex);
    response.status(500).json({ ex });
  }
});

// https://discord.com/developers/docs/topics/oauth2
// console.log("decoded uri ", decodeURIComponent(code));
router.post("/update", async (request, response) => {
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
      redirectUri: process.env.TWITTER_CALLBACK,
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

router.get("/list", async (request, response) => {
  try {
    console.log("List config for workspace ", request.query);

    const { body } = validator(request.query, LIST);
    let data = await listConfig(request.query, null, null);

    response.json({ data });
  } catch (ex) {
    console.error("/list/config ", ex);
    response.status(500).json({ error: ex });
  }
});

router.get("/byId", async (request, response) => {
  try {
    console.log("List specific config ", request.query);

    const { body } = validator(request.query, GET);
    let data = await listConfig({ _id: request.query.configId }, null, null);
    if (data.length > 0) {
      data = data[0];
    }

    response.json({ data });
  } catch (ex) {
    console.error("//config/get", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
