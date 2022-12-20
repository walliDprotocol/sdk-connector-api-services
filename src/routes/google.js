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
    console.error("/discord/requestURL/", ex);
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

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET
    );

    console.log("Get google user ", code);
    const { tokens } = await oauth2Client.getToken(code);
    //console.log("Tokens : ", tokens);
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
        throw new Error(error.message);
      });

    response.json({ userInfo: googleUser, tokenInfo: tokens });
  } catch (ex) {
    console.error("/login/discord ", ex);
    response.status(500).json({ error: ex });
  }
});

module.exports = router;
