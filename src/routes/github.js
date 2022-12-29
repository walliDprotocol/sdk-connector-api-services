"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
let { google } = require("googleapis");
const axios = require("axios");
const router = new express.Router();
var querystring = require("querystring");
var queryString = require("querystring");

console.log("github clientID: ", process.env.GITHUB_CLIENT_ID);
console.log("github GOOGLE_CLIENT_SECRET: ", process.env.GITHUB_CLIENT_SECRET);

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
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

    const authUrl =
      "https://github.com/login/oauth/authorize" +
      "?client_id=" +
      clientId +
      "&redirect_uri=" +
      request.query.redirectUrl +
      "&scope=user";

    response.json({ redirectURL: authUrl });
  } catch (ex) {
    console.error("/github/requestURL/", ex);
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

    // Use the authorization code to request an access token
    let tokenData = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: request.body.code,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    var queryData = queryString.parse(tokenData.data);
    console.log("token data :", queryData.access_token);

    //Use the access token to authenticate requests to the GitHub API
    let user = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: "token " + queryData.access_token,
        "User-Agent": "WalliD SDK Request",
      },
    });

    response.json({ userInfo: user, tokenInfo: {} });
  } catch (ex) {
    console.error("/login/github ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
