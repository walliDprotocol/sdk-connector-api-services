"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
let { google } = require("googleapis");
const axios = require("axios");

const router = new express.Router();
var querystring = require("querystring");

console.log("google clientID: ", process.env.GOOGLE_CLIENT_ID);
console.log("google GOOGLE_CLIENT_SECRET: ", process.env.GOOGLE_CLIENT_ID);

let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      request.query.redirectUrl
    );

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    let authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes, // If you only need one scope you can pass it as string
    });

    response.json({ redirectURL: authUrl });
  } catch (ex) {
    console.error("/google/requestURL/", ex);
    response.status(500).json({ error: ex });
  }
});

// https://discord.com/developers/docs/topics/oauth2
// console.log("decoded uri ", decodeURIComponent(code));
router.post("/authcode", async (request, response) => {
  try {
    if (!(request.body && request.body.code)) {
      throw "You should supply code!";
    }
    if (!(request.body && request.body.redirectUrl)) {
      throw "You should supply redirectUrl!";
    }

    console.log("Getted auth code google ", request.body.code);
    console.log("Getted auth redirect google ", request.body.redirectUrl);

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      request.body.redirectUrl
    );

    let code = decodeURIComponent(request.body.code);
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
        console.log("");
        throw new Error(error.message);
      });

    console.log("google user data : ", googleUser);
    response.json({ userInfo: googleUser, tokenInfo: tokens });
  } catch (ex) {
    console.error("/login/google ", ex);
    response.status(500).json({ error: ex });
  }
});

router.post("/footprint", async (request, response) => {
  try {
    console.log("Get social info from google ", request.body.tokens);
    if (!(request.body && request.body.tokens)) {
      throw "You should supply tokens!";
    }

    response.json({
      friends: [],
      posts: [],
    });
  } catch (ex) {
    console.error("/footprint/google ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
